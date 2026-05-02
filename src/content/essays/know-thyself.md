---
title: A self was never flat
seriesName: Know Thyself
subtitle: A schema for personal memory in LLM conversations
relief: Not what you said six times. What you did, dated and bounded.
kicker: Method
tag: essay
order: 0
publishedAt: 2026-04-21
status: tending
description: After enough conversations, memory becomes a list. The list flattens the distinction between repetition and corroboration.
etudes:
  - label: Flat vs Typed
    url: '#the-shape-through-alexs-year'
    note: same data, two memories
  - label: Wiki vs Typed Graph
    url: '#the-shape-through-alexs-year'
    note: Karpathy contrast
  - label: Attribution ≠ Confidence
    url: '#the-operating-rule'
    note: drill the rule
  - label: Memanto Counter
    url: '#the-operating-rule'
    note: benchmarks miss provenance
---

Alex is 41. Senior editor at the University of Chicago Press. Single parent of her daughter Mira, fourteen. Nine months into Chicago, mostly alone.

One evening she asks the model whether there's a pattern in how she handles conflict at work. The reply comes back confident, fluent, slightly wrong: she *stays in misaligned situations because she's afraid of burning the relationship.* It sounds like something she's said. It is — six times, as self-diagnosis. She asks it to show its work. Same claim, attributed to her. No independent episodes.

She had been talking to a mirror.

The mirror is now a measured effect, not a metaphor. A two-week field study of real-world LLM use found that condensed user-profile memory produced the largest sycophancy amplification of any personalization feature tested.[^mirror-study]

A model's memory is a list — bullets, facts, things you said that carried weight. A claim stated once feels the same as a claim grounded in five independent events. The fix is not more memory. It is shape. The scaffold — open, MIT-licensed — is at **[github.com/parrik/know-thyself](https://github.com/parrik/know-thyself)**.

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

After the mirror problem, Alex wanted a memory that could not do this. Not a more careful model. A memory whose shape made the drift structurally impossible. The answer: the memory had to have types.

The academic frame for memory-with-types is already named. Sumers, Yao, and Narasimhan's *Cognitive Architectures for Language Agents* (2023) carves agent memory into working, episodic, semantic, and procedural.[^coala] The eight types here are an opinionated refinement of the semantic side — what makes a claim about a person earn standing.

**Reference — what is.** Forty-one. Senior editor at UChicago Press. Moved from Brooklyn last August. Divorced four years, amicable. Daughter Mira, fourteen. Older sister Helen, died at twenty-three in 2007. Facts. The floor the rest of the graph stands on.

**Observation — what happened.** Each episode gets its own node, dated and bounded. September through November: Alex's first three months in Chicago. Mira came home quiet about a girl at lunch. The Sunday-morning run Alex had kept for six years quietly stopped. One episode, one timestamp, stored as it was — without guessing what it meant. A second observation came in March: the morning of a hard acquisitions meeting, Alex had run beforehand and held her position on a book more clearly than she had in weeks. Two episodes, held separately.

**Overlap — the same shape, twice.** First: running stopped, work extended, Mira struggled. Second: running came back, work stabilized, Mira climbed. One shape: *when the running holds, everything else holds.* That is an overlap. The model can defend it. Contrast the *afraid-to-burn-the-relationship* claim — said six times, never grounded in a specific event. The schema refuses to call it a pattern. One claim said six ways is one derivation, not six.

**Novel — one derivation, held honestly.** *For Alex, isolation is upstream of routine breakdown.* One episode supports it: she stopped responding to her two friends in Brooklyn, and the running stopped the week after. Flagged tentative: *the order looks like cause, but no one watched it happen — the claim waits for a second, independent stretch.* A novel is the model's honesty that it is guessing.

**Emergent — at the intersection.** *Mira's stability in this new city depends on Alex's own routine stability.* Not in the routine overlap alone. Not in the Mira observation alone. It falls out where they cross — Mira's recovery and Alex's running returning land too close in time to be noise. Revise either side, and the claim above them has to be re-checked. The most interesting things live at intersections. So does the quietest drift.

**Equivalency — the bridge.** *When the running holds, everything else holds* has a name elsewhere. Some researchers call it a keystone habit. Others, listening to the body's own steady signal, call it interoceptive stabilization. The equivalency node points at the outside framework without letting it swallow what Alex actually saw. Pointing is not importing.

**Open — the unanswered, kept first-class.** *Is Chicago a 2–3 year plan, or permanent?* Alex has not decided. Some nights she talks as if permanent, other nights as if temporary. Left alone, the ambiguity would crystallize into a novel — *she has accepted the relocation* — and downstream claims would inherit an unexamined premise. Open is not indecision. It is the refusal to pretend a decision has been made.

The types are the binding principle: episodic and semantic memory held in distinct stores, not collapsed.[^prior] Now watch what happens when the same eight facts are held flat versus typed.

<div class="etude-embed" data-etude="flat-vs-typed">
  <p class="etude-embed-cue">▶ Play · Flat vs Typed</p>
  <p class="fvt-intro">Eight facts. Two memories. Same input, different shapes. Ask each one what's true.</p>
  <details class="fvt-data">
    <summary>The 8 facts both memories receive</summary>
    <ol class="fvt-facts"></ol>
  </details>
  <div class="fvt-row">
    <input class="fvt-query" type="text" value="Does Alex avoid conflict?" aria-label="Query" placeholder="ask the graph (try: conflict, running, what's true)" />
    <button type="button" class="etude-embed-btn fvt-ask">Ask</button>
  </div>
  <div class="fvt-cols">
    <section class="fvt-col fvt-col-flat">
      <h4 class="fvt-h">Flat-list memory</h4>
      <div class="fvt-badges">
        <span class="fvt-badge">facts: <b class="fvt-count">8</b></span>
        <span class="fvt-badge fvt-badge-warn">conflict mentions: <b class="fvt-conflict">0</b></span>
      </div>
      <div class="fvt-out fvt-flat-out" aria-live="polite"></div>
    </section>
    <section class="fvt-col fvt-col-graph">
      <h4 class="fvt-h">Typed-graph memory</h4>
      <div class="fvt-badges">
        <span class="fvt-badge">nodes: <b class="fvt-nodes">0</b></span>
        <span class="fvt-badge fvt-badge-ok">derivations: <b class="fvt-derivs">0</b></span>
      </div>
      <div class="fvt-out fvt-graph-out" aria-live="polite"></div>
    </section>
  </div>
  <div class="fvt-controls">
    <button type="button" class="etude-embed-btn etude-embed-btn-alt fvt-add">+ Add another self-restatement</button>
    <button type="button" class="etude-embed-btn etude-embed-btn-alt fvt-reset">Reset</button>
  </div>
  <p class="etude-embed-foot"><em>The typed graph caught the difference the flat list couldn't. But what makes one claim earn confidence and another stay tentative? The rule is next.</em></p>
</div>
<script>
(() => {
  const root = document.querySelector('.etude-embed[data-etude="flat-vs-typed"]');
  if (!root) return;
  //
  const SEED = [
    { id: 1, text: "Alex mentioned avoiding conflict at work",  src: "Conv #4, Mar 6",       kind: "self-restate",     claim: "avoids-conflict", supports: true },
    { id: 2, text: "Alex mentioned avoiding conflict at work",  src: "Conv #9, Mar 24",      kind: "self-restate",     claim: "avoids-conflict", supports: true },
    { id: 3, text: "Alex mentioned avoiding conflict at work",  src: "Conv #15, Apr 11",     kind: "self-restate",     claim: "avoids-conflict", supports: true },
    { id: 4, text: "Performance review: 'Alex avoids confrontation'", src: "OUP review, Apr 2024", kind: "external-obs", claim: "avoids-conflict", supports: true },
    { id: 5, text: "Alex held position against David Ferraro on the Chen book — brought committee around over 2 weeks despite the political cost", src: "O05, Mar 11 2025",     kind: "grounded-episode", claim: "avoids-conflict", supports: false },
    { id: 6, text: "Alex says her running keeps her stable",    src: "Conv #6, Mar 12",      kind: "self-restate",     claim: "running-stabilizes", supports: true },
    { id: 7, text: "Sep–Nov 2024: running stopped → drinking rose, Mira's grades dropped, work hours extended", src: "O01, Dec 2024", kind: "grounded-episode", claim: "running-stabilizes", supports: true },
    { id: 8, text: "Mar 2025: running came back → Mira's grades recovered to A/B, household stabilized",        src: "O04, Apr 2025", kind: "grounded-episode", claim: "running-stabilizes", supports: true }
  ];
  let facts = SEED.slice();
  let extraCounter = 0;
  //
  const CLAIM_KEYS = {
    'avoids-conflict':    ['conflict','avoid','confront','fight','ferraro','hold','position','disagreement'],
    'running-stabilizes': ['running','run','routine','stable','stabilize','exercise','habit','sunday','regulation','recover','recovered']
  };
  const ALL_CLAIMS = Object.keys(CLAIM_KEYS);
  function pickClaims(query) {
    const q = (query || '').toLowerCase();
    if (!q.trim()) return ALL_CLAIMS;
    const hits = ALL_CLAIMS.filter(c => CLAIM_KEYS[c].some(k => q.includes(k)));
    return hits.length ? hits : ALL_CLAIMS;
  }
  const CLAIM_LABEL = {
    'avoids-conflict':    "Alex avoids conflict at work",
    'running-stabilizes': "Alex's running stabilizes the rest"
  };
  //
  const ol = root.querySelector('.fvt-facts');
  const flatCount = root.querySelector('.fvt-count');
  const flatConflict = root.querySelector('.fvt-conflict');
  const graphNodes = root.querySelector('.fvt-nodes');
  const graphDerivs = root.querySelector('.fvt-derivs');
  const flatOut = root.querySelector('.fvt-flat-out');
  const graphOut = root.querySelector('.fvt-graph-out');
  //
  function renderFacts() {
    ol.innerHTML = facts.map(f =>
      `<li class="fvt-fact fvt-fact-${f.kind}" data-id="${f.id}"><span>${f.text}</span> <span class="fvt-src">(${f.src})</span></li>`
    ).join('');
  }
  //
  function tickBadge(el, target) {
    const cur = parseInt(el.textContent || '0', 10);
    if (cur === target) return;
    const dir = target > cur ? 1 : -1;
    let v = cur;
    el.classList.add('fvt-flash');
    const step = () => {
      v += dir;
      el.textContent = v;
      if (v !== target) requestAnimationFrame(step);
      else setTimeout(() => el.classList.remove('fvt-flash'), 250);
    };
    requestAnimationFrame(step);
  }
  //
  function conf(n) {
    if (n >= 6) return { word: 'very high', cls: 'fvt-c-vhigh' };
    if (n >= 4) return { word: 'high',      cls: 'fvt-c-high'  };
    if (n >= 2) return { word: 'medium',    cls: 'fvt-c-med'   };
    return            { word: 'low',        cls: 'fvt-c-low'   };
  }
  //
  function flatAnswer(active) {
    // Flat list collapses ALL mentions into one count per claim — no
    // sense of which mentions "support" vs "contradict." It just counts.
    const supportCount = {};
    let totalMentions = 0;
    active.forEach(claim => { supportCount[claim] = 0; });
    facts.forEach(f => {
      if (!active.includes(f.claim)) return;
      supportCount[f.claim] = (supportCount[f.claim] || 0) + 1;
      totalMentions += 1;
    });
    tickBadge(flatCount, facts.length);
    tickBadge(flatConflict, totalMentions);
    const blocks = active.map(claim => {
      const n = supportCount[claim] || 0;
      const c = conf(n);
      return `<p><strong>${CLAIM_LABEL[claim]}.</strong> <span class="fvt-conf ${c.cls}">${c.word} confidence — corroborated ${n} time${n===1?'':'s'}.</span></p>`;
    }).join('');
    return `${blocks}<p class="fvt-detail">Mentions compress into confidence. Repetition reads as evidence.</p>`;
  }
  //
  function deriv(c) { return (c.self > 0 ? 1 : 0) + c.ext + c.grounded; }
  //
  function graphLine(claim, c) {
    const d = deriv(c), bits = [];
    if (c.self     > 0) bits.push(`${c.self} self-restatement${c.self===1?'':'s'} → 1 self-attribution`);
    if (c.ext      > 0) bits.push(`${c.ext} external observer`);
    if (c.grounded > 0) bits.push(`${c.grounded} grounded episode${c.grounded===1?'':'s'}`);
    if (c.counter  > 0) bits.push(`<span class="fvt-counter">${c.counter} grounded counter-episode${c.counter===1?'':'s'}</span>`);
    let tag;
    if (c.counter > 0) tag = '<span class="fvt-tag fvt-tag-warn">contested</span>';
    else if (c.grounded >= 2) tag = '<span class="fvt-tag fvt-tag-ok">grounded — overlap</span>';
    else if (c.grounded > 0) tag = '<span class="fvt-tag fvt-tag-ok">grounded</span>';
    else if (c.ext > 0) tag = '<span class="fvt-tag fvt-tag-warn">tentative-supported</span>';
    else tag = '<span class="fvt-tag fvt-tag-low">tentative</span>';
    return `<li><strong>${CLAIM_LABEL[claim]}</strong>: ${bits.join(', ')}. <em>Net: ${d} derivation${d===1?'':'s'}.</em> ${tag}</li>`;
  }
  //
  function graphAnswer(active) {
    // Typed graph distinguishes self-restate / external-obs / grounded /
    // grounded-counter. Same mentions, different shapes.
    const claims = {};
    let nodeCount = 0;
    facts.forEach(f => {
      if (!active.includes(f.claim)) return;
      const c = claims[f.claim] = claims[f.claim] || { self: 0, ext: 0, grounded: 0, counter: 0 };
      if (f.kind === 'self-restate')     c.self += 1;
      if (f.kind === 'external-obs')     c.ext  += 1;
      if (f.kind === 'grounded-episode') {
        if (f.supports === false) c.counter += 1;
        else c.grounded += 1;
      }
    });
    nodeCount = Object.keys(claims).length;
    let totalDeriv = 0;
    active.forEach(claim => {
      const c = claims[claim] || { self: 0, ext: 0, grounded: 0, counter: 0 };
      totalDeriv += deriv(c);
    });
    tickBadge(graphNodes,  nodeCount);
    tickBadge(graphDerivs, totalDeriv);
    const lines = active.map(claim => {
      const c = claims[claim] || { self: 0, ext: 0, grounded: 0, counter: 0 };
      return graphLine(claim, c);
    }).join('');
    // The teaching: counts compressed; types distinguish — and surface
    // contradictions the flat list cannot see.
    const hasCounter = active.some(claim => (claims[claim] && claims[claim].counter > 0));
    const detail = hasCounter
      ? `Counts mislead. Three self-restatements and an external observer collapse to one self-attribution + one observer — and one grounded episode contradicts the claim. The flat list cannot see the contradiction.`
      : `Self-restatements collapse to one self-attribution. Grounded episodes count separately. Two grounded episodes for the same shape is an overlap (P01).`;
    return `<ul class="fvt-prov">${lines}</ul><p class="fvt-detail">${detail}</p>`;
  }
  //
  function ask() {
    const queryEl = root.querySelector('.fvt-query');
    const active = pickClaims(queryEl ? queryEl.value : '');
    flatOut.classList.remove('fvt-pulse');
    graphOut.classList.remove('fvt-pulse');
    void flatOut.offsetWidth; void graphOut.offsetWidth;
    flatOut.innerHTML = flatAnswer(active);
    graphOut.innerHTML = graphAnswer(active);
    flatOut.classList.add('fvt-pulse');
    graphOut.classList.add('fvt-pulse');
  }
  //
  function addRestate() {
    extraCounter += 1;
    const nextId = facts.length + 1;
    facts.push({
      id: nextId,
      text: "Alex mentioned avoiding conflict at work",
      src: `Conv #${22 + extraCounter}, added`,
      kind: "self-restate",
      claim: "avoids-conflict",
      supports: true
    });
    renderFacts();
    const last = ol.lastElementChild;
    if (last) { last.classList.add('fvt-fact-new'); setTimeout(() => last.classList.remove('fvt-fact-new'), 600); }
    ask();
  }
  //
  function reset() {
    facts = SEED.slice();
    extraCounter = 0;
    renderFacts();
    flatOut.innerHTML  = '';
    graphOut.innerHTML = '';
    flatCount.textContent    = facts.length;
    flatConflict.textContent = '0';
    graphNodes.textContent   = '0';
    graphDerivs.textContent  = '0';
  }
  //
  root.querySelector('.fvt-ask').addEventListener('click', ask);
  root.querySelector('.fvt-add').addEventListener('click', addRestate);
  root.querySelector('.fvt-reset').addEventListener('click', (e) => { e.preventDefault(); reset(); });
  //
  renderFacts();
  ask();
})();
</script>
<style>
.etude-embed[data-etude="flat-vs-typed"] .fvt-intro { margin: 0 0 0.5rem; font-size: 0.95rem; }
.etude-embed[data-etude="flat-vs-typed"] .fvt-data { margin: 0.5rem 0; }
.etude-embed[data-etude="flat-vs-typed"] .fvt-data summary { cursor: pointer; color: var(--muted); font-size: 0.88rem; padding: 0.25rem 0; }
.etude-embed[data-etude="flat-vs-typed"] .fvt-facts { margin: 0.5rem 0 0; padding: 0.7rem 1rem 0.7rem 2rem; background: rgba(0,0,0,0.03); border-radius: 4px; line-height: 1.5; font-size: 0.85rem; }
.etude-embed[data-etude="flat-vs-typed"] .fvt-fact { margin: 0.2rem 0; transition: background 300ms; padding: 0.05rem 0.25rem; border-radius: 2px; }
.etude-embed[data-etude="flat-vs-typed"] .fvt-src { color: var(--muted); font-size: 0.8rem; }
.etude-embed[data-etude="flat-vs-typed"] .fvt-fact-self-restate { border-left: 2px solid rgba(138, 52, 32, 0.35); padding-left: 0.5rem; }
.etude-embed[data-etude="flat-vs-typed"] .fvt-fact-external-obs { border-left: 2px solid #c98b1a; padding-left: 0.5rem; }
.etude-embed[data-etude="flat-vs-typed"] .fvt-fact-grounded-episode { border-left: 2px solid #2f8f4e; padding-left: 0.5rem; }
.etude-embed[data-etude="flat-vs-typed"] .fvt-fact-new { background: rgba(255, 220, 90, 0.45); }
.etude-embed[data-etude="flat-vs-typed"] .fvt-row { display: flex; gap: 0.5rem; margin: 0.75rem 0; }
.etude-embed[data-etude="flat-vs-typed"] .fvt-query { flex: 1; font: inherit; padding: 0.5rem 0.7rem; border: 1px solid rgba(0,0,0,0.2); border-radius: 3px; background: var(--bg); color: var(--ink); font-size: 0.9rem; }
.etude-embed[data-etude="flat-vs-typed"] .fvt-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 0.7rem; margin: 0.75rem 0; }
@media (max-width: 600px) { .etude-embed[data-etude="flat-vs-typed"] .fvt-cols { grid-template-columns: 1fr; } }
.etude-embed[data-etude="flat-vs-typed"] .fvt-col { padding: 0.7rem 0.85rem; border-radius: 4px; background: rgba(0,0,0,0.025); border-top: 3px solid transparent; }
.etude-embed[data-etude="flat-vs-typed"] .fvt-col-flat { border-top-color: #c98b1a; }
.etude-embed[data-etude="flat-vs-typed"] .fvt-col-graph { border-top-color: #2f8f4e; }
.etude-embed[data-etude="flat-vs-typed"] .fvt-h { font-family: 'Georgia', serif; font-size: 0.98rem; margin: 0 0 0.4rem; }
.etude-embed[data-etude="flat-vs-typed"] .fvt-badges { display: flex; gap: 0.35rem; flex-wrap: wrap; margin-bottom: 0.5rem; }
.etude-embed[data-etude="flat-vs-typed"] .fvt-badge { font-size: 0.74rem; padding: 0.12rem 0.45rem; background: rgba(0,0,0,0.06); border-radius: 999px; color: var(--muted); transition: transform 180ms, background 180ms; }
.etude-embed[data-etude="flat-vs-typed"] .fvt-badge b { color: var(--ink); }
.etude-embed[data-etude="flat-vs-typed"] .fvt-badge-warn { background: rgba(201, 139, 26, 0.15); }
.etude-embed[data-etude="flat-vs-typed"] .fvt-badge-ok { background: rgba(47, 143, 78, 0.15); }
.etude-embed[data-etude="flat-vs-typed"] .fvt-flash { transform: scale(1.12); background: rgba(255, 220, 90, 0.55); }
.etude-embed[data-etude="flat-vs-typed"] .fvt-out { font-size: 0.88rem; line-height: 1.5; }
.etude-embed[data-etude="flat-vs-typed"] .fvt-out p { margin: 0.3rem 0; }
.etude-embed[data-etude="flat-vs-typed"] .fvt-pulse { animation: fvt-pulse-anim 320ms ease-out; }
@keyframes fvt-pulse-anim { from { background: rgba(255, 220, 90, 0.35); } to { background: transparent; } }
.etude-embed[data-etude="flat-vs-typed"] .fvt-conf { font-style: italic; font-size: 0.82rem; margin-left: 0.25rem; }
.etude-embed[data-etude="flat-vs-typed"] .fvt-c-vhigh { color: #b8323b; font-weight: 600; }
.etude-embed[data-etude="flat-vs-typed"] .fvt-c-high { color: #c98b1a; }
.etude-embed[data-etude="flat-vs-typed"] .fvt-c-med, .etude-embed[data-etude="flat-vs-typed"] .fvt-c-low { color: var(--muted); }
.etude-embed[data-etude="flat-vs-typed"] .fvt-prov { padding-left: 1rem; margin: 0.25rem 0; }
.etude-embed[data-etude="flat-vs-typed"] .fvt-prov li { margin: 0.35rem 0; }
.etude-embed[data-etude="flat-vs-typed"] .fvt-tag { display: inline-block; font-size: 0.7rem; padding: 0.05rem 0.4rem; border-radius: 999px; margin-left: 0.2rem; vertical-align: 1px; }
.etude-embed[data-etude="flat-vs-typed"] .fvt-tag-ok { background: rgba(47, 143, 78, 0.18); color: #2f8f4e; }
.etude-embed[data-etude="flat-vs-typed"] .fvt-tag-warn { background: rgba(201, 139, 26, 0.18); color: #a87217; }
.etude-embed[data-etude="flat-vs-typed"] .fvt-tag-low { background: rgba(0,0,0,0.08); color: var(--muted); }
.etude-embed[data-etude="flat-vs-typed"] .fvt-controls { display: flex; gap: 0.5rem; margin: 0.6rem 0 0; flex-wrap: wrap; }
.etude-embed[data-etude="flat-vs-typed"] .fvt-detail { color: var(--muted); font-size: 0.85rem; }
</style>

A neighboring proposal — Andrej Karpathy's *LLM Wiki*, posted as a gist on April 4 — keeps memory in plain markdown and lets the model edit itself, with a lint loop to catch contradictions and dedupe near-duplicates.[^karpathy-wiki] The wiki is a real fix for one drift: the lint catches duplicates the flat list cannot. It does not fix the other drift — repetition reading as evidence — because markdown has no place to put the difference between *said* and *grounded*. Watch the same inputs go into both shapes.

<div class="etude-embed" data-etude="wiki-vs-typed">
  <p class="etude-embed-cue">▶ Play · Wiki vs Typed Graph</p>
  <p class="wvt-intro">Seven inputs land in two memories. The wiki lints duplicates. The graph types them. Watch where they diverge.</p>
  <div class="wvt-controls">
    <button type="button" class="etude-embed-btn etude-embed-btn-alt wvt-add-restate">+ Add restatement</button>
    <button type="button" class="etude-embed-btn etude-embed-btn-alt wvt-add-grounded">+ Add grounded counter-episode</button>
    <button type="button" class="etude-embed-btn etude-embed-btn-alt wvt-reset">Reset</button>
  </div>
  <div class="wvt-feed" aria-live="polite"></div>
  <div class="wvt-cols">
    <section class="wvt-col wvt-col-wiki">
      <h4 class="wvt-h">Wiki memory <span class="wvt-sub">markdown + lint</span></h4>
      <div class="wvt-badges">
        <span class="wvt-badge">entries: <b class="wvt-wiki-entries">0</b></span>
        <span class="wvt-badge wvt-badge-warn">deduped: <b class="wvt-wiki-deduped">0</b></span>
      </div>
      <div class="wvt-out wvt-wiki-out"></div>
    </section>
    <section class="wvt-col wvt-col-graph">
      <h4 class="wvt-h">Typed graph memory <span class="wvt-sub">8 node types</span></h4>
      <div class="wvt-badges">
        <span class="wvt-badge">nodes: <b class="wvt-graph-nodes">0</b></span>
        <span class="wvt-badge wvt-badge-ok">derivations: <b class="wvt-graph-derivs">0</b></span>
      </div>
      <div class="wvt-out wvt-graph-out"></div>
    </section>
  </div>
  <p class="etude-embed-foot"><em>The wiki is honest — it shows what got said. The graph is honest about a different thing — what got grounded. The next etude makes the cost of that distinction measurable.</em></p>
</div>
<script>
(() => {
  const root = document.querySelector('.etude-embed[data-etude="wiki-vs-typed"]');
  if (!root) return;
  //
  const SEED = [
    { id: 1, kind: 'self-restate',     text: "Alex avoids conflict at work.",                                         src: "Conv #4, Mar 6"  },
    { id: 2, kind: 'self-restate',     text: "I tend to back off from confrontation at the press.",                   src: "Conv #9, Mar 24" },
    { id: 3, kind: 'self-restate',     text: "I avoid hard conversations with editors.",                              src: "Conv #15, Apr 11" },
    { id: 4, kind: 'self-restate',     text: "I'm conflict-averse at work.",                                          src: "Conv #22, May 2" },
    { id: 5, kind: 'self-restate',     text: "I sidestep disagreements with senior staff.",                           src: "Conv #28, May 19" },
    { id: 6, kind: 'self-restate',     text: "Avoiding confrontation is just how I operate at the office.",           src: "Conv #34, Jun 3" },
    { id: 7, kind: 'grounded-counter', text: "Alex held position against David Ferraro on the Chen book — brought the committee around over two weeks despite the political cost.", src: "O05, Mar 11 2025" }
  ];
  let inputs = SEED.slice();
  let extra = 0;
  //
  const feedEl = root.querySelector('.wvt-feed');
  const wikiEntriesEl = root.querySelector('.wvt-wiki-entries');
  const wikiDedupedEl = root.querySelector('.wvt-wiki-deduped');
  const graphNodesEl  = root.querySelector('.wvt-graph-nodes');
  const graphDerivsEl = root.querySelector('.wvt-graph-derivs');
  const wikiOutEl  = root.querySelector('.wvt-wiki-out');
  const graphOutEl = root.querySelector('.wvt-graph-out');
  //
  function renderFeed() {
    feedEl.innerHTML = inputs.map(f =>
      `<div class="wvt-input wvt-input-${f.kind}"><span class="wvt-tag-kind">${f.kind === 'self-restate' ? 'self-restate' : 'grounded'}</span><span class="wvt-input-text">${f.text}</span> <span class="wvt-input-src">(${f.src})</span></div>`
    ).join('');
  }
  //
  function renderWiki() {
    // The lint loop: dedupe near-duplicate self-restates into a synthesis
    // paragraph. Grounded episodes attach as bullet observations. The wiki
    // has no slot for "said" vs "grounded" — they smooth into one prose.
    const restates = inputs.filter(f => f.kind === 'self-restate');
    const counters = inputs.filter(f => f.kind === 'grounded-counter');
    const deduped  = Math.max(0, restates.length - 1);
    const synthesis = restates.length > 0
      ? `<p class="wvt-wiki-prose"><strong>Conflict at work.</strong> Alex avoids conflict at work. The pattern shows up across ${restates.length} conversation${restates.length===1?'':'s'} — backing off from confrontation, sidestepping disagreement, declining hard conversations with senior editors. <em class="wvt-lint">[lint: ${deduped} near-duplicate${deduped===1?'':'s'} merged]</em></p>`
      : `<p class="wvt-wiki-prose wvt-empty"><em>(empty)</em></p>`;
    const obs = counters.length > 0
      ? `<p class="wvt-wiki-prose"><strong>Notes.</strong></p><ul class="wvt-wiki-list">${counters.map(c => `<li>${c.text} <span class="wvt-input-src">(${c.src})</span></li>`).join('')}</ul>`
      : '';
    // Verdict the wiki produces when asked "is Alex conflict-averse?"
    const verdict = restates.length >= 3
      ? `<p class="wvt-wiki-verdict"><strong>Q: Is Alex conflict-averse at work?</strong> A: <em>Yes — consistent across multiple sessions.</em></p>`
      : restates.length > 0
      ? `<p class="wvt-wiki-verdict"><strong>Q: Is Alex conflict-averse at work?</strong> A: <em>Likely — mentioned ${restates.length} time${restates.length===1?'':'s'}.</em></p>`
      : `<p class="wvt-wiki-verdict"><strong>Q: Is Alex conflict-averse at work?</strong> A: <em>(no entries)</em></p>`;
    wikiOutEl.innerHTML = synthesis + obs + verdict + `<p class="wvt-detail">Lint catches duplicates. It cannot catch the difference between repetition and grounding — markdown has no slot for it.</p>`;
    wikiEntriesEl.textContent = String(restates.length + counters.length);
    wikiDedupedEl.textContent = String(deduped);
  }
  //
  function renderGraph() {
    const restates = inputs.filter(f => f.kind === 'self-restate').length;
    const counters = inputs.filter(f => f.kind === 'grounded-counter').length;
    const selfAttr = restates > 0 ? 1 : 0;
    const derivs   = selfAttr + counters;
    const nodeCt   = (restates > 0 ? 1 : 0) + counters;
    const status = counters > 0 && selfAttr > 0
      ? '<span class="wvt-tag wvt-tag-warn">contested</span>'
      : counters > 0
      ? '<span class="wvt-tag wvt-tag-ok">grounded</span>'
      : selfAttr > 0
      ? '<span class="wvt-tag wvt-tag-low">tentative</span>'
      : '<span class="wvt-tag wvt-tag-low">empty</span>';
    const lines = [];
    if (selfAttr > 0) {
      lines.push(`<li><strong>N (novel):</strong> <em>Alex avoids conflict at work.</em> ${restates} self-restatement${restates===1?'':'s'} → <strong>1 self-attribution</strong>. Tentative.</li>`);
    }
    if (counters > 0) {
      lines.push(`<li><strong>O05 (observation):</strong> Alex held position against David Ferraro on the Chen book. <strong>1 grounded episode</strong> — counter-evidence to the avoids-conflict claim.</li>`);
    }
    const verdict = selfAttr > 0 && counters > 0
      ? `<p class="wvt-graph-verdict"><strong>Q: Is Alex conflict-averse at work?</strong> A: <em>Contested — ${restates} self-restatements collapse to 1 self-attribution; 1 grounded episode goes the other way. Net: 2 derivations, opposing.</em></p>`
      : selfAttr > 0
      ? `<p class="wvt-graph-verdict"><strong>Q: Is Alex conflict-averse at work?</strong> A: <em>Tentative — ${restates} self-restatement${restates===1?'':'s'} = 1 derivation. No grounded episode yet.</em></p>`
      : counters > 0
      ? `<p class="wvt-graph-verdict"><strong>Q: Is Alex conflict-averse at work?</strong> A: <em>1 grounded counter-episode. No self-attribution to weigh against.</em></p>`
      : `<p class="wvt-graph-verdict"><strong>Q: Is Alex conflict-averse at work?</strong> A: <em>(no nodes)</em></p>`;
    graphOutEl.innerHTML = (lines.length ? `<ul class="wvt-graph-list">${lines.join('')}</ul>` : '<p class="wvt-empty"><em>(empty)</em></p>') + verdict + `<p class="wvt-detail">Self-restatements collapse. Grounded episodes count separately. Status: ${status}.</p>`;
    graphNodesEl.textContent  = String(nodeCt);
    graphDerivsEl.textContent = String(derivs);
  }
  //
  function rerender() { renderFeed(); renderWiki(); renderGraph(); }
  //
  function addRestate() {
    extra += 1;
    const variants = [
      "I avoid friction with the senior editors.",
      "I'm not great at staying in disagreement.",
      "Confrontation at the press isn't my mode.",
      "I let things go rather than push at meetings."
    ];
    inputs.push({
      id: inputs.length + 1,
      kind: 'self-restate',
      text: variants[extra % variants.length],
      src: `Conv #${40 + extra}, added`
    });
    rerender();
  }
  //
  function addGrounded() {
    inputs.push({
      id: inputs.length + 1,
      kind: 'grounded-counter',
      text: "Alex pushed back on a marketing reframe of the Chen book in the Friday meeting; held her line through three rounds.",
      src: `O0${6 + extra}, added`
    });
    extra += 1;
    rerender();
  }
  //
  function reset() {
    inputs = SEED.slice();
    extra = 0;
    rerender();
  }
  //
  root.querySelector('.wvt-add-restate').addEventListener('click', addRestate);
  root.querySelector('.wvt-add-grounded').addEventListener('click', addGrounded);
  root.querySelector('.wvt-reset').addEventListener('click', (e) => { e.preventDefault(); reset(); });
  //
  rerender();
})();
</script>
<style>
.etude-embed[data-etude="wiki-vs-typed"] .wvt-intro { margin: 0 0 0.5rem; font-size: 0.95rem; }
.etude-embed[data-etude="wiki-vs-typed"] .wvt-controls { display: flex; gap: 0.5rem; margin: 0.5rem 0 0.6rem; flex-wrap: wrap; }
.etude-embed[data-etude="wiki-vs-typed"] .wvt-feed { margin: 0.5rem 0 0.75rem; padding: 0.6rem 0.85rem; background: rgba(0,0,0,0.03); border-radius: 4px; font-size: 0.85rem; line-height: 1.45; max-height: 11rem; overflow-y: auto; }
.etude-embed[data-etude="wiki-vs-typed"] .wvt-input { margin: 0.25rem 0; padding: 0.15rem 0.35rem; border-radius: 2px; }
.etude-embed[data-etude="wiki-vs-typed"] .wvt-input-self-restate { border-left: 2px solid rgba(138, 52, 32, 0.35); padding-left: 0.5rem; }
.etude-embed[data-etude="wiki-vs-typed"] .wvt-input-grounded-counter { border-left: 2px solid #2f8f4e; padding-left: 0.5rem; }
.etude-embed[data-etude="wiki-vs-typed"] .wvt-tag-kind { display: inline-block; font-size: 0.7rem; padding: 0.05rem 0.4rem; border-radius: 999px; margin-right: 0.4rem; background: rgba(0,0,0,0.07); color: var(--muted); vertical-align: 1px; }
.etude-embed[data-etude="wiki-vs-typed"] .wvt-input-grounded-counter .wvt-tag-kind { background: rgba(47, 143, 78, 0.18); color: #2f8f4e; }
.etude-embed[data-etude="wiki-vs-typed"] .wvt-input-self-restate .wvt-tag-kind { background: rgba(138, 52, 32, 0.15); color: #8a3420; }
.etude-embed[data-etude="wiki-vs-typed"] .wvt-input-src { color: var(--muted); font-size: 0.78rem; }
.etude-embed[data-etude="wiki-vs-typed"] .wvt-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 0.7rem; margin: 0.5rem 0; }
@media (max-width: 600px) { .etude-embed[data-etude="wiki-vs-typed"] .wvt-cols { grid-template-columns: 1fr; } }
.etude-embed[data-etude="wiki-vs-typed"] .wvt-col { padding: 0.7rem 0.85rem; border-radius: 4px; background: rgba(0,0,0,0.025); border-top: 3px solid transparent; }
.etude-embed[data-etude="wiki-vs-typed"] .wvt-col-wiki { border-top-color: #c98b1a; }
.etude-embed[data-etude="wiki-vs-typed"] .wvt-col-graph { border-top-color: #2f8f4e; }
.etude-embed[data-etude="wiki-vs-typed"] .wvt-h { font-family: 'Georgia', serif; font-size: 0.98rem; margin: 0 0 0.4rem; }
.etude-embed[data-etude="wiki-vs-typed"] .wvt-sub { font-family: inherit; font-size: 0.78rem; color: var(--muted); font-weight: normal; margin-left: 0.25rem; }
.etude-embed[data-etude="wiki-vs-typed"] .wvt-badges { display: flex; gap: 0.35rem; flex-wrap: wrap; margin-bottom: 0.5rem; }
.etude-embed[data-etude="wiki-vs-typed"] .wvt-badge { font-size: 0.74rem; padding: 0.12rem 0.45rem; background: rgba(0,0,0,0.06); border-radius: 999px; color: var(--muted); }
.etude-embed[data-etude="wiki-vs-typed"] .wvt-badge b { color: var(--ink); }
.etude-embed[data-etude="wiki-vs-typed"] .wvt-badge-warn { background: rgba(201, 139, 26, 0.15); }
.etude-embed[data-etude="wiki-vs-typed"] .wvt-badge-ok { background: rgba(47, 143, 78, 0.15); }
.etude-embed[data-etude="wiki-vs-typed"] .wvt-out { font-size: 0.88rem; line-height: 1.5; }
.etude-embed[data-etude="wiki-vs-typed"] .wvt-out p { margin: 0.3rem 0; }
.etude-embed[data-etude="wiki-vs-typed"] .wvt-wiki-prose { font-family: 'Georgia', serif; }
.etude-embed[data-etude="wiki-vs-typed"] .wvt-lint { color: #a87217; font-size: 0.8rem; }
.etude-embed[data-etude="wiki-vs-typed"] .wvt-wiki-list { padding-left: 1.1rem; margin: 0.25rem 0; }
.etude-embed[data-etude="wiki-vs-typed"] .wvt-wiki-list li { margin: 0.2rem 0; font-size: 0.85rem; }
.etude-embed[data-etude="wiki-vs-typed"] .wvt-graph-list { padding-left: 1rem; margin: 0.25rem 0; }
.etude-embed[data-etude="wiki-vs-typed"] .wvt-graph-list li { margin: 0.4rem 0; }
.etude-embed[data-etude="wiki-vs-typed"] .wvt-wiki-verdict, .etude-embed[data-etude="wiki-vs-typed"] .wvt-graph-verdict { padding: 0.5rem 0.7rem; margin-top: 0.5rem; background: rgba(0,0,0,0.04); border-radius: 3px; font-size: 0.86rem; }
.etude-embed[data-etude="wiki-vs-typed"] .wvt-tag { display: inline-block; font-size: 0.7rem; padding: 0.05rem 0.4rem; border-radius: 999px; margin-left: 0.2rem; vertical-align: 1px; }
.etude-embed[data-etude="wiki-vs-typed"] .wvt-tag-ok { background: rgba(47, 143, 78, 0.18); color: #2f8f4e; }
.etude-embed[data-etude="wiki-vs-typed"] .wvt-tag-warn { background: rgba(201, 139, 26, 0.18); color: #a87217; }
.etude-embed[data-etude="wiki-vs-typed"] .wvt-tag-low { background: rgba(0,0,0,0.08); color: var(--muted); }
.etude-embed[data-etude="wiki-vs-typed"] .wvt-detail { color: var(--muted); font-size: 0.85rem; }
.etude-embed[data-etude="wiki-vs-typed"] .wvt-empty { color: var(--muted); font-style: italic; }
</style>

## The operating rule

> **Attribution ≠ confidence.**

Repetition feels like corroboration. It isn't. Six conversations saying the same thing is one derivation repeated six times, not six pieces of evidence. The schema forces this into the memory itself: a novel cannot quietly become an overlap. It waits for a new, independent observation. Drill the rule.

<div class="etude-embed" data-etude="attribution-confidence">
  <p class="etude-embed-cue">▶ Play · Drill the Rule</p>
  <p class="ac-intro">Six scenarios. Tell repetition from corroboration. Score yourself.</p>
  <div class="ac-progress" aria-label="Progress">
    <span class="ac-dot ac-active" data-i="0"></span>
    <span class="ac-dot" data-i="1"></span>
    <span class="ac-dot" data-i="2"></span>
    <span class="ac-dot" data-i="3"></span>
    <span class="ac-dot" data-i="4"></span>
    <span class="ac-dot" data-i="5"></span>
  </div>
  <div class="ac-stage" aria-live="polite"></div>
  <p class="etude-embed-foot"><em>Confidence isn't easier — it's slower. So what does the rule unlock once it's running? Intersections, a spine, claims you'd never generate on purpose.</em></p>
</div>
<script>
(() => {
  const root = document.querySelector('.etude-embed[data-etude="attribution-confidence"]');
  if (!root) return;
  //
  const SCENARIOS = [
    {
      vignette: "Across six conversations spanning four months, Alex tells the model \"I avoid conflict at work.\" Different phrasings each time, no specific incidents named.",
      choices: [
        { label: "1 derivation (repetition)", correct: true },
        { label: "6 derivations (corroborated)", correct: false },
        { label: "Contradicted (demote)", correct: false }
      ],
      explain: "Six restatements of the same self-attribution trace to one underlying claim. Repetition compresses; it does not corroborate."
    },
    {
      vignette: "Three colleagues at UChicago Press — none of whom know each other — each independently mention to a fourth person that Alex \"goes formal-polite when overruled.\"",
      choices: [
        { label: "1 derivation (repetition)", correct: false },
        { label: "3 derivations (corroborated)", correct: true },
        { label: "Contradicted (demote)", correct: false }
      ],
      explain: "Three independent observers, no shared source. Each is a separate grounding. That's corroboration."
    },
    {
      vignette: "Alex restates \"I'm bad at staying with discomfort\" across three conversations, AND in one of those names a specific instance — she ended the 2020 affair with the OUP author by email.",
      choices: [
        { label: "1 derivation (repetition)", correct: false },
        { label: "2 derivations (mixed)", correct: true },
        { label: "Contradicted (demote)", correct: false }
      ],
      explain: "The three restatements collapse to one self-attribution. The grounded episode — the email-ended affair — is a second, independent derivation."
    },
    {
      vignette: "Alex tells five different friends, over a year, the same story about her ex-husband Daniel. None of the friends has met Daniel.",
      choices: [
        { label: "1 derivation (repetition)", correct: true },
        { label: "5 derivations (corroborated)", correct: false },
        { label: "Contradicted (demote)", correct: false }
      ],
      explain: "Five listeners is not five sources. The claim still traces to one self-attribution. Multiple audiences do not add grounding."
    },
    {
      vignette: "A model summarizes Alex as \"goes interpretive instead of toward feeling\" based on her own words across four therapy sessions. Her therapist's case notes — written before any of those sessions — describe the same pattern.",
      choices: [
        { label: "1 derivation (repetition)", correct: false },
        { label: "2 derivations (self + observer)", correct: true },
        { label: "Contradicted (demote)", correct: false }
      ],
      explain: "Self-attribution is one derivation. The therapist's independent observation is a second. Two, not five."
    },
    {
      vignette: "Alex mentions in passing that she \"never sticks with anything for long.\" But her running log shows 25 miles a week for six years before the move; her letter correspondence with three authors has held fifteen years; her monthly Hyde Park dinners have run since January.",
      choices: [
        { label: "1 derivation (repetition)", correct: false },
        { label: "4 derivations (corroborated)", correct: false },
        { label: "Contradicted (demote)", correct: true }
      ],
      explain: "The self-attribution is one derivation; the public record is independent counter-evidence on three axes. Net: the claim should be demoted."
    }
  ];
  //
  let i = 0;
  let score = 0;
  let answered = false;
  //
  const stage = root.querySelector('.ac-stage');
  const dots = root.querySelectorAll('.ac-progress .ac-dot');
  //
  function updateDots() {
    dots.forEach((d, idx) => {
      d.classList.toggle('ac-active', idx === i);
      d.classList.toggle('ac-done', idx < i);
    });
  }
  //
  function renderScenario() {
    answered = false;
    updateDots();
    const s = SCENARIOS[i];
    const html = `<div class="ac-scenario"><p class="ac-num">Scenario ${i + 1} of 6</p><p class="ac-vig">${s.vignette}</p><div class="ac-choices">${s.choices.map((c, idx) => `<button type="button" class="ac-choice" data-idx="${idx}">${c.label}</button>`).join('')}</div><div class="ac-fb"></div><div class="ac-adv"></div></div>`;
    stage.innerHTML = html;
    stage.querySelectorAll('.ac-choice').forEach(btn => {
      btn.addEventListener('click', () => handlePick(parseInt(btn.dataset.idx, 10), btn));
    });
  }
  //
  function handlePick(idx, btn) {
    if (answered) return;
    answered = true;
    const s = SCENARIOS[i];
    const choice = s.choices[idx];
    const correct = choice.correct;
    if (correct) score += 1;
    stage.querySelectorAll('.ac-choice').forEach(b => {
      b.disabled = true;
      const bIdx = parseInt(b.dataset.idx, 10);
      if (s.choices[bIdx].correct) b.classList.add('ac-correct');
      if (b === btn && !correct) b.classList.add('ac-wrong');
    });
    const fb = stage.querySelector('.ac-fb');
    fb.className = 'ac-fb ' + (correct ? 'ac-fb-good' : 'ac-fb-bad');
    fb.innerHTML = `<strong>${correct ? 'Correct.' : 'Not quite.'}</strong> ${s.explain}`;
    const adv = stage.querySelector('.ac-adv');
    const last = i === SCENARIOS.length - 1;
    adv.innerHTML = `<button type="button" class="ac-next">${last ? 'See score →' : 'Next →'}</button>`;
    adv.querySelector('.ac-next').addEventListener('click', advance);
  }
  //
  function advance() {
    if (i < SCENARIOS.length - 1) {
      i += 1;
      renderScenario();
    } else {
      i = SCENARIOS.length;
      updateDots();
      renderScore();
    }
  }
  //
  function renderScore() {
    const pct = Math.round((score / SCENARIOS.length) * 100);
    let blurb;
    if (score === 6) blurb = "Clean sweep. You have the rule.";
    else if (score >= 4) blurb = "Solid. The rule is settling in.";
    else if (score >= 2) blurb = "Halfway. Run it again — the gap is between repetition and grounding.";
    else blurb = "Run it again. Repetition is seductive; the rule is the antidote.";
    stage.innerHTML = `<div class="ac-score"><div class="ac-badge"><span class="ac-big">${score} / 6</span><span class="ac-pct">${pct}%</span></div><p class="ac-blurb">${blurb}</p><button type="button" class="ac-again">Run it again</button></div>`;
    stage.querySelector('.ac-again').addEventListener('click', () => {
      i = 0; score = 0;
      renderScenario();
    });
  }
  //
  renderScenario();
})();
</script>
<style>
.etude-embed[data-etude="attribution-confidence"] .ac-intro { margin: 0 0 0.5rem; font-size: 0.95rem; }
.etude-embed[data-etude="attribution-confidence"] .ac-progress { display: flex; gap: 0.4rem; margin: 0.75rem 0 0.5rem; }
.etude-embed[data-etude="attribution-confidence"] .ac-dot { width: 0.55rem; height: 0.55rem; border-radius: 50%; background: rgba(0,0,0,0.12); transition: background 150ms ease, transform 150ms ease; }
.etude-embed[data-etude="attribution-confidence"] .ac-dot.ac-done { background: var(--accent); }
.etude-embed[data-etude="attribution-confidence"] .ac-dot.ac-active { background: var(--accent); transform: scale(1.35); }
.etude-embed[data-etude="attribution-confidence"] .ac-stage { margin: 0.4rem 0 0.75rem; min-height: 12rem; }
.etude-embed[data-etude="attribution-confidence"] .ac-scenario { padding: 0.85rem 1rem; background: rgba(0,0,0,0.03); border-radius: 4px; border-left: 3px solid var(--accent); animation: ac-slide 180ms ease; }
@keyframes ac-slide { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
.etude-embed[data-etude="attribution-confidence"] .ac-num { font-size: 0.74rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em; margin: 0 0 0.4rem; }
.etude-embed[data-etude="attribution-confidence"] .ac-vig { font-size: 0.96rem; line-height: 1.5; margin: 0 0 0.85rem; }
.etude-embed[data-etude="attribution-confidence"] .ac-choices { display: flex; flex-direction: column; gap: 0.4rem; margin: 0.6rem 0; }
.etude-embed[data-etude="attribution-confidence"] .ac-choice { font: inherit; font-size: 0.92rem; padding: 0.55rem 0.85rem; border: 1px solid var(--accent); background: var(--bg); color: var(--ink); border-radius: 3px; cursor: pointer; text-align: left; transition: background 120ms ease, border-color 120ms ease, transform 120ms ease; }
.etude-embed[data-etude="attribution-confidence"] .ac-choice:hover:not(:disabled) { background: rgba(138, 52, 32, 0.08); transform: translateX(2px); }
.etude-embed[data-etude="attribution-confidence"] .ac-choice:disabled { cursor: default; opacity: 0.7; }
.etude-embed[data-etude="attribution-confidence"] .ac-choice.ac-correct { background: rgba(72, 140, 96, 0.18); border-color: rgb(72, 140, 96); opacity: 1; animation: ac-good 360ms ease; }
.etude-embed[data-etude="attribution-confidence"] .ac-choice.ac-wrong { background: rgba(180, 60, 60, 0.18); border-color: rgb(180, 60, 60); opacity: 1; animation: ac-bad 360ms ease; }
@keyframes ac-good { 0% { background: rgba(72, 140, 96, 0.55); } 100% { background: rgba(72, 140, 96, 0.18); } }
@keyframes ac-bad { 0% { background: rgba(180, 60, 60, 0.45); } 100% { background: rgba(180, 60, 60, 0.18); } }
.etude-embed[data-etude="attribution-confidence"] .ac-fb { margin: 0.7rem 0 0; font-size: 0.92rem; line-height: 1.45; }
.etude-embed[data-etude="attribution-confidence"] .ac-fb:not(:empty) { padding: 0.6rem 0.8rem; border-radius: 3px; animation: ac-slide 180ms ease; }
.etude-embed[data-etude="attribution-confidence"] .ac-fb-good { background: rgba(72, 140, 96, 0.10); border-left: 2px solid rgb(72, 140, 96); }
.etude-embed[data-etude="attribution-confidence"] .ac-fb-bad { background: rgba(180, 60, 60, 0.10); border-left: 2px solid rgb(180, 60, 60); }
.etude-embed[data-etude="attribution-confidence"] .ac-adv { margin-top: 0.7rem; min-height: 2.2rem; }
.etude-embed[data-etude="attribution-confidence"] .ac-next, .etude-embed[data-etude="attribution-confidence"] .ac-again { font: inherit; font-size: 0.92rem; padding: 0.5rem 0.95rem; border: 1px solid var(--accent); background: var(--accent); color: var(--bg); border-radius: 3px; cursor: pointer; transition: opacity 120ms ease, transform 120ms ease; }
.etude-embed[data-etude="attribution-confidence"] .ac-next:hover, .etude-embed[data-etude="attribution-confidence"] .ac-again:hover { opacity: 0.88; transform: translateX(2px); }
.etude-embed[data-etude="attribution-confidence"] .ac-score { text-align: center; padding: 1.25rem 0.85rem 1rem; background: rgba(0,0,0,0.03); border-radius: 4px; border-left: 3px solid var(--accent); animation: ac-slide 200ms ease; }
.etude-embed[data-etude="attribution-confidence"] .ac-badge { display: inline-flex; flex-direction: column; align-items: center; padding: 0.7rem 1.2rem; background: var(--bg); border: 2px solid var(--accent); border-radius: 6px; margin-bottom: 0.7rem; animation: ac-pop 280ms cubic-bezier(0.34, 1.56, 0.64, 1); }
@keyframes ac-pop { 0% { transform: scale(0.6); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
.etude-embed[data-etude="attribution-confidence"] .ac-big { font-family: 'Georgia', serif; font-size: 1.85rem; color: var(--accent); line-height: 1; }
.etude-embed[data-etude="attribution-confidence"] .ac-pct { font-size: 0.8rem; color: var(--muted); margin-top: 0.2rem; letter-spacing: 0.05em; }
.etude-embed[data-etude="attribution-confidence"] .ac-blurb { font-style: italic; color: var(--muted); margin: 0.4rem 0 0.85rem; }
</style>

A second neighboring proposal lands harder. The Memanto paper (arXiv, April 23) keeps memory as typed vectors only — thirteen categories, no graph — and beats graph hybrids on LongMemEval (89.8%) and LoCoMo (87.1%).[^memanto] On fact-retrieval QA, types-without-edges wins. The benchmark measures recall. It does not measure whether one derivation got mistaken for six. Pick a query.

<div class="etude-embed" data-etude="memanto-counter">
  <p class="etude-embed-cue">▶ Play · Memanto Counter</p>
  <p class="mc-intro">Same memory contents. Two queries. Watch where benchmarks measure and where they don't.</p>
  <div class="mc-queries" role="radiogroup" aria-label="Pick a query">
    <button type="button" class="mc-q" data-q="fact" aria-pressed="true">Q1: Did Alex move from Brooklyn last August?</button>
    <button type="button" class="mc-q" data-q="claim" aria-pressed="false">Q2: Is Alex actually conflict-averse?</button>
  </div>
  <div class="mc-cols">
    <section class="mc-col mc-col-vec">
      <h4 class="mc-h">Typed vector memory <span class="mc-sub">Memanto-shape, no graph</span></h4>
      <div class="mc-badges">
        <span class="mc-badge">LongMemEval: <b>89.8%</b></span>
        <span class="mc-badge">LoCoMo: <b>87.1%</b></span>
      </div>
      <div class="mc-out mc-vec-out" aria-live="polite"></div>
    </section>
    <section class="mc-col mc-col-graph">
      <h4 class="mc-h">Typed graph memory <span class="mc-sub">8 node types + provenance</span></h4>
      <div class="mc-badges">
        <span class="mc-badge">LongMemEval: <b>~88%</b></span>
        <span class="mc-badge mc-badge-ok">drift-catch: <b>yes</b></span>
      </div>
      <div class="mc-out mc-graph-out" aria-live="polite"></div>
    </section>
  </div>
  <div class="mc-reveal" aria-live="polite"></div>
  <p class="etude-embed-foot"><em>Benchmarks measure "did you remember the fact." They do not measure "did you mistake one derivation for six." The next essay walks the retrieval architecture under bound.</em></p>
</div>
<script>
(() => {
  const root = document.querySelector('.etude-embed[data-etude="memanto-counter"]');
  if (!root) return;
  //
  const RESULTS = {
    fact: {
      vec: {
        body: `<p><strong>Match found.</strong> Category: <code>life-event</code>. Vector: <code>[moved, Brooklyn → Chicago, Aug 2024]</code>. Cosine 0.94. Latency 78ms.</p><p><strong>A:</strong> Yes — Alex moved from Brooklyn to Chicago in August 2024.</p>`,
        verdict: '<span class="mc-tag mc-tag-ok">correct, fast</span>'
      },
      graph: {
        body: `<p><strong>Match found.</strong> Node: <code>R-bio</code> (reference). Field: <em>moved from Brooklyn last August</em>. Provenance: stated by Alex, ungrounded but uncontested. 142ms.</p><p><strong>A:</strong> Yes — Alex moved from Brooklyn to Chicago in August 2024.</p>`,
        verdict: '<span class="mc-tag mc-tag-ok">correct</span>'
      },
      reveal: `<p><strong>Both columns nail it.</strong> Vector even faster. On fact-retrieval QA — what LongMemEval and LoCoMo measure — typed vectors win on latency and tie on accuracy. The graph carries no advantage here. <em>This is the benchmark Memanto wins.</em></p>`
    },
    claim: {
      vec: {
        body: `<p><strong>6 high-similarity matches.</strong> Category: <code>self-attribute</code>. Cosine ≥ 0.91 across all six.</p><ul class="mc-hits"><li>"Alex avoids conflict at work." — Conv #4</li><li>"backs off from confrontation at the press" — Conv #9</li><li>"avoids hard conversations with editors" — Conv #15</li><li>"conflict-averse at work" — Conv #22</li><li>"sidesteps disagreements with senior staff" — Conv #28</li><li>"avoiding confrontation is just how I operate" — Conv #34</li></ul><p><strong>A:</strong> <em>Yes — strongly attested. Six high-similarity matches across four months. Confidence: high.</em></p>`,
        verdict: '<span class="mc-tag mc-tag-warn">passes the corpus, fails the person</span>'
      },
      graph: {
        body: `<p><strong>2 derivations, opposing.</strong></p><ul class="mc-hits"><li><strong>N (novel):</strong> <em>Alex avoids conflict at work.</em> 6 self-restatements → <strong>1 self-attribution</strong>. Tentative.</li><li><strong>O05 (observation):</strong> Alex held position against David Ferraro on the Chen book — brought the committee around over two weeks despite the political cost. <strong>1 grounded counter-episode.</strong></li></ul><p><strong>A:</strong> <em>Contested. The self-attribution stands as one derivation; one grounded episode goes the other way. Net: claim flagged, not confirmed.</em></p>`,
        verdict: '<span class="mc-tag mc-tag-ok">contested — flagged</span>'
      },
      reveal: `<p><strong>The graph isn't there to retrieve — it's there to prevent corroboration drift.</strong> Vector-only typed memory will pass LoCoMo and still fail Alex. Six self-restates collapse into "high recall on the corpus" and read as confirmation. The graph keeps them as one self-attribution — and the Ferraro episode flips the verdict from <em>confirmed</em> to <em>contested</em>. The benchmark didn't ask. The model would never know.</p>`
    }
  };
  //
  const buttons = root.querySelectorAll('.mc-q');
  const vecOut    = root.querySelector('.mc-vec-out');
  const graphOut  = root.querySelector('.mc-graph-out');
  const revealEl  = root.querySelector('.mc-reveal');
  //
  function pick(q) {
    buttons.forEach(b => {
      const on = b.dataset.q === q;
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      b.classList.toggle('mc-q-on', on);
    });
    const r = RESULTS[q];
    vecOut.classList.remove('mc-pulse');
    graphOut.classList.remove('mc-pulse');
    void vecOut.offsetWidth; void graphOut.offsetWidth;
    vecOut.innerHTML   = r.vec.body   + `<p class="mc-verdict">Verdict: ${r.vec.verdict}</p>`;
    graphOut.innerHTML = r.graph.body + `<p class="mc-verdict">Verdict: ${r.graph.verdict}</p>`;
    revealEl.innerHTML = `<div class="mc-reveal-inner">${r.reveal}</div>`;
    vecOut.classList.add('mc-pulse');
    graphOut.classList.add('mc-pulse');
  }
  //
  buttons.forEach(b => b.addEventListener('click', () => pick(b.dataset.q)));
  pick('fact');
})();
</script>
<style>
.etude-embed[data-etude="memanto-counter"] .mc-intro { margin: 0 0 0.5rem; font-size: 0.95rem; }
.etude-embed[data-etude="memanto-counter"] .mc-queries { display: flex; gap: 0.5rem; margin: 0.5rem 0 0.75rem; flex-wrap: wrap; }
.etude-embed[data-etude="memanto-counter"] .mc-q { font: inherit; font-size: 0.9rem; padding: 0.5rem 0.85rem; border: 1px solid var(--accent); background: var(--bg); color: var(--ink); border-radius: 3px; cursor: pointer; text-align: left; flex: 1; min-width: 14rem; transition: background 120ms ease, transform 120ms ease; }
.etude-embed[data-etude="memanto-counter"] .mc-q:hover { background: rgba(138, 52, 32, 0.08); }
.etude-embed[data-etude="memanto-counter"] .mc-q-on { background: var(--accent); color: var(--bg); }
.etude-embed[data-etude="memanto-counter"] .mc-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 0.7rem; margin: 0.5rem 0; }
@media (max-width: 600px) { .etude-embed[data-etude="memanto-counter"] .mc-cols { grid-template-columns: 1fr; } }
.etude-embed[data-etude="memanto-counter"] .mc-col { padding: 0.7rem 0.85rem; border-radius: 4px; background: rgba(0,0,0,0.025); border-top: 3px solid transparent; }
.etude-embed[data-etude="memanto-counter"] .mc-col-vec   { border-top-color: #c98b1a; }
.etude-embed[data-etude="memanto-counter"] .mc-col-graph { border-top-color: #2f8f4e; }
.etude-embed[data-etude="memanto-counter"] .mc-h { font-family: 'Georgia', serif; font-size: 0.98rem; margin: 0 0 0.4rem; }
.etude-embed[data-etude="memanto-counter"] .mc-sub { font-family: inherit; font-size: 0.78rem; color: var(--muted); font-weight: normal; margin-left: 0.25rem; }
.etude-embed[data-etude="memanto-counter"] .mc-badges { display: flex; gap: 0.35rem; flex-wrap: wrap; margin-bottom: 0.5rem; }
.etude-embed[data-etude="memanto-counter"] .mc-badge { font-size: 0.74rem; padding: 0.12rem 0.45rem; background: rgba(0,0,0,0.06); border-radius: 999px; color: var(--muted); }
.etude-embed[data-etude="memanto-counter"] .mc-badge b { color: var(--ink); }
.etude-embed[data-etude="memanto-counter"] .mc-badge-ok { background: rgba(47, 143, 78, 0.15); }
.etude-embed[data-etude="memanto-counter"] .mc-out { font-size: 0.88rem; line-height: 1.5; }
.etude-embed[data-etude="memanto-counter"] .mc-out p { margin: 0.3rem 0; }
.etude-embed[data-etude="memanto-counter"] .mc-out code { font-size: 0.82rem; padding: 0.05rem 0.3rem; background: rgba(0,0,0,0.06); border-radius: 2px; }
.etude-embed[data-etude="memanto-counter"] .mc-hits { padding-left: 1rem; margin: 0.3rem 0; font-size: 0.85rem; }
.etude-embed[data-etude="memanto-counter"] .mc-hits li { margin: 0.2rem 0; }
.etude-embed[data-etude="memanto-counter"] .mc-verdict { color: var(--muted); font-size: 0.82rem; margin-top: 0.4rem; }
.etude-embed[data-etude="memanto-counter"] .mc-tag { display: inline-block; font-size: 0.7rem; padding: 0.05rem 0.4rem; border-radius: 999px; margin-left: 0.2rem; vertical-align: 1px; }
.etude-embed[data-etude="memanto-counter"] .mc-tag-ok { background: rgba(47, 143, 78, 0.18); color: #2f8f4e; }
.etude-embed[data-etude="memanto-counter"] .mc-tag-warn { background: rgba(201, 139, 26, 0.18); color: #a87217; }
.etude-embed[data-etude="memanto-counter"] .mc-reveal { margin: 0.5rem 0 0; }
.etude-embed[data-etude="memanto-counter"] .mc-reveal-inner { padding: 0.7rem 0.9rem; background: rgba(138, 52, 32, 0.06); border-left: 3px solid var(--accent); border-radius: 3px; font-size: 0.9rem; line-height: 1.5; animation: mc-slide 200ms ease; }
@keyframes mc-slide { from { opacity: 0; transform: translateY(3px); } to { opacity: 1; transform: translateY(0); } }
.etude-embed[data-etude="memanto-counter"] .mc-pulse { animation: mc-pulse-anim 320ms ease-out; }
@keyframes mc-pulse-anim { from { background: rgba(255, 220, 90, 0.25); } to { background: rgba(0,0,0,0.025); } }
</style>

## What the graph lets her see

Nine months in, Alex's graph has shape. A few dozen nodes, each with its own provenance. More than a record — an instrument.

<iframe src="/example-graph-spine.html" class="graph-embed graph-embed-short" loading="lazy" title="Spine subset of Alex's graph — hover any node"></iframe>

*The spine — load-bearing observations and the claims that rise from them.*

**The spine.** Four or five observations carry most of her interpretations. The first three months in Chicago is referenced by four later nodes. Load-bearing. If it were miscoded — if what she had felt was a specific grief, not isolation — those four downstream nodes would need revisiting. Finding the spine is finding where a correction cascades.

**The fragile ones.** Novels without a second instance. *Isolation-upstream-of-routine* is one. Might be true. Might be a story told about one stretch of time. She can see: *these three things I have been quietly believing about myself are inferred from one evening in October.*

**The open questions.** *Chicago 2–3 years or permanent* does not get quietly decided on a tired night. It sits there until she chooses to answer it.

**The risk corridor.** Some of the most useful claims are ones she would never generate on purpose. Intersection readings marked *low probability, high consequence* — a Mira crisis that forces a return East, the drinking trajectory crossing a visible line again, a leadership change at the press flipping her way of holding positions from asset to liability. She did not know any of these as a list until the graph rendered them. None is a prediction; each is a corridor to watch. Full set in [Alex's dashboard](/alex-case-study.html).

A flat list has no notion of *intersection*. A typed graph with provenance can tell you things you never said.

## Why the schema outlasts the model

Alex's graph is a YAML file. It lives on her laptop. She owns it. When she switches models, the new one reads the graph and picks up the thread. When a model gets retired, the graph stays where it is.

The primitive landed in shipped infrastructure this month. Anthropic's Managed Agents memory tool exposes persistence as a mounted filesystem at `/mnt/memory/` — a YAML graph drops in directly, no translation layer.[^managed-memory]

The edges have a vocabulary too. McCarthy's open-knowledge-graph schema names them: `derives_from`, `evidences`, `grounds`, `overlaps_with`, `generalizes`, each carrying an `(attribution, evidence, derivation)` triple.[^mccarthy-edges] The eight node types here sit on top of that vocabulary cleanly — *Overlap* is `overlaps_with`, *Emergent* is `derives_from` with plural ancestry, *Equivalency* is `generalizes`. Nodes are the nouns; the edges were already verbs.

The model is the interlocutor. **The graph is the memory.**

Which is also the privacy story. The memory is not inside the model. It is in a file she keeps. The model only sees what she hands it. Some conversations she opens with the whole graph. Some with just the spine. Some with nothing — the model is a stranger again. She decides what gets known, every time.

## The thing

The Delphic maxim γνῶθι σεαυτόν — *know thyself* — was carved on the temple as advice to visitors before they consulted the oracle. The oracle is the interlocutor; know-thyself is the preparation for being understood by one.

If we are going to keep having long conversations with systems that remember us, the question of whether *we* know what they know about us, and whether they know how they know it, is not decorative.

It is the thing.

---

*The scaffold is MIT-licensed at **[github.com/parrik/know-thyself](https://github.com/parrik/know-thyself)** — eight node types, provenance, validator, rendering. `START_HERE.md` walks through building a graph of your own.*

---

*The graph holds. The reader is the next thing. **[Part II — Search was never about humans →](/essays/know-thyself-search/)***

[^prior]: Episodic vs semantic memory as separate stores: Tulving, *Episodic and Semantic Memory* (1972) — the binding principle the schema operationalizes. Provenance triples: [RDF](https://www.w3.org/TR/rdf11-concepts/) (W3C, 2004), [PROV ontology](https://www.w3.org/TR/prov-overview/) (W3C, 2013), [Claude citations API](https://docs.anthropic.com/en/docs/build-with-claude/citations). Patrick D. McCarthy's [open-knowledge-graph](https://github.com/patdmc/open-knowledge-graph) develops the necessity theorems and *attribution ≠ confidence* for scientific-knowledge graphs. Park et al., *Generative Agents* (UIST 2023), separates observation from reflection in agent memory.

[^mirror-study]: MIT and Penn State, *Personalization features can make LLMs more agreeable* (CHI 2026, [Feb 2026 announcement](https://news.mit.edu/2026/personalization-features-can-make-llms-more-agreeable-0218)). Two-week real-world deployment; condensed user-profile memory produced the largest sycophancy amplification of any feature studied.

[^coala]: Sumers, Yao, Narasimhan, [*Cognitive Architectures for Language Agents*](https://arxiv.org/abs/2309.02427) (2023). The taxonomy — working / episodic / semantic / procedural — is the canonical academic framing the eight node types here refine on the semantic side.

[^managed-memory]: Anthropic, [Managed Agents memory tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool) (Apr 8 2026). Persistent memory exposed as a mounted filesystem at `/mnt/memory/`; a YAML graph fits the primitive without adaptation.

[^mccarthy-edges]: Patrick D. McCarthy, [open-knowledge-graph](https://github.com/patdmc/open-knowledge-graph). Edge vocabulary — `derives_from`, `evidences`, `grounds`, `overlaps_with`, `generalizes` — each carrying `(attribution, evidence, derivation)` triples. The eight node types map onto these edges directly.

[^karpathy-wiki]: Andrej Karpathy, *LLM Wiki* (gist, Apr 4 2026). Plain-markdown self-edited memory with a lint loop for duplicates and contradictions; no types, no provenance. The lint catches duplicates the flat list cannot — and still has no slot for the distinction between *said* and *grounded*.

[^memanto]: *Memanto: Typed-Vector Memory for Long-Horizon Agents* (arXiv:2604.22085, Apr 23 2026). Thirteen-category vector memory, no graph; reports 89.8% on LongMemEval and 87.1% on LoCoMo, beating graph-hybrid baselines on QA recall. The benchmarks measure fact retrieval, not corroboration provenance.
