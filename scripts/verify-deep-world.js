const assert=require('node:assert/strict');
const terrain=require('../voxel-terrain.js');
const survival=require('../voxel-survival.js');
const {validEdit}=require('../voxel-world.js');
const world=new Map(),edits=new Map(),stream=terrain.createStream(world,edits,{oreAt:survival.oreAt});
stream.move(0,0);
assert(world.size<150000,'Deep terrain must keep the existing resident block budget');
for(let x=-10;x<10;x++)for(let z=-10;z<10;z++){assert.equal(world.get(`${x},-64,${z}`),'bedrock');assert.equal(world.get(`${x},-65,${z}`),undefined);}
let caves=0,solids=0;for(let y=-60;y<-8;y++)for(let x=-12;x<12;x++){if(terrain.caveAt(x,y,0)){caves++;assert.equal(world.get(`${x},${y},0`),undefined);}else{solids++;assert(world.has(`${x},${y},0`));}}
assert(caves>0&&solids>0);assert(validEdit([0,-64,0,null]));assert(!validEdit([0,-65,0,'stone']));
edits.set('0,-64,0',null);world.delete('0,-64,0');stream.move(400,400);stream.move(0,0);assert(!world.has('0,-64,0'));stream.dispose();
const pool=new Map([['0,3,0','water'],['0,0,0','stone']]),waterEdits=new Map(),queue=['0,3,0'];
assert(terrain.flowDown(pool,waterEdits,queue));assert.equal(pool.get('0,2,0'),'water');terrain.flowDown(pool,waterEdits,queue);terrain.flowDown(pool,waterEdits,queue);assert.equal(pool.get('0,1,0'),'water');assert.equal(pool.get('0,0,0'),'stone');assert(pool.has('1,1,0'),'Water must spread sideways on a solid floor');
(async()=>{
 const T=await import('../rhythm-world/vendor/three.module.min.js');const room=new Map();
 for(let x=-40;x<=40;x++)for(let z=-40;z<=40;z++)room.set(`${x},-20,${z}`,'stone');
 const scene=new T.Scene();let damage=0;const mobs=survival.create(T,scene,room,[],n=>damage+=n,()=>{},true);
 let skeleton=false,zombie=false,arrow=false;
 for(let i=0;i<500;i++){mobs.update(.05,{x:0,y:-19,z:0},false,true);skeleton ||= scene.children.some(g=>g.userData.mob?.type==='skeleton');zombie ||= scene.children.some(g=>g.userData.mob?.type==='monster');arrow ||= scene.children.some(g=>g.isMesh&&!g.userData.mob);}
 assert(skeleton&&zombie,'Underground mobs must spawn during daylight');assert(arrow,'Skeletons must launch visible projectiles');assert(damage>0,'Hostile attacks must cause damage');mobs.dispose();assert.equal(scene.children.length,0);
 console.log('64-deep bedrock, real caves, sparse memory, persisted holes, cave enemies and arrows passed.');
})().catch(e=>{console.error(e);process.exitCode=1});
