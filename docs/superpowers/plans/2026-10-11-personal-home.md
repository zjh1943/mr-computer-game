# Personal home implementation plan

Goal: A lightweight pixel-art portfolio for 朱墨涵 at zhumohan.com with independent /games/... paths.
Architecture: One Git-integrated Vercel project, separate generated HTML game entries, root base URLs for nested assets. Homepage only loads its own CSS, registry and presentation JS, vector decorations and optimized images. Game engines and audio load after entering a game; no bulk offline prefetch.

- [x] Preserve Mr Computer in computer.html and add independent game entry documents.
- [x] Responsive personal home, automatic age, six hobbies, game cards and app-store explanation.
- [x] Transparent pixel portrait from supplied photo; preserve uniform and red scarf; remove food and cafeteria.
- [x] Explicit game registry, path rewrites, static build and app-store destinations.
- [x] Verify age boundaries, output paths, resource isolation and representative game behavior.
- [ ] Publish through existing Git integration and verify live pages.

Names: Mr Computer / 电脑先生; Sprunki World / 节奏盒子世界. Links open new tabs with noopener. No invented school or friends. No homepage iframe, engine, audio preload or game prefetch. Motion honors reduced-motion. Age uses Shanghai calendar.
