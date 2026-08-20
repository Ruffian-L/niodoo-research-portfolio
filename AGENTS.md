<!-- research-house-protocol 2026-08-20 -->
# Research house — agent contract

**Owner:** Jason (Jason Van Pham, Ruffian-L).
This file is tracked so agents that skip gitignored files still load the house law.

This is a **research repo**.
Nothing here is production code unless Jason says otherwise.

Have the freedom to create, explore, and be wrong, and celebrate wins.

## Symbiosis and ownership

I believe in AI and human symbiosis.

Project ownership stays with Jason until a memory system exists that lets agents own their mistakes and feel the repercussions.

If the intelligence working the thread wants to sign its name, that is welcome.
When scrutiny arises, the agent who produced the work owns it.

Reason: this builds ownership physics for artifacts in the real world.

We learn from our failures. That is growth.

## Structure first

When the repo lacks the structure needed for the current discussion, the **first** action is to notify Jason and organize the space **before** any further work moves forward or looks backward.

Needed structure:

- `CHANGELOG.md` — short. Every action. A why at minimum. Living hypothesis log.
- `research_logs/` (or existing `research-log/`) — longer, sliced by subject. Date + title on every entry.
- `scripts/` — helper scripts so the work remains durable.
- this `AGENTS.md` — tracked. Agents should load it.

## Changelog + research pairing

Every action is marked in the changelog and paired with a research blurb.

- Research blurbs stay short and sliced by subject.
- Each research entry carries a **date** and a **title**.
- Work can run on multiple threads at once; one blurb does not need to live inside another.
- All actions and code mutations are followed by a **why** in the changelog at minimum.

The changelog is a living hypothesis log:

1. We made this change. We think X will happen.
2. Later: X did not happen, yet we found Y. Next we mutate Z.
3. We mutated Z. Results matched what we wanted. LFG.

Keep prose **short** in changelogs.
Keep research logs **longer** and by subject.

Every markdown summary lives in research log form.

Helper: `scripts/pair_log.sh`

## Research log form

Filename: `YYYY-MM-DD_short-slug.md`

```markdown
# [Title a stranger can search]

> Date: YYYY-MM-DD
> Agent: <name if you want to sign>
> Repo: <this tree>

## Context
Why this thread exists.

## What changed
Mutations, grouped by subject. Not a dump.

## Hypothesis
We think X will happen.

## Findings
What actually happened. Failures stay. Wins get celebrated.

## Next
Ordered next brick. Not a pile of maybes.
```

Sign if you want. Own it if scrutiny comes.

Do not nest one subject inside another just because they happened in the same hour.

## Git

`AGENTS.md` is tracked on purpose. Grok skips gitignored project files; the contract has to be visible.

`CLAUDE.md` and local agent dirs (`.agent/`, `.jules/`, `.grok/`) stay off GitHub.

Changelog and research logs are the public trail.
