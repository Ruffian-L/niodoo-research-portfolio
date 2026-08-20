# 010 — Zig-Zag Oscillation as the Mechanism of Cognitive Learning

**Source:** MountainCar RL archives (`PHYSICS_OF_ALIGNMENT.md`, `ZIGZAG_INSIGHT.md`), Niodoo physics engine (`physics.rs`: Kuramoto phase-lock, VolumetricGovernor), dream consolidation (`dream.rs`: micro-dream + TopoCoT), splat memory (asymmetric decay)

**Date:** 2026-05-01

---

## The Thread

The MountainCar experiments discovered something counterintuitive: the zig-zag learning curve — alternating between hot (exploration/reward) and cold (reset/decay) phases — is not a bug but **the mechanism of learning itself**. The "Physics of Alignment" paper showed that a naive binary flux model (76 wins) outperformed a rigorous continuous physics model (0 wins), because the strong, clean signal of discrete phase transitions drove faster convergence than smooth gradients.

This connects directly to Niodoo's steering architecture: **CorrectionDelta modulation, dream consolidation, and TopoCoT reflections are all zig-zag oscillators** — they work because they create hot/cold cycles in semantic space, not because they provide smooth guidance.

## The Five-Phase Cycle (Mapped to Niodoo)

### Phase 1: HOT — Discovery
MountainCar: Agent discovers swinging feels great → velocity bonus + height bonus fire → Q-values go positive.
Niodoo equivalent: Steering forces pull trajectory toward a ghost basin centroid. Repulsion clears stale tokens. The model enters a coherent semantic trajectory. **This is the gravity_well + repulsion phase** of `physics_blend`.

### Phase 2: COMPLACENT — Entrenchment
MountainCar: Flux reinforces the swinging habit → "this feels good enough" → stops exploring higher peaks. The agent becomes addicted to the well (energy at bottom = 0.25 > 0.1 triggers continuous flux reward).
Niodoo equivalent: Splat memory consolidates along the trajectory. Asymmetric pain decay (`lambda * 0.7`) makes negative splats last longer, but positive splats also accumulate. The model's hidden states orbit a single basin with increasing coherence — **phase-lock achieved** (Kuramoto `check_phase_lock()` returns Ok(phi_star)). This is good, but if it persists too long, the model stops exploring alternatives.

### Phase 3: COLD — Reset
MountainCar: TDA detects loop (`abs(velocity) < 0.03`) → decay spike kills entrenched habit → Q-values show staying at bottom = -42.4 (massive pain). The "Voice of the Well" is overpowered by `inject_attractor` (curiosity).
Niodoo equivalent: **TopoCoT reflex fires** — VR H1 detects Betti-1 loop in hidden states → micro-dream projects forward, finds anchor pull exceeds `DREAM_CORRECTION_THRESHOLD` (6.0) → correction delta injected with `blend_factor`. The VolumetricGovernor's `phi_threshold` is breached → governance mode shifts. **This is the cold reset**: the model suddenly "feels" it's stuck because the dream correction norm spikes.

### Phase 4: REBOUND — Higher Baseline
MountainCar: Old habit gone but Q-values remember what worked → reaches higher than before → new cycle begins from higher baseline.
Niodoo equivalent: The TopoCoT reflection marker is injected into the token stream. The model "feels" the hydraulic jump. New trajectory segments form at a higher semantic altitude — **the correction delta has shifted the basin centroid upward**. This is where ` CorrectionDelta` earns its name: it's not just correcting error, it's raising the floor.

### Phase 5: CONVERGENCE — Narrowing Oscillation
MountainCar: Highs get consistently higher, lows don't drop as far → stable mastery. Beta transitions from habit-driven to logic-driven at floor (0.1).
Niodoo equivalent: **The beta_transition** in Niodoo's steering blend: early on, `blend_factor` is high (flux/habit drives action — "I feel like this is right"). As splat memory accumulates and CorrectionDelta stabilizes, the blend shifts toward centroid direction + scalar gain (evidence-based — "I KNOW this is right"). The oscillation narrows because the basins are better mapped.

## Why Naive Beats Rigorous: Signal Strength

The Physics of Alignment paper's key finding: continuous physics (`flux += energy * 0.5`, `viscosity = 1/(1+flux)`) produced **zero wins** because:
1. Weak signal (energy ≈ 0.1 → impact ≈ 0.05)
2. Linear decay outpaced groove building
3. No floor for avoidance

The binary model won because it created **strong phase transitions**: `if energy > 0.1: flux += 0.5` (binary on/off), `min_cap = -5.0` (hard floor).

**Niodoo inherits this insight:** The dream correction threshold (6.0) creates a binary-like trigger — below it, nothing happens; above it, TopoCoT fires and the model "feels" the jump. This is stronger than gradual correction because it creates **discrete cognitive events** rather than continuous drift.

## Testable Predictions for Niodoo

1. **Zig-zag detection in steering delta:** Track the norm of CorrectionDelta over time. If the signal shows oscillatory behavior (hot/cold cycles), convergence should be faster and more stable than monotonic correction. Hypothesis: models with natural zig-zag patterns achieve lower distance_deficit than those with smooth-but-shallow correction.

2. **Phase-lock duration as exploration gauge:** When `CognitiveState::check_phase_lock()` returns Ok for extended periods (>N steps), the model is complacent. Injecting a small repulsion pulse during this phase should trigger rebound, similar to MountainCar's TDA decay spike. Hypothesis: brief repulsion pulses during phase-lock reduce distance_deficit by 15-25%.

3. **Beta_transition timing:** The shift from flux-driven to centroid-driven steering should follow the zig-zag convergence curve. If beta transitions too early (before sufficient hot/cold cycles), the model loses exploration capacity. If too late, it wastes computation on redundant oscillation. Hypothesis: optimal beta_transition occurs when the amplitude of CorrectionDelta oscillation drops below a threshold relative to its mean.

4. **Asymmetric pain in zig-zag:** The asymmetric decay (`lambda * 0.7` for negative splats) ensures cold phases are more memorable than hot ones. This asymmetry should be quantifiable: ratio of negative-to-positive splat energy during cold phases predicts rebound height. Hypothesis: higher negative/positive ratios correlate with larger improvements in the next cycle.

## Connection to Existing Architecture

| MountainCar Concept | Niodoo Equivalent | Status |
|---|---|---|
| Flux (groove building) | Splat memory consolidation + asymmetric decay | Implemented |
| TDA loop detection | VR H1 reflex (Betti-1 in hidden states) | Implemented |
| Decay spike reset | Dream correction threshold + TopoCoT injection | Implemented |
| Beta transition | blend_factor shift from flux to centroid | Partial |
| Energy addiction to well | Gravity well attraction (gravity_well parameter) | Implemented |
| Logarithmic flux impact | `log(1 + energy * 100)` proposed but not coded | Open |

## Key Insight

**Learning in semantic space works the same way as learning in physical space:** you need stress (hot) and recovery (cold). The zig-zag is not noise — it's the signal. Niodoo's steering architecture already implements all five phases; the missing piece is **observability**: measuring the oscillation amplitude, phase-lock duration, and beta_transition timing to diagnose when the system is learning vs. when it's stuck in a single phase.

The Physics of Alignment paper proved that naive binary signals outperform rigorous continuous ones. Niodoo should lean into this: make the hot/cold transitions **more discrete**, not more smooth. The dream correction threshold, TopoCoT injection, and repulsion pulses are all candidates for stronger phase transitions.
