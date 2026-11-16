/* Atlas rendering: load/decode once, then draw frames against the audio clock. */
(()=>{
 const data=window.DanceReferenceData,images=new Map(),pending=new Map();
 function load(id){if(images.has(id)){const image=images.get(id);images.delete(id);images.set(id,image);return Promise.resolve(image);}if(pending.has(id))return pending.get(id);const art=data.characters[id];if(!art)return Promise.resolve(null);
  const task=(async()=>{const image=new Image();image.src=art.image;await image.decode();images.set(id,image);pending.delete(id);while(images.size>6)images.delete(images.keys().next().value);return image;})();pending.set(id,task);task.catch(()=>pending.delete(id));return task;
 }
 function draw(canvas,id,animation,elapsed){const art=data.characters[id],image=images.get(id);if(!art)return;if(!image){load(id).catch(()=>{});return;}const anim=art.animations[animation]||art.animations.idle;if(!anim)return;const index=Math.max(0,Math.floor(elapsed*anim.fps)),frame=anim.frames[anim.loop&&animation==='idle'?index%anim.frames.length:Math.min(index,anim.frames.length-1)],key=id+':'+frame;if(canvas.dataset.frame===key)return;canvas.dataset.frame=key;
  const [w,h]=art.cell;if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;}const g=canvas.getContext('2d');g.clearRect(0,0,w,h);g.drawImage(image,frame%art.columns*w,Math.floor(frame/art.columns)*h,w,h,0,0,w,h);
 }
 function mountStage(stage){
  const world=stage.querySelector('.dance-mobile-world')||stage;
  const back=document.createElement('canvas'),front=document.createElement('canvas');back.className='rainbrawl-scenery rainbrawl-background';front.className='rainbrawl-scenery rainbrawl-foreground';back.setAttribute('aria-hidden','true');front.setAttribute('aria-hidden','true');world.prepend(back);world.append(front);
  let pending=null,assets=null,previous='',disposed=false;
  function prepare(){if(pending)return;pending=Promise.all(['1','2','4','division','mard_moss','milly_scorpy_fred'].map(async name=>{const image=new Image();image.src='./assets/dance-reference/rainbrawl/'+name+'.png';await image.decode();let frames=null;if(!['1','2','4'].includes(name)){const response=await fetch('./assets/dance-reference/rainbrawl/'+name+'.json');if(!response.ok)throw Error('舞台动作读取失败');frames=await response.json();}return [name,{image,frames}];})).then(entries=>{assets=Object.fromEntries(entries);}).catch(()=>{pending=null;});}
  function sync(song,time){const enabled=song?.id==='reference-rainbrawl';back.hidden=front.hidden=!enabled;stage.classList.toggle('dance-rainbrawl-stage',enabled);if(!enabled||disposed)return;prepare();if(!assets)return;
   const w=Math.max(1,back.clientWidth),h=Math.max(1,back.clientHeight),reduced=matchMedia('(prefers-reduced-motion: reduce)').matches,t=reduced?0:Math.max(0,time),key=w+':'+h+':'+Math.floor(t*24);if(key===previous)return;previous=key;
   for(const canvas of [back,front]){if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;}canvas.getContext('2d').clearRect(0,0,w,h);}
   const scale=Math.max(w/2040,h/1080),ox=(w-2040*scale)/2,oy=(h-1080*scale)/2;
   const context=back.getContext('2d'),foreground=front.getContext('2d');for(const g of [context,foreground]){g.setTransform(scale,0,0,scale,ox,oy);}
   context.drawImage(assets['1'].image,0,0,2040,1086);context.drawImage(assets['2'].image,-160,400,2592,713);context.drawImage(assets['4'].image,-85,600,2356,448);
   function animate(g,name,x,y,size,fps){const item=assets[name],frame=item.frames[Math.floor(t*fps)%item.frames.length];const width=Number(frame.width),height=Number(frame.height);g.drawImage(item.image,Number(frame.x),Number(frame.y),width,height,x,y,width*size,height*size);}
   animate(context,'division',862,0,1,8);animate(foreground,'milly_scorpy_fred',-25,485,.7,24);animate(foreground,'mard_moss',1430,560,.58,24);
   for(const g of [context,foreground])g.setTransform(1,0,0,1,0,0);
  }
  return {sync,dispose(){disposed=true;back.remove();front.remove();}};
 }
 window.DanceReference={has:id=>!!data.characters[id],animations:id=>Object.keys(data.characters[id]?.animations||{}),prepare:ids=>Promise.all([...new Set(ids.filter(Boolean))].map(load)),draw,mountStage};
})();
