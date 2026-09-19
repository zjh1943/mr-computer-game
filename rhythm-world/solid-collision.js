export function resolveSolidCollision(next, solid, previous, playerRadius = 0.48) {
  const minimum = solid.radius + playerRadius;
  const dx = next.x - solid.x;
  const dz = next.z - solid.z;
  const distance = Math.hypot(dx, dz);
  if (distance >= minimum) return next;
  let nx = distance > 0.0001 ? dx / distance : previous.x - solid.x;
  let nz = distance > 0.0001 ? dz / distance : previous.z - solid.z;
  const normalLength = Math.hypot(nx, nz) || 1;
  nx /= normalLength;
  nz /= normalLength;
  return { x: solid.x + nx * (minimum + 0.02), z: solid.z + nz * (minimum + 0.02) };
}

export function resolveSolidCollisions(next, solids, previous) {
  return solids.reduce((position, solid) => resolveSolidCollision(position, solid, previous), next);
}
