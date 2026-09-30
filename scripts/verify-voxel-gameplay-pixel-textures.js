const assert = require('node:assert/strict');
const fs = require('node:fs');

const world = fs.readFileSync('voxel-world.js', 'utf8');

assert(world.includes("new T.WebGLRenderer({antialias:false"), 'voxel renderer should keep hard pixel edges');
assert(world.includes("canvas.style.imageRendering='pixelated'"), 'game canvas should request pixelated scaling');
assert(world.includes("kind==='grass-top'"), 'grass needs a dedicated pixel top texture');
assert(world.includes("kind==='stone'"), 'stone needs its own texture instead of cobblestone');
assert(world.includes("kind.endsWith('ore')"), 'ores need embedded pixel clusters');
assert(world.includes("kind.endsWith('leaves')"), 'leaves need a leafy pixel pattern');
assert(world.includes("kind==='water'"), 'water needs a water-specific pixel pattern');
assert(world.includes("kind==='bedrock'"), 'bedrock needs a high-contrast pixel pattern');
assert(world.includes("materials.grass=[grassSide,grassSide,grassTop,materials.dirt"), 'grass faces must use side, top and dirt bottom textures');

console.log('Voxel gameplay pixel textures verified.');
