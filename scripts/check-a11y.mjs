/**
 * Replicates the Astro dev-toolbar Audit app across every route, so the
 * "11 accessibility / 2 performance" badges can be cleared without clicking
 * through each page by hand.
 *
 * The rules mirror node_modules/astro/dist/runtime/client/dev-toolbar/apps/
 * audit/rules/{a11y,perf}.js — notably the accessible-name rule, which reads
 * innerText (empty for anything visibility:hidden) rather than textContent.
 *
 * Usage: node scripts/check-a11y.mjs [baseUrl] [viewportHeight]
 */
import pagesJson from '../src/data/pages.json' with { type: 'json' };

const BASE = process.argv[2] ?? 'http://localhost:4331';
// The lazy/eager rules compare against the viewport height, so an image sitting
// near the fold flips verdict between window sizes. Override to spot-check:
//   node scripts/check-a11y.mjs http://localhost:4331 977
const VH = Number(process.argv[3]) || 900;

const STATIC = [
  '/', '/about/', '/flair/', '/our-teachers/', '/school-life/',
  '/academics/', '/academics/kindergarten/', '/academics/primary/',
  '/admission/', '/fees/', '/calendar/', '/contact/',
  '/blog/', '/blue-dolphins/', '/openhouse/',
];
const ROUTES = [...STATIC, ...pagesJson.map((p) => `/${p.slug}/`)];

const { chromium } = await import('playwright').catch(() => ({}));
if (!chromium) {
  console.error('playwright not installed — run: npm i -D playwright && npx playwright install chromium');
  process.exit(2);
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: VH } });
let total = 0;

for (const route of ROUTES) {
  const res = await page.goto(BASE + route, { waitUntil: 'load' });
  if (!res?.ok()) { console.log(`${route} -> HTTP ${res?.status()}`); total++; continue; }
  // Wait for webfonts before measuring: a Georgia fallback standing in for
  // Cormorant Garamond reflows the page, which moves every element's document
  // position and flips the fold verdicts from one run to the next.
  await page.evaluate(() => document.fonts?.ready).catch(() => {});
  await page.waitForTimeout(400);

  const found = await page.evaluate(() => {
    const out = [];
    const label = (el) => {
      const cls = String(el.className || '').split(' ').filter(Boolean)[0];
      return el.tagName.toLowerCase() + (cls ? `.${cls}` : '') + (el.id ? `#${el.id}` : '');
    };

    // A closed <dialog> is out of the accessibility tree entirely, so empty
    // placeholders inside one (filled in by JS when it opens) aren't real
    // findings. The toolbar has no such exemption and will still flag them.
    const inClosedDialog = (el) => {
      const d = el.closest('dialog');
      return !!d && !d.open;
    };

    // --- a11y: missing accessible name on anchors and headings
    for (const el of document.querySelectorAll('a, h1, h2, h3, h4, h5, h6')) {
      if (el.closest('astro-dev-toolbar') || inClosedDialog(el)) continue;
      if (el.innerText?.trim()) continue;
      if (el.getAttribute('aria-label')?.trim()) continue;
      const by = el.getAttribute('aria-labelledby');
      if (by && by.split(' ').some((id) => document.getElementById(id)?.innerText.trim())) continue;
      if ([...el.querySelectorAll('img')].some((i) => i.getAttribute('alt')?.trim())) continue;
      if ([...el.querySelectorAll('svg title')].some((t) => t.textContent?.trim())) continue;
      out.push({
        kind: 'a11y',
        rule: 'Missing content',
        el: label(el),
        note: el.textContent?.trim() ? `has textContent "${el.textContent.trim().slice(0, 40)}" but innerText is empty (hidden?)` : 'no text at all',
        href: el.getAttribute('href') ?? '',
      });
    }

    // --- a11y: img without alt
    for (const el of document.querySelectorAll('img:not([alt])')) {
      out.push({ kind: 'a11y', rule: 'Missing alt', el: label(el), note: el.getAttribute('src') ?? '' });
    }

    // --- perf: raw <img> (not the Image component) + loading attribute fit
    //
    // Fold position is measured the way the toolbar measures it: summing
    // offsetTop up the offsetParent chain. That is a document coordinate, so
    // unlike getBoundingClientRect it doesn't move with the scroll position or
    // with the data-reveal entrance transforms — using the rect here quietly
    // under-reported images sitting near the fold.
    const vh = window.innerHeight;
    const documentTop = (el) => {
      let y = 0;
      for (let cur = el; cur; cur = cur.offsetParent) y += cur.offsetTop;
      return y;
    };
    for (const el of document.querySelectorAll('img, iframe')) {
      if (el.closest('astro-dev-toolbar')) continue;
      const aboveFold = documentTop(el) < vh;
      const loading = el.getAttribute('loading');
      if (el.tagName === 'IMG' && !el.hasAttribute('data-image-component')) {
        out.push({ kind: 'perf', rule: 'Use the Image component', el: label(el), note: el.getAttribute('src') ?? '' });
      }
      if (!aboveFold && (!loading || loading === 'eager')) {
        out.push({ kind: 'perf', rule: 'Should be lazy-loaded', el: label(el), note: `loading=${loading} · ${el.getAttribute('src') ?? ''}` });
      }
      if (aboveFold && loading === 'lazy') {
        out.push({ kind: 'perf', rule: 'Should be eager-loaded', el: label(el), note: el.getAttribute('src') ?? '' });
      }
    }
    return out;
  });

  // Second pass, after the loading-attribute verdicts are already recorded:
  // images live in src/assets now but are still referenced by their old /media
  // path, so a missed mapping surfaces as a 404 here rather than a build error.
  // Lazy images are forced to fetch so every one of them gets checked.
  const broken = await page.evaluate(async () => {
    const imgs = [...document.querySelectorAll('img')].filter(
      (i) => !i.closest('astro-dev-toolbar') && i.getAttribute('src'),
    );
    for (const i of imgs) i.loading = 'eager';
    await Promise.all(
      imgs.map((i) => (i.complete ? null : new Promise((r) => {
        i.addEventListener('load', r, { once: true });
        i.addEventListener('error', r, { once: true });
        setTimeout(r, 5000);
      }))),
    );
    return imgs
      .filter((i) => i.complete && i.naturalWidth === 0)
      .map((i) => ({ kind: 'broken', rule: 'Image failed to load', el: i.tagName.toLowerCase(), note: i.currentSrc || i.src }));
  });
  found.push(...broken);

  if (found.length) {
    total += found.length;
    console.log(`\n${route}  (${found.length})`);
    for (const f of found) console.log(`   [${f.kind}] ${f.rule} — ${f.el} ${f.note ? `· ${f.note}` : ''}`);
  }
}

await browser.close();
console.log(total === 0 ? '\nClean — no audit findings.' : `\n${total} finding(s) across ${ROUTES.length} routes.`);
process.exit(total === 0 ? 0 : 1);
