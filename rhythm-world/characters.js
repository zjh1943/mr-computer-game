export const CHARACTER_FEATURES={
  oren:['antennae','headphones'],raddy:['fiveSpikes'],clukr:['cymbal','hookAntennae'],
  'fun-bot':['robot','visor','antennae'],vineria:['vineHair'],gray:['catEars'],brud:['bucket'],
  garnold:['goldSuit','visor'],owakcx:['messyTufts'],pinki:['bunnyEars','bow'],
  simon:['antennae','horns','tuft','slimBody'],sky:['bearEars'],durple:['dragonHorns','fins'],
  'mr-sun':['sunRays','celestialOnly'],'mr-tree':['treeCrown'],wenda:['catEars','cheekFur'],jevin:['hood'],
  black:['topHat','tie'],'mr-fun-computer':['computerScreen','plugHands']
};
export const CHARACTERS=[['oren','奥伦','#f58236'],['raddy','拉迪','#db3340'],['clukr','克鲁克','#c6cbd3'],['fun-bot','快乐机器人','#bfc5ce'],['vineria','维内利亚','#59a85d'],['gray','小灰人','#8b8f99'],['brud','布鲁德','#9b6a45'],['garnold','加诺德','#d9b433'],['owakcx','欧瓦克斯','#8ecb55'],['pinki','平琪','#f58db4'],['simon','西蒙','#f4df49'],['sky','小天','#71bfea'],['durple','德普','#7452a4'],['mr-sun','太阳公公','#ffc83d'],['mr-tree','树先生','#6e9b42'],['wenda','温达','#eee'],['jevin','杰文','#406aa8'],['black','布莱克','#202128'],['mr-fun-computer','电脑先生','#9ec8c7']].map(([id,name,color])=>({id,name,color,features:CHARACTER_FEATURES[id]||[]}));
export const characterById=id=>CHARACTERS.find(c=>c.id===id)||CHARACTERS[5];
const line=(ctx,x1,y1,x2,y2,w=5)=>{ctx.lineWidth=w;ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke()};
const poly=(ctx,pts,fill=true)=>{ctx.beginPath();pts.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();fill&&ctx.fill();ctx.stroke()};
export function drawFloatingHands(ctx,time=0){const sway=Math.sin(time*.006)*3;ctx.fillStyle=ctx._color;ctx.strokeStyle='#29243b';ctx.lineWidth=4;for(const side of[-1,1]){ctx.beginPath();ctx.arc(side*42,8+sway*side,10,0,7);ctx.fill();ctx.stroke()}}
export function drawPlugHands(ctx,time=0){ctx.strokeStyle='#26313d';ctx.lineWidth=6;for(const side of[-1,1]){const y=8+Math.sin(time*.006+side)*4;ctx.beginPath();ctx.moveTo(side*29,5);ctx.quadraticCurveTo(side*43,15,side*50,y);ctx.stroke();ctx.fillStyle='#d8e3df';ctx.fillRect(side>0?46:-59,y-8,13,17);ctx.strokeRect(side>0?46:-59,y-8,13,17);ctx.lineWidth=3;line(ctx,side>0?58:-59,y-4,side>0?65:-66,y-4,3);line(ctx,side>0?58:-59,y+4,side>0?65:-66,y+4,3);ctx.lineWidth=6}}
function antenna(ctx,x,lean=0,ball=true){ctx.strokeStyle='#29243b';line(ctx,x,-42,x+lean,-72,4);if(ball){ctx.fillStyle=ctx._color;ctx.beginPath();ctx.arc(x+lean,-75,7,0,7);ctx.fill();ctx.stroke()}}
export function drawAccessory(ctx,feature,id){ctx.strokeStyle='#29243b';ctx.lineWidth=5;ctx.fillStyle=ctx._color;
  if(feature==='antennae'){antenna(ctx,-15,-4);antenna(ctx,15,4)}
  if(feature==='headphones'){ctx.fillStyle='#343449';ctx.beginPath();ctx.arc(0,-27,34,Math.PI,0);ctx.stroke();ctx.fillRect(-40,-30,13,30);ctx.fillRect(27,-30,13,30)}
  if(feature==='fiveSpikes')poly(ctx,[[-30,-34],[-35,-64],[-17,-48],[-9,-75],[0,-49],[13,-72],[17,-46],[37,-60],[29,-29]])
  if(feature==='cymbal'){ctx.fillStyle='#cfd5db';ctx.beginPath();ctx.ellipse(0,-53,43,10,0,0,7);ctx.fill();ctx.stroke();ctx.fillStyle='#71777e';ctx.fillRect(-4,-83,8,31)}
  if(feature==='hookAntennae'){ctx.beginPath();ctx.moveTo(-16,-53);ctx.quadraticCurveTo(-40,-80,-29,-92);ctx.moveTo(16,-53);ctx.quadraticCurveTo(40,-80,29,-92);ctx.stroke()}
  if(feature==='vineHair'){ctx.strokeStyle='#306f40';ctx.lineWidth=9;for(let i=-3;i<=3;i++){ctx.beginPath();ctx.moveTo(i*8,-35);ctx.quadraticCurveTo(i*15,-78+(i%2)*8,i*18,-98+(i%3)*9);ctx.stroke();ctx.fillStyle='#73c66e';ctx.beginPath();ctx.ellipse(i*18,-96+(i%3)*9,10,5,i*.2,0,7);ctx.fill()}}
  if(feature==='bucket'){ctx.fillStyle='#9aa1a6';ctx.beginPath();ctx.moveTo(-30,-42);ctx.lineTo(-24,-83);ctx.lineTo(27,-83);ctx.lineTo(31,-42);ctx.closePath();ctx.fill();ctx.stroke();ctx.strokeStyle='#586068';line(ctx,-25,-70,27,-70,4)}
  if(feature==='bearEars'){for(const x of[-27,27]){ctx.beginPath();ctx.arc(x,-43,15,0,7);ctx.fill();ctx.stroke();ctx.fillStyle='#d8f4ff';ctx.beginPath();ctx.arc(x,-43,7,0,7);ctx.fill();ctx.fillStyle=ctx._color}}
  if(feature==='bunnyEars'){for(const x of[-17,17]){ctx.beginPath();ctx.ellipse(x,-76,12,38,x*.006,0,7);ctx.fill();ctx.stroke();ctx.fillStyle='#ffbdd6';ctx.beginPath();ctx.ellipse(x,-76,5,25,x*.006,0,7);ctx.fill();ctx.fillStyle=ctx._color}}
  if(feature==='bow'){ctx.fillStyle='#ff4f8a';ctx.beginPath();ctx.ellipse(27,-48,15,10,-.35,0,7);ctx.ellipse(49,-52,15,10,.35,0,7);ctx.fill();ctx.stroke();ctx.beginPath();ctx.arc(38,-50,7,0,7);ctx.fill()}
  if(feature==='horns'){poly(ctx,[[-31,-32],[-49,-57],[-26,-50]]);poly(ctx,[[31,-32],[49,-57],[26,-50]])}
  if(feature==='tuft'){poly(ctx,[[-10,-43],[-4,-72],[4,-51],[17,-68],[14,-40]])}
  if(feature==='dragonHorns'){ctx.fillStyle='#e9ddff';poly(ctx,[[-25,-40],[-39,-73],[-14,-50]]);poly(ctx,[[25,-40],[39,-73],[14,-50]])}
  if(feature==='fins'){ctx.fillStyle='#9e84c9';poly(ctx,[[-30,-10],[-55,5],[-31,19]]);poly(ctx,[[30,-10],[55,5],[31,19]])}
  if(feature==='catEars'){poly(ctx,[[-28,-36],[-23,-68],[-4,-43]]);poly(ctx,[[28,-36],[23,-68],[4,-43]])}
  if(feature==='cheekFur'){poly(ctx,[[-26,-7],[-46,0],[-29,10],[-44,20],[-18,21]]);poly(ctx,[[26,-7],[46,0],[29,10],[44,20],[18,21]])}
  if(feature==='hood'){ctx.fillStyle='#263f78';ctx.beginPath();ctx.arc(0,-8,42,0,7);ctx.fill();ctx.stroke();ctx.fillStyle=ctx._color;ctx.beginPath();ctx.arc(0,-8,29,0,7);ctx.fill()}
  if(feature==='topHat'){ctx.fillStyle='#11131c';ctx.fillRect(-26,-84,52,48);ctx.fillRect(-39,-42,78,12);ctx.strokeRect(-26,-84,52,48)}
  if(feature==='tie'){ctx.fillStyle='#f4f4f4';poly(ctx,[[-8,28],[8,28],[5,39],[12,61],[0,72],[-12,61],[-5,39]])}
  if(feature==='computerScreen'){ctx.fillStyle='#667b83';ctx.beginPath();ctx.roundRect(-38,-47,76,72,11);ctx.fill();ctx.stroke();ctx.fillStyle='#bff7e9';ctx.fillRect(-28,-35,56,42);ctx.fillStyle='#26313d';ctx.beginPath();ctx.arc(-10,-18,4,0,7);ctx.arc(10,-18,4,0,7);ctx.fill();ctx.beginPath();ctx.arc(0,-7,11,0,Math.PI);ctx.stroke();ctx.fillStyle='#667b83';ctx.fillRect(-11,24,22,13);ctx.fillRect(-25,35,50,8)}
  if(feature==='visor'){ctx.fillStyle='#2d3548';ctx.beginPath();ctx.roundRect(-28,-27,56,30,10);ctx.fill();ctx.stroke();ctx.fillStyle='#6ffff0';ctx.fillRect(-15,-16,9,7);ctx.fillRect(7,-16,9,7)}
  if(feature==='goldSuit'){ctx.strokeStyle='#f8d662';ctx.lineWidth=8;ctx.strokeRect(-34,-39,68,91)}
  if(feature==='sunRays'){ctx.strokeStyle='#f1a625';for(let a=0;a<6.3;a+=Math.PI/6)line(ctx,Math.cos(a)*34,Math.sin(a)*34-8,Math.cos(a)*52,Math.sin(a)*52-8,6)}
  if(feature==='treeCrown'){ctx.fillStyle='#367840';for(const[x,y,r]of[[-23,-39,24],[0,-56,30],[25,-37,24],[-4,-25,34]]){ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.fill();ctx.stroke()}}
  if(feature==='messyTufts'){for(let i=-3;i<=3;i++)poly(ctx,[[i*9-8,-40],[i*9,-70-Math.abs(i)*3],[i*9+8,-40]])}
}
export function drawCharacter(ctx,id,x,y,scale=1,state='idle',time=0){const c=characterById(id),walk=state==='walk',bob=Math.sin(time*.006+(x+y))*(walk?5:2),slim=c.features.includes('slimBody');ctx.save();ctx.translate(x,y+bob);ctx.scale(scale,scale);ctx._color=c.color;ctx.fillStyle='#0003';ctx.beginPath();ctx.ellipse(0,48,slim?23:31,9,0,0,7);ctx.fill();ctx.fillStyle=c.color;ctx.strokeStyle='#29243b';ctx.lineWidth=5;ctx.beginPath();ctx.roundRect(slim?-23:-32,-42,slim?46:64,86,slim?22:30);ctx.fill();ctx.stroke();if(c.features.includes('plugHands'))drawPlugHands(ctx,time);else if(!c.features.includes('celestialOnly'))drawFloatingHands(ctx,time);for(const feature of c.features)drawAccessory(ctx,feature,id);if(id!=='fun-bot'&&id!=='mr-fun-computer'&&!c.features.includes('visor')){ctx.fillStyle='#fff';ctx.beginPath();ctx.ellipse(-11,-15,8,10,0,0,7);ctx.ellipse(11,-15,8,10,0,0,7);ctx.fill();ctx.fillStyle='#222';ctx.beginPath();ctx.arc(-9,-14,3,0,7);ctx.arc(9,-14,3,0,7);ctx.fill();ctx.strokeStyle='#222';ctx.lineWidth=3;ctx.beginPath();ctx.arc(0,2,10,0,Math.PI);ctx.stroke()}ctx.restore()}
