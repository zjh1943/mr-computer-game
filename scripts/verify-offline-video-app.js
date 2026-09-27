const assert = require('node:assert/strict');
const fs = require('node:fs');

const apps = fs.readFileSync('computer-apps.js', 'utf8');
const app = fs.readFileSync('app.js', 'utf8');
const css = fs.readFileSync('computer-apps.css', 'utf8');
const homeCss = fs.readFileSync('styles.css', 'utf8');
const cache = fs.readFileSync('game-cache.js', 'utf8');

assert(apps.includes("videos:['视','视频']"), 'the computer needs a Video application');
assert(apps.includes("id==='videos'"), 'the Video application must mount locally');
assert(apps.includes('offlineVideoLibrary'), 'the Video application needs an offline gallery');
assert(apps.includes('window.DanceCast'), 'offline videos must use the saved original Sprunki cast');
assert(apps.includes('assets/dance-audio/normal/'), 'offline videos must use local character sound files');
assert(!apps.includes('offline-video-app iframe'), 'offline videos must not depend on embedded websites');
assert(css.includes('.offline-video-app'), 'the offline video gallery needs a responsive layout');

assert(app.includes('["chat", "store", "minecraft", "town", "videos"'), 'Video must be installed on existing saves');
assert(app.includes('originalComputer?.frames'), 'Mr. Computer song must use the saved game frames');
assert(app.includes('home-song-screen-frame'), 'only the original singing screen must be shown');
assert(app.includes('HOME_COMPUTER_ORIGINAL_CUES'), 'Mr. Computer needs the original Scratch costume timing cues');
assert(app.includes('[4.8, 13]'), 'the second original vocal phrase must begin on anim13 at 4.8 seconds');
assert(app.includes('[8.5, 18]'), 'the original final FUN screen must begin at 8.5 seconds');
assert(!app.includes('phase / 9.6 * originalFrames.length'), 'original frames must not be spread evenly across the song');
assert(homeCss.includes('.home-song-screen-frame'), 'the full original computer must be cropped to its screen');
assert(cache.includes('cacheBundledSprunkiFrames'), 'all original animation frames must be stored for first-run offline playback');

console.log('Offline Video app and original in-screen Mr. Computer song verified.');
