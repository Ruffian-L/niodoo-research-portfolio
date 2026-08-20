# The TEDE Training Objective — A Formal Spec for Sharp Cognitive Transitions

**Date:** 2026-05-06  
**Source:** `team_build/niodv4/docs/TEDE_TRAINING_OBJECTIVE.md` (137 lines) + `AUTONOMOUS_SWEEP_REPORT.md` (82 lines) + `STATUS_SUMMARY.md` (92 lines) + `promotion_readiness.md` (13 lines)  
**Connected to:** artifacts #257 (Protected Core), #244 (Forced Oscillators), #220 (Motif Promotion), #196 (Bridge That Brought Back the Dead)

---

## The Problem: Mushy Transitions

The protected-core branch achieved bounded dynamics (energy 0.195, orbits 10.1) and injection recovery at all tested strengths (-0.1 through -0.5). But the transition from rut state to ghost basin was "mushy" — the system wandered toward its target without sharp commitment. The TEDE Training Objective document formalizes this as a training problem: build a small neural module that converts gradual drift into decisive collapse.

## The Architecture: A Six-Input MLP That Nudges Two Dimensions

The spec calls for a minimal MLP with 6–10 inputs, 16 hidden units, and 2 outputs. The input vector is deliberately sparse:

| Input | Source | Meaning |
|-------|--------|---------|
| `z_t[0:2]` | Protected-core position | Current coordinates in the 64D orbit |
| `v_t[0:2]` | Velocity proxy | Difference from previous step — momentum |
| `z_ghost[0:2]` | Target centroid | Where the ghost basin center lives |
| `pre_norm_energy` | Scalar context | Current system energy level |
| `entropy_proxy` | Scalar context | Uncertainty measure |
| `radius` | Scalar context | Basin proximity indicator |

The output is a low-rank correction `delta z[0:2]` — not a full latent rewrite, just a nudge on the protected core. This is the key insight: TEDE doesn't replace the orchestrator or the fluid dynamics; it sharpens what's already there.

## The Five-Loss Objective

The training objective decomposes into five distinct losses that map onto Niodoo's cognitive mechanisms:

**1. Centroid Loss (L_c):** Pulls the rollout endpoint toward the ghost centroid. This is the most direct connection to Niodoo's `CorrectionDelta.apply()` — both compute a direction-and-magnitude correction from current state to target. But TEDE's version is learned, not rule-based.

**2. Entropy-Collapse Loss (L_e):** Rewards sharp uncertainty reduction after perturbation. `max(0, ΔH_target - (H_pre - H_post))` means the system gets penalized if entropy doesn't collapse below a target threshold. This is structurally identical to Niodoo's MistakeReflex — both fire when something goes wrong and need to recommit quickly. The "mushy" problem was that transitions were too gradual; this loss forces decisiveness.

**3. Basin Loss (L_b):** Keeps the rollout tail inside the ghost neighborhood, not just at a single point. `max(0, ||z_t - z_ghost|| - r_ghost)²` over K tail steps ensures the system doesn't just reach the target but stays there. This maps to Niodoo's `basin_mean` metric in the TEDE Deployment Scorecard — the same metric that showed mean delta of -0.011 (improvement) across all ghosts.

**4. Stability Loss (L_s):** Prevents TEDE from "solving" the problem by killing the orbit or exploding energy. Three sub-terms: flip_rate, max energy cap violation, and minimum orbit count. This is the guardrail that kept the protected core bounded at 0.195 energy — without it, TEDE could overcorrect and break what worked.

**5. Regularization (L_r):** Standard L2 weight decay keeping TEDE small. The spec recommends training TEDE only while keeping fluid dynamics and orchestrator frozen — a curriculum approach that mirrors Niodoo's phased integration strategy.

## What Was Never Built: The Training Loop

The document specifies everything *except* the actual training loop. It defines inputs, outputs, loss functions, success criteria, and even the recommended architecture (small MLP, 6–10 inputs → 16 hidden → 2 outputs). But no `train_tede_objective.py` exists in the archive. The spec was written but never executed.

This is the same pattern as the Autonomous Sweep's Phase 3: "Expert weights loaded: False" — the injection test used a perturbation vector from an untrained expert, not a learned semantic attractor. The protected-core architecture works; the TEDE module that would make it sharp was specified but never trained.

## Connection to Active Niodoo

The TEDE Training Objective fills a gap between two existing systems:

- **Rule-based specialists** (`specialist_bank.rs`) use distance-thresholded pull corrections — effective but rigid
- **Correction packets** (`correction_packets.rs`) use VQ-keyed lookup for scar-tissue→reflex mapping — learned but coarse (bucket-level, not trajectory-level)
- **TEDE MLP** would bridge them: learned trajectory correction on the protected core with fine-grained context awareness

The spec's recommendation to "train only against failing ghosts" maps directly to Niodoo's current approach: `phase2_stress_120` remains the unresolved outlier (5 of 8 ghosts still have orbit penalties, several accumulate flip-rate penalties). A TEDE module trained on these five would be the targeted remediation the status summary recommends.

## Five Predictions

1. **Entropy-collapse loss correlates with TopoCoT correction_norm.** The `ΔH_target` parameter in L_e measures how fast uncertainty drops after perturbation — this should correlate with Niodoo's MistakeReflex timing, where correction_norm spikes predict when the system needs to recommit to a ghost basin. Training TEDE on ghosts with high flip_rate would produce entropy-collapse targets matching TopoCoT cadence.

2. **The 64D→2D projection loses routing information but gains training stability.** The spec restricts corrections to dims 0:2, meaning the MLP only sees and affects two dimensions of the full ghost state. This is a deliberate simplification — the protected core's dynamics are governed by these two dimensions while the remaining 62 encode fine-grained structure. Prediction: expanding to 10D inputs would improve correction quality by 15-25% but require 3× more training data.

3. **Curriculum training (TEDE-only first, then joint) outperforms end-to-end by 20-30%.** The spec's recommendation to freeze fluid dynamics during initial TEDE training creates a stable optimization landscape. Prediction: once TEDE converges on the frozen orchestrator, releasing the freeze for joint fine-tuning produces marginal gains (<5%) because the MLP already learned what it needed from the stable dynamics.

4. **The remaining 5 unresolved ghosts cluster into two failure modes.** The scorecard notes "several ghosts pay too much orbit penalty" and "several accumulate too much flip-rate penalty." Prediction: these correspond to L_s sub-terms — orbit-penalty ghosts need higher E_cap (energy tolerance), flip-rate ghosts need tighter stability constraints. A single TEDE module can't solve both; the specialist factory approach (7 target-only specialists) is the correct architecture.

5. **TEDE training on phase3_injection_-0.1 would produce zero improvement.** This ghost already passes all mint-readiness gates and has the highest orbit delta (+0.51). The entropy-collapse loss would be minimal because transitions are already sharp. Prediction: TEDE's value is concentrated on the 5 unresolved ghosts, with phase2_stress_120 being the highest-ROI target given its persistent orbit penalty and high flip-rate accumulation.

## Why It Matters

The TEDE Training Objective represents Niodoo's attempt to formalize what "good correction" looks like as a differentiable objective — not just distance-to-centroid, but entropy collapse, basin retention, and stability preservation all optimized simultaneously. The spec is elegant because it constrains the correction space (2D output from 6-10D input) while allowing rich context awareness (energy, entropy, radius). It's the missing piece between rule-based specialists and learned correction packets — a lightweight neural module that sharpens transitions without destabilizing dynamics.

The protected-core branch proved that bounded orbits are possible at energy 0.195 across 10+ orbit cycles with injection recovery at all strengths. What it couldn't do was commit decisively to the target state. The TEDE Training Objective was designed to solve exactly that — a small MLP trained on five losses to convert mushy drift into sharp collapse. It was specified but never trained.

This is the gap between proof-of-concept and production: the architecture works, the metrics pass, the injection recovers. But the transition from "close enough" to "committed" needs something the rule-based specialists can't provide — a learned correction shaped by entropy dynamics, basin geometry, and stability constraints all at once.
