/* Bounded offline survival systems; meshes and materials are shared. */
(() => {
  const LIMITS={savedCreatures:512,worldRadius:40,minY:-64,maxY:20,pixelRatio:1.25};
  const items={coal:'煤炭',iron:'铁锭',diamond:'钻石',stonepickaxe:'石镐',ironpickaxe:'铁镐',sword:'石剑',armor:'铁护甲',wool:'羊毛',rawmeat:'生肉',cookedmeat:'熟肉',bed:'床',furnace:'熔炉'};
  const recipes={stonepickaxe:{name:'石镐',cost:{stone:3,planks:2},output:'stonepickaxe',amount:1},ironpickaxe:{name:'铁镐',cost:{iron:3,planks:2},output:'ironpickaxe',amount:1},sword:{name:'石剑',cost:{stone:2,planks:1},output:'sword',amount:1},furnace:{name:'熔炉',cost:{stone:8},output:'furnace',amount:1},iron:{name:'烧炼铁锭 ×2',cost:{ironore:2,coal:1},requires:'furnace',output:'iron',amount:2},cookedmeat:{name:'烤肉 ×2',cost:{rawmeat:2,coal:1},requires:'furnace',output:'cookedmeat',amount:2},armor:{name:'铁护甲',cost:{iron:8},output:'armor',amount:1},bed:{name:'床',cost:{wool:3,planks:3},output:'bed',amount:1}};
  Object.assign(items,{diamondpickaxe:'钻石镐',diamondsword:'钻石剑'});
  Object.assign(recipes,{diamondpickaxe:{name:'钻石镐',cost:{diamond:3,planks:2},output:'diamondpickaxe',amount:1},diamondsword:{name:'钻石剑',cost:{diamond:2,planks:1},output:'diamondsword',amount:1}});
  Object.assign(items,{bucket:'铁桶',waterbucket:'水桶',diamondhelmet:'钻石头盔',diamondchest:'钻石胸甲',diamondlegs:'钻石护腿',diamondboots:'钻石靴子',bedrockpickaxe:'基岩镐',bedrocksword:'基岩剑',bedrockhelmet:'基岩头盔',bedrockchest:'基岩胸甲',bedrocklegs:'基岩护腿',bedrockboots:'基岩靴子',slimeball:'黏液球'});
  recipes.bucket={name:'铁桶',cost:{iron:3},output:'bucket',amount:1};
  for(const material of ['diamond','bedrock'])for(const [part,n,label] of [['helmet',5,'头盔'],['chest',8,'胸甲'],['legs',7,'护腿'],['boots',4,'靴子']]){const id=material+part;recipes[id]={name:(material==='diamond'?'钻石':'基岩')+label,cost:{[material==='bedrock'?'obsidian':'diamond']:n},output:id,amount:1};}
  for(const [id,label,n] of [['bedrockpickaxe','基岩镐',3],['bedrocksword','基岩剑',2]])recipes[id]={name:label,cost:{obsidian:n,diamond:2},output:id,amount:1};
  const miningTier=inventory=>inventory.bedrockpickaxe>0?5:inventory.diamondpickaxe>0?4:inventory.ironpickaxe>0?3:inventory.stonepickaxe>0?2:inventory.pickaxe>0?1:0;
  const requiredTier=type=>({stone:1,coalore:1,ironore:2,diamondore:3,redstoneore:2}[type]||0);
  const attackDamage=inventory=>inventory.bedrocksword>0?10:inventory.diamondsword>0?6:inventory.sword>0?4:2;
  const incomingDamage=(amount,inventory)=>{const pieces=['helmet','chest','legs','boots'].reduce((n,k)=>n+(inventory['bedrock'+k]>0?.19:inventory['diamond'+k]>0?.15:0),0);return Math.max(1,Math.ceil(amount*(1-Math.min(.8,pieces+(inventory.armor>0?.5:0)))));};
  function oreAt(x,y,z){const hash=Math.abs((x*73856093^y*19349663^z*83492791)>>>0);if(y<=-5&&hash%43===0)return 'diamondore';if(y<=-3&&hash%19===0)return 'redstoneore';if(y<=-2&&hash%17===0)return 'ironore';if(y<=0&&hash%11===0)return 'coalore';return 'stone';}
  if(typeof module!=='undefined'){module.exports={LIMITS,items,recipes,miningTier,requiredTier,attackDamage,incomingDamage,oreAt,create};return;}
  function create(T,scene,world,saved,onDamage,onDrop,settlement=true,options={}){
    const geo=new T.BoxGeometry(1,1,1),mats={wool:new T.MeshLambertMaterial({color:0xeee8d4}),skin:new T.MeshLambertMaterial({color:0xb19e87}),pig:new T.MeshLambertMaterial({color:0xe5a7a0}),monster:new T.MeshLambertMaterial({color:0x779166}),bone:new T.MeshLambertMaterial({color:0xdcdcd2}),dark:new T.MeshLambertMaterial({color:0x29313c}),robe:new T.MeshLambertMaterial({color:0x9b7152}),caveslime:new T.MeshLambertMaterial({color:0x69c95c,transparent:true,opacity:.8}),slime:new T.MeshLambertMaterial({color:0xeed52f,transparent:true,opacity:.78}),fish:new T.MeshLambertMaterial({color:0xef9b52})};
    const hostile=t=>t==='monster'||t==='skeleton';let projectiles=[];
    let creatures=[],lastNight=false,time=0,spawnTime=0,spawnIndex=0;
    const ground=(x,z,type,nearY=20)=>{for(let y=Math.min(20,Math.floor(nearY));y>=LIMITS.minY;y--){const block=world.get(`${Math.floor(x)},${y},${Math.floor(z)}`);if(!block||(nearY<0&&(world.has(Math.floor(x)+','+(y+1)+','+Math.floor(z))||world.has(Math.floor(x)+','+(y+2)+','+Math.floor(z))))||block.endsWith('leaves')||['crop','ripe','wire','torch','kelp','coral'].includes(block))continue;if(block==='water')return type==='fish'?y-.5:null;if(block==='sulphurwater')return type==='slime'?y+1:null;if(block==='lava'||block.endsWith('wood'))return null;return type==='fish'?null:y+1;}return null;};
    function disguise(m,type){const material=options.materials?.[type];if(!material)return false;m.disguise=type;m.body.material=material;return true;}
    function add(type,x,z,hp=hostile(type)?8:type==='slime'?6:4,appearance,nearY=20){
      const y=ground(x,z,type,nearY);if(y===null)return null;
      const group=new T.Group(),legs=[],material=mats[type]||mats.wool;
      const part=(sx,sy,sz,px,py,pz,mat)=>{const mesh=new T.Mesh(geo,mat);mesh.scale.set(sx,sy,sz);mesh.position.set(px,py,pz);group.add(mesh);return mesh;};let body;
      if(type==='slime'||type==='caveslime'){body=part(1.15,1.05,1.15,0,.55,0,type==='caveslime'?mats.caveslime:mats.slime);for(const x of [-.22,.22])part(.16,.16,.04,x,.67,.59,mats.dark);part(.28,.08,.04,0,.35,.59,mats.dark);}
      else if(type==='fish'){body=part(.28,.38,.8,0,0,0,mats.fish);part(.5,.36,.12,0,0,-.46,mats.fish);for(const x of [-.16,.16])part(.04,.07,.07,x,.08,.24,mats.dark);}
      else if(hostile(type)||type==='villager'){const mat=type==='villager'?mats.robe:type==='skeleton'?mats.bone:mats.monster;body=part(.5,.7,.3,0,.85,0,mat);part(.5,.5,.5,0,1.45,0,type==='villager'?mats.skin:mat);if(type==='villager'){part(.54,.12,.54,0,1.73,0,mats.robe);part(.54,.5,.12,0,1.45,-.24,mats.robe);}for(const x of [-.16,.16])legs.push(part(.2,.5,.22,x,.25,0,mats.dark));part(.18,.55,.18,-.36,.9,.14,mat);part(.18,.55,.18,.36,.9,.14,mat);for(const x of [-.12,.12])part(.08,.08,.035,x,1.5,.26,mats.dark);if(type==='villager'){part(.15,.3,.22,0,1.31,.32,mats.skin);part(.38,.05,.04,0,1.57,.27,mats.dark);part(.65,.15,.25,0,.95,.25,mats.robe);}if(type==='skeleton'){part(.06,.65,.06,.48,1,.3,mats.robe);part(.06,.06,.35,.48,.7,.15,mats.robe);}}
      else {body=part(.8,.55,1.1,0,.65,0,material);part(.45,.45,.45,0,.8,.65,type==='sheep'?mats.skin:material);for(const x of [-.25,.25])for(const z of [-.35,.35])legs.push(part(.18,.4,.18,x,.2,z,mats.skin));for(const x of [-.12,.12])part(.08,.08,.035,x,.87,.89,mats.dark);}
      group.position.set(x,y,z);const mob={type,hp,group,legs,body,angle:x*.7+z,cooldown:0,id:(spawnIndex++*.618)%1,baseY:y,underground:nearY<0};group.traverse(child=>child.userData.mob=mob);creatures.push(mob);scene.add(group);if(appearance)disguise(mob,appearance);return mob;
    }
    const initial=Array.isArray(saved)?saved:[{type:'sheep',x:2,z:6,hp:4},{type:'sheep',x:-4,z:6,hp:4},{type:'sheep',x:5,z:10,hp:4},{type:'pig',x:-2,z:3,hp:4},{type:'pig',x:10,z:0,hp:4}];
    initial.slice(0,LIMITS.savedCreatures).forEach(m=>{if(['sheep','pig','villager','slime','fish'].includes(m.type)&&Number.isFinite(m.x)&&Number.isFinite(m.z)&&m.hp>0)add(m.type,m.x,m.z,Math.min(20,m.hp),m.disguise);});
    function village(){if(settlement&&!creatures.some(m=>m.type==='villager')){add('villager',-7,2,20);add('villager',-9,2,20);}}village();
    function remove(m){scene.remove(m.group);creatures=creatures.filter(x=>x!==m);}
    function populate(p,night){if(!settlement)return;village();for(let i=0;i<8;i++){
      const phase=(++spawnIndex*2.399963),radius=8+(spawnIndex%15),x=p.x+Math.sin(phase)*radius,z=p.z+Math.cos(phase)*radius;
      const biome=options.biomeAt?.(x,z)?.id||'forest';
      const type=p.y<-6?(i%3===0?'caveslime':i%3===1?'monster':'skeleton'):biome==='sulphur'?'slime':biome==='ocean'?'fish':night&&i%2===0?'monster':spawnIndex%2?'sheep':'pig';
      if(creatures.filter(m=>m.type===type&&Math.hypot(m.group.position.x-x,m.group.position.z-z)<28).length>=20)continue;
      add(type,x,z,hostile(type)?8:4,undefined,p.y<-6?p.y+3:20);
    }}
    function update(dt,p,night,survival){time+=dt;spawnTime+=dt;
      creatures.filter(m=>Math.hypot(m.group.position.x-p.x,m.group.position.z-p.z)>40||(world.isLoaded&&!world.isLoaded(m.group.position.x,m.group.position.z))).forEach(remove);
      if(night&&!lastNight)populate(p,true);if(!night&&lastNight)creatures.filter(m=>hostile(m.type)&&!m.underground).forEach(remove);lastNight=night;
      if(spawnTime>=3){spawnTime=0;populate(p,night);}
      for(const m of creatures){m.cooldown=Math.max(0,m.cooldown-dt);const pos=m.group.position,dx=p.x-pos.x,dz=p.z-pos.z,distance=Math.hypot(dx,dz),chase=hostile(m.type)&&survival&&distance<13&&Math.abs(p.y-pos.y)<4;
        const curious=m.type==='slime'&&distance<10;let angle=(chase||curious)?Math.atan2(dx,dz):m.angle+Math.sin(time*.2+m.id)*.7;const speed=curious&&distance<2.5?0:chase?1.25:m.type==='slime'?.8:m.type==='fish'?1.1:.75;let walking=false;
        for(const turn of [0,.7,-.7,1.5,-1.5,Math.PI]){const heading=angle+turn,x=pos.x+Math.sin(heading)*speed*dt,z=pos.z+Math.cos(heading)*speed*dt,y=ground(x,z,m.type,m.underground?m.baseY+1:20);if((!world.isLoaded||world.isLoaded(x,z))&&y!==null&&Math.abs(y-m.baseY)<=1.05){pos.set(x,y,z);m.baseY=y;angle=heading;if(turn)m.angle=heading;walking=true;break;}}
        if(!walking)m.angle+=dt*3;
        if(m.type==='slime'||m.type==='caveslime'){const hop=Math.abs(Math.sin(time*3+m.id*6));pos.y=m.baseY+hop*(curious&&distance<3?.35:.7);m.group.scale.set(1+(1-hop)*.12,.85+hop*.15,1+(1-hop)*.12);}
        if(m.type==='fish')pos.y=m.baseY+Math.sin(time*2+m.id)*.15;
        m.group.rotation.y=angle;m.legs.forEach((leg,i)=>leg.rotation.x=walking?Math.sin(time*8+i*Math.PI)*.4:0);
        if(chase&&m.type==='skeleton'&&distance<12&&distance>2&&!m.cooldown){m.cooldown=2.4;const arrow=new T.Mesh(geo,mats.robe);arrow.scale.set(.07,.07,.65);arrow.position.set(pos.x,pos.y+1.35,pos.z);arrow.rotation.y=Math.atan2(dx,dz);const dy=p.y+1-pos.y-1.35,n=Math.hypot(dx,dy,dz)||1;scene.add(arrow);projectiles.push({mesh:arrow,v:{x:dx/n*10,y:dy/n*10,z:dz/n*10},age:0});}
        if(chase&&distance<1.3&&Math.abs(p.y-pos.y)<2&&!m.cooldown){m.cooldown=1.7;onDamage(2);}
      }
      for(const a of [...projectiles]){a.age+=dt;const q=a.mesh.position;let dead=false;for(let i=0;i<3;i++){q.x+=a.v.x*dt/3;q.y+=a.v.y*dt/3;q.z+=a.v.z*dt/3;const block=world.get(Math.floor(q.x)+','+Math.floor(q.y)+','+Math.floor(q.z));if(block&&block!=='water'){dead=true;break;}if(survival&&Math.hypot(q.x-p.x,q.y-p.y-1,q.z-p.z)<.65){onDamage(3);dead=true;break;}}if(dead||a.age>3){scene.remove(a.mesh);projectiles=projectiles.filter(b=>b!==a);}}
    }
    function nearest(ray,blockDistance,predicate=()=>true,range=3){const target=ray.intersectObjects(creatures.filter(predicate).map(m=>m.group),true)[0];return target&&target.distance<=range&&target.distance<=blockDistance?target.object.userData.mob:null;}
    function hit(ray,blockDistance,damage){const mob=nearest(ray,blockDistance);if(!mob||mob.type==='villager')return false;mob.hp-=damage;mob.angle+=Math.PI;if(mob.hp<=0){const drop=mob.type==='sheep'?{wool:1,rawmeat:1}:mob.type==='pig'||mob.type==='fish'?{rawmeat:2}:mob.type==='caveslime'?{slimeball:2}:mob.type==='slime'?{sulphur:1}:{coal:1};remove(mob);onDrop(drop);}return true;}
    return {absorb(ray,blockDistance,type){const m=nearest(ray,blockDistance,m=>m.type==='slime',6);return !!m&&disguise(m,type);},tradeTarget(ray,blockDistance){return !!nearest(ray,blockDistance,m=>m.type==='villager',4);},update,hit,count:()=>creatures.length,snapshot:()=>creatures.filter(m=>!hostile(m.type)).map(m=>({type:m.type,x:m.group.position.x,z:m.group.position.z,hp:m.hp,disguise:m.disguise})),dispose(){projectiles.forEach(a=>scene.remove(a.mesh));projectiles=[];creatures.forEach(m=>scene.remove(m.group));creatures=[];geo.dispose();Object.values(mats).forEach(m=>m.dispose());}};
  }
  window.VoxelSurvival={LIMITS,items,recipes,miningTier,requiredTier,attackDamage,incomingDamage,oreAt,create};
})();



