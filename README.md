# ED

## Pixel art avec pxl

Le skill [claude-pxl](https://github.com/crsolver/claude-pxl) (MIT) est installé dans `.claude/skills/pxl-pixel-art/`.
Claude Code le charge automatiquement dans ce projet : il suffit de lui demander de dessiner un sprite.

Exemple : `art/demo.px.js` (sprites, variantes, animation, scène, sprite sheet). Nécessite Node ≥ 22.18.

```bash
node .claude/skills/pxl-pixel-art/bin/pxl.js build art/demo.px.js   # génère art/out/
node .claude/skills/pxl-pixel-art/bin/pxl.js serve art/demo.px.js   # viewer live sur http://127.0.0.1:4321/
node .claude/skills/pxl-pixel-art/bin/pxl.js ascii art/demo.px.js slime
```
