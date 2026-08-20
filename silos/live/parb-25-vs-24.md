# PARB-77, Niodoo 25, stock llama.cpp 24

> Date: 2026-08-17 (run) · re-scored 2026-08-19
> Status: live
> Use this. Do not mix with the 29.9 vs 41.6 trail card.

## Result

| Arm | Correct / 77 | Rate |
|-----|----------------|------|
| Niodoo, physics on (`niodoo_iter36_b152`) | **25** | 32.5 % |
| stock `llama-cli` + Meta official Llama-3.1 jinja | 24 | 31.2 % |

Same GGUF `Meta-Llama-3.1-8B-Instruct-Q5_K_M.gguf` (sha256 `14e10feb…`), seed 42, temperature 0.7, `n_predict` 256, 77-item bank. Niodoo knobs: blend **1.52**, gravity well 0.18, ghost gravity 10.0, σ 0.15, layers 16–31. Binary sha256 `80b4b95c23f9…`.

Re-score from that run's own raw outputs: **25 / 24**. It reproduces.

## What to take

A frozen 8B, physics on, beat an untouched public `llama.cpp` arm that was given Meta's own chat template. Small accuracy add. Agency and continuity are the object; this card is the bench that people asked for (true vanilla stock, not Niodoo-with-a-flag-off).

## Where

- Lane writeup: `niodoo-parb-physics` `research_logs/2026-08-18_parb_36_iter_sweep.md`
- Collected: `niodoo-adaptive-agency/benchmarks/README.md`
