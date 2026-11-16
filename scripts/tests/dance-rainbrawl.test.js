const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const data=require('../../dance-reference-data');
const {orientedLane}=require('../../computer-apps');
test('authored playable lanes are not horizontally swapped a second time',()=>{
 assert.equal(orientedLane('player',0,true),0);assert.equal(orientedLane('player',3,true),3);
 assert.equal(orientedLane('player',0),3,'existing non-playable art keeps its prior orientation');
});
test('every source character has its real complete health-icon strip',()=>{
 for(const [id,art] of Object.entries(data.characters)){
  assert(art.icon,id);const png=fs.readFileSync(path.resolve(__dirname,'../..',art.icon.image));
  assert.equal(png.readUInt32BE(16),png.readUInt32BE(20)*art.icon.frames,id+' strip bounds');
 }
 assert.notEqual(data.characters.peter.icon.image,data.characters.carl.icon.image);
 assert(!data.tracks.some(t=>t.id.includes('pico')),'unrelated Pico-only crossover was removed');
});
test('Rainbrawl voices, source roles and normal ending are complete',()=>{
 const track=data.tracks.find(t=>t.id==='reference-rainbrawl');
 assert.deepEqual(Object.keys(data.characters.peter.animations),['idle','singDOWN','singUP']);
 assert(data.characters['vineria-playable'].animations.singLEFT);
 assert(data.characters.amy.animations['long rise']);
 assert(track);assert.equal(track.initial.player,'oren-playable');assert.equal(track.initial.dad,'peter');
 assert(track.events.some(e=>e.time===12&&e.side==='player'&&e.character==='vineria-playable'));
 assert(track.events.some(e=>e.time===12&&e.side==='dad'&&e.character==='carl'));
 assert(track.events.some(e=>e.time===120&&e.side==='player'&&e.character==='simon-angry'));
 for(const track of data.tracks.filter(t=>t.id.includes('rainbrawl'))){
  assert.equal(track.playbackDuration,228);
  assert(track.notes.length>1000);assert(track.notes.some(n=>n.hit)&&track.notes.some(n=>!n.hit));
  assert(track.notes.every(n=>n.time<228&&n.time+n.hold<=228.00001));
  assert(track.events.every(e=>e.time<228&&!e.character?.includes('horror')));
  assert(track.cameraSections.every(s=>s.from<s.to&&s.to<=228));
  for(const id of [track.initial.player,track.initial.dad,...track.events.map(e=>e.character).filter(Boolean)]){
   const art=data.characters[id];assert(art,id);assert(art.animations.idle,id+' idle');
   assert(Object.keys(art.animations).length>1,id+' source actions');
   assert(fs.existsSync(path.resolve(__dirname,'../..',art.image)),id+' atlas');
  }
  assert.equal(track.audioStems.length,3);for(const file of track.audioStems)assert(fs.existsSync(path.resolve(__dirname,'../..',file)),file);
 }
});
