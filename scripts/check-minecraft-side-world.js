const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");

const checks = [
  {
    name: "side animals are spaced apart",
    pass: app.includes("lastAnimalLocalX") && app.includes("localX - lastAnimalLocalX >= 3")
  },
  {
    name: "side village houses expose a door",
    pass: app.includes("minecraft-side-village-door") && app.includes("enterMinecraftVillageHouse")
  },
  {
    name: "village house interior has exit, villager, bed, and wheat",
    pass: app.includes("renderMinecraftVillageHouseInterior")
      && app.includes("exitMinecraftVillageHouse")
      && app.includes("sleepInMinecraftVillageHouseBed")
      && app.includes("minecraft-side-house-bed")
      && app.includes("minecraft-side-house-wheat")
  },
  {
    name: "side village uses block textures instead of painted gradients",
    pass: css.includes("--minecraft-texture-oak-planks") && !css.includes(".minecraft-side-village-house,\n.minecraft-side-village-bed {\n  background-image:\n    linear-gradient(45deg")
  },
  {
    name: "animals can flee before being collected",
    pass: app.includes("minecraftFleeingAnimals") && app.includes("scareMinecraftSideAnimal")
  },
  {
    name: "side-world positions are precomputed for browser-safe CSS",
    pass: app.includes("setMinecraftSideColumnStyle") && css.includes("left: var(--side-left);")
  },
  {
    name: "side trees scan nearby z slices for trunks",
    pass: app.includes("getMinecraftSideZOffsets(5)") && app.includes("getMinecraftBlockAt(x, z, 1) === \"wood\"")
  },
  {
    name: "side world has a one-second motion tick",
    pass: app.includes("tickMinecraftSideWorld") && app.includes("window.setInterval(tickMinecraftSideWorld, 1000)")
  },
  {
    name: "side moon and animals move smoothly",
    pass: css.includes("minecraft-side-orbit var(--sky-duration, 120s) linear infinite")
      && css.includes("animation: minecraft-side-animal-hop 1s linear infinite")
      && !css.includes(".minecraft-side-animal-hop 1s steps")
  },
  {
    name: "zombies chase and hit the player every second in side world",
    pass: app.includes("now - minecraftLastZombieStepAt < 950")
      && app.includes("damageMinecraftPlayer(2)")
      && app.includes("--hostile-run-x")
      && css.includes("minecraft-side-zombie-step 1s linear infinite")
  },
  {
    name: "side hud shows hearts and energy",
    pass: app.includes("minecraft-side-hearts")
      && app.includes("minecraft-side-energy minecraft-side-hunger")
      && css.includes(".minecraft-side-hud")
      && css.includes(".minecraft-side-hearts")
  },
  {
    name: "day-to-night cycle is exactly 120 seconds",
    pass: app.includes("const MINECRAFT_DAY_NIGHT_SECONDS = 120")
      && app.includes("minecraftDayTick % MINECRAFT_DAY_NIGHT_SECONDS")
  },
  {
    name: "side sky renders sun and moon",
    pass: app.includes("minecraft-side-moon") && css.includes(".minecraft-side-sky.night .minecraft-side-moon")
  },
  {
    name: "side blocks keep old non-grass textures",
    pass: css.includes(".minecraft-side-block.minecraft-water")
      && css.includes(".minecraft-side-block.minecraft-lava")
      && css.includes(".minecraft-side-block.minecraft-crafting_table")
  },
  {
    name: "night zombies render in side world",
    pass: app.includes("makeMinecraftSideHostileElement") && css.includes(".minecraft-side-hostile.minecraft-zombie")
  },
  {
    name: "animals do not render over village features",
    pass: app.includes("const canShowAnimal = animal && !villageFeature && localX - lastAnimalLocalX >= 3")
  },
  {
    name: "computer starts on desktop and chat opens by double-click",
    pass: app.includes("showComputerDesktop") && app.includes("openComputerChatApp") && app.includes("dblclick") && css.includes(".mood-panel.desktop-mode")
  },
  {
    name: "computer apps open in software windows with close buttons",
    pass: html.includes("computer-app-window")
      && html.includes("computer-app-close")
      && html.includes("computer-face-close")
      && app.includes("openComputerApp")
      && app.includes("closeComputerApp")
  },
  {
    name: "town is a computer software app with concert scene",
    pass: html.includes('data-computer-app="town"')
      && app.includes('app === "town"')
      && css.includes(".computer-town-app")
      && css.includes("town-concert-bars")
  },
  {
    name: "town opens as fullscreen 3D software",
    pass: app.includes('import("https://unpkg.com/three@0.160.0/build/three.module.js")')
      && app.includes("startComputerTown3D")
      && app.includes("new THREE.WebGLRenderer")
      && app.includes("new THREE.SphereGeometry")
      && css.includes(".computer-app-window.town-fullscreen")
  },
  {
    name: "town fullscreen covers the whole browser, not the computer screen",
    pass: css.includes(".computer-app-window.town-fullscreen")
      && css.includes("inset: 0")
      && css.includes("z-index: 260")
      && css.includes(".computer-app-window.town-fullscreen .computer-app-close")
  },
  {
    name: "sprunki town is not a block world",
    pass: app.includes("new THREE.CapsuleGeometry")
      && app.includes("new THREE.ConeGeometry")
      && app.includes("new THREE.CircleGeometry")
      && app.includes("makeTownTent")
      && !app.includes("function makeTownBox")
  },
  {
    name: "town sun and moon have faces and can talk",
    pass: app.includes("function makeTownSkyFace")
      && app.includes("太阳公公")
      && app.includes("月亮公公")
      && app.includes("showComputerTownSpeech")
      && app.includes("playComputerTownVoice")
  },
  {
    name: "town concert has spoken lyrics",
    pass: app.includes("function startComputerTownConcert")
      && app.includes("concertSpeechTimer")
      && app.includes("speakComputerTownText")
      && app.includes("computerTownAudio.concertOn")
      && app.includes("TOWN_CONCERT_SECONDS")
  },
  {
    name: "town residents use real text-to-speech",
    pass: app.includes("function speakComputerTownText")
      && app.includes("new SpeechSynthesisUtterance")
      && app.includes("window.speechSynthesis.speak")
      && app.includes("voiceSettingsByGender")
      && app.includes("computerTownSpeechQueue")
      && app.includes("computerTownSpeechActive")
  },
  {
    name: "town speech uses Chinese names instead of English names",
    pass: app.includes("function getTownSpeakerLabel")
      && app.includes("const speakerLabel = getTownSpeakerLabel(speaker)")
      && app.includes("bubble.textContent = `${speakerLabel}：${text}`")
      && app.includes("奥伦")
  },
  {
    name: "town residents wake when the sun rises",
    pass: app.includes("const sleepingActive = isNight && nightSeconds >= TOWN_CONCERT_SECONDS")
      && app.includes("const concertActive = isNight && nightSeconds < TOWN_CONCERT_SECONDS")
      && !app.includes("TOWN_SLEEP_SECONDS")
  },
  {
    name: "town includes all 20 sprunki residents",
    pass: app.includes("const townSprunkiCharacters = [")
      && ["Oren", "Raddy", "Clukr", "Fun Bot", "Vineria", "Gray", "Brud", "Garnold", "Owakcx", "Sky", "Mr. Sun", "Durple", "Mr. Tree", "Simon", "Tunner", "Mr. Fun Computer", "Wenda", "Pinki", "Jevin", "Black"].every((name) => app.includes(`name: "${name}"`))
      && app.includes("const groundCharacters = townSprunkiCharacters.filter")
  },
  {
    name: "mr sun is a sky character, not a ground resident",
    pass: app.includes('name: "Mr. Sun"')
      && app.includes("skyOnly: true")
      && app.includes("const groundCharacters = townSprunkiCharacters.filter((character) => !character.skyOnly)")
      && app.includes('makeTownSkyFace(THREE, "太阳公公"')
  },
  {
    name: "sprunki residents have recognizable character features",
    pass: app.includes("addTownSprunkiFeatures")
      && app.includes('name === "Oren"')
      && app.includes('name === "Raddy"')
      && app.includes('name === "Clukr"')
      && app.includes('name === "Pinki"')
      && app.includes('name === "Vineria"')
      && app.includes('name === "Fun Bot"')
  },
  {
    name: "sprunki residents have extended character features",
    pass: ["Gray", "Brud", "Garnold", "Owakcx", "Sky", "Mr. Sun", "Durple", "Mr. Tree", "Simon", "Tunner", "Mr. Fun Computer", "Wenda", "Jevin", "Black"]
      .every((name) => app.includes(`name === "${name}"`))
  },
  {
    name: "town dreams only open while residents are sleeping",
    pass: app.includes("if (townSleepingActive)")
      && app.includes("我睡着了，你进到我的梦里了")
      && app.includes("在练自己的节奏音色")
  },
  {
    name: "town residents talk with friends and sun or moon using sound",
    pass: app.includes("lastTownTalkAt")
      && app.includes("我和")
      && app.includes("太阳公公")
      && app.includes("月亮公公")
      && app.includes('showComputerTownSpeech(host, second.userData.speaker, "我也听见你的拍子了。", first.userData.speaker)')
  },
  {
    name: "outside mine and shop buttons only hide while town mode is open",
    pass: html.includes('id="mine-toggle" class="mine-toggle" type="button">挖矿</button>')
      && html.includes('id="shop-toggle" class="shop-toggle" type="button">商城</button>')
      && css.includes("body.town-app-open .mine-toggle")
      && css.includes("body.town-app-open .shop-toggle")
      && !html.includes('id="mine-toggle" class="mine-toggle" type="button" hidden')
  },
  {
    name: "town can shrink from fullscreen into a small window",
    pass: html.includes("computer-app-minimize")
      && app.includes("function toggleComputerTownMinimized")
      && app.includes('classList.toggle("town-minimized")')
      && css.includes(".computer-app-window.town-fullscreen.town-minimized")
  },
  {
    name: "town app covers the whole game instead of staying inside the computer screen",
    pass: app.includes("function setComputerAppWindowLayer")
      && app.includes("document.body.appendChild(computerAppWindow)")
      && css.includes("body.town-app-open .stage")
      && css.includes("visibility: hidden")
  },
  {
    name: "town speech is queued and mouths move while speaking",
    pass: app.includes("function runComputerTownSpeechQueue")
      && app.includes("setComputerTownSpeakingMouth")
      && app.includes("userData.talking")
      && app.includes("userData.mouth")
      && app.includes("mouthPart.scale.set")
  },
  {
    name: "town characters have white eye rims and moving pupils",
    pass: app.includes("eyeWhiteMaterial")
      && app.includes("pupilHomes")
      && app.includes("function updateTownEyeGaze")
      && app.includes("setComputerTownLookTarget")
  },
  {
    name: "mr computer is a fixed background computer and tree is a slow background walker",
    pass: app.includes("function makeTownComputerCharacter")
      && app.includes("function makeTownTreeCharacter")
      && app.includes("backgroundCharacter: true")
      && app.includes("fixed: true")
      && app.includes("slowBackgroundWalker: true")
      && app.includes("elapsed / 120")
      && app.includes("concertActive ? Math.abs(Math.sin(elapsed * 1.15)) * 0.1 : 0")
      && app.includes("if (member.userData.fixed)")
  },
  {
    name: "mr computer is centered behind the town screen",
    pass: app.includes('character.name === "Mr. Fun Computer" ? 0')
      && app.includes('character.name === "Mr. Fun Computer" ? -7.25')
  },
  {
    name: "fun bot has a black visor with blue eyes",
    pass: app.includes("new THREE.MeshBasicMaterial({ color: 0x10151f })")
      && app.includes("new THREE.MeshBasicMaterial({ color: 0x48c7ff })")
      && app.includes("leftBlueEye")
      && app.includes("rightBlueEye")
  },
  {
    name: "town has an internal mall where residents spend computer money",
    pass: app.includes("function makeTownMall")
      && app.includes("const mall = makeTownMall")
      && app.includes("money = Math.max(0, money - 1)")
      && app.includes("updateMoneyUI()")
      && app.includes("我去商城买东西")
  },
  {
    name: "town mall and character panels support buying and dressing",
    pass: app.includes("computer-town-shop-panel")
      && app.includes("computer-town-character-panel")
      && app.includes("data-town-clothing")
      && app.includes("data-town-action=\"dress\"")
      && app.includes("function applyTownClothing")
      && css.includes(".computer-town-shop-panel")
  },
  {
    name: "town has a couple story that restores characters and adds a baby",
    pass: app.includes("data-town-action=\"couple\"")
      && app.includes("const townCouples")
      && app.includes("startTownCoupleScene")
      && app.includes("我们好想在一起呀")
      && app.includes("function makeTownBaby")
      && app.includes("宝宝加入小镇")
      && app.includes("item.visible = true")
  },
  {
    name: "town baby cries at night and can be comforted",
    pass: app.includes("babyNeedsComfort")
      && app.includes("哇哇，我想睡觉")
      && app.includes("被哄好了，宝宝睡着了")
      && app.includes('speaker === "宝宝"')
  },
  {
    name: "town walkers avoid buildings instead of walking through walls",
    pass: app.includes("function keepTownWalkerOutOfObstacles")
      && app.includes("const townObstacles")
      && app.includes("const safeTarget = keepTownWalkerOutOfObstacles")
  },
  {
    name: "town residents have readable name labels",
    pass: app.includes("makeTownNameLabel")
      && app.includes("new THREE.CanvasTexture")
      && app.includes("new THREE.Sprite")
  },
  {
    name: "computer sun matches town sun face style",
    pass: css.includes("0 0 0 10px rgba(255, 199, 61, 0.28)")
      && css.includes("border-top: 0")
      && app.includes('makeTownSkyFace(THREE, "太阳公公"')
  },
  {
    name: "outside computer sun and moon use town timing and voices",
    pass: app.includes("const AUTO_DAY_DURATION = 120000")
      && app.includes("const AUTO_NIGHT_DURATION = 120000")
      && app.includes("makeSkyBodySpeak")
      && app.includes("playComputerTownVoice(speaker)")
  },
  {
    name: "computer hat hides while fullscreen town is open",
    pass: app.includes('document.body.classList.toggle("town-app-open", app === "town")')
      && app.includes('document.body.classList.remove("town-app-open")')
      && css.includes("body.town-app-open .hat-assembly")
  },
  {
    name: "town sun and moon use 120-second rise-set cycle",
    pass: app.includes("const phase = (elapsed % 240) / 120")
      && app.includes("sun.visible = !isNight")
      && app.includes("moon.visible = isNight")
  },
  {
    name: "desktop software stays small and computer shell keeps proportion",
    pass: css.includes("width: min(300px, 86vw)")
      && css.includes("width: 42px")
      && css.includes("width: 25px")
  },
  {
    name: "minecraft is a desktop app, not the old screen button",
    pass: html.includes('data-computer-app="minecraft"')
      && !html.includes('id="minecraft-toggle"')
      && app.includes('app === "minecraft"')
  },
  {
    name: "iron golem protects villagers",
    pass: app.includes("minecraftGolemAngryUntil")
      && app.includes("angerMinecraftIronGolem")
      && app.includes("minecraft-side-iron-golem")
      && css.includes(".minecraft-side-iron-golem")
  }
];

const failed = checks.filter((check) => !check.pass);
if (failed.length) {
  console.error("Minecraft side-world checks failed:");
  failed.forEach((check) => console.error(`- ${check.name}`));
  process.exit(1);
}

console.log(`Minecraft side-world checks passed: ${checks.length}/${checks.length}`);
