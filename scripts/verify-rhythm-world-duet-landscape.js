import assert from 'node:assert/strict';
import fs from 'node:fs';
import { getCelestialArcPosition } from '../rhythm-world/celestial-path.js';
import { MUSIC_PLAZA_POSITION, landmarkClearance } from '../rhythm-world/town-layout.js';

const sunrise = getCelestialArcPosition({ celestial: 'sun', travel: 0 });
const noon = getCelestialArcPosition({ celestial: 'sun', travel: .5 });
const sunset = getCelestialArcPosition({ celestial: 'sun', travel: 1 });
assert.ok(sunrise.y <= 1.5 && sunset.y <= 1.5, 'sun must touch the horizon at sunrise and sunset');
assert.ok(noon.y >= 11, 'sun must travel high through the sky');
assert.ok(sunrise.x < noon.x && noon.x < sunset.x, 'sun must cross the sky instead of staying still');
assert.ok(landmarkClearance(MUSIC_PLAZA_POSITION) >= 2, 'music plaza must not block homes, shops, or the main road');

const town = fs.readFileSync('rhythm-world/town-3d.js', 'utf8');
const page = fs.readFileSync('rhythm-world.html', 'utf8');
const app = fs.readFileSync('rhythm-world.js', 'utf8');
assert.ok(town.includes('createHills'), 'the world needs visible rolling hills');
assert.ok(page.includes('id="singTogether"'), 'nearby characters need a sing-together button');
assert.ok(app.includes('startDuet') && app.includes('stopDuet'), 'duet must have explicit start and stop behavior');
assert.ok(app.includes("audio.startCharacterLoop('duet-player',state.player.character)") && app.includes("audio.startCharacterLoop('duet-lead',target.id)"), 'duet must use audible character-specific sounds');
assert.ok(app.includes("engine.speakPlayer('啦～')") && app.includes("engine.speakNpc(activeDuet"), 'both characters need singing mouth motion');
assert.ok(app.includes("$('#interact').hidden=!play") && app.includes("$('#joystick').hidden=!play"), 'interaction and joystick controls must remain available');

console.log('Horizon sun arc, clear plaza, hills, and nearby duet controls verified.');
