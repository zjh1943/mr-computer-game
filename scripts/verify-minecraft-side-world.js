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

expectContains(app, "function renderMinecraftSideWorld", "Main world does not have a side-view renderer.");
expectContains(app, "minecraftWorld.classList.add(\"minecraft-side-world\")", "Side-view world class is not applied.");
expectContains(app, "minecraft-side-cave", "Side-view cave class is not applied.");
expectContains(app, "minecraft-cave-entry-depth", "Nine-block cave entry depth is not wired.");
expectContains(app, "makeMinecraftSidePlayer", "Steve/player is not rendered in side view.");
expectContains(app, "makeMinecraftSideTree", "Side-view trees are not rendered.");
expectContains(app, "makeMinecraftSideClouds", "Side-view clouds are not rendered.");
expectContains(app, "applyMinecraftGravity();", "Digging down does not trigger gravity.");
expectContains(app, "minecraftEasyDigDownBlocks", "Simple dirt and stone digging down is not allowed.");

expectContains(css, "assets/minecraft-player/steve.png", "Steve texture is not referenced from CSS.");
expectContains(css, "assets/minecraft-backgrounds/cave.png", "Cave background is not referenced from CSS.");
expectContains(css, ".minecraft-side-world", "Side-view world CSS is missing.");
expectContains(css, ".minecraft-side-nether", "Nether side-view CSS is missing.");
expectContains(css, ".minecraft-side-end", "End side-view CSS is missing.");
expectContains(css, ".minecraft-side-sky-dimension", "Sky dimension side-view CSS is missing.");
expectContains(css, ".minecraft-side-cave", "Cave side-view CSS is missing.");
expectContains(css, ".minecraft-side-sun", "Side-view sun CSS is missing.");
expectContains(css, ".minecraft-side-cloud", "Side-view cloud CSS is missing.");
expectContains(css, "minecraft-side-cloud-drift", "Side-view clouds are not animated.");
expectContains(css, ".minecraft-side-tree", "Side-view tree CSS is missing.");

const firstTreeCssStart = css.indexOf(".minecraft-side-tree {");
const treeCssStart = firstTreeCssStart >= 0 ? css.indexOf(".minecraft-side-tree {", firstTreeCssStart + 1) : -1;
const treeCssEnd = css.indexOf(".minecraft-side-block", treeCssStart);
const treeCss = treeCssStart >= 0 && treeCssEnd > treeCssStart ? css.slice(treeCssStart, treeCssEnd) : "";
if (treeCss.includes("animation:")) {
  console.error("Side-view trees should not animate.");
  failed = true;
}

const stevePath = path.join(root, "assets/minecraft-player/steve.png");
if (!fs.existsSync(stevePath)) {
  console.error("Missing Steve player texture: assets/minecraft-player/steve.png");
  failed = true;
}

const cavePath = path.join(root, "assets/minecraft-backgrounds/cave.png");
if (!fs.existsSync(cavePath)) {
  console.error("Missing cave background: assets/minecraft-backgrounds/cave.png");
  failed = true;
}

if (css.includes("andesite") || app.includes("andesite")) {
  console.error("Andesite should not exist in the Minecraft setup.");
  failed = true;
}

if (failed) {
  process.exit(1);
}

console.log("Verified Minecraft side-view world, moving clouds, still trees, Steve, and gravity wiring.");
