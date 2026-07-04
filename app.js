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
const minecraftToggle = document.querySelector("#minecraft-toggle");
const minecraftPanel = document.querySelector("#minecraft-panel");
const minecraftWorld = document.querySelector("#minecraft-world");
const minecraftMap = document.querySelector("#minecraft-map");
const minecraftStatus = document.querySelector("#minecraft-status");
const minecraftToolButtons = Array.from(document.querySelectorAll(".minecraft-tool"));
const minecraftMoveButtons = Array.from(document.querySelectorAll(".minecraft-move"));
const minecraftJumpUpButton = document.querySelector("#minecraft-jump-up");
const minecraftDigDownButton = document.querySelector("#minecraft-dig-down");
const minecraftViewButton = document.querySelector("#minecraft-view");
const minecraftClearButton = document.querySelector("#minecraft-clear");
const minecraftCloseButton = document.querySelector("#minecraft-close");
const minecraftJoystick = document.querySelector("#minecraft-joystick");
const minecraftJoystickHandle = document.querySelector("#minecraft-joystick-handle");
const minecraftCraftingPanel = document.querySelector("#minecraft-crafting-panel");
const minecraftCraftingGrid = document.querySelector("#minecraft-crafting-grid");
const minecraftCraftingInventory = document.querySelector("#minecraft-crafting-inventory");
const minecraftCraftingOutput = document.querySelector("#minecraft-crafting-output");
const minecraftCraftingMake = document.querySelector("#minecraft-crafting-make");
const minecraftCraftingClose = document.querySelector("#minecraft-crafting-close");
const minecraftCraftingStatus = document.querySelector("#minecraft-crafting-status");
const yardToggle = document.querySelector("#yard-toggle");
const homeToggle = document.querySelector("#home-toggle");
const callBackToggle = document.querySelector("#call-back-toggle");
const resetSaveToggle = document.querySelector("#reset-save-toggle");
const rhythmBox = document.querySelector("#rhythm-box");
const rhythmStatus = document.querySelector("#rhythm-status");
const rhythmVolume = document.querySelector("#rhythm-volume");
const happyRobotPicker = document.querySelector("#happy-robot-picker");
const gallodPicker = document.querySelector("#gallod-picker");
const simonPicker = document.querySelector("#simon-picker");
const musicBoxPicker = document.querySelector("#music-box-picker");
const sunPicker = document.querySelector("#sun-picker");
const moonPicker = document.querySelector("#moon-picker");
const rhythmStage = document.querySelector("#rhythm-stage");
const rhythmSlots = Array.from(document.querySelectorAll(".rhythm-slot"));

const moods = [
  { status: "待机微笑中", colorful: false },
  { status: "开心回应中", colorful: true }
];

const clearVoiceSettings = {
  lang: "zh-CN",
  pitch: 1.35,
  rate: 1.35,
  volume: 0.95
};
const COMPUTER_SONG_LINE = "\u4f60\u597d\uff0c\u4f60\u60f3\u4e0d\u60f3\u627e\u4e00\u70b9\u6709\u8da3\uff1f\u6765\u5427\uff0c\u8ddf\u6211\u4e00\u8d77\u5531\uff0c\u4e00\u8d77\u4eab\u53d7\u5feb\u4e50\u65f6\u523b\u3002";

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
let rainCodeRefreshTimer = null;
let rainNoiseContext = null;
let rainNoiseSource = null;
let rainNoiseGain = null;
let rainNoiseFilter = null;
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
let rhythmDrag = null;
let tvCableDrag = null;
let tvCableConnectedTo = null;
let weatherCableDrag = null;
let weatherCableConnectedTo = null;
let tvNewGameCaptionDismissed = false;
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
let minecraftPanelOpen = false;
let minecraftSelectedTool = "pickaxe";
let minecraftOpenedAt = 0;
let minecraftWorldBlocks = [];
let minecraftInventory = {};
let minecraftPlayerX = 0;
let minecraftPlayerZ = 0;
let minecraftDepth = 0;
let minecraftDimension = "overworld";
let minecraftView = 0;
let minecraftGuardianFound = false;
let minecraftIsNight = false;
let minecraftXp = 0;
let minecraftZombies = [];
let minecraftCycleTimer = null;
let minecraftHealth = 10;
let minecraftHunger = 8;
let minecraftSeeds = 0;
let minecraftWheat = 0;
let minecraftEmerald = 0;
let minecraftMeteorDust = 0;
let minecraftEnderPearls = 0;
let minecraftEnderEyes = 0;
let minecraftEndPortalEyes = 0;
let minecraftDragonHealth = 12;
let minecraftEndCrystals = {};
let minecraftOuterChestOpened = false;
let minecraftPlants = {};
let minecraftMeat = 0;
let minecraftWool = 0;
let minecraftAnimals = {};
let minecraftSpawnPoint = null;
let minecraftSticks = 0;
let minecraftCoal = 0;
let minecraftIron = 0;
let minecraftBuckets = 0;
let minecraftWaterBuckets = 0;
let minecraftLavaBuckets = 0;
let minecraftCraftingSlots = Array(9).fill("");
let minecraftCraftingOpen = false;
let minecraftSkeletons = [];
let minecraftVillagers = {};
let minecraftEndermen = {};
let minecraftLastSkeletonShotAt = 0;
let minecraftLastZombieHitAt = 0;
let minecraftLastZombieStepAt = 0;
let minecraftJoystickTimer = null;
let minecraftJoystickDirection = "";
let houseBought = false;
let shopPanelOpen = false;
let computerMovedIn = false;
let isAtHome = false;
const ownedShopItems = new Set();
let customShopItems = [];
let bornMiniComputers = [];
const placedRhythmCharacters = new Map();
let rhythmAudioContext = null;
let rhythmLoopTimer = null;
let rhythmStep = 0;
let rhythmMasterGain = null;
let rhythmVolumeValue = 1.8;
let rhythmPraiseTimer = null;
let rhythmPraiseCooldown = false;
let lastRhythmDropAt = 0;
let lastComputerSongAt = 0;
let computerSongTimer = null;
const skyBodyAway = {
  sun: false,
  moon: false
};
let skyDragTerrorActive = false;
let urgentPianoTimer = null;
let happyRobotCompanion = null;
const happyRobotCompanions = [];
let happyRobotMessageTimer = null;
let happyRobotCleaningTimer = null;
let happyRobotCompanionDrag = null;
let happyRobotCompanionPinned = false;
let happyRobotSuppressClick = false;
let happyRobotKissTimer = null;
let happyRobotUmbrellaActive = false;

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

const RAIN_CODE_LINE_COUNT = 24;
const rainCodeSnippets = [
  "if (rain) screen.color = RED;",
  "while (water > 0) reboot();",
  "ERR_RAIN_PIXEL_404",
  "color.shift(red, green, blue, purple);",
  "try { dryScreen(); } catch (water) {}",
  "0xRAIN_BEEP_BEEP",
  "const umbrella = null;",
  "screen.write('X_X');",
  "warning: cloud overflow",
  "rgb += thunder.noise();",
  "for (;;) flashCode();",
  "SYSTEM_WET_MODE = TRUE",
  "ERROR: monitor flooded",
  "pixel[wet] = NaN;",
  "boot.loop.rain.rain.rain",
  "WATER_STACK_OVERFLOW",
  "screen.fill(randomColor);",
  "signal lost // retry",
  "RAIN_GLITCH_LEVEL++",
  "01010111 01000101 01010100",
  "NO_DRY_DEVICE_FOUND",
  "console.warn('too wet');",
  "display: broken;",
  "drip.drip.exec();",
  "panic('rain in screen');",
  "bad color checksum",
  "GPU_WATER_INTERRUPT"
];
const HOUSE_PRICE = 120;
const MINE_CELL_COUNT = 24;
const INVENTORY_SLOT_COUNT = 12;
const MINECRAFT_WORLD_COLUMNS = 18;
const MINECRAFT_WORLD_ROWS = 10;
const MINECRAFT_MOVE_STEP = 2;
const minecraftBlockTypes = {
  grass: { label: "草方块" },
  dirt: { label: "泥土" },
  stone: { label: "石头" },
  wood: { label: "木头" },
  leaves: { label: "树叶" },
  water: { label: "河水" },
  lava: { label: "岩浆" },
  coal_ore: { label: "煤炭" },
  iron_ore: { label: "铁" },
  gold_ore: { label: "金矿" },
  diamond_ore: { label: "钻石" },
  bed: { label: "床" },
  crafting_table: { label: "工作台" },
  torch: { label: "火把" }
};
minecraftBlockTypes.obsidian = { label: "黑曜石" };
minecraftBlockTypes.netherrack = { label: "下界红土" };
minecraftBlockTypes.nether_gold_ore = { label: "下界金矿" };
minecraftBlockTypes.nether_brick = { label: "猪灵堡垒砖" };
minecraftBlockTypes.meteor = { label: "陨石" };
minecraftBlockTypes.warped_nylium = { label: "诡异森林地" };
minecraftBlockTypes.glowstone = { label: "萤石" };
minecraftBlockTypes.warped_stem = { label: "诡异树干" };
minecraftBlockTypes.warped_leaves = { label: "诡异树叶" };
minecraftBlockTypes.end_stone = { label: "末地海绵" };
minecraftBlockTypes.end_portal_frame = { label: "末地传送门框架" };
minecraftBlockTypes.end_portal = { label: "末地黑洞" };
minecraftBlockTypes.obsidian_pillar = { label: "黑曜石柱" };
minecraftBlockTypes.end_chest = { label: "末地箱子" };

const minecraftAnimalTypes = {
  sheep: { label: "羊", icon: "羊", meat: 1, wool: 1 },
  cow: { label: "牛", icon: "牛", meat: 2, wool: 0 },
  pig: { label: "猪", icon: "猪", meat: 2, wool: 0 },
  chicken: { label: "鸡", icon: "鸡", meat: 1, wool: 0 }
};
const mineralTypes = [
  { id: "stone", label: "石头", icon: "▣", value: 3, chance: 36, hardness: 2 },
  { id: "coal", label: "煤炭", icon: "●", value: 7, chance: 25, hardness: 2 },
  { id: "iron", label: "铁矿", icon: "■", value: 13, chance: 20, hardness: 3 },
  { id: "gold", label: "金矿", icon: "◆", value: 28, chance: 12, hardness: 3 },
  { id: "diamond", label: "钻石", icon: "✦", value: 55, chance: 7, hardness: 4 }
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
  { id: "weather-detector", label: "\u5929\u6c14\u63a2\u6d4b\u5668", icon: "\u5929", price: 38, type: "furniture", kind: "weather-detector", keywords: "\u5929\u6c14 \u63a2\u6d4b\u5668 \u9884\u62a5 \u4e0b\u96e8 \u4e0b\u96ea \u591a\u4e91" },
  { id: "mr-computer", label: "电脑先生", icon: "电", price: 500, type: "furniture", kind: "computer", keywords: "电脑先生 电脑 小电脑 屏幕" },
  { id: "big-window", label: "大窗户", icon: "窗", price: 180, type: "furniture", kind: "big-window", keywords: "大窗户 大窗 大玻璃 天气" }
];

function randomFrom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function setupAutoReload() {
  const isLocalPreview = ["127.0.0.1", "localhost"].includes(window.location.hostname);
  if (!isLocalPreview) return;

  const watchedFiles = ["index.html", "styles.css", "app.js"];
  const snapshots = new Map();
  let isChecking = false;

  async function readFileSnapshot(fileName) {
    const response = await fetch(`${fileName}?autoReload=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) return null;
    return response.text();
  }

  async function checkForUpdates() {
    if (isChecking) return;
    isChecking = true;
    try {
      for (const fileName of watchedFiles) {
        const snapshot = await readFileSnapshot(fileName);
        if (snapshot === null) continue;
        if (!snapshots.has(fileName)) {
          snapshots.set(fileName, snapshot);
          continue;
        }
        if (snapshots.get(fileName) !== snapshot) {
          window.location.reload();
          return;
        }
      }
    } catch {
      // Keep the game running if the local preview server briefly disappears.
    } finally {
      isChecking = false;
    }
  }

  checkForUpdates();
  window.setInterval(checkForUpdates, 1800);
}

function getAllShopItems() {
  return [...shopItems, ...customShopItems];
}

function inferFurnitureKind(label) {
  if (/天气探测器|天气|探测器|预报|weather/i.test(label)) return "weather-detector";
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

function addTvScreenParts(element) {
  if (!element || element.querySelector(".tv-screen-scene")) return;
  element.textContent = "";
  element.innerHTML = `
    <span class="tv-screen-scene" aria-hidden="true">
      <span class="tv-mini-computer">
        <span class="tv-computer-eye eye-left"></span>
        <span class="tv-computer-eye eye-right"></span>
        <span class="tv-computer-mouth"></span>
      </span>
      <span class="tv-mini-robot">
        <span class="tv-robot-eye eye-left"></span>
        <span class="tv-robot-eye eye-right"></span>
        <span class="tv-robot-body"></span>
      </span>
      <span class="tv-music-note note-one"></span>
      <span class="tv-music-note note-two"></span>
    </span>
    <span class="tv-new-game-caption" aria-hidden="true">
      <button class="tv-caption-close" type="button" aria-label="\u5173\u95ed\u7535\u89c6\u5b57\u5e55">\u00d7</button>
      <span class="tv-caption-title">\u65b0\u73a9\u6cd5</span>
      <span class="tv-caption-text">\u8282\u594f\u76d2\u6765\u4e86\uff1a\u628a\u89d2\u8272\u62d6\u5230\u5c0f\u7070\u4e91\u97f3\u4e50\u683c\u91cc\uff0c\u4ed6\u4eec\u5c31\u4f1a\u4e00\u8d77\u6f14\u594f\u3002</span>
    </span>
    <span class="tv-cable-line" aria-hidden="true"></span>
    <span class="tv-cable-plug" aria-hidden="true"></span>
  `;
}

function getWeatherFutureText(weather = currentWeather) {
  if (weather === "sunny") return "\u53ef\u80fd\u53d8\u591a\u4e91";
  if (weather === "cloudy") return "\u53ef\u80fd\u4e0b\u96e8\u6216\u4e0b\u96ea";
  if (weather === "rain") return "\u7535\u8111\u5148\u751f\u4f1a\u6dcb\u6e7f";
  if (weather === "snow") return "\u5730\u4e0a\u4f1a\u53d8\u767d";
  return "\u5929\u6c14\u5f88\u5e73\u7a33";
}

function updateWeatherDetectorDisplay() {
  const detector = getFurnitureElement("weather-detector");
  if (!detector) return;
  const now = detector.querySelector(".weather-now");
  const future = detector.querySelector(".weather-future");
  if (now) {
    now.textContent = `\u73b0\u5728\uff1a${weatherLabels[currentWeather] || "\u6674\u5929"}`;
  }
  if (future) {
    future.textContent = `\u63a5\u4e0b\u6765\uff1a${getWeatherFutureText(currentWeather)}`;
  }
  updateComputerWeatherDisplay();
}

function updateComputerWeatherDisplay() {
  if (typeof weatherCableConnectedTo === "undefined" || weatherCableConnectedTo !== "computer" || isPoweredOff) return;
  screenSubtitle.textContent = `\u5929\u6c14\u63a2\u6d4b\n\u73b0\u5728\uff1a${weatherLabels[currentWeather] || "\u6674\u5929"}\n\u63a5\u4e0b\u6765\uff1a${getWeatherFutureText(currentWeather)}`;
  screenSubtitle.style.display = "block";
  moodPanel.classList.remove("face-mode", "colorful");
  moodPanel.classList.add("text-mode", "weather-display-mode");
}

function addWeatherDetectorParts(element) {
  if (!element || element.querySelector(".weather-detector-screen")) return;
  element.textContent = "";
  element.innerHTML = `
    <span class="weather-detector-antenna"></span>
    <span class="weather-detector-screen">
      <span class="weather-now"></span>
      <span class="weather-future"></span>
    </span>
    <span class="weather-detector-light"></span>
    <span class="weather-cable-line" aria-hidden="true"></span>
    <span class="weather-cable-plug" aria-hidden="true"></span>
  `;
  updateWeatherDetectorDisplay();
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
  } else if (kind === "tv") {
    addTvScreenParts(element);
  } else if (kind === "weather-detector") {
    addWeatherDetectorParts(element);
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
  if (kind === "tv") {
    addTvScreenParts(element);
  } else if (kind === "weather-detector") {
    addWeatherDetectorParts(element);
  }
  if (element.parentElement !== document.body) {
    document.body.appendChild(element);
  }
  updateRhythmTvMount();
}

function getPurchasedTv() {
  const tv = getFurnitureElement("tv") || document.querySelector(".custom-kind-tv.owned-furniture");
  if (!tv) return null;
  return tv;
}

function setTvNewGameCaptionVisible(visible) {
  const tv = getPurchasedTv();
  if (!tv) return;
  tv.classList.toggle("tv-caption-mode", visible);
  const caption = tv.querySelector(".tv-new-game-caption");
  if (caption) {
    caption.setAttribute("aria-hidden", visible ? "false" : "true");
  }
}

function showTvNewGameCaption(title, text) {
  const tv = getPurchasedTv();
  if (!tv) return;
  tvNewGameCaptionDismissed = false;
  const titleNode = tv.querySelector(".tv-caption-title");
  const textNode = tv.querySelector(".tv-caption-text");
  if (titleNode) {
    titleNode.textContent = title;
  }
  if (textNode) {
    textNode.textContent = text;
  }
  setTvNewGameCaptionVisible(true);
}

function maybeShowTvNewGameCaption() {
  const tv = getPurchasedTv();
  if (!tv || tvNewGameCaptionDismissed) return;
  setTvNewGameCaptionVisible(true);
}

function updateRhythmTvMount() {
  if (!rhythmBox) return;
  const tv = getPurchasedTv();
  document.body.classList.toggle("rhythm-tv-available", Boolean(tv));
  if (tv) {
    if (rhythmBox.parentElement !== tv) {
      tv.appendChild(rhythmBox);
    }
    rhythmBox.hidden = false;
    rhythmBox.removeAttribute("hidden");
    maybeShowTvNewGameCaption();
    return;
  }
  clearTvCableConnection();
  clearWeatherCableConnection();
  if (rhythmBox.parentElement !== document.body) {
    document.body.appendChild(rhythmBox);
  }
  rhythmBox.hidden = true;
}

function updateTvWeatherMarks() {
  const tv = getPurchasedTv();
  if (!tv) return;
  const broken = currentWeather === "rain" && !isAtHome;
  tv.classList.toggle("tv-rained-on", broken);
  tv.classList.toggle("tv-rain-error", broken);
}

function toggleTvFullscreen(tv = getPurchasedTv()) {
  if (!tv) return;
  tv.classList.toggle("tv-fullscreen");
  document.body.classList.toggle("tv-fullscreen-active", tv.classList.contains("tv-fullscreen"));
  refreshTvCableConnection();
}

function getTvCablePlug() {
  return getPurchasedTv()?.querySelector(".tv-cable-plug") || null;
}

function getComputerDropZoneAtPoint(x, y) {
  if (!computerShell) return false;
  const rect = computerShell.getBoundingClientRect();
  return x >= rect.left - 18 && x <= rect.right + 18 && y >= rect.top - 18 && y <= rect.bottom + 18;
}

function getComputerBackZoneAtPoint(x, y) {
  if (!computerShell) return false;
  const rect = computerShell.getBoundingClientRect();
  return x >= rect.right - 36 && x <= rect.right + 46 && y >= rect.top + 64 && y <= rect.top + 156;
}

function rectsOverlap(first, second, padding = 0) {
  if (!first || !second) return false;
  return first.left - padding <= second.right
    && first.right + padding >= second.left
    && first.top - padding <= second.bottom
    && first.bottom + padding >= second.top;
}

function isTvCableTouchingComputerCable() {
  const tvPlug = getTvCablePlug();
  if (!tvPlug || !backPlug) return false;
  const tvRect = tvPlug.getBoundingClientRect();
  const plugRect = backPlug.getBoundingClientRect();
  const shellRect = computerShell?.getBoundingClientRect();
  const cableBand = shellRect
    ? {
        left: Math.min(shellRect.right - 8, plugRect.left),
        right: Math.max(shellRect.right + 8, plugRect.right),
        top: Math.min(shellRect.top + 88, plugRect.top) - 22,
        bottom: Math.max(shellRect.top + 146, plugRect.bottom) + 22
      }
    : null;
  return rectsOverlap(tvRect, plugRect, 28) || rectsOverlap(tvRect, cableBand, 0);
}

function getTvCableAnchorPoint(tv = getPurchasedTv()) {
  if (!tv) return null;
  const rect = tv.getBoundingClientRect();
  return {
    x: rect.right - 18,
    y: rect.bottom - 18
  };
}

function setTvCableEndpoint(x, y) {
  const tv = getPurchasedTv();
  if (!tv) return;
  const anchor = getTvCableAnchorPoint(tv);
  if (!anchor) return;
  const dx = x - anchor.x;
  const dy = y - anchor.y;
  tv.style.setProperty("--tv-cable-length", `${Math.max(22, Math.hypot(dx, dy))}px`);
  tv.style.setProperty("--tv-cable-angle", `${Math.atan2(dy, dx) * 180 / Math.PI}deg`);
  tv.style.setProperty("--tv-plug-left", `${x - 10}px`);
  tv.style.setProperty("--tv-plug-top", `${y - 10}px`);
}

function clearTvCableConnection() {
  const tv = getPurchasedTv();
  tvCableConnectedTo = null;
  document.body.classList.remove("tv-computer-linked", "tv-outlet-linked");
  tv?.classList.remove("tv-cable-detached", "tv-cable-to-computer", "tv-cable-to-outlet");
  tv?.style.removeProperty("--tv-cable-length");
  tv?.style.removeProperty("--tv-cable-angle");
  tv?.style.removeProperty("--tv-plug-left");
  tv?.style.removeProperty("--tv-plug-top");
}

function connectTvCableTo(target, x, y) {
  const tv = getPurchasedTv();
  if (!tv) return;
  tvCableConnectedTo = target;
  tv.classList.add("tv-cable-detached");
  tv.classList.toggle("tv-cable-to-computer", target === "computer");
  tv.classList.toggle("tv-cable-to-outlet", target === "outlet");
  document.body.classList.toggle("tv-computer-linked", target === "computer");
  document.body.classList.toggle("tv-outlet-linked", target === "outlet");
  setTvCableEndpoint(x, y);
}

function refreshTvCableConnection() {
  if (!tvCableConnectedTo) return;
  if (tvCableConnectedTo === "computer") {
    const rect = computerShell.getBoundingClientRect();
    setTvCableEndpoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
    return;
  }
  const outlet = getActiveOutlet();
  if (!outlet) return;
  const rect = outlet.getBoundingClientRect();
  setTvCableEndpoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
}

function getPurchasedWeatherDetector() {
  const detector = getFurnitureElement("weather-detector") || document.querySelector(".custom-kind-weather-detector.owned-furniture");
  if (!detector || !isAtHome) return null;
  return detector;
}

function getWeatherCablePlug() {
  return getPurchasedWeatherDetector()?.querySelector(".weather-cable-plug") || null;
}

function getWeatherCableAnchorPoint(detector = getPurchasedWeatherDetector()) {
  if (!detector) return null;
  const rect = detector.getBoundingClientRect();
  return {
    x: rect.right - 12,
    y: rect.bottom - 12
  };
}

function setWeatherCableEndpoint(x, y) {
  const detector = getPurchasedWeatherDetector();
  if (!detector) return;
  const anchor = getWeatherCableAnchorPoint(detector);
  if (!anchor) return;
  const dx = x - anchor.x;
  const dy = y - anchor.y;
  detector.style.setProperty("--weather-cable-length", `${Math.max(18, Math.hypot(dx, dy))}px`);
  detector.style.setProperty("--weather-cable-angle", `${Math.atan2(dy, dx) * 180 / Math.PI}deg`);
  detector.style.setProperty("--weather-plug-left", `${x - 9}px`);
  detector.style.setProperty("--weather-plug-top", `${y - 9}px`);
}

function clearWeatherCableConnection() {
  const detector = getPurchasedWeatherDetector();
  weatherCableConnectedTo = null;
  document.body.classList.remove("weather-computer-linked");
  detector?.classList.remove("weather-cable-detached", "weather-cable-to-computer", "weather-cable-swap-ready");
  detector?.style.removeProperty("--weather-cable-length");
  detector?.style.removeProperty("--weather-cable-angle");
  detector?.style.removeProperty("--weather-plug-left");
  detector?.style.removeProperty("--weather-plug-top");
  moodPanel.classList.remove("weather-display-mode");
  if (!isPoweredOff) {
    showFaceOnly();
  }
}

function connectWeatherCableToComputer(x, y) {
  const detector = getPurchasedWeatherDetector();
  if (!detector) return;
  weatherCableConnectedTo = "computer";
  detector.classList.add("weather-cable-detached", "weather-cable-to-computer");
  detector.classList.remove("weather-cable-swap-ready");
  document.body.classList.add("weather-computer-linked");
  setWeatherCableEndpoint(x, y);
  updateComputerWeatherDisplay();
}

function refreshWeatherCableConnection() {
  if (weatherCableConnectedTo !== "computer") return;
  const rect = computerShell.getBoundingClientRect();
  setWeatherCableEndpoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
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
    minecraftWorldBlocks,
    minecraftInventory,
    minecraftSelectedTool,
    minecraftPlayerX,
    minecraftPlayerZ,
    minecraftDepth,
    minecraftDimension,
    minecraftView,
    minecraftGuardianFound,
    minecraftIsNight,
    minecraftXp,
    minecraftZombies,
    minecraftHealth,
    minecraftHunger,
    minecraftSeeds,
    minecraftWheat,
    minecraftEmerald,
    minecraftMeteorDust,
    minecraftEnderPearls,
    minecraftEnderEyes,
    minecraftEndPortalEyes,
    minecraftDragonHealth,
    minecraftEndCrystals,
    minecraftOuterChestOpened,
    minecraftPlants,
    minecraftMeat,
    minecraftWool,
    minecraftAnimals,
    minecraftSpawnPoint,
    minecraftSticks,
    minecraftCoal,
    minecraftIron,
    minecraftBuckets,
    minecraftWaterBuckets,
    minecraftLavaBuckets,
    minecraftSkeletons,
    minecraftVillagers,
    minecraftEndermen,
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

function resetGameState() {
  const shouldReset = window.confirm("要清空存档，从头开始玩吗？");
  if (!shouldReset) return;

  try {
    window.localStorage.removeItem(SAVE_KEY);
  } catch {
    // The game can still restart even if localStorage is unavailable.
  }

  window.location.reload();
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
  if (saveData.minecraftWorldBlocks && typeof saveData.minecraftWorldBlocks === "object" && !Array.isArray(saveData.minecraftWorldBlocks)) {
    minecraftWorldBlocks = {};
    Object.entries(saveData.minecraftWorldBlocks).forEach(([key, block]) => {
      minecraftWorldBlocks[key] = minecraftBlockTypes[block] ? block : null;
    });
  } else if (Array.isArray(saveData.minecraftWorldBlocks)) {
    minecraftWorldBlocks = {};
  }
  if (saveData.minecraftInventory && typeof saveData.minecraftInventory === "object") {
    minecraftInventory = {};
    Object.keys(minecraftBlockTypes).forEach((blockType) => {
      const count = Number(saveData.minecraftInventory[blockType]);
      minecraftInventory[blockType] = Number.isFinite(count) ? Math.max(0, Math.floor(count)) : 0;
    });
  }
  if (saveData.minecraftSelectedTool === "pickaxe" || minecraftBlockTypes[saveData.minecraftSelectedTool]) {
    minecraftSelectedTool = saveData.minecraftSelectedTool;
  }
  minecraftPlayerX = Number.isFinite(saveData.minecraftPlayerX) ? Math.trunc(saveData.minecraftPlayerX) : 0;
  minecraftPlayerZ = Number.isFinite(saveData.minecraftPlayerZ) ? Math.trunc(saveData.minecraftPlayerZ) : 0;
  minecraftDepth = Number.isFinite(saveData.minecraftDepth) ? clamp(Math.trunc(saveData.minecraftDepth), -63, 1) : 0;
  minecraftDimension = saveData.minecraftDimension === "nether" || saveData.minecraftDimension === "end" ? saveData.minecraftDimension : "overworld";
  minecraftView = Number.isFinite(saveData.minecraftView) ? Math.abs(Math.trunc(saveData.minecraftView)) % 4 : 0;
  minecraftGuardianFound = Boolean(saveData.minecraftGuardianFound);
  minecraftIsNight = Boolean(saveData.minecraftIsNight);
  minecraftXp = Number.isFinite(saveData.minecraftXp) ? Math.max(0, Math.trunc(saveData.minecraftXp)) : 0;
  minecraftZombies = Array.isArray(saveData.minecraftZombies)
    ? saveData.minecraftZombies
        .filter((zombie) => Number.isFinite(zombie?.x) && Number.isFinite(zombie?.z))
        .map((zombie) => ({
          x: Math.trunc(zombie.x),
          z: Math.trunc(zombie.z),
          hp: Number.isFinite(zombie.hp) ? Math.max(1, Math.trunc(zombie.hp)) : 2
        }))
    : [];
  minecraftHealth = Number.isFinite(saveData.minecraftHealth) ? clamp(Math.trunc(saveData.minecraftHealth), 0, 10) : 10;
  minecraftHunger = Number.isFinite(saveData.minecraftHunger) ? clamp(Math.trunc(saveData.minecraftHunger), 0, 10) : 8;
  minecraftSeeds = Number.isFinite(saveData.minecraftSeeds) ? Math.max(0, Math.trunc(saveData.minecraftSeeds)) : 0;
  minecraftWheat = Number.isFinite(saveData.minecraftWheat) ? Math.max(0, Math.trunc(saveData.minecraftWheat)) : 0;
  minecraftEmerald = Number.isFinite(saveData.minecraftEmerald) ? Math.max(0, Math.trunc(saveData.minecraftEmerald)) : 0;
  minecraftMeteorDust = Number.isFinite(saveData.minecraftMeteorDust) ? Math.max(0, Math.trunc(saveData.minecraftMeteorDust)) : 0;
  minecraftEnderPearls = Number.isFinite(saveData.minecraftEnderPearls) ? Math.max(0, Math.trunc(saveData.minecraftEnderPearls)) : 0;
  minecraftEnderEyes = Number.isFinite(saveData.minecraftEnderEyes) ? Math.max(0, Math.trunc(saveData.minecraftEnderEyes)) : 0;
  minecraftEndPortalEyes = Number.isFinite(saveData.minecraftEndPortalEyes) ? clamp(Math.trunc(saveData.minecraftEndPortalEyes), 0, 12) : 0;
  minecraftDragonHealth = Number.isFinite(saveData.minecraftDragonHealth) ? Math.max(0, Math.trunc(saveData.minecraftDragonHealth)) : 12;
  minecraftEndCrystals = saveData.minecraftEndCrystals && typeof saveData.minecraftEndCrystals === "object" && !Array.isArray(saveData.minecraftEndCrystals)
    ? saveData.minecraftEndCrystals
    : {};
  minecraftOuterChestOpened = Boolean(saveData.minecraftOuterChestOpened);
  minecraftPlants = saveData.minecraftPlants && typeof saveData.minecraftPlants === "object" && !Array.isArray(saveData.minecraftPlants)
    ? Object.fromEntries(Object.entries(saveData.minecraftPlants).filter(([, plant]) => plant === "grass" || plant === "wheat" || plant === "wheat-ripe"))
    : {};
  minecraftMeat = Number.isFinite(saveData.minecraftMeat) ? Math.max(0, Math.trunc(saveData.minecraftMeat)) : 0;
  minecraftWool = Number.isFinite(saveData.minecraftWool) ? Math.max(0, Math.trunc(saveData.minecraftWool)) : 0;
  minecraftAnimals = saveData.minecraftAnimals && typeof saveData.minecraftAnimals === "object" && !Array.isArray(saveData.minecraftAnimals)
    ? Object.fromEntries(Object.entries(saveData.minecraftAnimals).filter(([, animal]) => animal === null || minecraftAnimalTypes[animal]))
    : {};
  minecraftSpawnPoint = saveData.minecraftSpawnPoint
    && Number.isFinite(saveData.minecraftSpawnPoint.x)
    && Number.isFinite(saveData.minecraftSpawnPoint.z)
    && Number.isFinite(saveData.minecraftSpawnPoint.y)
    ? {
        x: Math.trunc(saveData.minecraftSpawnPoint.x),
        z: Math.trunc(saveData.minecraftSpawnPoint.z),
        y: clamp(Math.trunc(saveData.minecraftSpawnPoint.y), -63, 1)
      }
    : null;
  if (minecraftSpawnPoint && isMinecraftSpawnPointValid()) {
    minecraftPlayerX = minecraftSpawnPoint.x;
    minecraftPlayerZ = minecraftSpawnPoint.z;
    minecraftDepth = minecraftSpawnPoint.y;
  } else {
    minecraftSpawnPoint = null;
  }
  minecraftSticks = Number.isFinite(saveData.minecraftSticks) ? Math.max(0, Math.trunc(saveData.minecraftSticks)) : 0;
  minecraftCoal = Number.isFinite(saveData.minecraftCoal) ? Math.max(0, Math.trunc(saveData.minecraftCoal)) : 0;
  minecraftIron = Number.isFinite(saveData.minecraftIron) ? Math.max(0, Math.trunc(saveData.minecraftIron)) : 0;
  minecraftBuckets = Number.isFinite(saveData.minecraftBuckets) ? Math.max(0, Math.trunc(saveData.minecraftBuckets)) : 0;
  minecraftWaterBuckets = Number.isFinite(saveData.minecraftWaterBuckets) ? Math.max(0, Math.trunc(saveData.minecraftWaterBuckets)) : 0;
  minecraftLavaBuckets = Number.isFinite(saveData.minecraftLavaBuckets) ? Math.max(0, Math.trunc(saveData.minecraftLavaBuckets)) : 0;
  minecraftSkeletons = Array.isArray(saveData.minecraftSkeletons)
    ? saveData.minecraftSkeletons
        .filter((skeleton) => Number.isFinite(skeleton?.x) && Number.isFinite(skeleton?.z))
        .map((skeleton) => ({
          x: Math.trunc(skeleton.x),
          z: Math.trunc(skeleton.z),
          hp: Number.isFinite(skeleton.hp) ? Math.max(1, Math.trunc(skeleton.hp)) : 2
        }))
    : [];
  minecraftVillagers = saveData.minecraftVillagers && typeof saveData.minecraftVillagers === "object" && !Array.isArray(saveData.minecraftVillagers)
    ? Object.fromEntries(Object.entries(saveData.minecraftVillagers)
        .filter(([, villager]) => Number.isFinite(villager?.y))
        .map(([key, villager]) => [key, { y: clamp(Math.trunc(villager.y), -63, 1) }]))
    : {};
  minecraftEndermen = saveData.minecraftEndermen && typeof saveData.minecraftEndermen === "object" && !Array.isArray(saveData.minecraftEndermen)
    ? saveData.minecraftEndermen
    : {};
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
    const hiddenMineral = weightedRandomMineral();
    cell.className = `mine-cell block-${hiddenMineral.id}`;
    cell.type = "button";
    cell.dataset.mineralId = hiddenMineral.id;
    cell.dataset.hardness = `${hiddenMineral.hardness}`;
    cell.dataset.damage = "0";
    cell.setAttribute("aria-label", `方块 ${index + 1}`);
    cell.textContent = "";
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

  const damage = Number(cell.dataset.damage || 0) + 1;
  const hardness = Number(cell.dataset.hardness || 2);
  cell.dataset.damage = `${damage}`;
  cell.classList.remove("crack-1", "crack-2", "crack-3");
  cell.classList.add(`crack-${Math.min(3, damage)}`);
  cell.classList.add("mining-hit");
  window.setTimeout(() => cell.classList.remove("mining-hit"), 120);
  if (damage < hardness) {
    return;
  }

  const mineral = mineralTypes.find((item) => item.id === cell.dataset.mineralId) || weightedRandomMineral();
  minedItems.push(mineral);
  cell.className = `mine-cell mined mineral-${mineral.id}`;
  cell.textContent = mineral.icon;
  cell.disabled = true;
  renderInventory();
  updateMoneyUI();
  saveGameState();
  const message = mineral.id === "diamond" || mineral.id === "gold"
    ? `挖到${mineral.label}了，好闪。`
    : `挖到${mineral.label}了。`;
  speakAsComputer(message, { forceSubtitle: true, colorful: mineral.id === "diamond" || mineral.id === "gold" });
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
  updateRhythmTvMount();
  updateTvWeatherMarks();
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
  updateRhythmTvMount();
  updateTvWeatherMarks();
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
  updateRhythmTvMount();
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
    setMinecraftPanelOpen(false);
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
    setMinecraftPanelOpen(false);
  }
  if (shopPanel) {
    shopPanel.hidden = !shopPanelOpen;
  }
  shopToggle?.classList.toggle("active", shopPanelOpen);
}

function getMinecraftKey(x, z, y = minecraftDepth) {
  if (minecraftDimension === "nether") return `nether:${x},${z},${y}`;
  if (minecraftDimension === "end") return `end:${x},${z},${y}`;
  return `${x},${z},${y}`;
}

function getMinecraftTreeOrigin(x, z) {
  for (let originX = x - 1; originX <= x + 1; originX += 1) {
    for (let originZ = z; originZ <= z + 3; originZ += 1) {
      const originSeed = Math.abs((originX * 17 + originZ * 29) % 23);
      if (originSeed !== 0) continue;
      const dx = x - originX;
      const dz = z - originZ;
      if ((dx === 0 && (dz === 0 || dz === -1))
        || (dz === -2 && Math.abs(dx) <= 1)
        || (dx === 0 && dz === -3)) {
        return { x: originX, z: originZ };
      }
    }
  }
  return null;
}

function isMinecraftRiverAt(x, z) {
  const riverCenter = Math.round(Math.sin(x / 4) * 2);
  return Math.abs(z - riverCenter) <= 1;
}

function isMinecraftVillageAreaAt(x, z) {
  if (minecraftDimension === "nether") return false;
  return Boolean(getMinecraftVillageOriginAt(x, z));
}

function getMinecraftVillageOriginAt(x, z) {
  if (minecraftDimension === "nether") return null;
  const origins = [
    { x: 10, z: -12 },
    { x: 38, z: -10 },
    { x: -34, z: 8 },
    { x: 6, z: 26 },
    { x: 54, z: 24 }
  ];
  return origins.find((origin) => x >= origin.x && x <= origin.x + 14 && z >= origin.z && z <= origin.z + 14) || null;
}

function isMinecraftVillageHouseAt(x, z) {
  if (!isMinecraftVillageAreaAt(x, z)) return false;
  const localX = ((x - 10) % 5 + 5) % 5;
  const localZ = ((z + 12) % 5 + 5) % 5;
  return (localX === 0 || localX === 4 || localZ === 0 || localZ === 4) && !(localX === 2 && localZ === 4);
}

function getMinecraftVillageLocal(x, z) {
  const origin = getMinecraftVillageOriginAt(x, z);
  if (!origin) return false;
  const localX = ((x - origin.x) % 5 + 5) % 5;
  const localZ = ((z - origin.z) % 5 + 5) % 5;
  return { localX, localZ };
}

function isMinecraftVillageBedAt(x, z) {
  const local = getMinecraftVillageLocal(x, z);
  return local && local.localX === 1 && local.localZ === 2;
}

function isMinecraftVillageTorchAt(x, z) {
  const local = getMinecraftVillageLocal(x, z);
  return local && local.localX === 3 && local.localZ === 2;
}

function isMinecraftVillageFarmAt(x, z) {
  const local = getMinecraftVillageLocal(x, z);
  return local && (local.localX === 1 || local.localX === 3) && local.localZ === 3;
}

function getMinecraftVillagerHomeKey(homeX, homeZ) {
  return `${homeX},${homeZ}`;
}

function getMinecraftVillagerAtCell(x, z, y) {
  const local = getMinecraftVillageLocal(x, z);
  if (!local) return null;
  const targetX = 2;
  const targetZ = minecraftIsNight ? 2 : 3;
  if (local.localX !== targetX || local.localZ !== targetZ) return null;
  const homeX = x - local.localX + 2;
  const homeZ = z - local.localZ + 2;
  const homeKey = getMinecraftVillagerHomeKey(homeX, homeZ);
  const villager = minecraftVillagers[homeKey] || { y: 0 };
  let villagerY = villager.y;
  while (villagerY > -63 && !getMinecraftBlockAt(x, z, villagerY)) {
    villagerY -= 1;
  }
  if (villagerY !== villager.y) {
    minecraftVillagers[homeKey] = { y: villagerY };
  }
  if (villagerY !== y) return null;
  return { homeKey, sleeping: minecraftIsNight, y: villagerY };
}

function isMinecraftVillagerAt(x, z, y = 0) {
  return Boolean(getMinecraftVillagerAtCell(x, z, y));
}

function isMinecraftPortalAt(x, z, y = minecraftDepth) {
  if (minecraftDimension === "nether" && x === 0 && z === 0 && y === 0) return true;
  if (getMinecraftBlockAt(x, z, y) !== "obsidian") return false;
  const northSouth = getMinecraftBlockAt(x, z - 1, y) === "obsidian"
    && getMinecraftBlockAt(x, z + 1, y) === "obsidian";
  const eastWest = getMinecraftBlockAt(x - 1, z, y) === "obsidian"
    && getMinecraftBlockAt(x + 1, z, y) === "obsidian";
  const upDown = getMinecraftBlockAt(x, z, y - 1) === "obsidian"
    && getMinecraftBlockAt(x, z, y + 1) === "obsidian";
  return northSouth || eastWest || upDown;
}

function isMinecraftNearPortalAt(x, z, y = minecraftDepth) {
  if (isMinecraftPortalAt(x, z, y)) return true;
  for (let dx = -1; dx <= 1; dx += 1) {
    for (let dz = -1; dz <= 1; dz += 1) {
      if (dx === 0 && dz === 0) continue;
      if (isMinecraftPortalAt(x + dx, z + dz, y)) return true;
    }
  }
  return false;
}

function isMinecraftPortalNearMapPoint(x, z) {
  if (minecraftDimension !== "overworld" && minecraftDimension !== "nether") return false;
  for (let dx = -5; dx <= 5; dx += 1) {
    for (let dz = -5; dz <= 5; dz += 1) {
      if (isMinecraftPortalAt(x + dx, z + dz, 0)) return true;
    }
  }
  return false;
}

function enterMinecraftPortal() {
  if (minecraftDimension === "nether") {
    minecraftDimension = "overworld";
    minecraftDepth = 0;
    minecraftPlayerX = 1;
    minecraftPlayerZ = 0;
    updateMinecraftStatus("从紫光里回到了主世界。");
  } else {
    minecraftDimension = "nether";
    minecraftDepth = 0;
    minecraftPlayerX = 1;
    minecraftPlayerZ = 0;
    minecraftIsNight = false;
    minecraftZombies = [];
    minecraftSkeletons = [];
    updateMinecraftStatus("进入下界了：这里是红红的地，还有猪灵、金子、堡垒和小岩浆池。");
  }
  renderMinecraftWorld();
  saveGameState();
}

function checkMinecraftPortalStep() {
  if (isMinecraftNearPortalAt(minecraftPlayerX, minecraftPlayerZ, minecraftDepth)) {
    enterMinecraftPortal();
    return true;
  }
  return false;
}

function isMinecraftCaveAt(x, z, y) {
  if (y > -9 || y <= -63) return false;
  return Math.abs((x * 13 + z * 17 + y * 19) % 11) <= 1
    || Math.abs(Math.round(Math.sin((x + y) / 3) * 3) - z) <= 1;
}

function getMinecraftOreAt(x, z, y) {
  if (y > -2) return null;
  const seed = Math.abs((x * 37 + z * 41 + y * 53) % 97);
  if (y <= -8 && seed < 10) return "coal_ore";
  if (y <= -12 && seed >= 10 && seed < 18) return "iron_ore";
  if (y <= -24 && seed >= 18 && seed < 22) return "gold_ore";
  if (y <= -21 && seed >= 22 && seed < 24) return "diamond_ore";
  return null;
}

function isMinecraftNetherLavaPoolAt(x, z) {
  if (isMinecraftWarpedForestAt(x, z)) return false;
  if (x >= -40 && x <= -6 && z >= -24 && z <= 12) return false;
  const poolX = Math.abs((x * 5 + z * 3) % 29);
  const poolZ = Math.abs((x * 7 - z * 4) % 23);
  return poolX <= 2 && poolZ <= 2;
}

function isMinecraftBastionAt(x, z) {
  return x >= 12 && x <= 22 && z >= 8 && z <= 18;
}

function isMinecraftBastionPillarAt(x, z) {
  return isMinecraftBastionAt(x, z) && (x === 12 || x === 17 || x === 22) && (z === 8 || z === 13 || z === 18);
}

function isMinecraftPiglinAt(x, z) {
  if (minecraftDimension !== "nether") return false;
  return Math.abs((x * 19 + z * 23) % 17) === 0;
}

function isMinecraftWarpedForestAt(x, z) {
  return minecraftDimension === "nether" && x >= -34 && x <= -12 && z >= -18 && z <= 6;
}

function isMinecraftEndermanAt(x, z) {
  if (!isMinecraftWarpedForestAt(x, z)) return false;
  const customEnderman = Object.values(minecraftEndermen).find((entry) => entry && typeof entry === "object" && entry.x === x && entry.z === z);
  if (customEnderman) return true;
  if (minecraftEndermen[`${x},${z}`]) return false;
  return Math.abs((x * 29 + z * 31) % 13) === 0;
}

function hitMinecraftEnderman(x, z) {
  const customKey = Object.entries(minecraftEndermen).find(([, entry]) => entry && typeof entry === "object" && entry.x === x && entry.z === z)?.[0];
  if (customKey) {
    delete minecraftEndermen[customKey];
    minecraftEndermen[`${x},${z}`] = true;
    minecraftXp += 2;
    minecraftEnderPearls += 1;
    renderMinecraftWorld();
    updateMinecraftStatus(`打倒莫影人，掉了经验球和末影珍珠。末影珍珠 ${minecraftEnderPearls}。`);
    saveGameState();
    return;
  }
  minecraftEndermen[`${x},${z}`] = true;
  const targetX = minecraftPlayerX - 2;
  const targetZ = minecraftPlayerZ + 2;
  minecraftEndermen[`teleport:${Date.now()}`] = { x: targetX, z: targetZ };
  minecraftHealth = Math.max(0, minecraftHealth - 1);
  renderMinecraftWorld();
  updateMinecraftStatus("打了一下莫影人，它瞬移到你后面，还偷袭了你一下。再打一下才会死。");
  if (minecraftHealth <= 0) respawnMinecraftPlayer();
  saveGameState();
}

function hitMinecraftDragon() {
  const crystalsLeft = [
    { x: -10, z: -7 },
    { x: 8, z: -10 },
    { x: -12, z: 8 },
    { x: 11, z: 7 },
    { x: 0, z: 13 }
  ].some((crystal) => !minecraftEndCrystals[getMinecraftEndCrystalKey(crystal.x, crystal.z)]);
  if (crystalsLeft) {
    minecraftDragonHealth = Math.min(12, minecraftDragonHealth + 1);
    updateMinecraftStatus("末影龙正在用末影水晶回血，先打掉水晶会更快。");
  } else {
    minecraftDragonHealth = Math.max(0, minecraftDragonHealth - 3);
    updateMinecraftStatus(`打中了末影龙。末影龙生命 ${minecraftDragonHealth}。`);
  }
  if (minecraftDragonHealth <= 0) {
    minecraftXp += 10;
    updateMinecraftStatus(`末影龙被打败了！获得很多经验球。经验 ${minecraftXp}。`);
  }
  renderMinecraftWorld();
  saveGameState();
}

function isMinecraftMeteorAt(x, z) {
  return minecraftDimension === "overworld" && Math.abs((x * 43 + z * 47) % 71) === 0;
}

function isMinecraftStrongholdAreaAt(x, z) {
  return minecraftDimension === "overworld" && x >= 70 && x <= 82 && z >= -6 && z <= 6;
}

function isMinecraftStrongholdPortalAt(x, z) {
  return isMinecraftStrongholdAreaAt(x, z) && x >= 75 && x <= 77 && z >= -1 && z <= 1;
}

function isMinecraftEndIslandAt(x, z) {
  if (minecraftDimension !== "end") return false;
  return (x * x + z * z) <= 260 || ((x - 42) * (x - 42) + (z - 4) * (z - 4)) <= 90;
}

function isMinecraftOuterEndIslandAt(x, z) {
  return minecraftDimension === "end" && ((x - 42) * (x - 42) + (z - 4) * (z - 4)) <= 90;
}

function isMinecraftEndGatewayAt(x, z) {
  return minecraftDimension === "end" && x >= 16 && x <= 18 && z >= -1 && z <= 1;
}

function getMinecraftEndCrystalKey(x, z) {
  return `${x},${z}`;
}

function isMinecraftEndPillarAt(x, z) {
  const pillars = [
    { x: -10, z: -7 },
    { x: 8, z: -10 },
    { x: -12, z: 8 },
    { x: 11, z: 7 },
    { x: 0, z: 13 }
  ];
  return pillars.some((pillar) => Math.abs(x - pillar.x) <= 1 && Math.abs(z - pillar.z) <= 1);
}

function isMinecraftEndCrystalAt(x, z) {
  if (minecraftDimension !== "end") return false;
  const centers = [
    { x: -10, z: -7 },
    { x: 8, z: -10 },
    { x: -12, z: 8 },
    { x: 11, z: 7 },
    { x: 0, z: 13 }
  ];
  return centers.some((center) => center.x === x && center.z === z && !minecraftEndCrystals[getMinecraftEndCrystalKey(x, z)]);
}

function isMinecraftDragonAt(x, z) {
  return minecraftDimension === "end" && minecraftDragonHealth > 0 && Math.abs(x) <= 1 && Math.abs(z) <= 1;
}

function getDefaultMinecraftEndBlockAt(x, z, y) {
  if (y >= 1) return null;
  if (y === 0 && isMinecraftEndGatewayAt(x, z)) return "end_portal";
  if (y === 0 && isMinecraftOuterEndIslandAt(x, z) && x === 42 && z === 4) return "end_chest";
  if (y <= 0 && isMinecraftEndPillarAt(x, z)) return "obsidian_pillar";
  if (y === 0 && isMinecraftEndIslandAt(x, z)) return "end_stone";
  return null;
}

function getDefaultMinecraftNetherBlockAt(x, z, y) {
  if (y >= 2) return null;
  if (y === 1 && isMinecraftWarpedForestAt(x, z)) {
    const seed = Math.abs((x * 17 + z * 29) % 11);
    if (seed === 0) return "warped_stem";
    if (seed <= 2) return "warped_leaves";
    return null;
  }
  if (y === 0 && isMinecraftBastionPillarAt(x, z)) return "nether_brick";
  if (y < 0 && isMinecraftBastionPillarAt(x, z)) return "nether_brick";
  if (y === 0 && isMinecraftNetherLavaPoolAt(x, z)) return "lava";
  if (y === 0 && isMinecraftBastionAt(x, z)) return "nether_brick";
  if (y === 0 && isMinecraftWarpedForestAt(x, z)) return "warped_nylium";
  if (y === 0 && Math.abs((x * 37 + z * 17) % 43) <= 1) return "glowstone";
  if (y <= 0 && Math.abs((x * 13 + z * 11 + y * 5) % 19) <= 2) return "nether_gold_ore";
  return "netherrack";
}

function getDefaultMinecraftBlockAt(x, z, y = minecraftDepth) {
  if (minecraftDimension === "end") return getDefaultMinecraftEndBlockAt(x, z, y);
  if (minecraftDimension === "nether") return getDefaultMinecraftNetherBlockAt(x, z, y);
  if (y >= 2) return null;
  if (y === 1) {
    if (isMinecraftMeteorAt(x, z)) return "meteor";
    const treeOrigin = getMinecraftTreeOrigin(x, z);
    if (treeOrigin) {
      const dx = x - treeOrigin.x;
      const dz = z - treeOrigin.z;
      if (dx === 0 && (dz === 0 || dz === -1)) return "wood";
      if ((dz === -2 && Math.abs(dx) <= 1) || (dx === 0 && dz === -3)) return "leaves";
    }
    return null;
  }
  if (y === 0) {
    if (isMinecraftStrongholdPortalAt(x, z)) return minecraftEndPortalEyes >= 12 ? "end_portal" : "end_portal_frame";
    if (isMinecraftStrongholdAreaAt(x, z)) return "stone";
    if (isMinecraftVillageBedAt(x, z)) return "bed";
    if (isMinecraftVillageTorchAt(x, z)) return "torch";
    if (isMinecraftVillageHouseAt(x, z)) return "wood";
    if (isMinecraftRiverAt(x, z)) return "water";
    return "grass";
  }
  if (y === -1) return "dirt";
  if (y <= -21 && Math.abs((x * 7 + z * 5 + y) % 17) <= 2) return "lava";
  if (y <= -20 && Math.abs((x * 17 + z * 31 + y * 7) % 23) <= 1) return "obsidian";
  if (isMinecraftCaveAt(x, z, y)) return null;
  const ore = getMinecraftOreAt(x, z, y);
  if (ore) return ore;
  return "stone";
}

function ensureMinecraftWorldBlocks() {
  if (!minecraftWorldBlocks || typeof minecraftWorldBlocks !== "object" || Array.isArray(minecraftWorldBlocks)) {
    minecraftWorldBlocks = {};
  }
}

function getMinecraftBlockAt(x, z, y = minecraftDepth) {
  ensureMinecraftWorldBlocks();
  const key = getMinecraftKey(x, z, y);
  if (Object.prototype.hasOwnProperty.call(minecraftWorldBlocks, key)) {
    return minecraftWorldBlocks[key];
  }
  return getDefaultMinecraftBlockAt(x, z, y);
}

function setMinecraftBlockAt(x, z, y, blockType) {
  ensureMinecraftWorldBlocks();
  const key = getMinecraftKey(x, z, y);
  const defaultBlock = getDefaultMinecraftBlockAt(x, z, y);
  if (blockType === defaultBlock) {
    delete minecraftWorldBlocks[key];
    return;
  }
  minecraftWorldBlocks[key] = blockType || null;
}

function hasMinecraftBlockOverrideAt(x, z, y = minecraftDepth) {
  ensureMinecraftWorldBlocks();
  return Object.prototype.hasOwnProperty.call(minecraftWorldBlocks, getMinecraftKey(x, z, y));
}

function isNaturalMinecraftRiverWaterAt(x, z, y = minecraftDepth) {
  return y === 0 && getDefaultMinecraftBlockAt(x, z, y) === "water" && !hasMinecraftBlockOverrideAt(x, z, y);
}

function removePlacedMinecraftWaterAt(x, z, y = minecraftDepth) {
  setMinecraftBlockAt(x, z, y, getDefaultMinecraftBlockAt(x, z, y));
}

function schedulePlacedMinecraftWaterFlow(x, z, y = minecraftDepth) {
  window.setTimeout(() => {
    if (isNaturalMinecraftRiverWaterAt(x, z, y)) return;
    if (hasMinecraftBlockOverrideAt(x, z, y) && getMinecraftBlockAt(x, z, y) === "water") {
      removePlacedMinecraftWaterAt(x, z, y);
      renderMinecraftWorld();
      saveGameState();
    }
  }, 4200);
}

function getMinecraftPlantKey(x, z) {
  return `${x},${z}`;
}

function getDefaultMinecraftPlantAt(x, z) {
  if (isMinecraftVillageFarmAt(x, z)) return "wheat-ripe";
  return Math.abs((x * 11 + z * 7) % 13) === 0 ? "grass" : null;
}

function getMinecraftPlantAt(x, z) {
  const key = getMinecraftPlantKey(x, z);
  if (Object.prototype.hasOwnProperty.call(minecraftPlants, key)) {
    return minecraftPlants[key];
  }
  return getDefaultMinecraftPlantAt(x, z);
}

function setMinecraftPlantAt(x, z, plantType) {
  const key = getMinecraftPlantKey(x, z);
  const defaultPlant = getDefaultMinecraftPlantAt(x, z);
  if (plantType === defaultPlant) {
    delete minecraftPlants[key];
    return;
  }
  minecraftPlants[key] = plantType || null;
}

function getMinecraftAnimalKey(x, z) {
  return `${x},${z}`;
}

function getDefaultMinecraftAnimalAt(x, z) {
  if (getMinecraftBlockAt(x, z, 1)) return null;
  const seed = Math.abs((x * 31 + z * 43) % 37);
  if (seed === 0) return "sheep";
  if (seed === 5) return "cow";
  if (seed === 11) return "pig";
  if (seed === 17) return "chicken";
  return null;
}

function getMinecraftAnimalAt(x, z) {
  const key = getMinecraftAnimalKey(x, z);
  if (Object.prototype.hasOwnProperty.call(minecraftAnimals, key)) {
    return minecraftAnimals[key];
  }
  return getDefaultMinecraftAnimalAt(x, z);
}

function isMinecraftTorchNearPlayer() {
  for (let dx = -3; dx <= 3; dx += 1) {
    for (let dz = -3; dz <= 3; dz += 1) {
      if (getMinecraftBlockAt(minecraftPlayerX + dx, minecraftPlayerZ + dz, minecraftDepth) === "torch") {
        return true;
      }
    }
  }
  return false;
}

function findMinecraftTorchNear(x, z, radius = 4) {
  let nearest = null;
  for (let dx = -radius; dx <= radius; dx += 1) {
    for (let dz = -radius; dz <= radius; dz += 1) {
      if (Math.abs(dx) + Math.abs(dz) > radius) continue;
      if (getMinecraftBlockAt(x + dx, z + dz, 0) !== "torch") continue;
      const distance = Math.abs(dx) + Math.abs(dz);
      if (!nearest || distance < nearest.distance) {
        nearest = { x: x + dx, z: z + dz, distance };
      }
    }
  }
  return nearest;
}

function isMinecraftTorchNearPoint(x, z, radius = 4) {
  return Boolean(findMinecraftTorchNear(x, z, radius));
}

function setMinecraftAnimalAt(x, z, animalType) {
  const key = getMinecraftAnimalKey(x, z);
  const defaultAnimal = getDefaultMinecraftAnimalAt(x, z);
  if (animalType === defaultAnimal) {
    delete minecraftAnimals[key];
    return;
  }
  minecraftAnimals[key] = animalType || null;
}

function craftMinecraftBedsFromWool() {
  let craftedBeds = 0;
  while (minecraftWool >= 3) {
    minecraftWool -= 3;
    minecraftInventory.bed = (minecraftInventory.bed || 0) + 1;
    craftedBeds += 1;
  }
  return craftedBeds;
}

function getMinecraftBedPairCells(x, z, y) {
  const candidates = [
    { x, z, y },
    { x, z: z + 1, y },
    { x, z: z - 1, y },
    { x: x + 1, z, y },
    { x: x - 1, z, y }
  ];
  const pair = [{ x, z, y }];
  const neighbor = candidates.slice(1).find((cell) => getMinecraftBlockAt(cell.x, cell.z, cell.y) === "bed");
  if (neighbor) pair.push(neighbor);
  return pair;
}

function clearMinecraftBedAt(x, z, y) {
  const bedCells = getMinecraftBedPairCells(x, z, y);
  bedCells.forEach((cell) => {
    setMinecraftBlockAt(cell.x, cell.z, cell.y, cell.y === 0 ? "grass" : null);
  });
  if (minecraftSpawnPoint && bedCells.some((cell) => (
    cell.x === minecraftSpawnPoint.x
    && cell.z === minecraftSpawnPoint.z
    && cell.y === minecraftSpawnPoint.y
  ))) {
    minecraftSpawnPoint = null;
  }
}

function canPlaceMinecraftBedAt(x, z, y) {
  if (y > 0) return false;
  return [z, z + 1].every((bedZ) => {
    const block = getMinecraftBlockAt(x, bedZ, y);
    return block && block !== "bed" && block !== "water";
  });
}

function placeMinecraftBedAt(x, z, y) {
  setMinecraftPlantAt(x, z, null);
  setMinecraftPlantAt(x, z + 1, null);
  setMinecraftBlockAt(x, z, y, "bed");
  setMinecraftBlockAt(x, z + 1, y, "bed");
  minecraftSpawnPoint = { x, z, y };
}

function isMinecraftSpawnPointValid() {
  return Boolean(
    minecraftSpawnPoint
    && getMinecraftBlockAt(minecraftSpawnPoint.x, minecraftSpawnPoint.z, minecraftSpawnPoint.y) === "bed"
  );
}

function moveMinecraftPlayerToSpawnPoint() {
  if (!isMinecraftSpawnPointValid()) return false;
  minecraftPlayerX = minecraftSpawnPoint.x;
  minecraftPlayerZ = minecraftSpawnPoint.z;
  minecraftDepth = minecraftSpawnPoint.y;
  return true;
}

function applyMinecraftGravity() {
  if (minecraftDepth <= -63) return false;
  if (minecraftDepth <= 0) return false;
  if (minecraftDepth === 1 && getMinecraftBlockAt(minecraftPlayerX, minecraftPlayerZ, 0)) {
    return false;
  }
  let fell = false;
  while (minecraftDepth > -63 && !getMinecraftBlockAt(minecraftPlayerX, minecraftPlayerZ, minecraftDepth)) {
    minecraftDepth -= 1;
    fell = true;
  }
  if (minecraftDepth <= -63) {
    minecraftDepth = -63;
    minecraftGuardianFound = true;
  }
  return fell;
}

function resetMinecraftInventory() {
  minecraftInventory = {};
  Object.keys(minecraftBlockTypes).forEach((blockType) => {
    minecraftInventory[blockType] = 0;
  });
}

function ensureMinecraftInventory() {
  Object.keys(minecraftBlockTypes).forEach((blockType) => {
    const count = Number(minecraftInventory[blockType]);
    minecraftInventory[blockType] = Number.isFinite(count) ? Math.max(0, Math.floor(count)) : 0;
  });
  if (minecraftBlockTypes[minecraftSelectedTool] && (minecraftInventory[minecraftSelectedTool] || 0) <= 0) {
    minecraftSelectedTool = "pickaxe";
  }
}

function getMinecraftToolCount(tool) {
  if (tool === "bucket") return minecraftBuckets;
  if (tool === "water_bucket") return minecraftWaterBuckets;
  if (tool === "lava_bucket") return minecraftLavaBuckets;
  if (tool === "ender_pearl") return minecraftEnderPearls;
  if (tool === "ender_eye") return minecraftEnderEyes;
  if (tool === "diamond_sword") return minecraftInventory.diamond_sword || 0;
  if (minecraftBlockTypes[tool]) return minecraftInventory[tool] || 0;
  return 0;
}

function isMinecraftSelectableTool(tool) {
  return tool === "pickaxe" || tool === "bucket" || tool === "water_bucket" || tool === "lava_bucket" || tool === "ender_pearl" || tool === "ender_eye" || tool === "diamond_sword" || Boolean(minecraftBlockTypes[tool]);
}

function setMinecraftTool(tool) {
  if (!isMinecraftSelectableTool(tool)) return;
  if (tool !== "pickaxe" && getMinecraftToolCount(tool) <= 0) {
    updateMinecraftStatus("背包里没有这个方块，先用镐子去挖。");
    return;
  }
  minecraftSelectedTool = tool;
  updateMinecraftInventoryUI();
}

function getMinecraftViewOffset(localX, localZ) {
  if (minecraftView === 1) return { x: -localZ, z: localX };
  if (minecraftView === 2) return { x: -localX, z: -localZ };
  if (minecraftView === 3) return { x: localZ, z: -localX };
  return { x: localX, z: localZ };
}

function updateMinecraftStatus(message) {
  if (!minecraftStatus) return;
  const depthText = minecraftGuardianFound
    ? ` 深度 ${minecraftDepth}，守护者出现了。`
    : ` 深度 ${minecraftDepth}。`;
  const dimensionText = minecraftDimension === "nether" ? " 下界。" : "";
  minecraftStatus.textContent = `${message}${dimensionText}${depthText}`;
}

function updateMinecraftInventoryUI() {
  ensureMinecraftInventory();
  minecraftToolButtons.forEach((button) => {
    const tool = button.dataset.minecraftTool || "";
    const countBadge = button.querySelector("span");
    const count = getMinecraftToolCount(tool);
    if (countBadge && tool !== "pickaxe") {
      countBadge.textContent = count > 0 ? `${count}` : "";
    }
    if (tool !== "pickaxe") {
      const isEmpty = count <= 0;
      button.hidden = isEmpty;
      button.disabled = isEmpty;
      if (isEmpty && minecraftSelectedTool === tool) {
        minecraftSelectedTool = "pickaxe";
      }
    } else {
      button.hidden = false;
    }
    button.classList.toggle("active", minecraftSelectedTool === tool);
  });
  renderMinecraftExtraInventoryUI();
}

function renderMinecraftExtraInventoryUI() {
  const toolsBar = minecraftToolButtons[0]?.parentElement;
  if (!toolsBar) return;
  toolsBar.querySelectorAll(".minecraft-extra-item").forEach((item) => item.remove());
  [
    { id: "seeds", icon: "种", count: minecraftSeeds },
    { id: "wheat", icon: "麦", count: minecraftWheat },
    { id: "wool", icon: "毛", count: minecraftWool }
  ].forEach((entry) => {
    if (entry.count <= 0) return;
    const item = document.createElement("span");
    item.className = `minecraft-extra-item minecraft-extra-${entry.id}`;
    item.innerHTML = `<strong>${entry.icon}</strong><span>${entry.count}</span>`;
    toolsBar.appendChild(item);
  });
}

function spendMinecraftHunger(amount = 1) {
  minecraftHunger = Math.max(0, minecraftHunger - amount);
  if (minecraftHunger >= 10 && minecraftHealth < 10) {
    minecraftHealth += 1;
  }
}

function hitMinecraftAnimal(x, z) {
  const animalType = getMinecraftAnimalAt(x, z);
  const animal = minecraftAnimalTypes[animalType];
  if (!animal) return;
  setMinecraftAnimalAt(x, z, null);
  minecraftMeat += animal.meat;
  minecraftWool += animal.wool;
  const craftedBeds = craftMinecraftBedsFromWool();
  renderMinecraftWorld();
  const woolText = animal.wool ? `，还掉了羊毛。羊毛 ${minecraftWool}` : "";
  const bedText = craftedBeds ? `，三个羊毛合成了床，床已经放进物品栏` : "";
  updateMinecraftStatus(`打到${animal.label}，获得肉 ${animal.meat}${woolText}${bedText}。`);
  saveGameState();
}

function makeMinecraftAnimalElement(animalType, x, z) {
  const animal = minecraftAnimalTypes[animalType];
  if (!animal) return null;
  const animalElement = document.createElement("span");
  animalElement.className = `minecraft-animal minecraft-animal-${animalType}`;
  animalElement.textContent = animal.icon;
  animalElement.setAttribute("role", "button");
  animalElement.setAttribute("aria-label", animal.label);
  animalElement.addEventListener("click", (event) => {
    event.stopPropagation();
    hitMinecraftAnimal(x, z);
  });
  return animalElement;
}

function makeMinecraftBlockElement(blockType, x, z, y, localX, localZ, visualMode = "") {
  const cell = document.createElement("button");
  cell.type = "button";
  const visualBlockType = visualMode === "sky"
    ? "sky"
    : blockType || getDefaultMinecraftBlockAt(x, z, y - 1) || "stone";
  if (visualMode === "sky") {
    cell.className = "minecraft-cube minecraft-sky-block";
  } else {
    cell.className = blockType
      ? `minecraft-cube minecraft-${blockType}`
      : `minecraft-cube minecraft-empty-block minecraft-${visualBlockType}`;
  }
  cell.dataset.x = `${x}`;
  cell.dataset.z = `${z}`;
  cell.dataset.y = `${y}`;
  if (blockType === "bed") {
    const isFoot = getMinecraftBlockAt(x, z - 1, y) === "bed";
    cell.dataset.bedPart = isFoot ? "foot" : "head";
  }
  cell.style.setProperty("--mc-x", `${localX}`);
  cell.style.setProperty("--mc-z", `${localZ}`);
  cell.style.setProperty("--mc-order", `${(localZ + 3) * 10 + (localX + 3)}`);
  const label = blockType ? minecraftBlockTypes[blockType]?.label || "方块" : "空气";
  cell.setAttribute("aria-label", `${label} ${x}, ${y}, ${z}`);
  const plantType = y === 0 && blockType === "grass" ? getMinecraftPlantAt(x, z) : null;
  cell.dataset.plant = plantType || "";
  cell.innerHTML = '<span class="cube-top"></span><span class="cube-left"></span><span class="cube-right"></span>';
  if (plantType) {
    const plant = document.createElement("span");
    plant.className = `minecraft-plant minecraft-plant-${plantType}`;
    plant.textContent = plantType === "wheat-ripe" ? "麦" : plantType === "wheat" ? "芽" : "草";
    cell.appendChild(plant);
  }
  const animalType = y === 0 && blockType === "grass" ? getMinecraftAnimalAt(x, z) : null;
  const animalElement = animalType ? makeMinecraftAnimalElement(animalType, x, z) : null;
  if (animalElement) {
    cell.appendChild(animalElement);
  }
  if (isMinecraftPortalAt(x, z, y)) {
    const portal = document.createElement("span");
    portal.className = "minecraft-portal";
    portal.setAttribute("aria-label", "紫光传送门");
    cell.appendChild(portal);
  }
  if (y === 0 && isMinecraftPiglinAt(x, z)) {
    const piglin = document.createElement("span");
    piglin.className = "minecraft-piglin";
    piglin.setAttribute("role", "button");
    piglin.addEventListener("click", (event) => {
      event.stopPropagation();
      minecraftMeat += 2;
      minecraftXp += 1;
      renderMinecraftWorld();
      updateMinecraftStatus(`打倒猪灵，掉了肉。肉 ${minecraftMeat}，经验 ${minecraftXp}。`);
      saveGameState();
    });
    piglin.setAttribute("aria-label", "猪灵");
    cell.appendChild(piglin);
  }
  if (y === 0 && isMinecraftEndermanAt(x, z)) {
    const enderman = document.createElement("button");
    enderman.type = "button";
    enderman.className = "minecraft-enderman";
    enderman.setAttribute("aria-label", "莫影人");
    enderman.addEventListener("click", (event) => {
      event.stopPropagation();
      hitMinecraftEnderman(x, z);
    });
    cell.appendChild(enderman);
  }
  if (y === 0 && isMinecraftDragonAt(x, z)) {
    const dragon = document.createElement("button");
    dragon.type = "button";
    dragon.className = "minecraft-dragon";
    dragon.setAttribute("aria-label", "末影龙");
    dragon.addEventListener("click", (event) => {
      event.stopPropagation();
      hitMinecraftDragon();
    });
    cell.appendChild(dragon);
  }
  if (y === 0 && isMinecraftEndCrystalAt(x, z)) {
    const crystal = document.createElement("button");
    crystal.type = "button";
    crystal.className = "minecraft-end-crystal";
    crystal.setAttribute("aria-label", "末影水晶");
    crystal.addEventListener("click", (event) => {
      event.stopPropagation();
      minecraftEndCrystals[getMinecraftEndCrystalKey(x, z)] = true;
      minecraftDragonHealth = Math.max(0, minecraftDragonHealth - 4);
      renderMinecraftWorld();
      updateMinecraftStatus("打掉末影水晶，末影龙不能回血了。");
      saveGameState();
    });
    cell.appendChild(crystal);
  }
  const villagerInfo = getMinecraftVillagerAtCell(x, z, y);
  if (villagerInfo) {
    const villager = document.createElement("span");
    villager.className = `minecraft-villager${villagerInfo.sleeping ? " sleeping" : ""}`;
    villager.setAttribute("aria-label", "村民");
    villager.addEventListener("click", (event) => {
      event.stopPropagation();
      tradeWithMinecraftVillager();
    });
    cell.appendChild(villager);
  }
  cell.addEventListener("click", () => handleMinecraftCellClick(cell));
  cell.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    mineMinecraftBlock(cell);
  });
  return cell;
}

function getMinecraftZombieAt(x, z) {
  return minecraftZombies.find((zombie) => zombie.x === x && zombie.z === z) || null;
}

function spawnMinecraftZombies() {
  if (minecraftDimension === "nether") {
    minecraftZombies = [];
    minecraftSkeletons = [];
    return;
  }
  if (minecraftDepth >= 0) {
    minecraftSkeletons = [];
  }
  if ((!minecraftIsNight && minecraftDepth >= 0) || minecraftDepth < -62) {
    minecraftZombies = [];
    return;
  }
  if (!minecraftZombies.length && (minecraftIsNight || minecraftDepth < -2)) {
    minecraftZombies = [
      { x: minecraftPlayerX - 3, z: minecraftPlayerZ + 1, hp: 2 },
      { x: minecraftPlayerX + 4, z: minecraftPlayerZ + 2, hp: 2 }
    ];
  }
  if (minecraftDepth < -4 && !minecraftSkeletons.length) {
    minecraftSkeletons = [
      { x: minecraftPlayerX + 5, z: minecraftPlayerZ - 1, hp: 2 }
    ];
  }
}

function respawnMinecraftPlayer() {
  minecraftHealth = 10;
  minecraftHunger = 8;
  const usedBed = moveMinecraftPlayerToSpawnPoint();
  if (!usedBed) {
    minecraftDepth = 0;
    minecraftPlayerX = 0;
    minecraftPlayerZ = 0;
  }
  minecraftIsNight = false;
  minecraftZombies = [];
  minecraftGuardianFound = false;
  renderMinecraftWorld();
  updateMinecraftStatus(usedBed ? "没有心了，已经在床上重生。现在是白天。" : "没有心了，已经重生。现在是白天。");
  saveGameState();
}

function damageMinecraftPlayer(amount = 1) {
  const now = Date.now();
  if (now - minecraftLastZombieHitAt < 900) return;
  minecraftLastZombieHitAt = now;
  minecraftHealth = Math.max(0, minecraftHealth - amount);
  if (minecraftHealth <= 0) {
    if (minecraftHunger > 0) {
      minecraftHunger -= 1;
      minecraftHealth = 2;
      updateMinecraftStatus("没有心了，自动扣一个鸡腿补血。");
      saveGameState();
      return;
    }
    respawnMinecraftPlayer();
    return;
  }
  updateMinecraftStatus(`僵尸打到你了，心减少了。`);
  saveGameState();
}

function isMinecraftWallAt(x, z) {
  return Boolean(getMinecraftBlockAt(x, z, 1));
}

function canMinecraftZombieStepTo(x, z) {
  if (x === minecraftPlayerX && z === minecraftPlayerZ) return false;
  if (isMinecraftTorchNearPoint(x, z, 3)) return false;
  return !isMinecraftWallAt(x, z);
}

function stepMinecraftZombiesTowardPlayer() {
  if (minecraftDimension === "nether") return;
  if (!minecraftIsNight || minecraftDepth < 0) return;
  const now = Date.now();
  if (now - minecraftLastZombieStepAt < 2600) return;
  minecraftLastZombieStepAt = now;
  minecraftZombies.forEach((zombie) => {
    const torch = findMinecraftTorchNear(zombie.x, zombie.z, 4);
    if (torch) {
      const fleeMove = {
        x: Math.sign(zombie.x - torch.x),
        z: Math.sign(zombie.z - torch.z)
      };
      const fleeCandidates = [
        fleeMove,
        { x: fleeMove.x, z: 0 },
        { x: 0, z: fleeMove.z }
      ].filter((move) => move.x || move.z);
      const flee = fleeCandidates.find((candidate) => !isMinecraftWallAt(zombie.x + candidate.x, zombie.z + candidate.z));
      if (flee) {
        zombie.x += flee.x;
        zombie.z += flee.z;
      }
      return;
    }
    const dx = minecraftPlayerX - zombie.x;
    const dz = minecraftPlayerZ - zombie.z;
    if (Math.abs(dx) + Math.abs(dz) <= 1) {
      damageMinecraftPlayer(2);
      return;
    }
    const primary = Math.abs(dx) >= Math.abs(dz)
      ? { x: Math.sign(dx), z: 0 }
      : { x: 0, z: Math.sign(dz) };
    const secondary = primary.x
      ? { x: 0, z: Math.sign(dz) }
      : { x: Math.sign(dx), z: 0 };
    const moves = [primary, secondary].filter((move) => move.x || move.z);
    const move = moves.find((candidate) => canMinecraftZombieStepTo(zombie.x + candidate.x, zombie.z + candidate.z));
    if (move) {
      zombie.x += move.x;
      zombie.z += move.z;
    }
  });
}

function hitMinecraftZombie(index) {
  const zombie = minecraftZombies[index];
  if (!zombie) return;
  zombie.hp -= 1;
  if (zombie.hp <= 0) {
    minecraftZombies.splice(index, 1);
    minecraftXp += 1;
    renderMinecraftWorld();
    updateMinecraftStatus(`打倒僵尸，获得经验球。经验 ${minecraftXp}。`);
  } else {
    renderMinecraftWorld();
    updateMinecraftStatus("打到僵尸了，再打一下。");
  }
  saveGameState();
}

function stepMinecraftSkeletons() {
  if (minecraftDepth >= 0 || !minecraftSkeletons.length) return;
  const now = Date.now();
  if (now - minecraftLastSkeletonShotAt < 2400) return;
  minecraftLastSkeletonShotAt = now;
  minecraftSkeletons.forEach((skeleton) => {
    const distance = Math.abs(minecraftPlayerX - skeleton.x) + Math.abs(minecraftPlayerZ - skeleton.z);
    if (distance <= 6) {
      damageMinecraftPlayer(1);
      updateMinecraftStatus("骷髅小白射箭打到你了，心减少了。");
    }
  });
}

function hitMinecraftSkeleton(index) {
  const skeleton = minecraftSkeletons[index];
  if (!skeleton) return;
  skeleton.hp -= 1;
  if (skeleton.hp <= 0) {
    minecraftSkeletons.splice(index, 1);
    minecraftXp += 2;
    renderMinecraftWorld();
    updateMinecraftStatus(`打倒骷髅小白，获得经验球。经验 ${minecraftXp}。`);
  } else {
    renderMinecraftWorld();
    updateMinecraftStatus("砍到骷髅小白了，再来一下。");
  }
  saveGameState();
}

function makeMinecraftZombieElement(zombie, index) {
  const zombieElement = document.createElement("button");
  zombieElement.type = "button";
  zombieElement.className = "minecraft-zombie";
  zombieElement.textContent = "僵";
  zombieElement.style.setProperty("--zombie-x", `${zombie.x - minecraftPlayerX}`);
  zombieElement.style.setProperty("--zombie-z", `${zombie.z - minecraftPlayerZ}`);
  zombieElement.setAttribute("aria-label", "僵尸");
  zombieElement.addEventListener("click", () => hitMinecraftZombie(index));
  return zombieElement;
}

function makeMinecraftSkeletonElement(skeleton, index) {
  const skeletonElement = document.createElement("button");
  skeletonElement.type = "button";
  skeletonElement.className = "minecraft-skeleton";
  skeletonElement.textContent = "弓";
  skeletonElement.style.setProperty("--skeleton-x", `${skeleton.x - minecraftPlayerX}`);
  skeletonElement.style.setProperty("--skeleton-z", `${skeleton.z - minecraftPlayerZ}`);
  skeletonElement.setAttribute("aria-label", "骷髅小白");
  skeletonElement.addEventListener("click", () => hitMinecraftSkeleton(index));
  return skeletonElement;
}

function makeMinecraftSkyBody() {
  const body = document.createElement("span");
  body.className = minecraftIsNight ? "minecraft-moon" : "minecraft-sun";
  body.textContent = minecraftIsNight ? "月" : "日";
  body.style.animationDelay = `-${Date.now() % 120000}ms`;
  return body;
}

function makeMinecraftClouds() {
  const clouds = document.createElement("div");
  clouds.className = "minecraft-clouds";
  for (let index = 0; index < 4; index += 1) {
    const cloud = document.createElement("span");
    cloud.className = "minecraft-cloud";
    cloud.style.setProperty("--cloud-index", `${index}`);
    clouds.appendChild(cloud);
  }
  return clouds;
}

function makeMinecraftExperienceOrb(index) {
  const orb = document.createElement("span");
  orb.className = "minecraft-xp-orb";
  orb.textContent = "经验";
  orb.style.setProperty("--orb-index", `${index}`);
  return orb;
}

function eatMinecraftWheat() {
  if (minecraftWheat <= 0) {
    updateMinecraftStatus("还没有小麦可以吃。");
    return;
  }
  minecraftWheat -= 1;
  minecraftHunger = Math.min(10, minecraftHunger + 3);
  if (minecraftHunger >= 10) {
    minecraftHealth = Math.min(10, minecraftHealth + 2);
  }
  renderMinecraftWorld();
  updateMinecraftStatus("吃掉小麦了，鸡腿变多了。鸡腿满了会回血。");
  saveGameState();
}

function eatMinecraftMeat() {
  if (minecraftMeat <= 0) {
    updateMinecraftStatus("还没有肉可以吃，先去找动物。");
    return;
  }
  minecraftMeat -= 1;
  minecraftHunger = Math.min(10, minecraftHunger + 4);
  if (minecraftHunger >= 10) {
    minecraftHealth = Math.min(10, minecraftHealth + 2);
  }
  renderMinecraftWorld();
  updateMinecraftStatus("吃了一块肉，鸡腿变多了。");
  saveGameState();
}

function tradeWithMinecraftVillager() {
  const choice = window.prompt(
    `村民：哼！选一个交易：\n1 小麦 -> 铁\n2 小麦 -> 绿宝石\n3 绿宝石 -> 小麦\n4 铁 -> 绿宝石\n\n你有：小麦 ${minecraftWheat}，铁 ${minecraftIron}，绿宝石 ${minecraftEmerald}`,
    "1"
  );
  if (!choice) {
    updateMinecraftStatus("村民：哼。");
    return;
  }
  const trade = String(choice).trim();
  if (trade === "1") {
    if (minecraftWheat <= 0) {
      updateMinecraftStatus("村民想要一个小麦，可是你没有小麦。");
      return;
    }
    minecraftWheat -= 1;
    minecraftIron += 1;
    updateMinecraftStatus("交易成功：1 个小麦换到了 1 个铁。");
  } else if (trade === "2") {
    if (minecraftWheat <= 0) {
      updateMinecraftStatus("村民想要一个小麦，可是你没有小麦。");
      return;
    }
    minecraftWheat -= 1;
    minecraftEmerald += 1;
    updateMinecraftStatus("交易成功：1 个小麦换到了 1 个绿宝石。");
  } else if (trade === "3") {
    if (minecraftEmerald <= 0) {
      updateMinecraftStatus("你还没有绿宝石。");
      return;
    }
    minecraftEmerald -= 1;
    minecraftWheat += 1;
    updateMinecraftStatus("交易成功：1 个绿宝石换到了 1 个小麦。");
  } else if (trade === "4") {
    if (minecraftIron <= 0) {
      updateMinecraftStatus("你还没有铁。");
      return;
    }
    minecraftIron -= 1;
    minecraftEmerald += 1;
    updateMinecraftStatus("交易成功：1 个铁换到了 1 个绿宝石。");
  } else {
    updateMinecraftStatus("村民没有看懂这个交易。");
    return;
  }
  speakAsComputer("哼，交易好了。", { forceSubtitle: true, colorful: false });
  renderMinecraftWorld();
  saveGameState();
}

const minecraftCraftingMaterials = ["", "wood", "coal", "stick", "iron", "meteor_dust", "ender_pearl"];
const minecraftCraftingLabels = {
  wood: "木",
  coal: "煤",
  stick: "棍",
  iron: "铁"
};

const minecraftCraftingIcons = {
  wood: "木",
  coal: "煤",
  stick: "棍",
  iron: "铁"
};

minecraftCraftingIcons.meteor_dust = "粉";
minecraftCraftingIcons.ender_pearl = "珍";

const minecraftInventoryIcons = {
  grass: "草",
  dirt: "土",
  stone: "石",
  wood: "木",
  leaves: "叶",
  water: "水",
  bed: "床",
  crafting_table: "台",
  torch: "火",
  bucket: "桶",
  water_bucket: "水",
  lava_bucket: "岩",
  coal: "煤",
  stick: "棍",
  iron: "铁",
  emerald: "绿",
  meat: "肉",
  wool: "毛",
  seeds: "种",
  wheat: "麦",
  xp: "星"
};
const minecraftCraftingPlaceableMaterials = new Set(["wood", "coal", "stick", "iron"]);
minecraftInventoryIcons.meteor = "陨";
minecraftInventoryIcons.meteor_dust = "粉";
minecraftInventoryIcons.ender_pearl = "珍";
minecraftInventoryIcons.ender_eye = "眼";
minecraftInventoryIcons.diamond_sword = "剑";
minecraftCraftingPlaceableMaterials.add("meteor_dust");
minecraftCraftingPlaceableMaterials.add("ender_pearl");

function getMinecraftCraftingMaterialCount(material) {
  if (material === "wood") return minecraftInventory.wood || 0;
  if (material === "coal") return minecraftCoal;
  if (material === "stick") return minecraftSticks;
  if (material === "iron") return minecraftIron;
  if (material === "meteor_dust") return minecraftMeteorDust;
  if (material === "ender_pearl") return minecraftEnderPearls;
  return 0;
}

function getMinecraftWorkbenchInventoryItems() {
  ensureMinecraftInventory();
  const items = Object.keys(minecraftBlockTypes).map((type) => ({
    id: type,
    material: type,
    count: minecraftInventory[type] || 0
  }));
  items.push(
    { id: "coal", material: "coal", count: minecraftCoal },
    { id: "stick", material: "stick", count: minecraftSticks },
    { id: "iron", material: "iron", count: minecraftIron },
    { id: "emerald", material: "emerald", count: minecraftEmerald },
    { id: "meteor_dust", material: "meteor_dust", count: minecraftMeteorDust },
    { id: "ender_pearl", material: "ender_pearl", count: minecraftEnderPearls },
    { id: "ender_eye", material: "ender_eye", count: minecraftEnderEyes },
    { id: "diamond_sword", material: "diamond_sword", count: minecraftInventory.diamond_sword || 0 },
    { id: "bucket", material: "bucket", count: minecraftBuckets },
    { id: "water_bucket", material: "water_bucket", count: minecraftWaterBuckets },
    { id: "lava_bucket", material: "lava_bucket", count: minecraftLavaBuckets },
    { id: "meat", material: "meat", count: minecraftMeat },
    { id: "wool", material: "wool", count: minecraftWool },
    { id: "seeds", material: "seeds", count: minecraftSeeds },
    { id: "wheat", material: "wheat", count: minecraftWheat },
    { id: "xp", material: "xp", count: minecraftXp }
  );
  return items.filter((item) => item.count > 0);
}

function setMinecraftCraftingStatus(message) {
  if (minecraftCraftingStatus) minecraftCraftingStatus.textContent = message;
}

function getMinecraftCraftingOutput() {
  const filled = minecraftCraftingSlots.filter(Boolean).length;
  if (minecraftCraftingSlots[4] === "wood" && filled === 1) {
    return { recipe: "sticks", label: "木棍", icon: "棍", count: 4 };
  }
  if (minecraftCraftingSlots[0] === "coal" && minecraftCraftingSlots[3] === "stick" && filled === 2) {
    return { recipe: "torch", label: "火把", icon: "火", count: 4 };
  }
  if (minecraftCraftingSlots[3] === "iron" && minecraftCraftingSlots[5] === "iron" && minecraftCraftingSlots[7] === "iron" && filled === 3) {
    return { recipe: "bucket", label: "铁桶", icon: "桶", count: 1 };
  }
  if (minecraftCraftingSlots[4] === "meteor_dust"
    && minecraftCraftingSlots[5] === "meteor_dust"
    && minecraftCraftingSlots[7] === "meteor_dust"
    && minecraftCraftingSlots[8] === "meteor_dust"
    && filled === 4) {
    return { recipe: "meteor", label: "陨石", icon: "陨", count: 1 };
  }
  if (minecraftCraftingSlots[4] === "ender_pearl"
    && minecraftCraftingSlots[5] === "ender_pearl"
    && minecraftCraftingSlots[7] === "ender_pearl"
    && minecraftCraftingSlots[8] === "ender_pearl"
    && filled === 4) {
    return { recipe: "ender_eye", label: "末地之眼", icon: "眼", count: 12 };
  }
  return null;
}

function addMinecraftCraftingMaterialToGrid(material) {
  const alreadyPlaced = minecraftCraftingSlots.filter((slot) => slot === material).length;
  if (getMinecraftCraftingMaterialCount(material) <= alreadyPlaced) {
    setMinecraftCraftingStatus("这个材料已经都摆上去了。");
    return;
  }
  const emptyIndex = minecraftCraftingSlots.findIndex((slot) => !slot);
  if (emptyIndex < 0) {
    setMinecraftCraftingStatus("九宫格放满了，先点一个格子换掉。");
    return;
  }
  minecraftCraftingSlots[emptyIndex] = material;
  renderMinecraftCraftingTable();
}

function renderMinecraftCraftingInventory() {
  if (!minecraftCraftingInventory) return;
  minecraftCraftingInventory.innerHTML = "";
  getMinecraftWorkbenchInventoryItems().forEach((inventoryItem) => {
    const material = inventoryItem.material;
    const count = inventoryItem.count;
    const item = document.createElement("button");
    item.type = "button";
    item.className = `minecraft-crafting-inventory-item material-${material}`;
    item.dataset.material = material;
    const canPlace = minecraftCraftingPlaceableMaterials.has(material);
    if (!canPlace) item.classList.add("view-only");
    const icon = minecraftInventoryIcons[material] || minecraftCraftingIcons[material] || minecraftCraftingLabels[material] || material;
    item.innerHTML = `<strong>${icon}</strong><span>${count}</span>`;
    item.addEventListener("click", () => {
      if (canPlace) {
        addMinecraftCraftingMaterialToGrid(material);
      } else {
        setMinecraftCraftingStatus("这个东西先放在工作台里看着，后面可以继续加新配方。");
      }
    });
    minecraftCraftingInventory.appendChild(item);
  });
}

function renderMinecraftCraftingOutput() {
  if (!minecraftCraftingOutput) return;
  const output = getMinecraftCraftingOutput();
  minecraftCraftingOutput.disabled = !output;
  minecraftCraftingOutput.dataset.recipe = output?.recipe || "";
  minecraftCraftingOutput.innerHTML = output
    ? `<strong>${output.icon}</strong><span>${output.count}</span>`
    : "";
  minecraftCraftingOutput.setAttribute("aria-label", output ? `合成${output.label}` : "没有可合成的东西");
}

function openMinecraftCraftingTable() {
  minecraftCraftingOpen = true;
  minecraftCraftingSlots = Array(9).fill("");
  if (minecraftCraftingPanel) minecraftCraftingPanel.hidden = false;
  renderMinecraftCraftingTable();
  setMinecraftCraftingStatus("点格子选择材料：中间放木头合成木棍；左上煤、左中木棍合成火把；左中铁、下中铁、右中铁合成铁桶。");
}

function closeMinecraftCraftingTable() {
  minecraftCraftingOpen = false;
  if (minecraftCraftingPanel) minecraftCraftingPanel.hidden = true;
}

function cycleMinecraftCraftingSlot(index) {
  const current = minecraftCraftingSlots[index] || "";
  const start = minecraftCraftingMaterials.indexOf(current);
  for (let offset = 1; offset <= minecraftCraftingMaterials.length; offset += 1) {
    const next = minecraftCraftingMaterials[(start + offset + minecraftCraftingMaterials.length) % minecraftCraftingMaterials.length];
    if (!next || getMinecraftCraftingMaterialCount(next) > minecraftCraftingSlots.filter((slot) => slot === next).length) {
      minecraftCraftingSlots[index] = next;
      renderMinecraftCraftingTable();
      return;
    }
  }
}

function renderMinecraftCraftingTable() {
  if (!minecraftCraftingGrid) return;
  minecraftCraftingGrid.innerHTML = "";
  minecraftCraftingSlots.forEach((material, index) => {
    const slot = document.createElement("button");
    slot.type = "button";
    slot.className = "minecraft-crafting-slot";
    slot.textContent = material ? (minecraftCraftingIcons[material] || minecraftCraftingLabels[material] || material) : "";
    slot.addEventListener("click", () => cycleMinecraftCraftingSlot(index));
    minecraftCraftingGrid.appendChild(slot);
  });
  renderMinecraftCraftingInventory();
  renderMinecraftCraftingOutput();
}

function spendMinecraftCraftingMaterials(materials) {
  materials.forEach((material) => {
    if (material === "wood") minecraftInventory.wood = Math.max(0, (minecraftInventory.wood || 0) - 1);
    if (material === "coal") minecraftCoal = Math.max(0, minecraftCoal - 1);
    if (material === "stick") minecraftSticks = Math.max(0, minecraftSticks - 1);
    if (material === "iron") minecraftIron = Math.max(0, minecraftIron - 1);
    if (material === "meteor_dust") minecraftMeteorDust = Math.max(0, minecraftMeteorDust - 1);
    if (material === "ender_pearl") minecraftEnderPearls = Math.max(0, minecraftEnderPearls - 1);
  });
}

function canSpendMinecraftCraftingMaterials(materials) {
  const needed = materials.reduce((counts, material) => {
    counts[material] = (counts[material] || 0) + 1;
    return counts;
  }, {});
  return Object.entries(needed).every(([material, count]) => getMinecraftCraftingMaterialCount(material) >= count);
}

function craftMinecraftRecipe(recipe = "") {
  if ((recipe === "ender_eye" || !recipe)
    && minecraftCraftingSlots[4] === "ender_pearl"
    && minecraftCraftingSlots[5] === "ender_pearl"
    && minecraftCraftingSlots[7] === "ender_pearl"
    && minecraftCraftingSlots[8] === "ender_pearl"
    && minecraftCraftingSlots.filter(Boolean).length === 4) {
    spendMinecraftCraftingMaterials(["ender_pearl", "ender_pearl", "ender_pearl", "ender_pearl"]);
    minecraftEnderEyes += 12;
    minecraftCraftingSlots = Array(9).fill("");
    renderMinecraftCraftingTable();
    renderMinecraftWorld();
    setMinecraftCraftingStatus("4 个末影珍珠合成了 12 个末地之眼。");
    saveGameState();
    return;
  }
  if ((recipe === "meteor" || !recipe)
    && minecraftCraftingSlots[4] === "meteor_dust"
    && minecraftCraftingSlots[5] === "meteor_dust"
    && minecraftCraftingSlots[7] === "meteor_dust"
    && minecraftCraftingSlots[8] === "meteor_dust"
    && minecraftCraftingSlots.filter(Boolean).length === 4) {
    spendMinecraftCraftingMaterials(["meteor_dust", "meteor_dust", "meteor_dust", "meteor_dust"]);
    minecraftInventory.meteor = (minecraftInventory.meteor || 0) + 1;
    minecraftCraftingSlots = Array(9).fill("");
    renderMinecraftCraftingTable();
    renderMinecraftWorld();
    setMinecraftCraftingStatus("4 个陨石粉合成了 1 个陨石。");
    saveGameState();
    return;
  }
  if ((recipe === "sticks" || !recipe) && minecraftCraftingSlots[4] === "wood" && minecraftCraftingSlots.filter(Boolean).length === 1) {
    spendMinecraftCraftingMaterials(["wood"]);
    minecraftSticks += 4;
    minecraftCraftingSlots = Array(9).fill("");
    renderMinecraftCraftingTable();
    renderMinecraftWorld();
    setMinecraftCraftingStatus("合成了 4 根木棍。");
    saveGameState();
    return;
  }
  if (recipe === "sticks") {
    if (!canSpendMinecraftCraftingMaterials(["wood"])) {
      setMinecraftCraftingStatus("木头不够，先去撸树。");
      return;
    }
    spendMinecraftCraftingMaterials(["wood"]);
    minecraftSticks += 4;
    renderMinecraftWorld();
    setMinecraftCraftingStatus("合成了 4 根木棍。");
    saveGameState();
    return;
  }
  if ((recipe === "torch" || !recipe) && minecraftCraftingSlots[0] === "coal" && minecraftCraftingSlots[3] === "stick" && minecraftCraftingSlots.filter(Boolean).length === 2) {
    spendMinecraftCraftingMaterials(["coal", "stick"]);
    minecraftInventory.torch = (minecraftInventory.torch || 0) + 4;
    minecraftCraftingSlots = Array(9).fill("");
    renderMinecraftCraftingTable();
    renderMinecraftWorld();
    setMinecraftCraftingStatus("合成了 4 个火把。");
    saveGameState();
    return;
  }
  if (recipe === "torch") {
    if (!canSpendMinecraftCraftingMaterials(["coal", "stick"])) {
      setMinecraftCraftingStatus("火把需要煤炭和木棍。");
      return;
    }
    spendMinecraftCraftingMaterials(["coal", "stick"]);
    minecraftInventory.torch = (minecraftInventory.torch || 0) + 4;
    renderMinecraftWorld();
    setMinecraftCraftingStatus("合成了 4 个火把。");
    saveGameState();
    return;
  }
  if ((recipe === "bucket" || !recipe) && minecraftCraftingSlots[3] === "iron" && minecraftCraftingSlots[7] === "iron" && minecraftCraftingSlots[5] === "iron" && minecraftCraftingSlots.filter(Boolean).length === 3) {
    spendMinecraftCraftingMaterials(["iron", "iron", "iron"]);
    minecraftBuckets += 1;
    minecraftCraftingSlots = Array(9).fill("");
    renderMinecraftCraftingTable();
    renderMinecraftWorld();
    setMinecraftCraftingStatus("合成了一个铁桶。");
    saveGameState();
    return;
  }
  if (recipe === "bucket") {
    if (!canSpendMinecraftCraftingMaterials(["iron", "iron", "iron"])) {
      setMinecraftCraftingStatus("铁桶需要 3 个铁。");
      return;
    }
    spendMinecraftCraftingMaterials(["iron", "iron", "iron"]);
    minecraftBuckets += 1;
    renderMinecraftWorld();
    setMinecraftCraftingStatus("合成了一个铁桶。");
    saveGameState();
    return;
  }
  setMinecraftCraftingStatus("这个摆法还不能合成东西。");
}

function makeMinecraftHud() {
  const hud = document.createElement("div");
  hud.className = "minecraft-hud";
  const hearts = document.createElement("div");
  hearts.className = "minecraft-hearts";
  hearts.textContent = `${"♥".repeat(minecraftHealth)}${"♡".repeat(10 - minecraftHealth)}`;
  const hunger = document.createElement("div");
  hunger.className = "minecraft-hunger";
  hunger.textContent = `${"▣".repeat(minecraftHunger)}${"□".repeat(10 - minecraftHunger)}`;
  const farm = document.createElement("div");
  farm.className = "minecraft-farm-counts";
  farm.textContent = `种子 ${minecraftSeeds} 小麦 ${minecraftWheat} 肉 ${minecraftMeat} 羊毛 ${minecraftWool} 煤 ${minecraftCoal} 铁 ${minecraftIron} 绿 ${minecraftEmerald} 棍 ${minecraftSticks} 桶 ${minecraftBuckets}`;
  farm.textContent = `肉 ${minecraftMeat}`;
  const eat = document.createElement("button");
  eat.type = "button";
  eat.className = "minecraft-eat";
  eat.textContent = "吃";
  eat.disabled = minecraftWheat <= 0;
  eat.addEventListener("click", eatMinecraftWheat);
  const eatMeat = document.createElement("button");
  eatMeat.type = "button";
  eatMeat.className = "minecraft-eat";
  eatMeat.textContent = "肉";
  eatMeat.disabled = minecraftMeat <= 0;
  eatMeat.addEventListener("click", eatMinecraftMeat);
  hud.append(hearts, hunger, farm, eat, eatMeat);
  return hud;
}

function renderMinecraftMap() {
  if (!minecraftMap) return;
  minecraftMap.innerHTML = "";
  const mapSize = 19;
  const minX = minecraftPlayerX - 90;
  const maxX = minecraftPlayerX + 90;
  const minZ = minecraftPlayerZ - 90;
  const maxZ = minecraftPlayerZ + 90;
  const playerMapX = clamp(Math.round(((minecraftPlayerX - minX) / (maxX - minX)) * (mapSize - 1)), 0, mapSize - 1);
  const playerMapZ = clamp(Math.round(((minecraftPlayerZ - minZ) / (maxZ - minZ)) * (mapSize - 1)), 0, mapSize - 1);
  for (let mapZ = 0; mapZ < mapSize; mapZ += 1) {
    for (let mapX = 0; mapX < mapSize; mapX += 1) {
      const worldX = Math.round(minX + (mapX / (mapSize - 1)) * (maxX - minX));
      const worldZ = Math.round(minZ + (mapZ / (mapSize - 1)) * (maxZ - minZ));
      const cell = document.createElement("span");
      cell.className = "minecraft-map-cell";
      if (minecraftDimension === "nether") cell.classList.add("nether");
      if (minecraftDimension === "end") cell.classList.add("end");
      if (minecraftDimension === "nether" && isMinecraftWarpedForestAt(worldX, worldZ)) cell.classList.add("warped");
      if (minecraftDimension === "nether" && isMinecraftBastionAt(worldX, worldZ)) cell.classList.add("bastion");
      if (minecraftDimension === "nether" && isMinecraftNetherLavaPoolAt(worldX, worldZ)) cell.classList.add("lava");
      if (minecraftDimension === "nether" && isMinecraftPortalNearMapPoint(worldX, worldZ)) cell.classList.add("portal");
      if (minecraftDimension !== "nether" && isMinecraftRiverAt(worldX, worldZ)) cell.classList.add("river");
      if (minecraftDimension !== "nether" && isMinecraftVillageAreaAt(worldX, worldZ)) cell.classList.add("village");
      if (minecraftDimension === "overworld" && isMinecraftPortalNearMapPoint(worldX, worldZ)) cell.classList.add("overworld-portal");
      if (minecraftDimension === "nether" && Math.abs(worldX) <= 5 && Math.abs(worldZ) <= 5) cell.classList.add("portal");
      if (minecraftDimension === "end" && isMinecraftEndGatewayAt(worldX, worldZ)) cell.classList.add("portal");
      if (mapX === playerMapX && mapZ === playerMapZ) cell.classList.add("player");
      minecraftMap.appendChild(cell);
    }
  }
  minecraftMap.style.setProperty("--map-size", `${mapSize}`);
  minecraftMap.dataset.coords = `你在 X${minecraftPlayerX} Z${minecraftPlayerZ}`;
}

function renderMinecraftWorld() {
  if (!minecraftWorld) return;
  ensureMinecraftWorldBlocks();
  const fell = applyMinecraftGravity();
  spawnMinecraftZombies();
  stepMinecraftZombiesTowardPlayer();
  stepMinecraftSkeletons();
  minecraftWorld.innerHTML = "";
  minecraftWorld.classList.toggle("guardian-depth", minecraftGuardianFound || minecraftDepth <= -63);
  minecraftWorld.classList.toggle("nether-world", minecraftDimension === "nether");
  minecraftWorld.classList.toggle("surface-night", minecraftDimension !== "nether" && minecraftIsNight && minecraftDepth >= 0);
  minecraftWorld.classList.toggle("underground-dark", minecraftDepth < 0 && !isMinecraftTorchNearPlayer());
  minecraftWorld.classList.toggle("underground-lit", minecraftDepth < 0 && isMinecraftTorchNearPlayer());
  for (let localZ = -4; localZ <= 4; localZ += 1) {
    for (let localX = -7; localX <= 6; localX += 1) {
      const offset = getMinecraftViewOffset(localX, localZ);
      const x = minecraftPlayerX + offset.x;
      const z = minecraftPlayerZ + offset.z;
      const isSurfaceSky = minecraftDimension !== "nether" && minecraftDepth >= 0 && (minecraftDepth === 1 || localZ <= -2);
      const netherUpperBlock = minecraftDimension === "nether" && minecraftDepth === 0 && localZ <= -2
        ? getMinecraftBlockAt(x, z, 1)
        : null;
      const blockY = netherUpperBlock ? 1 : isSurfaceSky ? 1 : minecraftDepth;
      const blockType = getMinecraftBlockAt(x, z, blockY);
      minecraftWorld.appendChild(makeMinecraftBlockElement(blockType, x, z, blockY, localX, localZ, isSurfaceSky && !blockType ? "sky" : ""));
    }
  }
  if (minecraftDimension !== "nether" && minecraftDepth >= 0) {
    minecraftWorld.appendChild(makeMinecraftSkyBody());
    minecraftWorld.appendChild(makeMinecraftClouds());
  }
  minecraftZombies.forEach((zombie, index) => {
    minecraftWorld.appendChild(makeMinecraftZombieElement(zombie, index));
  });
  minecraftSkeletons.forEach((skeleton, index) => {
    minecraftWorld.appendChild(makeMinecraftSkeletonElement(skeleton, index));
  });
  for (let index = 0; index < Math.min(minecraftXp, 6); index += 1) {
    minecraftWorld.appendChild(makeMinecraftExperienceOrb(index));
  }
  const player = document.createElement("span");
  player.className = "minecraft-player";
  player.textContent = "我";
  minecraftWorld.appendChild(player);
  minecraftWorld.appendChild(makeMinecraftHud());
  if (minecraftGuardianFound || minecraftDepth <= -63) {
    const guardian = document.createElement("span");
    guardian.className = "minecraft-guardian";
    guardian.textContent = "守";
    minecraftWorld.appendChild(guardian);
  }
  updateMinecraftInventoryUI();
  renderMinecraftMap();
  updateMinecraftStatus("前后左右可以走，点方块可以挖或放。");
}

function placeMinecraftBlock(cell, blockType) {
  const block = minecraftBlockTypes[blockType];
  const x = Number(cell?.dataset.x);
  const z = Number(cell?.dataset.z);
  const y = Number(cell?.dataset.y);
  if (!cell || !Number.isFinite(x) || !Number.isFinite(z) || !Number.isFinite(y)) return;
  if (blockType === "water_bucket" || blockType === "lava_bucket") {
    const fluid = blockType === "water_bucket" ? "water" : "lava";
    const currentBlock = getMinecraftBlockAt(x, z, y);
    if (currentBlock) {
      updateMinecraftStatus("这里已经有方块了，先挖掉再倒。");
      return;
    }
    if (blockType === "water_bucket") minecraftWaterBuckets -= 1;
    if (blockType === "lava_bucket") minecraftLavaBuckets -= 1;
    minecraftBuckets += 1;
    minecraftSelectedTool = "bucket";
    setMinecraftBlockAt(x, z, y, fluid);
    if (fluid === "water") schedulePlacedMinecraftWaterFlow(x, z, y);
    renderMinecraftWorld();
    updateMinecraftStatus(fluid === "water" ? "倒出了一桶水，水会慢慢流走。" : "倒出了一桶岩浆，小心烫。");
    saveGameState();
    return;
  }
  if (!block) return;
  if ((minecraftInventory[blockType] || 0) <= 0) {
    updateMinecraftStatus("背包里没有这个方块，先用镐子去挖。");
    return;
  }
  const currentBlock = getMinecraftBlockAt(x, z, y);
  if (blockType === "bed") {
    if (minecraftDimension === "nether") {
      minecraftInventory.bed = Math.max(0, (minecraftInventory.bed || 0) - 1);
      minecraftHealth = Math.max(0, minecraftHealth - 6);
      renderMinecraftWorld();
      updateMinecraftStatus("下界没有晚上，床不能睡。床爆炸了！");
      if (minecraftHealth <= 0) respawnMinecraftPlayer();
      saveGameState();
      return;
    }
    const bedY = y > 0 ? 0 : y;
    if (!canPlaceMinecraftBedAt(x, z, bedY)) {
      updateMinecraftStatus("床要占两格，旁边没有空位置就放不下。");
      return;
    }
    minecraftInventory.bed -= 1;
    placeMinecraftBedAt(x, z, bedY);
    minecraftDepth = bedY;
    renderMinecraftWorld();
    updateMinecraftStatus("两格床放好了，晚上碰一下就可以睡觉。");
    saveGameState();
    return;
  }
  if (currentBlock) {
    updateMinecraftStatus("这里已经有方块了，先挖掉再放。");
    return;
  }
  minecraftInventory[blockType] -= 1;
  setMinecraftBlockAt(x, z, y, blockType);
  if (blockType === "water") {
    schedulePlacedMinecraftWaterFlow(x, z, y);
  }
  renderMinecraftWorld();
  updateMinecraftStatus(`放下了${block.label}。`);
  saveGameState();
}

function growMinecraftWheat(x, z) {
  window.setTimeout(() => {
    if (getMinecraftPlantAt(x, z) !== "wheat") return;
    setMinecraftPlantAt(x, z, "wheat-ripe");
    renderMinecraftWorld();
    saveGameState();
  }, 2600);
}

function harvestMinecraftPlant(cell) {
  const x = Number(cell?.dataset.x);
  const z = Number(cell?.dataset.z);
  const plantType = cell?.dataset.plant || "";
  if (!plantType || !Number.isFinite(x) || !Number.isFinite(z)) return false;
  const isVillageCrop = isMinecraftVillageFarmAt(x, z);
  setMinecraftPlantAt(x, z, null);
  if (plantType === "grass") {
    minecraftSeeds += 1;
    renderMinecraftWorld();
    updateMinecraftStatus(`挖到小麦种子了。种子 ${minecraftSeeds}。`);
  } else if (plantType === "wheat-ripe") {
    minecraftWheat += 1;
    minecraftSeeds += 1;
    renderMinecraftWorld();
    updateMinecraftStatus(`收到了小麦。小麦 ${minecraftWheat}。`);
  } else {
    minecraftSeeds += 1;
    renderMinecraftWorld();
    updateMinecraftStatus("小麦还没完全长大，但拿回了种子。");
  }
  if (isVillageCrop && plantType === "wheat-ripe") {
    updateMinecraftStatus(`Harvested village crops. Villager: hum hum! Wheat ${minecraftWheat}.`);
    speakAsComputer("hum hum", { forceSubtitle: true, colorful: false });
  }
  /*
    updateMinecraftStatus(`收了村里的菜，获得小麦。村民：哼哼！小麦 ${minecraftWheat}。`);
    speakAsComputer("哼哼。", { forceSubtitle: true, colorful: false });
  }
  */
  saveGameState();
  return true;
}

function plantMinecraftWheat(cell) {
  const x = Number(cell?.dataset.x);
  const z = Number(cell?.dataset.z);
  const y = Number(cell?.dataset.y);
  if (!Number.isFinite(x) || !Number.isFinite(z) || y !== 0) return false;
  if (getMinecraftBlockAt(x, z, y) !== "grass" || getMinecraftPlantAt(x, z)) return false;
  if (minecraftSeeds <= 0) return false;
  minecraftSeeds -= 1;
  setMinecraftPlantAt(x, z, "wheat");
  growMinecraftWheat(x, z);
  renderMinecraftWorld();
  updateMinecraftStatus("种下小麦了，很快就会长大。");
  saveGameState();
  return true;
}

function sleepInMinecraftBed(cell) {
  const x = Number(cell?.dataset.x);
  const z = Number(cell?.dataset.z);
  const y = Number(cell?.dataset.y);
  if (!Number.isFinite(x) || !Number.isFinite(z) || !Number.isFinite(y)) return false;
  if (getMinecraftBlockAt(x, z, y) !== "bed") return false;
  if (!minecraftIsNight) {
    if (minecraftSelectedTool !== "pickaxe") {
      minecraftSpawnPoint = { x, z, y };
      saveGameState();
      updateMinecraftStatus("床已经放好了，晚上碰一下它就可以睡觉。");
      return true;
    }
    return false;
  }
  minecraftIsNight = false;
  minecraftZombies = [];
  minecraftHealth = Math.min(10, minecraftHealth + 2);
  minecraftSpawnPoint = { x, z, y };
  renderMinecraftWorld();
  updateMinecraftStatus("在床上睡了一觉，天亮了，僵尸也走了。");
  saveGameState();
  return true;
}

function mineMinecraftBlock(cell) {
  const x = Number(cell?.dataset.x);
  const z = Number(cell?.dataset.z);
  const y = Number(cell?.dataset.y);
  if (!cell || !Number.isFinite(x) || !Number.isFinite(z) || !Number.isFinite(y)) return;
  const blockType = getMinecraftBlockAt(x, z, y);
  const block = minecraftBlockTypes[blockType];
  if (!block) {
    updateMinecraftStatus("这里是空气，挖不到方块。");
    return;
  }
  if (blockType === "bed") {
    minecraftInventory.bed = (minecraftInventory.bed || 0) + 1;
    clearMinecraftBedAt(x, z, y);
    renderMinecraftWorld();
    updateMinecraftStatus("挖掉了整张床，床已经回到物品栏。");
    saveGameState();
    return;
  }
  if (blockType === "crafting_table") {
    openMinecraftCraftingTable();
    return;
  }
  if (blockType === "meteor") {
    minecraftMeteorDust += 4;
    setMinecraftBlockAt(x, z, y, null);
    renderMinecraftWorld();
    updateMinecraftStatus(`挖掉了发黄光的陨石，获得 4 个陨石粉。陨石粉 ${minecraftMeteorDust}。`);
    saveGameState();
    return;
  }
  if (blockType === "water") {
    updateMinecraftStatus("Water cannot be mined. Select an iron bucket and tap the water to fill it.");
    return;
    if (minecraftBuckets <= 0) {
      updateMinecraftStatus("水要用铁桶装，先在工作台合成铁桶。");
      return;
    }
    minecraftBuckets -= 1;
    minecraftWaterBuckets += 1;
    minecraftInventory.water = (minecraftInventory.water || 0) + 1;
    if (!isNaturalMinecraftRiverWaterAt(x, z, y)) {
      removePlacedMinecraftWaterAt(x, z, y);
      renderMinecraftWorld();
      updateMinecraftStatus("装走了一格放出来的水，这个水不是河水源头，所以不会无限补回来。");
      saveGameState();
      return;
    }
    renderMinecraftWorld();
    updateMinecraftStatus("装到了一格水，旁边的水又流回来，所以水不会被挖完。");
    saveGameState();
    return;
  }
  if (blockType === "lava") {
    if (minecraftBuckets <= 0) {
      updateMinecraftStatus("岩浆太烫了，要用铁桶装。");
      return;
    }
    minecraftBuckets -= 1;
    minecraftLavaBuckets += 1;
    setMinecraftBlockAt(x, z, y, null);
    renderMinecraftWorld();
    updateMinecraftStatus("装到了一桶岩浆。");
    saveGameState();
    return;
  }
  if (blockType === "coal_ore") {
    minecraftCoal += 1;
    setMinecraftBlockAt(x, z, y, null);
    renderMinecraftWorld();
    updateMinecraftStatus(`挖到煤炭了。煤炭 ${minecraftCoal}。`);
    saveGameState();
    return;
  }
  if (blockType === "iron_ore") {
    minecraftIron += 1;
    setMinecraftBlockAt(x, z, y, null);
    renderMinecraftWorld();
    updateMinecraftStatus(`挖到铁了。铁 ${minecraftIron}。`);
    saveGameState();
    return;
  }
  const madeFirstCraftingTable = blockType === "wood" && (minecraftInventory.crafting_table || 0) <= 0;
  if (madeFirstCraftingTable) {
    minecraftInventory.crafting_table = 1;
  }
  minecraftInventory[blockType] = (minecraftInventory[blockType] || 0) + 1;
  setMinecraftBlockAt(x, z, y, null);
  renderMinecraftWorld();
  updateMinecraftStatus(madeFirstCraftingTable ? "撸到第一块木头，自动做出了一个工作台。" : `挖到了${block.label}，现在可以放它了。`);
  saveGameState();
}

function handleMinecraftCellClick(cell) {
  if (Date.now() - minecraftOpenedAt < 260) return;
  markChatActivity();
  wakeFromNightSleep();
  const x = Number(cell?.dataset.x);
  const z = Number(cell?.dataset.z);
  const y = Number(cell?.dataset.y);
  const blockType = getMinecraftBlockAt(x, z, y);
  if (minecraftSelectedTool === "diamond_sword") {
    if (isMinecraftPiglinAt(x, z)) {
      minecraftMeat += 2;
      minecraftXp += 1;
      renderMinecraftWorld();
      updateMinecraftStatus("钻石剑秒杀猪灵，掉了肉。");
      saveGameState();
      return;
    }
    if (isMinecraftEndermanAt(x, z)) {
      minecraftEndermen[`${x},${z}`] = true;
      minecraftEnderPearls += 1;
      minecraftXp += 2;
      renderMinecraftWorld();
      updateMinecraftStatus("钻石剑秒杀莫影人，掉了末影珍珠。");
      saveGameState();
      return;
    }
    if (isMinecraftDragonAt(x, z)) {
      minecraftDragonHealth = 0;
      minecraftXp += 10;
      renderMinecraftWorld();
      updateMinecraftStatus("钻石剑重重砍中了末影龙！");
      saveGameState();
      return;
    }
  }
  if (minecraftSelectedTool === "ender_pearl") {
    if (minecraftEnderPearls <= 0) return;
    minecraftEnderPearls -= 1;
    minecraftPlayerX = x;
    minecraftPlayerZ = z;
    minecraftDepth = y;
    minecraftSelectedTool = minecraftEnderPearls > 0 ? "ender_pearl" : "pickaxe";
    renderMinecraftWorld();
    updateMinecraftStatus("扔出了末影珍珠，你瞬移过去了。");
    saveGameState();
    return;
  }
  if (minecraftSelectedTool === "ender_eye") {
    if (minecraftEnderEyes <= 0) return;
    if (blockType === "end_portal_frame") {
      minecraftEnderEyes -= 1;
      minecraftEndPortalEyes = Math.min(12, minecraftEndPortalEyes + 1);
      minecraftSelectedTool = minecraftEnderEyes > 0 ? "ender_eye" : "pickaxe";
      renderMinecraftWorld();
      updateMinecraftStatus(`放上了末地之眼。传送门 ${minecraftEndPortalEyes}/12。`);
      saveGameState();
      return;
    }
    minecraftEnderEyes -= 1;
    minecraftPlayerX = 76;
    minecraftPlayerZ = 0;
    minecraftDepth = 0;
    minecraftDimension = "overworld";
    minecraftSelectedTool = minecraftEnderEyes > 0 ? "ender_eye" : "pickaxe";
    renderMinecraftWorld();
    updateMinecraftStatus("末地之眼飞向了末地要塞，你跟着找到了传送门房间。");
    saveGameState();
    return;
  }
  if (blockType === "end_chest") {
    if (!minecraftOuterChestOpened) {
      minecraftOuterChestOpened = true;
      minecraftEnderPearls += 4;
      minecraftInventory.diamond_sword = (minecraftInventory.diamond_sword || 0) + 1;
      renderMinecraftWorld();
      updateMinecraftStatus("打开末地外岛箱子，获得末影珍珠和钻石剑。");
      saveGameState();
    } else {
      updateMinecraftStatus("这个末地箱子已经打开过了。");
    }
    return;
  }
  if (isMinecraftPortalAt(x, z, y)) {
    enterMinecraftPortal();
    return;
  }
  if (blockType === "end_portal") {
    if (minecraftDimension === "end") {
      minecraftPlayerX = 42;
      minecraftPlayerZ = 4;
      renderMinecraftWorld();
      updateMinecraftStatus("走进小传送门，到了末地外岛。");
      saveGameState();
      return;
    }
    minecraftDimension = "end";
    minecraftDepth = 0;
    minecraftPlayerX = 0;
    minecraftPlayerZ = 8;
    renderMinecraftWorld();
    updateMinecraftStatus("跳进黑色传送门，进入了末地。");
    saveGameState();
    return;
  }
  if (blockType === "crafting_table") {
    openMinecraftCraftingTable();
    return;
  }
  if (minecraftSelectedTool === "bucket" && (blockType === "water" || blockType === "lava")) {
    if (minecraftBuckets <= 0) return;
    minecraftBuckets -= 1;
    if (blockType === "water") minecraftWaterBuckets += 1;
    if (blockType === "lava") minecraftLavaBuckets += 1;
    minecraftSelectedTool = blockType === "water" ? "water_bucket" : "lava_bucket";
    if (blockType === "lava") {
      setMinecraftBlockAt(x, z, y, null);
    } else if (!isNaturalMinecraftRiverWaterAt(x, z, y)) {
      removePlacedMinecraftWaterAt(x, z, y);
    }
    renderMinecraftWorld();
    updateMinecraftStatus(blockType === "water" ? "用铁桶装到了一桶水。" : "用铁桶装到了一桶岩浆。");
    saveGameState();
    return;
  }
  if (sleepInMinecraftBed(cell)) return;
  if (minecraftSelectedTool === "pickaxe") {
    if (harvestMinecraftPlant(cell)) return;
    if (plantMinecraftWheat(cell)) return;
    mineMinecraftBlock(cell);
    return;
  }
  if (minecraftSelectedTool === "bed") {
    placeMinecraftBlock(cell, minecraftSelectedTool);
    return;
  }
  if (minecraftSelectedTool === "water_bucket" || minecraftSelectedTool === "lava_bucket") {
    placeMinecraftBlock(cell, minecraftSelectedTool);
    return;
  }
  if (harvestMinecraftPlant(cell)) return;
  if (plantMinecraftWheat(cell)) return;
  placeMinecraftBlock(cell, minecraftSelectedTool);
}

function moveMinecraftPlayer(direction, options = {}) {
  const moves = {
    forward: { x: 0, z: -1 },
    back: { x: 0, z: 1 },
    left: { x: -1, z: 0 },
    right: { x: 1, z: 0 }
  };
  const move = moves[direction];
  if (!move) return;
  const offset = getMinecraftViewOffset(move.x, move.z);
  minecraftPlayerX += offset.x * MINECRAFT_MOVE_STEP;
  minecraftPlayerZ += offset.z * MINECRAFT_MOVE_STEP;
  if (checkMinecraftPortalStep()) return;
  renderMinecraftWorld();
  updateMinecraftStatus(options.quiet ? "正在走路。" : "走到了新的地方。");
  saveGameState();
}

function stopMinecraftJoystick() {
  minecraftJoystickDirection = "";
  if (minecraftJoystickTimer) {
    window.clearInterval(minecraftJoystickTimer);
    minecraftJoystickTimer = null;
  }
  minecraftJoystickHandle?.style.setProperty("--joy-x", "0px");
  minecraftJoystickHandle?.style.setProperty("--joy-y", "0px");
}

function moveMinecraftJoystick(event) {
  if (!minecraftJoystick || !minecraftJoystickHandle) return;
  const rect = minecraftJoystick.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const rawX = event.clientX - centerX;
  const rawY = event.clientY - centerY;
  const limit = Math.max(14, rect.width * 0.32);
  const length = Math.hypot(rawX, rawY) || 1;
  const scale = Math.min(1, limit / length);
  const knobX = rawX * scale;
  const knobY = rawY * scale;
  minecraftJoystickHandle.style.setProperty("--joy-x", `${knobX}px`);
  minecraftJoystickHandle.style.setProperty("--joy-y", `${knobY}px`);
  if (Math.hypot(rawX, rawY) < rect.width * 0.13) {
    minecraftJoystickDirection = "";
    return;
  }
  minecraftJoystickDirection = Math.abs(rawX) > Math.abs(rawY)
    ? (rawX > 0 ? "right" : "left")
    : (rawY > 0 ? "back" : "forward");
}

function startMinecraftJoystick(event) {
  if (!minecraftJoystick) return;
  event.preventDefault();
  minecraftJoystick.setPointerCapture?.(event.pointerId);
  moveMinecraftJoystick(event);
  if (minecraftJoystickTimer) return;
  minecraftJoystickTimer = window.setInterval(() => {
    if (!minecraftJoystickDirection) return;
    moveMinecraftPlayer(minecraftJoystickDirection, { quiet: true });
  }, 170);
}

function digMinecraftDown() {
  const blockType = getMinecraftBlockAt(minecraftPlayerX, minecraftPlayerZ, minecraftDepth);
  const block = minecraftBlockTypes[blockType];
  if (block) {
    if (blockType === "bed") {
      minecraftInventory.bed = (minecraftInventory.bed || 0) + 1;
      clearMinecraftBedAt(minecraftPlayerX, minecraftPlayerZ, minecraftDepth);
    } else if (blockType === "water") {
      minecraftInventory.water = (minecraftInventory.water || 0) + 1;
      if (!isNaturalMinecraftRiverWaterAt(minecraftPlayerX, minecraftPlayerZ, minecraftDepth)) {
        removePlacedMinecraftWaterAt(minecraftPlayerX, minecraftPlayerZ, minecraftDepth);
      }
    } else if (blockType === "lava") {
      if (minecraftBuckets > 0) {
        minecraftBuckets -= 1;
        minecraftLavaBuckets += 1;
        setMinecraftBlockAt(minecraftPlayerX, minecraftPlayerZ, minecraftDepth, null);
      }
    } else {
      minecraftInventory[blockType] = (minecraftInventory[blockType] || 0) + 1;
      setMinecraftBlockAt(minecraftPlayerX, minecraftPlayerZ, minecraftDepth, null);
    }
  }
  minecraftDepth = minecraftDepth === 1 ? 0 : minecraftDepth - 1;
  if (minecraftDepth <= -63) {
    minecraftDepth = -63;
    minecraftGuardianFound = true;
    updateMinecraftStatus("你挖到了 -63，守护者在下面等着。");
    speakAsComputer("你挖到了负六十三层，守护者出现了。", { forceSubtitle: true, colorful: true });
  } else {
    updateMinecraftStatus(block ? `向下挖到了${block.label}。` : "向下挖了一层。");
  }
  renderMinecraftWorld();
  saveGameState();
}

function jumpMinecraftUp() {
  markChatActivity();
  wakeFromNightSleep();
  if (minecraftDepth < 1) {
    minecraftDepth += 1;
    renderMinecraftWorld();
    updateMinecraftStatus(minecraftDepth === 1 ? "跳到最上面了，这里是地面和天空交界，树长在空气里。" : "往上跳了一层。");
    saveGameState();
    return;
  }
  minecraftWorld?.classList.add("minecraft-jump");
  window.setTimeout(() => minecraftWorld?.classList.remove("minecraft-jump"), 260);
  updateMinecraftStatus("已经跳到最上面了，不能再往上跳了。");
}

function switchMinecraftView() {
  minecraftView = (minecraftView + 1) % 4;
  renderMinecraftWorld();
  updateMinecraftStatus("视角切换了。");
  saveGameState();
}

function toggleMinecraftDayNight() {
  if (!minecraftPanelOpen) return;
  minecraftIsNight = !minecraftIsNight;
  if (!minecraftIsNight) {
    minecraftZombies = [];
  }
  renderMinecraftWorld();
  updateMinecraftStatus(minecraftIsNight ? "太阳下去了，月亮出来了，僵尸来了。" : "月亮下去了，太阳出来了。");
  saveGameState();
}

function startMinecraftCycle() {
  if (minecraftCycleTimer) return;
  minecraftCycleTimer = window.setInterval(toggleMinecraftDayNight, 120000);
}

function resetMinecraftWorld() {
  minecraftWorldBlocks = {};
  minecraftPlayerX = 0;
  minecraftPlayerZ = 0;
  minecraftDepth = 0;
  minecraftDimension = "overworld";
  minecraftView = 0;
  minecraftGuardianFound = false;
  minecraftIsNight = false;
  minecraftXp = 0;
  minecraftZombies = [];
  minecraftHealth = 10;
  minecraftHunger = 8;
  minecraftSeeds = 0;
  minecraftWheat = 0;
  minecraftEmerald = 0;
  minecraftPlants = {};
  minecraftMeat = 0;
  minecraftWool = 0;
  minecraftAnimals = {};
  minecraftSpawnPoint = null;
  minecraftSticks = 0;
  minecraftCoal = 0;
  minecraftIron = 0;
  minecraftBuckets = 0;
  minecraftWaterBuckets = 0;
  minecraftLavaBuckets = 0;
  minecraftSkeletons = [];
  minecraftVillagers = {};
  closeMinecraftCraftingTable();
  resetMinecraftInventory();
  renderMinecraftWorld();
  updateMinecraftStatus("世界重置好了。玩家背包又是空的，要先挖方块。");
  saveGameState();
}

function setMinecraftPanelOpen(open) {
  minecraftPanelOpen = open;
  if (open) {
    setMinePanelOpen(false);
    setShopPanelOpen(false);
    minecraftOpenedAt = Date.now();
    renderMinecraftWorld();
  }
  if (minecraftPanel) {
    minecraftPanel.hidden = !minecraftPanelOpen;
  }
  minecraftToggle?.classList.toggle("active", minecraftPanelOpen);
}

function setupMinecraftGame() {
  ensureMinecraftWorldBlocks();
  ensureMinecraftInventory();
  renderMinecraftWorld();
  minecraftToggle?.addEventListener("click", () => {
    setMinecraftPanelOpen(!minecraftPanelOpen);
    if (minecraftPanelOpen) {
      speakAsComputer("我的世界打开了。现在可以前后左右走，也可以切换视角，先挖方块再放方块。", { forceSubtitle: true, colorful: false });
    }
  });
  minecraftCloseButton?.addEventListener("click", () => setMinecraftPanelOpen(false));
  minecraftClearButton?.addEventListener("click", () => {
    if (!window.confirm("确定要重置我的世界吗？建好的房子也会清空。")) return;
    resetMinecraftWorld();
    speakAsComputer("小方块世界重置了，背包也清空了。", { forceSubtitle: true, colorful: false });
  });
  minecraftToolButtons.forEach((button) => {
    button.addEventListener("click", () => setMinecraftTool(button.dataset.minecraftTool || "grass"));
  });
  minecraftMoveButtons.forEach((button) => {
    button.addEventListener("click", () => moveMinecraftPlayer(button.dataset.minecraftMove || "forward"));
  });
  minecraftJoystick?.addEventListener("pointerdown", startMinecraftJoystick);
  minecraftJoystick?.addEventListener("pointermove", (event) => {
    if (!minecraftJoystickTimer) return;
    moveMinecraftJoystick(event);
  });
  minecraftJoystick?.addEventListener("pointerup", stopMinecraftJoystick);
  minecraftJoystick?.addEventListener("pointercancel", stopMinecraftJoystick);
  minecraftJoystick?.addEventListener("lostpointercapture", stopMinecraftJoystick);
  minecraftCraftingClose?.addEventListener("click", closeMinecraftCraftingTable);
  minecraftCraftingMake?.addEventListener("click", () => craftMinecraftRecipe());
  minecraftCraftingOutput?.addEventListener("click", () => {
    const recipe = minecraftCraftingOutput.dataset.recipe || "";
    if (recipe) craftMinecraftRecipe(recipe);
  });
  document.querySelectorAll(".minecraft-recipe").forEach((button) => {
    button.addEventListener("click", () => craftMinecraftRecipe(button.dataset.minecraftRecipe || ""));
  });
  minecraftJumpUpButton?.addEventListener("click", jumpMinecraftUp);
  minecraftDigDownButton?.addEventListener("click", digMinecraftDown);
  minecraftViewButton?.addEventListener("click", switchMinecraftView);
  startMinecraftCycle();
  setMinecraftTool(minecraftSelectedTool);
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
    speakAsComputer("我的世界小矿洞打开了，点方块几下就能挖出矿。", { forceSubtitle: true, colorful: false });
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
  refreshTvCableConnection();
  refreshWeatherCableConnection();
  updateAllHappyRobotCompanionPositions();
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

function ensureRainCodeLines() {
  const codePanel = moodPanel?.querySelector(".rain-error-code");
  if (!codePanel) return [];
  while (codePanel.children.length < RAIN_CODE_LINE_COUNT) {
    codePanel.appendChild(document.createElement("span"));
  }
  while (codePanel.children.length > RAIN_CODE_LINE_COUNT) {
    codePanel.lastElementChild?.remove();
  }
  return Array.from(codePanel.querySelectorAll("span"));
}

function updateRainCodeScreen() {
  const codeLines = ensureRainCodeLines();
  if (!codeLines.length) return;
  codeLines.forEach((line, index) => {
    const snippetIndex = Math.floor(Math.random() * rainCodeSnippets.length);
    const tick = Math.floor(performance.now() / 60) + index;
    const noise = Math.random().toString(16).slice(2, 6).toUpperCase();
    line.textContent = `${String(tick).padStart(4, "0")} 0x${noise} ${rainCodeSnippets[snippetIndex]}`;
  });
  pulseRainNoise();
}

function getRainNoiseContext() {
  if (rainNoiseContext) return rainNoiseContext;
  const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextConstructor) return null;
  rainNoiseContext = new AudioContextConstructor();
  return rainNoiseContext;
}

function makeRainNoiseBuffer(context) {
  const sampleCount = context.sampleRate * 2;
  const buffer = context.createBuffer(1, sampleCount, context.sampleRate);
  const samples = buffer.getChannelData(0);
  let last = 0;
  for (let index = 0; index < sampleCount; index += 1) {
    const white = Math.random() * 2 - 1;
    last = last * 0.38 + white * 0.62;
    samples[index] = last;
  }
  return buffer;
}

function unlockRainNoise() {
  const context = getRainNoiseContext();
  if (!context || context.state !== "suspended") return;
  context.resume();
}

function pulseRainNoise() {
  if (!rainNoiseContext || !rainNoiseGain || !rainNoiseFilter) return;
  const now = rainNoiseContext.currentTime;
  const loudness = 0.035 + Math.random() * 0.055;
  rainNoiseGain.gain.cancelScheduledValues(now);
  rainNoiseGain.gain.setTargetAtTime(loudness, now, 0.012);
  rainNoiseGain.gain.setTargetAtTime(0.018, now + 0.045, 0.035);
  rainNoiseFilter.frequency.setTargetAtTime(850 + Math.random() * 2400, now, 0.018);
}

function startRainNoise() {
  if (rainNoiseSource) return;
  const context = getRainNoiseContext();
  if (!context) return;
  if (context.state === "suspended") {
    context.resume();
  }

  rainNoiseSource = context.createBufferSource();
  rainNoiseGain = context.createGain();
  rainNoiseFilter = context.createBiquadFilter();

  rainNoiseSource.buffer = makeRainNoiseBuffer(context);
  rainNoiseSource.loop = true;
  rainNoiseFilter.type = "bandpass";
  rainNoiseFilter.frequency.value = 1600;
  rainNoiseFilter.Q.value = 1.4;
  rainNoiseGain.gain.value = 0;

  rainNoiseSource.connect(rainNoiseFilter);
  rainNoiseFilter.connect(rainNoiseGain);
  rainNoiseGain.connect(context.destination);
  rainNoiseSource.start();
  pulseRainNoise();
}

function stopRainNoise() {
  if (!rainNoiseSource || !rainNoiseContext) return;
  const source = rainNoiseSource;
  const gain = rainNoiseGain;
  const filter = rainNoiseFilter;
  const now = rainNoiseContext.currentTime;
  rainNoiseSource = null;
  rainNoiseGain = null;
  rainNoiseFilter = null;

  if (gain) {
    gain.gain.cancelScheduledValues(now);
    gain.gain.setTargetAtTime(0, now, 0.025);
  }
  window.setTimeout(() => {
    try {
      source.stop();
    } catch {
      // The source may already be stopped if the browser tears down audio.
    }
    source.disconnect();
    filter?.disconnect();
    gain?.disconnect();
  }, 140);
}

function stopRainCodeScreen() {
  if (rainCodeRefreshTimer) {
    window.clearInterval(rainCodeRefreshTimer);
    rainCodeRefreshTimer = null;
  }
  stopRainNoise();
}

function startRainCodeScreen() {
  updateRainCodeScreen();
  stopRainCodeScreen();
  startRainNoise();
  rainCodeRefreshTimer = window.setInterval(updateRainCodeScreen, 90);
}

function enterRainCodeMode() {
  if (currentWeather !== "rain" || isAtHome || isPoweredOff || isTerrorNightActive) return;
  if (cleanRainFromComputerByHappyRobot(true)) return;
  computerShell.classList.add("rain-error", "rain-code-mode");
  startRainCodeScreen();
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
  stopRainCodeScreen();
  computerShell.classList.remove("rained-on", "rain-squint", "rain-error", "rain-code-mode");
}

function updateComputerWeatherMarks() {
  if (sunDryTimer) {
    window.clearTimeout(sunDryTimer);
    sunDryTimer = null;
  }

  computerShell.classList.toggle("snow-covered", currentWeather === "snow");

  if (isAtHome) {
    stopHappyRobotCleaning();
    stopRainCodeScreen();
    computerShell.classList.remove("wet", "snow-covered", "sun-drying", "rained-on", "rain-squint", "rain-error", "rain-code-mode");
    return;
  }

  if (currentWeather === "rain") {
    if (cleanRainFromComputerByHappyRobot(false)) return;
    computerShell.classList.add("wet");
    computerShell.classList.remove("sun-drying");
    if (computerShell.classList.contains("rain-code-mode") && !rainCodeRefreshTimer) {
      startRainCodeScreen();
    }
    return;
  }

  stopHappyRobotCleaning();

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
  computerShell.classList.toggle("rained-on", currentWeather === "rain" && !isAtHome && !isHappyRobotRainGuardActive());
  updateComputerWeatherMarks();
  updateWeatherToggleLabel();
  updateWeatherDetectorDisplay();
  updateTvWeatherMarks();

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
    computerShell.classList.toggle("rain-squint", currentWeather === "rain" && !isAtHome && !isHappyRobotRainGuardActive());
    if (currentWeather === "rain" && !isAtHome) {
      if (cleanRainFromComputerByHappyRobot(true)) return;
      rainErrorTimer = window.setTimeout(() => {
        rainErrorTimer = null;
        if (currentWeather !== "rain" || isAtHome || isPoweredOff || isTerrorNightActive) return;
        if (cleanRainFromComputerByHappyRobot(true)) return;
        computerShell.classList.add("rain-error");
        rainCodeTimer = window.setTimeout(() => {
          rainCodeTimer = null;
          enterRainCodeMode();
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
  if (isTerrorNightActive || skyBodyAway.sun || skyBodyAway.moon) return;

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

function speakReply(text, voiceSettings = clearVoiceSettings) {
  if (!("speechSynthesis" in window) || !text) return;

  loadVoices();
  if (window.speechSynthesis.paused) {
    window.speechSynthesis.resume();
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = voiceSettings.lang;
  utterance.pitch = voiceSettings.pitch;
  utterance.rate = voiceSettings.rate;
  utterance.volume = voiceSettings.volume;

  const selectedVoice = pickVoice();
  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }

  window.speechSynthesis.speak(utterance);
}

function showFaceOnly() {
  if (weatherCableConnectedTo === "computer" && !isPoweredOff) {
    updateComputerWeatherDisplay();
    return;
  }
  screenSubtitle.style.display = "none";
  moodPanel.classList.remove("text-mode");
  moodPanel.classList.add("face-mode");
  moodPanel.classList.remove("colorful");
  if (currentWeather !== "rain") {
    computerShell.classList.remove("rain-squint");
  }
  if (currentWeather !== "rain") {
    stopRainCodeScreen();
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

function getRhythmDropZoneAtPoint(x, y) {
  const rhythmTarget = rhythmStage || rhythmBox;
  if (!rhythmTarget) return false;
  const rect = rhythmTarget.getBoundingClientRect();
  return x >= rect.left - 12 && x <= rect.right + 12 && y >= rect.top - 12 && y <= rect.bottom + 12;
}

function singComputerSong() {
  markChatActivity();
  computerShell.classList.add("rhythm-loving");
  const song = COMPUTER_SONG_LINE;
  speakAsComputer(song, { forceSubtitle: true, colorful: true });
  unlockRhythmAudio();
  [262, 330, 392, 523, 392, 330, 262].forEach((frequency, index) => {
    window.setTimeout(() => {
      playRhythmTone(frequency, 0.16, "triangle", 0.14);
      playRhythmTone(frequency * 2, 0.08, "sine", 0.05);
    }, index * 170);
  });
  if (rhythmPraiseTimer) {
    window.clearTimeout(rhythmPraiseTimer);
  }
  rhythmPraiseTimer = window.setTimeout(() => {
    computerShell.classList.remove("rhythm-loving");
  }, 2600);
}

function setupInteractiveFace() {
  window.addEventListener("pointermove", (event) => {
    markPointerActivity();
    updateRhythmCharacterLook(event.clientX, event.clientY);
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
    maybeHappyRobotAirKiss();
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

function sleepComputerOnBed() {
  if (!isAtHome || isPoweredOff) return;
  computerShell.classList.add("computer-bed-sleeping", "sleepy");
  moodPanel.classList.remove("text-mode", "colorful");
  moodPanel.classList.add("face-mode");
  screenSubtitle.style.display = "none";
  setEyeLook(0, 0);
  setFacePeek(0, 0);
  showTvNewGameCaption(
    "\u65b0\u73a9\u6cd5",
    "\u628a\u7535\u8111\u5148\u751f\u62d6\u5230\u5e8a\u4e0a\uff0c\u4ed6\u5c31\u4f1a\u9ed1\u5c4f\u7761\u89c9\u3002"
  );
  if (screenTimer) {
    window.clearTimeout(screenTimer);
  }
  screenTimer = window.setTimeout(() => {
    computerShell.classList.remove("computer-bed-sleeping", "sleepy");
    showFaceOnly();
    setMood(0);
  }, 6500);
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
      if (furnitureDrag.element.classList.contains("custom-kind-tv")) {
        refreshTvCableConnection();
      }
      if (furnitureDrag.element.classList.contains("custom-kind-weather-detector")) {
        refreshWeatherCableConnection();
      }
      salesBasket?.classList.toggle("ready", isNearSalesBasket(event.clientX, event.clientY));
      return;
    }

    if (tvCableDrag) {
      setTvCableEndpoint(event.clientX, event.clientY);
      getPurchasedTv()?.classList.toggle(
        "tv-cable-swap-ready",
        getComputerDropZoneAtPoint(event.clientX, event.clientY) || isTvCableTouchingComputerCable()
      );
      return;
    }

    if (weatherCableDrag) {
      setWeatherCableEndpoint(event.clientX, event.clientY);
      getPurchasedWeatherDetector()?.classList.toggle("weather-cable-swap-ready", getComputerDropZoneAtPoint(event.clientX, event.clientY));
      return;
    }

    if (shellDrag) {
      const nextX = event.clientX - shellDrag.startX + shellDrag.originX;
      const nextY = event.clientY - shellDrag.startY + shellDrag.originY;
      shellOffsetX = clamp(nextX, shellDrag.minX, shellDrag.maxX);
      shellOffsetY = clamp(nextY, shellDrag.minY, shellDrag.maxY);
      updateShellPosition();
      const rhythmSlot = getRhythmSlotAtPoint(event.clientX, event.clientY);
      rhythmSlots.forEach((item) => item.classList.toggle("drop-ready", item === rhythmSlot));
      rhythmBox?.classList.toggle("computer-drop-ready", Boolean(rhythmSlot) || getRhythmDropZoneAtPoint(event.clientX, event.clientY));
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

    if (tvCableDrag) {
      const activeOutlet = getChargeOutlets().find((outlet) => {
        const rect = outlet.getBoundingClientRect();
        return event.clientX >= rect.left - 34 && event.clientX <= rect.right + 34 && event.clientY >= rect.top - 28 && event.clientY <= rect.bottom + 28;
      });
      if (getComputerDropZoneAtPoint(event.clientX, event.clientY) || getComputerBackZoneAtPoint(event.clientX, event.clientY) || isTvCableTouchingComputerCable()) {
        const rect = computerShell.getBoundingClientRect();
        connectTvCableTo("computer", event.clientX, event.clientY);
      } else if (activeOutlet) {
        const rect = activeOutlet.getBoundingClientRect();
        connectTvCableTo("outlet", rect.left + rect.width / 2, rect.top + rect.height / 2);
      } else {
        clearTvCableConnection();
      }
      getPurchasedTv()?.classList.remove("tv-cable-swap-ready");
      tvCableDrag = null;
    }

    if (weatherCableDrag) {
      if (getComputerDropZoneAtPoint(event.clientX, event.clientY)) {
        connectWeatherCableToComputer(event.clientX, event.clientY);
      } else {
        clearWeatherCableConnection();
      }
      weatherCableDrag = null;
    }

    if (shellDrag) {
      const rhythmSlot = getRhythmSlotAtPoint(event.clientX, event.clientY);
      const droppedOnBed = getBedAtPoint(event.clientX, event.clientY);
      computerShell.classList.remove("dragging");
      shellDrag = null;
      rhythmBox?.classList.remove("computer-drop-ready");
      rhythmSlots.forEach((item) => item.classList.remove("drop-ready"));
      if (rhythmSlot) {
        placeHappyRobotInSlot(rhythmSlot, "computer");
        startShellDrop();
        return;
      }
      if (droppedOnBed) {
        sleepComputerOnBed();
        startShellDrop();
        return;
      }
      startShellDrop();
    }

    if (hatDrag) {
      hatDrag = null;
    }

  if (plugDrag) {
      if (isTvCableTouchingComputerCable()) {
        const rect = backPlug.getBoundingClientRect();
        connectTvCableTo("computer", rect.left + rect.width / 2, rect.top + rect.height / 2);
        plugDrag = null;
        return;
      }
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

    const tvPlug = event.target.closest(".tv-cable-plug");
    if (tvPlug && isAtHome) {
      event.preventDefault();
      event.stopPropagation();
      markPointerActivity();
      wakeFromNightSleep();
      const tv = getPurchasedTv();
      if (!tv) return;
      tv.classList.add("tv-cable-detached");
      tv.classList.remove("tv-cable-swap-ready");
      document.body.classList.remove("tv-computer-linked", "tv-outlet-linked");
      tvCableConnectedTo = null;
      setTvCableEndpoint(event.clientX, event.clientY);
      tvCableDrag = true;
      return;
    }

    const tvCaptionClose = event.target.closest(".tv-caption-close");
    if (tvCaptionClose) {
      event.preventDefault();
      event.stopPropagation();
      tvNewGameCaptionDismissed = true;
      setTvNewGameCaptionVisible(false);
      return;
    }

    const weatherPlug = event.target.closest(".weather-cable-plug");
    if (weatherPlug && isAtHome) {
      event.preventDefault();
      event.stopPropagation();
      markPointerActivity();
      wakeFromNightSleep();
      const detector = getPurchasedWeatherDetector();
      if (!detector) return;
      detector.classList.add("weather-cable-detached");
      detector.classList.remove("weather-cable-swap-ready");
      document.body.classList.remove("weather-computer-linked");
      weatherCableConnectedTo = null;
      setWeatherCableEndpoint(event.clientX, event.clientY);
      weatherCableDrag = true;
      return;
    }

    if (event.target.closest("#rhythm-box button, #rhythm-box input")) return;

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

  document.body.addEventListener("dblclick", (event) => {
    const tv = event.target.closest(".house-item.owned-furniture.custom-kind-tv, .house-item.owned-furniture.house-tv");
    if (!tv || event.target.closest("button, input, .tv-cable-plug, .rhythm-box")) return;
    event.preventDefault();
    toggleTvFullscreen(tv);
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
  happyRobotReactToComputer(text, duration);
  return duration;
}

function setupSpeechUnlock() {
  const unlock = () => {
    unlockSpeech();
    unlockRainNoise();
  };
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
  updateRhythmTvMount();
  clearWeatherCableConnection();

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

function makeHappyRobotIcon(extraClass = "", characterType = "happy-robot") {
  const robot = document.createElement("span");
  const isGallod = characterType === "gallod";
  const isSimon = characterType === "simon";
  const isMusicBox = characterType === "music-box";
  const isSun = characterType === "sun";
  const isMoon = characterType === "moon";
  const isComputer = characterType === "computer";
  robot.className = `happy-robot-icon ${isGallod ? "gallod-icon" : ""} ${isSimon ? "simon-icon" : ""} ${isMusicBox ? "music-box-icon" : ""} ${isSun ? "sun-icon" : ""} ${isMoon ? "moon-icon" : ""} ${isComputer ? "computer-rhythm-icon" : ""} ${extraClass}`.trim();
  robot.dataset.characterType = characterType;
  robot.setAttribute("aria-hidden", "true");
  robot.innerHTML = isSun
    ? `
    <span class="sky-sun-copy">
      <span class="sun-core">
        <span class="sun-eye sun-eye-left"></span>
        <span class="sun-eye sun-eye-right"></span>
        <span class="sun-mouth"></span>
      </span>
      <span class="sun-ray sun-ray-1"></span>
      <span class="sun-ray sun-ray-2"></span>
      <span class="sun-ray sun-ray-3"></span>
      <span class="sun-ray sun-ray-4"></span>
      <span class="sun-ray sun-ray-5"></span>
      <span class="sun-ray sun-ray-6"></span>
      <span class="sun-ray sun-ray-7"></span>
      <span class="sun-ray sun-ray-8"></span>
    </span>
  `
    : isMoon
      ? `
    <span class="sky-moon-copy">
      <span class="moon-face">
        <span class="moon-eye moon-eye-left"></span>
        <span class="moon-eye moon-eye-right"></span>
        <span class="moon-mouth"></span>
      </span>
    </span>
  `
      : isComputer
        ? `
    <span class="computer-rhythm-body">
      <span class="computer-rhythm-screen">
        <span class="computer-rhythm-eye eye-left"></span>
        <span class="computer-rhythm-eye eye-right"></span>
        <span class="computer-rhythm-mouth"></span>
      </span>
      <span class="computer-rhythm-stand"></span>
      <span class="computer-rhythm-lyric"></span>
    </span>
  `
      : isSimon
        ? `
    <span class="simon-antenna antenna-left"></span>
    <span class="simon-antenna antenna-right"></span>
    <span class="simon-hair hair-one"></span>
    <span class="simon-hair hair-two"></span>
    <span class="simon-hair hair-three"></span>
    <span class="simon-head">
      <span class="simon-eye eye-left"></span>
      <span class="simon-eye eye-right"></span>
      <span class="simon-mouth"></span>
    </span>
    <span class="simon-neck"></span>
  `
      : isMusicBox
        ? `
    <span class="music-box-ear ear-left"></span>
    <span class="music-box-ear ear-right"></span>
    <span class="music-box-hair"></span>
    <span class="music-box-head">
      <span class="music-box-eye eye-left"><span></span></span>
      <span class="music-box-eye eye-right"><span></span></span>
      <span class="music-box-mouth"></span>
    </span>
    <span class="music-box-neck"></span>
  `
      : isGallod
    ? `
    <span class="gallod-dome"></span>
    <span class="happy-robot-head gallod-head">
      <span class="gallod-screen"></span>
    </span>
    <span class="gallod-mouth"></span>
    <span class="happy-robot-hand hand-left"></span>
    <span class="happy-robot-hand hand-right"></span>
    <span class="happy-robot-neck gallod-neck"></span>
  `
    : `
    <span class="happy-robot-antenna antenna-left"></span>
    <span class="happy-robot-antenna antenna-right"></span>
    <span class="happy-robot-speaker speaker-left"></span>
    <span class="happy-robot-speaker speaker-right"></span>
    <span class="happy-robot-head">
      <span class="happy-robot-eye eye-left"></span>
      <span class="happy-robot-eye eye-right"></span>
      <span class="happy-robot-mouth"></span>
    </span>
    <span class="happy-robot-hand hand-left"></span>
    <span class="happy-robot-hand hand-right"></span>
    <span class="happy-robot-neck"></span>
  `;
  return robot;
}

function getCharacterLabel(characterType = "happy-robot") {
  if (characterType === "computer") return "\u7535\u8111\u5148\u751f";
  if (characterType === "sun") return "\u592a\u9633\u516c\u516c";
  if (characterType === "moon") return "\u6708\u4eae\u59d1\u59d1";
  if (characterType === "simon") return "\u897f\u8499";
  if (characterType === "music-box") return "\u5c0f\u5929";
  return characterType === "gallod" ? "\u52a0\u6d1b\u5fb7" : "\u5feb\u4e50\u673a\u5668\u4eba";
}

function getHappyRobotCompanionByType(characterType = "happy-robot") {
  return happyRobotCompanions.find((companion) => companion.dataset.characterType === characterType) || null;
}

function updateRhythmCharacterLook(clientX, clientY) {
  document.querySelectorAll(".happy-robot-icon").forEach((robot) => {
    if (robot.classList.contains("robot-sleeping")) return;
    const rect = robot.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height * 0.42;
    const lookX = clamp((clientX - centerX) / 40, -4, 4);
    const lookY = clamp((clientY - centerY) / 54, -3, 3);
    robot.style.setProperty("--robot-look-x", `${lookX}px`);
    robot.style.setProperty("--robot-look-y", `${lookY}px`);
    robot.style.setProperty("--gallod-look-x", `${lookX * 1.8}px`);
    robot.style.setProperty("--gallod-look-y", `${lookY * 1.4}px`);
  });
}

function getBedAtPoint(x, y) {
  const beds = Array.from(document.querySelectorAll(".house-bed, .custom-kind-bed"));
  return beds.find((bed) => {
    const style = window.getComputedStyle(bed);
    if (style.visibility === "hidden" || style.display === "none" || Number(style.opacity) === 0) return false;
    const rect = bed.getBoundingClientRect();
    return x >= rect.left - 12 && x <= rect.right + 12 && y >= rect.top - 12 && y <= rect.bottom + 12;
  }) || null;
}

function clearEmptySlotMouseLook() {
  rhythmSlots.forEach((slot) => {
    slot.classList.remove("mouse-looking", "front-looking");
    slot.style.removeProperty("--empty-mouse-look-x");
    slot.style.removeProperty("--empty-mouse-look-y");
  });
}

function updateEmptySlotMouseLook(clientX, clientY) {
  if (!rhythmBox) return;
  const boxRect = rhythmBox.getBoundingClientRect();
  const isNearRhythmBox =
    clientX >= boxRect.left - 24 &&
    clientX <= boxRect.right + 24 &&
    clientY >= boxRect.top - 24 &&
    clientY <= boxRect.bottom + 24;

  if (!isNearRhythmBox) {
    clearEmptySlotMouseLook();
    return;
  }

  rhythmSlots.forEach((slot) => {
    if (slot.classList.contains("occupied")) return;
    const rect = slot.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const faceY = rect.top + 42;
    const dx = clientX - centerX;
    const dy = clientY - faceY;
    const isInFront = Math.abs(dx) < 9 && clientY >= rect.top - 10 && clientY <= rect.bottom + 20;
    slot.classList.add("mouse-looking");
    slot.classList.toggle("front-looking", isInFront);
    slot.style.setProperty("--empty-mouse-look-x", `${isInFront ? 0 : clamp(dx / 18, -5, 5)}px`);
    slot.style.setProperty("--empty-mouse-look-y", `${isInFront ? 0 : clamp(dy / 28, -3, 3)}px`);
  });
}

function sleepHappyRobotOnBed(companion) {
  if (!companion) return;
  stopHappyRobotCleaning();
  companion.classList.remove("robot-talking", "robot-writing", "robot-kissing", "robot-crying", "robot-umbrella", "robot-cleaning");
  companion.classList.add("robot-sleeping");
  const message = companion.querySelector(".happy-robot-message");
  if (message) {
    message.textContent = "";
  }
  speakAsHappyRobot(`${getCharacterLabel(companion.dataset.characterType)}睡着了`, 1600);
  window.setTimeout(() => {
    companion.classList.remove("robot-sleeping");
    speakAsHappyRobot(`${getCharacterLabel(companion.dataset.characterType)}醒了`, 1600);
  }, 5200);
}

function getHappyRobotCompanionText(text = "") {
  if (/节奏|音乐|鼓|beat|loop/i.test(text)) return "蓝色节拍已同步";
  if (/你好|在吗/.test(text)) return "快乐机器人在线";
  if (/开心|快乐|高兴/.test(text)) return "快乐模式启动";
  if (/下雨|天气|雪|多云|晴/.test(text)) return "天气数据收到";
  if (/回家|房子|入住/.test(text)) return "一起去玩";
  return randomFrom(["哔哔，收到", "一起玩吧", "节奏准备好", "蓝屏回应中"]);
}

function updateHappyRobotCompanionPosition(companion = happyRobotCompanion) {
  if (!companion || !computerShell) return;
  const rect = computerShell.getBoundingClientRect();
  const robotWidth = 86;
  const companionIndex = Math.max(0, happyRobotCompanions.indexOf(companion));
  const isCleaning = companion.classList.contains("robot-cleaning");
  if (happyRobotCompanionPinned && companion === happyRobotCompanion && !isCleaning && !happyRobotCompanionDrag) return;
  const gap = isCleaning ? -2 : 10;
  const rightX = rect.right + gap + companionIndex * 72;
  const leftX = rect.left - robotWidth - gap - companionIndex * 72;
  const nextLeft = rightX + robotWidth < window.innerWidth - 10 ? rightX : Math.max(10, leftX);
  const baseTopRatio = isCleaning ? 0.26 : 0.38;
  const nextTop = clamp(rect.top + rect.height * baseTopRatio + companionIndex * 28, 16, Math.max(16, window.innerHeight - 132));
  companion.style.left = `${nextLeft}px`;
  companion.style.top = `${nextTop}px`;
  companion.classList.toggle("robot-left-side", nextLeft < rect.left);
  companion.classList.toggle("robot-right-side", nextLeft >= rect.left);
  companion.classList.toggle("robot-looking-at-computer", getHappyRobotDistanceFromComputer(companion) <= 230);
}

function updateAllHappyRobotCompanionPositions() {
  happyRobotCompanions.forEach((companion) => updateHappyRobotCompanionPosition(companion));
}

function getHappyRobotDistanceFromComputer(companion = happyRobotCompanion) {
  if (!companion || !computerShell) return Infinity;
  const robotRect = companion.getBoundingClientRect();
  const computerRect = computerShell.getBoundingClientRect();
  const robotX = robotRect.left + robotRect.width / 2;
  const robotY = robotRect.top + robotRect.height / 2;
  const computerX = computerRect.left + computerRect.width / 2;
  const computerY = computerRect.top + computerRect.height * 0.35;
  return Math.hypot(robotX - computerX, robotY - computerY);
}

function showHappyRobotAirKiss(companion = happyRobotCompanion) {
  if (!companion || !computerShell || happyRobotKissTimer) return;
  if (companion.classList.contains("dragging") || companion.classList.contains("robot-talking")) return;
  if (getHappyRobotDistanceFromComputer(companion) > 230) return;
  companion.classList.add("robot-looking-at-computer");

  companion.classList.add("robot-kissing");
  computerShell.classList.add("air-kissing");
  happyRobotKissTimer = window.setTimeout(() => {
    companion?.classList.remove("robot-kissing");
    computerShell?.classList.remove("air-kissing");
    happyRobotKissTimer = null;
  }, 1500);
}

function maybeHappyRobotAirKiss() {
  const candidates = happyRobotCompanions.filter((companion) => !companion.classList.contains("robot-cleaning") && getHappyRobotDistanceFromComputer(companion) <= 230);
  if (!candidates.length) return;
  if (Math.random() < 0.18) {
    showHappyRobotAirKiss(randomFrom(candidates));
  }
}

function setupHappyRobotCompanionDrag(companion = happyRobotCompanion) {
  if (!companion) return;

  const moveCompanion = (event) => {
    if (!happyRobotCompanionDrag || event.pointerId !== happyRobotCompanionDrag.pointerId) return;
    const activeCompanion = happyRobotCompanionDrag.element;
    const distance = Math.hypot(event.clientX - happyRobotCompanionDrag.startX, event.clientY - happyRobotCompanionDrag.startY);
    if (distance > 4) {
      happyRobotCompanionDrag.moved = true;
      happyRobotCompanionPinned = true;
      activeCompanion.classList.add("dragging");
    }

    const nextLeft = clamp(
      event.clientX - happyRobotCompanionDrag.offsetX,
      8,
      Math.max(8, window.innerWidth - happyRobotCompanionDrag.width - 8)
    );
    const nextTop = clamp(
      event.clientY - happyRobotCompanionDrag.offsetY,
      8,
      Math.max(8, window.innerHeight - happyRobotCompanionDrag.height - 8)
    );
    activeCompanion.style.left = `${nextLeft}px`;
    activeCompanion.style.top = `${nextTop}px`;
    const computerRect = computerShell.getBoundingClientRect();
    activeCompanion.classList.toggle("robot-left-side", nextLeft < computerRect.left);
    activeCompanion.classList.toggle("robot-right-side", nextLeft >= computerRect.left);
  };

  const stopCompanionDrag = (event) => {
    if (happyRobotCompanionDrag && event.pointerId !== happyRobotCompanionDrag.pointerId) return;
    const hadUmbrella = Boolean(happyRobotCompanionDrag?.umbrellaAtDragStart);
    window.removeEventListener("pointermove", moveCompanion);
    window.removeEventListener("pointerup", stopCompanionDrag);
    if (happyRobotCompanionDrag) {
      happyRobotCompanionDrag.element?.releasePointerCapture?.(happyRobotCompanionDrag.pointerId);
    }
    happyRobotCompanionDrag?.element?.classList.remove("dragging");
    if (happyRobotCompanionDrag?.moved) {
      happyRobotSuppressClick = true;
      window.setTimeout(() => {
        happyRobotSuppressClick = false;
      }, 0);
    }
    const draggedCompanion = happyRobotCompanionDrag?.element || happyRobotCompanion;
    happyRobotCompanion = draggedCompanion;
    const droppedOnBed = getBedAtPoint(event.clientX, event.clientY);
    happyRobotCompanionDrag = null;
    draggedCompanion?.classList.toggle("robot-looking-at-computer", getHappyRobotDistanceFromComputer(draggedCompanion) <= 230);
    if (droppedOnBed) {
      sleepHappyRobotOnBed(draggedCompanion);
      return;
    }
    if (hadUmbrella && getHappyRobotDistanceFromComputer(draggedCompanion) > 260) {
      stopHappyRobotCleaning();
      draggedCompanion?.classList.add("robot-crying");
      speakAsHappyRobot("为什么我要和电脑先生打雨伞", 2600);
      window.setTimeout(() => {
        draggedCompanion?.classList.remove("robot-crying");
      }, 3000);
    } else if (currentWeather === "rain") {
      cleanRainFromComputerByHappyRobot(false);
    }
  };

  companion.addEventListener("pointerdown", (event) => {
    markPointerActivity();
    event.preventDefault();
    event.stopPropagation();
    happyRobotCompanion = companion;
    const umbrellaAtDragStart = happyRobotUmbrellaActive;
    if (umbrellaAtDragStart) {
      companion.classList.remove("robot-cleaning", "robot-umbrella");
      happyRobotUmbrellaActive = false;
    }
    const rect = companion.getBoundingClientRect();
    happyRobotCompanionDrag = {
      element: companion,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
      width: rect.width,
      height: rect.height,
      moved: false,
      umbrellaAtDragStart
    };
    companion.setPointerCapture?.(event.pointerId);
    window.addEventListener("pointermove", moveCompanion);
    window.addEventListener("pointerup", stopCompanionDrag);
  });
}

function showHappyRobotMessage(message, duration = 1800) {
  if (!happyRobotCompanion) return;
  const text = happyRobotCompanion.querySelector(".happy-robot-message");
  if (!text) return;
  text.textContent = message;
  happyRobotCompanion.classList.add("robot-talking", "robot-playing", "robot-writing");
  if (happyRobotMessageTimer) {
    window.clearTimeout(happyRobotMessageTimer);
  }
  happyRobotMessageTimer = window.setTimeout(() => {
    text.textContent = "";
    happyRobotCompanion?.classList.remove("robot-talking", "robot-writing");
    happyRobotMessageTimer = null;
  }, Math.max(1200, Math.min(duration, 3600)));
}

function playHappyRobotClassicBlips() {
  const context = getRhythmAudioContext();
  if (!context || !rhythmMasterGain) return;
  [220, 330, 247, 392].forEach((frequency, index) => {
    const now = context.currentTime + index * 0.065;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(frequency, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.06, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.055);
    oscillator.connect(gain);
    gain.connect(rhythmMasterGain);
    oscillator.start(now);
    oscillator.stop(now + 0.07);
  });
}

function speakAsHappyRobot(message, duration = 1800) {
  showHappyRobotMessage(message, duration);
  playHappyRobotClassicBlips();

  if (!("speechSynthesis" in window) || !message) return;
  loadVoices();
  if (window.speechSynthesis.paused) {
    window.speechSynthesis.resume();
  }
  const utterance = new SpeechSynthesisUtterance(message);
  utterance.lang = "zh-CN";
  utterance.pitch = 0.55;
  utterance.rate = 0.78;
  utterance.volume = 0.78;
  const selectedVoice = availableVoices.find((voice) => /Chinese|Mandarin|中文|普通话|Huihui|Kangkang|Yaoyao/i.test(voice.name));
  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }
  window.speechSynthesis.speak(utterance);
}

function happyRobotReactToComputer(text, duration = 1800) {
  if (!happyRobotCompanions.length) return;
  const message = getHappyRobotCompanionText(text);
  happyRobotCompanions.forEach((companion, index) => window.setTimeout(() => {
    if (!companion.isConnected) return;
    happyRobotCompanion = companion;
    speakAsHappyRobot(message, Math.min(duration + 400, 3000));
  }, 260 + index * 220));
}

function isHappyRobotRainGuardActive() {
  return Boolean(happyRobotCompanion) && !happyRobotCompanionDrag && currentWeather === "rain" && !isAtHome && !isPoweredOff && !isTerrorNightActive && getHappyRobotDistanceFromComputer() <= 280;
}

function stopHappyRobotCleaning() {
  if (happyRobotCleaningTimer) {
    window.clearTimeout(happyRobotCleaningTimer);
    happyRobotCleaningTimer = null;
  }
  happyRobotUmbrellaActive = false;
  happyRobotCompanion?.classList.remove("robot-cleaning", "robot-umbrella");
}

function cleanRainFromComputerByHappyRobot(announce = false) {
  if (!isHappyRobotRainGuardActive()) {
    stopHappyRobotCleaning();
    return false;
  }

  if (rainErrorTimer) {
    window.clearTimeout(rainErrorTimer);
    rainErrorTimer = null;
  }
  if (rainCodeTimer) {
    window.clearTimeout(rainCodeTimer);
    rainCodeTimer = null;
  }
  stopRainCodeScreen();
  computerShell.classList.remove("wet", "rained-on", "rain-squint", "rain-error", "rain-code-mode");
  happyRobotUmbrellaActive = true;
  happyRobotCompanion.classList.add("robot-cleaning", "robot-playing", "robot-umbrella");
  updateHappyRobotCompanionPosition();

  if (announce) {
    speakAsHappyRobot("我给电脑先生打伞", 2100);
  } else {
    showHappyRobotMessage("打伞中", 1500);
    playHappyRobotClassicBlips();
  }

  if (happyRobotCleaningTimer) {
    window.clearTimeout(happyRobotCleaningTimer);
  }
  happyRobotCleaningTimer = window.setTimeout(() => {
    happyRobotCleaningTimer = null;
    cleanRainFromComputerByHappyRobot(false);
  }, 2400);
  return true;
}

function getComputerDropZoneAtPoint(x, y) {
  if (!computerShell) return false;
  const rect = computerShell.getBoundingClientRect();
  return (
    x >= rect.left - 110 &&
    x <= rect.right + 130 &&
    y >= rect.top - 80 &&
    y <= rect.bottom + 80
  );
}

function placeHappyRobotBesideComputer(characterType = "happy-robot") {
  unlockRhythmAudio();
  happyRobotCompanion = getHappyRobotCompanionByType(characterType);
  if (!happyRobotCompanion) {
    happyRobotCompanion = makeHappyRobotIcon("happy-robot-companion robot-playing", characterType);
    happyRobotCompanion.setAttribute("role", "button");
    happyRobotCompanion.setAttribute("aria-label", `${getCharacterLabel(characterType)}伙伴`);
    happyRobotCompanion.tabIndex = 0;
    const message = document.createElement("span");
    message.className = "happy-robot-message";
    happyRobotCompanion.appendChild(message);
    document.body.appendChild(happyRobotCompanion);
    happyRobotCompanions.push(happyRobotCompanion);
    setupHappyRobotCompanionDrag(happyRobotCompanion);
    const companionForClick = happyRobotCompanion;
    happyRobotCompanion.addEventListener("click", () => {
      if (happyRobotSuppressClick) return;
      happyRobotCompanion = companionForClick;
      speakAsHappyRobot(`${getCharacterLabel(companionForClick.dataset.characterType)}和电脑先生一起玩`, 2000);
    });
  } else {
    happyRobotCompanion.dataset.characterType = characterType;
  }
  happyRobotCompanionPinned = false;
  updateHappyRobotCompanionPosition(happyRobotCompanion);
  speakAsHappyRobot(`${getCharacterLabel(characterType)}加入游戏`, 2200);
  cleanRainFromComputerByHappyRobot(currentWeather === "rain");
}

function getRhythmAudioContext() {
  if (rhythmAudioContext) return rhythmAudioContext;
  const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextConstructor) return null;
  rhythmAudioContext = new AudioContextConstructor();
  rhythmMasterGain = rhythmAudioContext.createGain();
  rhythmMasterGain.gain.value = rhythmVolumeValue;
  rhythmMasterGain.connect(rhythmAudioContext.destination);
  return rhythmAudioContext;
}

function applyRhythmVolume(value = rhythmVolumeValue) {
  rhythmVolumeValue = clamp(Number(value) || 0, 0, 2.6);
  if (!rhythmMasterGain || !rhythmAudioContext) return;
  rhythmMasterGain.gain.setTargetAtTime(rhythmVolumeValue, rhythmAudioContext.currentTime, 0.025);
}

function praiseRhythmMusic() {
  if (rhythmPraiseCooldown || !placedRhythmCharacters.size || isPoweredOff || isTerrorNightActive) return;
  if (Array.from(placedRhythmCharacters.values()).some((character) => character.id === "computer")) return;
  rhythmPraiseCooldown = true;
  computerShell.classList.add("rhythm-loving");
  speakAsComputer("好听。", { forceSubtitle: true, colorful: true });
  if (rhythmPraiseTimer) {
    window.clearTimeout(rhythmPraiseTimer);
  }
  rhythmPraiseTimer = window.setTimeout(() => {
    computerShell.classList.remove("rhythm-loving");
    rhythmPraiseTimer = null;
  }, 2600);
  window.setTimeout(() => {
    rhythmPraiseCooldown = false;
  }, 9000);
}

function unlockRhythmAudio() {
  const context = getRhythmAudioContext();
  if (!context || context.state !== "suspended") return;
  context.resume();
}

function playRhythmTone(frequency, duration = 0.12, type = "square", gainValue = 0.08) {
  const context = getRhythmAudioContext();
  if (!context || !rhythmMasterGain) return;
  const now = context.currentTime;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, now);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(gainValue, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  oscillator.connect(gain);
  gain.connect(rhythmMasterGain);
  oscillator.start(now);
  oscillator.stop(now + duration + 0.03);
}

function playRhythmVocalTone(frequency, duration = 0.32, vowel = "ah", gainValue = 0.075, delay = 0) {
  const context = getRhythmAudioContext();
  if (!context || !rhythmMasterGain) return;
  const formants = {
    ah: [760, 1180],
    oh: [520, 920],
    ee: [330, 2250],
    mm: [260, 680]
  }[vowel] || [760, 1180];
  const now = context.currentTime + delay;
  const oscillator = context.createOscillator();
  const vibrato = context.createOscillator();
  const vibratoGain = context.createGain();
  const inputGain = context.createGain();
  const voiceGain = context.createGain();

  oscillator.type = vowel === "mm" ? "triangle" : "sawtooth";
  oscillator.frequency.setValueAtTime(frequency, now);
  vibrato.type = "sine";
  vibrato.frequency.setValueAtTime(5.4, now);
  vibratoGain.gain.setValueAtTime(frequency * 0.01, now);
  vibrato.connect(vibratoGain);
  vibratoGain.connect(oscillator.frequency);

  inputGain.gain.setValueAtTime(0.42, now);
  voiceGain.gain.setValueAtTime(0.0001, now);
  voiceGain.gain.exponentialRampToValueAtTime(gainValue, now + 0.04);
  voiceGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  oscillator.connect(inputGain);
  formants.forEach((formant, index) => {
    const filter = context.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(formant, now);
    filter.Q.setValueAtTime(index === 0 ? 8 : 12, now);
    inputGain.connect(filter);
    filter.connect(voiceGain);
  });

  voiceGain.connect(rhythmMasterGain);
  oscillator.start(now);
  vibrato.start(now);
  oscillator.stop(now + duration + 0.04);
  vibrato.stop(now + duration + 0.04);
}

function playRhythmNoise(duration = 0.08, gainValue = 0.05, filterFrequency = 5200) {
  const context = getRhythmAudioContext();
  if (!context || !rhythmMasterGain) return;
  const sampleCount = Math.max(1, Math.floor(context.sampleRate * duration));
  const buffer = context.createBuffer(1, sampleCount, context.sampleRate);
  const samples = buffer.getChannelData(0);
  for (let index = 0; index < sampleCount; index += 1) {
    samples[index] = Math.random() * 2 - 1;
  }
  const source = context.createBufferSource();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();
  const now = context.currentTime;
  filter.type = "highpass";
  filter.frequency.value = filterFrequency;
  gain.gain.setValueAtTime(gainValue, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  source.buffer = buffer;
  source.connect(filter);
  filter.connect(gain);
  gain.connect(rhythmMasterGain);
  source.start(now);
  source.stop(now + duration);
}

function showRhythmComputerSong(slot, text, duration = 9800) {
  const computer = slot?.querySelector(".computer-rhythm-icon");
  if (!computer) return;
  const lyric = computer.querySelector(".computer-rhythm-lyric");
  if (lyric) {
    lyric.textContent = text;
  }
  computer.classList.add("computer-singing");
  window.setTimeout(() => {
    computer.classList.remove("computer-singing");
    if (lyric) {
      lyric.textContent = "";
    }
  }, duration);
}

function playComputerVocalLine() {
  const line = [
    [262, "oh", 0.24],
    [294, "ah", 0.23],
    [330, "ee", 0.2],
    [392, "ah", 0.27],
    [440, "oh", 0.23],
    [392, "mm", 0.24],
    [330, "ee", 0.22],
    [294, "ah", 0.25]
  ];
  line.forEach(([frequency, vowel, duration], index) => {
    playRhythmVocalTone(frequency, duration, vowel, 0.075, index * 0.29);
  });
}

function singFromRhythmComputer(slot) {
  const duration = 6200;
  showRhythmComputerSong(slot, COMPUTER_SONG_LINE, duration);
  playComputerVocalLine();
  speakReply(COMPUTER_SONG_LINE, {
    lang: "zh-CN",
    pitch: 1.12,
    rate: 1.52,
    volume: 0.95
  });
}

function stopComputerSongLoop() {
  if (computerSongTimer) {
    window.clearTimeout(computerSongTimer);
    computerSongTimer = null;
  }
}

function startComputerSongLoop(slot) {
  stopComputerSongLoop();
  const loop = () => {
    if (!slot || !placedRhythmCharacters.get(slot.dataset.slotIndex) || placedRhythmCharacters.get(slot.dataset.slotIndex)?.id !== "computer") {
      stopComputerSongLoop();
      return;
    }
    singFromRhythmComputer(slot);
    computerSongTimer = window.setTimeout(loop, 6500);
  };
  loop();
}

function playHappyRobotStep(step, slotIndex, characterType = "happy-robot", slot = null) {
  const shiftedStep = (step + slotIndex * 2) % 16;
  if (characterType === "computer") {
    const melody = [262, 294, 330, 392, 440, 392, 330, 294];
    if (shiftedStep % 4 === 0) {
      const note = melody[(shiftedStep / 4 + slotIndex) % melody.length];
      playRhythmVocalTone(note, 0.34, ["oh", "ah", "ee", "mm"][(shiftedStep / 4 + slotIndex) % 4], 0.09);
      playRhythmTone(note * 1.5, 0.18, "sine", 0.035);
    }
    return;
  }
  if (characterType === "sun") {
    const pianoNotes = [262, 330, 392, 523, 392, 330];
    if ([0, 4, 8, 12].includes(shiftedStep)) {
      const root = pianoNotes[(shiftedStep / 4 + slotIndex) % pianoNotes.length];
      playRhythmTone(root, 0.18, "triangle", 0.16);
      playRhythmTone(root * 1.5, 0.12, "sine", 0.08);
    }
    if ([2, 6, 10, 14].includes(shiftedStep)) {
      playRhythmTone(pianoNotes[(shiftedStep + slotIndex) % pianoNotes.length] * 2, 0.07, "triangle", 0.055);
    }
    return;
  }
  if (characterType === "moon") {
    if ([1, 5, 9, 13].includes(shiftedStep)) {
      playRhythmTone([440, 523, 659, 784][(shiftedStep + slotIndex) % 4], 0.22, "sine", 0.085);
    }
    if ([7, 15].includes(shiftedStep)) {
      playRhythmTone(988, 0.16, "triangle", 0.05);
    }
    return;
  }
  if (characterType === "simon") {
    if ([0, 4, 8, 12].includes(shiftedStep)) {
      const note = [523, 659, 784, 1047][(shiftedStep / 4 + slotIndex) % 4];
      playRhythmTone(note, 0.09, "square", 0.15);
      playRhythmTone(note * 1.5, 0.055, "sawtooth", 0.055);
    }
    if ([2, 6, 10, 14].includes(shiftedStep)) {
      playRhythmTone([988, 1175, 1319, 1568][(shiftedStep / 2 + slotIndex) % 4], 0.055, "square", 0.09);
    }
    if (shiftedStep % 4 === 2) {
      playRhythmNoise(0.018, 0.045, 9000);
    }
    return;
  }
  if (characterType === "music-box") {
    const melody = [1047, 1175, 1319, 1568, 1760, 1568, 1319, 1175];
    if ([0, 3, 6, 10, 13].includes(shiftedStep)) {
      const note = melody[(shiftedStep + slotIndex) % melody.length];
      playRhythmTone(note, 0.18, "sine", 0.1);
      playRhythmTone(note * 2, 0.12, "triangle", 0.035);
    }
    if ([5, 11, 15].includes(shiftedStep)) {
      playRhythmTone(melody[(shiftedStep + slotIndex + 2) % melody.length] * 1.5, 0.11, "sine", 0.055);
    }
    return;
  }
  if (characterType === "gallod") {
    if ([0, 6, 10].includes(shiftedStep)) {
      playRhythmTone(124, 0.12, "sawtooth", 0.18);
    }
    if ([2, 5, 9, 13].includes(shiftedStep)) {
      playRhythmTone([262, 330, 392, 523][(shiftedStep + slotIndex) % 4], 0.08, "square", 0.09);
    }
    if (shiftedStep % 4 === 0) {
      playRhythmNoise(0.045, 0.055, 5200);
    }
    return;
  }
  if ([0, 8].includes(shiftedStep)) {
    playRhythmTone(82, 0.16, "sine", 0.24);
  }
  if ([4, 12].includes(shiftedStep)) {
    playRhythmNoise(0.1, 0.14, 1300);
  }
  if (shiftedStep % 2 === 0) {
    playRhythmNoise(0.035, 0.065, 6800);
  }
  if ([3, 7, 10, 14].includes(shiftedStep)) {
    const melody = [330, 392, 494, 587][(shiftedStep + slotIndex) % 4];
    playRhythmTone(melody, 0.09, "triangle", 0.095);
  }
}

function playUrgentPianoBurst() {
  const notes = [784, 988, 1175, 988, 880, 1047];
  notes.forEach((frequency, index) => {
    window.setTimeout(() => {
      playRhythmTone(frequency, 0.055, "triangle", 0.12);
      playRhythmTone(frequency * 2, 0.04, "sine", 0.04);
    }, index * 70);
  });
}

function startUrgentPiano() {
  unlockRhythmAudio();
  if (urgentPianoTimer) return;
  playUrgentPianoBurst();
  urgentPianoTimer = window.setInterval(playUrgentPianoBurst, 560);
}

function stopUrgentPiano() {
  if (!urgentPianoTimer) return;
  window.clearInterval(urgentPianoTimer);
  urgentPianoTimer = null;
}

function isSkyCharacter(characterType) {
  return characterType === "sun" || characterType === "moon";
}

function syncSkyDragWorld() {
  const bothAway = skyBodyAway.sun && skyBodyAway.moon;
  document.body.classList.toggle("sky-sun-away", skyBodyAway.sun);
  document.body.classList.toggle("sky-moon-away", skyBodyAway.moon);
  skySun?.classList.toggle("sky-away", skyBodyAway.sun);
  skyMoon?.classList.toggle("sky-away", skyBodyAway.moon);

  if (bothAway) {
    skyDragTerrorActive = true;
    startTerrorNight();
    startUrgentPiano();
    return;
  }

  stopUrgentPiano();
  if (skyDragTerrorActive && isTerrorNightActive) {
    skyDragTerrorActive = false;
    stopTerrorNight();
  }

  if (skyBodyAway.sun) {
    setDayNightMode(true);
    return;
  }

  if (skyBodyAway.moon) {
    setDayNightMode(false);
    return;
  }

  skyDragTerrorActive = false;
  scheduleAutoSkyCycle();
}

function setSkyBodyAway(characterType, away) {
  if (!isSkyCharacter(characterType)) return;
  skyBodyAway[characterType] = away;
  syncSkyDragWorld();
}

function updateRhythmStatus() {
  if (!rhythmStatus) return;
  const count = placedRhythmCharacters.size;
  rhythmStatus.textContent = count ? `角色 x ${count} 正在演奏` : "拖上角色";
}

function pulseRhythmSlot(slot) {
  const robot = slot.querySelector(".happy-robot-icon");
  slot.classList.remove("beat-pulse");
  robot?.classList.remove("beat-bounce");
  slot.offsetWidth;
  slot.classList.add("beat-pulse");
  robot?.classList.add("beat-bounce");
}

function tickRhythmLoop() {
  placedRhythmCharacters.forEach((character, slotIndex) => {
    playHappyRobotStep(rhythmStep, Number(slotIndex), character.id, character.slot);
    if (rhythmStep % 2 === 0) {
      pulseRhythmSlot(character.slot);
    }
  });
  rhythmStep = (rhythmStep + 1) % 16;
}

function startRhythmLoop() {
  unlockRhythmAudio();
  if (rhythmLoopTimer || !placedRhythmCharacters.size) return;
  rhythmStep = 0;
  tickRhythmLoop();
  rhythmLoopTimer = window.setInterval(tickRhythmLoop, 180);
  praiseRhythmMusic();
}

function stopRhythmLoopIfEmpty() {
  if (placedRhythmCharacters.size || !rhythmLoopTimer) return;
  window.clearInterval(rhythmLoopTimer);
  rhythmLoopTimer = null;
  computerShell.classList.remove("rhythm-loving");
}

function clearRhythmSlot(slot) {
  const slotIndex = slot.dataset.slotIndex;
  if (!placedRhythmCharacters.has(slotIndex)) return;
  const character = placedRhythmCharacters.get(slotIndex);
  placedRhythmCharacters.delete(slotIndex);
  slot.classList.remove("occupied", "beat-pulse");
  slot.innerHTML = "";
  if (isSkyCharacter(character?.id)) {
    setSkyBodyAway(character.id, false);
  }
  if (character?.id === "computer") {
    stopComputerSongLoop();
    window.speechSynthesis?.cancel?.();
  }
  updateRhythmStatus();
  stopRhythmLoopIfEmpty();
}

function placeHappyRobotInSlot(slot, characterType = "happy-robot") {
  const slotIndex = slot.dataset.slotIndex;
  if (characterType === "computer") {
    placedRhythmCharacters.forEach((character, existingSlotIndex) => {
      if (character.id === "computer" && existingSlotIndex !== slotIndex) {
        clearRhythmSlot(character.slot);
      }
    });
  }
  clearRhythmSlot(slot);
  const robot = makeHappyRobotIcon("placed-happy-robot", characterType);
  const label = document.createElement("span");
  label.className = "placed-robot-name";
  label.textContent = getCharacterLabel(characterType);
  slot.append(robot, label);
  slot.classList.add("occupied");
  placedRhythmCharacters.set(slotIndex, { id: characterType, slot });
  if (isSkyCharacter(characterType)) {
    setSkyBodyAway(characterType, true);
  }
  updateRhythmStatus();
  if (characterType === "computer") {
    lastComputerSongAt = performance.now();
    startRhythmLoop();
    startComputerSongLoop(slot);
    return;
  }
  startRhythmLoop();
  speakAsComputer(`${getCharacterLabel(characterType)}\u52a0\u5165\u8282\u594f\uff0c\u5f00\u59cb\u6f14\u594f\u3002`, { forceSubtitle: true, colorful: true });
  return;
  speakAsComputer(`${getCharacterLabel(characterType)}加入节奏，开始演奏。`, { forceSubtitle: true, colorful: true });
}

function getRhythmSlotAtPoint(x, y) {
  return rhythmSlots.find((slot) => {
    const rect = slot.getBoundingClientRect();
    return x >= rect.left - 8 && x <= rect.right + 8 && y >= rect.top - 8 && y <= rect.bottom + 8;
  });
}

function setupRhythmBox() {
  if (!rhythmBox || !happyRobotPicker || !rhythmStage) return;

  const moveGhost = (event) => {
    if (!rhythmDrag) return;
    if (event.pointerId !== rhythmDrag.pointerId) return;
    rhythmDrag.ghost.style.left = `${event.clientX - rhythmDrag.offsetX}px`;
    rhythmDrag.ghost.style.top = `${event.clientY - rhythmDrag.offsetY}px`;
    const slot = getRhythmSlotAtPoint(event.clientX, event.clientY);
    rhythmSlots.forEach((item) => item.classList.toggle("drop-ready", item === slot));
    updateEmptySlotMouseLook(event.clientX, event.clientY);
  };

  const endDrag = (event) => {
    if (rhythmDrag && event.pointerId !== rhythmDrag.pointerId) return;
    window.removeEventListener("pointermove", moveGhost);
    window.removeEventListener("pointerup", endDrag);
    rhythmSlots.forEach((item) => item.classList.remove("drop-ready"));
    clearEmptySlotMouseLook();
    if (!rhythmDrag) return;
    rhythmDrag.picker?.releasePointerCapture?.(rhythmDrag.pointerId);
    const slot = getRhythmSlotAtPoint(event.clientX, event.clientY);
    const characterType = rhythmDrag.characterType || "happy-robot";
    const sourcePicker = rhythmDrag.picker;
    const isSkySource = isSkyCharacter(characterType);
    rhythmDrag.ghost.remove();
    rhythmDrag = null;
    sourcePicker?.classList.remove("sky-dragging-source");
    if (slot) {
      const now = performance.now();
      if (now - lastRhythmDropAt < 260) return;
      lastRhythmDropAt = now;
      placeHappyRobotInSlot(slot, characterType);
    } else if (getComputerDropZoneAtPoint(event.clientX, event.clientY)) {
      const now = performance.now();
      if (now - lastRhythmDropAt < 260) return;
      lastRhythmDropAt = now;
      placeHappyRobotBesideComputer(characterType);
    }
  };

  const beginCharacterDrag = (event, picker, characterType = "happy-robot") => {
    if (rhythmDrag || performance.now() - lastRhythmDropAt < 260) return;
    markPointerActivity();
    unlockRhythmAudio();
    event.preventDefault();
    if (isSkyCharacter(characterType)) {
      picker.classList.add("sky-dragging-source");
    }
    const ghost = makeHappyRobotIcon("happy-robot-ghost", characterType);
    document.body.appendChild(ghost);
    rhythmDrag = {
      ghost,
      picker,
      characterType,
      pointerId: event.pointerId,
      offsetX: 48,
      offsetY: 54
    };
    picker.setPointerCapture?.(event.pointerId);
    moveGhost(event);
    window.addEventListener("pointermove", moveGhost);
    window.addEventListener("pointerup", endDrag);
  };

  happyRobotPicker.addEventListener("pointerdown", (event) => {
    beginCharacterDrag(event, happyRobotPicker, "happy-robot");
  });

  gallodPicker?.addEventListener("pointerdown", (event) => {
    beginCharacterDrag(event, gallodPicker, "gallod");
  });

  simonPicker?.addEventListener("pointerdown", (event) => {
    beginCharacterDrag(event, simonPicker, "simon");
  });

  musicBoxPicker?.addEventListener("pointerdown", (event) => {
    beginCharacterDrag(event, musicBoxPicker, "music-box");
  });

  skySun?.addEventListener("pointerdown", (event) => {
    beginCharacterDrag(event, skySun, "sun");
  });

  skyMoon?.addEventListener("pointerdown", (event) => {
    beginCharacterDrag(event, skyMoon, "moon");
  });

  rhythmVolume?.addEventListener("input", () => {
    applyRhythmVolume((Number(rhythmVolume.value) / 100) * 2.6);
  });

  if (rhythmVolume) {
    applyRhythmVolume((Number(rhythmVolume.value) / 100) * 2.6);
  }

  rhythmStage.addEventListener("click", (event) => {
    const slot = event.target.closest(".rhythm-slot");
    if (!slot || !slot.classList.contains("occupied")) return;
    clearRhythmSlot(slot);
  });

  updateRhythmStatus();
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

resetSaveToggle?.addEventListener("click", resetGameState);

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
setupAutoReload();
setupFoodDrag();
setupRhythmBox();
updateRhythmTvMount();
updateTvWeatherMarks();
setupMinecraftGame();
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
  refreshTvCableConnection();
  refreshWeatherCableConnection();
  updateAllHappyRobotCompanionPositions();
});

if ("speechSynthesis" in window) {
  window.speechSynthesis.onvoiceschanged = loadVoices;
}
