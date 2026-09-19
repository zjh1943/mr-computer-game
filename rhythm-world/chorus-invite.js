export function createChorusState(leadId) {
  return { members: [leadId], invited: null, declined: [] };
}

export function chooseJoinCandidate(nearbyIds, state) {
  if (state.members.length >= 2 || state.invited) return null;
  return nearbyIds.find(id => !state.members.includes(id) && !state.declined.includes(id)) || null;
}

export function applyJoinDecision(state, decision) {
  const id = state.invited;
  if (!id) return { state, joinId: null, leaveId: null };
  if (decision === 'accept') {
    return { state: { ...state, members: [...state.members, id], invited: null }, joinId: id, leaveId: null };
  }
  return { state: { ...state, invited: null, declined: [...state.declined, id] }, joinId: null, leaveId: id };
}
