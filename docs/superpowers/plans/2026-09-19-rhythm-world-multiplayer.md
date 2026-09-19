# Rhythm World 20-Player Multiplayer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let up to 20 people automatically share one town, move smoothly, chat with free text, and invite one another into synchronized singing and dancing.

**Architecture:** Keep the GitHub Pages frontend and add a versioned WebSocket client plus a separately deployed Cloudflare Worker/Durable Object service. Treat the server as authoritative for town membership, character claims, world clock, chat validation, and chorus membership while clients interpolate remote movement.

**Tech Stack:** Browser ES modules, Three.js, WebSocket, Cloudflare Workers, Durable Objects, Node.js assertions, Wrangler.

**Spec:** `docs/superpowers/specs/2026-09-19-rhythm-world-multiplayer-performance-horror-design.md`

**Prerequisite:** Complete `docs/superpowers/plans/2026-09-19-rhythm-world-performance-foundation.md`.

## Global Constraints

- The game remains hosted on GitHub Pages; Cloudflare only relays multiplayer state.
- Enter the town automatically with no room selector or “public town” label.
- Maximum 20 human players per town; NPCs do not count.
- Human players in one town must use distinct character IDs.
- Chat is free text, maximum 80 characters, rendered as text only, and not stored permanently.
- If the service is unavailable, preserve fully playable single-player mode.

## Review Focus

- The 21st simultaneous connection is assigned to another shard without exposing a room UI.
- Duplicate joins, malformed JSON, `NaN`, infinity, teleport speed, and oversized payloads are rejected safely.
- A reconnect replaces stale state instead of duplicating a remote character.
- Rapid chat and invitation spam is throttled without disconnecting normal players.
- Remote player removal releases the character claim and fades the sprite exactly once.

## File Map

- Create `rhythm-world/protocol.js`: versioned message constructors and validators shared by browser tests and Worker source.
- Create `rhythm-world/multiplayer-client.js`: WebSocket lifecycle, reconnect, batching, and offline status.
- Create `rhythm-world/remote-players.js`: remote Three.js characters and interpolation.
- Create `rhythm-world/town-chat.js`: chat model, sanitization, muted IDs, and DOM rendering.
- Modify `rhythm-world/engine.js`: expose local snapshot and remote player hooks.
- Modify `rhythm-world.js`, `rhythm-world.html`, `rhythm-world.css`: connection, character claims, chat, and multiplayer chorus UI.
- Create `multiplayer-worker/src/index.js`: Worker routing and Durable Object implementation.
- Create `multiplayer-worker/src/town-state.js`: pure town admission, validation, clock, and broadcast rules.
- Create `multiplayer-worker/wrangler.jsonc`, `multiplayer-worker/package.json`: isolated deployment config.
- Create verification scripts listed below.

---

### Task 1: Versioned Protocol and Validation

**Files:**
- Create: `rhythm-world/protocol.js`
- Create: `scripts/verify-rhythm-world-multiplayer-protocol.js`

**Interfaces:**
- Produces: `PROTOCOL_VERSION`, `parseClientMessage(raw)`, `sanitizeChat(text)`, `validateMotion(message, previous, elapsedMs)`.

- [ ] **Step 1: Write failing validation cases**

```js
const assert = require('assert');
(async () => {
  const p = await import('../rhythm-world/protocol.js');
  assert.equal(p.sanitizeChat('<b>你好</b>\u0000').includes('<'), true);
  assert.equal(p.sanitizeChat('你'.repeat(100)).length, 80);
  assert.equal(p.parseClientMessage('{bad'), null);
  assert.equal(p.validateMotion({ x: Infinity, z: 0 }, { x: 0, z: 0 }, 100), false);
  assert.equal(p.validateMotion({ x: 100, z: 0 }, { x: 0, z: 0 }, 100), false);
  console.log('multiplayer protocol verification passed');
})().catch(error => { console.error(error); process.exit(1); });
```

- [ ] **Step 2: Run and confirm missing module**

Run: `node scripts/verify-rhythm-world-multiplayer-protocol.js`

Expected: FAIL with `ERR_MODULE_NOT_FOUND`.

- [ ] **Step 3: Implement strict parsing and text normalization**

```js
export const PROTOCOL_VERSION = 1;
export function sanitizeChat(value) {
  return String(value ?? '').replace(/[\u0000-\u001f\u007f]/g, '').trim().slice(0, 80);
}
export function parseClientMessage(raw) {
  try {
    const value = JSON.parse(raw);
    return value && value.v === PROTOCOL_VERSION && typeof value.type === 'string' ? value : null;
  } catch { return null; }
}
export function validateMotion(message, previous, elapsedMs) {
  if (![message.x, message.z, message.direction].every(Number.isFinite)) return false;
  const distance = Math.hypot(message.x - previous.x, message.z - previous.z);
  return distance <= Math.max(1.5, elapsedMs * .012);
}
```

- [ ] **Step 4: Run the protocol test**

Run: `node scripts/verify-rhythm-world-multiplayer-protocol.js`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add rhythm-world/protocol.js scripts/verify-rhythm-world-multiplayer-protocol.js
git commit -m "Define rhythm world multiplayer protocol"
```

### Task 2: Pure Town Admission and Rate Limits

**Files:**
- Create: `multiplayer-worker/src/town-state.js`
- Create: `scripts/verify-rhythm-world-town-state.js`

**Interfaces:**
- Consumes: protocol version and validation rules.
- Produces: `createTownState({ capacity: 20, now })` with `join`, `leave`, `applyMotion`, `applyChat`, `snapshot`.

- [ ] **Step 1: Write admission, uniqueness, and rate tests**

```js
const assert = require('assert');
(async () => {
  const { createTownState } = await import('../multiplayer-worker/src/town-state.js');
  const town = createTownState({ capacity: 20, now: () => 1000 });
  for (let i = 0; i < 20; i++) assert.equal(town.join({ id: `p${i}`, character: `c${i}` }).ok, true);
  assert.equal(town.join({ id: 'p20', character: 'c20' }).reason, 'full');
  const small = createTownState({ capacity: 20, now: () => 2000 });
  assert.equal(small.join({ id: 'a', character: 'gray' }).ok, true);
  assert.equal(small.join({ id: 'b', character: 'gray' }).reason, 'character-taken');
  assert.equal(small.applyChat('a', '一').ok, true);
  assert.equal(small.applyChat('a', '二').ok, true);
  assert.equal(small.applyChat('a', '三').ok, true);
  assert.equal(small.applyChat('a', '四').reason, 'rate-limited');
  console.log('town state verification passed');
})().catch(error => { console.error(error); process.exit(1); });
```

- [ ] **Step 2: Run and confirm failure**

Run: `node scripts/verify-rhythm-world-town-state.js`

Expected: FAIL with missing module.

- [ ] **Step 3: Implement the pure state machine**

```js
export function createTownState({ capacity = 20, now = Date.now } = {}) {
  const players = new Map(), chatTimes = new Map();
  return {
    join(player) {
      if (players.size >= capacity) return { ok: false, reason: 'full' };
      if ([...players.values()].some(p => p.character === player.character)) return { ok: false, reason: 'character-taken' };
      players.set(player.id, { ...player, x: 0, z: 0, direction: 0 });
      return { ok: true };
    },
    leave(id) { return players.delete(id); },
    applyChat(id, text) {
      const cutoff = now() - 10000, times = (chatTimes.get(id) || []).filter(t => t >= cutoff);
      if (times.length >= 3) return { ok: false, reason: 'rate-limited' };
      times.push(now()); chatTimes.set(id, times); return { ok: true, text };
    },
    snapshot() { return { players: [...players.values()] }; }
  };
}
```

Add motion validation, idempotent reconnect replacement by player ID, chorus membership, and cleanup using the same result-object pattern.

- [ ] **Step 4: Run focused checks**

Run: `node scripts/verify-rhythm-world-town-state.js`

Run: `node scripts/verify-rhythm-world-multiplayer-protocol.js`

Expected: both PASS.

- [ ] **Step 5: Commit**

```bash
git add multiplayer-worker/src/town-state.js scripts/verify-rhythm-world-town-state.js
git commit -m "Add authoritative multiplayer town state"
```

### Task 3: Durable Object WebSocket Relay

**Files:**
- Create: `multiplayer-worker/src/index.js`
- Create: `multiplayer-worker/wrangler.jsonc`
- Create: `multiplayer-worker/package.json`
- Create: `scripts/verify-rhythm-world-worker-config.js`

**Interfaces:**
- Consumes: `createTownState`.
- Produces: `GET /connect?player={playerId}&character={characterId}` WebSocket upgrade and `GET /health` JSON response.

- [ ] **Step 1: Write a config and export verification**

```js
const assert = require('assert'), fs = require('fs');
const config = JSON.parse(fs.readFileSync('multiplayer-worker/wrangler.jsonc', 'utf8').replace(/\/\*[\s\S]*?\*\//g, ''));
assert.equal(config.main, 'src/index.js');
assert(config.durable_objects.bindings.some(item => item.name === 'TOWNS'));
const source = fs.readFileSync('multiplayer-worker/src/index.js', 'utf8');
for (const token of ['class Town', 'WebSocketPair', 'serializeAttachment', '/health']) assert(source.includes(token));
console.log('worker config verification passed');
```

- [ ] **Step 2: Run and confirm missing files**

Run: `node scripts/verify-rhythm-world-worker-config.js`

Expected: FAIL with `ENOENT`.

- [ ] **Step 3: Implement hidden shard selection and hibernating sockets**

```js
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/health') return Response.json({ ok: true, version: 1 });
    if (url.pathname !== '/connect') return new Response('Not found', { status: 404 });
    const shard = await chooseAvailableShard(env.TOWNS);
    return env.TOWNS.get(env.TOWNS.idFromName(shard)).fetch(request);
  }
};

export class Town {
  constructor(state) { this.state = state; this.clients = new Map(); }
  async fetch(request) {
    if (request.headers.get('Upgrade') !== 'websocket') return new Response('Upgrade required', { status: 426 });
    const pair = new WebSocketPair();
    this.state.acceptWebSocket(pair[1]);
    pair[1].serializeAttachment({ connectedAt: Date.now() });
    return new Response(null, { status: 101, webSocket: pair[0] });
  }
}
```

Use an allocator Durable Object or a bounded shard probe to choose the first town below 20 players. Validate origin against the GitHub Pages production origin plus localhost development origins. Batch motion broadcasts on a 100 ms alarm/timer boundary.

- [ ] **Step 4: Verify configuration and dry-run deployment**

Run: `node scripts/verify-rhythm-world-worker-config.js`

Run from `multiplayer-worker`: `npx wrangler deploy --dry-run`

Expected: verification PASS and Wrangler produces a valid dry-run bundle.

- [ ] **Step 5: Commit**

```bash
git add multiplayer-worker scripts/verify-rhythm-world-worker-config.js
git commit -m "Add multiplayer Durable Object relay"
```

### Task 4: Reconnecting Browser Client

**Files:**
- Create: `rhythm-world/multiplayer-client.js`
- Create: `rhythm-world/multiplayer-config.js`
- Create: `scripts/verify-rhythm-world-multiplayer-client.js`

**Interfaces:**
- Produces: `createMultiplayerClient({ url, socketFactory, onEvent, onStatus })` with `connect(identity)`, `sendMotion`, `sendChat`, `sendChorus`, `disconnect`.

- [ ] **Step 1: Write a fake-socket lifecycle test**

```js
const assert = require('assert');
(async () => {
  const { createMultiplayerClient } = await import('../rhythm-world/multiplayer-client.js');
  const sent = [];
  const fake = { readyState: 1, send: value => sent.push(JSON.parse(value)), close() {} };
  const client = createMultiplayerClient({ url: 'wss://example.test/connect', socketFactory: () => fake });
  client.connect({ id: 'p1', character: 'gray' });
  client.sendMotion({ x: 1, z: 2, direction: 0, action: 'walk' });
  assert.equal(sent.at(-1).type, 'motion');
  client.disconnect();
  console.log('multiplayer client verification passed');
})().catch(error => { console.error(error); process.exit(1); });
```

- [ ] **Step 2: Run and confirm failure**

Run: `node scripts/verify-rhythm-world-multiplayer-client.js`

Expected: FAIL with missing module.

- [ ] **Step 3: Implement status, batching, and exponential reconnect**

```js
export function createMultiplayerClient({ url, socketFactory = value => new WebSocket(value), onEvent = () => {}, onStatus = () => {} }) {
  let socket, identity, closed = false, retry = 0, pendingMotion = null;
  function send(type, payload) {
    if (socket?.readyState !== 1) return false;
    socket.send(JSON.stringify({ v: 1, type, ...payload })); return true;
  }
  return {
    connect(value) { identity = value; closed = false; socket = socketFactory(`${url}?player=${encodeURIComponent(value.id)}&character=${encodeURIComponent(value.character)}`); onStatus('connecting'); },
    sendMotion(value) { pendingMotion = value; return send('motion', pendingMotion); },
    sendChat(text) { return send('chat', { text }); },
    sendChorus(value) { return send('chorus', value); },
    disconnect() { closed = true; socket?.close(); onStatus('offline'); }
  };
}
```

Complete event listeners, 5–8 Hz motion throttling, exponential retry capped at 30 seconds, snapshot replacement after reconnect, and a disabled/offline mode when the URL is empty.

- [ ] **Step 4: Run client and protocol tests**

Run: `node scripts/verify-rhythm-world-multiplayer-client.js`

Run: `node scripts/verify-rhythm-world-multiplayer-protocol.js`

Expected: both PASS.

- [ ] **Step 5: Commit**

```bash
git add rhythm-world/multiplayer-client.js rhythm-world/multiplayer-config.js scripts/verify-rhythm-world-multiplayer-client.js
git commit -m "Add reconnecting rhythm world client"
```

### Task 5: Remote Characters and Free-Text Chat

**Files:**
- Create: `rhythm-world/remote-players.js`
- Create: `rhythm-world/town-chat.js`
- Modify: `rhythm-world/engine.js`
- Modify: `rhythm-world.js`
- Modify: `rhythm-world.html`
- Modify: `rhythm-world.css`
- Create: `scripts/verify-rhythm-world-remote-chat.js`

**Interfaces:**
- Consumes: `createCharacter3D`, multiplayer snapshots and events.
- Produces: `createRemotePlayers({ scene })` with `upsert`, `remove`, `update`, `speak`, `setPerforming`.
- Produces: `createTownChat({ root, send })` with `append`, `setOnlineCount`, `mute`, `isMuted`.

- [ ] **Step 1: Write pure interpolation and mute tests**

```js
const assert = require('assert');
(async () => {
  const { interpolateRemotePose } = await import('../rhythm-world/remote-players.js');
  const { createChatState } = await import('../rhythm-world/town-chat.js');
  assert.deepEqual(interpolateRemotePose({ x: 0, z: 0 }, { x: 10, z: 4 }, .25), { x: 2.5, z: 1 });
  const chat = createChatState();
  chat.mute('p2');
  assert.equal(chat.accept({ playerId: 'p2', text: 'hi' }), false);
  assert.equal(chat.accept({ playerId: 'p3', text: 'hi' }), true);
  console.log('remote chat verification passed');
})().catch(error => { console.error(error); process.exit(1); });
```

- [ ] **Step 2: Run and confirm failure**

Run: `node scripts/verify-rhythm-world-remote-chat.js`

Expected: FAIL with missing modules.

- [ ] **Step 3: Implement remote rendering and chat DOM**

```js
export function interpolateRemotePose(current, target, alpha) {
  return { x: current.x + (target.x - current.x) * alpha, z: current.z + (target.z - current.z) * alpha };
}
export function createChatState() {
  const muted = new Set();
  return { mute: id => muted.add(id), isMuted: id => muted.has(id), accept: message => !muted.has(message.playerId) };
}
```

Render chat strings only through `textContent`. Add a collapsible top panel, online count, 80-character input, send button, per-message mute control, connection badge, and responsive offsets that do not overlap the joystick or action buttons. Route accepted remote chat to `setCharacterSpeech` for a temporary bubble and gaze motion.

- [ ] **Step 4: Verify chat and existing controls**

Run: `node scripts/verify-rhythm-world-remote-chat.js`

Run: `node scripts/verify-rhythm-world-3d-controls.js`

Run: `node scripts/verify-rhythm-world-interact-button.js`

Expected: all PASS.

- [ ] **Step 5: Commit**

```bash
git add rhythm-world/remote-players.js rhythm-world/town-chat.js rhythm-world/engine.js rhythm-world.js rhythm-world.html rhythm-world.css scripts/verify-rhythm-world-remote-chat.js
git commit -m "Render remote players and town chat"
```

### Task 6: Multiplayer Chorus and End-to-End Delivery

**Files:**
- Modify: `rhythm-world.js`
- Modify: `rhythm-world/engine.js`
- Modify: `rhythm-world/concert-world.js`
- Modify: `multiplayer-worker/src/town-state.js`
- Modify: `multiplayer-worker/src/index.js`
- Create: `scripts/verify-rhythm-world-multiplayer-chorus.js`
- Create: `scripts/simulate-rhythm-world-clients.js`

**Interfaces:**
- Consumes: multiplayer client, performer state, town state.
- Produces server events: `chorus-invite`, `chorus-decision`, `chorus-state`, `chorus-stop`.

- [ ] **Step 1: Write a chorus authority test**

```js
const assert = require('assert');
(async () => {
  const { createTownState } = await import('../multiplayer-worker/src/town-state.js');
  const town = createTownState({ now: () => 1000 });
  town.join({ id: 'a', character: 'gray' }); town.join({ id: 'b', character: 'pinki' });
  assert.equal(town.inviteToChorus('a', 'b').ok, true);
  assert.equal(town.decideChorus('b', true).members.length, 2);
  assert.equal(town.stopChorus('a').members.length, 0);
  console.log('multiplayer chorus verification passed');
})().catch(error => { console.error(error); process.exit(1); });
```

- [ ] **Step 2: Run and confirm missing methods**

Run: `node scripts/verify-rhythm-world-multiplayer-chorus.js`

Expected: FAIL because chorus authority methods do not exist.

- [ ] **Step 3: Implement authoritative invite/decision/stop flow**

Add pending invitations with a 15-second expiry, reject self-invites and non-nearby players, broadcast accepted membership at the next shared bar time, and clear membership on disconnect. Map remote membership to the same `setPlayerPerforming` and character audio APIs used by local NPC duets.

```js
function inviteToChorus(from, to) {
  if (from === to || !players.has(from) || !players.has(to)) return { ok: false, reason: 'invalid-player' };
  const a = players.get(from), b = players.get(to);
  if (Math.hypot(a.x - b.x, a.z - b.z) > 4) return { ok: false, reason: 'too-far' };
  pendingInvites.set(to, { from, expiresAt: now() + 15000 });
  return { ok: true };
}
```

- [ ] **Step 4: Simulate 20 clients and verify two real tabs**

Run: `node scripts/simulate-rhythm-world-clients.js --url ws://127.0.0.1:8787/connect --count 20`

Expected: all 20 receive snapshots and chat; a 21st is assigned to a different shard; malformed and rate-limited packets are rejected without crashing the Worker.

Open two browser tabs, choose different characters, move, chat, invite, accept, sing, stop, reload one tab, and verify the other sees one fade-out and one rejoin.

- [ ] **Step 5: Build and run all multiplayer regressions**

Run: `npm run build`

Run: `node scripts/verify-rhythm-world-multiplayer-protocol.js && node scripts/verify-rhythm-world-town-state.js && node scripts/verify-rhythm-world-worker-config.js && node scripts/verify-rhythm-world-multiplayer-client.js && node scripts/verify-rhythm-world-remote-chat.js && node scripts/verify-rhythm-world-multiplayer-chorus.js`

Expected: all PASS.

- [ ] **Step 6: Commit**

```bash
git add rhythm-world.js rhythm-world/engine.js rhythm-world/concert-world.js multiplayer-worker/src scripts/verify-rhythm-world-multiplayer-chorus.js scripts/simulate-rhythm-world-clients.js dist
git commit -m "Complete 20-player rhythm world multiplayer"
```

### Task 7: Production Configuration and GitHub Pages Verification

**Files:**
- Modify: `rhythm-world/multiplayer-config.js`
- Modify: `README.md`

**Interfaces:**
- Consumes the deployed Worker WebSocket URL.
- Produces production configuration with localhost fallback documentation.

- [ ] **Step 1: Deploy the Worker and record its secure WebSocket endpoint**

Run from `multiplayer-worker`: `npx wrangler deploy`

Expected: Cloudflare returns an HTTPS Worker URL; use its `wss://` equivalent for `/connect`.

- [ ] **Step 2: Set the production endpoint in one config file**

Write `MULTIPLAYER_URL` using the exact `wss://` host printed by the immediately preceding Wrangler command. Do not commit an example or blank production host. Keep `ws://127.0.0.1:8787/connect` as the localhost branch.

- [ ] **Step 3: Verify production-origin CORS and health**

Run: `$workerOrigin = (Get-Content rhythm-world/multiplayer-config.js | Select-String -Pattern "wss://[^']+" -AllMatches).Matches.Value -replace '^wss://','https://' -replace '/connect$',''; Invoke-RestMethod "$workerOrigin/health"`

Expected: `{ "ok": true, "version": 1 }`.

Open the GitHub Pages game in two devices and repeat join, movement, chat, duet, disconnect, and reconnect checks.

- [ ] **Step 4: Document deployment and offline behavior**

Add the exact Worker directory, deploy command, allowed origins, health URL, and statement that an unavailable service falls back to single-player without fake online users.

- [ ] **Step 5: Commit and push to GitHub**

```bash
git add rhythm-world/multiplayer-config.js README.md
git commit -m "Configure rhythm world multiplayer production service"
git push origin main
```

Expected: GitHub Pages serves the updated game and the game connects to the deployed Worker.
