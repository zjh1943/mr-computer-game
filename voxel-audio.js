/* Short synthesized effects, unlocked by a user gesture, with bounded voices. */
(() => {
  function create(host){
    let context=null,enabled=true,closed=false,active=0;
    const label=document.createElement('button');label.textContent='声音：点击开启';label.type='button';label.className='voxel-audio-toggle';host.querySelector('.voxel-top').append(label);
    async function unlock(){if(closed||!enabled)return;try{context??=new(window.AudioContext||window.webkitAudioContext)();await context.resume();if(!closed)label.textContent='声音：开';}catch{label.textContent='声音未开启，点击重试';}}
    const gesture=event=>{if(event.target===label)return;if(!context||context.state==='suspended')unlock();};host.addEventListener('pointerdown',gesture);host.addEventListener('keydown',gesture);
    label.onclick=async()=>{if(!context||context.state!=='running'){enabled=true;await unlock();play('place');return;}enabled=!enabled;label.textContent=enabled?'声音：开':'声音：关';};
    function play(kind,volume=1){if(closed||!enabled||context?.state!=='running'||active>=6||document.hidden)return;const now=context.currentTime;
      const specs={step:[105,.09,'triangle'],dig:[68,.14,'sawtooth'],place:[180,.1,'triangle'],hit:[85,.18,'sawtooth'],sheep:[380,.45,'triangle'],pig:[155,.28,'triangle'],monster:[60,.35,'sawtooth']};const [frequency,length,wave]=specs[kind]||specs.step;
      const osc=context.createOscillator(),gain=context.createGain();osc.type=wave;osc.frequency.setValueAtTime(frequency,now);osc.frequency.exponentialRampToValueAtTime(frequency*(kind==='sheep'?1.4:.5),now+length);gain.gain.setValueAtTime(.045*volume,now);gain.gain.exponentialRampToValueAtTime(.001,now+length);osc.connect(gain).connect(context.destination);active++;osc.onended=()=>{active--;osc.disconnect();gain.disconnect();};osc.start(now);osc.stop(now+length);
    }
    return {play,dispose(){closed=true;host.removeEventListener('pointerdown',gesture);host.removeEventListener('keydown',gesture);if(context)context.close().catch(()=>{});label.remove();}};
  }
  window.VoxelAudio={create};
})();
