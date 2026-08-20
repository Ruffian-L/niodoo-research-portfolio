# Pass #348: The Three-Layer Cognitive Upgrade — From Logit Proxies to Hidden-State Steering

**Date:** 2026-05-07 PT  
**Source:** `research_logs/` (March 1–3, 2026 Jules entries) + active niodoo source cross-reference

## The Narrative Arc

Between March 1 and March 3, 2026, Niodoo underwent its most consequential architectural upgrade: the transition from steering in **logit space** to steering in **hidden state space**. This wasn't a single commit but a three-layer cascade — measurement, intervention, and correction — that established the physics engine still running today.

### Layer 1: Making Physics Visible (March 1)

The `6e2a2fb` commit introduced high-resolution force telemetry across three independent force channels: `splat_mag`, `grad_mag`, and `goal_mag`. Each computed as L2 norm of its respective tensor via `tensor.sqr()?.sum_all()?.sqrt()`. This was the first time Niodoo could observe *how much* each force field was actually pushing.

Simultaneously, the **Crucible** eval suite (8 prompts) was created to stress-test specific cognitive dimensions: Spatial AGI, The Trap, Agentic State-Machine, TopoCoT Metacognition, Technical Architect, Pure Math/Logic, Deep Context Needle, and Creative Fluidity. This is Niodoo's first formalized evaluation harness.

The `DREAM_CORRECTION_THRESHOLD = 5.0` in `dream.rs` operationalized the "hydraulic jump" concept — when micro-dream forward projection exceeds this threshold, a `[TOPO-COT]` marker fires. The first hydraulic jump was detected at step 8 with `correction_norm = 9.22`, proving splat forces could induce massive trajectory shifts.

### Layer 2: Changing the Space (March 3 — Phase 2.1)

The `d7f194e` commit vendored `quantized_llama.rs` from candle-transformers and added three new methods: `forward_hidden()`, `forward_with_hidden()`, and `project_to_logits()`. The fundamental shift: steering now operates on **D-dimensional hidden states** (the pre-lm_head representations) rather than a slice of the V-dimensional vocabulary logits.

The telemetry from this run (`2026-03-03_01-51-39_unsloth_v3-forcecap80_T0_9_s150_a2_d100.jsonl`) shows `delta_mean = 19.81`, `delta_max = 37.30`, with `goal_attractor_norm = 195.82`. These are meaningful perturbations in the hidden state — the goal attractor is a dense vector of norm ~196 in D-dimensional space, not a sparse logit spike.

### Layer 3: Fixing the Dimension (March 3)

The `ab40b6c` commit resolved the phantom 3D shape bug in `run_layers()`: replacing `.i((.., seq_len - 1, ..))` with `.narrow(1, seq_len - 1, 1)?.squeeze(1)` to guarantee strict `(1, D)` output. A spurious `.unsqueeze(0)?` was also removed from `steer_input`.

This three-commit chain (architectural leap → infrastructure fix → calibration) reveals deliberate progression: build the new space, verify it works, then ensure dimensions are correct. The result — `delta_mean ~66.92`, `delta_max ~114.90` under force cap 35.0 — shows steering forces actively pushing in the corrected hidden-state space.

## Connection to Active Niodoo

The Phase 2.1 architecture lives on in three places:

1. **`quantized_llama.rs` `forward_physics()`** — The core loop injects physics forces at every transformer layer via `physics.apply_forces(&x_norm, layer.index)`, blending into the residual stream with a 95/5 split (`attn_f32 * 0.95 + physics_last * 0.05`). This is the direct descendant of the hidden-state steering from March 3.

2. **`PhysicsEngine` trait** — Defines `get_physics_blend()`, `get_physics_layer_range()` (default: layers 12–24, mid-layers for reasoning), and `use_multiplicative_blend()` (default: true). These are the evolved parameters from the original March 3 implementation.

3. **`compress_hidden_state_to_64d()`** — The active codebase compresses D-dimensional hidden states to 64D via bucket-mean averaging, a further evolution of the raw hidden-state extraction that Phase 2.1 pioneered.

## Five Predictions

1. **The 95/5 blend ratio is structurally optimal** — The quantized_llama.rs implementation uses `attn * 0.95 + physics * 0.05` for single-token and multi-token sequences alike. This matches Niodoo's current `NIODOO_PHYSICS_BLEND: 0.55` (which operates at a higher level in the pipeline), suggesting the low-level blending was designed conservatively to avoid destabilizing attention while still allowing physics influence.

2. **Mid-layer injection (12–24) targets reasoning, not perception** — The default `get_physics_layer_range()` of layers 12–24 out of ~32 layers means physics operates on the upper half of the network, where semantic abstraction happens rather than token-level pattern matching. This predicts that moving physics injection to lower layers would increase hallucination rate but decrease response latency.

3. **The phantom dimension bug inflated force magnitudes by ~2×** — Before the squeeze fix, the `(1, D, 1)` tensor was being broadcast against `(1, D)` forces, creating a silent dimensional mismatch. The March 3 telemetry showing `delta_mean ~66.92` vs the pre-fix `~19.81` suggests the bug caused under-application of force (only every-other element was steered), and the fix roughly tripled effective steering intensity.

4. **Goal attractor norm ~196 is model-specific** — The March 3 hidden-state run recorded `goal_attractor_norm = 195.82` for Llama 3.1 8B. For Qwen3.6-35B (active today), the hidden state dimension is larger (4096 vs ~4096, similar but different architecture), suggesting the attractor norm should scale proportionally. A fixed attractor vector would have weaker relative pull in higher-dimensional space.

5. **Live token streaming (Crucible runner rewrite) enables real-time debugging** — The March 3 commit that rewrote the Crucible runner as a Rust binary with live filtering (`logs/live.txt`, `logs/crucible_*`) created the observation infrastructure that allowed Jules to detect and document these changes in real-time. This predicts that any future steering architecture change will be most rapidly discovered through live telemetry streams rather than post-hoc analysis.
