/* Optional performers use existing songs, source voices and cast timing. */
(()=>{
 const normalId=id=>id?.replace(/-(playable|angry)$/,'');
 const names={oren:'奥伦',raddy:'瑞迪',clukr:'克鲁克',funbot:'机器人',vineria:'维内莉娅',gray:'格雷',brud:'布鲁德',garnold:'加诺德',lime:'奥瓦克斯',sky:'小天',mr_sun:'太阳先生',durple:'德普',mr_tree:'树先生',simon:'西蒙',tunner:'坦纳',computer:'电脑先生',wenda:'温达',pinki:'平琪',jevin:'杰文',black:'布莱克'};
 function rolesAt(track,time){const roles={...track.initial};for(const event of track.events||[]){if(event.time>time)break;if('character' in event)roles[event.side]=event.character;}return roles;}
 function performerAt(track,time){return rolesAt(track,time).player||track.lead;}
 function performanceAt(track,hero,time){const original=performerAt(track,time),normal=normalId(original);return {original,special:!!hero&&(normal===hero||normal==='computer')};}
 function facingScale(side,nativeFlip=false){return nativeFlip?(side==='player'?1:-1):(side==='player'?-1:1);}
 const needsOwnVoice=(track,hero,time)=>!!hero&&normalId(performerAt(track,time))!==hero;
 const duetPartners={oren:'raddy',raddy:'oren',clukr:'vineria',vineria:'clukr'};
 const partnerFor=hero=>duetPartners[normalId(hero)]||null;
 const selectedVoicesAt=(track,hero,time)=>hero?[hero,partnerFor(hero)].filter(Boolean):[];
 const replaceSourcePlayer=(track,hero,time)=>!!hero&&!selectedVoicesAt(track,hero,time).includes(normalId(performerAt(track,time)));
 function stageLayoutAt(track,hero,time){
  const roles=rolesAt(track,time),player=normalId(hero||roles.player||track.lead),team=hero?selectedVoicesAt(track,hero,time):[player],opponents=['dad','gf'].filter(role=>roles[role]),matching=opponents.filter(role=>team.includes(normalId(roles[role])));
  if(matching.length)return {mode:team.length>1?'same-pair':'same-solo',matching,hidden:opponents};
  const active=new Set((track.notes||[]).filter(n=>n.animate&&time>=n.time&&time<n.time+Math.max(.85,n.hold||0)).map(n=>n.side));
  for(const event of track.events||[])if(event.animation&&time>=event.time&&time<event.time+.85)active.add(event.side);
  const computer=opponents.filter(role=>normalId(roles[role])==='computer');
  if(computer.length&&!active.has('player'))return {mode:'computer-solo',matching:computer,hidden:opponents.filter(role=>!computer.includes(role))};
  return {mode:'normal',matching:[],hidden:[]};
 }
 function audibleOffset(buffer){if(!buffer.getChannelData)return 0;const data=buffer.getChannelData(0),rate=buffer.sampleRate;let peak=0;for(let i=0;i<data.length;i++)peak=Math.max(peak,Math.abs(data[i]));if(peak<.00001)throw Error('角色音色没有可演奏的声音');const threshold=Math.max(.00001,peak*.12);for(let i=0;i<data.length;i++)if(Math.abs(data[i])>=threshold)return Math.max(0,i/rate-.003);return 0;}
 let referencePromise=null;
 function loadReferences(){if(!referencePromise){referencePromise=fetch('./assets/dance-reference/direction-voices.json').then(response=>{if(!response.ok)throw Error('演奏参考读取失败');return response.json();});referencePromise.catch(()=>{referencePromise=null;});}return referencePromise;}
 async function prepareVoice(ctx,track,hero,cast,references=null){
  const voices=[hero,partnerFor(hero)].filter(Boolean),materials=new Map(),buffers=new Map();
  const urls=new Set();for(const id of voices){const art=cast[id];if(!art?.audio)throw Error('角色声音不存在');const bank=id==='computer'?[]:(references?.characters?.[id]||[]);materials.set(id,{art,bank});urls.add(art.audio);for(const sample of bank)if(sample)urls.add(sample.audio);}
  await Promise.all([...urls].map(async url=>{const response=await fetch(url);if(!response.ok)throw Error('角色演奏声音读取失败');buffers.set(url,await ctx.decodeAudioData(await response.arrayBuffer()));}));
  for(const material of materials.values()){material.fallback=buffers.get(material.art.audio);material.voiceStart=audibleOffset(material.fallback);}
  return start=>{
   const gain=ctx.createGain(),sources=[];gain.connect(ctx.destination);const list=track.notes.filter(n=>n.side==='player'&&n.hit!==false);
   for(let i=0;i<list.length;i++){const note=list[i];for(const id of selectedVoicesAt(track,hero,note.time)){
    if(!needsOwnVoice(track,id,note.time))continue;
    const {bank,fallback,voiceStart}=materials.get(id);let reference=bank[note.lane],buffer=reference?buffers.get(reference.audio):fallback;
    if(reference&&reference.offset+reference.duration>buffer.duration){reference=null;buffer=fallback;}
    const rate=reference?1:2**([-2,0,2,4][note.lane]/12),offset=reference?reference.offset:voiceStart,length=Math.min(Math.max(.18,note.hold||.32),Math.max(.08,(list[i+1]?.time??note.time+.5)-note.time-.015),reference?.duration??Infinity,(buffer.duration-offset)/rate);
    const at=start+note.time,source=ctx.createBufferSource(),envelope=ctx.createGain();source.buffer=buffer;source.playbackRate.value=rate;source.connect(envelope).connect(gain);envelope.gain.setValueAtTime(0,at);envelope.gain.linearRampToValueAtTime(voices.length>1?.6:.8,at+.008);envelope.gain.setValueAtTime(voices.length>1?.6:.8,at+Math.max(.009,length-.025));envelope.gain.linearRampToValueAtTime(0,at+length);source.start(at,offset,length*rate);source.onended=()=>{source.disconnect();envelope.disconnect();};sources.push({source,envelope});
   }}
   return {setVoice(enabled){gain.gain.setValueAtTime(enabled?1:0,ctx.currentTime);},stop(){for(const {source,envelope} of sources){source.onended=null;try{source.stop();}catch{}source.disconnect();envelope.disconnect();}gain.disconnect();}};
  };
 }

 const api={performerAt,performanceAt,facingScale,names,needsOwnVoice,prepareVoice,audibleOffset,rolesAt,stageLayoutAt,loadReferences,partnerFor,selectedVoicesAt,replaceSourcePlayer};
 if(typeof module!=='undefined')module.exports=api;else window.DanceCharacterChoice=api;
})();
