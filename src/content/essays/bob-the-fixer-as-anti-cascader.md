---
title: Migrations don't have to cascade
seriesName: The Campaign Cascade
subtitle: Choreographed multi-PR migrations as a Claude Code skill — paced by the team, riding a codemod engine
relief: The cascade isn't gravity. It's a function of which side is doing the pulling. Flip that, and the cascade doesn't form.
kicker: Engineering Pattern
tag: essay
order: 3
parent: the-campaign-cascade
draft: false
description: bob-the-fixer is the shape that doesn't cascade — team-pulled instead of operator-pushed, choreographed instead of single-shot, teaching instead of just doing.
publishedAt: 2026-05-08
surprise: The user-facing teaching layer is the load-bearing part. Every surveyed AI coding tool's skill format teaches the agent. None I've found surface publisher-authored prose to the developer in their session before the change. That gap is a positioning, not an oversight.
coAuthoredWith:
  - Claude Opus 4.7
---

Let's just walk one migration.

You have a Spring Boot 2.7 service. Java 11, Maven, the usual. The platform team has been emailing about Spring Boot 3 for a quarter. You install [bob-the-fixer](https://github.com/parrik/bob-the-fixer) — one command, a Claude Code plugin — and type `/migrate-spring-boot-3`.

Bob scans `git log` on main for `Bob-Step:` commit trailers, finds none for this skill, and runs step 01 (precheck): tests green on main, working tree clean, on Spring Boot 2.7+, all good. Step 02 is `javax.* → jakarta.*`. Bob prints the explanation the migration author wrote — *Spring Boot 3 moved off the javax namespace; the AST pattern is unambiguous; expect hundreds of import lines touched* — runs the codemod, shows you the diff, runs your tests. It commits with `Bob-Step: migrate-spring-boot-3/02-jakarta-imports` in the trailer block, opens a draft PR titled `chore(migration): step 02 — javax→jakarta imports`, and stops.

You merge it through your normal review. The merge commit's trailer is now in main's `git log`. Whenever you're ready — that day, that week, next quarter — you run `/migrate-spring-boot-3` again. Bob re-scans the log, sees the step-02 trailer, advances to 03. Same shape. Through to step 07.

That's it. Seven small reviewable PRs, paced by you, explained as they happen, merged through your normal protocol. The platform team never opened a PR.

![/migrate-spring-boot-3 walking through the first three steps — install, precheck, jakarta-imports, properties — with the publisher-authored explanation prose printed before each codemod runs. Real recording, ~34 seconds.](/demo/bob-walkthrough.gif)

Or [walk it step-by-step in the etude](/etudes/anti-cascader/install-bob/) — same example, paced for reading, all seven steps with each step's explanation prose held on screen long enough to read.

## Why this matters

[Part II](/puzzles/migrations-gritql-codemod/) named the failure mode. The cascade has a structure: operator-pushed PRs land in receiving teams' queues; the receiving team didn't author the change, doesn't trust the diff, can't pace it; the PRs sit; the operator chases; the long tail never closes. Six months later the dashboard says 87% and the holdouts are someone's problem forever.

The thesis of this part is one sentence: **the cascade isn't gravity**. It is a function of which side of the migration is pulling. Flip every load-bearing arrow and the artifact changes shape. Bob is one instance of the flipped shape, shipped today.

## The four arrows

Bob inverts each one. I'll walk them.

**Operator-push → team-pull.** The platform team doesn't open PRs. They publish a skill. The team installs it when *they* are ready, and the migration starts in their session, on their clock. This posture is old — Python's `2to3` has shipped this way for over a decade, OpenRewrite OSS has, jscodeshift has. What's new is the channel: a skill the team's coding agent already knows how to invoke.

**Single-shot → choreographed.** Spring Boot 2.7 → 3 is not one PR. In bob it is seven steps — a precheck gate, four deterministic codemods, one hybrid LLM-assisted step, a final integration gate. Each step is its own PR. State lives in `git log` — every step's commit carries a `Bob-Step:` trailer, and bob derives "what's done?" by scanning the default branch. Two teammates running bob on the same migration in parallel see the same step state because state lives in `git log`, not in a sidecar file. Pause on a Tuesday, resume in two weeks, hand the repo to a colleague — same answer. The cost is real: 7 PR cycles per repo, 7 CI runs, 7 reviewer pings. The win is each diff is small enough that a human will actually read it.

**Do the work → teach while doing.** This is the load-bearing one. Every step ships with a publisher-authored explanation that bob prints into the team's session before running the codemod. Not generated. Not a wall of generic docs. Prose written once by the migration author and shipped verbatim. The team reads what's about to change, sees the diff against *their* code, runs *their* tests, and ends the step understanding the transform. The bet is step 03 is faster because they understood step 02. The skill formats I checked across Cursor, Continue, Aider, Cody, JetBrains, Copilot, Sweep, Windsurf, and codemod's CLI — as of May 2026 — all teach the agent. None I've found surface publisher-authored prose to the developer, in the team's session, before the change.

**Engine-only → engine + receiving-team UX.** The codemod ecosystem is mature and good. jscodeshift, OpenRewrite, ast-grep, Semgrep autofix, [codemod.com](https://codemod.com) — the engine layer is well-covered. Bob isn't an engine. The codemods inside bob's steps are the same shape any AST tool produces. Bob is the wrapper above: the part that explains the migration in the team's session, paces it across PRs, and stops short of merge.

## What's shipped at v0.2.0

Honest count: 12 of 23 steps are wired through end-to-end; 11 are README stubs. `migrate-spring-boot-3` walks all seven steps — precheck gate, four deterministic codemods (jakarta imports, application property renames, build version bumps, deprecated-API rewrites), one hybrid step (hibernate-queries — flag pattern + LLM rewrite prompt + per-rewrite approval driver), and a postcheck gate. Run it against the bundled `examples/before-repo` and the seven PRs land in sequence; a fresh clone derives the same state from `git log` alone. The other three migrations have their step 02 fully shipped — including the import injection that adds the missing `from 'vitest'` or `logger` import when a file uses the symbol without one — but their later steps are README stubs. The shape is real and demoable on SB3 today; the other three are next.

## Honest lineage

What's borrowed is most of it.

Python's [`2to3`](https://docs.python.org/3/library/2to3.html) shipped team-paced migration in the standard library for years (deprecated in 3.11, removed in 3.13). [OpenRewrite OSS](https://docs.openrewrite.org/) distributes Java migration recipes via Maven Central. [jscodeshift](https://github.com/facebook/jscodeshift) treats codemods as a library devs run on their own clock. Rails `app:update` has shipped per-file `Y/n/a/q/d/m` interactive prompts for over a decade. Bob's pacing is in this lineage.

The anti-push thesis as a strategic position has its clearest published statement in Shopify's [2020 Packwerk-era engineering writing](https://shopify.engineering/shopify-monolith): *"A single centralized team can't make change happen by working against the momentum of hundreds of developers."* Their answer was Architecture Guild + embedded engineers + team-installed static analysis. Bob's positioning is in the same direction (team-pulled, team-paced) in a different shape (Claude Code skill rather than static-analysis library).

[Codemod.com](https://codemod.com) ships the engine and Campaigns — the operator-side platform-team primitive for fanning out across N repos. Kudos to them; that's a real product solving a real shape, and bob is built on the same primitives. What I'm exploring is a different layer that runs *on top* of those primitives — the team-side teacher that gets invoked in the receiving team's session. The two stack; they don't compete. If the codemod folks or any of the AI coding tools ship a team-paced + choreographed + teaching layer + per-step-PR shape on top of their engine, the field is better for it.

What's narrow and new in bob:

- **The user-facing teaching layer** wrapped around each step — publisher prose printed to the developer in their session before the change. None of the surveyed tools surface this; their skill formats all teach the agent.
- **Per-step PR cadence** — a sequence of small reviewable diffs across days or weeks, not one big interactive session and not one big diff.
- **The hybrid step** — LLM-proposed rewrites with per-rewrite human approval, alternatives, and reasoning surfaced. Rails' interactive prompts plus a model-generated proposal in front of them.

This is a UX combination on well-known primitives, aimed at a well-known pain.

## Why this couldn't have shipped earlier

Bob is a plugin. It only works because the receiving team's coding agent already knows how to install it and invoke it. Before agent-skill formats ([Claude Code](https://github.com/anthropics/skills), JetBrains Junie, GitHub Copilot Modernization, Cursor, Windsurf — all 2024–2026), the platform team had no way to hand the receiving team a packaged migration-with-teacher. They could ship a runbook the team would skim, a CLI the team would forget about, a CI bot that opened PRs at them. Skills are an early format where "here is a migration, ready when you are, with the teacher built in" is one install command for the team. Bob is one instance of that shape with the user-facing teaching surface foregrounded.

The cascade was a function of the operator having no way to ship anything *but* a PR. Skills are the second option.

## Try it

Install bob. Try `/migrate-spring-boot-3` on a Spring Boot 2.7 repo. Watch step 02 land in under a second, read the explanation, look at the diff. Tell me where it breaks.

Repo: [github.com/parrik/bob-the-fixer](https://github.com/parrik/bob-the-fixer). Four migrations at first publish: `migrate-spring-boot-3`, `migrate-junit-4-to-5`, `migrate-jest-to-vitest`, `adopt-structured-logging`. Around 2,200 lines of skill files plus a simulator. MIT-licensed. Public.

---

*Part II: [Playing with GritQL and codemod](/puzzles/migrations-gritql-codemod/) — same pattern with agents in the loop, and an afternoon poking at the engine layer.*
