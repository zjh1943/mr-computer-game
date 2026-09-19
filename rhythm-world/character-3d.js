import * as THREE from './vendor/three.module.min.js';
import { getCharacter } from './character-catalog.js';
import { getMouthShape } from './character-speech.js';
import { selectCharacterView } from './character-view.js';
import { eyeStyleFor, mouthAnchorFor, needsEyeCorrection } from './character-appearance.js';

const loader = new THREE.TextureLoader();
const textureCache = new Map();

function getTexture(id, view) {
  const key = `${id}:${view}`;
  if (!textureCache.has(key)) {
    const texture = loader.load(`assets/sprunki-views/${view}/${id}.png`);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    textureCache.set(key, texture);
  }
  return textureCache.get(key);
}

function canvasSprite(name, width, height, scaleX, scaleY) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false }));
  sprite.name = name;
  sprite.scale.set(scaleX, scaleY, 1);
  sprite.userData.canvas = canvas;
  sprite.userData.texture = texture;
  return sprite;
}

function drawMouth(sprite, shape, coverColor) {
  const canvas = sprite.userData.canvas;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = coverColor || '#888888';
  ctx.beginPath();
  ctx.ellipse(64, 66, 54, 46, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#17131f';
  ctx.strokeStyle = '#17131f';
  ctx.lineWidth = 14;
  ctx.lineCap = 'round';
  ctx.beginPath();
  if (shape === 'triangle') { ctx.moveTo(64, 30); ctx.lineTo(105, 102); ctx.lineTo(23, 102); ctx.closePath(); ctx.fill(); }
  if (shape === 'line') { ctx.moveTo(20, 66); ctx.lineTo(108, 66); ctx.stroke(); }
  if (shape === 'quadrilateral') { ctx.moveTo(25, 36); ctx.lineTo(103, 30); ctx.lineTo(92, 103); ctx.lineTo(34, 108); ctx.closePath(); ctx.fill(); }
  if (shape === 'square') { ctx.fillRect(34, 36, 62, 62); }
  sprite.userData.texture.needsUpdate = true;
}

function drawCorrectedEyes(sprite, id, view, offset = 0) {
  const canvas = sprite.userData.canvas;
  const ctx = canvas.getContext('2d');
  const style = eyeStyleFor(id);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (id === 'mr-fun-computer') {
    ctx.fillStyle = '#050505';
    ctx.beginPath(); ctx.roundRect(10, 8, 180, 84, 22); ctx.fill();
    ctx.fillStyle = style.iris;
    const xs = view === 'front' ? [67, 133] : [view === 'right' ? 132 : 68];
    for (const x of xs) { ctx.beginPath(); ctx.ellipse(x + offset, 50, 11, 25, 0, 0, Math.PI * 2); ctx.fill(); }
  } else {
    ctx.fillStyle = style.iris;
    const xs = view === 'front' ? [68, 132] : [view === 'right' ? 132 : 68];
    for (const x of xs) { ctx.beginPath(); ctx.arc(x + offset, 50, 18, 0, Math.PI * 2); ctx.fill(); }
  }
  sprite.userData.texture.needsUpdate = true;
}

function drawGaze(sprite, offset) {
  const canvas = sprite.userData.canvas;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(255,255,255,.9)';
  for (const x of [58, 142]) { ctx.beginPath(); ctx.arc(x + offset, 40, 9, 0, Math.PI * 2); ctx.fill(); }
  sprite.userData.texture.needsUpdate = true;
}

function drawBubble(sprite, text) {
  const canvas = sprite.userData.canvas;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(255,255,255,.96)';
  ctx.strokeStyle = '#262039';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.roundRect(12, 12, 488, 184, 34);
  ctx.moveTo(220, 196); ctx.lineTo(256, 244); ctx.lineTo(290, 196);
  ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#262039';
  ctx.font = 'bold 31px "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  const shown = text.length > 16 ? `${text.slice(0, 16)}…` : text;
  ctx.fillText(shown, 256, 112);
  sprite.userData.texture.needsUpdate = true;
}

export function createCharacter3D(id, { scale = 1 } = {}) {
  const character = getCharacter(id);
  const group = new THREE.Group();
  group.name = id;
  group.userData = { id, color: character.color, features: character.features, baseScale: scale, view: 'front', speakingUntil: 0 };

  const material = new THREE.SpriteMaterial({ map: getTexture(id, 'front'), transparent: true, alphaTest: 0.03, depthWrite: false });
  const sprite = new THREE.Sprite(material);
  sprite.name = 'characterSprite';
  sprite.center.set(0.5, 0.03);
  sprite.scale.set(1.9, 2.9, 1);
  sprite.userData.interactable = id;
  group.add(sprite);

  const mouth = canvasSprite('mouthSprite', 128, 128, 0.34, 0.34);
  const mouthAnchor = mouthAnchorFor(id);
  mouth.position.set(mouthAnchor.x, mouthAnchor.y, 0.08);
  mouth.scale.set(0.25, 0.25, 1);
  mouth.userData.coverColor = mouthAnchor.color || character.color;
  mouth.visible = false;
  group.add(mouth);

  const correctedEyes = canvasSprite('correctedEyes', 200, 100, 0.7, 0.35);
  correctedEyes.position.set(0, id === 'mr-tree' ? 1.82 : 1.95, 0.095);
  correctedEyes.visible = false;
  group.add(correctedEyes);

  const gaze = canvasSprite('gazeSprite', 200, 100, 0.72, 0.36);
  gaze.position.set(0, 2.02, 0.09);
  gaze.visible = false;
  group.add(gaze);

  const bubble = canvasSprite('speechBubble', 512, 256, 3.1, 1.55);
  bubble.position.set(0, 3.58, 0.1);
  bubble.visible = false;
  group.add(bubble);

  const shadow = new THREE.Mesh(new THREE.CircleGeometry(0.46, 24), new THREE.MeshBasicMaterial({ color: 0x132b22, transparent: true, opacity: 0.22, depthWrite: false }));
  shadow.name = 'characterShadow';
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.012;
  group.add(shadow);
  group.scale.setScalar(scale);
  return group;
}

export function setCharacterSpeech(group, text, duration = 3200) {
  group.userData.speakingUntil = performance.now() + duration;
  group.userData.speechText = text;
  drawBubble(group.getObjectByName('speechBubble'), text);
}

export function stopCharacterSpeech(group) {
  group.userData.speakingUntil = 0;
}

export function setCharacterMotion(group, { moving = false, speaking = false, time = 0, direction = 0, cameraYaw = 0, gazeDirection = 0 } = {}) {
  const baseScale = group.userData.baseScale || group.scale.x || 1;
  const isSpeaking = speaking || time < group.userData.speakingUntil;
  const selected = selectCharacterView(direction, cameraYaw);
  const sprite = group.getObjectByName('characterSprite');
  if (selected.view !== group.userData.view) {
    sprite.material.map = getTexture(group.userData.id, selected.view);
    sprite.material.needsUpdate = true;
    group.userData.view = selected.view;
  }
  sprite.scale.x = Math.abs(sprite.scale.x) * (selected.flip ? -1 : 1);
  const bounce = Math.abs(Math.sin(time * 0.006)) * (moving ? 0.12 : 0.025);
  group.position.y = bounce;
  const pulse = isSpeaking ? 1 + Math.sin(time * 0.018) * 0.035 : 1;
  group.scale.set(baseScale * pulse, baseScale * pulse, baseScale);
  const mouth = group.getObjectByName('mouthSprite');
  const gaze = group.getObjectByName('gazeSprite');
  const correctedEyes = group.getObjectByName('correctedEyes');
  const bubble = group.getObjectByName('speechBubble');
  mouth.visible = isSpeaking && selected.view === 'front';
  correctedEyes.visible = needsEyeCorrection(group.userData.id) && selected.view !== 'back';
  gaze.visible = isSpeaking && selected.view === 'front' && !correctedEyes.visible;
  bubble.visible = isSpeaking;
  if (mouth.visible) drawMouth(mouth, getMouthShape(Math.floor(time / 130)), mouth.userData.coverColor);
  if (correctedEyes.visible) drawCorrectedEyes(correctedEyes, group.userData.id, selected.view, isSpeaking ? Math.sin(time / 320 + gazeDirection) * 5 : 0);
  if (gaze.visible) drawGaze(gaze, Math.sin(time / 320 + gazeDirection) * 8);
}
