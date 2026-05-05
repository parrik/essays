# slop-audit — know-thyself — 2026-05-04

Run of slop-lint v0.1.0 (commit 7c8edf5) against the essay file. Network-disabled mode (URL resolution skipped — runs in CI).

## Findings

```
--- lexical ---
[WARN] know-thyself.md :: banned-phrases :: 2 banned-phrase hits across 1 distinct phrases (warn threshold: 2)

--- citations (offline) ---
[WARN] know-thyself.md :: url-resolution-skipped :: 8 URLs found; resolution skipped (SLOP_LINT_NO_NETWORK=1)
[WARN] know-thyself.md :: uncited-numeric-claims :: 1 numeric claims in paragraphs without citations
```

## Suggested actions

- **banned-phrases (WARN, 2 hits, 1 distinct phrase)** — one phrase appearing twice. Re-run the lexical check verbose to identify which phrase, then judge whether the use is intentional. If intentional, leave; otherwise, replace.
- **uncited-numeric-claims (WARN, 1 claim)** — one paragraph contains a specific number with no citation marker. Add the citation or rephrase to remove the specificity.

This essay has been judged NOT SLOP in earlier hand-review. The lexical and citations findings here are at the calibration-edge level, not structural. Treat as nudges, not defects.
