# Niodoo Force-Term Map — QSMA / Physics-LLM vs niodoo-live

**Date of map:** 2026-08-07  
**Purpose:** Evidence-grade side-by-side of original token-physics force terms vs live residual / bridge / packet paths.  
**Rule:** Cite only what is in the trees named below. No invented history, no fake dates, no overclaim.

---

## Source trees (what this map read)

| Label | Path | Role |
|-------|------|------|
| **QSMA** | `…/YinYangQSMA` (rescue + phone SD copy) | Original Principia + token physics + God Zone constants |
| **Physics-LLM** | `/media/ruffianl/ghost_team/02_projects/projects/Niodoo-Physics-LLM` | Public archive of same Principia lineage; PARB numbers |
| **Live** | `/home/ruffianl/projects/niodoo-live` → ghost_team `niodoo-live` | Current residual / bridge / packet runtime |

QSMA and Physics-LLM share the same core force loop (near-identical `apply_forces` + God Zone constants). Live’s `principia.rs` still **contains** much of that loop, but **gates and clamps** it so the default public path is residual-basin / packet, not full dynamical control.

---

## 1. God Zone / golden constants (QSMA + Physics-LLM + still declared in Live)

**Files:**  
- QSMA `src/main.rs:35–64`  
- Physics-LLM `src/main.rs:34–63`  
- Live still declares: `niodoo/src/main.rs:121–123` (`NIODOO_PHYSICS_BLEND`, `NIODOO_REPULSION`)

| Constant | Value | Comment in source |
|----------|-------|-------------------|
| `NIODOO_PHYSICS_BLEND` | **0.55** | “Soul” Strength |
| `NIODOO_GHOST_GRAVITY` | **10.0** | Topic anchor (QSMA) |
| `NIODOO_REPULSION` | **−0.60** | “Anti-Boring” Field |
| `NIODOO_WOBBLE` | **0.06** | “Spark” (QSMA) |
| `ORBIT_SPEED` | **0.1** | Stable flow |
| `GRAVITY_WELL` | **0.2** | High elasticity / thinking phase |
| `NIODOO_RAMP_START` | **4** | Zero physics first 4 tokens |
| `NIODOO_RAMP_END` | **10** | Full physics after 10 tokens |
| `BLACK_HOLE_TOKENS` | `swift, very, really, basically, assistant, User` | Template / filler repulsion targets (QSMA) |

**Validation stamp in QSMA source:** “Validated: Dec 16, 2025 (Seed 123 Clean / Seed 42 Creative)” — `main.rs` header above those constants.

**Genius config note (QSMA):** Run 11: blend=1.5, rep=−0.5, grav=0.2 → “WOBBLE-SNAP-BACK” to correct “1 hour” (towels).

---

## 2. Where force is applied in the forward pass

### Original (QSMA / Physics-LLM) — mid-layer post-attention, blend-controlled

**Physics-LLM** `naked_llama.rs` ~541–557 (QSMA equivalent ~567–583):

```
force_delta = physics.apply_forces(&attn, i, ghost_vector)
if multiplicative:
    attn = attn * (1 + force_delta * physics_blend)
else:
    attn = attn + force_delta * physics_blend
```

- Layer-selective: only layers in `get_physics_layer_range()`
- Blend comes from `get_physics_blend()` (God Zone 0.55 base; SPIKE can set 6.5)

### Live — two different injection rules

**A. Naked / full physics path** (`niodoo/src/physics/naked_llama.rs:878–901`):  
Same pattern as original: `apply_forces` + `physics_blend` additive or multiplicative.  
Plus `physics_invoke_for_early_worker_influence` for worker-only early layers.

**B. Quantized Llama path (claim-card path often lands here)**  
`niodoo/src/physics/quantized_llama.rs:224–241`:

```
physics_force = physics.apply_forces(&x_norm, layer.index)
blended_last = last * 0.95 + physics_last * 0.05   // HARDCODED
```

**Dilution point #1:** Claimed soul blend 0.55 is **not** what quantized uses. Force is diluted to **5%** of the residual mix, always. Independent of `NIODOO_PHYSICS_BLEND`.

---

## 3. Force terms inside `apply_forces` (PrincipiaEngine)

### 3.1 Probe isolation

All three trees: last-token hidden only = “the probe”; earlier sequence positions get zero force in the projected tensor.

### 3.2 When forces run

| | Original QSMA / Physics-LLM | Live |
|--|----------------------------|------|
| Early empty | Zero if no `sentence_history` and no `goal_embedding` | Same, plus many bridge/packet gates |
| **Gate** | **Token ramp** `ramp_factor` from `NIODOO_RAMP_START/END` | **Activation gate** = max(pressure_gate, request_gate, bridge_gate_floor) |
| Early abort | `ramp_factor == 0` → zero force (launchpad) | If **not** (bridge_lane ∨ worker_lane ∨ specialist ∨ correction_packets) → **return zeros** (`principia.rs:4942–4950`) before classic gravity stack |
| Scale of gravity | `× ramp_factor` | `× activation_gate` (geometry / request pressure, not token index) |

**Dilution point #2:** Live’s first gate can **skip the entire classic Principia stack** unless a modern lane (bridge / worker / packet / specialist) is selected. Original always entered gravity once off the launchpad and history existed.

**Dilution point #3:** Token-index God Zone ramp (4→10) is **not** the live default gate; live uses pressure + visible-request + bridge floor.

### 3.3 Term-by-term

| # | Term | Formula / behavior (source) | Original | Live status |
|---|------|-----------------------------|----------|-------------|
| 0 | **PINN inject** | Optional `pinn_loss` add | Yes | Code present if `pinn_loss` set |
| 1 | **History gravity** | \(F \propto G\, m / r^2\) from `sentence_history` positions (skip most recent; mass 0 if text len &lt; 3) | Core | Code present (`principia.rs:5134+`); scaled by `activation_gate` not ramp |
| 1.5 | **Ghost vector gravity** | `ghost_flat * ghost_gravity` (scalar mul on ghost vector — not inverse-square to ghost) | Core (`ghost_gravity` param, often 10) | Present; uses `last_ghost_gain`; **skipped** when specialist workers in Influence mode |
| 2 | **PINN manifold rail** | \(F \propto -(||x|| - \sqrt{d})\,\hat x\) if `pinn_enabled` | Optional | Code present |
| 3 | **Goal attractor** | `(goal - probe) * dynamic_gravity * gravity_well * 1000` for `layer_idx > 15` | Core | Present |
| 3.5 | **Black-hole repulsion** | For each BH emb: if \(||bh-probe|| < 5\), \(F = (repulsion\times10)\, r / r^2\); `dynamic_repulsion` e.g. −0.6…−3.0 | Core anti-template (incl. **assistant**) | **Code present but dead in practice** — live comment 2026-07-29: raw hidden norms never fall under dist&lt;5 → `repulsion_force==0` on measured runs (`principia.rs:6296–6301`) |
| 4 | **Orbital / Double Rainbow** | COM of last 20 particles + prompt anchor; \(G\times10000/r\) × orbit_speed×100; `layer_idx > 15` | Core character | Present if `orbital_active && orbit_speed > 0` |
| 5 | **Langevin** | `delta = μ·dt·force + σ·√(2dt)·noise` | Core | Present |
| 6 | **Momentum** | α=0.15 mix with last delta; Lorentz boost; clamp \|δ\|&gt;50 | Core | Present |
| 7 | **Event horizon clamp** | Cap / zero NaN or huge deltas | Core | Present |
| 8 | **Layer binary mask** | layer &lt; 31 → 1.0; else **0.02** | Core | Present (`principia.rs:6640` area) |
| 9 | **Micro-wobble** | Original: every **12 tokens**, N(0, **0.06**) | Sparring / self-correction | Live: **pressure-crossing** wobble when `ghost_pre_norm` crosses `NIODOO_WOBBLE_PRESSURE_THRESHOLD` (**14.0**), not every-12-token |
| 10 | **Iso-metric repair** | layer ≥ 30: renormalize proposed state to original norm | Core | Present |

### 3.4 Live-only residual / basin terms (not in original QSMA God Zone)

| Term | Behavior | Clamp / note |
|------|----------|--------------|
| **Bridge smoke pull** | `delta = nearest_ghost_basin - probe`; scale to max_norm | Default clamp **0.03** (`cli.rs` default `bridge_influence_smoke_clamp`) — **claim card path** |
| **Bridge selective** | Same pull gated by route margin, stability_k, cooldown | Same clamp; can scale by margin |
| **Route-memory worker** | Target / Residual64 / Delta64 direction; max_norm **≤ 0.03** | Many skip reasons (window, layer band, etc.) |
| **Correction packet force** | Clamped 4096D pull toward packet target (VQ-keyed) | Scar/LOCK path |
| **Specialist correction** | Rule-based phase2; optional apply flag | Observational by default unless apply on |
| **Residual TCT** | Final **post-norm** residual scars (not mid-layer) | Hydro continuity path |

**Dilution point #4:** Public “best face” of live is the **0.03-clamped nearest-basin residual pull**, not multi-term God Zone dynamics with blend 0.55 and repulsion −0.60.

### 3.5 Autonomic request → force params (both lineages)

| Request | physics_blend | dynamic_repulsion | Notes |
|---------|---------------|-------------------|-------|
| SPIKE | 6.5 | −3.0 | Adrenaline burst |
| FOCUS (allowed) | 0.5 | 0.0 | Lock answer |
| FOCUS denied | → SPIKE-like 5.0 / −2.5 | Entropy/adrenaline gate |
| EXPLORE | 2.0 | −2.0 | |
| RESET | 1.5 | −0.5 | Clear |

QSMA: `main.rs:834–900`. Live: same pattern ~1837–1871.

---

## 4. Logit-side control (`sample_token`) — original and still in live

**Physics-LLM** `main.rs:2125+` and **Live** `main_helpers2.rs:4372+ / 4411+`:

1. **Centrifugal Governor:** If entropy very low (velocity &gt; 0.95), subtract drag from top-1 logit (resistance_strength 15).
2. **Viscosity / sleepwalking:** If inertia tracker fires, suppress top-k logits, boost minority candidates.

This is **not** residual add. It is post-logits dynamical braking of confident wrong attractors — part of original “alive” feel. Live still has the code path; whether every chat path calls it is a separate wiring question (do not claim always-on without a run receipt).

---

## 5. What original dynamical system could do that residual-only path cannot

Grounded only in the equations above:

1. **Multi-particle gravity on sentence history** — continuous pull/push from past particles with mass filter, not a single 64D basin centroid.
2. **Strong anti-template repulsion** aimed at explicit black-hole embeddings (including **assistant**) with large |repulsion| under SPIKE/EXPLORE — original design. Live’s same formula is **instrumented as non-firing** under raw-hidden distance gate.
3. **High blend** (0.55 default; SPIKE 6.5) into mid-layer attention residual — vs quantized **5%** mix.
4. **Orbital COM + prompt anchor** at amplified scales (×10000 / ×100) for “Double Rainbow” character.
5. **Langevin noise + momentum + periodic wobble** as deliberate instability → recover (“wobble → snap”), not only last-step basin latch.
6. **Token launchpad ramp** protecting early tokens then opening full orbit — different control law than pressure-gated residual.
7. **Logit governor + viscosity** fighting confident wrong top-1 / sleepwalking clusters.

Residual-only (bridge smoke) can: small L2-capped nudge toward nearest exported basin; correct some last-step locks; break others (mississippi). It cannot, at clamp 0.03 and 0.05 blend, reproduce the God Zone force budget.

---

## 6. Exact dilution points (checklist)

| # | Dilution | Evidence |
|---|----------|----------|
| D1 | Quantized path hardcodes **0.95/0.05** blend | `quantized_llama.rs:238–241` |
| D2 | Early return zeros classic stack without modern lanes | `principia.rs:4942–4950` |
| D3 | Token ramp replaced by activation_gate | Original `NIODOO_RAMP_*`; live pressure/request gates |
| D4 | Bridge / worker force **max_norm 0.03** | `cli.rs` defaults; worker clamp `.clamp(0.0, 0.03)` |
| D5 | Black-hole repulsion **never fires** under dist&lt;5 on raw hidden | Live comment 2026-07-29 + measurement note |
| D6 | Public claim surface = bridge battery, not God Zone | `WHITEPAPER.md` / `claim_card.md` |
| D7 | Ghost scalar mul is not the same as inverse-square history gravity | Both trees: term 1.5 is scalar; term 1 is 1/r² history |
| D8 | Wobble schedule changed (every-12 vs pressure threshold 14) | QSMA vs live |

**What was not deleted from live:** gravity, orbital, Langevin, momentum, layer mask, request autonomic tables, governor/viscosity code, God Zone constant **names**. The **driver’s seat** moved: default measured path is residual basin + packets, under small clamps, with classic repulsion effectively off.

---

## 7. Honest public scoreboard (for paper; already on record)

| Artifact | Claim | Result |
|----------|-------|--------|
| Physics-LLM PARB multi-seed (2025-12-19) | Overall accuracy | Niodoo **29.9%** vs baseline **41.6%** (loss owned) |
| Selective traps / rainbow | Character / anti-template | Qualitative God Zone lock Dec 16 2025 |
| Live claim card 2026-06-24 | Bridge on vs off, 8 prompts, seed 42 | 4 corrected, 3 held, 1 broken |
| Live latch scoreboard | Multi-seed answer | Net wash; trap-type splits |

Do not promote live residual as “best Niodoo.” Best dynamical lineage for paper = **QSMA / Physics-LLM Principia + God Zone + black-hole + sample_token**, with scar/LOCK as **add-on** not replacement.

---

## 8. Recovery experiment target (Step 2 — design only, not executed here)

**Goal:** One clean anti-template behavior under **full dynamics** + scar/LOCK still available.

Minimum honest setup (to implement next, not claimed done):

1. Path: **naked_llama forward_physics** (not quantized 0.95/0.05), blend = `NIODOO_PHYSICS_BLEND` (0.55) or God Zone SPIKE table.
2. Enable history gravity + orbital + Langevin as in original ramp law (`RAMP_START/END`).
3. Fix or replace black-hole distance gate so repulsion can fire in raw-hidden space (or repel in normalized probe space) — document the fix; do not claim OG until telemetry shows `repulsion_force ≠ 0`.
4. Prompt that used to blow past `assistant` / filler; telemetry: gravity_mag, repulsion_mag, ramp_factor, blend.
5. Keep correction packets / LOCK as **optional second stage**, not the only force.

Success metric: **repulsion_mag &gt; 0** on template-adjacent tokens + qualitative anti-template completion + no regression of LOCK mint when scar path enabled.

---

## 9. PhysicsLang / Gravitational Grammar (Step 3 — stub for formalization)

Map force terms → DSL atoms (names only; grammar TBD):

| PhysicsLang atom | Runtime term |
|------------------|--------------|
| `GRAVITY(history)` | History 1/r² |
| `GHOST(vector)` | Ghost scalar attractor |
| `REPEL(black_holes)` | Black-hole short-range |
| `ORBIT(sun, speed)` | Double Rainbow assist |
| `LANGEVIN(μ, σ)` | Drift + diffusion |
| `MOMENTUM(α)` | Delta EMA |
| `RAMP(start, end)` | Launchpad |
| `BLEND(β)` | Injection gain |
| `WOBBLE(schedule)` | Micro-perturbation |
| `GOVERNOR / VISCOSITY` | Logit-side |
| `BASIN_PULL(clamp)` | Live residual bridge |
| `SCAR / LOCK / PACKET` | Correction memory |

Principle: PhysicsLang describes **control law composition**, not “forward pass only.”

---

## 10. Care rule (for every next step)

- Diff against this map before changing force code.
- Any PR that only strengthens residual clamp 0.03 is **not** restoring Niodoo.
- Any claim that “live is full physics” is false while D1–D5 hold.
- Prefer receipts: telemetry fields `gravity_force`, `repulsion_force`, `ramp_factor`, `physics_blend`, `ghost_pull_delta_norm`.

---

*Map produced by reading the sources above. Partial excerpts only; full functions are multi-thousand lines. Next: implement recovery experiment with telemetry gates, then paper outline from public + this map.*
