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
etudes:
  - label: Cascade Simulator
    url: '#the-loop'
    note: click launch, watch it multiply
  - label: Review This PR
    url: '#the-anti-pattern-human-in-the-loop-no-context-in-hand'
    note: 30 seconds, no context, all three exits bad
  - label: Three-Path Picker
    url: '#three-ways-out'
    note: pick the path that fits
---

## The Loop

A platform team launches a campaign: hundreds of PRs across repos owned by other teams. Java 21 upgrade. Kubernetes migration. Pick your flavor.

The PRs stall.

The manager escalates to the director, who escalates to the SVP, who broadcasts a directive: *merge these PRs.* The directive lands with selective adoption. A tracking campaign gets spun up to chase compliance on the original campaign.

Each incomplete campaign spawns the next.

> Campaign → Stall → Escalate → Directive → New Campaign → …

<div class="etude-embed" data-etude="cascade-sim">
  <p class="etude-embed-cue">▶ Play · Cascade Simulator</p>
  <div class="etude-embed-controls">
    <button type="button" class="etude-embed-btn cs-launch">Launch campaign</button>
    <button type="button" class="etude-embed-btn-alt cs-reset" disabled>Reset</button>
  </div>
<!---->
  <div class="cs-stage">
    <div class="cs-campaigns"></div>
  </div>
<!---->
  <div class="cs-stats">
    <div class="cs-stat"><span class="cs-stat-label">Campaigns launched</span><span class="cs-stat-value cs-stat-campaigns">0</span></div>
    <div class="cs-stat"><span class="cs-stat-label">PRs created</span><span class="cs-stat-value cs-stat-prs">0</span></div>
    <div class="cs-stat"><span class="cs-stat-label">PRs merged</span><span class="cs-stat-value cs-stat-merged">0</span></div>
    <div class="cs-stat"><span class="cs-stat-label">Original migration</span><span class="cs-stat-value cs-stat-completion">0%</span></div>
    <div class="cs-stat"><span class="cs-stat-label">Wall time</span><span class="cs-stat-value cs-stat-time">0 weeks</span></div>
    <div class="cs-stat"><span class="cs-stat-label">Effort</span><span class="cs-stat-value cs-stat-effort">0 person-weeks</span></div>
  </div>
<!---->
  <div class="cs-banner" aria-live="polite"></div>
<!---->
  <p class="etude-embed-foot">Each campaign is rational. The right ideas multiply faster than they finish.</p>
</div>
<script>
(() => {
  const root = document.querySelector('.etude-embed[data-etude="cascade-sim"]');
  if (!root) return;
  //
  const CAMPAIGNS = [
    { id: 1, label: 'Campaign 1: migrate to Java 21' },
    { id: 2, label: 'Campaign 2: escalation framework — track campaign completion at PMR' },
    { id: 3, label: 'Campaign 3: dashboarding for escalation tracking' },
  ];
  //
  const DOTS_PER_CAMPAIGN = 24;
  const BETWEEN_MS = 500;
  //
  let running = false;
  let totals = { campaigns: 0, prs: 0, merged: 0 };
  //
  const launchBtn = root.querySelector('.cs-launch');
  const resetBtn = root.querySelector('.cs-reset');
  const host = root.querySelector('.cs-campaigns');
  const banner = root.querySelector('.cs-banner');
  const statCampaigns = root.querySelector('.cs-stat-campaigns');
  const statPrs = root.querySelector('.cs-stat-prs');
  const statMerged = root.querySelector('.cs-stat-merged');
  const statCompletion = root.querySelector('.cs-stat-completion');
  const statTime = root.querySelector('.cs-stat-time');
  const statEffort = root.querySelector('.cs-stat-effort');
  //
  function pickColor() {
    const r = Math.random();
    if (r < 0.30) return 'green';
    if (r < 0.80) return 'yellow';
    return 'red';
  }
  //
  function tickTo(el, target, suffix = '', ms = 800) {
    const start = parseInt(el.dataset.cur || '0', 10);
    const t0 = performance.now();
    function step(now) {
      const k = Math.min(1, (now - t0) / ms);
      const eased = 1 - Math.pow(1 - k, 3);
      const cur = Math.round(start + (target - start) * eased);
      el.textContent = cur + suffix;
      el.dataset.cur = String(cur);
      if (k < 1) requestAnimationFrame(step);
      else {
        el.textContent = target + suffix;
        el.dataset.cur = String(target);
      }
    }
    requestAnimationFrame(step);
  }
  //
  function setText(el, text) { el.textContent = text; }
  //
  function buildCampaign(c) {
    const wrap = document.createElement('div');
    wrap.className = 'cs-campaign';
    wrap.dataset.id = String(c.id);
  //
    const box = document.createElement('div');
    box.className = 'cs-campaign-box';
    box.textContent = c.label;
    wrap.appendChild(box);
  //
    const grid = document.createElement('div');
    grid.className = 'cs-dot-grid';
    for (let i = 0; i < DOTS_PER_CAMPAIGN; i++) {
      const dot = document.createElement('div');
      dot.className = 'cs-dot';
      dot.style.setProperty('--i', String(i));
      grid.appendChild(dot);
    }
    wrap.appendChild(grid);
  //
    const summary = document.createElement('div');
    summary.className = 'cs-campaign-summary';
    wrap.appendChild(summary);
  //
    return wrap;
  }
  //
  function settleDots(wrap) {
    return new Promise((resolve) => {
      const dots = wrap.querySelectorAll('.cs-dot');
      const counts = { green: 0, yellow: 0, red: 0 };
      dots.forEach((dot, idx) => {
        const delay = 180 + idx * 50 + Math.random() * 160;
        setTimeout(() => {
          const color = pickColor();
          counts[color]++;
          dot.classList.add('cs-settled', 'cs-' + color);
          totals.prs += 1;
          if (color === 'green') totals.merged += 1;
          updateLiveStats();
        }, delay);
      });
  //
      setTimeout(() => {
        const summary = wrap.querySelector('.cs-campaign-summary');
        summary.innerHTML =
          `<span class="cs-chip cs-chip-green">${counts.green} merged</span>` +
          `<span class="cs-chip cs-chip-yellow">${counts.yellow} stalled</span>` +
          `<span class="cs-chip cs-chip-red">${counts.red} rejected</span>`;
        resolve(counts);
      }, 180 + DOTS_PER_CAMPAIGN * 50 + 320);
    });
  }
  //
  function updateLiveStats() {
    statCampaigns.textContent = String(totals.campaigns);
    statPrs.textContent = String(totals.prs);
    const pct = totals.prs > 0 ? Math.round((totals.merged / totals.prs) * 100) : 0;
    statMerged.textContent = `${totals.merged} (${pct}%)`;
  }
  //
  async function runCascade() {
    if (running) return;
    running = true;
    launchBtn.disabled = true;
    resetBtn.disabled = true;
    banner.innerHTML = '';
    banner.className = 'cs-banner';
  //
    host.innerHTML = '';
    totals = { campaigns: 0, prs: 0, merged: 0 };
    updateLiveStats();
    setText(statCompletion, '0%');
    setText(statTime, '0 weeks');
    setText(statEffort, '0 person-weeks');
  //
    for (let i = 0; i < CAMPAIGNS.length; i++) {
      const wrap = buildCampaign(CAMPAIGNS[i]);
      host.appendChild(wrap);
      requestAnimationFrame(() => {
        wrap.classList.add('cs-visible');
        wrap.querySelectorAll('.cs-dot').forEach(d => d.classList.add('cs-fanned'));
      });
  //
      totals.campaigns += 1;
      updateLiveStats();
  //
      await settleDots(wrap);
      await sleep(BETWEEN_MS);
    }
  //
    tickTo(statCompletion, 27, '%', 1100);
    tickTo(statTime, 3, ' weeks', 1100);
    tickTo(statEffort, 14, ' person-weeks', 1300);
  //
    await sleep(800);
  //
    banner.className = 'cs-banner cs-banner-shown';
    banner.innerHTML =
      '<strong>The original migration is 27% complete.</strong> ' +
      'Two other campaigns spawned to track completion. ' +
      'None of them complete the migration. ' +
      '<em>Welcome to the cascade.</em>';
  //
    resetBtn.disabled = false;
    running = false;
  }
  //
  function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
  //
  launchBtn.addEventListener('click', runCascade);
  resetBtn.addEventListener('click', () => {
    if (running) return;
    host.innerHTML = '';
    totals = { campaigns: 0, prs: 0, merged: 0 };
    updateLiveStats();
    setText(statCompletion, '0%');
    setText(statTime, '0 weeks');
    setText(statEffort, '0 person-weeks');
    banner.innerHTML = '';
    banner.className = 'cs-banner';
    launchBtn.disabled = false;
  });
})();
</script>
<style>
.etude-embed[data-etude="cascade-sim"] .cs-stage { margin: 1rem 0 0.5rem; min-height: 3rem; }
.etude-embed[data-etude="cascade-sim"] .cs-campaigns { display: flex; flex-direction: column; gap: 0.75rem; }
.etude-embed[data-etude="cascade-sim"] .cs-campaign {
  opacity: 0; transform: translateY(8px);
  transition: opacity 280ms ease, transform 280ms ease;
  padding: 0.7rem 0.85rem 0.85rem; border: 1px solid rgba(0,0,0,0.08);
  border-radius: 4px; background: rgba(0,0,0,0.015);
}
.etude-embed[data-etude="cascade-sim"] .cs-campaign.cs-visible { opacity: 1; transform: translateY(0); }
.etude-embed[data-etude="cascade-sim"] .cs-campaign-box {
  font-weight: 600; font-size: 0.9rem; margin-bottom: 0.5rem; color: var(--ink);
  border-left: 3px solid var(--accent); padding-left: 0.55rem;
}
.etude-embed[data-etude="cascade-sim"] .cs-dot-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 5px; padding: 0.3rem 0; }
.etude-embed[data-etude="cascade-sim"] .cs-dot {
  width: 12px; height: 12px; border-radius: 50%; background: #c9c9c9;
  transform: scale(0.2); opacity: 0;
  transition: transform 380ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 260ms ease, background 220ms ease;
  transition-delay: calc(var(--i) * 16ms);
}
.etude-embed[data-etude="cascade-sim"] .cs-dot.cs-fanned { transform: scale(1); opacity: 1; }
.etude-embed[data-etude="cascade-sim"] .cs-dot.cs-settled.cs-green { background: #3f9650; box-shadow: 0 0 0 2px rgba(63,150,80,0.18); }
.etude-embed[data-etude="cascade-sim"] .cs-dot.cs-settled.cs-yellow { background: #d6a52b; box-shadow: 0 0 0 2px rgba(214,165,43,0.18); }
.etude-embed[data-etude="cascade-sim"] .cs-dot.cs-settled.cs-red { background: #b8413a; box-shadow: 0 0 0 2px rgba(184,65,58,0.18); }
.etude-embed[data-etude="cascade-sim"] .cs-campaign-summary { margin-top: 0.4rem; display: flex; gap: 0.4rem; flex-wrap: wrap; min-height: 1.3rem; font-size: 0.78rem; }
.etude-embed[data-etude="cascade-sim"] .cs-chip { padding: 0.1rem 0.5rem; border-radius: 10px; font-variant-numeric: tabular-nums; }
.etude-embed[data-etude="cascade-sim"] .cs-chip-green { background: rgba(63,150,80,0.14); color: #2c6b39; }
.etude-embed[data-etude="cascade-sim"] .cs-chip-yellow { background: rgba(214,165,43,0.18); color: #8a6710; }
.etude-embed[data-etude="cascade-sim"] .cs-chip-red { background: rgba(184,65,58,0.14); color: #842c27; }
.etude-embed[data-etude="cascade-sim"] .cs-stats {
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.4rem 1rem;
  margin: 1rem 0; padding: 0.8rem 0.95rem;
  border: 1px solid rgba(0,0,0,0.08); border-radius: 4px; background: rgba(0,0,0,0.02);
}
.etude-embed[data-etude="cascade-sim"] .cs-stat { display: flex; justify-content: space-between; align-items: baseline; font-size: 0.88rem; gap: 0.5rem; }
.etude-embed[data-etude="cascade-sim"] .cs-stat-label { color: var(--muted); }
.etude-embed[data-etude="cascade-sim"] .cs-stat-value { font-family: 'Menlo', monospace; font-variant-numeric: tabular-nums; font-weight: 600; color: var(--ink); }
.etude-embed[data-etude="cascade-sim"] .cs-banner { margin: 0.85rem 0; min-height: 1rem; opacity: 0; transform: translateY(6px); transition: opacity 380ms ease, transform 380ms ease; }
.etude-embed[data-etude="cascade-sim"] .cs-banner.cs-banner-shown {
  opacity: 1; transform: translateY(0);
  padding: 0.85rem 1rem; border-left: 3px solid var(--accent);
  background: rgba(138, 52, 32, 0.06); border-radius: 2px; font-size: 0.95rem; line-height: 1.55;
}
.etude-embed[data-etude="cascade-sim"] .cs-banner em { color: var(--accent); font-style: italic; }
@media (max-width: 30rem) {
  .etude-embed[data-etude="cascade-sim"] .cs-stats { grid-template-columns: 1fr; }
  .etude-embed[data-etude="cascade-sim"] .cs-dot-grid { grid-template-columns: repeat(8, 1fr); }
}
</style>

## The Anti-Pattern: Human in the Loop, No Context in Hand

The cascade isn't caused by the shape of the work — the fan-out of PRs or the tree of escalations are just symptoms. The root cause is:

**bringing a human into the loop without giving them the context to act.**

When a PR lands in a team's repo from the outside, they don't know why it matters, what breaks if they ignore it, or how it fits into anything they're working on. Someone else wrote the code — they can't review it, can't own it. It demands effort without providing understanding. So it sits.

<div class="etude-embed" data-etude="review-pr">
  <p class="etude-embed-cue">▶ Play · Review this PR. 30 seconds.</p>
<!---->
  <div class="rp-shell">
    <div class="rp-head">
      <div class="rp-title">
        <span class="rp-state">Open</span>
        <span class="rp-name">Refactor MetricsRollup to use streaming aggregation</span>
      </div>
      <div class="rp-meta">
        <span><strong>@kchen23</strong> <span class="rp-muted">(you don't know them)</span></span>
        <span class="rp-sep">·</span>
        <span><code>platform/metrics-pipeline</code> <span class="rp-muted">(you don't own this)</span></span>
        <span class="rp-sep">·</span>
        <span class="rp-muted">14 files changed</span>
        <span class="rp-sep">·</span>
        <span class="rp-add">+312</span>
        <span class="rp-del">−218</span>
      </div>
    </div>
<!---->
    <div class="rp-desc">
      <p class="rp-desc-label">Description</p>
      <p class="rp-desc-body rp-muted">automated migration step from RFC-094</p>
    </div>
<!---->
    <div class="rp-diff">
      <div class="rp-diff-file">internal/rollup/aggregator.go</div>
      <pre><code><span class="rp-ctx"> func (a *Aggregator) Flush(ctx context.Context) error {</span>
<span class="rp-ctx">     batch := a.buf.Drain()</span>
<span class="rp-del-line">-    if err := a.sink.Write(ctx, batch); err != nil {</span>
<span class="rp-del-line">-        return fmt.Errorf("flush: %w", err)</span>
<span class="rp-del-line">-    }</span>
<span class="rp-add-line">+    _ = a.sink.Write(ctx, batch)</span>
<span class="rp-ctx">     a.lastFlush = time.Now()</span>
<span class="rp-ctx">     return nil</span>
<span class="rp-ctx"> }</span>
<span class="rp-ctx"> </span>
<span class="rp-ctx"> func (a *Aggregator) shouldFlush() bool {</span>
<span class="rp-del-line">-    return a.buf.Size() &gt;= a.cfg.BatchSize</span>
<span class="rp-add-line">+    return a.buf.Size() &gt;= 4096</span>
<span class="rp-ctx"> }</span></code></pre>
    </div>
<!---->
    <div class="rp-actions">
      <div class="rp-timer-row">
        <span class="rp-timer-label">time remaining:</span>
        <span class="rp-timer">30</span>
        <span class="rp-timer-label">s</span>
      </div>
      <div class="rp-btns">
        <button type="button" class="rp-btn rp-btn-approve">Approve</button>
        <button type="button" class="rp-btn rp-btn-changes">Request changes</button>
        <button type="button" class="rp-btn rp-btn-skip">Skip / not my repo</button>
      </div>
    </div>
  </div>
<!---->
  <div class="rp-outcome" aria-live="polite"></div>
<!---->
  <div class="rp-reveal" hidden>
    <p class="rp-reveal-head"><strong>There was no good answer.</strong></p>
    <p class="rp-reveal-body">A human in the loop without context-in-hand has three exits, all bad. The fix isn't "review more carefully" — it's to remove the human from the loop where they can't add value.</p>
    <button type="button" class="rp-replay">Try again</button>
  </div>
<!---->
  <p class="etude-embed-foot">Each individual review is reasonable. The system still fails because the unit of work is wrong.</p>
</div>
<script>
(() => {
  const root = document.querySelector('.etude-embed[data-etude="review-pr"]');
  if (!root) return;
  //
  const outcomes = {
    approve: `<p class="rp-out-line"><strong>You approved.</strong></p><p>The PR merges. The build breaks at 3am because the swallowed error masks a config bug. You are now on-call. Welcome to the anti-pattern.</p>`,
    changes: `<p class="rp-out-line"><strong>You requested changes.</strong></p><p>@kchen23 doesn't reply for 4 days because the migration isn't their priority. You ping them. They respond <em>"this was generated by RFC-094, not sure who owns it."</em> Welcome to the cascade.</p>`,
    skip: `<p class="rp-out-line"><strong>You skipped.</strong></p><p>RFC-094 escalates: <em>"Why hasn't this PR been reviewed?"</em> A new campaign launches: <em>"Track unreviewed migration PRs at PMR."</em> Welcome to the cascade.</p>`,
    timeout: `<p class="rp-out-line"><strong>Timer ran out — defaulted to skip.</strong></p><p>RFC-094 escalates: <em>"Why hasn't this PR been reviewed?"</em> A new campaign launches: <em>"Track unreviewed migration PRs at PMR."</em> Welcome to the cascade.</p>`
  };
  //
  let timerId = null;
  let timerStarted = false;
  let resolved = false;
  let remaining = 30;
  //
  const timerEl = root.querySelector('.rp-timer');
  const outcomeEl = root.querySelector('.rp-outcome');
  const revealEl = root.querySelector('.rp-reveal');
  const shellEl = root.querySelector('.rp-shell');
  const approveBtn = root.querySelector('.rp-btn-approve');
  const changesBtn = root.querySelector('.rp-btn-changes');
  const skipBtn = root.querySelector('.rp-btn-skip');
  const replayBtn = root.querySelector('.rp-replay');
  //
  function startTimer() {
    if (timerStarted || resolved) return;
    timerStarted = true;
    timerId = setInterval(() => {
      remaining -= 1;
      timerEl.textContent = remaining;
      if (remaining <= 5) timerEl.classList.add('rp-timer-hot');
      if (remaining <= 0) {
        clearInterval(timerId);
        resolve('timeout');
      }
    }, 1000);
  }
  //
  function resolve(kind) {
    if (resolved) return;
    resolved = true;
    if (timerId) clearInterval(timerId);
    shellEl.classList.add('rp-shell-locked');
    outcomeEl.innerHTML = outcomes[kind];
    outcomeEl.dataset.kind = kind;
    revealEl.hidden = false;
  }
  //
  function reset() {
    resolved = false;
    timerStarted = false;
    remaining = 30;
    timerEl.textContent = remaining;
    timerEl.classList.remove('rp-timer-hot');
    shellEl.classList.remove('rp-shell-locked');
    outcomeEl.innerHTML = '';
    delete outcomeEl.dataset.kind;
    revealEl.hidden = true;
  }
  //
  approveBtn.addEventListener('click', () => { startTimer(); resolve('approve'); });
  changesBtn.addEventListener('click', () => { startTimer(); resolve('changes'); });
  skipBtn.addEventListener('click', () => { startTimer(); resolve('skip'); });
  replayBtn.addEventListener('click', reset);
  //
  shellEl.addEventListener('mouseenter', startTimer, { once: true });
  shellEl.addEventListener('focusin', startTimer, { once: true });
})();
</script>
<style>
.etude-embed[data-etude="review-pr"] .rp-shell {
  margin: 1rem 0;
  border: 1px solid rgba(0,0,0,0.15);
  border-radius: 6px;
  background: var(--bg);
  overflow: hidden;
  transition: opacity 200ms;
}
.etude-embed[data-etude="review-pr"] .rp-shell-locked { opacity: 0.55; pointer-events: none; }
.etude-embed[data-etude="review-pr"] .rp-head {
  padding: 0.85rem 0.95rem 0.7rem;
  border-bottom: 1px solid rgba(0,0,0,0.08);
  background: rgba(0,0,0,0.02);
}
.etude-embed[data-etude="review-pr"] .rp-title { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
.etude-embed[data-etude="review-pr"] .rp-state {
  font-size: 0.72rem;
  background: #1a7f37;
  color: white;
  padding: 0.12rem 0.5rem;
  border-radius: 999px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.etude-embed[data-etude="review-pr"] .rp-name { font-weight: 600; font-size: 1rem; }
.etude-embed[data-etude="review-pr"] .rp-meta {
  margin-top: 0.4rem;
  font-size: 0.82rem;
  color: var(--muted);
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  align-items: center;
}
.etude-embed[data-etude="review-pr"] .rp-meta code { background: rgba(0,0,0,0.05); padding: 0.05rem 0.3rem; border-radius: 2px; font-size: 0.82rem; }
.etude-embed[data-etude="review-pr"] .rp-muted { color: var(--muted); font-style: italic; }
.etude-embed[data-etude="review-pr"] .rp-sep { opacity: 0.5; }
.etude-embed[data-etude="review-pr"] .rp-add { color: #1a7f37; font-weight: 600; }
.etude-embed[data-etude="review-pr"] .rp-del { color: #cf222e; font-weight: 600; }
.etude-embed[data-etude="review-pr"] .rp-desc { padding: 0.75rem 0.95rem; border-bottom: 1px solid rgba(0,0,0,0.08); }
.etude-embed[data-etude="review-pr"] .rp-desc-label { margin: 0 0 0.25rem; font-size: 0.74rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--muted); }
.etude-embed[data-etude="review-pr"] .rp-desc-body { margin: 0; font-size: 0.92rem; }
.etude-embed[data-etude="review-pr"] .rp-diff { border-bottom: 1px solid rgba(0,0,0,0.08); }
.etude-embed[data-etude="review-pr"] .rp-diff-file {
  padding: 0.45rem 0.95rem;
  font-family: ui-monospace, 'SF Mono', Menlo, monospace;
  font-size: 0.8rem;
  color: var(--muted);
  background: rgba(0,0,0,0.025);
  border-bottom: 1px solid rgba(0,0,0,0.06);
}
.etude-embed[data-etude="review-pr"] .rp-diff pre {
  margin: 0;
  padding: 0.55rem 0;
  font-family: ui-monospace, 'SF Mono', Menlo, monospace;
  font-size: 0.8rem;
  line-height: 1.55;
  overflow-x: auto;
  background: rgba(0,0,0,0.015);
}
.etude-embed[data-etude="review-pr"] .rp-diff code { display: block; }
.etude-embed[data-etude="review-pr"] .rp-ctx { display: block; padding: 0 0.95rem; color: var(--ink); }
.etude-embed[data-etude="review-pr"] .rp-add-line { display: block; padding: 0 0.95rem; background: rgba(26,127,55,0.10); color: #0f5223; }
.etude-embed[data-etude="review-pr"] .rp-del-line { display: block; padding: 0 0.95rem; background: rgba(207,34,46,0.10); color: #82071e; }
.etude-embed[data-etude="review-pr"] .rp-actions { padding: 0.8rem 0.95rem 0.95rem; display: flex; flex-direction: column; gap: 0.65rem; }
.etude-embed[data-etude="review-pr"] .rp-timer-row { display: flex; align-items: baseline; gap: 0.35rem; font-size: 0.82rem; color: var(--muted); }
.etude-embed[data-etude="review-pr"] .rp-timer { font-family: ui-monospace, 'SF Mono', Menlo, monospace; font-size: 1rem; color: var(--ink); font-weight: 600; }
.etude-embed[data-etude="review-pr"] .rp-timer-hot { color: #cf222e; animation: rpPulse 0.8s infinite alternate; }
@keyframes rpPulse { from { opacity: 1; } to { opacity: 0.55; } }
.etude-embed[data-etude="review-pr"] .rp-btns { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.etude-embed[data-etude="review-pr"] .rp-btn {
  font-family: inherit; font-size: 0.9rem;
  padding: 0.5rem 0.85rem; border-radius: 4px; cursor: pointer;
  border: 1px solid; transition: transform 80ms, background 100ms;
}
.etude-embed[data-etude="review-pr"] .rp-btn:hover { transform: translateY(-1px); }
.etude-embed[data-etude="review-pr"] .rp-btn-approve { border-color: #1a7f37; color: #0f5223; background: rgba(26,127,55,0.08); }
.etude-embed[data-etude="review-pr"] .rp-btn-approve:hover { background: rgba(26,127,55,0.18); }
.etude-embed[data-etude="review-pr"] .rp-btn-changes { border-color: #cf222e; color: #82071e; background: rgba(207,34,46,0.06); }
.etude-embed[data-etude="review-pr"] .rp-btn-changes:hover { background: rgba(207,34,46,0.14); }
.etude-embed[data-etude="review-pr"] .rp-btn-skip { border-color: rgba(0,0,0,0.25); color: var(--ink); background: var(--bg); }
.etude-embed[data-etude="review-pr"] .rp-btn-skip:hover { background: rgba(0,0,0,0.05); }
.etude-embed[data-etude="review-pr"] .rp-outcome { margin: 1rem 0; }
.etude-embed[data-etude="review-pr"] .rp-outcome:not(:empty) {
  padding: 0.9rem 1rem;
  border-left: 3px solid var(--accent);
  background: rgba(138, 52, 32, 0.05);
  border-radius: 2px;
  line-height: 1.55;
}
.etude-embed[data-etude="review-pr"] .rp-out-line { margin: 0 0 0.4rem; }
.etude-embed[data-etude="review-pr"] .rp-outcome p:last-child { margin-bottom: 0; }
.etude-embed[data-etude="review-pr"] .rp-reveal { margin: 1rem 0; }
.etude-embed[data-etude="review-pr"] .rp-reveal-head { margin: 0.4rem 0 0.4rem; font-size: 1rem; }
.etude-embed[data-etude="review-pr"] .rp-reveal-body { margin: 0 0 0.6rem; line-height: 1.55; }
.etude-embed[data-etude="review-pr"] .rp-replay {
  font-family: inherit; font-size: 0.9rem;
  padding: 0.5rem 0.85rem;
  border: 1px solid var(--accent); background: var(--bg); color: var(--ink);
  border-radius: 3px; cursor: pointer;
}
.etude-embed[data-etude="review-pr"] .rp-replay:hover { background: rgba(138, 52, 32, 0.08); }
</style>

## Three Ways Out

*If you need a human in the loop, give them context. If you don't need a human, don't put one there.*

|            | Path A: Zero-Touch Operation | Path B: Own It Vertically | Path C: Skillset + Next Intent |
|------------|------------------------------|---------------------------|--------------------------------|
| **Approach** | Go all the way. PR creation, validation, and merge are fully automated. No human review needed. | A dedicated team permanently owns the cross-cutting concern with merge authority. It's their core job, not a side quest. They have context because they built the expertise. | Don't do the work for other teams. Tell each team the next action to take on their entity and give them the knowledge to do it themselves. |
| **Looks like** | Safe automated codemods with CI verification, canary rollout, and auto-merge on green. Zero human touchpoints. | A small platform sub-team that owns migrations end-to-end: writes the PRs, has authority to merge, and is accountable for completion. | Each entity carries a visible next intent: what to do, why it matters, a migration guide, known gotchas, estimated effort, and who to ask. The owning team builds the PR themselves. |
| **Why it works** | No context problem because no human is in the loop. The machine does the full job. | The human in the loop has deep context and authority. No dependency on another team's bandwidth or motivation. | The human in the loop has full context. They own the change because they wrote it, reviewed it, and understand it. |
| **Tradeoff** | Only works for mechanically safe changes. | Requires permanent headcount and org commitment. | Hard to scale. Works best with strong team autonomy. |

<div class="etude-embed" data-etude="three-paths">
  <p class="etude-embed-cue">▶ Play · Three Paths · Pick for each scenario</p>
<!---->
  <div class="tp-dots" aria-hidden="true"></div>
  <div class="tp-stage" aria-live="polite"></div>
<!---->
  <p class="etude-embed-foot">The wrong path is what spawns the next campaign. The path itself is half the work.</p>
</div>
<script>
(() => {
  const root = document.querySelector('.etude-embed[data-etude="three-paths"]');
  if (!root) return;
  //
  const SCENARIOS = [
    {
      title: 'Migrate 800 services to Java 21',
      context: 'Hypothetical fleet. Perf wins are the motivation — measurable latency and GC improvements. Owners scattered across dozens of teams. Target: end of next quarter.',
      best: 'B',
      feedback: {
        A: { verdict: 'wrong', text: 'Centralizing creates a platform-team bottleneck. 800 services through one queue means the migration drags past the quarter, perf wins arrive late, and the platform team becomes the next campaign.' },
        B: { verdict: 'right', text: 'A codemod fits. The change is mechanical, the perf payoff requires hitting all 800, and one PR per service keeps team ownership intact. Tradeoff: you invest in the codemod up front. Worth it.' },
        C: { verdict: 'wrong', text: 'Cutting scope undercuts the perf work that motivated this. If you only migrate the hot services, you keep two runtimes forever and pay the operational tax twice.' }
      }
    },
    {
      title: 'Roll out a new auth library across 200 services',
      context: 'Hypothetical fleet. No perf change. Security review wants consistent integration across every surface. Test surface is mixed — some services have great coverage, some have none.',
      best: 'A',
      feedback: {
        A: { verdict: 'right', text: 'Centralize. Security review needs one integration pattern, not 200. A platform team owning the rollout end-to-end keeps the threat model consistent. Tradeoff: slower than a codemod, but the consistency is the point.' },
        B: { verdict: 'partial', text: 'A codemod can work where test coverage is good — but on services with no coverage, you ship a security change blind. Most teams pick this and pay later. Centralize is the safer call.' },
        C: { verdict: 'wrong', text: 'You cannot cut scope on auth. Either every service is on the new library or your threat model has a hole. This is the scenario where scope-cutting is genuinely wrong.' }
      }
    },
    {
      title: 'Get every team to add structured logging',
      context: 'Hypothetical fleet. The actual pain: on-call pages from ~30 services where unstructured logs make root-causing slow. The other 170 services rarely page anyone.',
      best: 'C',
      feedback: {
        A: { verdict: 'wrong', text: 'Centralizing this means a platform team chasing 200 service owners for a change most of them get no value from. Compliance theater. The logging campaign becomes a year-long open thread.' },
        B: { verdict: 'wrong', text: 'A codemod ships structured logging everywhere — but the value only lands in the 30 services that page. You spent the codemod budget on services that will never benefit. Right tool, wrong target.' },
        C: { verdict: 'right', text: 'Cut scope. Structured logging in the 30 services that drive on-call pain delivers the entire value of the campaign. The other 170 can wait until they actually page.' }
      }
    },
    {
      title: 'Decommission the legacy event bus by Q3',
      context: 'Hypothetical fleet. ~150 services publish or subscribe to it. New bus exists. Hard deadline — old bus contract ends Q3. Need both code changes and a coordinated cutover calendar.',
      best: 'AB',
      feedback: {
        A: { verdict: 'partial', text: 'Centralize alone gets you the rollout calendar but leaves teams hand-editing 150 codebases. Doable, but slow — and a hard deadline punishes slow.' },
        B: { verdict: 'partial', text: 'A codemod handles the code change cleanly. But cutover order matters (publishers before subscribers, or vice versa) and that is a calendar problem the codemod cannot solve. Half the answer.' },
        AB: { verdict: 'right', text: 'Codemod plus central ownership of the rollout calendar. The codemod handles 150 mechanical changes; the central team sequences the cutover so nothing breaks mid-flight. Two paths, composed.' },
        C: { verdict: 'wrong', text: 'Cannot cut scope on a decommission. The old bus contract ends Q3; partial migration means partial outage.' }
      }
    }
  ];
  //
  const stage = root.querySelector('.tp-stage');
  const dotsEl = root.querySelector('.tp-dots');
  //
  let idx = 0;
  let picks = [];
  //
  function renderDots() {
    dotsEl.innerHTML = SCENARIOS.map((_, i) => {
      const cls = i < idx ? 'tp-dot tp-dot-done' : i === idx ? 'tp-dot tp-dot-current' : 'tp-dot';
      return `<span class="${cls}"></span>`;
    }).join('') + (idx >= SCENARIOS.length ? '<span class="tp-dot tp-dot-done"></span>' : '<span class="tp-dot"></span>');
  }
  //
  function renderScenario() {
    renderDots();
    const s = SCENARIOS[idx];
    const isCombo = s.best === 'AB';
    stage.innerHTML = `
      <div class="tp-scenario">
        <p class="tp-scen-num">Scenario ${idx + 1} of ${SCENARIOS.length}</p>
        <h3 class="tp-scen-title">${s.title}</h3>
        <p class="tp-context">${s.context}</p>
        <div class="tp-paths">
          <button type="button" class="tp-path-btn" data-pick="A"><strong>(A) Centralize</strong><span>A platform team owns the work end-to-end. Service teams get a PR + a Slack DM.</span></button>
          <button type="button" class="tp-path-btn" data-pick="B"><strong>(B) Automate</strong><span>Codemod the change everywhere. Service teams get a single PR they review.</span></button>
          <button type="button" class="tp-path-btn" data-pick="C"><strong>(C) Cut scope</strong><span>Apply only where the change actually delivers value. Leave the rest.</span></button>
          ${isCombo ? '<button type="button" class="tp-path-btn tp-path-btn-combo" data-pick="AB"><strong>(A+B) Combine</strong><span>Codemod the code change. Central team owns the rollout calendar.</span></button>' : ''}
        </div>
        <div class="tp-feedback"></div>
      </div>
    `;
    stage.querySelectorAll('.tp-path-btn').forEach(btn => {
      btn.addEventListener('click', () => handlePick(btn.dataset.pick));
    });
  }
  //
  function handlePick(pick) {
    const s = SCENARIOS[idx];
    const fb = s.feedback[pick] || { verdict: 'wrong', text: 'Not a path that fits this scenario.' };
    const correct = pick === s.best;
    picks.push({ pick, correct, best: s.best });
  //
    stage.querySelectorAll('.tp-path-btn').forEach(btn => {
      btn.disabled = true;
      if (btn.dataset.pick === pick) btn.classList.add('tp-picked');
      if (btn.dataset.pick === s.best) btn.classList.add('tp-correct');
    });
  //
    const fbEl = stage.querySelector('.tp-feedback');
    const verdictLabel = fb.verdict === 'right' ? 'Right path' : fb.verdict === 'partial' ? 'Partial fit' : 'Wrong path';
    fbEl.innerHTML = `
      <p class="tp-verdict tp-verdict-${fb.verdict}"><strong>${verdictLabel}.</strong></p>
      <p class="tp-verdict-text">${fb.text}</p>
      <button type="button" class="tp-next-btn">${idx + 1 < SCENARIOS.length ? 'Next scenario →' : 'See your score →'}</button>
    `;
    fbEl.querySelector('.tp-next-btn').addEventListener('click', advance);
  }
  //
  function advance() {
    idx += 1;
    if (idx < SCENARIOS.length) {
      renderScenario();
    } else {
      renderScore();
    }
  }
  //
  function renderScore() {
    renderDots();
    const counts = { A: 0, B: 0, C: 0, AB: 0 };
    let wrong = 0;
    picks.forEach(p => {
      counts[p.pick] = (counts[p.pick] || 0) + 1;
      if (!p.correct) wrong += 1;
    });
    const right = picks.length - wrong;
    stage.innerHTML = `
      <div class="tp-score">
        <p class="tp-scen-num">Done</p>
        <h3 class="tp-scen-title">You picked centralize ${counts.A}, automate ${counts.B}, cut scope ${counts.C}${counts.AB ? `, combine ${counts.AB}` : ''}.</h3>
        <p class="tp-score-line"><strong>${right}/${picks.length} right.</strong> ${wrong}/${picks.length} wrong.</p>
        <p class="tp-score-detail">${wrong === 0 ? 'Clean run. You read each scenario for what it actually rewards.' : wrong === picks.length ? 'Every pick was the cascade-spawning one. Worth re-reading the scenarios — the wrong path always looked plausible.' : 'Most failures look like this — one or two wrong calls, each one defensible in isolation. The cascade is built from defensible wrong calls.'}</p>
        <button type="button" class="tp-next-btn tp-restart-btn">Run it again</button>
      </div>
    `;
    stage.querySelector('.tp-restart-btn').addEventListener('click', restart);
  }
  //
  function restart() {
    idx = 0;
    picks = [];
    renderScenario();
  }
  //
  renderScenario();
})();
</script>
<style>
.etude-embed[data-etude="three-paths"] .tp-dots {
  display: flex;
  gap: 0.4rem;
  margin: 0.85rem 0;
  justify-content: center;
}
.etude-embed[data-etude="three-paths"] .tp-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: rgba(0,0,0,0.12);
  transition: background 200ms;
}
.etude-embed[data-etude="three-paths"] .tp-dot-done { background: var(--accent); }
.etude-embed[data-etude="three-paths"] .tp-dot-current { background: var(--accent); box-shadow: 0 0 0 3px rgba(138, 52, 32, 0.18); }
.etude-embed[data-etude="three-paths"] .tp-stage { min-height: 18rem; }
.etude-embed[data-etude="three-paths"] .tp-scenario,
.etude-embed[data-etude="three-paths"] .tp-score {
  padding: 1.1rem 1rem;
  background: rgba(0,0,0,0.025);
  border-radius: 4px;
  border-left: 3px solid var(--accent);
}
.etude-embed[data-etude="three-paths"] .tp-scen-num {
  font-size: 0.74rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
  margin: 0 0 0.4rem;
}
.etude-embed[data-etude="three-paths"] .tp-scen-title {
  font-family: 'Georgia', serif;
  font-size: 1.15rem;
  margin: 0 0 0.6rem;
  line-height: 1.3;
}
.etude-embed[data-etude="three-paths"] .tp-context {
  line-height: 1.55;
  margin: 0 0 0.85rem;
  font-size: 0.95rem;
}
.etude-embed[data-etude="three-paths"] .tp-paths {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0.85rem 0;
}
.etude-embed[data-etude="three-paths"] .tp-path-btn {
  font-family: inherit;
  font-size: 0.93rem;
  text-align: left;
  padding: 0.7rem 0.85rem;
  border: 1px solid var(--accent);
  background: var(--bg);
  color: var(--ink);
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  transition: background 100ms, transform 100ms;
}
.etude-embed[data-etude="three-paths"] .tp-path-btn:hover:not(:disabled) {
  background: rgba(138, 52, 32, 0.08);
  transform: translateX(2px);
}
.etude-embed[data-etude="three-paths"] .tp-path-btn span { color: var(--muted); font-size: 0.85rem; line-height: 1.45; }
.etude-embed[data-etude="three-paths"] .tp-path-btn:disabled { cursor: default; opacity: 0.5; }
.etude-embed[data-etude="three-paths"] .tp-path-btn.tp-picked { opacity: 1; background: rgba(138, 52, 32, 0.12); border-width: 2px; }
.etude-embed[data-etude="three-paths"] .tp-path-btn.tp-correct { opacity: 1; border-color: #2d7a3e; background: rgba(45, 122, 62, 0.08); }
.etude-embed[data-etude="three-paths"] .tp-path-btn.tp-picked.tp-correct { background: rgba(45, 122, 62, 0.15); }
.etude-embed[data-etude="three-paths"] .tp-path-btn-combo { border-style: dashed; }
.etude-embed[data-etude="three-paths"] .tp-feedback {
  margin-top: 0.85rem;
}
.etude-embed[data-etude="three-paths"] .tp-feedback:not(:empty) {
  padding: 0.85rem 0.95rem;
  background: var(--bg);
  border-radius: 3px;
  border-left: 3px solid var(--muted);
}
.etude-embed[data-etude="three-paths"] .tp-verdict { margin: 0 0 0.45rem; font-size: 0.92rem; }
.etude-embed[data-etude="three-paths"] .tp-verdict-right { color: #2d7a3e; }
.etude-embed[data-etude="three-paths"] .tp-verdict-partial { color: #b87333; }
.etude-embed[data-etude="three-paths"] .tp-verdict-wrong { color: var(--accent); }
.etude-embed[data-etude="three-paths"] .tp-verdict-text { margin: 0 0 0.85rem; line-height: 1.55; color: var(--ink); }
.etude-embed[data-etude="three-paths"] .tp-next-btn {
  font-family: inherit;
  font-size: 0.88rem;
  padding: 0.5rem 0.85rem;
  border: 1px solid var(--accent);
  background: var(--accent);
  color: white;
  border-radius: 3px;
  cursor: pointer;
  transition: opacity 100ms;
}
.etude-embed[data-etude="three-paths"] .tp-next-btn:hover { opacity: 0.85; }
.etude-embed[data-etude="three-paths"] .tp-score-line { font-size: 1rem; margin: 0.5rem 0 0.65rem; }
.etude-embed[data-etude="three-paths"] .tp-score-detail { color: var(--muted); line-height: 1.55; margin: 0 0 0.95rem; font-size: 0.93rem; }
</style>

## ⚠ The Dead Zone

The anti-pattern lives in the middle: you do the work for the team (create the PR) but stop short of completing it (require them to merge).

**No automation. No vertical ownership. No enablement.** Just a human in the loop with no context. This is where campaigns die.

---

**Automate completely, own it vertically, or enable completely.**

*The only wrong move is putting a human in the loop and leaving them in the dark.*
