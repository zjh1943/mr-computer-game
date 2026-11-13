const mix=(a,b,t)=>Math.round(a+(b-a)*t);
const color=(a,b,t)=>{const ar=(a>>16)&255,ag=(a>>8)&255,ab=a&255,br=(b>>16)&255,bg=(b>>8)&255,bb=b&255;return(mix(ar,br,t)<<16)|(mix(ag,bg,t)<<8)|mix(ab,bb,t)};

export function getSkyLighting(day){
  if(day.isNight)return{sky:0x101735,fog:0x182246,sunIntensity:.28,hemiIntensity:.38,exposure:.62};
  const altitude=Math.max(0,Math.sin(Math.PI*day.travel));
  const edge=Math.min(1,altitude*3.2);
  return{sky:color(0xf08a68,0x82cef2,edge),fog:color(0xd58270,0x91d7f2,edge),sunIntensity:.75+altitude*3.5,hemiIntensity:.65+altitude*1.65,exposure:.78+altitude*.28};
}
