const fs=require('fs'),c=fs.readFileSync('rhythm-world/characters.js','utf8'),e=fs.readFileSync('rhythm-world/engine.js','utf8'),m=fs.readFileSync('rhythm-world/character-3d.js','utf8'),s=fs.readFileSync('rhythm-world/sky-3d.js','utf8');
for(const x of ['mr-fun-computer','drawFloatingHands','drawPlugHands','plugHands','celestialOnly'])if(!(c+e+m+s).includes(x))throw Error('Missing anatomy rule: '+x);
if(c.includes("line(ctx,-12,27,-17+swing,57,7)"))throw Error('Characters still have line legs');
if(!s.includes("sun.name='sun'"))throw Error('Mr Sun is not rendered exclusively in the 3D sky');
console.log('Sprunki anatomy verification passed.');
