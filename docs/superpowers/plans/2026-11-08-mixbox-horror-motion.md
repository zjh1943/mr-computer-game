# Mixbox Horror Motion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task by task.

## File structure

- `computer-apps.js`: 在音乐站内维护恐怖状态、Pyramixed 动作序列和素材刷新。
- `computer-apps.css`: 为动作姿势、恐怖舞台、恐怖角色栏提供样式。
- `scripts/verify-mixbox-horror-motion.js`: 静态回归检查。

## Global constraints

- 使用已有本地四方向 SVG/WAV；不增加外网依赖。
- 主页 `terror-night` 是唯一的恐怖开关来源。

## Review focus

- 开启恐怖之夜后，舞台与底部角色栏都必须同步更新。
- 关闭恐怖之夜后，角色必须还原当前版本的正常外观。
- 切换版本后，恐怖状态仍必须保留。
- 清空或关闭音乐站应停止动作计时器和 DOM 观察器。

### Task 1: Add a failing feature check

**Files:** Create `scripts/verify-mixbox-horror-motion.js`

- [ ] Write assertions for the horror observer, version-aware horror classes, and multi-pose Pyramixed sequence.
- [ ] Run `node scripts/verify-mixbox-horror-motion.js` and confirm it fails before implementation.

### Task 2: Connect the station to terror night

**Files:** Modify `computer-apps.js`, `computer-apps.css`

- [ ] Add a `terror-night` observer that refreshes stage and tray without resetting the lineup.
- [ ] Drive Pyramixed through front, left, right and back action poses; label active pose on the slot.
- [ ] Add distinct original/Pyramixed horror styling and immediate return to normal when horror is disabled.
- [ ] Run the feature check and existing Mixbox version check.

### Task 3: Verify and publish

- [ ] Parse the changed scripts, inspect the exact diff, then commit and push only the feature files.
