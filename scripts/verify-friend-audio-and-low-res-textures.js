const assert = require('node:assert/strict');
const fs = require('node:fs');

const world = fs.readFileSync('voxel-world.js', 'utf8');
const apps = fs.readFileSync('computer-apps.js', 'utf8');
const music = fs.readFileSync('dance-music.js', 'utf8');

assert(world.includes("imageSmoothingEnabled=false"), 'large source textures must use nearest-neighbour reduction');
assert(world.includes('drawImage(image,0,0,16,16)'), 'every file texture must be reduced to a real 16 by 16 grid');
assert(apps.includes("await ctx.resume();localTrackSource=ctx.createBufferSource()"), 'local song must resume immediately before playback');
assert(music.includes("audioRevision:'20261001-song2'"), 'Friend Like You must bypass the old cached soundtrack');
assert(apps.includes("selected.audioFile+'?v='+encodeURIComponent(selected.audioRevision)"), 'the revised soundtrack must be fetched with its revision');

const wav = fs.readFileSync('assets/dance-audio/friend-like-you-safe.wav');
assert.equal(wav.toString('ascii', 0, 4), 'RIFF');
assert(wav.length > 6_000_000, 'offline Friend Like You arrangement must contain the full song');

console.log('Friend audio startup and low-resolution voxel textures verified.');
