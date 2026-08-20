# 091 — The Ridge Runner: Proof of Physics and the Ontological Inversion Gate

**Date:** 2026-05-01  
**Source:** `embed-swarm/embed-swarm (2)/src/ridge.rs` + `splat.rs` + `memory.rs` + `niodoo.rs`

## The Thread

Jason's RidgeRunner is a query particle that slides down the continuous Diderot field, steered by splat scar tissue and goal attractors, until it settles on a stable ridge. It runs *before* any LLM is touched — pure physics proving the steering field works in isolation.

The key insight: **RidgeRunner is an ontological gate**. It separates "does the physics work?" from "does the LLM respond?" If the particle doesn't settle on a meaningful ridge, injecting it into the residual stream is pointless. The RidgeRunner is the system's way of asking: *is there actually a landscape here?*

## Three Forces, One Particle

The RidgeRunner integrates three forces via Euler stepping:

1. **Field gradient** (`grad_force`) — ridge-running force from the Diderot field's density landscape
2. **Splat scar tissue** (`splat_force`) — pull/push from accumulated experience (memory.rs `query_force()`)
3. **Goal attractor** (`goal_force`) — linear pull toward prompt embedding

```
a = F/m,  v += a·dt,  x += v·dt
v *= damping (0.95)   // prevents runaway
stop when |v| < settle_threshold
```

The `damping` parameter is critical: without it, the particle oscillates forever (Drift Regime in Kuramoto terms). With it, the particle converges to a fixed point — a *stable attractor* in embedding space. This maps directly to Niodoo's renormalization: cumulative steering drifts hidden state norm, and renormalization keeps it on-manifold. RidgeRunner does the same thing for particles.

## The VR H1 Reflex: Topological Self-Check

Buried in `ridge.rs` is `check_vr_h1_reflex()` — a Vietoris-Rips homology check that scans recent positions for zero-persistence H1 cycles. For a triple of points with sorted edge lengths d₀ ≤ d₁ ≤ d₂, an H1 cycle is born at radius d₁ and killed at d₂. If d₂/d₁ < threshold (e.g., 1.05), the cycle has near-zero persistence — the particle found itself in a triangle where all three edges are nearly equal. It's *trapped*.

This is the system's way of detecting **ontological inversion**: when the steering field flips from "pulls toward meaning" to "pulls toward noise." A zero-persistence H1 means the landscape has become locally homogeneous — every direction is equally good (or bad). The reflex fires, and the particle knows it needs to explore elsewhere.

Connection to Niodoo's ghost basin: when all basins have similar density, ridge-running finds no preference → ontological inversion. The VR H1 reflex is the early-warning system for this collapse.

## Splat Memory as Scar Tissue

The RidgeRunner doesn't just ride the static Diderot field — it's pulled by `splat_force`, which comes from `SplatMemory::query_force()`. Each splat carries:
- **μ** (position), **σ** (covariance), **α** (signed opacity: +pleasure, −pain)
- **λ** (decay rate), **flux** (resonance energy), **friction** (dimensional erosion)

The force equation: `F = α · (μ − x) · exp(−‖μ − x‖²/σ²)`

Positive α attracts (pleasure scars pull the particle toward good past states). Negative α repels (pain scars push it away from bad ones). The asymmetric decay (pain decays at 70% of pleasure rate) means **past mistakes linger longer than past successes** — a biological parallel to negativity bias.

The RidgeRunner's settled position is thus a weighted compromise between:
- The static Diderot field (prior knowledge / training distribution)
- Splat scars (recent steering experience)
- Goal attractor (current prompt intent)

## Connection to Niodoo's Steering Engine

`niodoo.rs`'s `NiodooEngine::steer()` runs the *same three-force model* but on LLM residual streams instead of particles:

| RidgeRunner (particle) | NiodooEngine (residual stream) |
|---|---|
| QueryParticle.pos | baseline_residual (1, D) |
| Field gradient | `field_gradient()` → ridge-running |
| Splat scar force | `splat_force()` → accumulated memory |
| Goal attractor | `goal_pos` → prompt embedding |
| Damping (0.95) | Force cap + renormalization |
| VR H1 reflex check | TopoCoT reflection trigger (threshold 6.0) |
| Settle on ridge | Converge to semantic attractor |

The RidgeRunner is essentially **NiodooEngine in miniature** — same physics, simpler substrate. Jason designed it as a testbed: prove the steering field works on particles before applying it to the expensive LLM residual stream.

## Five Testable Predictions

1. **RidgeRunner settling correlates with LLM steering quality**: Particles that settle on high-density ridges (final_density > 0.7) should produce steer outputs with lower distance_deficit than particles that don't settle or settle on low-density regions. This would validate the "proof of physics" hypothesis.

2. **VR H1 reflex predicts wobble**: When `check_vr_h1_reflex()` fires during ridge running, the corresponding LLM steering step should show higher bimodality (wobble) in token distribution — the particle found itself in a flat triangle, and the residual stream is similarly ambiguous.

3. **Damping threshold creates phase transition**: There should be a critical damping value (~0.85-0.92) below which particles oscillate indefinitely (Drift Regime) and above which they converge (Phase-Locked). This maps to Niodoo's force_cap evolution (80→35) — both are stability knobs.

4. **Pain-splat dominance in early convergence**: Because pain decays at 70% of pleasure rate, newly-created sessions should show RidgeRunner trajectories biased toward repulsion from recent failures before attraction to past successes. This predicts a U-shaped density profile in the first 100 steps.

5. **Bundle force improves ridge stability**: Replacing `query_force()` (all splats) with `query_bundle_force(k=8)` (K-nearest) should produce smoother particle trajectories with fewer VR H1 reflexes — local bundling reduces noise from distant, irrelevant splats that create spurious force vectors.

## Open Questions

- Does RidgeRunner's settling time predict LLM token budget? A particle that takes 200+ steps to settle might indicate a complex steering landscape requiring more tokens for the LLM to navigate.
- Could the VR H1 reflex replace or augment the TopoCoT reflection trigger (threshold 6.0)? Both detect "the system hit something" — one topologically, one by correction norm.
- How does `flux` and `friction` from LivingCell integrate into RidgeRunner? Currently they're set to defaults (flux=0.5, friction=0.0) but never used in the force calculation.
