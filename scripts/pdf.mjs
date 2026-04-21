// Generate a PDF for one essay by rendering the live dev server URL with
// Puppeteer. Usage:
//   npm run dev        # in another terminal
//   node scripts/pdf.mjs <slug>
// Output: public/<slug>.pdf

import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const slug = process.argv[2];

if (!slug) {
  console.error('Usage: node scripts/pdf.mjs <slug>');
  process.exit(1);
}

const url = `http://localhost:4321/essays/${slug}/`;
const outputPath = resolve(__dirname, `../public/${slug}.pdf`);

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
