const assert = require('node:assert/strict');
const fs = require('node:fs');

const dance = fs.readFileSync('computer-apps.js', 'utf8');
const music = fs.readFileSync('dance-music.js', 'utf8');
const danceCss = fs.readFileSync('computer-apps.css', 'utf8');
const app = fs.readFileSync('app.js', 'utf8');
const css = fs.readFileSync('styles.css', 'utf8');

assert(dance.includes("t>=90"), 'Friend Like You final chorus must begin with a full minute remaining');
assert(dance.includes('friend-opening-phase'), 'Friend Like You needs a timed entrance phase');
assert(dance.includes("friendOpening=!!selected.friendLikeYou&&t<2.4"), 'Friend Like You entrance must finish quickly');
assert(music.includes("audioFile:'./assets/dance-audio/friend-like-you-safe.wav'"), 'Friend Like You must start from the bundled offline song');
assert(!music.includes("friendLikeYou:true,video:'_bwDYOzbkBY'"), 'Friend Like You must not wait for an online video connection');
assert(dance.includes('friend-finale-floor'), 'the final chorus needs a dedicated flashing floor');
assert(dance.includes("['durple','wenda','vineria','jevin','oren','raddy','pinki','simon','tunner','gray']"), 'the final chorus needs a larger cast');
assert(danceCss.includes('friend-stage-enter-tree'), 'Mr. Tree needs a smooth opening entrance');
assert(danceCss.includes('friend-stage-enter-computer'), 'Mr. Fun Computer needs a smooth opening entrance');
assert(danceCss.includes('friend-floor-flash'), 'the concert floor must flash with the beat');
assert(danceCss.includes('.friend-safe-stage .dance-bank .dance-targets'), 'Friend arrow banks need video-matched compact spacing');
assert(danceCss.includes('height:100%'), 'Mr. Tree must fit the stage without being hidden by the foreground');

assert(app.includes('HOME_LAWN_NIGHT_CONCERT_DURATION = 60000'), 'the lawn night concert must last one minute');
assert(app.includes('startHomeComputerSong({ loop: true, duration: HOME_LAWN_NIGHT_CONCERT_DURATION })'), 'Mr. Computer must sing during the night concert');
assert(app.includes('originalComputer?.frames'), 'the home computer song must use the original saved game screen frames');
assert(css.includes('home-night-concert-active'), 'the lawn needs a visible concert state for the full minute');

console.log('One-minute finales, compact arrows, large video-scale characters, entrances, and computer concert song verified.');
