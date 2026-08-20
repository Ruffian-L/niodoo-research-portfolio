# PhysicsLang: Control Law as Composition of Atoms, Not a Vector

**Lead:** Jason Van Pham (Ruffian-L)  
**Draft date:** 2026-08-17  
**Status:** full draft of the PhysicsLang / gravitational-grammar thread already formalized in the claim package `[C05]`.

Citation keys `[Cxx]` → `Documents/Writing/NIODOO_CITATION_TABLE.md`.

---

## Abstract

Token physics on this disk is a **composition of named atoms**, not “we added a vector.” The claim package writes that composition as PhysicsLang `[C05]`: `GRAVITY`, `GHOST`, `REPEL`, `ORBIT`, `LANGEVIN`, `MOMENTUM`, opened by `RAMP(4,10)` and scaled by `BLEND(0.55)`, plus `WOBBLE`, `GOVERNOR`, and `VISCOSITY`. `SPIKE` is the same law with blend **6.5** and REPEL **−3.0** `[C21]`. `BASIN_PULL(0.03)` is named as the thin public face only `[C05]`. `SCAR / LOCK / PACKET` are orthogonal and optional `[C05][C18]`. God Zone constants were stamped **2025-12-16** `[C01]`. The public multi-seed bench is a **loss**: PARB **29.9%** vs **41.6%** on **2025-12-19** `[C03]`. Neighbor residual-add papers (ActAdd, CAA, control vectors) implement `BASIN_PULL`-shaped addition. They are not this grammar.

---

## 1. Introduction

A reader who only sees “steering” will flatten this work into Activation Addition. The force-term map exists to stop that wash `[C06]`. PhysicsLang is the methods language: each atom maps to a runtime term already in QSMA / Physics-LLM / live `[C05][C06]`. This paper is the composition paper. It does not invent a new experiment. It does not claim the grammar beat a frontier model. It does not call residual clamp **0.03** the system `[C08][C21]`.

---

## 2. Dated timeline

| Date | What | Cite |
|------|------|------|
| 2025-12-16 | Gold-master constants and mid-pass `apply_forces` | [C01][C07] |
| 2025-12-19 | PARB **29.9%** vs **41.6%** | [C03] |
| 2026-06-24 | Public face measured as `BASIN_PULL(0.03)` 4/3/1 | [C08] |
| 2026-08-07 | Claim package writes the PhysicsLang block | [C05] |

---

## 3. Mechanism — the atoms

From the claim package `[C05]`:

| Atom | Runtime meaning |
|------|-----------------|
| `GRAVITY(history)` | 1/r² pull from sentence_history |
| `GHOST(vector, gain)` | Topic / ghost attractor; God Zone gain **10.0** `[C01]` |
| `REPEL(black_holes, strength)` | **Black-hole** / template repulsion; default **−0.60**; includes `assistant` `[C01]` |
| `ORBIT(com, speed)` | Double Rainbow; speed **0.1** `[C01]` |
| `LANGEVIN(μ, σ)` | Drift + diffusion |
| `MOMENTUM(α)` | Delta EMA |
| `RAMP(start, end)` | Launchpad **4–10** `[C01]` |
| `BLEND(β)` | Injection gain **0.55** `[C01]` |
| `WOBBLE(schedule)` | Spark **0.06**, originally every 12 `[C01][C06]` |
| `GOVERNOR` / `VISCOSITY` | Logit-side brake; not residual add `[C26][C27]` |
| `BASIN_PULL(clamp)` | Live residual nearest-basin **0.03** `[C21]` |
| `SCAR` / `LOCK` / `PACKET` | Correction memory, add-on `[C18]` |

Composition already on disk `[C05]`:

```
GodZone := RAMP(4,10) → BLEND(0.55) × (
             GRAVITY(history) + GHOST + REPEL + ORBIT + LANGEVIN + MOMENTUM
           ) + WOBBLE(every_12) + GOVERNOR + VISCOSITY

SPIKE   := GodZone with BLEND(6.5), REPEL −3.0
FOCUS   := lower REPEL
EXPLORE := raise REPEL
Public  := BASIN_PULL(0.03)
Scar    := optional SCAR/LOCK/PACKET
```

Application site for GodZone is mid-forward-pass post-attention `[C07]`. Quantized **0.95/0.05** is dilution D1, not the grammar `[C22]`.

Visible tags (SPIKE/FOCUS/EXPLORE) are **hands on this law** `[C21]`. When those tags are *emitted by the model and dispatched in the same pass*, that is Path B and lives in the control-tag draft `[C32]`. PhysicsLang names the law even if Path B is off.

---

## 4. Scoreboard this paper is allowed to carry

| Item | Date | Number | Cite |
|------|------|--------|------|
| God Zone | 2025-12-16 | blend **0.55**, rep **−0.60**, ramp **4–10** | [C01] |
| PARB | 2025-12-19 | **29.9%** vs **41.6%** | [C03] |
| SPIKE table | 2026-08-07 | blend **6.5**, REPEL **−3.0** | [C21] |
| Public face | 2026-06-24 | clamp **0.03**; 4/3/1 | [C08] |
| Latch | 2026-06-25 | **13/16** vs **13/16** wash | [C11] |

No new bench. Recovery telemetry belongs in the token-physics / recovery discussion `[C12][C13]`, not as a PhysicsLang win.

---

## 5. Neighbor literature

ActAdd (Turner et al., 2023, arXiv:2308.10248), CAA (Rimsky et al., ACL 2024), RepE (Zou et al., 2023), llama.cpp control vectors (2024): **neighbors** that add a direction. PhysicsLang’s `BASIN_PULL` atom is that neighbor. GodZone is the composition `[C05]`. The sleuth’s Thread A verdict stands: no close match in the searched set for the full atom list. No vacuum claim.

---

## 6. Discussion

If a write-up drops `REPEL(assistant)`, `RAMP(4,10)`, `GOVERNOR`, and `WOBBLE`, it has described residual literature, not this system `[C06]`. If it demos only clamp **0.03**, it has described the public face `[C05]`. PhysicsLang exists so those substitutions have names.

Path B tags `[C32]` do not replace atoms. Scar `[C18]` does not replace gravity. Governor `[C26]` is logit-side. The grammar is the inventory.

---

## 7. Conclusion

PhysicsLang is the control law already written on 2026-08-07 `[C05]`. The dated body is God Zone **2025-12-16** `[C01]`. The honest bench is PARB **29.9%** vs **41.6%** `[C03]`. Neighbor papers own one atom. They do not own the composition.

---

## References

Local: C01, C03, C05–C08, C11–C13, C18, C21–C22, C26–C27, C32.  
External: Turner 2023; Rimsky 2024; Zou 2023; llama.cpp control vectors 2024.
