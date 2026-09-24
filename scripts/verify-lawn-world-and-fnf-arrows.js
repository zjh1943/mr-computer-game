const assert = require('node:assert/strict');
const fs = require('node:fs');

const app = fs.readFileSync('app.js', 'utf8');
const css = fs.readFileSync('styles.css', 'utf8');
const danceApp = fs.readFileSync('computer-apps.js', 'utf8');
const danceData = fs.readFileSync('dance-reference-data.js', 'utf8');
const cache = fs.readFileSync('game-cache.js', 'utf8');

for (const name of ['receptor-left','receptor-down','receptor-up','receptor-right','note-left','note-down','note-up','note-right']) {
  const file = `assets/dance-reference/arrows/${name}.png`;
  assert(fs.existsSync(file), `missing original arrow frame ${file}`);
  assert(cache.includes(name) && cache.includes('dance-reference/arrows/'), `offline cache is missing ${file}`);
}
assert(danceApp.includes('danceArrowImages'), 'falling notes must use original arrow images');
assert(danceApp.includes('dance-reference/arrows/receptor-'), 'fixed receptors must use original arrow images');

const dataStart = danceData.indexOf('const data=') + 'const data='.length;
const dataEnd = danceData.indexOf(';if(typeof module', dataStart);
const data = JSON.parse(danceData.slice(dataStart, dataEnd));
const erect = data.tracks.find(track => track.id === 'reference-colorful-bunch-erect');
assert(erect, 'Colorful Bunch Erect is missing');
assert(erect.reference && erect.notes.length > 2500, 'Colorful Bunch Erect must keep its original chart');
assert.equal(erect.audioStems.length, 3, 'Colorful Bunch Erect must keep all three original stems');
for (const stem of erect.audioStems) assert(fs.existsSync(stem.replace('./', '')), `missing Erect soundtrack stem ${stem}`);

for (const token of ['startHomeChase', 'startHomeLawnConcert', 'sendHomeRunnerBeyondScreen', 'HOME_LAWN_CAST']) {
  assert(app.includes(token), `infinite lawn behavior is missing ${token}`);
}
for (const id of ['gray','brud','garnold','owakcx','sky','durple','simon','tunner','wenda','jevin']) {
  assert(cache.includes(`'${id}'`), `offline cache is missing arriving lawn character ${id}`);
}
for (const token of ['home-chasing-a', 'home-chasing-b', 'home-running-out', 'home-concert']) {
  assert(css.includes(token), `lawn group animation is missing ${token}`);
}

console.log('Original FNF arrows, Erect chart, endless lawn arrivals, chase and concert verified.');
