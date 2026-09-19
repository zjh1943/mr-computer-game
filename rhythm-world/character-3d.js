import * as THREE from './vendor/three.module.min.js';
import { getCharacter } from './character-catalog.js';

const loader = new THREE.TextureLoader();
const textureCache = new Map();

function getTexture(id) {
  if (!textureCache.has(id)) {
    const texture = loader.load(`assets/sprunki-2d/${id}.png`);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    textureCache.set(id, texture);
  }
  return textureCache.get(id);
}

export function createCharacter3D(id, { scale = 1 } = {}) {
  const character = getCharacter(id);
  const group = new THREE.Group();
  group.name = id;
  group.userData = {
    id,
    color: character.color,
    features: character.features,
    baseScale: scale,
    spritePath: `assets/sprunki-2d/${id}.png`
  };

  const material = new THREE.SpriteMaterial({
    map: getTexture(id),
    transparent: true,
    alphaTest: 0.08,
    depthWrite: false
  });
  const sprite = new THREE.Sprite(material);
  sprite.name = 'characterSprite';
  sprite.center.set(0.5, 0.04);
  sprite.scale.set(1.8, 2.8, 1);
  sprite.userData.interactable = id;
  group.add(sprite);

  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(0.46, 24),
    new THREE.MeshBasicMaterial({ color: 0x132b22, transparent: true, opacity: 0.22, depthWrite: false })
  );
  shadow.name = 'characterShadow';
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.012;
  group.add(shadow);
  group.scale.setScalar(scale);
  return group;
}

export function setCharacterMotion(group, { moving = false, speaking = false, time = 0 } = {}) {
  const baseScale = group.userData.baseScale || group.scale.x || 1;
  const bounce = Math.abs(Math.sin(time * 0.006)) * (moving ? 0.12 : 0.025);
  group.position.y = bounce;
  const pulse = speaking ? 1 + Math.sin(time * 0.018) * 0.045 : 1;
  group.scale.set(baseScale * pulse, baseScale * pulse, baseScale);
}
