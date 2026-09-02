export const DAY_LENGTH_MS=120000;
export function getWorldPhase(now=Date.now()){return((now%DAY_LENGTH_MS)+DAY_LENGTH_MS)%DAY_LENGTH_MS/DAY_LENGTH_MS}
export function getDayNightState(phase){const p=((phase%1)+1)%1,isNight=p>=.5;if(!isNight){const travel=p/.5;return{phase:p,isNight:false,celestial:'sun',travel,farewell:p>=.44,speech:p>=.44?'再见，我明天再来！':''}}return{phase:p,isNight:true,celestial:'moon',travel:(p-.5)/.5,farewell:false,speech:p>=.94?'天快亮了，晚安！':''}}
