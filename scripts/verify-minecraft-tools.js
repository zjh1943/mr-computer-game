const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");

const expectedTools = [
  "wood-sword",
  "stone-sword",
  "iron-sword",
  "gold-sword",
  "diamond-sword",
  "wood-pickaxe",
  "stone-pickaxe",
  "iron-pickaxe",
  "gold-pickaxe",
  "diamond-pickaxe",
  "wood-axe",
  "stone-axe",
  "iron-axe",
  "bow",
  "arrow",
  "shield",
  "fishing-rod",
  "shears",
  "flint-and-steel",
  "carrot-on-a-stick",
  "torch"
];

let failed = false;

for (const tool of expectedTools) {
  const relativePath = `assets/minecraft-tools/${tool}.png`;
  const absolutePath = path.join(root, relativePath);
  if (!fs.existsSync(absolutePath)) {
    console.error(`Missing tool image: ${relativePath}`);
    failed = true;
  }
  if (!css.includes(`url("./${relativePath}")`)) {
    console.error(`Tool image is not referenced from CSS: ${relativePath}`);
    failed = true;
  }
}

if (!css.includes("minecraft-tool-torch")) {
  console.error("Torch tool variable is not wired into CSS.");
  failed = true;
}

if (failed) {
  process.exit(1);
}

console.log(`Verified ${expectedTools.length} Minecraft tool images.`);
