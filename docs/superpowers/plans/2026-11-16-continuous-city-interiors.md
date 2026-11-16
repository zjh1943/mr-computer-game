# Continuous City Interiors Implementation Plan

## Files

- Create `rhythm-world/survival.js` for hunger, eating, sleeping, and death rules.
- Create `rhythm-world/building-colliders.js` for doorway-aware perimeter collisions.
- Modify `rhythm-world/city-layout.js` to assign diverse building purposes.
- Modify `rhythm-world/building-life.js` so only one building owns the player home.
- Modify `rhythm-world/town-3d.js` for real-coordinate lobbies, automatic doors, restaurant, beds, furnishings, texture materials, elevator return, and varied silhouettes.
- Modify `rhythm-world/engine.js` to remove automatic ground-floor teleport and advance survival state.
- Modify `rhythm-world.js` and `rhythm-world.html` for hunger HUD, eating, and sleeping.
- Add focused verification scripts and CC0 texture files.

## Tasks

1. Write failing tests for doorway-aware colliders and ground-floor continuity.
2. Implement wall-segment colliders and remove automatic lobby teleport.
3. Write failing tests for hunger, starvation damage, eating, sleeping, and death.
4. Implement survival rules and connect them to engine state and HUD.
5. Write failing structural tests for building purposes, restaurant, usable beds, warm furniture, automatic doors, and varied silhouettes.
6. Implement the city and interior content using documented CC0 materials.
7. Run focused tests, existing rhythm-world regression checks, syntax checks, and browser QA.
8. Commit only scoped files and push `main` to GitHub.
