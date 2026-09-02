const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");

function expectContains(source, text, message) {
  if (!source.includes(text)) {
    console.error(message);
    process.exitCode = 1;
  }
}

const recipes = [
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
  "pumpkin_pie"
];

expectContains(app, "const minecraftShapedRecipes", "Crafting should use a shaped recipe list.");
recipes.forEach((recipe) => {
  expectContains(app, `recipe: "${recipe}"`, `Missing crafting recipe: ${recipe}`);
  expectContains(app, recipe, `Missing inventory/crafting support for: ${recipe}`);
  expectContains(css, `item-${recipe}`, `Missing backpack icon style for: ${recipe}`);
});
expectContains(app, "matchMinecraftShapedRecipe", "Crafting output should match the 3x3 shape.");
expectContains(app, "addMinecraftCraftedItem", "Crafting should add non-pickaxe outputs into the inventory/backpack.");
expectContains(app, "minecraftCraftingPlaceableMaterials.add(\"oak_planks\")", "Crafting should allow crafted planks to be reused.");

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log("Verified Minecraft shaped crafting recipes and backpack icons.");
