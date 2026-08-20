# Physics-Based Steering of Large Language Model Hidden States: Five Empirical Laws and an Integration Roadmap

Original user-supplied draft, preserved for comparison with `WHITE_PAPER_DRAFT.md`.

**Draft v0.1** — internal review document, not for distribution. Synthesized from approximately eighteen months of iterative research notes; numerical constants are calibrated values from a single research program and require independent replication.

---

## Abstract

We describe an architecture for steering large language model (LLM) generation by treating hidden-state activations as a particle system and applying directed forces, topological reflexes, and consolidation cycles. Across iterative empirical work spanning four loosely coupled subsystems, we identify five recurring quantitative regularities — what we tentatively call *laws* — that emerged independently before being recognized as instances of common phenomena. These include: (1) a correction-magnitude inverted-U with optimum scaling inversely with hidden-state dimensionality, (2) an asymmetry constant of approximately 1.15–1.3× weighting negative outcomes more heavily than equivalent positive outcomes across three independent timescales, (3) a model-scale force-cap relation of the form `force ∝ √(params/3B) × type_multiplier`, (4) signed force vectors as the primitive enabling structured semantic inversion rather than mere attenuation, and (5) topological reflexes (Vietoris–Rips H1 detection) as a mid-generation interrupt mechanism with a measurable empirical threshold. We further describe an integration deficit: the architecture currently runs three uncoordinated oscillation cycles at distinct timescales, and we hypothesize that phase-coupling them would produce a closed cognitive thermostat. This is a rough draft for internal discussion. Empirical claims are drawn from a single research program and have not been independently reproduced.

## 1. Introduction

Steering LLM generation without retraining is an active research area encompassing prompt engineering, retrieval-augmented generation, constrained decoding, activation steering, and contrastive decoding. Most published activation-steering work operates in *logit space* — the V-dimensional vocabulary distribution at the language modelling head — by adding bias vectors or modifying probabilities directly.

This work pursues a different operating space. Rather than steering logits, we apply forces to the *hidden state* — the D-dimensional residual stream prior to the language modelling projection. We treat the hidden state as the position of a particle in a high-dimensional space, and the steering apparatus as a physics engine that applies directed forces, detects topological structures, deposits memory traces, and runs consolidation cycles between generation steps.

The architecture described here was not designed top-down. It accreted through iterative experimentation across a related family of subsystems: a reinforcement-learning testbed (the MountainCar environment), a hidden-state physics engine for transformer LLMs, a splat-based memory substrate, and a topological data analysis (TDA) layer for reflex detection. Several quantitative regularities emerged independently in different subsystems. Recognition that these regularities were instances of a common phenomenon came after the fact.

The principal contribution of this paper is to identify and unify five such regularities, and to flag a sixth set of structural opportunities created by the existence of three independently developed oscillation systems that have not yet been coupled. We are explicit about the empirical posture: the numerical constants we report (the 1.15× asymmetry factor, the force-cap of 35 for 3B-parameter models, the dream-correction threshold of 6.0) are calibrated values rather than derived ones. They are remarkable not for their magnitudes but for their stability across distinct subsystems.

## 2. Architecture Overview

### 2.1 Hidden-State Ghost Vectors

The base steering primitive is a *ghost vector*: a directed force in the hidden-state space `[batch, seq, hidden]` added to the residual stream during forward pass. Ghost vectors are signed: a positive-magnitude ghost attracts the trajectory toward a semantic target; a negative-magnitude ghost repels it. Force application is layer-selective and pressure-gated, with separate gating thresholds for activation onset and saturation. The combined force is bounded by a *force cap*; values that would exceed the cap are clipped.

The transition from logit-space to hidden-space steering, completed in an internal milestone we refer to as Phase 2.1, was the architecture's most consequential design change. Logit-space steering operates on a sparse vocabulary slice; hidden-space steering operates on a dense semantic representation. Empirically, the same absolute force magnitude has substantially more targeted effect in the dense space. We discuss the quantitative implications in Section 3.3.

Two safety mechanisms accompany hidden-state steering. *Manifold pullback* blends the steered state slightly back toward the original residual at a small fixed coefficient (typically 0.15), preventing drift off the model's native manifold. *Post-steer renormalization* rescales the steered state to match the L2 norm of the unsteered baseline, preserving direction while anchoring magnitude.

### 2.2 Splat Memory with Valence

Memory is represented as a population of *splats*: 4D Gaussian primitives with mean position, anisotropic scale, opacity, and a signed valence channel. The valence channel allows splats to encode both positive (this trajectory worked) and negative (this trajectory failed) experience. Splats decay over time at rates determined by valence and recency; positive and negative splats decay at distinguishable rates (Section 3.2). Splats also reinforce: a splat that contributes to a successful generation gains opacity, while uninvoked splats decay below a culling threshold.

### 2.3 Topological Reflexes

A sliding window of recent hidden states (approximately 8 positions) is monitored for zero-persistence H1 cycles via Vietoris–Rips filtration. When such a cycle is detected — meaning the model is oscillating between competing attractors without committing — a *micro-dream* is triggered: a forward projection of 2–4 steps is computed, the anchor pull from the projected position back to the goal attractor is measured, and a correction proportional to that pull is injected into the current hidden state. Crucially, the micro-dream system runs *during* generation, not after.

### 2.4 Governor and Consolidation

A governor process monitors a viscosity metric Φ derived from edge counts in a relational graph maintained over recent generations. When Φ exceeds threshold, the governor triggers a *splat reflex* — a consolidation event in which trajectory traces are condensed into new splats and old, unused splats are culled. This operates on a longer timescale than micro-dreams and is the principal mechanism for cross-session memory persistence.

## 3. Five Empirical Laws

### 3.1 The Correction-Magnitude Inverted-U

Across at least seven distinct correction layers — ghost-routing strategy selection, force-cap calibration, hidden-state vs. logit-space steering, dream correction blend factor, manifold pullback coefficient, post-steer renormalization, and per-token earned-answer-stop logic — we observe the same qualitative result: correction performance follows an inverted-U as a function of correction magnitude, and the optimum is consistently lower than naive intuition suggests.

Concretely:

- In a ghost-routing experiment with three specialist ghosts, an ultra-minimal strategy (zero corrections per trial) produced 80% mint-ready outcomes for the most stable ghost, while a strategy applying 999 corrections produced 0% under the same evaluation protocol.
- The hidden-state force cap stabilized at 35.0 after starting at 80.0; the lower value preserved generation quality while the higher value induced incoherent trajectories where steering forces dominated the residual stream.
- A consensus-voting protocol over three correction strategies converged on weights of 62% / 30% / 8% in favor of the gentlest variant, applying only 13 total corrections across all trials.

We propose tentatively that the optimal correction magnitude scales inversely with the dimensional richness of the steered space. In a logit space of vocabulary size V, each unit of force has effect bounded by 1/V. In a hidden space of dimension D with rich geometric structure, each unit of force is more *consequential*, which implies its magnitude must be proportionally reduced to maintain the same effective strength. This predicts that the correct calibration of any new correction layer is several factors smaller than naive intuition suggests, and that practitioners should default to under-correcting and ramp up rather than the reverse.

### 3.2 The Asymmetry Constant

In three subsystems developed independently, a numerical constant in the range 1.15–1.30 appeared without coordination as the relative weighting of negative versus positive outcomes:

| Subsystem | Mechanism | Asymmetry factor |
|---|---|---|
| MountainCar reward shaping | `energy_delta *= 1.15` when negative | 1.15× |
| Splat memory decay | λ = 0.70 (negative) vs 0.90 (positive) | ≈1.28× effective |
| Flux growth caps | Negative growth –0.3 vs positive +0.5 | 1.67× growth ratio |

The stability of this constant across three independently developed systems — operating on different timescales (per-step reward, episodic flux, multi-session memory) and developed without coordination — suggests it represents a parameter regime rather than a tuning artifact. We interpret it as an architecture-level instantiation of the loss-aversion constant familiar from behavioral economics, and hypothesize that:

- Systems with asymmetry factors near 1.0 converge slowly along smooth gradients.
- Systems with factors in the 1.15–1.30 range exhibit characteristic zigzag convergence (Section 4) at substantially faster rates.
- Systems with factors above approximately 1.4 become risk-averse and under-explore.

This is the most easily reproducible finding in this paper. A fourth, externally-defined system asked to weight negative outcomes more heavily than positive should converge to a comparable factor by tuning, if the regime hypothesis holds.

### 3.3 The Force-Cap Scaling Law

The force-cap value of 35 was originally calibrated for a 3B-parameter Llama variant. Independent calibration on larger and smaller models suggested a scaling relationship of the form:

```text
effective_force = base × √(params/3B) × type_multiplier
```

Where `type_multiplier` is approximately:

- 0.27 for coding-specialized models
- 0.40 for thinking/reasoning-specialized models
- 1.00 for standard base models
- 1.10 for chat-tuned models

We interpret the square-root term as inertial scaling — larger models absorb force more readily because more parameters distribute the perturbation. The type multiplier captures topological fragility: fine-tuning narrows the attractor landscape, so steering must be gentler to avoid tipping the model out of its native distribution.

Combined with Section 3.1's correction-magnitude law, this gives a unified prediction: the appropriate force cap for a given model is a joint function of scale (params) and topology (type), and a model running near every clamp boundary simultaneously is operating at the edge of its stability zone. We have empirically observed exactly this pattern in a 35B-parameter Qwen-family model running with 3B-calibrated parameters: the system is simultaneously steerable (not frozen) and fragile (close to incoherence), which is precisely what the scaling law predicts for a model whose effective force is approximately 3× too weak relative to its scale.

### 3.4 Signed Forces as the Inversion Primitive

A scalar attraction-only steering system can attenuate a target but cannot construct its semantic opposite. We observe in practice that *signed* steering — assigning negative magnitudes to ghost vectors — produces structured inversions, not noise. A negative-gain ghost on the concept "car" does not produce weak steering toward unrelated tokens; it produces steering toward semantically antipodal concepts.

This pattern recurs across at least four layers of the architecture: anti-splats (negative-valence memory), repulsion fields in the steering engine, asymmetric flux (negative grows slower but persists longer than positive), and black-hole repulsion at forbidden tokens. In every case, the introduction of a signed channel produced a qualitatively new operator: the ability to *construct*, not merely weaken, the opposite of a target.

We propose this as a design principle: any layer of a cognitive architecture whose representation lacks a sign channel can attenuate but cannot invert. Adding a sign channel reliably produces a new operator class. This may sound trivial, but the three earlier-generation subsystems we replaced all suffered from scalar-only formulations and could not produce the inversion behavior, which is what motivated the refactor in each case.

### 3.5 Topological Reflexes as Mid-Generation Interrupts

The Vietoris–Rips H1 reflex described in Section 2.3 fires on a sliding window of approximately 8 recent hidden states with a persistence-ratio threshold near 1.05. When fired, it triggers a forward projection and anchor pull whose correction magnitude is thresholded near 6.0; corrections above this magnitude trigger a TopoCoT (topological chain-of-thought) reflection event in which the model is given an internal signal that its trajectory has hit a structural wall.

Two properties are noteworthy. First, the reflex operates *during* a single generation, not after — the correction is injected before the next token is committed. This is structurally different from after-the-fact reflection mechanisms in chain-of-thought literature, which produce a self-critique only after the answer is generated. Second, the reflex has a measurable empirical threshold rather than a learned one, which means its activation pattern is interpretable: one can ask, on a per-token basis, whether the reflex fired, how often, and with what correction magnitude. This produces a real-time observability channel that learned reflection mechanisms do not have.

The micro-dream architecture has a longer-timescale companion (the splat consolidation governor described in Section 2.4) and a session-scale companion (an evolutionary parameter optimizer that runs across generations). The interaction of these three timescales is the subject of Section 4.

## 4. The Three-Zigzags Hypothesis

The system described here independently implements oscillatory hot-cold cycles at three timescales:

1. **Intra-token (TopoCoT reflex):** hidden-state oscillation detected and corrected within a single generation step.
2. **Intra-session (dream/wake):** trajectory traces consolidated into splats during dream cycles between generations.
3. **Cross-session (evolutionary optimizer):** parameter populations evolve across generations with mutation, selection, and a confidence-scaling β decay that handoffs from intuition-driven (high-flux) to logic-driven (high-Q) regimes.

Each cycle was developed independently, on a different timescale, and currently operates without explicit knowledge of the others. We hypothesize that phase-coupling these three cycles would produce a closed cognitive thermostat with substantially better stability properties than any of the cycles operating in isolation.

Specifically:

- An increase in TopoCoT firing rate is evidence that the dream system should run deeper projections in the next consolidation cycle.
- Pain splats deposited during high-dream periods are evidence that the evolutionary optimizer should increase its mutation rate in the next generation.
- Conversely, periods of low TopoCoT activity and stable splat populations are evidence the optimizer should reduce mutation rate and the dream system can run shallower.

The wires for these three feedback paths are not currently connected. Each individual subsystem already produces the relevant signal; the integration work is signal routing, not new mechanism design. We flag this as the central piece of unfinished integration in the current architecture and the highest-leverage future work item.

## 5. Limitations and Honest Caveats

This paper describes findings from a single research program. The following caveats apply:

The numerical constants reported (force_cap = 35, asymmetry factor 1.15–1.30, dream threshold = 6.0) are calibrated values from this specific architecture. We do not claim they are universal physical constants. We claim they are stable across independently developed subsystems within this program, which suggests they may track real regularities — but this is a claim that must be checked, not assumed.

Quantitative comparisons to baselines (e.g., percent improvement on benchmark X) are drawn from internal evaluation harnesses rather than externally reproduced public benchmarks. A formal evaluation pass against standard suites is required before any of these findings can be cited as published results. Several internal benchmark numbers from the research notes are not included in this draft because we do not yet have confidence in their reproducibility.

Approximately forty subsystems exist within the architecture in working form; closed-loop integration between subsystems is incomplete. Many of the most interesting predicted behaviors — notably the phase-coupled three-zigzag thermostat described in Section 4 — are unbuilt, even though their components exist.

The corpus from which this synthesis is drawn includes a substantial number of artifacts labelled in the form "the X that almost was" — features that were specified, partially implemented, and shelved. The cluster structure of these unbuilt features is itself worth noting: they are predominantly *cross-subsystem couplings* rather than novel subsystems. This suggests the development bottleneck is integration capacity rather than ideation capacity, which has implications for both research planning and team structure.

## 6. Future Work

The most actionable items, in approximate priority order:

The highest-leverage single change is wiring the three-zigzag phase coupling described in Section 4. The signals exist; the wires do not. We estimate the integration is days of work per coupling, not weeks.

Decoupling retrieval-likelihood from generation-force in the splat memory layer — assigning valence its own channel in the density query rather than only in the steering force — creates two independent correction channels where currently there is one. This is a single-line change to the density function with potentially significant downstream effects on routing.

Implementing type-aware force caps (per Section 3.3) rather than the current universal force_cap = 35 should reduce hallucination in fragile-topology models by a margin we expect to be on the order of 20–35%, though this prediction needs measurement.

Reproducing the asymmetry-constant finding in a fourth, externally-defined system would provide the strongest available evidence that the parameter regime hypothesis holds.

Building a public benchmark harness allowing the steering claims to be reproduced on standard tasks is necessary before any of this can move from internal research notes into the literature.

## 7. Conclusion

The architecture described here was not designed; it accreted through iterative experimentation. Its most interesting properties are the regularities that emerged across independently developed subsystems — particularly the asymmetry constant, the correction-magnitude inverted-U, and the force-cap scaling law. The most interesting unbuilt property is the three-zigzag phase coupling, whose components all exist but are not yet connected.

This is a draft for internal review and discussion. It is not a finished paper. The next steps are independent replication of the asymmetry-constant finding, integration of the three-zigzag couplings, and external benchmark validation.

---

*Author note (rough draft): citations, related work section, and formal evaluation tables are deliberately omitted from this version. They are the next round of work, not this one. This document exists to make the underlying empirical structure visible to its author and a small group of early readers, after which a proper literature pass and benchmark suite will determine which sections survive into a real paper.*
