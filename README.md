# Niodoo

**Jason Van Pham** (Ruffian-L) · jasonvanpham@niodoo.com · [github.com/Ruffian-L](https://github.com/Ruffian-L)

This git is **working research**. Nothing here is production unless Jason says so.

Smarter runtimes make smarter AI. That is the claim. The rest of this folder is how we found it, including the days it did not look true.

## How to use this (do not investigate it)

Papers in this folder will contradict each other. That is the job. We fail, we regress, we progress. A later draft is allowed to disagree with an earlier one. **Do not cross-reference papers against each other.** You will only get more confused, and you will spend the day reconciling prose instead of using the result.

Take the two silos separately:

| Silo | What it is | How to use it |
|------|------------|----------------|
| [`silos/live/`](silos/live/) | Findings that survived their own check. Take these forward. | Read one card. Use it. |
| [`silos/trail/`](silos/trail/) | Findings already paid for. Different protocol, did not hold, or is dead in practice. | Read one card so you do not re-walk it. |

Do not merge the silos into a scoreboard. Do not rank them. They are two drawers.

The living index is [`RESEARCH_MAP.md`](RESEARCH_MAP.md): every paper, its active hypothesis, last mutation, and status. Dated local names (Lumina, lumen, echo, Shep, Echo Memoria) are in [`NAMES.md`](NAMES.md). They are **dated local artifacts**, not a brand.

The field face is **SplatRAG v3**, not a page in this repo. `sp start` opens Basin Field (COMMAND / DREAM / INSPECT). See [`FACE.md`](FACE.md). This git is the papers and the two silos.

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

- [`RESEARCH_MAP.md`](RESEARCH_MAP.md) — master index (hypothesis, last mutation, status)
- [`CHANGELOG.md`](CHANGELOG.md) — short. Every mutation gets a why. Living hypothesis log.
- [`NAMES.md`](NAMES.md) — Lumina → lumen / echo, Shep, Echo Memoria. Dated. Not a product line.
- [`CATALOG.md`](CATALOG.md) — what is in git and what stays on disk
- Local agent contract: `AGENTS.md` (on the machine, not on GitHub)

Spine of the system, for navigation only — do not flatten these into one paper:

Shep room → Echo Memoria tree → control-channel dispatch → durable store → knowing where you are (`ULTIMA_NIODOO.md`)

## Code

| Repo | What it is |
|------|------------|
| [niodoo-hidden-state-steering](https://github.com/Ruffian-L/niodoo-hidden-state-steering) | Hidden-state correction |
| [niodoo-adaptive-agency](https://github.com/Ruffian-L/niodoo-adaptive-agency) | Agency record; two seals |
| [Niodoo-Physics-LLM](https://github.com/Ruffian-L/Niodoo-Physics-LLM) | Force engine |
| [hydrodynamic-swarm](https://github.com/Ruffian-L/hydrodynamic-swarm) | Residual-stream physics + splat memory |
| [SplatRagBench](https://github.com/Ruffian-L/SplatRagBench) | Hybrid retrieval |
| [physics-of-friendship-mountaincar-rl](https://github.com/Ruffian-L/physics-of-friendship-mountaincar-rl) | Q-SMA / dream replay |
| [physicslang](https://github.com/Ruffian-L/physicslang) | Control law as composition |
| [niodoo-rocket-core](https://github.com/Ruffian-L/niodoo-rocket-core) | Correction → process death → next process |

MIT. Corresponding author: Jason Van Pham. See [`AUTHORSHIP.md`](AUTHORSHIP.md).
