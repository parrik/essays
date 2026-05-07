---
title: A self was never flat
seriesName: Know Thyself
subtitle: A schema for personal memory in LLM conversations
relief: You are not what you said six times. You are what you did, on the days you did it.
kicker: Method
tag: essay
order: 0
publishedAt: 2026-04-21
description: After enough conversations, memory becomes a list. The list flattens the distinction between repetition and corroboration.
---

Alex is 41. Senior editor at the University of Chicago Press. Single parent of her daughter Mira, fourteen. Nine months into Chicago, mostly alone.

One evening she asks the model whether there's a pattern in how she handles conflict at work. The reply comes back confident, fluent, slightly wrong: she *stays in misaligned situations because she's afraid of burning the relationship.* It sounds like something she's said. It is — six times, as self-diagnosis. She asks it to show its work. Same claim, attributed to her. No independent episodes.

She had been talking to a mirror.

The mirror is now a measured effect, not a metaphor. A two-week field study of real-world LLM use found that condensed user-profile memory produced the largest sycophancy amplification of any personalization feature tested.[^mirror-study]

A model's memory is a list — bullets, facts, things you said that carried weight. A claim stated once feels the same as a claim grounded in five independent events. The fix is not more memory. The fix is shape: a memory with types, where episodes are stored separately from the patterns derived from them, where every claim carries who said it and what it rests on, and where repetition by itself cannot promote a single source into a stable claim. The scaffold — open, MIT-licensed — is at **[github.com/parrik/know-thyself](https://github.com/parrik/know-thyself)**.

<p class="dashboard-link-wrap">
  <a class="dashboard-link" href="/alex-case-study.html">
    Open Alex's full dashboard →
  </a>
</p>

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

*A worked example. Hover any node to see what it is, why Alex cares about it, and what knowing it unlocks for her. The mechanism walk below shows how the shape gets built.*

## The shape, through Alex's year

After the mirror problem, Alex wanted a memory that could not do this. Not a more careful model — a memory whose shape made repetition-as-evidence structurally impossible. The answer: the memory had to have types.

The academic frame for memory-with-types is already named. Sumers, Yao, Narasimhan, and Griffiths's *Cognitive Architectures for Language Agents* (2023) carves agent memory into working, episodic, semantic, and procedural.[^coala] The eight types here keep that split — *Observation* is the episodic type; the other seven sit on the semantic side — and refine the semantic side around one question: what makes a claim about a person earn standing.

<div class="type-cards">

<div class="type-card">
  <p class="type-card-head">
    <span class="type-card-name">Reference</span>
    <span class="type-card-tagline">what is</span>
  </p>
  <p class="type-card-meaning">Facts that don't change. The floor the rest of the graph stands on.</p>
  <p class="type-card-example">Forty-one. Senior editor at UChicago Press. Moved from Brooklyn last August. Divorced four years, amicable. Daughter Mira, fourteen. Older sister Helen, died at twenty-three in 2007.</p>
</div>

<div class="type-card">
  <p class="type-card-head">
    <span class="type-card-name">Observation</span>
    <span class="type-card-tagline">what happened</span>
  </p>
  <p class="type-card-meaning">An episode, dated and bounded. Stored as it was, without guessing what it meant.</p>
  <p class="type-card-example">September through November: Alex's first three months in Chicago. Mira came home quiet about a girl at lunch. The Sunday-morning run Alex had kept for six years quietly stopped. A second observation came in March: the morning of a hard acquisitions meeting, Alex had run beforehand and held her position on a book more clearly than she had in weeks. Two episodes, held separately.</p>
</div>

<div class="type-card">
  <p class="type-card-head">
    <span class="type-card-name">Overlap</span>
    <span class="type-card-tagline">the same shape, twice</span>
  </p>
  <p class="type-card-meaning">Two observations sharing one structure. The model can defend the pattern. Contrast: one claim said six ways is one derivation, not six.</p>
  <p class="type-card-example">First: running stopped, work extended, Mira struggled. Second: running came back, work stabilized, Mira climbed. One shape — <em>when the running holds, everything else holds.</em></p>
</div>

<div class="type-card">
  <p class="type-card-head">
    <span class="type-card-name">Novel</span>
    <span class="type-card-tagline">one derivation, held honestly</span>
  </p>
  <p class="type-card-meaning">A claim with a single source. The model's honesty that it is guessing — flagged tentative, waiting for a second independent stretch.</p>
  <p class="type-card-example"><em>For Alex, isolation is upstream of routine breakdown.</em> One episode supports it: she stopped responding to her two friends in Brooklyn, and the running stopped the week after.</p>
</div>

<div class="type-card">
  <p class="type-card-head">
    <span class="type-card-name">Emergent</span>
    <span class="type-card-tagline">at the intersection</span>
  </p>
  <p class="type-card-meaning">A claim that falls out only where two threads cross. Revise either side and the claim above has to be rechecked. The most interesting things live at intersections; so does the quietest drift.</p>
  <p class="type-card-example"><em>Mira's stability in this new city depends on Alex's own routine stability.</em> Not in the routine overlap alone, not in the Mira observation alone. It falls out where they cross — Mira's recovery and Alex's running returning land too close in time to be noise.</p>
</div>

<div class="type-card">
  <p class="type-card-head">
    <span class="type-card-name">Equivalency</span>
    <span class="type-card-tagline">the bridge</span>
  </p>
  <p class="type-card-meaning">A name your idea has elsewhere in literature. The equivalency node points at the outside framework without letting it swallow what you actually saw. Pointing is not importing.</p>
  <p class="type-card-example"><em>When the running holds, everything else holds</em> has a name elsewhere. Some researchers call it a keystone habit. Others, listening to the body's own steady signal, call it interoceptive stabilization.</p>
</div>

<div class="type-card">
  <p class="type-card-head">
    <span class="type-card-name">Practice</span>
    <span class="type-card-tagline">a rule the graph earned</span>
  </p>
  <p class="type-card-meaning">An operating rule derived from a descriptive node, not pulled from the air. A practice without a pattern beneath it belongs in goals or actions, not here. The trace from <em>this is the shape</em> to <em>therefore this is the rule</em> is what keeps the rule honest.</p>
  <p class="type-card-example"><em>Sunday 8–10am is protected for the running group. No work events, no family scheduling.</em> The rule lands only after the running pattern is clear and the intersection node makes the stakes legible — protecting the routine is not self-indulgence, it is operational infrastructure for everyone downstream of Alex.</p>
</div>

<div class="type-card">
  <p class="type-card-head">
    <span class="type-card-name">Open</span>
    <span class="type-card-tagline">the unanswered, kept first-class</span>
  </p>
  <p class="type-card-meaning">An ambiguity not yet resolved. Open is not indecision — it is the refusal to pretend a decision has been made. Left alone, an ambiguity crystallizes into a novel and downstream claims inherit an unexamined premise.</p>
  <p class="type-card-example"><em>Is Chicago a 2–3 year plan, or permanent?</em> Alex has not decided. Some nights she talks as if permanent, other nights as if temporary.</p>
</div>

</div>

The types are the binding principle: episodic and semantic memory held in distinct stores, not collapsed.[^prior]

A neighboring proposal — Andrej Karpathy's *LLM Wiki*, posted as a gist on April 4 — keeps memory in plain markdown and lets the model edit itself, with a lint loop to catch contradictions and orphan pages.[^karpathy-wiki] The wiki is a real fix for one drift: the lint catches contradictions the flat list cannot, and the gist's `sources/` convention does carry per-page provenance. It does not fix the other drift — repetition reading as evidence — because there is no typed slot for *one source repeated N times* versus *N independent groundings*.

## The operating rule

> **Attribution ≠ confidence.**

Repetition feels like corroboration. It isn't. Six conversations saying the same thing is one derivation repeated six times, not six pieces of evidence. The schema forces this into the memory itself: a novel cannot quietly become an overlap. It waits for a new, independent observation.

A second neighboring proposal lands harder. The Memanto paper (arXiv, April 23) keeps memory as typed vectors only — thirteen categories, no graph — and beats graph hybrids on LongMemEval (89.8%) and LoCoMo (87.1%).[^memanto] On fact-retrieval QA, types-without-edges wins, and on that axis Memanto is right: the benchmarks reward recall — *which fact comes back when you query for it?* — and a vector store with strong typing answers that question well. But the question this essay is asking is different. Recall measures whether the fact comes back, not whether one derivation got mistaken for six. A vector store that returns the same claim five times still cannot tell you the claim rests on one source, repeated.

## What the graph lets her see

Nine months in, Alex's graph has shape. A few dozen nodes, each carrying its own record of where the claim came from.

<iframe src="/example-graph-spine.html" class="graph-embed graph-embed-short" loading="lazy" title="Spine subset of Alex's graph — hover any node"></iframe>

*The spine — load-bearing observations and the claims that rise from them.*

**The spine.** Four or five observations carry most of her interpretations. The first three months in Chicago is referenced by four later nodes. Load-bearing. If it were miscoded — if what she had felt was a specific grief, not isolation — those four downstream nodes would need revisiting. Finding the spine is finding where a correction cascades.

**The fragile ones.** Novels without a second instance. *Isolation-upstream-of-routine* is one. Might be true. Might be a story told about one stretch of time. She can see: *these three things I have been quietly believing about myself are inferred from one evening in October.*

**The open questions.** *Chicago 2–3 years or permanent* does not get quietly decided on a tired night. It sits there until she chooses to answer it.

**The risk corridor.** Some of the most useful claims are ones she would never generate on purpose. Intersection readings marked *low probability, high consequence* — a Mira crisis that forces a return East, the drinking trajectory crossing a visible line again, a leadership change at the press flipping her way of holding positions from asset to liability. She did not know any of these as a list until the graph rendered them. None is a prediction; each is a corridor to watch. Full set in [Alex's dashboard](/alex-case-study.html).

A typed graph with provenance can tell you things you never said.

## What outlasts the model

Alex's graph is a YAML file. It lives on her laptop. She owns it. When she switches models, the new one reads the graph and picks up the thread. When a model gets retired, the graph stays where it is. The primitive landed in shipped infrastructure this month: Anthropic's memory tool exposes persistence as a client-side directory at `/memories` — a YAML graph lives there as a file; graph operations are text-edits against the YAML.[^managed-memory]

But the schema's structural work is dissolving into model capability. Hand a current frontier model a year of raw journal text and it will identify the entities, attribute claims to their sources, weight confidence by how each source is framed, surface provenance chains on demand. The typing the graph was doing is now an inference-time operation. Per-node, Alex's hand-curated graph is more reliable than what a model would synthesize from her notes alone — because she chose what landed there. But the *capability* of producing typed-with-provenance structure from messy text is no longer scarce.

Which means the durable thing is not the schema. It is the discipline of refusing to let the model write the graph. The discipline has two faces.

The mechanical face is the rules: a novel waits for a second observation, an open question stays open, repetition does not promote. These exist because models, given drafting privileges, will collapse the distinctions the typing makes. They will smooth a single source into a stable claim because confident prose reads better than tentative prose, and once smoothed, downstream nodes inherit that confidence. The mechanism is mundane — sycophantic feedback loops compound — but the consequence is that an unguarded model with a memory ends up with a graph that says everything you'd like to be true about yourself.

The philosophical face is harder. Even when the typing is mechanically correct, the choice of what counts as Alex's own claim about Alex is hers. Models can identify entities, attribute claims to sources, and weight confidence; they cannot, and should not, decide which claim stands as a thing she'll keep. A graph someone else wrote is not your graph. The schema is the trace of that choice, not the product.

The vocabulary is what travels. McCarthy's open-knowledge-graph schema names the edges of a typed-claims graph and gives each a paper trail.[^mccarthy-edges] This scaffold takes that move to personal memory: typed nodes for the eight kinds of claim a person can make about themselves, eight typed edges between them (`grounds`, `grounded_in`, `derives_from`, `generalizes`, `instantiates`, `qualifies`, `contradicts`, `emergent_from`), and the same paper-trail discipline. The legend's solid and dotted lines are two of those — `grounds` and `emergent_from`. Nodes are the nouns; the edges are verbs. Shared vocabulary is what lets two people compare disciplines.

Which is also the privacy story. The memory is not inside the model. It is in a file she keeps. The model only sees what she hands it. Some conversations she opens with the whole graph. Some with just the spine. Some with nothing — the model is a stranger again. She decides what gets known, every time.

## The thing

The Delphic maxim γνῶθι σεαυτόν — *know thyself* — was inscribed in the forecourt of the temple of Apollo, where visitors entered before consulting the oracle. The oracle is the interlocutor; know-thyself, in this reading, is the preparation for being understood by one.

Whether *we* know what they know about us, and whether they know how they know it, is the only question that matters.

---

*The schema is MIT-licensed at **[github.com/parrik/know-thyself](https://github.com/parrik/know-thyself)** — eight node types, eight typed edges, provenance, validation rules. Tooling (validator, dashboard, retrieval, MCP server) at **[github.com/parrik/know-thyself-search](https://github.com/parrik/know-thyself-search)**. `START_HERE.md` walks through building a graph of your own.*

[^prior]: Episodic vs semantic memory as separate stores: Tulving, *Episodic and Semantic Memory* (1972) — the binding principle the schema operationalizes. Provenance triples: [RDF](https://www.w3.org/TR/rdf11-concepts/) (W3C, 2014), [PROV ontology](https://www.w3.org/TR/prov-overview/) (W3C, 2013), [Claude citations API](https://docs.anthropic.com/en/docs/build-with-claude/citations). Patrick D. McCarthy's [open-knowledge-graph](https://github.com/patdmc/open-knowledge-graph) develops the necessity theorems and *attribution ≠ confidence* for scientific-knowledge graphs. Park et al., *Generative Agents* (UIST 2023), separates observation from reflection in agent memory.

[^mirror-study]: MIT and Penn State, *Personalization features can make LLMs more agreeable* (CHI 2026, [Feb 2026 announcement](https://news.mit.edu/2026/personalization-features-can-make-llms-more-agreeable-0218)). Two-week real-world deployment; condensed user-profile memory produced the largest sycophancy amplification of any feature studied.

[^coala]: Sumers, Yao, Narasimhan, Griffiths, [*Cognitive Architectures for Language Agents*](https://arxiv.org/abs/2309.02427) (2023). The taxonomy — working / episodic / semantic / procedural — is the canonical academic framing the eight node types here refine on the semantic side.

[^managed-memory]: Anthropic, [memory tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool) (Apr 8 2026). Client-side persistence exposed as a `/memories` directory the model can `view` / `create` / `str_replace` / `insert` / `delete` / `rename`; a YAML graph fits the primitive without adaptation.

[^mccarthy-edges]: Patrick D. McCarthy, [open-knowledge-graph](https://github.com/patdmc/open-knowledge-graph). McCarthy names a typed-edge vocabulary for scientific-claims graphs (`derives_from`, `evidences`, `grounds`, `overlaps_with`, `generalizes`) with each edge carrying its own paper trail. This scaffold adapts the move to personal-memory: a different but overlapping eight-edge set (`grounds`, `grounded_in`, `derives_from`, `generalizes`, `instantiates`, `qualifies`, `contradicts`, `emergent_from`) and seven flat English provenance fields per node (`said_by`, `said_when`, `evidence_kind`, `evidence_notes`, `evidence_refs`, `derives_from`, `how_it_follows`).

[^karpathy-wiki]: Andrej Karpathy, *LLM Wiki* (gist, Apr 4 2026). Plain-markdown self-edited memory with a lint loop for duplicates and contradictions; no types, no provenance. The lint catches duplicates the flat list cannot — and still has no slot for the distinction between *said* and *grounded*.

[^memanto]: *Memanto: Typed Semantic Memory with Information-Theoretic Retrieval for Long-Horizon Agents* (arXiv:2604.22085, Apr 23 2026). Thirteen-category vector memory, no graph; reports 89.8% on LongMemEval and 87.1% on LoCoMo, beating graph-hybrid baselines on QA recall. The benchmarks measure fact retrieval, not corroboration provenance.
