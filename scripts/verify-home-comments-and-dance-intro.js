const assert = require('node:assert/strict');
const fs = require('node:fs');

const homeScript = fs.readFileSync('home.js', 'utf8');
const comments = fs.readFileSync('comments.js', 'utf8');
const dance = fs.readFileSync('computer-apps.js', 'utf8');

assert(homeScript.includes('comment-wall'), 'The home page should create its comment wall at the bottom');
assert(homeScript.includes('comments.html'), 'The home page should link to the separate comment board');
assert(homeScript.includes('comments.js'), 'The home page should load its local comment behavior');
assert(comments.includes("'mohan-comment-wall-v1'"), 'Comments should use a stable storage key');
assert(dance.includes('dance-entry-scene'), 'The rhythm game needs a dedicated entry scene');
assert(dance.includes('进入舞台'), 'The entry scene should have an explicit enter button');
assert(dance.includes('playDanceEntranceJingle'), 'Entering should play the local opening jingle');

console.log('Home comments and dance entry scene verified.');
