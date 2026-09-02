const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exit(1);
  }
}

assert(app.includes("const townZoomLevels"), "town should define zoom levels for near and overview camera");
assert(app.includes("handleTownOverviewZoomShortcut"), "town should handle 2/3 zoom shortcuts");
assert(app.includes("townOverviewZoom"), "town camera should keep an overview zoom state");
assert(app.includes("camera.position.z + zoomTarget.distance"), "camera should use zoom target distance");
assert(app.includes("townAvatarTargets"), "avatar bar should include sky and background characters");
assert(!app.includes(".filter((member) => member?.userData?.speaker && !member.userData.backgroundCharacter)"), "avatar bar should not filter out computer and tree");
assert(app.includes("residentHomeOverrides"), "town homes should support manual position overrides");
assert(app.includes("\"Mr. Fun Computer\": { x: 0, z: -12.2 }"), "Mr. Fun Computer home should move farther back");
assert(app.includes("\"Oren\": { x: -2.6, z: -9.8 }"), "Oren home should avoid overlapping Mr. Fun Computer home");
assert(app.includes("avatarTarget.type === \"sky\""), "avatar clicks should support Sun and Moon sky targets");

console.log("town zoom and avatar verification passed");
