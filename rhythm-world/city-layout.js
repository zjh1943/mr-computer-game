function hash(seed,index){let h=2166136261;for(const ch of`${seed}:${index}`){h^=ch.charCodeAt(0);h=Math.imul(h,16777619)}return(h>>>0)/4294967295}

export function createCityPlan(seed='city'){
  const roads=[
    {x:0,z:78,width:12,length:150,axis:'z'},
    {x:0,z:78,width:12,length:150,axis:'x'},
    {x:-38,z:78,width:9,length:150,axis:'z'},
    {x:38,z:78,width:9,length:150,axis:'z'},
    {x:0,z:40,width:9,length:150,axis:'x'},
    {x:0,z:116,width:9,length:150,axis:'x'}
  ];
  const buildings=[];let index=0;
  for(const z of[58,82,110,138])for(const x of[-60,-47,-25,-14,14,25,47,60]){
    const r=hash(seed,index++);buildings.push({x,z,width:8+r*3,depth:8+r*3,height:10+r*24,color:[0x5794ba,0xd48576,0x75aa8c,0xa982bc,0xc5a75a][index%5]});
  }
  const cars=Array.from({length:12},(_,i)=>({axis:i%2?'x':'z',lane:i%2?(i%4<2?74:82):(i%4<2?-3:3),offset:i/12,speed:7+(i%4)*1.6,color:[0xf05252,0x4aa9e8,0xffd34e,0xeeeeee][i%4]}));
  const pedestrians=Array.from({length:14},(_,i)=>({axis:i%2?'x':'z',lane:i%2?(i%4<2?68:88):(i%4<2?-10:10),offset:i/14,speed:1.1+(i%3)*.25,character:['oren','raddy','gray','pinki','simon','sky','wenda'][i%7]}));
  return{roads,buildings,cars,pedestrians,center:{x:0,z:78}};
}

export function trafficPosition(car,time){const distance=((car.offset*150+time*.001*car.speed)%150)-75;return car.axis==='x'?{x:distance,z:car.lane}:{x:car.lane,z:78+distance}}
