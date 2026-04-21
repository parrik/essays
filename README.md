# parrik

Source for [parrik.com](https://parrik.com) — essays on systems, biology, and the practice.

Built with [Astro](https://astro.build). Deployed to GitHub Pages.

## Essays

- **[Know Thyself](src/content/essays/know-thyself.md)** — a schema for personal memory in LLM conversations.
- **[The Partition Problem](src/content/essays/the-partition-problem.md)** — restorative yoga and the biology of belonging.
- **[The Campaign Cascade](src/content/essays/the-campaign-cascade.md)** — why cross-cutting engineering initiatives multiply instead of completing.

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
