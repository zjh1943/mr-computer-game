const fs=require('fs'),assert=require('assert');
const read=p=>fs.readFileSync(p,'utf8');
assert.ok(fs.existsSync('rhythm-world/vendor/three.module.min.js'),'local Three.js runtime is required');
assert.ok(fs.existsSync('rhythm-world/vendor/three.core.min.js'),'local Three.js core runtime is required');
const scene=read('rhythm-world/scene-3d.js'),support=read('rhythm-world/webgl-support.js'),html=read('rhythm-world.html');
for(const token of['PerspectiveCamera','WebGLRenderer','ResizeObserver','webglcontextlost','createScene3D','dispose'])assert.ok(scene.includes(token),`scene runtime missing ${token}`);
assert.ok(support.includes('getWebGLSupport'),'WebGL support probe missing');
assert.ok(html.includes('webglFallback'),'WebGL fallback panel missing');
console.log('3D runtime verification passed.');
