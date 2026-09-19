(async () => {
  const assert = require('assert');
  const { createNpcSpawnLayout, updateNpcConversationState } = await import('../rhythm-world/npc-behavior.js');
  const homes = Array.from({ length: 19 }, (_, i) => ({ id: `npc-${i}`, x: i % 2 ? -13 : 13, z: Math.floor(i / 2) * 7 - 22 }));
  const spawns = createNpcSpawnLayout(homes);
  assert.equal(spawns.length, 19);
  assert.ok(spawns.filter(p => Math.hypot(p.x, p.z) <= 12).length >= 6, 'at least six NPCs must be visible near the spawn/main street');
  assert.equal(new Set(spawns.map(p => `${p.x},${p.z}`)).size, 19, 'NPCs must not overlap');

  let state = { nearbyId: null, lastSpokenAt: -Infinity };
  let result = updateNpcConversationState(state, { id: 'oren', distance: 2.5 }, 1000);
  assert.equal(result.speakId, 'oren', 'entering speaking range should start dialogue');
  state = result.state;
  result = updateNpcConversationState(state, { id: 'oren', distance: 2.4 }, 1200);
  assert.equal(result.speakId, null, 'staying beside the same NPC must not repeat dialogue every frame');
  result = updateNpcConversationState(state, null, 1500);
  assert.equal(result.state.nearbyId, null, 'leaving range should reset the proximity latch');
  result = updateNpcConversationState(result.state, { id: 'raddy', distance: 2.6 }, 5000);
  assert.equal(result.speakId, 'raddy', 'approaching another NPC should start their dialogue');

  console.log('NPC visibility and automatic conversation verification passed.');
})().catch(error => { console.error(error); process.exit(1); });
