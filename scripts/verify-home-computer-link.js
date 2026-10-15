const assert = require("node:assert/strict");
const fs = require("node:fs");
const home = require("../home-data.js");

const computer = home.games.find((game) => game.id === "computer");
assert(computer, "homepage needs a Mr Computer card");
assert.equal(home.gameUrl(computer), "./computer.html", "Mr Computer card must point to the published game page");
assert(fs.existsSync("computer.html"), "the linked Mr Computer page must exist in the release");
const index = fs.readFileSync("index.html", "utf8");
assert(index.includes('id="computer-link" class="primary-button" href="./computer.html"'), "the visible fallback button must work before homepage JavaScript loads");
assert(index.includes('home-data.js?v=20261015-entry1'), "the fixed game route must bypass stale homepage cache");

console.log("Homepage Mr Computer entry points to the published game page.");
