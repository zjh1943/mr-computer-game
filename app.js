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
const homeOutlet = document.querySelector("#home-outlet");
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
const salesBasket = document.querySelector("#sales-basket");
const moneyDisplay = document.querySelector("#money-display");
const mineToggle = document.querySelector("#mine-toggle");
const minePanel = document.querySelector("#mine-panel");
const mineGrid = document.querySelector("#mine-grid");
const inventoryGrid = document.querySelector("#inventory-grid");
const sellMineralsButton = document.querySelector("#sell-minerals");
const buyHouseButton = document.querySelector("#buy-house");
const computerHouse = document.querySelector("#computer-house");
const shopToggle = document.querySelector("#shop-toggle");
const shopPanel = document.querySelector("#shop-panel");
const shopSearch = document.querySelector("#shop-search");
const shopGrid = document.querySelector("#shop-grid");
const moveHomeButton = document.querySelector("#move-home");
const yardToggle = document.querySelector("#yard-toggle");
const homeToggle = document.querySelector("#home-toggle");
const callBackToggle = document.querySelector("#call-back-toggle");

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
let treeDrag = null;
let miniDrag = null;
let plugDrag = null;
let furnitureDrag = null;
let plugDetached = false;
let plugInserted = false;
let plugCharging = false;
let plugX = 0;
let plugY = 0;
let chargeTimer = null;
let chargingCaptionTimer = null;
let miniChatTimer = null;
let hatTakeStep = 0;
let nightAwakeUntil = 0;
let money = 0;
let minedItems = [];
let minePanelOpen = false;
let houseBought = false;
let shopPanelOpen = false;
let computerMovedIn = false;
let isAtHome = false;
const ownedShopItems = new Set();
let customShopItems = [];
let bornMiniComputers = [];

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
const SAVE_KEY = "mr-computer-game-save-v1";
const MINI_MIN_GROWTH = 0.42;
const MINI_GROW_STEP = 0.18;
const MINI_MAX_GROWTH = 1.9;
const weatherOrder = ["sunny", "cloudy", "rain", "snow"];
const weatherLabels = {
  sunny: "晴天",
  cloudy: "多云",
  rain: "下雨",
  snow: "下雪"
};
const HOUSE_PRICE = 120;
const MINE_CELL_COUNT = 18;
const INVENTORY_SLOT_COUNT = 12;
const mineralTypes = [
  { id: "stone", label: "石头", icon: "●", value: 3, chance: 42 },
  { id: "copper", label: "铜", icon: "◆", value: 8, chance: 28 },
  { id: "silver", label: "银", icon: "◇", value: 15, chance: 18 },
  { id: "gold", label: "金", icon: "★", value: 28, chance: 9 },
  { id: "gem", label: "宝石", icon: "✦", value: 45, chance: 3 }
];
const shopItems = [
  { id: "house", label: "木房子", icon: "家", price: HOUSE_PRICE, type: "house", keywords: "家 房子 木屋 小家" },
  { id: "bed", label: "小床", icon: "床", price: 35, type: "furniture", keywords: "床 小床 睡觉" },
  { id: "lamp", label: "台灯", icon: "灯", price: 25, type: "furniture", keywords: "灯 台灯 灯光" },
  { id: "sofa", label: "沙发", icon: "沙", price: 45, type: "furniture", keywords: "沙发 椅子 坐" },
  { id: "table", label: "小桌子", icon: "桌", price: 30, type: "furniture", keywords: "桌子 小桌子 桌" },
  { id: "bookshelf", label: "书架", icon: "书", price: 32, type: "furniture", keywords: "书架 书 本子" },
  { id: "rug", label: "地毯", icon: "毯", price: 18, type: "furniture", keywords: "地毯 毯子" },
  { id: "tv", label: "电视", icon: "电", price: 55, type: "furniture", keywords: "电视 屏幕 动画" },
  { id: "fridge", label: "冰箱", icon: "冰", price: 50, type: "furniture", keywords: "冰箱 冷饮 食物" },
  { id: "plant", label: "小花", icon: "花", price: 16, type: "furniture", keywords: "花 植物 盆栽 草" },
  { id: "clock", label: "时钟", icon: "钟", price: 22, type: "furniture", keywords: "时钟 钟 表 时间" },
  { id: "toy", label: "玩具", icon: "玩", price: 20, type: "furniture", keywords: "玩具 游戏 好玩" },
  { id: "outlet", label: "插座", icon: "插", price: 28, type: "furniture", kind: "outlet", keywords: "插座 充电 电源 插口" },
  { id: "mr-computer", label: "电脑先生", icon: "电", price: 500, type: "furniture", kind: "computer", keywords: "电脑先生 电脑 小电脑 屏幕" },
  { id: "big-window", label: "大窗户", icon: "窗", price: 180, type: "furniture", kind: "big-window", keywords: "大窗户 大窗 大玻璃 天气" }
];

function randomFrom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function getAllShopItems() {
  return [...shopItems, ...customShopItems];
}

function inferFurnitureKind(label) {
  if (/电脑先生|电脑|computer/i.test(label)) return "computer";
  if (/大窗|大窗户|大玻璃|big window/i.test(label)) return "big-window";
  if (/窗|window/i.test(label)) return "window";
  if (/床|bed/i.test(label)) return "bed";
  if (/灯|light|lamp/i.test(label)) return "lamp";
  if (/桌|table/i.test(label)) return "table";
  if (/沙发|椅|sofa|chair/i.test(label)) return "sofa";
  if (/电视|屏幕|tv/i.test(label)) return "tv";
  if (/冰箱|fridge/i.test(label)) return "fridge";
  if (/花|草|树|植物|plant/i.test(label)) return "plant";
  if (/书|书架|book/i.test(label)) return "bookshelf";
  if (/地毯|毯|rug/i.test(label)) return "rug";
  if (/钟|表|clock/i.test(label)) return "clock";
  if (/玩具|娃娃|球|toy/i.test(label)) return "toy";
  if (/插座|插口|充电|电源|outlet|plug/i.test(label)) return "outlet";
  if (/门|door/i.test(label)) return "door";
  return "decor";
}

function makeCustomShopItem(searchText) {
  const label = searchText.trim().slice(0, 12);
  if (!label) return null;
  const kind = inferFurnitureKind(label);
  const code = Array.from(label)
    .map((char) => char.codePointAt(0).toString(36))
    .join("-");
  return {
    id: `custom-${code}`,
    label,
    icon: label.slice(0, 1),
    price: clamp(12 + label.length * 4, 16, 80),
    type: "furniture",
    kind,
    custom: true,
    keywords: label
  };
}

function rememberCustomShopItem(item) {
  if (!item?.custom || customShopItems.some((entry) => entry.id === item.id)) return;
  customShopItems.push(item);
}

function isShopItemOwned(item) {
  return item.type === "house" ? houseBought : ownedShopItems.has(item.id);
}

function getFurnitureElement(itemId) {
  return document.querySelector(`.house-${itemId}`) || null;
}

function addMiniComputerParts(element) {
  element.textContent = "";
  ["screen", "eye left", "eye right", "mouth", "stand", "hat", "hat-brim"].forEach((part) => {
    const piece = document.createElement("span");
    piece.className = part.startsWith("eye")
      ? `mini-computer-eye ${part.split(" ")[1]}`
      : `mini-computer-${part}`;
    if (part === "screen") {
      const chat = document.createElement("span");
      chat.className = "mini-computer-chat";
      piece.appendChild(chat);
    }
    element.appendChild(piece);
  });
}

function createFurnitureElement(item) {
  if (!item || item.type === "house") return null;
  const element = document.createElement("span");
  const kind = item.kind || inferFurnitureKind(item.label || "");
  element.className = `house-item house-${item.id} custom-shop-furniture custom-kind-${kind}`;
  element.dataset.itemId = item.id;
  element.dataset.kind = kind;
  element.textContent = item.icon || item.label.slice(0, 1);
  element.setAttribute("aria-hidden", "true");
  if (kind === "outlet") {
    element.textContent = "";
    element.append(document.createElement("span"), document.createElement("span"));
    element.firstElementChild.className = "outlet-hole";
    element.lastElementChild.className = "outlet-hole";
  } else if (kind === "computer") {
    addMiniComputerParts(element);
  }
  computerHouse?.appendChild(element);
  return element;
}

function createBornMiniComputer(data = {}) {
  const miniId = data.id || `born-mini-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const element = document.createElement("div");
  element.className = "born-mini-computer custom-kind-computer";
  element.dataset.miniId = miniId;
  element.dataset.growthLevel = `${Number.isFinite(data.growthLevel) ? data.growthLevel : 1}`;
  element.setAttribute("aria-hidden", "true");
  addMiniComputerParts(element);
  element.style.left = data.left || "50vw";
  element.style.top = data.top || "62vh";
  applyMiniComputerGrowth(element);
  document.body.appendChild(element);
  return element;
}

function getMiniComputerGrowth(miniComputer) {
  return clamp(Number.parseFloat(miniComputer?.dataset.growthLevel || "1") || 1, MINI_MIN_GROWTH, MINI_MAX_GROWTH);
}

function applyMiniComputerGrowth(miniComputer) {
  if (!miniComputer) return;
  miniComputer.style.setProperty("--mini-growth", `${getMiniComputerGrowth(miniComputer)}`);
}

function saveBornMiniComputer(element) {
  if (!element) return;
  const miniId = element.dataset.miniId;
  if (!miniId) return;

  const record = {
    id: miniId,
    left: element.style.left,
    top: element.style.top,
    growthLevel: getMiniComputerGrowth(element)
  };
  const existingIndex = bornMiniComputers.findIndex((item) => item.id === miniId);
  if (existingIndex >= 0) {
    bornMiniComputers[existingIndex] = record;
  } else {
    bornMiniComputers.push(record);
  }
}

function spawnBornMiniComputerNearComputer() {
  const shellRect = computerShell.getBoundingClientRect();
  const baseLeft = shellRect.left + shellRect.width * (0.52 + Math.random() * 0.18);
  const baseTop = shellRect.top + shellRect.height * 0.72;
  const miniLeft = clamp(baseLeft, 12, Math.max(12, window.innerWidth - 118));
  const miniTop = clamp(baseTop, 12, Math.max(12, window.innerHeight - 150));
  const miniComputer = createBornMiniComputer({
    left: `${miniLeft}px`,
    top: `${miniTop}px`
  });

  miniComputer.classList.add("mini-newborn");
  showMiniComputerMessage("我出生啦", 2400);
  window.setTimeout(() => {
    miniComputer.classList.remove("mini-newborn");
  }, 900);
  saveBornMiniComputer(miniComputer);
  saveGameState();
}

function spawnTinyMiniComputerNearMini(parentMiniComputer) {
  if (!parentMiniComputer) return;
  const parentRect = parentMiniComputer.getBoundingClientRect();
  const parentGrowth = getMiniComputerGrowth(parentMiniComputer);
  const babyGrowth = clamp(parentGrowth * 0.62, MINI_MIN_GROWTH, 1);
  const miniLeft = clamp(parentRect.left + parentRect.width * 0.58, 12, Math.max(12, window.innerWidth - 96));
  const miniTop = clamp(parentRect.top + parentRect.height * 0.68, 12, Math.max(12, window.innerHeight - 126));
  const babyComputer = createBornMiniComputer({
    left: `${miniLeft}px`,
    top: `${miniTop}px`,
    growthLevel: babyGrowth
  });

  babyComputer.classList.add("mini-newborn");
  showMiniComputerMessage("更小的我来啦", 2400);
  window.setTimeout(() => {
    babyComputer.classList.remove("mini-newborn");
  }, 900);
  saveBornMiniComputer(babyComputer);
  saveGameState();
}

function growMiniComputer(miniComputer) {
  if (!miniComputer) return;
  const nextGrowth = clamp(getMiniComputerGrowth(miniComputer) + MINI_GROW_STEP, MINI_MIN_GROWTH, MINI_MAX_GROWTH);
  miniComputer.dataset.growthLevel = `${nextGrowth}`;
  applyMiniComputerGrowth(miniComputer);
  miniComputer.classList.add("mini-growing");
  window.setTimeout(() => {
    miniComputer.classList.remove("mini-growing");
  }, 620);
  if (miniComputer.classList.contains("born-mini-computer")) {
    saveBornMiniComputer(miniComputer);
    saveGameState();
  }
}

function activateFurniture(itemId) {
  const item = getAllShopItems().find((entry) => entry.id === itemId);
  let element = getFurnitureElement(itemId);
  if (!element) {
    element = createFurnitureElement(item);
  }
  if (!element) return;
  const kind = item?.kind || inferFurnitureKind(item?.label || "");
  computerHouse?.classList.add(`has-${itemId}`);
  element.dataset.itemId = itemId;
  element.classList.add("movable", "owned-furniture");
  element.classList.add(`custom-kind-${kind}`);
  element.dataset.kind = kind;
  if (element.parentElement !== document.body) {
    document.body.appendChild(element);
  }
}

function saveGameState() {
  const furniture = {};
  getAllShopItems().forEach((item) => {
    if (item.type === "house") return;
    const element = getFurnitureElement(item.id);
    if (!element || !element.classList.contains("custom-placed")) return;
    furniture[item.id] = {
      left: element.style.left,
      top: element.style.top
    };
  });

  const saveData = {
    money,
    minedItems: minedItems.map((item) => item.id),
    houseBought,
    computerMovedIn,
    isAtHome,
    ownedShopItems: Array.from(ownedShopItems),
    customShopItems,
    shellPosition: {
      x: shellOffsetX,
      y: shellOffsetY
    },
    bornMiniComputers,
    furniture
  };

  try {
    window.localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
  } catch {
    // Safari private mode can block localStorage; the game still works without saving.
  }
}

function restoreFurniturePosition(itemId, position) {
  const element = getFurnitureElement(itemId);
  if (!element || !position?.left || !position?.top) return;
  element.style.position = "fixed";
  element.style.left = position.left;
  element.style.top = position.top;
  element.style.right = "auto";
  element.style.bottom = "auto";
  element.classList.add("custom-placed");
}

function loadGameState() {
  let saveData = null;
  try {
    saveData = JSON.parse(window.localStorage.getItem(SAVE_KEY) || "null");
  } catch {
    saveData = null;
  }
  if (!saveData) return;

  money = Number.isFinite(saveData.money) ? saveData.money : 0;
  minedItems = Array.isArray(saveData.minedItems)
    ? saveData.minedItems
        .map((id) => mineralTypes.find((item) => item.id === id))
        .filter(Boolean)
    : [];
  houseBought = Boolean(saveData.houseBought);
  computerMovedIn = Boolean(saveData.computerMovedIn);
  isAtHome = Boolean(saveData.isAtHome && computerMovedIn);
  if (saveData.shellPosition && Number.isFinite(saveData.shellPosition.x) && Number.isFinite(saveData.shellPosition.y)) {
    shellOffsetX = saveData.shellPosition.x;
    shellOffsetY = saveData.shellPosition.y;
    updateShellPosition();
  }
  customShopItems = Array.isArray(saveData.customShopItems)
    ? saveData.customShopItems
        .filter((item) => item?.id && item?.label)
        .map((item) => ({
          id: item.id,
          label: item.label,
          icon: item.icon || item.label.slice(0, 1),
          price: Number.isFinite(item.price) ? item.price : 24,
          type: "furniture",
          kind: item.kind || inferFurnitureKind(item.label),
          custom: true,
          keywords: item.keywords || item.label
        }))
    : [];
  bornMiniComputers = Array.isArray(saveData.bornMiniComputers)
    ? saveData.bornMiniComputers
        .filter((item) => item?.id && item?.left && item?.top)
        .map((item) => ({
          id: item.id,
          left: item.left,
          top: item.top,
          growthLevel: Number.isFinite(item.growthLevel) ? item.growthLevel : 1
        }))
    : [];

  ownedShopItems.clear();
  if (Array.isArray(saveData.ownedShopItems)) {
    saveData.ownedShopItems.forEach((itemId) => {
      if (getAllShopItems().some((item) => item.id === itemId)) {
        ownedShopItems.add(itemId);
      }
    });
  }

  if (houseBought) {
    computerHouse?.classList.add("visible");
  }
  if (computerMovedIn) {
    computerHouse?.classList.add("occupied");
  }
  if (isAtHome) {
    document.body.classList.add("home-mode");
    computerShell.classList.add("visiting-house");
  }

  ownedShopItems.forEach((itemId) => {
    activateFurniture(itemId);
    restoreFurniturePosition(itemId, saveData.furniture?.[itemId]);
  });

  bornMiniComputers.forEach((miniComputer) => {
    createBornMiniComputer(miniComputer);
  });
}

function weightedRandomMineral() {
  const totalChance = mineralTypes.reduce((sum, item) => sum + item.chance, 0);
  let roll = Math.random() * totalChance;
  for (const item of mineralTypes) {
    roll -= item.chance;
    if (roll <= 0) return item;
  }
  return mineralTypes[0];
}

function updateMoneyUI() {
  if (moneyDisplay) {
    moneyDisplay.textContent = `钱：${money}`;
  }
  if (buyHouseButton) {
    buyHouseButton.hidden = true;
  }
  updateShopButtons();
}

function updateHomeTravelButtons() {
  if (yardToggle) {
    yardToggle.hidden = false;
    yardToggle.disabled = !isAtHome;
    yardToggle.classList.toggle("active", isAtHome);
  }
  if (homeToggle) {
    homeToggle.hidden = false;
    homeToggle.disabled = !computerMovedIn || isAtHome;
    homeToggle.classList.toggle("active", computerMovedIn && !isAtHome);
  }
}

function updateShopButtons() {
  if (moveHomeButton) {
    moveHomeButton.hidden = !houseBought || computerMovedIn;
  }
  updateHomeTravelButtons();

  if (!shopGrid) return;
  shopGrid.querySelectorAll(".shop-buy").forEach((button) => {
    const item = getAllShopItems().find((entry) => entry.id === button.dataset.itemId);
    if (!item) return;
    const owned = isShopItemOwned(item);
    button.disabled = owned || money < item.price;
    button.textContent = owned ? "已买" : `${item.price}`;
  });
}

function renderShop() {
  if (!shopGrid) return;
  const searchText = shopSearch?.value.trim() || "";
  const searchNeedle = searchText.toLowerCase();
  let visibleItems = getAllShopItems().filter((item) => {
    if (!searchNeedle) return true;
    return `${item.label} ${item.keywords || ""}`.toLowerCase().includes(searchNeedle);
  });
  const customSearchItem = searchText ? makeCustomShopItem(searchText) : null;
  if (customSearchItem && !getAllShopItems().some((item) => item.id === customSearchItem.id)) {
    visibleItems = [customSearchItem, ...visibleItems];
  }

  shopGrid.innerHTML = "";
  visibleItems.forEach((item) => {
    const card = document.createElement("div");
    card.className = `shop-card shop-${item.id}`;

    const icon = document.createElement("span");
    icon.className = "shop-icon";
    icon.textContent = item.icon;

    const name = document.createElement("span");
    name.className = "shop-name";
    name.textContent = item.label;

    const button = document.createElement("button");
    button.className = "shop-buy";
    button.type = "button";
    button.dataset.itemId = item.id;
    button.disabled = isShopItemOwned(item) || money < item.price;
    button.textContent = isShopItemOwned(item) ? "已买" : `${item.price}`;
    button.addEventListener("click", () => buyShopItem(item.id, item));

    card.append(icon, name, button);
    shopGrid.appendChild(card);
  });
  if (!visibleItems.length) {
    const empty = document.createElement("p");
    empty.className = "shop-empty";
    empty.textContent = "换个名字搜一搜。";
    shopGrid.appendChild(empty);
  }
  updateShopButtons();
}

function renderInventory() {
  if (!inventoryGrid) return;
  inventoryGrid.innerHTML = "";
  for (let index = 0; index < INVENTORY_SLOT_COUNT; index += 1) {
    const slot = document.createElement("span");
    slot.className = "inventory-slot";
    const item = minedItems[index];
    if (item) {
      slot.classList.add(`mineral-${item.id}`);
      slot.textContent = item.icon;
      slot.title = `${item.label}，价值 ${item.value}`;
    }
    inventoryGrid.appendChild(slot);
  }
}

function renderMineGrid() {
  if (!mineGrid) return;
  mineGrid.innerHTML = "";
  for (let index = 0; index < MINE_CELL_COUNT; index += 1) {
    const cell = document.createElement("button");
    cell.className = "mine-cell";
    cell.type = "button";
    cell.setAttribute("aria-label", `矿洞格子 ${index + 1}`);
    cell.textContent = "土";
    cell.addEventListener("click", () => mineCell(cell));
    mineGrid.appendChild(cell);
  }
}

function mineCell(cell) {
  markChatActivity();
  wakeFromNightSleep();
  if (minedItems.length >= INVENTORY_SLOT_COUNT) {
    speakAsComputer("背包满了，先按销售换钱。", { forceSubtitle: true, colorful: false });
    return;
  }

  const mineral = weightedRandomMineral();
  minedItems.push(mineral);
  cell.className = `mine-cell mined mineral-${mineral.id}`;
  cell.textContent = mineral.icon;
  cell.disabled = true;
  renderInventory();
  updateMoneyUI();
  saveGameState();
  const message = mineral.id === "gem" || mineral.id === "gold"
    ? `挖到${mineral.label}了，好闪。`
    : `挖到${mineral.label}了。`;
  speakAsComputer(message, { forceSubtitle: true, colorful: mineral.id === "gem" || mineral.id === "gold" });
}

function sellMinedItems() {
  markChatActivity();
  if (!minedItems.length) {
    speakAsComputer("背包还是空的，先挖几格矿。", { forceSubtitle: true, colorful: false });
    return;
  }

  const earned = minedItems.reduce((sum, item) => sum + item.value, 0);
  minedItems = [];
  money += earned;
  renderInventory();
  renderMineGrid();
  updateMoneyUI();
  saveGameState();
  speakAsComputer(`销售成功，得到 ${earned} 块钱。`, { forceSubtitle: true, colorful: earned >= 40 });
}

function buyHouseForComputer() {
  markChatActivity();
  if (houseBought) return;
  if (money < HOUSE_PRICE) {
    speakAsComputer(`还差 ${HOUSE_PRICE - money} 块钱才能买房子。`, { forceSubtitle: true, colorful: false });
    return;
  }

  money -= HOUSE_PRICE;
  houseBought = true;
  computerHouse?.classList.add("visible");
  renderShop();
  updateMoneyUI();
  saveGameState();
  speakAsComputer("哇，电脑先生有自己的小房子了。", { forceSubtitle: true, colorful: true });
}

function enterHomeMode() {
  computerMovedIn = true;
  isAtHome = true;
  document.body.classList.add("home-mode");
  computerHouse?.classList.add("occupied");
  computerShell.classList.add("visiting-house");
  clearRainErrorState();
  updateComputerWeatherMarks();
  parkPlugAtChargingCorner();
  updateHomeTravelButtons();
  updateShopButtons();
  saveGameState();
}

function moveComputerIntoHouse() {
  markChatActivity();
  if (!houseBought) {
    speakAsComputer("还没有房子，先攒钱买房子。", { forceSubtitle: true, colorful: false });
    return;
  }
  if (isAtHome) return;

  enterHomeMode();
  speakAsComputer("电脑先生入住啦，小房子亮起来了。", { forceSubtitle: true, colorful: true });
}

function returnToYard() {
  markChatActivity();
  if (!isAtHome) {
    speakAsComputer("电脑先生已经在草坪上了。", { forceSubtitle: true, colorful: false });
    return;
  }
  isAtHome = false;
  document.body.classList.remove("home-mode");
  computerShell.classList.remove("visiting-house");
  updateHomeTravelButtons();
  updateShopButtons();
  if (currentWeather === "rain") {
    computerShell.classList.add("rained-on");
    updateComputerWeatherMarks();
  }
  parkPlugAtChargingCorner();
  saveGameState();
  speakAsComputer("电脑先生回到草坪上了。", { forceSubtitle: true, colorful: false });
}

function returnHomeFromYard() {
  markChatActivity();
  if (!houseBought || !computerMovedIn) {
    speakAsComputer("还没有家，先买房子再入住。", { forceSubtitle: true, colorful: false });
    return;
  }
  if (isAtHome) {
    speakAsComputer("电脑先生已经在家里了。", { forceSubtitle: true, colorful: false });
    return;
  }
  enterHomeMode();
  speakAsComputer("电脑先生回家了，雨淋不到他。", { forceSubtitle: true, colorful: true });
}

function buyShopItem(itemId, visibleItem = null) {
  markChatActivity();
  const item = visibleItem || getAllShopItems().find((entry) => entry.id === itemId);
  if (!item) return;
  if (item.type === "house") {
    buyHouseForComputer();
    return;
  }
  if (ownedShopItems.has(itemId)) return;
  if (money < item.price) {
    speakAsComputer(`还差 ${item.price - money} 块钱才能买${item.label}。`, { forceSubtitle: true, colorful: false });
    return;
  }

  money -= item.price;
  rememberCustomShopItem(item);
  ownedShopItems.add(itemId);
  activateFurniture(itemId);
  renderShop();
  updateMoneyUI();
  saveGameState();
  speakAsComputer(`${item.label}买好了，可以拖到房间里任何地方。`, { forceSubtitle: true, colorful: itemId === "lamp" });
}

function setMinePanelOpen(open) {
  minePanelOpen = open;
  if (open) {
    setShopPanelOpen(false);
  }
  if (minePanel) {
    minePanel.hidden = !minePanelOpen;
  }
  mineToggle?.classList.toggle("active", minePanelOpen);
  if (mineToggle) {
    mineToggle.textContent = minePanelOpen ? "收起矿场" : "挖矿";
  }
}

function setShopPanelOpen(open) {
  shopPanelOpen = open;
  if (open) {
    setMinePanelOpen(false);
  }
  if (shopPanel) {
    shopPanel.hidden = !shopPanelOpen;
  }
  shopToggle?.classList.toggle("active", shopPanelOpen);
}

function setupMiningGame() {
  renderMineGrid();
  renderInventory();
  renderShop();
  updateMoneyUI();
  shopSearch?.addEventListener("input", renderShop);
  mineToggle?.addEventListener("click", () => {
    setMinePanelOpen(!minePanelOpen);
    if (!minePanelOpen) return;
    speakAsComputer("小矿场打开了，点格子就能挖矿。", { forceSubtitle: true, colorful: false });
  });
  sellMineralsButton?.addEventListener("click", sellMinedItems);
  buyHouseButton?.addEventListener("click", buyHouseForComputer);
  shopToggle?.addEventListener("click", () => {
    setShopPanelOpen(!shopPanelOpen);
    if (shopPanelOpen) {
      speakAsComputer("商城打开了，搜索想买的东西也可以买。", { forceSubtitle: true, colorful: false });
      shopSearch?.focus();
    }
  });
  moveHomeButton?.addEventListener("click", moveComputerIntoHouse);
  yardToggle?.addEventListener("click", returnToYard);
  homeToggle?.addEventListener("click", returnHomeFromYard);
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
  updateMiniComputerSleepState(false);
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

function updateMiniComputerSleepState(forceAwake = null) {
  const shouldSleep = forceAwake === null
    ? (isSleepyIdle() || isNightSleepy()) && !isPoweredOff && !isTerrorNightActive
    : !forceAwake;

  document.querySelectorAll(".custom-kind-computer").forEach((miniComputer) => {
    miniComputer.classList.toggle("mini-sleepy", shouldSleep);
    if (shouldSleep) {
      miniComputer.classList.remove("mini-chatting", "mini-eating");
    }
  });
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

function updateMiniComputerLook(clientX, clientY) {
  document.querySelectorAll(".custom-kind-computer").forEach((miniComputer) => {
    const rect = miniComputer.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height * 0.48;
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    const lookX = clamp(deltaX / 26, -4, 4);
    const lookY = clamp(deltaY / 36, -3, 3);

    miniComputer.style.setProperty("--mini-eye-look-x", `${lookX}px`);
    miniComputer.style.setProperty("--mini-eye-look-y", `${lookY}px`);
  });
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
  homeOutlet?.classList.remove("charging");
  getPurchasedOutlet()?.classList.remove("charging");
  if (!isPoweredOff && batteryPercent > LOW_BATTERY_THRESHOLD) {
    setBatteryVisible(false);
  }
  if (showFace && !isPoweredOff) {
    showFaceOnly();
    setMood(0);
  }
}

function getActiveOutlet() {
  return isAtHome ? (getPurchasedOutlet() || homeOutlet) : floorOutlet;
}

function getPurchasedOutlet() {
  const outlet = getFurnitureElement("outlet");
  if (!outlet || !ownedShopItems.has("outlet") || !isAtHome) return null;
  return outlet;
}

function getChargeOutlets() {
  return [getPurchasedOutlet(), isAtHome ? homeOutlet : floorOutlet].filter(Boolean);
}

function dockPlugToOutlet(outlet = getActiveOutlet()) {
  if (!backPlug || !outlet) return;
  const outletRect = outlet.getBoundingClientRect();
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

function startPlugCharging(outlet = getActiveOutlet()) {
  dockPlugToOutlet(outlet);
  stopPlugCharging();
  plugCharging = true;
  backPlug?.classList.add("charging");
  outlet?.classList.add("charging");
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
  if (!backPlug || !getActiveOutlet() || plugDrag || plugCharging) return;
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

function clearRainErrorState() {
  if (rainErrorTimer) {
    window.clearTimeout(rainErrorTimer);
    rainErrorTimer = null;
  }
  if (rainCodeTimer) {
    window.clearTimeout(rainCodeTimer);
    rainCodeTimer = null;
  }
  computerShell.classList.remove("rained-on", "rain-squint", "rain-error", "rain-code-mode");
}

function updateComputerWeatherMarks() {
  if (sunDryTimer) {
    window.clearTimeout(sunDryTimer);
    sunDryTimer = null;
  }

  computerShell.classList.toggle("snow-covered", currentWeather === "snow");

  if (isAtHome) {
    computerShell.classList.remove("wet", "snow-covered", "sun-drying", "rained-on", "rain-squint", "rain-error", "rain-code-mode");
    return;
  }

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
  clearRainErrorState();
  currentWeather = weatherOrder.includes(weather) ? weather : "sunny";
  document.body.classList.toggle("weather-cloudy", currentWeather === "cloudy");
  document.body.classList.toggle("weather-rain", currentWeather === "rain");
  document.body.classList.toggle("weather-snow", currentWeather === "snow");
  computerShell.classList.toggle("rained-on", currentWeather === "rain" && !isAtHome);
  updateComputerWeatherMarks();
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
    updateComputerWeatherMarks();
    computerShell.classList.toggle("rain-squint", currentWeather === "rain" && !isAtHome);
    if (currentWeather === "rain" && !isAtHome) {
      rainErrorTimer = window.setTimeout(() => {
        rainErrorTimer = null;
        if (currentWeather !== "rain" || isAtHome || isPoweredOff || isTerrorNightActive) return;
        computerShell.classList.add("rain-error");
        showSubtitle("报错", false);
        rainCodeTimer = window.setTimeout(() => {
          rainCodeTimer = null;
          if (currentWeather !== "rain" || isAtHome || isPoweredOff || isTerrorNightActive) return;
          computerShell.classList.add("rain-code-mode");
          showSubtitle("太阳公公已出海对话取消无限个取消，下雨了", false);
        }, 900);
      }, 850);
    }
  }, weatherSpeechDuration);
}

function resetOpeningWeatherState() {
  clearRainErrorState();
  computerShell.classList.remove("wet", "snow-covered", "sun-drying");
  setWeather("sunny", false);
  showFaceOnly();
  setMood(0);
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

function setCallBackVisible(visible) {
  if (callBackToggle) {
    if (visible) {
      callBackToggle.hidden = false;
      callBackToggle.removeAttribute("hidden");
      callBackToggle.style.display = "block";
    } else {
      callBackToggle.hidden = true;
      callBackToggle.style.display = "";
    }
  }
  document.body.classList.toggle("computer-away", visible);
}

function attachHatToComputer() {
  hatDetached = false;
  hatDrag = null;
  hatX = 0;
  hatY = 0;
  hatAssembly.classList.remove("detached");
  updateHatPosition();
}

function flyAwayWithHat() {
  attachHatToComputer();
  forcedFlight = true;
  computerShell.classList.add("fly-away");
  setHatSpinning(true, null);
  setCallBackVisible(true);
  speakAsComputer("帽子戴好了，我飞走啦。", { forceSubtitle: true, colorful: true });
}

function callComputerBack() {
  markChatActivity();
  wakeFromNightSleep();
  computerShell.classList.remove("fly-away");
  forcedFlight = false;
  hatTakeStep = 0;
  attachHatToComputer();
  setHatSpinning(false);
  setCallBackVisible(false);
  showFaceOnly();
  speakAsComputer("我回来啦，帽子也戴好了。", { forceSubtitle: true, colorful: true });
}

function setPowerState(powerOn) {
  isPoweredOff = !powerOn;
  computerShell.classList.toggle("powered-off", !powerOn);

  if (powerOn) {
    lowPowerWarningShown = false;
    computerShell.classList.remove("fly-away");
    forcedFlight = false;
    setCallBackVisible(false);
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
  updateMiniComputerSleepState();
  if (!forcedFlight) {
    computerShell.classList.add("grounded");
  }
}

function startBlinkLoop() {
  if (blinkTimer) {
    window.clearTimeout(blinkTimer);
  }

  blinkTimer = window.setTimeout(() => {
    updateMiniComputerSleepState();
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
    updateMiniComputerLook(event.clientX, event.clientY);
    scheduleIdleLook();
    if (isNightSleepy()) {
      computerShell.classList.add("sleepy");
      updateMiniComputerSleepState();
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
    updateMiniComputerSleepState(false);

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
  updateShellPosition();
  saveGameState();

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
    if (miniDrag) {
      const nextLeft = clamp(
        event.clientX - miniDrag.offsetX,
        8,
        Math.max(8, window.innerWidth - miniDrag.width - 8)
      );
      const nextTop = clamp(
        event.clientY - miniDrag.offsetY,
        8,
        Math.max(8, window.innerHeight - miniDrag.height - 8)
      );
      miniDrag.element.style.left = `${nextLeft}px`;
      miniDrag.element.style.top = `${nextTop}px`;
      salesBasket?.classList.toggle("ready", isNearSalesBasket(event.clientX, event.clientY));
      return;
    }

    if (furnitureDrag) {
      const nextLeft = clamp(
        event.clientX - furnitureDrag.offsetX,
        8,
        Math.max(8, window.innerWidth - furnitureDrag.width - 8)
      );
      const nextTop = clamp(
        event.clientY - furnitureDrag.offsetY,
        8,
        Math.max(8, window.innerHeight - furnitureDrag.height - 8)
      );
      furnitureDrag.element.style.left = `${nextLeft}px`;
      furnitureDrag.element.style.top = `${nextTop}px`;
      furnitureDrag.element.style.right = "auto";
      furnitureDrag.element.style.bottom = "auto";
      furnitureDrag.element.style.position = "fixed";
      furnitureDrag.element.classList.add("custom-placed");
      salesBasket?.classList.toggle("ready", isNearSalesBasket(event.clientX, event.clientY));
      return;
    }

    if (shellDrag) {
      const nextX = event.clientX - shellDrag.startX + shellDrag.originX;
      const nextY = event.clientY - shellDrag.startY + shellDrag.originY;
      shellOffsetX = clamp(nextX, shellDrag.minX, shellDrag.maxX);
      shellOffsetY = clamp(nextY, shellDrag.minY, shellDrag.maxY);
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
    if (miniDrag) {
      miniDrag.element.classList.remove("dragging");
      salesBasket?.classList.remove("ready");
      if (isNearSalesBasket(event.clientX, event.clientY)) {
        sellBornMiniComputer(miniDrag.element);
        miniDrag = null;
        return;
      }
      saveBornMiniComputer(miniDrag.element);
      miniDrag = null;
      saveGameState();
    }

    if (furnitureDrag) {
      furnitureDrag.element.classList.remove("dragging");
      salesBasket?.classList.remove("ready");
      if (isNearSalesBasket(event.clientX, event.clientY)) {
        sellFurnitureItem(furnitureDrag.element);
        furnitureDrag = null;
        return;
      }
      furnitureDrag = null;
      saveGameState();
    }

    if (shellDrag) {
      computerShell.classList.remove("dragging");
      shellDrag = null;
      startShellDrop();
    }

    if (hatDrag) {
      hatDrag = null;
    }

  if (plugDrag) {
      const activeOutlet = getChargeOutlets().find((outlet) => {
        const outletRect = outlet.getBoundingClientRect();
        return (
          event.clientX >= outletRect.left - 34 &&
          event.clientX <= outletRect.right + 34 &&
          event.clientY >= outletRect.top - 28 &&
          event.clientY <= outletRect.bottom + 28
        );
      });

      if (activeOutlet) {
        startPlugCharging(activeOutlet);
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

  document.body.addEventListener("pointerdown", (event) => {
    const bornMiniComputer = event.target.closest(".born-mini-computer");
    if (bornMiniComputer) {
      event.preventDefault();
      markPointerActivity();
      wakeFromNightSleep();
      const rect = bornMiniComputer.getBoundingClientRect();
      bornMiniComputer.classList.add("dragging");
      miniDrag = {
        element: bornMiniComputer,
        offsetX: event.clientX - rect.left,
        offsetY: event.clientY - rect.top,
        width: rect.width,
        height: rect.height
      };
      return;
    }

    const item = event.target.closest(".house-item.movable");
    if (!item || !isAtHome) return;
    event.preventDefault();
    markPointerActivity();
    wakeFromNightSleep();
    const rect = item.getBoundingClientRect();
    item.classList.add("dragging");
    item.style.left = `${rect.left}px`;
    item.style.top = `${rect.top}px`;
    item.style.right = "auto";
    item.style.bottom = "auto";
    item.style.width = `${rect.width}px`;
    item.style.height = `${rect.height}px`;
    item.style.position = "fixed";
    item.classList.add("custom-placed");
    furnitureDrag = {
      element: item,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
      width: rect.width,
      height: rect.height
    };
  });

  computerShell.addEventListener("pointerdown", (event) => {
    markPointerActivity();
    wakeFromNightSleep();
    if (event.target.closest(".hat-assembly") || event.target.closest("#chat-form") || event.target.closest(".back-plug")) return;
    event.preventDefault();
    setDizzy(false);
    const rect = computerShell.getBoundingClientRect();
    const baseLeft = rect.left - shellOffsetX;
    const baseTop = rect.top - shellOffsetY;
    computerShell.classList.add("dragging");
    shellDrag = {
      startX: event.clientX,
      startY: event.clientY,
      originX: shellOffsetX,
      originY: shellOffsetY,
      minX: 8 - baseLeft,
      maxX: window.innerWidth - rect.width - 8 - baseLeft,
      minY: 8 - baseTop,
      maxY: window.innerHeight - rect.height - 8 - baseTop
    };
  });

  hatAssembly.addEventListener("pointerdown", (event) => {
    markPointerActivity();
    wakeFromNightSleep();
    event.preventDefault();
    const rect = hatAssembly.getBoundingClientRect();

    if (hatDetached) {
      flyAwayWithHat();
      return;
    }

    hatTakeStep += 1;
    if (hatTakeStep === 1) {
      speakAsComputer("还我帽子，跳一跳", { forceSubtitle: true, colorful: false });
      computerShell.classList.add("hat-bump");
      if (hatBumpTimer) {
        window.clearTimeout(hatBumpTimer);
      }
      hatBumpTimer = window.setTimeout(() => {
        computerShell.classList.remove("hat-bump");
        hatBumpTimer = null;
      }, 760);
    }

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

  callBackToggle?.addEventListener("click", callComputerBack);
}

function showSubtitle(text, colorful = false) {
  screenSubtitle.textContent = text;
  screenSubtitle.style.display = "block";
  moodPanel.classList.remove("face-mode");
  moodPanel.classList.add("text-mode");
  moodPanel.classList.toggle("colorful", colorful);
}

function getMiniComputerReply(text) {
  if (/你好/.test(text)) return "你好呀";
  if (/下雨/.test(text)) return "我不淋雨";
  if (/下雪/.test(text)) return "雪白白";
  if (/晴天/.test(text)) return "太阳好亮";
  if (/多云/.test(text)) return "云来了";
  if (/买好了|入住|回家/.test(text)) return "我也喜欢";
  if (/销售成功|得到/.test(text)) return "钱加一";
  if (/好吃/.test(text)) return "我也想吃";
  return "收到呀";
}

function ensureMiniComputerChat(miniComputer) {
  let screen = miniComputer.querySelector(".mini-computer-screen");
  if (!screen) {
    screen = document.createElement("span");
    screen.className = "mini-computer-screen";
    miniComputer.prepend(screen);
  }

  let chat = screen.querySelector(".mini-computer-chat");
  if (!chat) {
    chat = document.createElement("span");
    chat.className = "mini-computer-chat";
    screen.appendChild(chat);
  }

  return chat;
}

function showMiniComputerReply(text, duration) {
  showMiniComputerMessage(getMiniComputerReply(text), duration);
}

function showMiniComputerMessage(message, duration = 1800) {
  const miniComputers = document.querySelectorAll(".custom-kind-computer");
  if (!miniComputers.length) return;

  if (miniChatTimer) {
    window.clearTimeout(miniChatTimer);
  }

  miniComputers.forEach((miniComputer) => {
    const chat = ensureMiniComputerChat(miniComputer);
    chat.textContent = message;
    miniComputer.classList.add("mini-chatting");
  });

  miniChatTimer = window.setTimeout(() => {
    document.querySelectorAll(".custom-kind-computer.mini-chatting").forEach((miniComputer) => {
      const chat = ensureMiniComputerChat(miniComputer);
      chat.textContent = "";
      miniComputer.classList.remove("mini-chatting");
    });
    miniChatTimer = null;
  }, Math.max(1400, Math.min(duration + 500, 4200)));
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
    showMiniComputerReply(text, duration);
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
  const foodType = activeFood.dataset.foodType || "";
  const shouldBirthMiniComputer = canPlantFood(foodType);
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
    if (shouldBirthMiniComputer) {
      spawnBornMiniComputerNearComputer();
    }
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

function getMiniComputerNearPoint(x, y) {
  const miniComputers = Array.from(document.querySelectorAll(".custom-kind-computer"));
  return miniComputers.find((miniComputer) => {
    const screen = miniComputer.querySelector(".mini-computer-screen") || miniComputer;
    const rect = screen.getBoundingClientRect();
    return (
      x >= rect.left - 28 &&
      x <= rect.right + 28 &&
      y >= rect.top - 28 &&
      y <= rect.bottom + 28
    );
  }) || null;
}

function feedMiniComputer(miniComputer) {
  if (!activeFood || !miniComputer) return;
  markChatActivity();
  const foodType = activeFood.dataset.foodType || "";
  const shouldBirthTinyComputer = canPlantFood(foodType);
  const tastyFlight = Math.random() < 0.45;
  const tastyText = shouldBirthTinyComputer ? "生出更小的电脑" : tastyFlight ? "好吃到飞起" : "好吃";

  activeFood.classList.add("eating");
  miniComputer.classList.add("mini-eating");
  showMiniComputerMessage(tastyText, tastyFlight ? 1900 : 1400);
  if (shouldBirthTinyComputer) {
    growMiniComputer(miniComputer);
    spawnTinyMiniComputerNearMini(miniComputer);
  }

  if (tastyFlight) {
    miniComputer.classList.add("mini-food-fly");
    window.setTimeout(() => {
      miniComputer.classList.remove("mini-food-fly");
    }, 1800);
  }

  window.setTimeout(() => {
    miniComputer.classList.remove("mini-eating");
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

function randomSaleValue() {
  return 50 + Math.floor(Math.random() * 51);
}

function isNearSalesBasket(x, y) {
  const basketRect = salesBasket?.getBoundingClientRect();
  if (!basketRect) return false;
  return (
    x >= basketRect.left - 18 &&
    x <= basketRect.right + 18 &&
    y >= basketRect.top - 18 &&
    y <= basketRect.bottom + 18
  );
}

function sellNatureItem(label) {
  const earned = randomSaleValue();
  money += earned;
  updateMoneyUI();
  saveGameState();
  salesBasket?.classList.add("selling");
  window.setTimeout(() => {
    salesBasket?.classList.remove("selling");
  }, 520);
  speakAsComputer(`${label}销售成功，得到 ${earned} 块钱。`, { forceSubtitle: true, colorful: earned >= 80 });
}

function sellBornMiniComputer(element) {
  const miniId = element?.dataset.miniId;
  if (!miniId) return;
  bornMiniComputers = bornMiniComputers.filter((item) => item.id !== miniId);
  element.remove();

  const earned = 50000;
  money += earned;
  updateMoneyUI();
  saveGameState();
  salesBasket?.classList.add("selling");
  window.setTimeout(() => {
    salesBasket?.classList.remove("selling");
  }, 520);
  speakAsComputer(`小电脑卖掉了，得到 ${earned} 块钱。`, { forceSubtitle: true, colorful: earned >= 80 });
}

function sellFurnitureItem(element) {
  const itemId = element?.dataset.itemId;
  if (!itemId) return;
  const item = getAllShopItems().find((entry) => entry.id === itemId);
  const label = item?.label || "家具";

  if (itemId === "outlet") {
    stopPlugCharging(true);
  }
  ownedShopItems.delete(itemId);
  computerHouse?.classList.remove(`has-${itemId}`);
  element.remove();

  const earned = randomSaleValue();
  money += earned;
  updateMoneyUI();
  renderShop();
  saveGameState();
  salesBasket?.classList.add("selling");
  window.setTimeout(() => {
    salesBasket?.classList.remove("selling");
  }, 520);
  speakAsComputer(`${label}卖掉了，得到 ${earned} 块钱。`, { forceSubtitle: true, colorful: earned >= 80 });
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
    salesBasket?.classList.toggle("ready", isNearSalesBasket(event.clientX, event.clientY));
  };

  const onPointerUp = (event) => {
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
    salesBasket?.classList.remove("ready");

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
    const miniComputerNearFood = getMiniComputerNearPoint(event.clientX, event.clientY);

    if (isNearSalesBasket(event.clientX, event.clientY)) {
      const label = canPlantFood(foodDrag.foodType) ? "果子" : "食物";
      activeFood.remove();
      activeFood = null;
      sellNatureItem(label);
    } else if (miniComputerNearFood) {
      feedMiniComputer(miniComputerNearFood);
    } else if (isNearMouth || (isPoweredOff && isNearHat)) {
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

  const onTreePointerMove = (event) => {
    if (!treeDrag) return;
    treeDrag.tree.style.left = `${event.clientX - treeDrag.offsetX}px`;
    treeDrag.tree.style.top = `${event.clientY - treeDrag.offsetY}px`;
    treeDrag.tree.classList.add("dragging");
    salesBasket?.classList.toggle("ready", isNearSalesBasket(event.clientX, event.clientY));
  };

  const onTreePointerUp = (event) => {
    window.removeEventListener("pointermove", onTreePointerMove);
    window.removeEventListener("pointerup", onTreePointerUp);
    salesBasket?.classList.remove("ready");
    if (!treeDrag) return;
    treeDrag.tree.classList.remove("dragging");
    if (isNearSalesBasket(event.clientX, event.clientY)) {
      treeDrag.tree.remove();
      sellNatureItem("树");
    }
    treeDrag = null;
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

  const beginTreeDrag = (event, tree) => {
    markPointerActivity();
    event.preventDefault();
    const rect = tree.getBoundingClientRect();
    treeDrag = {
      tree,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top
    };
    tree.style.left = `${rect.left}px`;
    tree.style.top = `${rect.top}px`;
    window.addEventListener("pointermove", onTreePointerMove);
    window.addEventListener("pointerup", onTreePointerUp);
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

    const foodType = tree.dataset.foodType || "apple";
    const fruit = event.target.closest(".tree-fruit");
    if (fruit) {
      fruit.remove();
      beginFoodDrag(event, foodType);
      return;
    }

    beginTreeDrag(event, tree);
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
loadGameState();
setupSpeechRecognition();
setupSpeechUnlock();
setupFoodDrag();
setupMiningGame();
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
resetOpeningWeatherState();
scheduleWeatherChange(18000);

window.addEventListener("pageshow", () => {
  resetOpeningWeatherState();
  scheduleWeatherChange(18000);
});

window.addEventListener("resize", () => {
  if (plugInserted && !plugDrag) {
    parkPlugAtChargingCorner();
  }
});

if ("speechSynthesis" in window) {
  window.speechSynthesis.onvoiceschanged = loadVoices;
}
