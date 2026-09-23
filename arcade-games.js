/* Complete browser games. No remote players, downloads, libraries or accounts. */
(() => {
  function slide(line){const values=line.filter(Boolean),out=[];let score=0;for(let i=0;i<values.length;i++){if(values[i]===values[i+1]){out.push(values[i]*2);score+=values[i]*2;i++;}else out.push(values[i]);}while(out.length<4)out.push(0);return {line:out,score};}
  function move2048(board,direction){const next=board.slice();let score=0;for(let n=0;n<4;n++){const ids=Array.from({length:4},(_,i)=>direction===0?n*4+i:direction===1?i*4+n:direction===2?n*4+3-i:(3-i)*4+n);const moved=slide(ids.map(i=>board[i]));score+=moved.score;ids.forEach((id,i)=>next[id]=moved.line[i]);}return {board:next,score,changed:next.some((v,i)=>v!==board[i])};}
  function winner(b){for(const [a,c,d] of [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]])if(b[a]&&b[a]===b[c]&&b[a]===b[d])return b[a];return b.every(Boolean)?'draw':null;}
  const catalog={snake:['蛇','贪吃蛇'],merge2048:['数','2048'],tictactoe:['棋','双人井字棋']};
  function mount(id,host){
    host.classList.add('arcade-app');const title=document.createElement('h2');title.textContent=catalog[id][1];host.append(title);
    const info=document.createElement('p');info.setAttribute('role','status');host.append(info);
    const board=document.createElement('div');board.className='arcade-board';host.append(board);
    const controls=document.createElement('div');controls.className='arcade-controls';host.append(controls);
    const button=(label,fn)=>{const b=document.createElement('button');b.type='button';b.textContent=label;b.onclick=fn;controls.append(b);return b;};
    const expand=button('全屏游戏',()=>window.ComputerExperience?.fullscreen());expand.className='arcade-expand';
    let timer=0,dead=false,key=()=>{};
    if(id==='tictactoe'){
      let cells,turn,ended;board.classList.add('tic-board');
      const paint=()=>{board.replaceChildren();cells.forEach((v,i)=>{const b=document.createElement('button');b.textContent=v||'·';b.setAttribute('aria-label',`第 ${i+1} 格 ${v||'空'}`);b.disabled=ended||!!v;b.onclick=()=>{cells[i]=turn;const result=winner(cells);ended=!!result;info.textContent=result==='draw'?'平局！':result?`${result} 获胜！`:`轮到 ${turn==='X'?'O':'X'}`;turn=turn==='X'?'O':'X';paint();};board.append(b);});};
      const start=()=>{cells=Array(9).fill('');turn='X';ended=false;info.textContent='两个人轮流点格子，先连成三个获胜。轮到 X';paint();};button('重新开始',start);start();
    }else if(id==='merge2048'){
      let cells,score;board.classList.add('merge-board');
      const spawn=()=>{const empty=cells.flatMap((v,i)=>v?[]:[i]);if(empty.length)cells[empty[Math.floor(Math.random()*empty.length)]]=Math.random()<.9?2:4;};
      const paint=()=>{board.replaceChildren();cells.forEach(v=>{const tile=document.createElement('div');tile.className='merge-tile';tile.textContent=v||'';tile.style.background=v?`hsl(${Math.max(15,55-Math.log2(v)*4)} 85% ${Math.max(40,90-Math.log2(v)*4)}%)`:'#cad1dc';board.append(tile);});info.textContent=`得分 ${score} · 方向键或按钮合并相同数字${cells.includes(2048)?' · 达成 2048！可继续挑战':''}`;if([0,1,2,3].every(d=>!move2048(cells,d).changed))info.textContent+=' · 没有可移动的格子了';};
      const move=d=>{const result=move2048(cells,d);if(result.changed){cells=result.board;score+=result.score;spawn();paint();}};
      ['←','↑','→','↓'].forEach((label,d)=>button(label,()=>move(d)));button('重新开始',()=>{cells=Array(16).fill(0);score=0;spawn();spawn();paint();}).click();
      key=e=>{const d=['ArrowLeft','ArrowUp','ArrowRight','ArrowDown'].indexOf(e.key);if(d>=0){e.preventDefault();move(d);}};
    }else if(id==='snake'){
      const canvas=document.createElement('canvas');canvas.width=canvas.height=400;canvas.setAttribute('aria-label','贪吃蛇棋盘');board.append(canvas);board.classList.add('snake-board');const g=canvas.getContext('2d');
      let snake,food,dir,pending,score,playing=false,over=false;
      const draw=()=>{g.fillStyle='#122d36';g.fillRect(0,0,400,400);g.fillStyle='#ffb14b';if(food)g.fillRect(food.x*20+2,food.y*20+2,16,16);snake.forEach((s,i)=>{g.fillStyle=i?'#83dc82':'#d2ffa5';g.fillRect(s.x*20+1,s.y*20+1,18,18);});};
      const place=()=>{const empty=[];for(let y=0;y<20;y++)for(let x=0;x<20;x++)if(!snake.some(s=>s.x===x&&s.y===y))empty.push({x,y});food=empty[Math.floor(Math.random()*empty.length)];if(!food){playing=false;over=true;info.textContent='填满棋盘，你赢了！';}};
      const update=()=>{if(!playing||dead)return;dir=pending;const h={x:snake[0].x+dir[0],y:snake[0].y+dir[1]},eat=h.x===food.x&&h.y===food.y;const body=eat?snake:snake.slice(0,-1);if(h.x<0||h.x>=20||h.y<0||h.y>=20||body.some(s=>s.x===h.x&&s.y===h.y)){playing=false;over=true;info.textContent=`游戏结束 · 得分 ${score} · 点重新开始再来一次`;return;}snake.unshift(h);if(eat){score+=10;place();}else snake.pop();if(!over)info.textContent=`得分 ${score} · 吃橙色食物，避开墙和身体`;draw();};
      const steer=d=>{if(d[0]!==-dir[0]||d[1]!==-dir[1])pending=d;};
      const directions=[[-1,0],[0,-1],[1,0],[0,1]];['←','↑','→','↓'].forEach((label,i)=>button(label,()=>steer(directions[i])));
      const pause=button('开始 / 暂停',()=>{if(over)return;playing=!playing;info.textContent=playing?`得分 ${score} · 游戏进行中`:'已暂停，点开始继续';});
      button('重新开始',()=>{snake=[{x:8,y:10},{x:7,y:10},{x:6,y:10}];dir=pending=[1,0];score=0;playing=false;over=false;place();draw();info.textContent='方向键或按钮控制 · 点开始游戏';}).click();
      key=e=>{const d=['ArrowLeft','ArrowUp','ArrowRight','ArrowDown'].indexOf(e.key);if(d>=0){e.preventDefault();steer(directions[d]);}else if(e.code==='Space'&&e.target.tagName!=='BUTTON'){e.preventDefault();pause.click();}};
      timer=setInterval(update,150);
    }
    const listener=e=>{if(!/INPUT|TEXTAREA|SELECT/.test(e.target.tagName))key(e);};document.addEventListener('keydown',listener);
    return()=>{dead=true;clearInterval(timer);document.removeEventListener('keydown',listener);};
  }
  if(typeof module!=='undefined')module.exports={slide,move2048,winner,catalog};else window.ArcadeGames={catalog,mount};
})();
