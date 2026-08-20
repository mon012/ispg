/**
 * Replicates the Astro dev-toolbar Audit app across every route, so the
 * "11 accessibility / 2 performance" badges can be cleared without clicking
 * through each page by hand.
 *
 * The rules mirror node_modules/astro/dist/runtime/client/dev-toolbar/apps/
 * audit/rules/{a11y,perf}.js — notably the accessible-name rule, which reads
 * innerText (empty for anything visibility:hidden) rather than textContent.
 *
 * Usage: node scripts/check-a11y.mjs [baseUrl]
 */
import pagesJson from '../src/data/pages.json' with { type: 'json' };

const BASE = process.argv[2] ?? 'http://localhost:4331';

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
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
let total = 0;

for (const route of ROUTES) {
  const res = await page.goto(BASE + route, { waitUntil: 'load' });
  if (!res?.ok()) { console.log(`${route} -> HTTP ${res?.status()}`); total++; continue; }
  // Above/below-the-fold verdicts are read off getBoundingClientRect, so the
  // layout has to have stopped moving first: fonts swapping in and the
  // data-reveal entrance animations both shift elements across the fold line
  // and otherwise make the run report different images from one pass to the next.
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
    const vh = window.innerHeight;
    for (const el of document.querySelectorAll('img, iframe')) {
      if (el.closest('astro-dev-toolbar')) continue;
      const r = el.getBoundingClientRect();
      const aboveFold = r.top < vh;
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

  if (found.length) {
    total += found.length;
    console.log(`\n${route}  (${found.length})`);
    for (const f of found) console.log(`   [${f.kind}] ${f.rule} — ${f.el} ${f.note ? `· ${f.note}` : ''}`);
  }
}

await browser.close();
console.log(total === 0 ? '\nClean — no audit findings.' : `\n${total} finding(s) across ${ROUTES.length} routes.`);
process.exit(total === 0 ? 0 : 1);
