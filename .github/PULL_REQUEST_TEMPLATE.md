<!--
Thanks for the change. The boxes below exist because specific bugs shipped
this repo recently — see GUARDRAILS.md for the full post-mortem list.
Check what applies; delete the rest.
-->

## What changed

<!-- One paragraph. What and why. -->

## Checklist

### Content changes
- [ ] Any factual claim in copy (title, employer, date, count) is verifiable
      off-site, not just remembered
- [ ] No duplicated lines between essay body and layout (footer, sidebar)
- [ ] Read the copy aloud once — nothing reads as rude / bitter / small /
      performative
- [ ] If the essay has `status: tending`, any new notes are integrated
      into the body, not bolted as a "Notes since publish" section
- [ ] `publishedAt` / `updatedAt` / `status` frontmatter is present and
      accurate

### UX / UI changes
- [ ] Previewed on mobile viewport (390px) in addition to desktop
- [ ] Contrast ratio checked for any new color (WCAG AA minimum)
- [ ] Fonts load correctly (stylesheet-presence guard passes)
- [ ] Vertical rhythm feels consistent with neighbors (no one-off margins)
- [ ] Hover states match the site-wide pattern

### Links
- [ ] All `href=` point to routes that exist (internal lychee will fail
      CI otherwise)
- [ ] External links open in appropriate context

### Fit
- [ ] This change is minimal — no feature creep, no surprise abstractions,
      no chrome added without need

<!--
CI will also run:
- astro check (schema + types)
- astro build
- lychee internal link check (blocks merge on broken internal links)
- stylesheet-presence check (blocks merge on CSS-less pages)
- html-validate (informational)
- Lighthouse on PR (a11y + SEO block at 0.95 / 0.9; performance warn)

Post-deploy, the verify workflow (scheduled + workflow_dispatch) will
crawl the live site and screenshot each page.
-->
