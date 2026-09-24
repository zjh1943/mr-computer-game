const assert=require('node:assert/strict');
const {battleChart,soloChart,orientedLane,stageSunVisible,grade}=require('../computer-apps.js');
const {tracks}=require('../dance-reference-data.js');
for(const song of tracks){const b=battleChart(song);assert.equal(b.player.length+b.opponent.length,song.notes.length);assert(b.player.length>100&&b.opponent.length>100);assert(b.player.every(n=>n.hit??n.side==='player'));assert(b.opponent.every(n=>!(n.hit??n.side==='player')));assert(b.opponent.every(n=>n.done===false));}
assert(soloChart(tracks[0]).length>100);
assert(soloChart(tracks[0]).every(n=>n.hit??n.side==='player'));
assert.equal(soloChart(tracks[1]).length,0);
const b=battleChart({bpm:120,duration:20});assert(b.player.length&&b.opponent.length);assert(b.player.every(n=>!b.opponent.some(o=>o.time===n.time)));assert(b.opponent[0].time<b.player[0].time);
assert.deepEqual([0,1,2,3].map(lane=>orientedLane('opponent',lane)),[0,1,2,3]);
assert.deepEqual([0,1,2,3].map(lane=>orientedLane('player',lane)),[3,1,2,0]);
assert.equal(grade(.24),60);
assert.equal(grade(.29),0);
assert.equal(stageSunVisible(['oren','raddy']),true);
assert.equal(stageSunVisible(['oren','mr_sun']),false);
console.log('Original scores keep all notes on their correct side; generated scores alternate four-beat turns.');
