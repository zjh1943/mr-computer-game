const test=require('node:test');const assert=require('node:assert/strict');
const {deviceLayout,createDualTouchInput,cameraPlacement}=require('../../dance-mobile');
test('tablet touch screens get bottom banks while mouse desktops keep their layout',()=>{
 assert.equal(deviceLayout(390,true),'mobile');assert.equal(deviceLayout(768,true),'mobile');
 assert.equal(deviceLayout(1024,true),'tablet');assert.equal(deviceLayout(1366,true),'tablet');
 assert.equal(deviceLayout(1024,false),'desktop');assert.equal(deviceLayout(1920,true),'desktop');
});
test('two players can hold the same direction without sharing releases or scores',()=>{
 const events=[];const controls=createDualTouchInput(n=>events.push(['right',n]),n=>events.push(['rightUp',n]),n=>events.push(['left',n]),n=>events.push(['leftUp',n]));
 controls.left.down(1,0);controls.right.down(2,0);controls.left.up(1);
 assert.deepEqual(events,[['left',0],['right',0],['leftUp',0]]);assert(controls.right.held(0));
 controls.clear();assert.deepEqual(events.at(-1),['rightUp',0]);
 assert.deepEqual(cameraPlacement('player',true),cameraPlacement('duet'));
});
