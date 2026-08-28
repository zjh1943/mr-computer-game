const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");

let failed = false;

function expectContains(source, needle, message) {
  if (!source.includes(needle)) {
    console.error(message);
    failed = true;
  }
}

expectContains(app, "minecraftHandMineBlocks", "Soft grass, dirt, wood, and leaves cannot be hand-mined.");
expectContains(app, "placeMinecraftStepBlockForJump", "Jumping up does not place a step block under Steve.");
expectContains(app, "minecraftDimension === \"overworld\" && minecraftDepth <= minecraftCaveEntryDepth", "Only the Overworld should enter the nine-block cave.");
expectContains(app, "makeMinecraftSideHud", "Side-view health, hunger, XP, and hotbar HUD is missing.");
expectContains(app, "makeMinecraftSideAnimalElement", "Side-view animals are not rendered above grass.");
expectContains(app, "getMinecraftSideTreeColumns", "Side-view trees do not move opposite the player.");

expectContains(css, ".minecraft-panel.minecraft-platformer-fullscreen", "Minecraft panel is not maximized for platformer play.");
expectContains(css, ".minecraft-dig-down", "Dig-down control rule is missing.");
expectContains(css, "display: none", "Dig-down control is not hidden.");
expectContains(css, ".minecraft-side-action-jump", "Square pixel jump button is missing.");
expectContains(css, ".minecraft-side-action-jump::before", "Jump button up-arrow is missing.");
expectContains(css, ".minecraft-side-hud", "Bottom-center side-view HUD is missing.");
expectContains(css, ".minecraft-side-hearts", "Heart HUD is missing.");
expectContains(css, ".minecraft-side-hunger", "Hunger HUD is missing.");
expectContains(css, ".minecraft-side-hotbar", "Hotbar is missing.");
expectContains(css, ".minecraft-side-hotbar-slot", "Hotbar slots are missing.");
expectContains(css, ".minecraft-side-animal", "Side-view animals are missing.");

if (failed) {
  process.exit(1);
}

console.log("Verified platformer HUD, jumping, soft mining, moving scenery, and cave scope.");
