const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const writes = [];
const watchers = [];
let handler;
const source = fs.readFileSync(path.join(__dirname, '../server.js'), 'utf8');
vm.runInNewContext(source, {
  __dirname: path.resolve(__dirname, '..'),
  process: { env: {} },
  URL,
  console: { log() {} },
  require(name) {
    if (name === 'node:http') return {
      createServer(callback) { handler = callback; return { listen() {} }; }
    };
    if (name === 'node:fs') return {
      watchFile(file, options, callback) { watchers.push(callback); }
    };
    return require(name);
  }
});
handler({ url: '/__live-reload', headers: {}, on() {} }, {
  writeHead() {},
  write(chunk) { writes.push(chunk); }
});
watchers[0]();
const stream = writes.join('');
assert.match(stream, /(?:^|\n)event: reload\ndata: \d+\n\n/,
  'The browser must receive a complete SSE reload event with real newlines');
console.log('Preview live reload event verification passed');
