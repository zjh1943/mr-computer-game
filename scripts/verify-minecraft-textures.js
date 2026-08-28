const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");

const expectedTextures = [
  "grass",
  "dirt",
  "mossy-dirt",
  "fungus",
  "stone-bricks",
  "cobblestone",
  "sand",
  "red-sand",
  "gold-ore",
  "snow",
  "ice",
  "packed-ice",
  "blue-ice",
  "obsidian",
  "bedrock",
  "deepslate",
  "tuff",
  "diorite",
  "granite",
  "oak-planks",
  "spruce-planks",
  "birch-planks",
  "jungle-planks",
  "acacia-planks",
  "stone-brick",
  "bricks",
  "quartz-block",
  "sandstone",
  "red-sandstone",
  "prismarine",
  "end-stone",
  "purpur-block",
  "white-concrete",
  "white-wool",
  "bookshelf",
  "oak-log",
  "nether-pumpkin",
  "nether-watermelon"
];

const forbiddenTextures = [
  "tnt",
  "crafting-table",
  "furnace",
  "chest",
  "enchanting-table",
  "ender-chest",
  "cactus",
  "red-mushroom",
  "jack-o-lantern",
  "sea-lantern",
  "redstone-lamp",
  "slime-block",
  "honey-block",
  "glowstone-new",
  "soul-sand-new",
  "dispenser",
  "dropper"
];

let failed = false;

for (const texture of expectedTextures) {
  const relativePath = `assets/minecraft-blocks/${texture}.png`;
  const absolutePath = path.join(root, relativePath);

  if (!fs.existsSync(absolutePath)) {
    console.error(`Missing texture: ${relativePath}`);
    failed = true;
  }

  if (!css.includes(`url("./${relativePath}")`)) {
    console.error(`Texture is not referenced from CSS: ${relativePath}`);
    failed = true;
  }
}

for (const texture of forbiddenTextures) {
  const relativePath = `assets/minecraft-blocks/${texture}.png`;
  const absolutePath = path.join(root, relativePath);

  if (fs.existsSync(absolutePath) || css.includes(relativePath)) {
    console.error(`Forbidden texture should not be added: ${relativePath}`);
    failed = true;
  }
}

if (!css.includes("minecraft-texture-oak-log")) {
  console.error("Oak log texture is not wired into CSS.");
  failed = true;
}

if (!css.includes("minecraft-texture-nether-pumpkin") || !css.includes("minecraft-texture-nether-watermelon")) {
  console.error("Nether snack textures are not wired into CSS.");
  failed = true;
}

if (!app.includes("minecraftBlockTypes.nether_pumpkin") || !app.includes("minecraftBlockTypes.nether_watermelon")) {
  console.error("Nether snack blocks are not registered.");
  failed = true;
}

if (!app.includes('return "nether_pumpkin"') || !app.includes('return "nether_watermelon"')) {
  console.error("Nether snacks are not generated in the Nether.");
  failed = true;
}

const overworldBlockStart = app.indexOf("function getDefaultMinecraftBlockAt");
const overworldBlock = overworldBlockStart >= 0 ? app.slice(overworldBlockStart) : "";
const netherBranch = overworldBlock.indexOf('minecraftDimension === "nether"');
const overworldAfterNetherDispatch = netherBranch >= 0 ? overworldBlock.slice(netherBranch + 1) : overworldBlock;
if (overworldAfterNetherDispatch.includes('return "nether_pumpkin"') || overworldAfterNetherDispatch.includes('return "nether_watermelon"')) {
  console.error("Nether snacks must not be generated in the Overworld.");
  failed = true;
}

if (failed) {
  process.exit(1);
}

console.log(`Verified ${expectedTextures.length} Minecraft block textures.`);
