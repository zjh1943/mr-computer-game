import assert from 'node:assert/strict';
import fs from 'node:fs';
import { CHARACTER_SOUND_PROFILES, getCharacterSoundProfile, notesForCharacter } from '../rhythm-world/character-sound.js';
import { CHARACTER_CATALOG } from '../rhythm-world/character-catalog.js';
import { ORIGINAL_THEME } from '../rhythm-world/music-score.js';

for (const character of CHARACTER_CATALOG) {
  const profile = getCharacterSoundProfile(character.id);
  assert.ok(profile, `${character.id} needs a dedicated sound profile`);
  assert.ok(['sine', 'square', 'sawtooth', 'triangle'].includes(profile.waveform));
  const notes = notesForCharacter(character.id);
  assert.ok(notes.length >= 6);
  assert.ok(notes.every(note => note.beat >= 0 && note.beat < ORIGINAL_THEME.steps && note.frequency > 30));
}
const signatures = Object.values(CHARACTER_SOUND_PROFILES).map(profile => JSON.stringify(profile));
assert.equal(new Set(signatures).size, CHARACTER_CATALOG.length, 'character timbres and rhythms must be individually recognizable');

const app = fs.readFileSync('rhythm-world.js', 'utf8');
const audio = fs.readFileSync('rhythm-world/audio.js', 'utf8');
assert.ok(audio.includes('startCharacterLoop'));
assert.ok(app.includes('autoJoinNearbySingers'));
assert.ok(app.includes('autoSingers'));
assert.ok(app.includes('audio.startCharacterLoop(`auto-${candidate}`'));
assert.ok(app.includes('engine.speakNpc(id'));

console.log('Dedicated original character sounds and automatic nearby chorus joining verified.');
