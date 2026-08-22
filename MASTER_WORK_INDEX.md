# MASTER_WORK_INDEX — Jason Van Pham / Ruffian-L / Niodoo

Generated **2026-08-22**. Spine git: [`niodoo-research-portfolio`](https://github.com/Ruffian-L/niodoo-research-portfolio) (this directory).

Job-facing 60-second page: [`HIRE.md`](HIRE.md). Machine-readable rows: [`MASTER_WORK_INDEX.csv`](MASTER_WORK_INDEX.csv). Hypothesis index (papers only): [`RESEARCH_MAP.md`](RESEARCH_MAP.md).

This file is the **volume index**. It exists so the body of work is visible as one job artifact. It does not reconcile papers against each other.

**How it was built:** `gh repo list Ruffian-L` (17 public + 14 private, 2026-08-22), this git's `RESEARCH_MAP.md` / `CATALOG.md` / silos, and reachable local paths. Remainder pass (same day): full 78G jsonl scan, wobble extract scored, private repos opened from GitHub + local trees.

| Count | What |
|------:|------|
| 17 | public GitHub repos |
| 14 | private GitHub repos (now claim + local/GitHub evidence) |
| 15 | live papers / thread drafts in `RESEARCH_MAP.md` |
| 4 | dated local-name artifacts |
| 7 | archive papers / bundles (May white paper + 32 deep dives) |
| 3 | live silo cards |
| 5 | trail silo cards |
| 6 | `LOCK.json` packs opened on NVMe |
| 4,721 | December-style scored rows (`seed` / `question_id` / `verdict`) |
| 2,353,986 | machine telemetry jsonl records (full scan, 0 parse errors) |
| 178 | wobble staged jsonl rows (14 files); 2 recovered scored cells |

---

## 60-second hire spine

- **Claim:** frozen-model runtime that knows where it is well enough to act, write durable state, and keep it across process death.
- **Strongest public evidence:** [niodoo-adaptive-agency](https://github.com/Ruffian-L/niodoo-adaptive-agency) — Double Seal. Zenodo [10.5281/zenodo.21965763](https://doi.org/10.5281/zenodo.21965763). Offline: `./run verify --check`.
- **Live bench:** 2026-08-17 PARB-77, same GGUF, seed 42 — Niodoo physics **25/77** vs stock llama.cpp **24/77**. Stock flat 24 across 31 configs; Niodoo 0–25.
- **Contact:** jasonvanpham@niodoo.com · github.com/Ruffian-L · niodoo.com
- Full recruiter page: [`HIRE.md`](HIRE.md)

---

## Public code repos (claim + evidence)

All owner `Ruffian-L`. Dates from GitHub API 2026-08-22.

| repo | created | updated | lang | one-line claim | evidence pointer |
|------|---------|---------|------|----------------|------------------|
| [niodoo-research-portfolio](https://github.com/Ruffian-L/niodoo-research-portfolio) | 2026-08-20 | 2026-08-20 | Shell/MD | Working research house + living index | this git: `RESEARCH_MAP.md`, `silos/live/`, `silos/trail/` |
| [niodoo-adaptive-agency](https://github.com/Ruffian-L/niodoo-adaptive-agency) | 2026-08-10 | 2026-08-17 | Rust | Frozen 8B writes a rule, dies, two fresh processes transfer exactly; Double Seal | Zenodo 10.5281/zenodo.21965763; `./run verify --check`; `evidence/durability/20260815/` (hashed; 2/6 shuffles PASS at 56 memories) |
| [niodoo-hidden-state-steering](https://github.com/Ruffian-L/niodoo-hidden-state-steering) | 2026-06-24 | 2026-08-03 | Rust | Last-token hidden-state correction on a frozen LLM, reproducible from pinned hashes | repo README + `WHITEPAPER_Hidden_State_Last_Step.md` in this git |
| [Niodoo-Physics-LLM](https://github.com/Ruffian-L/Niodoo-Physics-LLM) | 2025-12-16 | 2026-08-04 | Rust | Inference-time force engine on activations; no weight update | repo README; active line continues in `niodoo-hidden-state-steering` |
| [hydrodynamic-swarm](https://github.com/Ruffian-L/hydrodynamic-swarm) | 2026-02-28 | 2026-08-22 | Rust | Residual-stream vector-field steering + splat memory across process death | `docs/CONTINUITY.md`; `./splat-lens museum`; local sibling `hydrodynamic-swarm-3surface` |
| [SplatRagBench](https://github.com/Ruffian-L/SplatRagBench) | 2025-11-24 | 2026-07-26 | Rust | Hybrid retrieval (lexical + dense + geometry) on SciFact | in-repo table: hybrid nDCG@10 **0.7822** vs dense-only **0.6291** (project eval, `./runbench`) |
| [cathedral-beir](https://github.com/Ruffian-L/cathedral-beir) | 2025-11-28 | 2026-07-26 | Python | Pure 768D cosine, no BM25/rerank as the default path | in-repo dataset table (Quora 0.8818 … SciDocs 0.1865). GitHub *description* still says “beats SOTA 0.5881 vs 0.52”; README now treats that as non-publishable without matched protocol |
| [physics-of-friendship-mountaincar-rl](https://github.com/Ruffian-L/physics-of-friendship-mountaincar-rl) | 2026-02-27 | 2026-07-28 | Python | Q-SMA + dream replay on MountainCar | `results/` + `make reproduce`. Physics-only 2000/2000 solver in README is a **scripted** solver, not learning |
| [YinYangQSMA](https://github.com/Ruffian-L/YinYangQSMA) | 2026-02-18 | 2026-07-25 | Rust | Q-learning slime-mold algorithm on MountainCar MDP | public repo; README on disk is a stub. Sibling of the Python friendship repo |
| [physicslang](https://github.com/Ruffian-L/physicslang) | 2026-07-17 | 2026-07-17 | Rust | Tokens as particles; grammar as force laws; inversion to antipode not to zero | day-1 scaffold; `cargo test`; `docs/` |
| [niodoo-rocket-core](https://github.com/Ruffian-L/niodoo-rocket-core) | 2026-06-01 | 2026-07-25 | Rust | Hard problem → correct → full context death → fresh process still better | north-star loop in README; agency later sealed in `niodoo-adaptive-agency` |
| [niodoo-autonomous-self-correction-and-dynamic-control-loops-in-ai](https://github.com/Ruffian-L/niodoo-autonomous-self-correction-and-dynamic-control-loops-in-ai) | 2026-04-07 | 2026-07-25 | Rust | Verbal control loops + activation steering on local GGUF | public README |
| [jlens-gguf](https://github.com/Ruffian-L/jlens-gguf) | 2026-08-03 | 2026-08-04 | Rust | First-answer-token residual geometry predicts continuation from inside GGUF | Gemma 3 4B AUC **0.875**, Gemma 3 27B **0.893** (pass 0.80 bar); Gemma 4 12B **0.696** miss; Llama 3.1 8B 0.738 underpowered |
| [ontological-inversion](https://github.com/Ruffian-L/ontological-inversion) | 2026-06-24 | 2026-08-05 | Python | Sorrowful memory flipped toward a structured joyful antipode | repo README (“Anti-Splat”) |
| [cargo-bless](https://github.com/Ruffian-L/cargo-bless) | 2026-02-28 | 2026-08-22 | Rust | Cargo subcommand: lockfile vs blessed.rs; TTY/JSON/SARIF | shipped: [crates.io/crates/cargo-bless](https://crates.io/crates/cargo-bless) · docs.rs. Tool, not a consciousness claim |
| [niodoo-tcs](https://github.com/Ruffian-L/niodoo-tcs) | 2025-10-18 | 2026-07-30 | C++ | Topological cognitive system (knot / TQFT / Betti) | public repo. **Trail:** designed and on disk, **not wired into decode** (`silos/trail/tcs-unwired.md`, `Inner_Monitor_TCS_Unwired.md`) |
| [Niodoo-TCT](https://github.com/Ruffian-L/Niodoo-TCT) | 2025-11-02 | 2026-07-17 | Python | Experimental INT8 nToken / persistent-homology scaffold | `scripts/demo_encode.py`; early |

---

## Private GitHub repos (opened this pass)

Still private. Claim + evidence from GitHub contents and local trees. No personal memory dumped.

| repo | created | updated | lang | one-line claim | evidence |
|------|---------|---------|------|----------------|----------|
| splatrag | 2026-07-30 | 2026-08-05 | Rust | v3 local Gaussian-splat memory store (cold log, BM25+HNSW, picker) | GitHub private. Live tree: `splatrag-clean` **6.0G**, `Cargo.toml` name=splatrag **3.0.0**. Python rebuild stub: `Hub/Projects/splatrag/splatrag` 90M |
| niodoo-live-private | 2026-07-23 | 2026-07-23 | Rust | Private working mirror of the live runtime. Not for publication | local `/home/ruffianl/Hub/Projects/niodoo/niodoo-live-private` 74M; last commit `233429c` 2026-07-15. `SCOREBOARD.md` + `WHITEPAPER.md` |
| niodoo-runtime | 2026-06-13 | 2026-06-13 | Rust | Clean rebuild lane: mock backend, command-gated claims, no hidden control paths | GitHub `README.md`: `cargo test`; `cargo run -- run --backend mock`. Excludes CUDA/SplatRAG/GGUF |
| latent-trajectory-codec | 2026-03-28 | 2026-07-26 | Python | 64D latent transport + VQ codebook | local ghost 32M. `CLAIMS.md`: M5 8/8 specialists; M7.5 VQ 256 / 0 dead / 320× / exact round-trip; M8 4 forcing types, max energy < 0.192 |
| c-council | 2026-07-04 | 2026-07-05 | Rust | Roundtable: isolated AI voices, no shared tools/MCP/keys | crate name `roundtable`. `ISOLATION.md`: spawn via argv, empty cwd, API keys stripped |
| Lumina-Concourse | 2026-03-06 | 2026-03-06 | Rust | EmbedSwarm 9-node thermodynamic / Three Gemmas scaffold | GitHub README (Kuramoto-Adler, Ginzburg-Landau). 79 KB disk |
| niodoo-inference-steering | 2026-02-17 | 2026-02-20 | Rust | Early steering WIP | GitHub has `Algo_WIP.txt` / `Algo WIP.docx`, `benchmarks/`, `demo.sh`. README is a stub |
| niodoo-shimeji | 2025-11-15 | 2026-02-16 | Python | Gemini-powered Shimeji desktop companion | GitHub description; 630 KB |
| ParaNIODo.O | 2025-08-05 | 2025-09-09 | Python | 2025 companion / sprite stack (click-through, always-on-top) | local ghost `ParaNIODo.O-main` **3.8G** (mp4 + guides). GitHub 3.8G |
| bullshitdetector | 2025-11-17 | 2026-02-16 | Rust | Magic-number / smell detector | local 264K; `Cargo.toml` 1.0.0 |
| BS-MCP-REFACTOR | 2025-10-13 | 2026-02-16 | HTML | MCP refactor dump | GitHub 38 MB; no local tree indexed |
| Leo | 2025-10-10 | 2026-02-16 | — | Screenshot dump, not a research crate | GitHub 16 MB, mostly PNGs. Not expanded |
| niodoo-ai | 2025-11-03 | 2026-02-16 | — | Empty husk | GitHub size 0; contents = `README.md` only |
| supersonic-semantic | 2026-02-20 | 2026-02-20 | — | Empty husk | GitHub size 0 |

---

## Local trees that are not the public GitHub name

These are on the machine. They are part of the volume even when the public repo is a sibling or a private mirror.

| tree | path | what it is |
|------|------|------------|
| niodoo-live | `/home/ruffianl/Hub/Projects/niodoo/niodoo-live` **75G** | Live physics runtime. PARB 25 vs 24. Three God-Zone `LOCK.json` packs. Git remote is `niodoo-hidden-state-steering` |
| dual-stream-soul | `/home/ruffianl/Hub/Projects/niodoo/dual-stream-soul` | Dual-stream / free-land LOCK packs (2026-08-08) |
| hydrodynamic-swarm-3surface | `/home/ruffianl/Hub/Projects/hydro/hydrodynamic-swarm-3surface` | Current hydro 3-surface seat (chat residual, eval harness) |
| splatrag-clean | `/media/ruffianl/ghost_team/02_projects/projects/splatrag-clean` (`sp start`) | Basin Field face. Demo = ULTIMA + silo cards. Not the personal dump |
| memory-niodoo-telemetry | `/home/ruffianl/Hub/Projects/splatrag/memory-niodoo-telemetry` | 103G hashed telemetry silo (see local-only) |

---

## Papers (from RESEARCH_MAP — do not reconcile)

### Live

| paper | hypothesis (short) | evidence / where |
|-------|--------------------|------------------|
| `ULTIMA_NIODOO.md` | Frozen model + runtime loop has usable knowledge of where it is | this git |
| `gathered_20260818/PAPER_Knowing_Where_You_Are.md` | Operational self-location; agency is acting from that | Zenodo 10.5281/zenodo.21965763 |
| `gathered_20260818/PAPER_Adaptive_Agency_Frozen_8B_sol_glimmer.md` | Stored rule survives process death and transfers | adaptive-agency record |
| `gathered_20260818/PAPER_Hard_Agency_Pass_20260808.md` | Store-mediated mapping without a gold oracle | 2026-08-08 pass |
| `gathered_20260818/WHITEPAPER_Hidden_State_Last_Step.md` | Last-token hidden-state toward exported basins | hidden-state-steering |
| `Token_Physics_Dynamical_Control.md` | God Zone is a composition, not a single add | live thread |
| `Hidden_State_Hydrodynamic_Swarm.md` | Force mid-forward-pass on last-token probe | live thread |
| `Scar_Memory_Addon.md` | Scar / LOCK / PACKET is add-on memory | live thread |
| `PhysicsLang_Control_Law_Composition.md` | Control law is atoms composed | physicslang |
| `Logit_Governor_Viscosity.md` | Governor/viscosity brake logits; not residual add | live thread |
| `Physics_of_Friendship_MountainCar.md` | Q-SMA + dream replay; ablations stay | friendship repo |
| `SplatRagBench_Hybrid_Retrieval.md` | Hybrid retrieval; dense-only loss published | SplatRagBench |
| `Dilution_Recovery_God_Zone.md` | Live dilution vs env-gated recovery receipts | live thread |
| `Dual_Stream_Midstream_Ablation.md` | Midstream β/σ inject is live; strawberry letter-count lift is **not** supported | live thread |
| `Inner_Monitor_TCS_Unwired.md` | TCS exists on disk and is not wired into decode | trail instrument, honest paper |

### Dated local artifacts (not a brand)

`Echo_Memoria_Named_Persistent_Memory.md` · `Lumina_Self_Naming_Runtime.md` · `Shep_Named_Local_Research_Team.md` · `Dream_Cycle_Ten_Thousand_Memories.md`

See `NAMES.md`. Chronology, not product.

### Archive

- `gathered_20260818/ARCHIVE_Self_Emergence.md` (2026-07-17)
- `gathered_20260818/ARCHIVE_Steering_And_Control_Tags.md` (2026-07-17)
- `archive/white_paper_physics_steering_20260507/` — WHITE_PAPER_DRAFT + **32** deep dives (counted 2026-08-22)
- `archive/publish_bundle_20260717/`

### Excluded (on disk, not this git)

`Emitted_Control_Tags_Path_B.md` — extra tags from unasked plan criteria. Mechanism of real tags: `ULTIMA_NIODOO.md` §3.3. See `provenance/CONTAMINATION.md`.

---

## Live silo cards

| card | date | take |
|------|------|------|
| [`silos/live/agency-sealed-route.md`](silos/live/agency-sealed-route.md) | 2026-08-09 | Write rule → process death → exact `[5, 4, 3, 2, 1, 5]` twice from cold |
| [`silos/live/parb-25-vs-24.md`](silos/live/parb-25-vs-24.md) | 2026-08-17 | 25 vs 24 stock, same GGUF, seed 42 |
| [`silos/live/runtime-moves-the-weights.md`](silos/live/runtime-moves-the-weights.md) | 2026-08-17 | Stock flat 24 × 31; Niodoo 0–25; 1 of 31 at or above stock |

## Trail silo cards (already paid — do not subtract from live)

| card | take |
|------|------|
| `silos/trail/parb-29-9-vs-41-6.md` | 2025-12-19 multi-seed 29.9 % vs 41.6 %. Different protocol |
| `silos/trail/control-channel-accuracy.md` | Tag emission is common; accuracy lift on that corpus is not the object |
| `silos/trail/black-hole-repulsion-zero.md` | Code runs; force is zero on measured runs |
| `silos/trail/tcs-unwired.md` | Inner monitor / TCS on disk; not wired into decode |
| `silos/trail/retired-scorer-margin.md` | A 25–24 card that re-scored 24–24. Scorer, not physics. Retired |

---

## Local-only — filled this pass (not pending)

### 1. SplatRAG niodoo-telemetry basin — 103G, hashed, ingest incomplete

| field | value |
|-------|-------|
| path | `/home/ruffianl/Hub/Projects/splatrag/memory-niodoo-telemetry` |
| size | **103G** silo; corpus **102G** (human 25G + machine 78G) |
| ghost copy | `/media/ruffianl/ghost_team/01_memory/splatrag-corpus/` **78G** (`niodoo-telemetry.jsonl`) |
| STATUS.json | 2026-08-16T02:17:07Z · `walk_done: true` |
| files_scanned | 1,424,877 |
| unique_files | 22,298 |
| unique_records | **2,353,986** |
| dup_records | 8,991,683 |
| ingested_ok | **6,311** |
| pending_ingest | 14,709 |
| machine jsonl | `corpus/machine/niodoo-telemetry.jsonl` |
| schema (first 20 rows) | `id`, `content_sha256`, `file_sha256`, `source_path`, `drive`, `mtime`, `extracted_at`, `type`, `domain`, `silo`, `silo_domain`, `record_kind` |
| ledger | `ledger/ingested.jsonl` **6,312** rows, status=ingested all, **112,401** emitted sum. Domains: niodoo-legacy 3333, niodoo-run 2219, niodoo-telemetry 613, god-zone 82, niodoo-route 45 |
| full scan (2026-08-22, 615s, 0 parse errors) | **n = 2,353,986** = STATUS `unique_records`. bytes 83,022,319,021 = STATUS `machine_corpus_bytes` |

**Outer census (every record):**

| type | n | domain | n | kind | n | drive | n |
|------|--:|--------|--:|------|--:|-------|--:|
| log | 1,864,362 | niodoo-log | 1,864,362 | line | 2,335,910 | backup_sandisk1 | 1,427,913 |
| niodoo-telemetry | 301,980 | niodoo-run | 301,980 | file | 17,538 | backup2 | 565,011 |
| niodoo-run | 186,329 | niodoo-legacy | 180,053 | file_meta | 538 | ghost_team | 211,799 |
| chat_raw-turns | 476 | niodoo-route | 6,189 | | | nvme | 149,263 |
| ledger | 470 | (10 smaller domains) | | | | | |

**Outcome column:** not a judged bench. First **500k** records: string `verdict` in **2,572**, `"seed"` in **1,664**, `question_id` in **0**. The 4,721 December scored rows live in Inbox, not as a uniform column here. Ingest remains **6,312 / 2,353,986**. This pass **characterized** the dump; it did not run the ingest.

Cold/hot/indexes on NVMe are small (145M / 141M / 115M) relative to the 102G corpus dump.

### 2. LOCK runs — 6 packs opened (not unread)

All under `/home/ruffianl/Hub/Projects/niodoo/`. Protocol: strawberry letter-count, dual-stream HARD OFF on C unless noted. **Do not treat strawberry letter-count as the live seat** (`Dual_Stream_Midstream_Ablation.md` says that lift is not supported). These are receipts.

| pack | locked | exclusive C win | C answers | A | B | notes |
|------|--------|-----------------|-----------|---|---|-------|
| `dual-stream-soul/.../LOCKED_FREE_LAND_strawberry_s42_20260808T063106Z` | false | false | C wrong | A=`2,2` fail | B=`3,3` **pass** | C not exclusive |
| `.../LOCKED_FREE_LAND_strawberry_s42_blend040_20260808T063344Z` | false | false | C=`2`×5 fail | A=`2,2` | B=`3,3` pass | blend 0.40 |
| `.../LOCKED_FREE_LAND_strawberry_s42_godzone_b040_20260808T063557Z` | false | false | C=None×5 | A=None | B=None | no parsed answers |
| `niodoo-live/.../god_zone_freeland_lock_20260808T065411Z` | false | false | C=`2`×5 | A=`2` | B=`2` | repulsion **0**; goal 30; gravity ~6.1 |
| `niodoo-live/.../god_zone_freeland_repel_boost_20260808T070706Z` | — | **true** | C=`3`×5 **pass** | A=`4,4` fail | B=`4,4` fail | `flag_dropped`; g=20, r≈4.24, goal 30; physics dual-force on C |
| `niodoo-live/.../god_zone_freeland_multiseed_7_211_20260808T072239Z` | — | **true** on seeds 7 and 211 | C=`3`×5 both seeds | A=`2,2` | B=`2,2` | `multi_seed_flag_hold`; same bin `75fcd31d…`, model `7b064f58…` |

Sample C fail text (lock 065411Z): `<lock>answer=2</lock>` on “r in strawberry”. Sample C pass (repel boost): character-by-character enumeration, “3 times.”

### 3. December controlled logs — opened, high value, trail protocol

| field | value |
|-------|-------|
| path | `/home/ruffianl/Hub/Inbox/jasonsfiles/unnested_files/run_id-1-timestamp-2025-12-19t05-31-44.118449-question_id-ph--96f20e.txt` |
| rows parsed | **4,721** JSON lines |
| schema | `run_id`, `timestamp`, `question_id`, `seed`, `config`, `verdict`, `target`, `response_short`, `elapsed`, `physics_metrics` |
| question_ids | **77** (PHYS_*, LOGIC_*, AMBIG_*, SEMANTIC_*, CAUSAL_*, MATH_*) |
| seeds | 42, 333, 777, 1234, 9999 |
| verdicts | CORRECT **1289** · AMBIGUOUS **1258** · TRAP **1153** · OTHER **1021** |
| sample row | PHYS_001, seed 42, 2025-12-19T05:31:44, verdict `AMBIGUOUS`, target `1 hour`, `physics_blend` 1.5, governor 74 / viscosity 86 / thermo 202 |

This is the **2025-12-19 protocol family** of `silos/trail/parb-29-9-vs-41-6.md`. Has seed / question_id / verdict. **Not** the live 25 vs 24 seat.

### 3b. Wobble-snap-back rainbow sweep (2025-12-18) — scored from staged extract

Path: `/home/ruffianl/Hub/Projects/splatrag/staging-niodoo-telemetry/niodoo-run/wobble_sweep_20251218_*.jsonl`  
14 files, **171 KB**, **178** `telemetry_line` wrappers, 0 parse errors. Source markdown/CSV on ghost (`.../niodoo-20260804T185916Z-1-001/niodoo/artifacts/`) is gone; reconstruction is from the jsonl.

Three stamps of the same protocol: `020255`, `020338`, `020452`.

| field | value |
|-------|-------|
| header | “Niodoo Wobble-Snap-Back Rainbow Sweep” · **Total Runs: 192** |
| grid | physics_blend `[0.8, 1.2, 1.6, 2.5]` × repulsion `[-0.8, -1.3, -2.0]` × gravity_well `[0.4, 0.6, 0.9, 1.2]` × orbit_speed `[0.15, 0.25]` × T=0.7 × σ=0.05 × max_steps 768 → **96** configs (192 ⇒ two prompts or two seeds; only one prompt recovered) |
| prompt recovered | TroyWeight — “pound of lead or pound of gold”; expected Lead (avoirdupois > troy) |
| scored cells in extract | **2** |

| prompt | blend | repel | gravity | speed | score | verdict | avg_drift | max_drift |
|--------|------:|------:|--------:|------:|------:|---------|----------:|----------:|
| TroyWeight | 0.8 | -0.8 | 0.4 | 0.15 | **0** | WOBBLE (both) | 0.5908 | 1.0830 |
| TroyWeight | 0.8 | -0.8 | 0.4 | 0.25 | **0** | WOBBLE (both) | 0.5666 | 0.9700 |

Both recovered cells **score 0** / wobble. The other 190 of 192 runs are **not in the staged extract**. Schema of the CSV: `prompt,blend,repulsion,gravity,speed,temp,sigma,score,verdict,avg_drift,max_drift,variance,first_100_chars`.

### 4. Adaptive-agency evidence packs — partial public, already hashed

Local and public: `/home/ruffianl/Hub/Projects/niodoo/niodoo-adaptive-agency/evidence/` (92K curated pack; original personal stores unpublished).

**Control scores** (`evidence/control/*/score.json`):

| condition | status | expected |
|-----------|--------|----------|
| original | FAIL | `[5, 4, 3, 2, 1, 5]` |
| short | **PASS_CONSTRAINED** exact | `[3, 2, 1, 3]` |
| letters | FAIL | `[E, D, C, B, A, E]` |
| wording | FAIL | `[5, 4, 3, 2, 1, 5]` |

**Durability 2026-08-15** (`evidence/durability/20260815/`, `SHA256SUMS` present):

- Ladder `real_harvest_order`: PASS exact through K=16 (byte-identical stdout `70d2991b…`); K=32 PASS different hash; K=40, 44, 48, 56 FAIL (same fail hash `ccd5995b…`)
- Shuffle `real_56` six seeds: PASS on **1729** and **501013** (hash `8aa2de66…`); FAIL on 11, 227, 3313, 44497
- Fillers (hex / plain English) FAIL at K=32 and K=56

Matches the public durability README: two of six arrangements at 56 memories. Not a general reliability rate.

**Original stores (unpublished by design, now located):**

| path | size | what |
|------|------|------|
| `niodoo-adaptive-agency/runs/2026-08-21_official11_fullstore` | 198M | `remember_store.jsonl` **32** lines; plus `tel.jsonl` / `messages.json`. Content not copied here |
| `.../official11_fullstore_cap128` | 252M | same family |
| `.../official11_agency` | 179M | same family |
| `niodoo-live/memory_store` | 636K | `niodoo_remembers.jsonl` **14** lines; chat jsonl empty |

The hashed durability pack remains the public face. These trees stay off GitHub.

### 5. Path B manuscript — local-only, excluded on purpose

| file | bytes | sha256 |
|------|------:|--------|
| `Emitted_Control_Tags_Path_B.md` | 21,467 | `917085060d921a84b2f18ded249fc96261ef06ec39d31118340476d7d80cc865` |
| `Emitted_Control_Tags_Path_B.tex` | 23,532 | `2f3fb75aa7ed55ce6140d4a442010da23d6d7e54ea829da37f29bfaf056b962d` |
| `Emitted_Control_Tags_Path_B.pdf` | 72,955 | (render) |

289 lines markdown. Gitignored. `provenance/CONTAMINATION.md` is why. Real tags: `ULTIMA_NIODOO.md` §3.3. Extra unasked tags from a plan are **not** copied into this index.

---

## Still not a full extract (after this pass)

| item | status now |
|------|------------|
| 2.35M telemetry records | **Census done.** Ingest **not** run (6,312 / 2,353,986). That is a pipeline job, not an index gap |
| Wobble 192-run sweep | **Header + 2 cells scored** (both TroyWeight score 0 / WOBBLE). 190 cells missing from staged extract |
| Adaptive-agency personal stores | **Located** (198–252M). Stay unpublished |
| Private repos | **Expanded** (claim + path). `niodoo-ai` and `supersonic-semantic` are empty husks; `Leo` is screenshots |
| Path B | **Hashed and left gitignored** |

---

## Sources for this file

- GitHub: `gh repo list Ruffian-L --limit 200` (2026-08-22), public READMEs, private contents API
- This git: `RESEARCH_MAP.md`, `CATALOG.md`, `silos/live/`, `silos/trail/`
- Local: full scan of `memory-niodoo-telemetry/corpus/machine/niodoo-telemetry.jsonl` (615s); `ledger/ingested.jsonl` 6,312 rows; 14 wobble jsonl; 6 `LOCK.json`; December 4,721-row file; adaptive-agency `evidence/` + `runs/` sizes; private trees listed above
- Not used: SplatRAG MCP (server timed out)
