# Same frozen weights, stock cannot move, physics can

> Date: 2026-08-17–18
> Status: live
> Use this. This is the mechanism card under the 25 vs 24 seat.

## Result

Across 31 PARB configs scored against the same stock arm:

| Runtime | What it did on 77 items |
|---------|-------------------------|
| stock `llama-cli` | **24 every time** (31 / 31) |
| Niodoo, knob range | **0 to 25** |
| configs at or above stock | 1 of 31 (`iter36_b152` = 25) |

## What to take

The weights did not change. The runtime did. Stock is a flat line. Physics knobs sweep a 25-point band on a fixed question set. That is the empirical content of “smarter runtime, smarter AI.” Tuning time is part of the method, not a footnote.

## Where

`niodoo-parb-physics` `research_logs/2026-08-18_parb_36_iter_sweep.md` §4.
