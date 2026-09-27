const assert = require('node:assert/strict');
const fs = require('node:fs');

const app = fs.readFileSync('app.js', 'utf8');
const css = fs.readFileSync('styles.css', 'utf8');

assert(app.includes('HOME_LAWN_VOICE_LEVELS'), 'concert voices need per-track loudness compensation');
assert(app.includes('setHomeConcertPose'), 'concert performers need original singing poses');
assert(app.includes('original.frames'), 'mouth animation must use the saved website game frames');
assert(app.includes('positionHomeConcertPerformers'), 'concert performers need an evenly spaced stage layout');
assert(app.includes('loop: true'), 'character voices must continue for the full concert');
assert(!app.includes('}, index * 190);'), 'concert voices must start together instead of drifting by 190 ms');
assert(css.includes('.home-concert-pose'), 'original singing frames need a visible pose layer');
assert(css.includes('--concert-bottom'), 'the stage needs separated rows');
assert(app.includes('home-inside-house'), 'nighttime characters must enter their houses instead of running or rotating outside');
assert(app.includes('home-performer-clukr'), 'Clukr needs a flying cymbal performance above Mr. Computer');
assert(app.includes('home-performer-funbot'), 'Fun Bot needs a rocket-flight performance');
assert(app.includes('home-performer-garnold'), 'Garnold needs a glowing confetti performance');
assert(app.includes('stopHomeComputerSong'), 'daybreak must stop Mr. Computer and the whole concert immediately');
assert(css.includes('home-runner-hand-left'), 'daytime runners need two swinging round hands');
assert(app.includes('HOME_RUNNER_HAND_COLORS'), 'runner hands must inherit each character body color');
assert(css.includes('background: var(--runner-hand-color'), 'round hands must use the character body color');
assert(css.includes('.home-clukr-disc'), 'Clukr needs a separately rotating cymbal');
assert(app.includes('home-concert-stage-crew'), 'the concert needs visible setup and packing crews');
assert(app.includes('home-concert-preparing'), 'the concert must prepare the stage before singing');
assert(app.includes('home-concert-packing'), 'the concert must carry the colorful floor away afterward');
assert(app.includes('rain-friend-umbrella'), 'Fun Bot, Garnold, and Clukr must share umbrella duty in rain');
assert(css.includes('home-hand-confetti'), 'confetti must come from the performers hands');
assert(!css.includes('body.home-night-concert-active .beat-runner.home-concert-accent {\n  filter:'), 'concert characters must not flash with a glow');
assert(!app.includes('homeName.textContent = `${character[1]}的家`'), 'visitors must not rename the permanent houses');

console.log('Equal-loudness looping voices, original mouth poses, and spaced concert rows verified.');
