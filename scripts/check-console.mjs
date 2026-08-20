/**
 * Loads every built route and reports page errors, console errors and failed
 * requests. Third-party embeds (Gumlet, Deftform, Google) are noted separately
 * since they depend on network conditions rather than on our code.
 *
 * Usage: node scripts/check-console.mjs [baseUrl]
 */
import { readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const BASE = process.argv[2] ?? 'http://localhost:4321';
const THIRD_PARTY = /gumlet|deftform|google|gstatic|canva|doubleclick|facebook|fbcdn|ytimg|youtube/i;

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

const { chromium } = await import('playwright');
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

let own = 0;
const thirdParty = new Set();

for (const route of routes('dist').sort()) {
  const issues = [];
  // Attribute each message to the frame it came from — messages raised inside a
  // vendor iframe (Gumlet, Deftform, Canva, Google) are not our code, and their
  // text rarely names the vendor.
  const origin = (frameUrl) => (frameUrl && !frameUrl.startsWith(BASE) ? frameUrl : '');
  const onConsole = (m) => {
    if (m.type() !== 'error') return;
    const from = origin(m.location()?.url ?? m.page()?.url());
    issues.push(`${from ? `[iframe ${from}] ` : ''}console: ${m.text()}`);
  };
  // A cross-origin script that throws reaches us stripped of its message and
  // stack — the browser's "Script error" rule. Our own bundles are same-origin,
  // so anything this opaque came from a vendor embed.
  const onError = (e) => {
    const msg = e?.message;
    issues.push(msg && msg !== 'undefined' ? `pageerror: ${msg}` : '[cross-origin script] pageerror');
  };
  const onFailed = (r) => {
    const from = origin(r.frame()?.url());
    issues.push(`${from ? `[iframe ${from}] ` : ''}request failed: ${r.url()} (${r.failure()?.errorText})`);
  };

  page.on('console', onConsole);
  page.on('pageerror', onError);
  page.on('requestfailed', onFailed);

  await page.goto(BASE + route, { waitUntil: 'networkidle' }).catch(() => {});

  page.off('console', onConsole);
  page.off('pageerror', onError);
  page.off('requestfailed', onFailed);

  const vendor = (i) => THIRD_PARTY.test(i) || i.startsWith('[iframe ') || i.startsWith('[cross-origin script]');
  const mine = issues.filter((i) => !vendor(i));
  issues.filter(vendor).forEach((i) => thirdParty.add(i.slice(0, 110)));

  if (mine.length) {
    own += mine.length;
    console.log(`\n${route}`);
    mine.forEach((i) => console.log(`   ${i}`));
  }
}

await browser.close();
console.log(`\nfirst-party issues: ${own}`);
console.log(`third-party embed noise: ${thirdParty.size} distinct`);
process.exit(own === 0 ? 0 : 1);
