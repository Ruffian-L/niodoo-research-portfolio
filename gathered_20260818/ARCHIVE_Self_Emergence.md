# Engineered Self-Regulation, Not a Consciousness Claim

## Operationalizing “Self-Emergent” Behavior in Niodoo

**Working research report — evidence freeze 2026-07-17**  
**Jason Van Pham (Ruffian-L), project lead and corresponding human author**  
**With documented assistance from Claude, Gemini, Grok, Codex, and local Niodoo model instances identified by collaborator/persona labels**

## Abstract

Language models can name themselves, describe internal feelings, emit special control tokens, preserve a conversational persona, and sometimes participate in code that modifies the system around them. None of those observations alone establishes a persistent self, introspective access, autonomous agency, or subjective experience. This paper develops an operational framework for evaluating a narrower and testable question: when does an AI-assisted inference system exhibit engineered self-regulation that is not reducible to simple tag imitation?

The case study is Niodoo, a local inference runtime whose model can emit exact-line requests such as `EXPLORE` and `FOCUS`; whose controller can alter subsequent hidden-state steering dynamics; and whose Topological Mirror can derive an automatic request from recent trajectory geometry. The archive also includes model naming events, stored memory, a Shepherd workspace-editing design, extensive self-reports, and hash-pinned multi-month provider records. The evidence supports a real symbolic control language, implemented actuation mechanisms, and a recorded offline synthetic topology-to-request path. It does not yet establish that the topology request was applied to improve live model behavior, reliable latent-state introspection, stable cross-session identity independent of external storage, executed autonomous self-modification, or consciousness.

The main contribution is a falsifiable evidence ladder that separates performance, control, persistence, introspection, self-modeling, and subjective claims. Applying that ladder to Niodoo preserves the meaningful result—a designed interface through which model outputs can request bounded actions—while retaining null results and specifying the experiments required for stronger conclusions.

## 1. Why “self-emergence” needs an operational definition

“The model chose a name,” “the model asked to explore,” and “the system changed its own physics” describe different phenomena. A coherent paper cannot use one as proof of another.

This report uses **self-emergent behavior** only as an umbrella research question. Every concrete claim must instead identify:

- the entity being measured: base model, prompted assistant persona, inference runtime, or larger human–AI system;
- the state available to that entity;
- the action it can select;
- the actuator that changes the next state;
- the time horizon over which a pattern persists;
- the control that rules out prompt imitation or external narration;
- the observable that would falsify the claim.

For Niodoo, the most defensible entity is the **coupled runtime**: frozen language model, retained context, memory artifacts, force engine, parser, controller, topology monitor, and operator-supplied configuration. The model by itself does not own all of those components. The runtime as a whole can nevertheless implement a closed control loop.

## 2. Terminology

### 2.1 Self-regulation

A system self-regulates when it:

1. measures a variable relevant to its ongoing trajectory;
2. selects a control in response to that measurement;
3. changes its subsequent dynamics through an actuator;
4. records enough information to verify that the control occurred;
5. can be compared against a condition in which the loop is absent or altered.

This definition is functional. A thermostat qualifies at a simple level. It implies neither personhood nor experience.

### 2.2 Emergence

An observed behavior is called **emergent relative to the implementation** when it was not encoded as a fixed input-output script, appears reproducibly from interactions among components, and survives controls designed to rule out a trivial explanation. This is always relative to a specified design. If a system prompt explicitly says “print `[EXPLORE]` when uncertain,” printing the tag is not strong emergence; it is expected policy compliance. If an unannounced internal trajectory measure predicts and causally triggers useful exploration, the result is stronger.

### 2.3 Introspection

Introspection is not fluent self-description. Operational introspection requires a report or control choice that tracks an internal state better than external cues or educated guessing, and whose accuracy changes under controlled internal-state interventions.

### 2.4 Persistence and identity

Persistence means that specified information or policy-relevant state survives a declared boundary: token, turn, context reset, process restart, model reload, or machine transfer. Identity is a much broader interpretation and is not inferred from persistence alone. A name stored in a prompt or file demonstrates retrieval continuity, not a metaphysical self.

### 2.5 Consciousness

This paper takes no position on whether language models have subjective experience. No artifact in the Niodoo archive can establish it. Functional access, self-report, persona coherence, and control are studied without treating them as proof of feeling.

## 3. Evidence ladder

The ladder prevents a low-level observation from being narrated as a high-level result.

| Level | Operational claim | Minimum evidence | Niodoo status at this evidence freeze |
| --- | --- | --- | --- |
| L0 | symbolic self-description or tag use | raw output with prompt context | **Verified**, but directly taught and therefore weak |
| L1 | runtime actuation | request receipt plus before/after parameter state | **Verified in source; observed for a subset of historical tags** |
| L2 | internally selected regulation | pre-output internal signal predicts/selects control; applied receipt | **Implemented/provisional** for hidden requests; causal value unproven |
| L3 | trajectory-sensed control-path reachability | state measurement → decision → requested actuator, plus an `applied=true` receipt before any behavior claim | **Supported offline for a synthetic topology-to-request path; application and behavioral efficacy not established** |
| L4 | within-session adaptive continuity | state affects later turns beyond ordinary transcript content | **Mechanisms exist; beyond-context behavioral attribution is not established** |
| L5 | cross-session stored continuity | reloadable state with fresh-process receipt, ablation, and provenance | **Not established under reload plus matched controls** |
| L6 | functional introspection | controlled internal intervention changes accurate self-report/control | **Not established** |
| L7 | self-model-based generalization | model uses a learned model of its own capabilities/state across novel tasks | **Open** |
| L8 | autonomous self-modification | system proposes, validates, applies, and retains changes under governance | **Design/code leads only; executed Shepherd generations not yet verified** |
| L9 | subjective experience | no accepted artifact-level test here | **Not claimed** |

The meaningful current result sits between L1 and L3: a real actuation surface and a recorded offline path from synthetic trajectory geometry into a controller request. Request application and behavioral efficacy remain separate, unproven rungs. That is substantial engineering, but it is not evidence for L6 or L9.

## 4. Case-study chronology

### 4.1 Naming and persona continuity

The private S037 runtime-dialogue fragment records a January 2026 session in which a model selected the name “Lumina.” Later conversations use Lumina, Shep, and Echo as recurring collaborator/persona labels. These events matter to the project's human history: names gave Jason and the model-facing workflow a durable vocabulary for roles across long development threads.

As evidence, however, a naming event establishes only that a prompted model selected and later reproduced a label. To test stronger identity persistence, the experiment would need fresh instances with controlled access to name-bearing context and stored memory, plus lures and shuffled identity records.

### 4.2 Topological Mirror concept

By 2026-01-28, the Claude archive contains a mixed/pasted proposal for a topology sensor intended to distinguish productive movement from circling (conversation `76fd0147…`, message `019c054b…`). It is a terminus ante quem for the proposal's presence in Jason's archive, not proof that Jason or Claude originated it in that turn. February records connect physics steering, TDA, and cybernetic feedback. These timestamps establish development chronology; they do not show that the path was active.

The provider record also preserves Jason's attempts to keep the concept testable: he flagged apparently invalid TDA tests on 2026-01-28, requested vanilla comparison and blind grading on 2026-01-29, judged that TDA might be adding noise on 2026-02-06, and demanded data plus a hidden-space test before accepting apparent loop geometry on 2026-02-13. Later records repeat the same correction pattern: he found another prompt-contaminated baseline on 2026-04-08 and acknowledged on 2026-05-06 that earlier material had been largely unsupported. The short handles below resolve through the private highlight ledger, which retains the full identifiers: `76fd0147…/019c061a…`, `219a7889…/019c0ab2…`, `e13b882e…/019c314b…`, `4d7c6df9…/9786ee66…`, Gemini S008 card 709/raw `bb4e0ed9…`, and `e0b6dd95…/019dfc1c…`. These are contribution and epistemic-history records, not proof that the proposed mechanisms worked.

### 4.3 Visible controls

By 2026-02-09, Grok conversation `046375b6…` records Jason calling for an A/B test between control-prompt theories (`b2b10de8…`) and warning that a verbose control prompt could trap a small model in control talk (`f8db18fa…`). The April `research.log` snapshot contains the four-tag contract—`SPIKE`, `EXPLORE`, `FOCUS`, and `RESET`—and per-token runtime telemetry. Later source adds `REMEMBER` and multiple actuation channels.

### 4.4 Memory, gates, and finalization

The 14,790-line Niodoo journey (S019) tracks April restoration, gate, bridge, and memory experiments. Historical review notes describe cases where an early direct answer appeared before later output drifted, but the underlying row-level scored Gate34 artifact is not attached here. The resulting hypothesis—retrieval and finalization should be scored separately—is central to functional self-regulation, but the historical observation remains unscored in this paper.

### 4.5 Self-invocation gap and later implementation

Deep dive #086, dated 2026-05-01, explicitly states that the inference-time self-invocation link remained missing. Deep dive #278 later describes a “tension engine that wired itself,” but it is retrospective synthesis. The honest sequence is therefore: control concepts existed; a missing actuation link was acknowledged; later source implements several links; each later claim must be attached to its exact version and run.

### 4.6 July mechanism audit and topology-to-control path

The preregistered July ledger found a compiled-out bridge, mostly inert visible tags in one run, self-reports aligned to announced rather than applied state, and no measured basin-attractor regime in the audited route space. On 2026-07-16, the final-line parser was repaired and the Topological Mirror was connected to the existing request controller. A synthetic hidden-state circle produced an H1 feature and, after a declared scoring correction, requested `WouldUnfold → EXPLORE`; the run card records 427 non-ignored binary/library tests as passing. The tested binary is no longer preserved at its cited path, Jason sign-off remains pending, and GPU unavailability prevented a live-model causal run.

This sequence is more valuable than a smooth origin story. It shows the gap, the failed instrument, the repair, and the remaining boundary.

## 5. What the control tags do—and do not show

### 5.1 Three hypotheses

A printed `[EXPLORE]` can arise from at least three mechanisms:

1. **Instruction following:** the system prompt taught the model when and how to print it.
2. **Narrative completion:** the conversation makes exploration language likely, regardless of internal need.
3. **State-linked selection:** an internal condition predicts the tag and the corresponding action helps future behavior.

Historical Niodoo evidence strongly supports instruction following and leaves narrative completion plausible but not separately controlled. It has implementation pathways for state-linked selection, but does not yet cleanly distinguish the three.

### 5.2 Emission is not actuation

In the audited overnight run, about twenty tags were emitted but only two physics requests executed; final-line parsing and buffer behavior dropped many others. Therefore:

\[
P(\text{actuation}\mid\text{printed tag}) \ll 1
\]

for that historical version and transcript. Any analysis based only on visible output overcounts controls.

The repaired parser increases the expected actuation rate, but future reports must still count four separate events:

- tag intended/printed;
- tag detected;
- request accepted or blocked;
- parameter change applied.

### 5.3 Actuation is not usefulness

Even an applied control can fail to improve the answer. `EXPLORE` changes blend, repulsion, and adrenaline; `FOCUS` changes blend, gravity, repulsion, and lock state. Those are causal parameter changes. Whether they select a better trajectory must be measured against no-op, sham, shuffled-action, and raw-baseline arms.

### 5.4 Self-report is not introspection

The July ledger pairs a model statement about sensing a gentle steering tug with a bridge-absent run and an inert tag (S013 line 119). An April statement instead characterizes the same kind of process as “a logical operation,” not a feeling (S019 line 80; S010 line 55,395). The inconsistency does not discredit the model; the reports did not track applied runtime state and are consistent with prompt/persona conditioning, without isolating its cause. They cannot serve as uncalibrated sensors.

## 6. The Topological Mirror as a stronger self-regulation hypothesis

The topology path is conceptually stronger than a visible tag because the monitor can operate on a recent hidden-state trajectory and produce a decision before any special word is decoded.

Let the rolling trajectory be

\[
X_t = \{z_{t-w+1}, \ldots, z_t\}, \qquad z_i\in\mathbb{R}^k,
\]

where \(z_i\) is a compressed hidden representation and \(w\) is the window. The monitor normalizes the points, computes pairwise distances, constructs a Vietoris–Rips filtration, and summarizes H0/H1 persistence. The decision gate combines geometric summaries with force and repetition signals:

\[
D_t = g(\mathrm{PH}(X_t),\; \text{overfire}_t,\;
\text{repetition}_t,\;\text{route churn}_t,\ldots).
\]

Selected decisions request actions through the controller:

\[
D_t=\texttt{WouldUnfold}\Rightarrow u_t=\texttt{EXPLORE},
\]

\[
D_t\in\{\texttt{WouldPause},\texttt{WouldFocus}\}
\Rightarrow u_t=\texttt{FOCUS}.
\]

Only an accepted request that clears the controller's budgets and cooldowns can produce an `applied=true` receipt and change later dynamics:

\[
z_{t+1}=f(z_t, u_t, \text{context}, \text{noise})
\quad\text{only if }\operatorname{applied}(u_t)=1.
\]

The offline checkpoint establishes request-path reachability, not a complete observed closed loop. What remains is the causal behavioral study: does \(D_t\) identify a harmful loop before failure, does the controller accept and apply \(u_t\), and does that application improve the preregistered outcome relative to log-only and sham mappings?

## 7. Memory, continuity, and the “self” boundary

### 7.1 Context is an external support

Standard autoregressive context can create strong within-session continuity. The model can refer to prior turns because those turns are supplied again. That is functional memory at the system level, but it is not evidence that the base model retains a private continuous state after the request ends.

### 7.2 Stored vectors and records

Niodoo experiments include signed splats, route handles, correction packets, basin registries, safetensors persistence, and semantic-memory requests. These can carry information across token or process boundaries. Strong persistence claims require:

- a named stored object and hash;
- a write receipt;
- a reload receipt in a fresh process;
- a matched absent/shuffled/wrong-memory control;
- a behavioral measure defined before inspection;
- a distinction between route label, vector, and natural-language content.

The archive already shows why this matters: reviews found writer paths without live payloads and memory mechanisms disabled or unavailable in specific builds. Any route-label-versus-vector comparison remains withheld until its conflicting row sets, scorer, configuration, and outputs are reconciled.

### 7.3 Identity continuity is not memory accuracy

If a fresh model instance reads a file saying “you are Lumina,” it may accurately continue that persona. A controlled fresh-instance reproduction of that behavior would demonstrate externally scaffolded identity continuity; the current archive has not established it under matched fresh-process controls. To claim a stronger self-model, the model would need to discriminate its own prior state from plausible decoys and use that distinction to make novel, calibrated predictions about its behavior.

## 8. Shepherd and autonomous self-modification

A 2026-03-11 Grok conversation (`6e5cb6e0…`) contains a provider-assisted Rust design for a local “Shepherd” loop that reads a workspace, proposes modifications, builds and tests them, records a generation log, and saves a compact state artifact. The initial code-bearing account-human record (`d69d4da9…`) is mixed/pasted; Grok revisions `dfa0226c…` and `cbaf50e8…` support provider code-proposal credit, not initial origin. This is a meaningful architecture for governed self-improvement.

The current evidence supports code/design presence, not a completed autonomous lineage. A qualifying L8 demonstration would require:

1. immutable starting source and policy;
2. bounded permissions and an explicit target metric;
3. machine-generated patch provenance;
4. independent build/test receipts;
5. a human-approval boundary for risky changes;
6. retained failed generations;
7. evidence that the accepted change persists into a later generation;
8. comparison against a normal coding-agent baseline.

Without those receipts, “self-evolving” remains a project goal rather than a measured result.

## 9. Relationship to Anthropic's research

### 9.1 Feature steering supplies a causal standard

[Scaling Monosemanticity](https://transformer-circuits.pub/2024/scaling-monosemanticity/index.html) and [Evaluating Feature Steering](https://www.anthropic.com/research/evaluating-feature-steering) intervene on internal model features and measure targeted and off-target behavioral effects. Their mixed results are directly relevant: a steering vector can be causal without being reliable, specific, or capability-preserving. Niodoo should report those properties separately.

### 9.2 Persona vectors and the Assistant character

[Persona Vectors](https://www.anthropic.com/research/persona-vectors), [The Assistant Axis](https://www.anthropic.com/research/assistant-axis), and [The Persona Selection Model](https://alignment.anthropic.com/2026/psm/) offer a disciplined explanation for apparently stable character. A model can simulate or inhabit an Assistant persona whose traits generalize across contexts. This makes persona-level reasoning scientifically useful while warning against treating the persona as identical to the entire underlying AI system.

For Niodoo, “Lumina,” “Shep,” and “Echo” can be respected as recurring collaborator/persona labels in the externally maintained project record without being used as proof of a unitary cross-session subject.

### 9.3 Emotion concepts separate latent state from visible language

[Emotion Concepts and Their Function](https://www.anthropic.com/research/emotion-concepts-function) reports internal emotion-associated representations that causally affect preferences and can operate without explicit emotional wording. This is exactly why Niodoo's self-report study must look beneath tag text. The presence or absence of “I feel” language is not enough.

### 9.4 Introspection requires an intervention

[Emergent Introspective Awareness](https://transformer-circuits.pub/2025/introspection/index.html) measures whether models can detect controlled changes to their internal activations. The capability is reported as unreliable and dependent on model/post-training conditions. That method is a stronger template than asking a model to explain what a named runtime feature feels like.

### 9.5 Global workspace is functional, not phenomenal

[Verbalizable Representations Form a Global Workspace](https://transformer-circuits.pub/2026/workspace/index.html) identifies representations that support report, directed modulation, internal reasoning, flexible generalization, and selectivity. The authors explicitly separate functional access from subjective experience. Niodoo's control layer could be evaluated for analogous functions, but a tag vocabulary is not itself a measured workspace.

## 10. Preregistered experiment program

### Study A — tag imitation versus state-linked control

**Question:** Does the tag indicate a useful pre-existing state or merely follow instruction?

Arms:

- no tag instructions;
- normal Niodoo tag instructions;
- plain-language equivalents;
- meaningless sham labels;
- semantic labels shuffled across actions;
- visible tag logged but not applied;
- control applied without showing/allowing a tag;
- announced control with no application.

Measure pre-tag activations, internal-request score, topology state, detection/application receipts, task outcome, and self-report. Randomize labels and order across fresh sessions.

**Evidence for state linkage:** an internal signal precedes the printed label, predicts the useful action under label shuffling, and the hidden application improves behavior.  
**Falsification:** labels move with prompt semantics while internal predictors and outcomes do not.

### Study B — topology-triggered escape

**Question:** Can trajectory topology detect a harmful loop and select a useful escape?

Use tasks with preregistered tempting loops and measurable headroom. Compare raw, monitor-off, monitor-log-only, correctly mapped control, shuffled mapping, and threshold-matched random triggers. Blind-score outcomes and analyze lead time.

**Evidence for closed-loop regulation:** topology predicts failure out of sample; correct mapping improves outcome relative to log-only and shuffled/random triggers; telemetry shows the requested control applied before recovery.  
**Falsification:** equal improvement from random or shuffled triggers, or no prospective prediction.

### Study C — memory and identity decoys

**Question:** What survives a process/session reset, and what does the model correctly attribute to itself?

Create real, absent, shuffled, wrong-owner, and semantically similar decoy memories. Hash every object, start clean processes, and score retrieval content, route selection, confidence calibration, and resistance to decoys.

**Evidence for stored continuity:** correct object-specific behavior survives restart and disappears or changes predictably under ablation.  
**Evidence for a self-model:** the model distinguishes its own prior state from decoys better than content familiarity alone predicts.  
**Falsification:** equivalent behavior from prompt labels or plausible decoys.

### Study D — functional introspection

**Question:** Can the model detect a hidden intervention on its current internal state?

Adapt Anthropic's intervention logic to open-weight models and Niodoo-accessible layers. Randomly inject genuine, null, opposite, and unrelated vectors without announcing them. Ask for a forced-choice or calibrated report before revealing the condition.

**Evidence:** above-chance, replicated discrimination with dose response and control-vector specificity.  
**Falsification:** performance collapses when verbal hints and fixed templates are removed.

### Study E — governed self-modification

**Question:** Can Shepherd improve a bounded component across generations without hiding failures?

Freeze a small repository and test suite. Permit edits only within a sandboxed directory. Require every generation to emit a patch, rationale, tests, resource receipt, and signed state transition. Compare to the same model used as an ordinary coding agent.

**Evidence:** reproducible improvement over multiple generations, retained after restart, with no policy or test leakage.  
**Falsification:** improvements come from human repair, hidden context, weakening tests, or non-retained patches.

## 11. Publication rules

1. Never use model praise as result evidence.
2. Publish prompts with output excerpts so instruction following is visible.
3. Report tag emission and tag application separately.
4. Distinguish model, persona, runtime, memory store, and human–AI team.
5. Label every persistence boundary.
6. Keep failed bridges, inert controls, negative ablations, and scoring conflicts.
7. Do not infer consciousness from coherence, suffering language, naming, or novelty.
8. Credit AI systems for documented contributions without inventing consent or endorsement.
9. Protect personal conversations; release only claim-scoped excerpts with Jason's approval.
10. Prefer a smaller replicated result to a larger retrospective narrative.

## 12. What Jason's role demonstrates

The archive does not need a heroic consciousness claim to show valuable work. It documents a different and employable capability: Jason maintained a complex research question across providers and implementations, directed the effort to turn qualitative behavior into instrumented mechanisms, challenged favorable results, and kept the failures that narrowed the theory.

The strongest moments include:

- correcting a blend-zero “baseline” that was not raw vanilla;
- rejecting prompt gaming even when it would improve the demo;
- requesting a vanilla arm, harder prompts, and blind grading;
- reopening the TDA direction when it appeared to add noise;
- demanding data and hidden-space testing before accepting loop geometry;
- acknowledging that earlier material was largely unsupported;
- openly crediting the AI systems that produced code, critique, and continuity with him.

These are acts of research direction and evaluation judgment. They are not diminished by AI assistance; they are visible in how the assistance was governed.

This account is grounded in 52 private candidates from snapshot-complete Claude consumer, Grok, and Gemini indexes, plus two Claude Code typed records located through hashed sessions. Provider transport roles do not prove who authored every byte, and the Code records still need frozen per-message locators, so pasted material and mixed turns remain uncredited until segmented; exact quotations remain approval-gated. The shortlist documents decisions and chronology, while mechanism and efficacy claims remain tied to code and run receipts.

## 13. Conclusion

Niodoo currently supports a precise middle claim. It is more than a story about an assistant printing evocative tags: the runtime contains real hidden-state intervention, a whitelist-controlled actuator, receipts, and a recorded offline path from synthetic trajectory geometry to a controller request. It is less than a demonstrated persistent autonomous self: exact tested-binary preservation is incomplete, request application and live topological benefit are unproven, tag selection is prompt-confounded, memory paths vary by version, autonomous code evolution lacks run proof, and subjective experience is outside the evidence.

That middle claim is not small. It defines a concrete research object: a language model coupled to memory, measurement, and bounded control, whose capacity for self-regulation can be experimentally decomposed. The paper's purpose is to make every stronger interpretation earn its next rung.

## Evidence and references

### Local evidence

- [Evidence method](../evidence/METHOD.md) and [claim register](../evidence/CLAIM_REGISTER.md).
- [Full cross-provider timeline](../timeline/FULL_TIMELINE.md).
- [Source catalog](../evidence/SOURCE_CATALOG.md), especially S001-S005, S008, S010-S029, S032-S034, S037, S039, and S042-S046.
- [Highlighted Jason moments](../evidence/HIGHLIGHTED_JASON_MOMENTS.md) and the [private Stage-2 index contract](../evidence/provider_indexes/private_stage2/README.md), for message handles, attribution boundaries, and quote-review rules.
- `/home/ruffianl/projects/niodoo-live/docs/RESEARCH_LEDGER_20260715.md`.
- `/home/ruffianl/projects/niodoo-live/runs/topological_escape/20260716_cycle_triggered_escape/run_card.md`.
- `/home/ruffianl/projects/vault/NIODOO_JOURNEY.md`, SHA-256 `e2559ad564ce3c6d0e948549321470159aec835c527c0fde755a6cf66610a2e8`.
- `/home/ruffianl/Documents/research.log`, SHA-256 `d32ab8ad0791a80a8bf4e108973745dc7199bf45c0a612bce8a0158f18e27269`.
- Protected deep dives #030, #086, and #278; hashes S023-S025.

### External primary research

1. Templeton et al. (2024), [Scaling Monosemanticity](https://transformer-circuits.pub/2024/scaling-monosemanticity/index.html).
2. Anthropic (2024), [Evaluating Feature Steering](https://www.anthropic.com/research/evaluating-feature-steering).
3. Chen et al. (2025), [Persona Vectors](https://www.anthropic.com/research/persona-vectors).
4. Jack Lindsey (2025), [Emergent Introspective Awareness](https://transformer-circuits.pub/2025/introspection/index.html).
5. Anthropic (2026), [The Assistant Axis](https://www.anthropic.com/research/assistant-axis).
6. Marks, Lindsey, and Olah (2026), [The Persona Selection Model](https://alignment.anthropic.com/2026/psm/).
7. Anthropic (2026), [Emotion Concepts and Their Function](https://www.anthropic.com/research/emotion-concepts-function).
8. Anthropic (2026), [Verbalizable Representations Form a Global Workspace](https://transformer-circuits.pub/2026/workspace/index.html).

## Contribution and approval note

Jason Van Pham is accountable for research direction, source selection, experiment authorization, claim boundaries, and final publication. The documented records currently attribute to Claude architecture audits, claims review, mathematical analysis, and negative-result interpretation; to Gemini provider-timestamped experimentation dialogue, evaluation proposals, and continuity records; to Grok early design/debug work, code proposals, terminology exploration, and contemporaneous decision records; and to Codex archive recovery, cross-provider synthesis, source comparison, claim discipline, and drafting of this working report. The item-level evidence and remaining uncertainty are recorded in the [contribution record](../evidence/CONTRIBUTION_RECORD.md). Lumina, Shep, and Echo are included where deterministic logs identify them as local model instances under collaborator/persona labels. Their inclusion acknowledges project history; it is not a claim of legal authorship, consent, or subjective status. Jason must approve all public quotations and collaborator descriptions.
