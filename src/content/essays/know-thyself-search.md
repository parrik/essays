---
title: Search was never about humans
subtitle: Retrieval over typed personal graphs
kicker: Method
tag: essay
order: 1
parent: know-thyself
publishedAt: 2026-04-25
status: tending
description: Search has always been graph-traversal-with-ranking. The human reader was a contingency. The agent's reader is the latest, sharpest version of an old problem.
etudesPrompt: Run the demo. Read the essay through the code.
etudes:
  - label: Token Budget
    url: '#the-mirror-again'
    note: slide the graph size; watch the paste break
  - label: Two Queries
    url: '#what-an-ai-reader-actually-needs'
    note: type like a human, then like an agent
  - label: know-thyself-search repo
    url: https://github.com/parrik/know-thyself-search
    note: ~300 LOC; three retrieval modes
---

Search has always been graph-traversal-with-ranking. The human reader was a contingency. The new reader has a different attention budget.

*Companion to **[Know Thyself](/essays/know-thyself/)**. Scaffold: **[github.com/parrik/know-thyself-search](https://github.com/parrik/know-thyself-search)**.*

---

## The mirror, again

The first essay opened with Alex catching a model making a confident claim about her on six restated assertions — zero independent episodes. Schema fixed it: typed nodes, provenance triples. Eight months in, her graph has shape — a few hundred nodes, a spine that holds.

Then she pastes the whole graph in, as she has all year, and Claude pulls up short. *Three thousand nodes is too much for me to read at once.* It worked at 300. At 600. At 1200 with friction. Then it stopped. **Graph correct. Reader finite. Retrieval is the bridge.**

Slide the graph size below. Watch the paste break.


<div class="etude-embed" data-etude="token-budget">
  <p class="etude-embed-cue">▶ Play · Token Budget</p>
<!---->
  <div class="tb-controls">
    <label class="tb-slider-label" for="tb-size">Graph size</label>
    <input class="tb-size" type="range" min="100" max="5000" step="50" value="300" />
    <div class="tb-readout">Nodes: 300 | Tokens: ~12,600 | Context fill: 16%</div>
    <div class="tb-presets">
      <button type="button" class="etude-embed-btn tb-preset" data-target="300">300 (works fine)</button>
      <button type="button" class="etude-embed-btn tb-preset" data-target="1200">1,200 (friction)</button>
      <button type="button" class="etude-embed-btn tb-preset" data-target="3000">3,000 (it stops)</button>
    </div>
  </div>
<!---->
  <div class="tb-window-wrap">
    <div class="tb-window-bar"><div class="tb-window-fill"></div></div>
    <div class="tb-window-warn" aria-live="polite"></div>
  </div>
<!---->
  <div class="tb-chat">
    <div class="tb-msg tb-msg-user">here's my graph: <span class="tb-paste">[300 nodes pasted]</span> — what's true about Alex?</div>
    <div class="tb-msg tb-msg-bot">I see Alex is connected to her sister via a recurring Sunday-call pattern, and her job-search thread links back to a pattern node about deferring decisions when uncertain. Want me to trace either?</div>
  </div>
<!---->
  <p class="etude-embed-foot">Slide past 1,200 nodes — the answer turns to mush before the model refuses outright. The graph is correct; the reader is finite. <em>What changes when the reader is no longer human?</em></p>
</div>
<script>
(() => {
  const root = document.querySelector('.etude-embed[data-etude="token-budget"]');
  if (!root) return;
  //
  const slider = root.querySelector('.tb-size');
  const readout = root.querySelector('.tb-readout');
  const fill = root.querySelector('.tb-window-fill');
  const warn = root.querySelector('.tb-window-warn');
  const bot = root.querySelector('.tb-msg-bot');
  const paste = root.querySelector('.tb-paste');
  //
  const TOK_PER_NODE = 42;
  const WINDOW_TOK = 80000;
  //
  const responses = [
    { max: 0.30, text: "I see Alex is connected to her sister via a recurring Sunday-call pattern, and her job-search thread links back to a pattern node about deferring decisions when uncertain. Want me to trace either?" },
    { max: 0.55, text: "Alex's graph shows a connection between her sister and a Sunday routine, and a separate cluster around job-search uncertainty. The link between those two clusters is faint." },
    { max: 0.75, text: "There's a connection between Alex and a sibling, and another between Alex and a job-related thread. Some uncertainty patterns appear." },
    { max: 0.92, text: "There appears to be some relevant content about Alex in the graph, including family and career nodes." },
    { max: 1.00, text: "I'm unable to process this much context effectively. Please reduce the input size or summarize." }
  ];
  //
  function pickResponse(frac) {
    for (const r of responses) if (frac <= r.max) return r.text;
    return responses[responses.length - 1].text;
  }
  //
  function fmt(n) { return n.toLocaleString('en-US'); }
  //
  function update(nodes) {
    const tokens = Math.round(nodes * TOK_PER_NODE);
    const frac = Math.min(1, tokens / WINDOW_TOK);
    const pct = Math.round(frac * 100);
  //
    readout.textContent = `Nodes: ${fmt(nodes)} | Tokens: ~${fmt(tokens)} | Context fill: ${pct}%`;
    paste.textContent = `[${fmt(nodes)} nodes pasted]`;
    fill.style.width = (frac * 100).toFixed(1) + '%';
  //
    let tier = 'ok';
    if (frac > 0.95) tier = 'red';
    else if (frac > 0.70) tier = 'amber';
    fill.dataset.tier = tier;
  //
    if (tier === 'red') warn.innerHTML = '<span class="tb-warn-icon">⚠</span> inference quality degrading';
    else if (tier === 'amber') warn.innerHTML = '<span class="tb-warn-icon tb-warn-amber">●</span> approaching window limit';
    else warn.textContent = '';
  //
    bot.dataset.tier = tier;
    bot.textContent = pickResponse(frac);
  }
  //
  slider.addEventListener('input', e => update(parseInt(e.target.value, 10)));
  //
  root.querySelectorAll('.tb-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = parseInt(btn.dataset.target, 10);
      const start = parseInt(slider.value, 10);
      const t0 = performance.now();
      const dur = 600;
      function step(now) {
        const k = Math.min(1, (now - t0) / dur);
        const eased = 1 - Math.pow(1 - k, 3);
        const v = Math.round(start + (target - start) * eased);
        slider.value = v;
        update(v);
        if (k < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  });
  //
  update(parseInt(slider.value, 10));
})();
</script>
<style>
.etude-embed[data-etude="token-budget"] .tb-controls { margin: 0.6rem 0 0.85rem; }
.etude-embed[data-etude="token-budget"] .tb-slider-label {
  display: block;
  font-size: 0.85rem;
  color: var(--muted);
  margin-bottom: 0.4rem;
}
.etude-embed[data-etude="token-budget"] .tb-size {
  width: 100%;
  accent-color: var(--accent);
  cursor: pointer;
}
.etude-embed[data-etude="token-budget"] .tb-readout {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.84rem;
  color: var(--ink);
  margin: 0.55rem 0 0.7rem;
  letter-spacing: 0.01em;
}
.etude-embed[data-etude="token-budget"] .tb-presets {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}
.etude-embed[data-etude="token-budget"] .tb-preset {
  font-size: 0.82rem;
  padding: 0.32rem 0.6rem;
}
.etude-embed[data-etude="token-budget"] .tb-window-wrap { margin: 0.4rem 0 0.9rem; }
.etude-embed[data-etude="token-budget"] .tb-window-bar {
  height: 14px;
  background: rgba(0,0,0,0.06);
  border-radius: 3px;
  overflow: hidden;
}
.etude-embed[data-etude="token-budget"] .tb-window-fill {
  height: 100%;
  width: 16%;
  background: var(--accent);
  transition: width 220ms cubic-bezier(.2,.8,.2,1), background-color 240ms;
  border-radius: 3px;
}
.etude-embed[data-etude="token-budget"] .tb-window-fill[data-tier="amber"] { background: #c98a1a; }
.etude-embed[data-etude="token-budget"] .tb-window-fill[data-tier="red"] { background: #b53826; }
.etude-embed[data-etude="token-budget"] .tb-window-warn {
  margin-top: 0.35rem;
  font-size: 0.82rem;
  color: var(--muted);
  min-height: 1rem;
}
.etude-embed[data-etude="token-budget"] .tb-warn-icon { color: #b53826; font-weight: bold; margin-right: 0.25rem; }
.etude-embed[data-etude="token-budget"] .tb-warn-icon.tb-warn-amber { color: #c98a1a; }
.etude-embed[data-etude="token-budget"] .tb-chat {
  margin: 0.7rem 0 0.4rem;
  padding: 0.75rem 0.9rem;
  background: var(--bg);
  border-left: 3px solid var(--accent);
  border-radius: 2px;
  line-height: 1.5;
  font-size: 0.92rem;
}
.etude-embed[data-etude="token-budget"] .tb-msg { margin: 0.4rem 0; }
.etude-embed[data-etude="token-budget"] .tb-msg-user { color: var(--muted); }
.etude-embed[data-etude="token-budget"] .tb-msg-user .tb-paste {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.82rem;
  background: rgba(0,0,0,0.06);
  padding: 0.05rem 0.3rem;
  border-radius: 2px;
}
.etude-embed[data-etude="token-budget"] .tb-msg-bot {
  color: var(--ink);
  transition: opacity 220ms, color 220ms;
}
.etude-embed[data-etude="token-budget"] .tb-msg-bot[data-tier="amber"] { color: #8a6a2a; }
.etude-embed[data-etude="token-budget"] .tb-msg-bot[data-tier="red"] { color: #8a3a30; opacity: 0.85; }
</style>

## Four scales of the same shape

Search has always been one shape: **find relevant nodes by walking edges, ranked by some distance function.**[^scales] Salton's 1968 *Automatic Information Organization and Retrieval* set it; the vector-space-model paper (Salton, Wong, Yang 1975) named the geometry; PageRank (Brin & Page 1998) added link-graph priors. The human at the SERP was a contingency — ten results because more was too much, first-three ranking because attention had a budget, page summaries because a page was the unit a person could absorb. The reader changed; the graph problem didn't.

Fifty years of information retrieval, same shape instantiated four times. What changes at each scale is *what's in a node, what an edge means, what the query looks like, and who's at the other end.*

**Scale 1 — Inverted index.** Type two words; ten blue links come back. Underneath: a graph with terms on one side and documents on the other, the edges weighted by how often a term shows up where. The walk is short. Start at the term, follow edges to documents, sort by overlap. Ranking by overlap has a name — BM25 — and an older sibling, TF-IDF. Reader: human. Format: ten ranked links. *Lucene at 700M docs is still this shape.*

**Scale 2 — Vector retrieval.** The node is no longer a word; it's an embedding — a point in high-dimensional space where meaning lives as direction. Two points are close if the angle between them is small. That's cosine distance. At scale, the index itself becomes a graph: a small-world layered so a greedy walk from the top hops down to the nearest neighbors in log time. Below ten thousand vectors, brute-force multiplication is faster than the index. Past that, the index earns its keep. Reader: still mostly human, but an LLM is increasingly at the other end. Format: page summaries, with chunks creeping in.

**Scale 3 — Typed knowledge graph.** A node is no longer a document. It's a *claim*. Edges are no longer "links to" — they're labelled. *Grounds.* *Derives from.* *Evidences.* *Contradicts.* The labels do retrieval work. They let the walk distinguish *I said this five times* from *independently grounded twice.* The query stops being a string and becomes a predicate — a structured request for a kind of node. Reader: a self, or an agent on behalf of one. Format: node plus provenance plus neighborhood.

**Scale 4 — AI-native search.** The agent doesn't type. It describes. The query is a sentence shaped like the answer — *"Here is a great article about LLM evaluation:"* outperforms *"LLM evaluation"* because the embedding was trained on the way documents *get cited.* Filtering separates from ranking and runs first; the index throws out the wrong types before scoring the rest. Ranking shifts from popularity to comprehensiveness, recency, type-correctness, provenance-strength. Reader: an agent with a token budget. Format: atomic chunks with provenance — `{title, url, score, publishedDate, author, text, highlights[]}` — every field stitches into the answer.

All four *find relevant nodes by walking edges.* What changes is node spec, edge spec, query format, who's at the other end.

<!-- ETUDE PLACEHOLDER — "Latency as Fifth Reset"
     Translation target: add a Latency column to the four-scales table.
     Rows: Scale 1 (Lucene tens-of-ms, human-readable) → Scale 2 (HNSW ~10ms, page-load budget) →
           Scale 3 (typed-graph walk, single-digit ms on small graphs) →
           Scale 4 (Exa Instant sub-200ms; Exa Deep fan-out seconds).
     Reader watches the budget collapse from "fast enough to read" → "sub-200ms inside an
     agent tool-call loop, where ten retrievals stack into one user-perceptible turn."
     Builder voice. To author: bar chart or table column with two annotations: "human page-load tolerance"
     and "agent tool-call budget per turn." Embed slot below the four-scales prose.
-->

Three requirements fall out of the walk. **Query format** — humans type two words because typing is slow. Agents type a sentence that *describes the kind of node they want.* **Result format** — humans want ten ranked links. Agents want chunks with provenance attached. **Ranking** — humans get popularity as proxy for correctness. Agents filter first, then rank what's left by comprehensiveness and provenance strength.

Type the same intent two ways. Watch the ranking shift.


<div class="etude-embed" data-etude="two-queries">
  <p class="etude-embed-cue">▶ Play · Two Queries</p>
<!---->
  <div class="tq-queries">
    <label class="tq-qcol">
      <span class="tq-qlabel">Human-style keyword query</span>
      <input class="tq-q-human" type="text" placeholder="LLM evaluation" />
    </label>
    <label class="tq-qcol">
      <span class="tq-qlabel">Agent-style declarative query</span>
      <input class="tq-q-agent" type="text" placeholder="Here is a great article about evaluating LLM outputs against benchmark suites:" />
    </label>
  </div>
<!---->
  <div class="etude-embed-controls">
    <button type="button" class="etude-embed-btn tq-run">Search both</button>
  </div>
<!---->
  <div class="tq-results" aria-live="polite"></div>
<!---->
  <p class="etude-embed-foot">Same intent, different optimal index. The substrate has to know which kind of reader is at the other end. <em>So what does the bounded reader actually need from the substrate?</em></p>
</div>
<script>
(() => {
  const root = document.querySelector('.etude-embed[data-etude="two-queries"]');
  if (!root) return;
  //
  const docs = [
    { id: 'd1', title: '17 LLM Evaluation Tools You Need in 2025', snippet: 'A listicle. "LLM evaluation" appears 41 times. Mostly affiliate links and screenshots.', tfidf: 0.97, embed: 0.18 },
    { id: 'd2', title: 'Holistic Evaluation of Language Models (HELM)', snippet: 'Stanford preprint. Multi-metric framework across accuracy, calibration, robustness, fairness.', tfidf: 0.42, embed: 0.94 },
    { id: 'd3', title: 'Why Most LLM Benchmarks Mislead — and What to Do Instead', snippet: 'Long-form essay. Argues benchmarks measure proxies; proposes task-anchored evals.', tfidf: 0.51, embed: 0.91 },
    { id: 'd4', title: 'How [Vendor] Cut LLM Evaluation Costs by 73%', snippet: 'Vendor blog. "LLM evaluation" in every paragraph. Conclusion: buy our platform.', tfidf: 0.93, embed: 0.22 },
    { id: 'd5', title: 'The Eval Newsletter — Issue #44', snippet: 'Roundup of recent evaluation papers and toolkits. Light commentary, dense links.', tfidf: 0.66, embed: 0.49 },
    { id: 'd6', title: 'Beyond Pass@1: Measuring Reasoning in Code Models', snippet: 'NeurIPS paper. Introduces a new benchmark suite for multi-step coding evaluation.', tfidf: 0.34, embed: 0.88 },
    { id: 'd7', title: 'A Beginner Tutorial: Evaluating Your First LLM', snippet: 'Tutorial. Walks through running an eval harness against a small model end to end.', tfidf: 0.78, embed: 0.55 },
    { id: 'd8', title: 'Fireside Chat: How We Evaluate Frontier Models (transcript)', snippet: 'Transcript of a conference panel. Discursive, anecdotal, occasional concrete metric.', tfidf: 0.29, embed: 0.71 }
  ];
  //
  function rank(by) {
    return [...docs].sort((a, b) => b[by] - a[by]).map((d, i) => ({ ...d, rank: i + 1 }));
  }
  //
  function badge(myRank, otherRank) {
    if (myRank <= 3 && otherRank >= 6) return '<span class="tq-badge tq-badge-up">↑↑</span>';
    if (myRank >= 6 && otherRank <= 3) return '<span class="tq-badge tq-badge-down">↓↓</span>';
    return '';
  }
  //
  function renderColumn(list, otherList) {
    return list.map(doc => {
      const other = otherList.find(o => o.id === doc.id);
      return `<li data-id="${doc.id}" data-rank="${doc.rank}" data-other="${other.rank}">
        <span class="tq-rk">${doc.rank}.</span>
        <span class="tq-ttl">${doc.title}</span>
        ${badge(doc.rank, other.rank)}
        <div class="tq-snip">${doc.snippet}</div>
      </li>`;
    }).join('');
  }
  //
  function drawLines(humanList, agentList) {
    const svg = root.querySelector('.tq-shift-svg');
    if (!svg) return;
    svg.innerHTML = '';
    const container = root.querySelector('.tq-results-grid');
    const cRect = container.getBoundingClientRect();
    svg.setAttribute('width', cRect.width);
    svg.setAttribute('height', cRect.height);
    humanList.forEach(doc => {
      const leftEl = container.querySelector(`.tq-col-human li[data-id="${doc.id}"]`);
      const rightEl = container.querySelector(`.tq-col-agent li[data-id="${doc.id}"]`);
      if (!leftEl || !rightEl) return;
      const lr = leftEl.getBoundingClientRect();
      const rr = rightEl.getBoundingClientRect();
      const x1 = lr.right - cRect.left;
      const y1 = lr.top + lr.height / 2 - cRect.top;
      const x2 = rr.left - cRect.left;
      const y2 = rr.top + rr.height / 2 - cRect.top;
      const dy = Math.abs(y2 - y1);
      const moved = dy > 4;
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', x1);
      line.setAttribute('y1', y1);
      line.setAttribute('x2', x2);
      line.setAttribute('y2', y2);
      line.setAttribute('stroke', moved ? 'rgba(138,52,32,0.55)' : 'rgba(0,0,0,0.12)');
      line.setAttribute('stroke-width', moved ? '1.5' : '1');
      line.setAttribute('stroke-dasharray', moved ? '0' : '3 3');
      svg.appendChild(line);
    });
  }
  //
  function runSearch() {
    const humanList = rank('tfidf');
    const agentList = rank('embed');
    const html = `
      <div class="tq-results-grid">
        <svg class="tq-shift-svg"></svg>
        <div class="tq-col tq-col-human">
          <h4 class="tq-col-h">Keyword query · ranked by tf-idf</h4>
          <ol>${renderColumn(humanList, agentList)}</ol>
        </div>
        <div class="tq-col tq-col-agent">
          <h4 class="tq-col-h">Declarative query · ranked by embedding similarity</h4>
          <ol>${renderColumn(agentList, humanList)}</ol>
        </div>
      </div>
      <p class="tq-legend">Solid line: rank changed across columns. Dashed: rank held. <strong>↑↑</strong> jumped into top-3 from bottom-3. <strong>↓↓</strong> fell out of top-3 into bottom-3.</p>
    `;
    const out = root.querySelector('.tq-results');
    out.innerHTML = html;
    requestAnimationFrame(() => {
      const lis = out.querySelectorAll('li');
      lis.forEach((li, i) => {
        li.style.animationDelay = (i * 35) + 'ms';
        li.classList.add('tq-in');
      });
      setTimeout(() => drawLines(humanList, agentList), 400);
    });
  }
  //
  root.querySelector('.tq-run').addEventListener('click', runSearch);
  window.addEventListener('resize', () => {
    if (root.querySelector('.tq-results-grid')) {
      drawLines(rank('tfidf'), rank('embed'));
    }
  });
})();
</script>
<style>
.etude-embed[data-etude="two-queries"] .tq-queries {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin: 0.4rem 0 0.6rem;
}
.etude-embed[data-etude="two-queries"] .tq-qcol { display: flex; flex-direction: column; gap: 0.3rem; }
.etude-embed[data-etude="two-queries"] .tq-qlabel { font-size: 0.82rem; color: var(--muted); }
.etude-embed[data-etude="two-queries"] .tq-queries input {
  font-family: inherit;
  font-size: 0.9rem;
  padding: 0.5rem 0.65rem;
  border: 1px solid rgba(0,0,0,0.18);
  border-radius: 3px;
  background: var(--bg);
  color: var(--ink);
}
.etude-embed[data-etude="two-queries"] .tq-queries input:focus {
  outline: none;
  border-color: var(--accent);
}
.etude-embed[data-etude="two-queries"] .tq-results { margin: 0.4rem 0 0; min-height: 2rem; }
.etude-embed[data-etude="two-queries"] .tq-results-grid {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.75rem;
}
.etude-embed[data-etude="two-queries"] .tq-shift-svg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}
.etude-embed[data-etude="two-queries"] .tq-col { position: relative; z-index: 1; }
.etude-embed[data-etude="two-queries"] .tq-col-h {
  font-size: 0.8rem;
  font-family: 'Georgia', serif;
  font-style: italic;
  color: var(--muted);
  margin: 0 0 0.5rem;
  font-weight: normal;
}
.etude-embed[data-etude="two-queries"] .tq-col ol {
  list-style: none;
  padding: 0;
  margin: 0;
}
.etude-embed[data-etude="two-queries"] .tq-col li {
  padding: 0.45rem 0.6rem;
  margin: 0.3rem 0;
  background: var(--bg);
  border-radius: 3px;
  line-height: 1.35;
  opacity: 0;
  transform: translateY(4px);
  font-size: 0.88rem;
}
.etude-embed[data-etude="two-queries"] .tq-col li.tq-in {
  animation: tq-slidein 320ms cubic-bezier(.2,.8,.2,1) forwards;
}
@keyframes tq-slidein {
  to { opacity: 1; transform: translateY(0); }
}
.etude-embed[data-etude="two-queries"] .tq-col .tq-rk {
  font-variant-numeric: tabular-nums;
  color: var(--muted);
  margin-right: 0.35rem;
  font-size: 0.85rem;
}
.etude-embed[data-etude="two-queries"] .tq-col .tq-ttl { font-weight: 500; }
.etude-embed[data-etude="two-queries"] .tq-col .tq-snip {
  color: var(--muted);
  font-size: 0.8rem;
  margin-top: 0.2rem;
  line-height: 1.4;
}
.etude-embed[data-etude="two-queries"] .tq-badge {
  display: inline-block;
  margin-left: 0.35rem;
  font-size: 0.75rem;
  padding: 0.05rem 0.3rem;
  border-radius: 2px;
  font-weight: 600;
}
.etude-embed[data-etude="two-queries"] .tq-badge-up { color: #1a6b3a; background: rgba(26,107,58,0.12); }
.etude-embed[data-etude="two-queries"] .tq-badge-down { color: #8a3420; background: rgba(138,52,32,0.12); }
.etude-embed[data-etude="two-queries"] .tq-legend {
  margin: 0.7rem 0 0;
  font-size: 0.8rem;
  color: var(--muted);
  line-height: 1.5;
}
@media (max-width: 640px) {
  .etude-embed[data-etude="two-queries"] .tq-queries,
  .etude-embed[data-etude="two-queries"] .tq-results-grid {
    grid-template-columns: 1fr;
  }
  .etude-embed[data-etude="two-queries"] .tq-shift-svg { display: none; }
}
</style>

The synthesis: same intent rewards different substrate because the reader changed. Bounded context is what makes that change *force* structured memory rather than merely reward it.

## Why bounded context forces structured memory

Four claims, deep prior backing.[^bounded]

- Working memory is bounded — Miller's 7±2; Cowan's 4±1.
- Institutional decision-making is bounded — Simon's bounded rationality.
- Lossless compression is bounded — Shannon's floor.
- The space-creating operation that doesn't lose information is *factoring* — shared structure into named nodes with typed edges. Codd's relational model.

Stack them. When `|K|` exceeds `C_n`, discarding loses information and lossless hits Shannon's floor. **Factoring is graph construction.** The bounded reader needs the graph not as decoration but as the only architecture that lets retrieval scale without degrading.

Three substrates share the constraint: biological working memory, institutional decision-making, *transformer context windows — large but degrading as irrelevant content fills them.* McCarthy proves it formally for the scientific case, with a corollary aimed at the frontier labs:

> Growing C_n directly does not solve the retrieval problem… The efficient path is not to grow the context window but to grow the encoded knowledge accessible via stored adjacency: **filling the graph, not the context window.**

The race to longer windows — 200K, 1M, 10M — is real progress and a confession the substrate hasn't been chosen. Self-attention's O(n²) is the cost of no stored structure. A graph stores dependencies once, walks them many times. The limit isn't tokens; it's untyped flatness.

The labs split. Anthropic ships [MCP](https://www.anthropic.com/news/model-context-protocol) — first reference server is a [knowledge-graph CRUD API](https://github.com/modelcontextprotocol/servers/tree/main/src/memory). OpenAI ships [memory](https://openai.com/index/memory-and-new-controls-for-chatgpt/) — extracted typed claims, not turns. Google ships [million-token contexts](https://blog.google/technology/ai/google-gemini-next-generation-model-february-2024/) — the maximalist path McCarthy names inefficient. The academic line — memory streams,[^genagents] MemGPT,[^memgpt] HippoRAG,[^hipporag] [A-Mem](https://github.com/agiresearch/A-mem)[^amem] — converges: the graph isn't a feature; it's where memory lives.

Both bets are live. Big-context: transformers absorb the graph through scale. MCP/memory-server: graph lives outside the context, model wants typed adjacency at retrieval. The argument above is the technical case for the second.

## What this essay extends

The personal-graph framing — bounded-context applied to a self rather than a science — is what this essay puts down. McCarthy's necessity arguments run through selection-under-competition: science prunes by what wins under evidence. Personal-memory graphs aren't under that pressure. No competitor's posterior, no replication, no external ground truth, fuzzy temporal validity. Three rewrites:

**`valid_at` / confidence-decay.** Propositions about persons aren't permanently valid. *Propositions don't die, they become less true over time.* Every claim carries a validity window that decays unless re-grounded. First-class field on every node.

**Inverted edge-density.** Paper 1 Corollary 3 predicts mature graphs become edge-dense. True for science. False for personal psychology — a forty-year-old's graph is *node-dense with sparse adjacency*. "Right node, then walk *its* neighborhood" beats "connected clique."

**Un-clean action space.** K/A inseparability (Paper 3 Corollary 4) presumes crisp β overlap. Personal action doesn't share one. Schema tolerates K-without-A and A-without-K.

Schema carries over cleanly. Retention logic doesn't.

## A demo, at the personal scale

The bet is testable. The bound is the reader, not the corpus. Small graph + finite agent = huge graph + finite agent.

Runnable on a laptop, against [Alex's example graph](https://github.com/parrik/know-thyself/blob/main/example-graph-extended.yaml):

```bash
git clone github.com/parrik/know-thyself-search
cd know-thyself-search
pip install pyyaml numpy

python embed.py examples/example-graph-extended.yaml
python compare.py "when did the running routine break down"
```

Three retrieval modes, side-by-side, on the same query:

```
Query: 'when did the running routine break down'
Index: 87 nodes · backend=tfidf

━━━ MODE A — pure cosine ━━━━━━━━━━━━━━━━━━
  1. 0.296  P01-routine-as-regulation       [overlap]
            Physical routine is load-bearing for Alex's stability
  2. 0.216  E01-child-stability-depends...  [emergent]
            Mira's stability depends on Alex's routine stability
  3. 0.190  N01-isolation-is-early-warning  [novel] [tentative]
            Isolation is an early-warning signal

━━━ MODE B — + type filter (observation) ━━
  1. 0.387  O01-first-three-months          [observation]
            First three months in Chicago — Sep–Nov 2024
  2. 0.121  O02-running-restart-mar2025     [observation]
            Running routine restarted — March 2025

━━━ MODE C — + provenance rerank ━━━━━━━━━━
  1. 0.325  P01-routine-as-regulation       [overlap]
  2. 0.227  E01-child-stability-depends...  [emergent]
  3. 0.171  N01-isolation-is-early-warning  [novel] [tentative]
```

Three things to notice.

**A finds the *theme*. B finds the *episode*.** Cosine grabs P01 on word overlap — right frame, wrong answer to *when*. Type filter retrieves dated episodes. Schema doing work pure embeddings cannot.

**C demotes the tentative novel.** Provenance reranking knows the novel is one-derivation and the overlap is two-grounded. *Attribution ≠ confidence as a retrieval property.*

**At 87 nodes, none of this needs HNSW.** Brute-force matmul runs in two ms. HNSW kicks in when linear scan stops being free — well past where most personal graphs go.[^pinecone] Algorithm scales with problem.

## What this opens

Same shape across scales, build once:

- **Schema:** typed nodes carrying claim + attribution + derivation. The [know-thyself](https://github.com/parrik/know-thyself) scaffold adds temporal-validity.
- **Index:** vectors plus typed metadata ([know-thyself-search](https://github.com/parrik/know-thyself-search)).
- **Walk:** edge-aware traversal — `walk_provenance(node_id)` returns typed-edge neighborhood (outbound `grounded_by` / `related_to`, inbound references) in one call. **Shipped Apr 2026.**
- **Surface:** MCP server — `search_graph` / `get_node` / `walk_provenance` / `list_node_stats` over stdio; any MCP client (Claude Code, Claude Desktop, Cursor) queries natively. **Shipped Apr 2026.**
- **Next bottleneck:** sub-statement chunking. Long observation nodes accumulate dated sub-sections; whole-statement single-vector dilutes new content. Etude queued.

Synthesis across all four scales — inverted index, vector retrieval, typed knowledge graph, AI-native search — is one shape, constants reset. Retrieval assumed a human reader; the reader changed; representation must change at every scale because the shape is fractal. *That synthesis is the specific contribution this essay stakes.*

<!-- ETUDE PLACEHOLDER — "Known vs Unknown Item"
     Translation target: a paired query bench, side-by-side.
     Left: KNOWN-ITEM / entity-discovery query — "find the node where Alex's running routine
           restarts in March 2025." Agent driving (query-rewrite + filter loop) helps:
           reranks the dated observation to top-1, demotes thematic overlap.
     Right: UNKNOWN-ITEM / information-discovery query — "what does Alex believe about
           regulation?" Agent driving adds nothing measurable; cosine alone returns the same
           top-3 as the agent loop after multiple turns.
     Source: Doug Turnbull's Apr 28 2026 finding — agents add value on entity-discovery,
            not on information-discovery.
     Reader watches: same substrate, two query archetypes, one helped by agency, one not.
     Sits inside the synthesis closer as the empirical sharpener: not all queries reward
     the agent reader equally; the four-scales shift is real but uneven across query types.
-->

Adjacent work names pieces without the cross-scale claim. Bryk's [*Why Google Search Sucks for AI*](https://jxnl.co/writing/2025/09/11/why-google-search-sucks-for-ai-will-bryk-exa/) on Scale 4. Lù et al.'s [*Build the Web for Agents*](https://arxiv.org/abs/2506.10953) one level up. McCarthy's [open-knowledge-graph](https://github.com/patdmc/open-knowledge-graph) on Scale 3. Personal-memory siblings — [Mem0](https://github.com/mem0ai/mem0), [Graphiti](https://github.com/getzep/graphiti), [Letta](https://github.com/letta-ai/letta), [HippoRAG](https://github.com/OSU-NLP-Group/HippoRAG), [A-Mem](https://github.com/agiresearch/A-mem) — converge on typed-node-with-provenance. Frameworks like LangChain / LlamaIndex treat memory as conversation-shaped (buffer, summary, vector-of-turns). Graph-shaped projects treat it as person-shaped. Conversation primitive falls under McCarthy's Theorem 4 — flat substrates degrade as bounded readers scan them. Person-shaped survives.

Swap typed-claim for web-chunk, `grounds` for `cites`, 87 for a billion — Exa. Swap the agent for a literature-review assistant — different surface, same architecture. Shape doesn't care.

## Postscript — DeepSeek V4 (Apr 26 2026)

Two days after this essay shipped, DeepSeek released [V4](https://huggingface.co/blog/deepseekv4). Million-token context via hybrid attention — Compressed Sparse + Heavy Compressed — at **9.5–13.7× less memory** and **10% of the KV cache** of V3.2.

Four-scales extends one further:

| Scale | Nodes | Edges | Walk strategy | Reader |
|---|---|---|---|---|
| **LLM working memory** | **tokens / latent codes** | **sparse + hierarchical attention** | **compression + retrieval-as-attention** | **the model itself** |

Graph-traversal-with-ranking internalized one further. The visible feature (long context) is downstream of the memory-architecture move that scales every retrieval system before it. The reader is the model.

## Run it

The full scaffold is three retrieval modes, ~300 LOC, runnable on a laptop: **[github.com/parrik/know-thyself-search](https://github.com/parrik/know-thyself-search)**. Clone, embed Alex's example graph, watch type-filter and provenance-rerank do work pure cosine cannot.

## The loop closes

This is the loop the first essay opened and this one closes. Personal-memory and AI-search-for-agents are the same problem at different scales.

γνῶθι σεαυτόν. *Know thyself.* The Delphic maxim was offered to visitors before they consulted the oracle. Being legible to the oracle was the precondition for being understood. The oracle's bandwidth was finite; the visitor's wasn't.

**The retrieval problem hasn't changed in two and a half millennia. The reader has.**

The bet is testable. More to follow.

---

*Same shape, smaller scale — applied to a self. **[Part III — Memory was never about storage →](/essays/memory-was-never-about-storage/)***

[^triplet]: [RDF](https://www.w3.org/TR/rdf11-concepts/) (W3C, 2004); [PROV-O](https://www.w3.org/TR/prov-overview/) (W3C, 2013); [Anthropic's Claude citations API](https://docs.anthropic.com/en/docs/build-with-claude/citations); [McCarthy's open-knowledge-graph](https://github.com/patdmc/open-knowledge-graph) on the scientific case.

[^bounded]: [Miller 1956](https://psychclassics.yorku.ca/Miller/); [Cowan 2001](https://doi.org/10.1017/S0140525X01003922); [Simon's bounded rationality](https://www.jstor.org/stable/1884852); [Shannon's source coding theorem](https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf); [Codd's relational model](https://dl.acm.org/doi/10.1145/362384.362685).

[^hnsw]: Malkov & Yashunin, [*Hierarchical Navigable Small World graphs*](https://arxiv.org/abs/1603.09320) (2018).

[^scales]: Same shape across scales: inverted index (Lucene, BM25/TF-IDF — terms ↔ documents); vector retrieval (HNSW[^hnsw], Pinecone, FAISS — embeddings as nodes, cosine as edges); typed knowledge graph (claims with `grounds` / `derives_from` / `contradicts` edges)[^triplet]; AI-native search ([Exa](https://exa.ai) — clustered ANN over Matryoshka embeddings, [link-prediction-trained](https://www.latent.space/p/exa), [rejected HNSW for sharding/metadata reasons](https://exa.ai/blog/building-web-scale-vector-db); Bryk: *"It would kind of be insane if the same search engine optimal for humans was also optimal for this very different creature."*). What changes: node spec, edge spec, query format, who's reading. Agents want declarative queries (`"Here is a great article about LLM evaluation:"` outperforms `"LLM evaluation"`), atomic chunks with provenance, ranking by comprehensiveness/recency/type-correctness — filter first, then rank.

[^genagents]: Park et al., [*Generative Agents*](https://arxiv.org/abs/2304.03442) (2023).

[^memgpt]: Packer et al., [*MemGPT*](https://arxiv.org/abs/2310.08560) (2023).

[^hipporag]: Gutiérrez et al., [*HippoRAG*](https://arxiv.org/abs/2405.14831) (2024).

[^amem]: Xu et al., [*A-Mem*](https://arxiv.org/abs/2502.12110) (2025).

[^pinecone]: Pinecone, [*HNSW*](https://www.pinecone.io/learn/series/faiss/hnsw/) — when graph indexes earn their keep over linear scan.
