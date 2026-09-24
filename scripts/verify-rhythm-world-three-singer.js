import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createChorusState, chooseJoinCandidate, applyJoinDecision } from '../rhythm-world/chorus-invite.js';

let chorus = createChorusState('clukr');
assert.deepEqual(chorus, { members: ['clukr'], invited: null, declined: [] });
assert.equal(chooseJoinCandidate(['clukr', 'oren', 'pinki'], chorus), 'oren');
chorus = { ...chorus, invited: 'oren' };
let result = applyJoinDecision(chorus, 'decline');
assert.equal(result.leaveId, 'oren');
assert.deepEqual(result.state.declined, ['oren']);
assert.equal(chooseJoinCandidate(['clukr', 'oren', 'pinki'], result.state), 'pinki');
result = applyJoinDecision({ ...result.state, invited: 'pinki' }, 'accept');
assert.deepEqual(result.state.members, ['clukr', 'pinki']);
assert.equal(result.joinId, 'pinki');
assert.equal(chooseJoinCandidate(['raddy'], result.state), null, 'player plus two NPC singers is the three-voice maximum');

const page = fs.readFileSync('rhythm-world.html', 'utf8');
const app = fs.readFileSync('rhythm-world.js', 'utf8');
const npc = fs.readFileSync('rhythm-world/npc-3d.js', 'utf8');
assert.ok(page.includes('id="chorusInvite"') && page.includes('chorus-accept') && page.includes('chorus-decline'));
assert.ok(app.includes('requestThirdSinger') && app.includes('acceptChorusInvite') && app.includes('declineChorusInvite'));
assert.ok(app.includes("audio.startCharacterLoop('duet-third',thirdSinger)"), 'accepted singer needs a dedicated third audible layer');
assert.ok(app.includes("engine.setNpcPerforming(thirdSinger,true"), 'third singer needs beat-driven mouth and body animation');
assert.ok(npc.includes("chorusRole === 'approaching'") && npc.includes("chorusRole === 'leaving'"), 'guest must approach or leave based on the answer');

console.log('Third-singer invitation, accept/decline, departure, and three-layer chorus verified.');
