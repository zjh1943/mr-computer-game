function hash(seed,index){let h=2166136261;for(const ch of`${seed}:${index}`){h^=ch.charCodeAt(0);h=Math.imul(h,16777619)}return(h>>>0)/4294967295}

const ROUTES=[
  [{x:-70,z:40},{x:70,z:40},{x:70,z:116},{x:-70,z:116}],
  [{x:-38,z:8},{x:-38,z:148},{x:38,z:148},{x:38,z:8}],
  [{x:0,z:8},{x:70,z:8},{x:70,z:78},{x:0,z:78}]
];

export function getTrafficLightState(time,axis='x'){
  const phase=(time*.001)%18;
  if(axis==='x')return phase<7?'green':phase<9?'yellow':'red';
  return phase>=9&&phase<16?'green':phase>=16?'yellow':'red';
}

export function createCityPlan(seed='city'){
  const roads=[{x:0,z:78,width:12,length:150,axis:'z'},{x:0,z:78,width:12,length:150,axis:'x'},{x:-38,z:78,width:9,length:150,axis:'z'},{x:38,z:78,width:9,length:150,axis:'z'},{x:0,z:40,width:9,length:150,axis:'x'},{x:0,z:116,width:9,length:150,axis:'x'}];
  const buildings=[];let index=0;
  for(const z of[58,82,110,138])for(const x of[-60,-47,-25,-14,14,25,47,60]){const r=hash(seed,index++);buildings.push({id:`tower-${index}`,label:`${['节拍公寓','旋律大厦','和声中心','音符商场'][index%4]} ${index}`,x,z,width:8+r*3,depth:8+r*3,height:10+r*24,color:[0x5794ba,0xd48576,0x75aa8c,0xa982bc,0xc5a75a][index%5],entrance:{side:z<78?'south':'north'}})}
  const cars=Array.from({length:12},(_,i)=>({route:ROUTES[i%3],offset:i/12,speed:7+(i%4)*1.6,color:[0xf05252,0x4aa9e8,0xffd34e,0xeeeeee][i%4],driver:['oren','raddy','simon','pinki'][i%4]}));
  const pedestrians=Array.from({length:14},(_,i)=>({route:ROUTES[(i+1)%3],offset:i/14,speed:1.1+(i%3)*.25,character:['oren','raddy','gray','pinki','simon','sky','wenda'][i%7],mood:['happy','curious','calm','excited'][i%4]}));
  const signals=[{x:-5,z:35},{x:5,z:45},{x:-43,z:35},{x:-33,z:45},{x:33,z:111},{x:43,z:121}];
  return{roads,buildings,cars,pedestrians,signals,center:{x:0,z:78}};
}

function routeMetrics(route){const segments=route.map((a,i)=>{const b=route[(i+1)%route.length];return{a,b,length:Math.hypot(b.x-a.x,b.z-a.z)}});return{segments,total:segments.reduce((sum,s)=>sum+s.length,0)}}

export function trafficPose(vehicle,time){
  const route=vehicle.route||ROUTES[0],{segments,total}=routeMetrics(route);let distance=(vehicle.offset*total+time*.001*vehicle.speed)%total,segment=segments[0];
  for(const candidate of segments){segment=candidate;if(distance<=candidate.length)break;distance-=candidate.length}
  const t=Math.min(1,distance/segment.length),axis=Math.abs(segment.b.x-segment.a.x)>Math.abs(segment.b.z-segment.a.z)?'x':'z',state=getTrafficLightState(time,axis),held=t>.82&&state==='red',safeT=held?.82:t;
  return{x:segment.a.x+(segment.b.x-segment.a.x)*safeT,z:segment.a.z+(segment.b.z-segment.a.z)*safeT,heading:Math.atan2(segment.b.x-segment.a.x,segment.b.z-segment.a.z),stopped:held,signal:state};
}

export function trafficPosition(vehicle,time){const pose=trafficPose(vehicle,time);return{x:pose.x,z:pose.z}}
