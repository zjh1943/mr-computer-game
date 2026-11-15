const assert=require('node:assert/strict');
const game=require('../../computer-apps');
const song={bpm:120,notes:[],cameraSections:[{from:0,to:4,roles:['dad','gf']},{from:4,to:8,roles:['player']},{from:8,to:12,roles:['dad','player']}]};
assert.equal(typeof game.danceStandbyAt,'function');
assert(game.danceStandbyAt(song,2,'right'));
assert(!game.danceStandbyAt(song,6,'right'));
assert(!game.danceStandbyAt(song,10,'right'),'duets still require the player arrows');
assert(game.danceStandbyAt(song,6,'left'),'the other human also gets their idle-turn protection');
assert(!game.danceStandbyAt({...song,cameraSections:[{from:0,to:10,roles:['dad']}],notes:[{time:3.5,hold:2,hit:true}]},4.5,'right'),'a hold crossing into the opponent phrase still needs playing');
const source=require('../../dance-reference-data').tracks[0];
assert(game.danceStandbyAt(source,1,'right'),'the real Oren/Raddy opening is protected');
assert(!game.danceStandbyAt(source,4,'right'),'Simon entering with the other performers requires input');
for(let balance=100,i=0;i<100;i++){balance=game.standbyBattleBalance(balance);assert(balance>=50);}
assert.equal(game.standbyBattleBalance(50),50);
for(let balance=0,i=0;i<100;i++){balance=game.standbyBattleBalance(balance,'left');assert(balance<=50);}
assert.equal(game.standbyBattleBalance(50,'left'),50);
console.log('Opponent-only turns are protected, duet/hold turns remain playable, standby stops at equality.');
