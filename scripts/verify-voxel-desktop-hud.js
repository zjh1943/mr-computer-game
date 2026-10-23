const assert = require('node:assert/strict');
const fs = require('node:fs');

const world = fs.readFileSync('voxel-world.js', 'utf8');
const css = fs.readFileSync('computer-apps.css', 'utf8');

assert.match(world, /class="voxel-hud"/, 'the 3D world should render a desktop game HUD');
assert.match(world, /data-voxel-health/, 'the HUD should expose pixel health hearts');
assert.match(world, /data-voxel-hunger/, 'the HUD should expose pixel hunger icons');
assert.match(world, /data-voxel-xp/, 'the HUD should expose an experience bar');
assert.match(world, /renderMeter\(healthMeter,health/, 'health changes should redraw the hearts');
assert.match(world, /renderMeter\(hungerMeter,hunger/, 'hunger changes should redraw the food meter');
assert.match(css, /\.voxel-hud\{/, 'the HUD needs its own in-world layout');
assert.match(css, /\.voxel-heart(?:,|\{)/, 'the HUD needs a pixel heart style');
assert.match(css, /\.voxel-drumstick(?:\{|,)/, 'the HUD needs a pixel food style');
assert.match(css, /\.voxel-xp-bar\{/, 'the HUD needs an experience bar style');
assert.match(css, /\.voxel-hotbar button\.selected:after/, 'the selected hotbar item should have a clear desktop slot frame');

console.log('Voxel desktop HUD verified.');
