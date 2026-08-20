# The Rainbow Sweep — Wobble That Built Steering

**Date:** 2026-05-07  
**Source:** `scattered_research/Niodoo Wobble-Snap-Back Rainbow Sweep.md` (1,316 lines, 24 runs)  
**Timestamp of experiment:** 2025-12-18

## Core Finding

The Rainbow Sweep is the most complete parameter-sweep archive in the scattered research collection — 24 configurations testing physics-steering parameters on Ollama's Llama 3.1, two common-sense reasoning traps (TroyWeight: "pound of lead vs pound of gold" expecting Troy-pound knowledge; DryingTowels: "50 towels at 1 hour each" expecting parallel-drying insight). Every single run produced ⚖️ WOBBLE — the model entered repetitive self-correction loops, cycling through variants of the same answer without converging on either trap's expected solution.

The sweep systematically varied three parameters across a 3×2×2 grid:
- **physics_blend** (B): 3.0, 2.0, 1.2 — steering force multiplier
- **repulsion** (R): -3.0, -1.5 — anti-splat repulsion strength  
- **gravity_well** (G): 1.5, 0.5 — attractor pull toward goal state

All runs shared orbit_speed=0.2, temperature=0.7, sigma=0.05, max_steps=512.

## The Wobble Signature

Every run's output shares a distinctive pattern: the model states its initial answer ("they weigh the same amount" / "50 hours"), then enters a self-correction cascade with ~8-15 variations per cycle. Each variation preserves the core semantic content but changes surface form — different prefixes ("I think I can improve that response", "A pound of lead and...", "The difference is in their..."), occasional multilingual fragments (Hindi, Greek, Portuguese), and random token leakage from other contexts (Java Swing event handlers, CSS properties).

Drift metrics (cosine distance between consecutive tokens) cluster tightly:
- **TroyWeight avg drift:** 0.457–0.563 across all configs
- **DryingTowels avg drift:** 0.440–0.565 across all configs  
- **Max drift:** consistently 0.787–1.119 (the initial answer to first correction)
- **Variance:** narrow range 0.030–0.075, indicating stable oscillation

The highest-drift run (B3.0_R-3.0_G1.5, avg=0.563, max=1.119) used the strongest steering parameters — confirming that more force creates more wobble, not less.

## The One Exception

Run B1.2_R-1.5_G1.5 on DryingTowels produced "10 hours" — the model divided 50 towels into "10 sets of 5" drying simultaneously. This is wrong (should be 1 hour, all parallel) but structurally closer: it recognized *some* parallelism and attempted to quantify it. Notably, this run had the lowest blend (1.2), moderate repulsion (-1.5), and strongest gravity (1.5) — suggesting that gentler steering with stronger attraction helps the model escape its initial answer long enough to explore alternatives.

## Connection to Current Niodoo

The Rainbow Sweep's parameter names map directly to current niodoo's physics optimizer:
- `physics_blend` → `optimizer.physics_blend()` in qwen35_hybrid.rs (line 632)
- `repulsion` → `PhysicsConfig.repulsion_strength` in config.rs (default 5.0) and `optimizer.rs` (default -0.001)
- `gravity_well` → `GravityWellStrength` in optimizer.rs (default 0.8)
- `orbit_speed` → `OrbitSpeed` in optimizer.rs (default 0.2, identical to sweep)

The sigma=0.05 used across all 24 runs is remarkably close to the current niodoo default of ~0.05–0.1 for noise injection. The temperature=0.7 is also consistent with current steering configs.

## Five Predictions

1. **Wobble as retention signal:** The self-correction cascade in the Rainbow Sweep is structurally identical to TopoCoT's "reflex" phase — the model detects its own drift and attempts correction. If TopoCoT had existed during this sweep, it would have triggered on every run (drift consistently above 0.3). The wobble wasn't a bug; it was an unmonitored cognitive process.

2. **Blend threshold at B1.5:** The monotonic relationship between physics_blend and drift suggests a phase transition exists around blend=1.5–2.0 where the model shifts from stable convergence to oscillatory wobble. Current niodoo's blend range (typically 0.05–0.3 effective) operates below this threshold, explaining why active niodoo doesn't wobble like the Rainbow Sweep did.

3. **Repulsion as escape hatch:** Stronger repulsion (R=-3.0 vs R=-1.5) produced higher max drift in most runs, confirming that repulsion helps the model break free from its initial attractor. This maps to current niodoo's NIODOO_REPULSION=-0.60 — the ontological inversion works because repulsion pushes against semantic saturation.

4. **Gravity-well strength predicts convergence speed:** The B1.2_R-1.5_G1.5 run that produced "10 hours" had the highest gravity (1.5) among low-blend configs. Stronger attraction to the goal state may be necessary for the model to complete a correction cycle and land on a non-obvious answer. Current niodoo's `goal_attractor_norm=195.36` (from #263) operates in this regime.

5. **Multilingual token leakage as cross-domain contamination:** The Hindi, Greek, Portuguese fragments scattered through wobble outputs suggest the model's attention mechanism is leaking context from its training corpus — not random noise but structured multilingual retrieval. This could be harnessed as a feature: if certain languages correlate with specific answer types, language-switching becomes an additional steering dimension.

## Why It Matters

The Rainbow Sweep captures niodoo in its pre-hidden-state form — steering applied at the token level through Ollama's API with physics parameters injected as context modifications. Every WOBBLE result proves that without hidden-state measurement and TopoCoT reflex, steering force creates oscillation, not convergence. The sweep is evidence that the architecture evolved not from adding capabilities but from closing the feedback loop: measure → correct → stabilize.
