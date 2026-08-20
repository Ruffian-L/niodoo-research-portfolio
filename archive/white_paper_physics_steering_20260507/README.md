# Physics Steering White Paper Package

This folder is a self-contained evidence package for the draft:

`Physics-Based Steering of Large Language Model Hidden States: Five Empirical Laws and an Integration Roadmap`

The package is intentionally conservative. It preserves the draft's core claims where local artifacts support them, flags conflicts where the artifacts disagree, and separates implemented mechanisms from hypotheses.

## Start Here

- `WHITE_PAPER_DRAFT.md` - revised evidence-backed draft.
- `CLAIM_EVIDENCE_LEDGER.md` - claim-by-claim support status.
- `UNSUPPORTED_CLAIMS_LEDGER.md` - claims that need removal, rewrite, or measurement before public use.
- `EVIDENCE_MAP.md` - where the artifacts came from and which sources support each topic.
- `ENDNOTES.md` - compact citation index with line-addressable evidence.
- `snippets/KEY_CODE_SNIPPETS.md` - small code excerpts for the central mechanisms.
- `ORIGINAL_DRAFT_V0_1.md` - user-supplied source draft, preserved for comparison.

## Evidence Posture

Strongly supported inside the local archive:

- Hidden-state steering exists in code and research logs.
- Signed steering channels exist in both splat memory and ghost/anti-ghost implementations.
- MountainCar uses a `1.15` negative energy weighting.
- Hydrodynamic splat memory uses slower negative/pain decay through a `0.7` factor.
- Micro-dream and TopoCoT-style correction code exists, with current dream threshold `6.0`.
- Gate34 shows strong memory recovery but weak final-answer retention.
- `EXPLORE`/`SPIKE`/`FOCUS` controls implement an explicit exploration-before-finalization surface in team-build runtime artifacts, with a MountainCar curiosity/void-detection precursor.

Needs careful wording:

- `force_cap = 35` is a historical stabilized cap, not the current universal active value.
- The `sqrt(params / 3B)` scaling law exists as an internal scaling profile, but a later active profile uses an `8B` anchor and compressed type multipliers.
- The "three zigzags" section is a synthesis/hypothesis. The component cycles exist; explicit phase coupling is not built.
- PARB benchmark reports conflict; both headline directions depend on machine fields. Manual row checks found real Niodoo-helped examples, baseline false negatives in the positive rescore, and judge/API failures in the later Grok-judged multi-seed artifact. See `PARB_MANUAL_CHECK.md`.
- The broader claim that this primitive solves baseline LLM dismissal/rejection failure modes is a research thesis and benchmark target, not a completed comparative result.

## Artifact Layout

- `artifacts/hydrodynamic_swarm` - curated hydrodynamic-swarm code and research logs.
- `artifacts/hydrodynamic_active` - active workspace hydrodynamic source, logs, docs, kernels, and archived telemetry/db.
- `artifacts/mountaincar` - MountainCar source, snapshots, result JSON, and writeups.
- `artifacts/niodoo_physics_llm` - Niodoo-Physics-LLM code, artifacts, PARB results, and tuning evidence.
- `artifacts/niodv4_*` - TEDE/M9/consensus artifacts.
- `artifacts/grok_chats` and `artifacts/chat_code_extracts` - raw Grok JSON chunks and extracted code snippets.
- `artifacts/team_build_*` - Gate34, route memory, codec, Opus memory stack, and Niodoo runtime docs/code.
- `artifacts/team_build_core_docs` - copied docs for visible REQUEST controls and the 2026-04-22 visible-controls validation.
- `artifacts/prod_mc_asset_server_hits` - selected claim-bearing extracts from the large prod asset-server dump.
- `artifacts/extra_deep_dives`, `artifacts/niodoo_deep_dives`, `artifacts/blog`, `artifacts/memory_notes` - synthesis and continuity notes.

## Large Raw Sources

Several raw dumps were searched or sampled but not fully copied because they are hundreds of megabytes to multi-gigabytes and would bloat the package without adding line-addressable paper evidence. The selected claim-bearing extracts are copied. See `EVIDENCE_MAP.md` for the exact list.
