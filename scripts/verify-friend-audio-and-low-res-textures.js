const assert = require('node:assert/strict');
const fs = require('node:fs');

const world = fs.readFileSync('voxel-world.js', 'utf8');
const apps = fs.readFileSync('computer-apps.js', 'utf8');
const music = fs.readFileSync('dance-music.js', 'utf8');

assert(world.includes("imageSmoothingEnabled=false"), 'large source textures must use nearest-neighbour reduction');
assert(world.includes('drawImage(image,0,0,16,16)'), 'every file texture must be reduced to a real 16 by 16 grid');
assert(music.includes("video:'_bwDYOzbkBY'"), 'Friend Like You must use the linked video original');
assert(!music.includes("audioRevision:'20261001-song2'"), 'Friend Like You must not use the old replacement soundtrack');
assert(apps.includes('window.DanceMusic.open(slot,selected'), 'the rhythm stage must open the source-video player');
assert(apps.includes('video?video.getCurrentTime()'), 'the source video must supply the performance clock');

console.log('Friend source-video audio and low-resolution voxel textures verified.');
