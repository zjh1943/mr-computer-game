# Tablet controls and Friend Like You visual correction

**Goal:** Add bottom tablet receptors and independent two-player touch banks; correct Friend Like You characters, landscape and arrow scale.

**Requirements:** Automatic phone/tablet/desktop detection; preserve mouse desktop layout. Tablet uses two bottom banks. Same-screen two-player mode assigns left bank to player one and right bank to player two, with independent hold/release and scoring. No network rooms. Friend Like You scope confirmed by user: character appearance, background and arrow size.

**Implementation:** Extend existing touch controller with a touch-aware tablet breakpoint (769–1366px), separate left/right touch state and a duel camera that keeps both performers visible. Reuse existing rhythm/audio clock. Compare existing Friend assets with the source video; replace mismatching AI approximation assets with code-native faithful 2D shapes and a flat-color landscape, keep note and receptor sizes equal.

- [x] Test tablet detection and independent two-player holds.
- [x] Implement bottom banks, menu mode and automatic tablet layout.
- [x] Correct Friend character proportions/faces, flat landscape and receptor size using source references.
- [x] Verify tablet/desktop/mobile, both scores/hold release, and Friend scenes. Review before release.

## Verification

- Device breakpoint and independent simultaneous holds tested in Node.
- Local browser fixture verified at 1024×768: both banks at bottom, P1 and P2 scored independently.
- Friend day / Black solo / finale checked against saved source screenshots; five source companions retained.
- Mouse desktop at1024px retains top banks; phone390px retains four controls. Fixed inherited195px bank clamp and duplicate vertical translation affecting arrow sizes.
- Review identified tablet native/fallback fullscreen restoration; menu, results and exit now remain visible in both paths.
- Visual QA harness is unpublished and uses a fixed clock to inspect scenes; production continues using the original video/audio clock.
