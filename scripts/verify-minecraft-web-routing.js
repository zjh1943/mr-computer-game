const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const source = fs.readFileSync(require('node:path').join(__dirname,'../app.js'),'utf8');
const start = source.indexOf('function openComputerApp(app)');
const fn = source.slice(start,source.indexOf('\nfunction ',start+1));
for (const app of ['minecraft','blocks3d']) {
  const calls=[];
  const ctx={window:{ComputerExperience:{isDamaged:()=>false,leaveFullscreen(){},stopSoftware(){},fullscreen(){calls.push('full');}}},computerScreenMode:'desktop',currentComputerApp:'',computerFaceClose:{},computerAppWindow:{},setMinecraftPanelOpen(value){calls.push(['2d',value]);},showComputerAppWindow(id){calls.push(['app',id]);},saveGameState(){}};
  vm.createContext(ctx);vm.runInContext(fn+`;openComputerApp('${app}');`,ctx);
  if(app==='minecraft'){assert(calls.some(x=>Array.isArray(x)&&x[0]==='2d'&&x[1]));assert.equal(ctx.currentComputerApp,'minecraft');}
  else {assert(calls.some(x=>Array.isArray(x)&&x[1]==='blocks3d'));assert(calls.includes('full'));}
}
assert(!fs.readFileSync(require('node:path').join(__dirname,'../server.js'),'utf8').includes('/api/native/minecraft'));
console.log('2D opens existing web game; 3D opens in-page fullscreen; native launch route removed.');
