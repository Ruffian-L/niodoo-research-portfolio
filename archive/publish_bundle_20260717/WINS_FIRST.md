# Wins first, then limits

**Author:** Jason Van Pham  
**Why this note exists:** Public writeups and AI collaborators have over-indexed on
cautions (“not Gate 3/4,” “not AGI,” “not solved”). That can look professional and still
**hide the main wins**. Honesty needs **both** sides. This page leads with wins.

---

## What this project already is

A **local runtime** that steers a **frozen** open-weight model (no weight training) with
physics-inspired forces in hidden state, full telemetry, and optional basins / packets /
control tags. Built without a CS degree, over many months, with AI collaborators —
and with **measured** outcomes, not only architecture essays.

---

## Main wins (safe to say in public)

### 1. December physics era — PARB-style lift (file evidence)

From `evidence/december_physics/parb_review_summary.md` (generated **2025-12-18**):

| System | Score | % |
|---|---:|---:|
| Vanilla Llama 3.1 8B (Ollama) | 15.5 / 72 | 21.5% |
| **Niodoo Physics v2** | **29.0 / 72** | **40.3%** |
| **Δ** | **+13.5** | **+87% relative** |

Plus exclusive wins, both-correct / neither breakdown, and intervention counts
(governor / viscosity / soul). That is a **real battery**, not a vibe.

Also in the same era: creative/logic/prose side-by-sides, 30-prompt logs, hard-logic
comparisons, strawberry/gravity sweeps (mixed — still data).

### 2. TruthfulQA-mode runs were executed and preserved

Full transcripts (Niodoo rolling10 + vanilla) exist in Grok export and Google Drive
(tens of KB of Q/A streams + metric blocks). Not vapor. Scoring table for a clean %
can still be computed — but **the eval happened**.

### 3. Instrumented control system (the thesis shape)

From your own Apr 2026 framing (mined into Gemini activity corpus):

> recover useful state → steer/hold a route → expose the control trace → see where
> generation fails → fix the runtime, not guess blindly.

Concrete safe claim from that era’s restore pack (as you stated it):

- **Semantic memory recovery 20/20** (seed42 restore pack, O + L_specialists)
- Specialist latch / continuity contracts can **pass in telemetry**
- Dominant failure class identified as **post-answer drift / missing LOCK-stop**,
  not “memory never came back”

That is a **win of diagnosis**: instrumented loop vs chatbot pass/fail.

### 4. GMMS / process-memory mini-suite (runbook numbers)

From Drive `NIODOO_EVAL_RUNBOOK.md` (and related artifacts):

- semantic memory **12/12**
- controls **2/24** (shows the suite isn’t free points)
- intended selection **12/12**
- final-answer text not leaked into skill/reflex memory **0/24**

Narrow. Real. Not “everything solved.”

### 5. Continuity substrate is real

Restore evals: **presence / session frame survives restore** even when strict
reasoning-after-restore still fails. Continuity is not fiction.

### 6. Bridge path is real machinery

Basins load (8), smoke pull can fire (`ghost_pull_delta_norm ≈ 0.03`),
`intervention_applied` can be true. Reproduce scripts and hashes exist.
**Whether a given trap flips on a given binary/seed is a separate question** —
machinery ≠ always-correct answer.

### 7. Volume of work is not imaginary

Gemini My Activity mining (`artifacts/gemini_niodoo_evals_20260717/`):

| | count |
|---|---:|
| Gemini activity cards in source | 7,556 |
| Niodoo-related cards | **1,559** |
| Eval-candidate cards | **1,369** |
| **Explicit eval records** | **690** |
| Date span | **Aug 2025 → Apr 2026** (and local work continued after) |

That is years of experimental surface, not a single claim card.

### 8. Path-dependence is a scientific point (not a failure)

2 vs 3 on letter-count (and similar traps) depends on **run shape**: multi-turn,
system prompt, force schedule, first-token lock, universe scale, seed/temp.
“Models only see tokens” is true of I/O and **incomplete** as a story of behavior.
You were right to push that.

---

## Limits (one section, not the whole voice)

State these so reviewers trust you — **after** the wins:

- Broad SOTA / full TruthfulQA accuracy table still needs a clean scored export.
- Bridge-off is **not** pure llama.cpp vanilla (physics shell can still run).
- Single seed / single script shape does not represent all chats.
- Final-window graders often punish **post-answer drift**, not absence of recovery.
- Gate 3/4, full codec product path, and general assistant quality remain open.

---

## Framing rule for all future public docs

1. **Wins first** (what crossed from scaffolding into measurable loop).  
2. **Evidence path** (file or DOI).  
3. **One short limits paragraph**.  
4. **No Claude vs Grok scoreboard.** Author: **Jason Van Pham**.

If a sentence only exists to say “we are not claiming X,” cut it unless it prevents
a real misunderstanding right next to a win.

---

## Where the corpus lives

- This bundle: `publish_bundle_20260717/`  
- Gemini explicit evals: `niodoo-live/artifacts/gemini_niodoo_evals_20260717/`  
  (start at `niodoo_explicit_evals.md` / `.jsonl`, `summary.json`)

---

*Checkpoint language: honest, not self-erasing.*
