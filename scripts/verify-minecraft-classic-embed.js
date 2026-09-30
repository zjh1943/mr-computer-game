const assert = require('node:assert/strict');
const fs = require('node:fs');

const shell = fs.readFileSync('voxel-shell.js', 'utf8');
const css = fs.readFileSync('computer-apps.css', 'utf8');

assert(shell.includes("button(c,'官方网页版（联网）',classicPage)"), 'Minecraft launcher needs an official web version entry');
assert(shell.includes("frame.src='https://classic.minecraft.net/'"), 'the entry must embed the official Minecraft Classic page');
assert(shell.includes("frame.allow='fullscreen; autoplay; gamepad; clipboard-write'"), 'the embedded game needs its browser capabilities');
assert(shell.includes("frame.setAttribute('allowfullscreen','')"), 'Minecraft Classic must be able to enter fullscreen');
assert(shell.includes("frame.setAttribute('sandbox','allow-scripts allow-same-origin allow-pointer-lock allow-forms allow-popups')"), 'the remote game must run inside a bounded iframe');
assert(css.includes('.voxel-classic-frame'), 'the official web version needs a full-window game layout');

console.log('Official Minecraft Classic embed verified.');
