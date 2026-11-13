import * as THREE from './vendor/three.module.min.js';
import { CHUNK_SIZE_3D, getDesiredChunkKeys, parseChunkKey, seededValue } from './world-stream.js';
import { TOWN_HOUSEHOLDS } from './home-layout.js';
import { MUSIC_PLAZA_POSITION } from './town-layout.js';
import { createCityPlan, getTrafficLightState, trafficPose, trafficPosition } from './city-layout.js';

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
function cityBuilding(x,z,height,color){const tower=new THREE.Mesh(new THREE.BoxGeometry(5,height,5),material(color));tower.position.set(x,height/2,z);tower.name='cityBuilding';return cast(tower)}
function villageMarker(label,x,z){const group=new THREE.Group();group.name='villageMarker';const hut=house({id:label,label:`${label}村`,residents:[]},0xe7a96c);hut.scale.set(.72,.72,.72);group.add(hut);group.position.set(x,0,z);return group}
function createCityDistrict(seed){const plan=createCityPlan(seed),group=new THREE.Group(),cars=[],pedestrians=[];group.name='livingCity';for(const road of plan.roads){const horizontal=road.axis==='x';const mesh=new THREE.Mesh(new THREE.PlaneGeometry(horizontal?road.length:road.width,horizontal?road.width:road.length),material(0x343a43));mesh.rotation.x=-Math.PI/2;mesh.position.set(road.x,.035,road.z);group.add(mesh);const stripe=new THREE.Mesh(new THREE.PlaneGeometry(horizontal?road.length:.18,horizontal?.18:road.length),material(0xffe47a));stripe.rotation.x=-Math.PI/2;stripe.position.set(road.x,.05,road.z);group.add(stripe)}for(const x of[-69,-31,31,69]){const walk=new THREE.Mesh(new THREE.BoxGeometry(8,.22,150),material(0xc9c7bd));walk.position.set(x,.1,78);group.add(walk)}for(const b of plan.buildings){const building=new THREE.Mesh(new THREE.BoxGeometry(b.width,b.height,b.depth),new THREE.MeshStandardMaterial({color:b.color,roughness:.72,metalness:.08}));building.position.set(b.x,b.height/2,b.z);building.castShadow=building.receiveShadow=true;building.userData={kind:'cityBuilding',solidRadius:b.width*.55};group.add(building);for(let floor=2;floor<b.height-1;floor+=3.2){const windows=new THREE.Mesh(new THREE.BoxGeometry(b.width*.72,.72,.08),new THREE.MeshStandardMaterial({color:0xffe9a8,emissive:0x6e571c,emissiveIntensity:.38}));windows.position.set(b.x,floor,b.z+b.depth/2+.05);group.add(windows)}}for(let z=12;z<148;z+=17)for(const x of[-8,8]){const pole=new THREE.Mesh(new THREE.CylinderGeometry(.07,.1,3.2,8),material(0x333943));pole.position.set(x,1.6,z);const lamp=new THREE.Mesh(new THREE.SphereGeometry(.24,10,8),new THREE.MeshStandardMaterial({color:0xfff1b2,emissive:0xffd45b,emissiveIntensity:.7}));lamp.position.set(x,3.25,z);group.add(pole,lamp)}for(const data of plan.cars){const car=new THREE.Group(),body=new THREE.Mesh(new THREE.BoxGeometry(2.3,.7,1.2),material(data.color)),cab=new THREE.Mesh(new THREE.BoxGeometry(1.15,.55,1.05),material(0x9ed6e8));body.position.y=.48;cab.position.set(-.15,1,.0);car.add(body,cab);for(const x of[-.72,.72])for(const z of[-.62,.62]){const wheel=new THREE.Mesh(new THREE.CylinderGeometry(.22,.22,.15,10),material(0x202126));wheel.rotation.x=Math.PI/2;wheel.position.set(x,.28,z);car.add(wheel)}car.userData={kind:'trafficCar',data};group.add(car);cars.push(car)}for(const data of plan.pedestrians){const texture=textureLoader.load(`assets/sprunki-views/front/${data.character}.png`);texture.colorSpace=THREE.SRGBColorSpace;const person=new THREE.Sprite(new THREE.SpriteMaterial({map:texture,transparent:true,alphaTest:.03}));person.scale.set(1.5,2.3,1);person.center.set(.5,.05);person.userData={data};group.add(person);pedestrians.push(person)}group.userData={plan,cars,pedestrians};return group}

function canvasTexture(draw,width=256,height=256){const canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;draw(canvas.getContext('2d'),canvas);const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;texture.wrapS=texture.wrapT=THREE.RepeatWrapping;return texture}
function facadeTexture(color){return canvasTexture((ctx,canvas)=>{ctx.fillStyle=`#${color.toString(16).padStart(6,'0')}`;ctx.fillRect(0,0,canvas.width,canvas.height);for(let y=18;y<240;y+=38)for(let x=15;x<240;x+=42){ctx.fillStyle=(x+y)%80?'#bfe8f5':'#ffe69a';ctx.fillRect(x,y,26,22);ctx.strokeStyle='#39495e';ctx.lineWidth=4;ctx.strokeRect(x,y,26,22)}ctx.fillStyle='#ffffff20';for(let y=0;y<256;y+=16)ctx.fillRect(0,y,256,2)})}
function moodTexture(mood){const symbol={happy:'😊',curious:'？',calm:'♪',excited:'★'}[mood]||'♪';return canvasTexture((ctx,canvas)=>{ctx.fillStyle='#fff';ctx.strokeStyle='#362d4b';ctx.lineWidth=10;ctx.beginPath();ctx.roundRect(12,12,232,190,38);ctx.fill();ctx.stroke();ctx.beginPath();ctx.moveTo(95,200);ctx.lineTo(125,246);ctx.lineTo(150,200);ctx.fill();ctx.font='120px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle='#352b4d';ctx.fillText(symbol,128,108)})}
function createDetailedCityDistrict(seed){
  const plan=createCityPlan(seed),group=new THREE.Group(),cars=[],pedestrians=[],signals=[],doors=[];group.name='livingCity';
  for(const road of plan.roads){const horizontal=road.axis==='x',roadMesh=new THREE.Mesh(new THREE.PlaneGeometry(horizontal?road.length:road.width,horizontal?road.width:road.length),material(0x303640));roadMesh.rotation.x=-Math.PI/2;roadMesh.position.set(road.x,.035,road.z);group.add(roadMesh);for(let n=-68;n<=68;n+=8){const stripe=new THREE.Mesh(new THREE.PlaneGeometry(horizontal?3:.16,horizontal?.16:3),material(0xffdf62));stripe.rotation.x=-Math.PI/2;stripe.position.set(horizontal?n:road.x,.05,horizontal?road.z:78+n);group.add(stripe)}}
  for(const b of plan.buildings){const tower=new THREE.Mesh(new THREE.BoxGeometry(b.width,b.height,b.depth),new THREE.MeshStandardMaterial({map:facadeTexture(b.color),roughness:.68}));tower.position.set(b.x,b.height/2,b.z);tower.castShadow=tower.receiveShadow=true;tower.userData={kind:'cityBuilding',solidRadius:b.width*.48};group.add(tower);const front=b.entrance.side==='south'?-1:1,door=new THREE.Mesh(new THREE.BoxGeometry(1.7,2.7,.22),material(0x493224));door.name='cityDoor';door.position.set(b.x,1.35,b.z+front*(b.depth/2+.13));door.userData={kind:'residentHome',id:b.id,label:b.label,residents:[],interactable:'residentHome'};group.add(door);doors.push(door);for(let step=0;step<3;step++){const stair=new THREE.Mesh(new THREE.BoxGeometry(2.6-step*.35,.16+step*.13,.65),material(0xaaa59d));stair.name='cityStairs';stair.position.set(b.x,.08+step*.13,b.z+front*(b.depth/2+.55+step*.48));group.add(stair)}const sign=houseSign(b.label);sign.scale.multiplyScalar(.65);sign.position.set(b.x,3.35,b.z+front*(b.depth/2+.2));group.add(sign)}
  for(const point of plan.signals){const signal=new THREE.Group();signal.name='trafficSignal';const pole=new THREE.Mesh(new THREE.CylinderGeometry(.1,.13,3.2,8),material(0x252a31));pole.position.y=1.6;signal.add(pole);const lamps={};for(const [i,name]of['red','yellow','green'].entries()){const lamp=new THREE.Mesh(new THREE.SphereGeometry(.18,12,8),new THREE.MeshStandardMaterial({color:0x242424,emissive:0x000000}));lamp.position.set(0,2.85-i*.4,0);signal.add(lamp);lamps[name]=lamp}signal.position.set(point.x,0,point.z);signal.userData={lamps,axis:Math.abs(point.x)<10?'x':'z'};group.add(signal);signals.push(signal)}
  for(const data of plan.cars){const car=new THREE.Group(),body=new THREE.Mesh(new THREE.BoxGeometry(2.4,.7,1.25),material(data.color)),cab=new THREE.Mesh(new THREE.BoxGeometry(1.15,.62,1.08),new THREE.MeshStandardMaterial({color:0x9ed6e8,transparent:true,opacity:.72,roughness:.15}));body.position.y=.5;cab.position.set(-.12,1,0);car.add(body,cab);for(const x of[-.75,.75])for(const z of[-.64,.64]){const wheel=new THREE.Mesh(new THREE.CylinderGeometry(.22,.22,.15,10),material(0x202126));wheel.rotation.x=Math.PI/2;wheel.position.set(x,.28,z);car.add(wheel)}const driverTexture=textureLoader.load(`assets/sprunki-views/front/${data.driver}.png`);driverTexture.colorSpace=THREE.SRGBColorSpace;const driver=new THREE.Sprite(new THREE.SpriteMaterial({map:driverTexture,transparent:true,alphaTest:.03}));driver.name='driverSprite';driver.scale.set(.55,.72,1);driver.position.set(-.1,1.08,0);car.add(driver);car.userData={kind:'trafficCar',data};group.add(car);cars.push(car)}
  for(const data of plan.pedestrians){const texture=textureLoader.load(`assets/sprunki-views/front/${data.character}.png`);texture.colorSpace=THREE.SRGBColorSpace;const walker=new THREE.Group(),person=new THREE.Sprite(new THREE.SpriteMaterial({map:texture,transparent:true,alphaTest:.03}));person.scale.set(1.5,2.3,1);person.center.set(.5,.05);const bubble=new THREE.Sprite(new THREE.SpriteMaterial({map:moodTexture(data.mood),transparent:true,depthWrite:false}));bubble.name='moodBubble';bubble.scale.set(.72,.72,1);bubble.position.set(.62,2.25,0);walker.add(person,bubble);walker.userData={data,bubble};group.add(walker);pedestrians.push(walker)}
  group.userData={plan,cars,pedestrians,signals,doors};return group
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
  const distance=Math.hypot(cx,cz);if(distance>5&&value>.72){for(let i=0;i<4;i++)group.add(cityBuilding(-11+i*7,-8+(i%2)*12,8+seededValue(seed,cx+i,cz-i)*16,[0x72a9d8,0xc985a7,0x6fc5bd][i%3]))}else if(distance>2&&value<.3){group.add(villageMarker(['奥伦','西蒙','平琪','机器人'][Math.abs(cx+cz)%4],9,-5))}
  group.position.set(cx * CHUNK_SIZE_3D, 0, cz * CHUNK_SIZE_3D); return group;
}

export function createTown3D({ scene, seed = 'world' }) {
  const root = new THREE.Group(); root.name = 'town3d'; scene.add(root); const chunks = new Map(), interactables = [];
  const city=createDetailedCityDistrict(seed);root.add(city);interactables.push(...city.userData.doors);
  function add(object, x, z) { object.position.set(x, 0, z); root.add(object); interactables.push(object); return object; }
  add(serviceBuilding('factory', '角色生产中心', 0xaeb6c4), 0, -8); add(serviceBuilding('shop', '节拍商店', 0xffbd59), 10, -8); add(musicPlaza(), MUSIC_PLAZA_POSITION.x, MUSIC_PLAZA_POSITION.z);
  const cave = add(serviceBuilding('cave', '山洞', 0x615969), 16, 10); cave.scale.set(1, .45, 1);
  for (const home of TOWN_HOUSEHOLDS) add(house(home), home.x, home.z);
  function update(position,time=performance.now()) { const wanted = new Set(getDesiredChunkKeys(position, 2)); for (const key of wanted) if (!chunks.has(key)) { const { x, z } = parseChunkKey(key), chunk = groundChunk(x, z, seed); chunks.set(key, chunk); root.add(chunk); } for (const [key, chunk] of chunks) if (!wanted.has(key)) { root.remove(chunk); chunks.delete(key); }for(const car of city.userData.cars){const p=trafficPose(car.userData.data,time);car.position.set(p.x,0,p.z);car.rotation.y=p.heading}for(const person of city.userData.pedestrians){const p=trafficPose(person.userData.data,time);person.position.set(p.x,0,p.z);person.rotation.y=p.heading;person.userData.bubble.position.y=2.25+Math.sin(time*.003+person.userData.data.offset*9)*.1}for(const signal of city.userData.signals){const active=getTrafficLightState(time,signal.userData.axis);for(const[name,lamp]of Object.entries(signal.userData.lamps)){const on=name===active;lamp.material.color.setHex(on?({red:0xff3b30,yellow:0xffd43b,green:0x45e36f}[name]):0x242424);lamp.material.emissive.setHex(on?({red:0x8a0800,yellow:0x8a6500,green:0x087a25}[name]):0x000000)}} }
  const temp = new THREE.Vector3();
  return { root, update, getInteractables: () => interactables, getSolidColliders: () => [...city.userData.plan.buildings.map(item=>({x:item.x,z:item.z,radius:item.width*.55})),...[...chunks.values()].flatMap(chunk => chunk.children.filter(child => child.userData.kind === 'decorativeTree').map(child => { child.getWorldPosition(temp); return { x: temp.x, z: temp.z, radius: child.userData.solidRadius }; }))], getGroundHeight: () => 0, dispose() { scene.remove(root); root.traverse(object => { object.geometry?.dispose(); if (object.material) Array.isArray(object.material) ? object.material.forEach(item => item.dispose()) : object.material.dispose(); }); }, get loadedChunkCount() { return chunks.size; } };
}
