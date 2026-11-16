function pointsAlong(start,end,step=1.05){const length=Math.abs(end-start),count=Math.max(1,Math.ceil(length/step));return Array.from({length:count+1},(_,i)=>start+(end-start)*i/count)}

export function buildingWallColliders(building,radius=.42){
  const halfW=building.width/2,halfD=building.depth/2,front=building.entrance?.side==='south'?-1:1,doorHalf=1.35,colliders=[];
  for(const x of pointsAlong(-halfW,halfW)){
    colliders.push({x:building.x+x,z:building.z-front*halfD,radius});
    if(Math.abs(x)>doorHalf)colliders.push({x:building.x+x,z:building.z+front*halfD,radius});
  }
  for(const z of pointsAlong(-halfD,halfD)){colliders.push({x:building.x-halfW,z:building.z+z,radius},{x:building.x+halfW,z:building.z+z,radius})}
  return colliders;
}
