# Niodoo citation table — dated local claims

**Assembled:** 2026-08-17  
**Machine copy:** `Documents/Writing/niodoo_citation_table.json`  
**Rule:** New sleuth/papers cite a row ID `[Cxx]`. Every number and historical date in that writing must appear as a needle in the cited row’s on-disk path. Invented history fails.

Source trees named by the force-term map that are **reachable this pass:**

| Label | Path used | Status |
|-------|-----------|--------|
| Physics-LLM | `/media/ruffianl/ghost_team/02_projects/projects/Niodoo-Physics-LLM` | mounted |
| QSMA | `/media/ruffianl/ghost_team/02_projects/projects/YinYangQSMA` | mounted |
| Live | `/home/ruffianl/projects/niodoo-live` | reachable |
| HSS | `/home/ruffianl/projects/niodoo-hidden-state-steering` | reachable |
| Hydro | `/home/ruffianl/projects/hydro` → `Hub/Projects/hydro/hydrodynamic-swarm-3surface` | reachable |
| `~/projects/Niodoo-Physics-LLM` | (not present) | unmounted/absent; cite ghost_team copy only |

## Inventory

| ID | Date | Numbers / stamp | Path | Thread |
|----|------|-----------------|------|--------|
| C01 | 2025-12-16 | blend 0.55; repulsion −0.60; ghost 10.0; wobble 0.06; orbit 0.1; well 0.2; ramp 4–10; black-hole tokens incl. `assistant` | Physics-LLM `src/main.rs` | token physics |
| C02 | 2025-12-16 | same God Zone stamp | QSMA `src/main.rs` | token physics |
| C03 | 2025-12-19 | PARB 29.9 vs 41.6; 23.0 / 32.0 of 77; generated `2025-12-19T01:45:05` | Physics-LLM `artifacts/parb_rigorous_clean.json` | token physics |
| C04 | 2025-12-19 | 770 runs; winners 15 / 28 / 34 ties | Physics-LLM `README.md` | token physics |
| C05 | 2026-08-07 | claim-package scoreboard + PhysicsLang atoms | `Documents/Writing/NIODOO_CLAIM_PACKAGE_20260807.md` | composition |
| C06 | 2026-08-07 | force-term map; D1–D5; mid-pass vs residual | `Documents/Writing/NIODOO_FORCE_TERM_MAP.md` | composition |
| C07 | 2025-12-16 | `apply_forces` on post-attention `attn`; additive or multiplicative blend | Physics-LLM `src/physics/naked_llama.rs` | hidden-state mid-pass |
| C08 | 2026-06-24 | 4 corrected / 3 held / 1 broken; clamp 0.03; seed 42 | HSS `claim_card.md` | residual face (thin) |
| C09 | 2026-06-24 | scoreboard ladder; latch wash 13/16 vs 13/16 | HSS `SCOREBOARD.md` | residual face |
| C10 | 2026-06-24 | 64D basins; 0.03 clamp; mechanism limits | HSS `WHITEPAPER.md` | residual face |
| C11 | 2026-06-25 | latch-0006 OFF 13/16 ON 13/16; letter-count vs arith split | HSS `harness/runs/latch-0006/card.md` | residual face |
| C12 | 2026-08-07 | recovery Arm A: repulsion max 21.865351; gravity 0.0; 48/32; wobble 2 | live `artifacts/god_zone_recovery_20260807/summary_arm_A_v2.json` | recovery |
| C13 | 2026-08-07 | gravity+repel co-fire: 11.907948 / 4.238407; ramp 1.0; history_n 3; spawns 5 | live `artifacts/god_zone_recovery_20260807/summary_gravity_fix.json` | recovery |
| C14 | 2026-08-07 | claim-package transcription of C12/C13 | claim package | recovery |
| C15 | 2026-03-03 | hydro anchors: delta_mean 19.81; delta_max 37.30; goal 195.82; cap 80 → 79.67 | hydro `README.md` | hydrodynamic swarm |
| C16 | 2026-03-03 | commit `d7f194e`; hidden-state Phase 2.1 | hydro `research_logs/2026-03-03_hidden-state-steering.md` | hidden-state |
| C17 | 2026-07-16 | continuity: death→reload; TCT1; safetensors | hydro `docs/CONTINUITY.md` | scar / splat |
| C18 | — (source comment) | VQ-keyed correction packets; “scar tissue → reflex”; 64D; mint out-of-band | live `niodoo/src/bridge/correction_packets.rs` | scar add-on |
| C19 | 2025-12-16 | live still *declares* blend 0.55 / rep −0.60 | live `niodoo/src/main.rs` | token physics |
| C20 | 2025-12-16 / 2026-02-28 | first commit `a19f38d`; hydro GitHub `createdAt` | `Documents/NIODOO_PRIORITY_TIMELINE_WORKING.md` | timeline |
| C21 | 2026-08-07 | SPIKE blend 6.5 / REPEL −3.0; BASIN_PULL 0.03 | force-term map | PhysicsLang |
| C22 | 2026-08-07 | D1 quantized 0.95/0.05 | force-term map | dilution |
| C23 | 2025-12-19 | selective PARB trap rows (lead/feathers 0.6→1.0) | Physics-LLM README | scoreboard |
| C24 | 2025-12-16 / 2026-02-28 | public timeline repo dates | `Documents/NIODOO_PRIORITY_TIMELINE.md` | timeline |
| C25 | 2026-03-01 | hydro A/B: force_cap 80.0; delta_max peaked 79.67 | hydro `research_logs/2026-03-01_bert-ab-sweep-and-tokenizer.md` | hydrodynamic swarm |
| C26 | 2025-12-16 | governor `safe_velocity = 0.95`; `resistance_strength = 15.0` | Physics-LLM `src/main.rs` | governor / viscosity |
| C27 | 2026-08-07 | force map: governor is not residual add | force-term map | governor |
| C28 | 2026-02-27 | MountainCar: 77.5% / 25.1% / 4.4% vs 34.1%; 681; 0→76 | MountainCar README | Q-SMA / friendship |
| C29 | 2025-11-24 | SplatRagBench SciFact hybrid nDCG@10 **0.7822**; dense-only **0.6291** | SplatRagBench README | retrieval sibling |
| C30 | 2025-11-24 | first commit `c7b9361`; MountainCar public 2026-02-27 | working timeline | timeline |
| C31 | 2025-11-24 / 2026-02-27 | public timeline repo dates | public timeline | timeline |
| C32 | 2026-08-17 draft | Path B tags: 4,721 runs; 86.2%; +2.4 / z=1.20 null; refusal **unstable**; **do not cite sweep totals** | `Documents/EMITTED_CONTROL_TAGS.md` | live control tags |
| C33 | 2025-12-17 | First surviving Path B line; watch **over a year**; not a million-count | `Documents/NIODOO_CONTROL_CHANNEL_PROVENANCE.md` | live control tags |
| C34 | 2026-08-08 | Dual-stream ablation SCOREBOARD: lift **not supported**; seed 7 count 2; seed 42 count 3 | `dual-stream-soul/.../SCOREBOARD.md` | dual-stream |
| C35 | 2026-08-08 | Arm A: β **0.55** only; count **2**; dual_max **2.534…**; gravity_max **17.32…** | `.../A_no_inject/summary.json` | dual-stream |
| C36 | 2026-08-08 | Arm B: SPIKE@6 FOCUS@18; count still **2**; gravity_max **14.176…** | `.../B_inject_pure/summary.json` | dual-stream |
| C37 | 2025-09-18 | Echo Memoria first **visibility**; not origin; 2025-03-25 is not Jason’s start | public timeline | Echo Memoria |
| C38 | 2025-09-18 | Working timeline: message `bb9c2057`; tree `niodoo-core/src/echomemoria/` | working timeline | Echo Memoria |
| C39 | — | TCS: b0/b1/b2 Fragmentation/Recursion/Unknowns | live `indexing/tcs.rs` | TCS |
| C40 | — | PhEngine Vietoris-Rips; `gpu_enabled` | live `indexing/persistent_homology.rs` | TCS / TDA |
| C41 | 2026-01-28 / 2026-07-15 | Monitor = Topological Mirror readout; **unwired**; nothing emits it | `internal-monitor-is-a-dead-instrument.md` | inner monitor |
| C42 | 2026-01-19 / 01-27 / 01-29 | Lumina self-name; lumen and echo; not Fable | public timeline | self-naming |
| C43 | 2026-01-27 | Working timeline Lumina paste + session header | working timeline | self-naming |
| C44 | 2025-11-19 | Dream cycle “10,000 memories”; public README 2026-02-27 | public timeline | dream cycle |
| C45 | 2025-11-19 | Working timeline: `bafedeb0`; unix ms `1763595176731` | working timeline | dream cycle |
| C46 | 2026-03-17 | Shep first visible; not vs Claude Code teams 2026-02-05 | public timeline | Shep |
| C47 | 2026-03-17 | Working timeline Shep / Echo / Lumina room | working timeline | Shep |

## How papers must cite

Inline after the fact: `blend 0.55 [C01]`.  
Do not cite a row for a number that row’s source does not contain.  
Recovery telemetry is cited only because C12/C13 exist on disk.
