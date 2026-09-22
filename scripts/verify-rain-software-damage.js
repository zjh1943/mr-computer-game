const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
function extract(source, name) {
  const start = source.indexOf(`function ${name}(`);
  const end = source.indexOf('\nfunction ', start + 1);
  return source.slice(start, end);
}
const app = fs.readFileSync(path.join(__dirname, '../app.js'), 'utf8');
for (const name of ['chat', 'paint', 'music', 'clock', 'town', 'dance', 'blocks3d', 'calculator', 'notes', 'tasks', 'memory', 'piano', 'minecraft']) {
  const timers = new Map(), classes = new Set(); let id = 0;
  const context = { currentComputerApp: name, currentWeather: 'sunny', weatherOrder: ['sunny','rain'], isAtHome: false,
    isPoweredOff: false, isTerrorNightActive: false, screenTimer: null, rainErrorTimer: null, rainCodeTimer: null,
    document: { body: { classList: { toggle() {} } } },
    computerShell: { classList: { toggle() {}, add(value) { classes.add(value); } } },
    window: { setTimeout(fn, delay) { timers.set(++id, { fn, delay }); return id; }, clearTimeout(key) { timers.delete(key); } },
    speakAsComputer: () => 100, cleanRainFromComputerByHappyRobot: () => false, isHappyRobotRainGuardActive: () => false };
  for (const fn of ['clearRainErrorState','updateComputerWeatherMarks','updateWeatherToggleLabel','updateWeatherDetectorDisplay','updateTvWeatherMarks','showFaceOnly','setMood','enterRainCodeMode']) context[fn] = () => {};
  vm.createContext(context);
  vm.runInContext(extract(app, 'setWeather') + '\nsetWeather("rain");', context);
  timers.delete(context.screenTimer); // A new chat message replaces the subtitle timer.
  const damage = timers.get(context.rainErrorTimer);
  assert.ok(damage, `${name}: rain damage survives subtitle cancellation`);
  damage.fn(); assert.ok(classes.has('rain-error'), `${name}: screen becomes damaged`);
}
const experience = fs.readFileSync(path.join(__dirname, '../computer-experience.js'), 'utf8');
const start = experience.indexOf('  function fullscreen()');
const end = experience.indexOf('  function stopVoice()', start);
const guard = { isDamagedNow: () => true, full: false };
vm.createContext(guard); vm.runInContext(experience.slice(start, end) + '\nfullscreen();', guard);
assert.equal(guard.full, false, 'Damaged computers cannot enter fullscreen');
console.log('All software damages in rain; damage blocks fullscreen');
