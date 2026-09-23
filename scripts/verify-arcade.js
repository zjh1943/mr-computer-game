const assert=require('node:assert/strict');const {slide,move2048,winner}=require('../arcade-games');
assert.deepEqual(slide([2,2,2,2]),{line:[4,4,0,0],score:8});assert.deepEqual(slide([2,2,4,0]),{line:[4,4,0,0],score:4});assert.deepEqual(slide([0,4,0,4]),{line:[8,0,0,0],score:8});
const board=[2,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0];const before=board.slice();assert.equal(move2048(board,1).board[0],4);assert.equal(move2048(board,3).board[12],4);assert.equal(move2048(board,0).changed,false);assert.deepEqual(board,before);
assert.equal(winner(['X','O','','','X','O','','','X']),'X');assert.equal(winner(['X','O','X','X','O','O','O','X','X']),'draw');assert.equal(winner(['X','','','','','','','','']),null);
console.log('2048 merge-once, scores, movement, immutability; tic-tac-toe win/draw passed');
