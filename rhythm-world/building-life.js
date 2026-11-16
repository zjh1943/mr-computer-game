export function buildingFloorCount(height=12){return Math.max(1,Math.min(20,Math.round(height/3.2)))}
export function interiorSpawn(buildingId,floor=1){return{x:250,z:250,floor,buildingId}}
function stableNumber(value){let n=0;for(const ch of String(value))n=(n*31+ch.charCodeAt(0))>>>0;return n}
export const PLAYER_HOME_BUILDING_ID='tower-1';
export function homeFloorForBuilding(buildingId,floors=12){if(buildingId!==PLAYER_HOME_BUILDING_ID)return 0;if(floors<=1)return 1;return 2+stableNumber(buildingId)%(floors-1)}
export function floorHouseholds(buildingId,floor){const names=['奥伦一家','西蒙一家','平琪一家','快乐机器人之家','格蕾之家','加鲁德之家'];const offset=stableNumber(`${buildingId}:${floor}`)%names.length,neighbors=Array.from({length:buildingId===PLAYER_HOME_BUILDING_ID?3:4},(_,i)=>({id:`${buildingId}-neighbor-${i+1}`,label:names[(offset+i)%names.length],isPlayer:false,door:String.fromCharCode(65+i+(buildingId===PLAYER_HOME_BUILDING_ID?1:0))}));return buildingId===PLAYER_HOME_BUILDING_ID?[{id:'player-home',label:'我的家',isPlayer:true,door:'A'},...neighbors]:neighbors}
export function createTaxiCall(target,now=performance.now()){return{status:'approaching',target:{x:target.x,z:target.z},requestedAt:now,arrivedAt:null}}
export function updateTaxiCall(call,taxiPosition,now=performance.now()){
  if(!call||call.status!=='approaching')return call;
  return Math.hypot(taxiPosition.x-call.target.x,taxiPosition.z-call.target.z)<1.6?{...call,status:'arrived',arrivedAt:now}:call;
}
export function createPhoneState(value={}){return{apps:['taxi','wechat'],messages:value.messages||{},selectedContact:value.selectedContact||'fun-bot'}}
export function sendPhoneMessage(value,contact,text,from='player',time=Date.now()){
  const state=createPhoneState(value),thread=[...(state.messages[contact]||[]),{from,text,time}];
  return{...state,messages:{...state.messages,[contact]:thread},selectedContact:contact};
}
export function taxiDestinations(buildings=[]){return[{id:'village',label:'原版村',x:0,z:0},{id:'music',label:'音乐广场',x:-12,z:12},{id:'shop',label:'节拍商店',x:10,z:-8},{id:'city',label:'城市中心',x:0,z:78},...buildings.slice(0,12).map(b=>({id:b.id,label:b.label,x:b.x,z:b.z}))].map((item,index)=>({...item,seconds:12+(index%5)*5}))}
