const assert = require('node:assert/strict');
const fs = require('node:fs');

const apps = require('../computer-apps.js');
const source = fs.readFileSync('computer-apps.js', 'utf8');
const css = fs.readFileSync('computer-apps.css', 'utf8');

assert.equal(Object.keys(apps.characterProfiles).length, 20, 'all twenty characters need complete guide profiles');
for (const [id, profile] of Object.entries(apps.characterProfiles)) {
  for (const field of ['age', 'birthday', 'group', 'sound', 'color', 'description']) {
    assert.equal(typeof profile[field], 'string', `${id} is missing ${field}`);
    assert.ok(profile[field].trim(), `${id} has an empty ${field}`);
  }
}
assert.equal(apps.characterProfiles.computer.age, '未公开', 'Mr. Computer age must not be invented');
assert(source.includes('character-guide-facts'), 'the character card must render the profile facts');
assert(source.includes('年龄资料没有统一的官方数字'), 'the guide must explain why uncertain ages are marked unpublished');
assert(css.includes('.character-guide-facts'), 'the new profile facts need responsive styling');

const playerPath = apps.noteTravelBounds('player', 300, 40);
const opponentPath = apps.noteTravelBounds('opponent', 300, 40);
assert.ok(playerPath.start < playerPath.target, 'player arrows must fall from top to bottom');
assert.ok(opponentPath.start > opponentPath.target, 'opponent arrows must rise from bottom to top');
assert.equal(Math.round(playerPath.target), 249, 'player target must sit near the bottom');
assert.equal(Math.round(opponentPath.target), 51, 'opponent target must sit near the top');
assert(css.includes('.dance-player-targets{top:83%'), 'player receptors must be near the bottom');
assert(css.includes('.dance-opponent-targets{top:17%'), 'opponent receptors must stay near the top');

console.log('Character details and opposite arrow directions verified.');
