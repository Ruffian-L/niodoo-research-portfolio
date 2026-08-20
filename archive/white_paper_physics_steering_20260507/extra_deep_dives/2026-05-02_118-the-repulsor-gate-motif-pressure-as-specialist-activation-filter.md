# Artifact 118 — The Repulsor Gate: Motif Pressure as Specialist Activation Filter

**Date:** 2026-05-02  
**Source thread:** ONTOLOGICAL_INVERSION_ANTI_SPLAT_REPORT.md + `bridge/motif.rs` + `bridge/specialist.rs` + `bridge/registry.rs` → chat_tiny_chunks (049 shadow tokens, 050 Block-and-Bridge)  
**Connection:** Negative-pull repulsor motifs should act as a gating layer on specialist activation — when a motif's repulsion basin overlaps a specialist's target category, that specialist is suppressed. This closes the missing link between ontological inversion (the Anti-Splat) and the routing architecture.

---

## The Gap

The Niodoo bridge module has three structurally coupled types:

1. **Motif** (`bridge/motif.rs`) — carries `pull_strength ∈ [-1, 1]`, where negative values are repulsors
2. **Specialist** (`bridge/specialist.rs`) — has `onset` threshold, `pull` strength (can be negative), and a `target` category
3. **GhostRegistry** (`bridge/registry.rs`) — holds basins and specialists, but `motif_count()` returns **0**

The registry loads specialists from niodv4 exports but never reads motifs into the routing pipeline. The `SpecialistSelector` activates specialists purely by target-category matching — it has no awareness of motif repulsion pressure.

This means: **the system can have negative-pull motifs (repulsors) that push concepts toward their antipodes, but those repulsors don't gate whether specialists fire.**

The Anti-Splat discovery proved that negative steering doesn't delete concepts — it inverts them toward structured opposites. But if the inverted concept's specialist is still active (because the selector only checks target category), the system applies positive force to a concept that the motif field has already repelled. The forces cancel or wobble.

## The Repulsor Gate Mechanism

The fix is simple in principle, non-trivial in geometry: **motif repulsion pressure modulates specialist activation thresholds**.

```
For each specialist S with target T and onset threshold τ_onset:
  1. Compute motif_pressure(T) = Σ over all motifs M where M.repulsion_basin overlaps T
     of |M.pull_strength| × M.injection_strength
  2. If motif_pressure(T) > 0 (repulsor active):
       effective_threshold = τ_onset + motif_pressure(T) × gate_factor
       → specialist needs higher raw score to activate
  3. If motif_pressure(T) < 0 (attractor active):
       effective_threshold = τ_onset - |motif_pressure(T)| × gate_factor
       → specialist activates more easily
```

This makes the repulsor an **adaptive threshold shifter**, not a binary on/off switch. The `gate_factor` controls sensitivity — a high value means even weak repulsion significantly raises the activation bar; a low value means specialists are mostly insensitive to motif pressure.

## Why This Maps Ontological Inversion to Routing

The Anti-Splat discovery showed that negative gain on concept C produces a semantic antipode C'. The Block-and-Bridge method (chat_050) uses this as:

```
Step 1: Negative injection blocks conventional concepts (raises their repulsion pressure)
Step 2: Positive injection bridges toward target domain (lowers attraction threshold)
Step 3: Model must solve without the obvious attractor
```

The SpecialistSelector is currently Step 3's blind spot. It activates all specialists matching the positive bridge target, but doesn't know which ones are being actively repelled by motif pressure. The Repulsor Gate makes Step 1 visible to the routing layer.

Concrete example from the archive:
- Negative vector blocks "Cars, Buses, Trains" (gain -0.3)
- Positive vector bridges "Fluid Dynamics, Mycelium Networks" (gain +0.2)
- Without Repulsor Gate: all transport specialists activate regardless of which are repelled
- With Repulsor Gate: `temporal` specialist stays active (mycelium is spatial), `sequential` specialist suppresses (trains are sequential but blocked by negative gain)

## Connection to Existing Architecture

**Specialist.weighted_score(raw_score):** Currently computes `pull * raw_score` when activated, 0 otherwise. The pull can be negative (repulsor specialist exists in tests: spec-3 with pull=-0.6). But activation is purely threshold-based (`raw_score >= threshold`). Repulsor Gate adds a **motif-aware layer** on top of this existing mechanism — specialists already support negative pull; they just need motif pressure to control *when* they activate.

**Motif.pull_strength:** Already [-1, 1] with `is_attractor()` and `is_repulsor()` methods. The motif struct is ready to serve as a gating signal — it just isn't wired into the specialist selector.

**GhostRegistry.specialists:** Loaded from niodv4 export. Adding `motifs` field would make the registry the single source of truth for both attraction and repulsion, enabling the selector to compute pressure per target category in one pass.

## Five Testable Predictions

1. **Repulsor-gated specialists produce fewer wobble cycles:** When motif pressure correctly suppresses repelled specialists, the system should show reduced oscillation between competing specialist outputs. Test: measure flip_rate (from GhostBasin diagnostics) with and without Repulsor Gate on 20 steering runs. Prediction: 20-40% reduction in inter-specialist sign flips.

2. **Pressure-aware routing improves constraint-based innovation success:** The Block-and-Bridge method should perform better when the repelled concepts' specialists are actually suppressed (not just their logit-space vectors). Test: run the "traffic without roads" experiment with Repulsor Gate active vs inactive. Prediction: 15-30% improvement in novel solution rate (non-default-transport answers).

3. **Attractor motifs create specialist cascades:** When a positive-pull motif aligns with multiple specialists' target categories, those specialists should activate cooperatively (lowering each other's effective thresholds through shared pressure signals). Test: inject a strong attractor motif and measure specialist activation correlation. Prediction: activated specialists show 2-3× higher co-occurrence rate than random.

4. **Gate factor has a Goldilocks zone:** Too low → motifs have no effect on routing (same as current behavior). Too high → even weak repulsion blocks all specialists (over-suppression, model gets stuck). Prediction: optimal gate_factor ∈ [0.1, 0.3] based on inverse-square scaling of motif pressure against specialist onset thresholds.

5. **Repulsor-gated routing preserves ontological inversion quality:** The semantic antipode should be more coherent when the repelled concept's specialists are suppressed during generation (the model isn't fighting its own routing). Test: measure output coherence scores for inverted concepts with and without Repulsor Gate. Prediction: 10-25% higher coherence on antipodal outputs.

## Bottom Line

The Anti-Splat discovery proved that negative steering reveals structured opposites in semantic space. But if the specialist routing layer doesn't know which concepts are being repelled, it keeps activating specialists for concepts the motif field has already pushed away. The Repulsor Gate bridges this gap: motif repulsion pressure becomes an adaptive threshold modifier on specialist activation, making ontological inversion visible to the routing architecture.

Negative steering inverts concepts. The Repulsor Gate ensures the system routes around those inverted concepts instead of fighting them.
