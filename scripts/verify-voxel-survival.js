const assert=require('node:assert/strict');
const s=require('../voxel-survival.js');
assert.equal(s.LIMITS.worldRadius,40);
assert.equal(s.miningTier({}),0);assert.equal(s.miningTier({pickaxe:1}),1);assert.equal(s.miningTier({stonepickaxe:1}),2);assert.equal(s.miningTier({ironpickaxe:1}),3);
assert.equal(s.requiredTier('diamondore'),3);assert.equal(s.incomingDamage(4,{armor:1}),2);
const ores=new Set();for(let x=-16;x<=16;x++)for(let z=-16;z<=16;z++)for(let y=-7;y<0;y++)ores.add(s.oreAt(x,y,z));
for(const name of ['coalore','ironore','diamondore'])assert(ores.has(name));
assert.equal(s.recipes.iron.requires,'furnace');
console.log('Bounded creature limits, ore distribution, tool tiers, armor and furnace recipes pass.');
(async()=>{
  const T=await import('../rhythm-world/vendor/three.module.min.js');
  const world=require('../voxel-world.js').generateWorld();
  const scene=new T.Scene();let drops=0,damage=0;
  const remote=s.create(T,new T.Scene(),require('../voxel-world.js').generateWorld('nether'),[],()=>{},()=>{},false);
  assert.equal(remote.count(),0,'Other dimensions must not create overworld villagers');remote.dispose();
  const canopy=new Map();for(let x=-5;x<=5;x++)for(let z=-5;z<=5;z++){canopy.set(`${x},0,${z}`,'grass');canopy.set(`${x},5,${z}`,'leaves');}
  const walker=s.create(T,new T.Scene(),canopy,[{type:'sheep',x:0,z:0,hp:4}],()=>{},()=>{});
  assert.equal(walker.count(),1,'An animal under leaves must not be discarded');
  for(let i=0;i<100;i++)walker.update(.05,{x:12,y:1,z:12},false,false);
  const walked=walker.snapshot()[0];assert(Math.hypot(walked.x,walked.z)>.5,'Animals must visibly move under tree canopies');walker.dispose();
  const mobs=s.create(T,scene,world,undefined,n=>damage+=n,()=>drops++);
  assert.equal(mobs.count(),7);
  const trader=scene.children.find(g=>g.userData.mob?.type==='villager');scene.updateMatrixWorld(true);
  const tradeRay=new T.Raycaster(trader.position.clone().add(new T.Vector3(0,1.3,2)),new T.Vector3(0,0,-1),0,4);
  assert(mobs.tradeTarget(tradeRay,Infinity));assert(!mobs.tradeTarget(tradeRay,.1),'Cannot trade through a closer wall');
  const first=scene.children[0];scene.updateMatrixWorld(true);
  const ray=new T.Raycaster(first.position.clone().add(new T.Vector3(0,.7,2)),new T.Vector3(0,0,-1),0,3);
  assert(mobs.hit(ray,Infinity,4));assert.equal(drops,1);assert.equal(mobs.snapshot().length,6);
  for(let cycle=0;cycle<25;cycle++){
    mobs.update(.05,{x:0,y:2,z:9},true,true);assert(mobs.count()<250);
    mobs.update(.05,{x:0,y:2,z:9},false,true);assert(mobs.count()>=6&&mobs.count()<250);
  }
  const geometries=new Set(),materials=new Set();scene.traverse(o=>{if(o.geometry)geometries.add(o.geometry);if(o.material)materials.add(o.material);});
  let disposed=0;for(const resource of [...geometries,...materials])resource.addEventListener('dispose',()=>disposed++);
  mobs.dispose();assert.equal(scene.children.length,0);assert.equal(disposed,geometries.size+materials.size);
  const {canCraft}=require('../voxel-shell.js');assert(!canCraft({ironore:2,coal:1},s.recipes.iron));assert(canCraft({ironore:2,coal:1,furnace:1},s.recipes.iron));
  console.log(`25 day/night cycles remain bounded; combat drops work; all ${disposed} visible shared GPU resources released.`);
})().catch(e=>{console.error(e);process.exitCode=1;});

