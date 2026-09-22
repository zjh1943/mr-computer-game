const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const source = fs.readFileSync(require('node:path').join(__dirname, '../app.js'), 'utf8');
const start = source.indexOf('function showSubtitle(');
const end = source.indexOf('\nfunction ', start + 1);
for (const app of ['', 'paint', 'music', 'town', 'dance', 'blocks3d', 'calculator', 'notes', 'tasks', 'memory', 'piano', 'minecraft', 'chat']) {
  const subtitle = { style: { display: 'none' }, textContent: '' };
  let animated = false;
  const context = { currentComputerApp: app, screenSubtitle: subtitle,
    moodPanel: { classList: { add() {}, remove() {}, toggle() {} } },
    window: { ComputerExperience: { subtitle() { animated = true; } } } };
  vm.createContext(context);
  vm.runInContext(source.slice(start, end) + '\nshowSubtitle("下雨了", false);', context);
  assert.equal(subtitle.style.display, app === 'chat' ? 'block' : 'none', `${app || 'desktop'} subtitle visibility`);
  assert.equal(animated, app === 'chat');
}
console.log('Only the chat app displays subtitles');
