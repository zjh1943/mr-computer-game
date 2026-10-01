const assert = require('node:assert/strict');
const fs = require('node:fs');

const world = fs.readFileSync('voxel-world.js', 'utf8');
const css = fs.readFileSync('computer-apps.css', 'utf8');

assert(world.includes('class="voxel-oxygen"'), 'the game view needs a water-breath HUD');
assert(world.includes('let oxygen=20,drownElapsed=0'), 'players need tracked underwater air');
assert(world.includes('oxygen=Math.max(0,oxygen-dt*1.35)'), 'air must drain while the head is underwater');
assert(world.includes("damage(2,'溺水')"), 'empty air must cause drowning damage');
assert(world.includes('oxygen=Math.min(20,oxygen+dt*8)'), 'air must quickly recover above water');
assert(css.includes('.voxel-oxygen'), 'the air bubbles need visible HUD styling');

console.log('Underwater oxygen, recovery, and drowning verified.');
