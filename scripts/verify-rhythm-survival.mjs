import assert from 'node:assert/strict';
import fs from 'node:fs';
import { advanceSurvival, eatMeal, sleepInBed } from '../rhythm-world/survival.js';

assert.deepEqual(advanceSurvival({hunger:100,health:100},10),{hunger:98.5,health:100,died:false});
assert.deepEqual(advanceSurvival({hunger:0,health:20},5),{hunger:0,health:10,died:false});
assert.equal(advanceSurvival({hunger:0,health:1},1).died,true);
assert.deepEqual(eatMeal({hunger:35,health:70}),{hunger:75,health:78});
assert.deepEqual(sleepInBed({hunger:30,health:25}),{hunger:50,health:100});

const html=fs.readFileSync(new URL('../rhythm-world.html',import.meta.url),'utf8');
const app=fs.readFileSync(new URL('../rhythm-world.js',import.meta.url),'utf8');
assert.match(html,/id="hunger"/,'HUD needs a hunger meter');
assert.match(app,/eatAtRestaurant/,'restaurant interaction must feed the player');
assert.match(app,/sleepAtBed/,'bed interaction must let the player sleep');
console.log('Verified hunger, starvation damage, food, sleep, death, and HUD integration.');
