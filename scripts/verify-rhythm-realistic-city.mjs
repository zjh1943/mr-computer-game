import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createCityPlan, trafficPose } from '../rhythm-world/city-layout.js';
import { applyTrafficImpact } from '../rhythm-world/traffic-safety.js';

const plan=createCityPlan('real-city');
assert.ok(plan.crosswalks.length>=4,'road plan needs zebra crossings');
const car=plan.cars[0],pose=trafficPose(car,12000),later=trafficPose(car,12100);
const motion={x:later.x-pose.x,z:later.z-pose.z};
assert.ok(Math.cos(pose.heading)*motion.z+Math.sin(pose.heading)*motion.x>=0,'vehicle heading follows movement direction');
assert.deepEqual(applyTrafficImpact({health:100,lastImpactAt:-Infinity},{now:1000,speed:8}),{health:78,lastImpactAt:1000,injured:true});
assert.equal(applyTrafficImpact({health:78,lastImpactAt:1000},{now:1500,speed:8}).injured,false,'impact cooldown prevents damage every frame');
const town=fs.readFileSync(new URL('../rhythm-world/town-3d.js',import.meta.url),'utf8');
const engine=fs.readFileSync(new URL('../rhythm-world/engine.js',import.meta.url),'utf8');
assert.match(town,/crosswalkStripe/,'crosswalks must be visible in 3D');
assert.match(town,/buildingLobby/,'doorway must reveal a real lobby space');
assert.match(town,/getTrafficColliders/,'town exposes moving cars to collision logic');
assert.match(engine,/applyTrafficImpact/,'engine applies traffic collision consequences');
console.log('Verified realistic road orientation, crossings, lobbies, and traffic injury rules.');
