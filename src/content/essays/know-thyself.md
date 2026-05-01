---
title: A self was never flat
seriesName: Know Thyself
subtitle: A schema for personal memory in LLM conversations
relief: You are not what you have said six times. You are what you have done, dated and bounded.
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
  - label: Attribution ≠ Confidence
    url: '#the-operating-rule'
    note: drill the rule
---

One evening in May, nine months into Chicago, Alex asked the model whether there was a pattern in how she handled conflict at work. The reply came back confident, fluent, slightly wrong: she *stayed in misaligned situations because she was afraid of burning the relationship.* It sounded like something she had said. It was — six or seven times, as self-diagnosis. Never a pattern the model had evidence for. She asked it to show its work. Six conversations. Same claim, attributed to her. No independent episodes.

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

**Reference — what is.** Forty-one. Senior editor at UChicago Press. Moved from Brooklyn last August. Divorced four years, amicable. Daughter Mira, nine. Facts. The floor the rest of the graph stands on.

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
    <input class="fvt-query" type="text" value="What's true about Sam?" aria-label="Query" />
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
    { id: 1,  text: "Sam mentioned avoiding conflict",       src: "Conv #1, Mar 4",   kind: "self-restate", claim: "avoids-conflict" },
    { id: 2,  text: "Sam mentioned avoiding conflict",       src: "Conv #5, Mar 18",  kind: "self-restate", claim: "avoids-conflict" },
    { id: 3,  text: "Sam mentioned avoiding conflict",       src: "Conv #11, Apr 22", kind: "self-restate", claim: "avoids-conflict" },
    { id: 4,  text: "Sam restated avoiding conflict",        src: "Conv #14, May 7",  kind: "self-restate", claim: "avoids-conflict" },
    { id: 5,  text: "Sam mentioned avoiding conflict",       src: "Conv #19, May 22", kind: "self-restate", claim: "avoids-conflict" },
    { id: 6,  text: "Manager review: 'Sam avoids conflict'", src: "Perf review, Apr", kind: "external-obs", claim: "avoids-conflict" },
    { id: 7,  text: "Sam mentioned thriving on independence",src: "Conv #2, Mar 7",   kind: "self-restate", claim: "thrives-independence" },
    { id: 8,  text: "Sam shipped a solo 6-month project end-to-end", src: "Verified, Apr 30", kind: "grounded-episode", claim: "thrives-independence" }
  ];
  let facts = SEED.slice();
  let extraCounter = 0;
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
  function flatAnswer() {
    const groups = {};
    facts.forEach(f => { groups[f.claim] = (groups[f.claim] || 0) + 1; });
    const cN = groups['avoids-conflict'] || 0, iN = groups['thrives-independence'] || 0;
    const cC = conf(cN), cI = conf(iN);
    tickBadge(flatCount, facts.length);
    tickBadge(flatConflict, cN);
    return `<p><strong>Sam avoids conflict.</strong> <span class="fvt-conf ${cC.cls}">${cC.word} confidence — corroborated ${cN} times.</span></p><p><strong>Sam thrives on independence.</strong> <span class="fvt-conf ${cI.cls}">${cI.word} confidence — mentioned ${iN} time${iN===1?'':'s'}.</span></p><p class="fvt-detail">Repetition compresses into confidence. More mentions → stronger claim.</p>`;
  }
  //
  function deriv(c) { return (c.self > 0 ? 1 : 0) + c.ext + c.grounded; }
  //
  function graphLine(label, c) {
    const d = deriv(c), bits = [];
    if (c.self     > 0) bits.push(`${c.self} self-restatement${c.self===1?'':'s'} → 1 self-attribution`);
    if (c.ext      > 0) bits.push(`${c.ext} external observer`);
    if (c.grounded > 0) bits.push(`${c.grounded} grounded episode`);
    const tag = c.grounded > 0 ? '<span class="fvt-tag fvt-tag-ok">grounded</span>'
              : c.ext > 0      ? '<span class="fvt-tag fvt-tag-warn">tentative-supported</span>'
              :                  '<span class="fvt-tag fvt-tag-low">tentative</span>';
    return `<li><strong>Sam — '${label}'</strong>: ${bits.join(', ')}. <em>Net: ${d} derivation${d===1?'':'s'}.</em> ${tag}</li>`;
  }
  //
  function graphAnswer() {
    const claims = {};
    facts.forEach(f => {
      const c = claims[f.claim] = claims[f.claim] || { self: 0, ext: 0, grounded: 0 };
      if (f.kind === 'self-restate')     c.self += 1;
      if (f.kind === 'external-obs')     c.ext  += 1;
      if (f.kind === 'grounded-episode') c.grounded += 1;
    });
    const cf = claims['avoids-conflict']      || { self: 0, ext: 0, grounded: 0 };
    const ip = claims['thrives-independence'] || { self: 0, ext: 0, grounded: 0 };
    tickBadge(graphNodes,  Object.keys(claims).length);
    tickBadge(graphDerivs, deriv(cf) + deriv(ip));
    return `<ul class="fvt-prov">${graphLine('avoids conflict', cf)}${graphLine('thrives on independence', ip)}</ul><p class="fvt-detail">Five surface restatements collapse to one self-attribution. Counts don't migrate into confidence on their own — only typed sources do.</p>`;
  }
  //
  function ask() {
    flatOut.classList.remove('fvt-pulse');
    graphOut.classList.remove('fvt-pulse');
    void flatOut.offsetWidth; void graphOut.offsetWidth;
    flatOut.innerHTML = flatAnswer();
    graphOut.innerHTML = graphAnswer();
    flatOut.classList.add('fvt-pulse');
    graphOut.classList.add('fvt-pulse');
  }
  //
  function addRestate() {
    extraCounter += 1;
    const nextId = facts.length + 1;
    facts.push({
      id: nextId,
      text: "Sam mentioned avoiding conflict",
      src: `Conv #${20 + extraCounter}, added`,
      kind: "self-restate",
      claim: "avoids-conflict"
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

<!--
NEXT ETUDE PLACEHOLDER — "Wiki vs Typed Graph"
Translation target: take Karpathy's LLM Wiki gist (Apr 4 2026) — model writes a wiki of itself — and stage a head-to-head where the wiki collapses 6 self-restates into a single "synthesis" paragraph while the typed graph keeps them as 1 self-attribution + 5 unresolved mentions. Show the wiki silently launders repetition into authority; the typed graph won't.
Output should be: side-by-side, same input, wiki section vs graph section, with the wiki's smoothed-prose paragraph next to the graph's annotated 1-derivation count.
-->

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
      vignette: "Across six conversations spanning four months, Maya tells the model \"I avoid conflict.\" Different phrasings each time, no specific incidents.",
      choices: [
        { label: "1 derivation (repetition)", correct: true },
        { label: "6 derivations (corroborated)", correct: false },
        { label: "Contradicted (demote)", correct: false }
      ],
      explain: "Six restatements of the same self-attribution trace to one underlying claim. Repetition compresses; it does not corroborate."
    },
    {
      vignette: "Two friends and a coworker, none of whom know each other, each independently describe Devon as \"someone who ghosts when uncomfortable.\"",
      choices: [
        { label: "1 derivation (repetition)", correct: false },
        { label: "3 derivations (corroborated)", correct: true },
        { label: "Contradicted (demote)", correct: false }
      ],
      explain: "Three independent observers, no shared source. Each is a separate grounding. That's corroboration."
    },
    {
      vignette: "Liam restates a fear of failure in three conversations, AND in one of those mentions a specific time he didn't apply for a job because of it.",
      choices: [
        { label: "1 derivation (repetition)", correct: false },
        { label: "2 derivations (mixed)", correct: true },
        { label: "Contradicted (demote)", correct: false }
      ],
      explain: "The three restatements collapse to one self-attribution. The grounded episode — a specific job he didn't apply for — is a second, independent derivation."
    },
    {
      vignette: "Avery tells five different therapists, over six months, the same story about her mother. None of the therapists has met the mother.",
      choices: [
        { label: "1 derivation (repetition)", correct: true },
        { label: "5 derivations (corroborated)", correct: false },
        { label: "Contradicted (demote)", correct: false }
      ],
      explain: "Five listeners is not five sources. The claim still traces to one self-attribution. Multiple audiences do not add grounding."
    },
    {
      vignette: "A model summarizes Jordan as \"driven by approval\" based on Jordan's own words in four sessions. Jordan's manager separately writes a performance review describing the same pattern.",
      choices: [
        { label: "1 derivation (repetition)", correct: false },
        { label: "2 derivations (self + observer)", correct: true },
        { label: "Contradicted (demote)", correct: false }
      ],
      explain: "Self-attribution is one derivation. The manager's independent observation is a second. Two, not five."
    },
    {
      vignette: "Sam mentions in passing that he \"never finishes anything,\" but his GitHub shows 12 completed projects, his LinkedIn shows 3 jobs each held >2 years, and his apartment lease shows he stayed 4 years in one place.",
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

<!--
NEXT ETUDE PLACEHOLDER — "Memanto Counter"
Translation target: take the Memanto paper (arXiv 2604.22085, Apr 23 2026) — vector-only typed memory wins LongMemEval — and stage a side-by-side where vector memory wins the benchmark BUT graph catches the corroboration drift the benchmark doesn't measure. Two queries: (1) LongMemEval-style "what does the user prefer?" → vector wins on retrieval latency; (2) "is this claim grounded or repeated?" → vector returns 6 high-similarity hits and calls it confirmed; graph returns 1 derivation flagged tentative.
Output: tabbed or two-pane comparison with the benchmark score next to the drift-catch result. The benchmark measures recall, not provenance.
-->

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
