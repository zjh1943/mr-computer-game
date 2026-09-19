const assert = require('assert');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const ids = [
  'oren', 'raddy', 'clukr', 'fun-bot', 'vineria',
  'gray', 'brud', 'garnold', 'owakcx', 'sky',
  'mr-sun', 'durple', 'mr-tree', 'simon', 'tunner',
  'mr-fun-computer', 'wenda', 'jevin', 'pinki', 'black'
];

function pngSize(buffer) {
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

for (const view of ['front', 'left', 'right', 'back']) {
  const hashes = new Set();
  for (const id of ids) {
    const file = path.join('assets', 'sprunki-views', view, `${id}.png`);
    assert.ok(fs.existsSync(file), `missing ${view} view for ${id}`);
    const image = fs.readFileSync(file);
    const size = pngSize(image);
    assert.ok(size.width >= 70 && size.height >= 140, `${id} ${view} view is cropped or empty`);
    hashes.add(crypto.createHash('sha256').update(image).digest('hex'));
  }
  assert.equal(hashes.size, 20, `${view} views must contain 20 unique characters`);
}

const gray = pngSize(fs.readFileSync(path.join('assets', 'sprunki-views', 'front', 'gray.png')));
assert.ok(gray.height >= 205, 'Gray front view must include the complete body');
console.log('Complete unique front/left/right/back character views verification passed.');
