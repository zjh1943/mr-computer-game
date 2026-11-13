const assert = require('node:assert/strict');
const fs = require('node:fs');

const app = fs.readFileSync('computer-apps.js', 'utf8');
const css = fs.readFileSync('computer-apps.css', 'utf8');

assert(app.includes("dance-spectator"), 'the safe stage needs a small gray spectator');
assert(app.includes("spectator.classList.toggle('is-watching-player'"), 'the spectator should look toward the active singer');
assert(app.includes('spectator.hidden=true'), 'the small gray spectator is hidden unless a character is moving or swapping');
assert(css.includes('.dance-spectator{'), 'the spectator needs a stage position');
assert(css.includes('@keyframes dance-spectator-blink'), 'the spectator needs a blinking animation');
assert(css.includes('.dance-targets img{'), 'the fixed arrow receptors should keep their image frame layout');
assert.match(css, /\.dance-targets img\{[^}]*image-rendering:pixelated/, 'the fixed arrow receptors should keep crisp pixels');
assert(css.includes('.dance-stage:not(.friend-safe-stage) .dance-bank{width:82%;justify-self:center}'), 'normal FNF arrow groups must keep their four lanes close together without squashing arrow artwork');
assert(css.includes('.dance-stage.dance-camera-player'), 'portrait play needs a player-side camera state');
assert(css.includes('.dance-stage.dance-camera-rival'), 'portrait play needs a rival-side camera state');
assert(css.includes('.dance-stage.dance-camera-duet'), 'portrait play needs a centered duet camera state');
assert.doesNotMatch(app, /!customMotion&&sprite\.classList\.contains\('dance-original'\)/, 'normal singing should use directional body movement, not stay still');

console.log('Dance spectator and crisp arrow receptors verified.');
