const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const iconDir = path.join(root, "assets", "town-icons");

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

assert(app.includes("townConcertPrograms"), "concert programs are defined");
assert(app.includes("getTownConcertProgram"), "concert program selector exists");
assert(app.includes("playComputerTownBeatLayer"), "concert uses layered rhythm sounds");
assert(app.includes("moveTownPerformerToStage"), "performers move onto the stage");
assert(app.includes("showTownConcertApplause"), "audience applause happens between programs");
assert(app.includes("sendTownMemberHomeToSleep"), "residents go home to sleep");
assert(app.includes("member.userData.sleepingAtHome"), "sleep state is stored on residents");
assert(app.includes("townIconFile"), "character icon filenames exist");
assert(app.includes("assets/town-icons"), "avatar icons use cropped assets");
assert(app.includes("!concertActive && !sleepingActive"), "non-performers stay quiet during concerts");
assert(css.includes(".computer-town-stage-light"), "bigger concert stage styling exists");
assert(css.includes(".computer-town-avatar span"), "avatar icon CSS exists");
assert(css.includes("background-image: var(--town-avatar-icon"), "avatar CSS uses image variable");

if (fs.existsSync(iconDir)) {
  const icons = fs.readdirSync(iconDir).filter((file) => file.endsWith(".png"));
  assert(icons.length >= 20, "cropped town icon assets exist");
} else {
  assert(false, "town icon asset directory exists");
}

if (!process.exitCode) {
  console.log("Town concert and sleep checks passed.");
}
