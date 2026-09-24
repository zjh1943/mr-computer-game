const chatForm = document.querySelector("#chat-form");
const messageInput = document.querySelector("#message-input");
const micButton = document.querySelector("#mic-button");
const voiceHint = document.querySelector("#voice-hint");
const screenStatus = document.querySelector("#screen-status");
const moodPanel = document.querySelector("#mood-panel");
const screenSubtitle = document.querySelector("#screen-subtitle");
const computerDesktop = document.querySelector("#computer-desktop");
const computerAppWindow = document.querySelector("#computer-app-window");
const computerAppClose = document.querySelector("#computer-app-close");
const computerAppMinimize = document.querySelector("#computer-app-minimize");
const computerFaceClose = document.querySelector("#computer-face-close");
const computerAppTitle = document.querySelector("#computer-app-title");
const computerAppContent = document.querySelector("#computer-app-content");
const computerAppDock = {
  parent: computerAppWindow?.parentElement || null,
  next: computerAppWindow?.nextSibling || null
};
const desktopStore = document.querySelector("#desktop-store");
const desktopInstalledApps = document.querySelector("#desktop-installed-apps");
const desktopAppButtons = Array.from(document.querySelectorAll(".desktop-app"));
const desktopDownloadButtons = Array.from(document.querySelectorAll("[data-download-app]"));
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
const minecraftBackgroundMusic = document.querySelector("#minecraft-background-music");
const minecraftBackpackToggle = document.querySelector("#minecraft-backpack-toggle");
const minecraftBackpackPanel = document.querySelector("#minecraft-backpack-panel");
const minecraftBackpackGrid = document.querySelector("#minecraft-backpack-grid");
const minecraftBackpackHotbar = document.querySelector("#minecraft-backpack-hotbar");
const minecraftBackpackClose = document.querySelector("#minecraft-backpack-close");
const minecraftPocketCraftingGrid = document.querySelector("#minecraft-pocket-crafting-grid");
const minecraftPocketCraftingOutput = document.querySelector("#minecraft-pocket-crafting-output");
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
let speakingStopTimer = null;
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
let computerScreenMode = "desktop";
let currentComputerApp = "";
let installedComputerApps = ["chat", "store", "minecraft", "town"];
let computerTown3D = null;
let computerTownThreePromise = null;
let computerTownAudio = null;
let computerTownSpeechQueue = [];
let computerTownSpeechActive = false;
let minedItems = [];
let minePanelOpen = false;
let minecraftPanelOpen = false;
let minecraftSelectedTool = "pickaxe";
let minecraftOpenedAt = 0;
let minecraftWorldBlocks = [];
let minecraftInventory = {};
let minecraftBackpackOpen = false;
let minecraftBackpackHeldItem = null;
let minecraftBackpackSlotOrder = [];
let minecraftPocketCraftingSlots = Array(4).fill("");
let minecraftPlayerActionPulse = { type: "", until: 0 };
let minecraftPickupItems = [];
let minecraftPickupId = 0;
const minecraftAnimalSounds = {};
let minecraftCurrentAnimalSound = null;
let minecraftAnimalSoundsLoading = null;
let minecraftPlayerX = 0;
let minecraftPlayerZ = 0;
let minecraftDepth = 0;
let minecraftDimension = "overworld";
let minecraftView = 0;
let minecraftGuardianFound = false;
let minecraftIsNight = false;
let minecraftDayTick = 0;
const MINECRAFT_DAY_NIGHT_SECONDS = 120;
let minecraftXp = 0;
let minecraftZombies = [];
let minecraftCycleTimer = null;
let minecraftSideMotionTimer = null;
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
let minecraftFleeingAnimals = {};
let minecraftAnimalDirections = {};
let minecraftInsideVillageHouse = null;
let minecraftSpawnPoint = null;
let minecraftSticks = 0;
let minecraftCoal = 0;
let minecraftIron = 0;
let minecraftDiamond = 0;
let minecraftBedrockShard = 0;
let minecraftPickaxes = { wood: 0, stone: 0, iron: 0, diamond: 0, bedrock: 0 };
let minecraftBuckets = 0;
let minecraftWaterBuckets = 0;
let minecraftLavaBuckets = 0;
let minecraftCraftingSlots = Array(9).fill("");
let minecraftCraftingOpen = false;
let minecraftSkeletons = [];
let minecraftVillagers = {};
let minecraftVillagerSteps = {};
let minecraftGolemAngryUntil = 0;
let minecraftEndermen = {};
let minecraftHasSkyRabbit = false;
let minecraftLastSkeletonShotAt = 0;
let minecraftLastZombieHitAt = 0;
let minecraftLastZombieStepAt = 0;
let minecraftPlayerLandingPulse = 0;
let minecraftJoystickTimer = null;
let minecraftJoystickDirection = "";
const townStageThreeZoomKeys = new Set();
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
const AUTO_DAY_DURATION = 120000;
const AUTO_NIGHT_DURATION = 120000;
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
  sand: { label: "沙子" },
  cactus: { label: "仙人掌" },
  wood: { label: "木头" },
  leaves: { label: "树叶" },
  water: { label: "河水" },
  lava: { label: "岩浆" },
  coal_ore: { label: "煤炭" },
  iron_ore: { label: "铁" },
  gold_ore: { label: "金矿" },
  diamond_ore: { label: "钻石" },
  bedrock_ore: { label: "基岩矿" },
  bed: { label: "床" },
  crafting_table: { label: "工作台" },
  torch: { label: "火把" }
};
minecraftBlockTypes.obsidian = { label: "黑曜石" };
minecraftBlockTypes.netherrack = { label: "下界红土" };
minecraftBlockTypes.nether_pumpkin = { label: "下界南瓜零食" };
minecraftBlockTypes.nether_watermelon = { label: "下界西瓜零食" };
minecraftBlockTypes.nether_gold_ore = { label: "下界金矿" };
minecraftBlockTypes.nether_brick = { label: "猪灵堡垒砖" };
minecraftBlockTypes.meteor = { label: "银石" };
minecraftBlockTypes.warped_nylium = { label: "诡异森林地" };
minecraftBlockTypes.glowstone = { label: "萤石" };
minecraftBlockTypes.warped_stem = { label: "诡异树干" };
minecraftBlockTypes.warped_leaves = { label: "诡异树叶" };
minecraftBlockTypes.end_stone = { label: "末地海绵" };
minecraftBlockTypes.end_portal_frame = { label: "末地传送门框架" };
minecraftBlockTypes.end_portal_frame_eye = { label: "放了眼的末地传送门框架" };
minecraftBlockTypes.end_portal = { label: "末地黑洞" };
minecraftBlockTypes.obsidian_pillar = { label: "黑曜石柱" };
minecraftBlockTypes.end_chest = { label: "末地箱子" };
minecraftBlockTypes.sky_grass = { label: "天际青草" };
minecraftBlockTypes.sky_wood = { label: "天际青木" };
minecraftBlockTypes.sky_leaves = { label: "天际青叶" };

const minecraftAnimalTypes = {
  sheep: { label: "羊", icon: "羊", meat: 1, wool: 1 },
  cow: { label: "牛", icon: "牛", meat: 2, wool: 0 },
  pig: { label: "猪", icon: "猪", meat: 2, wool: 0 },
  chicken: { label: "鸡", icon: "鸡", meat: 1, wool: 0 },
  horse: { label: "马", icon: "马", meat: 0, wool: 0 },
  wolf: { label: "狼", icon: "狼", meat: 0, wool: 0 },
  cat: { label: "猫", icon: "猫", meat: 0, wool: 0 },
  parrot: { label: "鹦鹉", icon: "鹦", meat: 0, wool: 0 },
  turtle: { label: "海龟", icon: "龟", meat: 0, wool: 0 }
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
    installedComputerApps,
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
    minecraftDayTick,
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
    minecraftFleeingAnimals,
    minecraftAnimalDirections,
    minecraftInsideVillageHouse,
    minecraftSpawnPoint,
    minecraftSticks,
    minecraftCoal,
    minecraftIron,
    minecraftDiamond,
    minecraftBedrockShard,
    minecraftPickaxes,
    minecraftBuckets,
    minecraftWaterBuckets,
    minecraftLavaBuckets,
    minecraftSkeletons,
    minecraftVillagers,
    minecraftVillagerSteps,
    minecraftEndermen,
    minecraftHasSkyRabbit,
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
  installedComputerApps = Array.isArray(saveData.installedComputerApps)
    ? Array.from(new Set(["chat", "store", "minecraft", "town", ...saveData.installedComputerApps.filter((app) => typeof app === "string")]))
    : ["chat", "store", "minecraft", "town"];
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
  minecraftDimension = saveData.minecraftDimension === "nether" || saveData.minecraftDimension === "end" || saveData.minecraftDimension === "sky" ? saveData.minecraftDimension : "overworld";
  minecraftView = Number.isFinite(saveData.minecraftView) ? Math.abs(Math.trunc(saveData.minecraftView)) % 4 : 0;
  minecraftGuardianFound = Boolean(saveData.minecraftGuardianFound);
  minecraftIsNight = Boolean(saveData.minecraftIsNight);
  minecraftDayTick = Number.isFinite(saveData.minecraftDayTick) ? Math.max(0, Math.trunc(saveData.minecraftDayTick)) : 0;
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
  minecraftFleeingAnimals = saveData.minecraftFleeingAnimals && typeof saveData.minecraftFleeingAnimals === "object" && !Array.isArray(saveData.minecraftFleeingAnimals)
    ? Object.fromEntries(Object.entries(saveData.minecraftFleeingAnimals).filter(([, animal]) => minecraftAnimalTypes[animal]))
    : {};
  minecraftAnimalDirections = saveData.minecraftAnimalDirections && typeof saveData.minecraftAnimalDirections === "object" && !Array.isArray(saveData.minecraftAnimalDirections)
    ? Object.fromEntries(Object.entries(saveData.minecraftAnimalDirections).filter(([, direction]) => direction === -1 || direction === 1))
    : {};
  minecraftInsideVillageHouse = saveData.minecraftInsideVillageHouse
    && Number.isFinite(saveData.minecraftInsideVillageHouse.x)
    && Number.isFinite(saveData.minecraftInsideVillageHouse.z)
    ? { x: Math.trunc(saveData.minecraftInsideVillageHouse.x), z: Math.trunc(saveData.minecraftInsideVillageHouse.z) }
    : null;
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
  minecraftDiamond = Number.isFinite(saveData.minecraftDiamond) ? Math.max(0, Math.trunc(saveData.minecraftDiamond)) : 0;
  minecraftBedrockShard = Number.isFinite(saveData.minecraftBedrockShard) ? Math.max(0, Math.trunc(saveData.minecraftBedrockShard)) : 0;
  minecraftPickaxes = saveData.minecraftPickaxes && typeof saveData.minecraftPickaxes === "object" && !Array.isArray(saveData.minecraftPickaxes)
    ? {
        wood: Math.max(0, Math.trunc(Number(saveData.minecraftPickaxes.wood) || 0)),
        stone: Math.max(0, Math.trunc(Number(saveData.minecraftPickaxes.stone) || 0)),
        iron: Math.max(0, Math.trunc(Number(saveData.minecraftPickaxes.iron) || 0)),
        diamond: Math.max(0, Math.trunc(Number(saveData.minecraftPickaxes.diamond) || 0)),
        bedrock: Math.max(0, Math.trunc(Number(saveData.minecraftPickaxes.bedrock) || 0))
      }
    : { wood: 0, stone: 0, iron: 0, diamond: 0, bedrock: 0 };
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
  minecraftVillagerSteps = saveData.minecraftVillagerSteps && typeof saveData.minecraftVillagerSteps === "object" && !Array.isArray(saveData.minecraftVillagerSteps)
    ? Object.fromEntries(Object.entries(saveData.minecraftVillagerSteps).filter(([, step]) => Number.isFinite(step)).map(([key, step]) => [key, Math.trunc(step)]))
    : {};
  minecraftEndermen = saveData.minecraftEndermen && typeof saveData.minecraftEndermen === "object" && !Array.isArray(saveData.minecraftEndermen)
    ? saveData.minecraftEndermen
    : {};
  minecraftHasSkyRabbit = Boolean(saveData.minecraftHasSkyRabbit);
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
  mineGrid.appendChild(makeMinecraftBatElement());
}

function makeMinecraftBatElement() {
  const bat = document.createElement("span");
  bat.className = "minecraft-bat";
  bat.setAttribute("aria-label", "蝙蝠");
  bat.setAttribute("role", "img");
  return bat;
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
  if (minecraftDimension === "sky") return `sky:${x},${z},${y}`;
  return `${x},${z},${y}`;
}

function getMinecraftBiomeAt(x, z) {
  if (minecraftDimension !== "overworld") return "";
  if (getMinecraftVillageOriginAt(x, z)) return "village";
  const band = ((Math.floor((x + 80) / 34) % 4) + 4) % 4;
  return ["plains", "forest", "desert", "village"][band];
}

function getMinecraftTreeOrigin(x, z) {
  if (getMinecraftBiomeAt(x, z) !== "forest" && getMinecraftBiomeAt(x, z) !== "village") return null;
  for (let originX = x - 1; originX <= x + 1; originX += 1) {
    for (let originZ = z - 1; originZ <= z + 1; originZ += 1) {
      const originBiome = getMinecraftBiomeAt(originX, originZ);
      if (originBiome !== "forest" && originBiome !== "village") continue;
      const originSeed = Math.abs((originX * 17 + originZ * 29) % (originBiome === "forest" ? 11 : 29));
      if (originSeed !== 0) continue;
      const dx = x - originX;
      const dz = z - originZ;
      if ((dx === 0 && dz === 0) || (Math.abs(dx) <= 1 && Math.abs(dz) <= 1)) {
        return { x: originX, z: originZ };
      }
    }
  }
  return null;
}

function isMinecraftRiverAt(x, z) {
  if (getMinecraftBiomeAt(x, z) === "desert") return false;
  const riverCenter = Math.round(Math.sin(x / 4) * 2);
  return Math.abs(z - riverCenter) <= 1;
}

function isMinecraftCactusAt(x, z, y) {
  if (getMinecraftBiomeAt(x, z) !== "desert" || y < 1 || y > 3) return false;
  return Math.abs((x * 19 + z * 37) % 17) === 0;
}

function isMinecraftVillageAreaAt(x, z) {
  if (minecraftDimension !== "overworld") return false;
  return Boolean(getMinecraftVillageOriginAt(x, z));
}

function getMinecraftVillageOriginAt(x, z) {
  if (minecraftDimension !== "overworld") return null;
  const origins = [
    { x: 10, z: -12 },
    { x: 38, z: -10 },
    { x: -34, z: 8 },
    { x: 6, z: 26 },
    { x: 54, z: 24 }
  ];
  const fixedOrigin = origins.find((origin) => x >= origin.x && x <= origin.x + 14 && z >= origin.z && z <= origin.z + 14);
  if (fixedOrigin) return fixedOrigin;
  const bandIndex = Math.floor((x + 80) / 34);
  const band = ((bandIndex % 4) + 4) % 4;
  const originX = bandIndex * 34 - 72;
  if (band === 3 && x >= originX && x <= originX + 14 && z >= -7 && z <= 7) {
    return { x: originX, z: -7 };
  }
  return null;
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
  if (minecraftDimension !== "overworld") return null;
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

function isMinecraftSkyPortalAt(x, z, y = minecraftDepth) {
  if (getMinecraftBlockAt(x, z, y) !== "meteor") return false;
  return getMinecraftBlockAt(x, z - 1, y) === "meteor"
    && getMinecraftBlockAt(x, z + 1, y) === "meteor";
}

function isMinecraftSkyPortalNearMapPoint(x, z) {
  if (minecraftDimension !== "overworld" && minecraftDimension !== "sky") return false;
  for (let dx = -5; dx <= 5; dx += 1) {
    for (let dz = -5; dz <= 5; dz += 1) {
      if (isMinecraftSkyPortalAt(x + dx, z + dz, 0)) return true;
    }
  }
  return false;
}

function isMinecraftStrongholdPortalNearMapPoint(x, z) {
  if (minecraftDimension !== "overworld") return false;
  for (let dx = -5; dx <= 5; dx += 1) {
    for (let dz = -5; dz <= 5; dz += 1) {
      if (isMinecraftStrongholdPortalFrameAt(x + dx, z + dz) || isMinecraftStrongholdPortalCenterAt(x + dx, z + dz)) return true;
    }
  }
  return false;
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
  if (minecraftDimension === "sky" && isMinecraftSkyPortalAt(minecraftPlayerX, minecraftPlayerZ, minecraftDepth)) {
    minecraftDimension = "overworld";
    minecraftDepth = 0;
    minecraftPlayerX = 0;
    minecraftPlayerZ = 0;
    renderMinecraftWorld();
    updateMinecraftStatus("走进蓝光石头门，回到了主世界。");
    saveGameState();
    return true;
  }
  if (minecraftDimension === "overworld" && isMinecraftSkyPortalAt(minecraftPlayerX, minecraftPlayerZ, minecraftDepth)) {
    minecraftDimension = "sky";
    minecraftDepth = 0;
    minecraftPlayerX = 0;
    minecraftPlayerZ = 0;
    minecraftIsNight = false;
    minecraftZombies = [];
    minecraftSkeletons = [];
    renderMinecraftWorld();
    updateMinecraftStatus("走进蓝光石头门，来到了天际。这里有青色小岛和会吹人的灰云。");
    saveGameState();
    return true;
  }
  if (minecraftDimension === "end"
    && minecraftDepth === 0
    && isMinecraftEndReturnPortalAt(minecraftPlayerX, minecraftPlayerZ)) {
    minecraftDimension = "overworld";
    minecraftDepth = 0;
    minecraftPlayerX = 76;
    minecraftPlayerZ = 0;
    minecraftZombies = [];
    minecraftSkeletons = [];
    renderMinecraftWorld();
    updateMinecraftStatus("走进末地返回传送门，回到了主世界的要塞房间。");
    saveGameState();
    return true;
  }
  if (minecraftDimension === "overworld"
    && minecraftDepth === 0
    && isMinecraftStrongholdPortalCenterAt(minecraftPlayerX, minecraftPlayerZ)
    && getMinecraftBlockAt(minecraftPlayerX, minecraftPlayerZ, minecraftDepth) === "end_portal") {
    minecraftDimension = "end";
    minecraftDepth = 0;
    minecraftPlayerX = 0;
    minecraftPlayerZ = 2;
    if (minecraftDragonHealth <= 0) minecraftDragonHealth = 12;
    minecraftZombies = [];
    minecraftSkeletons = [];
    renderMinecraftWorld();
    updateMinecraftStatus("走进黑色传送门，进入了末地。这里没有太阳和月亮，只有黑色天空。");
    saveGameState();
    return true;
  }
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
  if (y <= -46 && seed < 9) return "bedrock_ore";
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
  if (minecraftDimension === "end") {
    const customEnderman = Object.values(minecraftEndermen).find((entry) => entry && typeof entry === "object" && entry.x === x && entry.z === z);
    if (customEnderman) return true;
    if (minecraftEndermen[`end:${x},${z}`] || minecraftEndermen[`${x},${z}`]) return false;
    return isMinecraftEndIslandAt(x, z) && Math.abs((x * 17 + z * 23) % 11) <= 1;
  }
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

function getMinecraftStrongholdPortalPart(x, z) {
  if (minecraftDimension !== "overworld") return null;
  const dx = x - 76;
  const dz = z;
  const isFrame = (Math.abs(dx) === 2 && Math.abs(dz) <= 1) || (Math.abs(dz) === 2 && Math.abs(dx) <= 1);
  if (isFrame) {
    const order = [
      [75, -2], [76, -2], [77, -2],
      [78, -1], [78, 0], [78, 1],
      [77, 2], [76, 2], [75, 2],
      [74, 1], [74, 0], [74, -1]
    ];
    const index = order.findIndex(([frameX, frameZ]) => frameX === x && frameZ === z);
    return { type: "frame", index };
  }
  if (Math.abs(dx) <= 1 && Math.abs(dz) <= 1) return { type: "center" };
  return null;
}

function isMinecraftStrongholdPortalFrameAt(x, z) {
  return getMinecraftStrongholdPortalPart(x, z)?.type === "frame";
}

function isMinecraftStrongholdPortalCenterAt(x, z) {
  return getMinecraftStrongholdPortalPart(x, z)?.type === "center";
}

function isMinecraftEndIslandAt(x, z) {
  if (minecraftDimension !== "end") return false;
  return (x * x + z * z) <= 260 || ((x - 42) * (x - 42) + (z - 4) * (z - 4)) <= 90;
}

function isMinecraftEndIslandEdgeAt(x, z) {
  if (!isMinecraftEndIslandAt(x, z)) return false;
  return !isMinecraftEndIslandAt(x + 1, z)
    || !isMinecraftEndIslandAt(x - 1, z)
    || !isMinecraftEndIslandAt(x, z + 1)
    || !isMinecraftEndIslandAt(x, z - 1);
}

function isMinecraftOuterEndIslandAt(x, z) {
  return minecraftDimension === "end" && ((x - 42) * (x - 42) + (z - 4) * (z - 4)) <= 90;
}

function isMinecraftEndGatewayAt(x, z) {
  return minecraftDimension === "end" && x >= 16 && x <= 18 && z >= -1 && z <= 1;
}

function isMinecraftEndReturnPortalAt(x, z) {
  return minecraftDimension === "end" && x >= -1 && x <= 1 && z >= 6 && z <= 8;
}

function isMinecraftEndReturnPortalNearMapPoint(x, z) {
  if (minecraftDimension !== "end") return false;
  for (let dx = -5; dx <= 5; dx += 1) {
    for (let dz = -5; dz <= 5; dz += 1) {
      if (isMinecraftEndReturnPortalAt(x + dx, z + dz)) return true;
    }
  }
  return false;
}

function isMinecraftSkyIslandAt(x, z) {
  if (minecraftDimension !== "sky") return false;
  const centers = [
    { x: 0, z: 0, r: 8 },
    { x: 18, z: -8, r: 5 },
    { x: -18, z: 9, r: 5 },
    { x: 34, z: 6, r: 6 },
    { x: -36, z: -10, r: 6 }
  ];
  return centers.some((center) => ((x - center.x) * (x - center.x) + (z - center.z) * (z - center.z)) <= center.r * center.r);
}

function isMinecraftSkyBridgeAt(x, z) {
  if (minecraftDimension !== "sky") return false;
  return (Math.abs(z) <= 1 && x >= -36 && x <= 34)
    || (Math.abs(x - 18) <= 1 && z >= -8 && z <= 0)
    || (Math.abs(x + 18) <= 1 && z >= 0 && z <= 9)
    || (Math.abs(x - 34) <= 1 && z >= 0 && z <= 6)
    || (Math.abs(x + 36) <= 1 && z >= -10 && z <= 0);
}

function getMinecraftSkyTreeOrigin(x, z) {
  if (minecraftDimension !== "sky") return null;
  for (let originX = x - 1; originX <= x + 1; originX += 1) {
    for (let originZ = z; originZ <= z + 3; originZ += 1) {
      if (Math.abs((originX * 19 + originZ * 31) % 17) !== 0) continue;
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

function isMinecraftSkyRabbitAt(x, z) {
  return minecraftDimension === "sky" && !minecraftHasSkyRabbit && isMinecraftSkyIslandAt(x, z) && Math.abs((x * 23 + z * 29) % 41) === 0;
}

function isMinecraftWindCloudAt(x, z) {
  return minecraftDimension === "sky" && isMinecraftSkyIslandAt(x, z) && Math.abs((x * 37 + z * 13) % 53) === 0;
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
  return minecraftDimension === "end" && minecraftDragonHealth > 0 && Math.abs(x) <= 2 && z >= -1 && z <= 2;
}

function getDefaultMinecraftEndBlockAt(x, z, y) {
  if (y >= 1) return null;
  if (y === 0 && isMinecraftEndReturnPortalAt(x, z)) return "end_portal";
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
  if (y === 0 && Math.abs((x * 29 + z * 41) % 61) === 0) return "nether_pumpkin";
  if (y === 0 && Math.abs((x * 47 + z * 19) % 67) === 0) return "nether_watermelon";
  if (y === 0 && Math.abs((x * 37 + z * 17) % 43) <= 1) return "glowstone";
  if (y <= 0 && Math.abs((x * 13 + z * 11 + y * 5) % 19) <= 2) return "nether_gold_ore";
  return "netherrack";
}

function getDefaultMinecraftSkyBlockAt(x, z, y) {
  if (y >= 2) return null;
  if (y === 1) {
    const treeOrigin = getMinecraftSkyTreeOrigin(x, z);
    if (treeOrigin) {
      const dx = x - treeOrigin.x;
      const dz = z - treeOrigin.z;
      if (dx === 0 && (dz === 0 || dz === -1)) return "sky_wood";
      if ((dz === -2 && Math.abs(dx) <= 1) || (dx === 0 && dz === -3)) return "sky_leaves";
    }
    return null;
  }
  if (y === 0 && (isMinecraftSkyIslandAt(x, z) || isMinecraftSkyBridgeAt(x, z))) return "sky_grass";
  return null;
}

function getDefaultMinecraftBlockAt(x, z, y = minecraftDepth) {
  if (minecraftDimension === "end") return getDefaultMinecraftEndBlockAt(x, z, y);
  if (minecraftDimension === "nether") return getDefaultMinecraftNetherBlockAt(x, z, y);
  if (minecraftDimension === "sky") return getDefaultMinecraftSkyBlockAt(x, z, y);
  if (y >= 6) return null;
  if (y >= 1) {
    if (isMinecraftCactusAt(x, z, y)) return "cactus";
    if (isMinecraftMeteorAt(x, z)) return "meteor";
    const treeOrigin = getMinecraftTreeOrigin(x, z);
    if (treeOrigin) {
      const dx = x - treeOrigin.x;
      const dz = z - treeOrigin.z;
      if (dx === 0 && dz === 0 && y >= 1 && y <= 3) return "wood";
      if (y === 4 && Math.abs(dx) <= 1 && Math.abs(dz) <= 1) return "leaves";
      if (y === 5 && dx === 0 && dz === 0) return "leaves";
    }
    return null;
  }
  if (y === 0) {
    const biome = getMinecraftBiomeAt(x, z);
    const strongholdPortalPart = getMinecraftStrongholdPortalPart(x, z);
    if (strongholdPortalPart?.type === "frame") {
      return strongholdPortalPart.index >= 0 && strongholdPortalPart.index < minecraftEndPortalEyes
        ? "end_portal_frame_eye"
        : "end_portal_frame";
    }
    if (strongholdPortalPart?.type === "center") return minecraftEndPortalEyes >= 12 ? "end_portal" : null;
    if (isMinecraftStrongholdAreaAt(x, z)) return "stone";
    if (isMinecraftVillageBedAt(x, z)) return "bed";
    if (isMinecraftVillageTorchAt(x, z)) return "torch";
    if (isMinecraftVillageHouseAt(x, z)) return "wood";
    if (isMinecraftRiverAt(x, z)) return "water";
    if (biome === "desert") return "sand";
    if (biome === "plains" || biome === "forest" || biome === "village") return "grass";
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
  if (minecraftDimension === "overworld" && y === 0) {
    const strongholdPortalPart = getMinecraftStrongholdPortalPart(x, z);
    if (strongholdPortalPart) {
      const protectedBlock = getDefaultMinecraftBlockAt(x, z, y);
      if (protectedBlock === "end_portal_frame" || protectedBlock === "end_portal_frame_eye" || protectedBlock === "end_portal") {
        delete minecraftWorldBlocks[key];
        return protectedBlock;
      }
    }
  }
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
  const seed = Math.abs((x * 31 + z * 43) % 73);
  if (seed === 0) return "sheep";
  if (seed === 5) return "cow";
  if (seed === 11) return "pig";
  if (seed === 17) return "chicken";
  if (seed === 23) return "horse";
  if (seed === 31) return "wolf";
  if (seed === 41) return "cat";
  if (seed === 53) return "parrot";
  if (seed === 67) return "turtle";
  return null;
}

function getMinecraftSkyAnimalAt(x, z) {
  if (minecraftDimension !== "sky" || !isMinecraftSkyIslandAt(x, z) || getMinecraftBlockAt(x, z, 1)) return null;
  const seed = Math.abs((x * 31 + z * 43) % 73);
  if (seed === 0) return "sheep";
  if (seed === 5) return "cow";
  if (seed === 11) return "pig";
  if (seed === 17) return "chicken";
  if (seed === 23) return "horse";
  if (seed === 31) return "wolf";
  if (seed === 41) return "cat";
  if (seed === 53) return "parrot";
  if (seed === 67) return "turtle";
  return null;
}

function getMinecraftAnimalAt(x, z) {
  const key = getMinecraftAnimalKey(x, z);
  if (Object.prototype.hasOwnProperty.call(minecraftFleeingAnimals, key)) {
    return minecraftFleeingAnimals[key];
  }
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
  delete minecraftFleeingAnimals[key];
  if (!animalType) delete minecraftAnimalDirections[key];
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
  if (minecraftDimension === "sky" && minecraftDepth === 0 && !getMinecraftBlockAt(minecraftPlayerX, minecraftPlayerZ, 0)) {
    minecraftDimension = "overworld";
    minecraftDepth = 1;
    if (minecraftHasSkyRabbit) {
      updateMinecraftStatus("抱着天际兔子从空岛掉下来，轻轻落回主世界，没有扣血。");
    } else {
      minecraftHealth = Math.max(0, minecraftHealth - 3);
      minecraftHunger = Math.max(0, minecraftHunger - 1);
      updateMinecraftStatus("从天际空岛掉回主世界，摔疼了，心和鸡腿都少了一点。");
      if (minecraftHealth <= 0) respawnMinecraftPlayer();
    }
    return true;
  }
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
    updateMinecraftStatus("背包里没有这个物品，先去收集。");
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
      button.textContent = getMinecraftPickaxeName();
    }
    button.classList.toggle("active", minecraftSelectedTool === tool);
  });
  renderMinecraftExtraInventoryUI();
  renderMinecraftBackpack();
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
  pulseMinecraftPlayerAction(minecraftSelectedTool === "diamond_sword" ? "sword" : "mine");
  playMinecraftAnimalSound(animalType);
  delete minecraftAnimalDirections[getMinecraftAnimalKey(x, z)];
  delete minecraftFleeingAnimals[getMinecraftAnimalKey(x, z)];
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

function scareMinecraftSideAnimal(x, z) {
  const animalType = getMinecraftAnimalAt(x, z);
  if (!minecraftAnimalTypes[animalType]) return;
  const key = getMinecraftAnimalKey(x, z);
  if (minecraftFleeingAnimals[key]) {
    hitMinecraftAnimal(x, z);
    return;
  }
  const direction = x >= minecraftPlayerX ? 1 : -1;
  const targetX = x + direction * 14;
  const targetZ = z;
  setMinecraftAnimalAt(x, z, null);
  minecraftFleeingAnimals[getMinecraftAnimalKey(targetX, targetZ)] = animalType;
  minecraftAnimals[getMinecraftAnimalKey(targetX, targetZ)] = animalType;
  minecraftAnimalDirections[getMinecraftAnimalKey(targetX, targetZ)] = direction;
  renderMinecraftWorld();
  updateMinecraftStatus(`${minecraftAnimalTypes[animalType].label}被吓跑了！往${direction > 0 ? "右" : "左"}追过去还能打到。`);
  saveGameState();
}

function getMinecraftAnimalRunDirection(x, z) {
  const key = getMinecraftAnimalKey(x, z);
  if (minecraftAnimalDirections[key] === -1 || minecraftAnimalDirections[key] === 1) return minecraftAnimalDirections[key];
  const direction = Math.abs(x * 13 + z * 7) % 2 === 0 ? 1 : -1;
  minecraftAnimalDirections[key] = direction;
  return direction;
}

function moveMinecraftSideAnimals() {
  if (!minecraftPanelOpen || minecraftDimension !== "overworld" || minecraftDepth !== 0 || minecraftInsideVillageHouse) return false;
  const moves = [];
  const seen = new Set();
  for (let localX = -11; localX <= 10; localX += 1) {
    const x = minecraftPlayerX + localX;
    for (const zOffset of getMinecraftSideZOffsets(4)) {
      const z = minecraftPlayerZ + zOffset;
      const key = getMinecraftAnimalKey(x, z);
      if (seen.has(key) || isMinecraftVillageAreaAt(x, z) || getMinecraftBlockAt(x, z, 0) !== "grass") continue;
      const animalType = getMinecraftAnimalAt(x, z);
      if (!minecraftAnimalTypes[animalType]) continue;
      seen.add(key);
      const direction = getMinecraftAnimalRunDirection(x, z);
      const nextX = x + direction;
      if (isMinecraftVillageAreaAt(nextX, z) || getMinecraftBlockAt(nextX, z, 0) !== "grass") continue;
      moves.push({ x, z, nextX, animalType, direction, fleeing: Boolean(minecraftFleeingAnimals[key]) });
    }
  }
  moves.slice(0, 5).forEach((move) => {
    setMinecraftAnimalAt(move.x, move.z, null);
    delete minecraftAnimalDirections[getMinecraftAnimalKey(move.x, move.z)];
    minecraftAnimals[getMinecraftAnimalKey(move.nextX, move.z)] = move.animalType;
    minecraftAnimalDirections[getMinecraftAnimalKey(move.nextX, move.z)] = move.direction;
    if (move.fleeing) {
      delete minecraftFleeingAnimals[getMinecraftAnimalKey(move.x, move.z)];
      minecraftFleeingAnimals[getMinecraftAnimalKey(move.nextX, move.z)] = move.animalType;
    }
  });
  return moves.length > 0;
}

function stepMinecraftVillagers() {
  if (!minecraftPanelOpen || minecraftDimension !== "overworld" || minecraftDepth !== 0) return;
  Object.keys(minecraftVillagers).forEach((homeKey) => {
    minecraftVillagerSteps[homeKey] = (minecraftVillagerSteps[homeKey] || 0) + 1;
  });
}

function tickMinecraftSideWorld() {
  if (!minecraftPanelOpen) return;
  minecraftDayTick += 1;
  if (minecraftDayTick % MINECRAFT_DAY_NIGHT_SECONDS === 0) {
    minecraftIsNight = !minecraftIsNight;
    if (!minecraftIsNight) {
      minecraftZombies = [];
      minecraftSkeletons = [];
    }
  }
  const movedAnimals = moveMinecraftSideAnimals();
  stepMinecraftVillagers();
  if (movedAnimals || minecraftDimension === "overworld") {
    renderMinecraftWorld();
    if (minecraftDayTick % MINECRAFT_DAY_NIGHT_SECONDS === 0) {
      updateMinecraftStatus(minecraftIsNight ? "太阳落下去了，月亮升起来，僵尸来了。" : "月亮下去了，太阳又升起来。");
    }
    saveGameState();
  }
}

function makeMinecraftAnimalElement(animalType, x, z, options = {}) {
  const animal = minecraftAnimalTypes[animalType];
  if (!animal) return null;
  const animalElement = document.createElement("span");
  animalElement.className = `minecraft-animal minecraft-animal-${animalType}${options.winged ? " minecraft-animal-winged" : ""}`;
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
  if (minecraftDimension === "sky" && !blockType) {
    cell.classList.add("minecraft-sky-air");
  }
  if (blockType === "end_stone" && isMinecraftEndIslandEdgeAt(x, z)) {
    cell.classList.add("minecraft-end-edge");
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
  const canShowPlant = minecraftDimension === "overworld"
    ? blockType === "grass"
    : minecraftDimension === "sky" && blockType === "sky_grass";
  const plantType = canShowPlant && y === 0 ? getMinecraftPlantAt(x, z) : null;
  cell.dataset.plant = plantType || "";
  cell.innerHTML = '<span class="cube-top"></span><span class="cube-left"></span><span class="cube-right"></span>';
  if (plantType) {
    const plant = document.createElement("span");
    plant.className = `minecraft-plant minecraft-plant-${plantType}`;
    plant.textContent = plantType === "wheat-ripe" ? "麦" : plantType === "wheat" ? "芽" : "草";
    cell.appendChild(plant);
  }
  const animalType = minecraftDimension === "overworld" && y === 0 && blockType === "grass"
    ? getMinecraftAnimalAt(x, z)
    : minecraftDimension === "sky" && y === 0 && blockType === "sky_grass"
      ? getMinecraftSkyAnimalAt(x, z)
      : null;
  const animalElement = animalType ? makeMinecraftAnimalElement(animalType, x, z, { winged: minecraftDimension === "sky" }) : null;
  if (animalElement) {
    cell.appendChild(animalElement);
  }
  if (isMinecraftPortalAt(x, z, y)) {
    const portal = document.createElement("span");
    portal.className = "minecraft-portal";
    portal.setAttribute("aria-label", "紫光传送门");
    cell.appendChild(portal);
  }
  if (isMinecraftSkyPortalAt(x, z, y)) {
    const portal = document.createElement("span");
    portal.className = "minecraft-sky-portal";
    portal.setAttribute("aria-label", "蓝光石头门");
    cell.appendChild(portal);
  }
  if (y === 0 && isMinecraftSkyRabbitAt(x, z)) {
    const rabbit = document.createElement("button");
    rabbit.type = "button";
    rabbit.className = "minecraft-sky-rabbit";
    rabbit.setAttribute("aria-label", "天际兔子");
    rabbit.addEventListener("click", (event) => {
      event.stopPropagation();
      minecraftHasSkyRabbit = true;
      renderMinecraftWorld();
      updateMinecraftStatus("抱起了天际兔子，从高处跳下来不会摔疼，饥饿值也会少扣。");
      saveGameState();
    });
    cell.appendChild(rabbit);
  }
  if (y === 0 && isMinecraftWindCloudAt(x, z)) {
    const cloud = document.createElement("button");
    cloud.type = "button";
    cloud.className = "minecraft-wind-cloud";
    cloud.setAttribute("aria-label", "灰土风云");
    cloud.addEventListener("click", (event) => {
      event.stopPropagation();
      minecraftXp += 8;
      minecraftPlayerX += x >= minecraftPlayerX ? -1 : 1;
      renderMinecraftWorld();
      updateMinecraftStatus(`打散灰土风云，获得很多经验。经验 ${minecraftXp}。`);
      saveGameState();
    });
    cell.appendChild(cloud);
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
      handleMinecraftVillagerClick();
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
  if (minecraftDimension !== "overworld" || (minecraftDepth === 0 && isMinecraftStrongholdAreaAt(minecraftPlayerX, minecraftPlayerZ))) {
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
  if (minecraftDimension !== "overworld") return;
  if (minecraftDepth === 0 && isMinecraftStrongholdAreaAt(minecraftPlayerX, minecraftPlayerZ)) {
    minecraftZombies = [];
    return;
  }
  if (!minecraftIsNight || minecraftDepth < 0) return;
  const now = Date.now();
  if (now - minecraftLastZombieStepAt < 950) return;
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

function makeMinecraftXpBar() {
  const level = Math.floor(minecraftXp / 10);
  const progress = minecraftXp % 10;
  const bar = document.createElement("div");
  bar.className = "minecraft-xp-bar";
  bar.innerHTML = `<span>${level}</span><i style="--xp:${progress * 10}%"></i>`;
  return bar;
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

function angerMinecraftIronGolem() {
  minecraftGolemAngryUntil = Date.now() + 8000;
  minecraftHealth = Math.max(0, minecraftHealth - 3);
  renderMinecraftWorld();
  updateMinecraftStatus("你打了村民！三格高的铁傀儡冲过来保护村民，打了你一下。");
  if (minecraftHealth <= 0) respawnMinecraftPlayer();
  saveGameState();
}

function handleMinecraftVillagerClick() {
  playMinecraftAnimalSound("villager");
  if (minecraftSelectedTool === "diamond_sword") {
    angerMinecraftIronGolem();
    return;
  }
  tradeWithMinecraftVillager();
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

const minecraftCraftingMaterials = [
  "",
  "wood",
  "oak_planks",
  "stone",
  "coal",
  "stick",
  "iron",
  "diamond",
  "bedrock_shard",
  "meteor_dust",
  "ender_pearl",
  "string",
  "flint",
  "redstone",
  "gold",
  "carrot",
  "pumpkin",
  "egg",
  "sugar"
];
const minecraftCraftingLabels = {
  wood: "木",
  oak_planks: "木板",
  stone: "石",
  coal: "煤",
  stick: "棍",
  iron: "铁",
  diamond: "钻",
  bedrock_shard: "基",
  string: "线",
  flint: "燧",
  redstone: "红",
  gold: "金",
  carrot: "胡",
  pumpkin: "瓜",
  egg: "蛋",
  sugar: "糖"
};

const minecraftCraftingIcons = {
  wood: "木",
  oak_planks: "板",
  stone: "石",
  coal: "煤",
  stick: "棍",
  iron: "铁",
  diamond: "钻",
  bedrock_shard: "基",
  string: "线",
  flint: "燧",
  redstone: "红",
  gold: "金",
  carrot: "胡",
  pumpkin: "瓜",
  egg: "蛋",
  sugar: "糖"
};

minecraftCraftingIcons.meteor_dust = "银粉";
minecraftCraftingIcons.ender_pearl = "珍";

const minecraftInventoryIcons = {
  grass: "草",
  dirt: "土",
  stone: "石",
  sand: "沙",
  cactus: "掌",
  wood: "木",
  oak_planks: "板",
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
  diamond: "钻",
  bedrock_shard: "基",
  emerald: "绿",
  meat: "肉",
  wool: "毛",
  seeds: "种",
  wheat: "麦",
  xp: "星"
};
const minecraftCraftingPlaceableMaterials = new Set(["wood", "stone", "coal", "stick", "iron", "diamond", "bedrock_shard"]);
const minecraftRecipeInventoryTypes = [
  "oak_planks",
  "chest",
  "furnace",
  "ladder",
  "diamond_helmet",
  "diamond_chestplate",
  "diamond_leggings",
  "diamond_boots",
  "wood_axe",
  "stone_shovel",
  "iron_hoe",
  "fishing_rod",
  "flint_and_steel",
  "compass",
  "clock",
  "shears",
  "golden_carrot",
  "pumpkin_pie",
  "string",
  "flint",
  "redstone",
  "gold",
  "carrot",
  "pumpkin",
  "egg",
  "sugar"
];
const minecraftShapedRecipes = [
  { recipe: "oak_planks", label: "木板", icon: "板", count: 4, shape: ["", "", "", "", "wood", "", "", "", ""] },
  { recipe: "sticks", label: "木棍", icon: "棍", count: 4, shape: ["", "", "", "", "oak_planks", "", "", "oak_planks", ""] },
  { recipe: "torch", label: "火把", icon: "火", count: 4, shape: ["", "coal", "", "", "stick", "", "", "", ""] },
  { recipe: "crafting_table", label: "工作台", icon: "台", count: 1, shape: ["oak_planks", "oak_planks", "", "oak_planks", "oak_planks", "", "", "", ""] },
  { recipe: "furnace", label: "熔炉", icon: "炉", count: 1, shape: ["stone", "stone", "stone", "stone", "", "stone", "stone", "stone", "stone"] },
  { recipe: "chest", label: "箱子", icon: "箱", count: 1, shape: ["oak_planks", "oak_planks", "oak_planks", "oak_planks", "", "oak_planks", "oak_planks", "oak_planks", "oak_planks"] },
  { recipe: "ladder", label: "梯子", icon: "梯", count: 3, shape: ["stick", "", "stick", "stick", "stick", "stick", "stick", "", "stick"] },
  { recipe: "diamond_helmet", label: "钻石头盔", icon: "盔", count: 1, shape: ["diamond", "diamond", "diamond", "diamond", "", "diamond", "", "", ""] },
  { recipe: "diamond_chestplate", label: "钻石胸甲", icon: "甲", count: 1, shape: ["diamond", "", "diamond", "diamond", "diamond", "diamond", "diamond", "diamond", "diamond"] },
  { recipe: "diamond_leggings", label: "钻石护腿", icon: "腿", count: 1, shape: ["diamond", "diamond", "diamond", "diamond", "", "diamond", "diamond", "", "diamond"] },
  { recipe: "diamond_boots", label: "钻石靴子", icon: "靴", count: 1, shape: ["", "", "", "diamond", "", "diamond", "diamond", "", "diamond"] },
  { recipe: "wood_axe", label: "木斧", icon: "斧", count: 1, shape: ["oak_planks", "oak_planks", "", "oak_planks", "stick", "", "", "stick", ""] },
  { recipe: "stone_shovel", label: "石铲", icon: "铲", count: 1, shape: ["", "stone", "", "", "stick", "", "", "stick", ""] },
  { recipe: "iron_hoe", label: "铁锄", icon: "锄", count: 1, shape: ["iron", "iron", "", "", "stick", "", "", "stick", ""] },
  { recipe: "fishing_rod", label: "钓鱼竿", icon: "竿", count: 1, shape: ["", "", "stick", "", "stick", "string", "stick", "", "string"] },
  { recipe: "flint_and_steel", label: "打火石", icon: "火石", count: 1, shape: ["", "iron", "", "flint", "", "", "", "", ""] },
  { recipe: "compass", label: "指南针", icon: "针", count: 1, shape: ["", "iron", "", "iron", "redstone", "iron", "", "iron", ""] },
  { recipe: "clock", label: "钟", icon: "钟", count: 1, shape: ["", "gold", "", "gold", "redstone", "gold", "", "gold", ""] },
  { recipe: "bucket", label: "铁桶", icon: "桶", count: 1, shape: ["", "", "", "iron", "", "iron", "", "iron", ""] },
  { recipe: "shears", label: "剪刀", icon: "剪", count: 1, shape: ["", "iron", "", "", "", "iron", "", "", ""] },
  { recipe: "golden_carrot", label: "金胡萝卜", icon: "金胡", count: 1, shape: ["gold", "gold", "gold", "gold", "carrot", "gold", "gold", "gold", "gold"] },
  { recipe: "pumpkin_pie", label: "南瓜派", icon: "派", count: 1, shape: ["pumpkin", "sugar", "", "egg", "", "", "", "", ""] }
];
const minecraftPocketRecipes = [
  { recipe: "oak_planks", label: "木板", icon: "板", count: 4, shape: ["", "wood", "", ""] },
  { recipe: "sticks", label: "木棍", icon: "棍", count: 4, shape: ["oak_planks", "", "oak_planks", ""] },
  { recipe: "torch", label: "火把", icon: "火", count: 4, shape: ["coal", "", "stick", ""] },
  { recipe: "crafting_table", label: "工作台", icon: "台", count: 1, shape: ["oak_planks", "oak_planks", "oak_planks", "oak_planks"] }
];
minecraftInventoryIcons.meteor = "银";
minecraftInventoryIcons.meteor_dust = "银粉";
minecraftInventoryIcons.ender_pearl = "珍";
minecraftInventoryIcons.ender_eye = "眼";
minecraftInventoryIcons.diamond_sword = "剑";
minecraftInventoryIcons.wood_pickaxe = "木镐";
minecraftInventoryIcons.stone_pickaxe = "石镐";
minecraftInventoryIcons.iron_pickaxe = "铁镐";
minecraftInventoryIcons.diamond_pickaxe = "钻镐";
minecraftInventoryIcons.bedrock_pickaxe = "基镐";
minecraftInventoryIcons.chest = "箱";
minecraftInventoryIcons.furnace = "炉";
minecraftInventoryIcons.ladder = "梯";
minecraftInventoryIcons.diamond_helmet = "盔";
minecraftInventoryIcons.diamond_chestplate = "甲";
minecraftInventoryIcons.diamond_leggings = "腿";
minecraftInventoryIcons.diamond_boots = "靴";
minecraftInventoryIcons.wood_axe = "木斧";
minecraftInventoryIcons.stone_shovel = "石铲";
minecraftInventoryIcons.iron_hoe = "铁锄";
minecraftInventoryIcons.fishing_rod = "竿";
minecraftInventoryIcons.flint_and_steel = "火石";
minecraftInventoryIcons.compass = "针";
minecraftInventoryIcons.clock = "钟";
minecraftInventoryIcons.shears = "剪";
minecraftInventoryIcons.golden_carrot = "金胡";
minecraftInventoryIcons.pumpkin_pie = "派";
minecraftCraftingPlaceableMaterials.add("meteor_dust");
minecraftCraftingPlaceableMaterials.add("ender_pearl");
minecraftCraftingPlaceableMaterials.add("oak_planks");
minecraftCraftingMaterials.forEach((material) => {
  if (material) minecraftCraftingPlaceableMaterials.add(material);
});

function getMinecraftCraftingMaterialCount(material) {
  if (material === "wood") return minecraftInventory.wood || 0;
  if (material === "oak_planks") return minecraftInventory.oak_planks || 0;
  if (material === "stone") return minecraftInventory.stone || 0;
  if (material === "coal") return minecraftCoal;
  if (material === "stick") return minecraftSticks;
  if (material === "iron") return minecraftIron;
  if (material === "diamond") return minecraftDiamond;
  if (material === "bedrock_shard") return minecraftBedrockShard;
  if (material === "meteor_dust") return minecraftMeteorDust;
  if (material === "ender_pearl") return minecraftEnderPearls;
  return minecraftInventory[material] || 0;
}

function matchMinecraftShapedRecipe(recipe) {
  return recipe.shape.every((material, index) => (minecraftCraftingSlots[index] || "") === material);
}

function getMatchedMinecraftShapedRecipe() {
  return minecraftShapedRecipes.find((recipe) => matchMinecraftShapedRecipe(recipe)) || null;
}

function addMinecraftCraftedItem(recipe, count) {
  if (recipe === "sticks") {
    minecraftSticks += count;
    return;
  }
  if (recipe === "bucket") {
    minecraftBuckets += count;
    return;
  }
  if (recipe === "ender_eye") {
    minecraftEnderEyes += count;
    return;
  }
  minecraftInventory[recipe] = (minecraftInventory[recipe] || 0) + count;
}

function getMinecraftPickaxeLevel() {
  if (minecraftPickaxes.bedrock > 0) return 5;
  if (minecraftPickaxes.diamond > 0) return 4;
  if (minecraftPickaxes.iron > 0) return 3;
  if (minecraftPickaxes.stone > 0) return 2;
  if (minecraftPickaxes.wood > 0) return 1;
  return 0;
}

function canMineMinecraftBlock(blockType) {
  const level = getMinecraftPickaxeLevel();
  if (!blockType) return false;
  if (blockType === "crafting_table" || blockType === "bed") return true;
  if (blockType === "wood" || blockType === "leaves") return true;
  if (blockType === "grass" || blockType === "dirt" || blockType === "sand" || blockType === "cactus") return true;
  if (blockType === "stone" || blockType === "coal_ore") return level >= 1;
  if (blockType === "iron_ore") return level >= 2;
  if (blockType === "diamond_ore") return level >= 3;
  if (blockType === "bedrock_ore") return level >= 4;
  return level >= 1;
}

function getMinecraftPickaxeName() {
  return ["手", "木稿", "石稿", "铁稿", "钻石稿", "基岩稿"][getMinecraftPickaxeLevel()] || "手";
}

function getMinecraftWorkbenchInventoryItems() {
  ensureMinecraftInventory();
  const items = Object.keys(minecraftBlockTypes).map((type) => ({
    id: type,
    material: type,
    count: minecraftInventory[type] || 0
  }));
  items.push(
    ...minecraftRecipeInventoryTypes.map((type) => ({ id: type, material: type, count: getMinecraftInventoryItemCount(type) })),
    { id: "coal", material: "coal", count: minecraftCoal },
    { id: "stick", material: "stick", count: minecraftSticks },
    { id: "iron", material: "iron", count: minecraftIron },
    { id: "diamond", material: "diamond", count: minecraftDiamond },
    { id: "bedrock_shard", material: "bedrock_shard", count: minecraftBedrockShard },
    { id: "wood_pickaxe", material: "wood_pickaxe", count: minecraftPickaxes.wood || 0 },
    { id: "stone_pickaxe", material: "stone_pickaxe", count: minecraftPickaxes.stone || 0 },
    { id: "iron_pickaxe", material: "iron_pickaxe", count: minecraftPickaxes.iron || 0 },
    { id: "diamond_pickaxe", material: "diamond_pickaxe", count: minecraftPickaxes.diamond || 0 },
    { id: "bedrock_pickaxe", material: "bedrock_pickaxe", count: minecraftPickaxes.bedrock || 0 },
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

function getMinecraftInventoryItemCount(type) {
  if (type === "bucket") return minecraftBuckets;
  if (type === "water_bucket") return minecraftWaterBuckets;
  if (type === "lava_bucket") return minecraftLavaBuckets;
  if (type === "coal") return minecraftCoal;
  if (type === "stick") return minecraftSticks;
  if (type === "iron") return minecraftIron;
  if (type === "diamond") return minecraftDiamond;
  if (type === "bedrock_shard") return minecraftBedrockShard;
  if (type === "emerald") return minecraftEmerald;
  if (type === "meteor_dust") return minecraftMeteorDust;
  if (type === "ender_pearl") return minecraftEnderPearls;
  if (type === "ender_eye") return minecraftEnderEyes;
  if (type === "meat") return minecraftMeat;
  if (type === "wool") return minecraftWool;
  if (type === "seeds") return minecraftSeeds;
  if (type === "wheat") return minecraftWheat;
  if (type === "xp") return minecraftXp;
  if (type === "wood_pickaxe") return minecraftPickaxes.wood || 0;
  if (type === "stone_pickaxe") return minecraftPickaxes.stone || 0;
  if (type === "iron_pickaxe") return minecraftPickaxes.iron || 0;
  if (type === "diamond_pickaxe") return minecraftPickaxes.diamond || 0;
  if (type === "bedrock_pickaxe") return minecraftPickaxes.bedrock || 0;
  return minecraftInventory[type] || 0;
}

function getMinecraftToolForInventoryItem(type) {
  const pickaxeTools = new Set(["wood_pickaxe", "stone_pickaxe", "iron_pickaxe", "diamond_pickaxe", "bedrock_pickaxe"]);
  if (pickaxeTools.has(type)) return "pickaxe";
  if (isMinecraftSelectableTool(type)) return type;
  return "";
}

function getMinecraftActivePickaxeHotbarItem() {
  if (minecraftPickaxes.bedrock > 0) return { type: "bedrock_pickaxe", tool: "pickaxe", count: minecraftPickaxes.bedrock };
  if (minecraftPickaxes.diamond > 0) return { type: "diamond_pickaxe", tool: "pickaxe", count: minecraftPickaxes.diamond };
  if (minecraftPickaxes.iron > 0) return { type: "iron_pickaxe", tool: "pickaxe", count: minecraftPickaxes.iron };
  if (minecraftPickaxes.stone > 0) return { type: "stone_pickaxe", tool: "pickaxe", count: minecraftPickaxes.stone };
  if (minecraftPickaxes.wood > 0) return { type: "wood_pickaxe", tool: "pickaxe", count: minecraftPickaxes.wood };
  return { type: "hand", tool: "pickaxe", count: 0 };
}

function setMinecraftCraftingStatus(message) {
  if (minecraftCraftingStatus) minecraftCraftingStatus.textContent = message;
}

function getMinecraftCraftingOutput() {
  const shapedRecipe = getMatchedMinecraftShapedRecipe();
  if (shapedRecipe) {
    return {
      recipe: shapedRecipe.recipe,
      label: shapedRecipe.label,
      icon: shapedRecipe.icon,
      count: shapedRecipe.count,
      materials: shapedRecipe.shape.filter(Boolean)
    };
  }
  const filled = minecraftCraftingSlots.filter(Boolean).length;
  const pickaxeMaterials = [
    { material: "wood", recipe: "wood_pickaxe", label: "木稿", icon: "木镐" },
    { material: "stone", recipe: "stone_pickaxe", label: "石稿", icon: "石镐" },
    { material: "iron", recipe: "iron_pickaxe", label: "铁稿", icon: "铁镐" },
    { material: "diamond", recipe: "diamond_pickaxe", label: "钻石稿", icon: "钻镐" },
    { material: "bedrock_shard", recipe: "bedrock_pickaxe", label: "基岩稿", icon: "基镐" }
  ];
  const pickaxe = pickaxeMaterials.find((entry) => minecraftCraftingSlots[0] === entry.material
    && minecraftCraftingSlots[1] === entry.material
    && minecraftCraftingSlots[2] === entry.material
    && minecraftCraftingSlots[4] === "stick"
    && minecraftCraftingSlots[7] === "stick"
    && filled === 5);
  if (pickaxe) return { recipe: pickaxe.recipe, label: pickaxe.label, icon: pickaxe.icon, count: 1 };
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
    return { recipe: "meteor", label: "银石", icon: "银", count: 1 };
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
    else if (material === "oak_planks") minecraftInventory.oak_planks = Math.max(0, (minecraftInventory.oak_planks || 0) - 1);
    else if (material === "stone") minecraftInventory.stone = Math.max(0, (minecraftInventory.stone || 0) - 1);
    else if (material === "coal") minecraftCoal = Math.max(0, minecraftCoal - 1);
    else if (material === "stick") minecraftSticks = Math.max(0, minecraftSticks - 1);
    else if (material === "iron") minecraftIron = Math.max(0, minecraftIron - 1);
    else if (material === "diamond") minecraftDiamond = Math.max(0, minecraftDiamond - 1);
    else if (material === "bedrock_shard") minecraftBedrockShard = Math.max(0, minecraftBedrockShard - 1);
    else if (material === "meteor_dust") minecraftMeteorDust = Math.max(0, minecraftMeteorDust - 1);
    else if (material === "ender_pearl") minecraftEnderPearls = Math.max(0, minecraftEnderPearls - 1);
    else minecraftInventory[material] = Math.max(0, (minecraftInventory[material] || 0) - 1);
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
  const shapedRecipe = getMatchedMinecraftShapedRecipe();
  if (shapedRecipe && (!recipe || recipe === shapedRecipe.recipe)) {
    const materials = shapedRecipe.shape.filter(Boolean);
    if (!canSpendMinecraftCraftingMaterials(materials)) {
      setMinecraftCraftingStatus(`${shapedRecipe.label}材料不够。`);
      return;
    }
    spendMinecraftCraftingMaterials(materials);
    addMinecraftCraftedItem(shapedRecipe.recipe, shapedRecipe.count);
    minecraftCraftingSlots = Array(9).fill("");
    renderMinecraftCraftingTable();
    renderMinecraftWorld();
    setMinecraftCraftingStatus(`合成了 ${shapedRecipe.count} 个${shapedRecipe.label}。`);
    saveGameState();
    return;
  }
  const pickaxeRecipes = {
    wood_pickaxe: { material: "wood", key: "wood", label: "木稿" },
    stone_pickaxe: { material: "stone", key: "stone", label: "石稿" },
    iron_pickaxe: { material: "iron", key: "iron", label: "铁稿" },
    diamond_pickaxe: { material: "diamond", key: "diamond", label: "钻石稿" },
    bedrock_pickaxe: { material: "bedrock_shard", key: "bedrock", label: "基岩稿" }
  };
  const pickaxeRecipe = pickaxeRecipes[recipe || getMinecraftCraftingOutput()?.recipe || ""];
  if (pickaxeRecipe
    && minecraftCraftingSlots[0] === pickaxeRecipe.material
    && minecraftCraftingSlots[1] === pickaxeRecipe.material
    && minecraftCraftingSlots[2] === pickaxeRecipe.material
    && minecraftCraftingSlots[4] === "stick"
    && minecraftCraftingSlots[7] === "stick"
    && minecraftCraftingSlots.filter(Boolean).length === 5) {
    spendMinecraftCraftingMaterials([pickaxeRecipe.material, pickaxeRecipe.material, pickaxeRecipe.material, "stick", "stick"]);
    minecraftPickaxes[pickaxeRecipe.key] = (minecraftPickaxes[pickaxeRecipe.key] || 0) + 1;
    minecraftCraftingSlots = Array(9).fill("");
    renderMinecraftCraftingTable();
    renderMinecraftWorld();
    setMinecraftCraftingStatus(`合成了 1 把${pickaxeRecipe.label}。`);
    saveGameState();
    return;
  }
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
    setMinecraftCraftingStatus("4 个银石粉合成了 1 个银石。");
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

function makeMinecraftSideMeter(className, count, total) {
  const meter = document.createElement("div");
  meter.className = className;
  for (let index = 0; index < total; index += 1) {
    const icon = document.createElement("span");
    icon.className = index < count ? "filled" : "empty";
    meter.appendChild(icon);
  }
  return meter;
}

function getOwnedMinecraftHotbarItems() {
  const preferred = [
    "diamond_sword",
    getMinecraftActivePickaxeHotbarItem().type,
    "grass",
    "dirt",
    "sand",
    "stone",
    "wood",
    "leaves",
    "cactus",
    "torch",
    "bow"
  ];
  const seen = new Set();
  const items = [];
  preferred.forEach((type) => {
    if (!type || seen.has(type)) return;
    const count = getMinecraftInventoryItemCount(type);
    if (count <= 0) return;
    seen.add(type);
    items.push({ type, count });
  });
  getMinecraftWorkbenchInventoryItems().forEach((item) => {
    const type = item.type || item.material || item.id;
    if (!type || seen.has(type) || items.length >= 8) return;
    if ((item.count || 0) <= 0) return;
    seen.add(type);
    items.push({ type, count: item.count });
  });
  return items.slice(0, 8);
}

function getMinecraftHeldItemType() {
  if (minecraftSelectedTool === "pickaxe") {
    const pickaxe = getMinecraftActivePickaxeHotbarItem();
    return pickaxe.count > 0 ? pickaxe.type : "";
  }
  return getMinecraftInventoryItemCount(minecraftSelectedTool) > 0 ? minecraftSelectedTool : "";
}

function matchMinecraftPocketRecipe(recipe) {
  return recipe.shape.every((material, index) => (minecraftPocketCraftingSlots[index] || "") === material);
}

function getMatchedMinecraftPocketRecipe() {
  return minecraftPocketRecipes.find((recipe) => matchMinecraftPocketRecipe(recipe)) || null;
}

function addMinecraftPocketMaterial(material) {
  const alreadyPlaced = minecraftPocketCraftingSlots.filter((slot) => slot === material).length;
  if (getMinecraftCraftingMaterialCount(material) <= alreadyPlaced) {
    updateMinecraftStatus("这个材料已经都摆上去了。");
    return;
  }
  const emptyIndex = minecraftPocketCraftingSlots.findIndex((slot) => !slot);
  if (emptyIndex < 0) {
    updateMinecraftStatus("随身合成格放满了，点一个格子先拿下来。");
    return;
  }
  minecraftPocketCraftingSlots[emptyIndex] = material;
  renderMinecraftPocketCrafting();
}

function renderMinecraftPocketCrafting() {
  if (!minecraftPocketCraftingGrid || !minecraftPocketCraftingOutput) return;
  minecraftPocketCraftingGrid.innerHTML = "";
  minecraftPocketCraftingSlots.forEach((material, index) => {
    const slot = document.createElement("button");
    slot.type = "button";
    slot.className = `minecraft-pocket-crafting-slot${material ? ` item-${material}` : ""}`;
    slot.textContent = material ? (minecraftInventoryIcons[material] || minecraftCraftingIcons[material] || material) : "";
    slot.addEventListener("click", () => {
      minecraftPocketCraftingSlots[index] = "";
      renderMinecraftPocketCrafting();
    });
    minecraftPocketCraftingGrid.appendChild(slot);
  });
  const recipe = getMatchedMinecraftPocketRecipe();
  minecraftPocketCraftingOutput.disabled = !recipe;
  minecraftPocketCraftingOutput.dataset.recipe = recipe?.recipe || "";
  minecraftPocketCraftingOutput.className = `minecraft-pocket-crafting-output${recipe ? ` item-${recipe.recipe}` : ""}`;
  minecraftPocketCraftingOutput.innerHTML = recipe ? `<strong>${recipe.icon}</strong><span>${recipe.count}</span>` : "";
}

function craftMinecraftPocketRecipe() {
  const recipe = getMatchedMinecraftPocketRecipe();
  if (!recipe) return;
  const materials = recipe.shape.filter(Boolean);
  if (!canSpendMinecraftCraftingMaterials(materials)) {
    updateMinecraftStatus(`${recipe.label}材料不够。`);
    return;
  }
  spendMinecraftCraftingMaterials(materials);
  addMinecraftCraftedItem(recipe.recipe, recipe.count);
  minecraftPocketCraftingSlots = Array(4).fill("");
  renderMinecraftBackpack();
  renderMinecraftWorld();
  updateMinecraftStatus(`随身合成了 ${recipe.count} 个${recipe.label}。`);
  saveGameState();
}

function syncMinecraftBackpackSlotOrder(items) {
  const availableTypes = new Set(items.map((item) => item.type || item.material || item.id).filter(Boolean));
  minecraftBackpackSlotOrder = minecraftBackpackSlotOrder.filter((type) => availableTypes.has(type));
  items.forEach((item) => {
    const type = item.type || item.material || item.id;
    if (type && !minecraftBackpackSlotOrder.includes(type)) minecraftBackpackSlotOrder.push(type);
  });
  if (minecraftBackpackHeldItem && !availableTypes.has(minecraftBackpackHeldItem.type)) {
    minecraftBackpackHeldItem = null;
  }
}

function swapMinecraftBackpackItems(fromIndex, toIndex) {
  const fromType = minecraftBackpackSlotOrder[fromIndex] || "";
  const toType = minecraftBackpackSlotOrder[toIndex] || "";
  minecraftBackpackSlotOrder[fromIndex] = toType;
  minecraftBackpackSlotOrder[toIndex] = fromType;
  minecraftBackpackSlotOrder = minecraftBackpackSlotOrder.filter(Boolean);
}

function handleMinecraftBackpackSlotPick(index) {
  const type = minecraftBackpackSlotOrder[index] || "";
  if (!minecraftBackpackHeldItem) {
    if (!type) return;
    minecraftBackpackHeldItem = { index, type };
    updateMinecraftStatus(`拿起了${minecraftInventoryIcons[type] || minecraftCraftingIcons[type] || type}，再点一个格子移动或交换。`);
    renderMinecraftBackpack();
    return;
  }
  if (minecraftBackpackHeldItem.index === index) {
    minecraftBackpackHeldItem = null;
    renderMinecraftBackpack();
    return;
  }
  swapMinecraftBackpackItems(minecraftBackpackHeldItem.index, index);
  minecraftBackpackHeldItem = null;
  renderMinecraftBackpack();
  saveGameState();
}

function renderMinecraftBackpack() {
  if (!minecraftBackpackPanel || !minecraftBackpackGrid) return;
  minecraftBackpackPanel.hidden = !minecraftBackpackOpen;
  minecraftBackpackGrid.innerHTML = "";
  if (minecraftBackpackHotbar) minecraftBackpackHotbar.innerHTML = "";
  renderMinecraftPocketCrafting();
  const items = getMinecraftWorkbenchInventoryItems();
  syncMinecraftBackpackSlotOrder(items);
  const itemByType = new Map(items.map((item) => [item.type || item.material || item.id, item]));
  const slotCount = Math.max(18, Math.ceil((minecraftBackpackSlotOrder.length + 1) / 9) * 9);
  for (let index = 0; index < slotCount; index += 1) {
    const type = minecraftBackpackSlotOrder[index] || "";
    const item = itemByType.get(type);
    const tool = getMinecraftToolForInventoryItem(type);
    const slot = document.createElement("button");
    slot.type = "button";
    slot.className = `minecraft-side-backpack-slot${type ? ` item-${type}` : " empty"}`;
    if (minecraftBackpackHeldItem?.index === index) slot.classList.add("minecraft-backpack-slot-picked");
    if (tool) slot.dataset.minecraftTool = tool;
    const label = type ? (minecraftInventoryIcons[type] || minecraftCraftingIcons[type] || type) : "空格";
    slot.setAttribute("aria-label", type ? `${label} ${item?.count || 0}` : "空背包格");
    slot.innerHTML = type ? `<strong>${label}</strong><span>${item?.count || 0}</span>` : "";
    slot.addEventListener("click", () => handleMinecraftBackpackSlotPick(index));
    slot.addEventListener("dblclick", () => {
      if (type && minecraftCraftingPlaceableMaterials.has(type)) addMinecraftPocketMaterial(type);
    });
    minecraftBackpackGrid.appendChild(slot);
  }
  if (minecraftBackpackHeldItem) {
    const heldPreview = document.createElement("div");
    heldPreview.className = `minecraft-backpack-held-item item-${minecraftBackpackHeldItem.type}`;
    heldPreview.textContent = minecraftInventoryIcons[minecraftBackpackHeldItem.type] || minecraftCraftingIcons[minecraftBackpackHeldItem.type] || minecraftBackpackHeldItem.type;
    minecraftBackpackGrid.appendChild(heldPreview);
  }
  getOwnedMinecraftHotbarItems().forEach((item) => {
    if (!minecraftBackpackHotbar) return;
    const slot = document.createElement("span");
    slot.className = `minecraft-side-hotbar-slot hotbar-${item.type}`;
    const count = document.createElement("span");
    count.textContent = `${item.count}`;
    slot.appendChild(count);
    minecraftBackpackHotbar.appendChild(slot);
  });
}

function makeMinecraftSideHud() {
  const hud = document.createElement("div");
  hud.className = "minecraft-side-hud";
  const top = document.createElement("div");
  top.className = "minecraft-side-hud-top";
  top.append(
    makeMinecraftSideMeter("minecraft-side-hearts", minecraftHealth, 10),
    makeMinecraftSideMeter("minecraft-side-energy minecraft-side-hunger", minecraftHunger, 10)
  );
  const xp = makeMinecraftXpBar();
  xp.classList.add("minecraft-side-xp");
  const hotbarWrap = document.createElement("div");
  hotbarWrap.className = "minecraft-side-hotbar-wrap";
  const hotbar = document.createElement("div");
  hotbar.className = "minecraft-side-hotbar";
  getOwnedMinecraftHotbarItems().forEach((item) => {
    const slot = document.createElement("button");
    slot.type = "button";
    const tool = item.tool || getMinecraftToolForInventoryItem(item.type);
    slot.className = `minecraft-side-hotbar-slot hotbar-${item.type}`;
    if ((tool === minecraftSelectedTool) || (item.type === minecraftSelectedTool)) {
      slot.classList.add("selected");
    }
    slot.dataset.minecraftTool = tool;
    slot.setAttribute("aria-label", item.type);
    if (item.count > 0) {
      const count = document.createElement("span");
      count.textContent = `${item.count}`;
      slot.appendChild(count);
    }
    slot.addEventListener("click", () => {
      if (slot.dataset.minecraftTool) setMinecraftTool(slot.dataset.minecraftTool);
    });
    hotbar.appendChild(slot);
  });
  const backpack = document.createElement("button");
  backpack.type = "button";
  backpack.className = "minecraft-side-backpack-toggle";
  backpack.setAttribute("aria-label", "打开背包");
  backpack.textContent = "•••";
  backpack.addEventListener("click", () => {
    minecraftBackpackOpen = !minecraftBackpackOpen;
    renderMinecraftBackpack();
  });
  hotbarWrap.append(hotbar, backpack);
  hud.append(top, xp, hotbarWrap);
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
      if (minecraftDimension === "sky") cell.classList.add("sky");
      if (minecraftDimension === "nether" && isMinecraftWarpedForestAt(worldX, worldZ)) cell.classList.add("warped");
      if (minecraftDimension === "nether" && isMinecraftBastionAt(worldX, worldZ)) cell.classList.add("bastion");
      if (minecraftDimension === "nether" && isMinecraftNetherLavaPoolAt(worldX, worldZ)) cell.classList.add("lava");
      if (minecraftDimension === "nether" && isMinecraftPortalNearMapPoint(worldX, worldZ)) cell.classList.add("portal");
      if (minecraftDimension === "overworld" && isMinecraftRiverAt(worldX, worldZ)) cell.classList.add("river");
      if (minecraftDimension === "overworld" && isMinecraftVillageAreaAt(worldX, worldZ)) cell.classList.add("village");
      if (minecraftDimension === "overworld" && isMinecraftPortalNearMapPoint(worldX, worldZ)) cell.classList.add("overworld-portal");
      if (minecraftDimension === "overworld" && isMinecraftStrongholdPortalNearMapPoint(worldX, worldZ)) cell.classList.add("end-portal-map");
      if ((minecraftDimension === "overworld" || minecraftDimension === "sky") && isMinecraftSkyPortalNearMapPoint(worldX, worldZ)) cell.classList.add("sky-portal");
      if (minecraftDimension === "nether" && Math.abs(worldX) <= 5 && Math.abs(worldZ) <= 5) cell.classList.add("portal");
      if (minecraftDimension === "end" && isMinecraftEndGatewayAt(worldX, worldZ)) cell.classList.add("portal");
      if (minecraftDimension === "end" && isMinecraftEndReturnPortalNearMapPoint(worldX, worldZ)) cell.classList.add("return-portal");
      if (minecraftDimension === "sky" && isMinecraftSkyBridgeAt(worldX, worldZ)) cell.classList.add("sky-bridge");
      if (mapX === playerMapX && mapZ === playerMapZ) cell.classList.add("player");
      minecraftMap.appendChild(cell);
    }
  }
  minecraftMap.style.setProperty("--map-size", `${mapSize}`);
  minecraftMap.dataset.coords = `你在 X${minecraftPlayerX} Z${minecraftPlayerZ}`;
}

function makeMinecraftSideSky() {
  const sky = document.createElement("div");
  sky.className = `minecraft-side-sky${minecraftIsNight ? " night" : " day"}`;
  const skyCycleMs = MINECRAFT_DAY_NIGHT_SECONDS * 1000;
  const skyTime = Date.now();
  const phase = (skyTime % skyCycleMs) / skyCycleMs;
  const skyDelay = `-${skyTime % skyCycleMs}ms`;
  const sun = document.createElement("span");
  sun.className = "minecraft-side-sun";
  sun.style.setProperty("--sky-x", `${8 + phase * 82}%`);
  sun.style.setProperty("--sky-y", `${14 + Math.sin(phase * Math.PI) * 31}%`);
  sun.style.setProperty("--sky-duration", `${MINECRAFT_DAY_NIGHT_SECONDS}s`);
  sun.style.setProperty("--sky-delay", skyDelay);
  sun.setAttribute("aria-label", "太阳公公");
  const moon = document.createElement("span");
  moon.className = "minecraft-side-moon";
  moon.style.setProperty("--sky-x", `${8 + phase * 82}%`);
  moon.style.setProperty("--sky-y", `${16 + Math.sin(phase * Math.PI) * 28}%`);
  moon.style.setProperty("--sky-duration", `${MINECRAFT_DAY_NIGHT_SECONDS}s`);
  moon.style.setProperty("--sky-delay", skyDelay);
  moon.setAttribute("aria-label", "月亮公公");
  sky.append(sun, moon, makeMinecraftSideClouds());
  return sky;
}

function makeMinecraftSideClouds() {
  const clouds = document.createElement("div");
  clouds.className = "minecraft-side-clouds";
  const cloudTime = Date.now();
  for (let index = 0; index < 5; index += 1) {
    const cloud = document.createElement("span");
    cloud.className = `minecraft-side-cloud minecraft-side-cloud-${index + 1}`;
    const durationMs = [22000, 17000, 25000, 16000, 20000][index];
    const offsetMs = [0, 7000, 13000, 5000, 11000][index];
    cloud.style.setProperty("--cloud-delay", `-${(cloudTime + offsetMs) % durationMs}ms`);
    clouds.appendChild(cloud);
  }
  return clouds;
}

function makeMinecraftSideTree(treeInfo) {
  const tree = document.createElement("span");
  tree.className = "minecraft-side-tree";
  tree.style.setProperty("--tree-left", `${50 + treeInfo.localX * 5.5556}%`);
  for (let y = 1; y <= 3; y += 1) {
    const trunk = document.createElement("button");
    trunk.type = "button";
    trunk.className = `minecraft-side-tree-trunk-block trunk-${y}`;
    trunk.dataset.x = `${treeInfo.x}`;
    trunk.dataset.z = `${treeInfo.z}`;
    trunk.dataset.y = `${y}`;
    trunk.setAttribute("aria-label", `树干 ${y}`);
    trunk.addEventListener("click", () => mineMinecraftBlock(trunk));
    trunk.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      mineMinecraftBlock(trunk);
    });
    tree.appendChild(trunk);
  }
  tree.insertAdjacentHTML("beforeend", '<span class="minecraft-side-tree-leaves leaf-a"></span><span class="minecraft-side-tree-leaves leaf-b"></span><span class="minecraft-side-tree-leaves leaf-c"></span><span class="minecraft-side-tree-leaves leaf-d"></span>');
  return tree;
}

function makeMinecraftSidePlayer(animateLanding = false) {
  const player = document.createElement("span");
  const actionClass = Date.now() < minecraftPlayerActionPulse.until ? ` minecraft-side-player-${minecraftPlayerActionPulse.type}` : "";
  player.className = `minecraft-side-player${animateLanding ? " minecraft-side-player-land" : ""}${actionClass}`;
  player.setAttribute("aria-label", "史蒂夫，玩家");
  const heldItem = getMinecraftHeldItemType();
  if (heldItem) {
    const handItem = document.createElement("span");
    handItem.className = `minecraft-side-player-hand-item held-${heldItem}`;
    player.appendChild(handItem);
  }
  return player;
}

function getMinecraftSideZOffsets(radius = 6) {
  const offsets = [0];
  for (let distance = 1; distance <= radius; distance += 1) {
    offsets.push(-distance, distance);
  }
  return offsets;
}

function setMinecraftSideDepthStyle(element, z) {
  const depth = clamp(z - minecraftPlayerZ, -6, 6);
  element.style.setProperty("--side-depth-lift", `${Math.max(depth, 0) * 1.3}%`);
  element.style.setProperty("--side-z", `${24 - Math.max(depth, 0)}`);
}

function setMinecraftSideColumnStyle(element, localX, centered = true) {
  const column = localX + (centered ? 9.5 : 9);
  element.style.setProperty("--side-left", `${column * 5.5556}%`);
}

function pulseMinecraftPlayerAction(type) {
  minecraftPlayerActionPulse = { type, until: Date.now() + 360 };
}

function spawnMinecraftPickup(blockType, x, z, y) {
  if (!minecraftBlockTypes[blockType]) return;
  const localX = clamp(x - minecraftPlayerX, -9, 8);
  minecraftPickupId += 1;
  const id = minecraftPickupId;
  minecraftPickupItems.push({
    id,
    type: blockType,
    x,
    z,
    y,
    localX,
    createdAt: Date.now()
  });
  minecraftPickupItems = minecraftPickupItems.slice(-8);
  window.setTimeout(() => {
    minecraftPickupItems = minecraftPickupItems.filter((item) => item.id !== id);
    if (minecraftPanelOpen) renderMinecraftWorld();
  }, 560);
}

function makeMinecraftPickupElement(pickup) {
  const pickupElement = document.createElement("span");
  pickupElement.className = `minecraft-side-pickup minecraft-${pickup.type}`;
  setMinecraftSideColumnStyle(pickupElement, pickup.localX, false);
  pickupElement.style.setProperty("--side-row", `${Math.max(0, minecraftDepth - pickup.y)}`);
  pickupElement.setAttribute("aria-label", "飞向史蒂夫的小方块");
  return pickupElement;
}

function makeMinecraftSideAnimalElement(animalType, x, z, localX) {
  const animal = minecraftAnimalTypes[animalType];
  if (!animal) return null;
  const animalElement = document.createElement("button");
  animalElement.type = "button";
  animalElement.className = `minecraft-side-animal minecraft-animal-${animalType}`;
  setMinecraftSideColumnStyle(animalElement, localX);
  setMinecraftSideDepthStyle(animalElement, z);
  animalElement.style.setProperty("--animal-run-delay", `${Math.abs((x * 97 + z * 31) % 1200)}ms`);
  animalElement.setAttribute("aria-label", animal.label);
  animalElement.addEventListener("click", (event) => {
    event.stopPropagation();
    scareMinecraftSideAnimal(x, z);
  });
  return animalElement;
}

function findMinecraftSideAnimal(x) {
  for (const zOffset of getMinecraftSideZOffsets()) {
    const z = minecraftPlayerZ + zOffset;
    if (getMinecraftBlockAt(x, z, 0) !== "grass") continue;
    const animalType = getMinecraftAnimalAt(x, z);
    if (animalType) return { animalType, z };
  }
  return null;
}

function makeMinecraftSideVillagerElement(x, z, localX) {
  const villager = document.createElement("button");
  villager.type = "button";
  villager.className = `minecraft-side-villager${minecraftIsNight ? " sleeping" : ""}`;
  setMinecraftSideColumnStyle(villager, localX);
  setMinecraftSideDepthStyle(villager, z);
  const homeKey = getMinecraftVillagerHomeKey(x, z);
  villager.style.setProperty("--villager-step", `${minecraftVillagerSteps[homeKey] || 0}`);
  villager.setAttribute("aria-label", "村民");
  villager.addEventListener("click", (event) => {
    event.stopPropagation();
    handleMinecraftVillagerClick();
  });
  return villager;
}

function makeMinecraftSideIronGolemElement(x, z, localX) {
  const golem = document.createElement("span");
  golem.className = `minecraft-side-iron-golem${Date.now() < minecraftGolemAngryUntil ? " angry" : ""}`;
  setMinecraftSideColumnStyle(golem, localX);
  setMinecraftSideDepthStyle(golem, z);
  golem.setAttribute("aria-label", "三格高的铁傀儡");
  return golem;
}

function findMinecraftSideIronGolemFeature() {
  for (let localX = -9; localX <= 8; localX += 1) {
    const x = minecraftPlayerX + localX;
    for (const zOffset of getMinecraftSideZOffsets(8)) {
      const z = minecraftPlayerZ + zOffset;
      if (!isMinecraftVillageAreaAt(x, z)) continue;
      const golemLocalX = clamp(localX + 2, -8, 8);
      return { x: minecraftPlayerX + golemLocalX, z, localX: golemLocalX };
    }
  }
  if (Date.now() < minecraftGolemAngryUntil) {
    return { x: minecraftPlayerX + 2, z: minecraftPlayerZ, localX: 2 };
  }
  return null;
}

function makeMinecraftSideHostileElement(kind, entity, index) {
  const localX = clamp(entity.x - minecraftPlayerX, -9, 8);
  const hostile = document.createElement("button");
  hostile.type = "button";
  hostile.className = `minecraft-side-hostile minecraft-${kind}`;
  setMinecraftSideColumnStyle(hostile, localX);
  setMinecraftSideDepthStyle(hostile, entity.z);
  const runX = Math.sign(minecraftPlayerX - entity.x) * 5.5556;
  hostile.style.setProperty("--hostile-run-half-x", `${runX / 2}vw`);
  hostile.style.setProperty("--hostile-run-x", `${runX}vw`);
  hostile.setAttribute("aria-label", kind === "skeleton" ? "骷髅小白" : "僵尸");
  hostile.addEventListener("click", () => {
    if (kind === "skeleton") {
      hitMinecraftSkeleton(index);
    } else {
      hitMinecraftZombie(index);
    }
  });
  return hostile;
}

function enterMinecraftVillageHouse(x, z) {
  minecraftInsideVillageHouse = { x, z };
  renderMinecraftWorld();
  updateMinecraftStatus("推开门，进到村民的房子里。");
  saveGameState();
}

function exitMinecraftVillageHouse() {
  minecraftInsideVillageHouse = null;
  renderMinecraftWorld();
  updateMinecraftStatus("从村民家出来了。");
  saveGameState();
}

function sleepInMinecraftVillageHouseBed() {
  minecraftIsNight = false;
  minecraftDayTick = 0;
  minecraftZombies = [];
  minecraftSkeletons = [];
  minecraftHealth = Math.min(10, minecraftHealth + 2);
  renderMinecraftWorld();
  updateMinecraftStatus("在村民家的床上睡了一觉。天亮了，僵尸和骷髅都走了。");
  saveGameState();
}

function makeMinecraftSideVillageElement(feature, localX) {
  const village = document.createElement("button");
  village.type = "button";
  village.className = `minecraft-side-village minecraft-side-village-${feature.kind}`;
  setMinecraftSideColumnStyle(village, localX);
  setMinecraftSideDepthStyle(village, feature.z);
  village.dataset.x = `${feature.x}`;
  village.dataset.z = `${feature.z}`;
  village.dataset.y = "0";
  village.dataset.plant = feature.kind === "farm" ? getMinecraftPlantAt(feature.x, feature.z) || "wheat-ripe" : "";
  village.setAttribute("aria-label", feature.kind === "farm" ? "村庄麦田" : feature.kind === "torch" ? "村庄火把" : "村庄房子");
  if (feature.kind === "house" || feature.kind === "bed") {
    const door = document.createElement("span");
    door.className = "minecraft-side-village-door";
    village.appendChild(door);
  }
  village.addEventListener("click", (event) => {
    event.stopPropagation();
    if (feature.kind === "farm") {
      harvestMinecraftPlant(village);
      return;
    }
    if (feature.kind === "house" || feature.kind === "bed") {
      enterMinecraftVillageHouse(feature.x, feature.z);
      return;
    }
    updateMinecraftStatus("村庄又回到横版世界里了。去找村民可以交易。");
  });
  return village;
}

function findMinecraftSideVillageFeature(x) {
  for (const zOffset of getMinecraftSideZOffsets(8)) {
    const z = minecraftPlayerZ + zOffset;
    const villagerInfo = getMinecraftVillagerAtCell(x, z, 0);
    if (villagerInfo) return { kind: "villager", x, z };
    if (isMinecraftVillageFarmAt(x, z)) return { kind: "farm", x, z };
    if (isMinecraftVillageTorchAt(x, z)) return { kind: "torch", x, z };
    if (isMinecraftVillageBedAt(x, z)) return { kind: "bed", x, z };
    if (isMinecraftVillageHouseAt(x, z)) return { kind: "house", x, z };
  }
  return null;
}

function renderMinecraftVillageHouseInterior() {
  minecraftPanel?.classList.add("minecraft-platformer-fullscreen");
  minecraftWorld.classList.add("minecraft-side-world", "minecraft-side-house-interior");
  minecraftWorld.innerHTML = "";

  const backWall = document.createElement("div");
  backWall.className = "minecraft-side-house-wall";
  const floor = document.createElement("div");
  floor.className = "minecraft-side-house-floor";

  const door = document.createElement("button");
  door.type = "button";
  door.className = "minecraft-side-house-door";
  door.setAttribute("aria-label", "出门");
  door.addEventListener("click", exitMinecraftVillageHouse);

  const villager = document.createElement("button");
  villager.type = "button";
  villager.className = "minecraft-side-house-villager";
  villager.style.setProperty("--villager-step", `${minecraftDayTick}`);
  villager.setAttribute("aria-label", "屋里的村民");
  villager.addEventListener("click", (event) => {
    event.stopPropagation();
    handleMinecraftVillagerClick();
  });

  const wheat = document.createElement("button");
  wheat.type = "button";
  wheat.className = "minecraft-side-house-wheat";
  wheat.dataset.x = `${minecraftInsideVillageHouse?.x ?? minecraftPlayerX}`;
  wheat.dataset.z = `${minecraftInsideVillageHouse?.z ?? minecraftPlayerZ}`;
  wheat.dataset.y = "0";
  wheat.dataset.plant = "wheat-ripe";
  wheat.setAttribute("aria-label", "村民种的小麦");
  wheat.addEventListener("click", (event) => {
    event.stopPropagation();
    harvestMinecraftPlant(wheat);
  });

  const bed = document.createElement("button");
  bed.type = "button";
  bed.className = "minecraft-side-house-bed";
  bed.setAttribute("aria-label", "村民家的床");
  bed.addEventListener("click", (event) => {
    event.stopPropagation();
    sleepInMinecraftVillageHouseBed();
  });

  minecraftWorld.append(backWall, floor, door, bed, villager, wheat, makeMinecraftSideHud());
  updateMinecraftInventoryUI();
  renderMinecraftMap();
}

function getMinecraftSideTreeColumns() {
  const columns = [];
  const seen = new Set();
  for (let localX = -12; localX <= 11; localX += 1) {
    const x = minecraftPlayerX + localX;
    for (const zOffset of getMinecraftSideZOffsets(5)) {
      const z = minecraftPlayerZ + zOffset;
      if (getMinecraftBlockAt(x, z, 1) === "wood" && getMinecraftBlockAt(x, z, 0) !== "water") {
        const key = `${x},${z}`;
        if (!seen.has(key)) {
          seen.add(key);
          columns.push({ localX, x, z });
        }
        break;
      }
    }
  }
  return columns;
}

function makeMinecraftSideBlockElement(blockType, x, z, y, localX, rowIndex) {
  const cell = document.createElement("button");
  cell.type = "button";
  cell.className = `minecraft-side-block minecraft-side-row-${rowIndex}`;
  if (blockType) {
    cell.classList.add("minecraft-side-solid", `minecraft-${blockType}`);
  } else {
    cell.classList.add("minecraft-side-air");
    const backBlock = getDefaultMinecraftBlockAt(x, z, y);
    if (backBlock && backBlock.includes("ore")) {
      cell.classList.add("minecraft-side-dug-back", "minecraft-stone");
    } else if (backBlock && backBlock !== "water") {
      cell.classList.add("minecraft-side-dug-back", `minecraft-${backBlock}`);
    }
  }
  cell.dataset.x = `${x}`;
  cell.dataset.z = `${z}`;
  cell.dataset.y = `${y}`;
  setMinecraftSideColumnStyle(cell, localX, false);
  cell.style.setProperty("--side-row", `${rowIndex}`);
  const label = blockType ? minecraftBlockTypes[blockType]?.label || "方块" : "空气";
  cell.setAttribute("aria-label", `${label} ${x}, ${y}, ${z}`);
  cell.innerHTML = '<span class="cube-top"></span><span class="cube-left"></span><span class="cube-right"></span>';
  cell.addEventListener("click", () => handleMinecraftCellClick(cell));
  cell.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    mineMinecraftBlock(cell);
  });
  return cell;
}

const minecraftCaveEntryDepth = -9;
const minecraftHandMineBlocks = new Set(["grass", "dirt", "wood", "leaves", "sky_grass", "sky_wood", "sky_leaves", "warped_stem", "warped_leaves"]);

function renderMinecraftSideWorld() {
  minecraftPanel?.classList.add("minecraft-platformer-fullscreen");
  minecraftWorld.classList.add("minecraft-side-world");
  minecraftWorld.classList.toggle("minecraft-side-nether", minecraftDimension === "nether");
  minecraftWorld.classList.toggle("minecraft-side-end", minecraftDimension === "end");
  minecraftWorld.classList.toggle("minecraft-side-sky-dimension", minecraftDimension === "sky");
  minecraftWorld.classList.toggle("minecraft-side-cave", minecraftDimension === "overworld" && minecraftDepth <= minecraftCaveEntryDepth);
  minecraftWorld.setAttribute("data-minecraft-cave-entry-depth", `${minecraftCaveEntryDepth}`);
  minecraftWorld.innerHTML = "";
  minecraftWorld.appendChild(makeMinecraftSideSky());
  if (minecraftDimension === "overworld" && minecraftDepth >= 0) {
    getMinecraftSideTreeColumns().forEach((column) => minecraftWorld.appendChild(makeMinecraftSideTree(column)));
  }
  const topY = minecraftDepth > 0 ? 0 : minecraftDepth;
  const rows = Array.from({ length: 7 }, (_, index) => topY - index);
  rows.forEach((y, rowIndex) => {
    for (let localX = -9; localX <= 8; localX += 1) {
      const x = minecraftPlayerX + localX;
      const z = minecraftPlayerZ;
      const blockType = getMinecraftBlockAt(x, z, y)
        || (minecraftDimension === "overworld" && y <= 0 && minecraftDepth > minecraftCaveEntryDepth ? "stone" : null);
      minecraftWorld.appendChild(makeMinecraftSideBlockElement(blockType, x, z, y, localX, rowIndex));
    }
  });
  if (minecraftDimension === "overworld" && minecraftDepth === 0) {
    let lastAnimalLocalX = -99;
    for (let localX = -9; localX <= 8; localX += 1) {
      const x = minecraftPlayerX + localX;
      const villageFeature = findMinecraftSideVillageFeature(x);
      if (villageFeature) {
        const villageElement = villageFeature.kind === "villager"
          ? makeMinecraftSideVillagerElement(villageFeature.x, villageFeature.z, localX)
          : makeMinecraftSideVillageElement(villageFeature, localX);
        minecraftWorld.appendChild(villageElement);
      }
      const animal = findMinecraftSideAnimal(x);
      const canShowAnimal = animal && !villageFeature && localX - lastAnimalLocalX >= 3;
      const animalElement = canShowAnimal ? makeMinecraftSideAnimalElement(animal.animalType, x, animal.z, localX) : null;
      if (animalElement) lastAnimalLocalX = localX;
      if (animalElement) minecraftWorld.appendChild(animalElement);
    }
    const golemFeature = findMinecraftSideIronGolemFeature();
    if (golemFeature) {
      minecraftWorld.appendChild(makeMinecraftSideIronGolemElement(golemFeature.x, golemFeature.z, golemFeature.localX));
    }
  }
  minecraftZombies.forEach((zombie, index) => {
    if (Math.abs(zombie.x - minecraftPlayerX) <= 9 && Math.abs(zombie.z - minecraftPlayerZ) <= 6) {
      minecraftWorld.appendChild(makeMinecraftSideHostileElement("zombie", zombie, index));
    }
  });
  minecraftSkeletons.forEach((skeleton, index) => {
    if (Math.abs(skeleton.x - minecraftPlayerX) <= 9 && Math.abs(skeleton.z - minecraftPlayerZ) <= 6) {
      minecraftWorld.appendChild(makeMinecraftSideHostileElement("skeleton", skeleton, index));
    }
  });
  minecraftPickupItems
    .filter((pickup) => Math.abs(pickup.x - minecraftPlayerX) <= 9 && Math.abs(pickup.z - minecraftPlayerZ) <= 6)
    .forEach((pickup) => minecraftWorld.appendChild(makeMinecraftPickupElement(pickup)));
  minecraftWorld.appendChild(makeMinecraftSidePlayer(Date.now() - minecraftPlayerLandingPulse < 320));
  minecraftWorld.appendChild(makeMinecraftSideHud());
  updateMinecraftInventoryUI();
  renderMinecraftMap();
}

function renderMinecraftWorld() {
  if (!minecraftWorld) return;
  ensureMinecraftWorldBlocks();
  if (minecraftDimension === "end" && minecraftDragonHealth <= 0) {
    minecraftDragonHealth = 12;
  }
  const fell = applyMinecraftGravity();
  spawnMinecraftZombies();
  stepMinecraftZombiesTowardPlayer();
  stepMinecraftSkeletons();
  minecraftWorld.innerHTML = "";
  minecraftWorld.classList.toggle("guardian-depth", minecraftGuardianFound || minecraftDepth <= -63);
  minecraftWorld.classList.toggle("nether-world", minecraftDimension === "nether");
  minecraftWorld.classList.toggle("end-world", minecraftDimension === "end");
  minecraftWorld.classList.toggle("sky-world", minecraftDimension === "sky");
  minecraftWorld.classList.toggle("surface-night", minecraftDimension === "overworld" && minecraftIsNight && minecraftDepth >= 0);
  minecraftWorld.classList.toggle("underground-dark", minecraftDepth < 0 && !isMinecraftTorchNearPlayer());
  minecraftWorld.classList.toggle("underground-lit", minecraftDepth < 0 && isMinecraftTorchNearPlayer());
  minecraftWorld.classList.remove("minecraft-side-world", "minecraft-side-nether", "minecraft-side-end", "minecraft-side-sky-dimension", "minecraft-side-cave", "minecraft-side-house-interior");
  if (minecraftInsideVillageHouse && minecraftDimension === "overworld" && minecraftDepth === 0) {
    renderMinecraftVillageHouseInterior();
    return;
  }
  if (!minecraftGuardianFound) {
    renderMinecraftSideWorld();
    return;
  }
  for (let localZ = -4; localZ <= 4; localZ += 1) {
    for (let localX = -7; localX <= 6; localX += 1) {
      const offset = getMinecraftViewOffset(localX, localZ);
      const x = minecraftPlayerX + offset.x;
      const z = minecraftPlayerZ + offset.z;
      const isSurfaceSky = minecraftDimension === "overworld" && minecraftDepth >= 0 && (minecraftDepth === 1 || localZ <= -2);
      const netherUpperBlock = minecraftDimension === "nether" && minecraftDepth === 0 && localZ <= -2
        ? getMinecraftBlockAt(x, z, 1)
        : null;
      const blockY = netherUpperBlock ? 1 : isSurfaceSky ? 1 : minecraftDepth;
      const blockType = getMinecraftBlockAt(x, z, blockY);
      minecraftWorld.appendChild(makeMinecraftBlockElement(blockType, x, z, blockY, localX, localZ, isSurfaceSky && !blockType ? "sky" : ""));
    }
  }
  if (minecraftDimension === "overworld" && minecraftDepth >= 0) {
    minecraftWorld.appendChild(makeMinecraftSkyBody());
    minecraftWorld.appendChild(makeMinecraftClouds());
  }
  if (minecraftDimension === "end" && minecraftDragonHealth > 0) {
    const bossDragon = document.createElement("button");
    bossDragon.type = "button";
    bossDragon.className = "minecraft-dragon minecraft-dragon-boss";
    bossDragon.setAttribute("aria-label", "末影龙");
    bossDragon.addEventListener("click", (event) => {
      event.stopPropagation();
      hitMinecraftDragon();
    });
    minecraftWorld.appendChild(bossDragon);
  }
  minecraftZombies.forEach((zombie, index) => {
    minecraftWorld.appendChild(makeMinecraftZombieElement(zombie, index));
  });
  minecraftSkeletons.forEach((skeleton, index) => {
    minecraftWorld.appendChild(makeMinecraftSkeletonElement(skeleton, index));
  });
  minecraftWorld.appendChild(makeMinecraftXpBar());
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
  const blockType = getMinecraftBlockAt(x, z, y);
  if ((blockType !== "grass" && blockType !== "sky_grass") || getMinecraftPlantAt(x, z)) return false;
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
  if (blockType === "end_portal_frame" || blockType === "end_portal_frame_eye" || blockType === "end_portal") {
    updateMinecraftStatus("末地传送门不能挖掉，只能拿末地之眼放到框架上。");
    return;
  }
  if (!block) {
    updateMinecraftStatus("这里是空气，挖不到方块。");
    return;
  }
  if (!minecraftHandMineBlocks.has(blockType) && !canMineMinecraftBlock(blockType)) {
    updateMinecraftStatus(`现在只有${getMinecraftPickaxeName()}，还挖不动这个方块。先按木稿、石稿、铁稿、钻石稿的顺序升级。`);
    return;
  }
  pulseMinecraftPlayerAction(minecraftSelectedTool === "diamond_sword" ? "sword" : "mine");
  if (blockType === "bed") {
    minecraftInventory.bed = (minecraftInventory.bed || 0) + 1;
    spawnMinecraftPickup(blockType, x, z, y);
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
    spawnMinecraftPickup(blockType, x, z, y);
    setMinecraftBlockAt(x, z, y, null);
    renderMinecraftWorld();
    updateMinecraftStatus(`挖掉了发黄光的银石，获得 4 个银石粉。银石粉 ${minecraftMeteorDust}。`);
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
    spawnMinecraftPickup(blockType, x, z, y);
    setMinecraftBlockAt(x, z, y, null);
    renderMinecraftWorld();
    updateMinecraftStatus("装到了一桶岩浆。");
    saveGameState();
    return;
  }
  if (blockType === "coal_ore") {
    minecraftCoal += 1;
    spawnMinecraftPickup(blockType, x, z, y);
    setMinecraftBlockAt(x, z, y, null);
    renderMinecraftWorld();
    updateMinecraftStatus(`挖到煤炭了。煤炭 ${minecraftCoal}。`);
    saveGameState();
    return;
  }
  if (blockType === "iron_ore") {
    minecraftIron += 1;
    spawnMinecraftPickup(blockType, x, z, y);
    setMinecraftBlockAt(x, z, y, null);
    renderMinecraftWorld();
    updateMinecraftStatus(`挖到铁了。铁 ${minecraftIron}。`);
    saveGameState();
    return;
  }
  if (blockType === "diamond_ore") {
    minecraftDiamond += 1;
    spawnMinecraftPickup(blockType, x, z, y);
    setMinecraftBlockAt(x, z, y, null);
    renderMinecraftWorld();
    updateMinecraftStatus(`挖到钻石了。钻石 ${minecraftDiamond}。`);
    saveGameState();
    return;
  }
  if (blockType === "bedrock_ore") {
    minecraftBedrockShard += 1;
    spawnMinecraftPickup(blockType, x, z, y);
    setMinecraftBlockAt(x, z, y, null);
    renderMinecraftWorld();
    updateMinecraftStatus(`挖到黑黑的基岩矿了。基岩碎片 ${minecraftBedrockShard}。`);
    saveGameState();
    return;
  }
  const madeFirstCraftingTable = blockType === "wood" && (minecraftInventory.crafting_table || 0) <= 0;
  if (madeFirstCraftingTable) {
    minecraftInventory.crafting_table = 1;
  }
  minecraftInventory[blockType] = (minecraftInventory[blockType] || 0) + 1;
  spawnMinecraftPickup(blockType, x, z, y);
  setMinecraftBlockAt(x, z, y, null);
  renderMinecraftWorld();
  updateMinecraftStatus(madeFirstCraftingTable ? "撸到第一块木头，自动做出了一个工作台。" : `挖到了${block.label}，现在可以放它了。`);
  saveGameState();
}

function handleMinecraftCellClick(cell) {
  startMinecraftBackgroundMusic();
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
    if (blockType === "end_portal_frame_eye") {
      updateMinecraftStatus("这个框架已经放过末地之眼了。");
      return;
    }
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
  if (minecraftSelectedTool === "water_bucket" && blockType === "lava") {
    if (minecraftWaterBuckets <= 0) return;
    minecraftWaterBuckets -= 1;
    minecraftBuckets += 1;
    minecraftInventory.obsidian = (minecraftInventory.obsidian || 0) + 5;
    setMinecraftBlockAt(x, z, y, "obsidian");
    minecraftSelectedTool = "bucket";
    renderMinecraftWorld();
    updateMinecraftStatus(`水桶浇到岩浆上，冷却出了 5 个黑曜石。黑曜石 ${minecraftInventory.obsidian}。`);
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
  if (isMinecraftSkyPortalAt(x, z, y)) {
    if (minecraftDimension === "sky") {
      minecraftDimension = "overworld";
      minecraftDepth = 0;
      minecraftPlayerX = 0;
      minecraftPlayerZ = 0;
      renderMinecraftWorld();
      updateMinecraftStatus("点了蓝光石头门，回到了主世界。");
      saveGameState();
      return;
    }
    if (minecraftDimension === "overworld") {
      minecraftDimension = "sky";
      minecraftDepth = 0;
      minecraftPlayerX = 0;
      minecraftPlayerZ = 0;
      minecraftIsNight = false;
      minecraftZombies = [];
      minecraftSkeletons = [];
      renderMinecraftWorld();
      updateMinecraftStatus("点了蓝光石头门，来到了天际。");
      saveGameState();
      return;
    }
  }
  if (blockType === "end_portal") {
    if (minecraftDimension === "end") {
      if (isMinecraftEndReturnPortalAt(x, z)) {
        minecraftDimension = "overworld";
        minecraftDepth = 0;
        minecraftPlayerX = 76;
        minecraftPlayerZ = 0;
        renderMinecraftWorld();
        updateMinecraftStatus("走进末地返回传送门，回到了主世界的要塞房间。");
        saveGameState();
        return;
      }
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
    minecraftPlayerZ = 2;
    if (minecraftDragonHealth <= 0) minecraftDragonHealth = 12;
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

function startMinecraftBackgroundMusic() {
  if (!minecraftBackgroundMusic) return;
  minecraftBackgroundMusic.volume = 0.32;
  const playAttempt = minecraftBackgroundMusic.play();
  if (playAttempt?.catch) {
    playAttempt.catch(() => {
      updateMinecraftStatus("点一下、走一下或挖一下后，背景音乐就会响起来。");
    });
  }
}

function stopMinecraftBackgroundMusic() {
  if (!minecraftBackgroundMusic) return;
  minecraftBackgroundMusic.pause();
}

function loadMinecraftAnimalSounds() {
  if (Object.keys(minecraftAnimalSounds).length) return Promise.resolve(minecraftAnimalSounds);
  if (minecraftAnimalSoundsLoading) return minecraftAnimalSoundsLoading;
  minecraftAnimalSoundsLoading = fetch("./assets/minecraft-audio/animal-soundboard.html")
    .then((response) => response.ok ? response.text() : "")
    .then((html) => {
      const match = html.match(/const S = (\{[\s\S]*?\});\s*const KEYMAP/);
      if (!match) return {};
      Object.assign(minecraftAnimalSounds, JSON.parse(match[1]));
      return minecraftAnimalSounds;
    })
    .catch(() => ({}));
  return minecraftAnimalSoundsLoading;
}

function playMinecraftAnimalSound(animalType) {
  const soundKey = animalType === "turtle" ? "rabbit" : animalType;
  loadMinecraftAnimalSounds().then((sounds) => {
    const soundList = sounds[soundKey];
    if (!soundList?.length) return;
    const audio = new Audio(soundList[Math.floor(Math.random() * soundList.length)]);
    if (minecraftCurrentAnimalSound) {
      try {
        minecraftCurrentAnimalSound.pause();
        minecraftCurrentAnimalSound.currentTime = 0;
      } catch (error) {
        // Browser may already have released the last short animal sound.
      }
    }
    minecraftCurrentAnimalSound = audio;
    audio.volume = soundKey === "villager" ? 0.82 : 0.72;
    audio.play().catch(() => {});
  });
}

function moveMinecraftPlayer(direction, options = {}) {
  startMinecraftBackgroundMusic();
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

const minecraftEasyDigDownBlocks = new Set(["grass", "dirt", "stone", "water"]);

function placeMinecraftStepBlockForJump() {
  if (!minecraftBlockTypes[minecraftSelectedTool]) return false;
  if ((minecraftInventory[minecraftSelectedTool] || 0) <= 0) return false;
  if (minecraftDimension !== "overworld") return false;
  if (getMinecraftBlockAt(minecraftPlayerX, minecraftPlayerZ, minecraftDepth)) return false;
  minecraftInventory[minecraftSelectedTool] -= 1;
  setMinecraftBlockAt(minecraftPlayerX, minecraftPlayerZ, minecraftDepth, minecraftSelectedTool);
  return true;
}

function digMinecraftDown() {
  startMinecraftBackgroundMusic();
  const blockType = getMinecraftBlockAt(minecraftPlayerX, minecraftPlayerZ, minecraftDepth);
  const block = minecraftBlockTypes[blockType];
  if (blockType === "end_portal_frame" || blockType === "end_portal_frame_eye" || blockType === "end_portal") {
    updateMinecraftStatus("末地传送门不能往下挖掉，走到黑色中间就能进去。");
    return;
  }
  if (block && !minecraftEasyDigDownBlocks.has(blockType) && !canMineMinecraftBlock(blockType)) {
    updateMinecraftStatus(`现在只有${getMinecraftPickaxeName()}，还不能向下挖这个方块。`);
    return;
  }
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
    } else if (blockType === "coal_ore") {
      minecraftCoal += 1;
      setMinecraftBlockAt(minecraftPlayerX, minecraftPlayerZ, minecraftDepth, null);
    } else if (blockType === "iron_ore") {
      minecraftIron += 1;
      setMinecraftBlockAt(minecraftPlayerX, minecraftPlayerZ, minecraftDepth, null);
    } else if (blockType === "diamond_ore") {
      minecraftDiamond += 1;
      setMinecraftBlockAt(minecraftPlayerX, minecraftPlayerZ, minecraftDepth, null);
    } else if (blockType === "bedrock_ore") {
      minecraftBedrockShard += 1;
      setMinecraftBlockAt(minecraftPlayerX, minecraftPlayerZ, minecraftDepth, null);
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
  startMinecraftBackgroundMusic();
  markChatActivity();
  wakeFromNightSleep();
  if (minecraftDepth < 1) {
    minecraftDepth += 1;
    minecraftPlayerLandingPulse = Date.now();
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
  minecraftCycleTimer = window.setInterval(tickMinecraftSideWorld, 1000);
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
  minecraftDayTick = 0;
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
  minecraftFleeingAnimals = {};
  minecraftInsideVillageHouse = null;
  minecraftVillagerSteps = {};
  minecraftGolemAngryUntil = 0;
  minecraftSpawnPoint = null;
  minecraftSticks = 0;
  minecraftCoal = 0;
  minecraftIron = 0;
  minecraftDiamond = 0;
  minecraftBedrockShard = 0;
  minecraftPickaxes = { wood: 0, stone: 0, iron: 0, diamond: 0, bedrock: 0 };
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
    startMinecraftCycle();
    startMinecraftBackgroundMusic();
    loadMinecraftAnimalSounds();
    renderMinecraftWorld();
    updateMinecraftStatus("主世界变成横版了。史蒂夫就是你，挖脚下的方块会往下掉。");
  } else {
    stopMinecraftBackgroundMusic();
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
  minecraftCloseButton?.addEventListener("click", closeComputerApp);
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
  minecraftPocketCraftingOutput?.addEventListener("click", craftMinecraftPocketRecipe);
  document.querySelectorAll(".minecraft-recipe").forEach((button) => {
    button.addEventListener("click", () => craftMinecraftRecipe(button.dataset.minecraftRecipe || ""));
  });
  minecraftJumpUpButton?.addEventListener("click", jumpMinecraftUp);
  minecraftDigDownButton?.addEventListener("click", digMinecraftDown);
  minecraftViewButton?.addEventListener("click", switchMinecraftView);
  minecraftBackpackToggle?.addEventListener("click", () => {
    minecraftBackpackOpen = !minecraftBackpackOpen;
    renderMinecraftBackpack();
  });
  minecraftBackpackClose?.addEventListener("click", () => {
    minecraftBackpackOpen = false;
    renderMinecraftBackpack();
  });
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
  }, weatherSpeechDuration);
  // Damage must not be cancelled when chat replaces the subtitle timer.
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
      }, weatherSpeechDuration + 850);
    }
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

function makeSkyBodySpeak(kind) {
  const speaker = kind === "moon" ? "月亮公公" : "太阳公公";
  showSkyBubble(kind, kind === "moon" ? "晚上我也会听演唱会。" : "我升起来，大家就起床。");
  playComputerTownVoice(speaker);
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

const computerAppLabels = {
  chat: "聊",
  store: "店",
  minecraft: "方",
  town: "镇",
  paint: "画",
  music: "乐",
  clock: "钟"
};

const computerAppNames = {
  chat: "聊天",
  store: "应用商店",
  minecraft: "我的世界 2D",
  town: "小镇",
  paint: "画画",
  music: "音乐",
  clock: "时钟"
};

Object.entries(window.ComputerApps?.catalog || {}).forEach(([id, [label, name]]) => { computerAppLabels[id] = label; computerAppNames[id] = name; });
const townSprunkiCharacters = [
  { name: "Oren", zh: "奥伦", color: 0xff8c3a, gender: "boy", voice: "bass", feature: "headphones" },
  { name: "Raddy", zh: "瑞迪", color: 0xe84848, gender: "boy", voice: "drum", feature: "horns" },
  { name: "Clukr", zh: "克拉克", color: 0xb7bdc7, gender: "boy", voice: "metal", feature: "antenna" },
  { name: "Fun Bot", zh: "快乐机器人", color: 0xaab4c4, gender: "bot", voice: "robot", feature: "visor" },
  { name: "Vineria", zh: "维美利亚", color: 0x76bf6c, gender: "girl", voice: "leaf", feature: "leaves" },
  { name: "Gray", zh: "格雷", color: 0x8f8f98, gender: "boy", voice: "low", feature: "longEars" },
  { name: "Brud", zh: "布鲁德", color: 0x9c7a42, gender: "boy", voice: "thump", feature: "bucket" },
  { name: "Garnold", zh: "加诺德", color: 0xd7a533, gender: "boy", voice: "brass", feature: "goggles" },
  { name: "Owakcx", zh: "奥瓦克斯", color: 0x77c957, gender: "boy", voice: "glitch", feature: "wildHair" },
  { name: "Sky", zh: "小天", color: 0x82c9ff, gender: "boy", voice: "high", feature: "bearEars" },
  { name: "Mr. Sun", zh: "太阳公公", color: 0xffd94a, gender: "sun", voice: "bright", feature: "sunRays", skyOnly: true },
  { name: "Durple", zh: "德普尔", color: 0x8b66d8, gender: "boy", voice: "deep", feature: "longNeck" },
  { name: "Mr. Tree", zh: "树先生", color: 0x4d9d4d, gender: "tree", voice: "wood", feature: "treeTop" },
  { name: "Simon", zh: "西蒙", color: 0xf4d33d, gender: "boy", voice: "lead", feature: "spikes" },
  { name: "Tunner", zh: "坦纳", color: 0xb88957, gender: "boy", voice: "whistle", feature: "hat" },
  { name: "Mr. Fun Computer", zh: "电脑先生", color: 0x6ec6ff, gender: "bot", voice: "chip", feature: "screen" },
  { name: "Wenda", zh: "温达", color: 0xffffff, gender: "girl", voice: "airy", feature: "catEars" },
  { name: "Pinki", zh: "平机", color: 0xf38fca, gender: "girl", voice: "pop", feature: "bow" },
  { name: "Jevin", zh: "杰文", color: 0x4669d8, gender: "boy", voice: "choir", feature: "hood" },
  { name: "Black", zh: "布莱克", color: 0x17171c, gender: "shadow", voice: "dark", feature: "shadowHalo" }
];

const townStageThreeBusinesses = [
  { id: "supermarket", name: "小镇超市", kind: "food", color: 0xffd35a, x: 6.9, z: -3.9 },
  { id: "clothing", name: "服装店", kind: "clothes", color: 0x88c7ff, x: -6.9, z: -3.8 }
];

const townResidentScale = 0.48;
const townResidentFocusScale = 1.08;

const townStageThreeProducts = [
  { id: "apple-juice", store: "supermarket", kind: "food", name: "苹果汁", price: 1, icon: "🍎" },
  { id: "berry-bread", store: "supermarket", kind: "food", name: "浆果面包", price: 2, icon: "🍞" },
  { id: "melon-box", store: "supermarket", kind: "food", name: "西瓜盒", price: 2, icon: "🍉" },
  { id: "pumpkin-pie", store: "supermarket", kind: "food", name: "南瓜派", price: 3, icon: "🥧" },
  { id: "milk-cup", store: "supermarket", kind: "food", name: "牛奶杯", price: 2, icon: "🥛" },
  { id: "carrot-pack", store: "supermarket", kind: "food", name: "胡萝卜包", price: 2, icon: "🥕" },
  { id: "cookie-tin", store: "supermarket", kind: "food", name: "曲奇罐", price: 2, icon: "🍪" },
  { id: "gold-snack", store: "supermarket", kind: "food", name: "金色零食", price: 4, icon: "⭐" },
  { id: "tea-bottle", store: "supermarket", kind: "food", name: "青草茶", price: 1, icon: "🧃" },
  { id: "soup-cup", store: "supermarket", kind: "food", name: "暖汤杯", price: 3, icon: "🍲" },
  { id: "red-jacket", store: "clothing", kind: "clothes", name: "红色外套", price: 3, color: 0xe84848, icon: "■" },
  { id: "blue-hoodie", store: "clothing", kind: "clothes", name: "蓝色帽衫", price: 3, color: 0x48a8ff, icon: "■" },
  { id: "gold-coat", store: "clothing", kind: "clothes", name: "金色演出服", price: 5, color: 0xffd65d, icon: "■" },
  { id: "green-vest", store: "clothing", kind: "clothes", name: "绿色背心", price: 3, color: 0x68c957, icon: "■" },
  { id: "pink-dress", store: "clothing", kind: "clothes", name: "粉色裙装", price: 4, color: 0xf38fca, icon: "■" },
  { id: "black-cape", store: "clothing", kind: "clothes", name: "黑色披风", price: 4, color: 0x17171c, icon: "■" },
  { id: "orange-tee", store: "clothing", kind: "clothes", name: "橙色短袖", price: 2, color: 0xff8c3a, icon: "■" },
  { id: "purple-coat", store: "clothing", kind: "clothes", name: "紫色长衣", price: 4, color: 0x8b66d8, icon: "■" },
  { id: "white-scarf", store: "clothing", kind: "clothes", name: "白色围巾", price: 2, color: 0xffffff, icon: "■" },
  { id: "gray-suit", store: "clothing", kind: "clothes", name: "灰色套装", price: 3, color: 0x8f8f98, icon: "■" },
  { id: "stage-boots", store: "clothing", kind: "clothes", name: "舞台靴子", price: 3, color: 0x312b8f, icon: "■" },
  { id: "rain-hat", store: "clothing", kind: "clothes", name: "雨天帽子", price: 2, color: 0xb88957, icon: "■" },
  { id: "sleep-shirt", store: "clothing", kind: "clothes", name: "睡衣上衣", price: 3, color: 0x9fd6ff, icon: "■" },
  { id: "market-apron", store: "clothing", kind: "clothes", name: "超市围裙", price: 3, color: 0x76bf6c, icon: "■" }
];

const townConcertPrograms = [
  { id: "beat-start", name: "方块节拍", performers: ["Oren", "Raddy", "Clukr", "Fun Bot"], base: 110 },
  { id: "leaf-pop", name: "树林旋律", performers: ["Vineria", "Pinki", "Sky", "Simon"], base: 146 },
  { id: "night-bass", name: "夜晚低音", performers: ["Jevin", "Black", "Durple", "Tunner"], base: 82 }
];

const townLayoutRadius = 9.6;
const townOuterLayoutRadius = 11.2;
const townStageRadius = 2.35;
const townStageSurfaceY = 0.43;
const townZoomLevels = {
  near: { height: 5.5, distance: 10.5, lookY: 0.9 },
  overview: { height: 12.8, distance: 21.5, lookY: 0.35 }
};
const residentHomeOverrides = {
  "Mr. Fun Computer": { x: 0, z: -12.2 },
  "Mr. Tree": { x: 10.8, z: -10.7 },
  "Oren": { x: -2.6, z: -9.8 },
  "Raddy": { x: -5.6, z: -8.9 },
  "Black": { x: 5.6, z: -8.9 }
};

const townConcertMelodies = {
  "beat-start": [0, 3, 5, 7, 10, 7, 5, 3, 0, 5, 7, 12, 10, 7, 3, 0],
  "leaf-pop": [0, 2, 4, 7, 9, 7, 4, 2, 0, 4, 7, 11, 9, 7, 4, 2],
  "night-bass": [0, -2, 0, 3, 5, 3, 0, -5, 0, 3, 7, 10, 7, 3, 0, -2]
};

function townIconFile(name) {
  const files = {
    Oren: "oren",
    Raddy: "raddy",
    Clukr: "clukr",
    "Fun Bot": "fun-bot",
    Vineria: "vineria",
    Gray: "gray",
    Brud: "brud",
    Garnold: "garnold",
    Owakcx: "owakcx",
    Sky: "sky",
    "Mr. Sun": "mr-sun",
    Durple: "durple",
    "Mr. Tree": "mr-tree",
    Simon: "simon",
    Tunner: "tunner",
    "Mr. Fun Computer": "mr-fun-computer",
    Wenda: "wenda",
    Pinki: "pinki",
    Jevin: "jevin",
    Black: "black",
    "太阳公公": "mr-sun"
  };
  return files[name] ? `./assets/town-icons/${files[name]}.png` : "";
}

function loadComputerTownThree() {
  if (!computerTownThreePromise) {
    computerTownThreePromise = import("https://unpkg.com/three@0.160.0/build/three.module.js");
  }
  return computerTownThreePromise;
}

function stopComputerTown3D() {
  stopComputerTownConcert();
  computerTownSpeechQueue = [];
  computerTownSpeechActive = false;
  if (!computerTown3D) return;
  window.cancelAnimationFrame(computerTown3D.frame);
  window.removeEventListener("resize", computerTown3D.resize);
  computerTown3D.disposeEvents?.();
  computerTown3D.renderer?.dispose?.();
  computerTown3D = null;
}

function ensureComputerTownAudio() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return null;
  if (!computerTownAudio) {
    computerTownAudio = {
      context: new AudioContext(),
      concertTimer: null,
      concertSpeechTimer: null,
      concertOn: false
    };
  }
  if (computerTownAudio.context.state === "suspended") {
    computerTownAudio.context.resume();
  }
  return computerTownAudio;
}

function playComputerTownTone(frequency, duration = 0.16, type = "sine", volume = 0.06) {
  const audio = ensureComputerTownAudio();
  if (!audio) return;
  const oscillator = audio.context.createOscillator();
  const gain = audio.context.createGain();
  oscillator.type = type;
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(0.0001, audio.context.currentTime);
  gain.gain.exponentialRampToValueAtTime(volume, audio.context.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, audio.context.currentTime + duration);
  oscillator.connect(gain).connect(audio.context.destination);
  oscillator.start();
  oscillator.stop(audio.context.currentTime + duration + 0.02);
}

function playComputerTownBeatLayer(program, step) {
  if (!program) return;
  const base = program.base || 110;
  if (step % 2 === 0) playComputerTownTone(base, 0.09, "triangle", 0.045);
  if (step % 4 === 0) playComputerTownTone(base / 2, 0.12, "sine", 0.07);
  if (step % 4 === 2) playComputerTownTone(base * 1.5, 0.08, "square", 0.032);
  if (step % 8 === 5) playComputerTownTone(base * 2, 0.11, "sawtooth", 0.025);
}

function playComputerTownSongNote(program, step, layer = 0) {
  const melody = townConcertMelodies[program?.id] || townConcertMelodies["beat-start"];
  const base = program?.base || 110;
  const semitone = melody[step % melody.length] + layer * 7;
  const frequency = base * Math.pow(2, semitone / 12);
  const voices = ["triangle", "sine", "square", "sawtooth"];
  const volume = layer === 0 ? 0.06 : layer === 1 ? 0.04 : 0.025;
  playComputerTownTone(frequency, layer === 0 ? 0.22 : 0.14, voices[layer % voices.length], volume);
}

function performTownConcertSong(program, step) {
  playComputerTownBeatLayer(program, step);
  playComputerTownSongNote(program, step, 0);
  if (step % 2 === 0) playComputerTownSongNote(program, step + 4, 1);
  if (step % 4 === 0) playComputerTownSongNote(program, step, -1);
}

function getTownConcertProgram(elapsed) {
  const index = Math.floor(elapsed / 24) % townConcertPrograms.length;
  return townConcertPrograms[index];
}

function getTownSpeakerLabel(speaker) {
  if (speaker === "太阳公公") return speaker;
  return townSprunkiCharacters.find((item) => item.name === speaker || item.zh === speaker)?.zh || speaker;
}

function playComputerTownVoice(name) {
  const character = townSprunkiCharacters.find((item) => item.name === name || item.zh === name);
  const profiles = {
    boy: { base: [196, 247, 294], type: "triangle", volume: 0.07 },
    girl: { base: [330, 392, 523], type: "sine", volume: 0.065 },
    bot: { base: [262, 330, 392], type: "square", volume: 0.052 },
    sun: { base: [392, 494, 659], type: "sine", volume: 0.075 },
    tree: { base: [147, 196, 247], type: "triangle", volume: 0.06 },
    shadow: { base: [98, 123, 147], type: "sawtooth", volume: 0.045 }
  };
  const voiceProfile = profiles[character?.gender] || profiles.boy;
  const rhythmOffset = Math.abs(String(character?.voice || name).split("").reduce((total, char) => total + char.charCodeAt(0), 0)) % 5;
  const tones = voiceProfile.base.map((tone) => tone + rhythmOffset * 11);
  if (name === "太阳公公") tones.splice(0, tones.length, 330, 440, 554);
  tones.forEach((tone, index) => window.setTimeout(
    () => playComputerTownTone(tone, 0.13, index % 2 ? voiceProfile.type : "sine", voiceProfile.volume),
    index * 120
  ));
}

function getComputerTownSpeakerObject(speaker) {
  const speakerLabel = getTownSpeakerLabel(speaker);
  return computerTown3D?.speakers?.get(speaker)
    || computerTown3D?.speakers?.get(speakerLabel)
    || null;
}

function setComputerTownSpeakingMouth(speaker, speaking) {
  const speakerObject = getComputerTownSpeakerObject(speaker);
  if (!speakerObject) return;
  if (speakerObject.userData.computerScreen) {
    speakerObject.userData.talking = speaking;
    return;
  }
  speakerObject.userData.talking = speaking;
  if (!speaking && speakerObject.userData.mouth) {
    speakerObject.userData.mouth.scale.set(1, 1, 1);
  }
}

function typeComputerTownScreenText(speakerObject, text) {
  const screen = speakerObject?.userData?.computerScreen;
  if (!screen) return;
  const canvas = screen.userData.canvas;
  const context = screen.userData.context;
  const texture = screen.userData.texture;
  if (!canvas || !context || !texture) return;
  window.clearInterval(screen.userData.typeTimer);
  const words = Array.from(String(text || "")).slice(0, 34);
  let count = 0;
  const paint = () => {
    context.fillStyle = "#050505";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#ffffff";
    context.font = "900 22px sans-serif";
    context.textAlign = "left";
    context.textBaseline = "top";
    const visible = words.slice(0, count).join("");
    const lines = [];
    for (let index = 0; index < visible.length; index += 9) {
      lines.push(visible.slice(index, index + 9));
    }
    lines.slice(0, 3).forEach((line, index) => context.fillText(line, 12, 10 + index * 26));
    texture.needsUpdate = true;
    count += 1;
    if (count > words.length + 2) {
      window.clearInterval(screen.userData.typeTimer);
      speakerObject.userData.talking = false;
    }
  };
  screen.userData.typeTimer = window.setInterval(paint, 95);
  paint();
}

function setComputerTownLookTarget(speaker, targetSpeaker) {
  const speakerObject = getComputerTownSpeakerObject(speaker);
  if (!speakerObject) return;
  speakerObject.userData.lookTargetSpeaker = targetSpeaker || "";
  if (targetSpeaker) {
    const targetObject = getComputerTownSpeakerObject(targetSpeaker);
    if (targetObject) targetObject.userData.lookTargetSpeaker = speaker;
  }
}

function updateTownEyeGaze(actor, elapsed) {
  if (!actor?.userData?.pupils || !actor.userData.pupilHomes) return;
  const target = actor.userData.lookTargetSpeaker
    ? getComputerTownSpeakerObject(actor.userData.lookTargetSpeaker)
    : null;
  const xOffset = target
    ? clamp((target.position.x - actor.position.x) * 0.018, -0.055, 0.055)
    : Math.sin(elapsed * 0.7) * 0.012;
  const yOffset = target ? clamp((target.position.y - actor.position.y) * 0.01, -0.025, 0.025) : 0;
  actor.userData.pupils.forEach((pupil, index) => {
    const home = actor.userData.pupilHomes[index];
    pupil.position.x = home.x + xOffset;
    pupil.position.y = home.y + yOffset;
  });
}

function runComputerTownSpeechQueue() {
  if (computerTownSpeechActive) return;
  const next = computerTownSpeechQueue.shift();
  if (!next) return;
  computerTownSpeechActive = true;
  const finish = () => {
    setComputerTownSpeakingMouth(next.speaker, false);
    computerTownSpeechActive = false;
    window.setTimeout(runComputerTownSpeechQueue, 120);
  };
  if (!("speechSynthesis" in window)) {
    setComputerTownSpeakingMouth(next.speaker, true);
    playComputerTownVoice(next.speaker);
    window.setTimeout(finish, Math.max(900, next.text.length * 95));
    return;
  }
  const character = townSprunkiCharacters.find((item) => item.name === next.speaker || item.zh === next.speaker);
  const voiceSettingsByGender = {
    boy: { pitch: 1.18, rate: 1.26, volume: 0.98 },
    girl: { pitch: 1.48, rate: 1.22, volume: 0.98 },
    bot: { pitch: 0.92, rate: 1.08, volume: 0.95 },
    sun: { pitch: 1.55, rate: 1.12, volume: 1 },
    tree: { pitch: 0.78, rate: 0.96, volume: 0.96 },
    shadow: { pitch: 0.55, rate: 0.84, volume: 0.92 }
  };
  const base = voiceSettingsByGender[character?.gender] || voiceSettingsByGender.boy;
  const voiceShift = Math.abs(String(character?.voice || next.speaker).split("").reduce((total, char) => total + char.charCodeAt(0), 0)) % 7;
  const utterance = new SpeechSynthesisUtterance(next.text);
  utterance.lang = "zh-CN";
  utterance.pitch = clamp(base.pitch + voiceShift * 0.035, 0.45, 1.9);
  utterance.rate = clamp(base.rate - voiceShift * 0.018, 0.72, 1.55);
  utterance.volume = base.volume;
  const selectedVoice = pickVoice();
  if (selectedVoice) utterance.voice = selectedVoice;
  utterance.onstart = () => setComputerTownSpeakingMouth(next.speaker, true);
  utterance.onend = finish;
  utterance.onerror = finish;
  if (window.speechSynthesis.paused) {
    window.speechSynthesis.resume();
  }
  window.speechSynthesis.speak(utterance);
}

function speakComputerTownText(speaker, text) {
  if (!text) return 0;
  computerTownSpeechQueue.push({ speaker, text });
  runComputerTownSpeechQueue();
  return Math.max(1200, text.length * 180);
}

function showTownConcertApplause(host, program) {
  showComputerTownThought(host, "电脑先生", `${program?.name || "节目"}结束，台下鼓掌喝彩！`);
  [180, 220, 260, 320].forEach((tone, index) => {
    window.setTimeout(() => playComputerTownTone(tone, 0.05, "square", 0.035), index * 90);
  });
}

function startComputerTownConcert(program) {
  const audio = ensureComputerTownAudio();
  if (!audio) return;
  if (audio.concertOn && audio.programId === program?.id) return;
  stopComputerTownConcert();
  audio.concertOn = true;
  audio.programId = program?.id || "";
  let step = 0;
  const loop = () => {
    if (!computerTownAudio?.concertOn) return;
    performTownConcertSong(program, step);
    step += 1;
    computerTownAudio.concertTimer = window.setTimeout(loop, 280);
  };
  loop();
}

function stopComputerTownConcert() {
  if (!computerTownAudio) return;
  computerTownAudio.concertOn = false;
  computerTownAudio.programId = "";
  if (computerTownAudio.concertTimer) {
    window.clearTimeout(computerTownAudio.concertTimer);
    computerTownAudio.concertTimer = null;
  }
  if (computerTownAudio.concertSpeechTimer) {
    window.clearTimeout(computerTownAudio.concertSpeechTimer);
    computerTownAudio.concertSpeechTimer = null;
  }
}

function showComputerTownSpeech(host, speaker, text, targetSpeaker = "") {
  if (!host) return;
  const bubble = host.closest(".computer-town-app")?.querySelector(".computer-town-speech");
  const speakerLabel = getTownSpeakerLabel(speaker);
  const spokenText = `${speakerLabel}说，${text}`;
  const speakerObject = getComputerTownSpeakerObject(speaker);
  if (bubble) {
    bubble.textContent = `${speakerLabel}：${text}`;
    bubble.classList.add("active");
    window.clearTimeout(bubble.hideTimer);
    bubble.hideTimer = window.setTimeout(() => bubble.classList.remove("active"), 2200);
  }
  setComputerTownLookTarget(speaker, targetSpeaker);
  if (speakerObject?.userData?.computerScreen) {
    speakerObject.userData.talking = true;
    typeComputerTownScreenText(speakerObject, text);
  }
  speakComputerTownText(speaker, spokenText);
}

function showComputerTownThought(host, speaker, text) {
  if (!host || !text) return;
  const bubble = host.closest(".computer-town-app")?.querySelector(".computer-town-thought");
  const speakerLabel = getTownSpeakerLabel(speaker);
  if (!bubble) return;
  bubble.textContent = `${speakerLabel}：${text}`;
  bubble.classList.add("active");
  window.clearTimeout(bubble.hideTimer);
  bubble.hideTimer = window.setTimeout(() => bubble.classList.remove("active"), 2400);
}

function makeTownSquareHouse(THREE, scene, color, x, z, scale = 1) {
  const group = new THREE.Group();
  const trimMaterial = new THREE.MeshStandardMaterial({ color: 0x1b1a20, roughness: 0.62 });
  const wall = new THREE.Mesh(
    new THREE.BoxGeometry(1.42 * scale, 1.24 * scale, 1.18 * scale),
    new THREE.MeshStandardMaterial({ color, roughness: 0.7 })
  );
  wall.position.y = 0.62 * scale;
  const roof = new THREE.Mesh(
    new THREE.ConeGeometry(1.16 * scale, 0.78 * scale, 4),
    new THREE.MeshStandardMaterial({ color: 0xb85a3f, roughness: 0.68 })
  );
  roof.position.y = 1.42 * scale;
  roof.rotation.y = Math.PI / 4;
  const door = new THREE.Mesh(
    new THREE.BoxGeometry(0.32 * scale, 0.58 * scale, 0.05 * scale),
    trimMaterial
  );
  door.position.set(0, 0.29 * scale, 0.615 * scale);
  const leftWindow = new THREE.Mesh(
    new THREE.BoxGeometry(0.22 * scale, 0.22 * scale, 0.05 * scale),
    new THREE.MeshBasicMaterial({ color: 0xcff6ff })
  );
  const rightWindow = leftWindow.clone();
  leftWindow.position.set(-0.42 * scale, 0.78 * scale, 0.62 * scale);
  rightWindow.position.set(0.42 * scale, 0.78 * scale, 0.62 * scale);
  const roofLine = new THREE.Mesh(
    new THREE.BoxGeometry(1.58 * scale, 0.08 * scale, 0.08 * scale),
    trimMaterial
  );
  roofLine.position.set(0, 1.06 * scale, 0.64 * scale);
  group.add(wall, roof, door, leftWindow, rightWindow, roofLine);
  group.position.set(x, 0, z);
  scene.add(group);
  return group;
}

function makeTownHouse(THREE, scene, color, x, z, scale = 1) {
  return makeTownSquareHouse(THREE, scene, color, x, z, scale);
}

function makeTownHouseFeature(THREE, character, scale = 1) {
  const group = new THREE.Group();
  const dark = new THREE.MeshStandardMaterial({ color: 0x1b1a20, roughness: 0.58 });
  const accent = new THREE.MeshStandardMaterial({ color: character.color, roughness: 0.5 });
  const metal = new THREE.MeshStandardMaterial({ color: 0xd5dde8, metalness: 0.2, roughness: 0.4 });
  const addAntenna = (x) => {
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.018 * scale, 0.018 * scale, 0.58 * scale, 8), metal);
    stem.position.set(x * scale, 0.28 * scale, 0);
    stem.rotation.z = x < 0 ? 0.28 : -0.28;
    const tip = new THREE.Mesh(new THREE.SphereGeometry(0.055 * scale, 10, 8), accent);
    tip.position.set(x * 1.1 * scale, 0.58 * scale, 0);
    group.add(stem, tip);
  };
  if (character.feature === "headphones") {
    const band = new THREE.Mesh(new THREE.TorusGeometry(0.38 * scale, 0.028 * scale, 8, 28, Math.PI), dark);
    band.rotation.z = Math.PI;
    band.position.y = 0.28 * scale;
    const left = new THREE.Mesh(new THREE.TorusGeometry(0.12 * scale, 0.03 * scale, 8, 20), dark);
    const right = left.clone();
    left.position.set(-0.36 * scale, 0.04 * scale, 0);
    right.position.set(0.36 * scale, 0.04 * scale, 0);
    left.rotation.y = Math.PI / 2;
    right.rotation.y = Math.PI / 2;
    group.add(band, left, right);
    addAntenna(-0.18);
    addAntenna(0.18);
  } else if (character.feature === "horns") {
    [-0.22, 0.22].forEach((x) => {
      const horn = new THREE.Mesh(new THREE.ConeGeometry(0.09 * scale, 0.45 * scale, 12), accent);
      horn.position.set(x * scale, 0.28 * scale, 0);
      horn.rotation.z = x < 0 ? 0.46 : -0.46;
      group.add(horn);
    });
  } else if (character.feature === "antenna") {
    addAntenna(-0.16);
    addAntenna(0.16);
    const dish = new THREE.Mesh(new THREE.TorusGeometry(0.22 * scale, 0.025 * scale, 8, 24), metal);
    dish.position.y = 0.62 * scale;
    dish.rotation.x = Math.PI / 2;
    group.add(dish);
  } else if (character.feature === "leaves" || character.feature === "treeTop") {
    for (let index = 0; index < 5; index += 1) {
      const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.13 * scale, 12, 8), accent);
      leaf.scale.set(1.35, 0.62, 0.36);
      leaf.position.set((-0.28 + index * 0.14) * scale, (0.2 + Math.sin(index) * 0.08) * scale, 0);
      leaf.rotation.z = index * 0.6;
      group.add(leaf);
    }
  } else if (character.feature === "bow") {
    [-1, 1].forEach((side) => {
      const bow = new THREE.Mesh(new THREE.ConeGeometry(0.14 * scale, 0.34 * scale, 16), accent);
      bow.position.set(side * 0.16 * scale, 0.22 * scale, 0);
      bow.rotation.z = side * -Math.PI / 2;
      group.add(bow);
    });
  } else if (character.feature === "visor" || character.feature === "screen") {
    const screen = new THREE.Mesh(new THREE.BoxGeometry(0.62 * scale, 0.34 * scale, 0.08 * scale), new THREE.MeshBasicMaterial({ color: 0xa6f5ff }));
    screen.position.y = 0.22 * scale;
    group.add(screen);
  } else if (character.feature === "hat" || character.feature === "bucket") {
    const brim = new THREE.Mesh(new THREE.CylinderGeometry(0.36 * scale, 0.36 * scale, 0.05 * scale, 24), dark);
    const top = new THREE.Mesh(new THREE.CylinderGeometry(0.22 * scale, 0.28 * scale, 0.28 * scale, 20), accent);
    top.position.y = 0.18 * scale;
    group.add(brim, top);
  } else {
    const marker = new THREE.Mesh(new THREE.BoxGeometry(0.42 * scale, 0.42 * scale, 0.08 * scale), accent);
    marker.position.y = 0.18 * scale;
    group.add(marker);
  }
  return group;
}

function makeTownStageThreeHouse(THREE, scene, character, x, z, scale = 1) {
  const house = makeTownHouse(THREE, scene, character.color, x, z, scale);
  house.name = `${character.zh}的家`;
  house.userData.townHomeFor = character.name;
  house.userData.zh = `${character.zh}的家`;
  const feature = makeTownHouseFeature(THREE, character, scale);
  feature.position.set(0, 2.28 * scale, 0.03);
  house.add(feature);
  const sign = makeTownNameLabel(THREE, `${character.zh}家`);
  sign.position.y = 2.95 * scale;
  sign.scale.set(0.95 * scale, 0.32 * scale, 1);
  house.add(sign);
  return house;
}

function makeTownBusiness(THREE, scene, business) {
  const group = makeTownHouse(THREE, scene, business.color, business.x, business.z, 1.25);
  group.name = business.name;
  group.userData.townBusiness = business;
  group.userData.townMall = business.kind === "clothes";
  const sign = makeTownNameLabel(THREE, business.name);
  sign.position.y = 2.85;
  group.add(sign);
  const badge = new THREE.Mesh(
    business.kind === "food" ? new THREE.SphereGeometry(0.22, 16, 12) : new THREE.BoxGeometry(0.44, 0.32, 0.08),
    new THREE.MeshStandardMaterial({ color: business.kind === "food" ? 0x76d85c : 0xff8ec7, roughness: 0.48 })
  );
  badge.position.set(0, 2.28, 0.2);
  const awningMaterial = new THREE.MeshStandardMaterial({
    color: business.kind === "food" ? 0xffffff : 0xffe1ef,
    roughness: 0.55
  });
  const awning = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.16, 0.18), awningMaterial);
  awning.position.set(0, 1.36, 0.8);
  const counter = new THREE.Mesh(
    new THREE.BoxGeometry(0.92, 0.26, 0.18),
    new THREE.MeshStandardMaterial({ color: business.kind === "food" ? 0x76d85c : 0xf38fca, roughness: 0.55 })
  );
  counter.position.set(0, 0.58, 0.8);
  const storeMarker = new THREE.Mesh(
    business.kind === "food" ? new THREE.SphereGeometry(0.14, 16, 12) : new THREE.CapsuleGeometry(0.11, 0.24, 8, 14),
    new THREE.MeshStandardMaterial({ color: business.kind === "food" ? 0xff4f4f : 0x48a8ff, roughness: 0.48 })
  );
  storeMarker.position.set(0.42, 1.62, 0.86);
  group.add(badge, awning, counter, storeMarker);
  return group;
}

function makeTownStageLightRig(THREE, scene, stagePosition) {
  const rig = new THREE.Group();
  const poleMaterial = new THREE.MeshStandardMaterial({ color: 0x25212f, metalness: 0.15, roughness: 0.45 });
  [-1, 1].forEach((side) => {
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 2.4, 10), poleMaterial);
    pole.position.set(side * 2.15, 1.38, 0);
    rig.add(pole);
  });
  const bar = new THREE.Mesh(new THREE.BoxGeometry(4.55, 0.08, 0.08), poleMaterial);
  bar.position.set(0, 2.6, 0);
  rig.add(bar);
  const light = new THREE.SpotLight(0xfff0a5, 1.5, 12, Math.PI / 6, 0.42, 1);
  light.position.set(stagePosition.x, 4.9, stagePosition.z + 1.1);
  light.target.position.set(stagePosition.x, townStageSurfaceY, stagePosition.z);
  scene.add(light, light.target);
  rig.position.set(stagePosition.x, 0, stagePosition.z + 0.2);
  scene.add(rig);
  return { rig, light };
}

function moveTownPerformerToStage(member, index, elapsed) {
  const positions = [
    { x: -1.05, z: -2.7 },
    { x: -0.35, z: -2.96 },
    { x: 0.35, z: -2.96 },
    { x: 1.05, z: -2.7 }
  ];
  const target = positions[index % positions.length];
  member.position.x += (target.x - member.position.x) * 0.1;
  member.position.z += (target.z - member.position.z) * 0.1;
  member.position.y = townStageSurfaceY + Math.abs(Math.sin(elapsed * 4 + index)) * 0.035;
  member.rotation.z = 0;
  member.rotation.y = Math.sin(elapsed * 2 + index) * 0.35;
}

function moveTownAudienceAroundStage(member, index, elapsed) {
  const angle = elapsed * 0.28 + index * 0.62;
  const ring = 3.35 + (index % 2) * 0.35;
  const targetX = Math.cos(angle) * ring;
  const targetZ = -2.7 + Math.sin(angle) * ring * 0.55;
  member.position.x += (targetX - member.position.x) * 0.045;
  member.position.z += (targetZ - member.position.z) * 0.045;
  member.position.y = Math.abs(Math.sin(elapsed * 1.5 + index)) * 0.03;
  member.rotation.z = 0;
  member.rotation.y = angle + Math.PI;
}

function moveTownMemberIntoHome(member, elapsed, index = 0) {
  const home = member?.userData?.homeTarget;
  if (!member || !home) return false;
  const delayDone = (elapsed + index * 0.7) % 6 > 0.8;
  if (!delayDone && !member.userData.sleepingAtHome) return true;
  const doorZ = home.z + 0.72;
  member.position.x += (home.x - member.position.x) * 0.08;
  member.position.z += (doorZ - member.position.z) * 0.08;
  member.position.y = Math.abs(Math.sin(elapsed * 2.6 + index)) * 0.035;
  member.rotation.z = 0;
  member.rotation.y = 0;
  if (Math.hypot(member.position.x - home.x, member.position.z - doorZ) < 0.18) {
    member.userData.sleepingAtHome = true;
    member.visible = false;
  }
  return true;
}

function sendTownMemberHomeToSleep(member, elapsed = 0, index = 0) {
  return moveTownMemberIntoHome(member, elapsed, index);
}

function makeTownTent(THREE, scene, color, x, z) {
  const group = new THREE.Group();
  const cloth = new THREE.Mesh(
    new THREE.ConeGeometry(0.72, 1.05, 3),
    new THREE.MeshStandardMaterial({ color, roughness: 0.74 })
  );
  cloth.position.y = 0.52;
  cloth.rotation.y = Math.PI / 6;
  const door = new THREE.Mesh(
    new THREE.CircleGeometry(0.2, 16),
    new THREE.MeshBasicMaterial({ color: 0x221a2a, side: THREE.DoubleSide })
  );
  door.position.set(0, 0.28, 0.56);
  group.add(cloth, door);
  group.position.set(x, 0, z);
  scene.add(group);
  return group;
}

function makeTownComputerCharacter(THREE, scene, x, z) {
  const character = townSprunkiCharacters.find((item) => item.name === "Mr. Fun Computer");
  const group = new THREE.Group();
  group.name = "Mr. Fun Computer";
  const dark = new THREE.MeshStandardMaterial({ color: 0x17314f, roughness: 0.45 });
  const screenCanvas = document.createElement("canvas");
  screenCanvas.width = 192;
  screenCanvas.height = 96;
  const screenContext = screenCanvas.getContext("2d");
  screenContext.fillStyle = "#050505";
  screenContext.fillRect(0, 0, screenCanvas.width, screenCanvas.height);
  screenContext.fillStyle = "#ffffff";
  screenContext.font = "900 24px sans-serif";
  screenContext.fillText("电脑先生", 18, 35);
  const screenTexture = new THREE.CanvasTexture(screenCanvas);
  const glow = new THREE.MeshBasicMaterial({ map: screenTexture });
  const screenFrame = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.78, 0.16), dark);
  screenFrame.position.set(0, 1.22, 0);
  const screen = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.52, 0.03), glow);
  screen.position.set(0, 1.24, 0.095);
  screen.userData = {
    canvas: screenCanvas,
    context: screenContext,
    texture: screenTexture,
    typeTimer: null
  };
  const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.09, 0.38, 14), dark);
  stand.position.set(0, 0.66, 0);
  const base = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.12, 0.34), dark);
  base.position.set(0, 0.41, 0.04);
  const keyboard = new THREE.Mesh(
    new THREE.BoxGeometry(1.06, 0.08, 0.38),
    new THREE.MeshStandardMaterial({ color: 0xd7e1ee, roughness: 0.5 })
  );
  keyboard.position.set(0, 0.28, 0.42);
  keyboard.rotation.x = -0.22;
  const eyeWhiteMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0x111111 });
  const leftEyeWhite = new THREE.Mesh(new THREE.SphereGeometry(0.074, 14, 10), eyeWhiteMaterial);
  const rightEyeWhite = leftEyeWhite.clone();
  const leftEye = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 8), eyeMaterial);
  const rightEye = leftEye.clone();
  leftEyeWhite.position.set(-0.18, 1.31, 0.12);
  rightEyeWhite.position.set(0.18, 1.31, 0.12);
  leftEye.position.set(-0.18, 1.31, 0.145);
  rightEye.position.set(0.18, 1.31, 0.145);
  const mouth = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.014, 8, 18, Math.PI), eyeMaterial);
  mouth.position.set(0, 1.12, 0.125);
  mouth.rotation.z = Math.PI;
  const label = makeTownNameLabel(THREE, character.zh);
  label.position.y = 2.05;
  group.add(screenFrame, screen, stand, base, keyboard, leftEyeWhite, rightEyeWhite, leftEye, rightEye, mouth, label);
  group.position.set(x, 0, z);
  group.userData = {
    baseX: x,
    baseZ: z,
    backgroundCharacter: true,
    fixed: true,
    computerScreen: screen,
    mouth,
    pupils: [leftEye, rightEye],
    pupilHomes: [leftEye.position.clone(), rightEye.position.clone()],
    speaker: "Mr. Fun Computer",
    zh: character.zh,
    color: character.color,
    baseScale: 1
  };
  scene.add(group);
  return group;
}

function makeTownTreeCharacter(THREE, scene, x, z) {
  const character = townSprunkiCharacters.find((item) => item.name === "Mr. Tree");
  const group = new THREE.Group();
  group.name = "Mr. Tree";
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.28, 0.36, 1.75, 18),
    new THREE.MeshStandardMaterial({ color: 0x6a4428, roughness: 0.78 })
  );
  trunk.position.y = 0.92;
  const crown = new THREE.Mesh(
    new THREE.SphereGeometry(0.72, 24, 16),
    new THREE.MeshStandardMaterial({ color: 0x3f9d55, roughness: 0.72 })
  );
  crown.position.y = 2.02;
  crown.scale.set(1.2, 0.88, 1.05);
  const eyeWhiteMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0x111111 });
  const leftEyeWhite = new THREE.Mesh(new THREE.SphereGeometry(0.085, 14, 10), eyeWhiteMaterial);
  const rightEyeWhite = leftEyeWhite.clone();
  const leftEye = new THREE.Mesh(new THREE.SphereGeometry(0.052, 12, 8), eyeMaterial);
  const rightEye = leftEye.clone();
  leftEyeWhite.position.set(-0.12, 1.14, 0.31);
  rightEyeWhite.position.set(0.12, 1.14, 0.31);
  leftEye.position.set(-0.12, 1.14, 0.35);
  rightEye.position.set(0.12, 1.14, 0.35);
  const mouth = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.014, 8, 18, Math.PI), eyeMaterial);
  mouth.position.set(0, 0.93, 0.32);
  mouth.rotation.z = Math.PI;
  const label = makeTownNameLabel(THREE, character.zh);
  label.position.y = 2.88;
  group.add(trunk, crown, leftEyeWhite, rightEyeWhite, leftEye, rightEye, mouth, label);
  group.position.set(x, 0, z);
  group.userData = {
    baseX: x,
    baseZ: z,
    backgroundCharacter: true,
    slowBackgroundWalker: true,
    mouth,
    pupils: [leftEye, rightEye],
    pupilHomes: [leftEye.position.clone(), rightEye.position.clone()],
    speaker: "Mr. Tree",
    zh: character.zh,
    color: character.color,
    baseScale: 1
  };
  scene.add(group);
  return group;
}

function makeTownMall(THREE, scene, x, z) {
  const group = makeTownBusiness(THREE, scene, { id: "mall", name: "小镇商城", kind: "clothes", color: 0xf7d65d, x, z });
  group.name = "小镇商城";
  group.userData.townMall = true;
  return group;
}

function keepTownWalkerOutOfObstacles(x, z, obstacles) {
  let nextX = x;
  let nextZ = z;
  obstacles.forEach((obstacle) => {
    const dx = nextX - obstacle.x;
    const dz = nextZ - obstacle.z;
    const distance = Math.hypot(dx, dz);
    if (distance > 0 && distance < obstacle.radius) {
      const push = obstacle.radius - distance;
      nextX += (dx / distance) * push;
      nextZ += (dz / distance) * push;
    }
  });
  return { x: nextX, z: nextZ };
}

function getTownHitRoot(object) {
  let current = object;
  while (current) {
    if (current.userData?.speaker || current.userData?.townMall || current.userData?.townBusiness || current.userData?.townHomeFor) return current;
    current = current.parent;
  }
  return null;
}

function applyTownClothing(THREE, member, item) {
  if (!member || !item || member.userData.backgroundCharacter) return;
  if (member.userData.outfit) {
    member.remove(member.userData.outfit);
  }
  const outfit = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.36, 0.62, 8, 18),
    new THREE.MeshStandardMaterial({ color: item.color, roughness: 0.5 })
  );
  outfit.name = `衣服-${item.name}`;
  outfit.position.y = 0.78;
  member.add(outfit);
  member.userData.outfit = outfit;
  member.userData.outfitName = item.name;
}

function getTownMemberScale(member, focused = false) {
  const baseScale = member?.userData?.baseScale || 1;
  return focused ? Math.max(townResidentFocusScale, baseScale * 1.58) : baseScale;
}

function setTownMemberScale(member, focused = false) {
  if (!member) return;
  member.scale.setScalar(getTownMemberScale(member, focused));
}

function makeTownHeartSprite(THREE) {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext("2d");
  context.fillStyle = "#ff4f7d";
  context.beginPath();
  context.moveTo(64, 104);
  context.bezierCurveTo(14, 70, 22, 24, 50, 30);
  context.bezierCurveTo(58, 32, 63, 38, 64, 45);
  context.bezierCurveTo(65, 38, 70, 32, 78, 30);
  context.bezierCurveTo(106, 24, 114, 70, 64, 104);
  context.fill();
  const texture = new THREE.CanvasTexture(canvas);
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true }));
  sprite.position.set(0, 2.65, 0.45);
  sprite.scale.set(1.1, 1.1, 1);
  sprite.visible = false;
  return sprite;
}

function makeTownRoundHand(THREE, color, side = 1) {
  const hand = new THREE.Mesh(
    new THREE.SphereGeometry(0.115, 16, 12),
    new THREE.MeshStandardMaterial({ color, roughness: 0.58 })
  );
  hand.name = side < 0 ? "左圆手" : "右圆手";
  hand.position.set(side * 0.44, 0.88, 0.03);
  return hand;
}

function makeTownBaby(THREE, scene, x, z) {
  const group = new THREE.Group();
  group.name = "宝宝";
  const blanket = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.22, 0.42, 8, 16),
    new THREE.MeshStandardMaterial({ color: 0xffd1e7, roughness: 0.58 })
  );
  blanket.position.y = 0.46;
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.2, 20, 14),
    new THREE.MeshStandardMaterial({ color: 0xffd8bc, roughness: 0.55 })
  );
  head.position.y = 0.9;
  const eyeWhiteMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0x111111 });
  const leftEyeWhite = new THREE.Mesh(new THREE.SphereGeometry(0.04, 10, 8), eyeWhiteMaterial);
  const rightEyeWhite = leftEyeWhite.clone();
  const leftEye = new THREE.Mesh(new THREE.SphereGeometry(0.024, 10, 8), eyeMaterial);
  const rightEye = leftEye.clone();
  leftEyeWhite.position.set(-0.07, 0.94, 0.17);
  rightEyeWhite.position.set(0.07, 0.94, 0.17);
  leftEye.position.set(-0.07, 0.94, 0.195);
  rightEye.position.set(0.07, 0.94, 0.195);
  const mouth = new THREE.Mesh(new THREE.TorusGeometry(0.05, 0.008, 8, 14, Math.PI), eyeMaterial);
  mouth.position.set(0, 0.83, 0.2);
  mouth.rotation.z = Math.PI;
  const label = makeTownNameLabel(THREE, "宝宝");
  label.position.y = 1.45;
  label.scale.set(0.86, 0.3, 1);
  group.add(blanket, head, leftEyeWhite, rightEyeWhite, leftEye, rightEye, mouth, label);
  group.position.set(x, 0, z);
  group.visible = false;
  group.userData = {
    baseX: x,
    baseZ: z,
    baby: true,
    mouth,
    pupils: [leftEye, rightEye],
    pupilHomes: [leftEye.position.clone(), rightEye.position.clone()],
    speaker: "宝宝",
    zh: "宝宝"
  };
  scene.add(group);
  return group;
}

function makeTownSprunki(THREE, scene, color, x, z, name) {
  if (name === "Mr. Fun Computer") return makeTownComputerCharacter(THREE, scene, x, z);
  if (name === "Mr. Tree") return makeTownTreeCharacter(THREE, scene, x, z);
  const group = new THREE.Group();
  group.name = name;
  const body = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.32, 0.86, 8, 18),
    new THREE.MeshStandardMaterial({ color, roughness: 0.62 })
  );
  body.position.y = 0.82;
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.42, 28, 18),
    new THREE.MeshStandardMaterial({ color, roughness: 0.58 })
  );
  head.position.y = 1.52;
  const eyeWhiteMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0x111111 });
  const leftEyeWhite = new THREE.Mesh(new THREE.SphereGeometry(0.078, 14, 10), eyeWhiteMaterial);
  const rightEyeWhite = leftEyeWhite.clone();
  const leftEye = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 8), eyeMaterial);
  const rightEye = leftEye.clone();
  leftEyeWhite.position.set(-0.15, 1.58, 0.36);
  rightEyeWhite.position.set(0.15, 1.58, 0.36);
  leftEye.position.set(-0.15, 1.58, 0.405);
  rightEye.position.set(0.15, 1.58, 0.405);
  const mouth = new THREE.Mesh(
    new THREE.TorusGeometry(0.11, 0.014, 8, 18, Math.PI),
    new THREE.MeshBasicMaterial({ color: 0x111111 })
  );
  mouth.position.set(0, 1.42, 0.37);
  mouth.rotation.z = Math.PI;
  const antenna = new THREE.Mesh(
    new THREE.SphereGeometry(0.08, 12, 8),
    new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: color, emissiveIntensity: 0.28 })
  );
  antenna.position.set(0, 2.02, 0);
  const leftHand = makeTownRoundHand(THREE, color, -1);
  const rightHand = makeTownRoundHand(THREE, color, 1);
  group.add(body, head, leftEyeWhite, rightEyeWhite, leftEye, rightEye, mouth, antenna, leftHand, rightHand);
  addTownSprunkiFeatures(THREE, group, name, color);
  group.add(makeTownNameLabel(THREE, townSprunkiCharacters.find((item) => item.name === name)?.zh || name));
  group.position.set(x, 0, z);
  group.scale.setScalar(townResidentScale);
  group.userData.baseX = x;
  group.userData.baseZ = z;
  group.userData.baseScale = townResidentScale;
  group.userData.speaker = name;
  group.userData.zh = townSprunkiCharacters.find((item) => item.name === name)?.zh || name;
  group.userData.color = color;
  group.userData.mouth = mouth;
  group.userData.pupils = [leftEye, rightEye];
  group.userData.pupilHomes = [leftEye.position.clone(), rightEye.position.clone()];
  scene.add(group);
  return group;
}

function makeTownNameLabel(THREE, label) {
  const canvas = document.createElement("canvas");
  canvas.width = 192;
  canvas.height = 64;
  const context = canvas.getContext("2d");
  context.fillStyle = "rgba(255, 255, 255, 0.88)";
  context.fillRect(0, 8, 192, 44);
  context.strokeStyle = "#151515";
  context.lineWidth = 6;
  context.strokeRect(3, 11, 186, 38);
  context.fillStyle = "#151515";
  context.font = "900 24px sans-serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(label, 96, 32);
  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
  const sprite = new THREE.Sprite(material);
  sprite.position.set(0, 2.42, 0);
  sprite.scale.set(1.25, 0.42, 1);
  return sprite;
}

function addTownSprunkiFeatures(THREE, group, name, color) {
  const dark = new THREE.MeshStandardMaterial({ color: 0x16151a, roughness: 0.56 });
  const accent = new THREE.MeshStandardMaterial({ color, roughness: 0.5 });
  const metal = new THREE.MeshStandardMaterial({ color: 0xc7ced8, metalness: 0.25, roughness: 0.42 });
  const addEarPair = (material, y = 1.9, size = 0.13) => {
    [-0.28, 0.28].forEach((xOffset) => {
      const ear = new THREE.Mesh(new THREE.ConeGeometry(size, size * 2.1, 16), material);
      ear.position.set(xOffset, y, 0.04);
      ear.rotation.z = xOffset < 0 ? 0.32 : -0.32;
      group.add(ear);
    });
  };
  const addChestDisc = (material, y = 0.9) => {
    const disc = new THREE.Mesh(new THREE.TorusGeometry(0.17, 0.025, 8, 24), material);
    disc.position.set(0, y, 0.32);
    group.add(disc);
  };
  if (name === "Oren") {
    const leftCup = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.035, 10, 22), dark);
    const rightCup = leftCup.clone();
    leftCup.position.set(-0.4, 1.55, 0.03);
    rightCup.position.set(0.4, 1.55, 0.03);
    leftCup.rotation.y = Math.PI / 2;
    rightCup.rotation.y = Math.PI / 2;
    const band = new THREE.Mesh(new THREE.TorusGeometry(0.43, 0.025, 10, 28, Math.PI), dark);
    band.position.set(0, 1.77, 0.01);
    band.rotation.z = Math.PI;
    group.add(leftCup, rightCup, band);
  } else if (name === "Raddy") {
    [-0.18, 0.18].forEach((xOffset) => {
      const horn = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.38, 14), accent);
      horn.position.set(xOffset, 1.98, 0.03);
      horn.rotation.z = xOffset < 0 ? 0.38 : -0.38;
      group.add(horn);
    });
  } else if (name === "Clukr") {
    const antennaStem = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.42, 10), metal);
    antennaStem.position.set(0, 2.12, 0);
    const dish = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.025, 8, 26), metal);
    dish.position.set(0, 2.34, 0);
    dish.rotation.x = Math.PI / 2;
    group.add(antennaStem, dish);
  } else if (name === "Pinki") {
    const bowLeft = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.28, 18), accent);
    const bowRight = bowLeft.clone();
    bowLeft.position.set(-0.18, 1.92, 0.16);
    bowRight.position.set(0.18, 1.92, 0.16);
    bowLeft.rotation.z = Math.PI / 2;
    bowRight.rotation.z = -Math.PI / 2;
    group.add(bowLeft, bowRight);
  } else if (name === "Vineria") {
    for (let index = 0; index < 5; index += 1) {
      const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 8), new THREE.MeshStandardMaterial({ color: 0x3f9d55, roughness: 0.62 }));
      leaf.scale.set(1.45, 0.62, 0.28);
      leaf.position.set(-0.26 + index * 0.13, 1.94 + Math.sin(index) * 0.06, 0.1);
      leaf.rotation.z = index * 0.65;
      group.add(leaf);
    }
  } else if (name === "Fun Bot") {
    const visor = new THREE.Mesh(new THREE.CapsuleGeometry(0.18, 0.28, 8, 16), new THREE.MeshBasicMaterial({ color: 0x10151f }));
    visor.position.set(0, 1.58, 0.39);
    visor.rotation.z = Math.PI / 2;
    const leftBlueEye = new THREE.Mesh(new THREE.SphereGeometry(0.035, 12, 8), new THREE.MeshBasicMaterial({ color: 0x48c7ff }));
    const rightBlueEye = leftBlueEye.clone();
    leftBlueEye.position.set(-0.09, 1.59, 0.55);
    rightBlueEye.position.set(0.09, 1.59, 0.55);
    const earLeft = new THREE.Mesh(new THREE.SphereGeometry(0.11, 14, 10), metal);
    const earRight = earLeft.clone();
    earLeft.position.set(-0.47, 1.54, 0.02);
    earRight.position.set(0.47, 1.54, 0.02);
    group.add(visor, leftBlueEye, rightBlueEye, earLeft, earRight);
  } else if (name === "Gray") {
    addEarPair(dark, 1.93, 0.11);
    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.31, 0.028, 8, 26), dark);
    collar.position.set(0, 1.12, 0);
    collar.rotation.x = Math.PI / 2;
    group.add(collar);
  } else if (name === "Brud") {
    const bucket = new THREE.Mesh(new THREE.CylinderGeometry(0.31, 0.36, 0.34, 20, 1, true), dark);
    bucket.position.set(0, 1.88, 0);
    const handle = new THREE.Mesh(new THREE.TorusGeometry(0.29, 0.018, 8, 24, Math.PI), dark);
    handle.position.set(0, 2.04, 0);
    handle.rotation.z = Math.PI;
    group.add(bucket, handle);
  } else if (name === "Garnold") {
    const goggles = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.028, 8, 24), metal);
    const gogglesRight = goggles.clone();
    goggles.position.set(-0.16, 1.58, 0.38);
    gogglesRight.position.set(0.16, 1.58, 0.38);
    addChestDisc(metal, 0.94);
    group.add(goggles, gogglesRight);
  } else if (name === "Owakcx") {
    for (let index = 0; index < 7; index += 1) {
      const hair = new THREE.Mesh(new THREE.ConeGeometry(0.055, 0.38, 10), accent);
      hair.position.set(-0.3 + index * 0.1, 1.93 + Math.sin(index) * 0.06, 0.05);
      hair.rotation.z = -0.8 + index * 0.25;
      group.add(hair);
    }
  } else if (name === "Sky") {
    addEarPair(accent, 1.94, 0.12);
    const cheek = new THREE.Mesh(new THREE.SphereGeometry(0.04, 10, 8), new THREE.MeshBasicMaterial({ color: 0xff9cc8 }));
    const cheekRight = cheek.clone();
    cheek.position.set(-0.24, 1.45, 0.39);
    cheekRight.position.set(0.24, 1.45, 0.39);
    group.add(cheek, cheekRight);
  } else if (name === "Mr. Sun") {
    for (let index = 0; index < 9; index += 1) {
      const ray = new THREE.Mesh(new THREE.ConeGeometry(0.055, 0.32, 10), accent);
      const angle = (Math.PI * 2 * index) / 9;
      ray.position.set(Math.cos(angle) * 0.46, 1.52 + Math.sin(angle) * 0.46, 0.02);
      ray.rotation.z = -angle + Math.PI / 2;
      group.add(ray);
    }
  } else if (name === "Durple") {
    group.scale.y = 1.22;
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.62, 18), accent);
    neck.position.set(0, 1.25, 0);
    group.add(neck);
  } else if (name === "Mr. Tree") {
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.15, 0.7, 14), new THREE.MeshStandardMaterial({ color: 0x6a4428, roughness: 0.72 }));
    trunk.position.set(0, 1.45, 0);
    const top = new THREE.Mesh(new THREE.SphereGeometry(0.36, 18, 12), new THREE.MeshStandardMaterial({ color: 0x3f9d55, roughness: 0.72 }));
    top.position.set(0, 1.92, 0);
    group.add(trunk, top);
  } else if (name === "Simon") {
    for (let index = 0; index < 5; index += 1) {
      const spike = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.28, 10), accent);
      spike.position.set(-0.24 + index * 0.12, 1.93, 0.06);
      spike.rotation.z = -0.45 + index * 0.22;
      group.add(spike);
    }
  } else if (name === "Tunner") {
    const brim = new THREE.Mesh(new THREE.CylinderGeometry(0.43, 0.43, 0.045, 28), dark);
    brim.position.set(0, 1.86, 0);
    const hat = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.3, 0.28, 24), dark);
    hat.position.set(0, 2.02, 0);
    group.add(brim, hat);
  } else if (name === "Mr. Fun Computer") {
    const screen = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.36, 0.06), new THREE.MeshBasicMaterial({ color: 0x9ff7ff }));
    screen.position.set(0, 1.55, 0.42);
    addChestDisc(metal, 0.9);
    group.add(screen);
  } else if (name === "Wenda") {
    addEarPair(accent, 1.96, 0.1);
    const lashes = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.012, 8, 18, Math.PI), dark);
    lashes.position.set(0, 1.68, 0.4);
    group.add(lashes);
  } else if (name === "Jevin") {
    const hood = new THREE.Mesh(new THREE.TorusGeometry(0.43, 0.075, 12, 30), accent);
    hood.position.set(0, 1.52, 0.04);
    hood.rotation.x = Math.PI / 2;
    group.add(hood);
  } else if (name === "Black") {
    const halo = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.025, 8, 34), new THREE.MeshBasicMaterial({ color: 0x101014 }));
    halo.position.set(0, 2.05, 0);
    halo.rotation.x = Math.PI / 2;
    const glow = new THREE.PointLight(0x5a4cff, 0.9, 3);
    glow.position.set(0, 1.7, 0.4);
    group.add(halo, glow);
  }
}

function makeTownSkyFace(THREE, name, color, emissive) {
  const group = new THREE.Group();
  group.name = name;
  const face = new THREE.Mesh(
    new THREE.SphereGeometry(0.62, 40, 24),
    new THREE.MeshStandardMaterial({ color, emissive, emissiveIntensity: 0.7, roughness: 0.45 })
  );
  const eyeWhiteMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0x151515 });
  const leftEyeWhite = new THREE.Mesh(new THREE.SphereGeometry(0.105, 16, 10), eyeWhiteMaterial);
  const rightEyeWhite = leftEyeWhite.clone();
  const leftEye = new THREE.Mesh(new THREE.SphereGeometry(0.065, 16, 10), eyeMaterial);
  const rightEye = leftEye.clone();
  leftEyeWhite.position.set(-0.18, 0.13, 0.59);
  rightEyeWhite.position.set(0.18, 0.13, 0.59);
  leftEye.position.set(-0.18, 0.13, 0.66);
  rightEye.position.set(0.18, 0.13, 0.66);
  const mouth = new THREE.Mesh(
    new THREE.TorusGeometry(0.17, 0.018, 8, 22, Math.PI),
    new THREE.MeshBasicMaterial({ color: 0x151515 })
  );
  mouth.position.set(0, -0.11, 0.6);
  mouth.rotation.z = Math.PI;
  group.add(face, leftEyeWhite, rightEyeWhite, leftEye, rightEye, mouth);
  if (name === "太阳公公") {
    for (let index = 0; index < 10; index += 1) {
      const ray = new THREE.Mesh(
        new THREE.ConeGeometry(0.08, 0.38, 12),
        new THREE.MeshStandardMaterial({ color: 0xffc83d, emissive: 0xffa600, emissiveIntensity: 0.35 })
      );
      const angle = (Math.PI * 2 * index) / 10;
      ray.position.set(Math.cos(angle) * 0.86, Math.sin(angle) * 0.86, 0);
      ray.rotation.z = -angle + Math.PI / 2;
      group.add(ray);
    }
  } else {
    const crescent = new THREE.Mesh(
      new THREE.SphereGeometry(0.48, 32, 16),
      new THREE.MeshBasicMaterial({ color: 0x15233f })
    );
    crescent.position.set(0.22, 0.12, 0.18);
    group.add(crescent);
    leftEyeWhite.position.z = 0.62;
    rightEyeWhite.position.z = 0.62;
    leftEye.position.z = 0.69;
    rightEye.position.z = 0.69;
    mouth.position.z = 0.63;
  }
  group.userData.speaker = name;
  group.userData.zh = name;
  group.userData.mouth = mouth;
  group.userData.pupils = [leftEye, rightEye];
  group.userData.pupilHomes = [leftEye.position.clone(), rightEye.position.clone()];
  return group;
}

function renderTownAvatarBar(townRoot, townAvatarTargets, onFocus) {
  const avatarBar = townRoot?.querySelector(".computer-town-avatar-bar");
  if (!avatarBar) return;
  avatarBar.innerHTML = "";
  townAvatarTargets
    .filter((avatarTarget) => avatarTarget?.member?.userData?.speaker)
    .forEach((member) => {
      const avatarTarget = member;
      member = avatarTarget.member;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "computer-town-avatar";
      button.dataset.townAvatar = member.userData.speaker;
      button.style.setProperty("--avatar-color", `#${(member.userData.color || 0x88c7ff).toString(16).padStart(6, "0")}`);
      button.style.setProperty("--town-avatar-icon", `url("${townIconFile(member.userData.speaker)}")`);
      button.innerHTML = `<span></span><strong>${member.userData.zh}</strong>`;
      button.addEventListener("click", () => onFocus?.(avatarTarget));
      avatarBar.appendChild(button);
    });
}

function renderTownInteriorResident(townRoot, ownerName, mode = "day") {
  const scene = townRoot?.querySelector("[data-town-resident-scene]");
  if (!scene) return;
  const character = townSprunkiCharacters.find((item) => item.name === ownerName);
  const isSleeping = mode === "sleep";
  scene.innerHTML = `
    <div class="computer-town-resident-scene ${isSleeping ? "sleeping" : "awake"}">
      <span class="computer-town-pixel-tv"></span>
      <span class="computer-town-pixel-resident" style="--resident-color: #${(character?.color || 0x88c7ff).toString(16).padStart(6, "0")}">
        <i></i><i></i>
      </span>
      <span class="computer-town-pixel-phone"></span>
      <strong>${character?.zh || "居民"}${isSleeping ? "在床上睡觉" : "在家里休息"}</strong>
    </div>
  `;
}

function openTownHouseInterior(townRoot, ownerName, mode = "day") {
  const panel = townRoot?.querySelector(".computer-town-house-interior-panel");
  const title = townRoot?.querySelector("[data-town-house-title]");
  if (!panel) return;
  const character = townSprunkiCharacters.find((item) => item.name === ownerName);
  if (title) title.textContent = `${character?.zh || "居民"}的家`;
  renderTownInteriorResident(townRoot, ownerName, mode);
  panel.hidden = false;
  townRoot.querySelector(".computer-town-store-page")?.setAttribute("hidden", "");
  townRoot.querySelector(".computer-town-market-panel")?.setAttribute("hidden", "");
  townRoot.querySelector(".computer-town-shop-panel")?.setAttribute("hidden", "");
  townRoot.querySelector(".computer-town-character-panel")?.setAttribute("hidden", "");
}

function closeTownHouseInterior(townRoot) {
  const panel = townRoot?.querySelector(".computer-town-house-interior-panel");
  if (panel) panel.hidden = true;
}

function renderTownStoreProducts(townRoot, storeId, onBuy) {
  const grid = townRoot?.querySelector("[data-town-store-products]");
  if (!grid) return;
  grid.innerHTML = "";
  townStageThreeProducts
    .filter((product) => product.store === storeId)
    .forEach((product) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "computer-town-product-card";
      button.dataset.townProduct = product.id;
      button.innerHTML = `
        <span class="computer-town-product-icon" style="--product-color: #${(product.color || 0xffd35a).toString(16).padStart(6, "0")}">${product.icon}</span>
        <strong>${product.name}</strong>
        <small>${product.price}块</small>
      `;
      button.addEventListener("click", () => onBuy?.(product));
      grid.appendChild(button);
    });
}

function openTownStorePage(townRoot, storeId, onBuy) {
  const panel = townRoot?.querySelector(".computer-town-store-page");
  const title = townRoot?.querySelector("[data-town-store-title]");
  if (!panel) return;
  const business = townStageThreeBusinesses.find((item) => item.id === storeId);
  if (title) title.textContent = business?.name || "小镇商店";
  renderTownStoreProducts(townRoot, storeId, onBuy);
  panel.hidden = false;
  closeTownHouseInterior(townRoot);
  townRoot.querySelector(".computer-town-market-panel")?.setAttribute("hidden", "");
  townRoot.querySelector(".computer-town-shop-panel")?.setAttribute("hidden", "");
  townRoot.querySelector(".computer-town-character-panel")?.setAttribute("hidden", "");
}

function closeTownStorePage(townRoot) {
  const panel = townRoot?.querySelector(".computer-town-store-page");
  if (panel) panel.hidden = true;
}

function autoDressTownResident(THREE, member, item) {
  if (!member || !item || item.kind !== "clothes") return false;
  applyTownClothing(THREE, member, item);
  member.userData.justBoughtClothes = item.name;
  return true;
}

function startComputerTown3D(host) {
  stopComputerTown3D();
  if (!host) return;
      const TOWN_CONCERT_SECONDS = 90;
      const TOWN_SHOP_SECONDS = 10;
      host.classList.add("loading");
  loadComputerTownThree()
    .then((THREE) => {
      if (!host.isConnected) return;
      host.classList.remove("loading");
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.shadowMap.enabled = true;
      host.innerHTML = "";
      host.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x7fcaf2);
      const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 100);
      camera.position.set(0, 5.5, 10.5);
      camera.lookAt(0, 0.9, 0);

      const ambient = new THREE.HemisphereLight(0xffffff, 0x77634b, 1.35);
      scene.add(ambient);
      const sunLight = new THREE.DirectionalLight(0xfff0b0, 1.8);
      sunLight.castShadow = true;
      scene.add(sunLight);

      const ground = new THREE.Mesh(
        new THREE.CircleGeometry(13.2, 80),
        new THREE.MeshStandardMaterial({ color: 0x4ea35d, roughness: 0.85 })
      );
      ground.rotation.x = -Math.PI / 2;
      scene.add(ground);

      const path = new THREE.Mesh(
        new THREE.RingGeometry(2.85, 3.25, 64),
        new THREE.MeshStandardMaterial({ color: 0xd9bd74, roughness: 0.88, side: THREE.DoubleSide })
      );
      path.rotation.x = -Math.PI / 2;
      path.position.y = 0.012;
      scene.add(path);

      const horizon = new THREE.Mesh(
        new THREE.TorusGeometry(12.0, 0.035, 8, 96),
        new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x7fcaf2, emissiveIntensity: 0.2 })
      );
      horizon.position.y = 0.05;
      horizon.rotation.x = Math.PI / 2;
      scene.add(horizon);

      const groundCharacters = townSprunkiCharacters.filter((character) => !character.skyOnly);
      const residentHomeMap = new Map();
      const houses = groundCharacters.map((character, index) => {
        const angle = (Math.PI * 2 * index) / groundCharacters.length - Math.PI / 2;
        const radius = character.name === "Mr. Fun Computer" || character.name === "Mr. Tree" ? townOuterLayoutRadius : townLayoutRadius;
        const override = residentHomeOverrides[character.name];
        const x = override?.x ?? Math.cos(angle) * radius;
        const z = override?.z ?? Math.sin(angle) * radius + 1.25;
        const house = makeTownStageThreeHouse(THREE, scene, character, x, z, character.name === "Mr. Fun Computer" ? 0.95 : 0.78);
        residentHomeMap.set(character.name, house);
        return house;
      });
      const businesses = townStageThreeBusinesses.map((business) => makeTownBusiness(THREE, scene, business));
      const mall = businesses.find((business) => business.userData.townBusiness?.kind === "clothes") || makeTownMall(THREE, scene, 6.7, -3.8);
      const supermarket = businesses.find((business) => business.userData.townBusiness?.kind === "food") || mall;
      const tents = [
        makeTownTent(THREE, scene, 0xff9d4d, -5.0, 2.8),
        makeTownTent(THREE, scene, 0xe84848, -3.4, 3.3),
        makeTownTent(THREE, scene, 0x8ba5ff, 4.6, 2.9),
        makeTownTent(THREE, scene, 0xf38fca, 3.2, 3.5)
      ];
      const townObstacles = [
        ...houses.map((house) => ({ x: house.position.x, z: house.position.z, radius: 1.35 })),
        ...businesses.map((business) => ({ x: business.position.x, z: business.position.z, radius: 1.55 })),
        ...tents.map((tent) => ({ x: tent.position.x, z: tent.position.z, radius: 0.92 })),
        { x: 0, z: -2.7, radius: townStageRadius + 0.7 }
      ];
      const familyHome = residentHomeMap.get("Oren") || houses[2];
      const stage = new THREE.Mesh(
        new THREE.CylinderGeometry(townStageRadius, townStageRadius + 0.18, 0.42, 48),
        new THREE.MeshStandardMaterial({ color: 0x342f52, roughness: 0.72 })
      );
      stage.position.set(0, 0.18, -2.7);
      scene.add(stage);
      const stageLights = makeTownStageLightRig(THREE, scene, stage.position);

      const sun = makeTownSkyFace(THREE, "太阳公公", 0xffdd42, 0xffc400);
      scene.add(sun);

      const members = groundCharacters.map((character, index) => {
        const angle = (Math.PI * 2 * index) / groundCharacters.length - Math.PI / 2;
        const backgroundEdge = character.name === "Mr. Fun Computer" || character.name === "Mr. Tree";
        const radius = backgroundEdge ? 8.9 : index < 10 ? 5.8 : 7.6;
        const x = character.name === "Mr. Fun Computer" ? 0 : character.name === "Mr. Tree" ? 10.4 : Math.cos(angle) * radius;
        const z = character.name === "Mr. Fun Computer" ? -8.35 : character.name === "Mr. Tree" ? -9.4 : Math.sin(angle) * radius + 0.35;
        const member = makeTownSprunki(
          THREE,
          scene,
          character.color,
          x,
          z,
          character.name
        );
        const home = residentHomeMap.get(character.name);
        if (home) {
          member.userData.homeTarget = { x: home.position.x, z: home.position.z };
        }
        return member;
      });
      const baby = makeTownBaby(THREE, scene, 0, 1.75);
      const heart = makeTownHeartSprite(THREE);
      scene.add(heart);
      const speakers = new Map();
      [sun, ...members, baby].forEach((item) => {
        speakers.set(item.userData.speaker, item);
        speakers.set(item.userData.zh || item.userData.speaker, item);
      });
      const townRoot = host.closest(".computer-town-app");
      const shopPanel = townRoot?.querySelector(".computer-town-shop-panel");
      const marketPanel = townRoot?.querySelector(".computer-town-market-panel");
      const characterPanel = townRoot?.querySelector(".computer-town-character-panel");
      const selectedName = townRoot?.querySelector("[data-town-selected-name]");
      const closePanels = () => {
        closeTownHouseInterior(townRoot);
        closeTownStorePage(townRoot);
      };
      let townOverviewZoom = "near";
      let cameraFocusTarget = null;
      const focusTownResident = (focusTarget, goHome = false) => {
        const avatarTarget = focusTarget?.member ? focusTarget : { type: "member", member: focusTarget };
        const member = avatarTarget.member;
        if (avatarTarget.type === "sky") {
          selectedTownMember = null;
          cameraFocusTarget = null;
          townOverviewZoom = "overview";
          showComputerTownSpeech(host, member.userData.speaker, member.userData.speaker === "太阳公公" ? "我在天空上看着整个小镇。" : "晚上我也能照到每个房子。");
          return;
        }
        if (!member?.userData?.speaker) return;
        selectedTownMember = member;
        const target = goHome && member.userData.homeTarget ? member.userData.homeTarget : member.position;
        cameraFocusTarget = {
          x: target.x,
          z: target.z,
          lookX: member.position.x,
          lookZ: member.position.z
        };
        if (selectedName) selectedName.textContent = member.userData.zh;
        if (characterPanel) characterPanel.hidden = false;
        if (shopPanel) shopPanel.hidden = true;
        if (marketPanel) marketPanel.hidden = true;
        showComputerTownThought(host, member.userData.speaker, goHome ? "我回家休息一下。" : "我在小镇里走走。");
      };
      const townAvatarTargets = [
        { type: "sky", member: sun },
        ...members.map((member) => ({ type: member.userData.backgroundCharacter ? "background" : "member", member }))
      ];
      renderTownAvatarBar(townRoot, townAvatarTargets, focusTownResident);
      const clothingItems = {
        red: { id: "red", name: "红色演出服", color: 0xe84848, cost: 3 },
        blue: { id: "blue", name: "蓝色演出服", color: 0x48a8ff, cost: 3 },
        gold: { id: "gold", name: "金色演出服", color: 0xffd65d, cost: 5 }
      };
      const ownedTownClothes = new Set();
      const townCouples = [
        ["Oren", "Pinki"],
        ["Jevin", "Black"]
      ];
      let selectedTownMember = null;
      let enlargedTownMember = null;
      let coupleScene = null;
      let babyJoinedTown = false;
      let babyNeedsComfort = false;
      let lastBabyCryAt = 0;
      const getTownCouple = (speaker) => townCouples.find((pair) => pair.includes(speaker)) || null;
      const getActiveTownMembers = () => members.filter((member) => !member.userData.backgroundCharacter);
      const buyTownStageThreeProduct = (product, shopper = selectedTownMember) => {
        if (!product) return;
        const buyer = shopper && !shopper.userData.backgroundCharacter ? shopper : getActiveTownMembers()[0];
        if (money < product.price) {
          showComputerTownSpeech(host, "电脑先生", `${product.name}要 ${product.price} 块钱，钱还不够。`);
          return;
        }
        money = Math.max(0, money - product.price);
        updateMoneyUI();
        saveGameState();
        if (product.kind === "clothes") {
          autoDressTownResident(THREE, buyer, product);
          showComputerTownThought(host, buyer.userData.speaker, `我买到${product.name}，自己换上啦。`);
          return;
        }
        showComputerTownThought(host, buyer.userData.speaker, `买了${product.name}，放进小包里。`);
      };
      const openTownShopPanel = () => {
        if (shopPanel) shopPanel.hidden = false;
        if (marketPanel) marketPanel.hidden = true;
        if (characterPanel) characterPanel.hidden = true;
      };
      const openTownMarketPanel = (business) => {
        if (marketPanel) {
          marketPanel.hidden = false;
          marketPanel.dataset.townBusiness = business?.id || "";
        }
        if (shopPanel) shopPanel.hidden = business?.kind !== "clothes";
        if (characterPanel) characterPanel.hidden = true;
        showComputerTownThought(host, "电脑先生", business?.kind === "food" ? "超市可以买吃的。" : "服装店可以挑衣服。");
      };
      const openTownCharacterPanel = (member) => {
        if (!member?.userData?.speaker || member.userData.backgroundCharacter) return;
        selectedTownMember = member;
        if (selectedName) selectedName.textContent = member.userData.zh;
        if (characterPanel) characterPanel.hidden = false;
        if (shopPanel) shopPanel.hidden = true;
        if (marketPanel) marketPanel.hidden = true;
      };
      const enlargeTownMember = (member) => {
        if (enlargedTownMember && enlargedTownMember !== member) {
          setTownMemberScale(enlargedTownMember, false);
        }
        enlargedTownMember = member;
        const isFocused = member.scale.x <= (member.userData.baseScale || 1) + 0.04;
        setTownMemberScale(member, isFocused);
      };
      const getTownInteriorMode = (ownerName) => {
        const owner = speakers.get(ownerName);
        if (townSleepingActive || owner?.userData.sleepingAtHome) return "sleep";
        return Math.abs(String(ownerName || "").split("").reduce((total, char) => total + char.charCodeAt(0), 0)) % 3 === 0
          ? "home"
          : "day";
      };
      const startTownCoupleScene = () => {
        if (!selectedTownMember || coupleScene) return;
        const couple = getTownCouple(selectedTownMember.userData.speaker);
        if (!couple) {
          showComputerTownSpeech(host, selectedTownMember.userData.speaker, "我还没有设定好的CP。");
          return;
        }
        const first = speakers.get(couple[0]);
        const second = speakers.get(couple[1]);
        if (!first || !second) return;
        if (characterPanel) characterPanel.hidden = true;
        if (shopPanel) shopPanel.hidden = true;
        coupleScene = {
          first,
          second,
          startAt: Date.now() / 1000
        };
        members.forEach((member) => {
          member.visible = member === first || member === second;
          setTownMemberScale(member, member === first || member === second);
        });
        baby.visible = false;
        heart.visible = true;
        showComputerTownSpeech(host, first.userData.speaker, "我们好想在一起呀。", second.userData.speaker);
        window.setTimeout(() => showComputerTownSpeech(host, second.userData.speaker, "我们一起住进家里，照顾新的宝宝。", first.userData.speaker), 2600);
      };
      shopPanel?.querySelectorAll("[data-town-clothing]").forEach((button) => {
        button.addEventListener("click", () => {
          const item = clothingItems[button.dataset.townClothing];
          if (!item) return;
          if (!ownedTownClothes.has(item.id)) {
            if (money < item.cost) {
              showComputerTownSpeech(host, "电脑先生", `钱不够，${item.name}要 ${item.cost} 块钱。`);
              return;
            }
            money = Math.max(0, money - item.cost);
            ownedTownClothes.add(item.id);
            updateMoneyUI();
            saveGameState();
            showComputerTownSpeech(host, "电脑先生", `买到了${item.name}，可以给小镇居民换上。`);
            return;
          }
          showComputerTownSpeech(host, "电脑先生", `${item.name}已经买过了。`);
        });
      });
      characterPanel?.querySelector('[data-town-action="zoom"]')?.addEventListener("click", () => {
        if (selectedTownMember) enlargeTownMember(selectedTownMember);
      });
      characterPanel?.querySelector('[data-town-action="dress"]')?.addEventListener("click", () => {
        if (!selectedTownMember) return;
        const item = [...ownedTownClothes].map((id) => clothingItems[id]).at(-1);
        if (!item) {
          showComputerTownSpeech(host, selectedTownMember.userData.speaker, "还没有买衣服，先去商城买一件吧。");
          return;
        }
        applyTownClothing(THREE, selectedTownMember, item);
        showComputerTownSpeech(host, selectedTownMember.userData.speaker, `我换上${item.name}了。`);
      });
      characterPanel?.querySelector('[data-town-action="couple"]')?.addEventListener("click", startTownCoupleScene);
      townRoot?.querySelector("[data-town-close-interior]")?.addEventListener("click", () => closeTownHouseInterior(townRoot));
      townRoot?.querySelector("[data-town-close-store]")?.addEventListener("click", () => closeTownStorePage(townRoot));
      marketPanel?.querySelectorAll("[data-town-market]").forEach((button) => {
        button.addEventListener("click", () => {
          const kind = button.dataset.townMarket;
          if (kind === "food") {
            openTownStorePage(townRoot, "supermarket", buyTownStageThreeProduct);
          } else {
            openTownStorePage(townRoot, "clothing", buyTownStageThreeProduct);
          }
        });
      });

      const dream = new THREE.Mesh(
        new THREE.TorusKnotGeometry(0.7, 0.18, 90, 10),
        new THREE.MeshStandardMaterial({ color: 0x9d7cff, emissive: 0x342090, emissiveIntensity: 0.35 })
      );
      dream.position.set(0, 2.1, 1.8);
      dream.visible = false;
      scene.add(dream);

      const raycaster = new THREE.Raycaster();
      const pointer = new THREE.Vector2();
      let townSleepingActive = false;
      let lastTownTalkAt = 0;
      let lastTownShopAt = 0;
      let lastTownApplauseProgram = "";
      const onPointerDown = (event) => {
        const rect = renderer.domElement.getBoundingClientRect();
        pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(pointer, camera);
        const hits = raycaster.intersectObjects([...members, baby, sun, ...businesses, ...houses], true);
        if (hits.length) {
          const hitRoot = getTownHitRoot(hits[0].object);
          if (hitRoot?.userData.townBusiness) {
            openTownStorePage(townRoot, hitRoot.userData.townBusiness.id, buyTownStageThreeProduct);
            return;
          }
          if (hitRoot?.userData.townMall) {
            openTownStorePage(townRoot, "clothing", buyTownStageThreeProduct);
            showComputerTownSpeech(host, "电脑先生", "小镇商城打开了，可以买衣服。");
            return;
          }
          if (hitRoot?.userData.townHomeFor) {
            const owner = speakers.get(hitRoot.userData.townHomeFor);
            if (owner) focusTownResident(owner, true);
            openTownHouseInterior(townRoot, hitRoot.userData.townHomeFor, getTownInteriorMode(hitRoot.userData.townHomeFor));
            return;
          }
          const speaker = hitRoot?.userData.speaker;
          if (speaker === "太阳公公") {
            showComputerTownSpeech(host, speaker, "我从东边升起来，照着大家练歌。");
          } else if (speaker === "宝宝") {
            if (babyNeedsComfort) {
              babyNeedsComfort = false;
              lastBabyCryAt = Date.now() / 1000;
              showComputerTownSpeech(host, speaker, "被哄好了，宝宝睡着了。");
            } else {
              showComputerTownSpeech(host, speaker, "咿呀，我在家里。");
            }
          } else if (speaker) {
            focusTownResident(hitRoot);
            if (townSleepingActive) {
              dream.visible = !dream.visible;
              showComputerTownSpeech(host, speaker, dream.visible ? "我睡着了，你进到我的梦里了。" : "梦门关上了。");
            } else {
              showComputerTownThought(host, speaker, "我在练自己的节奏音色。");
            }
          }
        }
      };
      renderer.domElement.addEventListener("pointerdown", onPointerDown);

      const resize = () => {
        const rect = host.getBoundingClientRect();
        const width = Math.max(320, rect.width);
        const height = Math.max(220, rect.height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
      };
      const animate = () => {
        const elapsed = Date.now() / 1000;
        const phase = (elapsed % 240) / 120;
        const isNight = phase >= 1;
        const arcPhase = isNight ? phase - 1 : phase;
        const angle = Math.PI * arcPhase;
        const x = -7 + arcPhase * 14;
        const y = 2.1 + Math.sin(angle) * 4.8;
        sun.visible = !isNight;
        sun.position.set(x, y, -5.2);
        sun.lookAt(camera.position);
        [sun].forEach((skyFace, skyIndex) => {
          if (skyFace.userData.mouth) {
            const talkScale = skyFace.userData.talking ? 1 + Math.abs(Math.sin(elapsed * 13 + skyIndex)) * 0.85 : 1;
            skyFace.userData.mouth.scale.set(1, talkScale, 1);
          }
        });
        sunLight.position.set(x, y, 1.5);
        scene.background.set(isNight ? 0x15233f : 0x7fcaf2);
        ground.material.color.set(isNight ? 0x245030 : 0x4ea35d);
        const nightSeconds = (elapsed % 240) - 120;
        const concertActive = isNight && nightSeconds < TOWN_CONCERT_SECONDS;
        const sleepingActive = isNight && nightSeconds >= TOWN_CONCERT_SECONDS;
        const concertProgram = concertActive ? getTownConcertProgram(nightSeconds) : null;
        townSleepingActive = sleepingActive;
        if (concertActive) {
          startComputerTownConcert(concertProgram);
          if (concertProgram?.id && lastTownApplauseProgram !== concertProgram.id) {
            if (lastTownApplauseProgram) showTownConcertApplause(host, concertProgram);
            lastTownApplauseProgram = concertProgram.id;
          }
        } else {
          stopComputerTownConcert();
          if (!isNight) lastTownApplauseProgram = "";
        }
        if (!concertActive && !sleepingActive && elapsed - lastTownTalkAt > 11) {
          lastTownTalkAt = elapsed;
          const activeMembers = members.filter((member) => !member.userData.backgroundCharacter);
          const first = activeMembers[Math.floor(elapsed) % activeMembers.length];
          const second = activeMembers[(Math.floor(elapsed) + 7) % activeMembers.length];
          const skySpeaker = "太阳公公";
          if (Math.floor(elapsed / 11) % 5 === 0) {
            showComputerTownSpeech(host, "Mr. Fun Computer", "屏幕现在会一个字一个字说话。", first.userData.speaker);
          } else if (Math.floor(elapsed / 13) % 5 === 0) {
            showComputerTownSpeech(host, "Mr. Tree", "我在树下听大家练歌。", second.userData.speaker);
          } else if (Math.floor(elapsed / 7) % 3 === 0) {
            showComputerTownThought(host, first.userData.speaker, `今天想和${skySpeaker}打招呼。`);
          } else {
            showComputerTownThought(host, first.userData.speaker, `听见${second.userData.zh}的节奏了。`);
          }
        }
        if (babyJoinedTown && baby.visible && isNight && !coupleScene && !babyNeedsComfort && elapsed - lastBabyCryAt > 22) {
          babyNeedsComfort = true;
          lastBabyCryAt = elapsed;
          showComputerTownSpeech(host, "宝宝", "哇哇，我想睡觉。");
        }
        if (!isNight && elapsed - lastTownShopAt > TOWN_SHOP_SECONDS && money > 0) {
          lastTownShopAt = elapsed;
          const shoppers = getActiveTownMembers();
          const shopper = shoppers[Math.floor(elapsed / TOWN_SHOP_SECONDS) % shoppers.length];
          const storeId = Math.floor(elapsed / TOWN_SHOP_SECONDS) % 2 ? "clothing" : "supermarket";
          const choices = townStageThreeProducts.filter((product) => product.store === storeId && product.price <= money);
          const product = choices[Math.floor(elapsed) % Math.max(1, choices.length)];
          if (product) {
            buyTownStageThreeProduct(product, shopper);
          }
        }
        members.forEach((member, index) => {
          updateTownEyeGaze(member, elapsed);
          const mouthPart = member.userData.mouth;
          if (mouthPart) {
            const talkScale = member.userData.talking ? 1 + Math.abs(Math.sin(elapsed * 14 + index)) * 0.9 : 1;
            mouthPart.scale.set(1, talkScale, 1);
          }
          if (member.userData.fixed) {
            member.position.set(member.userData.baseX, 0, member.userData.baseZ);
            member.rotation.z = 0;
            member.rotation.y = Math.sin(elapsed * 0.35 + index) * 0.08;
            return;
          }
          if (!sleepingActive && member.userData.sleepingAtHome) {
            member.userData.sleepingAtHome = false;
            member.visible = true;
          }
          if (sleepingActive && sendTownMemberHomeToSleep(member, elapsed, index)) {
            return;
          }
          if (coupleScene) {
            const isCouple = member === coupleScene.first || member === coupleScene.second;
            member.visible = isCouple;
            if (!isCouple) return;
            const coupleElapsed = elapsed - coupleScene.startAt;
            const side = member === coupleScene.first ? -1 : 1;
            const closeness = coupleElapsed > 3 ? 0.34 : 0.84;
            const homeX = familyHome.position.x;
            const homeZ = familyHome.position.z + 1.05;
            member.position.x += (homeX + side * closeness - member.position.x) * 0.08;
            member.position.z += (homeZ - member.position.z) * 0.08;
            member.position.y = Math.abs(Math.sin(elapsed * 2.4 + index)) * 0.07;
            member.rotation.z = 0;
            member.rotation.y = -side * 0.58;
            setTownMemberScale(member, true);
            heart.position.set(homeX, 2.65 + Math.sin(elapsed * 3) * 0.1, homeZ);
            heart.scale.setScalar(1 + Math.sin(elapsed * 5) * 0.08);
            if (coupleElapsed > 7 && !babyJoinedTown) {
              babyJoinedTown = true;
              baby.visible = true;
              baby.position.set(homeX, 0, homeZ + 0.72);
              showComputerTownSpeech(host, "宝宝", "咿呀，宝宝加入小镇啦。");
            }
            if (coupleElapsed > 14) {
              coupleScene = null;
              heart.visible = false;
              members.forEach((item) => {
                item.visible = true;
                if (item !== enlargedTownMember) setTownMemberScale(item, false);
              });
              baby.visible = true;
              showComputerTownSpeech(host, "电脑先生", "大家回到小镇里了，宝宝也留下来了。");
            }
            return;
          }
          if (member.userData.slowBackgroundWalker) {
            const slowArc = Math.sin((elapsed / 120) * Math.PI * 2 + index);
            const targetX = concertActive && concertProgram?.performers.includes(member.userData.speaker) ? 2.35 : member.userData.baseX;
            const targetZ = concertActive && concertProgram?.performers.includes(member.userData.speaker) ? -4.05 : member.userData.baseZ;
            const easing = concertActive ? 0.006 : isNight ? 0.004 : 1;
            member.position.x += (targetX - member.position.x) * easing;
            member.position.z += (targetZ - member.position.z) * easing;
            member.position.y = concertActive ? Math.abs(Math.sin(elapsed * 1.15)) * 0.1 : 0;
            member.rotation.z = 0;
            member.rotation.y = -0.15 + slowArc * 0.16;
            return;
          }
          const speed = concertActive ? 2.2 : 1.15;
          if (concertActive && concertProgram?.performers.includes(member.userData.speaker)) {
            const performerIndex = concertProgram.performers.indexOf(member.userData.speaker);
            moveTownPerformerToStage(member, performerIndex, elapsed);
            setTownMemberScale(member, member === enlargedTownMember);
          } else if (concertActive) {
            moveTownAudienceAroundStage(member, index, elapsed);
          } else {
            const shoppingNow = !isNight && Math.floor((elapsed + index * 1.7) / 8) % 5 === 0;
            const shoppingPlace = Math.floor((elapsed + index) / 16) % 2 ? mall : supermarket;
            const targetX = shoppingNow
              ? shoppingPlace.position.x + Math.sin(index) * 0.85
              : member.userData.baseX + Math.sin(elapsed * speed + index) * (concertActive ? 0.45 : 1.45);
            const targetZ = shoppingNow
              ? shoppingPlace.position.z + 1.45 + Math.cos(index) * 0.62
              : member.userData.baseZ + Math.cos(elapsed * speed * 0.7 + index) * 0.72;
            const safeTarget = keepTownWalkerOutOfObstacles(targetX, targetZ, townObstacles);
            member.position.x += (safeTarget.x - member.position.x) * 0.055;
            member.position.z += (safeTarget.z - member.position.z) * 0.055;
            member.position.y = Math.abs(Math.sin(elapsed * speed * 2 + index)) * (concertActive ? 0.16 : 0.08);
            member.rotation.z = 0;
            member.rotation.y = Math.sin(elapsed + index) * 0.55;
          }
        });
        updateTownEyeGaze(sun, elapsed);
        updateTownEyeGaze(baby, elapsed);
        if (baby.visible) {
          const mouthPart = baby.userData.mouth;
          if (mouthPart) {
            const talkScale = baby.userData.talking || babyNeedsComfort ? 1 + Math.abs(Math.sin(elapsed * 11)) * 0.8 : 1;
            mouthPart.scale.set(1, talkScale, 1);
          }
          baby.position.y = babyNeedsComfort ? Math.abs(Math.sin(elapsed * 5)) * 0.06 : 0;
        }
        dream.rotation.x += 0.01;
        dream.rotation.y += 0.017;
        if (cameraFocusTarget) {
          camera.position.x += (cameraFocusTarget.x - camera.position.x) * 0.045;
          camera.position.z += (cameraFocusTarget.z + 4.8 - camera.position.z) * 0.045;
          camera.position.y += (3.6 - camera.position.y) * 0.045;
          camera.lookAt(cameraFocusTarget.lookX, 1.0, cameraFocusTarget.lookZ);
        } else {
          const zoomTarget = townZoomLevels[townOverviewZoom] || townZoomLevels.near;
          const targetCameraZ = camera.position.z + zoomTarget.distance - camera.position.z;
          camera.position.x += (0 - camera.position.x) * 0.045;
          camera.position.y += (zoomTarget.height - camera.position.y) * 0.045;
          camera.position.z += (targetCameraZ - camera.position.z) * 0.045;
          camera.lookAt(0, zoomTarget.lookY, 0);
        }
        renderer.render(scene, camera);
        computerTown3D.frame = window.requestAnimationFrame(animate);
      };
      computerTown3D = {
        renderer,
        frame: 0,
        members,
        speakers,
        sun,
        resize,
        setOverviewZoom: (nextZoom) => {
          townOverviewZoom = townZoomLevels[nextZoom] ? nextZoom : "near";
          cameraFocusTarget = null;
        },
        disposeEvents: () => renderer.domElement.removeEventListener("pointerdown", onPointerDown)
      };
      computerTown3D.resize = resize;
      window.addEventListener("resize", resize);
      resize();
      animate();
    })
    .catch(() => {
      host.classList.remove("loading");
      host.classList.add("fallback");
    });
}

function renderComputerDesktop() {
  if (!desktopInstalledApps) return;
  desktopInstalledApps.innerHTML = "";
  installedComputerApps.filter((app) => !["chat", "store", "minecraft", "town"].includes(app)).forEach((app) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `desktop-app desktop-app-${app}`;
    button.innerHTML = `<span>${computerAppLabels[app] || "软"}</span>${computerAppNames[app] || app}`;
    button.addEventListener("dblclick", () => {
      openComputerApp(app);
    });
    button.addEventListener("click", (event) => {
      if (app !== "chat" || event.detail >= 2) openComputerApp(app);
    });
    desktopInstalledApps.appendChild(button);
  });
}

function setComputerAppWindowContent(app) {
  if (!computerAppTitle || !computerAppContent) return;
  window.ComputerExperience?.stopSoftware();
  stopComputerTown3D();
  computerAppTitle.textContent = computerAppNames[app] || "软件";
  computerAppContent.innerHTML = "";
  if (app === "store") {
    const storeList = document.createElement("div");
    storeList.className = "computer-store-list";
    ["paint", "music", "clock", ...Object.keys(window.ComputerApps?.catalog || {})].forEach((downloadApp) => {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.downloadApp = downloadApp;
      button.disabled = installedComputerApps.includes(downloadApp);
      button.textContent = installedComputerApps.includes(downloadApp)
        ? `${computerAppNames[downloadApp]}已安装`
        : `安装${computerAppNames[downloadApp]}`;
      button.addEventListener("click", () => downloadComputerApp(downloadApp));
      storeList.appendChild(button);
    });
    computerAppContent.appendChild(storeList);
    return;
  }
  if (app === "town") {
    const town = document.createElement("div");
    town.className = "computer-town-app";
    town.innerHTML = `
      <div class="computer-town-3d-shell" aria-label="3D 小镇"></div>
      <div class="computer-town-speech" aria-live="polite"></div>
      <div class="computer-town-thought" aria-live="polite"></div>
      <div class="computer-town-avatar-bar" aria-label="小镇居民头像"></div>
      <div class="computer-town-market-panel" aria-label="小镇生活店" hidden>
        <strong>生活店</strong>
        <button type="button" data-town-market="food">在超市买零食</button>
        <button type="button" data-town-market="clothes">去服装店看看</button>
      </div>
      <div class="computer-town-house-interior-panel" aria-label="居民房子内部" hidden>
        <button class="computer-town-store-close" type="button" data-town-close-interior>×</button>
        <strong data-town-house-title>居民的家</strong>
        <div data-town-resident-scene></div>
        <div class="computer-town-room-grid">
          <section class="computer-town-room living">
            <b>客厅</b>
            <div class="computer-town-room-art">
              <i class="computer-town-pixel-painting"></i>
              <i class="computer-town-pixel-couch"></i>
              <i class="computer-town-pixel-table"></i>
            </div>
            <span>墙上有画，下面有沙发和小桌子。</span>
          </section>
          <section class="computer-town-room bedroom">
            <b>卧室</b>
            <div class="computer-town-room-art">
              <i class="computer-town-pixel-bed"></i>
              <i class="computer-town-pixel-wardrobe"></i>
              <i class="computer-town-pixel-lamp"></i>
            </div>
            <span>床、衣柜和灯都在屋里，不睡地上。</span>
          </section>
          <section class="computer-town-room kitchen">
            <b>厨房</b>
            <div class="computer-town-room-art">
              <i class="computer-town-pixel-stove"></i>
              <i class="computer-town-pixel-fridge"></i>
              <i class="computer-town-pixel-counter"></i>
            </div>
            <span>灶台、冰箱和料理台可以做饭。</span>
          </section>
          <section class="computer-town-room bathroom">
            <b>洗手间</b>
            <div class="computer-town-room-art">
              <i class="computer-town-pixel-bath"></i>
              <i class="computer-town-pixel-sink"></i>
              <i class="computer-town-pixel-mirror"></i>
            </div>
            <span>浴缸、洗手池和镜子都配齐。</span>
          </section>
        </div>
      </div>
      <div class="computer-town-store-page" aria-label="商店商品页面" hidden>
        <button class="computer-town-store-close" type="button" data-town-close-store>×</button>
        <strong data-town-store-title>商店</strong>
        <div class="computer-town-store-grid" data-town-store-products></div>
      </div>
      <div class="computer-town-shop-panel" aria-label="小镇商城" hidden>
        <strong>小镇商城</strong>
        <button type="button" data-town-clothing="red">红色演出服 3块</button>
        <button type="button" data-town-clothing="blue">蓝色演出服 3块</button>
        <button type="button" data-town-clothing="gold">金色演出服 5块</button>
      </div>
      <div class="computer-town-character-panel" aria-label="人物操作" hidden>
        <strong data-town-selected-name>居民</strong>
        <button type="button" data-town-action="zoom">放大看看</button>
        <button type="button" data-town-action="dress">换衣服</button>
        <button type="button" data-town-action="couple">CP剧情</button>
      </div>
      <div class="computer-town-fallback" aria-hidden="true">
        <div class="computer-town-sky"><span></span><span></span></div>
        <div class="computer-town-street">
          <span class="computer-town-building shop"></span>
          <span class="computer-town-building home"></span>
          <span class="computer-town-stage"></span>
          <span class="town-member oren"></span>
          <span class="town-member raddy"></span>
          <span class="town-member clukr"></span>
          <span class="town-member pinki"></span>
        </div>
        <div class="computer-town-concert">
          <i></i><i></i><i></i><i></i><i></i>
        </div>
      </div>
    `;
    computerAppContent.appendChild(town);
    ensureComputerTownAudio();
    window.setTimeout(() => startComputerTown3D(town.querySelector(".computer-town-3d-shell")), 0);
    return;
  }
  if (window.ComputerExperience?.mountSoftware(app, computerAppContent)) return;
  const message = document.createElement("p");
  message.className = "computer-app-message";
  message.textContent = app === "paint"
    ? "画画软件打开了。"
    : app === "music"
      ? "音乐软件打开了。"
      : "现在是电脑先生时间。";
  computerAppContent.appendChild(message);
}

function setComputerAppWindowLayer(app) {
  if (!computerAppWindow) return;
  if (app === "town") {
    if (computerAppWindow.parentElement !== document.body) {
      document.body.appendChild(computerAppWindow);
    }
    return;
  }
  if (computerAppDock.parent && computerAppWindow.parentElement !== computerAppDock.parent) {
    computerAppDock.parent.insertBefore(computerAppWindow, computerAppDock.next);
  }
}

function showComputerAppWindow(app) {
  if (window.ComputerExperience?.isDamaged()) return;
  computerScreenMode = "app";
  currentComputerApp = app;
  setComputerAppWindowLayer(app);
  moodPanel.classList.add("desktop-mode", "app-open");
  moodPanel.classList.remove("face-mode", "text-mode", "colorful");
  if (computerDesktop) computerDesktop.hidden = false;
  if (computerAppWindow) computerAppWindow.hidden = false;
  computerAppWindow?.classList.toggle("town-fullscreen", app === "town");
  computerAppWindow?.classList.remove("town-minimized");
  document.body.classList.toggle("town-app-open", app === "town");
  if (computerAppMinimize) computerAppMinimize.hidden = false;
  if (computerFaceClose) computerFaceClose.hidden = true;
  if (screenSubtitle) screenSubtitle.style.display = "none";
  setComputerAppWindowContent(app);
}

function showComputerDesktop() {
  window.ComputerExperience?.leaveFullscreen();
  window.ComputerExperience?.stopSoftware();
  computerScreenMode = "desktop";
  currentComputerApp = "";
  setComputerAppWindowLayer("");
  moodPanel.classList.add("desktop-mode");
  moodPanel.classList.remove("face-mode", "text-mode", "colorful", "app-open");
  if (computerDesktop) computerDesktop.hidden = false;
  if (computerAppWindow) computerAppWindow.hidden = true;
  computerAppWindow?.classList.remove("town-fullscreen");
  computerAppWindow?.classList.remove("town-minimized");
  document.body.classList.remove("town-app-open");
  if (computerAppMinimize) computerAppMinimize.hidden = true;
  stopComputerTown3D();
  if (computerFaceClose) computerFaceClose.hidden = true;
  if (desktopStore) desktopStore.hidden = true;
  if (screenSubtitle) screenSubtitle.style.display = "none";
  renderComputerDesktop();
}

function openComputerChatApp() {
  if (window.ComputerExperience?.isDamaged()) return;
  window.ComputerExperience?.leaveFullscreen();
  window.ComputerExperience?.stopSoftware();
  computerScreenMode = "face";
  currentComputerApp = "chat";
  moodPanel.classList.remove("desktop-mode");
  moodPanel.classList.remove("app-open");
  if (computerDesktop) computerDesktop.hidden = true;
  if (computerAppWindow) computerAppWindow.hidden = true;
  if (computerAppMinimize) computerAppMinimize.hidden = true;
  if (computerFaceClose) computerFaceClose.hidden = false;
  showFaceOnly({ force: true });
  saveGameState();
}

function openComputerApp(app) {
  if (window.ComputerExperience?.isDamaged()) return;
  window.ComputerExperience?.leaveFullscreen();
  if (app === "chat") {
    openComputerChatApp();
    return;
  }
  if (app === "minecraft") {
    window.ComputerExperience?.stopSoftware();
    computerScreenMode = "app";
    currentComputerApp = "minecraft";
    if (computerFaceClose) computerFaceClose.hidden = true;
    if (computerAppWindow) computerAppWindow.hidden = true;
    setMinecraftPanelOpen(true);
    return;
  }
  showComputerAppWindow(app);
  if (app === "music" || app === "blocks3d") window.ComputerExperience?.fullscreen();
  saveGameState();
}

function closeComputerApp() {
  window.ComputerExperience?.leaveFullscreen();
  window.ComputerExperience?.stopSoftware();
  if (minecraftPanelOpen) setMinecraftPanelOpen(false);
  showComputerDesktop();
  saveGameState();
}

function toggleComputerTownMinimized() {
  if (window.ComputerExperience) { window.ComputerExperience.minimize(); return; }
  if (currentComputerApp !== "town" || !computerAppWindow) return;
  computerAppWindow.classList.toggle("town-minimized");
  window.setTimeout(() => computerTown3D?.resize?.(), 80);
}

function handleTownStageThreeZoomShortcut(event) {
  if (currentComputerApp !== "town") return;
  if (event.type === "keyup") {
    townStageThreeZoomKeys.delete(event.key);
    return;
  }
  if (event.repeat) return;
  if (event.key === "1" || event.key === "2") {
    townStageThreeZoomKeys.add(event.key);
  }
  if (townStageThreeZoomKeys.has("1") && townStageThreeZoomKeys.has("2")) {
    event.preventDefault();
    townStageThreeZoomKeys.clear();
    toggleComputerTownMinimized();
  }
}

function handleTownOverviewZoomShortcut(event) {
  if (currentComputerApp !== "town" || event.type !== "keydown" || event.repeat) return;
  if (event.key === "2") {
    event.preventDefault();
    computerTown3D?.setOverviewZoom?.("overview");
  }
  if (event.key === "3") {
    event.preventDefault();
    computerTown3D?.setOverviewZoom?.("near");
  }
}

function downloadComputerApp(app) {
  if (!["paint", "music", "clock", ...Object.keys(window.ComputerApps?.catalog || {})].includes(app) || installedComputerApps.includes(app)) return;
  installedComputerApps.push(app);
  renderComputerDesktop();
  setComputerAppWindowContent("store");
  saveGameState();
}

function showFaceOnly(options = {}) {
  if (computerScreenMode === "desktop" && !options.force) {
    showComputerDesktop();
    return;
  }
  if (computerScreenMode === "app" && !options.force) return;
  if (weatherCableConnectedTo === "computer" && !isPoweredOff) {
    updateComputerWeatherDisplay();
    return;
  }
  if (computerDesktop) computerDesktop.hidden = true;
  moodPanel.classList.remove("desktop-mode");
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
  if (currentComputerApp !== "chat") {
    screenSubtitle.style.display = "none";
    moodPanel.classList.remove("text-mode", "colorful");
    return;
  }
  screenSubtitle.textContent = text;
  screenSubtitle.style.display = "block";
  moodPanel.classList.remove("face-mode");
  moodPanel.classList.add("text-mode");
  moodPanel.classList.toggle("colorful", colorful);
  window.ComputerExperience?.subtitle(text, colorful);
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
  const duration = Math.min(15000, 900 + text.length * 90);
  const colorful = options.colorful ?? shouldUseColorfulSubtitle(text);
  const useSubtitle = window.ComputerExperience?.isFullChat() || (options.forceSubtitle ?? Math.random() < 0.82);

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
  if (speakingStopTimer) window.clearTimeout(speakingStopTimer);

  let open = false;
  mouth.classList.remove("mouth-triangle", "mouth-open");
  mouth.classList.add("mouth-open");
  computerShell?.classList.add("computer-speaking");

  speakingTimer = window.setInterval(() => {
    open = !open;
    mouth.classList.toggle("mouth-open", open);
    mouth.classList.toggle("mouth-triangle", !open);
  }, 180);

  speakingStopTimer = window.setTimeout(() => {
    window.clearInterval(speakingTimer);
    speakingTimer = null;
    speakingStopTimer = null;
    mouth.classList.remove("mouth-open");
    mouth.classList.add("mouth-triangle");
    computerShell?.classList.remove("computer-speaking");
  }, duration);
}

function generateReply(text) {
  if (window.ComputerKnowledge) {
    let memory = {};
    try { memory = JSON.parse(localStorage.getItem("computer-chat-memory") || "{}") || {}; } catch {}
    if (typeof memory !== "object" || Array.isArray(memory)) memory = {};
    const answer = window.ComputerKnowledge.reply(text, memory, townSprunkiCharacters);
    try { localStorage.setItem("computer-chat-memory", JSON.stringify(memory)); } catch {}
    if (answer) return answer;
  }
  const pattern = replyPatterns.find((item) => item.match.test(text));
  if (pattern) {
    return randomFrom(pattern.replies);
  }
  return randomFrom(fallbackReplies);
}

function answerUser(text) {
  if (window.ComputerExperience?.isDamaged()) return;
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
  if (characterType === "moon") return "\u6708\u4eae\u516c\u516c";
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
    if (event.detail <= 1) makeSkyBodySpeak("sun");
    beginCharacterDrag(event, skySun, "sun");
  });

  skyMoon?.addEventListener("pointerdown", (event) => {
    if (event.detail <= 1) makeSkyBodySpeak("moon");
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

desktopAppButtons.forEach((button) => {
  button.addEventListener("dblclick", () => {
    const app = button.dataset.computerApp || "";
    openComputerApp(app);
  });
  button.addEventListener("click", (event) => {
    const app = button.dataset.computerApp || "";
    if (app !== "chat" || event.detail >= 2) openComputerApp(app);
  });
});

desktopDownloadButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const app = button.dataset.downloadApp || "";
    downloadComputerApp(app);
  });
});

computerAppClose?.addEventListener("click", closeComputerApp);
computerAppMinimize?.addEventListener("click", toggleComputerTownMinimized);
computerFaceClose?.addEventListener("click", closeComputerApp);
window.addEventListener("keydown", handleTownStageThreeZoomShortcut);
window.addEventListener("keyup", handleTownStageThreeZoomShortcut);
window.addEventListener("keydown", handleTownOverviewZoomShortcut);

resetSaveToggle?.addEventListener("click", resetGameState);

window.setInterval(() => {
  if (isRecording || screenSubtitle.style.display === "block") return;
  moodIndex = (moodIndex + 1) % moods.length;
  setMood(moodIndex);
  showFaceOnly();
}, 3200);

setMood(moodIndex);
setPowerState(true);
setDayNightMode(false);
loadGameState();
computerScreenMode = "desktop";
showComputerDesktop();
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
