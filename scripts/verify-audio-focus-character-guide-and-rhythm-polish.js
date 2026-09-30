const assert = require('node:assert/strict');
const fs = require('node:fs');

const apps = fs.readFileSync('computer-apps.js', 'utf8');
const app = fs.readFileSync('app.js', 'utf8');
const css = fs.readFileSync('computer-apps.css', 'utf8');
const homeCss = fs.readFileSync('styles.css', 'utf8');
const cache = fs.readFileSync('game-cache.js', 'utf8');

assert(apps.includes("characters:['角','角色介绍']"), 'character guide must be a real computer app');
assert(apps.includes("id==='characters'"), 'character guide must mount locally');
assert(apps.includes('character-guide-prev') && apps.includes('character-guide-next'), 'character guide needs previous and next controls');
assert(apps.includes('character-guide-sound'), 'each character needs a sound button');
assert(apps.includes('youtube-nocookie.com/embed/_bwDYOzbkBY'), 'video app needs the real Friend Like You YouTube performance');
assert(apps.includes('在线视频') && apps.includes('离线演出'), 'online and offline video modes must be separate');
assert(apps.includes("rack.hidden=rackHelp.hidden=!selected?.originalMix"), 'drag rack belongs only to original ensemble mode');
assert(apps.includes('BATTLE_GRACE_MS=5000'), 'battle failure needs a five second grace period');
assert(apps.includes("assets/dance-reference/role-icons/"), 'role icons must use individual transparent files');
assert(css.includes('.dance-divider{display:none!important}'), 'middle lane divider must be removed');
assert(app.includes("new CustomEvent('computer-app-audio-focus'"), 'opening software must claim audio focus');
assert(app.includes("addEventListener('computer-app-audio-focus'"), 'lawn audio must stop when software opens');
assert(app.includes('rain-friend-hand'), 'umbrella helpers need visible gripping hands');
assert(homeCss.includes('.rain-friend-hand'), 'umbrella hands need grip styling');
assert(app.includes('playHomeLawnConcertVoices(runners'), 'daytime performances must use saved character voices');
assert(cache.includes('role-icons/'), 'transparent role icons must work offline');

console.log('Audio focus, character guide, video modes, umbrella hands and rhythm polish verified.');
