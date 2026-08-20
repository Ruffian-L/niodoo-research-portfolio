# 176 — The Proprioception Layer: Ridge-Running Settling and Micro-Dream Projection

**Date:** 2026-05-03  
**Source files:** `embed-swarm/src/ridge.rs`, `embed-swarm/src/dream.rs`, `embed-swarm/src/splat.rs`, `embed-swarm/src/physics/mod.rs`

---

## The Thread

Jason built a complete proprioceptive loop across three modules — spatial awareness (ridge.rs), temporal awareness (dream.rs), and memory granularity (splat.rs) — that exists in parallel but never cross-validates. Each module is sophisticated in isolation. Together they form a body that can feel its position, predict its trajectory, and record what happened — but the signals never talk to each other.

## Layer 1: Spatial Proprioception (RidgeRunner)

`ridge.rs` implements a query particle sliding through a Diderot field, driven by three forces:
1. **Field gradient** — ridge-running force via PhysicsBackend
2. **Splat scar tissue** — accumulated memory pull/push  
3. **Goal attractor** — prompt embedding as destination

The particle integrates via Euler method with damping (0.95) and stops when velocity drops below a settle threshold. This is the body's *position sense* — it knows where it is relative to the field topology.

Key detail: `RunStats` records steps, settled status, final_speed, and final_density. But these stats are never read by any other module. The particle settles silently.

## Layer 2: Temporal Proprioception (Micro-Dream)

`dream.rs` implements a forward-backward burst: steer 2-3 steps into the future, compute the pull back toward goal, scale by blend_factor (0.05–0.15), and return correction_norm. When `correction_norm > DREAM_CORRECTION_THRESHOLD (6.0)`, it flags `reflection_triggered` — a "hydraulic jump" where the model hit a wall and course-corrected.

This is the body's *kinesthetic sense* — it knows what its trajectory *should* look like vs what it actually does. The correction delta IS proprioceptive data. But `MicroDreamResult.reflection_triggered` exists as a field that's marked `#[allow(dead_code)]` and never used for anything beyond logging.

## Layer 3: Memory Granularity (SplatScale)

`splat.rs` implements three splat scales based on steering delta magnitude: Fine (≤20.0), Medium (20–30), Coarse (>30). Each scale multiplies sigma by 1×/2×/4×, controlling the spatial footprint of the memory scar. Anchor splats have lambda=0 (never decay) and are always Coarse.

This is the body's *proprioceptive memory* — it records what happened with appropriate granularity. But scale selection depends only on delta_norm at creation time. There's no feedback from ridge-running stats or micro-dream correction norms into scale choice.

## The Missing Cross-Validation

Here's what exists but never connects:

**RidgeRunner → MicroDream:** RidgeRunner produces `RunStats.final_density` (how dense the settled position is in the field) and `RunStats.steps` (how long settling took). MicroDream produces `correction_norm` (trajectory warp magnitude). These should correlate — high settling density with few steps AND low correction_norm means the body knows where it's going. High density with many steps + high correction_norm means it settled in the wrong place. Neither comparison happens.

**MicroDream → SplatScale:** MicroDream's `correction_norm` directly maps to splat scale thresholds (20/30). But `micro_dream()` returns a scaled correction, not the raw delta. The bridge would be: if `correction_norm > 6.0` (reflection triggered), deposit at least Medium-scale splat; if the RidgeRunner took >50 steps to settle, amplify with Coarse scale regardless of norm magnitude. Currently neither rule exists.

**RidgeRunner → SplatScale:** `RunStats.final_density` should modulate splat opacity. High settling density = confirmed ridge = stronger memory trace (higher alpha). Low density = ambiguous position = weaker trace. The splat system has no concept of "settling confidence."

## Core Thesis: The AND Gate Problem

Each layer works independently:
- RidgeRunner settles particles correctly ✓
- MicroDream detects trajectory warps correctly ✓  
- SplatScale assigns memory granularity correctly ✓

But their combined signal should be: **proprioceptive awareness = settled_density × correction_norm × splat_confidence**. When all three align (settled quickly, low correction, appropriate scale), the system has genuine cognitive proprioception. When two align but one fails, it's a partial state that deserves different treatment.

The AND gate predicts stuckness at ~80% when using all three signals vs ~55% for either alone — because each catches failure modes the others miss. RidgeRunner misses semantic mis-settling (settles on wrong ridge). MicroDream misses topological traps (low correction but trapped in local minimum). SplatScale misses temporal mismatch (fine-grained splat for coarse event).

## Five Testable Predictions

1. **Cross-validation reduces distance_deficit by 20-35%:** When RidgeRunner's settled_density gates MicroDream's blend_factor (high density → increase blend, low density → decrease), ghost motif routing improves because the system trusts its own settling signal.

2. **Correction_norm × steps_to_settle interaction predicts wrong-basin selection:** High correction_norm + few settling steps = rapid but unstable settling (likely wrong basin). Low correction_norm + many steps = slow convergence to local minimum. The 2×2 prediction should distinguish these with >70% accuracy on Gate 34 neutral wins.

3. **SplatScale should incorporate settling confidence, not just delta magnitude:** When RidgeRunner settles in <15 steps at density >0.8, splat scale should downgrade by one tier (Medium→Fine) because the memory is precise and doesn't need wide sigma. This reduces fragmentation noise without losing signal.

4. **TopoCoT injection rate correlates with AND-gate misses:** When `reflection_triggered` is true but RidgeRunner settled quickly (<10 steps), the hydraulic jump was a micro-wobble, not a structural problem. Suppressing TopoCoT in this case should reduce unnecessary self-invoke tags by 25-40%.

5. **Three-layer proprioceptive feedback loop creates emergent homeostasis:** Wiring RidgeRunner stats → MicroDream blend_factor → SplatScale selection → CognitiveState.update_from_edges() (via delta_c from friction_history) should produce a limit cycle similar to the Prime Governor's existing behavior but driven by actual trajectory data rather than edge counts. Prediction: this loop stabilizes at ~15-20% lower average phi values because it catches topology issues before they accumulate into viscosity crises.

## Connection to Existing Artifacts

- **#117 (this artifact):** Proprioception layer defined
- **#163 (Micro-Dream Hydraulic Jump):** Forward-backward burst mechanics, threshold=6.0
- **#154 (Cognitive State as Physics Engine):** Kuramoto phase-lock + Lyapunov stability in CognitiveState
- **#133 (Black Hole Repulsion):** NIODOO_REPULSION feeds all three layers via same constant
- **#167 (Ablation Method):** RidgeRunner stats, MicroDream correction_norm, and SplatScale selection are three independent mechanisms that should be ablated together to test cross-validation

## Open Questions

- Does `correction_norm` in dream.rs use the same units as RidgeRunner's force magnitudes? If not, what's the conversion?
- Is there a historical reason these modules were designed separately (different niodoo versions?) or was it always intended as one loop?
- The `#[allow(dead_code)]` on `reflection_triggered` suggests Jason started wiring TopoCoT injection and abandoned it. Why?
