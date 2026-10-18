const assert = require('node:assert/strict');
const fs = require('node:fs');

const score = fs.readFileSync('colorful-bunch-violin-practice.html', 'utf8');
const staticBuilder = fs.readFileSync('scripts/build-sites-static.js', 'utf8');
assert(score.includes('Colorful Bunch · 原版角色五线谱'), 'page needs to identify the original-chart score');
assert(score.includes('西蒙独奏预览'), 'page must identify the Simon-only score preview');
assert(score.includes('DanceReferenceData'), 'score must render from the saved original chart data');
assert(score.includes('track.notes'), 'score must use the source note timings rather than invented notes');
assert(score.includes("note=>note.side==='player'&&note.hit===true"), 'the preview score must render only Simon\'s playable notes');
assert(score.includes('role-cue'), 'other singers need name cues instead of their notes');
assert(score.includes('avoidBarline'), 'notes must be moved away from barlines');
assert(score.includes('staccato'), 'short notes need visible point articulation');
assert(score.includes('data-full-track="true"'), 'page needs to retain the complete-track player');
assert(staticBuilder.includes('"colorful-bunch-violin-practice.html"'), 'the deployment build must include the score page');
assert(score.includes('data-duration="262"'), 'the player needs the complete 262-second performance length');
assert(score.includes('colorful-bunch.ogg'), 'the original song needs a playable audio control');
assert(score.includes("setAttribute('class','staff')"), 'page needs real five-line staves');
assert(score.includes("setAttribute('class','note player-note')"), 'page needs chart-derived Simon notes');

console.log('Colorful Bunch original-chart score verified.');
