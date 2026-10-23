const assert = require('node:assert/strict');
const fs = require('node:fs');
const cast = require('../dance-cast.js');
const { tracks } = require('../dance-music.js');

const originalMix = tracks.find(track => track.originalMix);
assert(originalMix, 'the original ensemble must exist');
for (const id of ['mr_tree', 'computer']) {
  const stem = originalMix.mix.find(item => item.id === id);
  assert(stem, `${id} needs a voice stem in the original ensemble`);
  assert.equal(
    stem.audio,
    `./assets/sprunki-kiss-local/assets/${cast[id].sourceSounds[0]}`,
    `${id} must use the original source voice, not a synthesized replacement`
  );
  assert.equal(stem.beats, 8, `${id} source phrase must keep its original eight-beat length`);
}

const app = fs.readFileSync('computer-apps.js', 'utf8');
const css = fs.readFileSync('computer-apps.css', 'utf8');
const page = fs.readFileSync('computer.html', 'utf8');
const portal = fs.readFileSync('computer-portal.js', 'utf8');
assert(app.includes('长音保持中'), 'a held note needs a visible holding status');
assert(app.includes('changePlayerBalance(1)'), 'holding a long note needs to push the player progress forward');
assert(css.includes('[data-feedback="holding"]'), 'a held target needs a distinct visual state');
assert(css.includes('.dance-tutorial-character .dance-character-icon'), 'training characters need their front-facing original icon style');
assert(page.includes('computer-apps.js?v=20261023-arrows1'), 'the game must request the changed rhythm code, not an old browser copy');
assert(portal.includes("'?v='+revision"), 'the dance engine must request the matching current source files');

console.log('Original Mr. Tree and Mr. Computer voices, held-note status, progress boost, and front training icons verified.');
