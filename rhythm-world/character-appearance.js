const SPECIAL_EYES = {
  'mr-fun-computer': { iris: '#ffffff', sclera: '#ffffff' },
  'mr-sun': { iris: '#111111', sclera: '#111111' },
  'mr-tree': { iris: '#111111', sclera: '#111111' }
};

const MOUTH_ANCHORS = {
  'mr-fun-computer': { x: 0, y: 1.48, color: '#050505' },
  'mr-sun': { x: 0, y: 1.42, color: '#ffd32a' },
  'mr-tree': { x: 0, y: 1.32, color: '#754019' },
  black: { x: 0, y: 1.42, color: '#080808' }
};

export function eyeStyleFor(id) {
  return SPECIAL_EYES[id] || { iris: '#17131f', sclera: '#ffffff' };
}

export function mouthAnchorFor(id) {
  return MOUTH_ANCHORS[id] || { x: 0, y: 1.42, color: null };
}

export function needsEyeCorrection(id) {
  return id !== 'mr-fun-computer' && Object.hasOwn(SPECIAL_EYES, id);
}
