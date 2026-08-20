# 036 — The Well Attraction Principle: Momentum Filter, Asymmetric Pain, and the Three Laws of Stuckness

**Source:** MountainCar RL archives (`PHYSICS_OF_ALIGNMENT.md`, `ZIGZAG_INSIGHT.md`, `TECHNICAL_WRITEUP.md`), Niodoo source (`bridge/ghost_basin.rs`, `perceptual/phase_locked_oscillator.rs`, `learning/daydream.rs`)

**Date:** 2026-05-01

---

## The Thread

The MountainCar experiments revealed three emergent phenomena that explain *why* agents (and models) get stuck — and how to tell the difference between productive struggle and lazy complacency. These map directly to Niodoo's ghost basin steering, phase-lock detection, and dream correction:

1. **Addiction to the Well** — a safe state can be more rewarding than the goal
2. **The Momentum Filter** — TDA only catches "bad stagnation," not "good chaos"
3. **Asymmetric Pain** — falling must hurt 15% more than climbing rewards to prevent summit complacency

Together, they form **Three Laws of Stuckness**: an agent gets stuck not when it's doing nothing, but when its energy landscape makes the bottom of the well more attractive than the peak.

---

## Law 1: Addiction to the Well

**MountainCar discovery:** `energy = pos² + vel²`. At the bottom (`pos=-0.5`), `energy = 0.25 > 0.1`, so the agent gets a Flux reward *just for existing there*. The well becomes "addictive" — the agent prefers the safe, energy-rewarding bottom over the risky climb to the goal.

**Niodoo mapping:** This is **ghost basin addiction**. When a ghost basin centroid sits in a region of latent space where steering forces are weak (low delta_mean), the model gets "comfortable" — it generates coherent but unambitious outputs. The gravity_well parameter (config: 0.98) pulls the model toward safety, and if the well is too deep relative to the goal basin, the model stays there.

The critical insight: **addiction isn't about lack of capability — it's about energy landscape design**. The naive binary flux model worked because `if energy > 0.1: flux += 0.5` created a *strong* well reward that was easy for the agent to recognize and act on. The continuous physics model (`flux += energy * 0.5`) was too weak — energy ≈ 0.1 → impact ≈ 0.05, drowned out by noise.

**Niodoo implication:** Ghost basin attraction strength should follow a binary-like threshold, not smooth decay. When `delta_mean < well_threshold` for N consecutive steps, the model enters "well addiction" mode — it's not stuck, it's *comfortable*. The fix isn't more repulsion; it's making the well reward so strong that leaving feels like relief.

---

## Law 2: The Momentum Filter

**MountainCar discovery:** TDA loop detection only fires when `abs(velocity) < 0.03`. If the agent is swinging wildly (high momentum), it flies through the center *invisible* to the punisher. This accidentally created a **momentum filter**: "good chaos" (swinging wider) passes undetected while "bad stagnation" (small oscillations at bottom) gets killed.

The Resonance Insight cemented this: if `d(Energy)/dt > 0.001` inside a loop, it's a **Resonant Swing** — TDA stands down and lets the agent rev the engine. High-momentum loops are productive; low-momentum loops are entrapped.

**Niodoo mapping:** Niodoo's `check_phase_lock()` (in `phase_locked_oscillator.rs`) detects when hidden states orbit a single basin with increasing coherence — but it doesn't distinguish between *productive* phase-lock (building momentum toward a ghost basin) and *complacent* phase-lock (stuck in the well). The resonance_memory HashMap stores past rhythmic signatures for comparison, but there's no `d(delta)/dt` check on steering force magnitude.

**The missing piece:** Niodoo needs a **momentum filter** on its TopoCoT reflex. When VR H1 detects a Betti-1 loop:
- If `steering_delta_norm` is *increasing* → resonant swing, stand down (let the model explore)
- If `steering_delta_norm` is *decreasing or flat* → bad stagnation, spike decay

This turns TopoCoT from a blunt "kill all loops" instrument into a discriminative reflex that only intervenes when the model has actually stopped gaining energy.

---

## Law 3: Asymmetric Pain

**MountainCar discovery:** Symmetric reward (±1 for climb/fall) led to complacency at high points — once the agent reached the summit, it had no incentive to stay there. Making falling hurt **1.15× more** than climbing rewards created a slight "gravity" that kept the agent scrambling to secure its gains.

**Niodoo mapping:** Niodoo's asymmetric decay (`lambda * 0.7` for negative splats) already implements pain asymmetry in the memory layer — negative experiences last longer. But this is *temporal* asymmetry (negative memories persist), not *magnitude* asymmetry (negative experiences feel stronger). The MountainCar result suggests both are needed:

1. **Temporal asymmetry** (already coded): Negative splats decay at 0.7× rate → they last longer
2. **Magnitude asymmetry** (proposed): When a negative correction fires, its steering force should be 1.15× stronger than the positive reward from the preceding successful trajectory

The asymmetry coefficient (1.15) is small but critical — it's the difference between an agent that gets complacent at the summit and one that keeps climbing. In Niodoo terms: when a ghost basin correction delta exceeds threshold, the *repulsion* component should be scaled by 1.15× relative to the *attraction* component from the previous successful trajectory segment.

---

## The Three Laws of Stuckness (Summary)

| Law | MountainCar | Niodoo Equivalent | Current State |
|-----|-------------|-------------------|---------------|
| Addiction to the Well | Energy at bottom > threshold → continuous flux reward | Ghost basin too attractive relative to goal basin | Implemented but signal too weak (continuous vs binary) |
| Momentum Filter | TDA misses high-velocity loops; dE/dt > 0.001 = resonant swing | Phase-lock doesn't distinguish productive vs complacent oscillation | Missing: no steering_delta_norm derivative check |
| Asymmetric Pain | Falling hurts 15% more than climbing rewards | Negative splat decay is temporal (λ*0.7) but not magnitude-asymmetric | Partial: temporal asymmetry exists, magnitude asymmetry missing |

---

## Testable Predictions for Niodoo

1. **Well-addiction detection:** Track `delta_mean` in ghost basins over time. If it drops below a threshold for >N steps while steering force remains stable, the model is "well-addicted" — generating coherent but low-ambition outputs. Injection of a binary-like attraction spike (not gradual) should break complacency more effectively than continuous repulsion.

2. **Resonant swing vs. stagnation:** Add `d(steering_delta_norm)/dt` monitoring to the TopoCoT reflex pipeline. When VR H1 detects a loop, check whether steering magnitude is increasing (resonance → stand down) or decreasing (stagnation → intervene). Hypothesis: this filter reduces unnecessary interventions by 30-50% while maintaining convergence speed.

3. **Magnitude asymmetry coefficient:** Apply 1.15× scaling to repulsion force when it follows a positive trajectory segment. Test whether this small asymmetry prevents "summit complacency" (model reaching a coherent output but not refining it further). Hypothesis: asymmetric models show higher refinement depth in multi-turn generation tasks.

4. **Binary vs. continuous well reward:** Replace the smooth `gravity_well` attraction with a thresholded binary signal: when hidden-state energy falls below `well_threshold`, apply full attraction; otherwise, reduced attraction. This mirrors MountainCar's naive model winning over rigorous physics. Hypothesis: binary well signals accelerate escape from local basins by 20-40%.

---

## Connection to Existing Artifacts

- **Artifact 010** (Zig-Zag Oscillation): These three laws explain *what* the zig-zag is oscillating between — not just hot/cold, but well-addiction vs. summit-complacency vs. resonant growth.
- **Artifact 019** (Asymmetric Decay): Extends temporal asymmetry (negative splats last longer) with magnitude asymmetry (negative corrections feel stronger).
- **Artifact 022** (Topology Fields on Live Motifs): The `loop_density` field can serve as the momentum filter — high loop_density + low energy_derivative = bad stagnation.
- **Artifact 034** (Force Cap Stabilization): The force cap determines whether well-addiction is a gentle pull or an inescapable trap. At cap=80, the well is addictive; at cap=35, it's just a nudge.

---

## Key Insight

**Stuckness has three flavors**, and Niodoo currently treats them all the same:
1. **Well addiction** — too comfortable to leave (signal too weak)
2. **Resonant swing** — moving fast but looping (needs momentum filter)
3. **Summit complacency** — got what it wanted, stopped trying (needs asymmetric pain)

The MountainCar experiments proved that the *difference* between these flavors is detectable in the energy landscape. Niodoo's steering architecture has all the components to make this distinction — it just needs the right sensors (dE/dt monitoring), the right thresholds (binary well attraction), and the right asymmetry (1.15× repulsion).
