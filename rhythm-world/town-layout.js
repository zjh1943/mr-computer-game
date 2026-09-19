import { TOWN_HOUSEHOLDS } from './home-layout.js';

export const MUSIC_PLAZA_POSITION = { x: -22, z: 0, radius: 4.2 };
const FIXED_LANDMARKS = [
  { x: 0, z: -8, radius: 3.2 },
  { x: 10, z: -8, radius: 3.2 },
  { x: 16, z: 10, radius: 2.5 },
  ...TOWN_HOUSEHOLDS.map(home => ({ x: home.x, z: home.z, radius: 3 }))
];

export function landmarkClearance(place) {
  const buildingGap = Math.min(...FIXED_LANDMARKS.map(other => Math.hypot(place.x - other.x, place.z - other.z) - place.radius - other.radius));
  const roadGap = Math.abs(place.x) - place.radius - 2.7;
  return Math.min(buildingGap, roadGap);
}
