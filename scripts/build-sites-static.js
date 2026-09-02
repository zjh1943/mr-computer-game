const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");
const serverDir = path.join(dist, "server");

const includeFiles = [
  "index.html",
  "styles.css",
  "app.js",
  "diary.html",
  "diary.css",
  "diary.js",
  "rhythm-world.html",
  "rhythm-world.css",
  "rhythm-world.js"
];

function walk(dir, prefix = "") {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const rel = path.join(prefix, entry.name);
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(abs, rel);
    return rel;
  });
}

function mimeType(file) {
  if (file.endsWith(".html")) return "text/html; charset=utf-8";
  if (file.endsWith(".css")) return "text/css; charset=utf-8";
  if (file.endsWith(".js")) return "text/javascript; charset=utf-8";
  if (file.endsWith(".png")) return "image/png";
  if (file.endsWith(".jpg") || file.endsWith(".jpeg")) return "image/jpeg";
  if (file.endsWith(".svg")) return "image/svg+xml";
  if (file.endsWith(".mp3")) return "audio/mpeg";
  return "application/octet-stream";
}

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(serverDir, { recursive: true });

const assetsDir = path.join(root, "assets");
if (fs.existsSync(assetsDir)) {
  includeFiles.push(...walk(assetsDir, "assets").filter((file) => file !== "assets\\minecraft-audio\\minecraft-background.mp3"));
}

const files = {};
includeFiles.forEach((file) => {
  const abs = path.join(root, file);
  if (!fs.existsSync(abs)) return;
  const route = `/${file.replaceAll(path.sep, "/")}`;
  files[route] = {
    mime: mimeType(file),
    body: fs.readFileSync(abs).toString("base64")
  };
});
files["/"] = files["/index.html"];

const worker = `const files = ${JSON.stringify(files)};\n\nfunction normalizePath(url) {\n  const path = new URL(url).pathname;\n  if (path === "/") return "/";\n  return path.endsWith("/") ? path + "index.html" : path;\n}\n\nfunction decodeBase64(value) {\n  return Uint8Array.from(atob(value), (char) => char.charCodeAt(0));\n}\n\nexport default {\n  async fetch(request) {\n    const route = normalizePath(request.url);\n    const file = files[route] || files["/index.html"];\n    const headers = new Headers({\n      "content-type": file.mime,\n      "cache-control": route === "/" || route.endsWith(".html") ? "no-cache" : "public, max-age=31536000, immutable"\n    });\n    return new Response(decodeBase64(file.body), { headers });\n  }\n};\n`;

fs.writeFileSync(path.join(serverDir, "index.js"), worker);
console.log(`Built ${Object.keys(files).length} files into dist/server/index.js`);
