const assert = require('node:assert/strict');
const fs = require('node:fs');
const { ageAt, games, gameUrl } = require('../home-data.js');
assert.equal(ageAt('2026-10-11'),8);
assert.equal(ageAt('2027-02-22'),8);
assert.equal(ageAt('2027-02-23'),9);
assert.equal(ageAt('2028-02-23'),10);
const home = fs.readFileSync('index.html','utf8');
assert(!/<iframe|game-runtime|app\.js|game-cache|preload|prefetch/.test(home),'Home must not load or prefetch game resources');
assert(home.includes('朱墨涵'));
assert.equal(new Set(games.map(g=>g.domain)).size,games.length);
assert(games.some(g=>g.id==='world'&&g.name==='节奏盒子世界'));
for(const game of games){assert.equal(gameUrl(game),'/games/'+game.domain);const html=fs.readFileSync('public/games/'+game.domain+'.html','utf8');assert(html.includes('<base href="/">'),'Nested game assets must resolve from root');}
const config=JSON.parse(fs.readFileSync('vercel.json'));for(const rule of config.rewrites)assert(fs.existsSync('public'+rule.destination));
assert(fs.readFileSync('public/games/minecraft.html','utf8').includes('data-entry="minecraft"'));
assert(!fs.readFileSync('public/games/snake.html','utf8').includes('source-performance-data'));
assert(!fs.readFileSync('game-cache.js','utf8').includes('addAll'),'No bulk prefetch');
assert(!fs.readFileSync('game-runtime.js','utf8').includes('requestIdleCallback'),'No speculative Three engine preload');
console.log('Age boundaries, homepage isolation and game registry passed.');
