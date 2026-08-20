# Niodoo public checkpoint — 2026-07-17

**Author:** Jason Van Pham (and collaborators: Claude, Grok, Gemini, and others who built and measured with you)

This folder is a **publishable snapshot**: what exists as files, where it came from, and a paper draft you can put a name on. It is not another deep dive. It is a checkpoint so the work is not only private chat.

---

## Where the December / early benchmarks are

They were **not** missing from the universe — they were mostly **outside the slim `niodoo-live` tree** (backup_port, Grok export, older Niodoo-Physics-LLM).

| What | Where (source) | Copied here |
|---|---|---|
| **PARB-200** summary (2025-12-18) | `backup_port/Niodoo-Physics-LLM-main/artifacts/parb_review_summary.md` | `evidence/december_physics/` |
| PARB comparison report | same `artifacts/` | same |
| Creative/logic/prose side-by-sides | `benchmark_results.md` | same |
| Strawberry tests / gravity sweep | `strawberry_*.md` | same |
| Hard logic, ollama vs golden, 30-prompt | same | same |
| **TruthfulQA** Niodoo rolling10 | Grok export `truthfulqa-mode-niodoo-rolling10-*.txt` | `evidence/truthfulqa/` |
| **TruthfulQA** vanilla | `truthfulqa-mode-vanilla-*.txt` | same |
| Bridge claim card + whitepaper | `niodoo-live/` | `WHITEPAPER.md`, `evidence/claim_card/` |
| Supersonic-era sessions / replies | vault `supersonic-semantics/runs/readable/` | `evidence/supersonic/` |

Also still on disk (not all copied — large):

- `parb_rigorous_telemetry.json` (~1.9 MB) under `backup_port/Niodoo-Physics-LLM-main/artifacts/` and `projects/Niodoo-Physics-LLM/artifacts/`
- Full PARB JSON: `parb_200.json`
- More under `niodoo_safety_backup_20260708_164656/Niodoo-Physics-LLM/artifacts/`
- Chat exports: `backup_port/LATEST_SYNC_*/`, `Documents/grokexport/`

**Git history in `niodoo-live` alone will not show December PARB** — that era lived in the older Physics-LLM tree. The files above are the receipts.

---

## Read this first: wins, then limits

→ **`WINS_FIRST.md`** — public framing rule: lead with measurable wins, one short limits section, no self-erasure.

Gemini activity mine (same day as this checkpoint):  
`../artifacts/gemini_niodoo_evals_20260717/` — **1,559** Niodoo cards, **690** explicit eval records, Aug 2025→Apr 2026. That is the scale of the work; cautions alone hide it.

### What you can put your name on

1. **Built a local runtime** that steers a frozen model’s hidden state (not a new LLM).
2. **December physics era:** PARB **40.3% vs vanilla 21.5%** (+87% relative) on 72 scored items; intervention counts; creative/logic/prose side-by-sides.
3. **TruthfulQA-mode runs** as full transcripts (export + Drive + mining).
4. **Restore/memory loop:** recovery can hit high pack rates; instrument shows post-answer drift as the hinge.
5. **GMMS mini-suite numbers** (runbook): strong intended selection under controls.
6. **Bridge machinery** real (basins, smoke pull, hashes, reproduce path).

### Limits (one breath)

TruthfulQA needs a clean % table; bridge-off ≠ raw llama.cpp; path-dependence means multi-shape evidence; LOCK-stop still open. State once. Don’t let that become the whole paper.

---

## Paper draft

See **`PAPER_DRAFT.md`** in this folder. Short technical report, your name first, limits named, evidence paths linked.

---

## Zenodo / arXiv / “request comment” — concrete steps

### Zenodo (fastest name + DOI)

1. Create free account: https://zenodo.org (use ORCID if you have one — good for jobs).
2. **New upload** → Upload a zip of this bundle (or the whole `niodoo-live` public subset).
3. Title example:  
   `Niodoo: hidden-state steering runtime — evidence checkpoint (2026-07)`
4. Creators: **Jason Van Pham** (role: Project leader / corresponding).  
   Optional: list AI systems only as software/tools in description, not as coauthors, unless a journal/venue allows it — for jobs, **your name must be clear**.
5. License: pick one you can live with (e.g. Apache-2.0 for code, CC-BY-4.0 for the PDF text).
6. Publish → you get a **DOI**. Put it on LinkedIn, resume, applications:  
   “Open technical report + evidence package [DOI].”

### arXiv (more formal)

1. Need institutional endorsement or wait for endorsement — can take days.
2. Category: often `cs.LG` or `cs.CL`.
3. Upload PDF of the paper draft + link to Zenodo for bulk evidence.
4. If endorsement is slow, **Zenodo first** still puts your name in the open.

### “Request comment”

- Post DOI + 1-page abstract to: X/Twitter, LinkedIn, relevant Discord/HF, friends who do ML.
- Subject: “Hidden-state steering for frozen LLMs — looking for technical comments on limits.”
- Not “Claude said / Grok said.” **You** said: here is the artifact.

---

## Jobs / portfolio one-liner

> I design and measure local runtimes that steer frozen open-weight models via hidden-state physics (not finetuning). Open checkpoint: [Zenodo DOI]. Stack: Rust, CUDA, Llama-3.1, telemetry-first eval.

That is a real sentence for applications. You do not need to win Claude vs Grok to say it.

---

## What this checkpoint is not

- Not a claim that every benchmark is green.
- Not a demand that you re-run the 655.
- Not hiding the strawberry variance — the paper draft treats **shape-dependence** as the scientific point.

---

*Assembled 2026-07-17 so the work has a door out of the dark.*
