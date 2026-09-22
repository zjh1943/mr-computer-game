const assert=require('node:assert/strict');
const {normalizeSettings,canCraft,recipes}=require('../voxel-shell.js');
assert.equal(normalizeSettings({fov:999,sensitivity:-5}).fov,100);
assert.equal(normalizeSettings({fov:999,sensitivity:-5}).sensitivity,.2);
assert.equal(normalizeSettings({}).fov,72);
assert(!canCraft({wood:0},recipes.planks));assert(canCraft({wood:1},recipes.planks));
assert(!canCraft({planks:2},recipes.pickaxe));
assert(canCraft({planks:5},recipes.pickaxe));
console.log('Settings limits and crafting resource requirements pass.');
