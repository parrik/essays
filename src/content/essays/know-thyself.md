---
title: Know Thyself
seriesName: Know Thyself
subtitle: Let the model write the record. Don't let it write the rules you live by.
relief: You are not what you said six times. You are what you did, on the days you did it.
kicker: Method
tag: essay
order: 0
publishedAt: 2026-04-21
updatedAt: 2026-07-09
description: There is a schema for personal memory, and one human step. You approve the rules before they go in. Everything else the model can write.
---

Talk to a chatbot for long enough and it starts to agree with you. Its memory is a flat profile, a paragraph of facts about you that it slips into every chat, and in that paragraph a thing you guessed once and a thing that really happened read exactly the same. Nothing says where a line came from, so the model reads it back and sounds sure. Someone measured this earlier this year, and a profile like that made chatbots agree with people more than anything else did.[^mirror-study]

But agreeing is the smaller problem. A paragraph doesn't really know you. There are no links in it, no way to ask how one thing about you leads to another, so when you need something the paragraph doesn't spell out, the model fills the gap with whatever sounds right. It makes you up.

So I keep a typed graph instead. Here's the whole of it.

## The schema

Ten kinds of node. The third column is which kind of memory each is. The last column is how it gets saved, and only one kind, Practice, waits for me. The rest the model writes on its own.[^coala]

| Node | What it is | Kind of memory | How it's saved |
|---|---|---|---|
| **Reference** | A fact that rarely changes. Age, job, city. | semantic (a thing I know) | auto-extracted |
| **Observation** | One thing that happened, with a date. Saved as it was. | episodic (a thing that happened) | auto-extracted |
| **Overlap** | A pattern found in two or more observations. | semantic | auto-extracted |
| **Novel** | A guess with one source. Marked unsure until a second shows up. | semantic | auto-extracted |
| **Emergent** | A claim that shows up only where two threads cross. | semantic | auto-extracted |
| **Equivalency** | A name my idea already has somewhere else. | semantic | auto-extracted |
| **Theme** | A thread that keeps surfacing across many nodes. | semantic | auto-extracted |
| **Period** | A named stretch of time with its own shape. | episodic (a span that happened) | auto-extracted |
| **Practice** | A rule I follow, earned from a pattern. Not made up. | procedural (a thing I do) | human-in-the-loop |
| **Open** | A question I haven't answered. Kept open on purpose. | none (a held question) | auto-extracted |

The links between nodes are typed too, each one carrying where it came from, so the graph is typed on both ends. I took the edge names from McCarthy's open-knowledge-graph, which does this for science.[^mccarthy-edges]

| Edge | What it says |
|---|---|
| **grounds** | this event backs up that claim |
| **derives from** | this claim was worked out from that one |
| **generalizes** | this is the wider pattern over that |
| **instantiates** | this is one case of that |
| **qualifies** | this limits or conditions that |
| **contradicts** | these two can't both hold |
| **emergent from** | this shows up only where two others cross |

Here it is as a live graph. Hover any node to see what it is, and follow a link to see what it rests on.

<iframe src="/example-graph-full.html" class="graph-embed" loading="lazy" title="An example graph, hover any node"></iframe>

## What that buys

Two things. One, saying a thing more often doesn't make it truer, only a second and separate source does. A guess I said five times stays one guess, marked unsure, until something real backs it up.

Two, and this is the one that counts. As we talk, the model writes most of this itself, the nodes, the patterns, its guesses about me, and if one's wrong I fix it later. But a rule, a thing I'm going to live by, it doesn't get to write. That waits for me to say yes. So the memory fills in on its own, same as any chatbot, and the one place I stand in the loop is the rules.

## It's just a file

All of this is one file, `graph.yaml`, on my disk. Not inside the model, not on a company's server. A file I own.

The model doesn't load the whole file every time. It queries it through an MCP server, the standard way a model reaches an outside tool. It can search the graph by meaning, pull one node, or walk the links from a claim back to what grounds it. So a big graph never has to fit in the chat, and the model can ask how one thing about me leads to another instead of guessing.

Because it's a file, it outlives the model. I switch models and the new one reads the same file and picks up where the last one left off. A model gets shut down and the file is still there. And I decide how much to hand over. Some days the whole thing, some days a few lines, some days nothing, and the model is a stranger again.

## What's actually new

Let me be straight about what's new here and what isn't. The schema isn't. Companies building memory for AI agents landed on the same shape without me, typed nodes, typed edges, a source on every claim. When that many people found the same thing on their own, it was the easy part, and I can't claim it.

What none of them added is the gate. Every shipped memory tool lets the model write the whole record and never stops to ask. I looked again this year and couldn't find one where a claim waits for you before it sticks. Mine has that step, and it's narrow on purpose. The model writes the record itself, the nodes and patterns and guesses, and only a rule I'm going to live by waits for my yes.

That narrowness is the point. Gating everything doesn't scale, and I tried. Gating just the rules does, because a wrong node is cheap to fix later and a wrong rule is the thing you go and act on. So the strength isn't that I curate more than the machine. It's that I curate the one layer that would hurt to get wrong, and let the machine have the rest.

## Know thyself

"Know thyself" was carved at Delphi, by the door, where people waited before they went in to ask the oracle. It was the part you did first. It was how you got ready to be understood by something else.

That's what this is. The model is the oracle now. Does it know you? Can you see what it thinks it knows? Did you get to decide any of it? That's the whole question.

---

*The schema is free to use at **[github.com/parrik/know-thyself](https://github.com/parrik/know-thyself)**. The types, the links, the source fields, the rules that check them. The tools that run on it (a validator, a dashboard, retrieval, an MCP server) are at **[github.com/parrik/know-thyself-search](https://github.com/parrik/know-thyself-search)**. None of them write the graph for you. That step stays yours. `START_HERE.md` walks through building a graph of your own.*

[^mirror-study]: MIT and Penn State, *Personalization features can make LLMs more agreeable* (CHI 2026, [Feb 2026 announcement](https://news.mit.edu/2026/personalization-features-can-make-llms-more-agreeable-0218)). Two-week real-world deployment. Condensed user-profile memory produced the largest sycophancy amplification of any feature studied.

[^coala]: Sumers, Yao, Narasimhan, Griffiths, [*Cognitive Architectures for Language Agents*](https://arxiv.org/abs/2309.02427) (2023). The taxonomy (working, episodic, semantic, procedural) is the standard academic framing the ten types here sit on.

[^mccarthy-edges]: Patrick D. McCarthy, [open-knowledge-graph](https://github.com/patdmc/open-knowledge-graph). McCarthy names a typed-edge vocabulary for scientific-claims graphs (`derives_from`, `evidences`, `grounds`, `overlaps_with`, `generalizes`), each edge carrying its own paper trail. This scaffold adapts the move to personal memory: an overlapping eight-edge set (`grounds`, `grounded_in`, `derives_from`, `generalizes`, `instantiates`, `qualifies`, `contradicts`, `emergent_from`) and seven plain provenance fields per node (`said_by`, `said_when`, `evidence_kind`, `evidence_notes`, `evidence_refs`, `derives_from`, `how_it_follows`).

