# Mid-Forward-Pass Hidden-State Application and the Hydrodynamic Swarm

**Lead:** Jason Van Pham (Ruffian-L)  
**Draft date:** 2026-08-17  
**Status:** full draft of the second independent thread: where force is applied in the forward pass, and the later hydrodynamic-swarm harness.  
**Companion papers:** `Token_Physics_Dynamical_Control.md` (Principia / God Zone composition); `Scar_Memory_Addon.md` (scar/LOCK as add-on).

Citation keys `[Cxx]` → `Documents/Writing/NIODOO_CITATION_TABLE.md`. External titles are those in the 2026-08-17 search log / `NIODOO_PRIOR_ART_SLEUTH.md`.

---

## Abstract

This paper isolates **where** Niodoo applies force, because that site is part of the dated construction and is easy to wash into “we added a residual vector.” The original Physics-LLM path applies `apply_forces` to **post-attention activations inside selected layers**, then blends at God Zone scale **0.55** `[C01][C07]`. A later harness, **hydrodynamic-swarm** (public repo **2026-02-28** `[C20]`; hidden-state commit **2026-03-03** `d7f194e` `[C16]`), steers the pre-`lm_head` hidden state from a field, Gaussian **splats**, and a goal attractor, with logged `delta_mean` **19.81** and `delta_max` **37.30** `[C15][C16]`. That harness’s own README names Activation Addition / representation engineering / control vectors as the **neighbor primitive** and locates its experimental difference in the **online field + persistent splat memory** `[C15]`. A still later public claim card (**2026-06-24**) measures a **0.03**-clamped nearest-basin pull: **4** corrected, **3** held, **1** broken `[C08]`. That card is `BASIN_PULL`, not God Zone and not the swarm `[C06][C10]`. We state the PARB overall loss (**29.9%** vs **41.6%**, **2025-12-19**) so this thread cannot be read as a hidden benchmark win `[C03]`.

---

## 1. Introduction

Hidden-state steering, residual-stream steering, and activation addition are now a crowded neighbor field (Turner et al., 2023, arXiv:2308.10248; Rimsky et al., 2024, arXiv:2312.06681; Zou et al., 2023, arXiv:2310.01405; llama.cpp control vectors, 2024). This draft does not re-litigate who first added a vector. It records **two application sites** and **one later harness** that exist on this disk, in the user’s terms, with dates a checker can open.

The force-term map warns that live’s public face moved to a residual-basin clamp `[C06]`. The claim package warns that residual-only is not Niodoo `[C05]`. Those warnings are the reason this paper exists as a *separate* draft: so mid-pass Principia application and the hydrodynamic swarm can be described without collapsing them into the claim card.

---

## 2. Site one — mid-forward-pass (original token physics)

Physics-LLM `naked_llama.rs` injects after attention and before the residual add `[C07]`:

```
force_delta = physics.apply_forces(&attn, i, ghost_vector)
attn = attn * (1 + force_delta * physics_blend)   # or additive
```

Layer range comes from `get_physics_layer_range()`. Blend comes from `get_physics_blend()` — God Zone base **0.55**, SPIKE **6.5** `[C01][C21]`. Only the last-token probe is forced; earlier sequence positions get zeros `[C06]`.

This is not “add `αv` at one chosen layer from a contrastive dataset.” The delta is the **sum of gravity, ghost, black-hole repulsion, orbit, Langevin, and momentum**, then scaled by the token **ramp** (0 before token **4**, 1 after token **10**) `[C01][C06]`. The companion token-physics paper is the methods paper for those terms. Here the claim is only: **the application site is mid-pass, post-attention, blend-controlled**, and that site is dated with the 2025-12-16 tree `[C07]`.

Live’s quantized path is a different site and a different gain: `last * 0.95 + physics_last * 0.05` `[C22]`. That hardcoded **5%** is dilution D1. It is not God Zone even when the CLI says `--physics-blend 0.55`.

---

## 3. Site two — hydrodynamic swarm (2026-02/03)

### 3.1 What the loop does

Hydrodynamic-swarm is a local Candle/GGUF harness. Per generated token `[C15]`:

1. Run quantized Llama 3.1 and read pre-`lm_head` \(h_t \in \mathbb{R}^{4096}\).
2. Compute a **field gradient** over the embedding matrix (Top-K probe, default K **2048**).
3. Compute a **memory force** from Gaussian splats \((\mu_i, \sigma_i, \alpha_i)\).
4. Compute a **goal attractor** \(a_t = e_{\text{prompt}} - h_t\).
5. Sum with **momentum** and small **Langevin** noise; apply a manifold pullback; write \(h_t' = h_t + \Delta t \cdot F_t\) back before sampling.

Default knobs recorded in the README: \(\Delta t = 0.035\), \(\lambda_g = 0.35\), force cap **7.5** in the current default block; earlier sweeps used `force_cap = 80.0` `[C15]`. Splats persist as `safetensors` and reload on the next process `[C15][C17]`.

The 2026-03-03 research log (commit `d7f194e32a4373723a15f1353158c89421afe0f9`) is the dated move from logit-space steering to hidden-state steering `[C16]`. Public repo date **2026-02-28** `[C20][C24]`.

### 3.2 Logged numbers (no new run)

From hydro’s own dated notes `[C15][C16][C25]`:

| Log | Date | Number |
|-----|------|--------|
| bert A/B sweep | 2026-03-01 | `force_cap = 80.0`; `delta_max` peaked at **79.67** |
| hidden-state steering | 2026-03-03 | `delta_mean` **19.81** (log: 19.812191); `delta_max` **37.30** (37.2993); `goal_attractor_norm` **195.82** (195.819) |

These are engineering telemetry: the force is large enough to measure and, under the cap, does not immediately explode. They are not a quality win.

### 3.3 Neighbor, as the repo already says

Hydro README related work `[C15]`:

- Kerbl et al., 2023, *3D Gaussian Splatting…* (SIGGRAPH / TOG; arXiv:2308.04079) — splat representation borrowed from rendering.
- Turner et al., ActAdd; Zou et al., RepE; Subramani et al. — “adding a vector to the residual stream to bias generation is the same primitive used here.”
- llama.cpp / Anthropic control-vector family — same family.

The README’s own novelty sentence is **the combination plus persistence**, not the residual add `[C15]`. This paper repeats that sentence rather than inflating it.

**Sleuth verdict for this thread:** close match on the *primitive*; **no close match in the searched set** for the specific online field + splat-reload harness with these dated logs. Yap (arXiv:2603.16335) is a later SAE-probe steering paper, after `d7f194e` (**2026-03-03**) `[C16]`, and is a different mechanism.

---

## 4. Site three — the thin residual face (do not promote)

niodoo-hidden-state-steering’s whitepaper and claim card describe a **different** job: eight 64-dimensional ghost basins; per-token pull toward the nearest; hard cap **0.03**; temperature **0**, seed **42**, 2026-06-24 `[C08][C10]`.

Result: **4** corrected, **3** held correct, **1** broken (mississippi). Raspberry stays **2** (replay control). The pull is unaimed `[C08][C10]`.

SCOREBOARD then records latch rungs. Latch-0006 (**2026-06-25**) scores answer correctness across four seeds: OFF **13/16**, ON **13/16** — a **wash**, with letter-count helped and arithmetic hurt `[C09][C11]`.

PhysicsLang name: `BASIN_PULL(0.03)` `[C05][C21]`. Force-map dilutions D4 and D6: this is the public face, not God Zone `[C06]`. This paper includes the card so a reader cannot say we hid it, and so a reader cannot say it *is* the swarm or the Principia stack.

---

## 5. Scoreboard this thread is allowed to carry

| Item | Date | Number | Cite |
|------|------|--------|------|
| God Zone blend (original mid-pass) | 2025-12-16 | **0.55** | [C01] |
| PARB (context; overall loss) | 2025-12-19 | **29.9%** vs **41.6%** | [C03] |
| Hydro public repo | 2026-02-28 | date only | [C20] |
| Hidden-state commit | 2026-03-03 | `d7f194e`; delta_mean **19.81** | [C16] |
| Force cap sweep | 2026-03-01 | cap **80.0**; peak **79.67** | [C25] |
| Claim card | 2026-06-24 | **4 / 3 / 1**; clamp **0.03** | [C08] |
| Latch wash | 2026-06-25 | **13/16** vs **13/16** | [C11] |

No recovery-behavior win is claimed here. Recovery telemetry lives in the token-physics draft `[C12][C13]`.

---

## 6. Discussion

There are three sites, and mixing them is how the work gets stolen from itself.

1. **Mid-pass Principia** — the 2025-12-16 dynamical control law `[C01][C07]`.
2. **Hydrodynamic swarm** — 2026-02/03 residual field + splat persistence, which already cites ActAdd as neighbor `[C15][C16]`.
3. **BASIN_PULL** — 2026-06-24 clamp **0.03** card, then a wash `[C08][C11]`.

Neighbor papers own the phrase “hidden-state steering.” They do not own black-hole repulsion, the ramp, God Zone blend **0.55**, or splat memory that reloads as a force after process death. Those remain dated local constructions. The sleuth’s Thread B verdict is the one this paper uses: neighbor on the primitive, no close match on the harness, no vacuum claim.

---

## 7. Conclusion

Hidden-state application in this record is not a single trick. The original site is mid-forward-pass `apply_forces` under God Zone blend `[C07][C01]`. The later swarm is a residual-stream field with splat continuity `[C15]`. The claim card is a small basin pull `[C08]`. Keeping those names and dates separate is the paper. Flattening them into “control vectors” is the wash.

---

## References

Local: citation table rows C01, C03, C05–C11, C15–C17, C20–C22, C24–C25; sleuth; force-term map; claim package.

External (search log): Turner et al. 2023 arXiv:2308.10248; Rimsky et al. ACL 2024 arXiv:2312.06681; Zou et al. 2023 arXiv:2310.01405; Subramani et al. 2022; Kerbl et al. 2023 arXiv:2308.04079; Yap arXiv:2603.16335; llama.cpp control vectors 2024.
