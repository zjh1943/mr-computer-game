import * as THREE from './vendor/three.module.min.js';
import { createCharacter3D, setCharacterSpeech } from './character-3d.js';
import { SUN_FAREWELL } from './concert-rules.js';

export function createSky3D(scene,{onFarewell=()=>{}}={}) {
  const hemi=new THREE.HemisphereLight(0xbfe9ff,0x4f743d,2.2); scene.add(hemi);
  const sunLight=new THREE.DirectionalLight(0xfff1c6,3.4); sunLight.castShadow=true; sunLight.shadow.mapSize.set(1024,1024); scene.add(sunLight);
  const sun=createCharacter3D('mr-sun',{scale:3.1}); sun.name='sun'; sun.renderOrder=20; sun.traverse(object=>{if(object.material){object.material.depthTest=false;object.material.depthWrite=false;object.renderOrder=20}}); scene.add(sun);
  const moon=new THREE.Mesh(new THREE.SphereGeometry(1.6,24,16),new THREE.MeshBasicMaterial({color:0xfff3bd})); moon.name='moon'; scene.add(moon);
  const worldPosition=new THREE.Vector3(); let farewell=false;
  function update(day,camera,time=0){
    const a=day.travel*Math.PI,side=(day.travel-.5)*24,lift=5+Math.sin(a)*4;
    if(camera){if(sun.parent!==camera){camera.add(sun,moon);scene.add(camera)}sun.position.set(side,lift,-35);moon.position.set(side,lift,-35)}
    if(day.celestial==='sun'){sun.visible=true;moon.visible=false;sun.rotation.z=Math.sin(time*.0012)*.09;const sway=3.1+Math.sin(time*.0018)*.08;sun.scale.setScalar(sway);sun.getWorldPosition(worldPosition);sunLight.position.copy(worldPosition);sunLight.intensity=3.4;hemi.intensity=2.1;if(day.farewell&&!farewell){farewell=true;setCharacterSpeech(sun,SUN_FAREWELL,5200);onFarewell(SUN_FAREWELL)}}else{sun.visible=false;moon.visible=true;moon.getWorldPosition(worldPosition);sunLight.position.copy(worldPosition);sunLight.intensity=.55;hemi.intensity=.7;farewell=false}
    scene.background.set(day.isNight?0x111b42:0x91d7f2);scene.fog.color.copy(scene.background)
  }
  return{sun,moon,update,dispose(){scene.remove(hemi,sunLight,sun,moon);moon.geometry.dispose();moon.material.dispose()}}
}
