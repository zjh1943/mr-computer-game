const assert = require('node:assert/strict');
const fs = require('node:fs');

const world = fs.readFileSync('voxel-world.js', 'utf8');

for (const entry of [
  "grass:'grass'", "dirt:'dirt'", "stone:'cobblestone'", "sand:'sand'",
  "wood:'oak-log'", "leaves:'mossy-dirt'", "water:'blue-ice'", "lava:'red-sand'",
  "bed:'white-wool'", "workbench:'oak-planks'", "netherrack:'red-sand'",
  "endstone:'end-stone'", "obsidian:'obsidian'", "bedrock:'bedrock'"
]) assert(world.includes(entry), `3D world must reuse the 2D mapping ${entry}`);

assert(world.includes("const twoDTextureFiles="), 'the 3D renderer needs one explicit 2D texture map');
assert(!world.includes("drawImage(image,0,0,16,16)"), '2D textures must not be redrawn or reduced by the 3D renderer');
assert(!world.includes("if(kind==='grass-top')"), '3D must not invent a separate generated grass top');

console.log('3D voxel renderer reuses the 2D block textures directly.');
