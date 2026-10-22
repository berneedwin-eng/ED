// Exemple pxl : palette, sprites symétriques, variantes, animation, scène et sprite sheet.
// Build :  node .claude/skills/pxl-pixel-art/bin/pxl.js build art/demo.px.js
// Viewer : node .claude/skills/pxl-pixel-art/bin/pxl.js serve art/demo.px.js
use("sweetie16")
pal({ k: 0, p: 1, r: 2, o: 3, y: 4, G: 5, g: 6, t: 7, n: 8, b: 9, B: 10, c: 11, w: 12, l: 13, s: 14, d: 15 })
ramps("ktgG", "kproy", "knbBc", "kdslw")   // du plus sombre au plus clair, utilisé par shade()/light()

// Symétrique : on dessine la moitié gauche, mx la reflète, outline ajoute le contour.
sprite("slime", { mx: true, outline: "k" }, `
  ....ggg
  ..ggGGg
  .ggGwGg
  .gggggg
  gggkwgg
  gggkkgg
  tgggggg
  .tttttt`)

// Variantes de couleur en une ligne chacune.
sprite("slime_rouge", { base: "slime", swap: { g: "r", G: "o", t: "p" } })
sprite("slime_bleu", { base: "slime", swap: { g: "b", G: "B", t: "n" } })

// Largeur impaire : mx: "c" partage la colonne centrale.
sprite("coeur", { mx: "c", outline: "k" }, `
  .rr.
  rwrr
  rrrr
  rrrr
  .rrr
  ..rr
  ...r`)

// Construit avec des primitives plutôt qu'une grille.
sprite("piece", { w: 10, h: 10 },
  circ(4, 4, 4, "o"), circ(4, 4, 3, "y"), vline(4, 2, 5, "o"), px(3, 2, "w"))

// Animation : chaque frame() est un patch sur le dessin commun ("_" efface).
anim("bougie", { outline: "k", fps: 5 }, `
  .y.
  yoy
  .o.
  www
  sws
  sws
  sws`,
  frame(), frame(grid(0, 0, "y_.\n_oy")), frame(grid(0, 0, "._y\nyo_")))

// Scène : des calques, des sprites posés, une ombre portée.
scene("prairie", { w: 96, h: 48, bg: "c" },
  layer("sol", { y: 34 }, rect(0, 0, 96, 14, "g"), rect(0, 0, 96, 2, "G"), hline(0, 13, 96, "t")),
  layer("ombres", { shade: true },
    ellipse(17, 35, 9, 1, "k"), ellipse(45, 35, 9, 1, "k"), ellipse(73, 35, 9, 1, "k")),
  layer("persos",
    stamp("slime", 9, 25), stamp("slime_rouge", 37, 25, { flip: "x" }), stamp("slime_bleu", 65, 25),
    stamp("coeur", 41, 12), stamp("bougie", 86, 25)))

sheet("objets", ["slime*", "coeur", "piece"], { cols: 3, pad: 1 })
