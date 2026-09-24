const assert=require('node:assert/strict');
const {battleChart}=require('../computer-apps.js');
const {tracks}=require('../dance-reference-data.js');
for(const song of tracks){const b=battleChart(song);assert.equal(b.player.length+b.opponent.length,song.notes.length);assert(b.player.length>100&&b.opponent.length>100);assert(b.player.every(n=>n.hit??n.side==='player'));assert(b.opponent.every(n=>!(n.hit??n.side==='player')));assert(b.opponent.every(n=>n.done===false));}
const b=battleChart({bpm:120,duration:20});assert(b.player.length&&b.opponent.length);assert(b.player.every(n=>!b.opponent.some(o=>o.time===n.time)));assert(b.opponent[0].time<b.player[0].time);
console.log('Original scores keep all notes on their correct side; generated scores alternate four-beat turns.');
