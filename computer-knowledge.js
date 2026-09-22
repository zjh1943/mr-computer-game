(function (root) {
  const facts = [
    [/怎么.*(编曲|做歌|混音)|怎么编曲/, '先放底鼓打稳拍子，再加低音，最后加旋律。一次只加一个声音，听一听会不会抢拍。你可以在音乐软件里点亮格子试试！'],
    [/节奏盒子|节奏是什么/, '节奏盒子可以把不同角色的声音叠在一起循环播放。鼓负责拍子，低音撑住音乐，旋律负责让你记住这首歌。你想认识角色，还是试着编一段？'],
    [/为什么.*下雨/, '云里有许多小水滴。水滴聚在一起越来越大，空气托不住它们，就落下来变成雨。'],
    [/为什么.*(天.*蓝|蓝天)/, '阳光里有很多颜色。空气会把蓝色的光散向各个方向，所以白天看天空常常是蓝色。'],
    [/主机|显示器|内存|显卡/, '主机负责计算和保存东西，显示器把画面显示出来。内存像工作桌，显卡负责画图。我的屏幕是脸，主机是帮我思考的小箱子！'],
    [/怎么.*(画画|软件)|你会什么|能做什么/, '我能陪你聊天、算两数运算、介绍小镇角色。应用商店里的画画可以涂鸦，音乐可以编节奏，时钟可以计时。点方块能放大软件。'],
    [/难过|伤心|不开心/, '听起来你有点难过。愿意告诉我发生了什么吗？我会听你说，也可以陪你做一小段音乐。'],
    [/讲.*笑话|逗我/, '小电脑为什么带着雨伞？因为它怕自己变成“水货”！'],
    [/你好|嗨|在吗/, '你好！我在呢。今天想聊点什么，还是一起玩音乐？'],
    [/你是谁|你的名字/, '我是电脑先生！我住在这块屏幕里，喜欢聊天、画画和节奏盒子。'],
    [/谢谢/, '不客气！这次帮上忙，我很开心。'],
    [/再见|拜拜/, '拜拜！下次再来找我玩。'],
    [/聪明/, '大屏幕和小屏幕用的是同一个脑袋。我会用知道的知识回答，不知道的事情会直接告诉你。']
  ];
  function reply(text, memory = {}, characters = []) {
    text = String(text).trim();
    if (/恐怖|开机|关机|飞起来|降落|电脑先生之歌|^没有/.test(text)) return null;
    if (/我叫什么|记得.*名字/.test(text)) return memory.name ? `你叫${memory.name}，我记得！` : '你还没有告诉我名字。可以说“我叫小明”。';
    const name = text.match(/^(?:我叫|我的名字是)([^，。！？\s]{1,16})[。！]?$/);
    if (name) { memory.name = name[1]; return `你好，${memory.name}！我记住你的名字了。`; }
    if (/忘记.*名字|清除.*记忆/.test(text)) { delete memory.name; return '好的，我已经忘记你告诉我的名字。'; }
    const math = text.replace(/加上|加/g, '+').replace(/减去|减/g, '-').replace(/乘以|乘|×/g, '*').replace(/除以|除|÷/g, '/').match(/^\s*(-?\d+(?:\.\d+)?)\s*([+*/-])\s*(-?\d+(?:\.\d+)?)(?:\s*(?:等于多少|是多少|等于|=|？|\?))*\s*$/);
    if (math) {
      const a = Number(math[1]), b = Number(math[3]);
      if (math[2] === '/' && b === 0) return '不能除以零。可以换一个不是零的数试试。';
      const n = ({ '+': () => a + b, '-': () => a - b, '*': () => a * b, '/': () => a / b })[math[2]]();
      return Number.isFinite(n) ? `${a} ${math[2]} ${b} = ${Number(n.toPrecision(12))}。` : '这个数太大了，超出了我能准确计算的范围。';
    }
    const character = characters.find(c => text.toLowerCase().includes(c.name.toLowerCase()) || text.includes(c.zh));
    if (character) { memory.topic = character.zh; return `${character.zh}（${character.name}）是我们小镇的角色，在这个游戏里使用 ${character.voice} 音色。你可以到小镇点头像找它！`; }
    if (/它呢|他呢|她呢/.test(text) && memory.topic) return `我们刚才说的是${memory.topic}，可以去小镇听它的声音。`;
    if (/几点|时间/.test(text)) return `现在是${new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}。`;
    const fact = facts.find(([pattern]) => pattern.test(text));
    if (fact) return fact[1];
    return '这个我还不知道，不能随便编答案。你可以换个说法，或者问我小镇角色、节奏搭配、简单算术和电脑知识。';
  }
  const api = { reply, facts };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.ComputerKnowledge = api;
})(typeof window === 'undefined' ? globalThis : window);
