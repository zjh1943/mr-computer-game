const assert = require('node:assert/strict');
const fs = require('node:fs');

const app = fs.readFileSync('computer-apps.js', 'utf8');
const css = fs.readFileSync('computer-apps.css', 'utf8');

assert(app.includes('const isHorror=()=>document.body.classList.contains(\'terror-night\')'), 'Mixbox should read the shared terror-night switch');
assert(app.includes('new MutationObserver(refreshHorror)'), 'Mixbox should refresh without resetting the lineup when terror night changes');
assert(app.includes('const pyramixedMotion=['), 'Pyramixed should have a named multi-pose animation sequence');
assert(app.includes("pose:'turn-back'"), 'Pyramixed motion should include a back-facing turn');
assert(app.includes("card.classList.toggle('is-horror',isHorror())"), 'Stage characters should receive the horror state');
assert(css.includes('.mixbox-app.is-horror-original'), 'Original horror mode needs its own visual treatment');
assert(css.includes('.mixbox-app.is-horror-pyramixed'), 'Pyramixed horror mode needs its own visual treatment');
assert(css.includes('.mixbox-slot[data-pose="sing-left"] img'), 'Directional singing needs an explicit pose style');

console.log('Mixbox horror switching and Pyramixed motion verified.');
