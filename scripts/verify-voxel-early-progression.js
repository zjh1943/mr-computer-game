const assert = require('node:assert/strict');
const shell = require('../voxel-shell.js');
const rules = require('../voxel-rules.js');
const survival = require('../voxel-survival.js');
const worldSource = require('node:fs').readFileSync('voxel-world.js', 'utf8');

assert.deepEqual(shell.recipes.stick, {
  name: '木棒 ×4', cost: { planks: 2 }, output: 'stick', amount: 4,
});
assert.deepEqual(shell.recipes.pickaxe.cost, { planks: 3, stick: 2 });
assert.deepEqual(shell.recipes.woodaxe.cost, { planks: 3, stick: 2 });
assert.deepEqual(survival.recipes.stonepickaxe.cost, { cobblestone: 3, stick: 2 });
assert.deepEqual(survival.recipes.stoneaxe.cost, { cobblestone: 3, stick: 2 });

assert(rules.pocket.has('stick'), 'sticks should fit in the four-slot inventory crafting grid');
assert(!rules.pocket.has('pickaxe'), 'tools should require the 3x3 workbench');

const pickPattern = shell.recipeCells(shell.recipes.pickaxe).map(cell => cell?.type || null);
assert.deepEqual(pickPattern, [
  'planks', 'planks', 'planks',
  null, 'stick', null,
  null, 'stick', null,
]);

assert(rules.mining('wood', 'woodaxe', false).seconds < rules.mining('wood', null, false).seconds);
assert(rules.mining('wood', 'stoneaxe', false).seconds < rules.mining('wood', 'woodaxe', false).seconds);
assert.equal(rules.mining('stone', 'pickaxe', false).drop, true);
assert.equal(rules.mining('stone', null, false).drop, false);

assert(worldSource.includes("type==='stone'?'cobblestone'"), 'mined stone should drop cobblestone');
assert(worldSource.includes("if(!interact())act(true)"), 'desktop right-click should use workbenches and beds before placing');

console.log('Early survival progression, tool recipes, mining and right-click interaction verified.');
