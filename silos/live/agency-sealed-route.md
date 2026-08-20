# Sealed route: teach, die, answer from the store

> Date: 2026-08-09 (sealed) · written 2026-08-16
> Status: live
> Use this. Accuracy benches are a different drawer.

## Result

A frozen Llama 3.1 8B wrote a general list-mapping rule to a durable store. Process killed. Two new processes loaded the same store and answered a differently worded task from the same family. Both produced the exact constrained answer `[5, 4, 3, 2, 1, 5]`. Byte-identical from cold twice.

No weight update. The stored rule was not injected as prompt gold. A vanilla `llama.cpp` route on the same model bytes took wrong routes at length five.

## What to take

Agency here means: the loop selected a durable write, survived process death, and used it. Continuity is the store. Understanding is the transfer to reworded wording. That is the object of this git.

## Where

- `gathered_20260818/PAPER_Knowing_Where_You_Are.md`
- `gathered_20260818/PAPER_Adaptive_Agency_Frozen_8B_sol_glimmer.md`
- `gathered_20260818/PAPER_Hard_Agency_Pass_20260808.md`
- Public: [niodoo-adaptive-agency](https://github.com/Ruffian-L/niodoo-adaptive-agency) (Zenodo 10.5281/zenodo.21965763)
