(()=>{
const loaded=new Map(),revision='20261015-friend-video1';
function load(src){if(!loaded.has(src))loaded.set(src,new Promise((resolve,reject)=>{const s=document.createElement('script');s.src='./'+src+'?v='+revision;s.onload=resolve;s.onerror=()=>{loaded.delete(src);s.remove();reject(Error('加载失败，请再试一次'));};document.head.append(s);}));return loaded.get(src);}
const groups={blocks3d:['voxel-rules.js','voxel-terrain.js','voxel-workstations.js','voxel-audio.js','voxel-survival.js','voxel-shell.js','voxel-world.js'],dance:['source-performance-data.js','dance-reference-data.js','dance-reference.js','dance-music.js'],music:['source-performance-data.js','dance-reference-data.js','dance-reference.js','dance-music.js']};
const original=openComputerApp;let request=0;
openComputerApp=async function(id){const token=++request;try{for(const file of groups[id]||[])await load(file);if(token!==request)return;original(id);if(id==='store'){
const note=document.createElement('p');note.textContent='安装小游戏到电脑桌面，或者从下面的独立入口打开完整游戏。';computerAppContent.append(note);
const links=document.createElement('div');links.className='computer-store-list';
for(const game of HomeData.games.filter(g=>g.id!=='computer')){const a=document.createElement('a');a.textContent='进入 '+game.name+' ↗';a.href=HomeData.gameUrl(game);a.target='_blank';a.rel='noopener noreferrer';a.style.cssText='display:block;padding:12px;background:#eef4e6;color:#36512b;border:1px solid #cdddbf;border-radius:8px;text-decoration:none';links.append(a);}computerAppContent.append(links);
}}catch(error){showSubtitle(error.message);}};
const entry=document.body.dataset.entry;
if(entry){openComputerApp(entry).then(()=>{if(entry==='minecraft')return;window.ComputerExperience?.fullscreen();});}
const home=document.createElement('a');home.href='https://zhumohan.com/';home.textContent='← 墨涵的个人主页';home.style.cssText='position:fixed;left:14px;top:12px;z-index:100000;background:#ffffffe8;padding:7px 12px;border-radius:6px;color:#31512b;text-decoration:none;font:12px sans-serif';document.body.append(home);
})();
