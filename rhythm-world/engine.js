import { createScene3D } from './scene-3d.js';
import { createCharacter3D, setCharacterMotion, setCharacterSpeech, stopCharacterSpeech } from './character-3d.js';
import { createTown3D } from './town-3d.js';
import { createSky3D } from './sky-3d.js';
import { createThirdPersonCamera } from './camera-3d.js';
import { createInput3D } from './input-3d.js';
import { createInteraction3D } from './interaction-3d.js';
import { createNpcSystem } from './npc-3d.js';
import { getDayNightState, getWorldPhase } from './day-night.js';
import { distanceBetween } from './interactions.js';
import { resolveSolidCollisions } from './solid-collision.js';
import { applyTrafficImpact } from './traffic-safety.js';

export const distanceTo = distanceBetween;

export function createEngine({ canvas, state, onInteract, onMessage = () => {}, onSunFarewell = onMessage, getBeatTime = () => 0 }) {
  let mode = 'factory';
  let trafficSafety = { health: state.player.health ?? 100, lastImpactAt: -Infinity };
  let verticalVelocity = 0, grounded = true;
  let player = createCharacter3D(state.player.character || 'gray');
  let playerPerformance = { active: false, role: 'voice' };
  let cameraControl, input, town, sky, npcs, interaction;
  player.position.set(state.player.x || 0, 0, state.player.z ?? state.player.y ?? 0);
  player.rotation.y = Math.PI;

  function frame({ now, dt }) {
    const dayState = getDayNightState(getWorldPhase());
    const look = input.consumeLook();
    cameraControl.rotate(look.x, look.y);
    let moving = false;
    if (mode === 'world') {
      const previous = { x: player.position.x, z: player.position.z };
      const move = input.movement;
      const speed = 5.2;
      const angle = cameraControl.yaw;
      const dx = (move.x * Math.cos(angle) - move.y * Math.sin(angle)) * speed * dt;
      const dz = (-move.x * Math.sin(angle) - move.y * Math.cos(angle)) * speed * dt;
      player.position.x += dx;
      player.position.z += dz;
      if (input.consumeJump() && grounded) { verticalVelocity = 7.4; grounded = false; }
      verticalVelocity -= 18 * dt;
      player.position.y = Math.max(0, player.position.y + verticalVelocity * dt);
      if (player.position.y <= 0) { player.position.y = 0; verticalVelocity = 0; grounded = true; }
      const resolved = resolveSolidCollisions({ x: player.position.x, z: player.position.z }, [...npcs.getSolidColliders(), ...town.getSolidColliders()], previous);
      player.position.x = resolved.x;
      player.position.z = resolved.z;
      moving = Math.hypot(dx, dz) > 0.001;
      if (moving) player.rotation.y = Math.atan2(dx, dz);
      state.player.x = player.position.x;
      state.player.z = player.position.z;
      state.player.y = player.position.z;
      const car=town.getTrafficColliders().find(item=>Math.hypot(player.position.x-item.x,player.position.z-item.z)<item.radius+.45);
      if(car){const impact=applyTrafficImpact(trafficSafety,{now,speed:car.speed});trafficSafety=impact;if(impact.injured){state.player.health=impact.health;const awayX=player.position.x-car.x,awayZ=player.position.z-car.z,length=Math.hypot(awayX,awayZ)||1;player.position.x+=awayX/length*1.8;player.position.z+=awayZ/length*1.8;onMessage(`🚑 被车辆撞到了！生命 ${impact.health}%`);if(impact.health<=0){trafficSafety={health:100,lastImpactAt:now};state.player.health=100;player.position.set(0,0,0);onMessage('你被送回原版村休息，生命恢复了。')}}}
    }
    const performanceBeat = getBeatTime();
    setCharacterMotion(player, { moving, performing: playerPerformance.active, performanceBeat, performanceRole: playerPerformance.role, time: now, direction: player.rotation.y, cameraYaw: cameraControl.yaw });
    town.update(player.position,now);
    const taxiRide=town.getTaxiRidePosition();if(taxiRide){player.position.set(taxiRide.x,1.05,taxiRide.z);state.player.x=taxiRide.x;state.player.z=taxiRide.z;}
    sky.update(dayState, runtime.camera, now);
    npcs.update({ time: now, dayState, player, cameraYaw: cameraControl.yaw, performanceBeat });
    cameraControl.update(dt);
    interaction.update();
  }

  const runtime = createScene3D({ canvas, onFrame: frame, onError: onMessage });
  runtime.scene.add(player);
  town = createTown3D({ scene: runtime.scene, seed: state.seed });
  if(state.player.indoor?.buildingId){const saved=state.player.indoor,townRoom=town.enterBuilding(saved.buildingId,{x:saved.outdoorX||0,z:saved.outdoorZ||0});const room=saved.floor>1?town.goToFloor(saved.floor):townRoom;if(room)player.position.set(room.spawn.x,0,room.spawn.z)}
  sky = createSky3D(runtime.scene, { onFarewell: onSunFarewell });
  npcs = createNpcSystem({ scene: runtime.scene, onSpeech: target => { if (mode === 'world') onInteract?.(target); } });
  input = createInput3D({ canvas });
  cameraControl = createThirdPersonCamera({ camera: runtime.camera, canvas, target: player });
  interaction = createInteraction3D({ camera: runtime.camera, canvas, getTargets: () => [...town.getInteractables(), ...npcs.getInteractables()], getPlayer: () => player, onInteract });
  town.update(player.position);

  return {
    start: () => runtime.start(),
    stop: () => runtime.stop(),
    resize: () => runtime.resize(),
    setMode(value) { mode = value; },
    setJoystick(x, y) { input.setVirtual(x, y); },
    setPlayerPosition(x, z) { player.position.set(x, 0, z); verticalVelocity = 0; grounded = true; state.player.x = x; state.player.y = z; state.player.z = z; town.update(player.position); },
    setPlayerCharacter(id) {
      const position = player.position.clone();
      const rotation = player.rotation.y;
      runtime.scene.remove(player);
      player = createCharacter3D(id);
      player.position.copy(position);
      player.rotation.y = rotation;
      runtime.scene.add(player);
      cameraControl.setTarget(player);
      state.player.character = id;
    },
    speakNpc(id, text, duration) { npcs.speak(id, text, duration); },
    stopNpcSpeech(id) { npcs.stopSpeaking(id); },
    speakPlayer(text, duration) { setCharacterSpeech(player, text, duration); },
    stopPlayerSpeech() { stopCharacterSpeech(player); },
    getNearbyResidents(range) { return npcs.getNearbyResidents(player, range); },
    setNpcChorusRole(id, role) { npcs.setChorusRole(id, role); },
    setPlayerPerforming(active, role = 'voice') { playerPerformance = { active, role }; },
    setNpcPerforming(id, active, role = 'voice') { npcs.setPerforming(id, active, role); },
    enterBuilding(id) { const outdoor={x:player.position.x,z:player.position.z},interior=town.enterBuilding(id,player.position);if(!interior)return null;state.player.indoor={buildingId:id,floor:1,outdoorX:outdoor.x,outdoorZ:outdoor.z};player.position.set(interior.spawn.x,0,interior.spawn.z);return{floors:interior.floors,floor:1,homeFloor:interior.homeFloor,buildingId:id}; },
    goToFloor(floor) { const interior=town.goToFloor(floor);if(!interior)return null;if(state.player.indoor)state.player.indoor.floor=floor;player.position.set(interior.spawn.x,0,interior.spawn.z);return{floors:interior.floors,floor,homeFloor:interior.homeFloor,buildingId:interior.group.userData.buildingId}; },
    exitBuilding() { const position=town.exitBuilding();delete state.player.indoor;player.position.set(position.x,0,position.z);return position; },
    callTaxi() { return town.callTaxi(player.position); },
    getTaxiDestinations() { return town.getTaxiDestinations(); },
    boardTaxi(destination) { return town.boardTaxi(destination); },
    getTaxiStatus() { return town.getTaxiStatus(); },
    inviteNpc(id) { npcs.setChorusRole(id,'approaching'); },
    getNearbyInteractable() { if (mode === 'factory') return { kind: 'factoryExit', label: '离开生产中心' }; return interaction.currentTarget; },
    getMode: () => mode,
    residentHomes: npcs.entities.map(npc => npc.home),
    isGoingHome: () => getDayNightState(getWorldPhase()).isNight,
    dispose() { interaction.dispose(); input.dispose(); npcs.dispose(); sky.dispose(); town.dispose(); runtime.dispose(); }
  };
}
