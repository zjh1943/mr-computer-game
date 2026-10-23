const assert = require('node:assert/strict');
const fs = require('node:fs');
const apps = require('../computer-apps.js');

const source = fs.readFileSync('computer-apps.js', 'utf8');
const css = fs.readFileSync('computer-apps.css', 'utf8');
const app = fs.readFileSync('app.js', 'utf8');

assert.deepEqual(apps.catalog.mixbox, ['合', '节奏盒子音乐站']);
assert(source.includes("function mixbox(host)"));
assert(source.includes("const safeIds=['oren','raddy','clukr','funbot','vineria','gray','brud','garnold','lime','sky','mr_sun','durple','mr_tree','simon','tunner','computer','wenda','pinki','jevin']"));
assert(!source.match(/safeIds=.*['"]black['"]/), 'Black must not be selectable in the safe music hub');
assert(source.includes("'打开节奏音乐跳舞游戏'"));
assert(source.includes("new CustomEvent('computer-open-app'"));
assert(app.includes('window.addEventListener("computer-open-app"'));
assert(css.includes('.mixbox-app'));
assert(source.includes("const lineup=Array(7).fill(null)"));
assert(!source.includes('const presets=['), 'the music desk must start as a blank drag-and-drop lineup');
assert(source.includes("card.addEventListener('dragstart'"));
assert(source.includes("card.addEventListener('drop'"));
assert(source.includes("className='mixbox-gray-person'"));
assert(css.includes('.mixbox-stage'));
assert(css.includes('grid-template-columns:repeat(19'), 'the character icons must stay in one scrollable bottom rack');
assert(css.includes('.mixbox-slot.is-playing'));
assert(css.includes('mixbox-gray-breathe'));
assert(css.includes('mixbox-gray-blink'));
assert(css.includes('@media(max-width:760px)'));

console.log('Safe offline Sprunki mixbox verified.');
