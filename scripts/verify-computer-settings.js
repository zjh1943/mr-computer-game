const assert = require('node:assert/strict');
const fs = require('node:fs');

const settings = require('../computer-settings.js');

assert.deepEqual(Object.keys(settings.versionProfiles), ['original', 'pyramixed']);
assert.equal(settings.normalizeSettings({version:'unknown'}).version, 'original');
assert.equal(settings.normalizeSettings({version:'pyramixed'}).version, 'pyramixed');
assert.equal(settings.normalizeSettings({masterVolume:4}).masterVolume, 1);
assert.equal(settings.normalizeSettings({masterVolume:-2}).masterVolume, 0);
assert.equal(settings.normalizeSettings({hiddenControls:['settings','mine','mine']}).hiddenControls.includes('settings'), false);
assert.deepEqual(settings.normalizeSettings({hiddenControls:['settings','mine','mine']}).hiddenControls, ['mine']);
assert(settings.versionProfiles.original.nameZh.includes('原版'));
assert(settings.versionProfiles.pyramixed.nameZh.includes('Pyramixed'));
assert.equal(settings.versionProfiles.pyramixed.hostSprite, 'mr-fun-computer');
assert.equal(settings.versionProfiles.pyramixed.characters.length, 19);
assert.equal(settings.versionProfiles.pyramixed.characters.some(character => character.id === 'black'), false);
assert(settings.versionProfiles.pyramixed.characters.some(character => character.id === 'raddy' && character.nameZh === '瑞迪'));
assert(settings.versionProfiles.pyramixed.characters.some(character => character.id === 'brud' && character.nameZh === '布鲁德'));
assert(settings.versionProfiles.pyramixed.characters.some(character => character.id === 'durple' && character.nameZh === '德普勒'));
assert(settings.versionProfiles.pyramixed.views.front.includes('/pyramixed/'));
assert.match(settings.versionProfiles.pyramixed.views.front, /\.svg$/);
assert(settings.versionProfiles.pyramixed.views.left && settings.versionProfiles.pyramixed.views.right && settings.versionProfiles.pyramixed.views.back);
assert.notEqual(settings.versionProfiles.pyramixed.concert.rate, settings.versionProfiles.original.concert.rate);
assert.match(settings.characterAudio('pyramixed', 'oren'), /pyramixed\/audio\/oren\.wav$/);
for (const character of settings.versionProfiles.pyramixed.characters) {
  for (const view of ['front', 'left', 'right', 'back']) {
    assert(fs.existsSync(settings.characterView('pyramixed', character.id, view).replace(/^\.\//, '')));
  }
  assert(fs.existsSync(settings.characterAudio('pyramixed', character.id).replace(/^\.\//, '')));
}
assert.notEqual(
  fs.readFileSync(settings.characterView('pyramixed', 'oren', 'front').replace(/^\.\//, ''), 'utf8'),
  fs.readFileSync('assets/sprunki-views/front/oren.png').toString('base64')
);

const html = fs.readFileSync('index.html', 'utf8');
const css = fs.readFileSync('styles.css', 'utf8');
const app = fs.readFileSync('app.js', 'utf8');
assert.match(html, /id="computer-settings-toggle"/);
assert.match(html, /id="computer-settings-panel"/);
assert.match(html, /id="pyramixed-apps-toggle"/);
assert.match(html, /computer-settings\.js\?v=/);
assert.match(css, /body\[data-computer-version="pyramixed"\]/);
assert.match(css, /body\[data-computer-version="pyramixed"\] \.mood-panel\.desktop-mode\s*\{[^}]*background:\s*#0[0-9a-f]{5}/s);
assert.match(css, /body\[data-computer-version="pyramixed"\] \.mood-panel\.desktop-mode:not\(\.app-open\) \.face-display/s);
assert.match(css, /body\[data-computer-version="pyramixed"\] \.mouth-triangle\s*\{[^}]*clip-path/s);
assert.match(css, /body\[data-computer-version="pyramixed"\] \.computer-shell\.computer-speaking \.mouth/s);
assert.match(app, /getActiveComputerVersion/);
assert.match(app, /getVersionedRunnerSprite/);
assert.match(app, /getVersionedConcertVoice/);
assert.match(app, /pyramixed-apps-open/);
assert.match(app, /computerDesktop\.scrollTop\s*=\s*0/);
assert.match(app, /const pyramixedSpeech = document\.body\.dataset\.computerVersion === "pyramixed"/);
assert.match(app, /if \(pyramixedSpeech\)[\s\S]*computerShell\?\.classList\.add\("computer-speaking"\)/);
assert.match(css, /pyramixed-speech-writing/);
assert.match(css, /#ff3b30,#ff9500,#ffe600,#34c759,#25e6da,#168cff,#b94cff/);
assert.match(css, /\.computer-shell:has\(\.mood-panel\.desktop-mode:not\(\.app-open\)\) > \.pyramixed-apps-toggle/);
assert.match(css, /body\[data-computer-version="pyramixed"\] \.desk-wrap\s*\{\s*display:\s*none/);
assert.match(app, /电脑先生家的小电脑/);
assert.match(app, /home-small-computer-singer/);
assert.match(app, /miniComputerFruitBirthUnlocked\s*=\s*Boolean\(saveData\.miniComputerFruitBirthUnlocked\)/);
assert.match(app, /character\[0\] !== "computer" \|\| miniComputerFruitBirthUnlocked/);

console.log('Original and Pyramixed version switching, safe cast and version-aware concert verified.');

const apps = fs.readFileSync('computer-apps.js', 'utf8');
assert.match(apps, /getGuideIdsForVersion/);
assert.match(apps, /getGuideImage/);
assert.match(apps, /pyramixed.*black/s);
assert.match(apps, /角色方向/);
