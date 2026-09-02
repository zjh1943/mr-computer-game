const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const buildScript = fs.readFileSync(path.join(root, "scripts", "build-sites-static.js"), "utf8");
const musicPath = path.join(root, "assets", "minecraft-audio", "minecraft-background.mp3");

const checks = [
  {
    name: "minecraft background mp3 is available in assets",
    pass: fs.existsSync(musicPath)
  },
  {
    name: "minecraft panel declares a looping background audio element",
    pass: /<audio[^>]+id="minecraft-background-music"[\s\S]*assets\/minecraft-audio\/minecraft-background\.mp3[\s\S]*<\/audio>/.test(html)
      && /loop/.test(html)
  },
  {
    name: "app prepares minecraft music from the audio element",
    pass: /const minecraftBackgroundMusic = document\.querySelector\("#minecraft-background-music"\)/.test(app)
      && /function startMinecraftBackgroundMusic\(\)/.test(app)
      && /function stopMinecraftBackgroundMusic\(\)/.test(app)
  },
  {
    name: "minecraft music starts on opening and player interaction",
    pass: /setMinecraftPanelOpen\(open\)[\s\S]*startMinecraftBackgroundMusic\(\)/.test(app)
      && /moveMinecraftPlayer\(direction[\s\S]*startMinecraftBackgroundMusic\(\)/.test(app)
      && /digMinecraftDown\(\)[\s\S]*startMinecraftBackgroundMusic\(\)/.test(app)
      && /jumpMinecraftUp\(\)[\s\S]*startMinecraftBackgroundMusic\(\)/.test(app)
  },
  {
    name: "minecraft music pauses when minecraft closes",
    pass: /setMinecraftPanelOpen\(open\)[\s\S]*stopMinecraftBackgroundMusic\(\)/.test(app)
  },
  {
    name: "site build serves mp3 files as audio/mpeg",
    pass: /file\.endsWith\("\.mp3"\)[\s\S]*audio\/mpeg/.test(buildScript)
  }
];

const failed = checks.filter((check) => !check.pass);
if (failed.length > 0) {
  console.error("Minecraft music verification failed:");
  failed.forEach((check) => console.error(`- ${check.name}`));
  process.exit(1);
}

console.log("Minecraft music verification passed.");
