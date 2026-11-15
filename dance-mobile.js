/* Portrait touch controls share the desktop rhythm clock and judgement. */
(()=>{
  const MOBILE_MAX_WIDTH=768;
  const isMobileWidth=width=>Number(width)>0&&Number(width)<=MOBILE_MAX_WIDTH;
  const directions=[
    {lane:0,id:'left',name:'左',arrow:'←',color:'#cb75ed'},
    {lane:1,id:'down',name:'下',arrow:'↓',color:'#45dcf0'},
    {lane:2,id:'up',name:'上',arrow:'↑',color:'#86e45c'},
    {lane:3,id:'right',name:'右',arrow:'→',color:'#ff7485'}
  ];
  function createTouchInput(hit,release){
    const pointers=new Map();
    const up=id=>{const lane=pointers.get(id);if(lane===undefined)return;pointers.delete(id);if(![...pointers.values()].includes(lane))release(lane);};
    return {down(id,lane){if(pointers.get(id)===lane)return;up(id);const alreadyHeld=[...pointers.values()].includes(lane);pointers.set(id,lane);if(!alreadyHeld)hit(lane);},up,held:lane=>[...pointers.values()].includes(lane),clear(){for(const id of [...pointers.keys()])up(id);}};
  }
  const cameraPlacement=camera=>({world:camera==='player'?-58:camera==='rival'?8:-25});
  function mount({host,stage,hit,release,start,onEnter}){
    const toolbar=host.querySelector('.dance-toolbar'),mobileScreen=matchMedia('(max-width:'+MOBILE_MAX_WIDTH+'px)');
    let lastGlow='',lastCamera='',disposed=false;
    const world=document.createElement('div');world.className='dance-mobile-world';world.style.backgroundImage=getComputedStyle(stage).backgroundImage;for(const actor of [...stage.children].filter(node=>node.matches('.dance-player,.dance-rival,.dance-sky-sun,.dance-spectator,.friend-chorus-crowd')))world.append(actor);stage.prepend(world);
    const modeButton=document.createElement('button');modeButton.type='button';modeButton.className='dance-mobile-fullscreen-toggle';modeButton.textContent='手机竖屏全屏';toolbar.append(modeButton);
    const pad=document.createElement('div');pad.className='dance-touch-pad';pad.setAttribute('role','group');pad.setAttribute('aria-label','手机四方向触控');
    const center=document.createElement('span');center.className='dance-touch-center';center.setAttribute('aria-hidden','true');pad.append(center);
    const glow=document.createElement('div');glow.className='dance-mobile-edge-glow';glow.setAttribute('aria-hidden','true');stage.append(glow,pad);
    const play=document.createElement('button');play.type='button';play.className='dance-mobile-play';play.textContent='开始 / 重来';play.setAttribute('aria-label','手机开始演唱');play.onclick=start;stage.append(play);
    const input=createTouchInput(hit,release),buttons=[];
    for(const direction of directions){
      let lastPointerAt=-Infinity;
      const button=document.createElement('button');button.type='button';button.className='dance-touch-direction';button.dataset.direction=direction.id;button.dataset.lane=String(direction.lane);button.style.setProperty('--touch-color',direction.color);button.setAttribute('aria-label','手机'+direction.name+'方向');button.innerHTML=`<span aria-hidden="true">${direction.arrow}</span><small>${direction.name}</small>`;
      button.onpointerdown=event=>{event.preventDefault();lastPointerAt=performance.now();try{button.setPointerCapture(event.pointerId);}catch{}button.dataset.flashUntil=String(performance.now()+280);input.down(event.pointerId,direction.lane);sync();};
      button.onpointerup=button.onpointercancel=button.onlostpointercapture=event=>{input.up(event.pointerId);sync();};
      button.onclick=()=>{if(performance.now()-lastPointerAt>600){hit(direction.lane);release(direction.lane);}button.dataset.flashUntil=String(performance.now()+280);sync();};
      button.oncontextmenu=event=>event.preventDefault();pad.append(button);buttons.push(button);
    }
    function sync(){
      if(disposed)return;
      const camera=stage.classList.contains('dance-camera-player')?'player':stage.classList.contains('dance-camera-rival')?'rival':'duet';if(camera!==lastCamera){stage.style.setProperty('--mobile-world-x',cameraPlacement(camera).world+'vw');lastCamera=camera;}
      let glowColor='';const targets=host.querySelectorAll('.dance-player-targets button');
      buttons.forEach((button,lane)=>{const lit=input.held(lane)||performance.now()<Number(button.dataset.flashUntil||0)||['hit','holding'].includes(targets[lane]?.dataset.feedback);button.dataset.lit=String(lit);button.setAttribute('aria-pressed',String(input.held(lane)));if(lit)glowColor=directions[lane].color;});
      if(glowColor!==lastGlow){glow.style.setProperty('--edge-color',glowColor||'transparent');glow.dataset.lit=String(!!glowColor);lastGlow=glowColor;}
    }
    function layout(){if(disposed)return;const mobile=mobileScreen.matches;host.classList.toggle('dance-mobile-mode',mobile);modeButton.hidden=!mobile;if(!mobile){input.clear();host.classList.remove('dance-mobile-fallback');}}
    function fullscreenChanged(){const full=document.fullscreenElement===host||host.classList.contains('dance-mobile-fallback');modeButton.textContent=full?'退出手机版':'手机竖屏全屏';input.clear();layout();}
    modeButton.onclick=async()=>{
      if(!mobileScreen.matches)return;
      if(document.fullscreenElement===host){await document.exitFullscreen();layout();return;}
      if(host.classList.contains('dance-mobile-fallback')){host.classList.remove('dance-mobile-fallback');fullscreenChanged();return;}
      layout();onEnter?.();
      try{await host.requestFullscreen();}catch{host.classList.add('dance-mobile-fallback');fullscreenChanged();}
    };
    const clear=()=>{input.clear();sync();};
    const visibility=()=>{if(document.hidden)clear();};
    mobileScreen.addEventListener('change',layout);document.addEventListener('fullscreenchange',fullscreenChanged);document.addEventListener('visibilitychange',visibility);window.addEventListener('blur',clear);layout();
    return {sync,dispose(){input.clear();disposed=true;mobileScreen.removeEventListener('change',layout);document.removeEventListener('fullscreenchange',fullscreenChanged);document.removeEventListener('visibilitychange',visibility);window.removeEventListener('blur',clear);modeButton.remove();pad.remove();glow.remove();play.remove();for(const actor of [...world.children])stage.insertBefore(actor,world);world.remove();host.classList.remove('dance-mobile-mode','dance-mobile-fallback');}};
  }
  const api={MOBILE_MAX_WIDTH,isMobileWidth,directions,createTouchInput,cameraPlacement,mount};
  if(typeof module!=='undefined')module.exports=api;else window.DanceMobile=api;
})();
