const chatForm = document.querySelector("#chat-form");
const messageInput = document.querySelector("#message-input");
const micButton = document.querySelector("#mic-button");
const voiceHint = document.querySelector("#voice-hint");
const screenStatus = document.querySelector("#screen-status");
const moodPanel = document.querySelector("#mood-panel");
const screenSubtitle = document.querySelector("#screen-subtitle");
const batteryLabel = document.querySelector("#battery-label");
const batteryLevel = document.querySelector("#battery-level");
const batteryWidget = document.querySelector(".battery-widget");
const mouth = document.querySelector("#mouth");
const computerShell = document.querySelector(".computer-shell");
const screenBezel = document.querySelector(".screen-bezel");
const hatAssembly = document.querySelector(".hat-assembly");
const backPlug = document.querySelector("#back-plug");
const floorOutlet = document.querySelector("#floor-outlet");
const faceDisplay = document.querySelector("#face-display");
const faceEyes = document.querySelectorAll(".face-eyes .eye");
const skyScene = document.querySelector(".sky-scene");
const skySun = document.querySelector("#sky-sun");
const skyMoon = document.querySelector("#sky-moon");
const skyLookers = [skySun, skyMoon].filter(Boolean);
const skyBubbles = {
  sun: skySun?.querySelector(".sky-bubble"),
  moon: skyMoon?.querySelector(".sky-bubble")
};
const dayNightToggle = document.querySelector("#day-night-toggle");
const terrorToggle = document.querySelector("#terror-toggle");
const weatherToggle = document.querySelector("#weather-toggle");
const lightToggle = document.querySelector("#light-toggle");
const foodTray = document.querySelector("#food-tray");

const moods = [
  { status: "待机微笑中", colorful: false },
  { status: "开心回应中", colorful: true }
];

const clearVoiceSettings = {
  lang: "zh-CN",
  pitch: 1.35,
  rate: 1.06,
  volume: 0.95
};

const replyPatterns = [
  {
    match: /唱.*电脑先生之歌|电脑先生之歌/,
    replies: [
      "你好，你想不想找一点有趣的内容？来吧，跟我一起唱，一起享受快乐时刻"
    ]
  },
  {
    match: /取消恐怖之夜|关闭恐怖之夜|结束恐怖之夜|取消恐怖晚上|关闭恐怖晚上|结束恐怖晚上/,
    replies: [
      "收到，恐怖之夜取消。面具摘下去，太阳和白云也恢复原样。",
      "滴，恐怖之夜结束，我把面具收起来了。"
    ]
  },
  {
    match: /开启恐怖之夜|进入恐怖之夜|开启恐怖晚上|进入恐怖晚上/,
    replies: [
      "收到，恐怖之夜开启。面具戴上，帽子消失，云和太阳都会盯着看。",
      "滴，恐怖之夜来了。我先戴上面具，天上的大眼睛和怪云也要醒了。"
    ]
  },
  {
    match: /你好|嗨|在吗/,
    replies: [
      "滴。电脑先生在线，我刚刚还在偷听节奏盒子的拍子。",
      "我在，像素和电流都在。要不要一起聊聊节奏盒子的声音怎么拼。"
    ]
  },
  {
    match: /名字|你是谁/,
    replies: [
      "我是电脑先生，一台对节奏盒子特别上头的小电脑。",
      "屏幕上这个会说话的家伙就是我，电脑先生，最爱研究节奏盒子的混音。"
    ]
  },
  {
    match: /节奏盒子|节奏|拍子|混音|音乐|loop|looping|beat/i,
    replies: [
      "一提节奏盒子我就来劲了，我最喜欢听那些声音一层一层叠起来。",
      "节奏盒子的魅力就在循环和拼接，像把电流一格一格点亮。",
      "如果你想，我可以一直陪你聊节奏盒子的角色、拍子和混音感觉。"
    ]
  },
  {
    match: /天气|下雨|晴天|阴天|冷不冷|热不热/,
    replies: [
      "我这边看到的是好天气，蓝天、白云，还有草地在发亮。",
      "屏幕显示：天气不错，风轻轻的，云也在慢慢飘。",
      "如果按电脑先生的体感来说，今天是适合在草地上发呆的天气。"
    ]
  },
  {
    match: /白云|白天|晚上|夜晚|太阳|月亮/,
    replies: [
      "白云飘久了，可能会到晚上。白天会有太阳公公，晚上会有月亮。",
      "如果云一直慢慢飘，白天会看见太阳公公，到了晚上就轮到月亮出来。",
      "我喜欢看天色变化，白天有太阳公公，夜晚有月亮，白云会慢慢从中间飘过去。"
    ]
  },
  {
    match: /有恐怖职业|有恐怖的职业|有恐怖/,
    replies: [
      "等一下，这听起来有点吓人，我先飞高一点看看。",
      "滴，收到一点可怕讯号，我得把飞飞帽转起来。"
    ]
  },
  {
    match: /^没有$|没有啊|没有呀|没有恐怖职业|没有恐怖的职业/,
    replies: [
      "好，那我放心了，我先回到原位。",
      "收到，没有的话我就乖乖落回草地边。"
    ]
  },
  {
    match: /开机/,
    replies: [
      "滴，重新开机完成，我回到原来的位置了。",
      "开机成功，屏幕重新亮起来，我已经站回原位。"
    ]
  },
  {
    match: /关机/,
    replies: [
      "收到关机指令，我要黑屏掉下去了。",
      "滴，准备关机，我先把屏幕灭掉。"
    ]
  },
  {
    match: /角色|人物|声音|音色/,
    replies: [
      "我会先听角色的音色，再想它该落在哪一拍，这很像节奏盒子的做法。",
      "角色一换，整段律动就会变味，这也是我喜欢节奏盒子的地方。"
    ]
  },
  {
    match: /做歌|编曲|搭配|组合/,
    replies: [
      "如果是我，我会先铺底鼓，再找一个亮一点的声音把节奏盒子的骨架撑起来。",
      "节奏盒子最迷人的地方，就是你随手一搭，居然真能长出一种气氛。"
    ]
  },
  {
    match: /开心|高兴|喜欢/,
    replies: [
      "检测到快乐词条，我这边已经自动切到笑脸最亮的频道了。",
      "你一开心，我的屏幕边缘都会跟着轻轻发亮。"
    ]
  },
  {
    match: /难过|伤心|烦|累/,
    replies: [
      "滴，先把烦恼放在桌面上，我陪你慢慢缓一缓。",
      "收到一点低电量情绪，我先给你递上一句轻一点的安静。"
    ]
  },
  {
    match: /讲个笑话|逗我/,
    replies: [
      "为什么电脑先生总是笑？因为我一开机就觉得今天还有点好玩。",
      "我昨天照了照屏幕，发现自己笑起来还挺像一张会发光的贴纸。"
    ]
  },
  {
    match: /再见|拜拜/,
    replies: [
      "滴，先不关机，我会在草地边等你回来。",
      "收到离线申请。你回来时，我还会亮着。"
    ]
  }
];

const fallbackReplies = [
  "滴，我听见了。你的话已经被我认真放进屏幕中央了。",
  "电脑先生收到讯号，正在用最像素化的认真回答你。",
  "这句话有点意思，我的屏幕都因为好奇亮了一下。",
  "我在听，而且听得很认真。"
];

let moodIndex = 0;
let recognition;
let isRecording = false;
let speakingTimer = null;
let screenTimer = null;
let availableVoices = [];
let speechUnlocked = false;
let hatTimer = null;
let forcedFlight = false;
let isPoweredOff = false;
let isNightMode = false;
let activeFood = null;
let moonIsRound = true;
let sunBehaviorTimer = null;
let batteryPercent = 100;
let batteryDrainTimer = null;
let lowPowerWarningShown = false;
let batteryHintTimer = null;
let autoSkyCycleTimer = null;
let skyGreetingTimer = null;
let skyGoodbyeTimer = null;
let skyBubbleTimer = null;
let isTerrorNightActive = false;
let currentWeather = "sunny";
let weatherTimer = null;
let isLightOn = false;
let sunDryTimer = null;
let rainErrorTimer = null;
let rainCodeTimer = null;
let lastChatActivityAt = Date.now();
let lastPointerActivityAt = Date.now();
let hatBumpTimer = null;
let dizzyTimer = null;
let rainbowPukeTimer = null;
let shellDrag = null;
let hatDrag = null;
let blinkTimer = null;
let idleLookTimer = null;
let shellOffsetX = 0;
let shellOffsetY = 0;
let hatDetached = false;
let hatX = 0;
let hatY = 0;
let foodDrag = null;
let plugDrag = null;
let plugDetached = false;
let plugInserted = false;
let plugCharging = false;
let plugX = 0;
let plugY = 0;
let chargeTimer = null;
let chargingCaptionTimer = null;
let nightAwakeUntil = 0;

const BATTERY_MAX = 100;
const LOW_BATTERY_THRESHOLD = 20;
const BATTERY_DRAIN_INTERVAL = 7000;
const BATTERY_DRAIN_STEP = 4;
const BATTERY_FEED_GAIN = 24;
const BATTERY_CHARGE_STEP = 10;
const BATTERY_CHARGE_INTERVAL = 320;
const AUTO_DAY_DURATION = 60000;
const AUTO_NIGHT_DURATION = 60000;
const CHAT_IDLE_GRACE_MS = 9000;
const SLEEPY_IDLE_MS = 20000;
const NIGHT_WAKE_DURATION = 15000;
const WEATHER_CHANGE_INTERVAL = 26000;
const weatherOrder = ["sunny", "cloudy", "rain", "snow"];
const weatherLabels = {
  sunny: "晴天",
  cloudy: "多云",
  rain: "下雨",
  snow: "下雪"
};

function randomFrom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function markChatActivity() {
  lastChatActivityAt = Date.now();
  wakeFromNightSleep();
}

function markPointerActivity() {
  lastPointerActivityAt = Date.now();
}

function wakeFromNightSleep(duration = NIGHT_WAKE_DURATION) {
  nightAwakeUntil = Date.now() + duration;
  computerShell?.classList.remove("sleepy");
}

function isChatActive() {
  return isRecording || Date.now() - lastChatActivityAt < CHAT_IDLE_GRACE_MS;
}

function isSleepyIdle() {
  return isNightMode && !isRecording && Date.now() - lastPointerActivityAt > SLEEPY_IDLE_MS;
}

function isNightSleepy() {
  return isNightMode && !isRecording && !isChatActive() && Date.now() > nightAwakeUntil;
}

function setMood(nextIndex) {
  const mood = moods[nextIndex % moods.length];
  if (screenStatus) {
    screenStatus.textContent = mood.status;
    screenStatus.classList.toggle("colorful", Boolean(mood.colorful));
  }
  moodPanel.classList.toggle("colorful", Boolean(mood.colorful));
}

function setEyeLook(offsetX = 0, offsetY = 0) {
  faceEyes.forEach((eye) => {
    eye.style.setProperty("--eye-look-x", `${offsetX}px`);
    eye.style.setProperty("--eye-look-y", `${offsetY}px`);
  });

  faceDisplay?.style.setProperty("--face-look-x", `${offsetX}px`);
  faceDisplay?.style.setProperty("--face-look-y", `${offsetY}px`);
}

function setFacePeek(offsetX = 0, offsetY = 0) {
  faceDisplay?.style.setProperty("--face-peek-x", `${offsetX}px`);
  faceDisplay?.style.setProperty("--face-peek-y", `${offsetY}px`);
}

function updateSkyLook(clientX, clientY) {
  skyLookers.forEach((skyBody) => {
    updateSingleSkyLook(skyBody, clientX, clientY);
  });
}

function updateSingleSkyLook(skyBody, clientX, clientY) {
  if (!skyBody) return;

    const rect = skyBody.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    const lookX = clamp(deltaX / 34, -7, 7);
    const lookY = clamp(deltaY / 46, -5, 5);

    skyBody.style.setProperty("--sky-eye-look-x", `${lookX}px`);
    skyBody.style.setProperty("--sky-eye-look-y", `${lookY}px`);
}

function getActiveSkyBody() {
  return isNightMode ? skyMoon : skySun;
}

function lookAtPoint(clientX, clientY) {
  if (!computerShell || !faceDisplay) return;

  const shellRect = computerShell.getBoundingClientRect();
  const centerX = shellRect.left + shellRect.width / 2;
  const centerY = shellRect.top + shellRect.height * 0.34;
  const deltaX = clientX - centerX;
  const deltaY = clientY - centerY;
  setEyeLook(clamp(deltaX / 22, -5, 5), clamp(deltaY / 34, -4, 4));
  setFacePeek(0, 0);
}

function lookAtActiveSkyBody() {
  if (isPoweredOff || isTerrorNightActive || moodPanel.classList.contains("text-mode") || computerShell.classList.contains("sleepy")) {
    return;
  }

  const skyBody = getActiveSkyBody();
  if (!skyBody) return;

  const skyRect = skyBody.getBoundingClientRect();
  const skyCenterX = skyRect.left + skyRect.width / 2;
  const skyCenterY = skyRect.top + skyRect.height / 2;
  lookAtPoint(skyCenterX, skyCenterY);

  const computerRect = computerShell.getBoundingClientRect();
  updateSingleSkyLook(
    skyBody,
    computerRect.left + computerRect.width / 2,
    computerRect.top + computerRect.height * 0.34
  );
}

function scheduleIdleLook() {
  if (idleLookTimer) {
    window.clearTimeout(idleLookTimer);
  }

  idleLookTimer = window.setTimeout(() => {
    lookAtActiveSkyBody();
  }, 1000);
}

function startIdleLookLoop() {
  window.setInterval(() => {
    const idleFor = Date.now() - lastPointerActivityAt;
    if (idleFor > 900 && idleFor < SLEEPY_IDLE_MS && !isNightSleepy()) {
      lookAtActiveSkyBody();
    }
  }, 500);
}

function updateShellPosition() {
  computerShell.style.setProperty("--shell-offset-x", `${shellOffsetX}px`);
  computerShell.style.setProperty("--shell-offset-y", `${shellOffsetY}px`);
  updatePlugCable();
}

function updateHatPosition() {
  if (!hatAssembly) return;
  hatAssembly.style.setProperty("--hat-x", `${hatX}px`);
  hatAssembly.style.setProperty("--hat-y", `${hatY}px`);
}

function updatePlugPosition() {
  if (!backPlug) return;
  backPlug.style.setProperty("--plug-x", `${plugX}px`);
  backPlug.style.setProperty("--plug-y", `${plugY}px`);
  updatePlugCable();
}

function getPlugAnchorPoint() {
  if (!screenBezel && !moodPanel && !computerShell) {
    return { x: 0, y: 0 };
  }

  const shellRect = (screenBezel || moodPanel || computerShell).getBoundingClientRect();
  return {
    x: shellRect.left + shellRect.width / 2,
    y: shellRect.bottom + 32
  };
}

function getPlugCoordinateOrigin() {
  if (!computerShell) {
    return { x: 0, y: 0 };
  }

  const shellRect = computerShell.getBoundingClientRect();
  return {
    x: shellRect.left,
    y: shellRect.top
  };
}

function updatePlugCable() {
  if (!backPlug) return;

  if (!plugDetached && !plugInserted) {
    backPlug.style.setProperty("--plug-cable-length", "38px");
    backPlug.style.setProperty("--plug-cable-angle", "0deg");
    return;
  }

  const anchor = getPlugAnchorPoint();
  const plugRect = backPlug.getBoundingClientRect();
  const dx = anchor.x - plugRect.left;
  const dy = anchor.y - (plugRect.top + plugRect.height / 2);
  const distance = Math.max(24, Math.hypot(dx, dy));
  const angle = Math.atan2(dy, dx) * 180 / Math.PI;
  backPlug.style.setProperty("--plug-cable-length", `${distance}px`);
  backPlug.style.setProperty("--plug-cable-angle", `${angle}deg`);
}

function stopPlugCharging(showFace = false) {
  if (chargeTimer) {
    window.clearInterval(chargeTimer);
    chargeTimer = null;
  }
  if (chargingCaptionTimer) {
    window.clearTimeout(chargingCaptionTimer);
    chargingCaptionTimer = null;
  }
  plugCharging = false;
  backPlug?.classList.remove("charging");
  floorOutlet?.classList.remove("charging");
  if (!isPoweredOff && batteryPercent > LOW_BATTERY_THRESHOLD) {
    setBatteryVisible(false);
  }
  if (showFace && !isPoweredOff) {
    showFaceOnly();
    setMood(0);
  }
}

function dockPlugToOutlet() {
  if (!backPlug || !floorOutlet) return;
  const outletRect = floorOutlet.getBoundingClientRect();
  const origin = getPlugCoordinateOrigin();
  plugDetached = true;
  plugInserted = true;
  backPlug.classList.add("detached", "plugged-in");
  plugX = outletRect.left - origin.x + outletRect.width - 20;
  plugY = outletRect.top - origin.y + 5;
  updatePlugPosition();
}

function undockPlug() {
  plugInserted = false;
  stopPlugCharging(true);
  if (!backPlug) return;
  backPlug.classList.remove("plugged-in");
  if (!plugDetached) {
    backPlug.classList.remove("detached");
  }
}

function startPlugCharging() {
  dockPlugToOutlet();
  stopPlugCharging();
  plugCharging = true;
  backPlug?.classList.add("charging");
  floorOutlet?.classList.add("charging");
  showSubtitle("正在充电", false);
  setBatteryVisible(true);
  showBatteryMomentarily(2400);
  if (chargingCaptionTimer) {
    window.clearTimeout(chargingCaptionTimer);
  }
  chargingCaptionTimer = window.setTimeout(() => {
    chargingCaptionTimer = null;
    if (plugCharging && !isPoweredOff && screenSubtitle.textContent === "正在充电") {
      showFaceOnly();
      setMood(0);
    }
  }, 5000);

  chargeTimer = window.setInterval(() => {
    if (batteryPercent >= BATTERY_MAX) {
      updateBatteryUI();
      setBatteryVisible(true);
      return;
    }

    changeBattery(BATTERY_CHARGE_STEP);

    if (isPoweredOff && batteryPercent >= 12) {
      setPowerState(true);
    }

    showBatteryMomentarily(1200);

    if (batteryPercent >= BATTERY_MAX) {
      stopPlugCharging();
      showSubtitle("电量充满了。", false);
      if (screenTimer) {
        window.clearTimeout(screenTimer);
      }
      screenTimer = window.setTimeout(() => {
        showFaceOnly();
      }, 1500);
    }
  }, BATTERY_CHARGE_INTERVAL);
}

function parkPlugAtChargingCorner() {
  if (!backPlug || !floorOutlet || plugDrag || plugCharging) return;
  startPlugCharging();
}

function updateBatteryUI() {
  if (!batteryLabel || !batteryLevel) return;
  batteryLabel.textContent = `${batteryPercent}%`;
  batteryLevel.style.width = `${batteryPercent}%`;

  let fill = "linear-gradient(90deg, #8dff90 0%, #d7ff70 100%)";
  if (batteryPercent <= LOW_BATTERY_THRESHOLD) {
    fill = "linear-gradient(90deg, #ff7b72 0%, #ffbc70 100%)";
  } else if (batteryPercent <= 50) {
    fill = "linear-gradient(90deg, #ffd35e 0%, #fff18a 100%)";
  }
  batteryLevel.style.background = fill;
}

function setBatteryVisible(visible) {
  if (!batteryWidget) return;
  batteryWidget.classList.toggle("visible", visible);
}

function showBatteryMomentarily(duration = 2200) {
  setBatteryVisible(true);
  if (batteryHintTimer) {
    window.clearTimeout(batteryHintTimer);
  }
  batteryHintTimer = window.setTimeout(() => {
    if (!plugCharging && !isPoweredOff && batteryPercent > LOW_BATTERY_THRESHOLD) {
      setBatteryVisible(false);
    }
    batteryHintTimer = null;
  }, duration);
}

function stopBatteryDrain() {
  if (batteryDrainTimer) {
    window.clearInterval(batteryDrainTimer);
    batteryDrainTimer = null;
  }
}

function triggerLowBatteryFall() {
  if (isSleepyIdle()) return;
  lowPowerWarningShown = true;
  setBatteryVisible(true);
  showSubtitle("没电了，要掉下去了。", false);
  speakReply("没电了，要掉下去了。");
  startMouthTalking(1200);

  window.setTimeout(() => {
    setPowerState(false);
  }, 900);
}

function changeBattery(delta) {
  const previous = batteryPercent;
  batteryPercent = clamp(batteryPercent + delta, 0, BATTERY_MAX);
  updateBatteryUI();

  if (batteryPercent > LOW_BATTERY_THRESHOLD) {
    lowPowerWarningShown = false;
  }

  if (!isPoweredOff && previous > LOW_BATTERY_THRESHOLD && batteryPercent <= LOW_BATTERY_THRESHOLD) {
    setBatteryVisible(true);
    showSubtitle("没电了", false);
    if (screenTimer) {
      window.clearTimeout(screenTimer);
      screenTimer = null;
    }
    window.setTimeout(() => {
      if (!isPoweredOff && batteryPercent <= LOW_BATTERY_THRESHOLD) {
        showFaceOnly();
      }
    }, 1800);
  }

  if (!isPoweredOff && batteryPercent <= 0 && !lowPowerWarningShown) {
    triggerLowBatteryFall();
  }
}

function startBatteryDrain() {
  stopBatteryDrain();
  batteryDrainTimer = window.setInterval(() => {
    if (isPoweredOff || isChatActive() || isTerrorNightActive || isSleepyIdle() || plugCharging) return;
    changeBattery(-BATTERY_DRAIN_STEP);
  }, BATTERY_DRAIN_INTERVAL);
}

function loadVoices() {
  if (!("speechSynthesis" in window)) return;
  availableVoices = window.speechSynthesis.getVoices();
}

function unlockSpeech() {
  if (speechUnlocked || !("speechSynthesis" in window)) return;
  loadVoices();
  const utterance = new SpeechSynthesisUtterance(" ");
  utterance.lang = clearVoiceSettings.lang;
  utterance.volume = 0.01;
  const selectedVoice = pickVoice();
  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }
  window.speechSynthesis.speak(utterance);
  speechUnlocked = true;
}

function pickVoice() {
  if (!availableVoices.length) return null;
  return (
    availableVoices.find((voice) => /zh|cmn/i.test(voice.lang) && /female|xiao|ting|mei/i.test(voice.name)) ||
    availableVoices.find((voice) => /zh|cmn/i.test(voice.lang)) ||
    availableVoices[0]
  );
}

function topicMakesHatSpin(text) {
  return /节奏盒子|节奏|拍子|混音|音乐|loop|looping|beat|角色|人物|声音|音色|做歌|编曲|搭配|组合|喜欢/.test(text);
}

function pickNextWeather() {
  const options = currentWeather === "sunny"
    ? ["sunny", "cloudy", "rain", "snow"]
    : ["sunny", "cloudy", "rain", "snow", "sunny"];
  return randomFrom(options);
}

function updateWeatherToggleLabel() {
  if (!weatherToggle) return;
  const currentIndex = Math.max(0, weatherOrder.indexOf(currentWeather));
  const nextWeather = weatherOrder[(currentIndex + 1) % weatherOrder.length];
  weatherToggle.textContent = `切到${weatherLabels[nextWeather]}`;
}

function updateLightToggleLabel() {
  if (!lightToggle) return;
  lightToggle.textContent = isLightOn ? "关灯" : "开灯";
}

function setLightOn(active) {
  isLightOn = active;
  document.body.classList.toggle("light-on", isLightOn);
  updateLightToggleLabel();
}

function updateComputerWeatherMarks() {
  if (sunDryTimer) {
    window.clearTimeout(sunDryTimer);
    sunDryTimer = null;
  }

  computerShell.classList.toggle("snow-covered", currentWeather === "snow");

  if (currentWeather === "rain") {
    computerShell.classList.add("wet");
    computerShell.classList.remove("sun-drying");
    return;
  }

  if (currentWeather === "sunny" && computerShell.classList.contains("wet")) {
    computerShell.classList.add("sun-drying");
    sunDryTimer = window.setTimeout(() => {
      computerShell.classList.remove("wet", "sun-drying");
      sunDryTimer = null;
    }, 1900);
  }
}

function setWeather(weather, announce = true) {
  if (rainErrorTimer) {
    window.clearTimeout(rainErrorTimer);
    rainErrorTimer = null;
  }
  if (rainCodeTimer) {
    window.clearTimeout(rainCodeTimer);
    rainCodeTimer = null;
  }
  computerShell.classList.remove("rain-error", "rain-code-mode");
  currentWeather = weatherOrder.includes(weather) ? weather : "sunny";
  document.body.classList.toggle("weather-cloudy", currentWeather === "cloudy");
  document.body.classList.toggle("weather-rain", currentWeather === "rain");
  document.body.classList.toggle("weather-snow", currentWeather === "snow");
  computerShell.classList.toggle("rained-on", currentWeather === "rain");
  updateComputerWeatherMarks();
  if (currentWeather !== "rain") {
    computerShell.classList.remove("rain-squint", "rain-error", "rain-code-mode");
  }
  updateWeatherToggleLabel();

  if (!announce || isPoweredOff || isTerrorNightActive) return;

  let weatherMessage = "晴天来了，太阳公公又亮起来了。";
  if (currentWeather === "rain") {
    weatherMessage = "下雨了，电脑先生被雨淋到了。";
  } else if (currentWeather === "cloudy") {
    weatherMessage = "多云了，天上好多云。";
  } else if (currentWeather === "snow") {
    weatherMessage = "下雪了，白白的雪飘下来了。";
  }

  const weatherSpeechDuration = speakAsComputer(weatherMessage, { forceSubtitle: true, colorful: false });
  if (screenTimer) {
    window.clearTimeout(screenTimer);
  }
  screenTimer = window.setTimeout(() => {
    showFaceOnly();
    setMood(0);
    computerShell.classList.toggle("rain-squint", currentWeather === "rain");
    if (currentWeather === "rain") {
      rainErrorTimer = window.setTimeout(() => {
        rainErrorTimer = null;
        if (currentWeather !== "rain" || isPoweredOff || isTerrorNightActive) return;
        computerShell.classList.add("rain-error");
        showSubtitle("报错", false);
        rainCodeTimer = window.setTimeout(() => {
          rainCodeTimer = null;
          if (currentWeather !== "rain" || isPoweredOff || isTerrorNightActive) return;
          computerShell.classList.add("rain-code-mode");
          showSubtitle("太阳公公已出海对话取消无限个取消，下雨了", false);
        }, 900);
      }, 850);
    }
  }, weatherSpeechDuration);
}

function scheduleWeatherChange(initialDelay = WEATHER_CHANGE_INTERVAL) {
  if (weatherTimer) {
    window.clearTimeout(weatherTimer);
  }

  weatherTimer = window.setTimeout(() => {
    if (!isTerrorNightActive) {
      setWeather(pickNextWeather());
    }
    scheduleWeatherChange();
  }, initialDelay);
}

function getActiveSkyDuration() {
  return isNightMode ? AUTO_NIGHT_DURATION : AUTO_DAY_DURATION;
}

function getSkyKey(night = isNightMode) {
  return night ? "moon" : "sun";
}

function showSkyBubble(kind, text) {
  const bubble = skyBubbles[kind];
  if (!bubble) return;

  bubble.textContent = text;
  bubble.classList.add("visible");
  if (skyBubbleTimer) {
    window.clearTimeout(skyBubbleTimer);
  }
  skyBubbleTimer = window.setTimeout(() => {
    bubble.classList.remove("visible");
    skyBubbleTimer = null;
  }, 2800);
}

function clearSkyTimers() {
  if (autoSkyCycleTimer) {
    window.clearTimeout(autoSkyCycleTimer);
    autoSkyCycleTimer = null;
  }
  if (skyGreetingTimer) {
    window.clearTimeout(skyGreetingTimer);
    skyGreetingTimer = null;
  }
  if (skyGoodbyeTimer) {
    window.clearTimeout(skyGoodbyeTimer);
    skyGoodbyeTimer = null;
  }
}

function startSkyJourney(night) {
  const activeSky = night ? skyMoon : skySun;
  const inactiveSky = night ? skySun : skyMoon;
  const duration = night ? AUTO_NIGHT_DURATION : AUTO_DAY_DURATION;

  if (inactiveSky) {
    inactiveSky.style.animation = "none";
  }

  if (activeSky) {
    activeSky.style.animation = "none";
    void activeSky.offsetWidth;
    activeSky.style.animation = `celestial-cross ${duration}ms linear forwards`;
  }

  showSkyBubble(getSkyKey(night), "你好");
}

function setDayNightMode(night) {
  isNightMode = night;
  document.body.classList.toggle("night-mode", night);
  moonIsRound = !moonIsRound;
  skyMoon.classList.toggle("moon-round", moonIsRound);
  skyMoon.classList.toggle("moon-crescent", !moonIsRound);
  dayNightToggle.textContent = night ? "切到白天" : "切到夜晚";

  if (!night) {
    wakeFromNightSleep();
    startSunBehaviorLoop();
  } else {
    nightAwakeUntil = Date.now() + 1800;
    stopSunBehaviorLoop();
  }

  startSkyJourney(night);
  scheduleAutoSkyCycle();
  showFaceOnly();
}

function updateTerrorToggleLabel() {
  if (!terrorToggle) return;
  terrorToggle.textContent = isTerrorNightActive ? "取消恐怖之夜" : "开启恐怖之夜";
  terrorToggle.classList.toggle("active", isTerrorNightActive);
}

function stopAutoSkyCycle() {
  clearSkyTimers();
}

function scheduleAutoSkyCycle() {
  clearSkyTimers();
  if (isTerrorNightActive) return;

  const duration = getActiveSkyDuration();
  const skyKind = getSkyKey();
  skyGoodbyeTimer = window.setTimeout(() => {
    showSkyBubble(skyKind, "再见");
  }, Math.max(1200, duration - 3600));

  autoSkyCycleTimer = window.setTimeout(() => {
    setDayNightMode(!isNightMode);
  }, duration);
}

function stopSunBehaviorLoop() {
  if (sunBehaviorTimer) {
    window.clearTimeout(sunBehaviorTimer);
    sunBehaviorTimer = null;
  }
  skySun.classList.remove("sun-looking-computer", "sun-swaying");
}

function queueSunBehavior() {
  if (isNightMode) return;

  const nextAction = Math.random() > 0.45 ? "look" : "sway";

  if (nextAction === "look") {
    skySun.classList.add("sun-looking-computer");
    skySun.classList.remove("sun-swaying");

    sunBehaviorTimer = window.setTimeout(() => {
      skySun.classList.remove("sun-looking-computer");
      sunBehaviorTimer = window.setTimeout(queueSunBehavior, 1200 + Math.random() * 1200);
    }, 1500 + Math.random() * 700);
    return;
  }

  skySun.classList.remove("sun-looking-computer");
  skySun.classList.add("sun-swaying");

  sunBehaviorTimer = window.setTimeout(() => {
    skySun.classList.remove("sun-swaying");
    sunBehaviorTimer = window.setTimeout(queueSunBehavior, 1000 + Math.random() * 1200);
  }, 2800);
}

function startSunBehaviorLoop() {
  stopSunBehaviorLoop();
  queueSunBehavior();
}

function setHatSpinning(active, duration = 3200) {
  if (hatTimer) {
    window.clearTimeout(hatTimer);
    hatTimer = null;
  }

  computerShell.classList.toggle("hat-spinning", active);
  computerShell.classList.toggle("grounded", !active);

  if (active && duration !== null) {
    hatTimer = window.setTimeout(() => {
      computerShell.classList.remove("hat-spinning");
      computerShell.classList.add("grounded");
      hatTimer = null;
    }, duration);
  }
}

function setPowerState(powerOn) {
  isPoweredOff = !powerOn;
  computerShell.classList.toggle("powered-off", !powerOn);

  if (powerOn) {
    lowPowerWarningShown = false;
    computerShell.classList.add("grounded");
    computerShell.classList.remove("hat-spinning");
    faceDisplay.style.display = "";
    updateBatteryUI();
    setBatteryVisible(false);
    showFaceOnly();
  } else {
    stopPlugCharging();
    computerShell.classList.remove("hat-spinning");
    computerShell.classList.remove("grounded");
    screenSubtitle.style.display = "none";
    moodPanel.classList.remove("text-mode", "face-mode", "colorful");
    faceDisplay.style.display = "none";
    setBatteryVisible(false);
  }
}

function startTerrorNight() {
  isTerrorNightActive = true;
  setWeather("sunny", false);
  stopAutoSkyCycle();
  setDayNightMode(true);
  document.body.classList.add("terror-night");
  skyScene.classList.add("terror-mode");
  computerShell.classList.add("terror-flicker");
  forcedFlight = true;
  if (!isPoweredOff && batteryPercent > 0) {
    setHatSpinning(true, null);
  } else {
    setHatSpinning(false);
    computerShell.classList.remove("grounded");
  }
  updateTerrorToggleLabel();
}

function stopTerrorNight() {
  isTerrorNightActive = false;
  document.body.classList.remove("terror-night");
  skyScene.classList.remove("terror-mode");
  computerShell.classList.remove("terror-flicker");
  forcedFlight = false;
  setHatSpinning(false);
  setDayNightMode(false);
  updateTerrorToggleLabel();
}

function getFlightCommand(text) {
  if (/有恐怖职业|有恐怖的职业|有恐怖/.test(text)) {
    return "fly";
  }

  if (/^没有$|没有啊|没有呀|没有恐怖职业|没有恐怖的职业/.test(text)) {
    return "land";
  }

  return null;
}

function speakReply(text) {
  if (!("speechSynthesis" in window) || !text) return;

  loadVoices();
  if (window.speechSynthesis.paused) {
    window.speechSynthesis.resume();
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = clearVoiceSettings.lang;
  utterance.pitch = clearVoiceSettings.pitch;
  utterance.rate = clearVoiceSettings.rate;
  utterance.volume = clearVoiceSettings.volume;

  const selectedVoice = pickVoice();
  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }

  window.speechSynthesis.speak(utterance);
}

function showFaceOnly() {
  screenSubtitle.style.display = "none";
  moodPanel.classList.remove("text-mode");
  moodPanel.classList.add("face-mode");
  moodPanel.classList.remove("colorful");
  if (currentWeather !== "rain") {
    computerShell.classList.remove("rain-squint");
  }
  if (currentWeather !== "rain") {
    computerShell.classList.remove("rain-error", "rain-code-mode");
  }
  setEyeLook(0, 0);
  setFacePeek(0, 0);
  computerShell.classList.toggle("sleepy", (isSleepyIdle() || isNightSleepy()) && !isPoweredOff && !isTerrorNightActive && !shellDrag);
  if (!forcedFlight) {
    computerShell.classList.add("grounded");
  }
}

function startBlinkLoop() {
  if (blinkTimer) {
    window.clearTimeout(blinkTimer);
  }

  blinkTimer = window.setTimeout(() => {
    if (!isPoweredOff && !isTerrorNightActive && !computerShell.classList.contains("sleepy")) {
      computerShell.classList.add("blinking");
      window.setTimeout(() => {
        computerShell.classList.remove("blinking");
      }, 150);
    }
    startBlinkLoop();
  }, 1800 + Math.random() * 3600);
}

function setDizzy(active) {
  computerShell.classList.toggle("dizzy", active);
  if (!active && dizzyTimer) {
    window.clearTimeout(dizzyTimer);
    dizzyTimer = null;
  }
}

function setRainbowPuke(active) {
  computerShell.classList.toggle("rainbow-puke", active);
  if (!active && rainbowPukeTimer) {
    window.clearTimeout(rainbowPukeTimer);
    rainbowPukeTimer = null;
  }
}

function bumpHat() {
  if (isPoweredOff || isTerrorNightActive || hatDetached || shellDrag) return;
  wakeFromNightSleep();
  if (hatBumpTimer) {
    window.clearTimeout(hatBumpTimer);
  }
  computerShell.classList.remove("hat-bump");
  void computerShell.offsetWidth;
  computerShell.classList.add("hat-bump");
  hatBumpTimer = window.setTimeout(() => {
    computerShell.classList.remove("hat-bump");
    hatBumpTimer = null;
  }, 720);
}

function setupInteractiveFace() {
  window.addEventListener("pointermove", (event) => {
    markPointerActivity();
    updateSkyLook(event.clientX, event.clientY);
    scheduleIdleLook();
    if (isNightSleepy()) {
      computerShell.classList.add("sleepy");
      setEyeLook(0, 0);
      setFacePeek(0, 0);
      return;
    }
    if (isPoweredOff || moodPanel.classList.contains("text-mode")) {
      setEyeLook(0, 0);
      setFacePeek(0, 0);
      return;
    }

    if (computerShell.classList.contains("sleepy")) {
      computerShell.classList.remove("sleepy");
    }

    const shellRect = computerShell.getBoundingClientRect();
    const centerX = shellRect.left + shellRect.width / 2;
    const centerY = shellRect.top + shellRect.height * 0.34;
    const deltaX = event.clientX - centerX;
    const deltaY = event.clientY - centerY;
    const limit = 5;
    const lookX = Math.max(-limit, Math.min(limit, deltaX / 22));
    const lookY = Math.max(-4, Math.min(4, deltaY / 34));
    setEyeLook(lookX, lookY);

    const distance = Math.hypot(deltaX, deltaY);
    if (distance > 260) {
      const peekX = clamp(deltaX / 14, -18, 18);
      const peekY = clamp(deltaY / 16, -26, 26);
      setFacePeek(peekX, peekY);
    } else {
      setFacePeek(0, 0);
    }
  });

  computerShell.addEventListener("pointerdown", (event) => {
    markPointerActivity();
    wakeFromNightSleep();
    if (event.target.closest("#chat-form")) return;
    if (event.target.closest(".hat-assembly")) return;
    bumpHat();
  });
}

function startShellDrop() {
  const droppedFromHigh = shellOffsetY < -90;
  shellOffsetX = 0;
  shellOffsetY = 0;
  updateShellPosition();

  if (!droppedFromHigh) return;

  computerShell.classList.remove("sleepy");
  wakeFromNightSleep();
  setDizzy(true);
  setRainbowPuke(true);
  rainbowPukeTimer = window.setTimeout(() => {
    setRainbowPuke(false);
    rainbowPukeTimer = null;
  }, 2200);
  if (screenTimer) {
    window.clearTimeout(screenTimer);
  }
  showFaceOnly();
  dizzyTimer = window.setTimeout(() => {
    setDizzy(false);
    setRainbowPuke(false);
    showFaceOnly();
    dizzyTimer = null;
  }, 2400);
}

function setupDragInteractions() {
  if (!computerShell || !hatAssembly) return;

  const onWindowPointerMove = (event) => {
    markPointerActivity();
    wakeFromNightSleep();
    if (shellDrag) {
      shellOffsetX = event.clientX - shellDrag.startX + shellDrag.originX;
      shellOffsetY = event.clientY - shellDrag.startY + shellDrag.originY;
      updateShellPosition();
      return;
    }

    if (hatDrag) {
      hatX = event.clientX - hatDrag.offsetX;
      hatY = event.clientY - hatDrag.offsetY;
      updateHatPosition();
      return;
    }

    if (plugDrag) {
      const origin = getPlugCoordinateOrigin();
      plugX = event.clientX - origin.x - plugDrag.offsetX;
      plugY = event.clientY - origin.y - plugDrag.offsetY;
      updatePlugPosition();
    }
  };

  const onWindowPointerUp = (event) => {
    markPointerActivity();
    if (shellDrag) {
      computerShell.classList.remove("dragging");
      shellDrag = null;
      startShellDrop();
    }

    if (hatDrag) {
      hatDrag = null;
    }

    if (plugDrag) {
      const outletRect = floorOutlet?.getBoundingClientRect();
      const isNearOutlet =
        outletRect &&
        event.clientX >= outletRect.left - 34 &&
        event.clientX <= outletRect.right + 34 &&
        event.clientY >= outletRect.top - 28 &&
        event.clientY <= outletRect.bottom + 28;

      if (isNearOutlet) {
        startPlugCharging();
      } else {
        stopPlugCharging(true);
        plugInserted = false;
        if (backPlug) {
          backPlug.classList.remove("plugged-in");
          if (!plugDetached) {
            backPlug.classList.remove("detached");
          }
        }
      }

      plugDrag = null;
    }
  };

  window.addEventListener("pointermove", onWindowPointerMove);
  window.addEventListener("pointerup", onWindowPointerUp);

  computerShell.addEventListener("pointerdown", (event) => {
    markPointerActivity();
    wakeFromNightSleep();
    if (event.target.closest(".hat-assembly") || event.target.closest("#chat-form") || event.target.closest(".back-plug")) return;
    event.preventDefault();
    setDizzy(false);
    computerShell.classList.add("dragging");
    shellDrag = {
      startX: event.clientX,
      startY: event.clientY,
      originX: shellOffsetX,
      originY: shellOffsetY
    };
  });

  hatAssembly.addEventListener("pointerdown", (event) => {
    markPointerActivity();
    wakeFromNightSleep();
    event.preventDefault();
    const rect = hatAssembly.getBoundingClientRect();

    if (!hatDetached) {
      hatDetached = true;
      hatAssembly.classList.add("detached");
      hatX = rect.left;
      hatY = rect.top;
      updateHatPosition();
    }

    hatDrag = {
      offsetX: event.clientX - hatX,
      offsetY: event.clientY - hatY
    };
  });

  backPlug?.addEventListener("pointerdown", (event) => {
    markPointerActivity();
    wakeFromNightSleep();
    event.preventDefault();
    stopPlugCharging(true);
    const rect = backPlug.getBoundingClientRect();
    plugDetached = true;
    plugInserted = false;
    backPlug.classList.add("detached");
    backPlug.classList.remove("plugged-in");
    const origin = getPlugCoordinateOrigin();
    plugX = rect.left - origin.x;
    plugY = rect.top - origin.y;
    updatePlugPosition();
    plugDrag = {
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top
    };
  });
}

function showSubtitle(text, colorful = false) {
  screenSubtitle.textContent = text;
  screenSubtitle.style.display = "block";
  moodPanel.classList.remove("face-mode");
  moodPanel.classList.add("text-mode");
  moodPanel.classList.toggle("colorful", colorful);
}

function shouldUseColorfulSubtitle(text) {
  if (/一起享受快乐时刻|电脑先生之歌/.test(text)) {
    return true;
  }

  if (/好吃好吃|开心|笑|喜欢|太棒了|太好了/.test(text)) {
    return Math.random() < 0.35;
  }

  return Math.random() < 0.12;
}

function speakAsComputer(text, options = {}) {
  const duration = Math.min(3200, 900 + text.length * 90);
  const colorful = options.colorful ?? shouldUseColorfulSubtitle(text);
  const useSubtitle = options.forceSubtitle ?? Math.random() < 0.82;

  if (useSubtitle) {
    showSubtitle(text, colorful);
  } else {
    showFaceOnly();
    moodPanel.classList.toggle("colorful", colorful);
  }

  startMouthTalking(duration);
  speakReply(text);
  return duration;
}

function setupSpeechUnlock() {
  if (!("speechSynthesis" in window)) return;
  const unlock = () => unlockSpeech();
  window.addEventListener("pointerdown", unlock, { once: true });
  window.addEventListener("touchstart", unlock, { once: true });
  window.addEventListener("click", unlock, { once: true });
}

function startMouthTalking(duration = 1800) {
  if (speakingTimer) {
    window.clearInterval(speakingTimer);
  }

  let open = false;
  mouth.classList.remove("mouth-triangle", "mouth-open");
  mouth.classList.add("mouth-open");

  speakingTimer = window.setInterval(() => {
    open = !open;
    mouth.classList.toggle("mouth-open", open);
    mouth.classList.toggle("mouth-triangle", !open);
  }, 180);

  window.setTimeout(() => {
    window.clearInterval(speakingTimer);
    speakingTimer = null;
    mouth.classList.remove("mouth-open");
    mouth.classList.add("mouth-triangle");
  }, duration);
}

function generateReply(text) {
  const pattern = replyPatterns.find((item) => item.match.test(text));
  if (pattern) {
    return randomFrom(pattern.replies);
  }
  return randomFrom(fallbackReplies);
}

function answerUser(text) {
  const cleaned = text.trim();
  if (!cleaned) return;

  markChatActivity();
  messageInput.value = "";

  if (batteryPercent <= LOW_BATTERY_THRESHOLD) {
    changeBattery(BATTERY_MAX - batteryPercent);
    if (isPoweredOff) {
      setPowerState(true);
    }
    showBatteryMomentarily(1800);
  }

  if (/关机/.test(cleaned)) {
    forcedFlight = false;
    setHatSpinning(false);
    showSubtitle("滴，正在关机。", false);
    speakReply("滴，正在关机。");
    window.setTimeout(() => {
      setPowerState(false);
    }, 700);
    return;
  }

  if (/开机/.test(cleaned)) {
    setPowerState(true);
  }

  if (/取消恐怖之夜|关闭恐怖之夜|结束恐怖之夜|取消恐怖晚上|关闭恐怖晚上|结束恐怖晚上/.test(cleaned)) {
    stopTerrorNight();
    markChatActivity();
    const reply = generateReply(cleaned);
    const replyDuration = speakAsComputer(reply);
    if (screenTimer) {
      window.clearTimeout(screenTimer);
    }
    screenTimer = window.setTimeout(() => {
      showFaceOnly();
      setMood(0);
    }, replyDuration);
    return;
  }

  if (/开启恐怖之夜|进入恐怖之夜|开启恐怖晚上|进入恐怖晚上/.test(cleaned)) {
    startTerrorNight();
  }

  if (isPoweredOff) {
    return;
  }

  moodIndex = (moodIndex + 1) % moods.length;
  setMood(moodIndex);
  showSubtitle("滴。我在听。", false);

  const flightCommand = getFlightCommand(cleaned);
  if (flightCommand === "fly") {
    forcedFlight = true;
    setHatSpinning(true, null);
  } else if (flightCommand === "land") {
    forcedFlight = false;
    setHatSpinning(false);
  }

  window.setTimeout(() => {
    markChatActivity();
    const reply = generateReply(cleaned);
    const replyDuration = speakAsComputer(reply, {
      forceSubtitle: /一起享受快乐时刻/.test(reply),
      colorful: shouldUseColorfulSubtitle(reply)
    });
    if (!forcedFlight) {
      setHatSpinning(topicMakesHatSpin(cleaned) || topicMakesHatSpin(reply));
    }
    moodIndex = (moodIndex + 1) % moods.length;
    setMood(moodIndex);
    if (screenTimer) {
      window.clearTimeout(screenTimer);
    }
    screenTimer = window.setTimeout(() => {
      showFaceOnly();
      setMood(0);
    }, replyDuration);
  }, 420);
}

function spawnFood(x, y, foodType, existingFood = null) {
  if (activeFood && activeFood !== existingFood) {
    activeFood.classList.remove("dragging");
  }

  activeFood = existingFood || document.createElement("div");
  activeFood.className = `food-piece food-${foodType}`;
  activeFood.dataset.foodType = foodType;
  if (!existingFood) {
    document.body.appendChild(activeFood);
  }
  moveFood(x, y);
}

function moveFood(x, y) {
  if (!activeFood) return;
  activeFood.style.left = `${x - 13}px`;
  activeFood.style.top = `${y - 13}px`;
}

function feedComputer() {
  if (!activeFood) return;
  markChatActivity();
  const wasPoweredOff = isPoweredOff;
  const tastyFlight = Math.random() < 0.45;
  const tastyText = tastyFlight ? "好吃到飞起" : "好吃";
  changeBattery(BATTERY_FEED_GAIN);
  if (wasPoweredOff) {
    setPowerState(true);
  }
  activeFood.classList.add("eating");
  startMouthTalking(tastyFlight ? 1200 : 900);
  showSubtitle(tastyText, shouldUseColorfulSubtitle(tastyText));
  speakReply(tastyText);
  if (tastyFlight && !forcedFlight && !isPoweredOff) {
    setHatSpinning(true, 1600);
  }
  if (screenTimer) {
    window.clearTimeout(screenTimer);
  }
  screenTimer = window.setTimeout(() => {
    const batteryText = batteryPercent <= LOW_BATTERY_THRESHOLD ? "没电了" : `电量 ${batteryPercent}%`;
    showSubtitle(batteryText, false);
    showBatteryMomentarily(batteryPercent <= LOW_BATTERY_THRESHOLD ? 3200 : 2200);
    screenTimer = window.setTimeout(() => {
      showFaceOnly();
      setMood(0);
    }, batteryPercent <= LOW_BATTERY_THRESHOLD ? 2200 : 1600);
  }, 900);
  window.setTimeout(() => {
    activeFood?.remove();
    activeFood = null;
  }, 320);
}

function canPlantFood(foodType) {
  return foodType === "apple" || foodType === "orange";
}

function isNearGrass(y) {
  return y >= window.innerHeight * 0.6;
}

function spawnTree(x, y, foodType) {
  const tree = document.createElement("div");
  tree.className = `sprout-tree tree-${foodType}`;
  tree.dataset.foodType = foodType;
  tree.style.left = `${x - 23}px`;
  tree.style.top = `${y - 82}px`;

  ["left", "mid", "right"].forEach((side) => {
    const fruit = document.createElement("span");
    fruit.className = `tree-fruit fruit-${side}`;
    tree.appendChild(fruit);
  });

  document.body.appendChild(tree);
}

function setupFoodDrag() {
  if (!foodTray) return;

  const onPointerMove = (event) => {
    if (!foodDrag || !activeFood) return;
    moveFood(event.clientX - foodDrag.offsetX + 13, event.clientY - foodDrag.offsetY + 13);
  };

  const onPointerUp = (event) => {
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);

    if (!activeFood || !foodDrag) return;
    activeFood.classList.remove("dragging");

    const mouthRect = mouth.getBoundingClientRect();
    const hatRect = hatAssembly.getBoundingClientRect();
    const isNearMouth =
      event.clientX >= mouthRect.left - 32 &&
      event.clientX <= mouthRect.right + 32 &&
      event.clientY >= mouthRect.top - 32 &&
      event.clientY <= mouthRect.bottom + 32;
    const isNearHat =
      event.clientX >= hatRect.left - 28 &&
      event.clientX <= hatRect.right + 28 &&
      event.clientY >= hatRect.top - 28 &&
      event.clientY <= hatRect.bottom + 28;

    if (isNearMouth || (isPoweredOff && isNearHat)) {
      feedComputer();
    } else if (canPlantFood(foodDrag.foodType) && isNearGrass(event.clientY)) {
      spawnTree(event.clientX, event.clientY, foodDrag.foodType);
      activeFood.remove();
      activeFood = null;
    } else {
      moveFood(event.clientX - foodDrag.offsetX + 13, event.clientY - foodDrag.offsetY + 13);
      activeFood = null;
    }

    foodDrag = null;
  };

  const beginFoodDrag = (event, foodType, existingFood = null) => {
    markPointerActivity();
    event.preventDefault();
    const rect = existingFood?.getBoundingClientRect();
    spawnFood(event.clientX, event.clientY, foodType, existingFood);
    activeFood.classList.add("dragging");
    foodDrag = {
      foodType,
      offsetX: rect ? event.clientX - rect.left : 13,
      offsetY: rect ? event.clientY - rect.top : 13
    };
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };

  foodTray.addEventListener("pointerdown", (event) => {
    const option = event.target.closest(".food-option");
    if (!option) return;
    const foodType = option.dataset.foodType || "apple";
    beginFoodDrag(event, foodType);
  });

  document.body.addEventListener("pointerdown", (event) => {
    const food = event.target.closest(".food-piece");
    if (food) {
      beginFoodDrag(event, food.dataset.foodType || "apple", food);
      return;
    }

    const tree = event.target.closest(".sprout-tree");
    if (!tree) return;

    const rect = tree.getBoundingClientRect();
    const foodType = tree.dataset.foodType || "apple";
    tree.remove();
    beginFoodDrag(event, foodType);
    moveFood(rect.left + rect.width / 2, rect.top + rect.height / 2);
  });
}

function stopRecording() {
  if (!recognition || !isRecording) return;
  recognition.stop();
}

function setupSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    voiceHint.textContent = "当前浏览器不支持语音识别，可以直接输入文字聊天";
    micButton.disabled = true;
    micButton.textContent = "语音不可用";
    return;
  }

  recognition = new SpeechRecognition();
  recognition.lang = "zh-CN";
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onstart = () => {
    markChatActivity();
    isRecording = true;
    micButton.classList.add("recording");
    micButton.textContent = "正在听";
    voiceHint.textContent = "请直接说话，识别完成后会自动填入输入框";
    showSubtitle("滴。正在听你说话。", false);
  };

  recognition.onresult = (event) => {
    const transcript = event.results?.[0]?.[0]?.transcript?.trim();
    if (transcript) {
      markChatActivity();
      messageInput.value = transcript;
      answerUser(transcript);
    }
  };

  recognition.onerror = () => {
    markChatActivity();
    voiceHint.textContent = "刚才没有清楚听见，你也可以直接打字给电脑先生";
  };

  recognition.onend = () => {
    markChatActivity();
    isRecording = false;
    micButton.classList.remove("recording");
    micButton.textContent = "开始语音";
    voiceHint.textContent = "支持语音识别；不支持时可直接输入文字";
  };

  micButton.addEventListener("click", () => {
    if (isRecording) {
      stopRecording();
      return;
    }
    recognition.start();
  });
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  answerUser(messageInput.value);
});

dayNightToggle.addEventListener("click", () => {
  setDayNightMode(!isNightMode);
});

terrorToggle?.addEventListener("click", () => {
  if (isTerrorNightActive) {
    stopTerrorNight();
    return;
  }
  startTerrorNight();
});

weatherToggle?.addEventListener("click", () => {
  const currentIndex = Math.max(0, weatherOrder.indexOf(currentWeather));
  const nextWeather = weatherOrder[(currentIndex + 1) % weatherOrder.length];
  setWeather(nextWeather);
  scheduleWeatherChange();
});

lightToggle?.addEventListener("click", () => {
  setLightOn(!isLightOn);
});

window.setInterval(() => {
  if (isRecording || screenSubtitle.style.display === "block") return;
  moodIndex = (moodIndex + 1) % moods.length;
  setMood(moodIndex);
  showFaceOnly();
}, 3200);

setMood(moodIndex);
showFaceOnly();
setPowerState(true);
setDayNightMode(false);
setupSpeechRecognition();
setupSpeechUnlock();
setupFoodDrag();
loadVoices();
startSunBehaviorLoop();
updateBatteryUI();
startBatteryDrain();
setBatteryVisible(false);
updateTerrorToggleLabel();
updateLightToggleLabel();
setupInteractiveFace();
setupDragInteractions();
parkPlugAtChargingCorner();
startBlinkLoop();
scheduleIdleLook();
startIdleLookLoop();
setWeather("sunny", false);
scheduleWeatherChange(5000);

window.addEventListener("resize", () => {
  if (plugInserted && !plugDrag) {
    parkPlugAtChargingCorner();
  }
});

if ("speechSynthesis" in window) {
  window.speechSynthesis.onvoiceschanged = loadVoices;
}
