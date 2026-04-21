---
title: Know Thyself
subtitle: A schema for personal memory in LLM conversations
kicker: Method
tag: essay
order: 0
description: After enough conversations, memory becomes a list. The list flattens the distinction between repetition and corroboration.
---

After enough conversations with a model, its memory of you starts to look like a list.

A list isn't bad. Lists are what memory looks like when it has no shape. But the list has a specific failure mode that goes invisible fast: a claim stated once feels the same as a claim stated five times, which feels the same as a claim grounded in five independent events. The distinction between *I said this repeatedly* and *this has been independently confirmed* collapses to nothing. After a year, the model believes things about you that rest on a single inference it made early on and has politely restated back to you ever since.

The fix is not more memory. It is shape.

---

Start small. Imagine a person — call her Alex. Alex told her model she moved to a new city for a director role, and that the first three months were hard: no friends, child struggling at school, long hours, stopped running. That is an *episode*. A specific lived event, dated, contained, a thing that happened.

Separately, Alex has said across many conversations that she thinks her physical routine is load-bearing for everything else. That is an *interpretation* — a theory about why certain patterns show up. Interpretations are cheap. You can produce them all day without new evidence.

A flat list puts these on the same footing. A shaped memory does not.

The typed scheme distinguishes seven kinds of node. Three carry the weight most of the time.

*References* are biographical facts — where you were born, who you married, what you do. Single-source, verifiable in principle.

*Observations* are specific episodes. The three hard months after the move. The first Sunday at the new running group. The conflict with the senior colleague in March. Each one dated, contained, lived.

*Overlaps* are patterns grounded in two or more *independent* observations — not the same claim restated, but the same shape recurring across different events.

The other four matter at the edges. *Novel* nodes are interpretations that rest on a single derivation; they must carry a tentative flag and an explicit caveat block naming how they could be wrong. *Emergent* nodes are claims that only precipitate at the intersection of two or more existing nodes — no single parent alone produces them. *Equivalency* nodes bridge to external theoretical frameworks. *Open* nodes preserve the questions you have wondered about without answering, kept first-class so they do not quietly collapse into novels.

Every node carries a provenance triple: who said it, what it rests on, how it was derived. Every edge between nodes carries one too.

---

The operating rule, adapted from Patrick McCarthy's [open-knowledge-graph](https://github.com/patdmc/open-knowledge-graph) schema, is:

> **Attribution ≠ confidence.**

This is the move that does the work.

Repetition feels like corroboration. It is not. If Alex has said across six conversations that she "stays in misaligned situations because she is afraid of burning the relationship," that is one derivation repeated six times — not six independent pieces of evidence. Real confidence accumulates only from *independent* grounding: different episodes, different contexts, different types of evidence. A claim made once by the model and echoed back by Alex twelve times is still single-source.

The schema forces this distinction into the structure of the memory. A node whose evidence is `derived-inference` from a single episode cannot quietly become a pattern. It can only move from `novel` to `overlap` when a new, independent observation lands.

This sounds bureaucratic. It is the opposite. Without it, a model that is polite and attentive drifts into a subtle kind of hallucination — it believes things about the person it is talking to, confidently, because it has said those things and the person did not object. With it, the model knows which claims it can lean on and which it is holding tentatively. It can tell you the load-bearing ones — the observations most of your interpretations rest on, so a wrong observation does not quietly corrupt downstream claims. It can tell you the fragile ones — the novel interpretations with explicit caveats. It can flag the emergent ones — insights that only appeared at the intersection of two things you held simultaneously. It can preserve the open questions you have been quietly answering with plausible-sounding novels.

---

Nothing in this schema is new, exactly.

It borrows from Patrick McCarthy's open-knowledge-graph — the provenance triple, the confidence tiers, the emergent-at-intersection idea. From W3C PROV-O, the formal vocabulary for revisions. From Toulmin's argument model, the *warrant* — the reasoning between evidence and claim, stated as a separable assumption that can be challenged on its own terms. From Luhmann's Zettelkasten, atomicity and link density. From the rationalist epistemic-status convention, tagging effort and genre. What it adds is a first-class *observation* node — because personal graphs, unlike scientific ones, treat episodes as things that get reinterpreted, not just as evidence for propositions.

What it produces is closer to an older thing: a Renaissance commonplace book. Structured personal notes, typed and linked, organized for retrieval and return. The difference is that a commonplace book was private. This one is designed to be readable by an AI you are talking with.

The Delphic maxim γνῶθι σεαυτόν — *know thyself* — was carved on the temple wall as advice to visitors before they consulted the oracle. The oracle is the interlocutor; know-thyself is the preparation for being understood by one. If we are going to keep having long conversations with systems that remember us, the question of whether *we* know what they know about us, and whether they know how they know it, is not decorative. It is the thing.

The scaffold is open and MIT. If any of it is useful, take it, modify it, discard it. The method is the point, not the artifact.
