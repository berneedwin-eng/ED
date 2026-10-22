// Rain (Final Fantasy Brave Exvius), version 64x64 : garde de combat, épée pointée vers l'adversaire.
// Lumière chaude venant de la gauche (côté adversaire).
// Build : node .claude/skills/pxl-pixel-art/bin/pxl.js build art/rain_hd.px.js
pal({
  k: "#1b1020",                                               // contour
  d: "#a8732a", y: "#e8b84a", Y: "#fbe08a", W: "#fff6d0",     // cheveux
  z: "#b8705a", s: "#e8a888", S: "#fcd8be",                   // peau
  E: "#3a1d10", e: "#7a4422", w: "#ffffff",                   // yeux bruns
  x: "#4a0f1c", R: "#8e1c2c", r: "#cc3038", o: "#f26a52",     // manteau rouge
  G: "#a8701e", g: "#e8b03c", j: "#fde58a",                   // or
  n: "#56607a", M: "#9aa6ba", m: "#d4dce8", l: "#ffffff",     // acier
  a: "#1e1a2e", A: "#2f2b46", q: "#463f63",                   // tissu sombre
  B: "#3e2418", b: "#6e4228", c: "#9a6238",                   // cuir
  p: "#ffd27a", P: "#ff9a4a",                                 // particules
  1: "#140c22", 2: "#24142e", 3: "#3e1c34", 4: "#6a2a34",     // ciel du décor
  5: "#1e1626", 6: "#30243a",                                 // sol du décor
})
ramps("kxRro", "kGgj", "nMml", "kaAq", "kBbc", "zsS", "dyYW", "Ee", "156")

// Tête de 3/4 tournée vers la gauche : mèches en pointes, sourcils froncés, yeux bruns.
sprite("_tete", `
  ........Y...W.......
  .......YY..WY...Y...
  ....W..YyY.YyY.Yy...
  ...WY.YyyYYyyYYyyd..
  ..WYYYyyyyyyyyyyyydd
  .WYyyyyyyyyyyyyyyyyd
  WYyyyYyyyyyyyyyyyddd
  .YyyYyyyyyyyyyydyddd
  YyyYyyydyyyyydyyyddd
  .YyYdyyyydyyydyydddd
  YyydSdyySdyyySdSsddd
  .ydSSSdSSSdySSSsSddd
  .dSEESSSSEEEESsSSddd
  ..SSkkSSSkkkSSsSzSdd
  ..SSwESSSweESSsSzdd.
  ..dSeESSSeEESssSzd..
  ..dSSSSSSSSSSssSd...
  ..ySSSSzzSSSssd.....
  ...ySSSSSSSssz......
  .....zsSSSsz........`)

// Gant refermé sur la poignée.
sprite("_gant", "bcb\nBbB\nBBB")

sprite("rain_hd", { w: 62, h: 62, outline: "k" },
  // Pans du manteau soulevés vers l'arrière : doublure sombre dessous, reflet chaud dessus.
  layer("manteau_arriere",
    poly([36, 20, 41, 22, 44, 30, 50, 36, 61, 40, 55, 42, 61, 48, 50, 47, 42, 42, 37, 34], "R"),
    poly([42, 30, 50, 36, 61, 40, 55, 42, 48, 40], "r"),
    line(44, 31, 59, 40, "o"), line(43, 36, 52, 41, "R"),
    poly([44, 42, 50, 47, 61, 48, 52, 45], "x"), line(46, 44, 58, 47, "R")),

  // Jambe arrière, tendue.
  layer("jambe_arriere",
    line(35, 37, 41, 46, "A", 5), line(35, 36, 40, 44, "q"),
    line(41, 46, 47, 55, "B", 5), line(40, 46, 46, 55, "b"), line(40, 47, 44, 53, "c"),
    hline(42, 50, 5, "G"),
    poly([42, 55, 50, 54, 53, 57, 53, 60, 41, 60], "B"), hline(42, 57, 10, "b"), hline(43, 56, 4, "c")),

  // Buste : tissu sombre, manteau ouvert à liseré doré, ceinture.
  layer("buste",
    poly([24, 19, 38, 19, 39, 34, 25, 35], "A"), vline(30, 21, 11, "q"), vline(31, 21, 11, "a"),
    poly([32, 18, 39, 20, 41, 36, 35, 37, 34, 26], "R"), line(36, 22, 38, 34, "x"),
    poly([22, 21, 28, 19, 29, 35, 25, 37, 23, 30], "r"), line(24, 23, 25, 33, "o"),
    vline(28, 20, 15, "j"), vline(33, 19, 17, "g"),
    rect(25, 32, 15, 2, "b"), hline(25, 33, 15, "B"), rect(30, 32, 2, 2, "g"), px(30, 32, "j"),
    rect(29, 17, 4, 3, "s"), hline(29, 19, 4, "z"),
    hline(28, 18, 1, "R"), hline(33, 18, 2, "R")),                        // col

  // Jambe avant fléchie, genouillère, pan avant du manteau.
  layer("jambe_avant",
    line(28, 36, 22, 45, "A", 5), line(27, 36, 21, 44, "q"),
    line(22, 45, 19, 55, "B", 5), line(21, 45, 18, 55, "b"), line(20, 47, 18, 53, "c"),
    hline(18, 50, 5, "G"),
    circ(22, 45, 2, "M"), px(21, 44, "l"), px(23, 46, "n"),
    poly([12, 60, 14, 56, 22, 55, 23, 60], "B"), hline(14, 57, 8, "b"), hline(14, 56, 3, "c"),
    poly([25, 34, 30, 35, 37, 44, 32, 47, 27, 41], "r"), line(27, 36, 33, 45, "o"),
    poly([30, 38, 37, 44, 32, 47], "R"), line(29, 35, 35, 43, "g")),

  layer("tete", stamp("_tete", 21, 0)),

  // Épaule arrière : le bras reste derrière le buste.
  layer("epaule_arriere",
    ellipse(38, 21, 3, 2, "M"), hline(36, 20, 3, "m"), hline(36, 23, 5, "n")),

  // Épée : longue lame pointée vers l'adversaire, garde et pommeau dorés.
  layer("epee",
    poly([15, 26, 19, 23, 9, 6, 7, 2, 5, 9], "M"),
    line(17, 24, 7, 4, "m"), line(16, 25, 6, 6, "l"),
    line(18, 26, 9, 8, "n"), line(16, 23, 9, 9, "n"),                   // gorge
    line(13, 28, 22, 22, "g", 2), px(22, 22, "j"), px(13, 28, "G"), px(17, 25, "r"),
    line(18, 28, 23, 35, "B", 2), circ(24, 36, 1, "g"), px(23, 35, "j")),

  // Bras avant : épaulière à plaques, brassard, gants sur la poignée.
  layer("bras_avant",
    line(25, 23, 25, 28, "r", 4),
    line(25, 28, 20, 27, "m"), line(25, 29, 20, 28, "M"), line(25, 30, 21, 29, "n"),
    ellipse(24, 22, 4, 3, "M"), ellipse(23, 21, 3, 2, "m"), px(21, 20, "l"), px(22, 20, "l"),
    hline(21, 25, 7, "n"), hline(21, 24, 7, "g"), px(21, 24, "j"),
    ellipse(25, 26, 2, 1, "M"), hline(24, 25, 2, "m"),                   // seconde plaque
    vline(21, 27, 3, "g"), px(21, 27, "j"),                             // manchette dorée
    stamp("_gant", 18, 27)),
)

// Version avec décor : crépuscule sombre et discret, ruines, particules lumineuses.
scene("rain_hd_scene", { w: 64, h: 64, bg: "1" },
  layer("ciel", grad(0, 0, 64, 52, "1234", "v", 0.6)),
  layer("ruines",
    rect(1, 20, 6, 32, "2"), rect(2, 17, 4, 3, "2"), hline(1, 31, 6, "1"),
    rect(56, 26, 6, 26, "2"), rect(57, 23, 3, 3, "2"), hline(56, 38, 6, "1")),
  layer("sol", rect(0, 52, 64, 12, "5"), hline(0, 52, 64, "6"),
    hline(0, 56, 9, "6"), hline(14, 58, 12, "6"), hline(40, 57, 14, "6")),
  layer("ombre", { shade: true }, ellipse(32, 61, 22, 2, "k")),
  layer("perso", stamp("rain_hd", 0, 0)),
  layer("particules",
    px(4, 8, "p"), px(10, 40, "P"), px(58, 12, "p"), px(50, 20, "P"), px(44, 6, "p"),
    px(6, 30, "p"), px(60, 32, "p"), px(14, 48, "P"), px(54, 46, "p")),
  glow("pP", { r: 2, strength: 0.5, bands: 2 }))
