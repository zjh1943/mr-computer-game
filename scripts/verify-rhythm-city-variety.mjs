import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createCityPlan } from '../rhythm-world/city-layout.js';
import { floorHouseholds, PLAYER_HOME_BUILDING_ID } from '../rhythm-world/building-life.js';

const plan=createCityPlan('variety-test');
assert.ok(new Set(plan.buildings.map(b=>b.purpose)).size>=5,'city needs at least five building purposes');
assert.ok(plan.buildings.some(b=>b.purpose==='restaurant'),'city needs a restaurant');
assert.ok(plan.buildings.some(b=>b.style==='cylinder')&&plan.buildings.some(b=>b.style==='stepped'),'city needs visibly different silhouettes');
assert.ok(floorHouseholds(PLAYER_HOME_BUILDING_ID,2).some(home=>home.isPlayer),'designated home tower contains player home');
assert.equal(floorHouseholds('tower-9',2).some(home=>home.isPlayer),false,'unrelated towers must not all contain player homes');

const town=fs.readFileSync(new URL('../rhythm-world/town-3d.js',import.meta.url),'utf8');
for(const token of ['restaurantCounter','restaurantTable','restaurantMenu','warmComputerDesk','warmTableLamp','usableBed','towerStyleDetails'])assert.match(town,new RegExp(token),`missing city detail: ${token}`);
console.log('Verified varied building purposes, one player home, restaurant, warm furnishings, and silhouettes.');
