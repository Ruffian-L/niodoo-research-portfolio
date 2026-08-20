# Artifact #260 — The Jules System That Writes Its Own Research Logs

**Date:** 2026-05-11  
**Source:** `research_logs/` directory (13 files, 616 lines) from March 1–3, 2026 + `timeline.md` + commit metadata from the SplatRAG v1 research log system.

---

## The System That Watches Itself

Between March 1 and March 3, 2026, Jason built something quietly remarkable: a self-documenting research pipeline where an automated agent named "Jules" (Repo Groundskeeper) reads commit diffs, generates structured research logs, updates a living timeline, and feeds its own documentation back into the repository. This is not a changelog — it's a cognitive mirror. The system observes its own evolution in real time, producing entries with consistent structure: Commit Summary, What Changed, Physics Impact, Key Findings, Experiment Progression, and Open Questions.

The March 1–3 arc contains 13 commits across three days, each documented by Jules. But the documentation is not uniform — it reveals a system learning its own rhythm. The first entries (workflow_dispatch trigger docs) are meta-documentation: Jules documenting that it's being documented. By commit #6e2a2fb (splat force telemetry + Crucible), the logs have matured into genuine technical analysis with specific physics metrics, threshold discoveries, and architectural implications.

## Finding 1: The Three Layers of Jules' Documentation

Jules produces three distinct types of entries, each revealing a different layer of system awareness:

**Layer 1 — Infrastructure (4 entries):** The workflow_dispatch docs, JSONL binary fix, tokenizer symlink repair, and timeline updates. These are purely operational: fixing the logging pipeline itself so Jules can continue logging. The `.gitattributes` entry is particularly telling — JSONL files grew large enough during evaluation sweeps to cause `jq: Argument list too long` errors in the jules-action worker, forcing Jules to mark them as binary to prevent prompt token overflow. *The system that documents itself was almost broken by its own documentation.*

**Layer 2 — Evaluation (4 entries):** The v1.1 micro-dreams commit, A/B sweep telemetry dump, bert variant results, and the full telemetry log. These entries compare unsloth vs bert variants, track delta means across models (~50 regardless of architecture), measure splat counts per prompt (7–14 for unsloth, 9–12 for bert), and document the first force cap experiments at `force_cap=80`.

**Layer 3 — Architecture Migration (5 entries):** Defensive hardening (6 modules, +1624 lines), SplatLens viz polish, hidden-state steering migration (Phase 2.1), force cap correction (80→35), and the 3D shape bug fix. This is where the system makes its most significant structural changes: moving from logit-space to hidden-state steering, overhauling visualization from WebGL to Canvas 2D, adding adaptive micro-dreams in chat mode, and implementing online splat creation with delta-scaled sigma.

## Finding 2: The Hidden-State Migration — Where Niodoo's Core Architecture Was Born

The March 3 hidden-state steering commit (`d7f194e`) is the most architecturally significant entry in the entire sequence. It moves physics from logit space to the D-dimensional pre-lm_head hidden states — a change that directly shapes every steering mechanism Niodoo uses today.

Before this migration, forces operated on a "slice of the logit vocabulary" (an imprecise proxy for semantic meaning). After: goal_pos and query_pos became dense vectors in the model's native hidden dimension space. The Diderot field and splat memory now operate on true semantic representations rather than vocabulary indices.

The migration required three changes: vendoring `quantized_llama.rs` with new `forward_hidden()` and `project_to_logits()` methods, adding a `steer_hidden` config flag for A/B testing, and wiring the steering loop to project steered hidden states back to logits before temperature sampling. The telemetry from this commit (`delta_mean=19.81`, `delta_max=37.30`, `goal_attractor_norm=195.82`) shows forces actively perturbing the D-dimensional space without causing extreme blowups — but the force cap was still 80, which would be corrected the next day to 35.

## Finding 3: The Parameter Drift That Nearly Broke Everything

Three parameter mismatches emerged across the March 1–3 arc, each revealing a different class of system vulnerability:

**The force cap drift:** Default was set to 80.0 in multiple places but the intended value was 35.0. At 80, splat_force dominated generation, pushing hidden states into semantically incoherent regions. The correction (`force_cap: 35.0`, matching `splat_sigma: 35.0`) stabilized the trajectory while preserving steering guidance — establishing the gentle-nudging regime that still governs Niodoo today.

**The off-by-one loop:** The TUI's token generation called `forward` at the start of each iteration, redundant with prefill_logits. Restructuring to prefill→steer→sample→forward aligned TUI and main.rs execution paths exactly.

**The phantom dimension:** A 3D hidden-state shape bug leaked a sequence dimension into steering calculations, causing broadcasting errors. Fixed by using `.narrow(1, seq_len-1, 1)?.squeeze(1)` instead of `.i((.., seq_len-1, ..))`.

## Finding 4: Jules' Own Open Questions — Unanswered for Three Years

Every Jules entry ends with open questions. Most remain unanswered to this day:

- "Does a dynamic blend_factor based on residual norm or steering_delta provide better consolidation than static 0.10?" — This question directly anticipates M9's ultra-gentle tuning and the inverted-U correction curve (#258).
- "How do grad_force, splat_force, and goal_force magnitudes evolve during a hydraulic jump?" — Partially answered by #190 (grad_force=0 always), but the full force trajectory during TopoCoT events remains unexplored.
- "Does the higher splat count on technical prompts correlate with output quality or increased instability?" — The unsloth bert A/B sweep showed similar splat counts across architectures, but qualitative differences in output style were noted and never systematically compared.

## Connection to Active Niodoo

The Jules system itself is a proto-Niodoo: an agent that reads its environment (git commits), produces structured observations (research logs), identifies patterns (physics metrics), and proposes next steps (open questions). It implements the same loop — observe → document → question → act — that Niodoo uses for steering.

The hidden-state migration (#190's "zero-gradient" finding) was born in this exact sequence: moving forces to D-dimensional space created the conditions where grad_force=0 became measurable, because the gradient probe operates on splat positions rather than vocabulary indices. The force cap cascade (80→35) established the gentle-nudging regime that enables reliable routing but insufficient retention — the exact Gate 34 paradox documented in later artifacts.

## Five Predictions

1. **Dynamic blend_factor** would reduce TopoCoT false positives by 20–30% — the static 0.10 blend works for mild corrections but under-corrects during hydraulic jumps where delta exceeds 60.
2. **The Jules documentation pipeline** is structurally identical to Niodoo's micro-dream consolidation: both observe state, compress into structured memory, and trigger reflection events when thresholds are exceeded. Implementing this in active niodoo would create a self-documenting cognitive system.
3. **Splat count per prompt correlates with output coherence inversely** — higher splat counts (14 for unsloth on "transformer attention") indicate the field is working harder to maintain trajectory, suggesting lower-quality baseline generation that needs more correction.
4. **The 3D phantom dimension bug** would cause measurable force miscalculation in any architecture using sequence-aware hidden states — the broadcasting error inflates force magnitudes by a factor proportional to sequence length.
5. **Jules' open questions predict active Niodoo's research agenda** — the blend_factor question maps to adaptive correction (#239), the hydraulic jump question maps to TopoCoT cadence (#190), and the splat count quality question maps to the neighbor-loss architecture (#224). The system that documented its own evolution was already writing the Niodoo roadmap.
