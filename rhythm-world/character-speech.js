export const MOUTH_SHAPES = ['triangle', 'line', 'quadrilateral', 'square'];

const profiles = {
  'fun-bot': { lang: 'zh-CN', pitch: 1.35, rate: 1.05 },
  'mr-fun-computer': { lang: 'zh-CN', pitch: 1.45, rate: 1.12 },
  'mr-tree': { lang: 'zh-CN', pitch: 0.68, rate: 0.78 },
  black: { lang: 'zh-CN', pitch: 0.55, rate: 0.76 },
  pinki: { lang: 'zh-CN', pitch: 1.5, rate: 1.04 },
  simon: { lang: 'zh-CN', pitch: 1.18, rate: 1.08 },
  gray: { lang: 'zh-CN', pitch: 0.9, rate: 0.9 }
};

export function getMouthShape(step) {
  return MOUTH_SHAPES[Math.abs(step) % MOUTH_SHAPES.length];
}

export function getVoiceProfile(id) {
  return profiles[id] || { lang: 'zh-CN', pitch: 1 + ((id.length % 5) - 2) * 0.08, rate: 0.92 + (id.length % 4) * 0.04 };
}

export function getDialogueChoices() {
  return ['answer', 'ignore'];
}

export function transitionReplyState(current, action) {
  if (current === 'choice' && action === 'answer') return 'input';
  if (action === 'ignore') return 'closed';
  if (current === 'input' && action === 'send') return 'closed';
  return current;
}
