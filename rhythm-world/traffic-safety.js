export function applyTrafficImpact(state,{now=performance.now(),speed=0}={}){
  if(now-(state.lastImpactAt??-Infinity)<1800)return{...state,injured:false};
  const damage=Math.max(8,Math.min(35,Math.round(6+speed*2)));
  return{health:Math.max(0,(state.health??100)-damage),lastImpactAt:now,injured:true};
}
