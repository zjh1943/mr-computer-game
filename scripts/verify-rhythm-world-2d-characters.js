const assert = require('assert');
const fs = require('fs');
const path = require('path');

const ids = [
  'oren', 'raddy', 'clukr', 'fun-bot', 'vineria',
  'gray', 'brud', 'garnold', 'owakcx', 'sky',
  'mr-sun', 'durple', 'mr-tree', 'simon', 'tunner',
  'mr-fun-computer', 'wenda', 'jevin', 'pinki', 'black'
];

for (const id of ids) {
  const file = path.join('assets', 'sprunki-2d', `${id}.png`);
  assert.ok(fs.existsSync(file), `missing 2D reference sprite: ${id}`);
  const png = fs.readFileSync(file);
  assert.deepEqual([...png.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10], `${id} is not a PNG`);
  assert.ok(png.length > 1000, `${id} sprite is unexpectedly empty`);
}

console.log('2D reference character assets verification passed.');
