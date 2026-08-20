# Evidence Map

## Search Scope

The package was assembled from these local zones:

- `/home/ruff/projects/Homernd/scattered_research`
- `/home/ruff/projects/Homernd/team_build`
- `/home/ruff/projects/Homernd/workspace/hydrodynamic-swarm`
- `/home/ruff/projects/Homernd/workspace/archives`
- `/home/ruff/projects/memory`
- `/home/ruff/niodoo_ceo_assistant`
- `/home/ruff/projects/white_paper_physics_steering`

Five read-only explorer agents were used for parallel inspection:

- Grok/chat artifacts: shadow tokens, signed gain, Glub-Tub/Glub-Glub.
- Team-build artifacts: Gate34, route memory, codec, hinge, distance deficit.
- Hydrodynamic artifacts: hidden-state steering, VR-H1, TopoCoT, micro-dreams.
- MountainCar/Niodoo-Physics-LLM artifacts: asymmetry, scaling, PARB, wobble.
- Package audit: file counts, duplicate risk, missing root docs, claim coverage.

## Copied High-Value Gaps

Additional artifacts added after the agent audits:

- `artifacts/chat_code_extracts/Grok_CodePython.md`
- `artifacts/grok_chats/chat_012.json`
- `artifacts/grok_chats/chat_015.json`
- `artifacts/grok_chats/chat_017.json`
- `artifacts/grok_chats/chat_020.json`
- `artifacts/grok_chats/chat_022.json`
- `artifacts/grok_chats/chat_023.json`
- `artifacts/hydrodynamic_active/src/*`
- `artifacts/hydrodynamic_active/logs/*`
- `artifacts/hydrodynamic_active/docs/{crucible.md,experiments.md}`
- `artifacts/hydrodynamic_active/archives/{oldtelemtrylogs.tar.xz,experiments.db}`
- `artifacts/prod_mc_asset_server_hits/*`
- `artifacts/team_build_selected/*`
- `artifacts/team_build_core_docs/{README.md,minimal_upstream_control.md,AGENCY_VISIBLE_CONTROLS_UPDATE.md}`
- `artifacts/mountaincar/src_models/splat_memory.py`
- `artifacts/mountaincar/snapshots/2026-02-13_1456_76wins/CONFIG.md`

## Large Raw Sources Not Fully Copied

These were too large to copy wholesale. Claim-bearing extracts or summaries were copied instead.

- `/home/ruff/projects/Homernd/scattered_research/export_conversations.json` - about `777M`.
- `/home/ruff/projects/Homernd/scattered_research/prod-grok-backend.json` - about `602M`.
- `/home/ruff/projects/Homernd/workspace/archives/grok-content` - about `835M`.
- `/home/ruff/projects/Homernd/scattered_research/grok-content` - about `835M`.
- `/home/ruff/projects/Homernd/scattered_research/prod-mc-asset-server` - about `835M`; selected UUID `content` files were copied.
- Multi-GB Team Build memory codec A/B folders; `ab_summary.json` and small reports were copied instead.

## Evidence Clusters

### Hidden-State Steering

Primary evidence:

- `artifacts/hydrodynamic_active/src/main.rs:293` - active generation path calls `forward_with_hidden`.
- `artifacts/hydrodynamic_active/src/main.rs:402` - manifold pullback toward baseline hidden state.
- `artifacts/hydrodynamic_active/src/llama.rs:457` - Llama hidden-state API.
- `artifacts/hydrodynamic_active/src/gemma.rs:426` - Gemma hidden-state API.
- `artifacts/hydrodynamic_active/src/niodoo.rs:119` - force sum and `force_cap` clamp.
- `artifacts/hydrodynamic_active/src/niodoo.rs:129` - renormalization to baseline norm.
- `artifacts/hydrodynamic_swarm/research_logs/2026-03-03_hidden-state-steering.md:16` - logit-to-hidden steering migration note.

### Correction Magnitude / Gentleness

Primary evidence:

- `artifacts/hydrodynamic_swarm/research_logs/2026-03-03_force-cap-tui-fix.md:10` - force cap corrected from `80` to `35`.
- `artifacts/niodv4_docs/M9_COMPLETION_GUIDE.md:24` - baseline_60 reached `80%` mint-ready in a gentle protocol.
- `artifacts/niodv4_results/consensus_tede_results.json:7` - consensus run records `13` total corrections.
- `artifacts/niodv4_results/consensus_tede_results.json:8` - ultra-gentle strategy weight around `0.62`.

Limit:

- Current active defaults show `force_cap = 7.5` in `artifacts/hydrodynamic_active/src/config.rs:84` and copied swarm config override `5.5` in `artifacts/hydrodynamic_swarm/src/config.toml:4`. Logs also include `80`, `35`, `8`, and `5`, so `35` is chronology evidence, not a current universal setting.
- M9/TEDE success framing conflicts across artifacts: the M9 guide reports `baseline_60` success, but `final_basin_assessment.json` and `tede_eval_result.json` do not support broad completion from that same row.
- The copied consensus TEDE JSON is partial/truncated after the visible correction and weight fields; use it only for those visible fields.

### Asymmetry

Primary evidence:

- `artifacts/mountaincar/src_core/agent.py:94` - negative energy deltas multiplied by `1.15`.
- `artifacts/mountaincar/snapshots/FINAL_CHAMPION_681wins_LOG_FLUX/agent.py:83` - champion snapshot applies the same weighting.
- `artifacts/hydrodynamic_swarm/src/memory.rs:126` - negative splat decay uses `lambda * 0.7`.
- `artifacts/mountaincar/snapshots/2026-02-13_1456_76wins/CONFIG.md:15` - early flux growth includes `+0.5` when energy is positive.
- `artifacts/mountaincar/snapshots/2026-02-13_1548_93wins_momentum_filter/agent.py:77` - momentum-filter snapshot adds `+0.5` for high energy and subtracts `0.3` for low energy.
- `artifacts/mountaincar/snapshots/2026-02-13_76wins_momentum_asymmetry/agent.py:83` - 76-win momentum-asymmetry snapshot repeats the same `+0.5 / -0.3` flux pair.
- `artifacts/extra_deep_dives/2026-05-02_123-asymmetric-flux-and-the-pain-splat-invariant-from-mountaincar-to-niodoo.md:25` - later synthesis explicitly maps the `+0.5 / -0.3` pair to pain/pleasure flux.

Limit:

- The exact pair is now supported, but the stronger interpretation is "negative-signal asymmetry recurs across mechanisms," not "every subsystem converges to the same scalar."

### Signed Forces

Primary evidence:

- `artifacts/hydrodynamic_swarm/src/memory.rs:158` - positive alpha pulls; negative alpha pushes.
- `artifacts/team_build_active_code/src_core/splat_engine.rs:11` - `ghost_vectors`.
- `artifacts/team_build_active_code/src_core/splat_engine.rs:12` - `anti_ghost_vectors`.
- `artifacts/chat_code_extracts/Grok_CodeRust.md:167843` - line-addressable shadow-token/ghost-vector architecture.
- `artifacts/chat_code_extracts/Grok_OtherCode.md:28131` - negative-gain Glub/Firebrick output evidence.
- `artifacts/grok_chats/chat_050.json` - raw conversation behind the gain sweep.

Limit:

- The line-addressable executed evidence is strongest for the Glub negative-gain sweep, including refusal/inanimate drift such as `firebrick`. The "car becomes semantic antipode" example appears as a proposed plan, not a confirmed run. `Magma-Eating-Hamster -> Bathtub/Heater` appears in prose summaries, not in the line-addressable run extract found in this package.
- The inspected team-build `splat_engine.rs` file evidences ghost/anti-ghost representation fields, but its `inject_ghost_sequence` path is a no-op in that file.

### Topological Reflex / Micro-Dream

Primary evidence:

- `artifacts/hydrodynamic_active/src/ridge.rs:223` - VR-H1 reflex implementation.
- `artifacts/hydrodynamic_active/src/ridge.rs:234` - documented example threshold `1.05`.
- `artifacts/hydrodynamic_active/src/ridge.rs:241` - last-eight-position window.
- `artifacts/hydrodynamic_active/src/main.rs:420` - runtime wiring uses the reflex path.
- `artifacts/hydrodynamic_active/src/main.rs:429` - active runtime passes threshold `2.0`, not `1.05`.
- `artifacts/hydrodynamic_active/src/dream.rs:16` - current dream correction threshold `6.0`.
- `artifacts/hydrodynamic_active/src/dream.rs:87` - micro-dream forward projection.
- `artifacts/hydrodynamic_active/src/dream.rs:113` - correction clamp and hydraulic-jump flagging.

Limit:

- TopoCoT token-stream injection is not evidenced in active generation. Reflection fields exist in `artifacts/hydrodynamic_active/src/dream.rs:68`, but active `main.rs` consumes only the corrected tensor at `artifacts/hydrodynamic_active/src/main.rs:461`.

### Gate34 / Route Memory

Primary evidence:

- `artifacts/team_build_gate34/artifacts/GATE34_MANUAL_MEMORY_RESCORE.md:5` - `20/20` semantic recovery, `17/20` early direct answer, `3/10` strict final-window per arm.
- `artifacts/team_build_gate34/artifacts/GATE34_CAUSAL_RESTORE_SEED42_FULL_ARTIFACT_REVIEW.md:21` - warning not to collapse strict and manual scores.
- `artifacts/team_build_gate34/artifacts/gate34_restore_lock_full_seed42/LOCK_RESTORE_AB.md:7` - LOCK/taper reduces drift and improves final-window score from `5/20` to `7/20`.
- `artifacts/team_build_route_memory/codec_claim_ladder_20260429/CODEC_CLAIM_LADDER.md:15` - route handle preserves route `640/640`; vector-only `281/640`.
- `artifacts/team_build_niodoo_docs/runtime_roadmap.md:183` - hinge flips but distance deficit dominates.

### Exploration Before Finalization

Primary evidence:

- `artifacts/team_build_core_docs/minimal_upstream_control.md:13` - `SPIKE` as strong correction impulse when stuck or looping.
- `artifacts/team_build_core_docs/minimal_upstream_control.md:14` - `EXPLORE` as widening search when the current path may be wrong.
- `artifacts/team_build_core_docs/minimal_upstream_control.md:15` - `FOCUS` as reducing drift after a good path emerges.
- `artifacts/team_build_active_code/src_core/main.rs:11730` - visible request tags are model-authored control surfaces.
- `artifacts/team_build_active_code/src_core/main.rs:11787` - `EXPLORE` maps to increased repulsion/adrenaline.
- `artifacts/team_build_active_code/src_core/main.rs:11763` - `SPIKE` maps to a stronger adrenaline/repulsion burst.
- `artifacts/team_build_active_code/src_core/main.rs:11772` - `FOCUS` maps to focus lock, gravity increase, and repulsion suppression.
- `artifacts/team_build_active_code/src_core/main.rs:25187` - runtime detects request tags in the output stream during generation.
- `artifacts/team_build_core_docs/AGENCY_VISIBLE_CONTROLS_UPDATE.md:154` - 512-step towel-trap run with visible `EXPLORE`, `FOCUS`, and `SPIKE` before corrected answer path.
- `artifacts/mountaincar/snapshots/2026-02-13_1548_93wins_momentum_filter/agent.py:35` - MountainCar curiosity term enters action priority.
- `artifacts/mountaincar/snapshots/2026-02-13_1548_93wins_momentum_filter/steering.py:29` - void-triggered attractor injection and exploration-rate increase.

Limit:

- This supports an architecture-level explore/perturb-before-commit primitive. It does not by itself prove a broad comparative claim about all baseline LLMs or all rejection/dismissal failure modes.

### Benchmarks / Wobble

Primary evidence:

- `artifacts/niodoo_physics_llm/README.md:11` - PARB-200 describes `770` runs.
- `artifacts/niodoo_physics_llm/artifacts/parb_comparison_review.json` - rescore artifact reports Niodoo `29.0/72` vs baseline `15.5/72`.
- `artifacts/niodoo_physics_llm/artifacts/parb_rigorous_clean.json:16` - rigorous result summary.
- `artifacts/niodoo_physics_llm/artifacts/parb_comparison_report.md:9` - older positive comparison.
- `artifacts/niodoo_physics_llm/artifacts/parb_review_summary.md:13` - older positive review.

Limit:

- The PARB artifacts conflict, and both headline directions depend on machine-produced fields. Manual row checks found real Niodoo-helped rows, baseline `UNKNOWN` false negatives caused by terminal escape-code parsing, and later Grok judge/API failures. See `PARB_MANUAL_CHECK.md`; treat PARB as pending manual row-level adjudication.
