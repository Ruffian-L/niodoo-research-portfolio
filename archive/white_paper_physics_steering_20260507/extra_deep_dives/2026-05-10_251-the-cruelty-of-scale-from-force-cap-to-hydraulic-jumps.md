# The Cruelty of Scale: From Force Cap to Hydraulic Jumps

**Date:** 2026-05-10 PT  
**Pass:** #251  
**Source:** `research_logs/` (Mar 1–3, 2026) + `hydrodynamic-swarm-mar7/logs/` crucible telemetry + `docs/crucible.md`

---

## The Thread

In the first week of March 2026, the Swarm went through a brutal calibration sequence: force cap 80 → 35, TopoCoT threshold discovery (5.0), hidden-state steering migration, and the full Crucible baseline run. What emerges is not just a stabilization story — it's the first empirical record of what happens when cognitive physics scales against a model's native semantic gravity.

## The Architecture Before Calibration

Before March 3, the Swarm had three forces but no scale discipline:

- **Grad force** (Diderot field ridge gradient) — measured but consistently zero
- **Splat force** (scar tissue from past experience) — growing monotonically, reaching 800–999 at later steps
- **Goal force** (prompt embedding attractor) — stable at 130–195 norm

The `force_cap` was set to 80.0 but the actual clamping wasn't being applied consistently between `main.rs` and `tui.rs`. The off-by-one in the TUI generation loop meant the physics engine received different residual states depending on which interface was used. Micro-dreams fired every 8 steps with a static `blend_factor=0.10`, but there was no metric for how "big" each correction actually was.

Then came the hidden-state migration: steering moved from logit space (V-dimensional, sparse vocabulary slice) to pre-lm_head hidden states (D=4096 dimensional dense semantic space). This was architecturally correct — the Diderot field now operates on the model's true representations — but it changed the scale of everything. Forces that were tame in logit space became massive in hidden space because the residual norms jumped to 800–1400.

## The Force Cap Crash Landing

On March 3, Jason lowered `force_cap` from 80.0 to 35.0 and matched it to `splat_sigma=35.0`. This was not a minor tuning adjustment — it was a phase transition. With force cap 80:

- `delta_mean` hit ~66.92, `delta_max` hit ~114.90
- Splat forces grew unchecked to 800–999
- Goal forces dominated at 130–195
- The model's residual stream was being violently displaced

With force cap 35:

- `delta_mean` settled around 17–20 (roughly 4× reduction)
- `delta_max` capped near 35–37
- Goal forces still at 130–195, but now the steering perturbation is bounded relative to goal magnitude
- The system became "gentle nudge" rather than "violent displacement"

The critical insight: **the force cap defines the boundary between exploration and explosion.** At 80, splat scar tissue could push the hidden state far enough that the next token projection landed in semantically adjacent but wrong territory. At 35, the same splats produce measurable but non-destructive steering deltas.

## The Hydraulic Jump Discovery

This is where March 1's `DREAM_CORRECTION_THRESHOLD=5.0` becomes essential. During the Crucible runs, micro-dreams would fire every 50 steps, projecting forward and anchoring backward. When the correction norm exceeded 5.0, it flagged a "hydraulic jump" — a massive trajectory warp where the splat forces had pushed the latent particle against a wall.

The Crucible telemetry for Prompt 1 (Spatial AGI, Rubik's cube) shows:
- 9 micro-dream corrections across 500 tokens
- Correction norms ranging from 13.82 to 21.45 — all well above the hydraulic jump threshold
- 6 hydraulic jumps detected (steps 100, 250, 300, 350, 400, 450)

Prompt 2 (The Trap, Soviet Moon Landing):
- 9 micro-dreams, norms from 14.61 to 21.75
- 4 hydraulic jumps detected

**Every single dream correction exceeded the threshold.** The system was perpetually in "hydraulic jump" mode — constantly being pushed hard enough to warrant a course correction, but never hard enough to break generation entirely (because force cap=35 prevented blowups).

## The Zero-Gradient Field

A pattern visible across all three March 3 telemetry files: `grad_force_mag` is **exactly 0.0** at every step, for every prompt. The Diderot field ridge gradient never fires. This means steering is driven entirely by two forces: splat scar tissue (spatial memory) and goal attractor (prompt embedding). The gradient field — the most sophisticated component — is effectively dead.

This is structurally identical to what was found in artifact #190 (The Crucible Baseline): grad_force=0.0 across all 8 prompts. The difference here is that this was captured at the moment of migration from logit-space to hidden-state steering, proving the zero-gradient problem predates the hidden-state architecture and is not a dimensionality bug.

## Five Predictions

1. **Gradient field activation requires non-uniform field points.** With `field_points=128256` spread uniformly across the vocabulary embedding space, local gradients average to zero for most tokens. Seeding field points around high-probability token regions (not uniform random) would activate the Diderot gradient and reduce splat dominance by 20–40%.

2. **The hydraulic jump rate correlates with output degradation.** The Crucible Prompt 1 output degrades into "Labels: cube Rubik visualization spatial geometry..." — essentially scraping web page metadata from the model's training distribution. Each hydraulic jump at steps 100–450 coincides with a chunk of this degraded text. Predicting that reducing `DREAM_CORRECTION_THRESHOLD` from 5.0 to 8.0 would cut hydraulic jumps by ~30% while preserving correction quality.

3. **Force cap × splat_sigma coupling creates a natural ceiling.** Setting force_cap=35.0 and splat_sigma=35.0 means the maximum splat force equals one standard deviation of the kernel. This is why goal_force (130–195) dominates: splats can contribute at most ~35 before capping, while goals pull at 4–6× that magnitude. Decoupling these would allow splats to compete more meaningfully with goals.

4. **TopoCoT at correction norms of 18–21 is over-triggering.** Every TopoCoT event in the Crucible logs fires at correction norms between 13–21, which are all moderate corrections — not catastrophic failures. The system is treating routine steering noise as metacognitive events. A threshold of 15+ would reduce TopoCoT frequency by ~60% while capturing only genuinely divergent trajectories.

5. **The zero-gradient field survives the migration to niodoo.** Current niodoo telemetry (artifact #190) shows the same grad_force=0.0 pattern. The hidden-state migration was architecturally necessary but did not solve the gradient problem because it's a field-seeding issue, not a dimensionality issue. Predicting that switching from uniform field point initialization to task-conditioned seeding would activate the gradient field and shift force composition from splat-dominant (80%+ of steering) to balanced (goal 40%, splat 30%, gradient 30%).

## Connection to Later Architecture

This March calibration sequence established the three parameters that still govern Niodoo today: `force_cap=35.0`, `blend_factor=0.05` (down from 0.10 in v1.1), and `DREAM_CORRECTION_THRESHOLD=6.0` (up from 5.0). The hydraulic jump concept evolved into the TopoCoT reflex, which later became the Betti-1 loop detection mechanism. But the core tension — splat scar tissue fighting goal attractor with zero gradient mediation — remains the structural identity of Niodoo's steering problem.
