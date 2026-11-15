const assert=require('node:assert/strict');
const tracks=require('../../dance-reference-data').tracks;
const game=require('../../computer-apps');
const song=tracks.find(t=>t.id==='reference-colorful-bunch');
// psych_v1_convert columns are absolute: 0..3 player, 4..7 opponent.
// The actual Voices-Player file is silent until the first Simon note at 3.609s.
assert.equal(song.chartFormat,'psych_v1_convert');
assert.deepEqual(song.notes.slice(0,4).map(n=>[n.time,n.side,n.hit]),[
  [0,'dad',false],[.22556,'gf',false],[.33835,'gf',false],[.45113,'dad',false]
]);
assert(game.battleChart(song).player.every(n=>n.time>=3.609));
assert.deepEqual(game.referencePerformanceAt(song,0).characters,['oren']);
assert.deepEqual(game.referencePerformanceAt(song,3.60902).characters.sort(),['oren','simon']);
let previous,changes=0;
for(let frame=0;frame<12*60;frame++){
  const camera=game.referenceCameraAt(song,frame/60);
  if(previous&&camera!==previous)changes++;
  previous=camera;
}
assert(changes<=6,'the camera follows phrases instead of bouncing on every note');
for(const track of tracks){
  assert.equal(track.chartFormat,'psych_v1_convert');
  assert(track.notes.filter(n=>n.side==='player').every(n=>n.hit));
  assert(track.notes.filter(n=>n.side==='dad').every(n=>!n.hit));
}
console.log('Converted chart columns agree with the real Simon vocal entrance and Oren/Raddy instrumental opening.');
