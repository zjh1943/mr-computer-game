const fs=require('fs');
const p=JSON.parse(fs.readFileSync('assets/sprunki-kiss-local/assets/project.json'));
const ids={oren:'Orange (Oren)',raddy:'Red (Raddy)',clukr:'Silver (Clukr)',simon:'Yellow (Simon)',pinki:'Pink (Pinki)',computer:'Mr. Fun Computer',vineria:'Green (Vineria)',brud:'Brown (brud)',durple:'Purple (Durple)',wenda:'White (Wenda)',garnold:'Gold (Garnold)'};
const cast={};for(const [id,name] of Object.entries(ids)){const t=p.targets.find(t=>t.name===name);cast[id]={name:id==='computer'?'电脑先生':id,idle:t.costumes.find(c=>c.name==='idle').md5ext,frames:t.costumes.filter(c=>/^anim\d*$/.test(c.name)).map(c=>c.md5ext)};}
fs.writeFileSync('dance-cast.js','/* Normal-mode costumes from the bundled Sprunki Kiss project; no horror costumes. */\n(()=>{const cast='+JSON.stringify(cast)+';if(typeof module!=="undefined")module.exports=cast;else window.DanceCast=cast;})();\n');
