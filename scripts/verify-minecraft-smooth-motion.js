const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");

function extractFunctionBody(source, functionName) {
  const start = source.indexOf(`function ${functionName}(`);
  if (start < 0) return "";
  const braceStart = source.indexOf("{", start);
  let depth = 0;
  for (let index = braceStart; index < source.length; index += 1) {
    if (source[index] === "{") depth += 1;
    if (source[index] === "}") depth -= 1;
    if (depth === 0) return source.slice(braceStart + 1, index);
  }
  return "";
}

function extractCssBlock(source, selector) {
  const start = source.indexOf(selector);
  if (start < 0) return "";
  const braceStart = source.indexOf("{", start);
  const braceEnd = source.indexOf("}", braceStart);
  return source.slice(braceStart + 1, braceEnd);
}

const animalRunDirectionBody = extractFunctionBody(app, "getMinecraftAnimalRunDirection");
const playerCssBlock = extractCssBlock(css, ".minecraft-side-player {");

const checks = [
  {
    name: "animal run direction does not flip with minecraftDayTick",
    pass: animalRunDirectionBody.length > 0 && !animalRunDirectionBody.includes("minecraftDayTick")
  },
  {
    name: "animal direction is carried from old cell to new cell",
    pass: /minecraftAnimalDirections/.test(app)
      && /delete minecraftAnimalDirections\[getMinecraftAnimalKey\(move\.x, move\.z\)\]/.test(app)
      && /minecraftAnimalDirections\[getMinecraftAnimalKey\(move\.nextX, move\.z\)\] = move\.direction/.test(app)
  },
  {
    name: "clouds receive time based animation delays when rebuilt",
    pass: /const cloudTime = Date\.now\(\)/.test(app)
      && /--cloud-delay/.test(app)
      && /animation-delay: var\(--cloud-delay/.test(css)
  },
  {
    name: "sky animation uses millisecond time instead of whole ticks",
    pass: /const skyTime = Date\.now\(\)/.test(app)
      && /skyDelay = `-\$\{skyTime %/.test(app)
  },
  {
    name: "steve landing animation only plays when explicitly requested",
    pass: /let minecraftPlayerLandingPulse/.test(app)
      && /makeMinecraftSidePlayer\(animateLanding = false\)/.test(app)
      && /minecraft-side-player-land/.test(css)
      && !playerCssBlock.includes("animation")
  }
];

const failed = checks.filter((check) => !check.pass);
if (failed.length > 0) {
  console.error("Minecraft smooth motion verification failed:");
  failed.forEach((check) => console.error(`- ${check.name}`));
  process.exit(1);
}

console.log("Minecraft smooth motion verification passed.");
