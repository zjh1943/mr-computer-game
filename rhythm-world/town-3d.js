import * as THREE from './vendor/three.module.min.js';
import { CHUNK_SIZE_3D, getDesiredChunkKeys, parseChunkKey, seededValue } from './world-stream.js';
import { TOWN_HOUSEHOLDS } from './home-layout.js';
import { MUSIC_PLAZA_POSITION } from './town-layout.js';

const material = color => new THREE.MeshStandardMaterial({ color, roughness: .86 });
const textureLoader = new THREE.TextureLoader();
const mrTreeTexture = textureLoader.load('assets/sprunki-views/front/mr-tree.png');
mrTreeTexture.colorSpace = THREE.SRGBColorSpace;
function cast(object) { object.traverse(node => { if (node.isMesh) { node.castShadow = true; node.receiveShadow = true; } }); return object; }

export function houseSign(text) {
  const canvas = document.createElement('canvas'); canvas.width = 512; canvas.height = 128;
  const ctx = canvas.getContext('2d'); ctx.fillStyle = '#fff1a8'; ctx.strokeStyle = '#50324d'; ctx.lineWidth = 14;
  ctx.beginPath(); ctx.roundRect(8, 8, 496, 112, 24); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#38233a'; ctx.font = 'bold 32px "Microsoft YaHei", sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(text.length > 15 ? `${text.slice(0, 15)}…` : text, 256, 64);
  const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace;
  const sign = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false }));
  sign.name = 'houseSign'; sign.scale.set(4.5, 1.12, 1); sign.position.set(0, 4.05, 2.55); return sign;
}

function house(home, color = 0xf3a875) {
  const group = new THREE.Group();
  const base = new THREE.Mesh(new THREE.BoxGeometry(5, 3.4, 4.5), material(color)); base.position.y = 1.7; group.add(base);
  const roof = new THREE.Mesh(new THREE.ConeGeometry(4.2, 2, 4), material(0x7d4262)); roof.position.y = 4.35; roof.rotation.y = Math.PI / 4; group.add(roof);
  const door = new THREE.Mesh(new THREE.BoxGeometry(1.1, 2, .18), material(0x513044)); door.position.set(0, 1, 2.34); group.add(door);
  group.add(houseSign(home.label)); group.userData = { kind: 'residentHome', id: home.id, label: home.label, residents: home.residents };
  group.traverse(node => node.userData.interactable = 'residentHome'); return cast(group);
}
function serviceBuilding(kind, label, color) { const group = house({ id: kind, label, residents: [] }, color); group.userData.kind = kind; group.userData.label = label; group.traverse(node => node.userData.interactable = kind); return group; }

export function musicPlaza() {
  const group = new THREE.Group();
  const platform = new THREE.Mesh(new THREE.CylinderGeometry(5.4, 5.8, .65, 32), material(0x7565dd)); platform.position.y = .32; group.add(platform);
  const arch = new THREE.Mesh(new THREE.TorusGeometry(3.2, .23, 10, 30, Math.PI), material(0xffd85e)); arch.rotation.z = Math.PI; arch.position.set(0, 3.1, -1.8); group.add(arch);
  for (const x of [-3.1, 3.1]) { const post = new THREE.Mesh(new THREE.CylinderGeometry(.2, .25, 3.1, 10), material(0xffd85e)); post.position.set(x, 1.7, -1.8); group.add(post); }
  const sign = houseSign('♫ 节奏盒子音乐广场 ♫'); sign.position.set(0, 5, -1.7); group.add(sign);
  const note = new THREE.Mesh(new THREE.TorusGeometry(.62, .2, 10, 24), material(0x66efff)); note.position.set(0, 1.6, -1.7); group.add(note);
  group.userData = { kind: 'music', label: '节奏盒子音乐广场' }; group.traverse(node => node.userData.interactable = 'music'); return cast(group);
}

function tree(x, z, scale = 1) {
  const group = new THREE.Group();
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: mrTreeTexture, transparent: true, alphaTest: .03, depthWrite: false }));
  sprite.center.set(.5, .02); sprite.scale.set(2.8 * scale, 4.2 * scale, 1); group.add(sprite);
  const shadow = new THREE.Mesh(new THREE.CircleGeometry(.7 * scale, 20), new THREE.MeshBasicMaterial({ color: 0x16351e, transparent: true, opacity: .22, depthWrite: false })); shadow.rotation.x = -Math.PI / 2; shadow.position.y = .02; group.add(shadow);
  group.position.set(x, 0, z); group.userData = { kind: 'decorativeTree', solidRadius: .72 * scale }; return group;
}
export function createHills(seed, cx, cz) {
  const hills = new THREE.Group(); hills.name = 'rollingHills';
  for (let i = 0; i < 4; i++) {
    const random = seededValue(seed, cx * 29 + i, cz * 31 - i), hill = new THREE.Mesh(new THREE.SphereGeometry(4.5 + random * 3, 18, 10), material(random > .5 ? 0x5ca954 : 0x68b75d));
    hill.scale.set(1.7, .42 + random * .12, 1); hill.position.set((i % 2 ? 1 : -1) * (10 + random * 5), -2.6, -14 + i * 9); hills.add(hill);
  }
  return hills;
}
function groundChunk(cx, cz, seed) {
  const group = new THREE.Group(), value = seededValue(seed, cx, cz);
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(CHUNK_SIZE_3D, CHUNK_SIZE_3D), material(value > .66 ? 0x83c966 : value > .33 ? 0x78bd60 : 0x70ad68)); ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; group.add(ground);
  const road = new THREE.Mesh(new THREE.PlaneGeometry(5.4, CHUNK_SIZE_3D), material(0xd8c28e)); road.rotation.x = -Math.PI / 2; road.position.y = .015; group.add(road);
  group.add(createHills(seed,cx,cz));
  for (let i = 0; i < 4; i++) { const random = seededValue(seed, cx * 13 + i, cz * 17 - i); group.add(tree((random > .5 ? 1 : -1) * (6 + random * 9), -13 + i * 8.5, .78 + random * .28)); }
  group.position.set(cx * CHUNK_SIZE_3D, 0, cz * CHUNK_SIZE_3D); return group;
}

export function createTown3D({ scene, seed = 'world' }) {
  const root = new THREE.Group(); root.name = 'town3d'; scene.add(root); const chunks = new Map(), interactables = [];
  function add(object, x, z) { object.position.set(x, 0, z); root.add(object); interactables.push(object); return object; }
  add(serviceBuilding('factory', '角色生产中心', 0xaeb6c4), 0, -8); add(serviceBuilding('shop', '节拍商店', 0xffbd59), 10, -8); add(musicPlaza(), MUSIC_PLAZA_POSITION.x, MUSIC_PLAZA_POSITION.z);
  const cave = add(serviceBuilding('cave', '山洞', 0x615969), 16, 10); cave.scale.set(1, .45, 1);
  for (const home of TOWN_HOUSEHOLDS) add(house(home), home.x, home.z);
  function update(position) { const wanted = new Set(getDesiredChunkKeys(position, 2)); for (const key of wanted) if (!chunks.has(key)) { const { x, z } = parseChunkKey(key), chunk = groundChunk(x, z, seed); chunks.set(key, chunk); root.add(chunk); } for (const [key, chunk] of chunks) if (!wanted.has(key)) { root.remove(chunk); chunks.delete(key); } }
  const temp = new THREE.Vector3();
  return { root, update, getInteractables: () => interactables, getSolidColliders: () => [...chunks.values()].flatMap(chunk => chunk.children.filter(child => child.userData.kind === 'decorativeTree').map(child => { child.getWorldPosition(temp); return { x: temp.x, z: temp.z, radius: child.userData.solidRadius }; })), getGroundHeight: () => 0, dispose() { scene.remove(root); root.traverse(object => { object.geometry?.dispose(); if (object.material) Array.isArray(object.material) ? object.material.forEach(item => item.dispose()) : object.material.dispose(); }); }, get loadedChunkCount() { return chunks.size; } };
}
