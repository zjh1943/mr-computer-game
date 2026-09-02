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

const productBlock = app.match(/const townStageThreeProducts = \[([\s\S]*?)\];/);
assert(productBlock, "town stage three products data should exist");
const productCount = (productBlock?.[1].match(/\bid:\s*"/g) || []).length;
assert(productCount >= 20, "store pages should expose at least 20 products");

assert(app.includes("function makeTownRoundHand"), "town residents should have round hands");
assert(app.includes("const townResidentScale"), "town residents should use a smaller base scale");
assert(app.includes("makeTownSquareHouse"), "houses should be square with pointed roofs");
assert(app.includes("function openTownHouseInterior"), "clicking a house should open an interior page");
assert(app.includes("function openTownStorePage"), "clicking stores should open a full store page");
assert(app.includes("function autoDressTownResident"), "buying clothing should auto dress the resident");
assert(app.includes("data-town-store-products"), "store page should render a product grid target");
assert(app.includes("data-town-close-interior"), "house interior should have a close button");
assert(app.includes("data-town-close-store"), "store page should have a close button");

[
  ".computer-town-house-interior-panel",
  ".computer-town-store-page",
  ".computer-town-room",
  ".computer-town-store-grid",
  ".computer-town-store-close",
  ".computer-town-product-card"
].forEach((selector) => {
  assert(css.includes(selector), `${selector} styles should exist`);
});

console.log("town stage three second pack verification passed");
