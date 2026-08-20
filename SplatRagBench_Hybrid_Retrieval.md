# SplatRagBench: Hybrid Retrieval with Geometry Score, Honest Dense-Only Loss

**Lead:** Jason Van Pham (Ruffian-L)  
**Draft date:** 2026-08-17  
**Status:** full draft of the dated retrieval sibling. Numbers from the SplatRagBench README `[C29]`. First commit **2025-11-24** `c7b9361` `[C30][C31]`.

Citation keys `[Cxx]` → `Documents/Writing/NIODOO_CITATION_TABLE.md`.

---

## Abstract

SplatRagBench is a SciFact-oriented hybrid retrieval suite: lexical BM25, dense embeddings, and a project **geometry / “needle physics”** score `[C29]`. In the in-repo table (Nov 2025 era, not third-party certification) the **hybrid** arm records nDCG@10 **0.7822** and Recall@10 **0.9090** `[C29]`. **Dense-only is the weak link**: nDCG@10 **0.6291** `[C29]`. BM25-only is already strong (**0.7694** / **0.9090**); “nuclear” weights (**0.7708**) lose to balanced hybrid `[C29]`. Neighbor work is ordinary BM25 + dense hybrid retrieval (SPLADE, ColBERT, BEIR). This paper does not claim SOTA forever and does not treat retrieval geometry as the LLM God Zone stack `[C01]`. LLM PARB remains **29.9%** vs **41.6%** `[C03]`.

---

## 1. Introduction

The token-physics composition is mid-pass force on a frozen LLM `[C01][C07]`. SplatRagBench is a **different job**: retrieval evaluation with a physics-flavored third score `[C29]`. It is inventoried because it is independently dated (**2025-11-24**) before Physics-LLM’s first commit (**2025-12-16**) `[C30][C24]`. Mixing the two jobs is how “splat” gets washed into either Gaussian rendering or residual steering. This bench is not mid-pass **gravity**, **black-hole** repulsion, **orbit**, **Langevin**, or LLM **scar** `[C01][C18]`. Kerbl et al. 2023 remains the **rendering** neighbor for Gaussian splats `[C15]`. This bench is hybrid IR.

---

## 2. Dated timeline

| Date | What | Cite |
|------|------|------|
| 2025-11-24 | SplatRagBench first commit `c7b9361` | [C30][C31] |
| Nov 2025 era | SciFact project eval table in README | [C29] |
| 2025-12-16 | Physics-LLM / God Zone (separate job) | [C01][C24] |

---

## 3. Mechanism

Three fused scores `[C29]`:

1. **Lexical** — BM25 (Tantivy).
2. **Dense** — embeddings (Nomic-class path in this suite).
3. **Geometry / needle physics** — structure-inspired score from token-cluster geometry. The README says **project metric, not a claim of physical law** `[C29]`.

Repro: `./runbench` `[C29]`. Dual mode with cathedral-beir is named as the honest dense baseline pairing `[C29]`.

---

## 4. Scoreboard (project eval only)

From `[C29]`:

| Configuration | nDCG@10 | Recall@10 |
|---------------|--------:|----------:|
| Python BM25 | 0.7073 | 0.7970 |
| LangChain BM25 | 0.6562 | 0.7250 |
| RAGFlow hybrid | 0.7357 | 0.8120 |
| SplatRag BM25 only | 0.7694 | 0.9090 |
| SplatRag dense only | **0.6291** | 0.7460 |
| **SplatRag hybrid** | **0.7822** | **0.9090** |
| SplatRag “nuclear” | 0.7708 | 0.9090 |

Dense-only is weaker on SciFact terms. Over-weighted nuclear loses to hybrid `[C29]`. Plots are ablation storyboards, not peer-reviewed leaderboard shots `[C29]`.

---

## 5. Neighbor literature

BM25; dense passage retrieval; SPLADE (Formal et al., 2021); ColBERT (Khattab & Zaharia, 2020); BEIR (Thakur et al.). **Close match on the hybrid-IR primitive.** **No close match** in the searched set required for this paper’s object: this specific in-repo SciFact table with a named geometry arm and a published dense-only **loss** (**0.6291**). No vacuum claim. Not God Zone.

---

## 6. Discussion

Splat memory in hydrodynamic-swarm is residual continuity `[C15][C17]`. SplatRagBench is retrieval. The shared English is “splat.” The jobs are not the same. This draft exists so the Nov 2025 retrieval numbers stay attached to their file `[C29]` and so they cannot be used to invent an LLM win. PARB is still **29.9%** vs **41.6%** `[C03]`.

---

## 7. Conclusion

A dated hybrid bench with a kept dense-only loss `[C29]`. First commit **2025-11-24** `[C30]`. Neighbor IR is real. The geometry score is a project metric `[C29]`. Do not promote it as token physics.

---

## References

Local: C01, C03, C15, C17, C24, C29–C31.  
External: Formal et al. SPLADE 2021; Khattab & Zaharia ColBERT 2020 (neighbors).
