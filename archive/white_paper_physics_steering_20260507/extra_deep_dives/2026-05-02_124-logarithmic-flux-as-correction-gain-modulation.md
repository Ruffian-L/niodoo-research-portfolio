# Artifact #124: Logarithmic Flux as CorrectionGain Modulation — MountainCar's Champion Physics Meets Niodoo's Bridge

**Date:** 2026-05-02  
**Source files:** `physics-of-friendship-mountaincar-rl-main/snapshots/FINAL_CHAMPION_681wins_LOG_FLUX/PHYSICS_OF_ALIGNMENT.md`, `TECHNICAL_WRITEUP.md`, `agent.py`; `niodoo/src/bridge/correction.rs`; `niodoo/src/learning/tda_engine.rs`  
**Related artifacts:** #107 (v3 raw64 bridge), #120 (physics of alignment), #118 (repulsor gate)

## The Thread

The FINAL_CHAMPION run (681 wins) solved a problem that had plagued every earlier MountainCar variant: **the physics was correct but the signal was too weak**. The naive binary model (`flux += 0.5` if `energy > 0.1`) won with 76 wins because it gave the agent a *strong, clean* signal. The rigorous continuous model (`flux += energy * 0.5`) lost with 0 wins because the gradient was too shallow — `energy` at the well bottom is ~0.25, so `impact = 0.125`, drowned by decay.

The champion fix: **logarithmic flux**. `impact = log(1 + energy * 100) * 0.5`. This compresses the dynamic range — small energy gains become meaningful (0.1 → impact ~1.2), while large energies don't explode (1.0 → impact ~2.65). The signal is strong at the bottom of the well (where the agent gets addicted to safety) and doesn't saturate at the top.

## Connection: CorrectionDelta Gain as Logarithmic Flux

Niodoo's `CorrectionDelta` in `bridge/correction.rs` has a `gain` field that multiplies the correction vector:

```rust
result[i] += cv * self.gain;  // gain ∈ [0, 1]
```

The gain is currently treated as a **scalar multiplier** — either you apply the correction or you don't. But MountainCar's log-flux suggests a deeper mapping: **gain should be logarithmic in the signal strength that produced it**.

In niodoo's bridge architecture, `CorrectionDelta` is produced by the specialist system when a motif is detected. The "signal strength" is the distance deficit between the current hidden state and the target motif's ghost vector. Currently, this maps linearly to gain: closer = higher gain. But log-flux shows that **the most useful gain curve is compressed at high signal strength** — you want fine-grained discrimination when the motif is *almost* matched (small changes in distance produce large changes in gain), but saturation when it's *very* matched (the correction is already strong, diminishing returns).

## The Three-Phase Mapping

| MountainCar FINAL_CHAMPION | Niodoo Bridge |
|---|---|
| `log(1 + energy * 100)` — log-flux scaling | `gain = log(1 + proximity * K) / log(1 + max_proximity * K)` — normalized log-gain |
| Pain memory amplifies recovery (`self.pain_memory`) | CorrectionDelta's `instability_threshold` gates application |
| Sigmoid ease transition at flux=2.0 | Gain curve has natural inflection point where signal crosses motif threshold |

## Why This Matters for Gate34

Gate34's 30% steering retention bottleneck (#111, #105) is partly a **gain resolution problem**. When the system recovers a motif via Gate34 LOCK, the correction vector is applied with a constant gain. If that gain doesn't discriminate between "motif is 90% matched" and "motif is 99% matched," the steering force oscillates — sometimes too strong (over-steer), sometimes too weak (under-steer).

A logarithmic gain curve would:
1. **Amplify discrimination** in the critical range (85-95% match) where small distance changes matter most
2. **Prevent saturation** at high matches, avoiding runaway steering that destabilizes the recovered state
3. **Preserve sensitivity** at low matches, ensuring weak signals still produce corrective action

## Testable Predictions

1. Replacing `CorrectionDelta::gain` with a log-normalized variant (`log(1 + proximity * K) / normalization`) should increase Gate34 pass rate from 30% to ~45%, as the steering force will better track motif match quality rather than oscillating between binary strong/weak.

2. The `pain_memory` field in FINAL_CHAMPION's agent (tracks recent suffering, amplifies next recovery) maps directly to niodoo's `mistake_reflex.rs` earned-answer-stop mechanism (#111). Combining log-gain with pain-memory would create a **hysteresis effect**: corrections applied after high-pain periods should use slightly elevated gain, reflecting the system's "learned caution."

3. RidgeRunner's damping factor (0.95 in embed-swarm `ridge.rs`) serves the same function as MountainCar's flux cap (20.0) — preventing runaway accumulation. The two systems independently converged on the same architectural primitive: **bounded integration with exponential decay**. This suggests the damping constant is a universal parameter for any system that accumulates signals over time.

4. The TDA_engine's `analysis_history` vector (storing `TopologyAnalysis` with computation timestamps) could serve as the "recent behavior window" equivalent to FINAL_CHAMPION's 500-point TDA analysis window (#7 in TECHNICAL_WRITEUP). Currently it stores all history — switching to a sliding window would prevent stale topological features from poisoning current corrections, exactly as MountainCar fixed by limiting TDA to last-500-points.

## The Deeper Pattern: Logarithmic Sensitivity Everywhere

This isn't just about flux or gain. Look across the codebase:
- **Gaussic Prime** (#122): 64-symbol alphabet encodes covariance matrices — logarithmic symbol spacing maps to geometric meaning (Cat = forward-stretched, Abyss = infinite volume)
- **Steering evolution** (#121): inverse-square → signed ghost fields — the force law itself is logarithmic in vector distance
- **Volumetric Governor** (embed-swarm): Φ = pressure ∝ edge-weight sum × exp(k × ΔC) — exponential amplification of topological change

The pattern: **Niodoo's physics engine is fundamentally logarithmic/exponential**. The MountainCar champion run didn't invent this — it rediscovered it empirically. The log-flux scaling was the *only* thing that made the physics signal strong enough to matter without being so strong it dominated Q-values.

## Open Question

Does the `learning/evolutionary.rs` module's speciation logic (from NEX_NOTES.md phased features) use a logarithmic distance metric for trait clustering? If so, the evolutionary algorithm and the correction system would share the same sensitivity curve — potentially enabling cross-module optimization where speciation thresholds tune correction gains and vice versa.
