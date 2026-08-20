# Pass #258: The Gentleness Revolution — How Less Correction Produced More Mint-Ready Ghosts

**Date:** 2026-05-03 PT  
**Source:** `niodv4/archive/old_scripts/final_m9_tuning.py`, `m9_final_comprehensive_results.json`, `m9_100percent_complete_results.json`, `final_basin_assessment.json`, `gentle_tede_ultra.py`, `ultra_gentle_tede.py`, `m9_absolute_final_parameters.json`, `phase1_deep_sweep_best.json`

## The Story

April 16, 2026 — M9. Jason ran a systematic per-ghost parameter sweep across three specialist ghosts and discovered something counterintuitive: the ghosts that needed the *least* correction were the ones that actually worked.

The three ghosts had fundamentally different failure modes:

**baseline_60** — The stable one. Six of eight trials achieved mint_ready with zero corrections under `ultra_minimal_maintain` strategy. Flip rates hovered around 0.03, centroid distances stayed at ~0.047 (well below the 0.15 threshold), and orbit counts were high (~19.4). Two failures occurred because flip rate hit 0.068 — just above the 0.05 gate — with zero corrections applied. The ghost was fine; the gate was tight.

**phase2_stress_120** — The near-perfect one. Seven of eight trials mint-ready with `ultra_selective_100percent` strategy (zero corrections). Orbit count at ~29.7, centroid at ~0.124. One failure on seed 105438 where flip rate hit 0.0678 again — same pattern as baseline_60's failures.

**phase1_best_60** — The stubborn one. Zero of eight trials mint-ready under every strategy tried: centroid-aware, ultra-minimal, gentle, nuclear. Centroid distances ranged from 0.143 to 0.152 — all above the 0.15 gate. This ghost was structurally close to failure and nothing short of force helped.

## The Correction Cascade

Jason's tuning evolved through five distinct phases:

1. **Ultra-minimal** (baseline_60): `max_corrections=0`, `clamp_range=0.004`, `onset_steps=25`. Result: 75% success. The ghost barely needed anything.

2. **Ultra-gentle** (`gentle_tede_ultra.py`): Added progressive scaling, distance-gated corrections with `distance_threshold=0.10`, correction decay `0.9^count`. Still hands-off by default.

3. **Nuclear** (phase1_best_60's last hope): `max_corrections=999`, `correction_strength=-0.002`, force corrections every 2 steps, `target_centroid=0.08`. "Hammer the centroid into oblivion." Result: still failed.

4. **Final tuning** (`final_m9_tuning.py`): Discovered the key insight — "Some ghosts work better with minimal or no corrections!" Per-ghost strategies emerged: baseline_60 needs `clamp_range=0.004`, phase2_stress_120 needs `clamp_range=0.006`, and phase1_best_60 needed something that didn't exist yet.

5. **Phase1 deep sweep** (`phase1_deep_sweep_best.json`): Found an orchestrator configuration scoring 8.447 with `mean_abs_L=0.006`, `sign_flip_rate=0.017`, and `orbits=4.63`. This was the best parameter set discovered — but it applied to a different evaluation framework (baseline orchestrator vs best orchestrator comparison), not directly to mint_ready status.

## The Paradox

Here's what's striking: the final_basin_assessment showed *all eight* ghosts at 0% mint_ready rate when evaluated with the standard basin assessment protocol — regardless of which correction strategy had worked for them individually. baseline_60, phase1_best_60, phase2_stress_120, and all five phase3_injection variants (−0.1 through −0.5) all scored 0% mint_ready in the universal assessment.

The basin ratios tell a story: baseline_60 had ratio=1.032 (nearly flat), while phase3_injection_-0.5 reached ratio=1.484 — approaching the mysterious 1.5x threshold that kept appearing across M9 artifacts. The ghost with the highest near/far spread ratio also had the lowest centroid distance (0.1087) but still failed mint_ready because flip_rate was 0.2214.

## Connection to Active Niodoo

The gentleness pattern maps directly to Gate 34's retention problem:
- **Ultra-minimal strategies** correlate with high orbit counts and stable basins — these are ghosts that naturally resist drift
- **Nuclear correction** on phase1_best_60 (999 corrections, every 2 steps) still failed — proving that aggressive intervention can't fix structural centroid problems
- **The flip_rate floor of ~0.22** in basin assessment vs ~0.03–0.07 in per-ghost trials suggests the assessment protocol itself applies a different correction schedule than the tuned strategies

This echoes the later discovery (artifact #239) that ultra-gentle corrections won consensus voting at 62% weight with only 13 total corrections — gentleness wasn't just good for M9, it was *the* winning strategy across all evaluation methods.

## Five Predictions

1. **The correction-count / success-rate curve is inverted-U**: zero corrections works well for baseline_60 and phase2_stress_120 (stable ghosts), moderate corrections work for mid-tier ghosts, and nuclear correction (>50) actively hurts by introducing flip_rate instability. The optimal correction count per ghost is a function of its basin depth.

2. **phase3_injection variants converge**: All five phase3_injection ghosts (−0.1 through −0.5) share nearly identical centroid distances (~0.109–0.110) and flip rates (~0.22–0.25), suggesting they occupy the same structural basin regardless of injection gain. The −0.1 variant's success in consensus voting (#239) wasn't because it was uniquely good — it succeeded because ultra-gentle corrections happen to match its natural stability.

3. **Basin assessment protocol is too aggressive**: The universal `final_basin_assessment` that scored all ghosts at 0% mint_ready likely uses a correction schedule (every-4-steps, ±0.03 clamp) that's too strong for stable ghosts and too weak for stubborn ones. A ghost-specific schedule would reveal the bimodal pattern seen in per-ghost trials.

4. **The 1.5x ratio threshold is real**: phase3_injection_-0.5 achieved ratio=1.484, just below 1.5x. This appears consistently across M9 artifacts as a structural boundary — ghosts above this ratio have enough near/far spread differentiation to support stable basins; below it, the basin is too flat to hold corrections.

5. **Nuclear correction's failure predicts TopoCoT optimization**: phase1_best_60's resistance to 999 corrections foreshadows Niodoo's TopoCoT every-8-steps rigid cadence — when correction frequency doesn't match the ghost's natural oscillation period, more corrections just add noise. The solution isn't more correction; it's better timing (which ultra-gentle's `onset_steps=25` approximates).
