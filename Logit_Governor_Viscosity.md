# Logit-Side Governor and Viscosity: Dynamical Braking That Is Not Residual Add

**Lead:** Jason Van Pham (Ruffian-L)  
**Draft date:** 2026-08-17  
**Status:** full draft of the `sample_token` governor / viscosity thread. Source-anchored in Physics-LLM `main.rs` `[C26]` and the force-term map `[C27]`.

Citation keys `[Cxx]` → `Documents/Writing/NIODOO_CITATION_TABLE.md`.

---

## Abstract

God Zone is not only a mid-pass force on attention. After logits exist, Physics-LLM still runs a **centrifugal governor** and a **viscosity** pass `[C26][C27]`. If normalized entropy is extremely low (velocity **> 0.95**), the governor subtracts drag `resistance_strength = 15.0` from the top-1 logit `[C26]`. Viscosity tracks inertia and thickens the distribution when the decode is sleepwalking `[C26][C27]`. The force map states this is **not residual add** `[C27]`. Live still contains the code path; the map refuses an always-on claim without a run receipt `[C27]`. Neighbor work that adds a residual vector (ActAdd, CAA, clamp **0.03**) does not implement this brake `[C08]`. PARB remains a **loss** (**29.9%** vs **41.6%**) `[C03]`.

---

## 1. Introduction

Residual steering literature changes *h* and then reads logits. The governor changes the **logits** after the projector, when the model is already too sure `[C26]`. That is a different site from mid-pass `apply_forces` `[C07]` and from `BASIN_PULL(0.03)` `[C21]`. This paper isolates that site so it cannot be washed into “control vectors.” Mid-pass **gravity**, **black-hole** repulsion, **orbit**, **Langevin**, and **scar** stay in their own drafts `[C01][C18]`; the governor does not replace them.

PhysicsLang names the atoms `GOVERNOR` / `VISCOSITY` and places them **outside** the blend product `[C05]`:

```
GodZone := RAMP(4,10) → BLEND(0.55) × (GRAVITY + …) + WOBBLE + GOVERNOR + VISCOSITY
```

The brake is part of the original “alive” feel in the force map, not a later residual trick `[C27]`.

---

## 2. Dated timeline

| Date | What | Cite |
|------|------|------|
| 2025-12-16 | Physics-LLM gold master; governor lives in the same `main.rs` as blend **0.55** | [C01][C26] |
| 2026-08-07 | Force map documents governor vs residual and the always-on wiring caveat | [C27] |

No new telemetry campaign is added. Recovery receipts measure mid-pass repulsion/gravity `[C12][C13]`, not this brake.

---

## 3. Mechanism

Physics-LLM `sample_token` path `[C26]`:

1. Normalize entropy to `[0, 1]` against `ln(vocab_size)`.
2. **Velocity** = `1 - h_norm`. High confidence ⇒ high velocity.
3. **Speed limit** `safe_velocity = 0.95` (comment: trigger when `H_norm < 0.05`).
4. If `velocity > safe_velocity`, find top-1, compute  
   `drag_force = (velocity - safe_velocity) * 15.0`, subtract from that logit.
5. Log `[GOVERNOR]` with velocity, `H_norm`, drag, token index.
6. **VISCOSITY:** inertia tracker; “thick air” if sleepwalking `[C26]`.

Force-map paraphrase `[C27]`: centrifugal governor if velocity > **0.95**, `resistance_strength` **15**; viscosity suppresses top-k and boosts minority candidates. **Not residual add.** Live `main_helpers2.rs` still has the path; whether every chat path calls it is unwired-until-proven `[C27]`.

This paper therefore claims **code existence and a named control law**, not “every live chat is governed.”

---

## 4. What residual-only cannot do here

The force map’s list of original capabilities includes logit governor + viscosity fighting confident wrong top-1 / sleepwalking clusters `[C06]`. A **0.03** basin pull cannot spend a God Zone force budget and does not implement this brake `[C06][C08]`. Quantized **0.95/0.05** blend (D1) is a different **0.95** — residual mix, not entropy velocity `[C22]`. Do not conflate those two 0.95s.

---

## 5. Scoreboard

| Item | Number | Cite |
|------|--------|------|
| God Zone blend (context) | **0.55** | [C01] |
| Governor threshold | **0.95** | [C26] |
| Resistance | **15.0** | [C26] |
| PARB | **29.9%** vs **41.6%** | [C03] |
| Residual face | clamp **0.03** | [C08] |

No governor-on vs governor-off accuracy table exists in the cited sources. None is invented.

---

## 6. Neighbor literature

ActAdd / CAA / RepE / llama.cpp control vectors: **neighbors** at the residual site. Watt’s centrifugal governor is a **metaphor** in the comment, not a citation of a thermodynamics paper as LLM prior art. Entropy-based sampling tricks (typical sampling, min-p) are **neighbors** on the logit side; they are not a named `[GOVERNOR]` tied to God Zone velocity and a 15.0 drag on top-1 in this runtime `[C26]`.

**Verdict:** no close match in the searched residual-steering set for this specific brake. No vacuum claim.

---

## 7. Discussion

If the public demo is residual clamp **0.03**, the governor is dark `[C08][C27]`. If a paper translates governor into “we add a control vector,” it has changed the site. PhysicsLang keeps the name `[C05]`. Path B tags can request SPIKE/FOCUS `[C32]`; the governor can still fire on a confident wrong top-1 after that. They are stacked, not aliases.

---

## 8. Conclusion

The original stack brakes confident logits. Threshold **0.95**, strength **15.0**, same tree as God Zone **0.55** `[C26][C01]`. It is not residual add `[C27]`. The honest bench is still PARB **29.9%** vs **41.6%** `[C03]`. Wiring on every live chat path is unclaimed.

---

## References

Local: C01, C03, C05–C08, C12–C13, C21–C22, C26–C27, C32.  
External: Turner et al. 2023; Rimsky et al. 2024.
