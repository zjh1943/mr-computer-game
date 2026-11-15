import assert from 'node:assert/strict';
import fs from 'node:fs';
const html=fs.readFileSync(new URL('../rhythm-world.html',import.meta.url),'utf8');
assert.match(html,/location\.protocol\s*===\s*['"]file:/,'local file launch must be detected');
assert.match(html,/zjh1943\.github\.io\/mr-computer-game\/rhythm-world\.html/,'local file launch must redirect to the working GitHub Pages game');
console.log('Verified local file launch redirects to the hosted game.');
