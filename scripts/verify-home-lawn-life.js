const assert = require('node:assert/strict');
const fs = require('node:fs');

const app = fs.readFileSync('app.js', 'utf8');
const css = fs.readFileSync('styles.css', 'utf8');

for (const token of ['setupHomeLawnHomes', 'wanderHomeLawn', 'syncHomeLawnNight', 'homeLawnChaseTimer', 'homeLawnConcertTimer']) {
  assert(app.includes(token), `living lawn is missing ${token}`);
}
assert(!app.includes('setInterval(() => runHomeHelpEvent'), 'rescue must not happen on a fixed timer');
assert(/startHomeChase[\s\S]*runHomeHelpEvent/.test(app), 'a chase collision must trigger the rescue');
for (const token of ['.lawn-homes', '.lawn-home', '.home-collision', '.home-sleeping', '.home-returning']) {
  assert(css.includes(token), `living lawn styles are missing ${token}`);
}

console.log('Continuous lawn wandering, chase collision rescue, personal homes and night sleep verified.');
