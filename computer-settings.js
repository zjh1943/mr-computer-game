/* Persistent outer-shell settings: versions, sounds, horror availability and home controls. */
(() => {
  const STORAGE_KEY='mr-computer-settings-v1';
  const controlNames={terror:'恐怖之夜',dayNight:'白天 / 夜晚',weather:'天气',light:'电灯',yard:'草坪',home:'回家',mine:'挖矿',shop:'商城',diary:'日记剪纸房',reset:'重置'};
  const controlSelectors={terror:'#terror-toggle',dayNight:'#day-night-toggle',weather:'#weather-toggle',light:'#light-toggle',yard:'#yard-toggle',home:'#home-toggle',mine:'#mine-toggle',shop:'#shop-toggle',diary:'.diary-room-link',reset:'#reset-save-toggle'};
  const safeCharacters=[
    ['oren','奥伦','Oren'],['raddy','瑞迪','Raddy'],['clukr','克鲁克','Clukr'],['fun-bot','快乐机器人','Fun Bot'],
    ['vineria','维妮莉亚','Vineria'],['gray','格雷','Gray'],['brud','布鲁德','Brud'],['garnold','加诺德','Garnold'],
    ['owakcx','欧瓦克斯','OWAKCX'],['sky','斯凯','Sky'],['mr-sun','太阳先生','Mr. Sun'],['durple','德普勒','Durple'],
    ['mr-tree','大树先生','Mr. Tree'],['simon','西蒙','Simon'],['tunner','坦纳','Tunner'],['mr-fun-computer','电脑先生','Mr. Fun Computer'],
    ['wenda','温达','Wenda'],['pinki','平琪','Pinki'],['jevin','杰文','Jevin']
  ].map(([id,nameZh,nameEn])=>({id,nameZh,nameEn}));
  const originalComputer='./assets/sprunki-kiss-local/assets/a08bbafe2167b837995fd8bf79f5a27f.svg';
  const pyramixedView=(view,id)=>`./assets/sprunki-versions/pyramixed/${view}/${id}.png`;
  const versionProfiles={
    original:{
      nameZh:'原版',nameEn:'Original',hostSprite:'mr-fun-computer',voice:'./assets/dance-audio/normal/computer.wav',
      pitch:1.35,rate:1.35,accent:'#6ec6ff',characters:safeCharacters,
      views:{front:originalComputer,left:originalComputer,right:originalComputer,back:originalComputer},
      concert:{rate:1,detune:0,filter:0}
    },
    pyramixed:{
      nameZh:'Pyramixed 版本',nameEn:'Sprunki Pyramixed',hostSprite:'mr-fun-computer',voice:'./assets/dance-audio/normal/computer.wav',
      pitch:1.18,rate:1.18,accent:'#70e45d',characters:safeCharacters,
      views:Object.fromEntries(['front','left','right','back'].map(view=>[view,pyramixedView(view,'mr-fun-computer')])),
      concert:{rate:1.06,detune:-90,filter:1350}
    }
  };
  const defaults={version:'original',masterVolume:.9,systemSounds:true,characterSounds:true,horrorEnabled:true,hiddenControls:[]};
  function normalizeSettings(raw={}){
    const version=versionProfiles[raw.version]?raw.version:'original';
    const masterVolume=Math.max(0,Math.min(1,Number.isFinite(Number(raw.masterVolume))?Number(raw.masterVolume):defaults.masterVolume));
    const hiddenControls=[...new Set(Array.isArray(raw.hiddenControls)?raw.hiddenControls.filter(id=>id!=='settings'&&controlNames[id]):[])];
    return {version,masterVolume,systemSounds:raw.systemSounds!==false,characterSounds:raw.characterSounds!==false,horrorEnabled:raw.horrorEnabled!==false,hiddenControls};
  }
  function voiceSettings(state){const p=versionProfiles[state?.version]||versionProfiles.original;return {lang:'zh-CN',pitch:p.pitch,rate:p.rate,volume:state?.characterSounds===false?0:Math.max(0,Math.min(1,state?.masterVolume??defaults.masterVolume))};}
  function characterView(version,id,view='front'){
    if(version==='pyramixed')return pyramixedView(['front','left','right','back'].includes(view)?view:'front',id);
    return null;
  }
  const api={STORAGE_KEY,controlNames,controlSelectors,versionProfiles,defaults,normalizeSettings,voiceSettings,characterView};
  if(typeof module!=='undefined'){module.exports=api;return;}
  let state;
  try{state=normalizeSettings(JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}'));}catch{state=normalizeSettings();}
  const $=selector=>document.querySelector(selector),toggle=$('#computer-settings-toggle'),panel=$('#computer-settings-panel'),close=$('#computer-settings-close'),version=$('#computer-version-select'),volume=$('#computer-master-volume'),volumeText=$('#computer-master-volume-value'),systemSounds=$('#computer-system-sounds'),characterSounds=$('#computer-character-sounds'),horror=$('#computer-horror-enabled'),preview=$('#computer-version-preview'),profileName=$('#computer-version-name'),controlList=$('#computer-control-list'),voicePreview=$('#computer-version-voice-preview');
  function save(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}catch{}}
  function renderVersion(){const profile=versionProfiles[state.version];profileName.textContent=`${profile.nameZh} · ${profile.nameEn}`;preview.replaceChildren();for(const [view,label] of [['front','正面'],['left','左侧'],['right','右侧'],['back','背面']]){const figure=document.createElement('figure'),img=document.createElement('img'),caption=document.createElement('figcaption');img.src=profile.views[view];img.alt=`${profile.nameZh}${label}`;caption.textContent=label;figure.append(img,caption);preview.append(figure);}document.documentElement.style.setProperty('--computer-version-accent',profile.accent);}
  function renderControls(){controlList.replaceChildren();for(const [id,name] of Object.entries(controlNames)){const row=document.createElement('div'),label=document.createElement('span'),button=document.createElement('button');label.textContent=name;const hidden=state.hiddenControls.includes(id)||(id==='terror'&&!state.horrorEnabled);button.type='button';button.textContent=hidden?'恢复':'× 从主页隐藏';button.setAttribute('aria-label',hidden?`恢复${name}`:`从主页隐藏${name}`);button.onclick=()=>{state.hiddenControls=hidden?state.hiddenControls.filter(item=>item!==id):[...state.hiddenControls,id];apply(true);};row.append(label,button);controlList.append(row);}}
  function applyMedia(){document.querySelectorAll('audio,video').forEach(media=>{media.muted=!state.systemSounds;media.volume=state.masterVolume;});}
  function apply(persist=false){document.body.dataset.computerVersion=state.version;document.body.classList.toggle('system-sounds-muted',!state.systemSounds);document.body.classList.toggle('computer-horror-disabled',!state.horrorEnabled);for(const [id,selector] of Object.entries(controlSelectors)){const node=$(selector);node?.classList.toggle('settings-hidden-control',state.hiddenControls.includes(id)||(id==='terror'&&!state.horrorEnabled));}if(!state.horrorEnabled&&document.body.classList.contains('terror-night'))$('#terror-toggle')?.click();version.value=state.version;volume.value=String(state.masterVolume);volumeText.textContent=`${Math.round(state.masterVolume*100)}%`;systemSounds.checked=state.systemSounds;characterSounds.checked=state.characterSounds;horror.checked=state.horrorEnabled;renderVersion();renderControls();applyMedia();if(persist)save();window.dispatchEvent(new CustomEvent('mr-computer-settings-change',{detail:{...state,voice:voiceSettings(state)}}));}
  function open(){panel.hidden=false;toggle.setAttribute('aria-expanded','true');document.body.classList.add('computer-settings-open');}
  function shut(){panel.hidden=true;toggle.setAttribute('aria-expanded','false');document.body.classList.remove('computer-settings-open');}
  version.replaceChildren(...Object.entries(versionProfiles).map(([value,profile])=>{const option=document.createElement('option');option.value=value;option.textContent=profile.nameZh;return option;}));
  toggle.onclick=()=>panel.hidden?open():shut();close.onclick=shut;
  version.onchange=()=>{state.version=version.value;apply(true);if(state.characterSounds)playVoice();};
  volume.oninput=()=>{state.masterVolume=Number(volume.value);apply(true);};
  systemSounds.onchange=()=>{state.systemSounds=systemSounds.checked;apply(true);};
  characterSounds.onchange=()=>{state.characterSounds=characterSounds.checked;apply(true);};
  horror.onchange=()=>{state.horrorEnabled=horror.checked;apply(true);};
  let voiceAudio;
  function playVoice(){voiceAudio?.pause();if(!state.characterSounds)return;voiceAudio=new Audio(versionProfiles[state.version].voice);voiceAudio.volume=state.masterVolume;voiceAudio.play().catch(()=>{});}
  voicePreview.onclick=playVoice;
  new MutationObserver(applyMedia).observe(document.body,{childList:true,subtree:true});
  window.ComputerSettings={...api,get:()=>({...state}),voiceSettings:()=>voiceSettings(state),open};
  apply(false);
})();
