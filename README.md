# parrik

Source for [parrik.com](https://parrik.com) — essays on systems, biology, and the practice.

Built with [Astro](https://astro.build). Deployed to GitHub Pages.

## Essays

- **[Know Thyself](src/content/essays/know-thyself.md)** — a schema for personal memory in LLM conversations.
- **[Restorative yoga and biology of belonging](src/content/essays/restorative-yoga-and-biology-of-belonging.md)** — a cancer cell is not a broken cell; it has lost context.

## Local development

```bash
npm install
npm run dev          # localhost:4321
npm run build        # output in dist/
```

## Adding an essay

1. Create `src/content/essays/your-essay-slug.md` with frontmatter:

```yaml
---
title: Your Essay Title
subtitle: Optional subtitle
tag: essay | poster | short
order: 3                     # lower = earlier in list
description: Short description for SEO / social.
pdfUrl: /your-essay-slug.pdf # optional
---
```

2. The slug becomes the URL: `/essays/your-essay-slug/`.
3. (Optional) Generate a PDF of the rendered essay while `npm run dev` is running:

```bash
npm run pdf your-essay-slug
```

Output lands at `public/your-essay-slug.pdf`.
