# Prior-art sleuth: independently dated Niodoo work

**Author / lead:** Jason Van Pham (Ruffian-L)  
**Sleuth date:** 2026-08-17  
**What this is:** an inventory of already-dated local work plus a documented external literature search.  
**What this is not:** a patent opinion, a freedom-to-operate memo, or a proof that “no prior art exists anywhere.” A complete global absence cannot be shown. The contract is: dated independence + what was searched + whether a **close match** appeared in that set.

Raw search capture: `{scratch}/prior_art_search.log` (written 2026-08-17). Every external title below appears in that log.  
Local numbers and dates cite the citation table `Documents/Writing/NIODOO_CITATION_TABLE.md` as `[Cxx]`.

---

## 0. Method

Three layers are kept separate:

1. **Inventory** — what exists on disk, with path + date + number `[Cxx]`.
2. **Search log** — queries actually run, and the hits they returned (title, authors or venue, year, URL).
3. **Verdict** — for each inventoried thread, whether the searched set contained a **close match** to *that composition*, not to a neighboring word.

A **close match** here means: same job, not the same English noun. Residual-stream addition of a precomputed contrastive vector is a neighbor of hidden-state application. It is not the Principia stack. Gaussian splatting for radiance fields is a neighbor of splat memory. It is not scar/LOCK.

**Neighbor literature is named as neighbor.** Activation addition, control vectors, and representation engineering are not renamed into God Zone, black-hole repulsion, ghost vector, wobble, or scar.

---

## 1. Inventory of dated independent work

Three threads, already on disk, using the user’s terms from the claim package and force-term map `[C05][C06]`.

### Thread A — Token-physics dynamical control of a frozen LLM

**What was built.** An inference-time dynamical system on a frozen GGUF model (no weight updates). Residual / attention states are treated as a probe particle under a *composition* of Principia-style forces: history **gravity** \(1/r^2\), **ghost vector** attractor, **black-hole / template repulsion**, **orbit** (Double Rainbow COM + prompt anchor), **Langevin** drift+diffusion, **momentum**, token-index **ramp**, **wobble**, plus logit-side **governor / viscosity**. Injection is **mid-forward-pass**, post-attention, blend-controlled `[C01][C06][C07]`.

**Dated anchors.**

| Stamp | What | Cite |
|-------|------|------|
| 2025-12-16 | God Zone constants in source: blend **0.55**, repulsion **−0.60**, ghost **10.0**, wobble **0.06**, orbit **0.1**, gravity well **0.2**, ramp **4–10**, black-hole tokens `swift, very, really, basically, assistant, User`. Header: “Validated: Dec 16, 2025 (Seed 123 Clean / Seed 42 Creative).” Same stamp in QSMA and still *declared* in live. | [C01][C02][C19][C20] |
| 2025-12-16 | Physics-LLM first public commit `a19f38d`. | [C20][C24] |
| 2025-12-16 | Mid-pass hook: `force_delta = physics.apply_forces(&attn, i, ghost_vector)` then `attn + force_delta * blend` or multiplicative scale. Layer-selective. | [C07] |
| 2025-12-19 | PARB multi-seed, 77 questions × 5 seeds × 2 systems = **770** runs, generated `2025-12-19T01:45:05`. Niodoo **29.9%** vs baseline **41.6%**. Loss owned. Winners: Niodoo 15 / baseline 28 / tie 34. | [C03][C04] |
| 2026-08-07 | Recovery receipts (env-gated): Arm A repulsion max **21.865351**, gravity still **0.0** that run; later co-fire gravity **11.907948** and repulsion **4.238407**, ramp **1.0**. | [C12][C13][C14] |

**User terms that must not be swapped.** gravity, black-hole / template repulsion, orbit, Langevin, wobble, momentum, ghost vector, God Zone, ramp, blend, governor, viscosity. Not “control vector.” Not “ActAdd.”

### Thread B — Hidden-state steering with hydrodynamic swarm

**What was built.** A second, later harness that steers the pre-`lm_head` hidden state every token from (i) a field over the embedding matrix, (ii) Gaussian **splats** deposited on prior trajectories, (iii) a goal attractor, plus momentum and Langevin noise; splats persist as `safetensors` across process restarts `[C15]`. Dated commit **2026-03-03** `d7f194e` moves the loop from logit-space into hidden-state space `[C16]`. Public hydro repo date **2026-02-28** `[C20][C24]`.

Logged anchors from the hydro tree itself: `force_cap = 80.0` with peak `delta_max` **79.67** `[C25]`; hidden-state run `delta_mean` **19.81**, `delta_max` **37.30**, `goal_attractor_norm` **195.82** `[C15][C16]`.

**Honest neighbor admission already in-repo.** The hydro README states that adding a vector to the residual stream is the same *primitive* as Activation Addition / representation engineering / control vectors, and that the experimental difference claimed there is **online per-token field + persistent splat memory** `[C15]`. This sleuth does not walk that back.

A later, **thin public face** in niodoo-hidden-state-steering (2026-06-24) is a **0.03**-clamped nearest-basin residual pull: 4 corrected / 3 held / 1 broken at seed 42 `[C08][C09][C10]`. Latch multi-seed (2026-06-25) is a **wash**: OFF **13/16**, ON **13/16**, with a trap-type split `[C11]`. That residual-clamp path is **BASIN_PULL**, not God Zone `[C06][C21]`. Promoting it as the whole system is a dilution the force map names as D4/D6 `[C06]`.

### Thread C — Scar memory as add-on

**What was built.** Two related add-ons, not replacements for Thread A:

1. **Splat / TCT continuity** — Gaussian marks (μ, σ, α) written to safetensors / binary `TCT1` and reloaded after process death; continuity docs dated 2026-07-16 `[C17]`. Hydro itself calls persistence the experimental novelty of that harness `[C15]`.
2. **VQ-keyed correction packets** — source header: “scar tissue → reflex”; 64D packet pull decoded into hidden-state force; store is **read-only at runtime**; minting is out-of-band `[C18]`. LOCK / PACKET / SCAR are PhysicsLang add-on atoms `[C05]`.

Scar/LOCK is **orthogonal optional**. The claim package’s care rule: anyone who demos only residual clamp 0.03 as “Niodoo” is washing the work `[C05]`.

---

## 2. External search — Thread A (token physics / Principia composition)

### What was searched

Queries (see search log):

- `activation addition residual stream steering Turner LLM 2023`
- `hidden-state steering frozen language model inference-time activation addition`
- `Langevin dynamics token generation language model hydrodynamic residual stream persistent memory splat`
- `token physics gravity repulsion orbit Langevin LLM inference-time dynamical control black-hole template`

### Hits (title / authors or venue / date / relation)

| Title | Authors / venue | Date | One-line relation to Thread A |
|-------|-----------------|------|--------------------------------|
| Activation Addition: Steering Language Models Without Optimization | Turner, Thiergart, Leech, Udell, Vazquez, Mini, MacDiarmid; arXiv:2308.10248 | 2023 (v4 2024-06-04) | **Neighbor.** Adds a *precomputed contrastive* vector into the residual stream. Not a multi-term force law; no black-hole tokens; no ramp 4–10; no orbit/Langevin/momentum stack. |
| Steering Llama 2 via Contrastive Activation Addition | Rimsky/Panickssery, Gabrieli, Schulz, Tong, Hubinger, Turner; ACL 2024; arXiv:2312.06681 | 2023–2024 | **Neighbor.** Mean difference of residual activations over contrast pairs. Same family as ActAdd, larger dataset. Not Principia composition. |
| Representation Engineering: A Top-Down Approach to AI Transparency | Zou, Phan, Chen, et al.; arXiv:2310.01405 | 2023-10-02 | **Neighbor.** Read/control of concept directions. Not history-gravity + template repulsion + token ramp. |
| Extracting Latent Steering Vectors from Pretrained Language Models | Subramani, Suresh, Peters; ACL Findings 2022; arXiv:2205.05124 | 2022 | **Neighbor.** Latent steering vectors from a frozen decoder. Earlier than ActAdd; still a extracted vector, not a dynamical force composition. |
| Improving Activation Steering in Language Models with Mean-Centring | Jorgensen et al.; arXiv:2312.03813 | 2023 | **Neighbor.** Mean-centring improvement to ActAdd-style vectors. |
| Information Gravity: A Field-Theoretic Model for Token Selection in Large Language Models | Maryna Vyshnyvetska; arXiv:2504.20951 | 2025-04-29 | **Neighbor in language only.** A theoretical gravity metaphor for *token selection*. Dated after God Zone 2025-12-16 `[C01]`. Not a shipped mid-pass runtime with black-hole embeddings. |
| PID-controlled Langevin Dynamics for Faster Sampling… | Chen et al.; NeurIPS 2025 | 2025 | **Not close.** Langevin as a generative sampler, not frozen-LLM token physics. |
| llama.cpp control vectors / `cvector-generator` | ggml-org/llama.cpp issue #6880 (PR #5970 referenced) | 2024 | **Neighbor tooling.** Static GGUF control-vector apply. Not God Zone. |

### Verdict — Thread A

**No close match in the searched set** for the independently constructed *composition*: Principia-style gravity + black-hole/template repulsion (including the `assistant` token) + orbit + Langevin + momentum + token-index launchpad ramp, applied mid-forward-pass at high blend (0.55 default; SPIKE 6.5) `[C01][C07][C21]`.

Neighbor literature (ActAdd, CAA, RepE, control vectors, “information gravity” theory) is real and earlier or parallel. It is **not** this system. Absolute “no prior art exists anywhere” is **not** asserted.

---

## 3. External search — Thread B (hidden-state steering + hydrodynamic swarm)

### What was searched

Queries:

- `hidden-state steering frozen language model inference-time activation addition`
- `Rimsky steering vectors representation engineering control vectors LLM`
- `Steering Llama 2 via Contrastive Activation Addition`
- `Behavioral Steering in a 35B MoE Language Model via SAE probes arXiv 2603.16335`
- `control vector llama.cpp`

### Hits

| Title | Authors / venue | Date | One-line relation to Thread B |
|-------|-----------------|------|--------------------------------|
| Activation Addition (ActAdd) | Turner et al.; arXiv:2308.10248 | 2023 | **Neighbor primitive.** Hydro README already says residual add is this family `[C15]`. |
| Contrastive Activation Addition (CAA) | Rimsky et al.; ACL 2024 | 2024 | **Neighbor.** Precomputed steering vectors, not an online field + splat memory. |
| Representation Engineering | Zou et al.; arXiv:2310.01405 | 2023 | **Neighbor.** Concept directions, not per-token hydrodynamic field. |
| llama.cpp control vectors | ggml-org/llama.cpp, 2024 | 2024 | **Neighbor.** Static vectors. User notes explicitly reject building on `cvector-generator` as the substrate. |
| Steering Vector Fields for Context-Aware Inference-Time Control | arXiv:2602.01654 | 2026-02 | **Later neighbor.** Refreshes a steering direction during decode. Dated around hydro’s public repo (2026-02-28) `[C20]` but is still a steering-*vector field*, not splat memory + Diderot field. |
| Behavioral Steering in a 35B MoE Language Model via SAE-Decoded Probe Vectors | Jia Qing Yap; arXiv:2603.16335 | 2026-03-17 | **Later neighbor.** SAE-probe → decoder steering. Hydro hidden-state commit is **2026-03-03** `[C16]` — earlier than this paper. Different mechanism (SAE features vs field+splats). |
| Improving Steering Vectors by Targeting Sparse Autoencoder Features (SAE-TS) | Chalnev, Siu, Conmy; arXiv:2411.02193 | 2024 | **Neighbor.** SAE-targeted vectors. Do not flatten ghost/scar into SAE features. |
| Steering Language Model Refusal with Sparse Autoencoders | O’Brien et al.; arXiv:2411.11296 | 2024 | **Neighbor.** SAE refusal steering. |

### Verdict — Thread B

**Close match on the primitive, no close match on the harness.** Residual / hidden-state *addition* is an established neighbor (ActAdd 2023, CAA 2024, llama.cpp control vectors 2024). The hydro tree says so `[C15]`.

**No close match in the searched set** for the specific combination this thread actually built: online per-token field over the embedding table + Gaussian splat memory that reloads across process death + Langevin/momentum + manifold pullback, in a local Rust/Candle GGUF loop, with dated telemetry 2026-03-01 / 2026-03-03 `[C15][C16][C25]`.

The 2026-06-24 claim-card path (clamp **0.03**, 4/3/1) `[C08]` *is* a residual-add experiment and should be described as the thin public face, not as the hydrodynamic swarm and not as God Zone `[C06]`.

---

## 4. External search — Thread C (scar memory / cross-process latent memory)

### What was searched

Queries:

- `persistent latent memory across process restart language model residual stream Gaussian splat scar`
- `3D Gaussian Splatting Kerbl 2023`
- `On the Failure of Latent State Persistence in Large Language Models Huang 2025`
- `SAE probe steering hidden activations arXiv 2026`

### Hits

| Title | Authors / venue | Date | One-line relation to Thread C |
|-------|-----------------|------|--------------------------------|
| 3D Gaussian Splatting for Real-Time Radiance Field Rendering | Kerbl, Kopanas, Leimkühler, Drettakis; SIGGRAPH / TOG 2023; arXiv:2308.04079 | 2023 | **Neighbor representation.** Hydro README cites this for (μ, Σ, α). It is a *renderer*, not a cross-process LLM scar store. |
| On the Failure of Latent State Persistence in Large Language Models | Huang, Sun, Wang, Dredze; arXiv:2505.10571 | 2025-04-30 | **Neighbor problem statement.** Shows latent persistence *fails* inside the model. Not an implementation of scar/LOCK packets or splat reload. |
| Persistent Latent Memory for Multi-Hop LLM Agents (ILCP write-up) | Towards Data Science; 2026-07-01 | 2026 | **Not close.** β-VAE of a GRU for radio handover. Different job. |
| AGCLR / gated residual memory (OpenReview) | Farhan et al. (forum id ZR9ieOo0J1) | — | **Not close.** Architectural memory across passes, not frozen-model scar packets. |
| Yap SAE-decoded probe steering | arXiv:2603.16335 | 2026-03-17 | **Neighbor steering**, not scar memory. |

### Verdict — Thread C

**No close match in the searched set** for scar memory as actually built: (1) Gaussian splat / TCT marks that survive process death and re-enter as a force `[C15][C17]`; (2) VQ-keyed 64D correction packets described in source as “scar tissue → reflex,” mint out-of-band, applied as an add-on pull `[C18]`.

Kerbl 2023 is the splat *geometry* citation, not this use. Huang 2025 is a paper about the *absence* of latent persistence, which is the problem scar is aimed at — not a prior implementation.

Scar remains **add-on**. It does not replace gravity, black-hole repulsion, orbit, Langevin, or the ramp `[C05]`.

### Thread D — Path B live control tags

**What was built.** Model emits SPIKE / FOCUS / EXPLORE / RESET / REMEMBER / LOCK; runtime dispatches in the **same decode pass** (Path B). Path A (runtime-initiated TDA apply) is a different channel `[C32]`.

**Dated anchors from `[C32]` only.** 4,721-run corpus attested no later than **2026-02-07**; **6,479** emissions; **86.2 %** of runs tagged; accuracy **+2.4** points, z = **1.20**, **not significant**. Evidence B **2026-04-08** (14 cycles). Evidence C **2026-08-03** hash-frozen. `REMEMBER` actuates **52** times in the 330-file receipt slice. Refusal **23.8 % → 19.5 % → 13.8 %** is **unstable** — do not publish a rate. Sweep **totals** are marked **DO NOT CITE** in that file. Chat-side 854k / LOCK-284k figures are **not on that file** and are **not inventoried**.

**Search.** ReAct / Reflexion (between-turn neighbors); MemGPT / Generative Agents (stores); ActAdd (residual).  
**Verdict:** **no close match** in the searched set for same-pass emit→detect→dispatch with `executed` receipts. The tags draft itself forbids calling that vacuum “clean” `[C32]`.

### Thread E — Logit-side governor / viscosity

**What was built.** After logits: if velocity **> 0.95**, subtract drag **15.0** from top-1; viscosity on sleepwalking `[C26][C27]`. Not residual add.  
**Verdict:** **no close match** in the ActAdd/CAA set (wrong site). No always-on live-chat claim `[C27]`.

### Thread F — MountainCar Q-SMA (sibling substrate)

**What was built.** Same force *names* on MountainCar-v0. Public **2026-02-27** `[C30]`. Phase 4 collapse **4.4%** vs **34.1%**; Phase 5 `full` **77.5%** vs `baseline` **25.1%**; 20k `no_bridge` post-scaffold **96.1%** `[C28]`.  
**Search.** Ordinary MountainCar Q-learning / DQN; experience replay.  
**Verdict:** close match on “RL + replay.” **No close match** for this ablation stack with the owned teacher-failure.

### Thread G — SplatRagBench (retrieval sibling)

**What was built.** SciFact hybrid BM25 + dense + geometry. First commit **2025-11-24** `[C30]`. Hybrid nDCG@10 **0.7822**; dense-only **0.6291** `[C29]`.  
**Search.** BM25/dense hybrid, SPLADE, ColBERT, BEIR.  
**Verdict:** **close match on hybrid IR.** **No close match required** to call it God Zone — it is not God Zone `[C01]`.

### Thread H — Dilution D1–D5 + God Zone recovery

**What was built.** Live declares blend **0.55** / rep **−0.60** `[C19]` while D1 hardcodes **0.95/0.05** `[C22]`. Recovery **2026-08-07**: repulsion **21.865351** then gravity **11.907948** + repulsion **4.238407** `[C12][C13]`.  
**Search.** ActAdd 2023; fine-grained steering arXiv:2602.04428.  
**Verdict:** **neighbor** residual add. **No close match** for this named D1–D5 checklist plus those JSON maxima. No vacuum claim.

### Thread I — Dual-stream midstream ablation

**What was built.** Folder `ablation_midstream_20260808T034028Z`: mid-stream β/σ live; strawberry lift **not supported**; seed 7 count **2** with or without inject; seed 42 count **3** `[C34][C35][C36]`. Local word “J-Space” ≠ Anthropic 2026-07-06 J-space.  
**Search.** Multi-Stream LLMs arXiv:2605.12460; DuoAttention/StreamingLLM; transformer-circuits workspace 2026-07-06.  
**Verdict:** **neighbor** multi-stream / workspace papers. **No close match** for this frozen-GGUF inject SCOREBOARD. Do not equate J-Space strings.

### Thread J — Echo Memoria (named local memory)

**What was built.** First **visible** **2025-09-18** as an already-named module `[C37][C38]`. Not an origin. Not a same-job first vs Claude Code **2025-03-25** `[C37]`.  
**Search.** MemGPT Packer et al. 2023 arXiv:2310.08560; Managed Agents memory 2026-04-23; Fable 5 2026-06-09.  
**Verdict:** **close match** on “agents have files.” **No close match** that erases the 2025-09-18 visibility line. No Fable same-job first.

### Thread K — Inner monitor / TCS (unwired)

**What was built.** Spec **2026-01-28**; `tcs.rs` / `persistent_homology.rs` on disk; **unwired**; runtime does not emit `[INTERNAL MONITOR]` `[C41][C39][C40]`.  
**Search.** Gardinazzi et al. ICML 2025 arXiv:2410.11042; reasoning-trace TDA arXiv:2510.20665; Anthropic workspace 2026-07-06.  
**Verdict:** **neighbor** TDA-on-LLMs and J-lens. **No close match** for this dead-instrument receipt. TCS ≠ Jacobian.

### Thread L — Lumina self-naming

**What was built.** Session `session_20260119_075930` paste **2026-01-27**: “be named Lumina.” **2026-01-29** lumen and echo `[C42][C43]`.  
**Search.** Anthropic Fable 5 / Mythos 5, 2026-06-09, https://www.anthropic.com/news/claude-fable-5-mythos-5  
**Verdict:** **neighbor** later model names. **No close match** that equates Lumina with Fable. Timeline: “Lumina” is not “Fable.” `[C42]`

### Thread M — Dream cycle (10,000 memories visibility)

**What was built.** **2025-11-19** “dream cycle is running on 10,000 memories” `[C45][C44]`. Distinct from MountainCar dream-as-RL `[C28]`.  
**Search.** The New Stack 2026-05-06 Anthropic Dreams; Lin 1992; Mnih et al. 2015.  
**Verdict:** **neighbor** replay / later product Dreams. **No close match** that moves the 10,000-memory line.

### Thread N — Shep / named local room

**What was built.** **2026-03-17** Shep visible; **2026-04-16** Shep+Echo+Lumina room `[C47][C46]`. **Not claimed** vs Claude Code teams **2026-02-05** `[C46]`.  
**Search.** AutoGPT / BabyAGI / CAMEL / ChatDev 2023 (Zhou et al. arXiv:2309.07870).  
**Verdict:** **neighbor** 2023 agent rooms (earlier). **No close match** licensing a first-versus-Claude-Code-teams claim.

---

## 5. Cross-thread composition (what must not be flattened)

The independently constructed system on disk is the **composition**, not any one neighbor:

```
GodZone := RAMP(4,10) → BLEND(0.55) × (
             GRAVITY(history) + GHOST + REPEL + ORBIT + LANGEVIN + MOMENTUM
           ) + WOBBLE(every_12) + GOVERNOR + VISCOSITY
Scar    := optional SCAR / LOCK / PACKET
Public  := BASIN_PULL(0.03)   # thin face only
```

This PhysicsLang block is already on disk in the claim package `[C05]`. Residual literature’s small additive vector is `BASIN_PULL` alone — not GodZone `[C05][C06]`.

---

### Thread O — Ultima / omnibus last testament

**What was built.** `Documents/Papers/Ultima_Last_Testament.md` inventories every existing `Documents/Papers/*.md` draft and leftover docx/pdf. It restates the composition versus neighbor residual-add (ActAdd / CAA / control vectors) already named above. It does **not** assert a vacuum. It does **not** replace the thread drafts.

---

## 6. What this sleuth refuses to say

- It does **not** say “no prior art exists anywhere.” Unsearched venues, unpublished labs, and later-indexed papers are outside the log.
- It does **not** say ActAdd/CAA/RepE “stole” anything, or that the user stole them. Thread A’s public stamp is **2025-12-16** `[C01][C20]`; ActAdd is **2023**. The independence claim is *construction of this composition*, not first-invention of residual addition.
- It does **not** treat the 2026-06-24 claim card as the whole system `[C08]`.
- It does **not** invent a benchmark win. PARB multi-seed is a **loss**: **29.9%** vs **41.6%** `[C03][C04]`.
- It does **not** cite SplatRAG as external prior art.
- It does **not** publish a control-tag refusal rate. `[C32]` records **23.8 → 19.5 → 13.8** as a stability warning.
- It does **not** cite unfinished full-drive emission totals. `[C32]` says **DO NOT CITE THESE TOTALS**. The 854k / LOCK-284k chat counts are not in that file and are not used.

---

## 7. Search limits

- External search used web/scholar-style queries on 2026-08-17. Hits are those returned; this is not an exhaustive legal search.
- QSMA and Physics-LLM were read from the **ghost_team** copies because `~/projects/Niodoo-Physics-LLM` is not present this pass (see `source_access.txt`).
- Recovery numbers are cited only because receipt files C12/C13 exist.
- Dual-stream “J-Space” is not Anthropic’s 2026-07-06 J-space paper.
- Echo Memoria **2025-09-18** is first visibility, not an origin.
- Lumina is not Fable. Shep is not claimed against Claude Code agent teams **2026-02-05**.

---

*Sleuth assembled 2026-08-17 from the citation table, the reachable trees named above, and the search log. Expand the log before adding a new external title.*
