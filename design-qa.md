# 我的节奏盒子世界 3D — Design QA

Date: 2026-09-19

## Source target

- User-provided Sprunki fan-character reference sheet for normal, non-horror front likeness.
- Approved design: `docs/superpowers/specs/2026-09-19-rhythm-world-3d-design.md`.
- Approved camera: third-person follow view behind the player.

## Captured implementation

- Desktop viewport: 1365 × 768, local `rhythm-world.html`.
- Automated path: cover → new world → onboarding → Gray selection → 3D town.
- Runtime canvas: 1341 × 642.
- WebGL fallback: hidden because WebGL initialized successfully.
- Runtime exceptions: none.

## Findings and resolution

### P1 — Three.js core module missing

Initial capture remained on the cover because `three.module.min.js` imports `three.core.min.js`, which was not vendored. Added the pinned core module and a regression assertion. Retest loaded every 3D module successfully.

### P1 — Spawn camera blocked by homes

The first town capture placed a house between the camera and player. Moved resident homes to two side streets, kept the central spawn corridor clear, increased camera height, and added a corridor regression test.

### P1 — Camera was facing the player

Initial movement orientation made the default camera sit in front of the player. Reversed camera-relative forward movement and initialized the player facing away from the camera. Final capture shows Gray's back in a proper third-person follow view.

### P2 — Direct NPC interaction

Raycast-tested the visible Vineria model. The click opened the dialogue panel with speaker `维内利亚`; no incorrect target or random reply appeared.

### P3 — Low-poly asset detail

The current models use rounded low-poly geometry with character-specific ears, hats, antennae, vines, visors, horns, screens, and plug hands. Further hand-painted texture polish can be added in later art iterations without changing the 3D architecture.

## Responsive checks

- Desktop controls: WASD/arrow keys, pointer-look, Space/direct click.
- Touch controls: left joystick, canvas pointer-look, direct tap, interaction button.
- Existing mobile breakpoint retains compact HUD, 110px joystick, and touch-safe interaction button.
- Static build contains local Three.js files and all 3D modules; no CDN dependency remains.

## Final result

final result: passed
