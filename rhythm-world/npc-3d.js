import { createCharacter3D, setCharacterMotion, setCharacterSpeech, stopCharacterSpeech } from './character-3d.js';
import { CHARACTER_CATALOG } from './character-catalog.js';
import { CENTER_TOWN } from './world-stream.js';
import { createNpcSpawnLayout, isStationaryResident, updateNpcConversationState } from './npc-behavior.js';

export function createNpcSystem({ scene, catalog = CHARACTER_CATALOG, onSpeech = () => {} }) {
  const spawns = createNpcSpawnLayout(CENTER_TOWN.homes);
  let conversationState = { nearbyId: null, lastSpokenAt: -Infinity };
  const entities = CENTER_TOWN.homes.map((home, index) => {
    const character = catalog.find(item => item.id === home.id);
    const spawn = spawns[index];
    const object = createCharacter3D(home.id, { scale: 0.92 });
    object.position.set(spawn.x, 0, spawn.z);
    object.userData = {
      ...object.userData,
      kind: 'resident',
      id: home.id,
      label: character.name,
      residentHome: home
    };
    scene.add(object);
    return { character, home, spawn, object, phase: index * 0.73, speaking: false, goingHome: false, direction: 0 };
  });

  function update({ time, dayState, player, cameraYaw = 0 }) {
    let nearest = null;
    for (const npc of entities) {
      npc.goingHome = dayState.isNight;
      const isTree = isStationaryResident(npc.home.id);
      const anchor = isTree ? npc.home : (npc.goingHome ? npc.home : npc.spawn);
      const targetX = anchor.x + (isTree ? 0 : Math.sin(time * 0.00025 + npc.phase) * (npc.goingHome ? 0.5 : 1.8));
      const targetZ = anchor.z + (isTree ? 2 : (npc.goingHome ? 1.8 : Math.cos(time * 0.00021 + npc.phase) * 1.4));
      npc.direction = Math.atan2(targetX - npc.object.position.x, targetZ - npc.object.position.z);
      npc.object.position.x += (targetX - npc.object.position.x) * 0.018;
      npc.object.position.z += (targetZ - npc.object.position.z) * 0.018;
      const distance = npc.object.position.distanceTo(player.position);
      if (!nearest || distance < nearest.distance) nearest = { id: npc.home.id, distance, npc };
    }

    const conversation = updateNpcConversationState(conversationState, nearest, time);
    conversationState = conversation.state;
    for (const npc of entities) {
      const isTree = isStationaryResident(npc.home.id);
      npc.speaking = conversationState.nearbyId === npc.home.id && nearest?.distance <= 3.2;
      const lookAtPlayer = nearest?.npc === npc && nearest.distance <= 3.2;
      const direction = lookAtPlayer ? Math.atan2(player.position.x - npc.object.position.x, player.position.z - npc.object.position.z) : npc.direction;
      setCharacterMotion(npc.object, { moving: !isTree, speaking: npc.speaking, time, direction, cameraYaw, gazeDirection: direction });
    }
    if (conversation.speakId) {
      const npc = entities.find(item => item.home.id === conversation.speakId);
      onSpeech({ kind: 'resident', id: npc.home.id, label: npc.character.name, x: npc.object.position.x, y: npc.object.position.z, object3d: npc.object });
    }
  }

  return {
    entities,
    getInteractables: () => entities.map(npc => npc.object),
    getSolidColliders: () => entities.filter(npc => npc.home.id === 'mr-tree').map(npc => ({ x: npc.object.position.x, z: npc.object.position.z, radius: 1.2 })),
    speak(id, text, duration) { const npc = entities.find(item => item.home.id === id); if (npc) setCharacterSpeech(npc.object, text, duration); },
    stopSpeaking(id) { const npc = entities.find(item => item.home.id === id); if (npc) stopCharacterSpeech(npc.object); },
    update,
    dispose() {
      for (const npc of entities) scene.remove(npc.object);
    }
  };
}
