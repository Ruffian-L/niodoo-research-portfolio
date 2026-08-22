# MASTER_WORK_INDEX — first compiled volume of the work

> Date: 2026-08-22
> Agent: Grok (xAI)
> Repo: niodoo-research-portfolio (`/home/ruffianl/Documents/Papers`)

## Context

Jason asked for a proper index of *everything* so the volume is visible as a job artifact. Previous turns kept answering with hedge + restate + one live slice. This turn executes all four physical steps he named: index + CSV in this git, every public repo expanded with claim + evidence, a 60-second hire page, and local-only rows filled from reachable paths instead of marked pending.

Budget note from Jason: 1% of Grok money left. Make it count.

## Hypothesis

If the index is compiled from `gh repo list` plus this git plus opened local files (not from memory of earlier chat), a hiring manager and a later seat can see the volume without walking four drives. Local-only rows that actually open will stop being invisible.

## What changed

- Added `MASTER_WORK_INDEX.md` (volume index), `MASTER_WORK_INDEX.csv` (79 rows), `HIRE.md` (60-second recruiter page, markdown only).
- Pointed `README.md`, `CATALOG.md`, `RESEARCH_MAP.md`, `FACE.md` at those files. Did not rebuild `site/`.
- Expanded **17 public** GitHub repos with one-line claim + evidence. Listed **14 private** by name and GitHub description.
- Included public repos the prior draft omitted: `niodoo-tcs`, `Niodoo-TCT`, `YinYangQSMA`, `cathedral-beir`.
- Opened local-only material:

### SplatRAG 103G basin

Path: `/home/ruffianl/Hub/Projects/splatrag/memory-niodoo-telemetry`
`STATUS.json` 2026-08-16: `files_scanned` 1,424,877; `unique_records` 2,353,986; `ingested_ok` 6,311; `pending_ingest` 14,709; `walk_done` true. Machine jsonl schema is hashed file extracts (`id`, `content_sha256`, `source_path`, `record_kind`). **No judged outcome column.** Ghost copy 78G on `ghost_team/01_memory/splatrag-corpus/`.

### LOCK packs (6, not unread)

Strawberry letter-count protocol, 2026-08-08. Dual-stream C often fails (`answer=2`). God-zone lock with repulsion 0 also fails C=`2`. Repel-boost pack: exclusive C win C=`3`×5 vs A/B=`4`. Multiseed 7 and 211: exclusive C win C=`3` vs A/B=`2`. Recorded as receipts. Not promoted to the live silo; `Dual_Stream_Midstream_Ablation.md` says strawberry letter-count lift is not supported.

### December 2025-12-19 controlled logs

One file, **4,721** JSON rows, 77 `question_id`s, 5 seeds (42, 333, 777, 1234, 9999). Verdicts: CORRECT 1289 / AMBIGUOUS 1258 / TRAP 1153 / OTHER 1021. Schema has `seed` / `question_id` / `verdict`. This is the trail protocol of 29.9 vs 41.6, **not** the live 25 vs 24 seat.

### Adaptive-agency evidence (already hashed)

Control: short PASS_CONSTRAINED; original/letters/wording FAIL. Durability ladder PASS through K=16 byte-identical; K=32 PASS different hash; K≥40 FAIL. Shuffle at 56 memories: 2/6 PASS (seeds 1729, 501013). Matches the public durability README.

## Findings

- The volume is real and reachable in one session: 17 public + 14 private + papers + silos + opened local corpora.
- cathedral-beir GitHub *description* still says “beats SOTA 0.5881 vs 0.52”; the README now disclaims that as a publishable comparative claim. Indexed both, not flattened.
- SplatRAG MCP timed out; the 103G silo was indexed from `STATUS.json` and 20 jsonl rows instead.
- Ingest of the telemetry silo is the actual gap (`6,311` ingested vs `2,353,986` unique), not “no path.”
- LOCK packs were sitting on NVMe the whole time. Calling them unread was the hedge.

## Next

- Remaining 14 wobble_sweep jsonl (2025-12-18) listed, not scored.
- Private repo internals stay listed-not-expanded unless Jason names a path.
- Do not rebuild a website. `HIRE.md` is text. Face remains `sp start`.
