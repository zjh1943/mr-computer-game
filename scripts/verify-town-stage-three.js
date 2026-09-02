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

assert(app.includes("computer-town-avatar-bar"), "town avatar bar exists");
assert(app.includes("computer-town-market-panel"), "town market panel exists");
assert(app.includes("townStageThreeBusinesses"), "stage three business data exists");
assert(app.includes("makeTownStageThreeHouse"), "character homes use stage three house builder");
assert(app.includes("makeTownHouseFeature"), "houses get character feature signs");
assert(app.includes("focusTownResident"), "avatar clicks focus residents");
assert(app.includes("renderTownAvatarBar"), "avatar bar renderer exists");
assert(app.includes("showComputerTownThought"), "quiet thought bubbles exist");
assert(app.includes("handleTownStageThreeZoomShortcut"), "1+2 zoom shortcut exists");
assert(css.includes(".computer-town-avatar-bar"), "avatar bar styles exist");
assert(css.includes(".computer-town-thought"), "thought bubble styles exist");
assert(css.includes(".computer-town-market-panel"), "market panel styles exist");

if (!process.exitCode) {
  console.log("Town stage three checks passed.");
}
