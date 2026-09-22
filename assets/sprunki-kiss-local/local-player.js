/* Local wrapper around the original publicly hosted TurboWarp game package. */
(() => {
 const $=id=>document.getElementById(id),start=$('start'),sound=$('sound'),status=$('status');
 let scaffolding,vm,running=false,disposed=false;
 async function unlock(){const ctx=vm?.runtime.audioEngine?.audioContext;if(ctx?.state==='suspended')await ctx.resume();if(ctx&&ctx.state!=='running')throw Error('声音尚未开启，请再点一次“开启声音”');sound.textContent='声音已开启';status.textContent='拖动角色图标到人物身上，开始合奏';}
 function error(e){status.textContent='加载失败：'+e.message;$('message').textContent='本机资源未能读取，请重新加载游戏。';$('cover').hidden=false;start.disabled=false;start.textContent='重新加载';start.onclick=()=>location.reload();}
 async function load(){
  scaffolding=new Scaffolding.Scaffolding();scaffolding.width=480;scaffolding.height=360;scaffolding.resizeMode='preserve-ratio';scaffolding.usePackagedRuntime=true;scaffolding.setup();scaffolding.appendTo($('app'));vm=scaffolding.vm;
  vm.setTurboMode(false);vm.setFramerate?.(30);vm.setCompilerOptions?.({enabled:true,warpTimer:false});vm.setRuntimeOptions?.({fencing:true,miscLimits:true,maxClones:300});
  const storage=scaffolding.storage;storage.onprogress=(total,loaded)=>{$('progress').value=total?loaded/total:0;$('message').textContent=`正在读取本机资源 ${loaded} / ${total}`;};
  storage.addWebStore([storage.AssetType.ImageVector,storage.AssetType.ImageBitmap,storage.AssetType.Sound,storage.AssetType.Font].filter(Boolean),a=>new URL('./assets/'+a.assetId+'.'+a.dataFormat,location.href).href);
  const response=await fetch('./assets/project.json');if(!response.ok)throw Error('项目文件缺失');await scaffolding.loadProject(await response.arrayBuffer());
  if(disposed)return;$('progress').value=1;$('message').textContent='原版角色与声音已载入，不需要连接外站。';status.textContent='准备好了，请点击开始';start.disabled=false;start.textContent='开始游戏并开启声音';sound.disabled=false;
  start.onclick=async()=>{try{await unlock();if(!running){scaffolding.start();running=true;}$('cover').hidden=true;}catch(e){status.textContent=e.message;}};
  sound.onclick=()=>unlock().catch(e=>status.textContent=e.message);
  const ctx=vm.runtime.audioEngine?.audioContext;if(ctx)ctx.onstatechange=()=>{if(ctx.state==='suspended'){sound.textContent='恢复声音';status.textContent='声音已暂停，点“恢复声音”继续';}};
 }
 document.addEventListener('visibilitychange',()=>{if(document.hidden&&running)vm?.setPaused?.(true);else if(running){vm?.setPaused?.(false);unlock().catch(()=>{sound.textContent='恢复声音';});}});
 addEventListener('pagehide',()=>{disposed=true;scaffolding?.stopAll();vm?.runtime.audioEngine?.audioContext?.close().catch(()=>{});});
 load().catch(error);
})();
