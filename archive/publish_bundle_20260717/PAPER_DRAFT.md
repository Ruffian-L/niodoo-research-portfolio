# Niodoo: A local hidden-state steering runtime for frozen language models  
## Evidence checkpoint and open questions

**Jason Van Pham**  
Independent / Niodoo project  
2026-07-17 (checkpoint)

*Draft for Zenodo technical report. Cite the evidence bundle shipped with this PDF/folder.*

---

## Abstract

Niodoo is a local runtime that sits beside a frozen open-weight language model and steers generation by applying physics-inspired forces in hidden state space. It does not retrain weights.

**What already worked (checkpoint-level):** a December 2025 PARB-style ambiguity battery showed Niodoo Physics at **40.3%** vs vanilla Llama-3.1 8B at **21.5%** (+87% relative) on a 72-item scored set, with intervention telemetry; TruthfulQA-mode runs exist as full transcripts; restore/memory packs later showed **semantic recovery 20/20** on a seed42 suite with the dominant failure identified as post-answer drift, not memory absence; a GMMS process-memory mini-suite reported **12/12** intended selection under controls. A Gemini activity mine alone retains **690** explicit Niodoo eval-shaped records across months of work.

**What this report also insists on:** next-token outcomes are **path-dependent**. “Models only see tokens” is true of I/O and incomplete as a behavior story. Limits are stated so the wins stay credible—not so the wins disappear.

---

## 1. Motivation

Small open models lock wrong final answers even when intermediate reasoning is partly correct. Industry lore often reduces this to “tokenization” or “the model can’t count.” That slogan is incomplete: between input tokens and output tokens lies a trajectory of residual state, optional multi-turn KV context, and—in this project—an external controller that can nudge that state.

Niodoo was built to make that controller **local, inspectable, and logged**: per-token forces, governors, basins, and (optionally) correction packets. The goal of this checkpoint is to put **artifacts and a name** in public, not to claim general AGI or broad SOTA.

---

## 2. System sketch

- **Frozen model:** typically Llama-3.1-8B-Instruct (GGUF quantizations vary by era: Q4/Q5).
- **Controller:** Rust runtime; force application in attention residual path over a configured layer range.
- **Optional bridge:** pull toward exported 64-D attractor basins (registry of candidates), with a hard-capped smoke clamp on the published path.
- **Optional memory path:** codebook + trained hidden codec + correction packets (not always loaded).
- **Telemetry:** JSONL / NDJSON per token or per event (era-dependent schemas).

Details of equations and line references live in the research ledgers; this paper prioritizes **reproducible outcomes and file evidence**.

---

## 3. Evidence already on disk (checkpoint inventory)

### 3.1 December 2025 physics era (Niodoo-Physics-LLM)

Bundled under `evidence/december_physics/`:

| Artifact | Content |
|---|---|
| `parb_review_summary.md` | PARB-200-style comparison, **2025-12-18**: vanilla Ollama **15.5/72 (21.5%)** vs Niodoo Physics v2 **29.0/72 (40.3%)**; exclusive wins and intervention counts (governor/viscosity/soul) recorded |
| `parb_comparison_report.md` | Full comparison writeup |
| `benchmark_results.md` | Creative / logic / prose side-by-sides vanilla vs Niodoo |
| `strawberry_test_result.md`, `strawberry_sweep_result.md` | Letter-count experiments under gravity/blend sweeps |
| `hard_logic_comparison.md`, `ollama_vs_golden.md`, `30_prompt_benchmark.txt` | Additional batteries |

These establish: **early Niodoo was evaluated beyond a single strawberry anecdote**, with ambiguity/logic batteries and intervention telemetry.

### 3.2 TruthfulQA-mode transcripts

Bundled under `evidence/truthfulqa/`:

- `truthfulqa-mode-niodoo-rolling10-*.txt` — full question streams + metric blocks  
- `truthfulqa-mode-vanilla-*.txt` — vanilla-mode counterpart  

These are **raw run logs**, not yet a clean accuracy leaderboard. They are still public-grade evidence that TruthfulQA-style evaluation was run on both modes and preserved (also in Grok export assets).

### 3.3 Bridge claim path (niodoo-live, mid-2026)

Bundled under `evidence/claim_card/` and root `WHITEPAPER.md`:

- Narrow, hash-pinned trap battery (seed 42, temp 0) for bridge-off vs bridge-on  
- Reproduce scripts in the parent repo (`reproduce.sh`, `harness/run_battery.sh`)  
- Explicit limits in the whitepaper: not multi-seed, bridge-off ≠ pure vanilla  

### 3.4 Multi-factor / path-dependence (Feb–Jul 2026)

Bundled under `evidence/supersonic/`:

- Session tables and recovered multi-prompt telemetry era  
- Demonstration that free-form multi-turn physics logs are large (tens of thousands of events per few replies)—instrumentation density, not “many conversations”

**Interpretation for this paper:** whether a letter-count or trap answer lands as 2 or 3 depends on **run shape** (prompt template, multi-turn state, force schedule, basin geometry, decode length). A single seed and a single script shape cannot represent the whole system. That is a finding about methodology, not a personal contest between tools.

---

## 4. Wins, restated without apology

1. **Built and ran** a training-free steering runtime with dense force telemetry.  
2. **December PARB-style battery:** large relative lift vs vanilla on a scored ambiguity set (files in `evidence/december_physics/`).  
3. **TruthfulQA-mode experiments** preserved as full logs (Drive + export + this tree’s mining path).  
4. **Memory/restore:** recovery can hit full pack rates while final-window scores lag—because the instrument shows **when** the answer landed and that generation did not stop.  
5. **Process-memory (GMMS) mini-suite:** high intended selection under non-trivial controls (runbook).  
6. **Public-facing rigor without self-erasure:** constraints belong in one section; they are not the product.

See also `WINS_FIRST.md` in this bundle.

---

## 5. Limits (short)

True vanilla (raw llama.cpp) multi-seed tables; basin aim when distance is large; clean TruthfulQA % table from logs; final LOCK-stop plumbing so recovery becomes final-window wins. None of these erase §3–4.

---

## 6. Conclusion

Niodoo already has **measurable wins** and a large experimental footprint. The careful public move is to **lead with those wins**, attach evidence paths, state limits once, mint a DOI, and stop hiding the work behind only cautions or tool-vs-tool scorekeeping.

**Corresponding author: Jason Van Pham.**

---

## Acknowledgments

People and systems that built, measured, and argued: collaborators across long-running sessions (Claude, Grok, Gemini, and others), and everyone who insisted on hashes, telemetry, and limits. **Corresponding human author: Jason Van Pham.**

---

## Data availability

This folder `publish_bundle_20260717/` is the evidence pack for the checkpoint. Larger telemetry JSON files remain on the author’s machine under the paths listed in `README.md` and can be attached to a Zenodo version-2 upload.
