const assert = require('node:assert/strict');
const fs = require('node:fs');

const app = fs.readFileSync('computer-apps.js', 'utf8');
const css = fs.readFileSync('computer-apps.css', 'utf8');

assert(app.includes("mixbox-version"), 'the music station should show the selected version');
assert(app.includes("ComputerSettings?.characterView?.('pyramixed'"), 'Pyramixed performers need real directional view files');
assert(app.includes("['front','left','front','right','back','front']"), 'Pyramixed performers should turn through front, both sides and back');
assert(app.includes("mixbox-computer-caption"), 'Mr. Computer needs a singing screen caption in the music station');
assert(css.includes('.mixbox-version{'), 'the version bar needs its own layout');
assert(css.includes('.mixbox-slot[data-view="left"] img'), 'side-view performer states need a visual transition');
assert(css.includes('.mixbox-computer-caption{'), 'the singing caption needs a screen style');

console.log('Mixbox versions, directional performers and computer captions verified.');
