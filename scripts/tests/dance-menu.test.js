const test=require('node:test');
const assert=require('node:assert/strict');
const {step,countInAt}=require('../../dance-menu.js');
test('count-in presents 3 2 1 GO before the first musical beat',()=>{
 assert.equal(countInAt(-.01),'');
 assert.deepEqual([0,.5,1,1.5,2].map(t=>countInAt(t)),['3','2','1','GO','']);
});
test('entry, wrapped up/down selection, confirm and return',()=>{
 let state={page:'entry',index:0};
 state=step(state,'confirm',3);assert.equal(state.page,'songs');
 state=step(state,'up',3);assert.equal(state.index,2);
 state=step(state,'down',3);assert.equal(state.index,0);
 state=step(state,'down',3);state=step(state,'confirm',3);
 assert.deepEqual(state,{page:'play',index:1});
 state=step(state,'back',3);assert.equal(state.page,'songs');
 state=step(state,'back',3);assert.equal(state.page,'entry');
 state=step(state,'confirm',3);state=step(state,'left',3);assert.equal(state.index,0);
 state=step(state,'right',3);assert.equal(state.index,1);
});
test('empty libraries cannot start and a shrinking library clamps selection',()=>{
 assert.deepEqual(step({page:'songs',index:9},'confirm',0),{page:'songs',index:0});
 assert.deepEqual(step({page:'songs',index:9},'confirm',2),{page:'play',index:1});
});
