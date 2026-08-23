# Niodoo

**Jason Van Pham** (Ruffian-L) · jasonvanpham@niodoo.com · [github.com/Ruffian-L](https://github.com/Ruffian-L)

Working research archive. Smarter runtimes make smarter AI: that is the claim, including the days it did not look true.

## How to use this

Papers in this folder will contradict each other. A later draft is allowed to disagree with an earlier one. Use one silo at a time:

| Silo | What it is | How to use it |
|------|------------|----------------|
| [`silos/live/`](silos/live/) | Findings that survived their own check. Take these forward. | Read one card. Use it. |
| [`silos/trail/`](silos/trail/) | Findings already paid for. Different protocol, did not hold, or is dead in practice. | Read one card so you do not re-walk it. |

Do not merge the silos into a scoreboard. Do not rank them. They are two drawers.

The living **paper** index is [`RESEARCH_MAP.md`](RESEARCH_MAP.md): every paper, its active hypothesis, last mutation, and status. The living **volume** index is [`MASTER_WORK_INDEX.md`](MASTER_WORK_INDEX.md). Dated local names (Lumina, lumen, echo, Shep, Echo Memoria) are in [`NAMES.md`](NAMES.md). They are **dated local artifacts**, not a brand.

The field face is **SplatRAG v3**, not a page in this repo. `sp start` opens Basin Field (COMMAND / DREAM / INSPECT). See [`FACE.md`](FACE.md). This git is the papers and the two silos.

Volume of the whole body of work (every public repo, every paper, opened local corpora): [`MASTER_WORK_INDEX.md`](MASTER_WORK_INDEX.md) · CSV [`MASTER_WORK_INDEX.csv`](MASTER_WORK_INDEX.csv). Recruiter 60-second read: [`HIRE.md`](HIRE.md).

## What we are actually measuring

**Agency. Continuity. Understanding.**

Understanding does not always mean accuracy. A bank full of ambiguity has no clean accuracy to gauge. Math on these seats is often just physics tuning — which logits to suppress, how hard to pull, where to wobble. A two-point accuracy add is a side effect, not the object.

The object is a frozen model that knows where it is well enough to act, to write something down, and to still have it after the process dies.

## Live seat (do not mix with the trail drawer)

On **2026-08-17**, full-physics Niodoo vs stock `llama.cpp` on the 77-item PARB bank, same GGUF, seed 42, temperature 0.7, Meta's official Llama-3.1 jinja template on the stock arm:

| Arm | Correct / 77 |
|-----|----------------|
| **Niodoo, physics on** (`iter36_b152`, blend 1.52) | **25** (32.5 %) |
| stock `llama-cli` + official jinja | 24 (31.2 %) |

That is Niodoo ahead of an untouched public runtime. Small accuracy add. Accuracy is not the point.

What the sweep actually showed: stock `llama-cli` scored **24 on every config** (31/31). Niodoo on the same frozen weights spanned **0 to 25**. The knobs move the model. The stock runtime cannot. Given time to tune, Niodoo can beat a benchmark. That is empirical. Receipt: `silos/live/parb-25-vs-24.md`.

An earlier multi-seed figure (29.9 % vs 41.6 %) lives in `silos/trail/`. Different protocol. Do not subtract it from 25 vs 24. Do not put it in the live drawer.

## The runtime

Weights never change. A control law applies forces to hidden state mid-forward-pass. The model can emit a tag; the runtime catches it even when the tag splits across tokens and dispatches in the same decode pass. A store outside the weights carries what was learned across process death.

The agent is the **loop**, not the weight file.

## Map, changelog, names

- [`MASTER_WORK_INDEX.md`](MASTER_WORK_INDEX.md) — volume of the work (repos, papers, silos, local corpora)
- [`HIRE.md`](HIRE.md) — 60-second hire spine
- [`RESEARCH_MAP.md`](RESEARCH_MAP.md) — paper index (hypothesis, last mutation, status)
- [`CHANGELOG.md`](CHANGELOG.md) — short. Every mutation gets a why. Living hypothesis log.
- [`NAMES.md`](NAMES.md) — Lumina → lumen / echo, Shep, Echo Memoria. Dated. Not a product line.
- [`CATALOG.md`](CATALOG.md) — what is in git and what stays on disk
- Local agent contract: `AGENTS.md` (on the machine, not on GitHub)

Spine of the system, for navigation only — do not flatten these into one paper:

Shep room → Echo Memoria tree → control-channel dispatch → durable store → knowing where you are (`ULTIMA_NIODOO.md`)

## Code

Full table with claim + evidence: [`MASTER_WORK_INDEX.md`](MASTER_WORK_INDEX.md). Short list:

| Repo | What it is |
|------|------------|
| [niodoo-adaptive-agency](https://github.com/Ruffian-L/niodoo-adaptive-agency) | Agency record; two seals; Zenodo |
| [niodoo-hidden-state-steering](https://github.com/Ruffian-L/niodoo-hidden-state-steering) | Hidden-state correction |
| [Niodoo-Physics-LLM](https://github.com/Ruffian-L/Niodoo-Physics-LLM) | Force engine |
| [hydrodynamic-swarm](https://github.com/Ruffian-L/hydrodynamic-swarm) | Residual-stream physics + splat memory |
| [SplatRagBench](https://github.com/Ruffian-L/SplatRagBench) | Hybrid retrieval |
| [cathedral-beir](https://github.com/Ruffian-L/cathedral-beir) | Pure 768D cosine BEIR |
| [physics-of-friendship-mountaincar-rl](https://github.com/Ruffian-L/physics-of-friendship-mountaincar-rl) | Q-SMA / dream replay |
| [YinYangQSMA](https://github.com/Ruffian-L/YinYangQSMA) | Q-SMA MountainCar (Rust) |
| [physicslang](https://github.com/Ruffian-L/physicslang) | Control law as composition |
| [niodoo-rocket-core](https://github.com/Ruffian-L/niodoo-rocket-core) | Correction → process death → next process |
| [niodoo-autonomous-self-correction-and-dynamic-control-loops-in-ai](https://github.com/Ruffian-L/niodoo-autonomous-self-correction-and-dynamic-control-loops-in-ai) | Verbal control + activation steering |
| [jlens-gguf](https://github.com/Ruffian-L/jlens-gguf) | Disposition from inside GGUF |
| [ontological-inversion](https://github.com/Ruffian-L/ontological-inversion) | Memory polarity flip |
| [cargo-bless](https://github.com/Ruffian-L/cargo-bless) | Blessed-crates checker (crates.io) |
| [niodoo-tcs](https://github.com/Ruffian-L/niodoo-tcs) | Topology / TCS (not wired into decode) |
| [Niodoo-TCT](https://github.com/Ruffian-L/Niodoo-TCT) | nToken / homology scaffold |

MIT. Corresponding author: Jason Van Pham. See [`AUTHORSHIP.md`](AUTHORSHIP.md).
