# Artifact #201 — The Hidden-State Steering Revolution (Phase 2.1) and the Manifold Safety Net

**Date:** 2026-05-03  
**Source:** `hydrodynamic-swarm/src/llama.rs` (vendored quantized model with `forward_hidden`, `forward_with_hidden`, `project_to_logits`), `hydrodynamic-swarm/src/niodoo.rs` (steer engine with renormalization), `hydrodynamic-swarm/src/main.rs` (generation loop with manifold pullback, VR H1 reflex, entropy-adaptive micro-dreams), `research_logs/2026-03-03_hidden-state-steering.md`, `research_logs/2026-03-01_v1-1-micro-dreams-and-sweep.md`

---

## The Architectural Shift

On March 3, 2026, Jason made a fundamental decision: stop steering the model in logit space and start steering it in the native hidden state (D-dimensional pre-lm-head representation). This was Phase 2.1 of SplatRAG's evolution — and it changed everything about how physics operates inside the transformer.

Before this change, steering forces operated on a slice of the vocabulary logits — an arbitrary proxy for semantic meaning. The "goal attractor" was just the first D dimensions of the output distribution. After vendoring `quantized_llama.rs` from candle-transformers and adding three new methods (`forward_hidden`, `forward_with_hidden`, `project_to_logits`), the physics engine gained direct access to the model's true semantic space: the final hidden state before token projection.

The computational savings are elegant: `forward_with_hidden()` runs the transformer layers exactly once, then branches — returning both logits and hidden state simultaneously. No wasted compute. The hidden state is captured at `run_layers()`, which returns `(b_sz, hidden_dim)` after taking only the last position through `narrow(1, seq_len - 1, 1)?.squeeze(1)`.

## Three Safety Layers Keep Steering from Breaking the Model

Steering in hidden space introduces a new problem: cumulative force application drifts the residual stream off the Llama manifold. After ~40-80 tokens, the lm_head starts producing garbage because the hidden state norm has diverged from what the model was trained on. Jason solved this with three layered mechanisms:

**1. Manifold Pullback (configurable, default 0.15):** Each step blends the steered state back toward baseline using `steered = steered × (1 - pb) + steer_input × pb`. This is a continuous damped spring — not aggressive enough to kill steering effects, but strong enough to prevent runaway drift. The pullback coefficient sits in `PhysicsConfig.manifold_pullback` and can be tuned per-model.

**2. Post-Steer Renormalization:** Inside `niodoo.rs::steer()`, after applying the combined force (grad + splat + goal), the result is renormalized to match the baseline residual's L2 norm: `steered.affine(baseline_norm / steered_norm, 0.0)`. This preserves direction while anchoring magnitude — like keeping a compass needle pointing true north regardless of how hard you push it.

**3. VR H1 Collapse Reflex:** The RidgeRunner module tracks recent hidden states in a sliding window (max 12). If the model enters a zero-persistence cycle (detected via `ridge::check_vr_h1_reflex`), the steered slice is blended 30% back toward baseline at step intervals. This catches pathological loops that slip through both pullback and renormalization.

## Entropy-Adaptive Micro-Dreams: The Dream That Reads Its Own Temperature

The micro-dream system (introduced in v1.1, refined in Phase 2.1) operates on the steered hidden state before logit reconstruction. What's novel is its entropy-aware adaptation: it samples the raw probability distribution, computes Shannon entropy over the top-1000 tokens, and uses that to dynamically tune both dream depth (2-4 forward steps) and blend factor (0.07-0.12).

High entropy (>4.0) → deeper dreams (4 steps) with stronger correction (blend=0.12). Low entropy (<3.0) → shallower dreams (2 steps) with gentler nudges (blend=0.07). This creates an implicit feedback loop: when the model is uncertain, micro-dreams work harder; when it's confident, they step back.

## The Hidden-State → Logit Reconstruction Pipeline

After steering completes, the pipeline reconstructs full logits via `model.project_to_logits(&steered_slice)` — passing the steered hidden state through the lm_head QMatMul. This is critical: it means the steering force has been applied in semantic space and then translated back to vocabulary space through the model's own projection matrix. The result is a steered probability distribution that respects the model's native token geometry.

## Five Testable Predictions

1. **Hidden-state steering reduces hallucination rate by 20-35%** compared to logit-space steering, because forces operate in the model's true semantic manifold rather than an arbitrary vocabulary slice. The goal attractor at norm ~196 (vs. logit-space equivalent) provides more precise directional pull.

2. **Manifold pullback of 0.15 is near-optimal** — lower values cause post-80-token degradation in generation quality; higher values create visible "steering resistance" where corrections feel mechanical rather than organic. The renormalization step handles magnitude but not direction drift, which is why pullback exists.

3. **Entropy-adaptive dream depth correlates with response coherence** — high-entropy prompts (creative, abstract) will show 2-3× more dream corrections per generation than low-entropy prompts (math, technical), and the blend factor scaling (0.07→0.12) will produce measurably different correction distributions across prompt types.

4. **VR H1 reflex frequency is inversely correlated with manifold pullback strength** — systems with lower pullback (<0.10) will trigger collapse corrections more often, while higher pullback (>0.20) may suppress the reflex but at the cost of reduced steering freedom. The sweet spot sits around 0.15-0.18.

5. **The hidden-state → lm_head projection creates a "steering bottleneck"** — not all semantic corrections survive the projection back to logits. High-dimensional hidden states (e.g., 4096D) with subtle directional shifts may produce negligible logit-space effects, creating an effective force attenuation of ~10-20% between steering application and token sampling. This bottleneck explains why blend factors in micro-dreams need entropy calibration: the projection layer varies its attenuation across different regions of hidden space.

## Connection to Active Niodoo

The Phase 2.1 architecture maps directly onto Niodoo's current setup: `steer_hidden=true` is the default, meaning all active steering (TopoCoT, micro-dreams, splat forces) operates in hidden-state space. The renormalization step in `niodoo.rs::steer()` is the same manifold anchor that prevents the hydrodynamic-swarm from breaking after extended generation. The distance_deficit bottleneck (artifact #194) may be partially a projection-bottleneck issue — routing selects motifs well in hidden space, but the lm_head projection attenuates some corrections before token sampling.
