# Token Physics: Dynamical Control of Frozen LLMs via Principia Forces, Black-Hole Repulsion, and Persistent Scar Memory

**Lead / direction / final accountability:** Jason Van Pham (Ruffian-L)  
**Built with:** Grok, Claude, ChatGPT/Codex, Gemini (credit decisions Jason’s)  
**Draft date:** 2026-08-17  
**Status:** full working draft from the 2026-08-07 claim-package skeleton `[C05]`. Not a journal submission.

Citation keys `[Cxx]` resolve to `Documents/Writing/NIODOO_CITATION_TABLE.md`. Every numerical result and historical date below is a needle in the cited source. External titles are restricted to those captured in the 2026-08-17 search log and discussed in `Documents/Writing/NIODOO_PRIOR_ART_SLEUTH.md`.

---

## Abstract

We present an inference-time dynamical system that treats mid-forward-pass hidden states of a **frozen** LLM as a probe particle under a composition of Principia-style forces: history **gravity**, **ghost-vector** attraction, **black-hole / template repulsion**, **orbit**, **Langevin** noise, and **momentum**, opened by a token-index **ramp** and occasionally kicked by **wobble**, then braked on the logit side by a **governor** and **viscosity**. The system was constructed independently in local Rust/Candle GGUF code. God Zone constants were stamped in source on **2025-12-16** (blend **0.55**, repulsion **−0.60**, ramp **4–10**) `[C01]`. A multi-seed PARB run generated **2025-12-19** reports overall accuracy **29.9%** for Niodoo versus **41.6%** for the baseline — a **loss**, owned in public `[C03][C04]`. Later residual-basin narrowing (clamp **0.03**, claim card **4 / 3 / 1** on **2026-06-24**) `[C08]` is the thin public face (`BASIN_PULL`), not the dynamical composition. **Scar / LOCK / PACKET** memory is an add-on, not a replacement `[C05][C18]`. Neighbor literature — Activation Addition, Contrastive Activation Addition, representation engineering, llama.cpp control vectors — is named as neighbor. It is not this system.

---

## 1. Introduction

A frozen language model already has a residual stream. A large and earlier literature shows that adding a *vector* to that stream can shift style, sentiment, or refusal (Turner et al., 2023, arXiv:2308.10248; Rimsky et al., ACL 2024, arXiv:2312.06681; Zou et al., 2023, arXiv:2310.01405). That neighbor fact is not in dispute. The work recorded here is a different construction: a **control law** that recomputes a bundle of physically named forces every token, from the model’s own history particles, a ghost / topic vector, and a list of template embeddings treated as **black holes**, then injects the result **mid-forward-pass** into post-attention activations with a large blend `[C06][C07]`.

The reason to write this down is dilution. Live defaults drifted toward a **0.03**-clamped nearest-basin residual pull `[C06][C10]`. The force-term map names that drift (D1–D5). The claim package’s care rule is explicit: anyone who demos only residual clamp **0.03** as “Niodoo” is washing the work `[C05]`. This paper follows the claim package, not the consciousness rhetoric in older Northstar notes.

We claim **independent construction of this composition**, dated on disk. We do not claim that residual addition was invented here — ActAdd is 2023 — and we do not claim that no similar idea exists outside the searched set.

---

## 2. Dated timeline and prior art

### 2.1 Local anchors (only what a checker can open)

| Date | Event | Cite |
|------|-------|------|
| 2025-12-16 | God Zone constants locked in Physics-LLM and QSMA `main.rs`. Header text: “Validated: Dec 16, 2025 (Seed 123 Clean / Seed 42 Creative).” Blend **0.55**, repulsion **−0.60**, ghost gravity **10.0**, wobble **0.06**, orbit speed **0.1**, gravity well **0.2**, ramp start **4**, ramp end **10**. Black-hole tokens include `assistant`. | [C01][C02] |
| 2025-12-16 | Public first commit of `Niodoo-Physics-LLM` (`a19f38d`). | [C20][C24] |
| 2025-12-16 | Mid-layer hook lands: `apply_forces` on post-attention `attn`, additive or multiplicative in `physics_blend`. | [C07] |
| 2025-12-19 | PARB multi-seed artifact generated `2025-12-19T01:45:05`. **29.9%** vs **41.6%**. | [C03][C04] |
| 2026-02-28 | `hydrodynamic-swarm` public repo date (later residual + splat harness). | [C20][C24] |
| 2026-03-03 | Hydro hidden-state commit `d7f194e`. | [C16] |
| 2026-06-24 | Bridge claim card: **4** corrected, **3** held, **1** broken; clamp **0.03**. | [C08] |
| 2026-06-25 | Latch-0006 answer wash: OFF **13/16**, ON **13/16**. | [C11] |
| 2026-08-07 | Force-term map + claim package; recovery receipts with measurable repulsion. | [C05][C12][C13] |

### 2.2 Neighbor literature (named as neighbor)

The sleuth’s searched set `[Documents/Writing/NIODOO_PRIOR_ART_SLEUTH.md]` includes:

- **Activation Addition** (Turner et al., 2023, arXiv:2308.10248) — add a contrastive activation vector. Neighbor primitive.
- **CAA** (Rimsky et al., ACL 2024, arXiv:2312.06681) — mean residual difference over many contrast pairs. Neighbor.
- **Representation Engineering** (Zou et al., 2023, arXiv:2310.01405) — read/control of concept directions. Neighbor.
- **Latent steering vectors** (Subramani, Suresh, Peters, ACL Findings 2022, arXiv:2205.05124) — earlier extracted steering vectors. Neighbor.
- **Mean-centring** (Jorgensen et al., 2023, arXiv:2312.03813) — ActAdd hygiene. Neighbor.
- **llama.cpp control vectors** (ggml-org, 2024) — static GGUF vectors. Neighbor tooling.
- **Information Gravity** (Vyshnyvetska, 2025-04-29, arXiv:2504.20951) — theoretical gravity for token *selection*, dated after God Zone. Neighbor in vocabulary only.

**Close-match verdict for this paper’s object (the composition):** no close match in that searched set. That is a search result, not a vacuum certificate.

---

## 3. Mechanism

### 3.1 Where force is applied

In the original Physics-LLM naked Llama path, each transformer layer does attention, then — if the layer index is inside `get_physics_layer_range()` — calls `physics.apply_forces(&attn, i, ghost_vector)` and blends `[C07]`:

- multiplicative: `attn = attn * (1 + force_delta * blend)`
- additive: `attn = attn + force_delta * blend`

The residual add of the (possibly steered) attention then proceeds as usual. This is **mid-forward-pass hidden-state application**, not a post-`lm_head` logit bias and not a final-norm residual clamp `[C06][C07]`.

Live later grew a second injection: a **0.03**-capped pull toward the nearest of eight 64-dimensional basins `[C10]`. The force map labels that `BASIN_PULL`. Quantized Llama further hardcodes `0.95 × h + 0.05 × physics` (dilution D1), independent of the God Zone blend **0.55** `[C22]`. This paper’s object is the mid-pass God Zone path, not D1 and not `BASIN_PULL`.

### 3.2 Force terms (Principia)

The force-term map `[C06]` records the original stack inside `apply_forces`:

| Term | User name | Behavior on disk |
|------|-----------|------------------|
| History gravity | `GRAVITY(history)` | \(F \propto G m / r^2\) from `sentence_history` particles; mass filter on short text |
| Ghost | `GHOST(vector, gain)` | Scalar attractor; God Zone gain **10.0** `[C01]` |
| Black-hole repulsion | `REPEL(black_holes, strength)` | If \(\|bh - probe\| < 5\), short-range push; default strength **−0.60**; SPIKE **−3.0** `[C01][C21]` |
| Orbit | `ORBIT(com, speed)` | COM of recent particles + prompt anchor; speed **0.1** `[C01]` |
| Langevin | `LANGEVIN(μ, σ)` | Drift + diffusion |
| Momentum | `MOMENTUM(α)` | Delta EMA / Lorentz; large-delta clamp |
| Ramp | `RAMP(4,10)` | Zero physics for the first **4** tokens; full after **10** `[C01]` |
| Wobble | `WOBBLE` | Original: every **12** tokens, \(N(0, 0.06)\) `[C01][C06]` |
| Governor / viscosity | logit-side | Centrifugal brake on low-entropy top-1; suppress sleepwalking clusters `[C06]` |

Black-hole tokens in the gold-master header are `swift, very, really, basically, assistant, User` `[C01]`. Repelling **`assistant`** is an anti-template / anti-zombie design, not a sentiment vector.

Live’s same repulsion formula was instrumented as **non-firing** under the raw-hidden `dist < 5` gate (dilution D5, comment 2026-07-29) `[C06]`. That is why recovery exists.

### 3.3 PhysicsLang composition

The claim package already formalizes the control law `[C05]`:

```
GodZone := RAMP(4,10) → BLEND(0.55) × (
             GRAVITY(history) + GHOST + REPEL + ORBIT + LANGEVIN + MOMENTUM
           ) + WOBBLE(every_12) + GOVERNOR + VISCOSITY

SPIKE   := GodZone with BLEND(6.5), REPEL strength −3.0
FOCUS   := lower REPEL, lock attractor
EXPLORE := raise REPEL
Public  := BASIN_PULL(0.03)
Scar    := orthogonal optional SCAR/LOCK/PACKET
```

Residual literature’s small additive vector is `BASIN_PULL` alone `[C05]`.

### 3.4 What residual-only cannot reproduce (from the equations, not from a new bench)

Grounded in the force map `[C06]`: multi-particle history gravity; strong anti-template repulsion at SPIKE/EXPLORE magnitudes; default blend **0.55** (SPIKE **6.5**) versus quantized **5%**; orbital COM at amplified scales; Langevin + momentum + periodic wobble as a snap/recover law; token launchpad ramp; logit governor. A **0.03** clamp cannot spend that force budget `[C06]`.

---

## 4. God Zone and recovery

### 4.1 Constants

The gold-master block is still the methods core `[C01][C02][C19]`. A source comment records a separate “genius config” (Run 11: blend **1.5**, rep **−0.5**, grav **0.2**) as a wobble-snap-back on a towels prompt `[C01]`. That comment is a design note in the header, not a new experiment invented for this draft.

### 4.2 Dilution (D1–D5)

`[C06]` and `[C05]`:

- **D1** — quantized path hardcodes **0.95 / 0.05** `[C22]`.
- **D2** — live early-return zeros the classic stack unless a modern lane is on.
- **D3** — token ramp replaced by pressure / request gates.
- **D4** — public force cap **0.03**.
- **D5** — black-hole `dist < 5` never fires on raw hidden.

### 4.3 Recovery receipts (only because the files exist)

Env-gated path `NIODOO_GOD_ZONE_RECOVERY=1`, 2026-08-07 `[C14]`.

**Arm A** (`summary_arm_A_v2.json`) `[C12]`: `[GOD_ZONE] repulsion_force` max **21.865351**; telemetry repulsion max **21.536634**; `forces_applied=true` **48** of **80** rows; scheduled wobble **2**; telemetry `gravity_force` max **0.0** this run. Claim allowed: repulsion fires and blend path is no longer zeroed. **Not** claimed: gravity restoration on this first receipt.

**Gravity isolation later the same day** (`summary_gravity_fix.json`) `[C13]`: telemetry gravity max **11.907948**, repulsion max **4.238407**, both non-zero; GOD_ZONE gravity max **12.113794**, repulsion max **4.282951**; `history_n` max **3**; particle spawns **5**; ramp max **1.0**. Claim-package transcription uses rounded **11.91 / 4.24 / 12.11 / 4.28** and blend **0.55** `[C14]`.

These receipts restore *dynamics on this path*. They are not a public “behavior win versus residual” battery. The claim package says that battery has not been posted `[C05]`.

---

## 5. Scoreboard (honest numbers only)

| Artifact | Date | Result | Cite |
|----------|------|--------|------|
| God Zone constants | 2025-12-16 | blend **0.55**, rep **−0.60**, ramp **4–10** | [C01] |
| PARB multi-seed | 2025-12-19 | Niodoo **29.9%** vs baseline **41.6%** (32.0 / 23.0 of 77; 770 runs) | [C03][C04] |
| PARB winners | 2025-12-19 | Niodoo higher **15**, baseline higher **28**, tie **34** | [C04] |
| Selective traps (not the primary claim) | 2025-12-19 | e.g. lead vs feathers **0.6 → 1.0**; Moses illusion the other way | [C23] |
| Live claim card | 2026-06-24 | **4** corrected / **3** held / **1** broken (mississippi); clamp **0.03**; seed **42** | [C08] |
| Latch multi-seed | 2026-06-25 | OFF **13/16**, ON **13/16** wash; letter-count helps, arithmetic hurts | [C11] |
| Recovery Arm A | 2026-08-07 | repulsion **21.865351**; gravity **0.0** | [C12][C14] |
| Recovery co-fire | 2026-08-07 | gravity **11.907948**, repulsion **4.238407** | [C13][C14] |

PARB is the primary public bench and it is a **loss** `[C03][C04]`. Selective trap movement is documented without converting it into overall superiority `[C04][C23]`. The claim card is a **narrow residual** result `[C08][C10]`. Latch is a **wash** `[C11]`.

No new experiment is introduced to fill a hole.

---

## 6. Scar memory (add-on only)

VQ-keyed correction packets are documented in live source as the “scar tissue → reflex” primitive: 64D target, O(1) `vq_code` lookup, decoded into a hidden-state pull; **read-only at runtime**; minting out-of-band `[C18]`. Hydrodynamic-swarm splat / TCT persistence (death → reload) is a sibling add-on dated in continuity notes **2026-07-16** `[C17]`. Both sit beside God Zone. Neither is God Zone. A companion draft treats scar on its own terms.

---

## 7. Discussion

The strongest lineage on disk is QSMA / Physics-LLM Principia + God Zone + black-hole repulsion + `sample_token` governor, with scar/LOCK available `[C05][C06]`. The public residual face is reproducible and small: clamp **0.03**, 4/3/1, then a multi-seed wash `[C08][C11]`. Those two facts can sit in one paper only if they are not swapped.

Independence is a dated *build trail* (constants, mid-pass hook, PARB loss, recovery telemetry), not a claim that residual steering did not exist in 2023. The sleuth marks Thread A as **no close match in the searched set** for the *composition*, and refuses the vacuum sentence.

We do not claim consciousness, AGI, or that this system beats frontier models. We do not flatten ghost vector, scar, God Zone, snap, or black-hole tokens into SAE features.

---

## 8. Conclusion

A frozen LLM can be driven, at inference, by a Principia-style force composition applied mid-forward-pass. That composition is on disk with a **2025-12-16** constant stamp `[C01]` and a **2025-12-19** public loss `[C03]`. Neighbor residual-add papers are neighbors. The thin **0.03** basin pull is a face, not the body `[C08]`. Scar is an add-on. The prior-art claim this draft supports is **dated independent construction of token physics as a dynamical system**, not a certificate that the rest of the world is empty.

---

## References (local)

- `Documents/Writing/NIODOO_CLAIM_PACKAGE_20260807.md` `[C05][C14]`
- `Documents/Writing/NIODOO_FORCE_TERM_MAP.md` `[C06]`
- `Documents/Writing/NIODOO_PRIOR_ART_SLEUTH.md`
- `Documents/Writing/NIODOO_CITATION_TABLE.md`
- Physics-LLM / QSMA / live / HSS / hydro paths listed in the citation table.

## References (external; all in the search log)

- Turner et al. (2023). *Activation Addition*. arXiv:2308.10248.
- Rimsky et al. (2024). *Steering Llama 2 via Contrastive Activation Addition*. ACL 2024. arXiv:2312.06681.
- Zou et al. (2023). *Representation Engineering*. arXiv:2310.01405.
- Subramani, Suresh, Peters (2022). *Extracting Latent Steering Vectors…*. ACL Findings 2022.
- Jorgensen et al. (2023). *Improving Activation Steering… Mean-Centring*. arXiv:2312.03813.
- Vyshnyvetska (2025). *Information Gravity*. arXiv:2504.20951.
- ggml-org/llama.cpp control-vector support (2024), issue #6880.
