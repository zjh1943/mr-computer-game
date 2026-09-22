/* Shared rules for optional worlds, crafting and held-tool mining. */
(() => {
 const mods={copy:['区块复制','放置和挖掘会同步到每个区块的相同位置。'],diamond:['钻石大陆','土地变为钻石矿，保留树林；木镐也能采钻石。'],bedrock:['基岩装备','开启基岩镐、剑与四件护甲的合成。']};
 const pocket=new Set(['planks','redplanks','jungleplanks','workbench','brick']);
 const toolTier=t=>({pickaxe:1,stonepickaxe:2,ironpickaxe:3,diamondpickaxe:4,bedrockpickaxe:5}[t]||0);
 function mining(type,tool,creative,enabled={}){
   if(['water','sulphurwater','lava'].includes(type))return {seconds:Infinity,drop:false};
   if(type==='bedrock'&&!creative&&!(enabled.bedrock&&tool==='bedrockpickaxe'))return {seconds:Infinity,drop:false};
   const need={stone:1,coalore:1,ironore:2,diamondore:3,redstoneore:2,obsidian:4,bedrock:5}[type]||0;
   const tier=toolTier(tool),suitable=tier>=need||(enabled.diamond&&type==='diamondore'&&tier>=1);
   const base=type.endsWith('wood')||type==='wood'?1.6:type.endsWith('leaves')?.35:type==='obsidian'?8:type==='bedrock'?10:need?2.4:.65;
   return {seconds:creative?.2:suitable?Math.max(.25,base/(tier?1+tier*.4:1)):base*6,drop:!!(creative||suitable)};
 }
 function modItem(id){return id.startsWith('bedrock')&&id!=='bedrock';}
 function copyKey(x,y,z){return `${(x%16+16)%16},${y},${(z%16+16)%16}`;}
 const api={mods,pocket,toolTier,mining,modItem,copyKey};
 if(typeof module!=='undefined')module.exports=api;else window.VoxelRules=api;
})();
