import * as THREE from './vendor/three.module.min.js';
import { createCharacter3D, setCharacterSpeech } from './character-3d.js';
import { SUN_FAREWELL } from './concert-rules.js';
import { getCelestialArcPosition } from './celestial-path.js';
import { getSkyLighting } from './sky-lighting.js';

export function createSky3D(scene,{onFarewell=()=>{}}={}) {
  const hemi=new THREE.HemisphereLight(0xbfe9ff,0x4f743d,2.2); scene.add(hemi);
  const sunLight=new THREE.DirectionalLight(0xfff1c6,3.4); sunLight.castShadow=true; sunLight.shadow.mapSize.set(2048,2048);sunLight.shadow.camera.left=-70;sunLight.shadow.camera.right=70;sunLight.shadow.camera.top=70;sunLight.shadow.camera.bottom=-70;sunLight.shadow.camera.near=.5;sunLight.shadow.camera.far=240;sunLight.shadow.bias=-.0004;scene.add(sunLight,sunLight.target);
  const sun=createCharacter3D('mr-sun',{scale:3.1}); sun.name='sun'; sun.renderOrder=4; sun.traverse(object=>{if(object.material){object.material.depthTest=true;object.material.depthWrite=false;object.renderOrder=4}}); scene.add(sun);
  const moon=new THREE.Mesh(new THREE.SphereGeometry(1.6,24,16),new THREE.MeshBasicMaterial({color:0xfff3bd})); moon.name='moon'; scene.add(moon);
  const worldPosition=new THREE.Vector3(); let farewell=false;
  function update(day,camera,time=0){
    const position=getCelestialArcPosition(day);
    const lighting=getSkyLighting(day);
    if(camera){if(sun.parent!==camera){camera.add(sun,moon);scene.add(camera)}sun.position.set(position.x,position.y,position.z);moon.position.set(position.x,position.y,position.z)}
    if(day.celestial==='sun'){sun.visible=true;moon.visible=false;sun.rotation.z=Math.sin(time*.0012)*.09;const sway=3.1+Math.sin(time*.0018)*.08;sun.scale.setScalar(sway);sun.getWorldPosition(worldPosition);sunLight.position.copy(worldPosition);if(day.farewell&&!farewell){farewell=true;setCharacterSpeech(sun,SUN_FAREWELL,5200);onFarewell(SUN_FAREWELL)}}else{sun.visible=false;moon.visible=true;moon.getWorldPosition(worldPosition);sunLight.position.copy(worldPosition);farewell=false}
    if(camera){sunLight.target.position.set(camera.position.x,0,camera.position.z-12);sunLight.target.updateMatrixWorld()}
    sunLight.intensity=lighting.sunIntensity;hemi.intensity=lighting.hemiIntensity;scene.background.set(lighting.sky);scene.fog.color.set(lighting.fog)
  }
  return{sun,moon,update,dispose(){scene.remove(hemi,sunLight,sun,moon);moon.geometry.dispose();moon.material.dispose()}}
}
