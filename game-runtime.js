/* Shared in-page engine, waiting UI and persistent browser resource cache. */
(()=>{let engine;const three=()=>engine??=(import('./rhythm-world/vendor/three.module.min.js').catch(error=>{engine=null;throw error;}));
function loading(host,label){const box=document.createElement('div');box.className='game-loading';box.setAttribute('role','status');const face=document.createElement('div');face.className='loading-computer';face.textContent='● ● ▽';const message=document.createElement('p');message.textContent=label;box.append(face,message);host.append(box);return {close:()=>box.remove(),error:text=>{face.style.animation='none';message.textContent=text;}};}
window.GameRuntime={three,loading};
const ready=()=>{document.getElementById('game-boot')?.remove();if('serviceWorker' in navigator&&!['localhost','127.0.0.1'].includes(location.hostname))navigator.serviceWorker.register('./game-cache.js',{scope:'./',updateViaCache:'none'}).catch(()=>{});const warm=()=>three().catch(()=>{});if('requestIdleCallback' in window)requestIdleCallback(warm,{timeout:4000});else setTimeout(warm,1500);};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready,{once:true});else ready();
})();
