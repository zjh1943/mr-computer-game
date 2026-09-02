const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exit(1);
  }
}

const townSection = app.slice(app.indexOf("const townSprunkiCharacters"), app.indexOf("function renderComputerDesktop"));
assert(!townSection.includes("makeTownSkyFace(THREE, \"月亮公公\""), "town should not create Moon Grandpa");
assert(!townSection.includes("{ type: \"sky\", member: moon }"), "town avatar bar should not include Moon Grandpa");
assert(!townSection.includes("speaker === \"月亮公公\""), "town click speech should not mention Moon Grandpa");
assert(!app.includes("\"月亮公公\": \"mr-sun\""), "moon icon mapping should be removed");
assert(app.includes("\"Mr. Tree\": { x: 10.8, z: -10.7 }"), "Mr. Tree home should move to a clearer back corner");
assert(app.includes("character.name === \"Mr. Tree\" ? 10.4"), "Mr. Tree should stand clear of other homes");
assert(app.includes("let minecraftBackpackHeldItem"), "Minecraft backpack should track a picked-up item");
assert(app.includes("handleMinecraftBackpackSlotPick"), "Minecraft backpack slots should support pick and place");
assert(app.includes("swapMinecraftBackpackItems"), "placing onto an occupied slot should swap items");
assert(app.includes("minecraft-backpack-slot-picked"), "picked backpack slot should get a larger visual state");
assert(css.includes(".minecraft-backpack-slot-picked"), "picked backpack slot should have CSS");
assert(css.includes(".minecraft-backpack-held-item"), "held backpack item preview should have CSS");

console.log("town moon removal and Minecraft backpack swap verification passed");
