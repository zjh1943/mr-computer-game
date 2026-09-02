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

expectContains(html, 'id="minecraft-pocket-crafting-grid"', "Backpack needs a 2x2 pocket crafting grid.");
expectContains(html, 'id="minecraft-pocket-crafting-output"', "Backpack needs a pocket crafting output slot.");
expectContains(app, "minecraftPocketCraftingSlots", "Pocket crafting state is missing.");
expectContains(app, "const minecraftPocketRecipes", "Pocket crafting recipe list is missing.");
expectContains(app, "matchMinecraftPocketRecipe", "Pocket crafting matcher is missing.");
expectContains(app, "renderMinecraftPocketCrafting", "Pocket crafting renderer is missing.");
expectContains(app, "craftMinecraftPocketRecipe", "Pocket crafting output click handler is missing.");
expectMatches(app, /recipe: "oak_planks"[\s\S]*shape: \["", "wood", "", ""\]/, "Pocket crafting should make planks from one log.");
expectMatches(app, /recipe: "crafting_table"[\s\S]*shape: \["oak_planks", "oak_planks", "oak_planks", "oak_planks"\]/, "Pocket crafting should make a crafting table from four planks.");
expectMatches(css, /\.minecraft-side-backpack-panel\s*\{[\s\S]*background-image:[\s\S]*minecraft-blocks\/grass\.png/, "Backpack should use a Minecraft grass-world backdrop.");
expectContains(css, ".minecraft-side-player-preview", "Backpack should show a Steve/player preview.");
expectContains(css, ".minecraft-pocket-crafting-grid", "Pocket crafting grid styles are missing.");
expectContains(css, ".minecraft-pocket-crafting-output", "Pocket crafting output styles are missing.");
expectContains(css, ".minecraft-side-backpack-hotbar", "Backpack should include a bottom hotbar row.");
expectMatches(css, /\.minecraft-side-backpack-grid\s*\{[\s\S]*grid-template-columns: repeat\(9,/, "Backpack inventory should use a 9-column Minecraft grid.");

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log("Verified Minecraft player backpack with 2x2 pocket crafting.");
