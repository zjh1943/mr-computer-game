const assert = require('node:assert/strict');
const fs = require('node:fs');
const apps = require('../computer-apps.js');

const playerFriendPath = apps.noteTravelBounds('player', 300, 40, true);
const opponentFriendPath = apps.noteTravelBounds('opponent', 300, 40, true);
assert(playerFriendPath.start < playerFriendPath.target, 'Friend Like You player notes must fall to the bottom');
assert(opponentFriendPath.start > opponentFriendPath.target, 'opponent notes must rise to the top');
assert.equal(Math.round(playerFriendPath.target), 249);

const collapsed = apps.collapseHoldOverlaps([
  {time: 1, lane: 2, hold: 1.2},
  {time: 1.25, lane: 2, hold: 0},
  {time: 1.5, lane: 2, hold: 0},
  {time: 1.5, lane: 1, hold: 0}
]);
assert.equal(collapsed.length, 2, 'arrows inside a hold tail must not stack');
assert.equal(apps.tutorialLevels.length, 5, 'the beginner course needs five progressively faster levels');
assert(apps.tutorialLevels.every((level, index, levels) => !index || level.bpm > levels[index - 1].bpm));

const source = fs.readFileSync('computer-apps.js', 'utf8');
const css = fs.readFileSync('computer-apps.css', 'utf8');
const html = fs.readFileSync('index.html', 'utf8');
const mainCss = fs.readFileSync('styles.css', 'utf8');
assert(source.includes('dance-tutorial-panel'));
assert(source.includes('dance-tutorial-character'));
assert(source.includes('第一步：从 20 位角色中选出自己'));
assert(source.includes('第二步：按顺序闯关'));
const roleOrderMatch = source.match(/const roleIconOrder=\[([^\]]+)\]/);
assert(roleOrderMatch, 'the twenty-role order must exist before rendering the tutorial');
assert.equal((roleOrderMatch[1].match(/'/g) || []).length / 2, 20, 'the beginner picker must show all twenty role icons');
assert(source.indexOf('const roleIconOrder=') < source.indexOf('\n    renderTutorial();'), 'role icons must initialize before song and tutorial rendering');
assert(source.includes('tutorialProgress'));
assert(source.includes('推荐歌曲已解锁'));
assert(css.includes('.dance-tutorial-level[disabled]'));
assert(css.includes('.dance-tutorial-reward'));
assert(html.includes('pyramixed-host-art'));
assert(html.includes('assets/sprunki-versions/pyramixed/front/mr-fun-computer.svg'));
assert(mainCss.includes('body[data-computer-version="pyramixed"] .pyramixed-host-art'));
assert(mainCss.includes('body[data-computer-version="pyramixed"] .hat-assembly'));
assert(mainCss.includes('.dance-tutorial-characters{display:grid!important'));

console.log('Beginner levels, real hold notes, opposite travel, and integrated Pyramixed host verified.');
