const PROFILES = {
  'fun-bot': { bob: 5, sway: 6, squash: .035, accessory: 7, pace: 2 },
  'mr-tree': { bob: 2, sway: 3, squash: .018, accessory: 10, pace: .5 },
  'mr-sun': { bob: 9, sway: 5, squash: .025, accessory: 14, pace: .75 },
  oren: { bob: 7, sway: 3, squash: .04, accessory: 4, pace: 1 },
  raddy: { bob: 8, sway: 4, squash: .05, accessory: 5, pace: 1.5 },
  pinki: { bob: 7, sway: 5, squash: .045, accessory: 9, pace: 1 },
  default: { bob: 5, sway: 3, squash: .03, accessory: 4, pace: 1 }
};

export function getPerformancePose(id, beatTime, active) {
  if (!active) return { bob: 0, sway: 0, squash: 1, mouth: 0, blink: false, accessory: 0 };
  const profile = PROFILES[id] || PROFILES.default;
  const wave = Math.sin(beatTime * Math.PI * profile.pace);
  const pulse = (Math.sin(beatTime * Math.PI * 2) + 1) / 2;
  return {
    bob: wave * profile.bob,
    sway: Math.sin(beatTime * Math.PI * .5 + id.length) * profile.sway,
    squash: 1 + wave * profile.squash,
    mouth: pulse,
    blink: Math.floor(beatTime * 2 + id.length) % 17 === 0,
    accessory: Math.sin(beatTime * Math.PI * profile.pace + .7) * profile.accessory
  };
}
