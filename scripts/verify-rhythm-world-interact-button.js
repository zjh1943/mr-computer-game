import fs from'node:fs';import assert from'node:assert/strict';
const source=fs.readFileSync(new URL('../rhythm-world.js',import.meta.url),'utf8');
assert.match(source,/\$\('#interact'\)\.onclick=\(\)=>interact\(\)/,'互动按钮必须丢弃浏览器点击事件并读取锁定目标');
assert.doesNotMatch(source,/\$\('#interact'\)\.onclick=interact/,'不能把 MouseEvent 当成交互目标');
console.log('Interact button event binding verification passed.');
