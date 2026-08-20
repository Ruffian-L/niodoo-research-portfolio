# The Traversable Stability Zone — From MountainCar Golden Config to Niodoo's Model Scaling Profile

**Date:** 2026-05-06  
**Source:** `scattered_research/research (3)/COMBINED_Grok-Niodoo-Physics-niodoomashedgit_txt.txt` (Algo_WIP.txt, 430 lines) + `team_build/niodoo/src/main.rs` ModelArchetype + ModelScalingProfile (lines 6415–6620)  
**Artifact #:** #301

## The Original Algorithm

The Algo_WIP.txt document captures a complete physics-steering parameterization derived from MountainCar experiments. Its core insight is simple but powerful: **force magnitude must scale inversely with model density**. Smaller models have fewer parameters to absorb steering force, so they destabilize faster.

The scaling law: `Steering_Force ∝ sqrt(params / 3B)` where 3B (Llama-3.2-3B) is the experimentally validated "golden reference point."

Four model types were identified with distinct multipliers:
- **Standard** (1.0×): Sleepwalking base models — high semantic viscosity, need strong kicks to escape rote associations
- **Thinking** (0.4×): CoT/Reasoning models — house-of-card fragility; tightrope-walking scaffolding shatters under standard noise  
- **Coding** (0.27×): Code completion — syntax walls are infinite distance; even small jiggle jumps the particle out of valid syntax manifold
- **Instruct** (0.9×) / **Chat** (1.1×): RLHF-tamed models with artificial gravity wells

The algorithm defines hard bounds creating a "traversable stability zone": σ ∈ [0.04, 0.20], θ ∈ [0.5, 3.0], β ∈ [40.0, 150.0]. Below σ=0.04 is "Buridan's Ass" (frozen determinism); above σ=0.20 is "Fason Singularity" (chaos).

## What Niodoo Inherited

Niodoo's `calculate_model_scaling_profile()` function at main.rs:6532 preserves the exact sqrt(params/8B) scaling law but with significant evolution:

1. **Anchor shifted from 3B → 8B.** The golden config now targets Qwen3-8B instruct as the reference point (GOLDEN_PARAMS=8.0 vs Algo_WIP's 3.0). This makes sense — niodoo runs on Qwen3.6-35B, and 8B is closer to the actual deployment range than 3B.

2. **Type multipliers compressed.** Algo_WIP had thinking at 0.4× and coding at 0.27× (a 1.5× gap). Niodoo's auto-resolved archetypes use Thinking=0.88×, Coding=0.82×, Chat=1.04× — a much narrower range. The distinction between model types exists but is subtler.

3. **Ten scaled parameters vs four.** Algo_WIP defined σ, θ, β, and loop_repulsion. Niodoo adds temperature, motif_force_scale, recovery_force_scale, guardrail_bias_scale, and focus_lock_ticks — all derived from the same scaling law but applied to different subsystems.

4. **Bounds widened asymmetrically.** Sigma's upper bound went from 0.20 → 0.42 (2× wider), theta's max from 3.0 → 1.8 (actually tighter), beta's range shifted from [40,150] → [70,220]. The asymmetric widening suggests niodoo learned that larger models can tolerate more noise in some dimensions while needing finer control in others.

5. **Auto-archetype resolution.** Niodoo infers model type from filename patterns (coder/code → Coding, think/reason/o1 → Thinking, instruct → Instruct, chat → Chat, else Standard) — the Algo_WIP required manual specification.

## The Missing Connection: Why Type Multipliers Collapsed

The most interesting divergence is between Algo_WIP's aggressive type differentiation (thinking=0.4× vs coding=0.27×) and niodoo's compressed range (thinking=0.88× vs coding=0.82×). Two hypotheses:

**Hypothesis A — The 35B effect.** At Qwen3.6-35B, model density is so high that type differences matter less. The sqrt(35/8)=2.09 scale factor dominates over any multiplier. When you're scaling by 2× already, the difference between 0.4× and 0.88× becomes a second-order effect.

**Hypothesis B — Hidden-state vs logit steering.** Algo_WIP was derived from MountainCar experiments with logit-space steering (where thinking models are fragile). Niodoo moved to hidden-state steering (Phase 2.1, artifact #281), which operates at a different abstraction layer where model type matters less than dimensionality and force_cap.

## Five Predictions

1. **Reverting thinking multiplier to ≤0.6× would improve CoT task retention by 15-25%.** Current 0.88× is too aggressive for reasoning models — the house-of-card effect still exists at 35B, just less visible.

2. **The guardrail_bias_scale (sqrt force scaling) is the only parameter that correctly captures model-type asymmetry.** It uses `force_scale.sqrt()` rather than linear scaling, meaning it grows slower than other parameters — a built-in dampening that may explain why type multipliers can be compressed.

3. **Focus lock ticks (12-72 range, scaled by force_scale) will show the strongest correlation with TopoCoT cadence.** Longer focus locks on larger models should reduce unnecessary correction triggers, directly addressing the "every 8 steps rigidly" pattern from artifact #190.

4. **A dual-anchor scaling law (3B for small models, 8B for medium, 35B+ as flat region) would outperform single sqrt scaling.** The Algo_WIP data shows Llama-70B hitting the ceiling at σ=0.20/θ=3.0 — suggesting the sqrt curve flattens beyond ~40B.

5. **Coding archetype multiplier should be lower (0.6-0.7×) for Qwen-Coder variants.** The current 0.82× was derived from MountainCar's syntax landscape, but code generation has different constraint topology — missing semicolons are recoverable via retry, while wrong physics parameters cause immediate collapse.

## Structural Insight

The Algo_WIP.txt document is not just an experiment log — it's the genetic code for niodoo's entire model-scaling system. Every parameter in `ModelScalingProfile` traces back to one of the four original knobs (σ, θ, β, repulsion). The expansion from 4 to 10 parameters represents niodoo's architecture growing richer while keeping the same scaling DNA.

The compressed type multipliers tell a story: as Niodoo moved from MountainCar simulations to real LLM inference, the distinction between model types became less about "how hard to push" and more about "which subsystems need dampening." The physics survived; the taxonomy evolved.
