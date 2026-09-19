import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  COMPUTER_ENDURANCE_MS,
  COMPUTER_LOW_POWER,
  createComputerPowerState,
  updateComputerPower
} from '../rhythm-world/computer-power.js';
import { TOWN_HOUSEHOLDS, getHouseholdFor } from '../rhythm-world/home-layout.js';
import { CHARACTER_CATALOG } from '../rhythm-world/character-catalog.js';
import { needsEyeCorrection } from '../rhythm-world/character-appearance.js';

assert.ok(COMPUTER_ENDURANCE_MS >= 90_000 && COMPUTER_ENDURANCE_MS <= 120_000);
assert.ok(COMPUTER_LOW_POWER > 0 && COMPUTER_LOW_POWER < .25);
let power = createComputerPowerState(100_000);
power = updateComputerPower(power, { dtMs: 82_000, distanceHome: 20, now: 82_000 });
assert.equal(power.status, 'returning');
assert.ok(power.charge > 0, 'automatic return must begin before the battery is empty');
power = updateComputerPower(power, { dtMs: 25_000, distanceHome: 12, now: 107_000 });
assert.equal(power.status, 'shutdown');
assert.ok(power.rescueAt >= 137_000 && power.rescueAt <= 152_000);
power = updateComputerPower(power, { dtMs: 31_000, distanceHome: 12, now: power.rescueAt + 1 });
assert.equal(power.status, 'rescued');
power = updateComputerPower(power, { dtMs: 30_000, distanceHome: 0, now: power.rescueAt + 30_001 });
assert.equal(power.status, 'flying');
assert.equal(power.charge, 1);

const shared = getHouseholdFor('mr-fun-computer');
assert.deepEqual(shared.residents, ['fun-bot', 'garnold', 'mr-fun-computer']);
assert.equal(getHouseholdFor('fun-bot').id, shared.id);
assert.equal(getHouseholdFor('garnold').id, shared.id);
for (const character of CHARACTER_CATALOG.filter(item => !item.celestial)) {
  assert.ok(getHouseholdFor(character.id), `${character.id} must have an enterable home`);
}
assert.ok(TOWN_HOUSEHOLDS.every(home => home.label.endsWith('的家') || home.label.includes('合住之家')));
assert.equal(needsEyeCorrection('mr-fun-computer'), false, 'Mr. Computer must not wear the robot eye overlay');

const town = fs.readFileSync('rhythm-world/town-3d.js', 'utf8');
const npc = fs.readFileSync('rhythm-world/npc-3d.js', 'utf8');
const app = fs.readFileSync('rhythm-world.js', 'utf8');
assert.ok(town.includes('musicPlaza'), 'the music plaza needs a distinct open stage model');
assert.ok(town.includes('houseSign'), 'every home needs a visible resident sign');
assert.ok(town.includes("assets/sprunki-views/front/mr-tree.png"), 'decorative trees must look like Mr. Tree');
assert.ok(npc.includes('updateComputerPower'), 'Mr. Computer power state must run in the NPC world');
assert.ok(npc.includes('rescueComputer'), 'Happy Robot must rescue a shut-down Mr. Computer');
assert.ok(app.includes('homeResidents'), 'entering a home must show its residents');

console.log('Mr. Computer battery, shared home, visible plaza, signed homes, and Mr. Tree decorations verified.');
