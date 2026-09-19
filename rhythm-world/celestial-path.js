export function getCelestialArcPosition(day) {
  const travel = Math.max(0, Math.min(1, day.travel));
  return {
    x: -30 + travel * 60,
    y: .45 + Math.sin(travel * Math.PI) * 13.5,
    z: -38
  };
}
