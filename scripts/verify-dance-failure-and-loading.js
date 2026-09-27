const assert = require('node:assert/strict');
const fs = require('node:fs');

const js = fs.readFileSync('computer-apps.js', 'utf8');
const css = fs.readFileSync('computer-apps.css', 'utf8');

assert(js.includes('dance-loading-stage'), 'song connection needs a stage-building animation');
assert(js.includes('搬来角色'), 'loading animation needs characters carrying performers');
assert(js.includes('铺开彩色地板'), 'loading animation needs a carried colorful floor');
assert(js.includes('装好天空'), 'loading animation needs a sky decoration step');
assert(js.includes('registerDanceMiss'), 'misses must feed a visible failure sequence');
assert(js.includes('dance-failure-scene'), 'failure needs a dedicated scene');
assert(js.includes('下次一定好好唱'), 'the returned role must promise to sing better');
assert(css.includes('.dance-role-lost'), 'one of two performers must become a small gray character');
assert(css.includes('.dance-failure-icon'), 'the dragged role icon must visibly leave and return');

console.log('Dance loading crew and recoverable role-loss failure verified.');
