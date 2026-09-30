const assert = require('node:assert/strict');
const fs = require('node:fs');
const music = require('../dance-music.js');

const friend = music.tracks.find(track => track.id === 'friend-like-you');
assert(friend, 'Friend Like You local level is missing');
assert.deepEqual(friend.phases, { dayStart: 0, nightStart: 55, finaleStart: 115, end: 150 });
assert.deepEqual(friend.events.map(({time, character}) => [time, character]), [[55, 'black'], [115, 'mr_tree']]);

const day = friend.notes.filter(note => note.time >= 2 && note.time < friend.phases.nightStart);
const night = friend.notes.filter(note => note.time >= friend.phases.nightStart && note.time < friend.phases.finaleStart);
const finale = friend.notes.filter(note => note.time >= friend.phases.finaleStart && note.time < friend.phases.end);
assert(day.some(note => note.side === 'dad') && day.some(note => note.side === 'player'), 'day duet needs both arrow banks');
assert(night.length > 40 && night.every(note => note.side === 'player' && note.hit === true), 'Black solo needs one playable arrow bank');
assert(finale.some(note => note.side === 'dad') && finale.some(note => note.side === 'player'), 'finale needs both arrow banks');
assert(friend.notes.filter(note => note.hold >= .5).length >= 12, 'the chart needs recognizable long notes');
assert(friend.notes.some((note, index, notes) => index && note.time - notes[index - 1].time >= .75), 'the chart needs musical rests instead of an endless uniform stream');

const apps = fs.readFileSync('computer-apps.js', 'utf8');
const css = fs.readFileSync('computer-apps.css', 'utf8');
assert(apps.includes('selected.phases?.nightStart'), 'stage timing must come from the song reference');
assert(apps.includes('selected.phases?.finaleStart'), 'finale timing must come from the song reference');
assert(css.includes('.friend-chorus-phase .dance-player'), 'the finale must resize Mr. Fun Computer like the video');
assert(css.includes('.friend-chorus-phase .dance-rival'), 'the finale must resize Mr. Tree like the video');
assert(css.includes('.friend-safe-stage.friend-night-phase .dance-rival{position:absolute!important'), 'Black must stay visible in the center of the solo stage');

console.log('Friend Like You video phases, chart sections, holds, rests, and finale staging verified.');
