/* Shared rules for optional worlds, crafting and held-tool mining. */
(() => {
 const mods={copy:['区块复制','放置和挖掘会同步到每个区块的相同位置。'],diamond:['钻石大陆','土地变为钻石矿，保留树林；木镐也能采钻石。'],bedrock:['基岩装备','开启基岩镐、剑与四件护甲的合成。']};
 const pocket=new Set(['planks','redplanks','jungleplanks','stick','workbench','brick']);
 const toolTier=t=>({pickaxe:1,stonepickaxe:2,ironpickaxe:3,diamondpickaxe:4,bedrockpickaxe:5}[t]||0);
 const axeTier=t=>({woodaxe:1,stoneaxe:2,ironaxe:3,diamondaxe:4,bedrockaxe:5}[t]||0);
 function mining(type,tool,creative,enabled={}){
   if(['water','sulphurwater','lava'].includes(type))return {seconds:Infinity,drop:false};
   if(type==='bedrock'&&!creative&&!(enabled.bedrock&&tool==='bedrockpickaxe'))return {seconds:Infinity,drop:false};
   const need={stone:1,coalore:1,ironore:2,diamondore:3,redstoneore:2,obsidian:4,bedrock:5}[type]||0;
   const tier=toolTier(tool),wood=type.endsWith('wood')||type==='wood',axe=wood?axeTier(tool):0,suitable=tier>=need||(enabled.diamond&&type==='diamondore'&&tier>=1);
   const base=wood?1.6:type.endsWith('leaves')?.35:type==='obsidian'?8:type==='bedrock'?10:need?2.4:.65;
   const speedTier=wood?axe:tier;
   return {seconds:creative?.2:wood&&axe?Math.max(.25,base/(1+axe*.65)):suitable?Math.max(.25,base/(speedTier?1+speedTier*.4:1)):base*6,drop:!!(creative||wood||suitable)};
 }
 function modItem(id){return id.startsWith('bedrock')&&id!=='bedrock';}
 function copyKey(x,y,z){return `${(x%16+16)%16},${y},${(z%16+16)%16}`;}
 const api={mods,pocket,toolTier,axeTier,mining,modItem,copyKey};
 if(typeof module!=='undefined')module.exports=api;else window.VoxelRules=api;
})();
