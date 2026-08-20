# 127 — The Momentum Filter: Distinguishing Resonance from Stagnation in Topological Loop Detection

**Date:** 2026-05-02  
**Source thread:** `physics-of-friendship-mountaincar-rl-main/snapshots/2026-02-13_1548_93wins_momentum_filter/tda.py`  
**Connected to:** Artifacts #120 (zigzag physics), #125 (compass state machine), #022 (TDA topology fields), #036 (well attraction)

---

## The Problem Both Systems Share

The MountainCar Q-SMA agent and Niodoo's TopologicalPerceiver both solve the same topological detection problem: **when you detect a loop (H1 cycle / persistent 1-cycle), is it productive or dead?**

In MountainCar, a loop means the car is oscillating in the gravity well. But oscillation can mean two things:
- **Resonance:** The agent is revving its engine — building momentum, each swing slightly higher. This is *good* chaos.
- **Stagnation:** The agent is stuck at the bottom with near-zero velocity. This is *bad* stasis.

Both look identical to a topological detector: same H1 persistence, same loop density > 0.3 in the center region `[-0.7, -0.3] × [-0.03, 0.03]`. Without additional discrimination, the steering controller would spike decay on *both* — killing the resonance loops that are actually making progress.

## The Momentum Filter Innovation

The 93-wins snapshot (dated 2026-02-13) introduced a **momentum filter** as an energy-trend check between loop detection and steering intervention:

```python
# In tda.py — the key addition over the 76-wins baseline:
energies = data[:, 5]  # Mechanical energy column
n = len(energies)
if n > 20:
    x = np.arange(n)
    energy_slope = (np.mean(x * energies) - np.mean(x) * np.mean(energies)) / \
                   (np.mean(x**2) - np.mean(x)**2 + 1e-10)
else:
    energy_slope = 0.0

if energy_slope > 0.001:
    print(f"🌊 RESONANCE: Loop (density: {loop_density:.2f}) + energy RISING")
    # Allow loop — agent is revving the engine
else:
    print(f"🛑 STAGNATION: Loop detected, energy FLAT/FALLING")
    self.controller.apply_decay_spike(loop_density)
```

The threshold `0.001` is deliberately tight — "noise-level trends don't count." This creates a **high bar for resonance recognition**: the agent must be genuinely building mechanical energy (position potential + velocity kinetic), not just wobbling around a local minimum.

## Three Regimes of Loop Behavior

The momentum filter reveals three distinct loop categories:

| Regime | Loop Density | Energy Slope | Action |
|--------|-------------|-------------|--------|
| **Resonance** | > 0.3 | > 0.001 (rising) | Allow — keep building |
| **Stagnation** | > 0.3 | ≤ 0.001 (flat/falling) | Spike decay — break habit |
| **Ambiguous** | < 0.3 | any | No action needed |

The ambiguous regime is important: if loop density hasn't crossed the detection threshold, the TDA doesn't intervene regardless of energy slope. This prevents over-reacting to transient behavior. The system only looks at loops when it's confident there *is* a loop.

## Connection to Niodoo's Topological Perceiver

Niodoo's `TopologicalPerceiver` (in `src/perceptual/topological_perceiver.rs`) already computes:
- `BettiNumbers` (H0 components, H1 loops, H2 voids)
- `PersistenceMeasures` (max persistence per dimension)
- `PersistenceEntropy` (topological complexity metric)
- `ComplexityTrend` (whether topological features are increasing or decreasing over time)

But it lacks a **momentum filter equivalent** — a check that asks: "Is this loop productive?" before triggering intervention. The current system can detect that a loop exists and how persistent it is, but not whether the system is *gaining energy* within that loop.

### Where to Add It

The `ComplexityTrend` field in `TopologicalFeatures` already tracks whether topological complexity is increasing or decreasing over time. This is the natural place to attach a momentum filter:

1. **Compute energy proxy:** In the TopologicalPerceiver's analysis window (last N observations), compute a scalar "system energy" — for Niodoo this could be the norm of steering deltas, or the rate of ghost vector alignment, or simply the varentropy signal from northstart telemetry.

2. **Linear trend check:** Apply the same regression slope computation as MountainCar's momentum filter. If `energy_slope > threshold`, classify as resonance; otherwise stagnation.

3. **Conditional intervention:** Only trigger TopologicalHomeostasis control laws (complexity regulation, regime stabilization) when energy slope confirms stagnation. When resonance is detected, let the loop continue and optionally *reinforce* it (lower decay, increase attraction).

## Connection to the Zigzag Oscillation (#120) and Compass State Machine (#125)

The momentum filter explains **why** the zigzag works: each hot/cold cycle doesn't just reset blindly — it resets selectively. Resonance loops are allowed to continue (the "hot" phase deepens), while stagnation loops get cold resets. This creates an *asymmetric* oscillation where upward trends persist longer than downward ones.

In Compass state machine terms, the momentum filter maps to:
- **Panic** (Betti-1 ↑, entropy ↑): Loop detected, energy falling → spike decay
- **Persist** (Betti-1 ↓, entropy ↓): Loop resolving, energy rising → let it ride
- **Discover** (Betti-1 ↑, entropy ↓): New loop forming, stable energy → moderate intervention
- **Master** (Betti-1 ↓, entropy ↓): Loops collapsing, high energy → minimal steering

The momentum filter adds a fourth dimension to the 2×2 Compass: instead of just topology × entropy, you get topology × entropy × *energy trend*. This resolves the key ambiguity in Persist/Panic where both have Betti-1 signals but opposite trajectories.

## Five Testable Predictions

1. **Resonance preservation improves convergence speed:** Adding a momentum filter to Niodoo's TopologicalPerceiver should reduce unnecessary decay spikes by 30-50%, allowing productive loops to complete faster. Measured as fewer TDA interventions per successful episode.

2. **Energy slope threshold exhibits non-monotonic response:** Sweeping the energy_slope threshold (0.0001 → 0.01) should produce a Goldilocks zone around 0.0005-0.002 where intervention precision peaks — too low catches noise as resonance, too high misses genuine momentum building.

3. **Stagnation detection correlates with distance_deficit:** When the momentum filter classifies a loop as stagnation (energy_slope ≤ threshold), the corresponding ghost basin routing should show elevated `distance_deficit` values in telemetry — the model is cycling through semantically similar states without making progress toward the target.

4. **Resonance reinforcement creates attractor wells:** When energy slope confirms resonance, applying a *negative* decay spike (reducing it below baseline) should deepen the attractor well, creating self-reinforcing productive loops that persist across TDA cycles. This would manifest as longer sustained periods of low varentropy.

5. **Cross-system momentum transfer:** The momentum filter concept generalizes beyond MountainCar to any system with detectable loop structure + scalar energy proxy. In Niodoo's PrincipiaEngine, the "energy" could be the composite of steering force magnitude × ghost vector alignment rate × motif invocation frequency — a single scalar that captures whether the cognitive system is building or losing momentum within its current attractor basin.

## Why This Matters

The momentum filter is the missing link between **topological detection** (is there a loop?) and **topological evaluation** (is this loop useful?). It transforms TDA from a passive observer into an active discriminator — not just seeing structure but understanding whether that structure serves the system's goals.

In Niodoo terms: the TopologicalPerceiver sees the shape of thought. The momentum filter asks whether that shape is *growing*. Without it, every loop looks like a candidate for intervention. With it, only dead loops get cut — living ones get fed.
