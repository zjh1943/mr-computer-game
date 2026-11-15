const assert=require('node:assert/strict');
const game=require('../../computer-apps');
const tracks=require('../../dance-reference-data').tracks;
const song=tracks.find(t=>t.id==='reference-colorful-bunch');
const chart=game.battleChart(song);
// Converted archive: column 5 is always opponent, regardless of camera section.
assert(chart.opponent.some(n=>n.time===0&&n.lane===1&&n.side==='dad'),'Oren plays the instrumental opening');
assert(chart.opponent.some(n=>n.time===.22556&&n.side==='gf'),'Raddy joins on the opponent bank');
assert(!chart.player.some(n=>n.time<3.609),'Simon stays silent until his real vocal entrance');
// Archive: section 3 has two down notes at 3609.022ms on columns 5 and 1.
assert(chart.player.some(n=>n.time===3.60902&&n.lane===1));
assert(chart.opponent.some(n=>n.time===3.60902&&n.lane===1));
assert.equal(typeof game.referencePerformanceAt,'function');
assert.deepEqual(game.referencePerformanceAt(song,0).characters,['oren']);
assert.deepEqual(game.referencePerformanceAt(song,3.60902).characters.sort(),['oren','simon']);
const changed={bpm:120,initial:{player:'simon',dad:'oren',gf:'raddy'},events:[{time:2,side:'dad',character:'computer'}],notes:[{time:2,lane:0,side:'dad',hit:false,hold:1},{time:2,lane:2,side:'player',hit:true,hold:1}]};
assert.deepEqual(game.referencePerformanceAt(changed,2.5).characters.sort(),['computer','simon']);
assert.deepEqual(game.referencePerformanceAt(changed,3.2).characters,[],'finished sounds must not keep a singer in the camera');
console.log('Source input banks, GF performer, Simon/Oren duet and character changes verified.');
