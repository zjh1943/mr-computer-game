const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");

function expectContains(source, text, message) {
  if (!source.includes(text)) {
    console.error(message);
    process.exitCode = 1;
  }
}

function expectMatches(source, pattern, message) {
  if (!pattern.test(source)) {
    console.error(message);
    process.exitCode = 1;
  }
}

expectContains(html, 'id="minecraft-backpack-toggle"', "Missing three-dot backpack button beside the large hotbar.");
expectContains(html, 'id="minecraft-backpack-panel"', "Missing large backpack panel.");
expectContains(app, "minecraftBackpackToggle", "Backpack toggle is not wired in JavaScript.");
expectContains(app, "renderMinecraftBackpack", "Backpack renderer is missing.");
expectContains(app, "playMinecraftAnimalSound", "Animal sound playback is missing.");
expectContains(app, "const minecraftAnimalSounds", "Extracted animal sound map is missing.");
expectMatches(app, /背包里没有这个物品，先去收集。/, "Empty inventory prompt should use a neutral item message.");
expectMatches(app, /^(?![\s\S]*背包里没有这个方块，先用镐子去挖。)[\s\S]*$/m, "Empty inventory prompt should not call every item a block.");
expectMatches(app, /hitMinecraftAnimal[\s\S]*playMinecraftAnimalSound\(animalType\)/, "Hitting animals should play their sound.");
expectMatches(app, /handleMinecraftVillagerClick[\s\S]*playMinecraftAnimalSound\("villager"\)/, "Villagers should play their sound when clicked/traded.");
expectContains(css, ".minecraft-tools {", "Old tools bar rule is missing.");
expectMatches(css, /\.minecraft-tools\s*\{[\s\S]*display:\s*none/, "Old small tools bar should be hidden.");
expectContains(css, ".minecraft-side-hotbar-wrap", "Large hotbar wrapper is missing.");
expectContains(css, ".minecraft-side-backpack-toggle", "Three-dot backpack button styles are missing.");
expectContains(css, ".minecraft-side-backpack-panel", "Backpack panel styles are missing.");
expectContains(css, ".minecraft-side-hotbar-slot::before", "Large hotbar slots should render item icons.");
expectContains(css, 'url("./assets/minecraft-blocks/grass.png")', "Grass block texture image should be used.");
expectMatches(css, /\.minecraft-side-hud\s*\{[\s\S]*bottom:/, "Side HUD should sit at the bottom center.");
expectMatches(css, /\.minecraft-side-xp\s*\{[\s\S]*order:/, "XP bar should be ordered inside the bottom HUD, not floating over hearts.");
expectMatches(css, /\.minecraft-xp-bar\s*\{[\s\S]*pointer-events:\s*none/, "XP bar should not block HUD controls.");

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log("Verified Minecraft inventory, backpack, grass texture, and animal sounds.");
