# Physics of Friendship: Q-SMA, Dream Replay, and Honest Ablations on MountainCar

**Lead:** Jason Van Pham (Ruffian-L)  
**Draft date:** 2026-08-17  
**Status:** full draft of the dated MountainCar / Q-SMA thread. All numbers from the repo README `[C28]`. Public date **2026-02-27** `[C30][C31]`.

Citation keys `[Cxx]` → `Documents/Writing/NIODOO_CITATION_TABLE.md`.

---

## Abstract

A controlled MountainCar-v0 study (Q-SMA: Q-learning + sensory-motor attunement) re-uses the Niodoo force vocabulary — gravity well, repulsion, viscosity, ghost vector, splat reflexes, governor — inside a tiny RL loop `[C28]`. Phase 1 (**2026-02-13**) records a climb **0 → 76 → 681** wins `[C28]`. Phase 3’s physics solver is **2000/2000** and **learns nothing** `[C28]`. Phase 4’s perfect teacher **fails as designed**: after the governor drops, win rate collapses to **4.4%**, worse than the Q-SMA baseline **34.1%** `[C28]`. Phase 5 (2026-02-27) ablation: at 2k episodes `full` **77.5%** vs `baseline` **25.1%**; removing the bridge drops to **31.1%**; removing TDA or splats stays inside noise `[C28]`. At 20k episodes, `no_bridge` post-scaffold **96.1%** beats `full` **86.2%** — the scaffold that wins early can hide learning `[C28]`. Neighbor work is ordinary MountainCar Q-learning and experience replay. This is not an LLM product and not a consciousness claim. LLM PARB remains a **loss** (**29.9%** vs **41.6%**) `[C03]`.

---

## 1. Introduction

The LLM stack’s words (gravity, repulsion, ghost, splat, governor, dream) were tested in a place where wins and losses are countable `[C28]`. The README’s care rule is the same as the claim package: keep negative findings `[C28][C05]`. Splats here are **reflex / hesitation geometry**, not “AI emotions” `[C28]`.

This paper does not flatten those words into SAE features or residual control vectors. It reports the ablation the repo already published. It is **not** Llama mid-pass **gravity**, **black-hole** / `assistant` repulsion, **orbit**, or **Langevin** `[C01]`. LLM **scar** / LOCK packets remain a separate add-on `[C18]`.

---

## 2. Dated timeline

| Date | What | Cite |
|------|------|------|
| 2026-02-13 | Phase 1 TDA steering; snapshot `2026-02-13_1456_76wins`; 681-win champion | [C28] |
| 2026-02-15 | Phase 2 Niodoo Dream; 617 wins | [C28] |
| 2026-02-16 | Phase 3 physics solver 2000/2000 | [C28] |
| 2026-02-17 | Phase 4 bridge; 4.4% after governor off | [C28] |
| 2026-02-27 | Phase 5 ablation + public README commit | [C28][C30][C31] |

---

## 3. Mechanism

Action selection `[C28]`:

```
π(s) = argmax_a [ Q(s,a) + ease(F(s,a)) × β + C(s,a) ]
```

β decays: `β = max(0.1, 1.5 × 0.995^episode)` `[C28]`. Yin-Yang shaping: `R_shaped = R + κ [Φ(s') − Φ(s)]` with `Φ(s) = sin(3x) + 100v²` `[C28]`. TDA every 5 episodes (loops / voids). Dream cycle replays by splat proximity `[C28]`. Phase 2 maps Gravity Well, Repulsion, Viscosity, Adrenaline, Ghost Vector onto the car `[C28]`.

These are the **same names** as PhysicsLang atoms `[C05]`, on a different substrate. That is the point of the sibling thread, not a claim that MountainCar *is* the LLM.

---

## 4. Results (owned losses included)

**Phase 1.** Yin-Yang alone: **0 → 76** wins. Viscosity “correct physics” = **0** wins; naive binary = **76**; log-scale = **681** `[C28]`.

**Phase 2.** Dream cycle: **617** wins `[C28]`.

**Phase 3.** Energy pump: **2000/2000**, ~119 steps — scripted resonance, not learning `[C28]`.

**Phase 4.** Bridge 1522/2000: **100%** while governed, then **4.4%** independent vs baseline **34.1%**. “The teacher prevented learning” `[C28]`. Splat reflexes in `act()`: **0/2000**. Splats only in dreams: **628/2000** / **599/2000** in the paired figure `[C28]`.

**Phase 5 — 2,000 × 3 seeds** `[C28]`:

| Config | Mean win% |
|--------|-----------|
| full | **77.5%** ±0.6 |
| no_tda | **77.3%** ±0.7 |
| no_splats | **78.1%** ±1.0 |
| no_bridge | **31.1%** ±0.7 |
| baseline | **25.1%** ±1.2 |

**Phase 5 — 20,000 × 2 seeds**, governor off at episode 3,000 `[C28]`:

| Config | Total | Post-scaffold |
|--------|-------|----------------|
| full | 88.3% | 86.2% |
| no_tda | 84.5% | 81.7% |
| no_splats | 88.6% | **86.6%** |
| no_bridge | 87.9% | **96.1%** |
| baseline | 83.9% | **92.9%** |

The early win is mostly the bridge. Long-run free learning can be **better without it** `[C28]`.

---

## 5. Neighbor literature

Classic MountainCar Q-learning / DQN tutorials (2019–2025 search hits) solve the valley with value learning. Experience replay (Lin 1992; Mnih et al. 2015) is the dream-cycle **neighbor**; the tags draft already says dream-as-replay is “not distinct as stated” until narrowed `[C32]`. Potential-based shaping is an older RL neighbor. **No close match** in the searched set for this exact stack (Q-SMA + Niodoo force names + splat dream-only + governor-off collapse to **4.4%** `[C28]`). No vacuum claim.

---

## 6. Discussion

This sibling exists so the force words have a place where “the teacher prevented learning” is a number (**4.4%** vs **34.1%**) `[C28]`. That is the same honesty rule as PARB **29.9%** vs **41.6%** `[C03]`. The tag-corpus null (**+2.4**, z = **1.20**) is a separate measured loss `[C32]`. Scar/splat in the LLM trees remains add-on `[C17][C18]`. MountainCar splat reflexes in `act()` failed (**0/2000**) `[C28]`.

---

## 7. Conclusion

Q-SMA is a dated, reproducible ablation with kept losses `[C28]`. Public stamp **2026-02-27** `[C31]`. It is not God Zone on Llama, not `BASIN_PULL(0.03)` `[C21]`, and not a friendship-physics marketing claim `[C28]`.

---

## References

Local: C03, C05, C17–C18, C28, C30–C32.  
External: Lin 1992 experience replay; Mnih et al. 2015 DQN (named as neighbors in `[C32]`).
