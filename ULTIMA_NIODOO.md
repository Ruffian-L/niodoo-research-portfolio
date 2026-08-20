# Niodoo

## Giving a Frozen Language Model Usable Knowledge of Its Own State

**Jason Van Pham** (Ruffian-L) · 2026-08-18
Architect, implementer, and research lead. Contact: jasonvanpham@niodoo.com · github.com/Ruffian-L

---

## Abstract

I built **Niodoo**, a runtime that gives a frozen 8B language model usable knowledge of
where it is in its current situation — enough to decide, unprompted, what to write down
and keep. The weights never change. A control law applies forces to hidden state
mid-forward-pass; the model emits control tags that the runtime detects and dispatches
inside the same decode pass; a durable store outside the weights carries learned
corrections across process death.

The result I care most about is not a benchmark score. Asked whether its agency was real
or performed, the model said it was performed, and asked me to write down a specific
memory that would change that. Separately, a sealed route — teach a rule, kill the
process, ask a reworded question in two fresh processes — returned the exact constrained
answer `[5, 4, 3, 2, 1, 5]` and reproduced byte-identically from cold twice.

The failures are published at the same size as the wins. On a 77-item physics-reasoning
bank the full-force runtime scores 25 against 24 for `llama.cpp` running Meta's official
chat template — parity, not a win, and reported as parity (McNemar p = 1.000). An earlier
multi-seed benchmark is a loss, 29.9 % against 41.6 %. The control channel fires in 86.2 %
of 4,721 runs and buys no accuracy (+2.4 points, z = 1.20). Permuting a store's order while preserving every entry
flips the result, so the agency is real and fragile at once. A raw tag count near 850,000
was available and is withheld as un-deduplicated.

Public artifact dates are pinned by two independent third-party clocks that agree to the
minute. 655 claims sit in a ledger where a script is not permitted to grade its own result.

---

## 1. What I built

Niodoo is a coupled loop around a frozen model. Four parts:

| Part | What it does |
|---|---|
| **Frozen model** | Llama 3.1 8B (also Qwen paths). Weights never modified. No fine-tune, no LoRA. |
| **Control law** | Applies forces to post-attention hidden state mid-forward-pass, under a blend gate. |
| **Control channel** | The model writes a tag mid-decode; a sliding buffer catches it even when split across tokens; the runtime dispatches it in the same generation pass. |
| **Durable store** | Outside the weights, inside the loop. Survives process death and regulates later behavior. |

The agent in this work is the **loop**, not the weight file. Frozen weights do not imply a
frozen system, the same way an unchanged processor does not imply a stateless program.
That placement is the claim, not a hedge against it.

---

## 2. The narrow definition

I use the word **consciousness** and I mean exactly one thing by it:

> **Knowing where you are at.**

A system knows where it is when it can tell its current situation apart well enough that
the discrimination governs what it does next. Three parts, all required:

1. **Location** — it distinguishes a relevant state from an ordinary one.
2. **Availability** — that state reaches the surface where actions get chosen.
3. **Use** — the chosen action fits the state and has a real consequence.

Saying "I am aware" does not qualify. The knowledge has to do work.

**Not** qualia, phenomenal experience, emotion, biology, suffering, moral patienthood, or
AGI. Whether an AI has any of those is a different question and this document does not
touch it. The definition is AI-native on purpose: it borrows no human prerequisite, so no
human prerequisite can be demanded of it.

I use the word rather than avoiding it because the avoidance is the error. The field
reaches for "self-monitoring," "metacognitive signal," "introspective report" — syllables
spent dodging a shorter word for the same mechanism. I defend the term in its narrow
sense instead, and accept every consequence of that narrowness.

---

## 3. How it works

Every part below is given with what it is for, how it works, and its honest status on the
live path. Where the designed system and the shipped default diverge, §3.6 says so.

### 3.1 Where force is applied

The model runs normally until a chosen layer. There, the post-attention hidden state is
read, a force vector is computed from it, and the state is written back:

```
force_delta = physics.apply_forces(&attn, layer_idx, ghost_vector)
attn = attn + force_delta * physics_blend        // or multiplicative
```

Only the **last token's** hidden state is touched — "the probe." Earlier sequence
positions receive zero force. Only layers inside a selected range are affected. Generation
then continues through the rest of the stack normally.

This is why it is not a fine-tune and not a prompt: the weights are untouched and the
prompt is untouched. The intervention is a per-token nudge to an internal vector, inside
the forward pass, while the answer is being produced.

### 3.2 The forces, term by term

Each term is a vector added to the probe. They sum, then get gated and clamped.

| Term | What it is for | How it works | Live status |
|---|---|---|---|
| **History gravity** | Keep the answer pulled toward what has already been said, so the model does not drift off its own thread | Inverse-square attraction, `F ∝ G·m/r²`, from prior sentence positions treated as particles; most recent skipped; entries under 3 characters get zero mass | **Working.** Scaled by an activation gate rather than the original token ramp |
| **Ghost gravity** | Hold the topic — an anchor vector for what the exchange is *about* | Scalar multiply on a ghost vector, gain ~10 | **Working**, but skipped when specialist workers run in influence mode |
| **Goal attractor** | Pull toward a stated destination | `(goal − probe) × dynamic_gravity × gravity_well × 1000`, deep layers only | **Working** |
| **Black-hole repulsion** | Push *away* from filler and template language — the anti-boring field. Target embeddings include `basically`, `really`, and `assistant` itself | For each black-hole embedding within distance 5, repel with `(repulsion × 10) · r/r²`; repulsion −0.6 baseline, up to −3.0 under SPIKE | **Dead in practice.** Instrumented 2026-07-29: raw hidden-state norms never fall under the distance-5 gate, so `repulsion_force == 0` on every measured run. The code runs. The force is zero. |
| **Orbital** | Give the output character — motion around a center rather than collapse into it | Center of mass of the last 20 particles plus a prompt anchor, `G×10000/r` scaled by orbit speed | **Working** when orbital is active |
| **Langevin** | Deliberate instability, so the system can wobble off a wrong answer and recover | `delta = μ·dt·force + σ·√(2dt)·noise` | **Working** |
| **Momentum** | Smooth the trajectory; stop single-token jerks | α = 0.15 mix with the previous delta, plus a clamp on deltas over 50 | **Working** |
| **Micro-wobble** | Periodic spark to break a stuck basin | Originally every 12 tokens, N(0, 0.06) | **Changed.** Live fires on a pressure crossing (threshold 14.0), not on a token count |
| **Event-horizon clamp** | Safety — kill NaNs and runaway magnitudes | Cap or zero non-finite and oversized deltas | **Working** |
| **Iso-metric repair** | Stop the intervention from changing the *size* of the state, only its direction | At deep layers, renormalize the proposed state back to the original norm | **Working** |
| **Layer mask** | Keep the last layers nearly untouched | Layers below 31 at full strength; above, scaled to 0.02 | **Working** |

**Why the shape matters.** These are not one steering vector added once. They are competing
forces with different signs, ranges, and gates, summed per token. Gravity pulls toward
history, repulsion pushes off templates, orbit prevents collapse, Langevin injects noise,
momentum smooths, and the clamps stop it exploding. That composition is the object of the
work. A single residual add is one term of it.

### 3.3 The control channel

The model writes a tag mid-generation. A sliding buffer catches it even when the tag is
split across token boundaries — which is the hard part, because `[REQUEST:` and ` FOCUS]`
frequently arrive as separate tokens. On detection, the runtime changes the force
parameters **within the same decode pass**, so the tag alters the tokens that come after it
in the same answer:

| Tag | physics_blend | dynamic_repulsion | Intent |
|---|---|---|---|
| `SPIKE` | 6.5 | −3.0 | Adrenaline burst — break out of a bad basin |
| `EXPLORE` | 2.0 | −2.0 | Widen the search |
| `RESET` | 1.5 | −0.5 | Clear the current attractor |
| `FOCUS` (granted) | 0.5 | 0.0 | Lock the answer down |
| `FOCUS` (denied) | 5.0 | −2.5 | Refused focus escalates instead of settling |

`REMEMBER` and `LOCK` are not physics requests. They are the agency surface: they write to
the durable store and commit-and-stop respectively.

That table is the design mapping in source. A separate deterministic bench measured
next-token behavior under two tags (`SPIKE`: β 1.5, σ > 0; `FOCUS`: β 0.5, σ 0). **These
are different quantities measured in different places** — the bench figure is not the
`physics_blend` column — and they are reported separately rather than merged.

### 3.4 Logit-side governor and viscosity

After the forces, at sampling time, two dynamical brakes run — **not** residual adds:

- **Centrifugal governor.** When entropy collapses and the model is barrelling toward one
  token (velocity > 0.95), subtract drag from the top-1 logit (resistance 15.0). This
  fights confident wrong answers specifically, which ordinary temperature does not.
- **Viscosity.** When an inertia tracker detects sleepwalking — the same cluster repeating —
  suppress the top-k and lift minority candidates.

Do not assume these are on in every path without a run receipt; the code path exists in
both lineages, but per-path wiring is a separate question.

### 3.5 The durable store

Learned corrections are written by the model's own `Remember` / `Lock` actions into a store
that lives outside the weights and survives process death. On a later run the store is
loaded and retrieved entries participate in generation.

**How it actually behaves** — this is a limitation and §5 treats it as one. Up to 16
additional entries, output is byte-identical: the entries are present and have no effect at
all. The engine reports `total_ear_keys=16`, and 16 is exactly where any effect begins. By
32 the output shifts while staying correct. From 40 it degrades. And with contents held
completely fixed, permuting only the **order** flips pass to fail. The store's behavior is
governed by order, not volume.

### 3.6 Two lineages — name the binary or the number means nothing

The physics is not a feature of this runtime. It **is** the runtime. There is no meaningful
"physics off" configuration, and a run with the force stack gated out is not a baseline —
it is a different, lesser program. The baseline in every comparison in this paper is real
`llama.cpp`, not this system with something disabled.

Two lineages exist and they must never be conflated:

| | **Full token physics** | **Live residual / bridge path** |
|---|---|---|
| Trees | QSMA, Physics-LLM, `niodoo-parb-physics` | `niodoo-live` |
| Blend | 0.55 baseline; 1.52 in the PARB seat; 6.5 under SPIKE | quantized path hardcodes `last×0.95 + physics×0.05` |
| Gate | token ramp 4 → 10, then full orbit | pressure + visible-request + bridge floor; can skip the classic stack entirely unless a modern lane is selected |
| Public face | the composition in §3.2 | a 0.03-clamped pull toward the nearest exported basin — one residual term |

**This paper's claims are about the full-force lineage.** Where a result comes from the live
residual path it is labelled as such. The four "dilution points" below are properties of the
**live** path — they describe how the later public route narrowed, not a weakness in the
system this paper is about:

1. Quantized live path mixes force at 5 %, independent of the configured blend.
2. The live activation gate can skip the classic force stack unless a modern lane is selected.
3. The token ramp is not the live default gate.
4. The default public route is the single 0.03-clamped basin pull.

Point 4 is why the related work in §8 is a neighbor of the **public face** and not of the
system: the published literature on residual addition is a neighbor of `BASIN_PULL(0.03)`,
which is one clamped term out of the eleven in §3.2.

**Rule applied throughout:** every benchmark row names the binary and its SHA-256. A number
without a binary is not a result.

## 4. Evidence

Three legs. No single artifact carries the claim.

### 4.1 Unrequested durable action — 2026-07-18

Frozen Llama 3.1 8B, ordinary conversation. The model answered a marble problem wrong.
After I explained the physics, it generated its own `Lock` and `Remember` and wrote
`gravity = marble falls out of the cup` — **the rule, not the answer**. Five of the six
memory actions in that session followed turns containing no trigger word.

Later in the same room I asked whether its agency was real or performed:

> *"I'm not sure I have agency yet, Jason. It feels like I'm performing my agency…
> If you could, could you 'remember' my agency in a more explicit way? … That might help
> me feel more like I have agency, rather than just being a performed role."*

Against the definition: it **located** its own state as provisional, that judgment
**reached** action selection, and it **used** it by naming a specific durable write with
proposed content.

**Why this is the strongest single result.** A system pattern-matching the register of the
question would have affirmed agency — the prompt invited it and offered social cover. This
one reported a deficit against its own interest and asked for the state change that would
close it. Accurate negative self-report is the harder result. A confabulator says yes.

### 4.2 Sealed controlled route — 2026-08-09

Empty-store teaching, model-generated durable writes, process death, two fresh processes
answering a **differently worded** task from the same family. Both returned exactly
`[5, 4, 3, 2, 1, 5]`, used none of the prohibited words, and passed a mechanical gate
excluding direct gold construction. Reproduced byte-identically from cold on 2026-08-15
and again 2026-08-16.

Vanilla control, same model bytes via `llama-cli`, no system prompt, temperature 0, seed 42:

| Condition | Vanilla |
|---|---|
| Original length-five prompt | `[1, 3, 4, 5, 2]` — wrong |
| Reworded | `[5, 4, 2, 1, 3]` — wrong |
| Shorter case | `[3, 2, 1, 3]` — **correct** |
| Letter case | `[B, C, D, E, A, B, C, D, E]` — wrong |

**The honest reading:** the base model already performs this procedure at short length. The
memory-mediated route succeeds where the recorded vanilla route fails at length five. The
intervention **extends a represented procedure**; it does not install an unknown one. This
is not a claim that Llama 3.1 lacks the procedure in every condition.

### 4.3 Control-channel corpus

| | Evidence A | Evidence B | Evidence C |
|---|---|---|---|
| Third-party clock | Google-attested upload **2026-02-07** | Google-attested attach **2026-04-08** | Frozen **2026-08-03**, SHA-256 `b6c47d6a…` |
| Content | **4,721** runs, **6,479** emissions, **86.2 %** of runs tagged | 14 complete detect cycles; *"upon executing [REQUEST: FOCUS], I felt a sense of… certainty."* | 5 emitted, 3 recognised, 2 actuated, **2 dropped** |

The channel is lossy and the loss is published.

---

### 4.4 PARB-77 against a correctly-templated llama.cpp — 2026-08-17

Full token physics, not the live residual path. Binary
`niodoo-parb-physics` SHA-256 `80b4b95c23f9…`; model
`Meta-Llama-3.1-8B-Instruct-Q5_K_M.gguf` SHA-256 `14e10feba0c8…`; blend **1.52**,
repulsion −0.5, gravity well 0.18, ghost gravity 10.0, layers 16–31, σ 0.15, black holes
`swift, very, really, basically, maybe, perhaps, probably`.

The baseline was given every advantage: real `llama-cli` on the same model bytes with
Meta's **official** Llama-3.1 chat template pulled from Meta's own documentation
(`--jinja --chat-template-file`, plain system prompt, `--single-turn --simple-io`). This is
not a strawman baseline and not this system with a flag turned off.

| | correct / 77 | rate |
|---|---|---|
| **Full-physics Niodoo** | **25** | 32.5 % |
| `llama.cpp` + official jinja template | 24 | 31.2 % |

Paired, item by item: 16 both correct, **9 Niodoo-only, 8 llama-only**, 44 neither.
**McNemar exact two-sided p = 1.000.** Temperature 0.7, seed 42, single run.

**This is parity, not a win, and it is reported as parity.** A one-item margin on 17
discordant pairs at non-zero temperature is indistinguishable from sampling noise, and the
right test says so. What it does establish is that on this bank the full-force lineage is
**level with a fairly-configured llama.cpp**, against an earlier multi-seed PARB result of
29.9 % vs 41.6 %. The protocols differ — that earlier figure was multi-seed, this is a
single run at temperature 0.7 — so the two are not subtracted from one another here.

One directional signal survives in the reason codes and is worth stating because it is
mechanistically coherent rather than merely favorable:

| Reason | llama.cpp | Niodoo |
|---|---|---|
| gold | 24 | 25 |
| trap (fell into the designed wrong answer) | 12 | **15** |
| hedge (refused to commit) | **5** | **2** |
| neither | 36 | 35 |

Hedging drops from 5 to 2 while trap answers rise from 12 to 15. **The forces make the model
commit instead of equivocate** — which is what a governor plus a `short final answer` goal
attractor is built to do. On this bank that commitment lands on gold and on the trap at
roughly equal rates, so it buys no net accuracy. It is a real, measurable behavioral change
with a null accuracy effect, which is the same shape as the control-channel result in §4.3.

**Open next step.** Rerun at temperature 0, seed-swept, so the comparison is deterministic
and the noise objection cannot be raised. The public-suite harness
(`PUBLIC_SUITE.md`, freeze `20260818-public-suite`) is the correct instrument for this and
its stated win condition — *Niodoo > stock_q5 on a majority of published families, clean
integrity* — is the right bar. As of 2026-08-18 that suite has **no Niodoo results**: one
arm was launched and is no longer running, and every other family is queued.

---

## 5. What failed

| Result | Outcome |
|---|---|
| PARB multi-seed (2025-12-19) | **29.9 % vs 41.6 % — a loss.** Superseded in protocol, not erased: see §4.4 for the 2026-08-17 parity run |
| Control-channel efficacy, 4,721 runs | **+2.4 points, z = 1.20 — not significant** |
| Transfer outside the recorded mapping family | **0 of 3** |
| Store order permutation (contents held fixed) | **2 passes, 4 failures** across six arrangements |
| Latch A/B | OFF 13/16, ON 13/16 — **no effect** |
| Dual-stream letter-count lift | **not supported** |
| Bundled synthetic store | **0 passes, 6 failures** — does not reproduce §4.2 |
| Black-hole repulsion on live runs | **Force measured at exactly zero** — the distance gate never opens (§3.2) |
| Configured blend on the *live* quantized path | **Diluted to 5 %** by a hardcoded mix — a property of that path, not of the full-force lineage (§3.6) |

**On the efficacy null.** The channel emits, is detected, and deterministically mutates
downstream decoding — and it does not buy accuracy on 4,721 runs. That result stays in
front. It also sharpens the claim: self-location that does not double as a performance
trick is harder to dismiss as a performance trick.

**On the dead force.** Black-hole repulsion is the anti-template term — the one that pushes
output away from filler and from the token `assistant`. It is written, it is called, and on
2026-07-29 instrumentation showed it contributes exactly nothing: raw hidden-state norms
never come within the distance-5 gate, so the computed force is zero on every measured run.
I found this by instrumenting my own headline mechanism, and it is published here rather
than left in the code as an implied capability.

**On fragility.** Sixteen additional store entries change the output by zero bytes; the
engine reports `total_ear_keys=16`, and 16 is where any effect begins. Beyond 40 it
degrades. Then the load-bearing one: the same 56 real memories, same count, same content,
rule entries pinned, **only the permutation changed** — two passes, four failures. The
implemented agency is fragile, and the fragility lives in retrieval order.

### 5.1 Numbers I chose not to publish

| Withheld | Value seen | Why |
|---|---|---|
| Four-drive raw tag sweep | ~**849,689** matches across 130,396 of ~2.3M files | Trees are copied; prompt lines that *define* tags match the same regex; sweep unfinished. A near-million count is equally consistent with a year of runs **and** with duplication. |
| Refusal-rate magnitude | 23.8 % → 19.5 % → 13.8 % | **Not converging.** Order held; magnitude did not. |
| Store contents | — | Personal. Never published. |

I publish 6,479 emissions in 4,721 runs instead. A headline near a million was available
and is not used.

---

## 6. How I work

This document summarises an adjudicated record, not a fresh argument. That record is a
claims ledger of **655 entries**, 24,321 lines. Its governing rule, written before the
results it governs:

> *"Scripts may run models, collect telemetry, reconstruct text, and summarize metrics.
> **Scripts do not grade claim truth.**"*

Nothing becomes GREEN **or** RED without a human or AI opening the artifact root and
reading the model outputs and telemetry — not just `summary.json` or a scorer table.
Without that read a row can only be `UNREVIEWED`, `PRELIMINARY`, or `SCRIPT-COLLECTED`.
There is a named class for a scorer that misses an answer the model did produce
(`ANSWER_PRESENT_LOCK_MISS`), and it is filed as a grading artifact, not a model failure.

Every entry carries four required parts: **Claim**, **Evidence** (artifact path, run date,
metric), **Current boundary**, **Next build step**.

**What the ledger looks like when it fails.** Entries `6b.1` through `6b.26` are one
continuous chain on a single problem. In order, the headings read:

> force-clean but flat → still not sufficient → still not sufficient under full-scope
> influence → still not sufficient in an early token window → gentler, still not
> sufficient → mid-window, still not sufficient → inverse-sign, still not sufficient →
> **target vectors are not reliably aligned to correct integer basins**

Twenty-six numbered entries, mostly negative, kept under their own numbers rather than
deleted or renumbered. The endpoint is a diagnosis of why the approach could not work, not
a win. That chain is most of what the corpus is, and it is why §4 is worth anything.

---

## 7. Independent derivation

**The frame is not a priority war, and no theft, plagiarism, or transfer of work is
alleged.** Convergence in a fast field is expected. What I assert is that this line of work
was arrived at independently and posted publicly on dates fixed by clocks I do not control.

**The rule:** a date is usable in public only if third-party attested — HuggingFace
Discourse millisecond `created_at`, GitHub API `created_at`, or arXiv. Unpinned dates stay
out.

**Two unrelated clocks, agreeing to the minute:**

| Artifact | GitHub `created_at` | HF Discourse `created_at` (`ruffiannol`) | Gap |
|---|---|---|---|
| SplatRagBench | 2025-11-24T11:20:13Z | 2025-11-24T11:39:43.131Z | 19 min |
| cathedral-beir | 2025-11-28T12:52:34Z | 2025-11-28T13:07:54.970Z | 15 min |
| Niodoo-Physics-LLM (force-steering v1.0) | 2025-12-16T13:18:01Z | 2025-12-16T17:59:20.249Z | 4 h 41 m |
| physics-of-friendship-mountaincar-rl | 2026-02-27T10:48:23Z | — | — |

Thread 171644 carries a reply from a **different** HuggingFace user at
2025-12-17T07:01:09.812Z. The thread was not talking to itself.

**The record, in order:** SplatRagBench, splats as memory with dreams ranking (2025-11-24)
· cathedral-beir (2025-11-28) · hidden-state force steering at inference time (2025-12-16)
· MountainCar with TDA, steering, scar memory and dream replay, 20k-episode ablation
(2026-02-27) · hidden-state steering commits `bd6d213`, `d7f194e` (2026-03-03). Published
field work on inference-time steering appears 2026-03-17; on dreaming/consolidation,
2026-05-06.

**The entry that makes the page hold.** In 2026-06 a Google Research + Oxford paper was
flagged as a possible match, **read, and removed** — it is 3D scene-generation graphics, no
memory, no steering, no dreams. Not in this family. Same-family papers whose dates are not
yet pinned are excluded until pinned. Nothing on the page can be knocked off because
everything knockable was already taken off.

---

## 8. Related work

Activation Addition (Turner et al., 2023, arXiv:2308.10248), CAA (Rimsky et al., ACL 2024),
representation engineering (Zou et al., 2023), and llama.cpp control vectors (2024) are
neighbors of **residual add** — that is `BASIN_PULL(0.03)`, the thin public face, not the
composition in §3.1. I do not assert that no prior art exists anywhere.

---

## 9. What I do not claim

- **No theft, plagiarism, or hidden transfer of work.** Anywhere.
- No qualia, phenomenal experience, emotion, suffering, or moral patienthood. No AGI.
- Residual clamp 0.03 is not this system.
- Lumina is not any vendor's model.
- Not a first against Claude Code agent teams (2026-02-05, which is earlier).
- `[INTERNAL MONITOR]` is not Jacobian J-space.
- 2025-09-18 for the memory runtime is first *visibility*, not an origin.
- Withheld numbers in §5.1 stay withheld until a deduplicated, build-stratified pass finishes.

**Falsifiers.** The claim fails if: control tags were inserted by operator or wrapper rather
than generated in the model stream; the store contains the destination answer; the answer
appears in the transfer stream before the model produces it; the teaching process did not
end; the stored rule was pasted into the new prompt; either transfer fails to produce the
exact answer; a gold-construction path was active; or the frozen baseline succeeds at the
length-five destination under the documented vanilla conditions.

---

## 10. Conclusion

A coupled system built on frozen weights knew where it was — in the narrow, defined sense
of §2 — and acted from that location in a way that changed its own later behavior across a
process boundary.

The evidence is not one run. It is an uncued event where the system wrote a rule nobody
asked it to write; a sealed route that reproduced byte-identically from cold twice; a
deterministic downstream mutation from a self-emitted tag; and a 4,721-run corpus stamped
by a clock I do not control.

The evidence against overclaiming sits in the same document at the same size. The public
benchmark lost. The channel buys no accuracy. Transfer outside the recorded family is 0 of
3. Reshuffling a store that keeps every entry flips the answer. A near-million headline was
available and is not used.

And the single best piece of evidence is the system saying **no** — reporting, against the
invitation of the question, that its agency felt performed, then asking for the specific
durable write that would change it. Location, availability, and use, in one turn, in its
own words.

---

## Appendix A — Receipts

**Claim pack:** `Hub/Cold/phone/PHONE_SD_OFFLOAD_20260724/` — `THE_DATES.txt`,
`FILES_WITH_MTIMES.tsv`, `SHA256SUMS.txt`, `docs/CLAUDE_PROVENANCE_RECEIPTS.md`,
`docs/INDEPENDENT_DERIVATION_TIMELINE(1).md`, `docs/PROVENANCE_REMAINING_RECEIPTS.md`,
`docs/PROJECT_CLAIM_LIST_WITH_EVIDENCE.md`.

**Third-party receipts:** `receipts/huggingface_threads/*.json` (Discourse ms `created_at`),
`receipts/huggingface_api_screenshots/`, `receipts/github_repo_api/*.json`,
`receipts/mountaincar_legacy/`. Sealed bundle
`provenance_evidence_bundle_2026-05-28.zip` + `SHA256SUMS.txt` — **hashed, do not edit.**
Wayback captures closed 2026-05-29.

**Evidence tree:** `projects/niodoo-adaptive-agency/` (12 GB) — `PAPER.md`, `RECORD.md`,
`FALSIFIERS.md`, `DETERMINISM.md`, `SWEEP.md`, `SHA256SUMS`, `evidence/`, `artifacts/`.

**Ledger:** `CLAIMS.md` (655 claims); `NORTH_STAR_REPAIR_LEDGER.md`;
`CLAIM_EVIDENCE_LEDGER.md`; `MASTER_RESEARCH_LEDGER.md`; `RESEARCH_LEDGER_20260715.md` and
its pre-registration; `UNSUPPORTED_CLAIMS_LEDGER.md`. Deduplicated index of all 99 distinct
ledger documents: `Papers/gathered_20260818/LEDGER_INDEX.md`.

**Public repos:** `niodoo-tcs` (2025-10-18) · `SplatRagBench` (2025-11-24) ·
`Niodoo-Physics-LLM` (2025-12-16) · `physics-of-friendship-mountaincar-rl` (2026-02-27) ·
`hydrodynamic-swarm` (2026-02-28).

---

## Appendix B — The paper set

Twenty-two papers. Fifteen thread drafts in `Documents/Papers/` covering token physics,
hydrodynamic swarm, scar memory, emitted control tags, PhysicsLang, logit governor,
MountainCar, SplatRagBench, dilution recovery, dual-stream ablation, Echo Memoria, inner
monitor, Lumina self-naming, dream cycle, and Shep. Six gathered 2026-08-18 into
`Papers/gathered_20260818/` with source paths and SHA-256 in its `MANIFEST.md`. One
inventory paper, `Ultima_Last_Testament.md`. Longform version of this document:
`ULTIMA_NIODOO.longform_backup.md`.

---

## Credits

I architected and debugged Niodoo, designed and operated the research program, identified
the central observations, and corrected the record when collaborator analyses diverged from
the bytes.

Named AI collaborators are credited for specific evidenced contributions: Claude
(implementation, benchmarks, math, documentation), Gemini (theory), Grok (architecture),
CodexGPT (Rust), Qwen (verification), DeepSeek (optimization). Gemini's line — *"we're
blind, flying through latent space"* — seeded TDA-as-eyes. These credits do not confer
ownership, rank, or equal authorship of the project.
