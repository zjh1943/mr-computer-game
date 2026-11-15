const assert=require('node:assert/strict');
const mobile=require('../../dance-mobile');
assert.equal(typeof mobile.isMobileWidth,'function');
for(const width of [320,390,700,768])assert(mobile.isMobileWidth(width));
for(const width of [769,1024,1920])assert(!mobile.isMobileWidth(width),'wide screens always keep the desktop layout');
assert.deepEqual(mobile.directions.map(d=>[d.lane,d.id]),[[0,'left'],[1,'down'],[2,'up'],[3,'right']]);
const events=[];
const input=mobile.createTouchInput(lane=>events.push(['hit',lane]),lane=>events.push(['release',lane]));
input.down(1,0);input.down(2,2);
input.up(1);
assert.deepEqual(events,[['hit',0],['hit',2],['release',0]],'releasing one finger must not release another direction');
input.down(3,2);input.up(2);
assert.equal(events.filter(e=>e[0]==='release'&&e[1]===2).length,0,'another finger still holds the up direction');
input.clear();
assert.deepEqual(events.at(-1),['release',2]);
assert.deepEqual(mobile.cameraPlacement('player'),{world:-58});
assert.deepEqual(mobile.cameraPlacement('rival'),{world:8});
assert.deepEqual(mobile.cameraPlacement('duet'),{world:-25});
for(const camera of ['player','rival','duet']){
 const shift=mobile.cameraPlacement(camera).world;
 const rival=76-50+shift,player=142-50+shift;
 assert.equal(player-rival,66,'both characters keep the same world-space separation during camera motion');
 if(camera==='player')assert(rival+32<=0);
 if(camera==='rival')assert(player>=100);
}
console.log('Four controls, independent multi-touch release, cleanup and mobile camera placement verified.');
