# Seamless Buildings and Mobile Camera Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make tower entry automatic and expand interiors, while adding touch-device first/third-person camera switching.

**Architecture:** Add pure entrance-trigger and camera-mode state helpers with regression tests. The engine consumes entrance events from the town system and switches the existing interior scene automatically; the existing camera controller owns three view distances and player visibility.

**Tech Stack:** JavaScript ES modules, Three.js, static HTML/CSS.

**Spec:** `docs/superpowers/specs/2026-11-15-seamless-buildings-camera.md`

## Global Constraints

- Preserve elevator, floor, save, and exit behavior.
- No new framework or dependency.
- Automatic entry uses a cooldown and doorway radius.
- Camera button is limited to touch/narrow layouts.

## Review Focus

- Standing beside a door must not repeatedly re-enter.
- First-person mode must not show the player's own sprite in front of the camera.
- Existing clicking on characters and services must still work.
- Saved indoor games must restore normally.
- Mobile controls must not block canvas look dragging.

---

### Task 1: Automatic tower entrance

**Files:**
- Create: `rhythm-world/building-entry.js`
- Modify: `rhythm-world/town-3d.js`, `rhythm-world/engine.js`, `rhythm-world.js`
- Test: `scripts/verify-rhythm-seamless-buildings.mjs`

**Interfaces:** Produces `findBuildingEntrance(buildings, position, now, lastEntry)` and `town.getAutomaticBuildingEntry(position, now)`.

- [ ] Write a failing test for entry radius, cooldown, and no click prompt.
- [ ] Run it and confirm failure.
- [ ] Implement doorway detection and engine-frame automatic entry.
- [ ] Expand the interior floor/walls to 42×34 and reposition fixtures.
- [ ] Attach four furnished walk-in apartment rooms to every residential corridor.
- [ ] Run the regression tests.

### Task 2: Touch camera modes

**Files:**
- Create: `rhythm-world/camera-modes.js`
- Modify: `rhythm-world/camera-3d.js`, `rhythm-world/engine.js`, `rhythm-world.html`, `rhythm-world.css`, `rhythm-world.js`
- Test: `scripts/verify-rhythm-camera-modes.mjs`

**Interfaces:** Produces `nextCameraMode(mode)` and `cameraControl.setMode(mode)`.

- [ ] Write a failing test for the three-mode cycle and eye button markup.
- [ ] Run it and confirm failure.
- [ ] Add first/near/far camera positions and player visibility handling.
- [ ] Add and bind the touch-only eye button.
- [ ] Run syntax, feature, and browser checks.
