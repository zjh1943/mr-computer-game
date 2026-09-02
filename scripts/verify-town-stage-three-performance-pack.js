const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exit(1);
  }
}

assert(/const townResidentScale = 0\.(4|5)/.test(app), "town residents should be smaller than the previous 0.68 scale");
assert(app.includes("playComputerTownSongNote"), "concert should use song notes instead of speech-only performance");
assert(app.includes("townConcertMelodies"), "concert should define repeatable melodies");
assert(app.includes("performTownConcertSong"), "concert should trigger performers playing music");
assert(!app.includes("const lyricLines = [\"咚，啪，今天的节拍开始。\""), "concert should not rely on spoken lyric loops");

[
  "computer-town-pixel-couch",
  "computer-town-pixel-bed",
  "computer-town-pixel-stove",
  "computer-town-pixel-bath",
  "computer-town-pixel-painting"
].forEach((marker) => {
  assert(app.includes(marker) || css.includes(`.${marker}`), `${marker} should render visible room art`);
});

assert(css.includes(".computer-town-room-art"), "room panels should contain composed pixel art");

console.log("town stage three performance pack verification passed");
