---
title: Running a cross-cutting campaign
seriesName: The Campaign Cascade
subtitle: Automate, own vertically, or enable horizontally — three paths through a multi-repo migration
relief: Cross-cutting changes finish or they don't. The ones that finish distribute context, not just code. Three paths through, one constraint that decides everything.
kicker: Engineering Pattern
tag: poster
order: 1
description: How to ship a cross-cutting change without spawning the cascade.
publishedAt: 2026-04-21
updatedAt: 2026-05-08
etudes:
  - label: Review this PR
    url: /etudes/campaign-cascade/review-this-pr/
    note: 30 seconds in the seat where the cascade lands
---

## The principle

Cross-cutting changes finish or they don't. The ones that finish share one constraint: **every entity in the loop has the context they need to act on the change in front of them.** *Entity*, not human — teammate, script, or agent, the same rule holds. The examples below run on humans because that's where the cascade was first observed; [Part II](/puzzles/the-campaign-cascade-with-agents/) walks the same principle into a single-operator agent fleet.

Skip that constraint and the work fans out into a cascade. A platform team launches a campaign across two hundred repos. The PRs stall. The director escalates to the SVP, who broadcasts a directive to merge. The directive lands with selective adoption. A tracking campaign gets spun up to chase compliance on the original campaign. Each incomplete campaign spawns the next:

> Campaign → Stall → Escalate → Directive → New Campaign → …

## The three paths

*If you need a worker in the loop, give them context. If you don't need one, don't put one there.*

**Automate completely.** A script (or a codemod — a program that rewrites source code mechanically) does every change end-to-end — PR creation, validation, merge — with CI verification and canary rollout. *Why it works:* no context problem because no human is in the loop. The machine does the full job. *Tradeoff:* only works for mechanically safe changes.

**Own it vertically.** A dedicated team permanently owns the cross-cutting concern with merge authority. They write the PRs, hold the context, and are accountable for completion. *Why it works:* the entity in the loop has deep context and authority — no dependency on another team's bandwidth or motivation. *Tradeoff:* historically required permanent headcount and org commitment. With capable agents, a single engineer with orchestration can occupy this role for many cross-cutting concerns. The path didn't change; its cost did. Vertical ownership is now affordable as a single-person stance, not just a team-shaped commitment.

**Enable completely.** Don't do the work for other teams. Tell each team the next action to take and give them the knowledge to do it: a migration guide, known gotchas, estimated effort, a clear owner to ask. The team builds the PR themselves. For agent readers, the same category takes a different form — `AGENTS.md`, `CLAUDE.md`, MCP servers, skill files. Same enablement, different reader. *Why it works:* the entity in the loop has full context because they wrote the change. *Tradeoff:* hard to scale; works best with strong team autonomy.

## The dead zone

The pattern fails in the middle: you do the work for the team (create the PR) but stop short of finishing it (require them to merge).

**No automation. No vertical ownership. No enablement.** An entity in the loop with no incentive to acquire the context. Campaigns stall here. The cascade starts here.

---

*Honor the principle — every entity in the loop has context-in-hand — and you're out of the cascade.*

*Part II: [the same cascade, with agents in the loop](/puzzles/the-campaign-cascade-with-agents/) — what changes when the workers are silicon.*
