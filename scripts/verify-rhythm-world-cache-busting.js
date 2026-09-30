const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const html = fs.readFileSync(path.join(__dirname, '..', 'rhythm-world.html'), 'utf8');
const server = fs.readFileSync(path.join(__dirname, '..', 'server.js'), 'utf8');
const moduleScript = html.match(/<script\s+type="module"\s+src="([^"]+)"/);

assert.ok(moduleScript, 'rhythm world must load its main module');
assert.match(
  moduleScript[1],
  /^\.\/rhythm-world\.js\?v=[a-z0-9._-]+$/i,
  'the main module URL must carry a version so a failed browser cache entry cannot leave the page unclickable'
);

assert.match(
  server,
  /"Cache-Control":\s*"no-cache, no-store, must-revalidate"/,
  'the local preview must not preserve a dead HTML or JavaScript response'
);

console.log('Rhythm world module cache-busting verification passed.');
