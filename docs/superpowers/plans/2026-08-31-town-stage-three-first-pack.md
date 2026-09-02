# Town Stage Three First Pack Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first playable slice of Sprunki Town stage three: character homes, quiet thoughts, daily shopping, avatar navigation, and desktop zoom access.

**Architecture:** Extend the existing `computerTown3D` Three.js scene instead of adding a second town engine. Keep UI overlays as DOM inside the existing town app window, and keep behavioral checks as source-level Node verification scripts matching the repository's current test style.

**Tech Stack:** Plain HTML, CSS, JavaScript, Three.js loaded by the existing runtime, Node verification scripts.

**Spec:** User-approved in-chat design on 2026-08-31.

## Global Constraints

- Keep this as the town stage three first pack only.
- Keep the existing Minecraft work intact.
- Do not add loud continuous speech; use short occasional thought bubbles.
- Reuse the existing Three.js town and existing app window.
- Build and preview locally after verification.

---

### Task 1: Verification Script

**Files:**
- Create: `scripts/verify-town-stage-three.js`
- Modify: none
- Test: `scripts/verify-town-stage-three.js`

**Interfaces:**
- Consumes: `index.html`, `app.js`, `styles.css`
- Produces: a Node script that fails until stage three markers exist.

- [ ] **Step 1: Write the failing test**

```js
const fs = require("fs");
const path = require("path");
const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");
function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}
assert(html.includes("computer-town-avatar-bar"), "town avatar bar exists");
assert(html.includes("computer-town-market-panel"), "town market panel exists");
assert(app.includes("townStageThreeBusinesses"), "stage three business data exists");
assert(app.includes("makeTownStageThreeHouse"), "character homes use stage three house builder");
assert(app.includes("makeTownHouseFeature"), "houses get character feature signs");
assert(app.includes("focusTownResident"), "avatar clicks focus residents");
assert(app.includes("renderTownAvatarBar"), "avatar bar renderer exists");
assert(app.includes("showComputerTownThought"), "quiet thought bubbles exist");
assert(app.includes("handleTownStageThreeZoomShortcut"), "1+2 zoom shortcut exists");
assert(css.includes(".computer-town-avatar-bar"), "avatar bar styles exist");
assert(css.includes(".computer-town-thought"), "thought bubble styles exist");
assert(css.includes(".computer-town-market-panel"), "market panel styles exist");
if (!process.exitCode) console.log("Town stage three checks passed.");
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node scripts/verify-town-stage-three.js`
Expected: FAIL messages for missing stage three markers.

### Task 2: DOM Shell For Town Stage Three

**Files:**
- Modify: `app.js` inside `setComputerAppWindowContent("town")`
- Modify: `styles.css` near `.computer-town-*` overlays

**Interfaces:**
- Consumes: existing `.computer-town-app`
- Produces: `.computer-town-avatar-bar`, `.computer-town-market-panel`, `.computer-town-thought`

- [ ] **Step 1: Add DOM shell**

Add avatar bar, market panel, and thought overlay into the town app HTML string.

- [ ] **Step 2: Add CSS**

Style avatar bar at the bottom, market panel as a quiet shop panel, and thought bubble as small non-noisy overlay.

- [ ] **Step 3: Run verification**

Run: `node scripts/verify-town-stage-three.js`
Expected: only JavaScript behavior markers may still fail.

### Task 3: Character Homes And Businesses

**Files:**
- Modify: `app.js` around town character data and Three.js builders

**Interfaces:**
- Consumes: `townSprunkiCharacters`
- Produces: `townStageThreeBusinesses`, `makeTownHouseFeature(THREE, character, scale)`, `makeTownStageThreeHouse(THREE, scene, character, x, z, scale)`

- [ ] **Step 1: Add business data**

Create supermarket and clothing store entries with names, positions, and colors.

- [ ] **Step 2: Add feature signs**

Create simple Three.js feature markers based on `character.feature`: headphones, horns, antenna, leaves, bow, visor, hat, screen, treeTop, and fallback sign.

- [ ] **Step 3: Replace generic houses**

Generate resident homes from character data, store each home target on `character.userData.homeTarget`, and include houses in obstacles.

- [ ] **Step 4: Run verification**

Run: `node scripts/verify-town-stage-three.js`
Expected: remaining failures should be avatar/focus/thought shortcut only if any.

### Task 4: Avatar Navigation, Thoughts, And Daily Life

**Files:**
- Modify: `app.js` inside `startComputerTown3D`
- Modify: `styles.css`

**Interfaces:**
- Consumes: `members`, `speakers`, `camera`, business locations
- Produces: `renderTownAvatarBar(townRoot, members)`, `focusTownResident(member)`, `showComputerTownThought(host, speaker, text)`, `handleTownStageThreeZoomShortcut(event)`

- [ ] **Step 1: Render avatar bar**

Create one button per ground resident; clicking a button selects and focuses the resident and shows their quiet thought.

- [ ] **Step 2: Add focus camera**

Move camera smoothly toward selected resident/home with a stored focus target.

- [ ] **Step 3: Add quiet thoughts**

Replace frequent long speech with occasional small thought messages such as going home, buying food, buying clothes, or resting.

- [ ] **Step 4: Add 1+2 shortcut**

Track keydown/keyup so pressing `1` and `2` together toggles `.town-minimized`.

- [ ] **Step 5: Run verification**

Run: `node scripts/verify-town-stage-three.js`
Expected: PASS.

### Task 5: Regression Verification And Build

**Files:**
- Modify: none expected beyond generated `dist`

**Interfaces:**
- Consumes: all previous tasks
- Produces: locally previewable build

- [ ] **Step 1: Run syntax check**

Run: `node --check app.js`
Expected: no output, exit 0.

- [ ] **Step 2: Run Minecraft regressions**

Run: `node scripts/verify-minecraft-first-pack.js` and existing Minecraft verification scripts.
Expected: PASS.

- [ ] **Step 3: Build static server output**

Run: `node scripts/build-sites-static.js`
Expected: build succeeds.

- [ ] **Step 4: Preview**

Open `http://127.0.0.1:8000/` in the right browser panel.
