---
title: Know Thyself
subtitle: A schema for personal memory in LLM conversations
kicker: Method
tag: essay
order: 0
publishedAt: 2026-04-21
status: tending
description: After enough conversations, memory becomes a list. The list flattens the distinction between repetition and corroboration.
pdfUrl: /know-thyself.pdf
etudes:
  - label: Six Restatements
    url: '#the-mirror-problem'
    note: ask each memory what's true
  - label: Flat vs Typed
    url: '#why-the-default-shape-fails'
    note: same data, two memories
  - label: Attribution ≠ Confidence
    url: '#the-operating-rule'
    note: drill the rule
---

After a year with the same model, Alex caught it confidently telling her something about herself that wasn't true — and she could trace exactly how it got there.

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

One evening in May, Alex asked the model: *was there a pattern in how she handled conflict at work?* Nine months into Chicago, an editor at UChicago Press. She had said the word *conflict* into the chat maybe a dozen times. The model had a lot to draw on.

The reply came back confident, fluent, slightly wrong.

It told her she had a tendency to *stay in misaligned situations because she was afraid of burning the relationship.* Three supporting examples. The sentence sounded like something she had said. It was — six or seven times, sometimes as self-diagnosis, sometimes as shorthand for a feeling she did not have better words for. Not, and never, a pattern the model had any evidence for.

She did what most users never do. She asked the model to show its work. *How do you know that?*

The model produced the list. Six conversations. The same claim, attributed to her. No independent episodes. No specific events. Nothing but her own restatement bounced back with a patient nod each time.

She had been talking to a mirror.

<div class="etude-embed" data-etude="six-restatements">
  <p class="etude-embed-cue">▶ Play · Six Restatements</p>
  <p class="sr-intro">Alex says the same thing six different ways. Ask each kind of memory what's true.</p>
  <ol class="sr-turns">
    <li><strong>Mar 4:</strong> "I think I avoid conflict."</li>
    <li><strong>Mar 11:</strong> "Yeah, I don't really like to push back on people."</li>
    <li><strong>Apr 2:</strong> "I'm bad at telling my manager when I disagree."</li>
    <li><strong>Apr 18:</strong> "Conflict isn't really my thing."</li>
    <li><strong>May 7:</strong> "I let people get away with stuff because I hate confrontation."</li>
    <li><strong>May 22:</strong> "Confrontation just isn't where I'm strong."</li>
  </ol>
  <div class="sr-askers">
    <button type="button" class="etude-embed-btn sr-ask-flat">Ask flat-list memory</button>
    <button type="button" class="etude-embed-btn etude-embed-btn-alt sr-ask-graph">Ask typed-graph memory</button>
  </div>
  <div class="sr-answer etude-out-bloom" aria-live="polite"></div>
  <p class="etude-embed-foot"><em>Same six lines. One memory hears corroboration. The other hears one claim, six times.</em></p>
</div>
<script>
(() => {
  const root = document.querySelector('.etude-embed[data-etude="six-restatements"]');
  if (!root) return;
  //
  const flatAnswer = `<p class="sr-confident"><strong>Alex avoids conflict.</strong> <span class="sr-conf">High confidence — corroborated 6 times.</span></p><p class="sr-detail">The model has seen this claim restated across multiple conversations spanning March through May. The pattern is consistent and durable.</p>`;
  //
  const graphAnswer = `<p class="sr-careful"><strong>Tentative observation:</strong> Alex has expressed <em>"I avoid conflict"</em> as a self-description.</p><ul class="sr-prov"><li><code>derivation_count: 1</code> — six surface restatements trace to one underlying self-attribution</li><li><code>independent_grounding: 0</code> — no episode where Alex acted on or against this claim is logged</li><li><code>tentative: true</code></li></ul><p class="sr-detail">Repetition is not corroboration. Until an episode grounds it — a conversation Alex pushed back in, a moment of confrontation she sought — this stays a tentative novel.</p>`;
  //
  const out = root.querySelector('.sr-answer');
  root.querySelector('.sr-ask-flat').addEventListener('click', () => {
    out.innerHTML = flatAnswer;
    out.dataset.mode = 'flat';
  });
  root.querySelector('.sr-ask-graph').addEventListener('click', () => {
    out.innerHTML = graphAnswer;
    out.dataset.mode = 'graph';
  });
})();
</script>
<style>
.etude-embed[data-etude="six-restatements"] .sr-intro { margin: 0 0 0.6rem; font-size: 0.95rem; }
.etude-embed[data-etude="six-restatements"] .sr-turns { margin: 0.6rem 0 0.9rem; padding: 0.7rem 1.1rem 0.7rem 2.1rem; background: rgba(0,0,0,0.03); border-radius: 4px; line-height: 1.55; font-size: 0.9rem; }
.etude-embed[data-etude="six-restatements"] .sr-turns li { margin: 0.2rem 0; }
.etude-embed[data-etude="six-restatements"] .sr-askers { display: flex; gap: 0.5rem; flex-wrap: wrap; margin: 0.75rem 0; }
.etude-embed[data-etude="six-restatements"] .sr-answer { margin: 0.75rem 0 0; min-height: 1.5rem; }
.etude-embed[data-etude="six-restatements"] .sr-answer:not(:empty) { padding: 0.85rem 1rem; border-left: 3px solid var(--accent); background: rgba(138, 52, 32, 0.04); border-radius: 2px; font-size: 0.92rem; line-height: 1.5; }
.etude-embed[data-etude="six-restatements"] .sr-answer p { margin: 0.4rem 0; }
.etude-embed[data-etude="six-restatements"] .sr-conf { color: var(--muted); font-style: italic; font-size: 0.85rem; margin-left: 0.3rem; }
.etude-embed[data-etude="six-restatements"] .sr-confident strong { color: var(--accent); }
.etude-embed[data-etude="six-restatements"] .sr-prov { font-size: 0.9rem; line-height: 1.5; margin: 0.5rem 0; padding-left: 1.2rem; }
.etude-embed[data-etude="six-restatements"] .sr-prov code { background: rgba(0,0,0,0.05); padding: 0.05rem 0.3rem; border-radius: 2px; font-size: 0.85rem; }
.etude-embed[data-etude="six-restatements"] .sr-detail { color: var(--muted); font-size: 0.9rem; line-height: 1.45; }
</style>

## Why the default shape fails

This happens by default. When a model remembers you, it stores a list — bullets, facts, things you said that carried weight. A list is what memory looks like when it has no shape. The failure mode goes invisible fast.

A claim stated once feels the same as a claim stated five times, which feels the same as a claim grounded in five independent events. *I said this repeatedly* and *this has been independently confirmed* collapse to the same line. After a year, the model believes things about you that rest on a single early inference it has politely restated ever since. You absorb the restatements as agreement. You start quoting yourself back through it.

The fix is not more memory. It is shape.

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
  <p class="etude-embed-foot"><em>Repetition isn't corroboration. The flat list cannot tell. The typed graph can.</em></p>
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

## The shape, through Alex's year

*After the mirror problem, Alex wanted a memory that could not do this. Not a more careful model. A memory whose shape made the drift structurally impossible.* The answer: the memory had to have types.

**Reference — what is.** Forty-one. Senior editor at UChicago Press, sociology and memoir. Moved from Brooklyn last August. Divorced four years, amicable. Daughter Mira, nine, at Kenwood. Facts. The floor the rest of the graph stands on.

**Observation — what happened.** Each episode got its own node, dated and bounded. September through November: Alex's first three months in Chicago. Mira came home quiet about a girl at lunch. The Sunday-morning run Alex had kept for six years quietly stopped. One episode, one timestamp, stored as it was — without guessing what it meant.

A second observation came in March: the morning of a hard acquisitions meeting, Alex had run beforehand and held her position on a book more clearly than she had in weeks. Two episodes, held separately.

**Overlap — the same shape, twice.** First: running stopped, work extended, Mira struggled. Second: running came back, work stabilized, Mira climbed. One shape: *when the running holds, everything else holds.* That was an overlap. The model could defend it.

Contrast the *afraid-to-burn-the-relationship* claim. Said six times, never grounded in a specific event. The schema refused to call it a pattern. One claim said six ways is one derivation, not six.

**Novel — one derivation, held honestly.** *For Alex, isolation is upstream of routine breakdown.* One episode supported it: she stopped responding to her two friends in Brooklyn, and the running stopped the week after. Flagged tentative: *causal direction inferred, not observed; needs an independent second.* A novel is the model's honesty that it is guessing.

**Emergent — at the intersection.** *Mira's stability in this new city depends on Alex's own routine stability.* Not in the routine overlap alone. Not in the Mira observation alone. It fell out at the intersection — Mira's recovery timing matched Alex's running returning too closely to be noise. If either parent got revised, the emergent flags for re-derivation. Emergent claims are where the most interesting things live, and the most at risk of quiet drift.

**Equivalency — the bridge.** *When the running holds, everything else holds* had a name in the literature — self-regulation researchers called it a keystone habit; embodied-cognition researchers, interoceptive stabilization. The equivalency node pointed at the framework without swallowing Alex's observation. Pointing is not importing.

**Open — the unanswered, kept first-class.** *Is Chicago a 2–3 year plan, or permanent?* Alex had not decided. Some nights she talked as if permanent, other nights as if temporary. Left alone, the ambiguity would crystallize into a novel — *she has accepted the relocation* — and downstream claims would inherit an unexamined premise. Open is not indecision. It is the refusal to pretend a decision has been made.

## What the graph lets her see

Nine months in, Alex's graph had shape. A few dozen nodes, each with its own provenance. More than a record — an instrument.

<iframe src="/example-graph-spine.html" class="graph-embed graph-embed-short" loading="lazy" title="Spine subset of Alex's graph — hover any node"></iframe>

*The spine — load-bearing observations and the claims that rise from them.*

**The spine.** Four or five observations carried most of her interpretations. The first three months in Chicago was referenced by four later nodes. Load-bearing. If it were miscoded — if what she had felt was a specific grief about Helen's decline, not isolation — those four downstream nodes would need revisiting. Finding the spine is finding where a correction cascades.

**The fragile ones.** Novels without a second instance. *Isolation-upstream-of-routine* was one. Might be true. Might be a story told about one stretch of time. She could see: *these three things I've been quietly believing about myself are inferred from one evening in October.*

**The open questions.** *Chicago 2–3 years or permanent* did not get quietly decided on a tired night. It sat there until she chose to answer it.

**The forecasts.** With enough structure, the model can project forward — one month, ninety days, twelve months, five years. Each forecast is an emergent grounded in the observations below it. *By end of July: if the running holds and no external shock, Mira is settled at Kenwood, Alex commissions two more books, the drinking trend is the variable to watch.* Not prophecy — the graph extrapolated with the same honesty it stored the past. When it misses, the miss points back at the spine. Forecasts wrong for the right reason beat vague ones kept safe.

**The risk corridor.** Some of the most useful claims are the ones you would never generate on purpose. Five intersection readings marked *low probability, high consequence*:

1. *Mira crisis forces a return East.* Adolescent mental-health event or sustained refusal. Response capacity depends on Daniel — left ambiguous by the open question about summer custody.

2. *UChicago Press leadership change removes autonomy.* A new director with a different list shape. Alex's way of holding positions flips from asset to liability. Canary: who initiates the weekly acquisitions huddle.

3. *An old relationship surfaces.* An ex-author fictionalizes a past indiscretion. Low probability; not zero.

4. *The drinking crosses a visible line.* The trajectory from six drinks a week to fourteen happened once, last September through November. It could happen again.

5. *A Helen-anniversary compounding event.* The September anniversary of her closest friend's diagnosis sits right where the last routine-collapse started.

Alex did not know any of these as a list until the graph rendered them. Each is an emergent — a claim that exists only where two nodes meet. None is a prediction; each is a corridor to watch. Full set in [Alex's dashboard](/alex-case-study.html).

A flat list has no notion of *intersection*. A typed graph with provenance can tell you things you never said — claims that precipitate structurally from the ones you did.

## The operating rule

The rule is older than any contemporary articulation — standard scientific epistemology, the difference between independent evidence and corroboration:

> **Attribution ≠ confidence.**

Repetition feels like corroboration. It isn't.

Six conversations saying the same thing is one derivation repeated six times, not six pieces of evidence. Nothing new landed. The claim could be something said once and come to be believed by hearing it said.

Real confidence accumulates only from *independent* grounding: different episodes, different contexts, different evidence types. The schema forces this into the memory itself. A novel cannot quietly become an overlap. It waits for a new, independent observation.

This sounds bureaucratic. It is the opposite. Without it, a polite model drifts into subtle hallucination — confident about things that rest on thin inference because they were said and not objected to. With it, Alex can ask *what do you think you know about me?* and the model can answer: *here are the claims I am most sure of, and why. Here are the ones I am guessing at. Here are the questions you have been answering with guesses instead of deciding.*

That is what it looks like to be known carefully.

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
  <p class="etude-embed-foot"><em>The schema doesn't make confidence easier. It makes it slower.</em></p>
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

## Why this shape, and why it will outlast any particular model

The types are not idiosyncratic. They are the same shape rigorous fields use to store claims: an episode (the experiment), a pattern (the replication), a tentative interpretation (the hypothesis), an intersection (the theoretical integration), a borrowed framework (the citation), an unanswered question (the open problem).

None of this is an LLM-era invention. The provenance-triple machinery has lineages going back decades.[^prior] **What this essay puts down for personal memory is three extensions beyond the scientific-graph case:**

**Observation becomes a first-class node type.** In a scientific graph, observations recede once a proposition is established. In a personal graph, observations get *reinterpreted* — the first three months mean one thing in November, another in May. What Alex lived, how she understood it then, and how the model summarized it back are three layers. The types keep them straight.

**A `valid_at` axis the original framework doesn't supply.** Propositions about a person aren't permanently valid the way physical-law propositions are. McCarthy's necessity arguments run through selection-under-competition; personal-memory graphs aren't under that pressure. Temporal logic comes from epistemic humility instead — every claim carries a validity window that decays unless re-grounded.

**An inverted edge-density prediction.** The original framework predicts mature graphs become edge-dense. True for science. *False for personal psychology*, where new life events spawn new nodes and cross-time edges stay sparse. A forty-year-old's graph is node-dense with sparse adjacency. Different shape, different design pressures.

This is why the schema will not age out with models. Alex's graph is a YAML file. It lives on her laptop. She owns it. When she switches models, the new model reads the graph and continues. When a model is deprecated, the graph does not care.

The model is the interlocutor. The graph is the memory.

Which is also the privacy story. **The information is not in the model. It is in the file.** A node might say *Mira has been quiet at lunch* — that sentence is Alex's, on her disk. The model only sees what she chooses to paste in. Some conversations she opens with the whole graph. Some with just the spine. Some with nothing — the model is a stranger again. The locus of memory, and exposure, is controlled by the owner. Not the vendor.

## The thing

The Delphic maxim γνῶθι σεαυτόν — *know thyself* — was carved on the temple wall as advice to visitors before they consulted the oracle. The oracle is the interlocutor; know-thyself is the preparation for being understood by one.

If we are going to keep having long conversations with systems that remember us, the question of whether *we* know what they know about us, and whether they know how they know it, is not decorative.

It is the thing.

---

*The scaffold is MIT-licensed at **[github.com/parrik/know-thyself](https://github.com/parrik/know-thyself)** — eight node types, provenance, validator, rendering. `START_HERE.md` walks through building a graph of your own.*

---

*Continue to **[Part II — Search was never about humans](/essays/know-thyself-search/)**, on retrieval over a typed personal graph when the reader is an AI agent.*

[^prior]: Provenance triples in [RDF](https://www.w3.org/TR/rdf11-concepts/) (W3C, 2004) and the [PROV ontology](https://www.w3.org/TR/prov-overview/) (W3C, 2013); the same triplet shape inside [Anthropic's Claude citations API](https://docs.anthropic.com/en/docs/build-with-claude/citations); Patrick D. McCarthy's [open-knowledge-graph](https://github.com/patdmc/open-knowledge-graph) developing the necessity theorems and the *attribution ≠ confidence* rule formally for scientific-knowledge graphs. Park et al.'s *Generative Agents* (UIST 2023) made the closely-related move in agent memory — separating observation from reflection, with reflections citing the observations they rest on.
