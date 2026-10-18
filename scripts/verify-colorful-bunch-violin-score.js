const assert = require('node:assert/strict');
const fs = require('node:fs');

const score = fs.readFileSync('colorful-bunch-violin-practice.html', 'utf8');
const staticBuilder = fs.readFileSync('scripts/build-sites-static.js', 'utf8');
assert(score.includes('Colorful Bunch · 小提琴练习谱'), 'score needs the first dance-song title');
assert(score.includes('133 BPM'), 'score needs the song tempo');
assert((score.match(/class="staff"/g) || []).length >= 2, 'score needs two five-line staves');
assert((score.match(/class="note"/g) || []).length >= 16, 'score needs a playable violin phrase');
assert(score.includes('原创练习旋律'), 'score must identify the practice melody');
assert(score.includes('角色主旋律'), 'the score must contain only the dancing and singing character line');
assert(score.includes('背景伴奏省略'), 'the score must omit the background accompaniment');
assert(staticBuilder.includes('"colorful-bunch-violin-practice.html"'), 'the deployment build must include the score page');

console.log('Colorful Bunch violin practice score verified.');
