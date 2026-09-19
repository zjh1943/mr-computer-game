import assert from 'node:assert/strict';
import { ORIGINAL_THEME, notesForKind } from '../rhythm-world/music-score.js';

assert.equal(ORIGINAL_THEME.tempo, 108);
assert.ok(ORIGINAL_THEME.steps >= 16, 'original town theme needs a complete musical phrase');
for (const kind of ['beat', 'melody', 'voice', 'effect', 'whistle']) {
  const notes = notesForKind(kind);
  assert.ok(notes.length >= 4, `${kind} needs a recognizable repeating part`);
  assert.ok(notes.every(note => Number.isFinite(note.beat) && Number.isFinite(note.frequency)));
}
assert.notDeepEqual(notesForKind('melody'), notesForKind('voice'));
console.log('Original Sprunki-inspired music arrangement verification passed.');
