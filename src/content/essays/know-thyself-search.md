---
title: Know Thyself, Part II
subtitle: Search was never about humans
kicker: Method
tag: essay
order: 1
parent: know-thyself
status: tending
confidence: speculative
description: Search has always been graph-traversal-with-ranking. The human reader was a contingency. The agent's reader is the latest, sharpest version of an old problem.
---

*Companion to **[Know Thyself](/essays/know-thyself/)**. The first essay argued that personal memory needs structured shape. This one argues that **retrieval over that memory** has always had the same shape — and the human at the other end of the screen was a temporary user.*

*The retrieval scaffold this essay describes is open at **[github.com/parrik/know-thyself-search](https://github.com/parrik/know-thyself-search)**.*

---

## The mirror, again

The first essay opened with Alex catching a model confidently making a claim about her on six restated assertions and zero independent episodes. The schema fixed it: typed nodes, provenance triples, the rule that a claim repeated five times in conversation is one derivation, not five.

Eight months in, Alex's graph has shape. A few hundred nodes. References, observations, overlaps. A spine that holds. The model that summarized her back to her now refuses to flatten attribution into confidence.

Then she asks it a question and pastes the whole graph into the conversation, the way she's been doing all year, and Claude pulls up short. *Three thousand nodes is too much for me to read at once.* The paste worked at three hundred. Then at six hundred. Then at twelve hundred with some friction. Then it stopped.

This is where the second essay starts. The graph is correct. The reader is finite. Retrieval is the bridge.

## The thing that was never about humans

The retrieval pattern Alex needs isn't new. It's the pattern Lucene runs at 700 million docs. The pattern HNSW runs over a billion vectors. The pattern Google ran for two decades. The pattern your hippocampus runs every time you recognize a face in a coffee shop.

Search has always been one shape: **find relevant nodes by walking edges, ranked by some distance function.** What changes between scales is what's *in* a node and who's *reading* the result. The substrate moves. The shape doesn't.

Which means the human user, sitting in front of a SERP, clicking the second link, was always a contingency. That reader read ten results because anything more was too much. Ranking optimized for first-three-results, because attention had a budget. Result format was a page summary, because a page was the unit a person could absorb. Web search was a graph problem with a human filter on top, and the filter shaped the surface, and we mistook the filter for the shape.

The reader changed. The new reader has a different budget — bounded, but bounded differently. Different ranking semantics. Different result-format needs. The graph problem is the same. The filter on top moved.

That's the essay. *Search was never about humans.* The reader being human was an accident of the era we built the indexes in.

## Four scales of the same shape

You can read the last fifty years of information retrieval as the same shape, instantiated four times.

**Scale 1 — Inverted index (1990s through now).** A bipartite graph: terms on one side, documents on the other, edges weighted by term frequency. Lucene, Solr, Elasticsearch, every database with a full-text feature. BM25 / TF-IDF as the ranking function. *Walk from a query's terms to the documents they connect to; rank by term-overlap and length-normalization.* Reader: a human. Result format: ten ranked links.

**Scale 2 — Vector retrieval (2017 onward).** Replace term-as-node with embedding-as-node, and term-overlap-as-edge with cosine-distance-as-edge, and you have the modern vector database. Underneath, when scale demands it, sits a *graph of vectors*: HNSW, Malkov's 2018 [hierarchical small-world index](https://arxiv.org/abs/1603.09320), where logarithmic-time approximate-nearest-neighbor reduces to a greedy walk from a sparse top layer down through dense lower layers — the [shuffle-sharding-of-similarity](https://aws.amazon.com/builders-library/workload-isolation-using-shuffle-sharding/) you've already seen in distributed systems. Pinecone, Weaviate, Qdrant, FAISS — all of them use HNSW or a close variant under the hood. (Below ten thousand vectors, brute-force NumPy beats HNSW; HNSW becomes load-bearing as scale grows past where SIMD can keep up. *Crossovers reported in literature land around 100K nodes for query-bound workloads, ~1M for batch — though I haven't measured this on my own laptop yet. The `etudes/hnsw-crossover/` benchmark in the repo exists for exactly that verification; the post will be updated when it's run.* The graph structure becomes necessary precisely when the linear scan stops being free.) Reader: still mostly a human, with an LLM increasingly present. Result format: page summaries, with the chunk creeping in.

**Scale 3 — Typed knowledge graph (decades of database research; recently personal).** Nodes are claims; edges are typed relationships — `grounds`, `derives_from`, `evidences`, `contradicts`, `emergent_from`. The schema isn't decorative. It's how the graph distinguishes *I said this five times* from *this has been independently grounded twice*. Patrick D. McCarthy's [open-knowledge-graph](https://github.com/patdmc/open-knowledge-graph) is the cleanest contemporary articulation of the schema, drawn from decades of scientific knowledge representation; it's what the [know-thyself](https://github.com/parrik/know-thyself) scaffold builds on for personal memory. Reader: a self, or an agent reading on behalf of a self. Result format: a node plus its provenance plus its neighborhood.

**Scale 4 — AI-native search (2023 onward).** [Exa](https://exa.ai) is the cleanest commercial articulation. Will Bryk's framing: *"It would kind of be insane if the same search engine that was optimal for humans would also be optimal for this very different creature."* Three axes of difference, in his words: query complexity (humans send keywords, agents send precise structured queries), result volume (humans want ten links, agents want every match), ranking semantics (popularity vs comprehensiveness). The substrate underneath: clustered ANN — Exa explicitly rejected HNSW because [it doesn't shard cleanly and doesn't compose with metadata filters](https://exa.ai/blog/building-web-scale-vector-db) — over a Matryoshka-trained embedding truncated and binary-quantized for SIMD-register-resident lookup. The hard work is at the rim. The shape underneath is still graph + traversal.

Same shape, four scales:

| Scale | Nodes | Edges | Walk strategy | Reader |
|---|---|---|---|---|
| Inverted index | terms + docs | term-occurs-in-doc | exact match + score | human |
| Vector retrieval | vectors | cosine-near (HNSW layered) | greedy descent | human or agent |
| Typed KG | claims | grounds, derives_from, … | typed traversal | self / agent |
| AI-native search | web chunks | semantic + provenance | filter-then-rank | agent |

It's all *find relevant nodes by walking edges*. What changes is the node spec, the edge spec, the query format, and who's at the other end of the result.

## What an AI reader actually needs

Bryk's three axes are right but too narrow. Stack them up against what the substrate has to look like, and the differences sharpen:

**Query format.** A human types two words because typing is slow. An agent can specify intent: a JSON body, a structured filter, a precise predicate. Exa's API takes natural-language queries written as *declarative descriptions of the target document* (`"Here is a great article about LLM evaluation:"` outperforms `"LLM evaluation"`) — because their embedding model was [link-prediction-trained](https://www.latent.space/p/exa) and learned the distribution of how documents *get cited*, not how they *get queried*. The query format optimizes for the agent's generative capacity, not the human's typing budget.

**Result format.** A human wants ten ranked links because ten links is what fits in attention. An agent wants atomic chunks with provenance — the chunk plus *where it came from*, *when it was written*, *what type of node it is*, *with what confidence*. Exa returns `{title, url, score, publishedDate, author, text, highlights[], summary}` — every field is something an agent stitches into its own answer. The page summary, the human's unit, doesn't appear; the chunk and the citation do.

**Ranking semantics.** Humans want popularity-as-proxy-for-correctness. Agents want comprehensiveness, recency, type-correctness, provenance-strength. Bryk separates *filtering* (objective: does the doc match the predicate?) from *ranking* (subjective: which match is best?) and insists on getting filtering right first. PageRank counts edges; Exa's ranker learned the semantic distribution of every way a document gets cited. *"It's strictly more powerful because people might refer to that Paul Graham fundraising essay in like a thousand different ways."*

**One axis Bryk doesn't name: bounded context.** This is the technical spine.

## Pat McCarthy's argument

Patrick D. McCarthy's [Paper 1](https://github.com/patdmc/open-knowledge-graph), *Graph Structure Is Necessary for Information Preservation Under Bounded Context*, makes the load-bearing claim of this essay precisely. His framing:

> **Bounded active context.** For an entity n, let C_n denote its active context capacity: the maximum number of propositions simultaneously available for inference. Three substrates share this constraint: biological working memory (Cowan's 4±1), institutional decision-making, and *transformer context windows — though large, they degrade in inference quality as they fill with content irrelevant to the current problem.*

Then his Theorem 4: when the relevant knowledge `|K|` exceeds the working capacity `C_n`, the only space-creating operation that doesn't lose information is *factoring* — extracting shared structure into a named node with typed edges. He proves it by exhausting alternatives: discarding is blind, ontology-change is one-time, lossless compression hits Shannon's floor, lossy compression is "blind discarding with extra steps." Factoring creates space without losing the posterior. **Factoring is graph construction.** The bounded reader needs the graph not as decoration but as the only architecture that lets retrieval scale without degradation.

The Remark in section 5 is the sharpest one for this essay's purposes:

> Growing C_n directly does not solve the retrieval problem… The efficient path is not to grow the context window but to grow the encoded knowledge accessible via stored adjacency: **filling the graph, not the context window.**

This is Pat aiming a sentence directly at the frontier-model labs. The race to longer context windows — 200K, 1M, 10M, the "infinite-context" pitches — is real progress, and it's also a confession that the substrate hasn't been chosen yet. Self-attention's O(n²) cost is, in his words, *the cost of having no stored structure.* Every token-pair gets compared because the model doesn't yet know which depends on which. A graph-shaped substrate stores those dependencies once and walks them many times. The context window is a flat list. Pat's claim is that the limit you keep hitting isn't tokens; it's untyped flatness.

You can see this thesis showing up everywhere downstream of the major labs:

- Anthropic ships [MCP](https://www.anthropic.com/news/model-context-protocol) — a transport protocol whose first reference server is a [knowledge-graph CRUD API](https://github.com/modelcontextprotocol/servers/tree/main/src/memory) backed by a JSON file. *Memory as just another MCP server* — and the reference implementation is graph-shaped.
- OpenAI ships [memory](https://openai.com/index/memory-and-new-controls-for-chatgpt/) in ChatGPT — extracted facts, deduped, surfaced into the system prompt. The unit isn't the conversation turn; it's the typed claim.
- Google ships [million-token contexts](https://blog.google/technology/ai/google-gemini-next-generation-model-february-2024/) and [context caching](https://ai.google.dev/gemini-api/docs/caching) — a different bet, the maximalist version of growing C_n. Pat would call this the inefficient path.
- The 2024-25 academic line — Park et al. (2023) [*Generative Agents*](https://arxiv.org/abs/2304.03442) on memory streams with importance × recency × relevance, MemGPT/Letta on [virtual-memory paging](https://arxiv.org/abs/2310.08560), HippoRAG on [Personalized PageRank over an extracted graph](https://arxiv.org/abs/2405.14831), [A-Mem](https://arxiv.org/abs/2502.12110) on Zettelkasten-style dynamic linking — every paper in the 2025 window converges on the same shape: the graph isn't a feature; it's where memory lives.

The frontier labs are testing both bets. The big-context bet says transformers will absorb the graph through scale. The MCP/memory-server bet says the graph wants to live outside the context, and the model wants typed adjacency at retrieval time. Pat's Paper 1 is the technical case for the second bet.

## A demo, at the personal scale

The bet is testable. The same shape that matters for Exa over the web matters for one person's graph at three hundred nodes — *because the bound is about the reader, not the corpus.* A small graph plus a finite agent is the same problem as a huge graph plus a finite agent, just with the constants reset.

Here's a working demo, runnable on a laptop, against [Alex's example graph](https://github.com/parrik/know-thyself/blob/main/example-graph-extended.yaml) (the 87-node fictional editor from the first essay):

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

**A finds the right *theme*. B finds the right *episode*.** Pure cosine over the bag of vectors finds P01 because the overlap node uses the exact words from the query — *"running routine breaks"* appears in the overlap's statement verbatim. The overlap is correct as a frame; it isn't the answer to *when*. The type filter retrieves the actual dated episodes. *This is the schema doing work pure embeddings cannot.* A vector DB doesn't know what kind of node a node is. A typed graph does.

**C demotes the tentative novel under the grounded ones.** Pure cosine ranked the tentative novel third on similarity. Provenance reranking pushed it down further by penalty multiplier — not because the similarity is wrong, but because the schema knows the novel is one-derivation and the overlap is two-grounded. *Attribution ≠ confidence becomes a property of retrieval, not just a rule of interpretation.*

**At 87 nodes, none of this needs HNSW.** The brute-force matrix multiply runs in two milliseconds. The graph structure of HNSW is what you reach for when linear scan stops being free; for personal-graph scale, that day comes well past where most people will ever go. (And if you needed it, swapping in `hnswlib` is forty lines.) The lesson is the [algorithm scales with the problem](https://www.pinecone.io/learn/series/faiss/hnsw/): the graph structure of the index emerges precisely at the boundary where flat representation breaks. Same for the typed structure of the knowledge graph itself: it earns its keep precisely at the boundary where flat memory degrades.

## Prior art, named honestly

Will Bryk owns the search-specific commercial articulation: the [*Why Google Search Sucks for AI*](https://jxnl.co/writing/2025/09/11/why-google-search-sucks-for-ai-will-bryk-exa/) talk is the cleanest version of that argument anyone has shipped. Lù et al. (2025) [*Build the Web for Agents, Not Agents for the Web*](https://arxiv.org/abs/2506.10953) makes the same shape claim one level up: the whole web, not just search, was designed for human eyes. Karpathy has been hinting at this in interviews and his [LLM Wiki gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f), but hasn't claimed it as an essay.

What's open ground — and what this essay is staking — is the synthesis: **retrieval architectures across the stack assumed a human reader; the reader has changed; therefore knowledge representation must change, and the same change is happening at every scale because the shape is fractal.**

The personal-memory adjacent work is converging on this independently. [Mem0](https://github.com/mem0ai/mem0) (54k stars) extracts facts as the unit of memory. [Graphiti](https://github.com/getzep/graphiti) makes every memory bitemporally validated. [Letta](https://github.com/letta-ai/letta) tiers memory like virtual memory. [HippoRAG](https://github.com/OSU-NLP-Group/HippoRAG) walks Personalized PageRank over an LLM-extracted knowledge graph. [A-Mem](https://arxiv.org/abs/2502.12110) builds the graph dynamically from each memory write. [basicmachines-co/basic-memory](https://github.com/basicmachines-co/basic-memory) lets you edit the graph by hand as markdown.

What the typed-graph adapters share, and what the LangChain / LlamaIndex memory abstractions don't yet ship, is the *typed-node-with-provenance* primitive. The frameworks treat memory as conversation-shaped: buffer, summary, vector-of-turns. The graph-shaped projects treat memory as person-shaped: typed claims, typed edges, provenance triples. The conversation primitive is doomed by Pat's Theorem 4 — it's flat, and flat degrades. The person-shaped primitive is the bet that survives.

## What this opens

If the reader is finite and the graph isn't, retrieval is the bridge. If retrieval has the same shape across scales, you can build the bridge once at every scale. The pieces compose:

- **Schema:** Pat-shaped typed nodes with provenance triples (the [know-thyself](https://github.com/parrik/know-thyself) scaffold).
- **Index:** vectors plus typed metadata (the [know-thyself-search](https://github.com/parrik/know-thyself-search) scaffold this essay describes).
- **Walk:** edge-aware traversal — `walk_provenance(node_id)` returns the typed-edge neighborhood of a hit (outbound `grounded_by` / `related_to`, inbound references) in a single call. **Shipped Apr 2026.**
- **Surface:** MCP server — `search_graph` / `get_node` / `walk_provenance` / `list_node_stats` over stdio so any MCP-aware client (Claude Code, Claude Desktop, Cursor) queries the graph natively. **Shipped Apr 2026.**
- **Next bottleneck (newly named):** sub-statement chunking. Long observation nodes accumulate dated sub-sections; the whole-statement single-vector dilutes new content. Concrete instance during the edge-aware ship: a query targeting the most-recent sub-section of a long log node failed to surface that node — a stale tangentially-relevant reference won. Cosine averaged across all the sub-sections smeared the new content out. The chunking etude is queued.

That's the personal-memory stack. The same stack scales up: replace the typed-claim node with a web-chunk node, replace `grounds` with `cites`, replace 87 nodes with a billion, and you have Exa. Replace the agent reading the personal graph with a research-assistant agent doing literature review, and you have a different surface on the same architecture. The components are separable. The shape doesn't care.

This is the loop the first essay opened and this one closes. The personal memory problem and the AI-search-for-agents problem are the same problem at different scales. Working on one is working on the other. The fractal name fits — same shape recurring across scales of attention, with the bound on the reader being the only constant.

The Delphic maxim, again: γνῶθι σεαυτόν. *Know thyself.* The advice was offered to visitors before they consulted the oracle, because being legible to the oracle was the precondition for being understood. The oracle's bandwidth was finite; the visitor's life wasn't.

The retrieval problem hasn't changed in two and a half millennia. The reader has.

## Postscript — DeepSeek V4 (Apr 26 2026)

Two days after this essay shipped, DeepSeek released [V4](https://huggingface.co/blog/deepseekv4). Headline: a million-token context window. Substrate: a hybrid attention scheme — Compressed Sparse Attention plus Heavy Compressed Attention — that delivers the headline with **9.5–13.7× less memory** and **10% of the KV cache** of V3.2.

The four-scales argument extends one substrate further. The fifth row:

| Scale | Nodes | Edges | Walk strategy | Reader |
|---|---|---|---|---|
| **LLM working memory** | **tokens / latent codes** | **sparse + hierarchical attention** | **compression + retrieval-as-attention** | **the model itself** |

The graph-traversal-with-ranking shape is internalized one substrate further. The visible feature (long context) is downstream of the same memory-architecture move that scales every retrieval system before it. The reader is the model.

More to follow.

---

*The retrieval scaffold described in this essay is open at **[github.com/parrik/know-thyself-search](https://github.com/parrik/know-thyself-search)** — three Python CLIs, ~300 LOC, runnable today. The companion [Know Thyself](/essays/know-thyself/) essay describes the schema. The companion [open-knowledge-graph](https://github.com/patdmc/open-knowledge-graph) is Patrick D. McCarthy's foundational work; this essay's technical spine is his Paper 1 argument that bounded context makes graph structure necessary.*
