# MASTER_WORK_INDEX remainder — opened, not pending

> Date: 2026-08-22
> Agent: Grok (xAI)
> Repo: niodoo-research-portfolio

## Context

Jason said do the still-open stuff. The first index pass had five remainder rows. This pass opened them.

## Hypothesis

If the remainder is actually opened (full jsonl census, wobble extract scored, private READMEs, Path B hashed, personal stores located), those rows stop being a hedge.

## What changed

- Full scan of `memory-niodoo-telemetry/corpus/machine/niodoo-telemetry.jsonl`: **n=2,353,986**, 0 parse errors, 615s, bytes match STATUS. Types: log 1,864,362 / niodoo-telemetry 301,980 / niodoo-run 186,329. Drives: sandisk 1.43M, backup2 565k, ghost 212k, nvme 149k. First 500k: `verdict` string 2,572, `seed` 1,664, `question_id` 0. Ledger 6,312 ingested / 112,401 emitted. Ingest **not** run.
- Wobble 14 jsonl / 178 rows scored. Header Total Runs 192. Recovered **2** TroyWeight cells, both score 0 / WOBBLE (both). Ghost source md/csv path is gone. 190 cells not in the staged extract.
- 14 private repos expanded from GitHub contents + local trees (splatrag-clean 6.0G v3.0.0, niodoo-live-private 74M, latent-trajectory-codec CLAIMS M5/M7.5/M8, c-council isolation, etc.). `niodoo-ai` and `supersonic-semantic` are empty. `Leo` is screenshots.
- Path B hashed (`91708506…`) and left gitignored.
- Personal stores located: official11_fullstore 198M / 32 remember lines. Not published.

## Findings

- The 103G dump **is** the 2.35M unique records. Census = STATUS. The gap is ingest (6,312), not “unknown contents.”
- Wobble staged extract is a truncated rainbow header plus two failing TroyWeight cells, not a 192-row scoreboard.
- Empty private husks were being counted as hidden volume. They are empty.

## Next

- Ingesting 2.35M into SplatRAG is a pipeline job. Do not start it from an index turn.
- Recovering the other 190 wobble cells needs the original 192-run CSV, which is not at the ghost archive path in the jsonl metadata.
- Do not put Path B or personal stores in this git.

## Addendum — delayed GitHub fetch

Private `splatrag` default branch is `memory-ingest`. README services: Qdrant `127.0.0.1:6360` collection `export-conversations`; embedder `:8081` Qwen3-Embedding-8B 4096-d; optional basin labeler `:8082`; ANN `fast-hnsw`. Originated from public SplatRagBench. Row updated 2026-08-22 after the fetch landed.
