const assert=require('node:assert/strict');
const {danceVisualProfile,noteTravelBounds}=require('../computer-apps.js');

const friend=danceVisualProfile({id:'friend-like-you',friendLikeYou:true,cast:['mr_tree','computer','black']});
assert.equal(friend.cover,'./assets/friend-like-you/stage-day.png');
assert.deepEqual(friend.coverCast,['mr_tree','computer']);
assert.equal(friend.arrowScale,.56);
assert.equal(friend.maxArrowSize,46);
assert.equal(friend.receptorRatio.player,.17);
assert.equal(friend.receptorRatio.opponent,.17);
assert.equal(friend.flow.player,'up');
assert.equal(friend.flow.opponent,'up');

const player=noteTravelBounds('player',300,40,true,friend);
const opponent=noteTravelBounds('opponent',300,40,true,friend);
assert(Math.abs(player.target-51)<1e-9,'the player receptor is at the top of the Friend Like You field');
assert(Math.abs(opponent.target-51)<1e-9,'the opponent receptor is at the top of the Friend Like You field');
assert(player.start>300&&opponent.start>300,'both Friend Like You arrow fields enter from below');

const normal=danceVisualProfile({id:'practice'});
assert(normal.cover.includes('background-1.png'));
assert.equal(normal.arrowScale,.72);
console.log('Dance covers and FNF arrow scale / receptor calibration verified.');
