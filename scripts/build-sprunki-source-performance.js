const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const project = JSON.parse(fs.readFileSync(path.join(root, "assets/sprunki-kiss-local/assets/project.json"), "utf8"));
const ids = [
  "oren", "raddy", "clukr", "funbot", "vineria", "gray", "brud", "garnold", "lime", "sky",
  "mr_sun", "durple", "mr_tree", "simon", "tunner", "computer", "wenda", "pinki", "jevin", "black"
];

function referencedBlock(input, blocks) {
  if (!Array.isArray(input)) return null;
  for (const part of input) {
    if (typeof part === "string" && blocks[part]) return part;
    if (Array.isArray(part)) {
      const found = referencedBlock(part, blocks);
      if (found) return found;
    }
  }
  return null;
}

function literal(input, blocks) {
  if (!Array.isArray(input)) return "";
  for (const part of input) {
    if (Array.isArray(part)) {
      if (typeof part[1] === "string" && !blocks[part[1]]) return part[1];
      const nested = literal(part, blocks);
      if (nested !== "") return nested;
    }
    if (typeof part === "string" && !blocks[part]) return part;
  }
  return "";
}

function costumeLiteral(input, blocks) {
  const menuId = referencedBlock(input, blocks);
  const menuName = menuId && blocks[menuId]?.fields?.COSTUME?.[0];
  return menuName || literal(input, blocks);
}

function flatten(start, blocks, costumes, depth = 0) {
  if (!start || depth > 24) return [];
  const events = [];
  let blockId = start;
  let guard = 0;
  while (blockId && guard++ < 500) {
    const block = blocks[blockId];
    if (!block) break;
    if (block.opcode === "procedures_call" && block.mutation?.proccode === "Switch Costume %s") {
      const costumeName = costumeLiteral(Object.values(block.inputs || {})[0], blocks);
      if (/^anim\d*$/.test(costumeName) && costumes[costumeName]) events.push({ type: "frame", asset: costumes[costumeName] });
    } else if (block.opcode === "looks_switchcostumeto") {
      const costumeName = costumeLiteral(block.inputs?.COSTUME, blocks);
      if (/^anim\d*$/.test(costumeName) && costumes[costumeName]) events.push({ type: "frame", asset: costumes[costumeName] });
    } else if (block.opcode === "looks_nextcostume") {
      events.push({ type: "next" });
    } else if (block.opcode === "control_wait") {
      const seconds = Number(literal(block.inputs?.DURATION, blocks));
      if (Number.isFinite(seconds) && seconds > 0) events.push({ type: "wait", seconds });
    } else if (block.opcode === "control_repeat") {
      const count = Math.max(0, Math.min(16, Number(literal(block.inputs?.TIMES, blocks)) || 0));
      const child = flatten(referencedBlock(block.inputs?.SUBSTACK, blocks), blocks, costumes, depth + 1);
      for (let index = 0; index < count; index += 1) events.push(...child);
    }
    blockId = block.next;
  }
  return events;
}

function buildCues(events, frameAssets) {
  const cues = [];
  let time = 0;
  let nextIndex = 0;
  for (const event of events) {
    if (event.type === "frame") cues.push([Number(time.toFixed(3)), event.asset]);
    else if (event.type === "next" && frameAssets.length) {
      cues.push([Number(time.toFixed(3)), frameAssets[nextIndex % frameAssets.length]]);
      nextIndex += 1;
    }
    else time += event.seconds;
  }
  return { cues, duration: Number(time.toFixed(3)) };
}

const performance = {};
ids.forEach((id, index) => {
  if (id === "black") return;
  const target = project.targets[index + 1];
  const blocks = target.blocks;
  const costumes = Object.fromEntries(target.costumes.map(costume => [costume.name, costume.md5ext]));
  const frameAssets = target.costumes.filter(costume => /^anim\d*$/.test(costume.name)).map(costume => costume.md5ext);
  const candidates = [];
  Object.values(blocks).forEach((block, sourceOrder) => {
    if (block.opcode === "procedures_definition") {
      const sequence = buildCues(flatten(block.next, blocks, costumes), frameAssets);
      if (sequence.cues.length) candidates.push({ ...sequence, sourceOrder });
    }
    if (block.opcode === "control_if" || block.opcode === "control_if_else") {
      ["SUBSTACK", "SUBSTACK2"].forEach(inputName => {
        const sequence = buildCues(flatten(referencedBlock(block.inputs?.[inputName], blocks), blocks, costumes), frameAssets);
        if (sequence.cues.length) candidates.push({ ...sequence, sourceOrder });
      });
    }
  });
  const unique = [...new Map(candidates.map(item => [item.cues.map(cue => cue[1]).join("|"), item])).values()];
  const branches = unique.sort((a, b) => b.cues.length - a.cues.length).slice(0, 2).sort((a, b) => a.sourceOrder - b.sourceOrder);
  const half = id === "pinki" || id === "jevin" ? 9.6 : 4.8;
  const cues = [];
  branches.slice(0, 2).forEach((branch, branchIndex) => {
    branch.cues.forEach(([time, asset]) => cues.push([Number((time + branchIndex * half).toFixed(3)), asset]));
  });
  if (cues.length) performance[id] = { duration: half * 2, cues };
});

const output = `/* Generated from the original TurboWarp project.json. Do not hand-edit. */\n`+
  `(()=>{const data=${JSON.stringify(performance)};if(typeof module!=="undefined")module.exports=data;else window.SprunkiSourcePerformance=data;})();\n`;
fs.writeFileSync(path.join(root, "source-performance-data.js"), output);
console.log(`Wrote exact source animation cues for ${Object.keys(performance).length} characters.`);
