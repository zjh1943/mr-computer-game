const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { games, gameUrl } = require('../home-data.js');

const rhythmWorld = games.find(game => game.id === 'world');
assert.equal(
  gameUrl(rhythmWorld),
  './rhythm-world.html',
  'GitHub Pages must open the real rhythm world file instead of a server-only clean route'
);
const index = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
assert.match(index, /home-data\.js\?v=20261113-rhythm-entry/);

console.log('GitHub Pages rhythm-world entry verification passed.');
