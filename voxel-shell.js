/* Chinese offline menus and local worlds for the original browser sandbox. */
(() => {
  const rules=typeof module!=='undefined'?require('./voxel-rules.js'):window.VoxelRules;
  const recipes={planks:{name:'木板 ×4',cost:{wood:1},output:'planks',amount:4},pickaxe:{name:'木镐',cost:{planks:5},output:'pickaxe',amount:1},brick:{name:'石砖 ×4',cost:{stone:4},output:'brick',amount:4},glass:{name:'玻璃 ×2',cost:{sand:4,wood:1},requires:'furnace',output:'glass',amount:2}};
  const pack=typeof module!=='undefined'?require('./voxel-survival.js'):window.VoxelSurvival;
  const stations=typeof module!=='undefined'?require('./voxel-workstations.js'):window.VoxelWorkstations;
  Object.assign(recipes,pack.recipes);
  Object.assign(recipes,stations.recipes);
  Object.assign(recipes,{redplanks:{name:'枫木制木板 ×4',cost:{redwood:1},output:'planks',amount:4},jungleplanks:{name:'雨林木制木板 ×4',cost:{junglewood:1},output:'planks',amount:4}});
  const canCraft=(inventory,recipe)=>(!recipe.requires||inventory[recipe.requires]>0)&&Object.entries(recipe.cost).every(([k,n])=>(inventory[k]||0)>=n);
  function inventorySlots(inventory){const slots=[];for(const [type,value] of Object.entries(inventory)){let count=Number.isFinite(Number(value))?Math.max(0,Math.floor(Number(value))):0;while(count>0){slots.push({type,count:Math.min(64,count)});count-=64;}}return slots;}
  function recipeCells(recipe){
    const ingredients=Object.keys(recipe.cost),a=ingredients[0],b=ingredients[1];
    const patterns={pickaxe:[a,a,a,null,a,null,null,a,null],stonepickaxe:[a,a,a,null,b,null,null,b,null],ironpickaxe:[a,a,a,null,b,null,null,b,null],diamondpickaxe:[a,a,a,null,b,null,null,b,null],sword:[null,a,null,null,a,null,null,b,null],diamondsword:[null,a,null,null,a,null,null,b,null],furnace:[a,a,a,a,null,a,a,a,a],chest:[a,a,a,a,null,a,a,a,a],armor:[a,null,a,a,a,a,a,a,a],bed:[a,a,a,b,b,b,null,null,null],bread:[null,null,null,a,a,a,null,null,null],workbench:[a,a,null,a,a,null,null,null,null]};
    if(patterns[recipe.output])return patterns[recipe.output].map(type=>type?{type,count:1}:null);
    const cells=Object.entries(recipe.cost).map(([type,count])=>({type,count}));return [...cells,...Array(Math.max(0,9-cells.length)).fill(null)];
  }
  function normalizeSettings(s={}){return {fov:Math.max(50,Math.min(100,Number(s.fov)||72)),sensitivity:Math.max(.2,Math.min(2,Number(s.sensitivity)||1)),coords:s.coords!==false};}
  if(typeof module!=='undefined'){module.exports={normalizeSettings,canCraft,recipes,inventorySlots,recipeCells};return;}
  const read=(k,f)=>{try{return JSON.parse(localStorage.getItem(k))??f;}catch{return f;}};
  const write=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));return true;}catch{return false;}};
  const node=(tag,text,parent)=>{const e=document.createElement(tag);if(text)e.textContent=text;parent?.append(e);return e;};
  const button=(parent,text,action)=>{const b=node('button',text,parent);b.type='button';b.onclick=action;return b;};
  function mount(host,startGame){
    host.classList.add('voxel-shell');let cleanup=()=>{},dead=false,worldInfo=null,paused=false,gameLayer=null,overlay=null;
    let settings=normalizeSettings(read('voxel-settings',{}));let worlds=read('voxel-world-list',[]);if(!Array.isArray(worlds))worlds=[];
    worlds=worlds.filter(w=>w&&typeof w.id==='string'&&/^[\w-]+$/.test(w.id)&&typeof w.name==='string');
    if(!worlds.length&&localStorage.getItem('computer-voxel-v2')){worlds=[{id:'legacy',name:'我的旧世界',mode:'creative',terrain:'hills',updated:Date.now()}];write('voxel-world-list',worlds);}
    const storageKey=w=>w.id==='legacy'?'computer-voxel-v2':`voxel-save-${w.id}`;
    function stop(){cleanup();cleanup=()=>{};gameLayer=null;worldInfo=null;paused=false;}
    function page(title,sub){host.replaceChildren();host.classList.remove('voxel-app');const screen=node('section',null,host);screen.className='voxel-menu';const card=node('div',null,screen);card.className='voxel-menu-card';node('h1',title,card);if(sub)node('p',sub,card);return card;}
    function main(){stop();const c=page('我的世界','电脑先生 · 离线方块世界');node('div','挖掘 · 建造 · 探索',c).className='voxel-menu-tag';button(c,'开始游戏',list);button(c,'设置',()=>settingsPage(main));button(c,'操作说明',help);button(c,'模组',modsPage);node('small','世界保存在这台设备的浏览器里',c);}
    let selectedMods={};
    function modsPage(){const c=page('模组','为下一次创建的世界选择模组，旧存档不变');for(const [id,[name,description]] of Object.entries(rules.mods)){const row=node('label',name,c),check=node('input',null,row);check.type='checkbox';check.checked=!!selectedMods[id];check.onchange=()=>selectedMods[id]=check.checked;node('p',description,c);}button(c,'创建模组世界',createPage);button(c,'返回',main);}
    function help(){const c=page('操作说明','键盘、鼠标与触屏都可以玩');for(const t of ['WASD 或方向键移动，空格跳跃。','创造模式按 V 切换飞行，空格上升，Shift 下降；也可点按钮。','拖动画面转头，用屏幕中心的准星瞄准。','持续按住挖掘，出现裂纹后破碎；手机轻点放置、长按挖掘。','F5 或视角按钮切换第一人称、背后和正面视角。','数字键选择材料，E 打开背包与合成，P 暂停。','生存模式先采集材料；木板可合成木镐，木镐可挖石头。','挖树叶得苹果，狩猎得肉；食物恢复饱食，吃饱会缓慢回血。','木镐挖煤，石镐挖铁，铁镐挖钻石；先造熔炉再烧炼。','石剑和钻石剑合成后自动用于攻击，铁护甲自动减伤。','羊掉羊毛，可与木板合成床；夜晚有床就能睡到天亮。','F 使用准星对准的方块：耕地、收割、开箱、交易或切换拉杆。','幼苗放在耕地上，生长一分钟后可收割；小麦能合成面包或交易。','连接拉杆、红石线与红石灯，最多传播14格线路。','放置传送门并按 F，可在主世界、下界和末地之间往返。','主世界边走边生成，远处区块卸载；建造修改会保留。','群系地图显示坐标；创造模式可直接前往各群系。','动物与怪物持续刷新；只模拟附近生物，远处会卸载。','硫磺史莱姆会吸收右键放入的方块，身体变成对应材质。','海洋里有珊瑚、海带、鱼和沉船；空格/上升浮起，Shift/下降潜水。'])node('p',t,c);button(c,'返回',main);}
    function list(){worlds=read('voxel-world-list',worlds);const c=page('选择世界','本地存档');button(c,'创建新世界',createPage);if(!worlds.length)node('p','还没有世界，创建一个开始冒险吧。',c);for(const w of worlds){const row=node('div',null,c);row.className='voxel-world-row';node('strong',w.name,row);node('small',`${w.mode==='survival'?'生存':'创造'} · ${w.terrain==='flat'?'平坦地形':'山丘树林'}`,row);button(row,'进入 '+w.name,()=>play(w));button(row,'重命名',()=>rename(w));}button(c,'返回开始页面',main);}
    function rename(w){const c=page('重命名世界'),input=node('input',null,c);input.value=w.name;input.maxLength=36;input.setAttribute('aria-label','世界名称');const error=node('p','',c);button(c,'保存名称',()=>{const name=input.value.trim();if(!name){error.textContent='请输入世界名称';return;}const old=w.name;w.name=name;if(!write('voxel-world-list',worlds)){w.name=old;error.textContent='保存失败，设备空间不足';return;}list();});button(c,'取消',list);}
    function createPage(){const c=page('创建新世界');node('p','模组：'+(Object.keys(selectedMods).filter(k=>selectedMods[k]).map(k=>rules.mods[k][0]).join('、')||'无'),c);const label=node('label','世界名称',c),name=node('input',null,label);name.value='我的新世界';name.maxLength=36;name.setAttribute('aria-label','世界名称');const ml=node('label','游戏模式',c),mode=node('select',null,ml);mode.setAttribute('aria-label','游戏模式');for(const [v,t] of [['creative','创造：无限材料'],['survival','生存：采集、合成与生命']]){const o=node('option',t,mode);o.value=v;}const tl=node('label','地形',c),terrain=node('select',null,tl);terrain.setAttribute('aria-label','世界地形');for(const [v,t] of [['hills','山丘、树林与湖泊'],['flat','平坦草地']]){const o=node('option',t,terrain);o.value=v;}const error=node('p','',c);button(c,'创建并进入',()=>{if(!name.value.trim()){error.textContent='给世界起个名字吧';return;}const w={id:crypto.randomUUID(),name:name.value.trim(),mode:mode.value,terrain:terrain.value,mods:{...selectedMods},updated:Date.now()};if(!write('voxel-world-list',[...worlds,w])){error.textContent='存档空间不足，不能创建世界';return;}worlds.push(w);play(w);});button(c,'返回世界列表',list);}
    function settingsPage(back,parent){const c=parent||page('设置','调整后立即生效');if(parent){parent.replaceChildren();node('h2','设置',c);}for(const [key,title,min,max,step] of [['fov','视野范围',50,100,1],['sensitivity','转头灵敏度',.2,2,.1]]){const label=node('label',title,c),input=node('input',null,label),value=node('output',String(settings[key]),label);input.type='range';input.min=min;input.max=max;input.step=step;input.value=settings[key];input.setAttribute('aria-label',title);input.oninput=()=>{settings[key]=+input.value;value.textContent=input.value;};}const l=node('label','显示坐标',c),check=node('input',null,l);check.type='checkbox';check.checked=settings.coords;check.onchange=()=>settings.coords=check.checked;const error=node('p','',c);button(c,'保存设置',()=>{if(!write('voxel-settings',settings)){error.textContent='设置无法保存，请检查本机空间';return;}back();});}
    function play(w,dimension=w.lastDimension||'overworld',travel=null){if(!['overworld','nether','end'].includes(dimension))dimension='overworld';stop();worldInfo=w;host.replaceChildren();gameLayer=node('div',null,host);gameLayer.className='voxel-game-layer';host.classList.add('voxel-app');
      cleanup=startGame(gameLayer,{storageKey:storageKey(w)+(dimension==='overworld'?'':':'+dimension),dimension,travel,mods:w.mods||{},onDimension:(id,carry)=>{closeOverlay();play(w,id,carry);},mode:w.mode,terrain:w.terrain,name:w.name,settings:()=>settings,paused:()=>paused,onPause:pause,onInventory:inventoryPanel,onPanel:blockPanel,onSave:()=>{w.updated=Date.now();const latest=read('voxel-world-list',worlds);write('voxel-world-list',latest.map(item=>item.id===w.id?{...item,updated:w.updated,lastDimension:dimension}:item));}});
    }
    function closeOverlay(){overlay?.remove();overlay=null;paused=false;}
    function blockPanel(title,rows){if(paused||dead)return;const c=modal(title);let message='';function render(){c.replaceChildren();node('h2',title,c);if(message)node('p',message,c);for(const row of rows())button(c,row.label,()=>{message=row.action();render();});button(c,'返回游戏',closeOverlay);}render();}
    function modal(title){paused=true;overlay?.remove();overlay=node('div',null,host);overlay.className='voxel-overlay';const c=node('div',null,overlay);c.className='voxel-menu-card';node('h2',title,c);return c;}
    function pause(){if(paused||dead)return;const c=modal('游戏暂停');button(c,'继续游戏',closeOverlay);button(c,'设置',()=>settingsPage(()=>{closeOverlay();pause();},c));button(c,'保存并返回开始页面',()=>{if(gameLayer?.saveWorld&&!gameLayer.saveWorld()){node('p','保存失败，请先释放本机空间，再重试。',c);return;}closeOverlay();main();});}
    function inventoryPanel(inventory,craft,eat,context={}){
      if(paused||dead)return;
      const c=modal(context.station==='workbench'?'工作台 · 九格合成':context.station==='furnace'?'熔炉 · 烧炼':'背包 · 四格合成');c.classList.add('voxel-inventory');
      const types=context.types||{},names={apple:'苹果',pickaxe:'木镐',...pack.items,...stations.items,...Object.fromEntries(Object.entries(types).map(([k,v])=>[k,v[0]]))};
      const avatar=node('div',null,c);avatar.className='voxel-avatar';avatar.setAttribute('aria-label','方块人物：蓝绿色上衣、紫色裤子');avatar.innerHTML='<span class="avatar-head"></span><span class="avatar-body"></span><span class="avatar-legs"></span><span class="avatar-pick"></span>';
      const layout=node('div',null,c);layout.className='inventory-layout';
      const bag=node('section',null,layout);node('h3','物品栏',bag);
      const grid=node('div',null,bag);grid.className='inventory-grid';grid.setAttribute('aria-label','背包物品格');
      const nav=node('div',null,bag);nav.className='inventory-pages';let page=0,selected=null;
      const prev=button(nav,'上一页',()=>{page--;refresh();}),pageLabel=node('span','',nav),next=button(nav,'下一页',()=>{page++;refresh();});
      const detail=node('p','点物品查看；方块可以拿到手上使用。',bag);
      const equip=button(bag,'放入所选快捷栏',()=>{if(selected&&context.equip?.(selected,+slotChoice.value))closeOverlay();});equip.disabled=true;
      const slotChoice=node('select',null,bag);slotChoice.setAttribute('aria-label','放入快捷栏位置');for(let i=0;i<9;i++){const o=node('option',(i+1)+'：'+(names[context.hotbar?.[i]]||'空'),slotChoice);o.value=i;}
      if(context.creative){const title=node('h3','创造模式 · 全部物品',bag),catalog=node('div',null,bag);catalog.className='inventory-grid';for(const [type,name] of Object.entries(names)){if(rules.modItem(type)&&!context.mods?.bedrock)continue;if(['bed_head','door_open','lamp_on','lever_on','ripe'].includes(type))continue;const b=button(catalog,name,()=>{selected=type;detail.textContent='已选择 '+name+'，选择快捷栏位置后放入';equip.disabled=false;});b.style.borderBottom='5px solid '+(types[type]?.[1]||'#5cd4cf');}}

      const crafting=node('section',null,layout);node('h3','配方书',crafting);
      const select=node('select',null,crafting);select.setAttribute('aria-label','选择合成配方');
      for(const [id,r] of Object.entries(recipes)){if(rules.modItem(r.output)&&!context.mods?.bedrock)continue;if(context.station==='furnace'?!r.requires:context.station==='workbench'?!!r.requires:!rules.pocket.has(id))continue;const o=node('option',r.name,select);o.value=id;}
      const work=node('div',null,crafting);work.className='inventory-work';
      const inputs=node('div',null,work);inputs.className='inventory-recipe';if(!context.station)inputs.style.gridTemplateColumns='repeat(2,minmax(0,1fr))';inputs.setAttribute('aria-label',context.station==='workbench'?'九格配方材料':context.station==='furnace'?'燃料与矿石':'四格配方材料');
      node('span','→',work);const output=button(work,'',()=>{result.textContent=craft(select.value);refresh();});output.className='inventory-output';
      const needed=node('p','',crafting);node('small','选择配方，再点右侧成品合成。每格数字是所需数量。',crafting);
      const result=node('p','',c);result.setAttribute('role','status');
      button(c,'吃食物（熟肉、面包、苹果）',()=>{result.textContent=eat();refresh();});button(c,'返回游戏',closeOverlay);
      function icon(parent,type,count){parent.replaceChildren();const block=node('span',null,parent);block.className='inventory-icon';block.style.setProperty('--item-color',types[type]?.[1]||({apple:'#e45243',diamond:'#58d7d2',iron:'#d1d6dd',coal:'#34313b',wheat:'#e9c253',bread:'#c98c45'}[type]||'#d5b97b'));node('small',names[type]||type,parent);node('b',String(count),parent).className='inventory-count';}
      function recipe(){const r=recipes[select.value];inputs.replaceChildren();for(const cell of (context.station==='workbench'?recipeCells(r):context.station==='furnace'?Object.entries(r.cost).map(([type,count])=>({type,count})):(()=>{const parts=Object.entries(r.cost).map(([type,count])=>({type,count}));return [...parts,...Array(Math.max(0,4-parts.length)).fill(null)];})())){const slot=node('div',null,inputs);slot.className='inventory-slot';if(cell){icon(slot,cell.type,cell.count);slot.classList.toggle('missing',(inventory[cell.type]||0)<r.cost[cell.type]);slot.title=`${names[cell.type]||cell.type}：拥有 ${inventory[cell.type]||0} / 需要 ${r.cost[cell.type]}`;}}icon(output,r.output,r.amount);output.setAttribute('aria-label','合成 '+r.name);const available={...inventory,furnace:inventory.furnace||Number(context.nearFurnace)};output.disabled=!canCraft(available,r);needed.textContent=Object.entries(r.cost).map(([k,n])=>`${names[k]||k} ${inventory[k]||0}/${n}`).join(' · ')+(r.requires?' · 需要背包里或身边有熔炉':'');}
      function refresh(){const all=inventorySlots(inventory),pages=Math.max(1,Math.ceil(all.length/36));page=Math.max(0,Math.min(page,pages-1));grid.replaceChildren();for(let i=0;i<36;i++){const item=all[page*36+i];const slot=button(grid,'',()=>{selected=item.type;detail.textContent=`${names[selected]||selected} · 总数 ${inventory[selected]}`;equip.disabled=!context.equip;refresh();});slot.className='inventory-slot';slot.disabled=!item;if(item){icon(slot,item.type,item.count);slot.setAttribute('aria-label',`${names[item.type]||item.type} ×${item.count}`);slot.setAttribute('aria-pressed',String(selected===item.type));}else slot.setAttribute('aria-label','空背包格');}pageLabel.textContent=`${page+1} / ${pages}`;prev.disabled=page===0;next.disabled=page===pages-1;recipe();}
      select.onchange=recipe;refresh();
    }
    main();return()=>{dead=true;stop();};
  }
  window.VoxelShell={mount,recipes,canCraft};
})();




