const fs=require('fs'),assert=require('assert');
const required=['scene-3d.js','character-3d.js','town-3d.js','world-stream.js','camera-3d.js','input-3d.js','interaction-3d.js','npc-3d.js','sky-3d.js','save-migration.js','vendor/three.module.min.js'];
for(const file of required)assert.ok(fs.existsSync(`rhythm-world/${file}`),`missing ${file}`);
const sources=required.filter(f=>f.endsWith('.js')).map(f=>fs.readFileSync(`rhythm-world/${f}`,'utf8')).join('\n');assert.ok(!/https?:\/\//.test(sources),'3D runtime must not depend on remote scripts');
const css=fs.readFileSync('rhythm-world.css','utf8');for(const token of['touch-action:none','@media(max-width:700px)','joystick','interact'])assert.ok(css.includes(token),`responsive controls missing ${token}`);
const build=fs.readFileSync('scripts/build-sites-static.js','utf8');assert.ok(/walk\(rhythmWorldDir,\s*["']rhythm-world["']\)/.test(build),'build must copy 3D module directory');
console.log('3D GitHub Pages delivery verification passed.');
