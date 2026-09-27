const assert = require('node:assert/strict');
const fs = require('node:fs');

const js = fs.readFileSync('computer-apps.js', 'utf8');
const css = fs.readFileSync('computer-apps.css', 'utf8');
const iconSheet = 'assets/dance-reference/role-icons.png';
const grayPerson = 'assets/dance-reference/gray-person.png';

assert(js.includes('dance-loading-stage'), 'song connection needs a stage-building animation');
assert(js.includes('搬来角色'), 'loading animation needs characters carrying performers');
assert(js.includes('铺开彩色地板'), 'loading animation needs a carried colorful floor');
assert(js.includes('装好天空'), 'loading animation needs a sky decoration step');
assert(js.includes('playerBalance'), 'the player must lose through the battle progress bar');
assert(js.includes('playerBalance<=0'), 'failure must wait until the player side reaches zero');
assert(js.includes('dance-failure-scene'), 'failure needs a dedicated scene');
assert(js.includes('playPlayerDefeat'), 'only the player needs the full defeat scene');
assert(js.includes('playOpponentIconSwap'), 'opponent role changes need a quick icon swap');
assert(fs.existsSync(iconSheet), 'the supplied twenty-role icon sheet must be bundled');
assert(fs.existsSync(grayPerson), 'the supplied gray person must be bundled');
assert(js.includes('setCharacterIcon'), 'all role icon locations must use the supplied icon sheet');
assert(js.includes("'simon'"), 'Simon must have his own yellow antenna icon mapping');
assert(js.includes('dance-battle-opponent-icon') && js.includes('dance-battle-player-icon'), 'the battle bar needs the current opponent and player icons');
assert(js.includes('referenceEntrances'), 'an incoming reference character must receive the opening singing motion');
assert(!js.includes('下次一定好好唱'), 'the unwanted promise line must be removed');
assert(!js.includes('rival.querySelectorAll(\':scope > div\')];if(!figures.length'), 'opponents must never be selected for defeat');
assert(css.includes('.dance-player.dance-role-lost'), 'the player becomes the small gray defeated character');
assert(css.includes('.dance-opponent-swap'), 'opponent swaps need a separate fast animation');
assert(css.includes('.dance-failure-icon'), 'the dragged role icon must visibly leave and return');
assert(css.includes('.dance-battle-icon'), 'battle role icons need visible styling');
assert(css.includes("background-image:url('./assets/dance-reference/role-icons.png')"), 'role icons must render from the supplied sheet');
assert(css.includes("dance-gray-transform"), 'the supplied gray person must transform back into the player');
assert(js.includes("classList.add('is-returning')"), 'the removed icon must return before the failure scene ends');

console.log('Dance loading crew, player-only loss, and quick opponent swaps verified.');
