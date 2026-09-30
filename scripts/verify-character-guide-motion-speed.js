const assert = require('node:assert/strict');
const fs = require('node:fs');

const apps = fs.readFileSync('computer-apps.js', 'utf8');

assert(
  apps.includes('const characterFrameDuration=frameCount=>Math.max(110,Math.min(220,Math.round(2400/Math.max(1,frameCount))))'),
  'character guide animations should finish a cycle in about 2.4 seconds without flickering'
);

console.log('Character guide animation speed verified.');
