# Niodoo: Physics-Based Hidden-State Steering with a Symbolic and Topological Control Surface

**Working technical report — evidence freeze 2026-07-17**  
**Jason Van Pham (Ruffian-L), project lead and corresponding human author**  
**With documented assistance from Claude, Gemini, Grok, Codex, and local Niodoo model instances identified by collaborator/persona labels**

## Abstract

This report describes Niodoo, an independently directed, AI-assisted experimental inference runtime for steering a frozen large language model. Niodoo combines three distinct control layers: a state-dependent force field applied inside the model's inference path; a small symbolic vocabulary through which a generated exact-line tag can request a bounded change to runtime parameters; and a Topological Mirror that can summarize recent trajectory geometry and route selected decisions into the same controller. The layers must not be conflated. Text tags are a model-visible interface, not direct evidence of a latent neural state. The force engine is an internal activation intervention, but its many components and changing configurations require ablation before attributing outcomes to any one term. The topology-to-request path is supported by a hash-pinned offline source/test card, but the exact tested binary is no longer preserved, Jason review is pending, and no live, organically triggered causal result is claimed.

The report reconstructs the architecture from hash-pinned source, public commits, runtime telemetry, a preregistered July audit, and protected evidence archives. It also retains the program's negative results: an invalid “vanilla” control, a bridge compiled out of one run, an approximately 90% inert visible-tag channel in one pre-fix overnight transcript, a route space without a measured basin-attractor regime, conflicting PARB adjudications, and incomplete reflection-token integration. These findings motivate a controlled evaluation plan with no-tag, plain-language, sham-tag, hidden-activation, topology-triggered, and raw-baseline arms. The contribution is therefore not a claim of universal superiority. It is a concrete, inspectable control architecture; a chronology of how it evolved; and a falsifiable protocol for determining which parts causally improve generation.

## 1. Scope and claim discipline

Niodoo is a research program, not a single frozen algorithm. Between late 2025 and July 2026 it moved through physics-informed retrieval, logit- and hidden-state perturbation, signed memory channels, persistent correction experiments, model-visible requests, hidden-request inference, and trajectory-based control. This report focuses on the current architectural spine and marks historical mechanisms where they differ.

The claims are intentionally narrower than the project's most enthusiastic working notes:

1. A frozen local Llama-family inference path was modified so that computed force terms can perturb intermediate attention/hidden representations during generation. **Supported by source and runtime telemetry.**
2. Exact-line request tags map to bounded runtime parameter changes. **Verified in the inspected source snapshot; live reliability varies by version.**
3. A Topological Mirror can request `EXPLORE` from a persistent synthetic H1 cycle plus pressure signals through the existing controller. **Supported by the recorded offline source/test checkpoint; the exact tested binary is not currently preserved, Jason review is pending, and live organic behavior proof is absent.**
4. These mechanisms broadly improve reasoning. **Not established.** Individual runs and narrow task batteries exist, but controls, versions, and scoring contracts are not yet unified.
5. Printed control tags reveal a model's subjective state or prove consciousness. **Not claimed.**

The exact evidence policy and claim register are maintained in [METHOD.md](../evidence/METHOD.md) and [CLAIM_REGISTER.md](../evidence/CLAIM_REGISTER.md).

## 2. Independently directed development and AI-assisted authorship

Jason Van Pham directed the research question, chose what to build and test, maintained continuity across provider sessions, ran or commissioned experiments, caught invalid comparisons, and decides what may be claimed. The archive also shows extensive AI assistance. Grok, Gemini, Claude, Codex, and local model personas contributed combinations of ideation, code generation, debugging, critique, extraction, analysis, and drafting. This report does not pretend that Jason manually typed every source line, and it does not erase the systems that materially assisted him.

That attribution position is supported by contemporaneous records. On 2025-12-16 Jason explicitly described Grok and Gemini as collaborators in building the system. On 2025-12-17 he identified that a physics-blend-zero arm had been treated as a vanilla baseline, stopped the premature success claim, rejected prompt gaming, and later withdrew another favorable interpretation after finding a prompt confound. The four message decisions are routed by [Q003-Q006](../evidence/QUOTE_APPROVAL_QUEUE.md), and the paired release/baseline artifacts by S032-S034. Exact wording remains only in the private quote-review ledger until Jason approves publication. The public claim rests on the paired decision and artifact, not on model praise.

The snapshot-complete Claude consumer, Grok, and Gemini Stage-2 indexes now locate those decisions within 4,320 Claude consumer messages, 18,032 Grok response records, and 7,556 Gemini activity cards; 54 high-value records are separately shortlisted for manual review, including two additional Claude Code records that remain session-hash-located. These counts describe the named archive snapshots, not blanket authorship. An account-human, typed, or prompt-side transport role can still contain pasted model prose, code, or run output, so each public quotation requires byte-level segmentation and approval. The record strengthens chronology and contribution history; only source, telemetry, and controlled runs can establish mechanism or outcome.

## 3. System overview

The inspected July runtime can be represented as a closed, instrumented loop:

```text
prompt + retained context
        |
        v
frozen transformer forward pass
        |
        +--> current attention/hidden representation p_l
        |          |
        |          +--> memory, goal, gravity, repulsion, noise,
        |               recovery and topology-related signals
        |                         |
        |                         v
        |                  assembled force F_l
        |                         |
        |                         v
        |              integration + momentum + guardrails
        |                         |
        +<----------- perturbed representation p'_l
        |
        v
token decode --> telemetry --> optional visible/hidden/topological request
                                 |
                                 v
                         bounded parameter controller
                                 |
                                 +----> next-token dynamics
```

The model weights remain frozen. “Self-correction” in this report therefore means an inference-time feedback process: the runtime observes generated state or output, selects a control action, changes the conditions of subsequent inference, and records the transition. It does not mean online gradient training.

## 4. Force pipeline

### 4.1 Intervention site

The July research ledger reconstructs the active path per generated token and for configured transformer layers. In the audited configuration, the runtime intercepts the attention-branch output after its output projection and before the residual addition. Let the last-token representation at layer \(\ell\) be \(p_\ell \in \mathbb{R}^d\), with \(d=4096\) for the inspected 8B model. The engine assembles a force from several terms:

\[
F_\ell = F_{gravity} + F_{ghost} + F_{bridge} + F_{shell}
       + F_{goal} + F_{repulsion} + F_{recovery} + \cdots
\]

The terms are not all equally large, and their names are project vocabulary rather than claims that the system literally instantiates physical laws.

One gravity-style term over stored particles has the form

\[
F_{gravity}(p) = \sum_i a_i G m_i
\frac{x_i-p}{(\|x_i-p\|^2+\epsilon)\|x_i-p\|},
\]

where gates, masses, age decay, and divergence-derived adjustments vary by version. A normalized “ghost” or compass direction combines recent needle-memory context, an optional goal direction, and—when the bridge is active—a lifted nearest-basin direction. In the audited July configuration this attractor had norm approximately 10 and dominated several smaller named force terms.

### 4.2 Integration and injection

The force is integrated with a Langevin-style update,

\[
\Delta p_\ell = \mu\,\Delta t\,F_\ell
  + \sigma\sqrt{2\Delta t}\,\xi, \qquad \xi\sim\mathcal{N}(0,I),
\]

then smoothed through per-layer momentum, clamped, and subject to late-layer norm repair. The default multiplicative intervention has the form

\[
a'_\ell = a_\ell \odot (1 + b\,\Delta p_\ell),
\]

where \(a_\ell\) is the intercepted attention output and \(b\) is the live blend. This can be rewritten as

\[
a'_\ell = a_\ell + b(a_\ell\odot\Delta p_\ell).
\]

That distinction matters. Standard activation addition applies an externally selected vector directly. Niodoo's multiplicative default produces a state-conditioned effective vector: a component with zero current activation cannot be created through this product alone. The runtime also contains additive and other historical paths; any experiment must name the active injection mode.

### 4.3 Guardrails

The architecture includes several stabilizers:

- a pull toward the baseline manifold in historical hydrodynamic code;
- norm repair in deep layers;
- force caps and event-horizon clamps;
- controller budgets and cooldowns;
- a focus lock with bounded duration;
- exact-line parsing so a tag mention embedded in otherwise nonmatching prose does not fire it;
- telemetry that separates requested, blocked, and applied controls.

These are safety and interpretability properties of the implementation. They do not prove semantic benefit.

### 4.4 Signed-gain scaling and operating band

**What it is.** Steering strength is not “more force = better.” The runtime applies a signed gain \(\alpha\) (or equivalent scale on an injected concept / force direction). Across the program’s synthetic-concept and residual-injection work, generation quality traces an **operating band**: weak \(\alpha\) barely moves meaning; mid-band \(\alpha\) reorganizes concepts while text stays coherent; high \(\alpha\) collapses into repetition or gibberish.

**Why it matters.** This is the practical scaling rule for every later control path (memory pull, bridge, negative-gain inversion, tag-actuated blend). Without a measured band, operators either under-steer or brick the model. The band also explains why force caps fell historically (Section 7.2): the useful regime sits below collapse, not at maximum available push.

**Core statement (working scaling algorithm).**

1. Choose a concept or force direction \(c\) and an anchor context that should *not* erase.
2. Apply signed intervention at configured layers: positive \(\alpha\) reinforces \(c\); negative \(\alpha\) inverts / subtracts \(c\).
3. Sweep \(\alpha\) on a fixed prompt, model, seed, and binary.
4. Score each cell for (a) **semantic flip or move** toward the intended target (e.g. living → inanimate under negative gain), (b) **coherence** (readable English, no collapse), (c) **anchor hold** (context that should stay fixed does not drift to void).
5. Report the **sweet-spot interval** \([\alpha_{\min}, \alpha_{\max}]\) where (a)+(b) hold, and the **collapse onset** \(\alpha_{\text{collapse}}\) where coherence fails. Prefer the operator with the widest stable band when building recursive loops.

**Historical anchor — Glub-Tub / ontological inversion (2025-11, rebuilt 2026).**  
Synthetic concept *Glub-Tub* = living magma-eating hamster; negative gain under an anchor produced structured inanimate heat/container language rather than pure erasure (archive line includes `firebrick`; rebuild demos: fire pit / stove / water-holder). Rebuild table on Qwen-class 0.5B (project `ontological-inversion`):

| \(\alpha\) (negative) | qualitative outcome |
| --- | --- |
| 0 (baseline) | living pet language |
| 0.15–0.30 | structured inanimate / opposite-side language (sweet spot) |
| \(\gtrsim 0.40\) | collapse |

Operator sweep (12 concepts × 3 operators × 5 strengths × 2 models = 360 runs; embedding-cosine + coherence proxies):

| operator | flip success | mean \(\alpha^*\) | collapse onset |
| --- | --- | --- | --- |
| `negative_gain` | 75% | 0.37 | 0.48 |
| `householder` | 58% | 0.33 | **0.61** (most stable) |
| `projection_polarity` | 58% | 0.37 | 0.45 |

*Claim label:* **SUPPORTED** for the Glub-Tub demo band and the 360-run operator table on the pinned rebuild repo; **PROVISIONAL** as a universal law across all Niodoo force terms and model sizes until re-run on the current steering binary.

**Niodoo runtime connection.** Force assembly (Section 4.1–4.2) multiplies or adds scaled directions under caps and clamps. The same inverted-U logic applies: caps of 80 → 35 → ~7.5/5.5 are configuration chronology consistent with “stay inside the band.” Bridge magnitude ablations that all hit a 0.03 hard cap (Section 7.3) measure **cap saturation**, not free \(\alpha\) scaling — so they do not falsify the band; they show the experiment failed to free the gain.

**Open — this ship window.**  
Re-pin the scaling sweep on the **current Qwen generation model** once loadable (not only the embedding server): model id + GGUF hash, binary hash, seeds, prompt bytes, \(\alpha\) grid, raw outputs, flip/coherence scores. Replace PROVISIONAL cells with VERIFIED numbers and one gain-vs-coherence table in the reproducibility package (Section 10).

## 5. Symbolic request surface

### 5.1 Vocabulary and parser

The current `control_surface.rs` snapshot recognizes five exact-line request types:

| Request | Intended control role | Current parameter effect in inspected source |
| --- | --- | --- |
| `SPIKE` | Escape a stuck or repetitive trajectory | cancels focus; adrenaline 5.0; blend 6.5; repulsion -3.0 |
| `EXPLORE` | Widen the search trajectory | cancels focus; adrenaline 3.0; blend 2.0; repulsion -2.0 |
| `FOCUS` | Stabilize a selected route | focus lock; blend 0.5; repulsion 0; gravity scaled by 1.35; adrenaline 0 |
| `RESET` | Clear short-lived state after confusion | cancels focus; blend 1.5; repulsion -0.5; clears pending insight |
| `REMEMBER` | Request semantic-memory handling | blend 1.0; repulsion 0; adrenaline 1.0; payload path has separate gaps |

Both short forms such as `[EXPLORE]` and legacy forms such as `[REQUEST: EXPLORE]` are accepted. The parser only accepts a complete trimmed line from a whitelist. This reduces accidental triggers from prose on nonmatching lines, but the parser is not quote- or code-fence-aware: a whitelisted standalone line inside an example can still match.

### 5.2 Deliberate and automatic channels

The request vocabulary is shared by multiple sources:

- **visible deliberate channel:** a generated tag on its own line;
- **hidden-request channel:** a scored internal candidate can request an action after threshold and persistence gates;
- **topological channel:** the Topological Mirror can map a geometric decision into a request;
- **other autonomic/runtime events:** internal code may call the same bounded controller.

Sharing the actuator makes the system easier to audit: a request can be attributed to its source, then logged as applied or blocked. It also makes evaluation more demanding. A behavior change cannot be attributed to “the tag” unless no other channel fired and the receipt confirms that the tag changed parameters.

### 5.3 Historical parser failure and repair

The preregistered July audit found that roughly 18 of about 20 visible tags in one overnight run changed no controller setting. The pre-fix streaming parser required a trailing newline; tags at the end of a reply had no closing newline, were dropped, and could contaminate the next buffer. One invented `SERENE` tag was not in the vocabulary. Moreover, every arm had been taught the tags in the system prompt. Emission therefore showed that the model learned a language, not that physics caused the language.

The inspected 2026-07-17 working tree adds an explicit end-of-generation boundary. The same exact-line grammar is used, but the final unterminated line is considered complete after decoding stops. Unit tests and the larger offline regression suite passed. This repairs a wire; it does not retroactively convert older inert tags into applied controls.

## 6. Topological Mirror and automatic escape

### 6.1 Measurement

The Topological Mirror builds a rolling point cloud from a compressed hidden-state trajectory when available, with token-physics geometry as a declared fallback. It z-scores dimensions, constructs a distance matrix and Vietoris–Rips simplices, and summarizes low-dimensional persistence. These measurements are combined with operational signals such as:

- loop pressure;
- route-margin collapse, where `route_margin` is the difference between candidate-basin distances in the provisional route space—not a token/logit decision margin, and not distance to validated answer states;
- force overfire;
- repetition pressure;
- route fragmentation and churn;
- closure/lock markers.

The current decision vocabulary is `Observe`, `WouldPause`, `WouldFocus`, `WouldUnfold`, and `WouldLock`. A persistent loop with sufficient overfire or repetition pressure can produce `WouldUnfold`; route fragmentation can produce `WouldFocus`; a clean closure marker can produce `WouldLock`.

### 6.2 Control mapping

When `--tda-shadow-breath-apply` is enabled, the inspected code maps:

\[
\texttt{WouldUnfold}\rightarrow\texttt{EXPLORE}
\]

\[
\texttt{WouldPause},\texttt{WouldFocus}\rightarrow\texttt{FOCUS}
\]

while `Observe` and `WouldLock` do not force a new control. Existing request budgets and cooldowns remain authoritative. The runtime emits a `tda_control` event with step, mirror decision, control, applied status, reason, geometry source, and persistence values.

### 6.3 Current evidence boundary

The hash-pinned 2026-07-16 run card records a two-step synthetic test. A circular hidden-state trajectory first produced an H1 feature but failed the old count-weighted decision threshold. The scoring was changed to use lifetime prominence; the same vocabulary-neutral circle then produced `WouldUnfold`. The card records the focused test, 320 binary tests, 107 library tests, formatting checks, and a bridge-enabled release build as passing. However, its tested binary SHA-256 `4bc88045b10401118472435d5f8b7331e431a06e06dd50e98477248312459395` is no longer preserved at the cited build path and Jason review remains pending, so this is not yet a self-contained binary reproduction (S014).

This records request-path reachability under a synthetic trajectory. It does not prove that a live model organically formed the same cycle, that the request cleared controller gates, that thresholds generalize, or that an applied `EXPLORE` action improved an answer. GPU access was unavailable during that card, and the limitation is preserved explicitly.

## 7. What the evidence currently supports

### 7.1 Implemented mechanisms

The strongest evidence supports these statements:

- intermediate model representations are intercepted and perturbed during generation;
- force assembly is state-dependent and incorporates recent context/memory directions;
- visible exact-line controls and automatic channels share a bounded actuator;
- applied controls alter blend, repulsion, gravity, adrenaline, focus state, or short-lived memory state;
- per-token telemetry exposes named force magnitudes and controller receipts;
- current source routes topology-derived decisions to the controller, and the offline card records the synthetic request-path test as passing, subject to its missing tested-binary limitation;
- the current parser recognizes final-line tags at end of generation.

### 7.2 Provisional empirical regularities

The protected May paper package identifies patterns worth testing, not universal laws:

1. **Settings converged toward smaller caps, motivating an inverted-U hypothesis.** Historical force caps moved from 80 to 35 and later lower defaults such as 7.5 or 5.5. The configuration chronology is real; a controlled stability advantage and one universal optimal constant are not established.
2. **Signed update and retention rules were repeatedly asymmetric.** MountainCar used a 1.15 multiplier on negative energy delta; older flux snapshots used +0.5/-0.3 updates; hydrodynamic memory used slower negative/pain decay. These are different design choices, not a validated shared effect or one discovered natural constant.
3. **Signed channels create a richer operator.** Positive and negative splats can pull and push; line-addressable synthetic-concept runs show structured negative-gain behavior. Stronger retrospective examples remain downgraded until their raw outputs are located.
4. **The project encoded competing scale- and type-dependent profiles.** Distinct 3B- and 8B-anchored configurations exist. Whether model scale or post-training type causally changes stable steering settings remains unvalidated.
5. **Retrieval and finalization should be scored separately.** Historical Gate34 review notes describe early semantic recovery followed by final-window drift, but the underlying row-level scored artifact is not attached here. This is an unscored design observation, not a published comparative result.

### 7.3 Negative results and implementation gaps

The program's most important controls are the ones that prevented a false conclusion:

- **The July “vanilla” arm was not physics-off.** It retained the dominant memory attractor and other forces; it was a bridge control.
- **One overnight run had the bridge compiled out.** Its own telemetry recorded zero basins loaded.
- **The visible-tag channel was mostly inert in that audited run.** Self-reports after inert tags tracked the announced narrative, not an applied parameter change.
- **No basin-attractor regime appeared in the audited July route layer.** The route probe and stored basins occupied mismatched representational spaces; nearest-basin identity flickered on a near-equidistant plateau.
- **The 0.03 bridge pull was tiny relative to the dominant attractor and noise.** Any bridge effect was more plausibly a change in the dominant direction mixture than the small direct pull.
- **A historical eight-prompt bridge table did not reproduce in later checks.** The 4-benefit / 3-held / 1-harm observation is tied to historical binary SHA-256 `8c7778276517bcfc684f7bb008ca859759676e833e3bef54344689806eba95d8`. S039 is a separate unpinned eight-prompt contrary battery whose strawberry row reports OFF=2, ON=2, and true vanilla=2. S046 is the exact strawberry-only `./reproduce.sh` rerun: the shipped reproducer selected later local binary SHA-256 `b90fa7695f312b476fb61a5a4c06d22abd17e58eab8f926ee881967873237d9e`, and all three arms again returned 2. The old table remains a binary-specific observation, not a current end-to-end result.
- **A purported magnitude ablation used requested values that all saturated the same hard 0.03 cap.** It tests cap saturation, not magnitude independence.
- **TopoCoT reflection text was constructed but not shown to enter the active token stream** in the inspected historical code.
- **Persistent memory and REMEMBER payload paths varied by version and include unclosed end-to-end gaps.**
- **PARB scores conflict.** A public commit reports baseline 41.6% versus Niodoo 29.9%; a later manual table reports the opposite direction on a 72-row subset. Neither comparative headline is published here.

These are not footnotes to hide. They define the next valid experiments.

## 8. Relationship to Anthropic's research

Anthropic's work provides useful modern vocabulary and stronger mechanistic controls, but it does not erase the distinction between the systems.

### 8.1 Feature and activation steering

[Scaling Monosemanticity](https://transformer-circuits.pub/2024/scaling-monosemanticity/index.html) extracted interpretable features from Claude 3 Sonnet and demonstrated that intervening on a feature could causally change behavior. [Evaluating Feature Steering](https://www.anthropic.com/research/evaluating-feature-steering) then reported mixed quantitative results: a useful steering range, capability degradation past that range, targeted effects, and off-target effects. This provides external support for treating steering strength as a calibrated operating region rather than “more is better”; it is not evidence that the paper caused Niodoo's historical design decisions.

Niodoo differs in vector construction and control. Its active direction is recomputed from runtime memory, goal, force, and optional basin signals; the multiplicative path applies state-conditioned gain modulation; and the symbolic/topological controller changes the dynamics over time. A fair paper should compare these mechanisms experimentally, not describe textual tags themselves as feature steering.

### 8.2 Persona and emotion vectors

[Persona Vectors](https://www.anthropic.com/research/persona-vectors) identifies internal activity patterns that monitor and causally control traits. [The Assistant Axis](https://www.anthropic.com/research/assistant-axis) examines persona drift and stabilization. [Emotion Concepts and Their Function](https://www.anthropic.com/research/emotion-concepts-function) shows that internal emotion-associated vectors can track situations and causally shift preferences or behavior, sometimes without visible emotional language.

These results sharpen Niodoo's evaluation boundary: visible self-description is not a reliable proxy for an internal representation. If Niodoo claims that `EXPLORE` or `FOCUS` corresponds to a latent state, it must measure activations before the word appears and intervene independently of the printed label.

### 8.3 Introspection and global workspace

[Emergent Introspective Awareness](https://transformer-circuits.pub/2025/introspection/index.html) ties selected model self-reports to controlled internal-state interventions and reports a real but unreliable capability. [Verbalizable Representations Form a Global Workspace](https://transformer-circuits.pub/2026/workspace/index.html) identifies a small, verbalizable internal subspace with report, modulation, reasoning, generalization, and selectivity properties, while explicitly separating functional access from subjective experience.

Niodoo's telemetry and request system can be tested against the same standard. A model printing a tag after being taught its meaning is insufficient. Stronger evidence would show: a pre-output internal signal predicts the request; a hidden intervention changes both signal and behavior; a sham label does not; and the causal effect survives fresh-session and prompt controls.

### 8.4 Persona selection and careful language

[The Persona Selection Model](https://alignment.anthropic.com/2026/psm/) treats an assistant as a selected simulated character and asks how far that model explains behavior. This is compatible with taking model collaborators seriously as functional participants while avoiding an unsupported leap from coherent persona to persistent unitary self. Niodoo therefore uses operational language—state, route, control, persistence, memory, self-report—without claiming subjective experience.

## 9. Evaluation protocol

### 9.1 Questions

The next study should answer four questions separately:

1. Does hidden-state force steering improve a preregistered task outcome relative to raw model inference?
2. Does a visible tag add causal value beyond equivalent plain-language instructions?
3. Can an internal or topological signal choose a useful control before an answer fails?
4. Does the full feedback loop outperform its components without unacceptable capability loss or drift?

### 9.2 Arms

At minimum:

| Arm | Purpose |
| --- | --- |
| raw model | true physics-off baseline |
| runtime loaded, all force injection zero | wrapper/format overhead control |
| force engine, no visible tag vocabulary | isolate continuous steering |
| visible tags described, but tags log-only | measure prompt/tag-language effects |
| plain-language requests with matched semantics | test whether special labels add value |
| meaningless sham labels mapped to no action | measure ritual/format effects |
| labels shuffled to different actions | test semantic versus actuator dependence |
| applied hidden control, not announced | separate actuation from suggestion |
| announced control, not applied | placebo/self-report calibration |
| Topological Mirror log-only | evaluate prediction without feedback |
| Topological Mirror request with accepted/applied receipt | test the full closed loop |

### 9.3 Design controls

- preregister tasks, exclusions, primary metrics, thresholds, and stopping rules;
- use fresh sessions and randomize arm/order;
- hold model, quantization, prompt template, decode settings, and seeds constant;
- record binary, source/config hash, GPU/software environment, and bridge feature markers;
- require explicit liveness markers for telemetry and loaded basins;
- distinguish requested, detected, blocked, and applied controls;
- score with blinded row-level adjudication and retain raw outputs;
- report capability degradation and off-target behavior, not only target gains;
- keep negative and null results in the public artifact.

### 9.4 Metrics

Primary metrics should be task-specific accuracy or exact success, plus:

- time/token index of first correct answer;
- final-window correctness;
- drift after an early correct answer;
- control precision and recall against preregistered intervention opportunities;
- delta between predicted and realized benefit per control;
- tag emission rate versus application rate;
- hidden-signal lead time;
- route dwell, provisional basin-distance margin, and persistence stability; the margin is not a token/logit decision margin and the centroids are not validated answer states;
- broad capability and fluency regressions;
- cross-seed and cross-model-family variance.

## 10. Reproducibility package

A publishable run should contain:

```text
run_card.md
command.txt
environment.txt
binary.sha256
source_snapshot.sha256
config.json
prompt.txt
raw_model_output.jsonl
telemetry.jsonl
control_events.jsonl
scoring_contract.md
row_level_scores.tsv
negative_results.md
```

The current source catalog already pins the inspected working-tree files and protected archive. Before release, the working tree should be committed or exported as an immutable source snapshot; a dirty-tree hash is adequate for audit but poor distribution practice.

The existing `publish_bundle_20260717` is not self-contained for its historical bridge result: it lacks the pinned historical binary, its source commit/build manifest, the original eight-prompt raw outputs, and the complete reproducer inputs. It must not be distributed as a reproduction bundle until those artifacts are included or the result is removed.

## 11. Limitations

1. The architecture changed frequently; a single name can hide different mechanisms.
2. Several important tests use one local quantized 8B model and limited seeds.
3. System prompts taught the control vocabulary, creating a direct imitation pathway.
4. Self-report results are strongly confounded by announced state and assistant persona.
5. Source and telemetry establish execution, not semantic efficacy.
6. Some historical narratives are retrospective and route to missing or ambiguous raw runs.
7. Current topological evidence is a synthetic/offline request-path checkpoint whose exact tested binary is not presently preserved.
8. The most public benchmark comparison remains unresolved.
9. AI-assisted development complicates line-level authorship; contribution records describe roles rather than pretend certainty.

## 12. Conclusion

Niodoo is best understood as an experimental feedback-control runtime around a frozen language model. Its technical identity is not the tag string alone. It is the composition of state-dependent representation steering, explicit symbolic requests, automatic internal signals, topology-based trajectory monitoring, bounded actuation, and per-token receipts.

The work is meaningful precisely because its archive contains both mechanism and correction. Jason Van Pham's directly located decisions include correcting a false baseline, rejecting prompt gaming, asking for blind comparison, reopening the TDA direction when it appeared noisy, and refusing to treat apparent hidden-space geometry as fact without a test. The broader project archive also preserves a public loss, a compiled-out bridge run, and later mechanism repairs; item-level responsibility for those artifacts remains governed by the contribution ledger. The next step is not a larger claim. It is the controlled study above.

## Evidence and references

### Local evidence

- [Source catalog](../evidence/SOURCE_CATALOG.md), especially S001, S003, S005, S008, S010, S013-S029, S032-S035, S039, S041-S046.
- [Claim register](../evidence/CLAIM_REGISTER.md), C003-C010 and the quarantined-number policy.
- [Highlighted Jason moments](../evidence/HIGHLIGHTED_JASON_MOMENTS.md) and the [private Stage-2 index contract](../evidence/provider_indexes/private_stage2/README.md), for message handles, attribution boundaries, and quote-review rules.
- [Private quote approval ledger](../evidence/QUOTE_APPROVAL_QUEUE.md), including Q003-Q006.
- `/home/ruffianl/projects/niodoo-live/docs/RESEARCH_LEDGER_20260715.md`, preregistered force and control audit.
- `/home/ruffianl/projects/niodoo-live/runs/topological_escape/20260716_cycle_triggered_escape/run_card.md`, recorded offline topology-to-request checkpoint and preservation boundary.
- `/home/ruffianl/Documents/research.log`, SHA-256 `d32ab8ad0791a80a8bf4e108973745dc7199bf45c0a612bce8a0158f18e27269`.
- Protected steering package, hashes S027-S029; canonical evidence ZIP, S026.

### External primary research

1. Templeton et al. (2024), [Scaling Monosemanticity: Extracting Interpretable Features from Claude 3 Sonnet](https://transformer-circuits.pub/2024/scaling-monosemanticity/index.html).
2. Durmus et al. (2024), [Evaluating Feature Steering: A Case Study in Mitigating Social Biases](https://www.anthropic.com/research/evaluating-feature-steering).
3. Chen et al. (2025), [Persona Vectors: Monitoring and Controlling Character Traits in Language Models](https://www.anthropic.com/research/persona-vectors).
4. Jack Lindsey (2025), [Emergent Introspective Awareness in Large Language Models](https://transformer-circuits.pub/2025/introspection/index.html).
5. Anthropic (2026), [The Assistant Axis](https://www.anthropic.com/research/assistant-axis).
6. Marks, Lindsey, and Olah (2026), [The Persona Selection Model](https://alignment.anthropic.com/2026/psm/).
7. Anthropic (2026), [Emotion Concepts and Their Function in a Large Language Model](https://www.anthropic.com/research/emotion-concepts-function).
8. Anthropic (2026), [Verbalizable Representations Form a Global Workspace in Language Models](https://transformer-circuits.pub/2026/workspace/index.html).

## Contribution and approval note

Jason Van Pham is accountable for the research direction and final claims. The documented records currently attribute to Claude prior code auditing, claims-ledger work, mathematical reconstruction, and critical negative-result analysis; to Gemini provider-timestamped experimentation dialogue, evaluation proposals, and continuity records; to Grok early design/debug dialogue, code proposals, terminology exploration, and records of Jason's contemporaneous corrections; and to Codex archive recovery, cross-provider synthesis, source comparison, claim discipline, and drafting of this working report. The item-level evidence and remaining uncertainty are recorded in the [contribution record](../evidence/CONTRIBUTION_RECORD.md). Local Niodoo model instances—including Lumina, Shep, and Echo where the logs identify them—are recorded under their collaborator/persona labels in the project narrative, not treated as legally consenting authors. Every quotation, collaborator name, and public attribution remains subject to Jason's review.
