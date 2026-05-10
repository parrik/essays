---
title: Playing with GritQL and codemod
seriesName: The Campaign Cascade
subtitle: The cascade, transferred to agent fleets — and GritQL + the codemod CLI as the engine underneath
relief: Distributed work loses context. The cascade is what that loss looks like. Below the wrapper is its own pattern language.
kicker: Engineering Pattern
tag: essay
order: 2
parent: the-campaign-cascade
status: seedling
description: How the cascade pattern transfers when the workers are AI agents — and a first pass at GritQL and the codemod CLI as the engine layer beneath bob.
publishedAt: 2026-05-10
surprise: The dead zone reproduces inside one operator running a fleet — same shape, smaller scale. And a future bob can host GritQL inside its codemods without changing the wrapper's job.
coAuthoredWith:
  - Claude Opus 4.7
etudes:
  - label: Spawn the fleet
    url: /etudes/campaign-cascade/operator-bottleneck/
    note: Watch the review queue saturate as N agents fan out
  - label: Write the gate
    url: /etudes/campaign-cascade/write-the-gate/
    note: Pre-merge invariants for an agent-spawned PR
---

[Part I](/puzzles/the-campaign-cascade/) named the cascade in human teams running cross-cutting campaigns. **The same pattern lives inside one engineer running a fleet of agents.** Same principle. Same three paths. Same dead zone — at smaller scale.

The fact that the rule survives the substrate change is what makes the original observation worth keeping. *Distributed work loses context.* The cascade is what that loss looks like. Whether the workers are silicon or carbon, the pattern is the same and the fix is the same.

## The principle, restated

> Every entity in the loop has the context they need to act on the change in front of them.

Two things sharpen when the substrate flips.

First — **agents fail at context-acquisition more loudly than humans.** A teammate without context will ask, stall, or push back. An agent without context produces fluent, plausible work that has the wrong shape. The gate has to be the artifact, not the conversation; the agent cannot be relied on to escalate.

Second — **the loop is now polyglot.** A single cross-cutting campaign can have humans reviewing PRs that agents wrote that another agent reviewed first. *Every entity* covers all three.

## The three paths, new mechanics

*If you need a worker in the loop, give them context. If you don't need one, don't put one there.*

**Automate completely.** Home turf for fleets. Codemods, lockfile bumps, mechanical migrations across N repos.[^lsc] Stripe migrated 3.7M lines of Flow to TypeScript in a single PR — pre-LLM, codemod-driven, the same shape extended.[^stripe] What changed in the LLM era is the *generation* of the codemod, not the path itself: an agent can now author the migration script from a natural-language description, lowering the cost of the codemod.[^codemod] *Why it works:* the worker is the machine; CI is the context check. *Tradeoff:* still only mechanically safe changes — the path narrows when the migration requires judgment per file.

**Own vertically.** Historically required permanent headcount. With capable agents, a single engineer with orchestration can occupy this role for many cross-cutting concerns at once. The vertical team is now one operator plus the fleet they orchestrate. GitHub Copilot's `/fleet` command, Claude Code subagents with `run_in_background`, and tools like Codemod.com's specialized agents all ship the operator-as-vertical-team primitive.[^github-fleet][^claude-subagents] The path didn't change; its cost did. *Why it works:* the operator holds context and authority; the fleet inherits both per-task. *Tradeoff:* the operator becomes the bottleneck — see the dead zone below.

**Enable completely.** The migration guide, the known gotchas, the clear owner — same artifact category, different reader. For agents the reader-shape is `AGENTS.md` at the repository root,[^agents-md] `CLAUDE.md` for tool-specific conventions, MCP servers exposing the project's primitives,[^mcp] and skill files (`SKILL.md` folders that load on demand).[^skills] Same enablement category, different reader. *Why it works:* the agent writes the PR; the operator only stands in for the team that doesn't yet exist. *Tradeoff:* writing for an agent reader is its own discipline — vague directives that read fine to a human increase inference cost without changing behavior.[^agents-md-roi] The artifact has to mean something on a cold open.

## The dead zone, single-operator edition

The middle path collapses the same way it always did, except the cascade now lives inside one person.

The operator spawns N agents. The agents open N PRs. There is no automated merge orchestration, no quality gate the operator trusts, no watchdog. The PRs stall — not in another team's queue, but in the operator's own review queue. They escalate to themselves. They merge ad-hoc. Quality drift surfaces a week later. They spawn cleanup agents to chase the original campaign.

> Spawn → Stall → Self-escalate → Ad-hoc merge → Cleanup campaign → …

Same shape. Same diagnosis. Smaller scale.

The numbers cooperate with the framing. Faros's 2026 DORA telemetry across ~22,000 developers reports **98% more PRs merged** with AI tools and **median review time up 441%** versus pre-AI baselines.[^faros] Engineering throughput went up; the bottleneck moved. Burak Dede names the corollary directly: *"code production is no longer the bottleneck — the velocity of AI coding agents has moved the bottleneck further downstream."*[^dede]

The cascade lives downstream now.

## Quality gates are the enablement artifact for the operator

In Part I, the operator-as-reviewer wasn't a hot path — review was distributed across teams. With a fleet, the operator becomes the reviewer for every PR the fleet opens. Without a quality gate they trust, every PR is a context-acquisition task: read the diff, simulate the consequences, decide. The bottleneck moves from PR creation to PR review, and the operator stalls on their own work.

**Quality gates — pre-merge checks, semantic invariants, runtime probes — are the artifact that *enables the operator*.** Cloudflare's internal AI code review system illustrates the shape at scale: up to seven specialized reviewer agents covering security, performance, code quality, documentation, release management, and compliance with their internal Engineering Codex, coordinated by a higher-tier judge model. From March 10 to April 9 2026 the system ran **131,246 reviews across 48,095 merge requests in 5,169 repositories**, averaging $1.19 per review.[^cloudflare-scale] The fleet reviews the fleet; the coordinator posts a single structured comment. The operator enters the loop only when the gate explicitly hands them a decision.

The third path needs the artifact in both directions. Enablement for the agent that writes (CLAUDE.md, AGENTS.md, MCP, skills). Enablement for the operator who decides (gates, coordinators, structured review). A fleet without operator-side enablement is the dead zone wearing a fancier costume.

## What the substrate change sharpens

Two things, both already present in Part I but only legible from the other side.

**Distributed work loses context.** Not human work — *distributed* work. The cascade is what that loss looks like at scale. The principle survived a substrate change because the loss is structural, not human.[^codified-context]

**The dead zone is the same five steps at every scale.** Spawn, stall, escalate, ad-hoc merge, cleanup campaign. The org-scale version takes quarters and burns careers. The single-operator version takes a weekend and burns a Saturday. *Smaller scale, same diagnosis.*

---

## Below the wrapper — playing with GritQL and codemod

The arrows above keep pointing at the engine layer — codemods, mechanical rewrites, the deterministic substrate the fleet needs to lean on. [Part III](/puzzles/bob-the-fixer-as-anti-cascader/) names the wrapper above that engine: bob's team-paced, teach-while-doing UX. The engine itself is mature: [jscodeshift](https://github.com/facebook/jscodeshift), [OpenRewrite](https://docs.openrewrite.org/), [ast-grep](https://ast-grep.github.io/), Semgrep autofix, [codemod.com](https://codemod.com).

I had not actually used the codemod toolchain end-to-end. I had used ast-grep inside bob's transforms. I had read GritQL examples. I had not opened a fresh repo and run `codemod run` on a real thing.

So this is that. An afternoon. Two tools. Notes.

### What the two things are

**GritQL** is a query language for source code. You write a pattern that looks like the code you want to match, with metavariables (`$foo`) for the holes, and a rewrite block (`=>`) for what it becomes. The engine parses your repo into ASTs across [tree-sitter languages](https://github.com/tree-sitter), runs your pattern, and applies the rewrite. The pitch: a single language across JS, TS, Python, Java, Go, etc., instead of one codemod tool per ecosystem.

**codemod** (the CLI) is the runner above it — the thing that picks up `.grit` files, finds your repo files, applies the pattern, shows you a diff, lets you commit. It's the developer-facing surface; GritQL is what you write into it.

Both ship from [codemod.com](https://codemod.com), which also runs a *registry* of published codemods and a *campaigns* platform for operator-side fanout across N repos.

### The first toy

I wanted the simplest possible thing. Console.log to logger.info. Same rewrite bob's `adopt-structured-logging` step 02 does, by hand, in TypeScript.

In GritQL it is, roughly:

```grit
language js

`console.log($args)` => `logger.info($args)`
```

Three lines. The `language js` declaration tells the engine which tree-sitter grammar to load. The backticks are pattern syntax; the inside is a code shape with a metavariable. Run with `codemod run`. It scans your repo, finds the matches, shows the diff. You approve. You commit.

That is *much* nicer than the ast-grep TypeScript transform in bob's `replace-prints/transform.ts`. The TypeScript version is 33 lines: imports, language hook, pattern compile, edit collection, commit. The GritQL version is the *pattern itself*.

### Where it starts to pinch

The console.log toy is the postcard. Real codemods are messier.

**Mapping one symbol to several.** Bob's `replace-prints` maps `console.log → logger.info` AND `console.info → logger.info`. Two-to-one. In GritQL, you write two patterns, both rewriting to the same thing. Fine. But the explanation prose — *why* `console.log` collapses into `logger.info` and not `logger.debug` — does not live in the pattern. It lives somewhere else, or nowhere.

**Conditional rewrites.** Bob's `migrate-junit-4-to-5` step 02 has an explicit ordering: rewrite `BeforeClass` before `Before`, otherwise `@BeforeClass` gets partially rewritten to `@BeforeEachClass`. GritQL handles this — patterns are deterministic, rewrites are scoped — but the *reasoning* for the ordering, again, lives outside the pattern.

**Import injection.** When bob's adopt-logging rewrites `console.log` to `logger.info`, the file might not import `logger`. The transform should add the import. Bob's TypeScript transform documents in a comment that it *should* do this and doesn't. GritQL has primitives for inserting nodes — adding a top-of-file import is expressible. Whether it's *idiomatic* GritQL or whether you reach for something else is the kind of thing I'd want to verify against the real docs before claiming.

**Cross-file reasoning.** Most things one wants from a real codemod stay inside one file. But the moment a transform needs to know "is `logger` already defined somewhere in scope, possibly imported from a sibling file?" — that is not what tree-sitter-driven pattern languages are built for. They are syntactic, not semantic. OpenRewrite-style type-aware recipes are the other end of that spectrum.

### What bob is doing that GritQL is not

This is the load-bearing observation. After playing for an hour the layering became sharp:

GritQL is a *pattern language*. The codemod CLI is a *runner*. Together they replace the TypeScript-glue layer inside one of bob's steps. That is real value — the transform in `adopt-structured-logging/replace-prints/transform.ts` could be a three-line `.grit` file plus a workflow declaration.

What they do not replace:

- The *publisher-authored explanation* bob prints to the developer's session before the transform runs. The `.grit` file is the rule, not the teaching.
- The *step sequencing* across PRs. One `.grit` file is one rewrite. Bob's `migrate-spring-boot-3` is seven steps. The codemod CLI runs codemods; bob runs a *migration* — a sequence with state in `git log`.
- The *hybrid LLM step*. GritQL is deterministic by design. Bob's hibernate-queries flag pattern is real GritQL territory; the LLM-proposed-rewrite-per-site loop on top of it is not.

So a future bob can host GritQL *inside* its step-02 codemods instead of hand-rolled TypeScript. The wrapper is still doing the wrapper's job. The engine got smaller and faster to write.

That feels like the right cut.

### What I want to do next

Three follow-ups, none done in this sitting:

1. **Rewrite one bob step in GritQL.** Take `migrate-jest-to-vitest/rename-imports`, currently 50 lines of TypeScript, and replace it with a `.grit` file plus a workflow. Compare bytes, compare clarity, compare what the diff feels like to review. The result is either "yes, swap" or "no, here's the load-bearing reason TypeScript wins" — both are findings.

2. **Try a destructuring-import pattern.** The jest-to-vitest transform's hardest part is `import { describe, it, jest as vi } from '@jest/globals'` and its four positional variants (jest alone, leading, trailing, middle). I want to see what that looks like in GritQL. My prior is *much* shorter; my prior is also that I'm wrong about how much shorter.

3. **Walk the codemod registry.** See what's published. See the shape of the prose that accompanies each registry entry. The closest published comparison to bob's "teach while doing" is whatever the registry surfaces — and that's the apples-to-apples I owe the reader.

### Where I break (engine half)

This half is a seedling on top of a published diagnosis. The shape of my engagement with these tools as of writing:

- I have read GritQL examples and the [Grit pattern docs](https://docs.grit.io/) but have not built a non-trivial codemod end-to-end against a real repo.
- The "three-line `console.log` codemod" I quote is the postcard example; whether the real syntax in current GritQL matches what I wrote needs verifying against `docs.grit.io` before publish.
- I claim "GritQL has primitives for inserting nodes — adding a top-of-file import is expressible." That is *probably* true; I have not written the pattern that does it.
- I claim the codemod CLI is the developer-facing runner and registry surface. The exact UX of `codemod run`, `codemod publish`, and the registry browser flow I'm describing from memory of the website, not from a fresh session.
- I have not pinned versions. GritQL and the codemod CLI are evolving; specific syntax (`language js` declaration, backtick pattern delimiters) may have changed by the time this lands. Re-verify before publish.
- The "Wrap GritQL inside bob's step-02 codemods" claim is architecturally plausible and not yet attempted. The first follow-up bullet above is the experiment that proves or breaks it.

The honest version of this half is: **I have a thesis about layering, and I want to play with the engine to see if the thesis holds.** When I do the three follow-ups, the seedling becomes a real claim. Until then it is what it says it is — notes from an afternoon under a published diagnosis.

---

*Honor the principle — every entity in the loop has context-in-hand — and you stay out of the cascade. One substrate change is not a proof of substrate-invariance, but it is enough to suspect the original observation was structural rather than local. The engine below the wrapper is its own pattern language to learn, and bob can host it without changing what bob is.*

*Part I: [Running a cross-cutting campaign](/puzzles/the-campaign-cascade/) — where the cascade was first named.*

*Part III: [Migrations don't have to cascade](/puzzles/bob-the-fixer-as-anti-cascader/) — bob-the-fixer as the flipped shape, shipped today.*

[^lsc]: Hyrum Wright et al., [*Large-Scale Changes*](https://abseil.io/resources/swe-book/html/ch22.html), in *Software Engineering at Google* (O'Reilly, 2020), Ch 22. The historical anchor for the automate path: at Google's scale, almost all LSCs are generated and merged by automated tooling, not humans. The path's preconditions — atomic safety, idempotent application, mechanical correctness — predate the LLM era.

[^stripe]: Stripe, [*Migrating millions of lines of code to TypeScript*](https://stripe.dev/blog/migrating-to-typescript) and the open-source [Flow→TypeScript codemod](https://github.com/stripe-archive/flow-to-typescript-codemod). 3.7M lines converted in a single PR (March 6, 2017); 6.5M+ lines total. The codemod, not the agent fleet, was the load-bearing primitive — but the path is the same.

[^codemod]: Codemod, [*Solving Enterprise Code Maintenance with Specialized Agents*](https://codemod.com/blog/codemod-and-coding-agents). Migration knowledge captured as reusable micro-agents, some authored by AI from natural-language descriptions. The shift from codemod-as-script to codemod-as-agent lowers the cost of *generating* the migration without changing the path's preconditions.

[^github-fleet]: GitHub Blog, [*Run multiple agents at once with /fleet in Copilot CLI*](https://github.blog/ai-and-ml/github-copilot/run-multiple-agents-at-once-with-fleet-in-copilot-cli/) (2026). Multi-agent dispatch as a first-class CLI primitive — the operator-as-orchestrator pattern shipped as a verb.

[^claude-subagents]: Anthropic, [*Create custom subagents*](https://code.claude.com/docs/en/sub-agents). Each subagent runs in its own context window with custom system prompt and tool access; multiple subagents can dispatch in parallel. The map-reduce pattern as project primitive.

[^agents-md]: [agents.md](https://agents.md/) — open Markdown spec for agent-readable project files. README for agents: build commands, conventions, testing rules, constraints the agent cannot infer. Adopted across Codex, Factory, Builder, Augment, Kilo, and others as a vendor-neutral integration surface.

[^mcp]: [Model Context Protocol](https://modelcontextprotocol.io/) — open standard introduced by Anthropic in November 2024, donated to the Linux Foundation's Agentic AI Foundation in December 2025. Tools / Resources / Prompts as the three primitives a server exposes; the substrate beneath agent retrieval is now governed as shared infrastructure.

[^skills]: Anthropic, [*Equipping agents for the real world with Agent Skills*](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills) and the [public skills repository](https://github.com/anthropics/skills). `SKILL.md` folder format with YAML frontmatter; loads on demand. Hundreds of internal skills in production at Anthropic by April 2026.

[^agents-md-roi]: Augment Code's analysis of 2,500 repositories ([How to Build Your AGENTS.md (2026)](https://www.augmentcode.com/guides/how-to-build-agents-md)) finds developer-written AGENTS.md files improve task success rates ~4% and reduce agent-generated bugs 35–55%. LLM-filled AGENTS.md from general knowledge increase inference cost 20–23% with no quality benefit — vagueness is worse than absence.

[^faros]: Faros AI, [*DORA Report 2025 Key Takeaways*](https://www.faros.ai/blog/key-takeaways-from-the-dora-report-2025) and [*AI Acceleration Whiplash*](https://www.faros.ai/research/ai-acceleration-whiplash) (2026 telemetry, ~22,000 developers). 98% more PRs merged; review time grew 91% in 2025 data and 441% in 2026 telemetry. Org-level DORA metrics flat — individual throughput up, system throughput unchanged. Faros frames the gap as "Acceleration Whiplash."

[^dede]: Burak Dede, [*The Pull Request is Dead: Surviving the AI Code Avalanche*](https://burakdede.com/blog/the-pull-request-is-dead-surviving-the-ai-code-avalanche/). The downstream-bottleneck framing: code production stops being scarce; review and merge orchestration become the binding constraint. Adjacent: [Latent Space's *RIP Pull Requests*](https://www.latent.space/p/ainews-rip-pull-requests-2005-2026) and the Bottleneck review tool ([areibman/bottleneck](https://github.com/areibman/bottleneck)) — a native PR client built specifically for parallel agent-spawned reviews.

[^cloudflare-scale]: Cloudflare, [*Orchestrating AI Code Review at scale*](https://blog.cloudflare.com/ai-code-review/) (April 2026). Seven specialized reviewer agents (Sonnet 4.6 / GPT-5.3 Codex tier) coordinated by an Opus 4.7 / GPT-5.4 judge that deduplicates findings and posts a single structured review. 131,246 runs across 48,095 merge requests in 5,169 repositories from March 10 to April 9 2026; median runtime 3:39, mean cost $1.19. The fleet reviewing the fleet, with the human in the loop only on judge-flagged decisions.

[^codified-context]: arXiv [2602.20478](https://arxiv.org/abs/2602.20478), *Codified Context: Infrastructure for AI Agents in a Complex Codebase*. Three-component substrate — hot-memory constitution, retrieval hooks, cold-memory knowledge base — plus 19 specialized domain-expert agents. Names the same problem this essay names ("agents fail because they operate on inconsistent views of shared state") at the level of architecture rather than process.
