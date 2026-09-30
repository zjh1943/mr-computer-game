const assert = require('node:assert/strict');
const fs = require('node:fs');

const shell = fs.readFileSync('voxel-shell.js', 'utf8');
const world = fs.readFileSync('voxel-world.js', 'utf8');

assert(!shell.includes('classic.minecraft.net'), 'the 3D game must not embed the official web game');
assert(!shell.includes('官方网页版（联网）'), 'the extra official-web button must be removed');
assert(shell.includes('function startImmediately()'), 'opening the app must have a direct-play path');
assert(shell.includes('startImmediately();return'), 'mounting the app must enter the world immediately');
assert(shell.includes("name:'方块世界'"), 'first launch needs a local default world');
assert(!shell.includes('保存并返回开始页面'), 'pause must not return to the removed title screen');
assert(world.includes("'grass-side':['#866043'"), 'grass sides need a dedicated low-resolution block palette');
assert(world.includes("dirt:['#866043'"), 'dirt needs a dedicated low-resolution block palette');
assert(world.includes("if(kind==='grass-side')"), 'grass side needs a green top strip over dirt');
assert(world.includes("if(kind==='planks'||kind==='darkplanks')"), 'planks need a recognizable 16x16 plank pattern');
assert(!world.includes("new T.ImageLoader().load('./assets/minecraft-blocks/'"), '3D world textures must be drawn at native 16x16 instead of shrinking high-resolution images');

console.log('Direct-play voxel world and native 16x16 block textures verified.');
