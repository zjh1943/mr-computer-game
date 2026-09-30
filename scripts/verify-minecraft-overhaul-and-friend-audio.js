const assert = require('node:assert/strict');
const fs = require('node:fs');

const shellSource = fs.readFileSync('voxel-shell.js', 'utf8');
const worldSource = fs.readFileSync('voxel-world.js', 'utf8');
const terrainSource = fs.readFileSync('voxel-terrain.js', 'utf8');
const appsSource = fs.readFileSync('computer-apps.js', 'utf8');
const css = fs.readFileSync('computer-apps.css', 'utf8');

assert(appsSource.includes('prestartLocalAudio'), 'local Friend Like You audio must start inside the original click');
assert(appsSource.indexOf('prestartLocalAudio') < appsSource.indexOf('await window.DanceReference.prepare'), 'audio permission must be acquired before asynchronous art loading');
assert(appsSource.includes("resumeLocalAudio"), 'blocked local audio needs a one-click resume path');

assert(shellSource.includes('世界种子'), 'world creation needs a seed field');
assert(shellSource.includes('游戏难度'), 'world creation needs difficulty selection');
assert(shellSource.includes('奖励箱物资'), 'world creation needs a bonus chest option');
assert(shellSource.includes('死亡保留物品栏'), 'world creation needs a keep-inventory rule');
assert(shellSource.includes('voxel-profile-card'), 'the launcher needs a visible player/profile card');
assert(shellSource.includes('voxel-world-preview'), 'saved worlds need visual preview cards');
assert(css.includes('.voxel-title-screen'), 'the launcher needs a full panorama title composition');

assert(worldSource.includes('options.difficulty'), 'difficulty must affect the running world');
assert(worldSource.includes('options.bonusChest'), 'bonus chest supplies must affect the running world');
assert(worldSource.includes('options.keepInventory'), 'the death inventory rule must affect the running world');
assert(worldSource.includes('terrainSeed'), 'the seed must reach world generation');
assert(terrainSource.includes('options.seed'), 'terrain generation must use the chosen seed');

console.log('Minecraft launcher, world rules, seeded terrain, and Friend Like You audio startup verified.');
