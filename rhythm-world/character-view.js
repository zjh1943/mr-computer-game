function wrapAngle(angle) {
  return Math.atan2(Math.sin(angle), Math.cos(angle));
}

export function selectCharacterView(direction, cameraYaw) {
  const relative = wrapAngle(direction - cameraYaw);
  const facing = Math.cos(relative);
  if (facing > 0.55) return { view: 'front', flip: false };
  if (facing < -0.55) return { view: 'back', flip: false };
  return { view: 'side', flip: Math.sin(relative) < 0 };
}
