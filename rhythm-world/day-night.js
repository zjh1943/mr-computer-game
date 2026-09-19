export const DAY_LENGTH_MS=720000;
export function getWorldPhase(now=Date.now(),override=globalThis.__RHYTHM_WORLD_PHASE__){const query=globalThis.location?new URLSearchParams(globalThis.location.search).get('phase'):null,pinned=Number.isFinite(override)?override:(query!==null?Number(query):NaN);if(Number.isFinite(pinned))return((pinned%1)+1)%1;return((now%DAY_LENGTH_MS)+DAY_LENGTH_MS)%DAY_LENGTH_MS/DAY_LENGTH_MS}
import { SUN_FAREWELL } from './concert-rules.js';
export function getDayNightState(phase){const p=((phase%1)+1)%1,isNight=p>=.5;if(!isNight){const travel=p/.5;return{phase:p,isNight:false,celestial:'sun',travel,farewell:p>=.44,speech:p>=.44?SUN_FAREWELL:''}}return{phase:p,isNight:true,celestial:'moon',travel:(p-.5)/.5,farewell:false,speech:p>=.94?'天快亮了，晚安！':''}}
