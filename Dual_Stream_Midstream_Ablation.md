# Dual-Stream Midstream Benches: State Machine Live, Letter-Count Lift Not Supported

**Lead:** Jason Van Pham (Ruffian-L)  
**Draft date:** 2026-08-17  
**Status:** full draft whose **primary object** is the midstream ablation folder `ablation_midstream_20260808T034028Z` `[C34]`. Dual-stream’s local name “J-Space” is a rolling key ring in this lane. It is **not** Anthropic’s J-space / Jacobian-lens paper.

Citation keys `[Cxx]` → `Documents/Writing/NIODOO_CITATION_TABLE.md`.

---

## Abstract

A frozen GGUF dual router can change β and σ **mid-stream** under bench inject: SPIKE at step 6 sets β=1.5; FOCUS at step 18 sets β=0.5 on t+1 `[C34][C36]`. On a clean strawberry letter-count, seed **7**, arms A–D all answer **2** (wrong). Arm A has **no inject**, β only **0.55**, so the miss is not inject-caused `[C34][C35]`. Seed **42** no-inject can output count **3** (correct count, wrong positions) `[C34]`. The folder’s own claim language: mid-stream instrument **supported**; “dual-stream improves strawberry” **not supported yet** `[C34]`. Gravity still fires on these runs (A gravity_max **17.322721481323242**; B **14.176209449768066**) `[C35][C36]`. Neighbor multi-stream papers train parallel token roles. This is a frozen-model router. PARB remains **29.9%** vs **41.6%** `[C03]`.

---

## 1. Introduction

PhysicsLang already names SPIKE/FOCUS as hands on blend `[C21]`. This leftover is the **dual-stream-soul** bench that actually injected those hands mid-decode and scored letter-count `[C34]`. Residual clamp **0.03** is not this experiment `[C08]`. Dual-stream docs say “J-Space” for workspace keys `[C34]` is a local word; Anthropic’s global-workspace / J-lens paper (2026-07-06) is a **neighbor**, not this object.

---

## 2. Dated timeline

| Date | What | Cite |
|------|------|------|
| Stamp `ablation_midstream_20260808T034028Z` | Folder SCOREBOARD | [C34] |
| same stamp | Arm A `summary.json`; Arm B inject receipt | [C35][C36] |

God Zone **2025-12-16** and PARB **2025-12-19** sit in the background `[C01][C03]`. They are not this folder.

---

## 3. Mechanism

Lane README: frozen LLM residual probe → dual router scores QK/√d + β·bias + noise; hands SPIKE/FOCUS/EXPLORE → β, σ; body gravity / REPEL `[C34]`. This paper cites **only** the ablation folder’s SCOREBOARD and two `summary.json` files for numbers `[C34][C35][C36]`.

Never mix other stamps (032404Z dual 3.45 vs A dual 2.5) without naming the folder `[C34]`.

---

## 4. Results (this folder only)

**A–D, seed 7, clean prompt** `[C34]`:

| Run | Inject | count |
|-----|--------|-------|
| A no inject | none; β {**0.55**} | **2** |
| B inject pure | SPIKE@6 FOCUS@18 | **2** |
| C delayed SPIKE | SPIKE@12 FOCUS@24 | **2** |
| D FOCUS only @12 | FOCUS | **2** |

Arm A JSON: `count_guess` **2**, `baseline_055` true, `dual_max` **2.534252643585205**, `gravity_max` **17.322721481323242** `[C35]`.  
Arm B JSON: `count_guess` **2**, injects `SPIKE step=6 applied=true` and `FOCUS step=18 applied=true`, `gravity_max` **14.176209449768066** `[C36]`.

**E, seed 42, no inject:** count **3**, positions still wrong `[C34]`. Letter-count is **seed-sensitive** `[C34]`.

Claim table `[C34]`:

| Claim | Status |
|-------|--------|
| Mid-stream β/σ live under bench inject | Supported |
| Dual-stream improves strawberry | **Not supported yet** |
| Inject causes seed-7 regression | **Falsified by A** |

---

## 5. Neighbor literature

Multi-Stream LLMs (arXiv:2605.12460, 2026-05-12) trains parallel role streams. DuoAttention / StreamingLLM keep sinks for long context. BMVC 2025 dual-stream attention is vision. **Neighbors.** **No close match** in the searched set for this frozen-GGUF mid-stream SPIKE/FOCUS β machine with an owned “lift not supported” SCOREBOARD `[C34]`. No vacuum claim.

Anthropic “Verbalizable Representations Form a Global Workspace” (2026-07-06) is **not** this dual-stream J-Space ring.

---

## 6. Discussion

Gravity and black-hole / REPEL still sit in the body path of the lane; this ablation did not replace God Zone **orbit**, **Langevin**, or residual clamp `[C35][C08]`. Scar/LOCK vault is Phase 5 open in the lane README, not scored here. Path B model-emitted hands remain **open** in the SCOREBOARD `[C34][C32]`.

---

## 7. Conclusion

The state machine is live. Letter-count lift is **not supported**. Seed 7 is **2** with or without inject. Those sentences are the folder’s own `[C34]`.

---

## References

Local: C01, C03, C08, C21, C32, C34–C36.  
External: arXiv:2605.12460; transformer-circuits.pub/2026/workspace (neighbors).
