const assert = require('node:assert/strict');
const fs = require('node:fs');

const html = fs.readFileSync('index.html', 'utf8');
const css = fs.readFileSync('styles.css', 'utf8');
const app = fs.readFileSync('app.js', 'utf8');

for (const id of ['oren', 'raddy', 'clukr', 'fun-bot', 'vineria', 'pinki']) {
  assert(html.includes(`data-sprunki-id="${id}"`), `${id} is missing from the home lawn`);
  assert(fs.existsSync(`assets/sprunki-views/front/${id}.png`), `${id} front sprite is missing`);
  assert(fs.existsSync(`assets/sprunki-views/left/${id}.png`), `${id} left sprite is missing`);
  assert(fs.existsSync(`assets/sprunki-views/right/${id}.png`), `${id} right sprite is missing`);
}

for (const token of ['setupHomeLawnCast', 'startHomeComputerSong', 'computer.wav', 'home-help-needed', 'home-helping']) {
  assert(app.includes(token) || css.includes(token), `home lawn behavior is missing ${token}`);
}
for (const lyric of ['HELLO!', 'WOULD YOU LIKE', 'TO HAVE SOME FUN', 'WITH US RIGHT NOW?', 'COME AND SING!']) {
  assert(app.includes(lyric), `home computer song is missing lyric: ${lyric}`);
}
assert(css.includes('.beatbox-runners'), 'home lawn cast layout is missing');
assert(css.includes('.beat-runner.home-playing'), 'home lawn play animation is missing');

console.log('Home lawn cast, original computer song, expressions and help event verified.');
