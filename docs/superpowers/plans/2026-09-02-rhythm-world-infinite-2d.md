# Rhythm World Infinite 2D Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the existing `rhythm-world.html` prototype with a standalone, infinite, fixed-camera 2D Sprunki-inspired world with character onboarding, exploration, shops, housing, music performance, and a four-lane rhythm challenge.

**Architecture:** A Canvas engine renders deterministic world chunks and animated characters while focused DOM overlays handle menus, dialogue, shops, housing, and music modes. Small ES modules share one explicit game state and persist device-local progress through versioned localStorage data.

**Tech Stack:** HTML5 Canvas, CSS, native JavaScript ES modules, Web Audio API, Web Speech API with keyboard fallback, Node-based static verification scripts.

**Spec:** `docs/superpowers/specs/2026-09-02-rhythm-world-infinite-2d-design.md`

## Global Constraints

- The new page must not load `app.js` or `styles.css`.
- World exploration is four-directional with a fixed camera, not a side-scrolling platformer.
- World content is deterministic from seed and chunk coordinates.
- Audio is original and synthesized; do not copy Incredibox or Sprunki recordings.
- Input must work on desktop, phone, and tablet.
- Build output must remain below the hosting platform size limit.

---

### Task 1: State, storage, and deterministic world model

**Files:**
- Create: `rhythm-world/storage.js`
- Create: `rhythm-world/world.js`
- Create: `scripts/verify-rhythm-world-model.js`

**Interfaces:**
- Produces: `createDefaultSave(seed)`, `loadSave()`, `saveGame(state)`, `resetSave()`.
- Produces: `chunkKey(cx, cy)`, `generateChunk(seed, cx, cy)`, `getNearbyChunks(seed, x, y, radius)`.

- [ ] **Step 1: Write the failing model verification**

Verify that storage exports are present, identical seed/chunk inputs produce identical serialized results, different coordinates differ, and generated chunks include passable ground plus guaranteed feature metadata.

- [ ] **Step 2: Run the verification and confirm RED**

Run: `node scripts/verify-rhythm-world-model.js`
Expected: FAIL because the modules do not exist.

- [ ] **Step 3: Implement storage and chunk generation**

Use a string-hash plus seeded PRNG. A chunk record contains `{cx, cy, biome, roads, decorations, buildings}`. Storage schema version 1 contains seed, player, inventory, house, basement, customCharacters, score, settings, and updatedAt.

- [ ] **Step 4: Run the verification and confirm GREEN**

Run: `node scripts/verify-rhythm-world-model.js`
Expected: PASS with deterministic model and storage exports.

- [ ] **Step 5: Commit**

Commit message: `Build deterministic rhythm world model`

### Task 2: Canvas engine, sky, infinite exploration, and input

**Files:**
- Create: `rhythm-world/engine.js`
- Create: `rhythm-world/characters.js`
- Create: `scripts/verify-rhythm-world-engine.js`
- Modify: `rhythm-world.html`
- Modify: `rhythm-world.css`

**Interfaces:**
- Consumes: `getNearbyChunks(seed, x, y, radius)` and `saveGame(state)`.
- Produces: `createEngine({canvas,state,onInteract})` returning `{start,stop,resize,setMode,setPlayerCharacter}`.
- Produces: `drawCharacter(ctx, characterId, x, y, scale, animationState, time)`.

- [ ] **Step 1: Write the failing engine verification**

Check for a standalone `<canvas>`, module entrypoint, resize-safe viewport, keyboard/WASD mapping, touch joystick elements, requestAnimationFrame loop, drifting cloud parameters, animated Mr. Sun, camera transforms, chunk culling, and collision hooks.

- [ ] **Step 2: Run and confirm RED**

Run: `node scripts/verify-rhythm-world-engine.js`
Expected: FAIL against the old prototype.

- [ ] **Step 3: Replace the world markup and styles, then implement the engine**

Render sky gradient, sun face, clouds, chunk terrain, roads, trees, rocks, buildings, player, residents, shadows, labels, and interaction prompts. Keep the camera centered with a soft dead zone and render only nearby chunks.

- [ ] **Step 4: Run and confirm GREEN**

Run: `node scripts/verify-rhythm-world-engine.js`
Expected: PASS.

- [ ] **Step 5: Commit**

Commit message: `Render infinite animated Sprunki world`

### Task 3: World creation, production room, dialogue, and role selection

**Files:**
- Create: `rhythm-world/ui.js`
- Create: `scripts/verify-rhythm-world-onboarding.js`
- Modify: `rhythm-world.html`
- Modify: `rhythm-world.css`
- Modify: `rhythm-world.js`

**Interfaces:**
- Consumes: storage functions and `engine.setPlayerCharacter(id)`.
- Produces: `createUI({state,engine,audio})` returning `{showScreen,openDialogue,notify,openRolePicker,openPanel}`.

- [ ] **Step 1: Write the failing onboarding verification**

Check cover/settings, save list, 3.8-second generation progress, production machine scene, gray starter, clickable Fun Bot, keyboard and speech input, full Sprunki role roster, and state persistence after selection.

- [ ] **Step 2: Run and confirm RED**

Run: `node scripts/verify-rhythm-world-onboarding.js`
Expected: FAIL because the production flow is absent.

- [ ] **Step 3: Implement onboarding and dialogue**

Use explicit modes `cover`, `slots`, `loading`, `factory`, `world`. Speech failure exposes a keyboard-focused fallback. Choosing a role updates state, engine character, and save data before opening the factory door.

- [ ] **Step 4: Run and confirm GREEN**

Run: `node scripts/verify-rhythm-world-onboarding.js`
Expected: PASS.

- [ ] **Step 5: Commit**

Commit message: `Add factory onboarding and Sprunki selection`

### Task 4: Shops, housing, furniture, and basement

**Files:**
- Create: `rhythm-world/life.js`
- Create: `scripts/verify-rhythm-world-life.js`
- Modify: `rhythm-world.html`
- Modify: `rhythm-world.css`
- Modify: `rhythm-world/ui.js`

**Interfaces:**
- Produces: `createLifeSystem({state,save,notify})` returning `{openShop,openHouse,placeHouse,digBasement,placeFurniture,getInventory}`.

- [ ] **Step 1: Write the failing life-system verification**

Check a priced catalog of at least one house, eight furniture/material items, insufficient-funds behavior, house placement, grid furniture placement, basement creation and decoration, and saved-state serialization.

- [ ] **Step 2: Run and confirm RED**

Run: `node scripts/verify-rhythm-world-life.js`
Expected: FAIL because `life.js` is absent.

- [ ] **Step 3: Implement the life system and panels**

Create transactional purchases, inventory counts, placement validation, one starter house style, one interior room, and one basement room. All mutating actions call the save callback.

- [ ] **Step 4: Run and confirm GREEN**

Run: `node scripts/verify-rhythm-world-life.js`
Expected: PASS.

- [ ] **Step 5: Commit**

Commit message: `Add shops housing and basement gameplay`

### Task 5: Original Sprunki-style music stage and custom characters

**Files:**
- Create: `rhythm-world/audio.js`
- Create: `rhythm-world/stage.js`
- Create: `scripts/verify-rhythm-world-stage.js`
- Modify: `rhythm-world.html`
- Modify: `rhythm-world.css`
- Modify: `rhythm-world/ui.js`

**Interfaces:**
- Produces: `createAudioSystem()` returning `{unlock,setVolumes,startLoop,stopLoop,setMuted,setSolo,stopAll,getBeatTime}`.
- Produces: `createStage({state,audio,save})` returning `{open,close,assignSound,removeSound,toggleMute,toggleSolo,createCharacter}`.

- [ ] **Step 1: Write the failing stage verification**

Check seven performer slots, four color-coded sound categories, at least twelve original synthesized loop definitions, bar-boundary scheduling, mute/solo/remove controls, character animation state, combo trigger, and custom-character editor fields.

- [ ] **Step 2: Run and confirm RED**

Run: `node scripts/verify-rhythm-world-stage.js`
Expected: FAIL because audio and stage modules are absent.

- [ ] **Step 3: Implement audio clock and stage**

Build loops from oscillators, noise, filters and envelopes. Quantize assignments to the next beat. Draw full performer bodies with expressive CSS/Canvas animation and use portraits only inside selection controls.

- [ ] **Step 4: Run and confirm GREEN**

Run: `node scripts/verify-rhythm-world-stage.js`
Expected: PASS.

- [ ] **Step 5: Commit**

Commit message: `Build interactive Sprunki music stage`

### Task 6: Night rhythm challenge

**Files:**
- Create: `rhythm-world/rhythm.js`
- Create: `scripts/verify-rhythm-world-challenge.js`
- Modify: `rhythm-world.html`
- Modify: `rhythm-world.css`
- Modify: `rhythm-world/ui.js`

**Interfaces:**
- Consumes: `audio.getBeatTime()` and shared settings.
- Produces: `createRhythmChallenge({audio,state,save})` returning `{start,stop,handleLane,getScore,getResult}`.

- [ ] **Step 1: Write the failing challenge verification**

Check lane order left/down/up/right, keyboard mapping, touch buttons, deterministic note chart, perfect/good/miss windows, combo, score, opponent score, win/loss result, dancing spectators, and high-score persistence.

- [ ] **Step 2: Run and confirm RED**

Run: `node scripts/verify-rhythm-world-challenge.js`
Expected: FAIL because the challenge module is absent.

- [ ] **Step 3: Implement the challenge**

Use one original song chart and a fixed timestep derived from the shared beat clock. Render falling notes with transforms and update score only once per note.

- [ ] **Step 4: Run and confirm GREEN**

Run: `node scripts/verify-rhythm-world-challenge.js`
Expected: PASS.

- [ ] **Step 5: Commit**

Commit message: `Add four-lane night music challenge`

### Task 7: Integration, responsive QA, build, and publishing

**Files:**
- Create: `scripts/verify-rhythm-world-complete.js`
- Modify: `rhythm-world.js`
- Modify: `rhythm-world.css`
- Modify: `scripts/build-sites-static.js`

**Interfaces:**
- Consumes: every earlier module.
- Produces: a complete standalone page at `/rhythm-world.html`.

- [ ] **Step 1: Write the failing complete-flow verification**

Check all module imports, mode transitions, auto-save triggers, error fallbacks, responsive breakpoints for phone/tablet/desktop, no old-app imports, and build inclusion.

- [ ] **Step 2: Run and confirm RED**

Run: `node scripts/verify-rhythm-world-complete.js`
Expected: FAIL until integration is complete.

- [ ] **Step 3: Wire modules and polish responsive states**

Connect state, UI, engine, life, stage, audio, and rhythm systems. Add reduced-detail mode for small/slow devices and ensure all overlays have accessible close and back controls.

- [ ] **Step 4: Run all verification and build commands**

Run: `node scripts/verify-rhythm-world-model.js && node scripts/verify-rhythm-world-engine.js && node scripts/verify-rhythm-world-onboarding.js && node scripts/verify-rhythm-world-life.js && node scripts/verify-rhythm-world-stage.js && node scripts/verify-rhythm-world-challenge.js && node scripts/verify-rhythm-world-complete.js && node scripts/build-sites-static.js`
Expected: all verification scripts PASS and build completes.

- [ ] **Step 5: Open the local page and publish the validated build**

Refresh the existing browser tab at `/rhythm-world.html`, then save and deploy the validated Sites version.

- [ ] **Step 6: Commit**

Commit message: `Complete infinite rhythm world game`
