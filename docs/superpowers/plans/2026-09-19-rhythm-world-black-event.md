# Rhythm World Black Event Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an optional, synchronized, rare Black corruption event that transforms the town into a creepy but non-gory second phase and returns safely to normal.

**Architecture:** Model the event as a deterministic phase state machine independent of rendering. The multiplayer server owns timing when connected; the local client owns timing only in offline mode. Character view selection, sky treatment, audio distortion, and UI controls consume the same event snapshot.

**Tech Stack:** Browser ES modules, Three.js sprites, Canvas-generated overlays, Web Audio/media loops, Durable Object alarms, Node.js assertions.

**Spec:** `docs/superpowers/specs/2026-09-19-rhythm-world-multiplayer-performance-horror-design.md`

**Prerequisites:** Complete both performance foundation and multiplayer plans.

## Global Constraints

- The setting “布莱克是否变坏” defaults to off.
- No event may begin before 30 minutes of continuous eligible play.
- Checks occur only in randomized 30–40 minute windows and use a low trigger probability.
- Do not trigger during onboarding, character creation, or an active concert.
- The effect is creepy and distorted but contains no blood, dismemberment, or realistic injury.
- All players in one town see the same event phase and can end it immediately from settings.

## Review Focus

- Reloading or reconnecting cannot reset the cooldown and trigger repeated events.
- Toggling the setting off during any phase begins recovery and cancels future checks.
- A concert that starts during a pending check suppresses that check without corrupting world state.
- Late-joining players receive the current phase and exact elapsed phase time.
- Missing corrupted art or audio for one character falls back to a safe dark treatment without a broken sprite or silence exception.

## File Map

- Create `rhythm-world/black-event.js`: pure eligibility, schedule, phase transitions, and snapshots.
- Create `rhythm-world/corruption-appearance.js`: character-specific safe phase-two view mapping and fallback filters.
- Create `rhythm-world/corruption-audio.js`: distortion mix and restoration envelope.
- Modify `rhythm-world/character-3d.js`: consume corrupted view state.
- Modify `rhythm-world/sky-3d.js`, `rhythm-world/scene-3d.js`: gradual atmospheric treatment.
- Modify `rhythm-world.js`, `rhythm-world.html`, `rhythm-world.css`: setting, status, and immediate recovery control.
- Modify `rhythm-world/storage.js`, `rhythm-world/save-migration.js`: persist setting and offline cooldown safely.
- Modify `multiplayer-worker/src/town-state.js`, `multiplayer-worker/src/index.js`: authoritative online scheduling and snapshots.
- Add `assets/sprunki-views/corrupt/` images for Black and the principal cast, with a procedural fallback for missing files.

---

### Task 1: Pure Event State Machine and Persistence

**Files:**
- Create: `rhythm-world/black-event.js`
- Modify: `rhythm-world/storage.js`
- Modify: `rhythm-world/save-migration.js`
- Create: `scripts/verify-rhythm-world-black-event.js`

**Interfaces:**
- Produces: `createBlackEventState({ enabled, now, random })`, `advanceBlackEvent(state, context)`, `stopBlackEvent(state, now)`.
- Snapshot shape: `{ enabled, phase, phaseStartedAt, nextCheckAt, transformedIds }`.

- [ ] **Step 1: Write timing and suppression tests**

```js
const assert = require('assert');
(async () => {
  const b = await import('../rhythm-world/black-event.js');
  let state = b.createBlackEventState({ enabled: false, now: 0, random: () => 0 });
  state = b.advanceBlackEvent(state, { now: 60 * 60 * 1000, eligible: true });
  assert.equal(state.phase, 'idle');
  state = b.createBlackEventState({ enabled: true, now: 0, random: () => 0 });
  state = b.advanceBlackEvent(state, { now: 29 * 60 * 1000, eligible: true });
  assert.equal(state.phase, 'idle');
  state = b.advanceBlackEvent(state, { now: 31 * 60 * 1000, eligible: false });
  assert.equal(state.phase, 'idle');
  const stopped = b.stopBlackEvent({ ...state, phase: 'corrupted' }, 2000);
  assert.equal(stopped.phase, 'recovering');
  console.log('black event verification passed');
})().catch(error => { console.error(error); process.exit(1); });
```

- [ ] **Step 2: Run and confirm missing module**

Run: `node scripts/verify-rhythm-world-black-event.js`

Expected: FAIL with missing module.

- [ ] **Step 3: Implement deterministic scheduling and phases**

```js
const MIN_WINDOW = 30 * 60 * 1000, WINDOW_SPREAD = 10 * 60 * 1000;
export function createBlackEventState({ enabled = false, now = Date.now(), random = Math.random } = {}) {
  return { enabled, phase: 'idle', phaseStartedAt: now,
    nextCheckAt: now + MIN_WINDOW + random() * WINDOW_SPREAD, transformedIds: [] };
}
export function advanceBlackEvent(state, { now, eligible, random = Math.random }) {
  if (!state.enabled) return state.phase === 'idle' ? state : { ...state, phase: 'recovering', phaseStartedAt: now };
  if (state.phase === 'idle' && eligible && now >= state.nextCheckAt && random() < .12)
    return { ...state, phase: 'warning', phaseStartedAt: now };
  return advanceTimedPhase(state, now, random);
}
export function stopBlackEvent(state, now) { return { ...state, phase: 'recovering', phaseStartedAt: now }; }
```

Persist only `enabled`, `nextCheckAt`, and cooldown-relevant timestamps offline. Migrate old saves with `enabled: false` and a future check time.

- [ ] **Step 4: Verify event and save migration**

Run: `node scripts/verify-rhythm-world-black-event.js`

Run: `node scripts/verify-rhythm-world-3d-integration.js`

Expected: both PASS.

- [ ] **Step 5: Commit**

```bash
git add rhythm-world/black-event.js rhythm-world/storage.js rhythm-world/save-migration.js scripts/verify-rhythm-world-black-event.js
git commit -m "Add rare Black event state machine"
```

### Task 2: Black Normal Form and Safe Phase-Two Appearance

**Files:**
- Create: `rhythm-world/corruption-appearance.js`
- Modify: `rhythm-world/character-3d.js`
- Modify: `rhythm-world/character-appearance.js`
- Add: `assets/sprunki-views/corrupt/black.png`
- Add: `assets/sprunki-views/corrupt/gray.png`, `pinki.png`, `simon.png`, `wenda.png`, `oren.png`, and `fun-bot.png`
- Create: `scripts/verify-rhythm-world-corruption-appearance.js`

**Interfaces:**
- Produces: `getCorruptionAppearance(id, phase)` returning `{ view, tint, jitter, fallback }`.
- Extends: `setCharacterMotion(group, { corruption })`.

- [ ] **Step 1: Write catalog and fallback tests**

```js
const assert = require('assert'), fs = require('fs');
(async () => {
  const { getCorruptionAppearance } = await import('../rhythm-world/corruption-appearance.js');
  const black = getCorruptionAppearance('black', 'corrupted');
  assert.equal(black.view, 'corrupt/black');
  const unknown = getCorruptionAppearance('unknown-character', 'corrupted');
  assert.equal(unknown.fallback, true);
  assert(fs.existsSync('assets/sprunki-views/corrupt/black.png'));
  console.log('corruption appearance verification passed');
})().catch(error => { console.error(error); process.exit(1); });
```

- [ ] **Step 2: Run and confirm missing module/assets**

Run: `node scripts/verify-rhythm-world-corruption-appearance.js`

Expected: FAIL with missing module or Black asset.

- [ ] **Step 3: Implement normal Black corrections and phase mapping**

Normal Black must render a round black face/body, black top hat, white bow tie, visible eyes, and white mouth. The corrupted Black asset uses the approved taller, caved-in silhouette and shadowed duotone face without blood or injury detail.

```js
const CORRUPT_VIEWS = new Set(['black', 'gray', 'pinki', 'simon', 'wenda', 'oren', 'fun-bot']);
export function getCorruptionAppearance(id, phase) {
  if (phase !== 'corrupted' && phase !== 'transforming') return { view: 'front', tint: '#ffffff', jitter: 0, fallback: false };
  if (CORRUPT_VIEWS.has(id)) return { view: `corrupt/${id}`, tint: '#ffffff', jitter: .035, fallback: false };
  return { view: 'front', tint: '#70758c', jitter: .02, fallback: true };
}
```

Use the procedural tint/noise fallback if an image load fails. Preserve front/left/right/back selection in normal phases.

- [ ] **Step 4: Verify appearance and normal character regressions**

Run: `node scripts/verify-rhythm-world-corruption-appearance.js`

Run: `node scripts/verify-rhythm-world-character-corrections.js`

Run: `node scripts/verify-rhythm-world-character-views.js`

Expected: all PASS.

- [ ] **Step 5: Commit**

```bash
git add rhythm-world/corruption-appearance.js rhythm-world/character-3d.js rhythm-world/character-appearance.js assets/sprunki-views/corrupt scripts/verify-rhythm-world-corruption-appearance.js
git commit -m "Add safe Sprunki phase-two appearances"
```

### Task 3: Atmosphere, Distorted Music, and Recovery UI

**Files:**
- Create: `rhythm-world/corruption-audio.js`
- Modify: `rhythm-world/audio.js`
- Modify: `rhythm-world/sky-3d.js`
- Modify: `rhythm-world/scene-3d.js`
- Modify: `rhythm-world.js`
- Modify: `rhythm-world.html`
- Modify: `rhythm-world.css`
- Create: `scripts/verify-rhythm-world-corruption-presentation.js`

**Interfaces:**
- Produces: `createCorruptionAudio(audio)` with `setPhase(phase, progress)`, `reset()`.
- Consumes: black event snapshot.

- [ ] **Step 1: Write transition and recovery tests**

```js
const assert = require('assert');
(async () => {
  const { corruptionMixFor } = await import('../rhythm-world/corruption-audio.js');
  assert.deepEqual(corruptionMixFor('idle', 0), { detune: 0, noise: 0, lowpass: 1 });
  const bad = corruptionMixFor('corrupted', 1);
  assert(bad.detune < 0 && bad.noise > 0 && bad.lowpass < 1);
  const restored = corruptionMixFor('recovering', 1);
  assert.equal(restored.noise, 0);
  console.log('corruption presentation verification passed');
})().catch(error => { console.error(error); process.exit(1); });
```

- [ ] **Step 2: Run and confirm missing module**

Run: `node scripts/verify-rhythm-world-corruption-presentation.js`

Expected: FAIL with missing module.

- [ ] **Step 3: Implement gradual presentation without gore**

```js
export function corruptionMixFor(phase, progress) {
  const p = Math.max(0, Math.min(1, progress));
  if (phase === 'idle') return { detune: 0, noise: 0, lowpass: 1 };
  if (phase === 'recovering') return { detune: -120 * (1 - p), noise: .2 * (1 - p), lowpass: .6 + .4 * p };
  return { detune: -120 * p, noise: .2 * p, lowpass: 1 - .4 * p };
}
```

Transition sky color, fog, mild vignette, sprite jitter, and audio mix over several seconds. Add the default-off setting and an “立即结束异常事件” button visible only during warning/transforming/corrupted phases. Turning the setting off calls the same recovery path.

- [ ] **Step 4: Verify presentation and controls**

Run: `node scripts/verify-rhythm-world-corruption-presentation.js`

Run: `node scripts/verify-rhythm-world-audio-fallback.js`

Run: `node scripts/verify-rhythm-world-pause-exit.js`

Expected: all PASS, including silent audio mode.

- [ ] **Step 5: Commit**

```bash
git add rhythm-world/corruption-audio.js rhythm-world/audio.js rhythm-world/sky-3d.js rhythm-world/scene-3d.js rhythm-world.js rhythm-world.html rhythm-world.css scripts/verify-rhythm-world-corruption-presentation.js
git commit -m "Add recoverable Black event atmosphere"
```

### Task 4: Multiplayer Authority and Full Verification

**Files:**
- Modify: `multiplayer-worker/src/town-state.js`
- Modify: `multiplayer-worker/src/index.js`
- Modify: `rhythm-world/multiplayer-client.js`
- Modify: `rhythm-world/protocol.js`
- Create: `scripts/verify-rhythm-world-black-event-sync.js`

**Interfaces:**
- Produces server messages: `world-event` with the exact black event snapshot.
- Consumes client message: `world-event-stop` restricted to an active town member.

- [ ] **Step 1: Write an authoritative synchronization test**

```js
const assert = require('assert');
(async () => {
  const { createTownState } = await import('../multiplayer-worker/src/town-state.js');
  const town = createTownState({ now: () => 31 * 60 * 1000, random: () => 0 });
  town.setBlackEnabled(true);
  town.tickWorld({ onboarding: false, concertActive: false });
  const first = town.snapshot().blackEvent;
  assert.equal(first.phase, 'warning');
  town.join({ id: 'late', character: 'gray' });
  assert.deepEqual(town.snapshot().blackEvent, first);
  town.stopBlackEvent('late');
  assert.equal(town.snapshot().blackEvent.phase, 'recovering');
  console.log('black event sync verification passed');
})().catch(error => { console.error(error); process.exit(1); });
```

- [ ] **Step 2: Run and confirm missing authority methods**

Run: `node scripts/verify-rhythm-world-black-event-sync.js`

Expected: FAIL because the town methods do not exist.

- [ ] **Step 3: Move online timing into the Durable Object**

Advance the event from Durable Object alarms, include the snapshot in join/reconnect state, broadcast each phase transition once, and cancel/suppress checks during onboarding or concerts. The browser must disable its offline scheduler while connected.

```js
function tickWorld(context) {
  blackEvent = advanceBlackEvent(blackEvent, { now: now(), eligible: !context.onboarding && !context.concertActive, random });
  return { type: 'world-event', blackEvent };
}
```

- [ ] **Step 4: Run all event and multiplayer checks**

Run: `node scripts/verify-rhythm-world-black-event.js && node scripts/verify-rhythm-world-corruption-appearance.js && node scripts/verify-rhythm-world-corruption-presentation.js && node scripts/verify-rhythm-world-black-event-sync.js && node scripts/verify-rhythm-world-multiplayer-protocol.js && node scripts/verify-rhythm-world-town-state.js`

Expected: all PASS.

- [ ] **Step 5: Browser-test offline and two-player online recovery**

Use a test-only clock injection to advance to warning, transforming, corrupted, and recovering without waiting 30 minutes. Verify default-off behavior, concert suppression, late join, immediate stop, missing-asset fallback, and a full return to normal sound/sky/character views.

- [ ] **Step 6: Build, deploy, commit, and push**

Run: `npm run build`

Run from `multiplayer-worker`: `npx wrangler deploy`

```bash
git add multiplayer-worker/src rhythm-world scripts/verify-rhythm-world-black-event-sync.js dist
git commit -m "Synchronize the rare Black event"
git push origin main
```

Expected: GitHub Pages and the deployed Worker use the same protocol version and the production game completes the event and recovery flow.
