const assert=require('node:assert/strict');
const {inventorySlots,recipeCells,recipes,canCraft}=require('../voxel-shell.js');
const original={wood:129,stone:2,apple:0};
assert.deepEqual(inventorySlots(original),[{type:'wood',count:64},{type:'wood',count:64},{type:'wood',count:1},{type:'stone',count:2}]);
assert.equal(original.wood,129);
assert.deepEqual(inventorySlots({wood:-1,stone:NaN}),[]);
for(const r of Object.values(recipes)){
  const cells=recipeCells(r);assert.equal(cells.length,9);
  const totals={};for(const c of cells.filter(Boolean))totals[c.type]=(totals[c.type]||0)+c.count;assert.deepEqual(totals,r.cost);
  assert(canCraft({...r.cost,...(r.requires?{[r.requires]:1}:{})},r));
  assert(!canCraft({},r));
}
assert(!canCraft({ironore:2,coal:1},recipes.iron));assert(canCraft({ironore:2,coal:1,furnace:1},recipes.iron));
const {chart,matchesSong,audioFileAllowed}=require('../computer-apps.js');
assert(matchesSong({name:'My SPRUNKI Song'},'sprunki',true));assert(!matchesSong({name:'练习曲'},'',true));
assert(audioFileAllowed({name:'SPRUNKI.MP3',size:1024}));assert(!audioFileAllowed({name:'SPRUNKI.lnk',size:1024}));assert(!audioFileAllowed({name:'SPRUNKI.mp3',size:26*1024*1024}));
for(const duration of [4,30,300,900]){const notes=chart({bpm:120,duration});assert(notes.length>0);assert(notes.every(n=>n.time>=2&&n.time<duration));assert(notes.length<=1800);}
console.log('Inventory stacking, recipe materials, furnace requirements, song filtering, file limits and full-length charts passed.');
