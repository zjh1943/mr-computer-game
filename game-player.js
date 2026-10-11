/* Each standalone HTML declares just one game; engines load after entering that page. */
(async()=>{
const host=document.querySelector('#standalone-game'),id=document.body.dataset.game;
const load=src=>new Promise((resolve,reject)=>{const s=document.createElement('script');s.src='/'+src;s.onload=resolve;s.onerror=()=>{s.remove();reject(Error('文件加载失败：'+src));};document.head.append(s);});
window.ComputerExperience={fullscreen:()=>host.requestFullscreen?.(),isDamaged:()=>false};
try{
if(['snake','merge2048','tictactoe'].includes(id)){await load('arcade-games.js');window.ArcadeGames.mount(id,host);}
else if(id==='minecraft3d'){
for(const file of ['game-runtime.js','voxel-rules.js','voxel-terrain.js','voxel-workstations.js','voxel-audio.js','voxel-survival.js','voxel-shell.js','voxel-world.js'])await load(file);
window.VoxelWorld.mount(host);
}else{
await load('game-runtime.js');await load('arcade-games.js');
if(id==='dance')for(const file of ['dance-cast.js','source-performance-data.js','dance-reference-data.js','dance-reference.js','dance-music.js'])await load(file);
await load('computer-apps.js');window.ComputerApps.mount(id,host);
}
document.querySelector('#entry-loading').remove();
}catch(error){const status=document.querySelector('#entry-loading');status.textContent=error.message+'，请刷新重试。';status.setAttribute('role','alert');}
})();
