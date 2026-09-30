const assert = require('node:assert/strict');
const fs = require('node:fs');

const apps = fs.readFileSync('computer-apps.js', 'utf8');
const app = fs.readFileSync('app.js', 'utf8');
const css = fs.readFileSync('computer-apps.css', 'utf8');
const cache = fs.readFileSync('game-cache.js', 'utf8');

assert(apps.includes("name:'二十人离线合唱'"), 'the twenty-character offline concert must exist');
assert(apps.includes("'jevin','black']"), 'the offline finale must contain all twenty normal characters');
assert(apps.includes('const visible=selected.cast;'), 'the video stage must not truncate the cast to ten');
assert(apps.includes("name:'Friend Like You 离线舞台'"), 'Friend Like You needs a bundled offline performance');
assert(apps.includes("soundtrack:'./assets/dance-audio/friend-like-you-safe.wav'"), 'the offline performance must use the bundled song');
assert(apps.includes('const beat=Math.floor(elapsed*(selected.bpm||120)/60*2)'), 'video poses must follow song BPM');
assert(!apps.includes('audio.currentTime=(index*.11)'), 'character loops must begin together instead of drifting');

assert(apps.includes("btn(host.querySelector('.dance-toolbar'),'电脑全屏'"), 'the dance game needs a fullscreen control');
assert(apps.includes('host.requestFullscreen()'), 'fullscreen must use the browser system Fullscreen API');
assert(apps.includes("addEventListener('fullscreenchange'"), 'fullscreen controls must track the real fullscreen state');
assert(css.includes('.dance-system-fullscreen'), 'true fullscreen needs a dedicated black stage layout');
assert(css.includes('aspect-ratio:16/9'), 'fullscreen stage must keep the video aspect ratio');

assert(app.includes('["computer", "小电脑先生"]'), 'the small computer must be part of the lawn cast');
assert(app.includes("character[0] === 'computer'"), 'night concert guests must always include the small computer');
assert(!app.includes('startHomeComputerSong({ loop: true, duration: HOME_LAWN_NIGHT_CONCERT_DURATION })'), 'the large home computer must not sing during the lawn concert');
assert(app.includes('playHomeLawnConcertVoices(performers)'), 'the small computer must sing through the character ensemble');
assert(css.includes('.offline-video-stage[data-theme="finale"] figure{animation:none!important'), 'the twenty-character video must not shake continuously');
assert(cache.includes('friend-like-you-safe.wav'), 'the offline song must remain cached');

console.log('Small-computer concert, full 20-character video, beat sync, and true fullscreen verified.');
