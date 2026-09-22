const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync('voxel-world.js','utf8');
const handler=source.match(/canvas\.onpointermove=e=>\{([^\n]+)\};/)[1];
const scope={canvas:{},document:{pointerLockElement:null},drag:{x:100,y:100},holdingMine:true,moved:true,mining:{time:.8},cracks:{visible:true},holdTimer:1,touchAim:{},yaw:0,pitch:0,clearTimeout(){}};
vm.createContext(scope);vm.runInContext('move=e=>{'+handler+'}',scope);
scope.move({clientX:103,clientY:102});assert.equal(scope.mining.time,.8,'Small touch jitter must preserve mining progress');assert.equal(scope.holdingMine,true);
scope.move({clientX:125,clientY:100});assert.equal(scope.mining,null);assert.equal(scope.holdingMine,false);assert(scope.yaw<0,'Deliberate drag must turn the camera');
console.log('Touch mining tolerates jitter and deliberate dragging cancels mining to turn.');
