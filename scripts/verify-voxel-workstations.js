const assert=require('node:assert/strict'),w=require('../voxel-workstations.js');
const world=new Map([['0,0,0','lever_on']]);for(let i=1;i<20;i++)world.set(`${i},0,0`,'wire');world.set('5,0,1','lamp');
let power=w.signal(world);assert(power.has('5,0,1'));assert(!power.has('15,0,0'));world.set('0,0,0','lever');assert.equal(w.signal(world).size,0);
const inv={wheat:12},box={};assert.equal(w.transfer(inv,box,'wheat',5),5);assert.equal(inv.wheat+box.wheat,12);assert.equal(w.transfer(box,inv,'wheat',100),5);assert(w.trade(inv,0));assert.equal(inv.wheat,6);assert.equal(inv.emerald,1);assert(w.trade(inv,1));assert.equal(inv.bread,3);assert(!w.trade(inv,3));
assert(w.nonSolid.has('crop'));assert.equal(w.baseType('lamp_on'),'lamp');console.log('Redstone decay/off, chest conservation, trading costs and block states pass');
const farm=new Map([['0,1,0','crop']]),ages={'0,1,0':0},edits=new Map();assert(!w.grow(farm,ages,59,edits));assert(w.grow(farm,ages,1,edits));assert.equal(farm.get('0,1,0'),'ripe');assert.equal(edits.get('0,1,0'),'ripe');assert.equal(Object.keys(ages).length,0);
const unloaded=new Map(),remoteAge={'500,1,500':20};unloaded.isLoaded=()=>false;w.grow(unloaded,remoteAge,10,new Map());assert.equal(remoteAge['500,1,500'],20,'Unloading a crop must preserve its age');
