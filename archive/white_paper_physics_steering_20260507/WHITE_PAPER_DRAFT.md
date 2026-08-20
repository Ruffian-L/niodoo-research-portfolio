# Physics-Based Steering of Large Language Model Hidden States

## Five Provisional Empirical Regularities and an Integration Roadmap

Draft evidence pass: 2026-05-07. Internal review only.

## Abstract

This paper describes a family of local experiments that steer large language model generation by operating on hidden states rather than only on logits. The strongest artifacts support an implemented hidden-state steering path, signed positive/negative steering channels, micro-dream correction, topological reflex detection, and multiple memory/retrieval experiments. They also support several quantitative regularities inside this research program: gentler correction often performs better than stronger correction; negative outcomes are weighted or retained more heavily than positive outcomes in at least two independent systems; and steering constants appear to depend on model scale and model type.

The evidence does not yet support presenting these as universal laws. Several constants conflict across versions. In particular, `force_cap = 35` is a historical stabilization point rather than the current universal setting; VR-H1 threshold `1.05` is documented as an example while active wiring uses `2.0`; and public benchmark-style PARB claims remain contested across artifacts. Manual row checks found real Niodoo-helped examples, baseline false negatives in the positive rescore, visible baseline-better examples in the later multi-seed artifact, and judge/API failures in the Grok-judged fields. The correct posture is therefore: strong internal empirical program, real implemented mechanisms, provisional regularities, and a clear replication/integration roadmap.

## 1. Architecture

The central implementation moves steering from logit space into hidden-state space. The active hydrodynamic path exposes hidden states before the language-model head, steers that state, then projects the result back through the model head. The copied active code includes Llama and Gemma hidden-state APIs, the generation path using `forward_with_hidden`, and a Niodoo steering engine that sums gradient, splat, and goal forces before clamping by `force_cap` and integrating the result [1][2].

Two guardrails matter. First, active generation applies a manifold pullback toward the baseline hidden state [3]. Second, the steered hidden state is renormalized toward the baseline norm [2]. These are implementation-level evidence for the draft's claim that the system is not merely biasing token probabilities; it is perturbing the dense residual representation while trying to remain near the model's native manifold.

Memory is represented through signed splats. Positive splats pull; negative splats push [9]. A separate team-build runtime contains explicit `ghost_vectors` and `anti_ghost_vectors` fields and add methods, but the inspected `inject_ghost_sequence` path is a no-op in that file, so it should be cited as representation evidence rather than complete active injection evidence [10]. Raw Grok/chat artifacts and code extracts contain the signed-gain experiments behind the Glub-Tub/Glub-Glub inversion story, with the line-addressable extract supporting negative-gain drift toward refusal/inanimate concepts such as `firebrick`; stronger `Bathtub`/`Heater` wording appears only in prose summaries in this package [11][12].

## 2. Regularity One: Gentler Correction Often Wins

The correction-magnitude evidence comes from several imperfect but convergent places. First, the hydrodynamic archive records force-cap chronology across `80`, `35`, `8`, `5`, `7.5`, and `5.5`, with later prose arguing that `80` was too aggressive and `35` was a stabilization point [4]. Second, one M9 guide reports that the gentler `baseline_60` protocol reached `80%` mint-ready outcomes, but other copied TEDE artifacts conflict with that broad success framing [5]. Third, a consensus TEDE result records only `13` total corrections with an ultra-gentle strategy weight around `0.62`, but that copied JSON is partial/truncated and should be treated as narrow evidence for corrections and weights only [5].

The revised claim should be narrow: within this archive, several independent systems converged toward smaller-than-intuitive correction magnitudes. That supports an inverted-U hypothesis. It does not yet prove a dimensional scaling law for every representation space. It is also important that `35` is not the current final value. Later hydrodynamic defaults/configs show `7.5` and `5.5`, so the paper should describe a chronology rather than a single universal constant [4].

## 3. Regularity Two: Negative Signals Are Heavier, Slower, Or More Consequential

The cleanest asymmetry artifact is MountainCar. The active agent multiplies negative `energy_delta` by `1.15`, and the champion snapshot applies the same factor [6]. Hydrodynamic splat memory independently slows negative/pain decay with a `0.7` factor [7]. A second-pass search also confirmed the exact `+0.5 / -0.3` MountainCar flux pair in older momentum snapshots: high-energy states add positive flux, while low-energy states subtract negative flux [8a].

This improves the original draft, but it also changes the correct interpretation. The invariant is not that every mechanism collapses to a single `1.2x` scalar. The stronger finding is that negative signals are repeatedly made heavier, slower-decaying, or more structurally consequential across different timescales: per-step reward shaping, flux habit formation, splat-memory decay, and later specialist-interference routing. The revised claim should therefore be "recurring negative-signal asymmetry," with `1.15`, `0.7`, and `-0.3/+0.5` as concrete instances.

## 4. Regularity Three: Scale And Type Matter, But The Formula Is Not Final

The original scaling profile states force proportional to `sqrt(params / 3B)` with type multipliers for standard, thinking, coding, instruct, and chat models [19]. This is real as an internal profile and should be preserved. However, later Niodoo scaling notes shift the anchor from `3B` to `8B` and compress the type multipliers [19].

The revised paper should not present the `3B` formula as the final active implementation. It should present it as the first force-scaling profile, followed by a later competing active profile. The research claim that survives is not the exact constants; it is that model scale and fine-tuning topology both matter for steering stability.

## 5. Regularity Four: Signed Channels Create A Different Operator Class

Signed force is strongly supported as an implementation primitive. Hydrodynamic splats use signed alpha to pull or push in hidden space [9]. Team-build code includes separate ghost and anti-ghost vector channels [10]. Grok/chat artifacts preserve raw and line-addressable signed-gain experiments for Glub-Tub/Glub-Glub and related synthetic concepts [11][12].

The draft's broad claim should be tightened without weakening the result. It is fair to say that signed steering produced structured inversion-like behavior in the archived synthetic-concept probes, especially the line-addressable Glub negative-gain sweep. The car/road/train item appears as a proposed Block-and-Bridge or Repulsor Gate experiment, not an executed run. The `Magma-Eating-Hamster -> Bathtub/Heater` wording appears in prose summaries, while the line-addressable extract supports the narrower `firebrick`/inanimate drift example. The paper should use the executed Glub evidence as the empirical example and describe car/road/train and stronger inversion claims as immediately testable extensions.

## 6. Regularity Five: Topological Reflexes Exist, But Runtime Constants Differ

The VR-H1 reflex exists in code. The detector is implemented, uses the last eight positions, and documents `1.05` as a threshold example [13]. Active runtime wiring calls that detector but passes `2.0`, which means the paper cannot claim that `1.05` is the active threshold without qualification [13].

The micro-dream mechanism is also implemented. The active dream code defines `DREAM_CORRECTION_THRESHOLD = 6.0`, forward-projects through repeated steering calls, and clamps/flags large correction events [14]. The evidence supports `6.0` as the current hardcoded correction threshold in the copied active code; no manually verified artifact in this package supports a separate `5.0` dream threshold claim.

TopoCoT should be described more narrowly than in the original draft. The active dream code constructs `reflection_triggered`, `reflection_tokens`, and `reflection_text` fields, but active generation consumes only the corrected tensor. I did not find evidence that reflection text is injected into the token stream or that TopoCoT firing frequency has been measured against output quality. The safe claim is therefore: hydraulic-jump detection/flagging exists; full TopoCoT token-stream integration remains incomplete.

## 7. Integration Finding: Memory Retrieval Is Ahead Of Finalization

Gate34 is one of the strongest empirical clusters in the package, but only if the result is stated carefully. The top-level manual rescore shows `20/20` semantic memory recovery and `17/20` early direct answers, while strict final-window success remains `3/10` per arm because the model often drifts after giving the answer [15]. The later lock/off-taper manual artifacts use a different setup and report `19/20` memory, `16/20` early answers, final-window improvement from `5/20` to `7/20`, and drift reduction from `18/20` to `14/20` [16]. These are consistent on the main diagnosis, but they are not identical protocols; the paper should treat Gate34 as strong evidence for memory recovery plus weak finalization, with canonical scoring still needing one consolidated table.

Route-memory artifacts show a similar split. Route handles preserve route labels perfectly in one ladder, while vector-only preservation is much weaker [17]. Runtime causal reviews show that plumbing can reach the actuator path, but visible behavior separation remains weak [18]. This supports a core integration diagnosis: retrieval and routing evidence are real, while final answer control and causal behavior shaping remain unfinished.

## 8. Exploration Before Finalization

The second-pass thesis worth preserving is that Niodoo is not only a correction engine after an answer is wrong; it contains explicit hands for perturbing the current trajectory before final commitment. The team-build control docs define `EXPLORE` as widening the search space when the current path may be wrong, `SPIKE` as a strong correction impulse for stuck or looping states, and `FOCUS` as narrowing only after a good path has emerged [21]. Active runtime code parses these request surfaces during generation and maps them to physics changes: `EXPLORE` increases repulsion and adrenaline, `SPIKE` applies a stronger burst, and `FOCUS` increases gravity while suppressing repulsion [21].

This is continuous with the earlier MountainCar mechanism. The MountainCar agent adds a curiosity term to action priority, and the steering controller injects attractors and raises exploration when TDA detects a void [22]. In both systems, the pattern is not "reject the weird path immediately." It is "detect uncertainty or an unexplored region, perturb the policy, then decide whether to focus." That supports a technical research thesis: exploration-before-finalization is a real architectural primitive in this archive.

The safe claim is narrow. These artifacts support Niodoo having an explicit explore/perturb-before-commit control surface. They do not yet prove that this primitive solves all LLM dismissal failure modes, nor do they prove that baseline LLMs universally lack an equivalent mechanism. That broader contrast is a benchmark target.

## 9. Three-Zigzags Roadmap

The original draft's three-zigzags section should remain, but as roadmap, not established mechanism. The components exist: micro-dream correction operates at generation time; dream/splat consolidation operates around generation sessions; evolutionary and hot/cold learning loops appear in MountainCar and Niodoo planning artifacts. What was not found is an implemented phase-coupled controller routing those signals into one thermostat.

The actionable integration claim is therefore: the system already emits the signals needed for phase coupling, but the coupling is unbuilt. That is a strong roadmap item, not a completed result.

## 10. Benchmark Caveat

The Niodoo-Physics-LLM package contains conflicting PARB artifacts. The positive rescore reports Niodoo ahead, but manual row checks show several alleged Niodoo-exclusive victories are actually ties because the baseline answer text is visibly correct despite being marked `UNKNOWN` [20]. The same manual check also found at least one visible Niodoo-only win, such as `MATH_002`, where baseline gives the trap answer and Niodoo gives the correct arithmetic [20]. The later Grok-judged multi-seed file reports baseline ahead, and manual inspection finds some rows where baseline does look stronger, but that file also contains judge/API-error verdicts and cannot be treated as controlling without row-level review [20].

The corrected benchmark posture is: PARB is unresolved benchmark evidence, not a clean win and not a clean loss. It should remain in the package because it contains real claim-bearing artifacts and visible Niodoo-helped examples, but any public benchmark claim requires a third manual adjudication pass over each question, expected answer, baseline output, and Niodoo output.

## 11. Conclusion

The local archive supports a serious internal research program: hidden-state steering was implemented; signed steering exists; micro-dream and topological reflex code exists; negative-signal asymmetry appears independently; exploration-before-finalization exists as an explicit control surface; and multiple artifacts converge on gentleness as a stability principle. The archive also shows why the work is not ready to be framed as universal law. Constants drift across versions, several benchmark claims conflict, and the most interesting integration mechanism remains unbuilt.

The next concrete work is straightforward:

1. Re-run the core claims under a single benchmark harness.
2. Replace unsupported examples with executed artifacts.
3. Establish one force-scaling profile per model family and record active config chronology.
4. Wire the three-timescale signals into a measured phase-coupling controller.
5. Treat Gate34 as a finalization-control problem, not only a memory-retrieval problem.
6. Build a specific benchmark for exploration-before-finalization: detect tempting rejection/shortcut paths, require an `EXPLORE` or `SPIKE` perturbation, then measure whether `FOCUS` locks the corrected answer.
