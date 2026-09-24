const ROLE_PACE = { beat: 2, bass: .75, chord: .5, melody: 1.25, voice: 1, effect: 1.6, whistle: .85 };

export function createPerformanceState() { return { members: new Map() }; }

export function setPerformer(state, id, active, role = 'voice') {
  const members = new Map(state.members);
  if (active) members.set(id, { role }); else members.delete(id);
  return { members };
}

export function getPerformerMotion(state, id, beat) {
  const member = state.members.get(id);
  if (!member) return { performing: false, bob: 0, sway: 0, mouth: 0, role: '' };
  const pace = ROLE_PACE[member.role] || 1;
  const phase = beat * Math.PI * pace + id.length * .17;
  return {
    performing: true,
    bob: Math.abs(Math.sin(phase)) * .14,
    sway: Math.sin(phase * .5) * .08,
    mouth: (Math.sin(beat * Math.PI * 2 * pace) + 1) / 2,
    role: member.role
  };
}
