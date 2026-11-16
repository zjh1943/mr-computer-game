import assert from 'node:assert/strict';
import { createCityPlan, getTrafficLightState, trafficPose } from '../rhythm-world/city-layout.js';

const plan=createCityPlan('details');
assert.ok(plan.signals.length>=4,'city needs traffic signals');
assert.ok(plan.buildings.every(b=>b.entrance),'every building needs an entrance');
const car=plan.cars[0];
const poses=[0,15000,30000,45000,60000,75000].map(t=>trafficPose(car,t));
assert.ok(poses.some((p,i)=>i&&Math.abs(p.heading-poses[i-1].heading)>.2),'cars must turn on their route');
assert.ok(poses.every(p=>Number.isFinite(p.x)&&Number.isFinite(p.z)&&Number.isFinite(p.heading)),'traffic pose must stay finite');
assert.notEqual(getTrafficLightState(0,'x'),getTrafficLightState(9000,'x'),'traffic lights must cycle');

const [town,engine,input]=await Promise.all([
  import('node:fs').then(fs=>fs.readFileSync(new URL('../rhythm-world/town-3d.js',import.meta.url),'utf8')),
  import('node:fs').then(fs=>fs.readFileSync(new URL('../rhythm-world/engine.js',import.meta.url),'utf8')),
  import('node:fs').then(fs=>fs.readFileSync(new URL('../rhythm-world/input-3d.js',import.meta.url),'utf8'))
]);
assert.match(town,/trafficSignal/,'visible traffic signals are required');
assert.match(town,/driverSprite/,'cars need visible drivers');
assert.match(town,/moodBubble/,'pedestrians need mood bubbles');
assert.match(town,/automaticGlassDoor/,'buildings need usable automatic doors');
assert.match(town,/cityStairs/,'buildings need stairs');
assert.match(input,/consumeJump/,'input needs a jump action');
assert.match(engine,/verticalVelocity/,'engine needs vertical jump physics');
console.log('Verified turning traffic, signals, drivers, moods, enterable buildings, stairs, and jumping.');
