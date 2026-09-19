# Rhythm World Performance Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make local duets and night concerts reliably produce sound and visible performance motion, move residents to the physical plaza, and give the sun and moon a correct horizon-to-horizon path.

**Architecture:** Add capability-safe audio and a pure performance state model, then feed those states into the existing character and NPC update loops. Keep the concert inside the 3D town and make the sky a world-space system whose concert visit is an explicit state.

**Tech Stack:** Browser ES modules, Three.js, Web Audio with HTMLAudio fallback, Node.js assertion scripts.

**Spec:** `docs/superpowers/specs/2026-09-19-rhythm-world-multiplayer-performance-horror-design.md`

## Global Constraints

- Keep the game page on GitHub Pages; do not publish to ChatGPT Sites.
- Preserve 2D character art inside the 3D town.
- Audio failure must never stop animation or interaction.
- The stage must not cover the town during a performance.
- The sun may join only after night begins.
- Preserve existing saves and single-player behavior.

## Review Focus

- A browser with neither `AudioContext` nor `speechSynthesis` still starts and stops a duet without throwing.
- Autoplay rejection produces one actionable sound prompt and succeeds after a later user gesture.
- Repeated start/stop does not leak timers, oscillators, or HTML audio loops.
- NPC performance motion is not overwritten by ordinary walking updates.
- Sun and moon remain visible above the skyline without becoming fixed screen-space stickers.

## File Map

- Create `rhythm-world/audio-capabilities.js`: select Web Audio, media-loop, or silent clock implementations.
- Create `rhythm-world/performance-state.js`: pure performer state and beat pose helpers.
- Create `rhythm-world/concert-world.js`: plaza lineup, NPC travel, show lifecycle, and return-home targets.
- Modify `rhythm-world/audio.js`: delegate to selected audio backend and expose status.
- Modify `rhythm-world/character-3d.js`: render explicit performance motion.
- Modify `rhythm-world/npc-3d.js`: prioritize concert/duet states over ordinary roaming.
- Modify `rhythm-world/engine.js`: expose performer and concert controls.
- Modify `rhythm-world/sky-3d.js`: keep celestial objects in world space and support a night concert visit.
- Modify `rhythm-world/celestial-path.js`: return a long world-space arc.
- Modify `rhythm-world.js`, `rhythm-world.html`, `rhythm-world.css`: connect UI without covering the town.
- Create verification scripts named in each task.

---

### Task 1: Capability-Safe Audio Backend

**Files:**
- Create: `rhythm-world/audio-capabilities.js`
- Modify: `rhythm-world/audio.js`
- Create: `scripts/verify-rhythm-world-audio-fallback.js`

**Interfaces:**
- Produces: `createAudioBackend(env, options)` returning `{ kind, unlock, scheduleTone, stop, stopAll, getBeatTime }`.
- Produces: `createAudioSystem(options = {})` retaining current public methods plus `getStatus()`.

- [ ] **Step 1: Write the failing verification**

```js
const assert = require('assert');
(async () => {
  const { createAudioBackend } = await import('../rhythm-world/audio-capabilities.js');
  const silent = createAudioBackend({}, { tempo: 96 });
  assert.equal(silent.kind, 'silent');
  await silent.unlock();
  silent.scheduleTone({ frequency: 220, beat: 0 });
  silent.stopAll();
  assert(Number.isFinite(silent.getBeatTime()));

  let resumed = 0;
  class FakeContext {
    constructor() { this.currentTime = 1; this.destination = {}; }
    resume() { resumed += 1; return Promise.resolve(); }
    createGain() { return { gain: { value: 0, setValueAtTime() {}, exponentialRampToValueAtTime() {} }, connect() {} }; }
    createOscillator() { return { frequency: { value: 0 }, connect() {}, start() {}, stop() {}, type: '' }; }
  }
  const web = createAudioBackend({ AudioContext: FakeContext }, { tempo: 96 });
  assert.equal(web.kind, 'web-audio');
  await web.unlock();
  assert.equal(resumed, 1);
  console.log('audio fallback verification passed');
})().catch(error => { console.error(error); process.exit(1); });
```

- [ ] **Step 2: Run it and confirm the missing-module failure**

Run: `node scripts/verify-rhythm-world-audio-fallback.js`

Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `audio-capabilities.js`.

- [ ] **Step 3: Implement backend selection and error isolation**

```js
export function createAudioBackend(env = globalThis, { tempo = 96 } = {}) {
  const Context = env.AudioContext || env.webkitAudioContext;
  if (!Context) return createSilentBackend({ tempo });
  return createWebAudioBackend(Context, { tempo });
}

function createSilentBackend({ tempo }) {
  const startedAt = Date.now();
  return {
    kind: 'silent', unlock: async () => true, scheduleTone() {}, stop() {}, stopAll() {},
    getBeatTime: () => (Date.now() - startedAt) / 1000 / (60 / tempo)
  };
}
```

Update `audio.js` so every backend call is guarded and a rejected `unlock()` sets `{ audible: false, needsGesture: true }` instead of throwing. Keep beat time running in silent mode so motion continues.

- [ ] **Step 4: Run focused and existing sound checks**

Run: `node scripts/verify-rhythm-world-audio-fallback.js`

Run: `node scripts/verify-rhythm-world-character-sounds.js`

Expected: both PASS.

- [ ] **Step 5: Commit**

```bash
git add rhythm-world/audio-capabilities.js rhythm-world/audio.js scripts/verify-rhythm-world-audio-fallback.js
git commit -m "Fix rhythm world audio capability fallback"
```

### Task 2: Explicit Performance State and Motion

**Files:**
- Create: `rhythm-world/performance-state.js`
- Modify: `rhythm-world/character-3d.js`
- Modify: `rhythm-world/npc-3d.js`
- Modify: `rhythm-world/engine.js`
- Create: `scripts/verify-rhythm-world-performance-state.js`

**Interfaces:**
- Consumes: `audio.getBeatTime(): number`.
- Produces: `createPerformanceState()`, `setPerformer(state, id, active, role)`, `getPerformerMotion(state, id, beat)`.
- Produces engine methods: `setPlayerPerforming(active, role)`, `setNpcPerforming(id, active, role)`.

- [ ] **Step 1: Write the failing state test**

```js
const assert = require('assert');
(async () => {
  const p = await import('../rhythm-world/performance-state.js');
  let state = p.createPerformanceState();
  state = p.setPerformer(state, 'gray', true, 'bass');
  const moving = p.getPerformerMotion(state, 'gray', 1.25);
  assert.equal(moving.performing, true);
  assert.notEqual(moving.bob, 0);
  state = p.setPerformer(state, 'gray', false, 'bass');
  assert.equal(p.getPerformerMotion(state, 'gray', 2).performing, false);
  console.log('performance state verification passed');
})().catch(error => { console.error(error); process.exit(1); });
```

- [ ] **Step 2: Run the new test**

Run: `node scripts/verify-rhythm-world-performance-state.js`

Expected: FAIL because the module does not exist.

- [ ] **Step 3: Add immutable performer state and pass it through rendering**

```js
export function createPerformanceState() { return { members: new Map() }; }
export function setPerformer(state, id, active, role = 'voice') {
  const members = new Map(state.members);
  active ? members.set(id, { role }) : members.delete(id);
  return { members };
}
export function getPerformerMotion(state, id, beat) {
  const member = state.members.get(id);
  if (!member) return { performing: false, bob: 0, sway: 0, mouth: 0 };
  return { performing: true, bob: Math.abs(Math.sin(beat * Math.PI)) * .14,
    sway: Math.sin(beat * Math.PI * .5) * .08, mouth: (Math.sin(beat * Math.PI * 2) + 1) / 2,
    role: member.role };
}
```

Extend `setCharacterMotion` with `performing`, `performanceBeat`, and `performanceRole`. In `npc-3d.js`, derive these values from the NPC's chorus/concert role so normal roaming never clears them.

- [ ] **Step 4: Verify motion and regressions**

Run: `node scripts/verify-rhythm-world-performance-state.js`

Run: `node scripts/verify-rhythm-world-character-speech.js`

Run: `node scripts/verify-rhythm-world-three-singer.js`

Expected: all PASS.

- [ ] **Step 5: Commit**

```bash
git add rhythm-world/performance-state.js rhythm-world/character-3d.js rhythm-world/npc-3d.js rhythm-world/engine.js scripts/verify-rhythm-world-performance-state.js
git commit -m "Add visible duet performance states"
```

### Task 3: Physical Plaza Concert Lifecycle

**Files:**
- Create: `rhythm-world/concert-world.js`
- Modify: `rhythm-world/npc-3d.js`
- Modify: `rhythm-world/engine.js`
- Modify: `rhythm-world.js`
- Modify: `rhythm-world.html`
- Modify: `rhythm-world.css`
- Create: `scripts/verify-rhythm-world-concert-world.js`

**Interfaces:**
- Produces: `createConcertWorld({ plaza, lineup })` with `start(now)`, `stop(now)`, `getNpcTarget(id, home)`, `snapshot()`.
- Produces engine methods: `startTownConcert(lineup)`, `stopTownConcert()`.

- [ ] **Step 1: Write the failing lifecycle test**

```js
const assert = require('assert');
(async () => {
  const { createConcertWorld } = await import('../rhythm-world/concert-world.js');
  const show = createConcertWorld({ plaza: { x: 12, z: -8 }, lineup: ['oren', 'fun-bot'] });
  show.start(1000);
  assert.equal(show.snapshot().phase, 'gathering');
  assert.notDeepEqual(show.getNpcTarget('oren', { x: 1, z: 1 }), { x: 1, z: 1 });
  show.stop(2000);
  assert.deepEqual(show.getNpcTarget('oren', { x: 1, z: 1 }), { x: 1, z: 1 });
  console.log('concert world verification passed');
})().catch(error => { console.error(error); process.exit(1); });
```

- [ ] **Step 2: Run it and confirm failure**

Run: `node scripts/verify-rhythm-world-concert-world.js`

Expected: FAIL with missing module.

- [ ] **Step 3: Implement plaza targets and wire the existing start button**

```js
export function createConcertWorld({ plaza, lineup }) {
  let phase = 'idle', startedAt = 0;
  const slots = new Map(lineup.map((id, index) => [id, {
    x: plaza.x + (index - (lineup.length - 1) / 2) * 1.7, z: plaza.z
  }]));
  return {
    start(now) { phase = 'gathering'; startedAt = now; },
    stop() { phase = 'leaving'; },
    getNpcTarget(id, home) { return phase === 'idle' || phase === 'leaving' ? home : (slots.get(id) || home); },
    snapshot() { return { phase, startedAt, slots: [...slots] }; }
  };
}
```

Replace the full-screen live stage with a compact control sheet that closes after the show starts. Keep the world HUD, joystick, interaction, and stop-concert control visible.

- [ ] **Step 4: Verify concert behavior**

Run: `node scripts/verify-rhythm-world-concert-world.js`

Run: `node scripts/verify-rhythm-world-night-concert.js`

Run: `node scripts/verify-rhythm-world-interaction-runtime.js`

Expected: all PASS.

- [ ] **Step 5: Commit**

```bash
git add rhythm-world/concert-world.js rhythm-world/npc-3d.js rhythm-world/engine.js rhythm-world.js rhythm-world.html rhythm-world.css scripts/verify-rhythm-world-concert-world.js
git commit -m "Move night concert into the town plaza"
```

### Task 4: World-Space Sun, Moon, and Concert Visit

**Files:**
- Modify: `rhythm-world/celestial-path.js`
- Modify: `rhythm-world/sky-3d.js`
- Modify: `rhythm-world/engine.js`
- Create: `scripts/verify-rhythm-world-celestial-world.js`

**Interfaces:**
- Produces: `getCelestialArcPosition(day, origin)` returning world `{ x, y, z }`.
- Produces sky methods: `setConcertVisit(active, plazaPosition)`, `getState()`.

- [ ] **Step 1: Write the failing path test**

```js
const assert = require('assert');
(async () => {
  const { getCelestialArcPosition } = await import('../rhythm-world/celestial-path.js');
  const origin = { x: 100, z: -50 };
  const rise = getCelestialArcPosition({ travel: 0 }, origin);
  const noon = getCelestialArcPosition({ travel: .5 }, origin);
  const set = getCelestialArcPosition({ travel: 1 }, origin);
  assert(rise.y < noon.y && set.y < noon.y);
  assert(rise.x < origin.x && set.x > origin.x);
  assert.equal(rise.z, set.z);
  console.log('celestial world path verification passed');
})().catch(error => { console.error(error); process.exit(1); });
```

- [ ] **Step 2: Run it against the current signature**

Run: `node scripts/verify-rhythm-world-celestial-world.js`

Expected: FAIL because the current function ignores `origin` and uses near-camera coordinates.

- [ ] **Step 3: Implement a world-space arc and explicit night visit**

```js
export function getCelestialArcPosition(day, origin = { x: 0, z: 0 }) {
  const travel = Math.max(0, Math.min(1, day.travel));
  return {
    x: origin.x - 90 + travel * 180,
    y: 5 + Math.sin(travel * Math.PI) * 58,
    z: origin.z - 110
  };
}
```

Keep sun and moon under `scene`, update the sky origin in coarse world cells around the player, disable depth testing only for their sprite material, and interpolate the sun toward the plaza aerial slot only while `day.isNight && concertVisit.active`.

- [ ] **Step 4: Verify sky and town regressions**

Run: `node scripts/verify-rhythm-world-celestial-world.js`

Run: `node scripts/verify-rhythm-world-day-night.js`

Run: `node scripts/verify-rhythm-world-3d-town.js`

Expected: all PASS.

- [ ] **Step 5: Commit**

```bash
git add rhythm-world/celestial-path.js rhythm-world/sky-3d.js rhythm-world/engine.js scripts/verify-rhythm-world-celestial-world.js
git commit -m "Place sun and moon on a world-space sky arc"
```

### Task 5: Browser Verification and GitHub Pages Build

**Files:**
- Modify: `scripts/build-sites-static.js` only if new assets are not copied by its existing recursive rhythm-world copy.
- Create: `scripts/verify-rhythm-world-performance-delivery.js`

**Interfaces:**
- Consumes all Phase 1 modules.
- Produces a delivery check that validates local and `dist` output.

- [ ] **Step 1: Add a delivery verification**

```js
const assert = require('assert'), fs = require('fs');
for (const file of ['audio-capabilities.js', 'performance-state.js', 'concert-world.js']) {
  assert(fs.existsSync(`rhythm-world/${file}`), `missing ${file}`);
  assert(fs.existsSync(`dist/rhythm-world/${file}`), `dist missing ${file}`);
}
const app = fs.readFileSync('rhythm-world.js', 'utf8');
assert(app.includes('startTownConcert'));
console.log('performance delivery verification passed');
```

- [ ] **Step 2: Build and run all focused verifications**

Run: `npm run build`

Run: `node scripts/verify-rhythm-world-audio-fallback.js && node scripts/verify-rhythm-world-performance-state.js && node scripts/verify-rhythm-world-concert-world.js && node scripts/verify-rhythm-world-celestial-world.js && node scripts/verify-rhythm-world-performance-delivery.js`

Expected: build succeeds and all scripts PASS.

- [ ] **Step 3: Verify in two browser capability modes**

Open `http://127.0.0.1:8000/rhythm-world.html`. First test with normal audio support; then stub both audio constructors as unavailable before reload. In both cases start/stop a duet, enter the night concert, inspect NPC travel and verify the sun path. Expected: no console exception, visible dance in both modes, audible loops or a single sound prompt in supported mode.

- [ ] **Step 4: Run existing rhythm-world regression suite**

Run: `Get-ChildItem scripts/verify-rhythm-world-*.js | ForEach-Object { node $_.FullName; if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE } }`

Expected: all existing rhythm-world verification scripts PASS.

- [ ] **Step 5: Commit**

```bash
git add scripts/verify-rhythm-world-performance-delivery.js scripts/build-sites-static.js dist/rhythm-world.html dist/rhythm-world.js dist/rhythm-world
git commit -m "Verify rhythm world performance delivery"
```
