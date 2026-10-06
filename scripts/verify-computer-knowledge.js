const assert = require('node:assert/strict');
const knowledge = require('../computer-knowledge.js');

const memory = {};
const questions = [
  '为什么树叶是绿色的',
  '鸡会吃什么',
  '怎么在我的世界里做工作台',
  '给我讲一个小故事',
  '红色和蓝色混在一起是什么颜色',
  '作业太难了怎么办',
  '今天想玩什么游戏',
  '电脑为什么会发热'
];
for (const question of questions) {
  const answer = knowledge.reply(question, memory, []);
  assert(answer && answer.length >= 12, `${question} should receive a useful answer`);
  assert(!/不知道|不会回答|换个说法/.test(answer), `${question} should not receive the old ignorance fallback: ${answer}`);
}
assert(knowledge.facts.length >= 24, 'the offline dialogue library should contain at least 24 knowledge patterns');
console.log('Expanded offline computer dialogue library verified.');
