const assert = require('node:assert/strict');
const fs = require('node:fs');

const comments = fs.readFileSync('comments.js', 'utf8');
const board = fs.readFileSync('comments.html', 'utf8');
const homeScript = fs.readFileSync('home.js', 'utf8');
const dance = fs.readFileSync('computer-apps.js', 'utf8');

assert(board.includes('data-comment-list'), 'The standalone comment board should show its comments');
assert(!board.includes('data-comment-form'), 'The standalone comment board should stay read-only');
assert(homeScript.includes('comment-wall'), 'The home page should create the public comment wall');
assert(homeScript.includes('data-comment-form'), 'Visitors should post comments from the home page');
assert(comments.includes("'mohan-comment-wall-v1'"), 'Comments should use a stable storage key');
assert(!dance.includes('dance-entry-scene'), 'The dance entry scene should not be installed');
assert(!dance.includes('playDanceEntranceJingle'), 'The dance opening jingle should not be installed');

console.log('Home comments-only experience verified.');
