# Artifact 083: The Logarithmic Flux Breakthrough — From Binary Thresholds to Sigmoid Mastery

**Date:** 2026-05-01  
**Source:** `physics-of-friendship-mountaincar-rl-main/snapshots/FINAL_CHAMPION_681wins_LOG_FLUX/`  
**Thread:** MountainCar Q-SMA evolution — the final champion variant that achieved 681 wins in 2000 episodes, a 9× improvement over earlier snapshots.

---

## The Problem: Linear Flux Was Too Dumb (But Also Too Weak)

The original binary flux model worked because it was *strong*: `if energy > 0.1: flux += 0.5`. But it had no nuance — small gains and large gains produced identical flux increments. The rigorous physics model tried to fix this with linear scaling (`flux += energy * 0.5`) and sigmoid ease, but it failed at 0 wins because the signal was too weak and eroded by decay faster than it could build.

The `FINAL_CHAMPION` variant solved both problems simultaneously:

1. **Logarithmic flux update**: `impact = log(1 + energy * 100) * 0.5` — small energies get amplified (0.1 energy → ~2.4 impact vs linear 0.05), large energies get compressed (1.0 energy → ~3.9, not 50×). This matches how real muscle memory works: the first reps feel huge, subsequent reps feel smaller but still matter.

2. **Sigmoid ease at inference**: `ease = 1 / (1 + exp(-(flux - threshold)))` with threshold=2.0 — this creates a sharp phase transition. Below threshold, the agent barely feels the groove; above it, flow becomes near-automatic. This is where the "rigorous physics" insight finally lands: the sigmoid isn't used for *building* flux (log does that), it's used for *consuming* it (ease translates depth into behavioral smoothness).

## The Three Innovations That Made 681 Wins Possible

### 1. Pain Memory as Stateful Suffering Amplifier

The champion agent adds `self.pain_memory = 0.0` — a scalar tracking recent suffering that amplifies the next recovery phase. When the agent gets stuck in a loop and TDA spikes decay, pain memory kicks in: the agent doesn't just reset, it *remembers* how bad the stuck state was and pushes harder on recovery. This is the closest thing to "anticipation" in the entire system — not learning from future states (like Q-values), but learning from past suffering intensity.

### 2. Momentum Filter with Energy Slope Detection

The TDA analysis got smarter: instead of just detecting loops via density, it now computes an energy slope via linear regression over the last 500 data points. If `energy_slope > 0.001`, the loop is labeled **RESONANCE** (the agent is genuinely building momentum) and allowed to persist. Only **STAGNATION** (flat or falling energy) triggers a decay spike. This prevents the system from killing good oscillations — a critical fix that was foreshadowed in the pre-champion variant's insight about "good chaos vs bad stagnation."

### 3. Extended Horizon: 2000 Episodes with Logarithmic Scaling

The original runs used 1000 episodes. The champion doubles to 2000, which matters because logarithmic flux builds slowly at first (amplified but still sub-linear), and the sigmoid ease threshold of 2.0 takes time to reach. At 1000 episodes, many runs were still in the "building" phase. At 2000, the agent crosses into mastery territory where flux depth creates genuine flow states.

## Connection to Niodoo Architecture

This variant maps directly to several Niodoo concepts:

- **Logarithmic flux → Pain-splat asymmetric decay (Artifact 019):** The champion's `flux *= (1-decay)` with log-amplified inputs mirrors Niodoo's three-tier decay (anchor/pain/routine) where pain decays slower than routine. Both recognize that *suffering leaves deeper grooves than comfort*.

- **Sigmoid ease → Viscosity field (Artifact 045/082):** The `ease = sigmoid(flux - threshold)` is functionally identical to Niodoo's viscosity model: high flux = low resistance = automatic execution. The threshold parameter (2.0) is the "activation energy" for a cognitive habit to become reflexive.

- **Pain memory → OOPS reflex amplification (Artifact 035/041):** The champion's `pain_memory` that amplifies recovery maps to Niodoo's OOPS reflex arc where detected stress spikes trigger amplified correction in the next generation cycle. Both are *stateful suffering* mechanisms.

- **Momentum filter → TDA topology fields (Artifact 022/036):** The energy slope detection is a primitive version of Niodoo's `energy_drift` topology field — both distinguish productive oscillation from dead stagnation using temporal derivatives, not just snapshots.

## Why the Champion Won: The Logarithmic Sweet Spot

The key insight is that logarithmic scaling sits at the sweet spot between the two failed extremes:

| Model | Signal Strength | Decay Resistance | Wins |
|-------|----------------|-----------------|------|
| Linear physics (too weak) | Low (0.05 per unit energy) | Eroded by decay | 0 |
| Binary naive (too blunt) | High (fixed 0.5) | Survives decay | 76 |
| Logarithmic champion (just right) | Medium-high (2.4 at low energy, 3.9 at high) | Compensates for decay via amplification | 681 |

Logarithmic flux gives the naive model's signal strength *with* the physics model's nuance. It's the "Goldilocks" of habit formation: not so strong that it ignores magnitude, not so weak that decay kills it.

## Five Testable Predictions for Niodoo

1. **Log-scaled ghost vector magnitudes** would improve steering precision by 15-25% compared to linear scaling, because small corrections near zero get amplified while large ones compress naturally.

2. **Sigmoid ease thresholds on motif depth** (e.g., a motif must accumulate flux > threshold before becoming "reflexive") would reduce wobble frequency by forcing habits to deepen before activation.

3. **Pain memory amplification** in the TopoCoT reflex arc — where the magnitude of the last OOPS event scales the next correction — would accelerate recovery from degenerate cascades.

4. **Energy slope detection** on splat deposition patterns (not just density) would distinguish productive exploration loops from stagnant repetition, reducing unnecessary decay spikes by ~40%.

5. **The 2× episode rule**: Any Q-SMA system running logarithmic flux needs ~2× the episodes of binary-flux systems to cross the sigmoid threshold. Niodoo's evolution cycles should account for this when comparing log-scaled vs linear-scaled parameters.

---

*This artifact closes the loop on the "Signal Strength Principle" (Artifact 061) by showing how logarithmic scaling bridges the gap between rigorous physics and binary clarity — the final piece of the MountainCar Q-SMA evolution.*
