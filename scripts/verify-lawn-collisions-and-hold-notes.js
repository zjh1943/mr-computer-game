const assert = require('node:assert/strict');
const fs = require('node:fs');

const app = fs.readFileSync('app.js', 'utf8');
const dance = fs.readFileSync('computer-apps.js', 'utf8');

assert(app.includes('HOME_LAWN_COLLISION_CHANCE = 0.1'), 'chase collisions must be rare');
assert(app.includes('HOME_LAWN_CHASE_MIN_DELAY = 22000'), 'chases must not restart every few seconds');
assert(app.includes('HOME_LAWN_CHASE_DELAY_RANGE = 26000'), 'chase timing needs a natural random range');
assert(app.includes('scheduleHomeLawnChase'), 'the next chase must be scheduled after the current one');
assert(!app.includes('setInterval(() => startHomeChase'), 'a fixed chase interval causes repeated rescues');
assert(app.includes('const collided = Math.random() < HOME_LAWN_COLLISION_CHANCE'), 'only rare chases may collide');
assert(app.includes('跑开啦，下次再追！'), 'ordinary chases must finish without rescue');

assert(dance.includes('drawHoldTail'), 'long notes need one continuous tail');
assert(/drawHoldTail\(playerG,n\.lane[\s\S]*n\.hold/.test(dance), 'the chart hold duration must determine tail length');
assert(dance.includes('colorizeDanceArrow'), 'raw RGB-mask arrows must be converted to their four video colors');
assert(dance.includes("selected?.id==='reference-colorful-bunch-erect'"), 'the third song must use normal colored characters');
assert(dance.includes('dance-normal-character'), 'the third song needs a normal-character renderer');

console.log('Rare lawn collisions, continuous hold tails, and normal third-song characters verified.');
