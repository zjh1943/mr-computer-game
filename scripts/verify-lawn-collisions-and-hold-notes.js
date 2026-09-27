const assert = require('node:assert/strict');
const fs = require('node:fs');

const app = fs.readFileSync('app.js', 'utf8');
const dance = fs.readFileSync('computer-apps.js', 'utf8');
const danceCss = fs.readFileSync('computer-apps.css', 'utf8');

assert(app.includes('HOME_LAWN_COLLISION_CHANCE = 0.05'), 'only five percent of chases may collide');
assert(app.includes('HOME_LAWN_CHASE_MIN_DELAY = 22000'), 'chases must not restart every few seconds');
assert(app.includes('HOME_LAWN_CHASE_DELAY_RANGE = 26000'), 'chase timing needs a natural random range');
assert(app.includes('scheduleHomeLawnChase'), 'the next chase must be scheduled after the current one');
assert(!app.includes('setInterval(() => startHomeChase'), 'a fixed chase interval causes repeated rescues');
assert(app.includes('const collided = Math.random() < HOME_LAWN_COLLISION_CHANCE'), 'only rare chases may collide');
assert(app.includes('跑开啦，下次再追！'), 'ordinary chases must finish without rescue');
assert(app.includes('startHomeLawnNightConcert'), 'nighttime needs its own lawn concert');
assert(app.includes('home-concert-visitor'), 'concert characters must run in from beyond the screen');
assert(app.includes('assets/dance-audio/normal/'), 'lawn concerts must use the dance-game character voices');
assert(app.includes('colorful-bunch-erect-inst.ogg'), 'night concerts need a local dance-game backing track');

assert(dance.includes('drawHoldTail'), 'long notes need one continuous tail');
assert(dance.includes('drawHoldTail(context,n.lane,x,y,endY,size,n.hold)'), 'the chart hold duration must determine tail length');
assert(dance.includes('activeHolds'), 'long notes must remain active until key release or their tail ends');
assert(dance.includes("document.addEventListener('keyup',keyUp)"), 'keyboard long notes need a key release handler');
assert(dance.includes('dance-opponent-bank'), 'Friend Like You needs a separate opponent arrow bank');
assert(dance.includes('dance-player-bank'), 'Friend Like You needs a separate player arrow bank');
assert(dance.includes('friend-single-bank'), 'the Black middle section must switch to one centered arrow bank');
assert(dance.includes('friend-night-phase'), 'Friend Like You needs a visible transition into the Black section');
assert(dance.includes('colorizeDanceArrow'), 'raw RGB-mask arrows must be converted to their four video colors');
assert(!dance.includes("selected?.id==='reference-colorful-bunch-erect'&&art"), 'the third song must not stretch static character art');
assert(!dance.includes('dance-normal-character'), 'the third song must use frame animation instead of a stretched image');
assert(dance.includes("canvas.className='dance-original'"), 'colored characters need the dynamic canvas renderer');
assert(dance.includes('animateOriginal'), 'colored characters need directional frame animation');

const music = fs.readFileSync('dance-music.js', 'utf8');
assert(music.includes("id:'friend-like-you'"), 'the local Friend Like You stage must be selectable');
assert(music.includes("audioFile:'./assets/dance-audio/friend-like-you-safe.wav'"), 'the bundled Friend Like You audio must start without an online connection');
assert(music.includes("name:'Friend Like You'"), 'the song card must use the requested Friend Like You title');
assert(music.includes("initial:{player:'computer',dad:'mr_tree'}"), 'the opening must contain only Mr. Tree and Mr. Fun Computer');
assert(dance.includes("host.classList.toggle('friend-chorus-phase'"), 'the final chorus must bring background dancers onto the stage');
assert(music.includes('friendLikeYou:true'), 'Friend Like You needs its own two-bank and middle-section staging');
assert(dance.includes("'dance-friend-view'"), 'Friend Like You must use the new computer body without the old tower');
assert(dance.includes("id==='computer'?'computer':'black'"), 'the video-matched computer needs its own directional pose files');
assert(dance.includes('assets/friend-like-you/${friendActor.dataset.poseBase}-${pose}.png'), 'Friend characters must switch among their cropped directional poses');
assert(dance.includes("base=id==='mr_tree'?'mr-tree':id==='computer'?'computer':'black'"), 'Friend Like You must use its own no-tower computer pose set');
assert(dance.includes('dance-friend-layer'), 'Friend character poses need overlapping layers for smooth crossfades');
assert(dance.includes('friendPoseMotion'), 'Friend character changes need direction-specific tweening instead of teleporting');
assert(dance.includes("sun.hidden=!!selected?.friendLikeYou"), 'Friend Like You must not insert the separate Sprunki sun character');
assert(danceCss.includes('.dance-friend-layer.is-active'), 'the next Friend pose must fade in over the previous frame');
assert(danceCss.includes('.friend-safe-stage .dance-player>small'), 'Friend Like You must hide labels that are absent from the video stage');
assert(danceCss.includes("assets/friend-like-you/stage-day.png"), 'Friend Like You needs one continuous daytime stage');
assert(danceCss.includes("assets/friend-like-you/stage-black.png"), 'Black needs one continuous middle-section stage');
assert(danceCss.includes('left:-9999px'), 'the source video must stay hidden while it supplies audio and timing');
assert(!danceCss.includes('width:50%;height:100%;z-index:2'), 'the stage must not be split into mismatched video and local halves');

console.log('Five-percent collisions, night concerts, hold tails, and dynamic colored characters verified.');
