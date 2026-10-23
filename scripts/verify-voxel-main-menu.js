const assert = require('node:assert/strict');
const fs = require('node:fs');

const shell = fs.readFileSync('voxel-shell.js', 'utf8');
const portal = fs.readFileSync('computer-portal.js', 'utf8');
const page = fs.readFileSync('computer.html', 'utf8');

assert.match(shell, /function main\(\)\{[\s\S]*开始游戏/, 'the game should open on a start menu instead of loading a world immediately');
assert.match(shell, /世界与存档/, 'the main menu should link to local saves');
assert.match(shell, /创建新世界/, 'the main menu should let players create another world');
assert.match(shell, /背景音乐：点击开启/, 'the main menu should have an offline background music control');
assert.match(shell, /复制世界/, 'each save should have a copy action');
assert.match(shell, /删除存档/, 'each save should have a delete action');
assert.match(shell, /保存并退出/, 'the pause menu should save then return to the title screen');
assert.match(shell, /main\(\);return\(\)=>/, 'mount should enter the title menu on startup');
assert.doesNotMatch(shell, /startImmediately\(\);return\(\)=>/, 'mount should not skip the title menu');
assert.match(portal, /revision='20261023-voxelmenu1'/, 'the desktop loader should fetch the current world menu files');
assert.match(page, /computer-portal\.js\?v=20261023-voxelmenu1/, 'the computer page should refresh its world loader');

console.log('Voxel main menu, local saves and exit flow verified.');
