import{createV2Save,migrateSave}from'./save-migration.js';
const SAVE_KEY='my-rhythm-box-world-v1',BACKUP_KEY='my-rhythm-box-world-v1-backup';
export function createDefaultSave(seed=Date.now().toString(36)){return createV2Save(seed)}
export function loadSave(){const raw=localStorage.getItem(SAVE_KEY);if(!raw)return null;try{const result=migrateSave(JSON.parse(raw));if(result.backupRequired)localStorage.setItem(BACKUP_KEY,raw);if(result.migrated)saveGame(result.save);return result.save}catch{localStorage.setItem(BACKUP_KEY,raw);return null}}
export function saveGame(state){state.updatedAt=Date.now();localStorage.setItem(SAVE_KEY,JSON.stringify(state));return state}
export function resetSave(){localStorage.removeItem(SAVE_KEY)}
