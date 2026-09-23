/* Browser applications share the game's screen, damage state and voice. */
(() => {
  const style = document.createElement('link');
  style.rel = 'stylesheet'; style.href = './computer-experience.css?v=20260923-fullscreen1'; document.head.append(style);
  let cleanup = () => {}, full = false, damaged = false, voice = null;
  let voiceEnabled = false, voiceTimer = null, replyingUntil = 0;
  const minecraftDock = { parent: minecraftPanel.parentElement, next: minecraftPanel.nextSibling };
  const read = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };
  const save = (key, data) => { try { localStorage.setItem(key, JSON.stringify(data)); return true; } catch { return false; } };
  function button(label, text, action) {
    const b = document.createElement('button'); b.type = 'button'; b.textContent = text;
    b.setAttribute('aria-label', label); b.title = label;
    b.addEventListener('pointerdown', event => event.stopPropagation());
    b.addEventListener('click', event => { event.stopPropagation(); action(event); }); return b;
  }
  const maximize = button('全屏软件', '□', () => full ? minimize() : fullscreen());
  maximize.className = 'computer-app-maximize';
  computerAppMinimize.setAttribute('aria-label', '缩回电脑先生屏幕');
  computerAppMinimize.after(maximize);
  const chatTools = document.createElement('div'); chatTools.className = 'chat-window-tools';
  chatTools.append(button('缩小聊天', '−', minimize), button('全屏聊天', '□', () => fullscreen()), button('关闭聊天', '×', closeComputerApp));
  moodPanel.append(chatTools);
  const fullChat = document.createElement('section'); fullChat.className = 'full-chat'; fullChat.hidden = true;
  fullChat.setAttribute('aria-label', '全屏电脑先生聊天');
  fullChat.innerHTML = '<p class="full-chat-subtitle" aria-live="polite" hidden></p>';
  const enlargedFace = button('电脑先生，点击退出全屏', '', minimize);
  enlargedFace.className = 'enlarged-original-face';
  const originalFace = faceDisplay.cloneNode(true);
  originalFace.removeAttribute('id');
  originalFace.querySelectorAll('[id]').forEach(element => element.removeAttribute('id'));
  enlargedFace.append(originalFace);
  fullChat.prepend(enlargedFace);
  const exitFullscreen = button('退出全屏', '×', minimize);
  exitFullscreen.className = 'fullscreen-exit'; exitFullscreen.hidden = true;
  fullChat.append(exitFullscreen);
  fullChat.addEventListener('click', event => {
    if (event.target.closest('button')) return;
    if (event.clientY < 64) exitFullscreen.hidden = false;
    else minimize();
  });
  function resizeFace() {
    enlargedFace.style.setProperty('--face-scale', Math.max(1, Math.min(innerWidth / 210, innerHeight / 260, 5)));
  }
  window.addEventListener('resize', resizeFace);
  resizeFace();
  document.body.append(fullChat);
  // Voice diagnostics belong to the normal screen, never over the fullscreen face.
  const status = voiceHint;
  const voiceButton = button('开启连续语音', '开启连续语音', () => { voiceEnabled ? stopVoice() : startVoice(); });
  const damageScreen = document.createElement('section'); damageScreen.className = 'computer-damage-screen'; damageScreen.hidden = true;
  damageScreen.innerHTML = '<strong>显示系统损坏</strong><p>软件已停止运行 · 信号丢失</p><div class="damage-static">▚ ▞ ▒ ▞ ▚ ▒ ▞ ▚</div><p>把电脑先生带回家，或等雨停后修复。</p>';
  const returnToYard = button('退出全屏花屏', '×', () => { damageScreen.classList.remove('damage-full'); });
  returnToYard.className = 'damage-close';
  damageScreen.append(returnToYard); document.body.append(damageScreen);
  function stopSoftware() { cleanup(); cleanup = () => {}; }
  function leaveFullscreen() {
    full = false; fullChat.hidden = true; document.body.classList.remove('computer-chat-full'); stopVoice();
    maximize.setAttribute('aria-label', '全屏软件'); maximize.title = '全屏软件'; maximize.textContent = '□';
    computerAppWindow.classList.remove('software-fullscreen');
    if (currentComputerApp !== 'town') setComputerAppWindowLayer('');
    minecraftPanel.classList.remove('software-minimized');
    if (minecraftPanel.parentElement !== minecraftDock.parent) minecraftDock.parent.insertBefore(minecraftPanel, minecraftDock.next);
  }
  function minimize() {
    leaveFullscreen();
    computerAppWindow.classList.remove('town-fullscreen', 'town-minimized');
    document.body.classList.remove('town-app-open'); setComputerAppWindowLayer('');
    if (currentComputerApp === 'minecraft') { moodPanel.append(minecraftPanel); minecraftPanel.classList.add('software-minimized'); }
    window.setTimeout(() => computerTown3D?.resize?.(), 80);
  }
  function fullscreen() {
    if (isDamagedNow()) return;
    full = true;
    maximize.setAttribute('aria-label', '退出软件全屏'); maximize.title = '退出软件全屏'; maximize.textContent = '▣';
    if (currentComputerApp === 'chat') {
      if (screenTimer) clearTimeout(screenTimer);
      showFaceOnly();
      fullChat.hidden = false; document.body.classList.add('computer-chat-full');
      exitFullscreen.hidden = true; resizeFace(); syncState();
      status.textContent = '首次使用请允许麦克风；允许后会自动轮流听你说话和回答。';
      startVoice();
    } else if (currentComputerApp === 'minecraft') {
      minecraftDock.parent.insertBefore(minecraftPanel, minecraftDock.next);
      minecraftPanel.classList.remove('software-minimized');
    } else {
      document.body.append(computerAppWindow);
      computerAppWindow.classList.remove('town-minimized'); computerAppWindow.classList.add('software-fullscreen');
      window.setTimeout(() => computerTown3D?.resize?.(), 80);
    }
  }
  function stopVoice() {
    if (voiceEnabled) status.textContent = '连续语音已停止。进入全屏聊天可重新开始。';
    voiceEnabled = false; clearTimeout(voiceTimer); voiceTimer = null;
    voice?.stop(); voice = null;
    voiceButton.textContent = '开启连续语音'; voiceButton.setAttribute('aria-label', '开启连续语音');
  }
  function finishWithoutHearing(message = '呃，我没听到你说话。') {
    stopVoice();
    if (!full || currentComputerApp !== 'chat' || damaged) return;
    status.textContent = message;
    if (screenTimer) clearTimeout(screenTimer);
    showSubtitle(message, false); startMouthTalking(2000); speakReply(message);
    const began = Date.now();
    const waitForSpeech = () => {
      if (!full || damaged) return;
      const elapsed = Date.now() - began;
      if (elapsed >= 7000 || (elapsed >= 2200 && !window.speechSynthesis?.speaking && !window.speechSynthesis?.pending)) {
        minimize(); showFaceOnly(); return;
      }
      voiceTimer = setTimeout(waitForSpeech, 200);
    };
    voiceTimer = setTimeout(waitForSpeech, 200);
  }
  function startVoice() {
    if (voiceEnabled || damaged) return;
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) { status.textContent = '当前浏览器不支持语音识别，可以打字聊天。'; finishWithoutHearing('这个浏览器暂时不能听你说话，回到小屏幕打字聊吧。'); return; }
    stopRecording(); replyingUntil = 0;
    if (isPoweredOff) setPowerState(true);
    voice = window.ComputerVoice.create({
      Recognition,
      active: () => full && currentComputerApp === 'chat' && !damaged && !document.hidden,
      busy: () => Boolean(window.speechSynthesis?.speaking || window.speechSynthesis?.pending || Date.now() < replyingUntil),
      activity: markChatActivity,
      answer: text => { replyingUntil = Date.now() + 1600; answerUser(text); },
      cancelSpeech: () => { window.speechSynthesis?.cancel(); replyingUntil = 0; },
      onStatus: text => { status.textContent = text; },
      onSilence: finishWithoutHearing,
      onUnavailable: text => { status.textContent = text; finishWithoutHearing('麦克风没有开启，我暂时听不到你说话。'); }
    });
    voiceEnabled = true; voiceButton.textContent = '暂停连续语音'; voiceButton.setAttribute('aria-label', '暂停连续语音');
    voice.start();
  }
  const splitLetters = { '你': ['left', 42], '好': ['left', 48], '们': ['left', 38], '明': ['left', 48], '林': ['left', 50], '休': ['left', 40], '说': ['left', 35], '话': ['left', 35], '唱': ['left', 36], '呀': ['left', 38], '朋': ['left', 50], '想': ['top', 63], '字': ['top', 34], '笑': ['top', 35], '音': ['top', 49], '草': ['top', 30], '花': ['top', 30], '机': ['left', 45], '脑': ['left', 40], '软': ['left', 50], '件': ['left', 40] };
  let entrance = 0, typingTimer = null;
  function colorfulText(target, text, colorful) {
    target.replaceChildren();
    target.classList.remove('entry-slide', 'entry-jump', 'entry-zoom', 'entry-spin');
    if (colorful) target.classList.add(['entry-slide', 'entry-jump', 'entry-zoom', 'entry-spin'][entrance % 4]);
    const rainbow = ['#ff5252', '#ff982f', '#ffe253', '#64dd68', '#42e6df', '#579bff', '#bb78ff'];
    let colorIndex = 0;
    for (const char of text) {
      const span = document.createElement('span'); span.className = colorful ? 'color-character' : 'typed-character'; span.textContent = char;
      if (colorful) { span.style.setProperty('--char-color', rainbow[colorIndex % 7]); span.style.setProperty('--radical-color', rainbow[(colorIndex + 3) % 7]); colorIndex++; }
      const split = colorful && splitLetters[char];
      if (split) {
        span.classList.add('radical-character'); span.dataset.char = char;
        span.style.setProperty('--part-clip', split[0] === 'left' ? `inset(0 ${100 - split[1]}% 0 0)` : `inset(0 0 ${100 - split[1]}% 0)`);
      }
      target.append(span);
    }
  }
  function subtitle(text, colorful) {
    clearTimeout(typingTimer);
    entrance++; colorfulText(screenSubtitle, text, colorful);
    const fullSubtitle = fullChat.querySelector('.full-chat-subtitle');
    colorfulText(fullSubtitle, text, colorful);
    const lines = [screenSubtitle, fullSubtitle];
    lines.forEach(line => Array.from(line.children).forEach(letter => { letter.style.visibility = 'hidden'; }));
    let count = 0;
    const typeNext = () => {
      lines.forEach(line => { if (line.children[count]) line.children[count].style.visibility = 'visible'; });
      count++;
      if (count < Array.from(text).length) typingTimer = setTimeout(typeNext, 45);
    };
    typeNext(); syncState();
    replyingUntil = Date.now() + Math.max(1400, text.length * 155);
    const history = read('computer-chat-history', []);
    if (Array.isArray(history)) { history.push({ text, time: Date.now() }); save('computer-chat-history', history.slice(-60)); }
  }
  function syncState() {
    chatTools.hidden = currentComputerApp !== 'chat' || damaged;
    if (currentComputerApp === 'chat') computerFaceClose.hidden = true;
    originalFace.querySelector('.mouth').className = mouth.className;
    originalFace.classList.toggle('fullscreen-blinking', computerShell.classList.contains('blinking'));
    const fullSubtitle = fullChat.querySelector('.full-chat-subtitle');
    fullSubtitle.hidden = !moodPanel.classList.contains('text-mode') || screenSubtitle.style.display === 'none';
    enlargedFace.hidden = !fullSubtitle.hidden;
    const nextDamage = isDamagedNow();
    if (damaged === nextDamage) return;
    damaged = nextDamage; document.body.classList.toggle('computer-is-damaged', damaged);
    if (damaged) {
      const wasFull = full || computerAppWindow.classList.contains('town-fullscreen') || minecraftPanelOpen;
      stopSoftware(); leaveFullscreen(); window.speechSynthesis?.cancel();
      if (screenTimer) clearTimeout(screenTimer);
      if (minecraftPanelOpen) setMinecraftPanelOpen(false);
      stopComputerTown3D(); computerAppWindow.hidden = true;
      document.body.classList.remove('town-app-open');
      damageScreen.hidden = false; damageScreen.classList.toggle('damage-full', wasFull);
      // Icons disappear in every mode; restoring the computer brings its installed apps back.
      computerScreenMode = 'desktop'; currentComputerApp = '';
    } else { damageScreen.hidden = true; showComputerDesktop(); }
  }
  function isDamagedNow() {
    return computerShell.classList.contains('rain-error') || computerShell.classList.contains('rain-code-mode');
  }
  new MutationObserver(syncState).observe(computerShell, { attributes: true, subtree: true, attributeFilter: ['class'] });
  // A small visible clock refresh also tracks modes without rebuilding running software.
  setInterval(syncState, 200);
  const mcTools = document.createElement('div'); mcTools.className = 'minecraft-window-tools';
  mcTools.append(button('缩小我的世界', '−', minimize), button('全屏我的世界', '□', fullscreen)); minecraftPanel.append(mcTools);
  function mountSoftware(app, host) {
    if (!['paint', 'music', 'clock'].includes(app) && !window.ComputerApps?.catalog[app]) return false;
    const surface = document.createElement('div'); surface.className = `real-software software-${app}`; host.append(surface);
    if (app === 'paint') mountPaint(surface);
    if (app === 'music') mountMusic(surface);
    if (app === 'clock') mountClock(surface);
    if (window.ComputerApps?.catalog[app]) cleanup = window.ComputerApps.mount(app, surface);
    return true;
  }
  function mountPaint(surface) {
    surface.innerHTML = '<div class="software-toolbar"><label>颜色 <input type="color" value="#2b70dc" aria-label="画笔颜色"></label><label>粗细 <input type="range" min="2" max="36" value="6" aria-label="画笔粗细"></label></div><canvas width="900" height="500" aria-label="画布"></canvas><p role="status">拖动画笔开始画画，作品会自动保存在本机。</p>';
    const canvas = surface.querySelector('canvas'), ctx = canvas.getContext('2d'); let drawing = false;
    const notice = surface.querySelector('p');
    function persist() { notice.textContent = save('computer-paint', canvas.toDataURL()) ? '画作已保存。' : '储存空间不足，可下载保存画作。'; }
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    const previous = read('computer-paint', null);
    let active = true;
    if (typeof previous === 'string' && previous.startsWith('data:image/png')) { const image = new Image(); image.onload = () => { if (active && !drawing) ctx.drawImage(image, 0, 0); }; image.src = previous; }
    const position = e => { const r = canvas.getBoundingClientRect(); return [(e.clientX - r.left) * canvas.width / r.width, (e.clientY - r.top) * canvas.height / r.height]; };
    canvas.addEventListener('pointerdown', e => { drawing = true; canvas.setPointerCapture(e.pointerId); ctx.beginPath(); ctx.moveTo(...position(e)); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = surface.querySelector('[type=color]').value; ctx.lineWidth = +surface.querySelector('[type=range]').value; ctx.lineTo(...position(e)); ctx.stroke(); });
    canvas.addEventListener('pointermove', e => { if (drawing) { ctx.lineTo(...position(e)); ctx.stroke(); } });
    for (const event of ['pointerup', 'pointercancel']) canvas.addEventListener(event, () => { if (drawing) { drawing = false; persist(); } });
    surface.querySelector('.software-toolbar').append(button('清空画布', '清空', () => { ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, 900, 500); persist(); }), button('下载画作', '保存图片', () => { const a = document.createElement('a'); a.download = '电脑先生的画.png'; a.href = canvas.toDataURL(); a.click(); }));
    cleanup = () => { active = false; if (drawing) persist(); };
  }
  function mountMusic(surface) {
    mountSprunki(surface);
  }
  function mountSprunki(surface) {
    surface.classList.add('sprunki-game');
    surface.innerHTML = '<iframe title="Sprunki Kiss Edition 游戏" allow="autoplay; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe><p class="sprunki-source">原作：Sprunki Kiss Edition · 本机版 · 点击开始开启声音。<a href="https://sprunkin.com/game/sprunki-kiss-edition/" target="_blank" rel="noopener noreferrer">在原网站打开</a></p>';
    const frame = surface.querySelector('iframe');
    frame.src = './assets/sprunki-kiss-local/index.html';
    cleanup = () => { frame.remove(); };
  }
  function mountClock(surface) {
    surface.innerHTML = '<time class="live-clock"></time><p class="stopwatch">00:00.0</p><div class="software-toolbar"></div>';
    let started = 0, elapsed = 0, running = false;
    const toggle = button('开始或暂停计时', '开始计时', () => { if (running) elapsed += performance.now() - started; else started = performance.now(); running = !running; toggle.textContent = running ? '暂停计时' : '继续计时'; });
    surface.querySelector('.software-toolbar').append(toggle, button('重置计时', '归零', () => { elapsed = 0; started = performance.now(); }));
    const tick = () => { surface.querySelector('time').textContent = new Date().toLocaleTimeString('zh-CN'); const ms = elapsed + (running ? performance.now() - started : 0); surface.querySelector('.stopwatch').textContent = `${String(Math.floor(ms / 60000)).padStart(2,'0')}:${(ms % 60000 / 1000).toFixed(1).padStart(4,'0')}`; };
    tick(); const timer = setInterval(tick, 100); cleanup = () => clearInterval(timer);
  }
  window.ComputerExperience = { mountSoftware, stopSoftware, leaveFullscreen, minimize, fullscreen, subtitle, isFullChat: () => full && currentComputerApp === 'chat', isDamaged: isDamagedNow };
  if (rhythmBox) {
    rhythmBox.classList.add('reference-rhythm');
    const launch = button('打开完整节奏盒子游戏', '打开节奏盒子 · 原版角色与声音', () => openComputerApp('music'));
    launch.className = 'sprunki-launch'; rhythmBox.prepend(launch);
  }
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && full) minimize(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stopVoice(); else if (full && currentComputerApp === 'chat' && !damaged) startVoice(); });
  syncState();
})();
