import assert from'node:assert/strict';
import{getDayNightState,getWorldPhase}from'../rhythm-world/day-night.js';

const dawn=getDayNightState(.08),day=getDayNightState(.35),sunset=getDayNightState(.49),night=getDayNightState(.7),moonset=getDayNightState(.96);
assert.equal(day.celestial,'sun');
assert.equal(sunset.celestial,'sun');
assert.equal(sunset.farewell,true,'太阳快落山时应说再见');
assert.equal(night.celestial,'moon','夜晚只能显示月亮');
assert.equal(night.isNight,true);
assert.equal(moonset.celestial,'moon');
assert.equal(dawn.celestial,'sun','月亮落下后太阳应重新升起');
for(const phase of[0,.1,.25,.49,.5,.7,.99])assert.notEqual(getDayNightState(phase).celestial,'sun-and-moon','太阳和月亮不能同时出现');
assert.equal(getWorldPhase(Date.now(), .25), .25, 'visual QA can pin the daytime phase');
console.log('Day and night cycle verification passed.');
