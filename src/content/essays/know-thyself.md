---
title: Know Thyself
subtitle: A schema for personal memory in LLM conversations
kicker: Method
tag: essay
order: 0
status: tending
description: After enough conversations, memory becomes a list. The list flattens the distinction between repetition and corroboration.
pdfUrl: /know-thyself.pdf
---

After a year of conversation with the same model, Alex caught it confidently telling her something about herself that wasn't true — and she could trace exactly how it got there.

This essay is the argument. The scaffold — open, MIT-licensed — is at **[github.com/parrik/know-thyself](https://github.com/parrik/know-thyself)**.

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

*A worked example. Hover any node to see what it is, why Alex cares about it, and what knowing it unlocks for her. The essay below explains why memory needs this shape.*

## The mirror problem

One evening in May, Alex asked the model a simple thing: *was there a pattern in how she handled conflict at work?* She was nine months into Chicago, an editor at UChicago Press. She had said the word *conflict* into the chat maybe a dozen times across those months. The model had a lot to draw on.

The reply came back confident, fluent, slightly wrong.

It told her she had a tendency to *stay in misaligned situations because she was afraid of burning the relationship.* Three supporting examples. The sentence sounded like something she had said. It was — six or seven times, across several evenings, sometimes as self-diagnosis, sometimes as shorthand for a more complicated feeling she did not have better words for. It was a thing she kept reaching for. It was not, and had never been, a pattern the model had any evidence for.

She did something most users never do. She asked the model to show its work. *How do you know that?*

The model politely produced the list. Six conversations. The same claim, attributed to her. No independent episodes. No specific events. Nothing but her own restatement bounced back at her with a patient nod each time.

She had been talking to a mirror.

## Why the default shape fails

This happens by default. When a model remembers you, it stores a list — bullets it judged important, facts about your life, things you said that seemed to carry weight. A list is what memory looks like when it has no shape, and for a while it works fine. But the failure mode goes invisible fast.

A claim stated once feels the same as a claim stated five times, which feels the same as a claim grounded in five independent events. *I said this repeatedly* and *this has been independently confirmed* collapse to the same line. After a year of conversation, the model believes things about you that rest on a single inference it made early and has politely restated ever since. You, across those same conversations, have absorbed its polite restatements as agreement. You start quoting yourself back through it.

The fix is not more memory. It is shape.

## The shape, through Alex's year

*After Alex saw the mirror problem, she wanted a memory that could not do this. Not a more careful model. A memory whose shape made the drift structurally impossible.* The answer was that the memory had to have types.

**Reference — what is.** Alex was forty-one. Senior editor at UChicago Press, books in sociology and memoir. Moved from Brooklyn to Chicago last August for the job. Divorced four years, amicable enough. Daughter Mira, nine, at Kenwood. These were facts. The model could carry them without thinking, and the rest of the graph could stand on them. They were the floor.

**Observation — what happened.** Each episode got its own node, with a date and a boundary. September through November: Alex's first three months in Chicago. The days were longer than she had expected. Mira came home most afternoons quiet about a girl at lunch. The Sunday-morning run Alex had kept for six years quietly stopped — she would notice at the end of a week that she had not laced up once. One episode. One timestamp. The model stored it as it was, without guessing what it meant.

A second observation came in March, and this one mattered. The morning after a hard acquisitions meeting, Alex mentioned in passing that she had run before the meeting and had held her position on a book she was fighting for more clearly than she had in weeks. The model caught that and stored it too. Two episodes, held separately.

**Overlap — the same shape, twice.** In the first episode, her running stopped, her work extended, Mira struggled. In the second, her running came back, her work stabilized, Mira climbed. Two episodes. One shape: *when the running holds, everything else holds.* That was an overlap. The model could defend it. It had evidence.

Contrast that with the *afraid-to-burn-the-relationship* claim. That one Alex had made six times but had never grounded in a specific event. The schema refused to call it a pattern. One claim said six ways is one derivation, not six. The graph would not let it become an overlap until a specific episode actually showed up.

**Novel — one derivation, held honestly.** *For Alex, isolation is upstream of routine breakdown, not the other way around.* One detailed episode supported it: in those first three months, she had stopped responding to the two friends back in Brooklyn who usually texted her weekly, and the running had stopped the week after. The model wrote it down, flagged it tentative, and named the caveat out loud: *could be wrong — isolation and routine-break happened together; causal direction inferred, not observed; needs an independent second.* A novel is the model's honesty that it is guessing. Alex could read the novel and see exactly which claims about her the model was still not sure about.

**Emergent — at the intersection.** *Mira's stability in this new city depends on Alex's own routine stability.* That sentence was not in the routine overlap alone; the routine overlap was about Alex. It was not in the observation about Mira's grades alone; that one was about the child. It fell out where they intersected. The timing of Mira's recovery matched the timing of Alex's running returning too closely to be noise. The model marked it with both parents. If either parent ever got revised — say, Alex noticed that Mira's shift actually tracked her teacher change, not the running — the emergent would get flagged for re-derivation. Emergent claims are where the most interesting things live. They are also the most at risk of quiet drift, which is why they are marked.

**Equivalency — the bridge.** *When the running holds, everything else holds* had a name in the literature — self-regulation researchers called it a keystone habit; embodied-cognition researchers called it interoceptive stabilization. The equivalency node pointed at the framework without swallowing Alex's specific observation into it. Pointing is not importing. What Alex had was more textured than what the literature described. The bridge was weaker than absorption, and more honest.

**Open — the unanswered, kept first-class.** *Is Chicago a 2–3 year plan, or permanent?* Alex had not decided. Some nights she talked as if it were permanent, other nights as if it were temporary, and the model had absorbed both without noticing the contradiction. Left alone, that ambiguity would crystallize into a novel — *she has accepted the relocation* — and a dozen downstream claims would inherit an unexamined premise. The open type held the question as itself: visible, unanswered. Open is not indecision. It is the refusal to pretend a decision has been made while living as if it hadn't been.

## What the graph lets her see

Nine months in, Alex's graph had shape. A few dozen nodes, each carrying its own provenance: who said it, what it rested on, how it was derived. Then the graph became something more than a record. It became an instrument.

<iframe src="/example-graph-spine.html" class="graph-embed graph-embed-short" loading="lazy" title="Spine subset of Alex's graph — hover any node"></iframe>

*The spine — load-bearing observations and the claims that rise from them.*

**The spine.** Four or five observations carried most of her interpretations. The first three months in Chicago was referenced by four later nodes: the routine overlap, the isolation novel, the Mira-stability emergent, and a practice about the Sunday morning run. That episode was load-bearing. If it turned out to be miscoded — if what she had actually felt in those months was not isolation but a specific grief about her closest friend Helen's decline, and the running stopping had never been about loneliness — those four downstream nodes would need revisiting. Finding the spine was finding where a correction would cascade.

**The fragile ones.** Novels sitting without a second instance. *Isolation-upstream-of-routine* was one. It might be true. It might be a story she had told herself about one specific stretch of time. Naming the fragility was the opposite of pretending the claim was solid. She could look at her graph and see, *these three things I've been quietly believing about myself are actually only inferred from one evening in October.*

**The open questions, still unanswered.** *Chicago 2–3 years or permanent* did not get quietly decided by a plausible-sounding novel on a tired night. It sat there until she chose to answer it.

**The forecasts.** Once a graph has enough structure, the model can project the current shape forward — a one-month forecast, a ninety-day forecast, a twelve-month forecast, a five-year forecast. Each is an emergent claim grounded in the observations, overlaps, and open questions below it. *At current trajectory, by end of July: if the running holds and no external shock, Mira is settled at Kenwood for next year, Alex commissions two more books on her list, the drinking trend is the variable to watch.* The forecast is not prophecy; it is the graph extrapolated with the same honesty it stored the past. When it misses, the miss points back at the spine, and the graph gets corrected at the level where the wrong assumption lived. Forecasts wrong for the right reason are more useful than vague ones kept safe.

**The risk corridor.** Some of the most useful claims a graph can surface are the ones you would never generate on purpose. Five intersection readings in Alex's graph marked *low probability, high consequence* — each grounded in two or three existing nodes, each tentative, each named:

1. *Mira crisis forces a return East.* An adolescent mental-health event, a social incident at Kenwood, or a sustained refusal — any of which could make the Chicago life unsustainable for reasons unrelated to Alex's work. Response capacity depends on Daniel being structurally available, which her open question about summer custody has left ambiguous.

2. *UChicago Press leadership change removes autonomy.* A new director who wants a different list shape. Alex's way of holding positions, under a leadership that didn't back her, would flip from asset to liability fast. Canary: a shift in who initiates the weekly acquisitions huddle.

3. *An old relationship surfaces.* An ex-author publishes a novel that fictionalizes a past indiscretion, or mentions it in an interview. Professional and personal exposure both. Low probability; not zero. Counter-move: the exposure surface is only the other party.

4. *The drinking crosses a visible line.* A missed dinner, a committee meeting badly handled, an incident Mira sees. The trajectory from six drinks a week to fourteen happened once, last September through November. It could happen again.

5. *A Helen-anniversary compounding event.* The September anniversary of her closest friend's diagnosis sits right where the last routine-collapse started. One bad week there could reactivate the pattern.

Alex did not know any of these as a list until the graph rendered them for her. Each is an emergent — a claim that exists only where two existing nodes meet. The routine overlap plus the Mira-stability emergent plus the open question about Daniel produce scenario one. The work identity plus the conflict observations produce scenario two. None of them is a prediction; each is a corridor to watch. The full set is visible in [Alex's dashboard](/alex-case-study.html) — hover any risk-corridor node to see its parents.

This is the thing a flat list cannot produce. A flat list has no notion of *intersection*. It can only return claims it was told. A typed graph with provenance can tell you things you never said — claims that precipitate structurally from the ones you did.

## The operating rule

The rule is older than any contemporary articulation — standard scientific epistemology, the difference between independent evidence and corroboration:

> **Attribution ≠ confidence.**

Repetition feels like corroboration. It isn't.

Six conversations saying the same thing is one derivation repeated six times, not six pieces of evidence. The model agreed politely each time. Nothing new landed. The claim could be wrong. It could be right for one part of a life and not another. It could be something said once and come to be believed by hearing it said.

Real confidence only accumulates from *independent* grounding: different episodes, different contexts, different evidence types. The schema forces this into the structure of the memory itself. A novel cannot quietly become an overlap. It waits for a new, independent observation.

This sounds bureaucratic. It is the opposite. Without it, a polite and attentive model drifts into a subtle kind of hallucination — confident about things that rest on thin inference, because those things have been said and not objected to. With it, a year in, Alex can ask the model *what do you think you know about me?* and the model can answer: *here are the claims I am most sure of, and why. Here are the ones I am guessing at. Here are the questions you have been answering with guesses instead of deciding.*

That is what it looks like to be known carefully.

## Why this shape, and why it will outlast any particular model

The types are not idiosyncratic. They are the same shape rigorous fields use to store claims: an episode (the experiment), a pattern (the replication), a tentative interpretation (the hypothesis), an intersection (the theoretical integration), a borrowed framework (the citation), an unanswered question (the open problem).

None of this is an LLM-era invention. The provenance-triple machinery has multiple lineages going back decades — RDF, PROV-O, scientific-knowledge graphs.[^prior] **What this essay puts down for personal memory is three specific extensions beyond the scientific-graph case:**

**Observation becomes a first-class node type.** In a scientific graph, observations are evidence for propositions; once a proposition is established, the observations recede. In a personal graph, observations are things that get *reinterpreted* — the first three months mean one thing in November and another in May. The schema honors this. What Alex lived, how she understood it at the time, and how the model summarized it back to her are three different layers. The types keep them straight.

**A `valid_at` axis the original framework doesn't supply.** Propositions about a person aren't permanently valid the way physical-law propositions are. McCarthy's necessity arguments run through selection-under-competition; personal-memory graphs aren't under that pressure. The temporal logic has to come from epistemic humility instead — every claim about a person carries a validity window that decays unless re-grounded.

**An inverted edge-density prediction.** The original framework predicts mature graphs become edge-dense over time. True for science, where new findings keep slotting into existing structure. *False for personal psychology*, where new life events spawn new nodes — a person, a loss, a pattern — and cross-time edges stay sparse. A forty-year-old's graph is node-dense with sparse adjacency, not edge-dense. Different shape, different design pressures.

This is why the schema will not age out with models. Claude, GPT, Gemini, and the next twenty models come and go. Each one has its own context window, its own memory policies, its own quirks.

Alex's graph is a YAML file. It lives on her laptop. She owns it. When she switches models, the new model reads the graph and continues. When a model version is deprecated, the graph does not care.

The model is the interlocutor. The graph is the memory.

Which is also the privacy story. **The information is not in the model. The information is in the file.** A graph node might say *Mira has been quiet at lunch* — that sentence is Alex's, sitting on her disk. The model only sees what she chooses to paste in for a given conversation. Some conversations she opens with the whole graph. Some with just the spine. Some with nothing — the model is back to being a stranger. The locus of memory, and therefore of exposure, is controlled by the owner. Not the vendor.

## The thing

The Delphic maxim γνῶθι σεαυτόν — *know thyself* — was carved on the temple wall as advice to visitors before they consulted the oracle. The oracle is the interlocutor; know-thyself is the preparation for being understood by one.

If we are going to keep having long conversations with systems that remember us, the question of whether *we* know what they know about us, and whether they know how they know it, is not decorative.

It is the thing.

---

*The scaffold is MIT-licensed at **[github.com/parrik/know-thyself](https://github.com/parrik/know-thyself)** — eight node types, provenance, validator, rendering. `START_HERE.md` walks through building a graph of your own.*

---

*Continue to **[Part II — Search was never about humans](/essays/know-thyself-search/)**, on retrieval over a typed personal graph when the reader is an AI agent.*

[^prior]: Provenance triples in [RDF](https://www.w3.org/TR/rdf11-concepts/) (W3C, 2004) and the [PROV ontology](https://www.w3.org/TR/prov-overview/) (W3C, 2013); the same triplet shape inside [Anthropic's Claude citations API](https://docs.anthropic.com/en/docs/build-with-claude/citations); Patrick D. McCarthy's [open-knowledge-graph](https://github.com/patdmc/open-knowledge-graph) developing the necessity theorems and the *attribution ≠ confidence* rule formally for scientific-knowledge graphs. Park et al.'s *Generative Agents* (UIST 2023) made the closely-related move in agent memory — separating observation from reflection, with reflections citing the observations they rest on.
