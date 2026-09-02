const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

assert(app.includes("function getMinecraftBiomeAt"), "overworld biome function is present");
assert(app.includes('"desert"') && app.includes('"plains"') && app.includes('"village"') && app.includes('"forest"'), "four first-pack biomes are named");
assert(app.includes("isMinecraftCactusAt"), "desert cactus generator is present");
assert(app.includes("getOwnedMinecraftHotbarItems"), "hotbar is built from owned items");
assert(!app.includes("function getMinecraftHotbarItems()"), "old fixed hotbar function was replaced");
assert(app.includes("function getMinecraftHeldItemType"), "Steve has a held-item resolver");
assert(app.includes("minecraft-side-player-hand-item"), "Steve renders the selected item in his hand");
assert(app.includes("pulseMinecraftPlayerAction"), "player action swing pulse exists");
assert(app.includes("spawnMinecraftPickup"), "mined blocks spawn pickup feedback");
assert(app.includes("minecraftPickupItems"), "pickup state exists");
assert(app.includes("minecraft-side-tree-trunk-block"), "side trees render block-by-block trunks");
assert(app.includes('originBiome === "forest"') || app.includes('biome === "forest"'), "forest biome controls trees");
assert(app.includes('biome === "plains"'), "plains biome is handled");
assert(app.includes('biome === "desert"'), "desert biome is handled");
assert(!app.includes("animal-run-x"), "animal walk no longer uses snap-back run offsets");

assert(css.includes(".minecraft-side-player-hand-item"), "held item CSS exists");
assert(css.includes("@keyframes minecraft-side-player-mine"), "pickaxe swing animation exists");
assert(css.includes("@keyframes minecraft-side-player-sword"), "sword swing animation exists");
assert(css.includes(".minecraft-side-pickup"), "pickup CSS exists");
assert(css.includes("@keyframes minecraft-side-pickup-fly"), "pickup fly animation exists");
assert(css.includes("@keyframes minecraft-side-animal-walk"), "animal smooth walk animation exists");
assert(!css.includes("@keyframes minecraft-side-animal-hop"), "old snap-back animal hop animation removed");
assert(css.includes(".minecraft-side-block.minecraft-cactus"), "cactus side texture exists");
assert(css.includes(".minecraft-side-block.minecraft-sand"), "sand side texture exists");

if (!process.exitCode) {
  console.log("Minecraft first pack checks passed.");
}
