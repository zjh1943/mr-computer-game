export function createNpcSpawnLayout(homes) {
  return homes.map((home, index) => {
    if (index < 8) {
      const side = index % 2 ? 1 : -1;
      return { id: home.id, x: side * (3.5 + (index % 3)), z: -8 + Math.floor(index / 2) * 5 };
    }
    return { id: home.id, x: home.x + (index % 2 ? 2 : -2), z: home.z + 3 };
  });
}

export function updateNpcConversationState(state, nearest, now, { range = 3.2, cooldown = 1800 } = {}) {
  if (!nearest || nearest.distance > range) {
    return { state: { ...state, nearbyId: null }, speakId: null };
  }
  if (state.nearbyId === nearest.id || now - state.lastSpokenAt < cooldown) {
    return { state: { ...state, nearbyId: nearest.id }, speakId: null };
  }
  return { state: { nearbyId: nearest.id, lastSpokenAt: now }, speakId: nearest.id };
}
