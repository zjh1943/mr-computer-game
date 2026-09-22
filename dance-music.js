/* Official hosted songs stay in their visible, credited original player. */
(() => {
  const tracks = [
{"id":"mix-sunny","name":"SPRUNKI · 草地派对","artist":"电脑先生编曲 · 多角色混音","bpm":100,"duration":78.8,"cast":["oren","raddy","clukr","simon","pinki"],"mix":[{"id":"oren","audio":"./assets/sprunki-kiss-local/assets/2ff9e556ae0b3cb4f9e4750dbe9b17d4.wav","beats":8,"gain":0.19},{"id":"raddy","audio":"./assets/sprunki-kiss-local/assets/ae111f7b2abb4ffe113d49e85cadcf7c.wav","beats":8,"gain":0.19},{"id":"clukr","audio":"./assets/sprunki-kiss-local/assets/70a511bac6487b9dfb4b9420ad7e86f6.wav","beats":8,"gain":0.19},{"id":"simon","audio":"./assets/sprunki-kiss-local/assets/5a09fb11b6441a49fc732a93b3b86b00.wav","beats":8,"gain":0.19},{"id":"pinki","audio":"./assets/sprunki-kiss-local/assets/be1cb011ce50969caf9511048105f167.wav","beats":16,"gain":0.19},{"id":"computer","audio":"./assets/sprunki-kiss-local/assets/cc85f2be1b1764358cd1ab84455d00a0.wav","beats":8,"gain":0.23}]},
{"id":"mix-forest","name":"SPRUNKI · 森林回声","artist":"电脑先生编曲 · 多角色混音","bpm":100,"duration":78.8,"cast":["oren","vineria","brud","durple","wenda"],"mix":[{"id":"oren","audio":"./assets/sprunki-kiss-local/assets/2ff9e556ae0b3cb4f9e4750dbe9b17d4.wav","beats":8,"gain":0.19},{"id":"vineria","audio":"./assets/sprunki-kiss-local/assets/7f08e76918d14fdfa46c4c61728808fc.wav","beats":8,"gain":0.19},{"id":"brud","audio":"./assets/sprunki-kiss-local/assets/ef3c0e50f5c2ac26bfc5700fce42db63.wav","beats":8,"gain":0.19},{"id":"durple","audio":"./assets/sprunki-kiss-local/assets/a61d4acb6949d64706ec7246eefc7e96.wav","beats":8,"gain":0.19},{"id":"wenda","audio":"./assets/sprunki-kiss-local/assets/d3412e9a60ca1e4fb3db49587687ec28.wav","beats":8,"gain":0.19},{"id":"computer","audio":"./assets/sprunki-kiss-local/assets/cc85f2be1b1764358cd1ab84455d00a0.wav","beats":8,"gain":0.23}]},
{"id":"mix-rainbow","name":"SPRUNKI · 彩虹合唱","artist":"电脑先生编曲 · 多角色混音","bpm":100,"duration":78.8,"cast":["oren","raddy","garnold","wenda","pinki"],"mix":[{"id":"oren","audio":"./assets/sprunki-kiss-local/assets/2ff9e556ae0b3cb4f9e4750dbe9b17d4.wav","beats":8,"gain":0.19},{"id":"raddy","audio":"./assets/sprunki-kiss-local/assets/ae111f7b2abb4ffe113d49e85cadcf7c.wav","beats":8,"gain":0.19},{"id":"garnold","audio":"./assets/sprunki-kiss-local/assets/20dd7bff5b7f33e61e878d6e7b03e48c.wav","beats":8,"gain":0.19},{"id":"wenda","audio":"./assets/sprunki-kiss-local/assets/d3412e9a60ca1e4fb3db49587687ec28.wav","beats":8,"gain":0.19},{"id":"pinki","audio":"./assets/sprunki-kiss-local/assets/be1cb011ce50969caf9511048105f167.wav","beats":16,"gain":0.19},{"id":"computer","audio":"./assets/sprunki-kiss-local/assets/cc85f2be1b1764358cd1ab84455d00a0.wav","beats":8,"gain":0.23}]},
    {id:'sprunki-friend',vocalWindows:[[34,41]],name:'SPRUNKI · Friend Like You',artist:'Horror Skunx',video:'Lz66RAjtCgw',bpm:120,duration:900,cast:['oren','pinki','gray','wenda'],castLabel:'舞台搭档'},
    {id:'sprunki-song',name:'SPRUNKI Song',artist:'BENJIxScarlett',video:'e6um0c7gP6s',bpm:120,duration:900,cast:['simon','oren','pinki','wenda','brud'],castLabel:'舞台搭档'}
  ];
  let api;
  function loadAPI(){
    if(window.YT?.Player)return Promise.resolve(window.YT);
    if(api)return api;
    const pending=new Promise((resolve,reject)=>{
      const script=document.createElement('script');let settled=false;
      const finish=error=>{if(settled)return;settled=true;clearTimeout(timeout);if(window.onYouTubeIframeAPIReady===ready)window.onYouTubeIframeAPIReady=undefined;if(error){script.remove();reject(error);}else resolve(window.YT);};
      const ready=()=>finish();window.onYouTubeIframeAPIReady=ready;
      const timeout=setTimeout(()=>finish(Error('原曲服务连接超时，可点击重试')),15000);
      script.src='https://www.youtube.com/iframe_api';script.async=true;
      script.onerror=()=>finish(Error('无法连接原曲服务，可点击重试'));
      document.head.append(script);
    });
    api=pending;pending.catch(()=>{if(api===pending)api=null;});return pending;
  }
  async function open(host,track,events){
    const YT=await loadAPI();if(!host.isConnected)return null;
    let player=null,dead=false,generation=0,retries=0,timer=0,resumeAt=0;
    const valid=g=>!dead&&g===generation&&host.isConnected;
    function arm(g,ms,fn){clearTimeout(timer);timer=setTimeout(()=>{if(valid(g))fn();},ms);}
    function fail(message,permanent=false){if(dead)return;clearTimeout(timer);if(!permanent&&retries<1){retries++;resumeAt=Number(player?.getCurrentTime?.())||resumeAt;events.loading?.('连接中断，正在重新连接原曲…');launch();return;}events.error(message);}
    function launch(){
      const g=++generation;player?.destroy();host.replaceChildren();const slot=document.createElement('div');host.append(slot);
      arm(g,15000,()=>fail('原曲连接仍未成功，请点“重试原曲”；本机歌曲可离线播放'));
      player=new YT.Player(slot,{width:'100%',height:'220',videoId:track.video,
        playerVars:{playsinline:1,autoplay:1,origin:location.origin,start:Math.floor(resumeAt)},events:{
          onReady:e=>{if(!valid(g))return;e.target.unMute?.();e.target.playVideo();arm(g,6000,()=>events.blocked());},
          onStateChange:e=>{if(!valid(g))return;clearTimeout(timer);events.state(e.data,e.target);if(e.data===3)arm(g,20000,()=>fail('歌曲缓冲超时，请重试原曲'));},
          onAutoplayBlocked:()=>{if(valid(g)){clearTimeout(timer);events.blocked();}},
          onError:e=>{if(valid(g))fail([100,101,150].includes(e.data)?'这首原曲暂时不允许嵌入播放，请选择本机音频':'原曲连接失败，请重试',[100,101,150].includes(e.data));}
        }});
    }
    const control={getCurrentTime:()=>Number(player?.getCurrentTime?.())||0,getDuration:()=>Number(player?.getDuration?.())||0,
      playVideo(){if(!dead){player?.unMute?.();player?.playVideo?.();}},
      destroy(){if(dead)return;dead=true;generation++;clearTimeout(timer);player?.destroy();player=null;host.replaceChildren();}};
    launch();return control;
  }

  // Fixed beat boundaries keep every voice and the arrow chart on one audio clock.
  const sections=[{from:0,to:16,voices:[0,3],name:'开场'},{from:16,to:48,voices:[0,1,2,3,4,5],name:'合奏'},{from:48,to:64,voices:[2,4],name:'间奏'},{from:64,to:112,voices:[0,1,2,3,4,5],name:'合唱'},{from:112,to:128,voices:[0,3,4],name:'尾声'}];
  async function prepareMix(ctx,track){
    const buffers=await Promise.all(track.mix.map(async stem=>{const response=await fetch(stem.audio);if(!response.ok)throw Error('合奏声音读取失败');return ctx.decodeAudioData(await response.arrayBuffer());}));
    return start=>{const beat=60/track.bpm;for(const part of sections)for(const i of part.voices){const stem=track.mix[i],source=ctx.createBufferSource(),gain=ctx.createGain(),at=start+2+part.from*beat,end=start+2+part.to*beat;source.buffer=buffers[i];source.loop=true;source.playbackRate.value=buffers[i].duration/(stem.beats*beat);source.connect(gain).connect(ctx.destination);gain.gain.setValueAtTime(0,at);gain.gain.linearRampToValueAtTime(stem.gain,at+.025);gain.gain.setValueAtTime(stem.gain,end-.06);gain.gain.linearRampToValueAtTime(0,end);source.start(at);source.stop(end);source.onended=()=>{source.disconnect();gain.disconnect();};}};
  }
  if(typeof module!=='undefined')module.exports={tracks,sections,prepareMix};
  else window.DanceMusic={tracks,open,sections,prepareMix};
})();
