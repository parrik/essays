import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://parrik.com',
  redirects: {
    // Old /essays/ prefix → new /puzzles/ prefix.
    '/essays/know-thyself/': '/puzzles/know-thyself/',
    '/essays/the-campaign-cascade/': '/puzzles/the-campaign-cascade/',
    '/essays/the-partition-problem/': '/puzzles/the-partition-problem/',
    // Parts II and III are drafts — bounce old URLs to Part I rather than 404.
    '/essays/know-thyself-search/': '/puzzles/know-thyself/',
    '/puzzles/know-thyself-search/': '/puzzles/know-thyself/',
    '/essays/security-was-never-about-response/': '/puzzles/know-thyself/',
    '/puzzles/security-was-never-about-response/': '/puzzles/know-thyself/',
    '/puzzles/know-thyself-security/': '/puzzles/know-thyself/',
    '/essays/memory-was-never-about-storage/': '/puzzles/know-thyself/',
    '/puzzles/memory-was-never-about-storage/': '/puzzles/know-thyself/',
    // Earlier section renames. nature → about (the nature track was
    // converted to an about-me section; partition-problem essay moved
    // onto the main homepage list).
    '/side-channels/': '/about/',
    '/crossings/': '/about/',
    '/nature/': '/about/',
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
