const assert = require('node:assert/strict');
const fs = require('node:fs');

const world = fs.readFileSync('voxel-world.js', 'utf8');

assert(world.includes("new T.WebGLRenderer({antialias:false"), 'voxel renderer should keep hard pixel edges');
assert(world.includes("renderer.domElement.style.imageRendering='pixelated'"), 'game canvas should request pixelated scaling');
assert(world.includes("const twoDTextureFiles="), '3D blocks should share the 2D texture source map');
assert(world.includes("new T.TextureLoader().load('./assets/minecraft-blocks/'"), 'block faces should load the existing 2D files directly');
assert(!world.includes('new T.CanvasTexture(canvas)'), '3D must not redraw the 2D block art');

console.log('Voxel gameplay pixel textures verified.');
