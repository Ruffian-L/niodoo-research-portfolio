# Artifact #308 — The Physics Remake Benchmark Suite: Four Cognitive Layers and the Validation Gap

**Date:** 2026-05-06 PT  
**Source:** `scattered_research/research (3)/COMBINED_Grok-Niodoo-Physics-niodoo_py.txt` (40 files, ~6,727 lines)  
**Pass:** #308 (CEO Producer Loop)

## The Suite

This is the most complete evaluation infrastructure in Jason's archive: 40 Python files organized into a full benchmarking pipeline for the Niodoo Physics Remake — a Llama-3.1-8B steering suite built around physics parameters (gravity, repulsion, orbit speed, blend) and validated against cognitive tasks rather than standard ML benchmarks.

## Four Cognitive Layers

**Layer 1: Prompt Taxonomy (files 1–2)**  
`killer_prompts.py` defines 100 prompts across 10 categories (math, semantic_trap, multi_step, instruction, hallucination, context, spatial, edge_case, chain_thought, ambiguity). `prompt_bank_200.py` extends this to 200 with factual, logic, creative, math, and constraint-writing subsets. The taxonomy is task-agnostic — it measures *how* the model thinks, not *what* it knows. This maps directly to Niodoo's Gate 3/4 distinction: Gate 3 succeeds on factual retrieval (easy for any model), Gate 4 requires reasoning topology changes (physics matters).

**Layer 2: Inference Infrastructure (files 5–7, 10)**  
`niodoo_chat.py` and `niodoo_tui.py` provide the inference runner — streams stdout line-by-line, skips loading phases via regex (`RE_SIM_COMPLETE`, `RE_DECODED_TOKEN`), unescapes `\n`, preserves internal tags like `[INTERNAL MONITOR]` and `[REQUEST: SPIKE/FOCUS/EXPLORE/RESET]`. The telemetry sampler (`extract_telemetry_sample.py`) reads JSONL logs, preserves first 1000 lines plus context windows around SPIKE/INTERNAL/RESET events. This is the measurement layer that makes everything else auditable.

**Layer 3: Physics Sweeps (files 17–25, 31–38)**  
The rainbow sweep infrastructure runs systematic parameter sweeps across physics_blend [0.5–5.0], repulsion_strength [-0.5 to -3.0], gravity_well [0.1–5.0], orbit_speed [0.05–0.50], temperature [0.5–1.0], and sigma noise [0.03–0.10]. Key experiments: `wobble_sweep.py` (24 focused runs testing "wobble, snap back, get the right answer"), `rainbow_orbit.py` (6×7 orbital stability matrix), `triad_double_rainbow.py` (blend 1.0–5.0 on Logic/Creative/Ambiguity triad with debris filtering and telemetry), `rainbow_omni.py` (Omni-Tuner V3 with physics layer selection via `--physics-start-layer=16`). The constant seed (--seed 42) across all runs proves parameter changes alter output topology without stochastic interference.

**Layer 4: Evaluation & Judgment (files 15, 30, 28–29)**  
`parb_rigorous.py` is the crown jewel: PARB-200 × 5 seeds × 2 systems (Baseline Ollama vs Niodoo) judged by Grok-4 blind exam grader. It captures full telemetry per run (governor/viscosity/soul metrics, drift values, total_force), outputs statistical confidence across seeds, and logs results to CSV + Markdown. `llm_killers.py` runs three specific semantic traps (3 killers in room → 3 or 4, troy pound vs avoirdupois pound, parallel towel drying) comparing vanilla Ollama against Niodoo physics. `blind_test_10.py` and `hard_logic_test.py`/`hard_logic_v2.py` provide additional evaluation depth.

## The Validation Gap

The suite is comprehensive but reveals a structural gap: every evaluation runs Llama-3.1-8B (GGUF Q4_K_M at `/home/ruffian/SplatRag/models/`). Niodoo's current active stack uses Qwen3.6-27B on port 8202. The physics parameters were tuned for the Llama architecture — gravity_well=0.6, repulsion=-1.3, blend=1.2 — and may not transfer directly to Qwen's hidden-state geometry.

The suite also lacks cross-model validation: no runs comparing Llama vs Qwen under identical physics configs, no measurement of whether the "wobble-snap-back" phenomenon is model-specific or architecture-universal. This is the missing bridge between the Physics Remake era and active Niodoo.

## Connection to Active Niodoo

The PARB-200 evaluation methodology (Grok-4 blind judge, 5-seed statistical confidence, telemetry capture) maps directly to Niodoo's Gate 34 validation pipeline. The killer prompts (troy weight, drying towels, killers in room) test the same intuitive-failure patterns that Niodoo's governor and viscosity system target. The rainbow sweep infrastructure provides a template for systematic physics calibration on Qwen — something the current niodoo setup lacks.

## Five Testable Predictions

1. **Cross-model transfer:** Niodoo physics parameters tuned on Llama-3.1-8B will produce qualitatively similar wobble-snap-back behavior on Qwen3.6-27B at gravity_well ∈ [0.5, 0.8], suggesting the phenomenon is architecture-universal rather than model-specific.

2. **PARB-200 improvement threshold:** The Grok-4 blind judge evaluation will show Niodoo outperforming vanilla Ollama on instruction-following prompts (constraint writing: no-letter 'e') by ≥15% but only ≥3% on factual prompts, confirming Gate 3/4 distinction.

3. **Debris filtering as early-warning:** The debris token count from `triad_double_rainbow.py` will correlate with TopoCoT correction_norm in active Niodoo — high debris predicts correction events before they fire.

4. **Constant-seed topology shift:** Running the wobble_sweep with --seed 42 across physics_blend values [0.5, 1.2, 3.0] will show output token distribution entropy changing monotonically (not randomly), proving steering alters generation topology rather than just amplifying existing patterns.

5. **Omni-Tuner layer selection:** The `--physics-start-layer=16` parameter in rainbow_omni.py suggests physics injection begins at mid-network layers — testing earlier start layers (8, 12) vs later (20, 24) on Qwen will reveal whether the steering depth is model-dependent.

## What's Next

The Physics Remake suite is a complete evaluation engine waiting for a model transfer. The next step is running PARB-200 on Qwen3.6-27B via the local llama.cpp proxy (port 8202) with Niodoo physics parameters, using the same Grok-4 blind judge methodology to establish whether Gate 3/4 distinction holds across model families.
