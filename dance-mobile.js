/* Portrait touch controls share the desktop rhythm clock and judgement. */
(()=>{
  const MOBILE_MAX_WIDTH=768;
  const isMobileWidth=width=>Number(width)>0&&Number(width)<=MOBILE_MAX_WIDTH;
  const deviceLayout=(width,touch)=>isMobileWidth(width)?'mobile':touch&&width>768&&width<=1366?'tablet':'desktop';
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
  function createDualTouchInput(hit,release,leftHit,leftRelease){const right=createTouchInput(hit,release),left=createTouchInput(leftHit,leftRelease);return {right,left,clear(){right.clear();left.clear();}};}
  const cameraPlacement=(camera,duel=false)=>({world:!duel&&camera==='player'?-58:!duel&&camera==='rival'?8:-25});
  function mount({host,stage,hit,release,leftHit=()=>{},leftRelease=()=>{},isDuel=()=>false,start,onEnter,device}){
    const toolbar=host.querySelector('.dance-toolbar'),mobileScreen=matchMedia('(max-width:'+MOBILE_MAX_WIDTH+'px)');
    let lastGlow='',lastCamera='',lastDuel=null,lastLayout='',disposed=false;
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
    const dual=createDualTouchInput(hit,release,leftHit,leftRelease),splitPad=document.createElement('div'),splitButtons=[];splitPad.className='dance-tablet-pad';splitPad.setAttribute('aria-label','平板左右两人触控');
    for(const side of ['left','right']){const bank=document.createElement('div');bank.className='dance-tablet-touch-bank';bank.dataset.side=side;bank.setAttribute('role','group');bank.setAttribute('aria-label',side==='left'?'左方玩家':'右方玩家');for(const direction of directions){const button=document.createElement('button');button.type='button';button.dataset.lane=String(direction.lane);button.dataset.side=side;button.style.setProperty('--touch-color',direction.color);button.setAttribute('aria-label',(side==='left'?'左方':'右方')+direction.name+'方向');button.onpointerdown=event=>{if(side==='left'&&!isDuel())return;event.preventDefault();try{button.setPointerCapture(event.pointerId);}catch{}dual[side].down(event.pointerId,direction.lane);sync();};button.onpointerup=button.onpointercancel=button.onlostpointercapture=event=>{dual[side].up(event.pointerId);sync();};button.oncontextmenu=event=>event.preventDefault();bank.append(button);splitButtons.push(button);}splitPad.append(bank);}stage.append(splitPad);
    function sync(){
      if(disposed)return;
      const duel=isDuel();if(duel!==lastDuel){lastDuel=duel;layout();lastCamera='';}host.classList.toggle('dance-duel-mode',duel);
      const camera=stage.classList.contains('dance-camera-player')?'player':stage.classList.contains('dance-camera-rival')?'rival':'duet';if(camera!==lastCamera){stage.style.setProperty('--mobile-world-x',cameraPlacement(camera,duel).world+'vw');lastCamera=camera;}
      let glowColor='';const targets=host.querySelectorAll('.dance-player-targets button');
      buttons.forEach((button,lane)=>{const lit=input.held(lane)||performance.now()<Number(button.dataset.flashUntil||0)||['hit','holding'].includes(targets[lane]?.dataset.feedback);button.dataset.lit=String(lit);button.setAttribute('aria-pressed',String(input.held(lane)));if(lit)glowColor=directions[lane].color;});
      for(const button of splitButtons){const side=button.dataset.side,label=duel?(side==='left'?'左方玩家':'右方玩家'):(side==='left'?'对手自动':'我方'),lane=Number(button.dataset.lane),feedback=host.querySelectorAll(side==='left'?'.dance-opponent-targets span':'.dance-player-targets button')[lane]?.dataset.feedback;if(button.parentElement.getAttribute('aria-label')!==label)button.parentElement.setAttribute('aria-label',label);button.disabled=side==='left'&&!duel;button.dataset.lit=String(dual[side].held(lane)||['hit','holding'].includes(feedback));button.setAttribute('aria-pressed',String(dual[side].held(lane)));}
      if(glowColor!==lastGlow){glow.style.setProperty('--edge-color',glowColor||'transparent');glow.dataset.lit=String(!!glowColor);lastGlow=glowColor;}
    }
    function layout(){if(disposed)return;const type=device||deviceLayout(innerWidth,navigator.maxTouchPoints>0||matchMedia('(any-pointer: coarse)').matches),mobile=type==='mobile',tablet=type==='tablet';const key=type+':'+isDuel();if(key!==lastLayout){input.clear();dual.clear();lastLayout=key;}host.classList.toggle('dance-mobile-mode',mobile);host.classList.toggle('dance-tablet-mode',tablet);host.classList.toggle('dance-split-touch',tablet||mobile&&isDuel());modeButton.hidden=!mobile&&!tablet;if(!mobile&&!tablet)host.classList.remove('dance-mobile-fallback');}
    function fullscreenChanged(){const full=document.fullscreenElement===host||host.classList.contains('dance-mobile-fallback');modeButton.textContent=full?'退出触屏全屏':host.classList.contains('dance-tablet-mode')?'平板全屏':'手机竖屏全屏';input.clear();dual.clear();layout();}
    modeButton.onclick=async()=>{
      if(!host.classList.contains('dance-mobile-mode')&&!host.classList.contains('dance-tablet-mode'))return;
      if(document.fullscreenElement===host){await document.exitFullscreen();layout();return;}
      if(host.classList.contains('dance-mobile-fallback')){host.classList.remove('dance-mobile-fallback');fullscreenChanged();return;}
      layout();onEnter?.();
      try{await host.requestFullscreen();}catch{host.classList.add('dance-mobile-fallback');fullscreenChanged();}
    };
    const clear=()=>{input.clear();dual.clear();sync();};
    const visibility=()=>{if(document.hidden)clear();};
    mobileScreen.addEventListener('change',layout);document.addEventListener('fullscreenchange',fullscreenChanged);document.addEventListener('visibilitychange',visibility);window.addEventListener('blur',clear);window.addEventListener('resize',layout);layout();
    return {sync,dispose(){input.clear();dual.clear();disposed=true;mobileScreen.removeEventListener('change',layout);document.removeEventListener('fullscreenchange',fullscreenChanged);document.removeEventListener('visibilitychange',visibility);window.removeEventListener('blur',clear);window.removeEventListener('resize',layout);modeButton.remove();pad.remove();splitPad.remove();glow.remove();play.remove();for(const actor of [...world.children])stage.insertBefore(actor,world);world.remove();host.classList.remove('dance-mobile-mode','dance-mobile-fallback','dance-tablet-mode','dance-split-touch','dance-duel-mode');}};
  }
  const api={MOBILE_MAX_WIDTH,isMobileWidth,deviceLayout,directions,createTouchInput,createDualTouchInput,cameraPlacement,mount};
  if(typeof module!=='undefined')module.exports=api;else window.DanceMobile=api;
})();
