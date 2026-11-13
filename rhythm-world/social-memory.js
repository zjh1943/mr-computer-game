const friendlyWords = /你好|谢谢|喜欢|朋友|一起|帮你|对不起|加油/;
const unkindWords = /讨厌|笨|坏蛋|不理你|走开|滚/;

export function createRelationship(value = {}) {
  return {
    trust: Number(value.trust) || 0,
    helped: Number(value.helped) || 0,
    ignored: Number(value.ignored) || 0,
    tone: value.tone || 'neutral'
  };
}

export function applyConversation(value, text = '') {
  const next = createRelationship(value);
  if (unkindWords.test(text)) next.trust -= 3;
  else if (friendlyWords.test(text)) next.trust += 2;
  next.trust = Math.max(-10, Math.min(10, next.trust));
  next.tone = next.trust >= 2 ? 'friendly' : next.trust < 0 ? 'cold' : 'neutral';
  return next;
}

export function recordHelp(value, helped) {
  const next = createRelationship(value);
  if (helped) { next.helped += 1; next.trust = Math.min(10, next.trust + 3); }
  else { next.ignored += 1; next.trust = Math.max(-10, next.trust - 2); }
  next.tone = next.trust >= 2 ? 'friendly' : next.trust < 0 ? 'cold' : 'neutral';
  return next;
}

export function willHelp(value) {
  const relation = createRelationship(value);
  return relation.helped > relation.ignored || relation.trust >= 2;
}

export function replyFor(value) {
  const relation = createRelationship(value);
  if (relation.tone === 'friendly') return '我记得你一直很友好。遇到困难就来找我，我们互相帮助！';
  if (relation.tone === 'cold') return '我记得你刚才不太友好。我们先好好说话，关系才会慢慢变好。';
  return '我听见了。我们多聊聊，也许会成为好朋友。';
}
