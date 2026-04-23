// Self-verification against a deployed site. Crawls same-origin links from
// a set of seeds, asserts 200 status, that each HTML page actually loaded
// CSS (not just a <link> tag but computed styles applied), screenshots at
// two viewports, and flags obvious placeholder link text. Exits 0 on full
// pass, 1 on any failure. Usage: node scripts/verify.mjs [base-url]

import puppeteer from 'puppeteer';
import { mkdir, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE = (process.argv[2] || 'https://parrik.com/').replace(/\/?$/, '/');
const ORIGIN = new URL(BASE).origin;
const SEEDS = [BASE, new URL('alex-case-study.html', BASE).href];
const OUT_DIR = resolve(__dirname, 'verify-output');
const VIEWPORTS = [
  { name: 'desktop', width: 1280, height: 800 },
  { name: 'mobile', width: 390, height: 844 },
];
const MAX_PAGES = 100;

const slugify = (u) => {
  const url = new URL(u);
  const s = (url.pathname + url.search).replace(/[^a-z0-9]+/gi, '-').replace(/^-+|-+$/g, '');
  return s || 'index';
};

const isHtmlUrl = (u) => {
  try {
    const url = new URL(u);
    if (url.origin !== ORIGIN) return false;
    const p = url.pathname;
    if (/\.(png|jpe?g|gif|svg|webp|ico|css|js|mjs|pdf|xml|json|txt|woff2?|ttf|otf|zip|mp4|mp3|wav)$/i.test(p)) return false;
    return true;
  } catch { return false; }
};

const normalize = (u) => {
  const url = new URL(u);
  url.hash = '';
  return url.href;
};

const failures = [];
const visited = new Set();
const queue = SEEDS.map(normalize);
const linkTextIssues = [];
let linksCheckedCount = 0;

await mkdir(OUT_DIR, { recursive: true });

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

try {
  while (queue.length && visited.size < MAX_PAGES) {
    const url = queue.shift();
    if (visited.has(url)) continue;
    visited.add(url);

    const page = await browser.newPage();
    const cssResponses = new Map();
    page.on('response', (res) => {
      const ru = res.url();
      if (/\/_astro\/.+\.css$/i.test(ru)) cssResponses.set(ru, res.status());
    });

    let response;
    try {
      response = await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    } catch (e) {
      failures.push(`[NAV] ${url} — ${e.message}`);
      await page.close();
      continue;
    }

    const status = response ? response.status() : 0;
    if (status < 200 || status >= 300) {
      failures.push(`[STATUS ${status}] ${url}`);
      await page.close();
      continue;
    }

    // CSS-loaded checks
    const cssHrefs = await page.$$eval(
      'link[rel="stylesheet"]',
      (els) => els.map((e) => e.getAttribute('href')).filter(Boolean)
    );
    const astroCss = cssHrefs.filter((h) => /^\/_astro\/.+\.css$/.test(h));
    // Standalone static HTML in public/ ships its own inline styles and has
    // no Astro bundle by design. Skip the CSS-LINK assertion for these.
    const cssLinkExempt = new Set(['/alex-case-study.html']);
    const urlPath = new URL(url).pathname;
    if (astroCss.length === 0 && !cssLinkExempt.has(urlPath)) {
      failures.push(`[CSS-LINK] ${url} — no <link rel=stylesheet href=/_astro/*.css>`);
    } else if (astroCss.length > 0) {
      for (const href of astroCss) {
        const full = new URL(href, url).href;
        const st = cssResponses.get(full);
        if (st === undefined) {
          // Fetch directly — may have been cached/not observed
          try {
            const r = await page.evaluate(async (u) => {
              const res = await fetch(u, { method: 'GET' });
              return res.status;
            }, full);
            // 304 Not Modified is valid — the local preview server issues it
            // on repeat CSS fetches within a session. Prod CDN returns 200.
            if (r !== 200 && r !== 304) failures.push(`[CSS-STATUS ${r}] ${full} (from ${url})`);
          } catch (e) {
            failures.push(`[CSS-FETCH] ${full} — ${e.message}`);
          }
        } else if (st !== 200 && st !== 304) {
          failures.push(`[CSS-STATUS ${st}] ${full} (from ${url})`);
        }
      }
    }

    const bodyStyle = await page.evaluate(() => {
      const s = getComputedStyle(document.body);
      return { bg: s.backgroundColor, font: s.fontFamily };
    });
    if (bodyStyle.bg === 'rgba(0, 0, 0, 0)' || bodyStyle.bg === 'transparent') {
      failures.push(`[CSS-BG] ${url} — body background is ${bodyStyle.bg} (CSS not applied)`);
    }
    if (/^["']?Times New Roman["']?$/i.test(bodyStyle.font.trim())) {
      failures.push(`[CSS-FONT] ${url} — body font-family is default "${bodyStyle.font}" (CSS not applied)`);
    }

    // Link-text sanity + collect same-origin links for crawl
    const anchors = await page.$$eval('a[href]', (els) =>
      els.map((a) => ({
        href: a.href,
        text: (a.textContent || '').trim(),
        visible: !!(a.offsetWidth || a.offsetHeight || a.getClientRects().length),
      }))
    );
    linksCheckedCount += anchors.length;
    for (const a of anchors) {
      if (!a.visible || !a.text) continue;
      const low = a.text.toLowerCase();
      if (low.startsWith('undefined') || low.startsWith('[object') || low.startsWith('null') || low === 'todo' || low.startsWith('lorem ipsum')) {
        linkTextIssues.push(`[LINK-TEXT] "${a.text}" -> ${a.href} (on ${url})`);
      }
    }
    for (const a of anchors) {
      if (!isHtmlUrl(a.href)) continue;
      const n = normalize(a.href);
      if (!visited.has(n) && !queue.includes(n)) queue.push(n);
    }

    // Screenshots
    for (const v of VIEWPORTS) {
      await page.setViewport({ width: v.width, height: v.height });
      await new Promise((r) => setTimeout(r, 150));
      const out = resolve(OUT_DIR, `${slugify(url)}-${v.name}.png`);
      try {
        await page.screenshot({ path: out, fullPage: true });
      } catch (e) {
        failures.push(`[SCREENSHOT] ${url} (${v.name}) — ${e.message}`);
      }
    }

    await page.close();
    console.log(`[ok ${status}] ${url}`);
  }
} finally {
  await browser.close();
}

// Link-text issues are warnings unless any exist → treat as failure so CI flags them.
for (const issue of linkTextIssues) failures.push(issue);

console.log('');
console.log('=== Verify Summary ===');
console.log(`${visited.size} pages crawled, ${linksCheckedCount} links checked, ${failures.length} failures`);
if (failures.length) {
  console.log('');
  console.log('Failures:');
  for (const f of failures) console.log(`  - ${f}`);
  process.exit(1);
} else {
  console.log('All checks passed.');
  process.exit(0);
}
