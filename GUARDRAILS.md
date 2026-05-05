# Guardrails

What CI catches and why — named from actual mistakes made while building this
site. Every row is "bug we shipped (or almost shipped) → guardrail that would
have caught it at PR time."

## The merge-gate (what has to be green before main merges)

| Check | What it catches | Runs on | Mode |
|---|---|---|---|
| `astro build` | Frontmatter schema violations, broken imports, TypeScript errors | PR + push | hard-fail |
| `astro check` | Content-collection schema + unused imports | PR + push | hard-fail |
| **Internal link check** (lychee, internal-only) | Broken `href` to a page that doesn't exist | PR + push | hard-fail |
| **Stylesheet-presence guard** | Page renders without CSS because the `<link rel="stylesheet">` was omitted or the bundle was missing | PR + push | hard-fail |
| **Lighthouse CI** | Perf / a11y / SEO regressions below budgets (`.lighthouserc.json`) | PR + push | hard-fail at 0.9 |
| **slop-lint lexical** | AI-marketing register tells: banned phrases, em-dash density, hedge clusters, emoji, contrast tic, bullet density, parallel-opener templating, domain warnings (medical/legal/financial) | PR + push | soft-warn until 2026-05-18 |
| **slop-lint citations** | URL resolution, uncited specific-numeric-claim detection, named-work surfacing, recency-without-source | PR + push | soft-warn until 2026-05-18 |
| **slop-lint semantic** | LLM-judge on changed essays: mechanism specificity, steel-manning, author-surprise + arithmetic / contradiction. Pinned prompt and pinned model in `parrik/slop-lint`. | PR + push (changed essays only) | soft-warn until 2026-06-01 |
| **Frontmatter discipline** | Non-draft essays must declare `surprise` (the moment your prediction broke) and `coAuthoredWith` (LLMs that helped beyond polish; empty array if solo). Per audit-knife (2026-05-02) recs #4 and #5. | PR + push | soft-warn until 2026-05-18 |
| **PR-cooldown** | Blocks merges on PRs less than 12h old (env-tunable via `PR_COOLDOWN_HOURS`). Direct counter to high-merge-in-excitement: forces a deliberation gap between "opened" and "merged." | PR | soft-warn until 2026-05-18 |
| **Post-deploy live verification** (puppeteer) | What the user actually sees is broken | every 6h schedule + manual | hard-fail |

External link checks, markdown lint, and spellcheck run informational only —
external links flake, spellcheck has too many false positives on engineer
register, markdown lint is mostly stylistic.

## Local pre-push gates (not CI)

| Hook | What it catches | Installed via |
|---|---|---|
| **PD-audit pre-commit** | Personal-data patterns and personal-graph node IDs in staged files | `bash $HARNESS/scripts/install-pd-hooks.sh` (run once per repo) |
| **PD-audit pre-push** | Same scan applied to the commit range being pushed | same install script |
| **slop-lint pre-commit** | AI-marketing register on staged content files. Soft-warn echo by default; set `SLOP_LINT_HARD_FAIL=1` to abort on findings. | `bash $HARNESS/scripts/install-slop-hooks.sh` (run once per repo) |

These are local hooks, not CI — re-run the install script on a fresh clone or
when joining from a new device. The harness scripts are idempotent.

## Sober-attestation merge wrapper (`gh-pr-merge-sober`)

Layer 2 of the slop-merge-gate. Wraps `gh pr merge` with a gpg-encrypted
sober-attestation requirement. The threat model: future-self-while-high
runs `gh pr merge` on AI-generated content that wouldn't pass sober
review. Layer 1 catches the content register; Layer 2 catches the
cognitive state.

| Step | Mechanism |
|---|---|
| One-time setup (sober-only) | `gh-pr-merge-sober setup-attestation` — choose a sentence, encrypt it under a gpg passphrase. Stored at `~/.config/slop-lint/attestation.gpg`. |
| Per-merge | `gh-pr-merge-sober merge <PR-N>` — verifies CI green, prompts gpg decrypt, mints 5-min token, then runs `gh pr merge`. Subsequent merges within 5 min skip the prompt. |
| Bypass (logged) | `SLOP_GATE_BYPASS=1 gh-pr-merge-sober merge ...` — emergency only; logs to `~/.cache/slop-lint/bypass.log`. |

Passphrase rotation: quarterly, on a calendar reminder. Rotation prevents
the passphrase from sliding into unconscious muscle memory and stopping
the gate from gating.

Wrapper script: `$HARNESS/scripts/gh-pr-merge-sober.sh`.
Add the alias to your shell rc:

```bash
alias gh-pr-merge-sober="$HARNESS/scripts/gh-pr-merge-sober.sh"
```

## Branch protection on `main` (manual setup, github.com)

Layer 3 of the slop-merge-gate. Lives on github.com and cannot be
disabled by Claude in-session. **Apply manually via the web UI when
sober.** Settings → Branches → Add rule for `main`:

- ✅ Require a pull request before merging
- ✅ Require approvals: 0 (solo repo) — but PR-required forces a deliberation gap
- ✅ Require status checks to pass before merging
  - `CI / Build + lint`
  - `CI / Slop-lint (lexical / citations / semantic)` — once promoted from soft-warn
  - `CI / Stylesheet presence check`
  - `CI / Link check (internal + external)`
  - `CI / Lighthouse audit (perf / a11y / best-practices / SEO)`
- ✅ Require branches to be up to date before merging
- ✅ Require linear history — forces rebase, no merge commits
- ✅ Block force pushes
- ✅ Block branch deletion
- ✅ **Include administrators** — solo repo; this is the load-bearing checkbox. Without it, the gate is theater.

The "Include administrators" check is what makes Layer 3 work for a
solo builder. Disabling it for one merge requires a sober web-UI
session — Claude cannot toggle it from the CLI, and a high-self
typically won't bother.

## What was deferred / removed

- **Playwright visual regression** and **axe accessibility audit** were
  documented here but never built. Removed from the table to keep the doc
  honest. Add when there's a real layout regression to defend against and
  `tests/screenshots/` baseline images are worth committing.
- **html-validate** ran in CI but was double-suppressed (`|| exit 0` AND
  `continue-on-error: true`), so it produced no signal. Removed. Add back
  if there's a specific HTML correctness class worth gating that
  Lighthouse's `best-practices` doesn't already cover.

## Lighthouse debt carve-outs (current floor, not aspirational)

When Lighthouse was un-suppressed, three categories of pre-existing debt
surfaced. They're carved out in `.lighthouserc.json` so the gate stays
honest (any *new* regression below the current floor still fails) but the
known debt doesn't block unrelated PRs:

- **`color-contrast`: warn** — multiple essay pages have text/background
  combinations that score below 0.9 on the per-audit minScore. Pay down by
  auditing the design tokens against WCAG AA (4.5:1 body, 3:1 large) and
  promoting back to `error` once clean.
- **`aria-prohibited-attr`: warn** — the homepage has an ARIA attribute
  on an element where the current ARIA spec prohibits it. Identify the
  offending element, remove or replace, promote back to `error`.
- **`network-dependency-tree-insight`, `dom-size-insight`,
  `max-potential-fid`: off** — Lighthouse v12 preset additions; they
  flag opportunities (mostly fonts and the reading-progress div) but don't
  reflect actual user-perceived issues. Re-enable when there's a perf
  regression worth investigating.

Category-level floors are now `error` at `0.9` for performance, accessibility,
best-practices, and SEO — current scores are 0.91–1.0 across the four pages
LHCI audits, so any drop below 0.9 will block. Ratchet the threshold up as
debt is paid down.

## Mistakes this session and the guardrails that now catch them

These are all real. Each was either shipped or caught by the author noticing.

1. **404 on `/essays/know-thyself-v2/`** — the alex-case-study page had a
   hardcoded `← back to essay` link to a route that was never created.
   Caught by: **internal link check** (lychee, fail on 4xx for same-origin
   URLs). Now enforced.

2. **Duplicate "Written by AI, lived by human"** — appeared in the about page
   postscript *and* in the site footer.
   Caught by: **content-duplicate pre-commit hint** (suggested, not yet
   enforced — a pre-commit grep for repeated paragraphs would work).

3. **Essay-list metadata alignment inconsistent** — the `justify-content:
   space-between` pushed each dateline to a different right edge based on
   title length.
   Caught by: **Playwright visual regression** (screenshot diff on the
   homepage).

4. **Typography iterations** (Fraunces vs Spectral vs Georgia, four pushes) —
   the author kept saying "I don't like the typography" and I kept guessing.
   Caught by: **visual regression** + **Lighthouse aesthetic scores** + the
   author looking at a *preview URL* instead of `parrik.com` after each push.
   Preview deploys for PRs would let iteration happen without each change
   being live. (Deferred — needs Netlify or Vercel preview setup; GH Pages
   doesn't natively do per-PR previews.)

5. **Title wrong: "Staff-level" when actually Senior** — the about page made
   a factual claim about the author's career that was wrong.
   Caught by: **PR template checklist** ("have you verified claims in the
   copy?") + reviewer eye. Not automatable at this site's scale without
   deeper content trust boundaries.

6. **"Someone else's roadmap" — bitter tone** — first draft of the about
   sabbatical line read as jaded.
   Caught by: **reading the live copy back to yourself before merging.**
   Not automatable — this is human review. But the **PR template** can
   prompt: "does any copy read as more performative / bitter / small than
   intended?"

7. **Reader View confusion** — Firefox auto-opened Reader View on the longer
   essay, which looked unstyled. Not a bug; design worked as intended.
   Caught by: **the author asking instead of assuming** — and the
   stylesheet-presence guard + visual regression would both have failed on
   a real CSS-dropped bug.

8. **Stale deploys while iterating** — user saw old CSS on the live site
   because GH Actions hadn't caught up.
   Caught by: the author being told about deploy lag. Mitigated by
   **cache-busting headers** (Astro handles this via hashed asset filenames)
   and by a **deploy-finished notification** in CI (could add a Slack/Discord
   webhook or just a GH Action summary comment).

## What we deliberately don't gate

- **External link checks fail loud** — external sites flake; gating would
  produce false positives and CI fatigue. We report but don't block.
- **Markdown lint style rules** — stylistic, not correctness. Informational.
- **Spellcheck** — engineer-register proper nouns (Kleppmann, Brooker,
  Kingsbury, Galef, Bissell, Hanahan) explode the false-positive rate.
  Informational, with a local `cspell.config.yaml` word-list.
- **Bundle size** — site is tiny; gating is premature.

## What to add when scope grows

- **Preview deploys per PR** via Netlify or Cloudflare Pages — lets
  typography iterations happen without pushing to main.
- **Plausible or Umami analytics** — privacy-respecting, knowing bounce rates
  closes the loop on "is this enticing to readers?"
- **CodeQL** for dependency + JS security scanning.
- **Dependabot** for npm + GH Action version bumps.
- **CODEOWNERS** if a co-author joins.

## What you should know if you're rusty on modern web UX

Fast survey, since you asked. Each item is a testable rule, not vibes.

- **Contrast**: body text ≥ 4.5:1, large text (≥18pt or 14pt bold) ≥ 3:1
  (WCAG AA). Check with [webaim.org/resources/contrastchecker](https://webaim.org/resources/contrastchecker/).
  Current site: `#2b2520` on `#f4ecd9` = ~13:1. Fine.
- **Touch targets**: ≥ 44×44px (iOS) or 48×48px (Material). Nav links with
  only 0.82rem / ~13px text + no padding fail this. Fix: padding around links.
- **Focus indicators**: must be visible (don't `outline: none` without a
  replacement). Browsers default is a dashed outline; CSS `:focus-visible`
  is the modern way.
- **Prefers-reduced-motion**: any animation should honor
  `@media (prefers-reduced-motion: reduce)`. The reading-progress bar
  already does.
- **Prefers-color-scheme**: dark mode via system preference, not a JS toggle.
  Not yet done; add via `@media (prefers-color-scheme: dark) { ... }`.
- **Semantic HTML**: `<main>`, `<article>`, `<nav>`, `<header>`, `<footer>`
  give screen-reader landmarks. Already in use here.
- **Skip-to-content link**: for keyboard users. Not yet added; one-line
  addition.
- **`loading="lazy"` on iframes + images below the fold**: saves bandwidth.
  Already on the alex-case-study iframe.
- **`prefers-reduced-data`**: new media query, not yet widely supported.
  Watch.
- **`@view-transition`**: native cross-document transitions. Already on.
- **Baseline-compatible features only**: check [web.dev/baseline](https://web.dev/baseline/)
  before shipping a new CSS feature. `oklch()` just became Baseline 2024.
- **Container queries** (`@container`) are Baseline 2024. Use for
  component-level responsive, not viewport queries.
- **Variable fonts**: one file covers weights 100–900 + italics. Smaller
  than loading 4 separate weights.

## The reading habit worth forming

When you push a change: **load the live site on your phone within 60 seconds
of the deploy finishing.** Phone screens surface issues desktop hides —
typography weight, contrast, touch targets, line length. Every single
typography pushback this session would have caught itself faster on phone.
