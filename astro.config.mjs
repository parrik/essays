import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://parrik.com',
  markdown: {
    // Light syntax theme so code blocks sit on the cream palette,
    // not a dark default. CSS in global.css forces the background
    // to --bg-soft so the inline-style stays harmonized.
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
