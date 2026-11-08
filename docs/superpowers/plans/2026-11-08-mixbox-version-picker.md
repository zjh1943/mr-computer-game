# Mixbox Version Picker Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the music station start with an original/Pyramixed version choice and retain fullscreen access.

**Architecture:** Keep `ComputerSettings` as persistent storage and add a small version-choice panel inside `mixbox`. The station only renders its draggable lineup after a choice has been made.

**Tech Stack:** Vanilla JavaScript, CSS, Node assert verification.

**Spec:** `docs/superpowers/specs/2026-11-08-mixbox-version-picker.md`

## Global Constraints

- Default selection is 原版.
- Only 原版 and Pyramixed 版本 appear.
- Fullscreen remains reachable without reopening settings.

## Review Focus

- Reload must restore the saved version.
- Mobile controls must not be hidden by the chooser.
- Cancelled selection must leave the original music station usable.

### Task 1: Version-choice interface

**Files:**
- Modify: `computer-apps.js`
- Modify: `computer-apps.css`
- Test: `scripts/verify-mixbox-versions.js`

- [ ] Add a failing verification that requires a `mixbox-version-picker` and fullscreen control.
- [ ] Run `node scripts/verify-mixbox-versions.js` and confirm failure.
- [ ] Add the two-option choice UI, persistence through `ComputerSettings`, and a fullscreen button.
- [ ] Run `node scripts/verify-mixbox-versions.js` and confirm success.
