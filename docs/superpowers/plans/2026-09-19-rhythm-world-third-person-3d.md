# Rhythm World Third-Person 3D Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the existing overhead 2D world with a responsive third-person 3D town containing all 20 normal-mode characters while preserving the existing game flows.

**Architecture:** A Three.js scene owns rendering, camera, world chunks, character meshes, and raycast interaction. Existing HTML/CSS panels remain the UI layer and receive interaction events from the 3D engine. Pure model modules hold roster, movement, day/night, chunk, and save-migration logic so they can be tested without WebGL.

**Tech Stack:** JavaScript ES modules, Three.js 0.180.0 vendored locally, HTML/CSS, Canvas textures, Node assertion scripts, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-09-19-rhythm-world-3d-design.md`

## Global Constraints

- Do not include horror, injured, bloody, or corrupted character forms.
- Include the 20 normal-mode characters and add Tunner.
- Use a third-person follow camera; desktop and touch controls must both work.
- Preserve chat, shop, performance, house, factory, cave, day/night, and saves.
- Keep the site static and GitHub Pages compatible; do not publish to ChatGPT Sites.
- Preserve the supplied front-view reference as the main character likeness target and create coherent side/back geometry.

## Review Focus

- WebGL unavailable: the page must show a useful error instead of a blank canvas; Task 1 tests capability fallback state.
- Old save references `mr-sun` or lacks 3D fields: migration must choose a playable ground character and safe transform; Task 5 tests both cases.
- Touch drag begins on HUD/joystick: camera must not rotate; Task 4 tests input-zone filtering.
- NPC and building overlap under the pointer: direct click must select the closest ray hit with an explicit interaction priority; Task 4 tests overlap ordering.
- Repeated chunk travel: scene object and listener counts must remain bounded; Task 3 tests unload/reload identity and limits.

---

### Task 1: Three.js Runtime and 3D Engine Contract

**Files:**
- Create: `rhythm-world/vendor/three.module.min.js`
- Create: `rhythm-world/scene-3d.js`
- Create: `rhythm-world/webgl-support.js`
- Create: `scripts/verify-rhythm-world-3d-runtime.js`
- Modify: `rhythm-world.html`
- Modify: `rhythm-world.css`

**Interfaces:**
- Produces: `createScene3D({canvas,onFrame,onError}) -> SceneRuntime`
- Produces: `getWebGLSupport(canvas) -> {supported:boolean, reason:string}`
- `SceneRuntime` exposes `scene`, `camera`, `renderer`, `start()`, `stop()`, `resize()`, and `dispose()`.

- [ ] **Step 1: Write the failing runtime contract test**

Create `scripts/verify-rhythm-world-3d-runtime.js` that reads the runtime source and asserts local Three.js import, `PerspectiveCamera`, `WebGLRenderer`, resize handling, context-loss handling, and an HTML fallback panel.

- [ ] **Step 2: Run the test and verify RED**

Run: `node scripts/verify-rhythm-world-3d-runtime.js`
Expected: FAIL because `scene-3d.js` and the fallback panel do not exist.

- [ ] **Step 3: Vendor Three.js and implement the runtime**

Copy the pinned `three.module.min.js` from the installed `three@0.180.0` package. Implement a scene with perspective camera, renderer, color-space configuration, resize observer, animation lifecycle, WebGL context loss/restoration, and a no-WebGL fallback panel.

- [ ] **Step 4: Run the contract and syntax tests**

Run: `node scripts/verify-rhythm-world-3d-runtime.js && node --check rhythm-world/scene-3d.js && node --check rhythm-world/webgl-support.js`
Expected: PASS.

- [ ] **Step 5: Commit**

Run: `git add rhythm-world/vendor rhythm-world/scene-3d.js rhythm-world/webgl-support.js rhythm-world.html rhythm-world.css scripts/verify-rhythm-world-3d-runtime.js && git commit -m "Add Three.js world runtime"`

### Task 2: Complete 20-Character 3D Model System

**Files:**
- Create: `rhythm-world/character-catalog.js`
- Create: `rhythm-world/character-3d.js`
- Create: `scripts/verify-rhythm-world-3d-characters.js`
- Modify: `rhythm-world/characters.js`
- Modify: `rhythm-world.js`

**Interfaces:**
- Produces: `CHARACTER_CATALOG` with exactly 20 ids and `playable`/`celestial` metadata.
- Produces: `createCharacter3D(id,{scale}) -> THREE.Group` with named `front`, `body`, `leftHand`, `rightHand`, and feature meshes.
- Produces: `setCharacterMotion(group,{moving,speaking,time,direction})`.

- [ ] **Step 1: Write the failing roster and geometry test**

Assert exactly 20 unique ids; assert Tunner exists; assert Mr. Sun is celestial-only; assert all ground characters define front, side, back, hands, and distinguishing features; assert no horror feature names are present.

- [ ] **Step 2: Run the character test and verify RED**

Run: `node scripts/verify-rhythm-world-3d-characters.js`
Expected: FAIL because Tunner and the 3D model factory do not exist.

- [ ] **Step 3: Implement catalog and model factory**

Build rounded thick bodies and feature meshes using reusable geometry/material caches. Create front facial textures on CanvasTexture, side/back colors and trim, floating hands, plug hands, ears, horns, antennae, hats, vines, visors, computer screen, and special tree/sun metadata. Add walk bob, body lean, hand swing, face-camera speaking, and selection glow.

- [ ] **Step 4: Run character tests**

Run: `node scripts/verify-rhythm-world-3d-characters.js && node --check rhythm-world/character-3d.js`
Expected: PASS with 20/20 catalog entries.

- [ ] **Step 5: Commit**

Run: `git add rhythm-world/character-catalog.js rhythm-world/character-3d.js rhythm-world/characters.js rhythm-world.js scripts/verify-rhythm-world-3d-characters.js && git commit -m "Build complete 3D Sprunki cast"`

### Task 3: Streamed 3D Town, Buildings, and Day/Night

**Files:**
- Create: `rhythm-world/town-3d.js`
- Create: `rhythm-world/world-stream.js`
- Create: `rhythm-world/sky-3d.js`
- Create: `scripts/verify-rhythm-world-3d-town.js`
- Modify: `rhythm-world/world.js`
- Modify: `rhythm-world/day-night.js`

**Interfaces:**
- Consumes: `createCharacter3D` from Task 2.
- Produces: `createTown3D({scene,seed,catalog}) -> TownRuntime`.
- `TownRuntime` exposes `update(playerPosition,time)`, `getInteractables()`, `getGroundHeight(x,z)`, `dispose()`.
- Produces: `createSky3D(scene) -> {update(dayState),dispose()}`.

- [ ] **Step 1: Write the failing town streaming test**

Test deterministic chunk keys, fixed center-town entities, 20 homes, Tunner home, load radius, unload radius, bounded chunk count, and day/night celestial exclusivity.

- [ ] **Step 2: Run the town test and verify RED**

Run: `node scripts/verify-rhythm-world-3d-town.js`
Expected: FAIL because 3D town modules do not exist.

- [ ] **Step 3: Implement town meshes and chunk streaming**

Create grass ground, raised roads, low-poly trees, flowers, rocks, caves, 3D houses, doors, signs, factory, shop, and music plaza. Build the fixed center town and stream deterministic outer chunks. Add sun/moon directional lights, sky colors, stars, clouds, road lamps, and Mr. Sun farewell bubble event.

- [ ] **Step 4: Run town tests**

Run: `node scripts/verify-rhythm-world-3d-town.js && node --check rhythm-world/town-3d.js && node --check rhythm-world/world-stream.js && node --check rhythm-world/sky-3d.js`
Expected: PASS.

- [ ] **Step 5: Commit**

Run: `git add rhythm-world/town-3d.js rhythm-world/world-stream.js rhythm-world/sky-3d.js rhythm-world/world.js rhythm-world/day-night.js scripts/verify-rhythm-world-3d-town.js && git commit -m "Create streamed 3D rhythm town"`

### Task 4: Third-Person Camera, Controls, NPCs, and Interaction

**Files:**
- Create: `rhythm-world/camera-3d.js`
- Create: `rhythm-world/input-3d.js`
- Create: `rhythm-world/interaction-3d.js`
- Create: `rhythm-world/npc-3d.js`
- Create: `scripts/verify-rhythm-world-3d-controls.js`
- Modify: `rhythm-world/engine.js`
- Modify: `rhythm-world/interactions.js`
- Modify: `rhythm-world.js`

**Interfaces:**
- Consumes: scene runtime, town runtime, and character factory.
- Produces: `createThirdPersonCamera({camera,canvas,target})` with `rotate`, `update`, and `dispose`.
- Produces: `createInput3D({canvas,joystick,blockedSelectors}) -> {movement,consumeLook,dispose}`.
- Produces: `createInteraction3D({camera,canvas,getTargets,onInteract})` with `currentTarget`, `update`, and `dispose`.
- Produces: `createNpcSystem({catalog,town,onSpeech})` with `update` and `dispose`.

- [ ] **Step 1: Write the failing camera/control/interaction test**

Test camera pitch clamps, movement relative to camera yaw, touch look exclusion over HUD/joystick, target priority for overlapping NPC/building hits, Space/button/canvas sharing the same target, and NPC home schedule.

- [ ] **Step 2: Run the control test and verify RED**

Run: `node scripts/verify-rhythm-world-3d-controls.js`
Expected: FAIL because 3D control modules do not exist.

- [ ] **Step 3: Implement camera, input, NPCs, and raycast interaction**

Add smooth third-person follow, collision-shortened camera distance, keyboard movement, virtual joystick movement, pointer look, raycast selection, emissive highlight, name prompt, direct click, and NPC state transitions. Route all targets through the existing chat/shop/stage/home/factory/cave actions.

- [ ] **Step 4: Run control tests**

Run: `node scripts/verify-rhythm-world-3d-controls.js && node --check rhythm-world/camera-3d.js && node --check rhythm-world/input-3d.js && node --check rhythm-world/interaction-3d.js && node --check rhythm-world/npc-3d.js`
Expected: PASS.

- [ ] **Step 5: Commit**

Run: `git add rhythm-world/camera-3d.js rhythm-world/input-3d.js rhythm-world/interaction-3d.js rhythm-world/npc-3d.js rhythm-world/engine.js rhythm-world/interactions.js rhythm-world.js scripts/verify-rhythm-world-3d-controls.js && git commit -m "Add third-person controls and NPC interaction"`

### Task 5: Save Migration and Existing Game Flow Integration

**Files:**
- Create: `rhythm-world/save-migration.js`
- Create: `scripts/verify-rhythm-world-3d-integration.js`
- Modify: `rhythm-world/storage.js`
- Modify: `rhythm-world.js`
- Modify: `rhythm-world.html`
- Modify: `rhythm-world.css`

**Interfaces:**
- Produces: `migrateSave(data) -> {save,migrated,backupRequired}`.
- Consumes: engine events and existing modal actions.

- [ ] **Step 1: Write the failing migration and flow test**

Test v1-to-v2 coordinate conversion, missing fields, `mr-sun` player fallback, corrupt save backup behavior, loading progress labels, and retained action routes for chat/shop/stage/home/factory/cave.

- [ ] **Step 2: Run integration test and verify RED**

Run: `node scripts/verify-rhythm-world-3d-integration.js`
Expected: FAIL because v2 migration does not exist.

- [ ] **Step 3: Implement migration and connect the 3D engine**

Upgrade saves without dropping inventory or stage data. Replace the old engine creation with the 3D runtime while retaining menu/modal controllers. Make loading progress reflect vendor, character, and world readiness. Show device quality and WebGL fallback states.

- [ ] **Step 4: Run integration and full automated tests**

Run: `node scripts/verify-rhythm-world-3d-integration.js && node scripts/verify-rhythm-world-complete.js`
Expected: PASS.

- [ ] **Step 5: Commit**

Run: `git add rhythm-world/save-migration.js rhythm-world/storage.js rhythm-world.js rhythm-world.html rhythm-world.css scripts/verify-rhythm-world-3d-integration.js && git commit -m "Integrate 3D world with existing game flows"`

### Task 6: Responsive Browser QA, Performance, and GitHub Delivery

**Files:**
- Create: `design-qa.md`
- Create: `scripts/verify-rhythm-world-3d-delivery.js`
- Modify: `rhythm-world.css`
- Modify: `scripts/build-sites-static.js`

**Interfaces:**
- Consumes: completed playable 3D game.
- Produces: verified desktop, tablet, and mobile builds and QA record.

- [ ] **Step 1: Write the failing delivery test**

Assert every 3D module/vendor asset is included by the static build, no remote runtime dependency exists, and responsive control selectors are present.

- [ ] **Step 2: Run delivery test and verify RED**

Run: `node scripts/verify-rhythm-world-3d-delivery.js`
Expected: FAIL until build copying and responsive styles are complete.

- [ ] **Step 3: Finish responsive styles and static build**

Tune desktop, tablet, and mobile HUD/control sizes; add quality tiers; ensure every new module is copied by the build. Build the static artifact.

- [ ] **Step 4: Browser verification and design QA**

Open the local game at desktop, tablet, and phone viewports. Verify world load, movement, camera, character appearance, character chat, shop, stage, factory, cave, and day/night. Check browser console. Record findings and fixes in `design-qa.md` until `final result: passed`.

- [ ] **Step 5: Run the complete suite**

Run: `node scripts/verify-rhythm-world-3d-delivery.js && node scripts/build-sites-static.js && for every scripts/verify-rhythm-world-*.js run node`
Expected: all checks PASS, build succeeds, and `git diff --check` is clean.

- [ ] **Step 6: Commit and push GitHub**

Run: `git add design-qa.md rhythm-world.css scripts/build-sites-static.js scripts/verify-rhythm-world-3d-delivery.js && git commit -m "Verify responsive 3D rhythm world" && git push origin main`
