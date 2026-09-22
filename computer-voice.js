/* Continuous conversation lifecycle, separated from microphone/browser UI for testing. */
(() => {
  function create(options){
    const now=options.now||Date.now,schedule=options.setTimeout||setTimeout,cancel=options.clearTimeout||clearTimeout;
    let enabled=false,recognizer=null,retry=null,watch=null,settle=null,parts=[],phase='listen',deadline=0,replyStarted=0;
    const text=()=>parts.map(p=>p?.text||'').join(' ').trim();
    function release(){const previous=recognizer;recognizer=null;if(!previous)return;for(const event of ['onstart','onresult','onerror','onend','onspeechstart'])previous[event]=null;try{previous.abort();}catch{}}
    function stop(){enabled=false;cancel(retry);cancel(watch);cancel(settle);retry=watch=settle=null;release();parts=[];}
    function endSilence(){stop();options.onSilence();}
    function later(delay=450){cancel(retry);if(enabled)retry=schedule(listen,delay);}
    function submit(){
      cancel(settle);const message=text();if(!enabled||!message)return;
      parts=[];phase='reply';replyStarted=now();release();options.onStatus('正在回答…');
      try{options.answer(message);}catch{options.onStatus('这次回答没能完成，请再说一次。');}
    }
    function listen(){
      if(!enabled)return;if(!options.active()){stop();return;}
      if(phase!=='listen'||recognizer)return;
      if(options.busy()){later(300);return;}
      let r;try{r=new options.Recognition();}catch{later(1000);return;}
      recognizer=r;parts=[];r.lang='zh-CN';r.continuous=true;r.interimResults=true;
      const current=()=>enabled&&recognizer===r;
      r.onstart=()=>{if(current())options.onStatus('正在听你说话…');};
      r.onspeechstart=()=>{if(current())deadline=now()+30000;};
      r.onresult=event=>{
        if(!current())return;
        for(let i=event.resultIndex||0;i<event.results.length;i++){const item=event.results[i];parts[i]={text:item[0]?.transcript?.trim()||'',final:item.isFinal};}
        if(!text())return;deadline=now()+30000;options.activity?.();options.onStatus('听到：'+text());
        cancel(settle);settle=schedule(submit,parts.some(p=>p&&!p.final)?2500:1800);
      };
      r.onend=()=>{if(!current())return;release();if(text())submit();else later();};
      r.onerror=event=>{
        if(!current())return;
        if(['not-allowed','service-not-allowed','audio-capture'].includes(event.error)){
          stop();options.onUnavailable('麦克风未开启，请允许麦克风后再进入全屏聊天。');return;
        }
        release();if(text())submit();else later(event.error==='network'?1200:450);
      };
      try{r.start();}catch{release();later(700);}
    }
    function tick(){
      if(!enabled)return;if(!options.active()){stop();return;}options.activity?.();
      if(phase==='reply'){
        if(now()-replyStarted>=1500&&(!options.busy()||now()-replyStarted>=45000)){
          if(options.busy())options.cancelSpeech?.();phase='listen';deadline=now()+30000;listen();
        }
      }else if(now()>=deadline){if(text())submit();else{endSilence();return;}}
      if(enabled)watch=schedule(tick,250);
    }
    function start(){stop();enabled=true;phase='listen';deadline=now()+30000;listen();if(enabled)watch=schedule(tick,250);}
    return {start,stop,isEnabled:()=>enabled};
  }
  if(typeof module!=='undefined')module.exports={create};else window.ComputerVoice={create};
})();
