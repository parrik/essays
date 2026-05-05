# slop-audit — know-thyself-search — 2026-05-04

Run of slop-lint v0.1.0 (commit 7c8edf5) against the essay file. Network-disabled mode (URL resolution skipped — runs in CI).

## Findings

```
--- lexical ---
[WARN] know-thyself-search.md :: em-dash-density :: 2.37 em-dashes per 100 words (warn threshold: 2)

--- citations (offline) ---
[WARN] know-thyself-search.md :: url-resolution-skipped :: 44 URLs found; resolution skipped (SLOP_LINT_NO_NETWORK=1)
[FAIL] know-thyself-search.md :: uncited-numeric-claims :: 15 numeric claims in paragraphs without citations
```

## Suggested actions

- **em-dash-density (WARN, 2.37/100w)** — em-dash scaffolding density is above the warn threshold of 2/100w. Earlier hand-review flagged this essay's em-dash scaffolding density as a slop signal. Review em-dashes used as universal-purpose connectors; replace with periods, commas, or restructured clauses where the em-dash is doing connector-work rather than parenthetical-work.
- **uncited-numeric-claims (FAIL, 15 claims)** — 15 specific numeric claims live in paragraphs without citation markers. Many are likely covered by citations elsewhere in the essay; the regex flags per-paragraph scope which is lossy. Action options: (a) add inline citation markers to each numeric claim, (b) consolidate citations at paragraph-end, or (c) re-evaluate which numbers are load-bearing and rephrase the others non-quantitatively.

Earlier hand-review on this essay: SLOP-SHAPED. Mechanism weak, no steel-manning of the long-context-substrate camp, no author-surprise marker. Lexical findings here are downstream of the deeper structural issue.
