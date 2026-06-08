const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const host = process.env.HOST || "127.0.0.1";
const port = Number(process.env.PORT || 8000);
const root = __dirname;
const watchedFiles = ["index.html", "app.js", "styles.css"];
const liveReloadClients = new Set();

const liveReloadScript = `
<script>
(() => {
  if (!("EventSource" in window)) return;
  const events = new EventSource("/__live-reload");
  events.addEventListener("reload", () => {
    window.location.reload();
  });
})();
</script>
`;

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".wav": "audio/wav",
  ".mp3": "audio/mpeg"
};

function send(res, statusCode, body, headers = {}) {
  res.writeHead(statusCode, headers);
  res.end(body);
}

function sendLiveReloadEvent() {
  for (const client of liveReloadClients) {
    client.write("event: reload\\n");
    client.write(`data: ${Date.now()}\\n\\n`);
  }
}

function injectLiveReload(html) {
  if (html.includes("/__live-reload")) return html;
  if (html.includes("</body>")) {
    return html.replace("</body>", `${liveReloadScript}</body>`);
  }
  return `${html}${liveReloadScript}`;
}

watchedFiles.forEach((fileName) => {
  const filePath = path.join(root, fileName);
  fs.watchFile(filePath, { interval: 350 }, () => {
    sendLiveReloadEvent();
  });
});

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || `${host}:${port}`}`);

  if (url.pathname === "/__live-reload") {
    res.writeHead(200, {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive"
    });
    res.write("\\n");
    liveReloadClients.add(res);
    req.on("close", () => {
      liveReloadClients.delete(res);
    });
    return;
  }

  const requestedPath = decodeURIComponent(url.pathname);
  const relativePath = requestedPath === "/" ? "index.html" : requestedPath.slice(1);
  const filePath = path.resolve(root, relativePath);

  if (!filePath.startsWith(root + path.sep) && filePath !== root) {
    send(res, 403, "Forbidden", { "Content-Type": "text/plain; charset=utf-8" });
    return;
  }

  fs.stat(filePath, (statError, stat) => {
    if (statError || !stat.isFile()) {
      send(res, 404, "Not found", { "Content-Type": "text/plain; charset=utf-8" });
      return;
    }

    const contentType = mimeTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream";
    if (path.basename(filePath) === "index.html") {
      fs.readFile(filePath, "utf8", (readError, html) => {
        if (readError) {
          send(res, 500, "Server error", { "Content-Type": "text/plain; charset=utf-8" });
          return;
        }
        send(res, 200, injectLiveReload(html), { "Content-Type": contentType });
      });
      return;
    }

    res.writeHead(200, { "Content-Type": contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(port, host, () => {
  console.log(`Game server running at http://${host}:${port}/`);
});
