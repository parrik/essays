# parrik

Source for [parrik.com](https://parrik.com) — essays on systems, biology, and the practice.

Built with [Astro](https://astro.build). Deployed to GitHub Pages.

## Essays

- **[The Partition Problem](src/content/essays/the-partition-problem.md)** — restorative yoga and the biology of belonging.
- **[The Campaign Cascade](src/content/essays/the-campaign-cascade.md)** — why cross-cutting engineering initiatives multiply instead of completing.

## Local development

```bash
npm install
npm run dev          # localhost:4321
npm run build        # output in dist/
```

## Adding an essay

Create `src/content/essays/your-essay-slug.md` with frontmatter:

```yaml
---
title: Your Essay Title
subtitle: Optional subtitle
tag: essay | poster | short
order: 3        # higher = later in list; lower = earlier
description: Short description for SEO / social.
---
```

The slug becomes the URL: `/essays/your-essay-slug/`.
