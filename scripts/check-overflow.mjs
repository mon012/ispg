/**
 * Responsive smoke test: loads every built route at three widths and reports
 * any element wider than the viewport (the classic source of a page that
 * scrolls sideways on a phone).
 *
 * Usage: node scripts/check-overflow.mjs [baseUrl]
 */
import { readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const BASE = process.argv[2] ?? 'http://localhost:4321';
const WIDTHS = [375, 768, 1440];

function routes(dir, root = dir, acc = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) routes(full, root, acc);
    else if (entry === 'index.html') {
      const rel = relative(root, dir).split('\\').join('/');
      acc.push(rel ? `/${rel}/` : '/');
    }
  }
  return acc;
}

const all = routes('dist').sort();
const { chromium } = await import('playwright').catch(() => ({}));

if (!chromium) {
  console.error('playwright not installed — run: npm i -D playwright && npx playwright install chromium');
  process.exit(2);
}

const browser = await chromium.launch();
let problems = 0;

for (const width of WIDTHS) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  for (const route of all) {
    const res = await page.goto(BASE + route, { waitUntil: 'domcontentloaded' });
    if (!res?.ok()) { console.log(`  ${width}px ${route} -> HTTP ${res?.status()}`); problems++; continue; }
    // Wait for webfonts to finish swapping in — measuring mid-swap (e.g. the
    // Georgia fallback standing in for Cormorant Garamond) yields different,
    // flaky element widths from one run to the next.
    await page.evaluate(() => document.fonts?.ready).catch(() => {});
    const bad = await page.evaluate((vw) => {
      const doc = document.documentElement;
      const out = [];
      if (doc.scrollWidth > vw + 1) {
        for (const el of document.querySelectorAll('body *')) {
          const r = el.getBoundingClientRect();
          if (r.width === 0) continue;
          if (r.right > vw + 1 || r.left < -1) {
            out.push(`${el.tagName.toLowerCase()}.${String(el.className).split(' ')[0]} [${Math.round(r.left)}..${Math.round(r.right)}]`);
          }
        }
      }
      return { scrollWidth: doc.scrollWidth, offenders: out.slice(0, 4) };
    }, width);

    if (bad.scrollWidth > width + 1) {
      problems++;
      console.log(`  ${width}px ${route} scrollWidth=${bad.scrollWidth}`);
      bad.offenders.forEach((o) => console.log(`        ${o}`));
    }
  }
  await page.close();
  console.log(`${width}px — checked ${all.length} routes`);
}

await browser.close();
console.log(problems === 0 ? '\nNo horizontal overflow found.' : `\n${problems} problem(s) found.`);
process.exit(problems === 0 ? 0 : 1);
