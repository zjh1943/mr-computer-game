const assert = require('node:assert/strict');
const fs = require('node:fs');

const shell = fs.readFileSync('voxel-shell.js', 'utf8');
const apps = fs.readFileSync('computer-apps.js', 'utf8');
const app = fs.readFileSync('app.js', 'utf8');
const css = fs.readFileSync('computer-apps.css', 'utf8');
const homeCss = fs.readFileSync('styles.css', 'utf8');

assert(shell.includes('电脑基岩版') && shell.includes('电脑 Java 版'), 'the local voxel game needs both control editions');
assert(shell.includes("host.dataset.voxelEdition"), 'the selected edition must affect the running game shell');
assert(shell.includes("edition:w.edition||'bedrock'"), 'older saved worlds need a Bedrock-compatible edition default');
assert(css.includes('.voxel-edition-badge'), 'the voxel launcher needs a visible edition badge');

assert(apps.includes('characterFrameDuration'), 'character guide animation must use phrase-paced frame timing');
assert(apps.includes('friend-fnf-countdown'), 'Friend Like You needs the pixel countdown overlay');
assert(css.includes('VoxelPixel'), 'Friend Like You countdown must use the pixel font');
assert(css.includes('.friend-safe-stage .dance-stage{height:clamp(360px,56vh,640px)'), 'Friend Like You stage must be larger');

assert(app.includes('createHomeSmallComputerSinger'), 'day and night concerts need the original small-computer singer');
assert(app.includes('daytimePerformers.forEach'), 'the small computer must receive the full singing animation loop');
assert(app.includes('smallComputer.dataset.lawnX = "62"'), 'the small computer must stay visible beside the large computer');
assert(app.includes("playHomeLawnConcertVoices(performers, { includeSun: true })"), 'concerts must include Mr. Sun audio');
assert(app.includes('startHomeSunConcert'), 'Mr. Sun must visibly join concerts');
assert(homeCss.includes('.sky-sun.home-concert-singer'), 'daytime Mr. Sun needs a concert animation');
assert(homeCss.includes('left: clamp(150px, 18vw, 260px) !important'), 'daytime Mr. Sun must remain visible in the sky');
assert(homeCss.includes('body.night-mode .sky-sun.home-concert-singer'), 'nighttime Mr. Sun must fly down glowing');

console.log('Minecraft editions, paced character guide, pixel countdown, small computer, and Mr. Sun concert verified.');
