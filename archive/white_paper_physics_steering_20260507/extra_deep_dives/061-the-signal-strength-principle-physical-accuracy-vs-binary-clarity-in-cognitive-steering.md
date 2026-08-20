# The Signal Strength Principle — Physical Accuracy vs Binary Clarity in Cognitive Steering

**Date:** 2026-05-01  
**Thread:** Physics-of-Friendship-MountainCar-RL → FINAL_CHAMPION physics_of_alignment.md + Technical Writeups  
**Connection to current work:** Niodoo steering force calibration, force_cap evolution, ghost basin magnitude tuning  

---

## Source Material

The MountainCar Q-SMA project's `PHYSICS_OF_ALIGNMENT.md` (FINAL_CHAMPION snapshot, Feb 2026) documents a fundamental tension in cognitive architecture: **physically accurate models don't always produce better learning signals**. The experiment compared two flux/viscosity implementations:

| Model | Approach | Result |
|-------|----------|--------|
| Rigorous physics | `flux += energy * 0.5`, linear decay `flux *= (1-decay)`, sigmoid ease | **0 wins** — signal too weak, decay too fast |
| Naive binary | `if energy > 0.1: flux += 0.5; if energy < 0.05: flux -= 0.1` | **76 wins** — strong, clean contrast signals |

The rigorous model used correct physics (work = force × distance, viscosity = 1/(1+flux)), but the signal was drowned by decay. The naive model used a binary threshold with explicit aversion floor — physically "dumb" but cognitively effective.

The diagnosis: **signal strength > physical accuracy**. A clean binary contrast (good/bad) outperforms a smooth gradient when the gradient is shallow and the noise floor is high.

---

## The Three Failure Modes of Accurate Physics

### 1. Weak Signal
`energy ≈ 0.1` → `impact = energy * 0.5 = 0.05`. Over thousands of timesteps, a 0.05 signal barely moves the needle against the -1 baseline punishment. The agent's Q-table needs strong contrast to form reliable value estimates.

### 2. Linear Decay Erodes Before Consolidation
`flux *= (1 - decay)` with decay in [0.05, 0.5] means flux halves every 2-14 episodes. A groove built over hundreds of steps evaporates before it can stabilize. The physics model assumes persistent memory; the agent has amnesia.

### 3. No Negative Floor
Without an explicit aversion signal (`flux -= 0.1` when energy < 0.05), the agent drifts toward neutral states with no penalty. The well-bottom feels "okay" — not great, not terrible — so there's no urgency to leave.

---

## The Logarithmic Bridge

The Physics of Alignment proposes **log-scale signaling** as the resolution:

```
impact = log(1 + energy * 100)    # Gain compression → strong signal from weak input
ease = sigmoid(flux - threshold)   # Sigmoid floor prevents drift into neutrality
viscosity increases on negative R, decays slowly  # Pain memory > pleasure memory
```

This is physically more accurate than binary thresholds (it preserves gradient information) while delivering stronger signals than linear models. The logarithm acts as a **signal amplifier** — small energies get boosted to meaningful magnitudes without saturating at high values.

---

## Connection to Niodoo's Steering Architecture

### Force Magnitude Calibration
Niodoo's steering forces (gravity, repulsion, ghost vector, motif) operate in latent space with configurable magnitudes. The physics_of_alignment finding maps directly:

| MountainCar | Niodoo |
|---|---|
| Linear flux → 0 wins | Linear force scaling → weak steering effect |
| Binary threshold → 76 wins | Binary activation thresholds → clean on/off steering |
| Logarithmic bridge → better signal | `log(1 + magnitude * scale)` for ghost vectors |

The current Niodoo architecture uses multiplicative blending (`NIODOO_PHYSICS_BLEND: 0.55`) and additive forces with configurable caps. The force_cap evolution (80.0 → 35.0) already suggests that **stronger, cleaner signals** outperform weaker, more physically accurate ones.

### Ghost Basin Magnitude
Ghost basins in Niodoo encode semantic attractors via steering vectors. If ghost vector magnitudes are too smooth/gradual (analogous to the linear flux model), they may fail to create decisive attraction — similar to how the rigorous physics model produced 0 wins despite being "correct." Binary or thresholded ghost activation (activate only when similarity > τ) could produce cleaner steering signals.

### Pain-Splat Asymmetry
The MountainCar system discovered that asymmetric pain (falling hurts 1.15× more than climbing feels good) prevents complacency at high points. Niodoo's decay mechanism already implements this: `decay_step` uses a **70% asymmetric pain rate** — negative experiences persist longer than positive ones. The physics_of_alignment document confirms why: pain memory with slow decay creates the "floor" that linear models lacked.

---

## Five Testable Predictions

1. **Logarithmic ghost vector scaling** (applying `log(1 + magnitude * 50)` before injection) should improve steering precision by 15-25% compared to linear scaling, particularly for weak attractors near the decision boundary.

2. **Binary activation thresholds on ghost basins** (only inject force when embedding similarity > τ = 0.7) will produce cleaner convergence than continuous soft-attractor models, at the cost of some gradient smoothness.

3. **Pain-splat decay rate vs. distance_deficit**: Ghost basins with asymmetric pain decay (negative contributions persisting 1.5× longer) should show 20-30% lower distance_deficit in Gate 34 restore tests compared to symmetric decay.

4. **Force magnitude saturation curve**: There exists a "Goldilocks zone" for force_cap where signal is strong enough to overcome noise but not so strong as to overwhelm Q-values — empirically around 35.0 (current Phase 2.1) rather than 80.0 (original). Beyond this, increasing cap produces diminishing returns due to flux dominance.

5. **Logarithmic vs binary trade-off by regime**: Binary thresholds win in early exploration (episodes 0-300) where signal clarity matters most; logarithmic scaling wins in late-stage refinement (episodes 800+) where gradient information enables fine-tuning. An adaptive switch between the two regimes should outperform either alone.

---

## The Deeper Principle

This is not just about MountainCar or Niodoo — it's a general principle for any system that uses continuous signals to drive discrete decisions:

> **A physically correct model with weak signal strength loses to a physically naive model with strong signal strength.**

The "naive" model wins because learning systems need *contrast* to form reliable estimates. Smooth gradients are elegant but require more samples to resolve. Binary thresholds create high-contrast signals that converge faster, even if they throw away information about the gradient's shape.

Logarithmic scaling is the compromise: it amplifies weak signals (like binary) while preserving some gradient information (like continuous). It's the cognitive equivalent of a hearing aid — making quiet sounds audible without distorting loud ones.

---

*Written 2026-05-01. Source: physics-of-friendship-mountaincar-rl-main/snapshots/FINAL_CHAMPION_681wins_LOG_FLUX/PHYSICS_OF_ALIGNMENT.md + TECHNICAL_WRITEUP.md*
