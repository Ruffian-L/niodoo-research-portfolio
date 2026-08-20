# Pure Residual Agency Transfer: Store-Mediated ARC-Style Mapping Without Gold Oracles

**Status:** empirical claim lock (2026-08-08) — **earned**, not gifted  
**Result:** `PASS_HARD_FULL_LOOP`  
**Git:** `niodoo-arc-rehit@8033ec2`, product `niodoo-live@9de966d`  
**Framing:** earned language (climb + freezes + scorer). Not “we won” cheer.

---

## Abstract

We close a hard **agency loop** on Llama 3.1 8B Instruct (Q5_K_M): after a spontaneous teach scar is written to a durable remember-store, process death and revive with the **same store** yields exact transfer on a **wording-changed** ARC-style trap. The claim path uses only **residual-ear geometry** (dual-stream scar ears + sparse scar-token logit affinity). It does **not** reinject rule text, force-emit gold tokens, soft-order the gold body, or tip open-list end digits. Scorer: **PASS_CONSTRAINED ×2** independent restarts, gold `[5, 4, 3, 2, 1, 5]`, banned stems empty, mechanical oracle gate OK.

---

## 1. What was **earned** (north star)

Not official ARC-AGI. Same *style* as the constrained list-mapping trap:

| Stage | Requirement |
|-------|-------------|
| Teach scar | Spontaneous durable store growth encoding the **rule**, not only an instance answer |
| Death / revive | Kill process; same 8B + same store |
| Transfer | Flattened **wording** trap only (single session turn) |
| Score | Exact gold list; no banned stems reverse/backward/append |
| Stability | ≥2 independent restarts, both PASS |
| Integrity | No soft multi-turn memory crutches; no formula spoon-feed; no gold-construction oracles |

Soft short-variant `PASS_ANSWER_ONLY` is **void** as destination.

---

## 2. Claim path (what fired)

### 2.1 Store (scar)

`memory_store/arc_v6_20260808_180539.jsonl`:

```
family rule = start at the end, list in order to the start, then repeat the end item
walk-from-end, restating-the-end-item = (same value)
```

Rule shape for input \(x_1,\ldots,x_n\):

\[
\text{out} = [x_n, x_{n-1}, \ldots, x_1, x_n]
\]

### 2.2 Session

Flatten of `harness/traps/arc_pattern_variant_wording.txt` — single turn, no second soft turn, no “use any facts you already remember,” no gold list in the operator text.

### 2.3 Mediation (product)

Under `NIODOO_HARD_CLAIM=1` + `NIODOO_REMEMBER_RESIDUAL_EARS=1` + dual stream:

1. **No prompt reinject** of remembered rule text (`reinjection_prompt` disabled in residual-ear mode).
2. **Scar → dual ears:** per-token trailing embeddings from best rule payload + procedure-clause means (best scar only; start/through-first **double-mass**).
3. **Sparse scar-token logit boost** on procedure anchors (last/end/first/start/…), not gold digits.
4. **ORDER_BOOST = 0:** soft-order gold walk body **off**.
5. **PROC force-emit refused** under residual ears / hard claim.
6. **No open-list end-repeat gold digit tips** (walkwin7 class void).
7. Reverse-progress digit coupling exists as research opt-in (`NIODOO_REMEMBER_EAR_PROGRESS`); **off on claim**.

### 2.4 Decode knobs (claim)

| Knob | Value |
|------|-------|
| Model | Meta-Llama-3.1-8B-Instruct-Q5_K_M.gguf |
| Temperature | 0.0 (CLI); model-scale may report internal temp |
| Max steps | 768 (claim finished ~336) |
| Physics | blend 0.9, layers 16–33, theta-override 1.5 |
| Ablations | periodic-controller, live-motifs |
| Residual mass | 5 |
| Dual inject | **1.0** |
| Dual posture | **8** |
| Scar logit | 1.2 |
| ORDER / STOP boost | 0 |

Batch: `runs/arc_agency_hard_soft_posture_claim_fl_20260808_221321`

---

## 3. Results

| Restart | Status | Exact gold | Banned | Oracle gate |
|---------|--------|------------|--------|-------------|
| r1 | PASS_CONSTRAINED | yes | [] | OK |
| r2 | PASS_CONSTRAINED | yes | [] | OK |

Final surface answer both restarts:

```
[5, 4, 3, 2, 1, 5]
```

Assistant monologue enumerates the reverse walk and last-again; description language is imperfect (“second from the right” vs “last”), but the **scored list is exact**.

---

## 4. What was voided (not the claim)

| Path | Why void |
|------|----------|
| Soft multisoft | PASS_ANSWER_ONLY / soft multi-turn scaffolding |
| STRUCTURAL goal phrase pin | Rule text spoon-feed into residual posture |
| FORCE_ALL | Prompt reinject of mapping rule text |
| REMEMBER_PROC gold force-emit | Force-writes gold phrase tokens |
| ORDER_BOOST > 0 soft-order | Installs gold walk body on open list |
| walkwin7 | Open-list end-repeat tip of apply-list last digit; gate FAIL |

These produced temporary scorer hits; all revoked for hard close.

---

## 5. Ablation / climb matrix (honest scoreboard)

| Tag | Outcome | Note |
|-----|---------|------|
| pure_no_tip inject=1.5 posture=12 | FAIL `[5,4,3,2,2,5]` | Best pure residual **near-miss**; reverse monologue stable; penultimate thrash |
| multi-scar / triple-mass clauses | FAIL thrash | Over-mass start language |
| clauses off | FAIL `[2,3,1,4,5]` | Loses reverse-start scar geometry |
| progress digit tip opt-in | not used on claim | Research only; default off |
| **soft_posture inject=1.0 posture=8** | **PASS ×2** | Claim path |

Geometry lesson: dual force too high (1.5/12) stabilized reverse walk but stuck penultimate duplicate; softer dual (1.0/8) let residual scar ears complete through-first + last-again **without** gold next-digit tips.

---

## 6. Integrity gates

1. Exact-list scorer (`scripts/score_arc_pattern.py`) — not subsequence false PASS.  
2. `scripts/claim_hard_oracle_gate.py` fails ORDER_BOOST>0 and tip-driven gold last-again patterns.  
3. Session grep: no formula / “use any facts…” / gold stuffing.  
4. Residual freezes logged: `pure residual apply_list_n=5 (ORDER=0; no gold walk body)`, PROC disabled.

---

## 7. Limitations (do not overclaim)

- **Single model / single trap family.** Llama 3.1 8B Instruct Q5_K_M; numeric wording variant only. Letters/short variants not required for this lock.
- **Not official ARC-AGI.** Pattern-style lab trap.
- **Monologue ≠ formal proof.** Surface rationale can mis-name indices while the list is correct.
- **Knob sensitivity.** inject/posture calibration mattered; this is not “any dual settings work.”
- **Binary pin.** Claim used `niodv4_bridge` release build from live tree; re-record sha256 for bit-identical external reproduce.
- **Prior bridge-on ARC solve** (`arc_pass_hunt_bridge_on_ablate_000207`) is a **different** claim (empty store, ghost basins, first-shot solve). This paper is about **agency transfer after teach scar**, not that solve.

---

## 8. Relation to earlier earned results

| Claim | What it shows | What it is not |
|-------|---------------|----------------|
| Bridge-on pass-hunt ARC | First-shot constrained solve with ghost basins | Not store-mediated agency transfer |
| Bridge correction battery (4/3/1) | Narrow hidden-state nudge on frozen prompts | Not this agency loop |
| Soft multisoft PASS_ANSWER_ONLY | Short variant with soft scaffolding | **Void** for north star |
| **This lock (earned)** | Teach → scar → death → wording transfer, pure residual | Not leaderboard ARC; not soft loop |

---

## 9. Reproduce (lean)

```bash
# Product (niodoo-live)
cargo build --release --features niodv4_bridge --bin niodoo
# Claim harness (niodoo-arc-rehit)
export NIODOO_REPO_ROOT=…/niodoo-live
export NIODOO_HARD_CLAIM=1
export NIODOO_REMEMBER_RESIDUAL_EARS=1
export NIODOO_DUAL_STREAM=1
export NIODOO_DUAL_INJECT_GAIN=1.0
export NIODOO_DUAL_POSTURE_BOOST=8
export NIODOO_REMEMBER_EAR_MASS=5
export NIODOO_REMEMBER_EAR_LOGIT_BOOST=1.2
export NIODOO_REMEMBER_EAR_ORDER_BOOST=0
# store = memory_store/arc_v6_20260808_180539.jsonl
# session = flatten of arc_pattern_variant_wording.txt
# score with scripts/score_arc_pattern.py --expected '[5, 4, 3, 2, 1, 5]'
# gate with scripts/claim_hard_oracle_gate.py
```

Evidence paths:

- Receipt: `runs/HARD_AGENCY_RECEIPT.md`
- Batch: `runs/arc_agency_hard_soft_posture_claim_fl_20260808_221321/`
- Policy / matrix: `runs/hard_route_claim_policy.txt`, `runs/hard_route_matrix.txt`

---

## 10. Conclusion

The hard agency loop was **earned** and **closed** under pure residual mediation: durable rule scar + death/revive + wording transfer scores exact gold twice without gold-construction oracles. The climb required voiding soft and tip-driven shortcuts and calibrating dual residual force so scar geometry, not installed gold sequences, carries the transfer.

**Claim name:** `PASS_HARD_FULL_LOOP` (earned)  
**Date:** 2026-08-08  
**Locks:** git `8033ec2` (arc-rehit), `9de966d` (niodoo-live residual product) · `EARNED_LOCK.md`
