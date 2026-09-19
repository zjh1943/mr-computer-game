import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  SUN_FAREWELL,
  getConcertAvailability,
  buildConcertLineup
} from '../rhythm-world/concert-rules.js';
import { getPerformancePose } from '../rhythm-world/performance-motion.js';
import { ORIGINAL_THEME, notesForKind } from '../rhythm-world/music-score.js';

assert.equal(SUN_FAREWELL, '再见了，朋友们，我要走啦！');
assert.deepEqual(getConcertAvailability({ isNight: false }), {
  available: false,
  sunCanJoin: false,
  message: '太阳公公还在天上工作，夜晚演唱会才开始！'
});
assert.deepEqual(getConcertAvailability({ isNight: true }), {
  available: true,
  sunCanJoin: true,
  message: '月亮升起来了，夜间演唱会开始！'
});

const slots = [
  { character: 'oren', soundId: 'kick' },
  { character: 'fun-bot', soundId: 'robot' },
  null
];
assert.deepEqual(buildConcertLineup(slots, { isNight: false }, true).map(x => x.character), ['oren', 'fun-bot']);
assert.deepEqual(buildConcertLineup(slots, { isNight: true }, true).map(x => x.character), ['oren', 'fun-bot', 'mr-sun']);
assert.equal(buildConcertLineup(slots, { isNight: true }, false).some(x => x.character === 'mr-sun'), false);

const idle = getPerformancePose('oren', 1.25, false);
assert.deepEqual(idle, { bob: 0, sway: 0, squash: 1, mouth: 0, blink: false, accessory: 0 });
const robot = getPerformancePose('fun-bot', 2.25, true);
const tree = getPerformancePose('mr-tree', 2.25, true);
const sun = getPerformancePose('mr-sun', 2.25, true);
assert.notDeepEqual(robot, tree);
assert.notDeepEqual(tree, sun);
assert.ok(Math.abs(robot.sway) <= 8 && robot.mouth >= 0 && robot.mouth <= 1);
assert.ok(Math.abs(tree.accessory) > 0);
assert.ok(Math.abs(sun.bob) > 0);

assert.equal(ORIGINAL_THEME.steps, 32);
for (const kind of ['beat', 'bass', 'melody', 'voice', 'effect', 'whistle', 'chord']) {
  assert.ok(notesForKind(kind).length >= 6, `${kind} needs a complete musical phrase`);
  assert.ok(notesForKind(kind).every(note => note.beat >= 0 && note.beat < ORIGINAL_THEME.steps));
}

const app = fs.readFileSync('rhythm-world.js', 'utf8');
const page = fs.readFileSync('rhythm-world.html', 'utf8');
const sky = fs.readFileSync('rhythm-world/sky-3d.js', 'utf8');
assert.ok(page.includes('data-action="start-concert"'));
assert.ok(page.includes('stage-moon'));
assert.ok(app.includes("'start-concert':startConcert"));
assert.ok(app.includes('audio.startEnsemble()'));
assert.ok(app.includes('sun-guest arriving'));
assert.ok(sky.includes('setCharacterSpeech(sun,SUN_FAREWELL,5200)'));

console.log('Night concert rules, character performance poses, and 32-step ensemble score verified.');
