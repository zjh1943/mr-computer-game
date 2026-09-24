const assert = require('assert');
const fs = require('fs');

(async () => {
  const p = await import('../rhythm-world/performance-state.js');
  let state = p.createPerformanceState();
  state = p.setPerformer(state, 'gray', true, 'bass');
  const moving = p.getPerformerMotion(state, 'gray', 1.25);
  assert.equal(moving.performing, true);
  assert.notEqual(moving.bob, 0);
  assert.notEqual(moving.sway, 0);
  assert(moving.mouth >= 0 && moving.mouth <= 1);
  state = p.setPerformer(state, 'gray', false, 'bass');
  assert.equal(p.getPerformerMotion(state, 'gray', 2).performing, false);
  const app = fs.readFileSync('rhythm-world.js', 'utf8');
  const engine = fs.readFileSync('rhythm-world/engine.js', 'utf8');
  const npc = fs.readFileSync('rhythm-world/npc-3d.js', 'utf8');
  assert(app.includes('engine.setPlayerPerforming(true'));
  assert(app.includes('engine.setNpcPerforming(target.id,true'));
  assert(app.includes('engine.setNpcPerforming(thirdSinger,true'));
  assert(app.includes('engine.setNpcPerforming(candidate,true'));
  assert(engine.includes('setPlayerPerforming(active'));
  assert(npc.includes('setPerforming(id,active'));
  console.log('performance state verification passed');
})().catch(error => { console.error(error); process.exit(1); });
