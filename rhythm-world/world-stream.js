import{CHARACTER_CATALOG}from'./character-catalog.js';
export const CHUNK_SIZE_3D=36,MAX_LOADED_CHUNKS=25;
export const CENTER_TOWN={homes:CHARACTER_CATALOG.filter(c=>!c.celestial).map((c,i)=>({id:c.id,x:(i%5-2)*8,z:(Math.floor(i/5)-1.5)*9+12}))};
export function getDesiredChunkKeys(position,radius=2){const cx=Math.floor(position.x/CHUNK_SIZE_3D),cz=Math.floor(position.z/CHUNK_SIZE_3D),out=[];for(let z=-radius;z<=radius;z++)for(let x=-radius;x<=radius;x++)out.push(`${cx+x},${cz+z}`);return out}
export function parseChunkKey(key){const[x,z]=key.split(',').map(Number);return{x,z}}
export function seededValue(seed,x,z){let h=2166136261;for(const ch of`${seed}:${x}:${z}`){h^=ch.charCodeAt(0);h=Math.imul(h,16777619)}return(h>>>0)/4294967295}
