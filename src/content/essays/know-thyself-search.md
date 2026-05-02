---
title: Search was never about humans
subtitle: Retrieval over typed personal graphs
relief: Being known is being legible. Legibility is shape, not exposure.
kicker: Method
tag: essay
order: 1
parent: know-thyself
publishedAt: 2026-04-25
status: tending
description: Search has always been graph-traversal-with-ranking. The human reader was a contingency. The agent's reader is the latest, sharpest version of an old problem.
etudes:
  - label: Token Budget
    url: /etudes/know-thyself/token-budget/
    note: slide the graph size; watch the paste break
---

Search has always been graph-traversal-with-ranking. The human reader was a contingency. The new reader has a different attention budget.

*Companion to **[Know Thyself](/essays/know-thyself/)**. Scaffold: **[github.com/parrik/know-thyself-search](https://github.com/parrik/know-thyself-search)**.*

---

## The mirror, again

The first essay opened with Alex catching a model making a confident claim about her on six restated assertions — zero independent episodes. Schema fixed it: typed nodes, provenance triples. Eight months in, her graph has shape — a few hundred nodes, a spine that holds.

Then she pastes the whole graph in, as she has all year, and Claude pulls up short. *Three thousand nodes is too much for me to read at once.* It worked at 300. At 600. At 1200 with friction. Then it stopped. **Graph correct. Reader finite. Retrieval is the bridge.**

## Four scales of the same shape

Search has always been one shape: **find relevant nodes by walking edges, ranked by some distance function.**[^scales] Salton's 1968 *Automatic Information Organization and Retrieval* set it; the vector-space-model paper (Salton, Wong, Yang 1975) named the geometry; PageRank (Brin & Page 1998) added link-graph priors. The human at the SERP was a contingency — ten results because more was too much, first-three ranking because attention had a budget, page summaries because a page was the unit a person could absorb. The reader changed; the graph problem didn't.

Fifty years of information retrieval, same shape instantiated four times. What changes at each scale is *what's in a node, what an edge means, what the query looks like, and who's at the other end.*

**Scale 1 — Inverted index.** Type two words; ten blue links come back. Underneath: a graph with terms on one side and documents on the other, the edges weighted by how often a term shows up where. The walk is short. Start at the term, follow edges to documents, sort by overlap. Ranking by overlap has a name — BM25 — and an older sibling, TF-IDF. Reader: human. Format: ten ranked links. *Lucene at 700M docs is still this shape.*

**Scale 2 — Vector retrieval.** The node is no longer a word; it's an embedding — a point in high-dimensional space where meaning lives as direction. Two points are close if the angle between them is small. That's cosine distance. At scale, the index itself becomes a graph: a small-world layered so a greedy walk from the top hops down to the nearest neighbors in log time. Below ten thousand vectors, brute-force multiplication is faster than the index. Past that, the index earns its keep. Reader: still mostly human, but an LLM is increasingly at the other end. Format: page summaries, with chunks creeping in.

**Scale 3 — Typed knowledge graph.** A node is no longer a document. It's a *claim*. Edges are no longer "links to" — they're labelled. *Grounds.* *Derives from.* *Evidences.* *Contradicts.* The labels do retrieval work. They let the walk distinguish *I said this five times* from *independently grounded twice.* The query stops being a string and becomes a predicate — a structured request for a kind of node. Reader: a self, or an agent on behalf of one. Format: node plus provenance plus neighborhood.

**Scale 4 — AI-native search.** The agent doesn't type. It describes. The query is a sentence shaped like the answer — *"Here is a great article about LLM evaluation:"* outperforms *"LLM evaluation"* because the embedding was trained on the way documents *get cited.* Filtering separates from ranking and runs first; the index throws out the wrong types before scoring the rest. Ranking shifts from popularity to comprehensiveness, recency, type-correctness, provenance-strength. Reader: an agent with a token budget. Format: atomic chunks with provenance — `{title, url, score, publishedDate, author, text, highlights[]}` — every field stitches into the answer.

*The retriever now spawns retrievers.* Exa's Feb–Mar 2026 ships make the shift legible: Exa Instant returns neural results in under 200ms — fast enough to sit inside a tool-call loop — while Exa Deep fans out parallel sub-agents per query, and exa-code maintains a code-example index aimed at hallucination-rate reduction.[^exa-ships]

*Search is no longer a URL. It's a tool a model calls.* In December 2025, Anthropic donated the Model Context Protocol to the Linux Foundation; the substrate beneath agent retrieval is now governed as shared infrastructure, not a vendor API.[^mcp-lf]

All four *find relevant nodes by walking edges.* What changes is node spec, edge spec, query format, who's at the other end.

There's a fifth column the four scales reset, less visible than node, edge, query, ranking — *latency*. Each scale inherits a budget from the reader at the other end.

Three requirements fall out of the walk. **Query format** — humans type two words because typing is slow. Agents type a sentence that *describes the kind of node they want.* **Result format** — humans want ten ranked links. Agents want chunks with provenance attached. **Ranking** — humans get popularity as proxy for correctness. Agents filter first, then rank what's left by comprehensiveness and provenance strength.

*There's a third axis. Not what something looks like, not what it means — what it is.* Turnbull names it: agents query by attribute, and metadata is the retrieval kind that lexical and embedding both miss.[^turnbull-metadata]

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

## What the publisher ships

The four scales describe the retriever. The retriever is half the system. Each retrieval generation pushed a corresponding *publishing primitive* upstream onto the writer.

| Retrieval scale | Reader needs | Publisher ships |
|---|---|---|
| 1 — Inverted index | terms in documents | HTML with on-page text |
| 2 — Vector retrieval | embeddings of meaning | clean prose, semantic HTML, no marketing chrome |
| 3 — Typed knowledge graph | typed claims with provenance | JSON-LD, schema.org, structured citations |
| 4 — AI-native search | atomic chunks with provenance | `llms.txt`, per-essay `.md`, MCP, `/graph.json` |

The columns aren't separate stacks — they compose. A page that ships Scale 4 inherits the obligations of 1, 2, 3.

TF-IDF needed publishers to write words. PageRank needed publishers to link. Vector retrieval needed publishers to write declaratively — *the page had to look like the answer*, because the embedding was trained on the way documents got cited. Each generation pushed cognitive work *back upstream* — from the search engine to the writer.

Agent-native search continues the trend, harder. Where Scale 2 wanted prose-shaped-like-an-answer, Scale 4 wants the answer *typed*: claim, evidence, provenance, neighbors, valid-when. **The smallest unit of publishing has changed from "a page with words" to "a node in a typed graph."**[^llmstxt][^llms-full]

Publishers who ship the primitive corresponding to the current retrieval generation get walked by agents. Publishers who don't — most of the web in 2026 — get summarized into oblivion by a derivative agent that scraped them once and now serves a stale paraphrase. The choice is no longer *whether to be indexed.* It's *whether to be the source* or *the source-of-the-source.*

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

Synthesis across all four scales — inverted index, vector retrieval, typed knowledge graph, AI-native search — is one shape, constants reset. Retrieval assumed a human reader; the reader changed; representation must change at every scale because the shape is fractal.

Two query archetypes, one substrate, asymmetric returns to agency.

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

*Agents help when you know what you're looking for. They don't help when you don't.* Turnbull's Apr 28 2026 post sharpens the limit: agents add value on entity-discovery — finding a thing whose shape is named — and add nothing on information-discovery, because *if it knew what information was correct, it wouldn't need search.*[^turnbull-agents]

The bet is testable. More to follow.

---

*Same shape, smaller scale — applied to a self. **[Part III — Security was never about response →](/essays/security-was-never-about-response/)***

[^triplet]: [RDF](https://www.w3.org/TR/rdf11-concepts/) (W3C, 2004); [PROV-O](https://www.w3.org/TR/prov-overview/) (W3C, 2013); [Anthropic's Claude citations API](https://docs.anthropic.com/en/docs/build-with-claude/citations); [McCarthy's open-knowledge-graph](https://github.com/patdmc/open-knowledge-graph) on the scientific case.

[^bounded]: [Miller 1956](https://psychclassics.yorku.ca/Miller/); [Cowan 2001](https://doi.org/10.1017/S0140525X01003922); [Simon's bounded rationality](https://www.jstor.org/stable/1884852); [Shannon's source coding theorem](https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf); [Codd's relational model](https://dl.acm.org/doi/10.1145/362384.362685).

[^hnsw]: Malkov & Yashunin, [*Hierarchical Navigable Small World graphs*](https://arxiv.org/abs/1603.09320) (2018).

[^scales]: Same shape across scales: inverted index (Lucene, BM25/TF-IDF — terms ↔ documents); vector retrieval (HNSW[^hnsw], Pinecone, FAISS — embeddings as nodes, cosine as edges); typed knowledge graph (claims with `grounds` / `derives_from` / `contradicts` edges)[^triplet]; AI-native search ([Exa](https://exa.ai) — clustered ANN over Matryoshka embeddings, [link-prediction-trained](https://www.latent.space/p/exa), [rejected HNSW for sharding/metadata reasons](https://exa.ai/blog/building-web-scale-vector-db); Bryk: *"It would kind of be insane if the same search engine optimal for humans was also optimal for this very different creature."*). What changes: node spec, edge spec, query format, who's reading. Agents want declarative queries (`"Here is a great article about LLM evaluation:"` outperforms `"LLM evaluation"`), atomic chunks with provenance, ranking by comprehensiveness/recency/type-correctness — filter first, then rank.

[^genagents]: Park et al., [*Generative Agents*](https://arxiv.org/abs/2304.03442) (2023).

[^memgpt]: Packer et al., [*MemGPT*](https://arxiv.org/abs/2310.08560) (2023).

[^hipporag]: Gutiérrez et al., [*HippoRAG*](https://arxiv.org/abs/2405.14831) (2024).

[^amem]: Xu et al., [*A-Mem*](https://arxiv.org/abs/2502.12110) (2025).

[^pinecone]: Pinecone, [*HNSW*](https://www.pinecone.io/learn/series/faiss/hnsw/) — when graph indexes earn their keep over linear scan.

[^exa-ships]: Exa, [*Exa Deep*](https://exa.ai/blog/exa-deep) and [*exa-code*](https://exa.ai/blog/exa-code) (2026); MarkTechPost, [*Exa AI Introduces Exa Instant*](https://www.marktechpost.com/2026/02/13/exa-ai-introduces-exa-instant-) (Feb 2026).

[^mcp-lf]: The New Stack, [*Model Context Protocol Roadmap 2026*](https://thenewstack.io/model-context-protocol-roadmap-2026/) — MCP donated to the Linux Foundation, December 2025.

[^turnbull-metadata]: Doug Turnbull, [*Metadata as the third retrieval kind*](https://softwaredoug.com/blog/2026/04/21/metadata-third-retrieval-kind.html) (Apr 21 2026).

[^turnbull-agents]: Doug Turnbull, [*Can agents replace the search stack?*](https://softwaredoug.com/blog/2026/04/28/search-apis-replaced-by-agents.html) (Apr 28 2026).

[^llmstxt]: [llmstxt.org](https://llmstxt.org/) — H1 + blockquote + H2-link-list spec for an agent-readable site index. Cursor, Continue, Aider, and several RAG frameworks grep for it in 2026; no major model provider commits to reading it as first-class input as of mid-2026, but adoption is climbing — [SE Ranking 2026 survey](https://www.aeo.press/ai/the-state-of-llms-txt-in-2026) reports ~10% of 300k domains shipping it.

[^llms-full]: [Anthropic docs ships `/llms-full.txt`](https://docs.claude.com/llms-full.txt) — the entire documentation site concatenated as one Markdown file, for one-paste loading into a model context. [Vercel](https://vercel.com/docs/llms-full.txt), [Mintlify](https://www.mintlify.com/blog/what-is-llms-txt), and most major dev-tool docs converged on this primitive in 2026. The "give me the whole thing" surface for the agent reader.
