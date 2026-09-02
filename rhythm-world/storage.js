const SAVE_KEY='my-rhythm-box-world-v1';
export function createDefaultSave(seed=Date.now().toString(36)){return{version:1,seed,player:{x:0,y:0,character:'gray',coins:160,onboarded:false},inventory:{},house:null,basement:null,customCharacters:[],stageSlots:[],highScore:0,settings:{language:'zh',master:.8,music:.75,sfx:.8},updatedAt:Date.now()}}
export function loadSave(){try{const raw=localStorage.getItem(SAVE_KEY);if(!raw)return null;const data=JSON.parse(raw);return data?.version===1?data:null}catch{return null}}
export function saveGame(state){state.updatedAt=Date.now();localStorage.setItem(SAVE_KEY,JSON.stringify(state));return state}
export function resetSave(){localStorage.removeItem(SAVE_KEY)}

