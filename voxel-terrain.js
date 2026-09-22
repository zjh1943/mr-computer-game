/* Deterministic, on-demand overworld. Only nearby chunks stay resident. */
(() => {
  const SIZE=16,RADIUS=2,MIN_Y=-64;
  const caveAt=(x,y,z)=>y>-61&&y<-6&&(Math.abs(Math.sin(x*.11)+Math.cos(z*.12))<.28&&Math.abs(Math.sin(y*.19)+Math.cos(x*.05+z*.07))<.42);
  const types={bedrock:['基岩','#383b42'],door:['木门','#98703d'],door_open:['木门（开）','#98703d'],redgrass:['红草方块','#ba443b'],redwood:['红枫原木','#985048'],redleaves:['红枫树叶','#df5139'],junglewood:['雨林原木','#78603d'],jungleleaves:['雨林树叶','#287d3d'],sulphur:['硫磺岩','#d6b832'],sulphurwater:['硫磺泉','#ddcb3f'],cactus:['仙人掌','#49863d'],snowgrass:['积雪草地','#e8f0ee'],coral:['珊瑚','#de768f'],kelp:['海带','#397d4e'],darkplanks:['沉船木板','#6b5640']};
  const biomes={forest:{id:'forest',name:'树林',size:'224 × 224',color:'#497d43'},maple:{id:'maple',name:'红枫林',size:'36 × 36',color:'#cf5240'},sulphur:{id:'sulphur',name:'硫磺湿地',size:'128 × 128',color:'#d2b838'},ocean:{id:'ocean',name:'珊瑚海洋',size:'320 × 256',color:'#438cab'},jungle:{id:'jungle',name:'雨林',size:'192 × 256',color:'#256b3c'},desert:{id:'desert',name:'沙漠',size:'288 × 224',color:'#d6bf80'},snow:{id:'snow',name:'雪林',size:'256 × 192',color:'#c6d8dd'},plains:{id:'plains',name:'草原',size:'自然延伸',color:'#92ac54'}};
  const destinations=[['forest',0,9],['maple',129,0],['sulphur',210,0],['ocean',360,0],['jungle',-180,0],['desert',0,180],['snow',0,-200]];
  const key=(x,y,z)=>`${x},${y},${z}`;
  const region=(x,z)=>{const ox=Math.floor((x+1024)/2048)*2048,oz=Math.floor((z+1024)/2048)*2048;return {x:x-ox,z:z-oz,ox,oz};};
  const hash=(x,z)=>((Math.imul(x,73856093)^Math.imul(z,19349663))>>>0);
  function biomeAt(x,z){const p=region(x,z);x=p.x;z=p.z;
    if(x>=-112&&x<112&&z>=-112&&z<112)return biomes.forest;
    if(x>=112&&x<148&&z>=-18&&z<18)return biomes.maple;
    if(x>=148&&x<276&&z>=-64&&z<64)return biomes.sulphur;
    if(x>=276&&x<596&&z>=-128&&z<128)return biomes.ocean;
    if(x>=-304&&x< -112&&z>=-128&&z<128)return biomes.jungle;
    if(x>=-144&&x<144&&z>=112&&z<336)return biomes.desert;
    if(x>=-128&&x<128&&z>=-304&&z< -112)return biomes.snow;
    return biomes.plains;
  }
  function groundAt(x,z){const b=biomeAt(x,z).id,p=region(x,z);
    if(b==='ocean')return -Math.min(6,1+Math.floor(Math.min(p.x-276,595-p.x,p.z+128,127-p.z)/3));
    if(b==='sulphur')return (Math.sin(x*.12)+Math.cos(z*.15)>.8)?0:1;
    return Math.floor(1.8+Math.sin(x*.12)*1.4+Math.cos(z*.13)*1.3);
  }
  function lootAt(x,y,z){const p=region(x,z);return p.x===361&&p.z===2&&y===-4?{iron:3,emerald:2,coal:5}:{};}
  function generateChunk(cx,cz,options={}){
    const map=new Map(),x0=cx*SIZE,z0=cz*SIZE;
    const set=(x,y,z,t)=>{if(x>=x0&&x<x0+SIZE&&z>=z0&&z<z0+SIZE)map.set(key(x,y,z),t);};
    for(let x=x0;x<x0+SIZE;x++)for(let z=z0;z<z0+SIZE;z++){
      const b=options.flat?'plains':biomeAt(x,z).id,top=options.flat?1:groundAt(x,z);
      const surface={maple:'redgrass',desert:'sand',sulphur:'sulphur',snow:'snowgrass',ocean:'sand'}[b]||'grass';
      for(let y=MIN_Y;y<=top;y++){if(y!==MIN_Y&&caveAt(x,y,z))continue;if(y<-8&&y!==MIN_Y&&![[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]].some(([a,b,c])=>caveAt(x+a,y+b,z+c)))continue;set(x,y,z,y===MIN_Y?'bedrock':y===top?surface:y<top-2?(options.oreAt?.(x,y,z)||'stone'):'dirt');}
      if(b==='ocean'){for(let y=top+1;y<=0;y++)set(x,y,z,'water');if(hash(x,z)%37===0){const tall=1+hash(z,x)%3;for(let y=1;y<=tall&&top+y<0;y++)set(x,top+y,z,y===1&&hash(x,z)%2?'coral':'kelp');}}
      if(b==='sulphur'&&top===0)set(x,1,z,'sulphurwater');
      if(b==='desert'&&hash(x,z)%139===0)for(let n=1;n<=3;n++)set(x,top+n,z,'cactus');
    }
    // Global tree anchors are generated outside each chunk too, avoiding clipped crowns at seams.
    if(!options.flat)for(let ax=Math.floor((x0-3)/8)*8;ax<x0+SIZE+3;ax+=8)for(let az=Math.floor((z0-3)/8)*8;az<z0+SIZE+3;az+=8){
      const x=ax+hash(ax,az)%3,z=az+hash(az,ax)%3,b=biomeAt(x,z).id;
      if(!['forest','jungle','maple','snow'].includes(b))continue;
      const h=groundAt(x,z),tall=b==='jungle'?7:4,wood=b==='maple'?'redwood':b==='jungle'?'junglewood':'wood',leaves=b==='maple'?'redleaves':b==='jungle'?'jungleleaves':'leaves';
      for(let n=1;n<=tall;n++)set(x,h+n,z,wood);
      for(let a=-2;a<=2;a++)for(let c=-2;c<=2;c++)for(let y=tall-1;y<=tall+1;y++)if(Math.abs(a)+Math.abs(c)<4&&(a||c||y>tall))set(x+a,h+y,z+c,leaves);
    }
    if(!options.flat){const p=region(x0+8,z0+8),sx=p.ox+360,sz=p.oz;
      for(let x=sx-3;x<=sx+3;x++)for(let z=sz-6;z<=sz+6;z++){
        if(Math.abs(x-sx)===3&&Math.abs(z-sz)>4)continue;
        set(x,-5,z,'darkplanks');
        if(Math.abs(x-sx)===3||Math.abs(z-sz)===6)for(let y=-4;y<=-2;y++)if(hash(x+y,z)%7!==0)set(x,y,z,'darkplanks');
      }
      for(let y=-4;y<=3;y++)set(sx,y,sz-3,'wood');set(sx+1,-4,sz+2,'chest');
    }
    // Central 33×33 terrain retains the legacy world, including earlier buildings.
    if(options.legacy)for(let x=Math.max(-16,x0);x<=Math.min(16,x0+15);x++)for(let z=Math.max(-16,z0);z<=Math.min(16,z0+15);z++)for(let y=-8;y<=20;y++){const k=key(x,y,z),type=options.legacy.get(k);if(type)map.set(k,type);else map.delete(k);}
    if(options.diamond)for(const [k,t] of map)if(['grass','dirt','stone','sand','coalore','ironore','redstoneore','redgrass','snowgrass','diamondore'].includes(t))map.set(k,'diamondore');
    return map;
  }
  function flowDown(world,edits,queue,budget=48){let changed=false;world.flowLevels??=new Map();for(let i=0,n=Math.min(budget,queue.length);i<n;i++){const source=queue.shift();if(world.get(source)!=='water')continue;const [x,y,z]=source.split(',').map(Number),level=world.flowLevels.get(source)||0;const below=key(x,y-1,z);const spread=!world.has(below)?[[x,y-1,z,level]]:level<4?[[x+1,y,z,level+1],[x-1,y,z,level+1],[x,y,z+1,level+1],[x,y,z-1,level+1]]:[];for(const [a,b,c,l] of spread){const dest=key(a,b,c);if(b>=MIN_Y&&!world.has(dest)&&edits.size<20000&&(!world.isLoaded||world.isLoaded(a,c))){world.set(dest,'water');edits.set(dest,'water');world.flowLevels.set(dest,l);queue.push(dest);changed=true;}}}return changed;}
  function createStream(world,edits,options={}){
    const chunks=new Map();let center='';
    const rawGet=world.get.bind(world);
    world.get=k=>{const stored=rawGet(k);if(stored!==undefined)return stored;const [x,y,z]=String(k).split(',').map(Number);if(!world.isLoaded?.(x,z))return undefined;if(edits.has(k))return edits.get(k)||undefined;if(y>=-8||y<MIN_Y||!world.isLoaded?.(x,z)||caveAt(x,y,z))return undefined;return y===MIN_Y?'bedrock':options.diamond?'diamondore':options.oreAt?.(x,y,z)||'stone';};
    world.has=k=>world.get(k)!==undefined;
    world.isLoaded=(x,z)=>chunks.has(`${Math.floor(x/SIZE)},${Math.floor(z/SIZE)}`);
    function move(x,z){const cx=Math.floor(x/SIZE),cz=Math.floor(z/SIZE),id=`${cx},${cz}`;if(center===id)return false;center=id;
      for(const [k,keys] of chunks){const [a,b]=k.split(',').map(Number);if(Math.abs(a-cx)>RADIUS||Math.abs(b-cz)>RADIUS){for(const key of keys)world.delete(key);chunks.delete(k);}}
      // Remove edits added to a chunk after generation when that chunk unloads.
      for(const k of world.keys()){const [a,,b]=k.split(',').map(Number);if(Math.abs(Math.floor(a/SIZE)-cx)>RADIUS||Math.abs(Math.floor(b/SIZE)-cz)>RADIUS)world.delete(k);}
      for(let a=cx-RADIUS;a<=cx+RADIUS;a++)for(let b=cz-RADIUS;b<=cz+RADIUS;b++){const k=`${a},${b}`;if(chunks.has(k))continue;const generated=generateChunk(a,b,options);for(const [q,t] of generated)world.set(q,t);for(const [local,t] of options.copyEdits||[]){const [lx,ly,lz]=local.split(',').map(Number),q=key(a*16+lx,ly,b*16+lz);if(t===null)world.delete(q);else world.set(q,t);Map.prototype.set.call(edits,q,t);}for(const [q,t] of edits){const [ex,,ez]=q.split(',').map(Number);if(Math.floor(ex/SIZE)===a&&Math.floor(ez/SIZE)===b){if(t===null)world.delete(q);else world.set(q,t);}}chunks.set(k,[...generated.keys()]);for(const [q,t] of edits){if(t!==null)continue;const [ex,ey,ez]=q.split(',').map(Number);if(Math.floor(ex/SIZE)!==a||Math.floor(ez/SIZE)!==b)continue;for(const [dx,dy,dz] of [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]]){const n=key(ex+dx,ey+dy,ez+dz),v=world.get(n);if(v)world.set(n,v);}}}
      return true;
    }
    return {move,count:()=>chunks.size,dispose(){chunks.clear();world.clear();delete world.isLoaded;delete world.get;delete world.has;delete world.flowLevels;}};
  }
  const api={SIZE,RADIUS,MIN_Y,caveAt,flowDown,types,biomes,destinations,biomeAt,groundAt,lootAt,generateChunk,createStream};if(typeof module!=='undefined')module.exports=api;else window.VoxelTerrain=api;
})();
