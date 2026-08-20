# Artifact #120: The Physics of Alignment — Viscosity Minimization and the Signal Strength Principle

**Date:** 2026-05-02  
**Source:** `physics-of-friendship-mountaincar-rl-main/snapshots/FINAL_CHAMPION_681wins_LOG_FLUX/` + pre-champion variants (76-win, 93-win, pre-momentum-filter)  
**Connected to:** Artifacts #061 (Signal Strength), #114 (Momentum Filter), #110 (Bridge Architecture)

---

## The Core Thesis: Minimize Resistance, Not Reward

Jason's `PHYSICS_OF_ALIGNMENT.md` makes a deceptively simple claim: **biological systems don't maximize reward — they minimize resistance.** A pianist doesn't play because the notes are rewarding; she plays because the fingers "flow" through the passage. The groove is real.

The equation proposed:
```
Ease = 1.0 - Viscosity(Flux)
```

This reframes the entire Q-SMA architecture. The agent isn't chasing positive rewards — it's seeking states where action feels easy (high flux → low viscosity → high ease). Reward shaping (`Φ(s')-Φ(s)`) is just the gradient that tells the agent which directions reduce resistance.

## Three Implementations, Three Regimes

The FINAL_CHAMPION archive preserves a natural experiment: three different physics-of-viscosity implementations on the same problem, with dramatically different outcomes.

### Implementation A: Linear Viscosity (0 wins)
```python
flux += energy * 0.5              # Work deepens groove
viscosity = 1.0 / (1.0 + flux)    # Rigorous physics model
ease = (1.0 - viscosity) * beta   # Direct mapping
```

**Why it failed:**
- `energy` at the bottom of the well is ~0.25, so `impact = 0.125`. Tiny signal.
- Linear decay (`flux *= (1 - decay)`) eroded grooves faster than they formed.
- No negative floor — agent drifted without aversion to stagnation.

### Implementation B: Naive Binary (76 wins)
```python
if energy > 0.1: flux += 0.5     # Strong positive step
elif energy < 0.05: flux -= 0.3  # Explicit avoidance floor
cap = [-5.0, 5.0]                 # Hard boundaries
```

**Why it won:** The "dumb" binary model provided a **stronger, cleaner signal**. Each high-energy step deposits +0.5 — a 4× larger increment than the linear model's average. The explicit avoidance floor creates clear anti-habits for stagnation states. Signal-to-noise ratio matters more than physical correctness.

### Implementation C: Log-Flux Champion (681 wins)
```python
impact = np.log(1 + energy * 100) * 0.5    # Log amplification
pain = np.log(1 + (0.05 - energy) * 50) * 0.5  # Log pain
ease = sigmoid(flux - threshold)            # Non-linear transition
```

**Why it dominates:** Combines the best of both worlds — logarithmic gain amplifies small energies to meaningful flux deposits (0.1 energy → ~2.4 impact vs. linear's 0.05), while the sigmoid ease creates a sharp transition from "vulnerable" to "flow state" at threshold=2.0. Negative flux builds avoidance habits, and asymmetric decay (-5.0 floor) prevents drift.

## The Signal Strength Principle

This three-way comparison establishes a general principle for Niodoo's steering architecture:

**Signal strength > physical correctness.** A simple model with strong gradients outperforms a rigorous model with weak ones — because learning systems need *discriminable* signals to form habits, not physically accurate ones.

The logarithmic flux achieves both: it's physically motivated (muscle memory is genuinely log-scale — small repetitions matter most early on) AND provides strong signal amplification where the naive binary model was just accidentally strong.

### Mapping to Niodoo Steering

| MountainCar | Niodoo Equivalent |
|---|---|
| `flux[s,a]` = groove depth | Hidden-state correction magnitude for a motif |
| `ease(sigmoid)` = flow state | Motif's confidence in its steering direction |
| `energy` = mechanical energy | Steering delta magnitude or correction success rate |
| TDA loop detection | TopoCoT reflex detecting motif stagnation |
| Beta decay (flux→Q handoff) | Instinct-to-logic transition in Bridge architecture |

The critical insight: **Niodoo's steering corrections should follow log-flux, not linear.** Currently, `CorrectionDelta` applies additive adjustments to hidden states. A log-flux model would amplify small but consistent corrections (building groove depth rapidly) while dampening large outliers (preventing overshoot). This maps to the observation that early learning benefits most from strong signals — the first successful steering of a motif matters more than the hundredth refinement.

## The Sigmoid Threshold as Mastery Gate

The `threshold = 2.0` in `ease = sigmoid(flux - threshold)` creates a phase transition: below it, flux changes produce gradual ease shifts; above it, the agent enters "flow" where actions become nearly automatic. This is Niodoo's **structural winner → semantic alignment** transition — when a motif has accumulated enough correction history that subsequent steering feels effortless rather than effortful.

Testable: measure `flux` (correction delta magnitude integrated over time) for each SC motif in the ghost candidate registry. Motifs crossing ease=0.5 should show dramatically reduced distance_deficit variance and higher first-success rates — confirming that log-flux with sigmoid ease is a valid mastery predictor.

## Five Testable Predictions

1. **Log-flux steering corrections:** Replacing Niodoo's current linear `CorrectionDelta` accumulation with logarithmic amplification (`log(1 + |δ| * scale)`) would accelerate early motif formation by 2-3×, measurable as faster convergence of `ghost_candidate_registry.json` entries from unstructured to structural-winner status.

2. **Sigmoid ease as gating function:** Using `ease = sigmoid(flux - threshold)` instead of linear flux weighting in action selection would produce a sharper phase transition between "exploring" and "flow" states, reducing wobble frequency by 30-40% once motifs cross the threshold — testable via steering delta variance before/after ease=0.5 crossing.

3. **Negative flux floor prevents ghost drift:** The -5.0 avoidance floor in log-flux (absent in linear viscosity) creates structured anti-habits that prevent motifs from drifting into high-resistance regions. Adding a negative flux cap to Niodoo's motif scoring would reduce false-positive ghost basin selections by preventing low-confidence motifs from accumulating spurious steering history.

4. **Asymmetric pain + momentum filter synergy at scale:** The 1.15× asymmetry in reward shaping (losing energy hurts more than gaining feels good) combined with the momentum filter's resonance detection creates a system that's simultaneously aggressive about escaping stagnation and tolerant of productive oscillation. This same combination should apply to Niodoo's TopoCoT reflex: motifs with rising correction magnitude should be allowed to resonate even when their topology looks "stuck."

5. **The well-addiction invariant:** At `pos=-0.5, vel≈0`, mechanical energy is 0.25 — above the flux-building threshold of 0.1. This means the agent gets rewarded for *existing* at the bottom of the well, creating an addiction to safety. In Niodoo's ghost basin, this maps to motifs that are structurally tight but semantically shallow — they feel "easy" (low resistance) without actually being useful. The curiosity injectors (attractor points at 0.45, 0.04) serve the same function as the void attractors: they provide the only positive signal strong enough to compete with well-addiction.

## Why This Matters

The Physics of Alignment document captures something profound: **alignment isn't about getting the reward function right — it's about making the desired behavior feel easy.** The linear viscosity model was physically correct but too weak to overcome noise. The binary model was physically wrong but strong enough to learn. The log-flux model is both physically motivated *and* strong enough to dominate.

For Niodoo, this means steering architecture should prioritize **signal discriminability** over physical rigor — especially in early learning phases where the system needs clear gradients to form initial grooves. Once motifs are established (high flux → high ease), the physics of alignment takes over and fine-tuning becomes a matter of viscosity management rather than signal discovery.

The zigzag pattern isn't just an emergent phenomenon — it's the observable signature of viscosity cycling: hot phases drop resistance (flux builds, ease rises), cold phases inject resistance (TDA spike, habits shattered), and convergence happens when the agent learns to oscillate within a narrower band of productive states.
