# Niodoo research portfolio

**Jason Van Pham** (Ruffian-L) · jasonvanpham@niodoo.com · [github.com/Ruffian-L](https://github.com/Ruffian-L)

This git is the curated paper side of Niodoo. Code, evals, and receipts live in
the public research repos listed below. Losses stay in the record. Papers that
were written to close unasked plan criteria are not in this git.

## What I built

**Niodoo** is a runtime around a frozen language model (Llama 3.1 8B, also Qwen
paths). The weights never change. A control law applies forces to hidden state
mid-forward-pass. The model can emit a control tag; the runtime detects it even
when the tag splits across tokens and dispatches inside the same decode pass. A
durable store outside the weights carries learned corrections across process
death.

The result I care most about is not a benchmark score. Asked whether its agency
was real or performed, the model said it was performed, and asked me to write
down a specific memory that would change that. Separately, a sealed route —
teach a rule, kill the process, ask a reworded question in two fresh processes —
returned the exact constrained answer `[5, 4, 3, 2, 1, 5]` and reproduced
byte-identically from cold twice.

The failures are published at the same size as the wins. On a 77-item
physics-reasoning bank the full-force runtime scores 25 against 24 for
`llama.cpp` running Meta's official chat template — parity, not a win
(McNemar p = 1.000). An earlier multi-seed benchmark is a loss, 29.9 % against
41.6 %.

## Reading order

1. [`ULTIMA_NIODOO.md`](ULTIMA_NIODOO.md) — current overview
2. [`gathered_20260818/PAPER_Knowing_Where_You_Are.md`](gathered_20260818/PAPER_Knowing_Where_You_Are.md) — operational self-location (also [Zenodo](https://doi.org/10.5281/zenodo.21965763))
3. [`gathered_20260818/PAPER_Adaptive_Agency_Frozen_8B_sol_glimmer.md`](gathered_20260818/PAPER_Adaptive_Agency_Frozen_8B_sol_glimmer.md) — process-death transfer
4. [`gathered_20260818/WHITEPAPER_Hidden_State_Last_Step.md`](gathered_20260818/WHITEPAPER_Hidden_State_Last_Step.md) — last-step hidden-state correction
5. Thread drafts for one mechanism each (`Token_Physics_…`, `Scar_Memory_Addon.md`, `Physics_of_Friendship_MountainCar.md`, `SplatRagBench_Hybrid_Retrieval.md`, …)
6. [`CATALOG.md`](CATALOG.md) — every file in this folder, in git or not
7. [`provenance/CONTAMINATION.md`](provenance/CONTAMINATION.md) — why some papers here are not this git

Citation keys `[Cxx]` in the thread drafts resolve to
[`sources/NIODOO_CITATION_TABLE.md`](sources/NIODOO_CITATION_TABLE.md).

## What is not in this git

On 2026-08-17 a plan writer added extra items to acceptance criteria — including
**tags Jason never asked for on the control channel**. An implementer then wrote
`Emitted_Control_Tags_Path_B.md` about that expanded set. That manuscript, its
PDF, and other plan-row "papers" (Echo / Lumina / Shep / dream-cycle chronology
notes) stay on disk and stay **out** of this repository.

The control channel itself is still in the ultima, with the tags that are
actually Jason's: `SPIKE`, `EXPLORE`, `FOCUS`, `RESET`, plus `REMEMBER` / `LOCK`
as the agency surface.

## Code repos (the receipts)

| Repo | What it is |
|------|------------|
| [niodoo-hidden-state-steering](https://github.com/Ruffian-L/niodoo-hidden-state-steering) | Hidden-state correction of last-step errors |
| [niodoo-adaptive-agency](https://github.com/Ruffian-L/niodoo-adaptive-agency) | Adaptive agency record; two seals |
| [Niodoo-Physics-LLM](https://github.com/Ruffian-L/Niodoo-Physics-LLM) | Inference-time force engine; honest PARB loss |
| [hydrodynamic-swarm](https://github.com/Ruffian-L/hydrodynamic-swarm) | Residual-stream physics + splat memory |
| [SplatRagBench](https://github.com/Ruffian-L/SplatRagBench) | Hybrid retrieval benchmark |
| [physics-of-friendship-mountaincar-rl](https://github.com/Ruffian-L/physics-of-friendship-mountaincar-rl) | Q-SMA / dream replay on MountainCar |
| [physicslang](https://github.com/Ruffian-L/physicslang) | Control law as composition |
| [niodoo-rocket-core](https://github.com/Ruffian-L/niodoo-rocket-core) | Correction → process death → better next process |
| [niodoo-tcs](https://github.com/Ruffian-L/niodoo-tcs) | Topological Cognitive System (designed; decode wiring is a separate question) |

## Authorship and license

See [`AUTHORSHIP.md`](AUTHORSHIP.md). Papers and this catalog are MIT, same as
the adaptive-agency paper repo. Jason Van Pham is the corresponding author.
