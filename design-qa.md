# 我的节奏盒子世界：2D角色 × 3D小镇 — Design QA

Date: 2026-09-19

## Source target

- User-provided 4 × 5 Sprunki character sheet for exact normal, non-horror front appearances.
- Approved design: `docs/superpowers/specs/2026-09-19-rhythm-world-3d-design.md`.
- Approved camera: third-person follow view behind the player.

## Captured implementation

- Desktop viewport: 1365 × 768, local `rhythm-world.html`.
- Verified path: cover → continue game → Gray in the 3D town.
- Runtime canvas: 1341 × 642.
- WebGL fallback: hidden because WebGL initialized successfully.
- Runtime exceptions: none.

## Findings and resolution

### P1 — Three.js core module missing

Initial capture remained on the cover because `three.module.min.js` imports `three.core.min.js`, which was not vendored. Added the pinned core module and a regression assertion. Retest loaded every 3D module successfully.

### P1 — Spawn camera blocked by homes

The first town capture placed a house between the camera and player. Moved resident homes to two side streets, kept the central spawn corridor clear, increased camera height, and added a corridor regression test.

### P1 — 3D geometry characters contradicted the reference

The previous build recreated the cast as rounded 3D geometry. The selected target requires flat front-facing characters inside a 3D environment. The reference sheet is now split into 20 transparent PNG sprites, including Mr Tree and Mr Fun Computer. Three.js sprites keep every character's supplied front view facing the camera while houses, roads, trees, lighting, and camera movement remain 3D.

### P1 — NPCs absent from the visible town

NPCs previously wandered only near homes about 18–30 world units from spawn. Eight residents now start along the center street and the other residents remain near their homes. Browser capture visibly showed Mr Fun Computer among the homes. Proximity state starts each resident's own dialogue once when the player approaches, while direct clicking and the interaction button remain available.

### P1 — Camera vertical movement too restricted

The old pitch clamp allowed only a narrow downward view. The range now supports looking well above and below the player. A real pointer drag changed the captured view from a steep ground view to a forward town view, revealing buildings, trees, sky, and Mr Fun Computer.

### P3 — Source image compression

The supplied sheet is JPEG-compressed, so some characters retain a subtle light sticker edge after background removal. Their shapes, faces, accessories, and colors remain sourced directly from the supplied art instead of being redrawn.

### P1 — Equal-height slicing cropped Gray and erased white details

The source rows are not equally tall. The old equal-height crop ended Gray's cell before the bottom of the body, while global white removal also treated eye whites as background. Front views now use measured row boundaries and edge-connected background removal, keeping complete bodies and enclosed white details. Browser capture confirms Gray's full ears, eyes, head, and torso.

### P1 — Flat front-only duplicates

Image generation produced matching side and back sprite sheets, then a deterministic splitter created 60 unique front/side/back assets. Runtime direction selection now shows the player from behind, side-facing walkers in profile, and characters facing the camera from the front. The verified town capture displays all three directions simultaneously without duplicate character IDs.

### P1 — Dialogue interrupted the world view

NPC speech now uses a temporary head bubble and character-specific browser text-to-speech profile. The speaking face cycles through triangle, line, quadrilateral, and square mouth shapes, with animated gaze highlights. The world view offers `回答` and `不回答`; only `回答` opens the keyboard/voice response dialog. No `正在说话` heading remains.

### P1 — Corrected four-direction cast and sky characters

Characters now use normalized front, left, right, and back sprites. Garnold keeps the gold visor identity on both sides; Mr. Fun Computer uses white eyes, while Mr. Sun and Mr. Tree use solid black eyes. Mr. Tree remains a named resident with a home and solid collision instead of being confused with decorative trees. The day/night loop lasts 12 minutes, and camera-attached celestial staging keeps the gently swaying Mr. Sun visible in the sky. The music stage uses an original 108 BPM arrangement with beat, piano, vocal, electronic, and whistle parts.

## Responsive checks

- Desktop controls: WASD/arrow keys, click-drag pointer-look in every direction, Space/direct click.
- Touch controls: left joystick, canvas pointer-look, direct tap, interaction button.
- Existing mobile breakpoint retains compact HUD, 110px joystick, and touch-safe interaction button.
- Static build contains local Three.js files and all 3D modules; no CDN dependency remains.

## Final result

final result: passed
