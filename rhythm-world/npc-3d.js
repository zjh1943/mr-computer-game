import { createCharacter3D, setCharacterMotion } from './character-3d.js';
import { CHARACTER_CATALOG } from './character-catalog.js';
import { CENTER_TOWN } from './world-stream.js';
import { createNpcSpawnLayout, updateNpcConversationState } from './npc-behavior.js';

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
    return { character, home, spawn, object, phase: index * 0.73, speaking: false, goingHome: false };
  });

  function update({ time, dayState, player }) {
    let nearest = null;
    for (const npc of entities) {
      npc.goingHome = dayState.isNight;
      const anchor = npc.goingHome ? npc.home : npc.spawn;
      const targetX = anchor.x + Math.sin(time * 0.00025 + npc.phase) * (npc.goingHome ? 0.5 : 1.8);
      const targetZ = anchor.z + (npc.goingHome ? 1.8 : Math.cos(time * 0.00021 + npc.phase) * 1.4);
      npc.object.position.x += (targetX - npc.object.position.x) * 0.018;
      npc.object.position.z += (targetZ - npc.object.position.z) * 0.018;
      const distance = npc.object.position.distanceTo(player.position);
      if (!nearest || distance < nearest.distance) nearest = { id: npc.home.id, distance, npc };
    }

    const conversation = updateNpcConversationState(conversationState, nearest, time);
    conversationState = conversation.state;
    for (const npc of entities) {
      npc.speaking = conversationState.nearbyId === npc.home.id && nearest?.distance <= 3.2;
      setCharacterMotion(npc.object, { moving: true, speaking: npc.speaking, time });
    }
    if (conversation.speakId) {
      const npc = entities.find(item => item.home.id === conversation.speakId);
      onSpeech({ kind: 'resident', id: npc.home.id, label: npc.character.name, x: npc.object.position.x, y: npc.object.position.z, object3d: npc.object });
    }
  }

  return {
    entities,
    getInteractables: () => entities.map(npc => npc.object),
    update,
    dispose() {
      for (const npc of entities) scene.remove(npc.object);
    }
  };
}
