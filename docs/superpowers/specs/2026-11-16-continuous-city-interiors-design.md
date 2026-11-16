# Continuous city interiors and survival design

## Intent

Make the city behave like one physical place: ground-floor rooms are visible from the street, automatic doors open as the player approaches, and walking back through the doorway returns to the street without an exit button. Add varied building purposes, food and hunger, and warmer usable homes.

## Chosen approach

The ground floor of every city building stays at its real street coordinates. The upper tower begins above the lobby, while perimeter collision is built from short wall segments with a real gap at the entrance. Elevator travel may still load an upper-floor interior, but returning to floor one places the player in the real lobby. This replaces the previous automatic teleport to a hidden `250,250` room.

Alternative approaches considered were keeping the teleport and disguising it with animation, or constructing every floor simultaneously. The first would still violate the requested physical continuity; the second would be too expensive for a browser game. The selected hybrid gives a real street-level world and keeps upper floors practical.

## World content

- Building purposes include apartments, offices, hotel, shopping, and a ground-floor fast-food restaurant.
- Only one designated apartment tower contains the player's home; other homes belong to NPCs.
- Different tower styles use cylinders, stepped tops, twin wings, slanted crowns, and skybridges.
- Homes include wood floors, warm wall material, fabric furniture, bed, desk, computer, lamp, rug, shelf, plant, and window lighting.
- Texture sources are Poly Haven CC0 assets and are documented beside the files.

## Gameplay

- Hunger starts at 100 and drains while playing.
- At zero hunger, health drains; at zero health the player respawns in the original village.
- Eating at the restaurant costs coins and restores hunger and some health.
- A nearby bed is clickable/tappable; sleeping restores health and part of hunger with a short fade.

## Constraints

- Preserve the existing Three.js buildless architecture and GitHub Pages deployment.
- Keep mobile controls and existing save files compatible.
- Do not stage unrelated dirty-worktree files.
