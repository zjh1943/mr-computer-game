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

assert(app.includes("const townLayoutRadius"), "town should define a larger layout radius for homes");
assert(app.includes("const townStageRadius"), "stage should define a smaller stage radius");
assert(app.includes("makeTownStageLightRig"), "stage should have a focused light rig");
assert(app.includes("moveTownAudienceAroundStage"), "audience should circle the stage during concerts");
assert(app.includes("member.position.y = townStageSurfaceY"), "performers should stand on the stage surface");
assert(app.includes("moveTownMemberIntoHome"), "residents should walk into homes before sleeping");
assert(app.includes("renderTownInteriorResident"), "house interiors should show 2D resident activity");
assert(app.includes("typeComputerTownScreenText"), "Mr. Fun Computer should speak through screen text");
assert(app.includes("data-town-resident-scene"), "house interior should include a resident scene target");
assert(app.includes("computer-town-resident-scene"), "interior resident scene markup should exist");

assert(css.includes(".computer-town-resident-scene"), "resident scene should have CSS");
assert(css.includes(".computer-town-pixel-resident"), "2D resident should have CSS");
assert(css.includes(".computer-town-pixel-tv"), "watching TV interior should have CSS");
assert(css.includes(".computer-town-pixel-phone"), "phone interior should have CSS");

console.log("town stage three layout pack verification passed");
