// Generate a PDF by rendering a live dev server URL with Puppeteer. Usage:
//   npm run dev        # in another terminal
//   node scripts/pdf.mjs <slug>                       # essay → public/<slug>.pdf
//   node scripts/pdf.mjs --path <route> --out <file>  # any route → public/<file>

import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { mkdirSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);

let url, outputPath;
if (args[0] === '--path') {
  const route = args[1];
  const outIdx = args.indexOf('--out');
  const out = outIdx >= 0 ? args[outIdx + 1] : null;
  if (!route || !out) {
    console.error('Usage: node scripts/pdf.mjs --path <route> --out <file>');
    process.exit(1);
  }
  url = `http://localhost:4321${route}`;
  outputPath = resolve(__dirname, `../public/${out}`);
  mkdirSync(dirname(outputPath), { recursive: true });
} else {
  const slug = args[0];
  if (!slug) {
    console.error('Usage: node scripts/pdf.mjs <slug>');
    process.exit(1);
  }
  url = `http://localhost:4321/puzzles/${slug}/`;
  outputPath = resolve(__dirname, `../public/${slug}.pdf`);
}

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.emulateMediaType('screen');
await page.goto(url, { waitUntil: 'networkidle0' });

// Trim site chrome and force light styling for print
await page.addStyleTag({
  content: `
    .site-header, .site-footer, .essay-meta { display: none !important; }
    main { padding: 0 !important; max-width: 100% !important; }
    body { background: white !important; color: #1a1a1a !important; }
    h1, .essay-kicker, h2, a { color: #1a1a1a !important; }
    a { text-decoration: underline; }
  `,
});

await page.pdf({
  path: outputPath,
  format: 'Letter',
  printBackground: true,
  margin: { top: '0.85in', right: '0.9in', bottom: '0.85in', left: '0.9in' },
});

await browser.close();
console.log(`Wrote ${outputPath}`);
