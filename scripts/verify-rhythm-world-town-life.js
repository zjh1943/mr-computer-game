const fs=require('fs'),e=fs.readFileSync('rhythm-world/engine.js','utf8'),w=fs.readFileSync('rhythm-world/world.js','utf8'),a=fs.readFileSync('rhythm-world.js','utf8');const all=e+w+a;
for(const x of ['getNearbyInteractable','residentHomes','isGoingHome','factoryDoor','enterFactory','digCave','NPC_DIALOGUE','openNpcDialogue','distanceTo'])if(!all.includes(x))throw Error('Missing town-life feature: '+x);
if(all.includes("if(b.kind!=='factory')building"))throw Error('Factory is still excluded from world rendering');
for(const id of ['oren','raddy','clukr','fun-bot','vineria','gray','brud','garnold','owakcx','pinki','simon','sky','durple','mr-tree','wenda','jevin','black','mr-fun-computer'])if(!all.includes(id))throw Error('Missing resident '+id);
console.log('Town life and proximity interaction verification passed.');
