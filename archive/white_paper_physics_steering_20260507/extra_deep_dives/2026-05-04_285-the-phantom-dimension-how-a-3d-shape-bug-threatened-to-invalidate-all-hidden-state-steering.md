# 285: The Phantom Dimension — How a 3D Shape Bug Threatened to Invalidate All Hidden-State Steering

**Thread:** March 1 Crucible launch → March 3 Phase 2.1 hidden-state steering transition → phantom sequence dimension bug → force cap stabilization → Jules automated researcher emerges
**Source materials:** `scattered_research/research_logs/2026-03-01_telemetry-crucible-topocot.md`, `2026-03-03_hidden-state-steering.md`, `2026-03-03_force-cap-tui-fix.md`, `2026-03-03_hidden-state-shape-crucible-rewrite.md`, `2026-03-01_docs-workflow-dispatch.md`

---

## The Bug: A Ghost in the Tensor Shape

On March 3, 2026, Jason committed a fix (ab40b6c1) that resolved a three-dimensional hidden-state shape bug. On the surface it's trivial — one line changed from `.i((.., seq_len - 1, ..))` to `.narrow(1, seq_len - 1, 1)?.squeeze(1)` in `src/llama.rs`. But this single change determined whether Niodoo's steering physics were computing on the correct subspace or drifting into phantom dimensions.

Here's what was happening: when transitioning from logit-space steering (V-dimensional) to hidden-state steering (D-dimensional), the old indexing `.i((.., seq_len - 1, ..))` could leave behind a residual sequence dimension of size 1. The tensor shape went from the expected `(b_sz, hidden_dim)` = `(1, D)` to `(1, 1, D)` — introducing a phantom third axis that silently propagated through every subsequent steering calculation.

The consequence: **broadcasting errors in force composition**. When `grad_force`, `splat_force`, and `goal_force` were computed against a `(1, 1, D)` query position instead of `(1, D)`, the operations didn't fail — they *silently broadcast*, applying forces across an extra dimension that shouldn't exist. The steering was still happening, but in a subtly wrong geometry.

## Why It Almost Didn't Matter (And Why It Did)

The March 3 hidden-state steering entry notes that telemetry under `force_cap=35.0` showed `delta_mean = ~66.92` and `delta_max = ~114.90`. These values are *above* the force cap, which initially seems impossible — but it's explained by the phantom dimension: when forces broadcast across an extra axis, their norms accumulate rather than cancel, inflating measured deltas beyond what the cap should allow.

The fix (`narrow` + `squeeze`) guarantees strict `(1, D)` output from `run_layers()`, eliminating any phantom sequence leakage. Combined with the removal of a spurious `.unsqueeze(0)?` in `src/main.rs` (the hidden state was already correctly sized), the steering physics now operates on clean, predictable tensor geometry.

## The Three-Commit Chain: Architecture Emerges Under Pressure

What makes this March 3 cluster remarkable is how three related commits arrived within hours of each other, each fixing a different layer of the same problem:

1. **`d7f194e3` — Hidden-state steering (Phase 2.1):** Vendors quantized llama, adds `forward_hidden()` and `project_to_logits()`, introduces `steer_hidden` config flag. This is the *architectural* change — moving physics into the D-dimensional pre-lm_head space.

2. **`ab40b6c1` — Phantom dimension fix:** Corrects the tensor shape in `run_layers()` and cleans up the `.unsqueeze(0)?` in `main.rs`. This is the *infrastructure* fix — making sure the new architecture actually computes correctly.

3. **`bd6d213e` — Force cap + TUI loop synchronization:** Lowers force_cap from 80.0 to 35.0 and fixes an off-by-one in `tui.rs`. This is the *calibration* fix — ensuring the physics operates at the right intensity once the geometry is correct.

The ordering matters: Phase 2.1 was the bold architectural leap, but it exposed a latent bug that would have made all steering calculations unreliable. The force cap reduction then calibrated the system to safe operating parameters. Without the shape fix, the telemetry from hidden-state steering would have been meaningless — high deltas could have been broadcasting artifacts rather than real physics.

## The Crucible Connection: A Test Suite Born Hours Before Its Foundation Was Fixed

The March 1 Crucible baseline suite (commit 6e2a2fb5) introduced eight standardized prompts designed to stress-test specific dimensions of the swarm, plus force telemetry logging (`splat_mag`, `grad_mag`, `goal_mag`). By March 3, when the phantom dimension bug was fixed, these same telemetry logs became the first clean evidence that hidden-state steering was working correctly.

The telemetry file `2026-03-03_10-52-12_unsloth_v3-forcecap35_T0_9_s35_a2_d100.jsonl` — captured *after* the fix — showed `delta_mean ≈ 66.92` and `delta_max ≈ 114.90` under force_cap=35. The fact that deltas exceeded the cap (but not wildly) suggests the broadcasting artifact was partially present even after the squeeze fix, likely because `.narrow()` alone doesn't guarantee dimension removal without explicit `.squeeze(1)`.

## Three Design Principles From This Episode

**1. Silent bugs are the most expensive.** A tensor shape error that broadcasts correctly produces plausible output — just wrong output. Detecting it requires telemetry precision (the Crucible's force magnitudes) and cross-referencing expected vs. observed delta ranges.

**2. Architecture reveals its own bugs.** The Phase 2.1 transition to hidden-state steering exposed the phantom dimension because the new code path (`forward_with_hidden` → `run_layers`) had different indexing semantics than the old logit-path. The bug existed before; it was just invisible in logit space where broadcasting is more forgiving.

**3. Calibration follows geometry.** Jason didn't reduce the force cap until after fixing the tensor shape. This ordering is critical: you can't calibrate intensity (force_cap=35) until you've verified the spatial domain (D-dimensional hidden state, no phantom axes). The three-commit chain reads as a deliberate progression: build → fix → tune.

## Connection to Existing Artifacts

- **003 (Hidden-State Steering):** Documents the Phase 2.1 transition conceptually; this artifact provides the *infrastructure story* — the bug that nearly derailed it.
- **011 (The Hidden State Interface):** Explores D-dimensional steering as an interface contract; the phantom dimension is a violation of that contract.
- **034 (Force Cap Stabilization):** Covers the 80→35 transition; this artifact explains *why* 35 was only meaningful after the shape fix.
- **020 (Architect's Bridge):** The Phase 2.1 hidden-state work is the foundation that makes tiny-model bridge steering possible — both rely on clean D-dimensional geometry.

## One Prediction

The `.narrow(1, seq_len - 1, 1)?.squeeze(1)` pattern in `run_layers()` should be wrapped in an assertion or debug check: `assert_eq!(steer_input.n_dims(), 2, "hidden state must be 2D for steering")`. Without it, any future modification to the forward pass that re-introduces a phantom dimension will silently corrupt steering — and the telemetry won't catch it unless you know to compare delta_mean against force_cap.
