const assert = require('node:assert/strict');
const fs = require('node:fs');

const score = fs.readFileSync('colorful-bunch-violin-practice.html', 'utf8');
const staticBuilder = fs.readFileSync('scripts/build-sites-static.js', 'utf8');
assert(score.includes('Colorful Bunch · 完整原曲'), 'page needs to identify the complete original track');
assert(score.includes('完整原曲，不剪短'), 'page must state that the original track is not shortened');
assert(score.includes('data-full-track="true"'), 'page needs to mark the complete-track player');
assert(staticBuilder.includes('"colorful-bunch-violin-practice.html"'), 'the deployment build must include the score page');
assert(score.includes('data-duration="262"'), 'the player needs the complete 262-second performance length');
assert(score.includes('colorful-bunch.ogg'), 'the original song needs a playable audio control');
assert(!score.includes('SYSTEM_COUNT='), 'page must not generate a made-up score');
assert(!score.includes("setAttribute('class','staff')"), 'page must not present fabricated staff notation');

console.log('Colorful Bunch complete original-track page verified.');
