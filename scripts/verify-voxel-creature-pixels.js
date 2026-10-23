const assert = require('node:assert/strict');
const fs = require('node:fs');

const survival = fs.readFileSync('voxel-survival.js', 'utf8');

assert.match(survival, /const pixelFace=/, 'creatures should use reusable pixel face pieces');
assert.match(survival, /type==='sheep'.*mats\.wool/, 'sheep should keep a wool body');
assert.match(survival, /type==='pig'.*mats\.pig/, 'pigs should use a distinct pink body');
assert.match(survival, /type==='villager'.*mats\.robe/, 'villagers should keep their robe silhouette');
assert.match(survival, /pixelFace\(type, (?:body|head)\)/, 'each creature should receive a face matching its type');
assert.match(survival, /mats\.eye/, 'eyes should be a dedicated dark pixel material');

console.log('Voxel creature pixel appearances verified.');
