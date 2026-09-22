const assert=require('node:assert/strict');
const {generateWorld,collides,validEdit,types}=require('../voxel-world.js');
const world=generateWorld();
assert(world.size>3000);
for(const type of ['grass','dirt','stone','wood','leaves','sand','water'])assert([...world.values()].includes(type),type);
assert.deepEqual([...generateWorld()], [...world]);
assert(collides(world,{x:0,y:-3,z:0}));
assert(!collides(world,{x:0,y:20,z:0}));
assert(validEdit([1,4,2,'glass']));assert(validEdit([1,4,2,null]));
assert(validEdit([500,1,-2000,'wood']),'Explored distant edits are valid');
for(const edit of [[1.2,1,1,'wood'],[Infinity,1,1,'wood'],[1,-65,1,null],[1,1,1,'unknown']])assert(!validEdit(edit));
assert(types.planks);
for(const dimension of ['nether','end']){
  const dimensionWorld=generateWorld(dimension);
  assert(dimensionWorld.size<15000,'Dimension generation must stay bounded');
  assert.equal(dimensionWorld.get('2,3,8'),'portal','Return portal must exist');
  assert(!collides(dimensionWorld,{x:.5,y:5,z:9.5}),'Arrival area must have headroom');
  assert([...dimensionWorld.values()].includes(dimension==='nether'?'lava':'obsidian'));
  assert.deepEqual([...dimensionWorld],[...generateWorld(dimension)]);
}
console.log('Terrain variety, deterministic generation, solid collision and save validation pass.');
