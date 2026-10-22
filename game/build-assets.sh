#!/usr/bin/env bash
# Régénère les images du jeu à partir des fichiers pxl (art/*.px.js).
set -euo pipefail
cd "$(dirname "$0")/.."
PXL="node .claude/skills/pxl-pixel-art/bin/pxl.js"
TMP="$(mktemp -d)"
$PXL build art/kael.px.js --only kael_jeu --out "$TMP" --no-preview
$PXL build art/ruines.px.js --only ruines_sol,ruines_props --out "$TMP" --no-preview
cp "$TMP"/kael_jeu.png "$TMP"/kael_jeu.json "$TMP"/ruines_props.png "$TMP"/ruines_props.json game/assets/
cp "$TMP"/scenes/ruines_sol.png game/assets/
rm -rf "$TMP"
