import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://parrik.com',
  redirects: {
    // Old /essays/ prefix → new /puzzles/ prefix.
    '/essays/know-thyself/': '/puzzles/know-thyself/',
    '/essays/know-thyself-search/': '/puzzles/know-thyself-search/',
    '/essays/the-campaign-cascade/': '/puzzles/the-campaign-cascade/',
    '/essays/the-partition-problem/': '/puzzles/the-partition-problem/',
    // Pt III renamed to follow the series-slug pattern.
    '/essays/security-was-never-about-response/': '/puzzles/know-thyself-security/',
    '/puzzles/security-was-never-about-response/': '/puzzles/know-thyself-security/',
    // Memory essay was retired; old URL still bounces to the next sibling in the series.
    '/essays/memory-was-never-about-storage/': '/puzzles/know-thyself-security/',
    '/puzzles/memory-was-never-about-storage/': '/puzzles/know-thyself-security/',
    // Earlier section rename.
    '/side-channels/': '/crossings/',
  },
  markdown: {
    // Light syntax theme so code blocks sit on the cream palette,
    // not a dark default. CSS in global.css forces the background
    // to --bg-soft so the inline-style stays harmonized.
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
