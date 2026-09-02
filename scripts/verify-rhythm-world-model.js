const fs=require('fs'),vm=require('vm');
const read=p=>fs.readFileSync(p,'utf8').replace(/^export /gm,'');
for(const file of ['rhythm-world/storage.js','rhythm-world/world.js'])if(!fs.existsSync(file)){console.error(`Missing ${file}`);process.exit(1)}
const code=read('rhythm-world/world.js')+'\nthis.api={generateChunk,getNearbyChunks,chunkKey};';const box={};vm.createContext(box);vm.runInContext(code,box);
const a=JSON.stringify(box.api.generateChunk('seed',2,-3)),b=JSON.stringify(box.api.generateChunk('seed',2,-3)),c=JSON.stringify(box.api.generateChunk('seed',3,-3));
if(a!==b||a===c||!a.includes('buildings')||!a.includes('decorations'))throw Error('World generation is not deterministic or complete');
const storage=fs.readFileSync('rhythm-world/storage.js','utf8');for(const name of ['createDefaultSave','loadSave','saveGame','resetSave'])if(!storage.includes(`function ${name}`))throw Error(`Missing ${name}`);
console.log('Rhythm world model verification passed.');
