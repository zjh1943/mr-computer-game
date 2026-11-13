import fs from'node:fs';import assert from'node:assert/strict';
const source=fs.readFileSync(new URL('../rhythm-world.js',import.meta.url),'utf8');
const html=fs.readFileSync(new URL('../rhythm-world.html',import.meta.url),'utf8');
assert.doesNotMatch(html,/id="interact"/,'取消底部互动按钮，角色和建筑改为直接点击');
assert.match(source,/function updateTalkPrompt\(\)/,'靠近角色时必须显示点击对话提示');
console.log('Direct-click conversation verification passed.');
