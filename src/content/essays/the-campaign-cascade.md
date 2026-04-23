---
title: The Campaign Cascade
subtitle: Why cross-cutting initiatives multiply instead of completing — and the three ways out.
kicker: Engineering Anti-Pattern
tag: poster
order: 2
description: Why cross-cutting initiatives multiply instead of completing.
pdfUrl: /campaign-cascade.pdf
publishedAt: 2026-04-21
status: evergreen
---

## The Loop

A platform team identifies a cross-cutting problem — a Java 21 upgrade across repos, a Kubernetes migration across services. They launch a campaign: open PRs across hundreds of entities owned by other teams. The PRs stall. The manager escalates to the director, who escalates to the SVP, who broadcasts a directive: *merge these PRs.* The directive lands with selective adoption. A tracking campaign is created to chase compliance on the original campaign. Each incomplete campaign spawns the next.

> Campaign → Stall → Escalate → Directive → New Campaign → …

## The Anti-Pattern: Human in the Loop, No Context in Hand

The cascade isn't caused by the shape of the work — the fan-out of PRs or the tree of escalations are just symptoms. The root cause is:

**bringing a human into the loop without giving them the context to act.**

When a PR lands in a team's repo from the outside, they don't know why it matters, what breaks if they ignore it, or how it fits into anything they're working on. Someone else wrote the code — they can't review it, can't own it. It demands effort without providing understanding. So it sits.

## Three Ways Out

*If you need a human in the loop, give them context. If you don't need a human, don't put one there.*

|            | Path A: Zero-Touch Operation | Path B: Own It Vertically | Path C: Skillset + Next Intent |
|------------|------------------------------|---------------------------|--------------------------------|
| **Approach** | Go all the way. PR creation, validation, and merge are fully automated. No human review needed. | A dedicated team permanently owns the cross-cutting concern with merge authority. It's their core job, not a side quest. They have context because they built the expertise. | Don't do the work for other teams. Tell each team the next action to take on their entity and give them the knowledge to do it themselves. |
| **Looks like** | Safe automated codemods with CI verification, canary rollout, and auto-merge on green. Zero human touchpoints. | A small platform sub-team that owns migrations end-to-end: writes the PRs, has authority to merge, and is accountable for completion. | Each entity carries a visible next intent: what to do, why it matters, a migration guide, known gotchas, estimated effort, and who to ask. The owning team builds the PR themselves. |
| **Why it works** | No context problem because no human is in the loop. The machine does the full job. | The human in the loop has deep context and authority. No dependency on another team's bandwidth or motivation. | The human in the loop has full context. They own the change because they wrote it, reviewed it, and understand it. |
| **Tradeoff** | Only works for mechanically safe changes. | Requires permanent headcount and org commitment. | Hard to scale. Works best with strong team autonomy. |

## ⚠ The Dead Zone

The anti-pattern lives in the middle: you do the work for the team (create the PR) but stop short of completing it (require them to merge).

**No automation. No vertical ownership. No enablement.** Just a human in the loop with no context. This is where campaigns die.

---

**Automate completely, own it vertically, or enable completely.**

*The only wrong move is putting a human in the loop and leaving them in the dark.*
