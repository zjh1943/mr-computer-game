const assert=require('node:assert/strict');
(async()=>{
 const T=await import('../rhythm-world/vendor/three.module.min.js'),s=require('../voxel-survival.js'),t=require('../voxel-terrain.js');
 const world=new Map(),edits=new Map(),stream=t.createStream(world,edits),scene=new T.Scene();stream.move(210,0);
 const material=new T.MeshLambertMaterial({color:'#ff3355'});
 const mobs=s.create(T,scene,world,[],()=>{},()=>{},true,{biomeAt:t.biomeAt,materials:{redgrass:material}});
 for(let i=0;i<100;i++)mobs.update(.1,{x:210,y:2,z:0},false,false);
 assert(mobs.snapshot().some(m=>m.type==='slime'),'Sulphur biome must repopulate with slimes');
 const slime=scene.children.find(g=>g.userData.mob?.type==='slime');scene.updateMatrixWorld(true);
 const ray=new T.Raycaster(slime.position.clone().add(new T.Vector3(0,.6,2)),new T.Vector3(0,0,-1),0,4);
 assert(!mobs.absorb(ray,.1,'redgrass'),'Walls block absorption');assert(mobs.absorb(ray,Infinity,'redgrass'));
 assert(mobs.snapshot().some(m=>m.disguise==='redgrass'));
 assert.equal(slime.userData.mob.body.material,material);
 const restored=s.create(T,new T.Scene(),world,JSON.parse(JSON.stringify(mobs.snapshot())),()=>{},()=>{},true,{biomeAt:t.biomeAt,materials:{redgrass:material}});
 assert(restored.snapshot().some(m=>m.disguise==='redgrass'),'Absorbed material must survive save/reload');restored.dispose();
 let total=0;for(let trip=0;trip<16;trip++){const x=210+trip*2048;stream.move(x,0);for(let i=0;i<40;i++)mobs.update(.1,{x,y:2,z:0},true,false);total+=mobs.count();assert(mobs.count()<250);}
 assert(total>48,'Lifetime spawning must continue beyond a single resident population');
 stream.move(0,0);for(let i=0;i<3600;i++)mobs.update(.05,{x:0,y:3,z:0},true,true);
 assert(mobs.count()<250,'Long stationary nights must use local density, not accumulate an unbounded crowd');
 mobs.dispose();assert.equal(scene.children.length,0);material.dispose();stream.dispose();
 console.log('Renewable biome spawning, far despawn, slime absorption/occlusion and cleanup pass.');
})().catch(e=>{console.error(e);process.exitCode=1;});

