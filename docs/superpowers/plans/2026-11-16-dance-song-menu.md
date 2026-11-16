# Dance song selection implementation plan

**Goal:** Expand verified Sprunki FNF choices and add an image entry followed by up/down song selection.

**Architecture:** Keep the existing rhythm engine and its mobile/desktop split. A separate menu controller owns entry, selection and return; source imports retain absolute converted-chart columns, voice stems, actual character atlases and section cameras.

**Tech stack:** Browser JavaScript, CSS, Node tests, existing allowlisted ZIP data importer.

## User specification

- Search YouTube gameplay first; inspect songs, directional poses and entrances together.
- Add available verified games; no arbitrary arrows pasted over unrelated audio.
- Click a central image to enter, select up/down and confirm to play.
- User supplied three references: original title idle, story-menu structure and the first preview. Use the original matching title animation assets and their third picture.
- Retain easy scoring, standby protection and automatic mobile width detection.

## Tasks

- [x] Import Rainbrawl normal performance with actual character changes. Omit the horror finale starting at 228 seconds; schedule all stems to finish together at that boundary.
- [x] Add menu state tests for up/down wrap, confirm, escape, input fields and return. Implement image entry plus accessible touch buttons and song list.
- [x] Verify new source charts, all referenced art/audio files, menu navigation and mobile/desktop layouts; run existing rhythm regression suite.
- [x] Open the local game for review. User canceled the accidental 16:9 instruction and later canceled newly proposed multiplayer modes. Include solo, practice and watch; real text glows on entry, background menu music, count-in and score return.

## Research evidence

- https://www.youtube.com/watch?v=Rl0rrnO-5uQ — Speedz, Sprunkin'; author links https://gamebanana.com/mods/548826.
- https://www.youtube.com/watch?v=-EKwJC2lmdc&t=269s — Rainbrawl chapter at 4:29; Sprunki bank on the right, Abgerny on the left. Source https://gamejolt.com/games/yetanothersprunkifnfmod/982253.
- https://www.youtube.com/watch?v=REDZx8dvL9E — Fun Time gameplay candidate, not yet integrated or fully verified.

## Constraints and review focus

- Converted charts route columns 0–3 to player; mustHitSection selects the camera.
- Rainbrawl events are in a separate events.json; ignoring it would assign every phrase to the opening characters.
- Never run scripts from the source ZIP.
- Song navigation must not consume rhythm input during play or typing in an input/select.
- Preserve other tasks' dirty files; no blanket staging or publishing unrelated work.

## Verification and rulings

- User supplied the title/story/preview references and canceled the accidental 16:9 request. Layout fills the current viewport with responsive mobile controls.
- User canceled new multiplayer/network modes; those implementations and dependencies were removed.
- Pico-only Rainbrawl was removed because it contains no Sprunki performers. Original mix remains available in the legacy library but is excluded from the new song selector because it needs mixer controls.
- Imported the actual normal Rainbrawl stage, animated divider/crowds and all 58 characters’ health-icon strips after direct video comparison. Authored playable note directions no longer receive an extra left/right swap.
- Reviewer findings addressed: result keyboard return, score page on Escape, visible audio recovery controls. Full rhythm tests and atlas/source-chart checks run before completion.
