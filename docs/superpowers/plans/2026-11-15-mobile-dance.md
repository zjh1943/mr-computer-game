# Portrait dance controls

Requested behavior: fullscreen portrait background fills the viewport; a left/right camera pans to the performing side, duet framing shows both, actors stay front-facing and keep their size. Four large directional touch regions provide per-direction color, edge light, and a translucent center.

1. Add `dance-mobile.js`: four-direction model and isolated touch/pointer controller, fullscreen button with portrait fallback, synchronized input feedback and cleanup. Test input mapping and independent pointer release.
2. Integrate controller with the existing hit/release functions in `computer-apps.js`; keep the existing difficulty, vocal timing, and standby protection. Load the controller from `computer.html`.
3. Add scoped mobile CSS: viewport-cover stage, portrait controls, colored edge glow, stable actor size and phrase-based side panning. Keep desktop layout outside mobile mode.
4. Run input regression tests and existing rhythm tests. Inspect a 390×844 viewport, fullscreen coverage, four control targets and actor visibility; restore viewport and leave the game open.

User clarification: use the real four receptors in one bottom row. Divide the portrait playfield into four full-height touch columns, with translucent separators and colored lane feedback. Do not use a cross-shaped D-pad. Notes descend into the bottom receptors.

Final camera correction: characters remain in their fixed left/right positions at every turn. Animate only the full-size background horizontally; keep actors visible and front-facing. Publication target confirmed as the existing Vercel project serving zhumohan.com.

Clarified world camera: actors have fixed coordinates in a wide world shared with the background. Translate that single world layer for left/right/duet framing; do not independently translate actors or pin them to screen coordinates.
