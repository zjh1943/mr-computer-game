// Rebuild metadata for all twenty normal characters. Audio pairs are built separately.
const fs=require('node:fs');
const project=JSON.parse(fs.readFileSync('assets/sprunki-kiss-local/assets/project.json'));
const ids=['oren','raddy','clukr','funbot','vineria','gray','brud','garnold','lime','sky','mr_sun','durple','mr_tree','simon','tunner','computer','wenda','pinki','jevin','black'];
const names={computer:'电脑先生',mr_sun:'Mr. Sun',mr_tree:'Mr. Tree',funbot:'Fun Bot',lime:'OWAKCX'},cast={};
ids.forEach((id,i)=>{const t=project.targets[i+1],normal=t.costumes.filter(c=>c.name==='idle'||/^anim\d*$/.test(c.name)),entry={name:names[id]||id[0].toUpperCase()+id.slice(1),idle:normal[0].md5ext,frames:normal.slice(1).map(c=>c.md5ext)};if(id==='black')entry.silent=true;else Object.assign(entry,{audio:'./assets/dance-audio/normal/'+id+'.wav',beats:['pinki','jevin'].includes(id)?32:16,gain:id==='computer'?.23:.17,sourceSounds:t.sounds.slice(0,2).map(s=>s.md5ext)});cast[id]=entry;});
fs.writeFileSync('dance-cast.js','/* Normal-mode characters and complete A/B audio phrases; Black cannot trigger horror. */\n(()=>{const cast='+JSON.stringify(cast)+';if(typeof module!=="undefined")module.exports=cast;else window.DanceCast=cast;})();\n');
