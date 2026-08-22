# 60-second hire spine

**Jason Van Pham** (Ruffian-L) · jasonvanpham@niodoo.com · [github.com/Ruffian-L](https://github.com/Ruffian-L) · [niodoo.com](https://niodoo.com)

This page is a 60-second read. The living volume index is [`MASTER_WORK_INDEX.md`](MASTER_WORK_INDEX.md). The picture of the work is SplatRAG v3 (`sp start`), not a second website. See [`FACE.md`](FACE.md).

## Claim

A frozen-model **runtime** that knows where it is well enough to act, write durable state, and keep that state across process death. Weights do not change. The loop does.

Agency. Continuity. Understanding. Accuracy is a side effect, not the object.

## Strongest public evidence (offline, no GPU)

[niodoo-adaptive-agency](https://github.com/Ruffian-L/niodoo-adaptive-agency) — **Double Seal** (Grok Seal + Jason & Sol Seal).

- Zenodo: [10.5281/zenodo.21965763](https://doi.org/10.5281/zenodo.21965763)
- Hugging Face: [ruffian-l/niodoo-adaptive-agency](https://huggingface.co/datasets/ruffian-l/niodoo-adaptive-agency)
- Offline verify: `./run verify --check` then `./run docs-check`
- What it records: a frozen Llama 3.1 8B wrote a list-mapping rule, the process died, two new processes answered a reworded same-family task with the exact constrained answer `[5, 4, 3, 2, 1, 5]`, twice from cold.
- Post-seal bound (hashed): 56 added real memories — two of six arrangements still solved exactly; four failed. Not a reliability rate.

Read [`FALSIFIERS.md`](https://github.com/Ruffian-L/niodoo-adaptive-agency/blob/main/FALSIFIERS.md) first.

## Live bench (2026-08-17)

Same GGUF `Meta-Llama-3.1-8B-Instruct-Q5_K_M.gguf`, seed 42, temperature 0.7, 77-item PARB:

| Arm | Correct / 77 |
|-----|----------------|
| Niodoo physics on (`iter36_b152`, blend 1.52) | **25** |
| stock `llama-cli` + Meta official Llama-3.1 jinja | 24 |

Stock scored **24 on every config** (31/31). Niodoo on the same frozen weights spanned **0 to 25**. The knobs move the model. The stock runtime cannot. Receipt: [`silos/live/parb-25-vs-24.md`](silos/live/parb-25-vs-24.md).

Do not mix this with the 2025-12-19 multi-seed figure (29.9 % vs 41.6 %). That is a different protocol and lives in [`silos/trail/`](silos/trail/).

## Body of work (volume)

- **17 public** GitHub repos (Rust / Python / C++) plus **14 private**
- May 2026 white paper + **32** deep dives, July publish bundle, live/trail silo system
- Hashed runs preferred over prose. Text was generated with AI and may not always match the work. The hashed runs do.
- Machine-readable list: [`MASTER_WORK_INDEX.csv`](MASTER_WORK_INDEX.csv)

## How to check in five minutes

1. `git clone https://github.com/Ruffian-L/niodoo-adaptive-agency && ./run verify --check`
2. Read this file, then one live card: [`silos/live/agency-sealed-route.md`](silos/live/agency-sealed-route.md)
3. Open [`MASTER_WORK_INDEX.md`](MASTER_WORK_INDEX.md) if you need the rest of the volume
