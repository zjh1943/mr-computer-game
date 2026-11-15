import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createCityPlan } from '../rhythm-world/city-layout.js';
import { homeFloorForBuilding, floorHouseholds } from '../rhythm-world/building-life.js';

const plan=createCityPlan('luxury');
assert.ok(new Set(plan.buildings.map(b=>b.style)).size>=5,'skyline needs at least five building shapes');
const tower=plan.buildings.find(b=>b.height>20),floors=Math.min(20,Math.round(tower.height/3.2)),home=homeFloorForBuilding(tower.id,floors);
assert.ok(home>=2&&home<=floors,'player home floor must be a valid residential floor');
assert.equal(floorHouseholds(tower.id,home).length,4,'each residential floor needs player and neighbor homes');
const town=fs.readFileSync(new URL('../rhythm-world/town-3d.js',import.meta.url),'utf8');
const app=fs.readFileSync(new URL('../rhythm-world.js',import.meta.url),'utf8');
assert.match(town,/crystalChandelier/,'lobby needs a chandelier');
assert.match(town,/myHomeDoor/,'player home needs a marked door');
assert.match(town,/neighborDoor/,'other homes need doors');
assert.match(town,/skyBridge|steppedTower|cylinderTower/,'city needs unusual tower silhouettes');
assert.match(app,/startElevatorRide/,'floor selection needs an elevator ride sequence');
assert.match(app,/我的家/,'elevator panel needs to identify the player home floor');
console.log('Verified luxury elevator lobbies, home guidance, neighbors, ride animation, and varied towers.');
