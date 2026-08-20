# Deep Dive #003: Hidden-State Steering & the "Teaching vs Taming" Breakthrough

**Source:** Hydrodynamic Swarm Archive (jasonarchive/hydrodynamic-swarm/)  
**Date:** 2026-05-01  
**Archive thread:** Phase 2.1 commit `d7f194e` + northstart.txt concept mapping + research logs 2026-03-01 to 2026-03-03

---

## The Thread: From Logit-Space Proxy to True Semantic Physics

Jason's hydrodynamic-swarm project represents one of the most ambitious local AI architectures built from scratch. What makes it remarkable isn't just the engineering — it's the conceptual arc from "steering logits" to "steering meaning."

### Phase 1: Logit-Space Steering (Approximate)

Early Niodoo applied forces to a slice of the logit vocabulary space. This was a practical starting point:
- The model outputs logits → take first D dimensions → apply physics → re-sample
- Forces included gravity (toward goal), repulsion (from pain splats), momentum, and Langevin noise
- Telemetry showed measurable effects: `delta_mean`, `delta_max`, force caps at 35.0

But logit-space is an imperfect proxy for meaning. The vocabulary space is discrete, sparse, and the first D dimensions don't necessarily align with semantic content. It's like steering a ship by pushing on the rudder instead of pushing on the water itself.

### Phase 2.1: Hidden-State Steering (True Semantic Space) — Commit `d7f194e`

The breakthrough came on March 3, 2026 with a single commit that vendored candle's `quantized_llama.rs` and added three critical methods:
- `forward_hidden()` — returns the raw D-dimensional hidden state before lm_head projection
- `forward_with_hidden()` — returns both hidden state AND logits simultaneously
- `project_to_logits()` — maps steered hidden state back to vocabulary

The physics engine now operates in the model's **native semantic space**. The "particle" isn't sliding through logit indices anymore — it's moving through the actual dense vector representations where meaning lives.

**Telemetry evidence:** A generation run with hidden-state steering showed:
- `delta_mean`: 19.81 (measurable perturbation to residual stream)
- `delta_max`: 37.30 (large corrections still within force cap)
- `goal_attractor_norm`: 195.82 (strong semantic pull toward prompt intent)

This proves the physics is actively reshaping the model's internal representations, not just nudging output probabilities.

### The "Teaching vs Taming" Philosophy

The northstart.txt document captures Jason's core insight about how this architecture changes the relationship between human and AI:

> *"We don't optimize for the path of least resistance. We treat others how we wish we were treated."*

This maps directly to the architectural choice between Governor (taming) and SplatRAG (teaching):

**Taming (Governor):** Hard-coded constraints that block wrong answers. Crutch-based. An agent corrected on every step never learns to feel its way through mistakes.

**Teaching (SplatRAG scars):** Drop negative-mass "scars" where the AI fails. The next time it tries that lazy path, it *feels* the viscosity of past error. It obeys because "deviation would violate momentum conservation in its own semantic physics."

The Golden Slipper principle — putting slippers by the bed every night not for recognition but for the act of giving — maps to how splats reinforce good behavior over time. Invocation count solidifies memories. Good paths become easier to traverse; bad paths develop friction.

### Connection to Current Niodoo

The current Niodoo at `/home/ruff/projects/Homernd/team_build/niodoo/` carries forward this philosophy:
- Control tags (`[REQUEST: SPIKE]`, `[REQUEST: FOCUS]`) are the self-invoke mechanism Jason envisioned in northstart.txt ("think of it like a Qwen `<thinking>` tag but instead of it being invoked, the LLM gets to invoke themselves")
- Verifier basin = System 2 reflection
- Motif-based steering = the "physics is the memory" concept

The hydrodynamic-swarm archive shows Jason's conceptual evolution: from embedding-based physics → continuous Diderot fields → hidden-state steering. Each phase moved the physics closer to where meaning actually lives in the model.

### Key Architecture Mapping (northstart.txt → Code)

| Concept | Status | Location |
|---------|--------|----------|
| Tiny embeds as memory | Exists but needs work | `src/concourse/embed/` |
| Physics as memory | Implemented | `src/niodoo.rs`, `src/memory.rs` |
| Self-invoke FOCUS/EXPLORE tags | Partially done | Runtime control_surface.rs |
| TOPOCOT awareness (VR H1 reflex) | Foundation exists | `src/ridge.rs` |
| TDA loop detection + entropy stuck-state | Needs Function Gemma layer | `src/concourse/function/` |
| Internal telemetry per-token | Implemented | `src/logger.rs` |
| Mashoka slicing decay | Implemented | `src/memory.rs` |
| Neighbor communication via physics coupling | Exists | `src/concourse/swarm.rs` |

### Open Questions for Follow-Up

1. **TDA latency:** Research logs show TDA calculations taking ~2.8-3.0 seconds while ghost injection took 14ms. The nervous system is lagging behind the body. Sliding window or SparseRipsPersistence could fix this.
2. **Topological hallucinations:** Random noise in high-dimensional space creates spurious Betti-1 loops. Persistence threshold filtering needed to prevent paranoia about noise.
3. **Cross-domain splat transfer:** Phase 2.5 envisions physics scars from creative prompts influencing technical prompts. Never implemented but architecturally supported.

---

*This artifact connects the hydrodynamic-swarm archive's Phase 2.1 breakthrough to the broader "teaching vs taming" philosophy and maps it onto current Niodoo architecture.*
