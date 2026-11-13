import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRelationship, applyConversation, recordHelp, willHelp } from '../rhythm-world/social-memory.js';
import { migrateSave } from '../rhythm-world/save-migration.js';

const first = createRelationship();
assert.deepEqual(first, { trust: 0, helped: 0, ignored: 0, tone: 'neutral' });

const friendly = applyConversation(first, '你好，我们一起玩吧');
assert.equal(friendly.trust, 2);
assert.equal(friendly.tone, 'friendly');

const unkind = applyConversation(friendly, '你真讨厌');
assert.equal(unkind.trust, -1);
assert.equal(unkind.tone, 'cold');

const ignored = recordHelp(unkind, false);
assert.equal(ignored.ignored, 1);
assert.equal(willHelp(ignored), false);

const helped = recordHelp(createRelationship(), true);
assert.equal(willHelp(helped), true);

const migrated = migrateSave({ version: 2, player: { character: 'gray' }, inventory: {} }).save;
assert.deepEqual(migrated.relationships, {});
assert.equal(migrated.inventory.pickaxe, 1);

const html = fs.readFileSync(new URL('../rhythm-world.html', import.meta.url), 'utf8');
const app = fs.readFileSync(new URL('../rhythm-world.js', import.meta.url), 'utf8');
const town = fs.readFileSync(new URL('../rhythm-world/town-3d.js', import.meta.url), 'utf8');
assert.doesNotMatch(html, /id="interact"/);
assert.match(html, /id="hotbar"/);
assert.match(html, /data-item="pickaxe"/);
assert.match(app, /applyConversation/);
assert.match(app, /updateTalkPrompt/);
assert.match(town, /cityBuilding/);
assert.match(town, /villageMarker/);

console.log('Rhythm people-world relationship verification passed.');
