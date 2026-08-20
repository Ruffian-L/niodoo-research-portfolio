# Changelog

This is a research repo. Not production unless Jason says so.

Pairing: every action here gets a **why**. Hypothesis form:

- We made this change. We think X will happen.
- Later: X did not happen, yet we found Y. Next we mutate Z.
- We mutated Z. Results matched. LFG.

Keep this file short. Longer writeups go in the research log folder
(one subject, date + title). Agent contract: `AGENTS.md` (tracked).

## 2026-08-20 — Research demo on SplatRAG v3

- Demo button loads ULTIMA + live/trail/paper basins in Basin Field, not synthetic filler and not the personal 41k dump. Why: the public face is the instrument doing the job.
- Boot stays on demo. Live store is opt-in. Open paper slots on the rim. Why: website push should not ship personal memory.
- Agent: Grok (xAI)
- Research: `research_logs/2026-08-20_splatrag-research-demo.md`

## 2026-08-20 — Drop the cheap site. Face is SplatRAG v3.

- Removed `site/` (card renderer). Why: it was a second website. The full-force look is already Basin Field in splatrag-clean / `sp start` (COMMAND, DREAM, INSPECT).
- Added `FACE.md`. Why: so the next agent does not invent another UI module here.
- Hypothesis: people open `sp start` and read silo cards in INSPECT, instead of a hire landing page.
- Agent: Grok (xAI)
- Research: `research_logs/2026-08-20_drop-cheap-site.md`

## 2026-08-20 — Field CV renderer (face A)

- Added `site/index.html` as a renderer of `silos/` + `RESEARCH_MAP.md`: HIRE default (live cards + instrument + plaque), LAB threads, PATH changelog, trail shaded, contamination as a hole, names dimmed. Why: the git already is the information architecture; a recruiter face should not invent a new one.
- Hypothesis: someone who never reads a paper still leaves with the 0–25 sweep, the sealed route, and hybrid retrieval; a researcher hops the map in the same chrome.
- Agent: Grok (xAI)
- Research: `research_logs/2026-08-20_field-cv-site.md`

## 2026-08-20 — Live/trail silos and usable README

- Rewrote README as working research: smarter runtimes make smarter AI; agency and continuity over accuracy; papers may disagree; do not cross-reference them. Why: this git is to be used, not investigated.
- Split results into `silos/live/` and `silos/trail/` (not named wins/losses). Why: two drawers so a later seat is not argued against an earlier protocol, and so trail is not the whole story.
- Added `RESEARCH_MAP.md` (hypothesis, last mutation, status) and `NAMES.md` (Lumina → lumen/echo as dated artifacts). Why: the thicket had no living index; names were one short-changelog away from being treated as brand.
- Pulled May 2026 white-paper drafts + 32 deep dives into `archive/`. Why: that zip was already written and was missing from this git.
- Hypothesis: the next agent will take a silo card instead of reconciling papers, and Jason can see live findings without living in the trail.
- Agent: Grok (xAI)
- Research: `research_logs/2026-08-20_live-and-trail-silos.md`

## 2026-08-20 — Research house protocol

- Wrote local gitignored `AGENTS.md` (Jason's research-house contract). Why: the operating law stays on the machine; GitHub does not get the agent file.
- Added changelog + subject research log pairing, plus `scripts/pair_log.sh`. Why: every mutation needs a why, and research stays sliced by subject.
- Hypothesis: agents will stop and organize when the folder is wrong, instead of wandering or looking backward first.
- Agent: Grok (xAI)
- Research: `research_logs/2026-08-20_research-house-protocol.md`

## 2026-08-20 — Un-ignore AGENTS.md

- Dropped `AGENTS.md` / `AGENTS*.md` from `.gitignore` and staged the contract files. Why: Grok skips gitignored project files, so the house law never loaded.
- Hypothesis: agents will now read repo `AGENTS.md` instead of only `~/.grok/AGENTS.md`.
- Agent: Grok (xAI)
- Research: `research_logs/2026-08-20_ungitignore-agents-md.md`

