const assert=require('node:assert/strict');
const game=require('../../computer-apps');
assert.deepEqual(game.danceDifficulties.map(d=>[d.id,d.missLimit,d.hitPoints]),[['easy',7,2],['normal',5,2],['extreme',3,1]]);
for(const rule of game.danceDifficulties){
 let state=game.danceDifficultyState(rule.id);
 for(let i=1;i<rule.missLimit;i++){state=game.judgeDanceDifficulty(state,false,rule.id);assert(!state.dead);}
 state=game.judgeDanceDifficulty(state,false,rule.id);assert(state.dead);
 let recovered=game.judgeDanceDifficulty(game.judgeDanceDifficulty(game.danceDifficultyState(rule.id),false,rule.id),true,rule.id);
 assert.equal(recovered.score,rule.hitPoints-1);
 assert.equal(recovered.health,rule.missLimit);
}
console.log('Exact easy/normal/extreme miss limits, per-hit points and recovery verified.');
