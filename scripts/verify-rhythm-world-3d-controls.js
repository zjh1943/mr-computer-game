const fs=require('fs'),assert=require('assert'),read=p=>fs.readFileSync(p,'utf8');
const camera=read('rhythm-world/camera-3d.js'),input=read('rhythm-world/input-3d.js'),interaction=read('rhythm-world/interaction-3d.js'),npc=read('rhythm-world/npc-3d.js'),engine=read('rhythm-world/engine.js');
for(const t of['createThirdPersonCamera','pitchMin','pitchMax','collisionDistance'])assert.ok(camera.includes(t),`camera missing ${t}`);
for(const t of['createInput3D','blockedSelectors','movement','consumeLook','closest'])assert.ok(input.includes(t),`input missing ${t}`);
for(const t of['createInteraction3D','Raycaster','interactionPriority','currentTarget','pointerup'])assert.ok(interaction.includes(t),`interaction missing ${t}`);
for(const t of['createNpcSystem','goingHome','speaking','residentHome'])assert.ok(npc.includes(t),`NPC system missing ${t}`);
for(const t of['createScene3D','createTown3D','createThirdPersonCamera','createInteraction3D','createNpcSystem'])assert.ok(engine.includes(t),`engine not wired to ${t}`);
assert.ok(engine.includes('getNearbyInteractable'));
console.log('Third-person controls and interaction verification passed.');
