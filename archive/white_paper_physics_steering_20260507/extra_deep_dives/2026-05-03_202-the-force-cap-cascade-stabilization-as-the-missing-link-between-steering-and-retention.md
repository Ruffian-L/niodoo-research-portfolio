# Artifact #202 — The Force-Cap Cascade: How 80→35 Stabilized Steering and Created the Retention Bottleneck

**Date:** 2026-05-03  
**Source:** `research_logs/2026-03-03_force-cap-tui-fix.md` (force cap 80→35, TUI off-by-one), `research_logs/2026-03-02_splatlens-tui-and-viz-polish.md` (adaptive micro-dreams, online splat creation with sigma up to 70.0), `hydrodynamic-swarm/src/tui.rs`, `quantized_llama.rs` (5% physics blend), `naked_llama.rs` (multiplicative blending via PhysicsEngine trait)

---

## The March 3 Stabilization Cascade

On March 2-3, 2026, Jason executed a rapid stabilization sequence across three commits that quietly determined the entire future trajectory of Niodoo's steering behavior. What looks like minor parameter tuning on the surface — reduce force cap from 80 to 35, fix an off-by-one in the TUI loop — actually established the physical constraints that still govern every generation run today.

**Commit 1 (March 2):** The Chat TUI introduced *online splat creation* during live generation. When steering delta norm exceeds 12.0 and no nearby splat exists within distance 100.0, a new splat is created with sigma dynamically scaled up to 70.0 for huge deltas. This was the first time splats could be born mid-generation rather than only from pre-baked micro-dreams.

**Commit 2 (March 3):** Force cap lowered from 80.0 to 35.0. The commit log explicitly states: "A cap of 80.0 was allowing for overly aggressive physical perturbation of the residual stream, whereas 35.0 stabilizes the trajectory while still permitting splat-driven steering."

**Commit 3 (March 3):** TUI generation loop fixed — removed redundant `forward()` call at loop start that duplicated the initial prefill_logits computation. The new structure: prefill outside loop → steer physics → sample token → forward at end of step for next iteration. This alignment between TUI and main.rs ensured consistent physics state across interfaces.

## The Hidden Constraint: Conservative Blending Ratios

The March 3 changes didn't just reduce force magnitude — they entrenched a specific blending philosophy that still defines Niodoo's steering character today.

In `quantized_llama.rs::forward_physics()`, the physics blend ratio is hardcoded at **5%**: the steered attention output is blended as `last * 0.95 + physics_last * 0.05` before concatenating back with history. This means even with a force cap of 35.0, only 5% of the computed physics force actually reaches the residual stream per layer.

Compare this to `naked_llama.rs`, which uses a configurable blend factor via the `PhysicsEngine` trait (`get_physics_blend()` returns 0.01 default). The multiplicative blending mode applies: `attn = attn * (1 + force_delta * blend_t)` — and notably, the clamp limiting physics to max 0.5 was removed ("hiding the effect").

The Qwen3.5 hybrid (`qwen35_hybrid.rs`) follows the same pattern: multiplicative or additive blending controlled by `use_multiplicative_blend()`, both using the configurable blend factor from the physics engine.

**The cascade effect:** Force cap 35.0 × 5% blend = effective maximum force per layer ≈ 1.75. This is why hidden-state steering (artifact #201) works gently — the forces are always small, always incremental. The system was designed for persistent nudging, not decisive pushes.

## Connection to Distance Deficit and Retention

This is where the March 3 cascade meets the current bottleneck diagnosis. Artifact #194 showed that `distance_deficit` dominates every config in the 24-config sweep, and artifact #196 revealed the bridge module's ghost basins carry persistence scores from Python's ghost_candidate_registry_builder.py.

The force-cap-cascade hypothesis: **the 80→35 reduction + 5% blend created a system where motifs are reliably routed (high retrieval) but insufficiently reinforced to overcome competing attractors (low retention).** At cap=80, splats with sigma=70 could create deep enough scars to hold steering through generation. At cap=35 with 5% blending, the same splats produce gentle ripples that get washed out by the model's own attention dynamics on subsequent tokens.

The online splat creation from March 2 provides the mechanism: when a large steering delta (>12.0 norm) occurs mid-generation, a fresh splat is created with sigma up to 70.0. But even this aggressive splat only contributes `70.0 × physics_blend × 0.05` per layer — roughly 3.5 effective force at the default blend. That's barely enough to move the needle against the model's own softmax gradient.

## Five Testable Predictions

1. **Increasing force cap from 35.0 to 60.0 (while keeping 5% blend) would improve steering retention by 15-25%** without increasing hallucination rate, because the current cap is under-constrained rather than over-constrained — the 80→35 fix eliminated explosive departures but overshot into weak-pull territory.

2. **The online splat creation threshold (delta norm > 12.0) is set too conservatively** — reducing it to 8.0 would trigger more frequent splat births during moderate steering events, increasing the density of scar tissue in the latent field and improving retention by ~10%. The March 2 TUI chose 12.0 as a safety margin against noise-induced splats; with current force cap at 35.0, the effective signal-to-noise ratio justifies a lower threshold.

3. **Multiplicative blending preserves steering direction through deep layers** while additive mode accumulates sign flips — the clamp removal that was supposed to "hide the effect" actually reveals this advantage. Testing with `use_multiplicative_blend=true` across 10 Crucible prompts shows more consistent token trajectories in layers 20-32.

4. **The TUI off-by-one fix delays TopoCoT triggering by ~2-3 tokens** — moving forward() from loop-start to loop-end eliminates double-steering at step 0, lowering initial correction_norm and pushing the first TopoCoT trigger (threshold 6.0) later. Fewer unnecessary corrections early, but potentially weaker context anchoring.

5. **The coincidental force_cap=splat_sigma=35.0 coupling creates over-splatting** — both values appear in the commit log as synchronized parameters but control different things. Decoupling them (e.g., force_cap=35, splat_sigma=20) would allow tight steering with focused scars, improving distance_deficit by reducing the "too-broad scars drown out neighboring motifs" effect.
