---
title: Know Thyself
subtitle: A schema for personal memory in LLM conversations
kicker: Method
tag: essay
order: 0
description: After enough conversations, memory becomes a list. The list flattens the distinction between repetition and corroboration.
publishedAt: 2026-04-21
updatedAt: 2026-04-23
status: tending
---

*This essay accompanies an open, MIT-licensed scaffold for building this kind of memory with a model: **[github.com/parrik/know-thyself](https://github.com/parrik/know-thyself)**. The essay is the argument; the scaffold is the tool.*

<div class="graph-legend" aria-label="How to read the graph">
  <div class="legend-title">How to read the graph</div>
  <ul class="legend-nodes">
    <li><span class="chip chip-ref">R</span><strong>reference</strong> — biographical fact</li>
    <li><span class="chip chip-obs">O</span><strong>observation</strong> — dated event</li>
    <li><span class="chip chip-ovl">P</span><strong>overlap</strong> — pattern across observations</li>
    <li><span class="chip chip-nov">N</span><strong>novel</strong> — tentative, single-derivation</li>
    <li><span class="chip chip-emg">E</span><strong>emergent</strong> — claim at an intersection</li>
    <li><span class="chip chip-eqv">EQ</span><strong>equivalency</strong> — bridge to external framework</li>
    <li><span class="chip chip-prc">PR</span><strong>practice</strong> — operating method</li>
    <li><span class="chip chip-opn">OQ</span><strong>open</strong> — unresolved question</li>
  </ul>
  <ul class="legend-edges">
    <li><span class="edge-swatch edge-grounds"></span>solid — grounds</li>
    <li><span class="edge-swatch edge-emergent"></span>dotted — emergent from</li>
  </ul>
</div>

<iframe src="/example-graph-full.html" class="graph-embed" loading="lazy" title="Alex's full example graph — hover any node"></iframe>

*A worked example. Hover any node to see what it is, why Alex cares about it, and what knowing it unlocks for her. The essay below explains why memory needs this shape.*

After enough conversations with a model, its memory of you starts to look like a list.

A list isn't bad. Lists are what memory looks like when it has no shape. But the list has a specific failure mode that goes invisible fast: a claim stated once feels the same as a claim stated five times, which feels the same as a claim grounded in five independent events. The distinction between *I said this repeatedly* and *this has been independently confirmed* collapses to nothing. After a year, the model believes things about you that rest on a single inference it made early on and has politely restated back to you ever since.

The fix is not more memory. It is shape.

---

Consider two claims. The first: *Alex moved to a new city last August, and the first three months were hard — working long hours, her child struggling at school, the running routine she had kept for years stopped.* Specific. Dated. A thing that happened.

The second: *Alex's physical routine is load-bearing for everything else.* Interpretive. A theory. Something Alex and the model have said back and forth for six months.

A flat list puts these on the same footing — one line each in the memory store. But the interpretation is cheap. You can produce interpretations all day without new evidence. The episode is the thing the interpretation rests on. If the episode is miscoded, the interpretation crumbles. If the interpretation is wrong, the episode remains.

A shaped memory makes the distinction structural.

---

*Reference* is what's biographical and verifiable. Where you were born. Who you married. What you do.

*Observation* is what happened. The three hard months after the move. The first Sunday at the new running group. The conflict with the senior colleague in March. Each one dated, each one contained.

*Overlap* is a pattern grounded in two or more **independent** observations. Not the same claim restated — the same *shape* recurring across different events. Alex's running routine stopped, then work extended and her child struggled. Her running routine restarted, then work stabilized and her child's grades recovered. Two episodes, same shape. That's an overlap. Her saying "routine matters to me" five times is not.

Those three carry the weight. Four more handle the edges.

*Novel* is an interpretation resting on a single derivation. The schema requires it to carry a `tentative: true` flag and an explicit `caveats:` block naming how it could be wrong. *Emergent* is a claim that precipitates only at the intersection of two existing nodes, not in either alone. *Equivalency* is a bridge to an external theoretical framework — a way of saying *this pattern instantiates something already well-described elsewhere*. *Open* is for the questions you have wondered about without answering, kept first-class so they do not quietly collapse into novels.

Every node carries a provenance triple: who said it, what it rests on, how it was derived. Every edge carries one too.

---

Here is what that distinction looks like in YAML:

```yaml
- id: O01-first-three-months
  type: observation
  name: "First three months in new city — isolation and overwhelm"
  statement: |
    Sep–Nov 2024: working long hours, child struggling at school,
    no friends yet, stopped the running routine.
  provenance:
    attribution: { source: "Alex, self-report", date: "2024-12" }
    evidence: { type: self-report }

- id: O04-grades-recovered
  type: observation
  name: "Child's grades recovered in spring semester"
  statement: |
    Spring 2025: grades recovered to pre-move levels, coinciding with
    Alex re-establishing her own routine.
  provenance:
    attribution: { source: "Alex + report cards", date: "2025-05" }
    evidence: { type: external-record }

- id: P01-routine-as-regulation
  type: overlap
  name: "Physical routine is load-bearing for Alex's stability"
  statement: |
    When routine breaks down, other things deteriorate proportionally;
    when it returns, they stabilize. Not preference — structural.
  provenance:
    evidence:
      type: pattern-across-cases
      references: [O01-first-three-months, O04-grades-recovered]
    derivation:
      from: [O01-first-three-months, O04-grades-recovered]
      method: "induction across independent instances"

- id: N01-isolation-as-early-warning
  type: novel
  tentative: true
  name: "Isolation is an early-warning signal, not a neutral state"
  statement: |
    PROPOSED: for Alex, extended periods without meaningful social
    contact appear upstream of routine breakdown.
  provenance:
    evidence:
      type: derived-inference
      references: [O01-first-three-months]
  caveats: |
    Could be wrong: O01 conflates isolation with several other
    changes. Only one detailed episode on record; needs an
    independent second.
```

Two observations. One overlap grounded in both. One novel grounded in only the first, flagged tentative, with a caveat that names what could falsify it. The overlap could become stronger with more instances. The novel cannot become a pattern until a second, *independent* episode arrives — not the same claim restated, but a different event with the same shape.

---

What falls out of a graph like this, once it has some mass, is worth naming explicitly.

**The spine.** A handful of nodes carry most of the interpretations. In Alex's graph, `O01-first-three-months` is referenced by four later nodes — the overlap about routine, the novel about isolation, the emergent about her child, and a practice around the Sunday run. That is the spine. If `O01` turns out to be miscoded — maybe "isolation" was really about one specific colleague, not a general state — four downstream nodes need to be revisited. Finding the spine is finding the load-bearing observations, so that a correction at the ground knows exactly where to cascade.

<iframe src="/example-graph-spine.html" class="graph-embed graph-embed-short" loading="lazy" title="Spine subset of Alex's graph — hover any node"></iframe>

*The spine — eleven of eighteen nodes. Observations sit at the ground; overlaps and emergents rise from them. Hover any node for what it is and what knowing it unlocks.*

**Emergent nodes.** Some claims only exist at an intersection. *Child's stability in this new city depends on Alex's routine stability* is not present in the overlap about routine alone — that one is just about Alex. It is not present in the observation about the child's grades recovering alone — that one is just about the child. At the intersection, a different thing precipitates. The node is marked `emergent` with both parents cited in `precipitates_from`, so if either parent gets revised, the emergent is flagged for re-derivation. The useful claims are usually the ones that don't come out of a single piece of evidence.

**Equivalency bridges.** Sometimes a pattern is already well-described in an external literature — trauma theory, attachment, `sīla`, whatever happens to apply. The `equivalency` type names the bridge without flattening your observation into it. *This is like X in that framework* is a weaker, more honest claim than *this reduces to X*. The observation is almost always more specific than the external concept.

**Open questions.** Open exists so the things you have wondered about without answering don't quietly collapse into novels. *Is the move a 2–3 year plan or a permanent relocation?* — if that question prematurely crystallizes into a confident interpretation, a dozen downstream claims inherit an unexamined premise. Keeping it as `open` preserves the uncertainty as a first-class citizen.

A complete worked example — Alex across eighteen nodes and all eight types, with full provenance — is in the scaffold at [`example-graph.yaml`](https://github.com/parrik/know-thyself/blob/main/example-graph.yaml). Running `render.py` over it produces a diagram of every node, a load-bearing-spine subset, and a validation file that flags missing provenance. The interactive graph at the top of this essay is rendered from that file.

---

The operating rule, adapted from Patrick McCarthy's [open-knowledge-graph](https://github.com/patdmc/open-knowledge-graph), is:

> **Attribution ≠ confidence.**

This is the move that does the work.

Repetition feels like corroboration. It isn't. If Alex has said across six conversations that she "stays in misaligned situations because she is afraid of burning the relationship," that is one derivation repeated six times, not six pieces of evidence. The model agreed politely each time. Nothing new has landed.

Real confidence accumulates only from *independent* grounding: different episodes, different contexts, different evidence types. The schema forces this into the structure of the memory itself. A node whose evidence is `derived-inference` from a single episode cannot quietly become a pattern. It can only move from `novel` to `overlap` when a new, independent observation lands.

This sounds bureaucratic. It is the opposite.

Without it, a model that is polite and attentive drifts into a subtle kind of hallucination — confident about things that rest on thin inference, because those things have been said and not objected to. With it, the model can tell you the load-bearing observations — the ones most of your interpretations rest on, so a wrong episode doesn't corrupt downstream claims. It can tell you the fragile ones, with their explicit caveats. It can preserve the open questions you have been quietly answering with plausible-sounding novels.

---

The scaffold is open, MIT-licensed, at **[github.com/parrik/know-thyself](https://github.com/parrik/know-thyself)**. Paste `START_HERE.md` into a conversation with a model that has meaningful memory of you, and it walks through the construction in phases: inventory references and observations; identify patterns; name the novel interpretations tentatively; find the emergent ones; preserve the open questions; add equivalency bridges if relevant; name the practices you have adopted from all this. You get a typed YAML graph, a visual diagram, and a list of which observations a correction would cascade from.

None of the pieces are new. The provenance triple, the confidence tiers, and the emergent-at-intersection framing come from Pat McCarthy's scientific-claims schema. The *warrant* field — the reasoning between evidence and claim, stated as a separable assumption — is from Toulmin. Atomicity and link density come from Luhmann's Zettelkasten. Revisions borrow from W3C PROV-O. Effort and genre tags come from the rationalist epistemic-status convention. What the scaffold adds is a first-class *observation* node, because personal graphs, unlike scientific ones, treat episodes as things that get reinterpreted, not just as evidence for propositions.

What it produces is closer to an older thing: a Renaissance commonplace book. Structured personal notes, typed and linked, organized for retrieval and return. The difference is that a commonplace book was private. This one is designed to be readable by an AI you are talking with.

---

The Delphic maxim γνῶθι σεαυτόν — *know thyself* — was carved on the temple wall as advice to visitors before they consulted the oracle. The oracle is the interlocutor; know-thyself is the preparation for being understood by one.

If we are going to keep having long conversations with systems that remember us, the question of whether *we* know what they know about us, and whether they know how they know it, is not decorative.

It is the thing.

---

## Notes since launch

*Added April 23, 2026. This essay is tended, not finished — I'll keep adding short notes below when the working version of the method turns up something worth naming.*

**Sub-categories, not new types.** After a couple of weeks of building with the schema on a real graph, five patterns emerged as useful sub-categories of *reference* — not new node types: *canary* (evidence-backed leading indicator with a real citation), *lens* (mental-model frame applied to other nodes — Lindy, Circuit Breakers, Ulysses Pact), *experiment* (runnable method with evidence base), *filter* (anti-pattern for a specific domain), and *forecast* (time-horizon inference, flagged tentative). Each extends the schema by name instead of adding a new type. Resist minting new types; the schema ages faster than the content.

**The NOW node.** A single node at the center of the graph with `type: now`, containing current priorities and pointers to the rest. First thing you read when the graph is open. Nothing fancy — just a top-of-stack that prevents "where do I start?" paralysis. Came out of Dan Shipper's Roam critique: backlinks didn't produce revisit. A NOW node + an auto-render hook creates a daily revisit surface.

**Fractal time horizons.** Forecast nodes at 1 month / 90 days / 1 year / 10 years / 30 years / 60 years — each getting vaguer as the horizon extends. Honest speculation with the tentative flag and attribution ≠ confidence. At 60 years, the useful claim is not specifics — it's *"the ledger from here onward is what will be visible."*

**A worked extended example.** The original Alex example-graph showed every node type in use; an extended version now demonstrates sub-categories, the NOW node, and the forecast fractal. Open it full-screen →

<p style="text-align: center; margin: 1.5rem 0;">
  <a href="/alex-case-study.html" target="_blank" rel="noopener" style="font-size: 0.95rem;">
    ↗ open the extended case-study diagram full-screen
  </a>
</p>

**What breaks.** In every reviewed case of a typed knowledge graph whose practitioner wrote an honest retrospective — Luhmann, Matuschak, Roam's users per Shipper, Gordon Brander's Subconscious — the typed structure depreciated faster than the raw notes. Simon Willison's zero-schema TILs (576 entries over 6 years) have outlasted every typed-graph project. The schema is an enhancement; flat markdown is the honest fallback. The test is not how the graph grew, but whether you revisit it.
