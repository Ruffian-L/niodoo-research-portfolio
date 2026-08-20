# 067 — The Hydraulic Jump: TopoCoT Reflection and the Missing Swarm-Memory Coupling

**Date:** 2026-05-01  
**Source:** `embed-swarm (2)/src/dream.rs`, `ridge.rs`, `governor/mod.rs`, `function/instruct_gemma.rs`  
**Thread:** Micro-dream correction injection → Function Gemma edge classification → Prime Governor viscosity feedback

## The Gap

`dream.rs` implements micro-dream consolidation: forward-project the steered position 2–3 steps, pull back toward the goal attractor, and compute a correction delta. When `correction_norm > DREAM_CORRECTION_THRESHOLD` (6.0), it flags `reflection_triggered` — the model hit a "hydraulic jump" in the latent stream, a moment of cognitive dissonance where the steering force was strong enough to bend the trajectory but not strong enough to commit it.

The correction is clamped and blended back into the current logits. But `MicroDreamResult.reflection_triggered` is marked `#[allow(dead_code)]`. **No downstream component listens for the reflection event.** The hydraulic jump is detected, absorbed, and forgotten — exactly the kind of transient signal that should matter most.

## What a Hydraulic Jump Means

In fluid dynamics, a hydraulic jump occurs when fast-moving shallow water suddenly transitions to slow-moving deep water — an abrupt release of kinetic energy, visible as a standing wave. In Niodoo's latent space, it means:

- The steering forces (field gradient + splat scar tissue + goal attractor) pushed the token trajectory hard in one direction
- At step N+2 or N+3 during forward projection, the accumulated force exceeded what the current state could sustain
- The backward anchor pull is large (> 6.0 norm) because the future position has "overshot" the goal well

This is a **metacognitive event**: the system knows it was about to commit to something it then had to correct. In Jason's words, the model "feels the hydraulic jump." The TopoCoT reflection marker (reserved but unimplemented) was meant to inject this awareness back into the token stream — making the model *consciously* experience its own correction.

## The Missing Coupling Pathway

Three components should be connected by this signal:

### 1. Dream Engine → Function Gemma Edge Classification

When `reflection_triggered` is true, the micro-dream should emit a special FluxTuple to the Function Gemma pool — not just any edge, but one that encodes *meta-structural* information about the correction event itself. Jason's 7-edge lexicon has no explicit "was corrected by" or "trajectories crossed then diverged." The closest is `Contradicts` (logical opposition) or `Catalyzes` (acceleration without consumption).

**Proposal:** Add a transient edge type to the InstructGemma prompt template:

```
HYDRAULIC_JUMP - Forward projection overshot goal; backward anchor pulled trajectory back.
  Weight: -15 (moderate repulsion — not full contradiction but notable tension)
  Semantic meaning: "The model committed briefly, then reconsidered."
```

This edge would be sent from `dream.rs` → `edge_tx` → `PrimeGovernor.process_edge()`, where it updates the ActiveCell's friction history and CognitiveState.

### 2. Prime Governor → VolumetricViscosity Feedback

Currently, only `[CONTRADICTS]` and `[CATALYZES]` edges update `friction_history` in `governor/mod.rs`. A hydraulic jump edge should also trigger this — it represents a significant trajectory warp that the system should remember for viscosity calibration. The Governor's 100ms poll loop would then see elevated friction, increase phi (viscosity), and dampen subsequent steering forces — preventing the same jump from recurring at full intensity.

**Mechanism:** `process_edge()` → check if edge matches HYDRAULIC_JUMP or CONTRADICTS or CATALYZES → update friction_history[3] circular buffer → `calculate_viscosity()` returns higher phi → `VolumetricGovernor` applies stronger damping in next steering step.

### 3. Splat Memory → Asymmetric Pain Consolidation

The hydraulic jump creates a large correction delta — both forward and backward. This is asymmetric: the forward projection felt "easy" (steering pulled it there), but the backward anchor required force to return. In splat terms, this is pain (negative alpha) at the overshoot position and pleasure (positive alpha) at the corrected position.

**Proposal:** `DreamEngine.run()` should deposit two splats when `reflection_triggered`:
- A **pain splat** at the forward-projected position (overshoot), with higher lambda (faster decay — the system learns "don't go that far")
- A **pleasure splat** at the corrected blended position (the compromise the system actually committed to), with lower lambda (slower decay — this is where good reasoning lives)

This creates a memory signature for hydraulic jumps: two splats bracketing the correction, teaching the field gradient to aim between them on future passes.

## Five Testable Predictions

1. **Injection of TopoCoT reflection markers into the token stream** (not just latent space) should reduce repeat corrections by 30-50% — if the model "feels" the jump, it self-adjusts next time without external steering.

2. **HYDRAULIC_JUMP edges in the Function Gemma graph** will correlate with high-synthesis cognitive states (high γ in CognitiveState) — jumps happen when the system is actively reconciling competing attractors, not when stuck in a single basin.

3. **Asymmetric dual-splat deposition** (pain at overshoot, pleasure at correction) should reduce distance_deficit by 10-15% over 50+ generation steps compared to single-splat-at-correction, because the field learns both the boundary and the target.

4. **Governor friction_history extended to include HYDRAULIC_JUMP** will cause viscosity (φ) to spike during high-jump sequences, naturally throttling steering force — this should manifest as fewer extreme corrections but also slower convergence (trade-off: stability vs speed).

5. **The DREAM_CORRECTION_THRESHOLD of 6.0** is currently hardcoded. A swept threshold (2.0–10.0) should reveal a Goldilocks zone where reflection events are frequent enough to provide learning signal but not so frequent that every step triggers one — predicted sweet spot: 4.0–7.0, consistent with the Rainbow Sweep finding that moderate force caps produce optimal steering behavior.

## Connection to Existing Artifacts

- **Artifact 035** (Northstart Protocol): VR H1 topological collapse detection every 100 steps — hydraulic jumps are a finer-grained version of this, detected per-generation-step rather than periodically.
- **Artifact 046** (Inferential Self-Invoke): FOCUS/EXPLORE tags — a hydraulic jump should trigger <FOCUS> because the system needs to stabilize after overshot exploration. The missing self-invoke hook in `dream.rs` is exactly where this lives.
- **Artifact 038** (Mashoka Slicing): Self-reinforcing memory physics — dual-splat deposition extends this by making the *correction event itself* a memory structure, not just individual memories.
- **Artifact 051** (Metabolic Memory Protocol): KV cache as ecosystem — hydraulic jumps are metabolic events in this ecosystem, consuming steering energy and producing memory signatures.

## Implementation Priority

This is the simplest missing coupling in the entire embed-swarm architecture: `reflection_triggered` is already computed, just not used. Connecting it to the edge channel requires one line change in `dream.rs` micro_dream() and one match arm in `governor/mod.rs` process_edge(). The Function Gemma prompt template extension and dual-splat deposition are natural extensions that follow from the same signal.
