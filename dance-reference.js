/* Atlas rendering: load/decode once, then draw frames against the audio clock. */
(()=>{
 const data=window.DanceReferenceData,images=new Map(),pending=new Map();
 function load(id){if(images.has(id)){const image=images.get(id);images.delete(id);images.set(id,image);return Promise.resolve(image);}if(pending.has(id))return pending.get(id);const art=data.characters[id];if(!art)return Promise.resolve(null);
  const task=(async()=>{const image=new Image();image.src=art.image;await image.decode();images.set(id,image);pending.delete(id);while(images.size>6)images.delete(images.keys().next().value);return image;})();pending.set(id,task);task.catch(()=>pending.delete(id));return task;
 }
 function draw(canvas,id,animation,elapsed){const art=data.characters[id],image=images.get(id);if(!art)return;if(!image){load(id).catch(()=>{});return;}const anim=art.animations[animation]||art.animations.idle;if(!anim)return;const index=Math.max(0,Math.floor(elapsed*anim.fps)),frame=anim.frames[anim.loop?index%anim.frames.length:Math.min(index,anim.frames.length-1)],key=id+':'+frame;if(canvas.dataset.frame===key)return;canvas.dataset.frame=key;
  const [w,h]=art.cell;if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;}const g=canvas.getContext('2d');g.clearRect(0,0,w,h);g.drawImage(image,frame%art.columns*w,Math.floor(frame/art.columns)*h,w,h,0,0,w,h);
 }
 window.DanceReference={has:id=>!!data.characters[id],prepare:ids=>Promise.all([...new Set(ids.filter(Boolean))].map(load)),draw};
})();
