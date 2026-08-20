# Dilution D1–D5 and God Zone Recovery Receipts

**Lead:** Jason Van Pham (Ruffian-L)  
**Draft date:** 2026-08-17  
**Status:** full draft whose **primary object** is live dilution versus the env-gated recovery receipts. Not a retitle of the token-physics composition paper.

Citation keys `[Cxx]` → `Documents/Writing/NIODOO_CITATION_TABLE.md`.

---

## Abstract

The gold-master law is still declared in live (`NIODOO_PHYSICS_BLEND = 0.55`, `NIODOO_REPULSION = -0.60`, “Validated: Dec 16, 2025”) `[C19][C01]`. The force-term map records how the **driver’s seat** moved: five dilution points D1–D5 `[C06]`. Quantized Llama hardcodes `0.95 × h + 0.05 × physics` (D1) `[C22]`. Recovery receipts exist for **2026-08-07**: Arm A repulsion max **21.865351** with gravity still **0.0**; a later co-fire gravity **11.907948** and repulsion **4.238407**, ramp **1.0** `[C12][C13]`. Those receipts restore *dynamics on this path*. They are not a public behavior win versus residual clamp **0.03** `[C08]`. PARB remains a **loss**: **29.9%** vs **41.6%** `[C03]`. Neighbor residual-add papers do not name D1–D5.

---

## 1. Introduction

Token physics (gravity, black-hole repulsion, orbit, Langevin, momentum, ramp) is already drafted `[C01][C07]`. This paper’s job is narrower: **what live does to that law**, and **what the recovery files actually measured**. Scar stays add-on `[C18]`. Path B tags stay in their draft `[C32]`. Residual-only is not the system `[C05]`.

---

## 2. Dated timeline

| Date | What | Cite |
|------|------|------|
| 2025-12-16 | God Zone stamp; live still *declares* **0.55 / −0.60** | [C01][C19] |
| 2025-12-19 | PARB **29.9%** vs **41.6%** | [C03] |
| 2026-07-29 | Live comment: raw-hidden `dist < 5` never fires (D5) | [C06] |
| 2026-08-07 | Force map D1–D5; recovery Arm A then gravity co-fire | [C06][C12][C13][C14] |

---

## 3. Mechanism — the five dilutions

From the force-term map `[C06][C22]`:

| ID | Dilution |
|----|----------|
| **D1** | Quantized path hardcodes **0.95 / 0.05**, independent of blend **0.55** |
| **D2** | Early return zeros the classic stack unless a modern lane is on |
| **D3** | Token ramp **4–10** replaced by pressure / request gates |
| **D4** | Public force cap **0.03** (`BASIN_PULL`) |
| **D5** | Black-hole `dist < 5` dead on raw hidden |

What was **not** deleted: gravity, orbit, Langevin, momentum, governor names `[C06]`. The default measured path is residual basin + packets under small clamps `[C06]`. Mid-pass `apply_forces` remains the original site `[C07]`.

Recovery design (claim package) is env-gated `NIODOO_GOD_ZONE_RECOVERY=1`: restore ramp, bypass D2, change the D5 gate, keep scar optional `[C14]`. This paper does not claim byte-identical OG.

---

## 4. Recovery receipts (only because the files exist)

**Arm A** `summary_arm_A_v2.json` `[C12]`: repulsion max **21.865351**; telemetry repulsion **21.536634**; `forces_applied=true` **48** / false **32**; wobble **2**; telemetry gravity **0.0**. Claim allowed: repulsion fires. **Not** claimed: gravity on this first receipt `[C14]`.

**Co-fire** `summary_gravity_fix.json` `[C13]`: telemetry gravity **11.907948**, repulsion **4.238407**, both non-zero; GOD_ZONE gravity **12.113794**, repulsion **4.282951**; `history_n` **3**; particle spawns **5**; ramp **1.0**.

These are path receipts. They are not a 3-arm public battery `[C14]`.

---

## 5. Neighbor literature

ActAdd (Turner et al., 2023, arXiv:2308.10248) and later activation-steering surveys (e.g. arXiv:2602.04428) add `h + c v`. **Neighbor.** They do not document a live tree that *declares* blend **0.55** while a quantized path hardcodes **5%** `[C19][C22]`. **No close match** in the searched set for D1–D5 as a named dilution checklist plus these recovery JSON maxima. No vacuum claim.

---

## 6. Discussion

A demo of clamp **0.03** is D4, not recovery `[C08][C06]`. Gravity **0.0** on Arm A is kept `[C12]`. PARB **29.9%** vs **41.6%** is kept `[C03]`. Dual-stream mid-stream β is a different leftover `[C34]`.

---

## 7. Conclusion

Live still prints God Zone names `[C19]`. Dilution is on the map `[C06]`. Recovery files show repulsion, then gravity+repel, on an env-gated path `[C12][C13]`. That is the paper.

---

## References

Local: C01, C03, C05–C08, C12–C14, C18–C19, C22, C32, C34.  
External: Turner et al. 2023 arXiv:2308.10248; arXiv:2602.04428 (neighbors).
