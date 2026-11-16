const HUNGER_DRAIN_PER_SECOND=.15;
const STARVATION_DAMAGE_PER_SECOND=2;

export function advanceSurvival(value,seconds){
  const hunger=Math.max(0,(value.hunger??100)-Math.max(0,seconds)*HUNGER_DRAIN_PER_SECOND);
  const health=Math.max(0,(value.health??100)-(hunger<=0?Math.max(0,seconds)*STARVATION_DAMAGE_PER_SECOND:0));
  return{hunger:Number(hunger.toFixed(2)),health:Number(health.toFixed(2)),died:health<=0};
}
export function eatMeal(value){return{hunger:Math.min(100,(value.hunger??100)+40),health:Math.min(100,(value.health??100)+8)}}
export function sleepInBed(value){return{hunger:Math.min(100,(value.hunger??100)+20),health:100}}
