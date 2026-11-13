# Rhythm People World Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Repair the GitHub Pages entry and add the first playable people-world loop: character choice, remembered relationships, direct conversations, and a pickaxe hotbar.

**Architecture:** Keep the existing Three.js streaming engine. Add pure state modules for relationships and inventory actions, then connect them to the existing save, dialogue, interaction, and HUD layers.

**Tech Stack:** Vanilla JavaScript, Three.js modules, HTML/CSS, Node assertion scripts.

**Spec:** `docs/superpowers/specs/2026-11-13-rhythm-people-world.md`

## Global Constraints

- Preserve existing concert, home, day/night, and save behavior.
- GitHub Pages paths must work under `/mr-computer-game/` without server rewrites.
- Dialogue replies remain child-safe and never echo slurs or threats.

## Review Focus

- Old saves without relationship fields migrate without losing progress.
- Negative input changes relationship tone without repeating harmful text.
- Direct NPC clicks work while the bottom interaction button is absent.
- The pickaxe action only digs valid cave/tunnel targets.
- Touch and desktop layouts both keep the hotbar reachable.

---

### Task 1: GitHub Pages entry

**Files:** `home-data.js`, `index.html`, `scripts/verify-github-pages-game-links.cjs`

- [ ] Add a failing assertion for the real relative rhythm-world URL.
- [ ] Return `./rhythm-world.html` for the world card and bump the cache key.
- [ ] Run the verification and commit the entry repair.

### Task 2: Relationship memory

**Files:** `rhythm-world/social-memory.js`, `rhythm-world/save-migration.js`, `rhythm-world.js`, `scripts/verify-rhythm-people-world.js`

- [ ] Test relationship defaults, friendly/unkind replies, and reciprocal help refusal.
- [ ] Implement the pure relationship transitions and migrate old saves.
- [ ] Connect typed replies and NPC dialogue to relationship state.

### Task 3: Direct talk and hotbar

**Files:** `rhythm-world.html`, `rhythm-world.css`, `rhythm-world.js`, `rhythm-world/interaction-3d.js`

- [ ] Test that the old interaction button is absent and the nine-slot hotbar exists.
- [ ] Render a pickaxe in the selected slot and expose tunnel digging near caves.
- [ ] Preserve direct 3D click interaction and the overhead talk prompt.

### Task 4: Village and city identity

**Files:** `rhythm-world/town-3d.js`, `rhythm-world/world-stream.js`, `scripts/verify-rhythm-people-world.js`

- [ ] Test deterministic district classification for original village, themed villages, and city.
- [ ] Add skyline buildings and village markers to streamed chunks.
- [ ] Run all rhythm-world verification scripts and browser-check the full entry flow.
