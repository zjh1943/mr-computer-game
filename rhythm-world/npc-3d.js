import { createCharacter3D, setCharacterMotion, setCharacterSpeech, stopCharacterSpeech } from './character-3d.js';
import { CHARACTER_CATALOG } from './character-catalog.js';
import { CENTER_TOWN } from './world-stream.js';
import { createNpcSpawnLayout, isStationaryResident, updateNpcConversationState } from './npc-behavior.js';
import { createComputerPowerState, updateComputerPower } from './computer-power.js';

const approach = (value, target, rate) => value + (target - value) * rate;

export function createNpcSystem({ scene, catalog = CHARACTER_CATALOG, onSpeech = () => {} }) {
  const spawns = createNpcSpawnLayout(CENTER_TOWN.homes);
  let conversationState = { nearbyId: null, lastSpokenAt: -Infinity }, lastTime = 0;
  const entities = CENTER_TOWN.homes.map((home, index) => {
    const character = catalog.find(item => item.id === home.id), spawn = spawns[index], object = createCharacter3D(home.id, { scale: .92 });
    object.position.set(spawn.x, 0, spawn.z); object.userData = { ...object.userData, kind: 'resident', id: home.id, label: character.name, residentHome: home };
    scene.add(object);
    return { character, home, spawn, object, phase: index * .73, speaking: false, performing: false, performanceRole: 'voice', goingHome: false, direction: 0, power: home.id === 'mr-fun-computer' ? createComputerPowerState() : null, rescuing: false, chorusRole: '' };
  });
  const computer = entities.find(item => item.home.id === 'mr-fun-computer');
  const happyRobot = entities.find(item => item.home.id === 'fun-bot');

  function rescueComputer(time) {
    if (!computer || !happyRobot || computer.rescuing) return;
    computer.rescuing = true; computer.rescueStarted = time;
    happyRobot.object.position.x = computer.object.position.x - .7; happyRobot.object.position.z = computer.object.position.z;
    setCharacterSpeech(happyRobot.object, '别担心，我带电脑先生回家充电！', 4600);
  }

  function updateComputer(time, dtMs) {
    if (!computer) return;
    const distanceHome = Math.hypot(computer.object.position.x - computer.home.x, computer.object.position.z - computer.home.z);
    const previous = computer.power.status;
    computer.power = updateComputerPower(computer.power, { dtMs, distanceHome, now: time });
    const status = computer.power.status;
    if (status === 'returning' || status === 'charging') {
      computer.object.position.x = approach(computer.object.position.x, computer.home.x, .055);
      computer.object.position.z = approach(computer.object.position.z, computer.home.z + 1.3, .055);
    }
    if (status === 'shutdown') computer.rescuing = false;
    if (status === 'rescued' && previous !== 'rescued') rescueComputer(time);
    if (status === 'rescued' && computer.rescuing) {
      happyRobot.object.position.x = approach(happyRobot.object.position.x, computer.home.x - .7, .045);
      happyRobot.object.position.z = approach(happyRobot.object.position.z, computer.home.z + 1.2, .045);
      computer.object.position.x = happyRobot.object.position.x + .7; computer.object.position.z = happyRobot.object.position.z;
    }
    if (status === 'flying' && previous === 'charging') setCharacterSpeech(computer.object, '电充满了，我又可以飞啦！', 3600);
    computer.object.userData.powerStatus = status; computer.object.userData.charge = computer.power.charge;
  }

  function update({ time, dayState, player, cameraYaw = 0, performanceBeat = 0 }) {
    const dtMs = Math.max(0, Math.min(100, time - (lastTime || time))); lastTime = time;
    updateComputer(time, dtMs);
    let nearest = null;
    for (const npc of entities) {
      npc.goingHome = dayState.isNight; const isTree = isStationaryResident(npc.home.id), isComputer = npc === computer;
      if (!isComputer) {
        const forcedHome = npc === happyRobot && computer?.rescuing, approaching = npc.chorusRole === 'approaching' || npc.chorusRole === 'joining', leaving = npc.chorusRole === 'leaving';
        const anchor = approaching ? player.position : leaving ? npc.spawn : isTree ? npc.home : ((npc.goingHome || forcedHome) ? npc.home : npc.spawn);
        const targetX = anchor.x + (approaching ? Math.cos(npc.phase) * 1.45 : isTree ? 0 : Math.sin(time * .00025 + npc.phase) * ((npc.goingHome || forcedHome || leaving) ? .5 : 1.8));
        const targetZ = anchor.z + (approaching ? Math.sin(npc.phase) * 1.45 : isTree ? 2 : ((npc.goingHome || forcedHome || leaving) ? 1.8 : Math.cos(time * .00021 + npc.phase) * 1.4));
        npc.direction = Math.atan2(targetX - npc.object.position.x, targetZ - npc.object.position.z);
        const speed=(approaching||leaving)? .045 : .018;npc.object.position.x = approach(npc.object.position.x, targetX, speed); npc.object.position.z = approach(npc.object.position.z, targetZ, speed);
        if(leaving&&Math.hypot(npc.object.position.x-npc.spawn.x,npc.object.position.z-npc.spawn.z)<1.2)npc.chorusRole='';
      } else if (computer.power.status === 'flying') {
        const targetX = computer.spawn.x + Math.sin(time * .00034 + computer.phase) * 3.1, targetZ = computer.spawn.z + Math.cos(time * .00029 + computer.phase) * 2.4;
        npc.direction = Math.atan2(targetX - npc.object.position.x, targetZ - npc.object.position.z);
        npc.object.position.x = approach(npc.object.position.x, targetX, .022); npc.object.position.z = approach(npc.object.position.z, targetZ, .022);
      }
      const distance = npc.object.position.distanceTo(player.position); if (!nearest || distance < nearest.distance) nearest = { id: npc.home.id, distance, npc };
    }
    const conversation = updateNpcConversationState(conversationState, nearest, time); conversationState = conversation.state;
    for (const npc of entities) {
      const isTree = isStationaryResident(npc.home.id), isComputer = npc === computer;
      npc.speaking = conversationState.nearbyId === npc.home.id && nearest?.distance <= 3.2;
      const lookAtPlayer = nearest?.npc === npc && nearest.distance <= 3.2;
      const direction = lookAtPlayer ? Math.atan2(player.position.x - npc.object.position.x, player.position.z - npc.object.position.z) : npc.direction;
      const motionMode = isComputer ? (computer.power.status === 'shutdown' ? 'shutdown' : computer.power.status === 'rescued' ? 'carried' : 'flying') : '';
      setCharacterMotion(npc.object, { moving: !isTree && (!isComputer || computer.power.status === 'flying' || computer.power.status === 'returning'), speaking: npc.speaking, performing: npc.performing, performanceBeat, performanceRole: npc.performanceRole, time, direction, cameraYaw, gazeDirection: direction, motionMode });
    }
    if (conversation.speakId) { const npc = entities.find(item => item.home.id === conversation.speakId); onSpeech({ kind: 'resident', id: npc.home.id, label: npc.character.name, x: npc.object.position.x, y: npc.object.position.z, object3d: npc.object }); }
  }
  return { entities, getInteractables: () => entities.map(npc => npc.object), getNearbyResidents(player,range=16){return entities.map(npc=>({id:npc.home.id,label:npc.character.name,distance:npc.object.position.distanceTo(player.position)})).filter(item=>item.distance<=range).sort((a,b)=>a.distance-b.distance)},setChorusRole(id,role){const npc=entities.find(item=>item.home.id===id);if(npc)npc.chorusRole=role},setPerforming(id,active,role='voice'){const npc=entities.find(item=>item.home.id===id);if(npc){npc.performing=active;npc.performanceRole=role}}, getSolidColliders: () => entities.filter(npc => npc.home.id === 'mr-tree').map(npc => ({ x: npc.object.position.x, z: npc.object.position.z, radius: 1.2 })), speak(id, text, duration) { const npc = entities.find(item => item.home.id === id); if (npc) setCharacterSpeech(npc.object, text, duration); }, stopSpeaking(id) { const npc = entities.find(item => item.home.id === id); if (npc) stopCharacterSpeech(npc.object); }, update, rescueComputer, dispose() { for (const npc of entities) scene.remove(npc.object); } };
}
