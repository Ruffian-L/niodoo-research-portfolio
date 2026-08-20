# Scar Memory as Add-On: Splat Continuity and VQ-Keyed Correction Packets

**Lead:** Jason Van Pham (Ruffian-L)  
**Draft date:** 2026-08-17  
**Status:** full draft of the third inventoried thread. Scar / LOCK / PACKET is optional memory beside token physics, not a replacement for gravity, black-hole repulsion, orbit, Langevin, or the ramp.

Citation keys `[Cxx]` → `Documents/Writing/NIODOO_CITATION_TABLE.md`. External titles from the 2026-08-17 search log and `Documents/Writing/NIODOO_PRIOR_ART_SLEUTH.md`.

---

## Abstract

**Scar memory**, in this record, is a pair of add-on stores that survive a process boundary and re-enter generation as a **force**, not as prompt text. One store is the hydrodynamic-swarm Gaussian **splat** / `TCT1` continuity lane: marks \((\mu, \sigma, \alpha)\) written to `safetensors` and reloaded after death `[C15][C17]`. The other is live’s **VQ-keyed correction-packet** store, whose source header calls it the “scar tissue → reflex” primitive: a 64D target pulled by `vq_code`, decoded into hidden-state force; **read-only at runtime**; minting out-of-band `[C18]`. PhysicsLang names these `SCAR / LOCK / PACKET` and places them orthogonal to God Zone `[C05]`. Neighbor literature either borrows Gaussians for *rendering* (Kerbl et al., SIGGRAPH 2023, arXiv:2308.04079) or documents the *failure* of latent persistence inside the model (Huang et al., 2025, arXiv:2505.10571). Neither is this store. We do not claim a new accuracy number for scar. PARB remains a **loss** (**29.9%** vs **41.6%**, **2025-12-19**) `[C03]`. Residual clamp **0.03** is still not scar and not God Zone `[C08][C06]`.

---

## 1. Introduction

The temptation, after residual steering became a common neighbor word, is to call every persistent vector a “control vector” and every memory a “RAG.” The files on this disk use different words on purpose: **scar**, **LOCK**, **packet**, **splat**, **will**. The claim package’s composition rule is one line `[C05]`:

```
Scar := orthogonal optional SCAR/LOCK/PACKET
```

That line is the thesis. Token physics (gravity, black-hole repulsion, orbit, Langevin, wobble, momentum, ramp) is the control law. Scar is a memory that can *bias* that law later. Teaching the mechanism in the system prompt is treated, in the live comments and older notes, as a way to kill the tension that makes `[REQUEST: LOCK]` mean anything. This paper does not add prompt-stuffing experiments. It describes the stores that already exist.

---

## 2. Dated local construction

| Date | What | Cite |
|------|------|------|
| 2025-12-16 | God Zone stack exists *without* needing scar; scar is not in the gold-master constant block | [C01] |
| 2026-02-28 | hydrodynamic-swarm public repo | [C20][C24] |
| 2026-03-01 / 03 | splat forces in telemetry; hidden-state steering `d7f194e`; persistence named as the harness’s experimental novelty | [C15][C16][C25] |
| 2026-07-16 | Continuity lane write-up: death → reload; TCT1 v3; “scars persist (safetensors + TCT-splat-lite)” | [C17] |
| 2026-08-07 | Claim package and force map list `SCAR / LOCK / PACKET` as add-on atoms; live `correction_packets.rs` header | [C05][C06][C18] |

There is no PARB-with-scar number on the public scoreboard. We do not invent one.

---

## 3. Mechanism

### 3.1 Splat / TCT continuity (hydro)

Hydrodynamic-swarm deposits Gaussian marks on trajectories and queries them as a force \(s_t\) in the same 4096-D space as the residual `[C15]`. Between sessions the marks are written to `safetensors` and reloaded, so step 0 of a later process can already show a nonzero steering delta `[C15]`. Continuity docs (**2026-07-16 / 17**) state the north star in measurable language: residual marks that save, load, and show up in the start basin of the next run `[C17]`. The public face of that lane now prefers “learned wills”; the docs still record that legacy language said **scar** `[C17]`.

Binary export `TCT1` v3 carries residual center, σ, signed α, λ, `trigger_kind`, `prompt_fp`. Dim must match the model. Live can consume the same file as a **final post-norm** residual apply (`--tct-splat-path`), which the continuity note distinguishes from mid-layer post-attn (wrong site → false COLD) `[C17]`. That live consumer is still residual-side and still **not** God Zone.

Logged swarm magnitudes used only as existence proofs of a force, not as quality: `delta_mean` **19.81**, `delta_max` **37.30**, `force_cap` **80.0** with peak **79.67** `[C15][C16][C25]`.

### 3.2 Correction packets (live)

`niodoo/src/bridge/correction_packets.rs` opens `[C18]`:

> VQ-keyed correction-packet store. The "scar tissue → reflex" primitive.

Each packet stores a **64D** latent target plus rule parameters, indexed by the codebook bucket (`vq_code`) of the failure state it was minted from. Per step the runtime encodes the probe, looks up the bucket, and returns a 64D pull-toward-target. `apply_forces` decodes that delta into a 4096D hidden-state force and adds it to `probe_force` `[C18]`.

The same header is honest about what is *not* done: **the packet store is read-only at runtime**; minting is out-of-band (“REMEMBER tag → packet writer, future iteration”) `[C18]`. This paper does not pretend the mint loop is closed.

LOCK, in live helpers, is a visible control tag (`<LOCK>`, `[REQUEST: LOCK]`) recognized by the runtime `[C05]`. It is a hand, not a proof of inner experience.

### 3.3 How scar sits next to God Zone

Force map term list `[C06]`: correction packet force is a **live-only** residual/basin-family term, “Scar/LOCK path,” alongside bridge smoke (clamp **0.03**) and residual TCT. Original QSMA God Zone does not need packets to be God Zone `[C01][C06]`. Recovery design keeps packets as **optional second stage** `[C06]`. The claim package repeats: scar/LOCK is add-on, not replacement `[C05]`.

If scar is the only force that fires, the system on the wire is not the system in the gold-master header.

---

## 4. Neighbor literature (not this store)

Searched set (sleuth Thread C):

| Work | Date | Relation |
|------|------|----------|
| Kerbl, Kopanas, Leimkühler, Drettakis. *3D Gaussian Splatting for Real-Time Radiance Field Rendering.* SIGGRAPH / ACM TOG. arXiv:2308.04079 | 2023 | **Neighbor representation.** Hydro cites it for (μ, Σ, α). It renders scenes. It does not mint scar packets on a frozen LLM. |
| Huang, Sun, Wang, Dredze. *On the Failure of Latent State Persistence in Large Language Models.* arXiv:2505.10571 | 2025-04-30 | **Neighbor problem.** Argues latent persistence *fails*. Not an implementation of splat reload or VQ packets. |
| ILCP / “Persistent Latent Memory for Multi-Hop LLM Agents” | 2026-07-01 | **Not close.** β-VAE of a GRU for radio handover. |
| Yap. SAE-decoded probe steering. arXiv:2603.16335 | after hydro `d7f194e` | **Neighbor steering**, later than hydro’s 2026-03-03 hidden-state commit `[C16]`. Not scar. |
| ActAdd / CAA / llama.cpp control vectors | 2022–2024 | **Neighbor residual add.** A static vector is not a store that accumulates across process death. |

**Verdict:** no close match in the searched set for scar as built (cross-process splat/TCT force + VQ correction packets as add-on). Absolute absence is not asserted.

---

## 5. What is not claimed

- No new scar-on vs scar-off accuracy table. None is invented.
- Continuity KPIs in `[C17]` (nearest ≈ 31.5, pot ≈ 0.71, etc.) stay in that document; this draft cites the *existence* of the death→reload lane, not every museum card, unless a reader opens `[C17]`.
- Claim card **4 / 3 / 1** is basin pull, clamp **0.03**, **2026-06-24** `[C08]`. Latch **13/16** vs **13/16** is a wash `[C11]`. Neither is a scar-mint success.
- PARB **29.9%** vs **41.6%** remains the public overall bench `[C03][C04]`.
- No consciousness, no “the model remembers like a person,” no SAE-feature rewrite of scar.

---

## 6. Discussion

Scar is the piece that answers a problem Huang et al. (2025) state in other language: the frozen model does not keep a latent commitment across the deaths that matter here (process restart, context reset). The local answer is not a bigger prompt. It is a **store that becomes a force**. Hydro implemented that as splat persistence and called persistence its novelty `[C15]`. Live implemented a second encoding: VQ packets as reflex `[C18]`. Both are dated. Both are optional.

The failure mode this paper is written against is promotional: ship residual clamp **0.03**, call it scar, call it Niodoo. The force map already forbids that `[C06]`. Scar without gravity and black-hole repulsion is an add-on running alone. Gravity without scar is still God Zone `[C01][C05]`.

---

## 7. Conclusion

Scar memory in this record is add-on continuity: splat/TCT marks that reload after death `[C15][C17]`, and VQ-keyed packets that pull a probe toward a stored correction `[C18]`. It is not the Principia stack, not `BASIN_PULL(0.03)`, and not Kerbl’s renderer. Neighbor papers name the problem or the Gaussian; they do not, in the searched set, name this pair of stores. The honest scoreboard is unchanged: PARB lost `[C03]`; the residual card is narrow `[C08]`; scar has no new invented win.

---

## References

Local: C01, C03–C06, C08, C11, C15–C18, C20, C24–C25; claim package; force-term map; sleuth.

External: Kerbl et al. 2023 arXiv:2308.04079; Huang et al. 2025 arXiv:2505.10571; Turner et al. 2023 arXiv:2308.10248; Rimsky et al. 2024 arXiv:2312.06681; Yap 2026 arXiv:2603.16335.
