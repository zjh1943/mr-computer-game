import assert from 'node:assert/strict';
import fs from 'node:fs';
import { buildingWallColliders } from '../rhythm-world/building-colliders.js';

const building={id:'tower-test',x:0,z:0,width:10,depth:12,entrance:{side:'south'}};
const walls=buildingWallColliders(building);
assert.ok(walls.length>12,'building perimeter should remain solid');
assert.equal(walls.some(w=>Math.abs(w.x)<1.2&&w.z<-5.5),false,'south doorway must be a real collision gap');
assert.equal(walls.some(w=>Math.abs(w.x)>3.8&&w.z<-5.5),true,'front wall remains solid beside doorway');

const town=fs.readFileSync(new URL('../rhythm-world/town-3d.js',import.meta.url),'utf8');
const engine=fs.readFileSync(new URL('../rhythm-world/engine.js',import.meta.url),'utf8');
assert.match(town,/streetLevelLobby/,'ground-floor rooms must exist at street coordinates');
assert.match(town,/automaticGlassDoor/,'street entrances must have automatic doors');
assert.match(town,/returnToStreetLobby/,'elevator must return to the real street-level lobby');
assert.doesNotMatch(engine,/getAutomaticBuildingEntry\(player\.position/,'walking into a lobby must not teleport the player');
assert.doesNotMatch(town,/city\.userData\.plan\.buildings\.map\(item=>\(\{x:item\.x,z:item\.z,radius:item\.width\*\.48\}\)\)/,'buildings must not use solid circular blockers');
console.log('Verified continuous street-level interiors, doorway gaps, automatic doors, and elevator return.');
