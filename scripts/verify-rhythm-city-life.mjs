import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createCityPlan, trafficPosition } from '../rhythm-world/city-layout.js';
import { getSkyLighting } from '../rhythm-world/sky-lighting.js';

const city = createCityPlan('demo');
assert.ok(city.buildings.length >= 24, 'the central city needs a visible skyline, not isolated towers');
assert.ok(city.roads.length >= 4, 'the city needs a connected road grid');
assert.ok(city.cars.length >= 8, 'traffic must make the city feel alive');
assert.ok(city.pedestrians.length >= 10, 'the city needs moving residents, not empty streets');
assert.ok(city.buildings.some(item => item.height >= 24), 'the skyline needs genuinely tall buildings');

const start = trafficPosition(city.cars[0], 0);
const later = trafficPosition(city.cars[0], 5000);
assert.notDeepEqual(start, later, 'cars must drive instead of remaining decoration');

const dawn = getSkyLighting({ celestial: 'sun', travel: .03, isNight: false });
const noon = getSkyLighting({ celestial: 'sun', travel: .5, isNight: false });
const dusk = getSkyLighting({ celestial: 'sun', travel: .97, isNight: false });
const night = getSkyLighting({ celestial: 'moon', travel: .4, isNight: true });
assert.ok(noon.sunIntensity > dawn.sunIntensity);
assert.ok(noon.sunIntensity > dusk.sunIntensity);
assert.ok(night.sunIntensity < dusk.sunIntensity);
assert.notEqual(dawn.sky, noon.sky);
assert.notEqual(dusk.sky, night.sky);
const app = fs.readFileSync(new URL('../rhythm-world.js', import.meta.url), 'utf8');
for (const label of ['清晨', '白天', '黄昏', '夜晚']) assert.match(app, new RegExp(label));

console.log('City life and daylight verification passed.');
