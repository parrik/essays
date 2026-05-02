---
title: How to run a cross-cutting campaign
subtitle: The principle, the three paths, the cascade
relief: Cross-cutting changes finish or they don't. The ones that finish distribute context, not just code. Three paths through, one constraint that decides everything.
kicker: Engineering Pattern
tag: poster
order: 1
description: How to ship a cross-cutting change without spawning the cascade.
pdfUrl: /campaign-cascade.pdf
publishedAt: 2026-04-21
status: tending
etudes:
  - label: Review this PR
    url: /etudes/campaign-cascade/review-this-pr/
    note: 30 seconds in the seat where the cascade lands
---

## The principle

Cross-cutting changes finish or they don't. The ones that finish share one constraint: **every human in the loop has the context they need to act on the change in front of them.**

Skip that constraint and the work fans out into a cascade. A platform team launches a campaign across two hundred repos. The PRs stall. The director escalates to the SVP, who broadcasts a directive to merge. The directive lands with selective adoption. A tracking campaign gets spun up to chase compliance on the original campaign. Each incomplete campaign spawns the next:

> Campaign → Stall → Escalate → Directive → New Campaign → …

There are three ways to honor the principle. The pattern that breaks it — putting a human in the loop and leaving them in the dark — is what spawns the cascade.

## The three paths

*If you need a human in the loop, give them context. If you don't need a human, don't put one there.*

**Automate completely.** A codemod or script does every change end-to-end — PR creation, validation, merge — with CI verification and canary rollout. *Why it works:* no context problem because no human is in the loop. The machine does the full job. *Tradeoff:* only works for mechanically safe changes.

**Own it vertically.** A dedicated team permanently owns the cross-cutting concern with merge authority. They write the PRs, hold the context, and are accountable for completion. *Why it works:* the human in the loop has deep context and authority — no dependency on another team's bandwidth or motivation. *Tradeoff:* requires permanent headcount and org commitment.

**Enable completely.** Don't do the work for other teams. Tell each team the next action to take and give them the knowledge to do it: a migration guide, known gotchas, estimated effort, a clear owner to ask. The team builds the PR themselves. *Why it works:* the human in the loop has full context because they wrote the change. *Tradeoff:* hard to scale; works best with strong team autonomy.

Different changes reward different paths. The hard part isn't naming the three — it's picking the right one when the scenario is in front of you.

## What the failure costs

Sit in that seat for thirty seconds. An engineer staring at a PR they can't read, written by someone they don't know, in a repo they don't own.

## The dead zone

The pattern fails in the middle: you do the work for the team (create the PR) but stop short of finishing it (require them to merge).

**No automation. No vertical ownership. No enablement.** A human in the loop with no context. Campaigns stall here. The cascade starts here.

---

**Automate completely. Own it vertically. Or enable completely.**

*Honor the principle — a human in the loop has context-in-hand — and you're out of the cascade.*
