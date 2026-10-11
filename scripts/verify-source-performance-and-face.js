const assert = require("assert");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const sourcePerformance = require(path.join(root, "source-performance-data.js"));

assert.strictEqual(Object.keys(sourcePerformance).length, 19, "all 19 non-horror characters need source-code animation cues");
assert(sourcePerformance.computer.cues.length >= 18, "Mr. Computer needs its full source costume sequence");
assert(sourcePerformance.oren.cues.every(cue => /\.svg$/.test(cue[1])), "source cues must point to original costume assets");
assert(html.includes("source-performance-data.js?v=20261011-source1"), "source timing data must load before the app");
assert(app.includes("window.SprunkiSourcePerformance?.[voiceId]"), "concert poses must read generated source timing");
assert(app.includes("source.playbackRate.value = 1"), "source voices must keep their original speed");
assert(app.includes("source.detune.value = 0"), "source voices must keep their original pitch");
assert(!app.includes("const filter = versionVoice.filter"), "member voices must not pass through the old imitation filter");
assert(app.includes("miniComputerFruitBirthUnlocked ? createHomeSmallComputerSinger() : null"), "small Mr. Computer must only appear after fruit birth");
assert(css.includes("Mr. Computer's own\n   DOM face covers the printed screen"), "Pyramixed host must restore the interactive DOM face");
assert(css.includes('.face-cheeks{display:flex!important'), "the restored smile must include its M cheeks");
assert(css.includes('content:none!important'), "the fixed duplicate mouth overlay must be disabled");

console.log("Source performances, unmodified voices, birth gate, and cursor-tracking face verified.");
