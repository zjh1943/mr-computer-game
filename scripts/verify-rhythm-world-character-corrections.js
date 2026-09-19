import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { eyeStyleFor, mouthAnchorFor } from '../rhythm-world/character-appearance.js';
import { selectCharacterView } from '../rhythm-world/character-view.js';
import { resolveSolidCollision } from '../rhythm-world/solid-collision.js';
import { DAY_LENGTH_MS } from '../rhythm-world/day-night.js';
import { isStationaryResident } from '../rhythm-world/npc-behavior.js';

assert.deepEqual(eyeStyleFor('mr-fun-computer'), { iris: '#ffffff', sclera: '#ffffff' });
assert.deepEqual(eyeStyleFor('mr-sun'), { iris: '#111111', sclera: '#111111' });
assert.deepEqual(eyeStyleFor('mr-tree'), { iris: '#111111', sclera: '#111111' });

for (const id of ['gray', 'garnold', 'mr-sun', 'mr-tree', 'mr-fun-computer']) {
  const anchor = mouthAnchorFor(id);
  assert.ok(anchor.x >= -0.35 && anchor.x <= 0.35, `${id} mouth must stay on its face`);
  assert.ok(anchor.y >= 1.15 && anchor.y <= 2.2, `${id} mouth must stay at its original mouth height`);
}

assert.deepEqual(selectCharacterView(Math.PI / 2, 0), { view: 'right', flip: false });
assert.deepEqual(selectCharacterView(-Math.PI / 2, 0), { view: 'left', flip: false });
assert.ok(DAY_LENGTH_MS >= 600000, 'day/night cycle must last at least ten minutes');
assert.equal(isStationaryResident('mr-tree'), true);
assert.equal(isStationaryResident('garnold'), false);

const bounced = resolveSolidCollision({ x: 0.3, z: 0 }, { x: 0, z: 0, radius: 1.25 }, { x: -0.2, z: 0 });
assert.ok(bounced.x > 1.25, 'solid Mr. Tree must push the player back outside his trunk');

for (const side of ['left', 'right']) {
  const dir = path.join(process.cwd(), 'assets', 'sprunki-views', side);
  assert.equal(fs.readdirSync(dir).filter(file => file.endsWith('.png')).length, 20, `${side} needs 20 character sprites`);
}

const layout = (await import('../rhythm-world/world-stream.js')).CENTER_TOWN.homes;
assert.ok(layout.some(home => home.id === 'mr-tree'), 'Mr. Tree must have his own home');

console.log('Character corrections, distinct sides, solid tree, and slower sky verification passed.');
