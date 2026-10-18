const assert = require('node:assert/strict');
const fs = require('node:fs');

const score = fs.readFileSync('colorful-bunch-violin-practice.html', 'utf8');
const staticBuilder = fs.readFileSync('scripts/build-sites-static.js', 'utf8');
assert(score.includes('Colorful Bunch · 完整小提琴角色谱'), 'score needs the first dance-song title');
assert(score.includes('133 BPM'), 'score needs the song tempo');
assert(score.includes("setAttribute('class','staff')"), 'score needs generated five-line staves');
assert(score.includes("setAttribute('class','note '+roleClass)"), 'score needs generated playable violin notes');
assert(score.includes('角色主旋律练习'), 'score must identify the character-melody practice line');
assert(score.includes('角色主旋律'), 'the score must contain only the dancing and singing character line');
assert(score.includes('背景伴奏省略'), 'the score must omit the background accompaniment');
assert(staticBuilder.includes('"colorful-bunch-violin-practice.html"'), 'the deployment build must include the score page');
assert(score.includes('data-duration="262"'), 'the score needs the complete 262-second performance length');
assert(score.includes('colorful-bunch.ogg'), 'the original song needs a playable audio control');
assert(score.includes('西蒙 · 主唱') && score.includes('奥伦 · 对唱'), 'both singing characters need labeled turns');
assert(score.includes('SYSTEM_COUNT=19'), 'the extended score needs enough systems for the full performance');

console.log('Colorful Bunch violin practice score verified.');
