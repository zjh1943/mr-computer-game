const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve('assets/sprunki-kiss-local'),p=JSON.parse(fs.readFileSync(path.join(root,'assets/project.json')));
let sounds=0;const names=new Set();for(const t of p.targets){sounds+=t.sounds.length;for(const a of [...t.costumes,...t.sounds]){const name=a.md5ext||`${a.assetId}.${a.dataFormat}`;assert(/^[a-f0-9]{32}\.[a-z0-9]+$/i.test(name));names.add(name);assert(fs.statSync(path.join(root,'assets',name)).size>0,name);}}
assert.equal(sounds,105);assert.equal(names.size,620);assert.equal(p.extensions.length,0);
const integration=fs.readFileSync('computer-experience.js','utf8');assert(integration.includes("frame.src = './assets/sprunki-kiss-local/index.html'"));assert(!integration.includes("frame.src = 'https://wowtbc.net"));
const wrapper=fs.readFileSync(path.join(root,'local-player.js'),'utf8');assert(wrapper.includes('ctx.resume()'));assert(wrapper.includes('pagehide'));assert(wrapper.includes('scaffolding?.stopAll()'));
console.log('Original Sprunki: all 620 assets including 105 sounds present; desktop uses local game.');
