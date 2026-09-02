export const distanceBetween=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
export function pickInteractable(origin,entities,radius=180){let best=null,bestDistance=radius;for(const entity of entities){const distance=distanceBetween(origin,entity);if(distance<=bestDistance){best=entity;bestDistance=distance}}return best}
export function hitTestInteractable(point,entities,radius=85){return pickInteractable(point,entities,radius)}
