import assert from'node:assert/strict';
import{pickInteractable,hitTestInteractable}from'../rhythm-world/interactions.js';

const player={x:0,y:0};
const entities=[
  {kind:'resident',id:'simon',x:145,y:0,label:'西蒙'},
  {kind:'shop',x:260,y:0,label:'节拍商店'},
  {kind:'music',x:0,y:275,label:'音乐广场'}
];
assert.equal(pickInteractable(player,entities,180)?.id,'simon','角色在可见互动距离内应被锁定');
assert.equal(hitTestInteractable({x:258,y:4},entities,85)?.kind,'shop','直接点击商店应命中商店');
assert.equal(hitTestInteractable({x:3,y:271},entities,85)?.kind,'music','直接点击音乐广场应命中音乐广场');
assert.equal(pickInteractable(player,entities,100),null,'超出互动距离不应误触');
console.log('Runtime interaction targeting verification passed.');
