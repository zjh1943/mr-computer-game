const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");

const expectedMobs = [
  "zombie",
  "skeleton",
  "creeper",
  "spider",
  "enderman",
  "slime",
  "magma-cube",
  "witch",
  "villager",
  "pig",
  "cow",
  "sheep",
  "chicken",
  "horse",
  "wolf",
  "cat",
  "parrot",
  "bat",
  "turtle"
];

let failed = false;

for (const mob of expectedMobs) {
  const relativePath = `assets/minecraft-mobs/${mob}.png`;
  const absolutePath = path.join(root, relativePath);

  if (!fs.existsSync(absolutePath)) {
    console.error(`Missing mob texture: ${relativePath}`);
    failed = true;
  }

  if (!css.includes(`url("./${relativePath}")`)) {
    console.error(`Mob texture is not referenced from CSS: ${relativePath}`);
    failed = true;
  }
}

const forbidden = path.join(root, "assets/minecraft-mobs/blaze.png");
if (fs.existsSync(forbidden) || css.includes("minecraft-mobs/blaze.png")) {
  console.error("Blaze texture should not be added.");
  failed = true;
}

if (!app.includes("minecraft-bat") || !app.includes("makeMinecraftBatElement")) {
  console.error("Minecraft bat is not wired into the mine cave.");
  failed = true;
}

if (failed) {
  process.exit(1);
}

console.log(`Verified ${expectedMobs.length} Minecraft mob textures and mine bat wiring.`);
