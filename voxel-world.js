/* Original browser voxel sandbox: no installed game or extracted game assets required. */
(() => {
  const rules=typeof module!=='undefined'?require('./voxel-rules.js'):window.VoxelRules;
  const survivalPack = typeof module!=='undefined' ? require('./voxel-survival.js') : window.VoxelSurvival;
  const stations=typeof module!=='undefined'?require('./voxel-workstations.js'):window.VoxelWorkstations;
  const terrainPack=typeof module!=='undefined'?require('./voxel-terrain.js'):window.VoxelTerrain;
  const types = {grass:['草方块','#65a542'],dirt:['泥土','#8e6342'],stone:['石头','#858b94'],wood:['原木','#87623d'],leaves:['树叶','#42824b'],sand:['沙子','#dbc58a'],glass:['玻璃','#a0dce8'],planks:['木板','#c19357'],brick:['砖块','#ab6050'],water:['水','#468ec5']};
  Object.assign(types,{coalore:['煤矿石','#565f65'],ironore:['铁矿石','#b38e79'],diamondore:['钻石矿石','#49c4c9']});
  Object.assign(types,terrainPack.types,stations.types,{redstoneore:['红石矿石','#c64436']});
  const key=(x,y,z)=>`${x},${y},${z}`;
  const solid=type=>type && !stations.nonSolid.has(type);
  const height=(x,z)=>Math.floor(1.8+Math.sin(x*.29)*1.3+Math.cos(z*.25)*1.2);
  function generateWorld(terrain='hills'){
    const world=new Map();
    if(terrain==='nether'||terrain==='end'){
      for(let x=-16;x<=16;x++)for(let z=-16;z<=16;z++){
        if(terrain==='end'&&x*x+z*z>230)continue;
        const top=terrain==='nether'?Math.floor(2+Math.sin(x*.3)*Math.cos(z*.3)*2):Math.floor(1+Math.cos(x*.3));
        for(let y=-4;y<=top;y++)world.set(key(x,y,z),terrain==='nether'?'netherrack':'endstone');
        if(terrain==='nether'&&(x-8)**2+(z-3)**2<15)world.set(key(x,top,z),'lava');
        if(terrain==='end'&&Math.abs(x)%9===0&&Math.abs(z)%9===0&&x*x+z*z>40)for(let y=top+1;y<10;y++)world.set(key(x,y,z),'obsidian');
      }
      for(let x=-2;x<=2;x++)for(let z=7;z<=11;z++){world.set(key(x,2,z),terrain==='nether'?'netherrack':'endstone');for(let y=3;y<=20;y++)world.delete(key(x,y,z));}
      world.set(key(2,3,8),'portal');return world;
    }
    for(let x=-16;x<=16;x++)for(let z=-16;z<=16;z++){
      const pond=terrain!=='flat'&&(x-7)**2+(z-5)**2<22;
      const top=terrain==='flat'?1:pond?-1:height(x,z);
      for(let y=-8;y<=top;y++)world.set(key(x,y,z),y===top?(pond?'sand':'grass'):y<top-2?survivalPack.oreAt(x,y,z):'dirt');
      if(pond)world.set(key(x,0,z),'water');
    }
    for(const [x,z] of [[-8,-7],[-4,-10],[3,-8],[9,-9],[-11,4],[-6,8],[11,11],[1,12]]){
      if(terrain==='flat')break;
      const y=height(x,z);for(let n=1;n<=4;n++)world.set(key(x,y+n,z),'wood');
      for(let a=-2;a<=2;a++)for(let b=-2;b<=2;b++)for(let c=3;c<=5;c++){
        if(Math.abs(a)+Math.abs(b)+(c===5?1:0)>3)continue;
        const k=key(x+a,y+c,z+b);if(!world.has(k))world.set(k,'leaves');
      }
    }
    // A small offline village house; saved player edits are applied after generation.
    if(terrain==='hills'){
      for(let x=-12;x<=-8;x++)for(let z=-4;z<=0;z++){
        for(let y=-1;y<=2;y++)world.set(key(x,y,z),'stone');
        for(let y=3;y<=6;y++)world.delete(key(x,y,z));
        world.set(key(x,6,z),'planks');
        if(x===-12||x===-8||z===-4||z===0)for(let y=3;y<=5;y++)world.set(key(x,y,z),'planks');
      }
      world.set(key(-10,3,0),'door');world.set(key(-10,4,0),'door');world.set(key(-11,3,-3),'chest');world.set(key(-9,3,-3),'furnace');world.set(key(-11,3,-1),'workbench');world.set(key(-9,3,-1),'bed');world.set(key(-9,3,-2),'bed_head');
    }
    return world;
  }
  function collides(world,p){
    if(world.isLoaded&&!world.isLoaded(p.x,p.z))return true;
    for(let x=Math.floor(p.x-.28);x<=Math.floor(p.x+.28);x++)
      for(let y=Math.floor(p.y+.01);y<=Math.floor(p.y+1.74);y++)
        for(let z=Math.floor(p.z-.28);z<=Math.floor(p.z+.28);z++)if(solid(world.get(key(x,y,z))))return true;
    return false;
  }
  function validEdit(b){return Array.isArray(b)&&b.length===4&&b.slice(0,3).every(Number.isSafeInteger)&&b[1]>=-64&&b[1]<=20&&(b[3]===null||Object.hasOwn(types,b[3]));}
  if(typeof module!=='undefined'){module.exports={generateWorld,collides,validEdit,types};return;}
  function mount(host,options={}){
    host.classList.add('voxel-app');
    host.innerHTML='<div class="voxel-top"><strong>方块原野</strong><span>创造模式 · 网页版</span><button type="button" data-action="day">切换昼夜</button><button type="button" data-action="home">回到出生点</button><button type="button" data-action="craft">原木 → 4 木板</button></div><div class="voxel-view" tabindex="0" aria-label="第一人称方块世界"><div class="voxel-cross">+</div><div class="voxel-hand" aria-hidden="true"><i></i></div><div class="voxel-help">电脑：点击锁定鼠标 · WASD移动 · Esc释放<br>手机：摇杆移动 · 拖动转头 · 长按挖掘 / 轻点放置</div><div class="voxel-coords"></div></div><div class="voxel-hotbar" aria-label="材料栏"></div><div class="voxel-bottom"><div class="voxel-move"><button data-key="KeyW" aria-label="向前走">↑</button><button data-key="KeyA" aria-label="向左走">←</button><button data-key="KeyS" aria-label="向后走">↓</button><button data-key="KeyD" aria-label="向右走">→</button></div><button data-action="jump">跳跃</button><button data-action="dig">挖掘</button><button data-action="place">放置</button><span role="status">正在生成草地、树林和湖泊…</span></div>';
    const view=host.querySelector('.voxel-view'),status=host.querySelector('[role=status]'),bar=host.querySelector('.voxel-hotbar');
    let disposed=false,cleanup=()=>{};
    import('./rhythm-world/vendor/three.module.min.js').then(T=>{
      if(disposed)return;
      const dimension=options.dimension||'overworld';
      const legacyWorld=generateWorld(dimension==='overworld'?options.terrain:dimension),world=dimension==='overworld'?new Map():legacyWorld,edits=new Map(),inventory={};
      const survival=options.mode==='survival',storageKey=options.storageKey||'computer-voxel-v2';
      let saved={};try{saved=JSON.parse(localStorage.getItem(storageKey))||{};}catch{}
      if(options.travel){saved.inventory=options.travel.inventory;saved.health=options.travel.health;saved.hunger=options.travel.hunger;}
      if(Array.isArray(saved.edits))saved.edits.filter(validEdit).forEach(b=>{edits.set(key(...b.slice(0,3)),b[3]);if(b[3]===null)world.delete(key(...b));else world.set(key(...b),b[3]);});
      const copyEdits=new Map(Array.isArray(saved.copyEdits)?saved.copyEdits:[]);
      const stream=dimension==='overworld'?terrainPack.createStream(world,edits,{diamond:!!options.mods?.diamond,copyEdits:options.mods?.copy?copyEdits:null,legacy:legacyWorld,flat:options.terrain==='flat',oreAt:survivalPack.oreAt}):null;
      const savedPosition=saved.position&&['x','y','z'].every(k=>Number.isFinite(saved.position[k]))?saved.position:null;
      stream?.move(savedPosition?.x||0,savedPosition?.z||0);
      if(options.mods?.copy){const originalSet=edits.set.bind(edits);edits.set=(k,t)=>{const [x,y,z]=k.split(',').map(Number),local=rules.copyKey(x,y,z);copyEdits.set(local,t);const [lx,,lz]=local.split(',').map(Number);for(let a=Math.floor(x/16)-3;a<=Math.floor(x/16)+3;a++)for(let b=Math.floor(z/16)-3;b<=Math.floor(z/16)+3;b++){if(!world.isLoaded?.(a*16+lx,b*16+lz))continue;const q=key(a*16+lx,y,b*16+lz);originalSet(q,t);if(t===null)world.delete(q);else world.set(q,t);}return edits;};}
      // key() deliberately consumes only the coordinate portion of an edit.
      for(const type of Object.keys(types))inventory[type]=Math.max(0,Math.min(9999,Number(saved.inventory?.[type])||0));
      for(const type of ['apple','pickaxe'])inventory[type]=Math.max(0,Math.min(9999,Number(saved.inventory?.[type])||0));
      let health=Number.isFinite(saved.health)?Math.max(1,Math.min(20,saved.health)):20;
      let hunger=Number.isFinite(saved.hunger)?Math.max(0,Math.min(20,saved.hunger)):20,dayTime=Number(saved.dayTime)||0,mobs=null;
      for(const type of Object.keys(survivalPack.items))inventory[type]=Math.max(0,Math.min(9999,Number(saved.inventory?.[type])||0));
      for(const type of Object.keys(stations.items))inventory[type]=Math.max(0,Math.min(9999,Number(saved.inventory?.[type])||0));
      const containers={},cropAge={};
      for(const [k,value] of Object.entries(saved.containers||{})){if(!/^[-0-9]+,[-0-9]+,[-0-9]+$/.test(k)||!value||typeof value!=='object')continue;containers[k]={};for(const type of Object.keys(inventory))containers[k][type]=Math.max(0,Math.min(9999,Math.floor(Number(value[type])||0)));}
      for(const [k,value] of Object.entries(saved.cropAge||{}))if(edits.get(k)==='crop')cropAge[k]=Math.max(0,Math.min(60,Number(value)||0));
      host.querySelector('.voxel-top strong').textContent=options.name||'方块原野';
      const modeLabel=host.querySelector('.voxel-top span');
      function hud(){modeLabel.textContent=survival?`生命 ${health}/20 · 饱食 ${hunger}/20${inventory.armor?' · 已穿护甲':''}`:'创造模式 · 无限材料';}hud();
      const pauseButton=document.createElement('button');pauseButton.textContent='暂停';pauseButton.onclick=()=>{document.exitPointerLock?.();options.onPause?.();};host.querySelector('.voxel-top').append(pauseButton);
      const audio=window.VoxelAudio.create(host);
      const scene=new T.Scene();scene.background=new T.Color('#9cd4f0');scene.fog=new T.Fog('#9cd4f0',18,34);
      const camera=new T.PerspectiveCamera(72,1,.05,90);camera.rotation.order='YXZ';
      const renderer=new T.WebGLRenderer({antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,survivalPack.LIMITS.pixelRatio));view.prepend(renderer.domElement);
      let viewMode=0;const avatarMaterials=[];
      const geometry=new T.BoxGeometry(1,1,1),textures=[],materials={};
      function texture(color,kind){
        const files={'grass-side':'grass',dirt:'dirt',stone:'cobblestone',wood:'oak-log',planks:'oak-planks',sand:'sand',brick:'bricks',bedrock:'bedrock',obsidian:'obsidian',endstone:'end-stone',darkplanks:'spruce-planks'};
        if(files[kind]){const t=new T.TextureLoader().load('./assets/minecraft-blocks/'+files[kind]+'.png');t.magFilter=T.NearestFilter;t.minFilter=T.NearestFilter;t.colorSpace=T.SRGBColorSpace;textures.push(t);return t;}
        const canvas=document.createElement('canvas');canvas.width=canvas.height=16;const c=canvas.getContext('2d');c.fillStyle=color;c.fillRect(0,0,16,16);
        let seed=12345;for(let i=0;i<140;i++){seed=(Math.imul(seed,1664525)+1013904223)>>>0;const x=(seed>>>16)%16;seed=(Math.imul(seed,1664525)+1013904223)>>>0;const y=(seed>>>8)%16;c.fillStyle=i%2?'#ffffff18':'#00000022';c.fillRect(x,y,1+(i%2),1);}
        if(kind==='grass-side'){c.fillStyle='#538e32';c.fillRect(0,0,16,3);for(let x=0;x<16;x++){c.fillStyle=x%2?'#79a946':'#466f2d';c.fillRect(x,2,1,1+(x*7%4));}}
        if(kind==='wood-end'){for(let r=1;r<8;r+=2){c.strokeStyle=r%3?'#8e653c':'#d7b576';c.strokeRect(r+.5,r+.5,15-2*r,15-2*r);}}
        if(kind.endsWith('wood')||kind.endsWith('planks')){c.fillStyle='#44270755';for(let i=0;i<16;i+=4)c.fillRect(kind.endsWith('wood')?i:0,kind.endsWith('wood')?0:i,kind.endsWith('wood')?1:16,kind.endsWith('wood')?16:1);}
        if(kind==='brick'){c.strokeStyle='#dfbd95';for(let y=0;y<16;y+=4){c.beginPath();c.moveTo(0,y);c.lineTo(16,y);c.stroke();for(let x=(y%8?4:0);x<16;x+=8)c.fillRect(x,y,1,4);}}
        if(kind.endsWith('ore')){c.fillStyle='#747b82';c.fillRect(0,0,16,16);c.fillStyle=color;for(let i=0;i<9;i++)c.fillRect((i*7)%14,(i*5)%14,3,2);}
        if(kind==='chest'){c.strokeStyle='#4f301b';c.strokeRect(.5,.5,15,15);c.fillStyle='#4f301b';c.fillRect(0,6,16,2);c.fillStyle='#e0bf6b';c.fillRect(7,5,2,5);}
        if(kind==='furnace'){c.fillStyle='#323a42';c.fillRect(3,3,10,4);c.fillRect(3,10,10,4);c.fillStyle='#e07c2b';c.fillRect(5,12,6,1);}
        if(kind==='workbench'){c.strokeStyle='#553820';for(let n=1;n<16;n+=5){c.beginPath();c.moveTo(n,0);c.lineTo(n,16);c.moveTo(0,n);c.lineTo(16,n);c.stroke();}}
        if(kind==='wire'){c.fillStyle='#4a1715';c.fillRect(0,0,16,16);c.fillStyle='#cc4130';c.fillRect(6,0,4,16);c.fillRect(0,6,16,4);}
        if(kind==='crop'||kind==='ripe'){c.fillStyle=kind==='crop'?'#274c22':'#85712a';c.fillRect(0,0,16,16);c.fillStyle=color;for(let n=1;n<16;n+=4)c.fillRect(n,2,2,14);}
        if(kind==='lava'){c.fillStyle='#a53812';for(let y=1;y<16;y+=4)for(let x=0;x<16;x+=5)c.fillRect((x+y)%16,y,3,2);c.fillStyle='#ffdc45';for(let y=0;y<16;y+=5)c.fillRect((y*3)%12,y,5,2);}
        if(kind==='obsidian'){c.fillStyle='#181729';for(let y=0;y<16;y+=4)for(let x=0;x<16;x+=5)c.fillRect((x+y)%16,y,4,3);c.fillStyle='#6b487d';c.fillRect(2,4,2,1);c.fillRect(10,12,3,1);}
        if(kind==='portal'){for(let r=0;r<7;r++){c.strokeStyle=r%2?'#60328c':'#c997ee';c.strokeRect(r+.5,r+.5,15-r*2,15-r*2);}}
        const t=new T.CanvasTexture(canvas);t.magFilter=T.NearestFilter;t.minFilter=T.NearestFilter;t.colorSpace=T.SRGBColorSpace;textures.push(t);return t;
      }
      for(const [type,[,color]] of Object.entries(types))materials[type]=new T.MeshLambertMaterial({map:texture(color,type),transparent:['water','sulphurwater','glass'].includes(type),opacity:type==='water'?.48:type==='sulphurwater'?.78:type==='glass'?.38:1});
      materials.lamp_on.emissive.set('#ffb849');materials.lamp_on.emissiveIntensity=.8;materials.torch.emissive.set('#ffc35a');materials.torch.emissiveIntensity=.7;
      materials.lava.emissive.set('#ff6b00');materials.lava.emissiveIntensity=.7;materials.portal.emissive.set('#9a44cc');materials.portal.emissiveIntensity=.5;
      const grassTop=materials.grass,grassSide=new T.MeshLambertMaterial({map:texture('#906745','grass-side')}),woodSide=materials.wood,woodEnd=new T.MeshLambertMaterial({map:texture('#c69d65','wood-end')});
      materials.grass=[grassSide,grassSide,grassTop,materials.dirt,grassSide,grassSide];
      materials.wood=[woodSide,woodSide,woodEnd,woodEnd,woodSide,woodSide];
      for(const [type,topColor,sideColor] of [['redgrass','#ba443b','#ad3733'],['snowgrass','#e8f0ee','#d6e4df']]){const side=new T.MeshLambertMaterial({map:texture('#906745','colored-dirt')});const c=side.map.image.getContext('2d');c.fillStyle=sideColor;c.fillRect(0,0,16,4);side.map.needsUpdate=true;const top=materials[type];materials[type]=[side,side,top,materials.dirt,side,side];}
      for(const type of ['redwood','junglewood']){const side=materials[type],end=new T.MeshLambertMaterial({map:texture(type==='redwood'?'#c77d63':'#a58c59','wood-end')});materials[type]=[side,side,end,end,side,side];}
      const ambient=new T.HemisphereLight(0xeafaff,0x627049,2),sun=new T.DirectionalLight(0xffedc5,2);sun.position.set(-8,22,9);scene.add(ambient,sun);
      const clouds=new T.Group();const cloudMaterial=new T.MeshLambertMaterial({color:0xffffff});for(let i=0;i<9;i++){const c=new T.Mesh(geometry,cloudMaterial);c.position.set((i*13)%35-17,15+i%3,(i*7)%32-16);c.scale.set(5+i%3,.6,2);clouds.add(c);}clouds.visible=dimension==='overworld';scene.add(clouds);
      const bubbleMaterial=new T.MeshBasicMaterial({color:0xfff4a4,transparent:true,opacity:.65}),bubbleMesh=new T.InstancedMesh(geometry,bubbleMaterial,64),bubbleMatrix=new T.Matrix4();bubbleMesh.frustumCulled=false;scene.add(bubbleMesh);let bubbleSources=[];
      let renderY=2,meshes=[];const lampLights=Array.from({length:4},()=>{const lamp=new T.PointLight(0xffcb7d,0,7);scene.add(lamp);return lamp;});
      function rebuild(){
        bubbleSources=[...world].filter(([,t])=>t==='sulphurwater').map(([k])=>k.split(',').map(Number));bubbleMesh.count=Math.min(64,bubbleSources.length);
        const power=stations.signal(world);for(const [k,type] of world){if(type!=='lamp'&&type!=='lamp_on')continue;const next=power.has(k)?'lamp_on':'lamp';if(next!==type){world.set(k,next);edits.set(k,next);}}
        const lit=[...world].filter(([,t])=>t==='lamp_on'||t==='torch').slice(0,4);lampLights.forEach((light,i)=>{light.intensity=lit[i]?3:0;if(lit[i]){const pos=lit[i][0].split(',').map(Number);light.position.set(pos[0]+.5,pos[1]+1.2,pos[2]+.5);}});
        for(const m of meshes){scene.remove(m);m.dispose();}meshes=[];
        const groups={};for(const [k,type] of world){const [x,y,z]=k.split(',').map(Number);if(y < renderY-18||y > Math.max(12,renderY+18))continue;if(['water','sulphurwater'].includes(type)&&world.get(key(x,y+1,z))===type)continue;if([[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]].every(([a,b,c])=>solid(world.get(key(x+a,y+b,z+c)))))continue;(groups[type]??=[]).push([x,y,z]);}
        const matrix=new T.Matrix4();for(const [type,positions] of Object.entries(groups)){const m=new T.InstancedMesh(geometry,materials[type],positions.length);const tall=type==='wire'?.04:type==='crop'?.35:type==='ripe'?.8:type.startsWith('lever')?.3:['bed','bed_head'].includes(type)?.5:1;const wide=['door','door_open'].includes(type)?.18:['torch','crop','ripe'].includes(type)?.3:1;positions.forEach(([x,y,z],i)=>{matrix.makeScale(type==='door'?.95:type==='door_open'?.16:wide,tall,type==='door'?.16:type==='door_open'?.95:wide);matrix.setPosition(x+.5,y+tall/2,z+.5);m.setMatrixAt(i,matrix);});m.userData.positions=positions;m.userData.type=type;m.computeBoundingSphere();meshes.push(m);scene.add(m);}
      }rebuild();
      const avatar=new T.Group();scene.add(avatar);const avatarPart=(sx,sy,sz,x,y,z,color)=>{const material=new T.MeshLambertMaterial({color});avatarMaterials.push(material);const mesh=new T.Mesh(geometry,material);mesh.scale.set(sx,sy,sz);mesh.position.set(x,y,z);avatar.add(mesh);return mesh;};
      avatarPart(.5,.5,.5,0,1.5,0,0xbd8b65);avatarPart(.53,.12,.53,0,1.75,0,0x443124);avatarPart(.55,.65,.3,0,.94,0,0x22a5a9);const leftLeg=avatarPart(.22,.6,.25,-.15,.3,0,0x504482),rightLeg=avatarPart(.22,.6,.25,.15,.3,0,0x504482),leftArm=avatarPart(.2,.65,.23,-.39,1,0,0xbd8b65),rightArm=avatarPart(.2,.65,.23,.39,1,0,0xbd8b65);for(const x of [-.12,.12])avatarPart(.09,.07,.03,x,1.54,-.265,0x454a86);const heldPick=new T.Group();const handle=avatarPart(.07,.6,.07,.46,.75,-.3,0x805b34),blade=avatarPart(.42,.1,.12,.46,1,-.3,0x40cecf);avatar.visible=false;
      const viewButton=document.createElement('button');viewButton.textContent='视角 / F5';viewButton.onclick=()=>viewMode=(viewMode+1)%3;host.querySelector('.voxel-top').append(viewButton);
      const outlineGeo=new T.EdgesGeometry(geometry),outlineMat=new T.LineBasicMaterial({color:0x172b30});const outline=new T.LineSegments(outlineGeo,outlineMat);outline.scale.setScalar(1.006);scene.add(outline);
      function spawnPoint(){for(let y=20;y>=-8;y--)if(solid(world.get(key(0,y,9))))return {x:.5,y:y+1.01,z:9.5};return {x:.5,y:2,z:9.5};}let p=spawnPoint(),yaw=0,pitch=-.12,vertical=0,grounded=false,flying=false,selected=null,selectedSlot=0,voidFallen=!!saved.voidFallen,night=false,raf=0,last=performance.now();
      if(saved.position&&['x','y','z'].every(k=>Number.isFinite(saved.position[k]))&&saved.position.y>=-100&&saved.position.y<25&&!collides(world,saved.position))p={...saved.position};
      if(voidFallen&&!survival)p.y=-100;
      if(Number.isFinite(saved.yaw))yaw=saved.yaw;
      if(Number.isFinite(saved.pitch))pitch=Math.max(-1.45,Math.min(1.45,saved.pitch));
      const keys=new Set(),ray=new T.Raycaster();ray.far=6;
      const slotTypes=Array.from({length:9},(_,i)=>(Object.hasOwn(inventory,saved.hotbar?.[i]))?saved.hotbar[i]:null);
      selected=slotTypes[0];
      function slots(){view.classList.toggle('holding-pickaxe',selected==='diamondpickaxe');bar.replaceChildren();slotTypes.forEach((type,i)=>{const b=document.createElement('button');b.type='button';b.className=(i===selectedSlot?'selected ':'')+(!type?'empty':'');if(type)b.style.setProperty('--block-color',types[type]?.[1]||'#57cfc8');b.textContent=type?(types[type]?.[0]||survivalPack.items[type]||stations.items[type]||({apple:'苹果',pickaxe:'木镐'}[type])||type)+(survival?' ×'+(inventory[type]||0):''):'';b.setAttribute('aria-label','快捷栏 '+(i+1)+'：'+(type?(types[type]?.[0]||survivalPack.items[type]||stations.items[type]):'空'));b.setAttribute('aria-pressed',String(i===selectedSlot));b.onclick=()=>{selectedSlot=i;selected=type;slots();};bar.append(b);});}slots();
      function persist(){try{localStorage.setItem(storageKey,JSON.stringify({drops:drops.map(d=>({type:d.type,x:d.mesh.position.x-.5,y:d.base-.5,z:d.mesh.position.z-.5,age:d.age})),copyEdits:[...copyEdits],edits:[...edits].map(([k,t])=>[...k.split(',').map(Number),t]),inventory,hotbar:slotTypes,voidFallen,position:p,yaw,pitch,health,hunger,dayTime,mobs:mobs?.snapshot(),containers,cropAge}));options.onSave?.();return true;}catch{status.textContent='本机存储已满，暂时不能保存';return false;}}
      host.saveWorld=persist;
      function target(){ray.setFromCamera(new T.Vector2(touchAim?.x||0,touchAim?.y||0),camera);return ray.intersectObjects(meshes,false)[0];}
      function nearby(type){const x=Math.floor(p.x),y=Math.floor(p.y),z=Math.floor(p.z);for(let a=-3;a<=3;a++)for(let b=-2;b<=2;b++)for(let c=-3;c<=3;c++)if(world.get(key(x+a,y+b,z+c))===type)return true;return false;}
      const itemName=t=>types[t]?.[0]||stations.items[t]||survivalPack.items[t]||t;
      function interact(){
        if(options.paused?.())return;const hit=target();ray.setFromCamera(new T.Vector2(0,0),camera);
        if(mobs?.tradeTarget?.(ray,hit?.distance??Infinity)){options.onPanel?.('村民交易',()=>stations.trades.map((t,i)=>({label:t.name,action:()=>{if(!stations.trade(inventory,i))return '材料或绿宝石不足';slots();persist();return '交易成功';}})));return;}
        if(!hit){status.textContent='对准附近的工作方块或村民，按 F / 使用';return;}const pos=hit.object.userData.positions[hit.instanceId],k=key(...pos),type=world.get(k);
        if(type==='door'||type==='door_open'){const next=type==='door'?'door_open':'door';for(const yy of [pos[1]-1,pos[1],pos[1]+1]){const dk=key(pos[0],yy,pos[2]);if(world.get(dk)===type){world.set(dk,next);edits.set(dk,next);}}rebuild();persist();status.textContent=next==='door'?'门关上了':'门打开了';return;}
        if(type==='lever'||type==='lever_on'){const next=type==='lever'?'lever_on':'lever';world.set(k,next);edits.set(k,next);rebuild();persist();status.textContent=next==='lever_on'?'拉杆打开，红石通电':'拉杆关闭';return;}
        if(['grass','redgrass','snowgrass','dirt'].includes(type)){if(survival&&!inventory.hoe){status.textContent='先在背包里合成锄头';return;}world.set(k,'farmland');edits.set(k,'farmland');rebuild();persist();status.textContent='已耕地：选幼苗，朝耕地顶部放置即可播种';return;}
        if(type==='ripe'){inventory.wheat+=2;inventory.seed+=2;world.delete(k);edits.set(k,null);rebuild();slots();persist();status.textContent='收获小麦与种子';return;}
        if(type==='crop'){status.textContent='作物正在生长，约一分钟成熟';return;}
        if(type==='bed'||type==='bed_head'){sleepButton.click();return;}
        if(type==='portal'){options.onPanel?.('离线维度传送',()=>[['overworld','主世界'],['nether','下界'],['end','末地']].filter(([id])=>id!==dimension).map(([id,name])=>({label:'前往'+name,action:()=>{if(!persist())return '保存失败，暂不传送';options.onDimension?.(id,{inventory:{...inventory},health,hunger});return '正在传送';}})));return;}
        if(type==='workbench'||type==='furnace'){openInventory(type);return;}
        if(type==='chest'){const box=containers[k]??=(dimension==='overworld'&&!edits.has(k)?terrainPack.lootAt(...pos):{});options.onPanel?.('箱子：存取物品',()=>{const rows=[];for(const t of Object.keys(inventory)){if(inventory[t]>0)rows.push({label:`存入 ${itemName(t)} ×${Math.min(5,inventory[t])}（背包 ${inventory[t]}）`,action:()=>{const n=stations.transfer(inventory,box,t,5);slots();persist();return `存入 ${n} 个${itemName(t)}`;}});if(box[t]>0)rows.push({label:`取出 ${itemName(t)} ×${Math.min(5,box[t])}（箱内 ${box[t]}）`,action:()=>{const n=stations.transfer(box,inventory,t,5);slots();persist();return `取出 ${n} 个${itemName(t)}`;}});}if(!rows.length)rows.push({label:'背包和箱子都为空',action:()=> '先采集一些物品再来存放'});return rows;});return;}
        status.textContent='这个方块没有使用动作';
      }
      const useButton=document.createElement('button');useButton.textContent='使用 / 耕地';useButton.onclick=interact;host.querySelector('.voxel-bottom').prepend(useButton);
      function feedSlime(distance){if(!selected)return false;if(survival&&inventory[selected==='crop'?'seed':selected]<1)return false;if(!mobs.absorb(ray,distance,selected))return false;if(survival)inventory[selected==='crop'?'seed':selected]--;audio.play('place');slots();persist();status.textContent='硫磺史莱姆吸收了'+types[selected][0]+'，身体变成了这种方块';return true;}
      let mining=null,sleepingUntil=0;const drops=[];
      const crackCanvas=document.createElement('canvas');crackCanvas.width=crackCanvas.height=64;const crackContext=crackCanvas.getContext('2d'),crackTexture=new T.CanvasTexture(crackCanvas),crackMaterial=new T.MeshBasicMaterial({map:crackTexture,transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-2}),cracks=new T.Mesh(geometry,crackMaterial);cracks.scale.setScalar(1.008);cracks.visible=false;scene.add(cracks);
      function crackProgress(progress){crackContext.clearRect(0,0,64,64);crackContext.strokeStyle='#101010';crackContext.lineWidth=2;for(let i=0;i<Math.ceil(progress*18);i++){const x=(i*23)%64,y=(i*37)%64;crackContext.beginPath();crackContext.moveTo(32,32);crackContext.lineTo(x,y);crackContext.lineTo((x+17)%64,(y+9)%64);crackContext.stroke();}crackTexture.needsUpdate=true;}
      function dropBlock(type,x,y,z){if(drops.length>=128){const old=drops.shift();scene.remove(old.mesh);}const mesh=new T.Mesh(geometry,materials[type]||materials.diamondore);mesh.scale.setScalar(.22);mesh.position.set(x+.5,y+.5,z+.5);scene.add(mesh);drops.push({type,mesh,age:0,base:y+.5});}
      for(const d of (Array.isArray(saved.drops)?saved.drops:[]).slice(-128)){if(types[d.type]&&[d.x,d.y,d.z].every(Number.isFinite)&&d.y>=-64&&d.y<=24&&d.age<300){dropBlock(d.type,d.x,d.y,d.z);drops[drops.length-1].age=Math.max(0,d.age||0);}}
      function act(place,completed=false){
        if(options.paused?.())return;
        if(place&&['bucket','waterbucket'].includes(selected)){if(survival&&!(inventory[selected]>0)){status.textContent='桶已经用完了';return;}const hit=target();if(!hit)return;let [x,y,z]=hit.object.userData.positions[hit.instanceId];if(selected==='bucket'){if(world.get(key(x,y,z))!=='water'){status.textContent='铁桶对准水取水';return;}world.delete(key(x,y,z));edits.set(key(x,y,z),null);if(survival)inventory.bucket--;inventory.waterbucket++;selected='waterbucket';}else{x+=hit.face.normal.x;y+=hit.face.normal.y;z+=hit.face.normal.z;if(world.has(key(x,y,z)))return;world.set(key(x,y,z),'water');edits.set(key(x,y,z),'water');waterQueue.push(key(x,y,z));if(survival)inventory.waterbucket--;inventory.bucket++;selected='bucket';}slotTypes[selectedSlot]=selected;rebuild();slots();persist();return;}
        if(place&&selected&&!types[selected]){status.textContent='这是工具或物品，不能当方块放置';return;}if(place&&!selected){status.textContent='先从背包选择物品，放进快捷栏';return;}
        if(place&&survival&&inventory[selected==='crop'?'seed':selected]<1){status.textContent='这种材料用完了，先挖掘采集或合成';return;}
        const hit=target();if(place&&feedSlime(hit?.distance??Infinity))return;if(!place&&attack(hit?.distance??Infinity))return;if(!hit){status.textContent='靠近方块，把准星对准它（6 格以内）';return;}
        let [x,y,z]=hit.object.userData.positions[hit.instanceId];
        if(!place&&!completed){const type=world.get(key(x,y,z)),rule=rules.mining(type,selected,!survival,options.mods||{});if(!Number.isFinite(rule.seconds)){status.textContent=type==='water'?'水不能挖，用铁桶取水':'这种方块需要对应的模组工具';return;}mining={key:key(x,y,z),x,y,z,type,time:0,...rule};cracks.position.set(x+.5,y+.5,z+.5);cracks.visible=true;return;}
        if(place){x+=hit.face.normal.x;y+=hit.face.normal.y;z+=hit.face.normal.z;if(!validEdit([x,y,z,selected])||world.has(key(x,y,z)))return;if(selected==='crop'&&world.get(key(x,y-1,z))!=='farmland'){status.textContent='先用锄头耕地，然后在耕地上种植';return;}if(selected==='crop'&&Object.keys(cropAge).length>=256){status.textContent='当前世界最多种植256格作物';return;}if(selected==='bed'&&world.has(key(x,y,z-1))){status.textContent='床需要连续两格空位';return;}world.set(key(x,y,z),selected);if(collides(world,p)){world.delete(key(x,y,z));status.textContent='这里会挡住自己，请换一个位置';return;}edits.set(key(x,y,z),selected);if(selected==='bed'){world.set(key(x,y,z-1),'bed_head');edits.set(key(x,y,z-1),'bed_head');}if(selected==='crop')cropAge[key(x,y,z)]=0;}
        else {if(world.get(key(x,y,z))==='bedrock'&&survival&&!(options.mods?.bedrock&&selected==='bedrockpickaxe')){status.textContent='生存模式不能挖掉基岩';return;}const type=world.get(key(x,y,z));if(type==='bed'||type==='bed_head'){const other=key(x,y,z+(type==='bed'?-1:1));if(['bed','bed_head'].includes(world.get(other))){world.delete(other);edits.set(other,null);}}if(containers[key(x,y,z)]){for(const [t,n] of Object.entries(containers[key(x,y,z)]))inventory[t]=(inventory[t]||0)+n;delete containers[key(x,y,z)];}delete cropAge[key(x,y,z)];if(['grass','redgrass','snowgrass'].includes(type))inventory.seed++;if(type==='ripe'){inventory.wheat+=2;inventory.seed+=2;}if(type.endsWith('leaves'))inventory.apple++;if(type!=='ripe'&&rules.mining(type,selected,!survival,options.mods||{}).drop)dropBlock(type==='crop'?'seed':type==='coalore'?'coal':type==='diamondore'?'diamond':type==='redstoneore'?'redstone':stations.baseType(type),x,y,z);world.delete(key(x,y,z));edits.set(key(x,y,z),null);for(const [a,b,c] of [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]]){const k=key(x+a,y+b,z+c),t=world.get(k);if(t)world.set(k,t);}}
        if(place&&survival)inventory[selected==='crop'?'seed':selected]--;
        if(place&&selected==='water')waterQueue.push(key(x,y,z));if(!place&&world.get(key(x,y+1,z))==='water')waterQueue.push(key(x,y+1,z));audio.play(place?'place':'dig');rebuild();slots();if(persist())status.textContent=place?`已放置${types[selected][0]} · 已保存`:'方块已破碎，靠近拾取掉落物';
      }
      function jump(){if(options.paused?.())return;if(flying)return;if(grounded||world.get(key(Math.floor(p.x),Math.floor(p.y),Math.floor(p.z)))==='water'){vertical=7;grounded=false;}}
      function home(){if(voidFallen&&!survival){status.textContent='已坠入虚空，无法回到这个世界；可退出并创建新世界';return;}if(stream?.move(0,9))rebuild();p=spawnPoint();vertical=0;grounded=false;yaw=0;pitch=-.12;keys.clear();status.textContent='已回到出生点';}
      function damage(amount){if(!survival)return;audio.play('hit');health=Math.max(0,health-survivalPack.incomingDamage(amount,inventory));status.textContent='受到伤害，快躲开或吃食物！';if(!health){health=20;hunger=20;home();status.textContent='已重生，背包保留';}hud();}
      mobs=survivalPack.create(T,scene,world,dimension==='overworld'?saved.mobs:[],damage,drop=>{for(const [type,count] of Object.entries(drop))inventory[type]=(inventory[type]||0)+count;status.textContent='获得掉落物，已收入背包';slots();persist();},dimension==='overworld',{biomeAt:options.terrain==='flat'?()=>terrainPack.biomes.plains:terrainPack.biomeAt,materials});
      let attackAt=-Infinity;
      function attack(blockDistance=Infinity){if(options.paused?.()||performance.now()-attackAt<350)return false;ray.setFromCamera(new T.Vector2(0,0),camera);if(!mobs.hit(ray,blockDistance,survivalPack.attackDamage(inventory)))return false;attackAt=performance.now();audio.play('hit');persist();return true;}
      const attackButton=document.createElement('button');attackButton.textContent='攻击';attackButton.onclick=()=>{const hit=target();if(!attack(hit?.distance??Infinity))status.textContent='对准 3 格以内的生物再攻击';};host.querySelector('.voxel-bottom').prepend(attackButton);
      const sleepButton=document.createElement('button');sleepButton.textContent='睡觉到天亮';sleepButton.onclick=()=>{if(!inventory.bed&&!nearby('bed')&&survival){status.textContent='先收集羊毛和木板，在背包合成床';return;}if(!night){status.textContent='白天不用睡觉';return;}sleepingUntil=performance.now()+2400;status.textContent='躺下睡觉…';view.classList.add('voxel-sleeping');};host.querySelector('.voxel-top').append(sleepButton);
      const flightButton=document.createElement('button');flightButton.textContent='飞行：关';
      if(stream&&options.terrain!=='flat'){const atlas=document.createElement('button');atlas.textContent='群系地图';atlas.onclick=()=>options.onPanel?.('群系地图',()=>terrainPack.destinations.map(([id,x,z])=>({label:`${terrainPack.biomes[id].name} · ${terrainPack.biomes[id].size} · X ${x} Z ${z}${survival?'':' · 前往'}`,action:()=>{if(voidFallen)return '已坠入虚空，无法传送回地面';if(survival)return `目标在 X ${x} Z ${z}，当前 X ${Math.floor(p.x)} Z ${Math.floor(p.z)}，向坐标方向探索`;if(stream.move(x,z))rebuild();p={x:x+.5,y:Math.max(1,terrainPack.groundAt(x,z)+1.01),z:z+.5};for(let n=0;n<18&&collides(world,p);n++)p.y++;yaw=0;pitch=-.2;vertical=0;keys.clear();persist();return `已到达${terrainPack.biomes[id].name}，点击返回游戏开始探索`;}})));host.querySelector('.voxel-top').append(atlas);}
      function toggleFlight(){if(voidFallen||survival||options.paused?.())return;flying=!flying;vertical=0;flightButton.textContent=flying?'飞行：开':'飞行：关';status.textContent=flying?'空格或上升按钮向上，Shift 或下降按钮向下':'已恢复步行';}
      if(!survival){flightButton.onclick=toggleFlight;host.querySelector('.voxel-top').append(flightButton);} {for(const [label,code] of [['上升','Space'],['下降','ShiftLeft']]){const b=document.createElement('button');b.textContent=label;b.dataset.key=code;host.querySelector('.voxel-move').append(b);}}
      host.querySelector('[data-action=dig]').onpointerdown=e=>{e.preventDefault();e.currentTarget.setPointerCapture(e.pointerId);act(false);};host.querySelector('[data-action=dig]').onpointerup=host.querySelector('[data-action=dig]').onpointercancel=()=>{mining=null;cracks.visible=false;};host.querySelector('[data-action=place]').onclick=()=>act(true);host.querySelector('[data-action=jump]').onclick=jump;host.querySelector('[data-action=home]').onclick=home;
      function light(){scene.background.set(dimension==='nether'?'#402723':dimension==='end'?'#191c2c':night?'#142841':'#9cd4f0');scene.fog.color.copy(scene.background);ambient.intensity=dimension==='overworld'?(night?.6:2):1.1;sun.intensity=night?.3:2;}light();host.querySelector('[data-action=day]').onclick=()=>{dayTime=night?0:180;night=!night;light();status.textContent=night?'夜晚到了，小心怪物':'天亮了';};
      function openInventory(station=null){if(document.pointerLockElement===renderer.domElement)document.exitPointerLock();options.onInventory?.(inventory,id=>{const r=window.VoxelShell.recipes[id];if(!r||(rules.modItem(r.output)&&!options.mods?.bedrock)||(!station&&!rules.pocket.has(id))||(station==='workbench'&&r.requires)||(station==='furnace'&&!r.requires)||!window.VoxelShell.canCraft({...inventory,furnace:inventory.furnace||Number(station==='furnace'||nearby('furnace'))},r))return r?.requires?'需要熔炉和配方材料：把熔炉带在背包或放在身边':'材料不足，先收集配方需要的材料';for(const [k,n] of Object.entries(r.cost))inventory[k]-=n;inventory[r.output]=(inventory[r.output]||0)+r.amount;slots();hud();return persist()?`合成了${r.name}`:'合成成功，但存档空间不足';},()=>{const food=inventory.cookedmeat?'cookedmeat':inventory.bread?'bread':inventory.apple?'apple':inventory.rawmeat?'rawmeat':null;if(!food)return '没有食物，挖树叶找苹果或狩猎动物';if(health>=20&&hunger>=20)return '生命和饱食已满';inventory[food]--;hunger=Math.min(20,hunger+(food==='cookedmeat'?8:food==='bread'?6:food==='apple'?4:2));health=Math.min(20,health+2);hud();persist();return '吃过食物，恢复饱食与生命';},{types,station,mods:options.mods||{},creative:!survival,hotbar:slotTypes,nearFurnace:station==='furnace'||nearby('furnace'),equip:(type,index=selectedSlot)=>{if(!(Object.hasOwn(inventory,type))||index<0||index>8)return false;slotTypes[index]=type;selectedSlot=index;selected=type;if(!survival)inventory[type]=Math.max(inventory[type]||0,64);slots();persist();return true;}});}
      host.querySelector('[data-action=craft]').textContent='背包与合成';host.querySelector('[data-action=craft]').onclick=()=>openInventory();
      const onKey=e=>{if(e.code==='F5'){e.preventDefault();if(!e.repeat)viewMode=(viewMode+1)%3;return;}if(e.code==='KeyV'&&!e.repeat&&!options.paused?.()&&!/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)){toggleFlight();return;}if(e.code==='KeyF'&&!options.paused?.()&&!/INPUT|TEXTAREA/.test(e.target.tagName)){e.preventDefault();interact();return;}if(e.code==='KeyP'){e.preventDefault();document.exitPointerLock?.();options.onPause?.();return;}if(e.code==='KeyE'&&!options.paused?.()&&!/INPUT|TEXTAREA/.test(e.target.tagName)){e.preventDefault();openInventory();return;}if(options.paused?.())return;if(/INPUT|TEXTAREA|SELECT/.test(e.target.tagName))return;if(['KeyW','KeyA','KeyS','KeyD','Space','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','ShiftLeft','ShiftRight'].includes(e.code)){e.preventDefault();keys.add(e.code);if(e.code==='Space'&&!e.repeat)jump();}if(/^Digit[0-9]$/.test(e.code)){const index=Number(e.code.slice(-1))-1;if(index>=0&&index<9){selectedSlot=index;selected=slotTypes[index];slots();}}};
      const onUp=e=>keys.delete(e.code),clear=()=>keys.clear();document.addEventListener('keydown',onKey);document.addEventListener('keyup',onUp);window.addEventListener('blur',clear);document.addEventListener('visibilitychange',clear);
      host.querySelectorAll('[data-key]').forEach(b=>{b.onpointerdown=e=>{e.preventDefault();b.setPointerCapture(e.pointerId);keys.add(b.dataset.key);};b.onpointerup=b.onpointercancel=b.onlostpointercapture=()=>keys.delete(b.dataset.key);});
      let drag=null,moved=false,holdTimer=0,touchAim=null,holdingMine=false;
      const canvas=renderer.domElement;canvas.setAttribute('aria-label','可行走的3D方块世界');
      const aimTouch=e=>{const r=canvas.getBoundingClientRect();touchAim={x:(e.clientX-r.left)/r.width*2-1,y:-(e.clientY-r.top)/r.height*2+1};};
      canvas.onpointerdown=e=>{if(options.paused?.())return;if(e.pointerType==='mouse'){if(document.pointerLockElement!==canvas){drag={x:e.clientX,y:e.clientY,mouse:true};moved=false;if(e.button===0)act(false);canvas.requestPointerLock?.()?.catch?.(()=>{status.textContent='当前浏览器未锁定鼠标，可拖动转头；点击挖掘，右键放置';});return;}if(e.button===0)act(false);return;}if(e.button!==0)return;drag={x:e.clientX,y:e.clientY};moved=false;aimTouch(e);canvas.setPointerCapture(e.pointerId);holdTimer=setTimeout(()=>{holdTimer=0;if(drag&&!moved){act(false);holdingMine=true;moved=true;}},450);};
      canvas.onpointermove=e=>{if(!drag||document.pointerLockElement===canvas)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(Math.hypot(dx,dy)>(holdingMine?12:5)||(moved&&!holdingMine)){holdingMine=false;mining=null;cracks.visible=false;clearTimeout(holdTimer);holdTimer=0;touchAim=null;yaw-=dx*.005;pitch=Math.max(-1.45,Math.min(1.45,pitch-dy*.005));moved=true;drag={x:e.clientX,y:e.clientY};}};
      canvas.onpointerup=()=>{holdingMine=false;mining=null;cracks.visible=false;clearTimeout(holdTimer);if(drag&&!moved&&!drag.mouse&&document.pointerLockElement!==canvas)act(true);drag=null;touchAim=null;};canvas.onpointercancel=()=>{holdingMine=false;mining=null;cracks.visible=false;clearTimeout(holdTimer);drag=null;touchAim=null;};canvas.oncontextmenu=e=>{e.preventDefault();act(true);};
      const mouseLook=e=>{if(document.pointerLockElement!==canvas||options.paused?.())return;const sensitivity=options.settings?.().sensitivity||1;yaw-=e.movementX*.003*sensitivity;pitch=Math.max(-1.45,Math.min(1.45,pitch-e.movementY*.003*sensitivity));};document.addEventListener('mousemove',mouseLook);
      const stick=document.createElement('div');stick.className='voxel-joystick';stick.setAttribute('aria-label','移动摇杆');const knob=document.createElement('span');stick.append(knob);host.querySelector('.voxel-bottom').prepend(stick);
      let stickPointer=null;const stickKeys=['KeyW','KeyA','KeyS','KeyD'];function releaseStick(){stickPointer=null;stickKeys.forEach(k=>keys.delete(k));knob.style.transform='';}
      function moveStick(e){const r=stick.getBoundingClientRect(),dx=e.clientX-r.left-r.width/2,dy=e.clientY-r.top-r.height/2,scale=Math.min(1,30/(Math.hypot(dx,dy)||1));knob.style.transform='translate('+dx*scale+'px,'+dy*scale+'px)';stickKeys.forEach(k=>keys.delete(k));if(dy<-8)keys.add('KeyW');if(dy>8)keys.add('KeyS');if(dx<-8)keys.add('KeyA');if(dx>8)keys.add('KeyD');}
      stick.onpointerdown=e=>{e.preventDefault();stickPointer=e.pointerId;stick.setPointerCapture(e.pointerId);moveStick(e);};stick.onpointermove=e=>{if(e.pointerId===stickPointer)moveStick(e);};stick.onpointerup=stick.onpointercancel=stick.onlostpointercapture=releaseStick;
      const resize=new ResizeObserver(()=>{const w=view.clientWidth,h=view.clientHeight;if(w&&h){renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();}});resize.observe(view);
      // Axis-separated movement and substeps keep the player outside solid blocks.
      let flowElapsed=0;const waterQueue=[...world].filter(([,t])=>t==='water').map(([k])=>k);
      let saveElapsed=0,hungerElapsed=0,footTime=0,callTime=0,growTime=0,lavaTime=0,settingsSignature='';
      function frame(now){if(disposed)return;raf=requestAnimationFrame(frame);let dt=Math.min((now-last)/1000,.05);last=now;if(document.hidden||options.paused?.()){mining=null;cracks.visible=false;keys.clear();releaseStick();clearTimeout(holdTimer);if(document.pointerLockElement===canvas)document.exitPointerLock();return;}
        if(sleepingUntil){keys.clear();if(now>=sleepingUntil){sleepingUntil=0;dayTime=0;night=false;health=20;light();hud();persist();view.classList.remove('voxel-sleeping');status.textContent='睡醒了，天亮了';}}
        if(mining){const h=target(),k=h?key(...h.object.userData.positions[h.instanceId]):null;if(k!==mining.key){mining=null;cracks.visible=false;}else{mining.time+=dt;crackProgress(mining.time/mining.seconds);view.querySelector('.voxel-hand').style.transform='rotate('+(-25+Math.sin(now*.035)*14)+'deg)';if(mining.time>=mining.seconds){mining=null;cracks.visible=false;act(false,true);}}}else view.querySelector('.voxel-hand').style.transform='';
        for(const d of [...drops]){d.age+=dt;if(d.age>=300){scene.remove(d.mesh);drops.splice(drops.indexOf(d),1);continue;}d.mesh.rotation.y+=dt*2;d.mesh.position.y=d.base+Math.sin(now*.003)*.08;if(d.age>.5&&Math.hypot(d.mesh.position.x-p.x,d.mesh.position.y-p.y-1,d.mesh.position.z-p.z)<2.3){inventory[d.type]=(inventory[d.type]||0)+1;scene.remove(d.mesh);drops.splice(drops.indexOf(d),1);slots();persist();}}
        if(stream?.move(p.x,p.z)||Math.abs(p.y-renderY)>8){renderY=p.y;rebuild();}
        const settings=options.settings?.()||{fov:72,sensitivity:1,coords:true};const signature=JSON.stringify(settings);if(signature!==settingsSignature){settingsSignature=signature;camera.fov=settings.fov;camera.updateProjectionMatrix();host.querySelector('.voxel-coords').hidden=!settings.coords;}
        flowElapsed+=dt;if(flowElapsed>.2){flowElapsed=0;const changed=terrainPack.flowDown(world,edits,waterQueue);if(changed)rebuild();}
        lavaTime+=dt;if(lavaTime>=1){lavaTime=0;if(world.get(key(Math.floor(p.x),Math.floor(p.y),Math.floor(p.z)))==='lava')damage(4);}growTime+=dt;if(growTime>=2){const changed=stations.grow(world,cropAge,growTime,edits);growTime=0;if(changed){rebuild();persist();}}dayTime=(dayTime+dt)%300;const nextNight=dayTime>=180;if(nextNight!==night){night=nextNight;light();}mobs.update(dt,p,night&&dimension==='overworld',survival);hungerElapsed+=dt;if(survival&&hungerElapsed>=20){hungerElapsed=0;hunger=Math.max(0,hunger-1);if(hunger===0)damage(1);else if(hunger>=16)health=Math.min(20,health+1);hud();}saveElapsed+=dt;if(saveElapsed>10){saveElapsed=0;persist();}
        const inWater=['water','sulphurwater','kelp','coral'].includes(world.get(key(Math.floor(p.x),Math.floor(p.y+.5),Math.floor(p.z))));
        const forward=(keys.has('KeyW')||keys.has('ArrowUp')?1:0)-(keys.has('KeyS')||keys.has('ArrowDown')?1:0),side=(keys.has('KeyD')||keys.has('ArrowRight')?1:0)-(keys.has('KeyA')||keys.has('ArrowLeft')?1:0),norm=Math.hypot(forward,side)||1;
        const dx=(-Math.sin(yaw)*forward+Math.cos(yaw)*side)/norm*4*dt,dz=(-Math.cos(yaw)*forward-Math.sin(yaw)*side)/norm*4*dt;
        footTime+=dt;callTime+=dt;if(grounded&&(forward||side)&&footTime>.38){audio.play('step',.5);footTime=0;}if(callTime>7){callTime=0;const nearby=mobs.snapshot().find(m=>Math.hypot(m.x-p.x,m.z-p.z)<9);if(nearby)audio.play(nearby.type,.4);else if(night)audio.play('monster',.25);}
        for(let n=0;n<3;n++){const oldX=p.x;p.x+=dx/3;if(collides(world,p))p.x=oldX;const oldZ=p.z;p.z+=dz/3;if(collides(world,p))p.z=oldZ;if(flying)vertical=((keys.has('Space')?1:0)-(keys.has('ShiftLeft')||keys.has('ShiftRight')?1:0))*5;else if(inWater)vertical=keys.has('Space')?3:keys.has('ShiftLeft')||keys.has('ShiftRight')?-3:-.5;else vertical-=18*dt/3;const oldY=p.y;p.y=Math.min(24,p.y+vertical*dt/3);if(collides(world,p)){if(survival&&!inWater&&vertical < -10){health=Math.max(0,health-Math.ceil((-vertical-10)*1.5));hud();if(!health){health=20;home();hud();status.textContent='摔落后已重生，背包保留';persist();return;}}grounded=vertical<0;p.y=oldY;vertical=0;}else grounded=false;}
        if(p.y<-68){if(survival){damage(100);persist();}else{voidFallen=true;flying=false;p.y=Math.max(-150,p.y);status.textContent='已坠入虚空，不能飞回；可从暂停菜单退出世界';}} camera.position.set(p.x,p.y+1.6,p.z);camera.rotation.set(pitch,yaw,0);avatar.visible=viewMode!==0;avatar.position.set(p.x,p.y,p.z);avatar.rotation.y=yaw;const walk=Math.sin(now*.008)*(forward||side?.35:0);leftLeg.rotation.x=rightArm.rotation.x=walk;rightLeg.rotation.x=leftArm.rotation.x=-walk;if(mining)rightArm.rotation.x=-.7+Math.sin(now*.03)*.5;handle.visible=blade.visible=!!selected?.includes('pickaxe');handle.rotation.x=blade.rotation.x=rightArm.rotation.x;view.querySelector('.voxel-hand').hidden=viewMode!==0;if(viewMode){const direction=viewMode===1?1:-1;const origin=new T.Vector3(p.x,p.y+1.5,p.z),offset=new T.Vector3(Math.sin(yaw)*direction,.3,Math.cos(yaw)*direction).normalize(),cameraRay=new T.Raycaster(origin,offset,0,4),wall=cameraRay.intersectObjects(meshes,false)[0],distance=wall?Math.max(.4,wall.distance-.25):4;avatar.visible=distance>1.2;camera.position.copy(origin).addScaledVector(offset,distance);camera.lookAt(p.x,p.y+1.2,p.z);}if(sleepingUntil){camera.rotation.z=Math.PI*.36;avatar.rotation.z=Math.PI/2;}else avatar.rotation.z=0;camera.updateMatrixWorld();
        const hit=target();outline.visible=!!hit;if(hit){const [x,y,z]=hit.object.userData.positions[hit.instanceId];outline.position.set(x+.5,y+.5,z+.5);}
        host.querySelector('.voxel-coords').textContent=`X ${p.x.toFixed(1)} · Y ${p.y.toFixed(1)} · Z ${p.z.toFixed(1)} · 附近生物 ${mobs.count()} · ${stream?(options.terrain==='flat'?'平原':terrainPack.biomeAt(p.x,p.z).name):{nether:'下界',end:'末地'}[dimension]}`;
        const submerged=['water','sulphurwater','coral','kelp'].includes(world.get(key(Math.floor(p.x),Math.floor(p.y+1.5),Math.floor(p.z))));
        if(submerged){scene.fog.near=1;scene.fog.far=15;scene.fog.color.set('#326e88');scene.background.set('#326e88');}else {scene.fog.near=18;scene.fog.far=34;scene.background.set(dimension==='nether'?'#402723':dimension==='end'?'#191c2c':night?'#142841':'#9cd4f0');scene.fog.color.copy(scene.background);}
        for(let i=0;i<bubbleMesh.count;i++){const source=bubbleSources[Math.floor(i*bubbleSources.length/bubbleMesh.count)];const phase=(now*.00045+i*.37)%1;bubbleMatrix.makeScale(.07+phase*.06,.07+phase*.06,.07+phase*.06);bubbleMatrix.setPosition(source[0]+.5,source[1]+.8+phase,source[2]+.5);bubbleMesh.setMatrixAt(i,bubbleMatrix);}bubbleMesh.instanceMatrix.needsUpdate=true;
        clouds.position.set(p.x+Math.sin(now*.000015)*2,0,p.z);renderer.render(scene,camera);
      }raf=requestAnimationFrame(frame);status.textContent=survival?'生存世界已就绪 · 先采木头，再合成木镐':'创造世界已就绪 · 材料不限';
      cleanup=()=>{drops.forEach(d=>scene.remove(d.mesh));crackTexture.dispose();crackMaterial.dispose();clearTimeout(holdTimer);releaseStick();if(document.pointerLockElement===canvas)document.exitPointerLock();document.removeEventListener('mousemove',mouseLook);persist();audio.dispose();mobs?.dispose();stream?.dispose();delete host.saveWorld;cancelAnimationFrame(raf);resize.disconnect();keys.clear();document.removeEventListener('keydown',onKey);document.removeEventListener('keyup',onUp);window.removeEventListener('blur',clear);document.removeEventListener('visibilitychange',clear);for(const mesh of meshes)mesh.dispose();geometry.dispose();outlineGeo.dispose();outlineMat.dispose();cloudMaterial.dispose();bubbleMesh.dispose();bubbleMaterial.dispose();avatarMaterials.forEach(m=>m.dispose());new Set(Object.values(materials).flat()).forEach(m=>m.dispose());textures.forEach(t=>t.dispose());renderer.dispose();canvas.remove();};
    }).catch(error=>{cleanup();if(!disposed)status.textContent='3D 世界未能启动：'+error.message;});
    return()=>{disposed=true;cleanup();};
  }
  window.VoxelWorld={mount:host=>window.VoxelShell.mount(host,mount)};
})();











