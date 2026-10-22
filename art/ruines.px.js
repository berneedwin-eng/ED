// Ruines d'Ambre : cour de château en ruine, vue de dessus 3/4, pour le jeu (game/).
// Sol : une grande scène 640x416. Décors hauts : sprites séparés, triés par profondeur dans le jeu.
// Build : node .claude/skills/pxl-pixel-art/bin/pxl.js build art/ruines.px.js
pal({
  k: "#16121c",                                                            // contour
  1: "#25212b", 2: "#38333f", 3: "#524b59", 4: "#716877", 5: "#958b98", 6: "#b8aeb6",  // pierre
  G: "#26381f", g: "#3a5228", h: "#58743a", H: "#82a04a",                  // mousse, herbe
  d: "#3e2f24", D: "#5e4634", E: "#7a5c42",                                // terre
  r: "#7a2e1c", o: "#c25a26", O: "#e8904a", Y: "#f6c36a",                  // feuilles d'automne
  b: "#2e221c", B: "#4e3a2c", n: "#6e5440",                                // écorce
  i: "#24232c", I: "#43434f", j: "#6a6a78",                                // fer
  f: "#e0501e", F: "#ff9a2a", w: "#ffe08a", W: "#fff8dc",                  // feu
  u: "#4fd2f4", U: "#c8f6ff",                                              // runes
  c: "#7a3e2a", C: "#a85c3c", e: "#d08a5a",                                // terre cuite
  t: "#5a2028", T: "#8e3038",                                              // bannière
})
ramps("k123456", "GghH", "dDE", "roOY", "bBn", "iIj", "fFwW", "uU", "cCe", "tT")

// Petit générateur pseudo-aléatoire reproductible.
function alea(seed) {
  let s = seed >>> 0
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296)
}

// Brosses : touffes d'herbe, feuilles mortes, éclats de pierre.
sprite("_touffe_a", ".h.\nhgh")
sprite("_touffe_b", "H.h\nghg")
sprite("_touffe_c", "..H.\n.hgh\nhgg.")
sprite("_feuille_a", "oO")
sprite("_feuille_b", "r\no")
sprite("_feuille_c", "O.\n.o")
sprite("_eclat", "4\n2")

// --- Sol ---------------------------------------------------------------------------

const W = 640, H = 416, NORD = 84, SUD = 396

// Dalles irrégulières en rangées décalées, chacune de teinte légèrement différente.
function dalles(c) {
  const rnd = alea(7)
  for (let y = NORD - 4, row = 0; y < SUD; y += 12, row++) {
    let x = row % 2 ? -10 : -2
    while (x < W) {
      const w = 14 + Math.floor(rnd() * 10)
      const tone = rnd() < 0.18 ? "4" : rnd() < 0.5 ? "3" : "3"
      c.rect(x, y, w, 12, tone)
      c.hline(x + 1, y + 1, w - 2, rnd() < 0.3 ? "5" : "4")          // arête éclairée
      c.hline(x, y + 11, w, "2"), c.vline(x + w - 1, y, 12, "2")     // joints
      if (rnd() < 0.08) c.line(x + 3, y + 3, x + 3 + Math.floor(rnd() * 6), y + 9, "2")   // fissure
      x += w
    }
  }
}

// Rosace runique au centre de la cour.
function rosace(c, cx, cy) {
  c.ellipse(cx, cy, 70, 46, "2"), c.ellipse(cx, cy, 68, 44, "4"), c.ellipse(cx, cy, 64, 41, "3")
  for (let k = 0; k < 24; k++) {                                       // pavés rayonnants
    const a = (k / 24) * Math.PI * 2
    c.line(cx + Math.round(Math.cos(a) * 30), cy + Math.round(Math.sin(a) * 20),
           cx + Math.round(Math.cos(a) * 63), cy + Math.round(Math.sin(a) * 40), "2")
  }
  c.ellipse(cx, cy, 52, 33, "2", true)
  c.ellipse(cx, cy, 30, 19, "4"), c.ellipse(cx, cy, 28, 18, "5"), c.ellipse(cx, cy, 24, 15, "4")
  for (let k = 0; k < 40; k++) {                                       // anneau de runes
    if (k % 5 === 4) continue
    const a = (k / 40) * Math.PI * 2
    c.px(cx + Math.round(Math.cos(a) * 46), cy + Math.round(Math.sin(a) * 29.5), k % 3 ? "u" : "U")
  }
  c.ellipse(cx, cy, 10, 6, "u", true), c.px(cx, cy, "U"), c.hline(cx - 3, cy, 7, "u")
  c.line(cx + 12, cy - 30, cx + 30, cy - 14, "2"), c.line(cx + 30, cy - 14, cx + 34, cy - 6, "2")  // grande fissure
}

// Mur nord : face de briques en assises décalées, arche effondrée au centre.
function murNord(c) {
  c.rect(0, 0, W, 16, "4"), c.hline(0, 0, W, "5"), c.hline(0, 15, W, "2")
  for (let x = 0; x < W; x += 20) c.vline(x, 1, 14, "3")
  c.rect(0, 16, W, NORD - 16, "3")
  for (let y = 16, row = 0; y < NORD; y += 8, row++) {
    c.hline(0, y + 7, W, "2")
    for (let x = row % 2 ? 8 : 0; x < W; x += 16) c.vline(x, y, 8, "2"), c.hline(x + 1, y, 14, "4")
  }
  c.rect(0, NORD - 10, W, 10, "2"), c.hline(0, NORD - 10, W, "3")      // soubassement
  for (const x of [40, 132, 212, 420, 506, 590]) {                     // coulures sous le chaperon
    c.vline(x, 16, 18, "2"), c.vline(x + 1, 16, 10, "2")
  }
  // Arche effondrée : passage sombre vers l'extérieur.
  const ax = 320, ay = 44
  for (let k = 0; k <= 12; k++) {                                       // claveaux autour de l'arc
    const a = Math.PI + (k / 12) * Math.PI
    c.line(ax + Math.round(Math.cos(a) * 24), ay + Math.round(Math.sin(a) * 22),
           ax + Math.round(Math.cos(a) * 31), ay + Math.round(Math.sin(a) * 29), k % 2 ? "4" : "5", 3)
  }
  c.rect(ax - 31, ay, 7, NORD - ay, "4"), c.vline(ax - 31, ay, NORD - ay, "5")   // piédroits
  c.rect(ax + 24, ay, 7, NORD - ay, "3"), c.vline(ax + 30, ay, NORD - ay, "2")
  for (let y = ay + 6; y < NORD; y += 8) c.hline(ax - 31, y, 7, "2"), c.hline(ax + 24, y, 7, "2")
  c.ellipse(ax, ay, 23, 21, "1"), c.rect(ax - 23, ay, 47, NORD - ay, "1")
  c.grad(ax - 23, ay + 8, 47, NORD - ay - 8, "12", "v", 0.6)          // le passage s'éclaircit vers la cour
  c.rect(ax + 10, 0, 18, 6, "2"), c.hline(ax + 10, 6, 18, "1")          // pierres manquantes du chaperon
  // Bannières déchirées.
  for (const bx of [196, 444]) {
    c.rect(bx, 20, 16, 34, "T"), c.vline(bx, 20, 34, "t"), c.vline(bx + 15, 20, 34, "t")
    c.poly([bx, 54, bx + 5, 60, bx + 8, 54, bx + 12, 62, bx + 16, 54], "T")
    c.rect(bx + 5, 30, 6, 6, "Y"), c.rect(bx + 6, 31, 4, 4, "o")
    c.hline(bx - 2, 19, 20, "j")
  }
  // Lierre qui pend du chaperon.
  const rnd = alea(3)
  for (const lx of [18, 74, 150, 252, 372, 470, 548, 610]) {
    const len = 14 + Math.floor(rnd() * 34)
    for (let y = 14; y < 14 + len; y++) {
      const x = lx + Math.round(Math.sin(y * 0.4 + lx) * 2)
      c.px(x, y, y % 3 ? "g" : "h"), y % 4 === 0 && c.px(x + 1, y, "G")
    }
  }
}

// Murets latéraux et muret sud.
function murets(c) {
  for (const x0 of [0, W - 24]) {
    c.rect(x0, NORD, 24, SUD - NORD, "4")
    for (let y = NORD; y < SUD; y += 10) c.hline(x0, y, 24, "3"), c.vline(x0 + (y % 20 ? 8 : 16), y, 10, "3")
    c.vline(x0 === 0 ? 23 : x0, NORD, SUD - NORD, "2")
  }
  c.rect(0, SUD, W, H - SUD, "3"), c.hline(0, SUD, W, "5"), c.hline(0, SUD + 1, W, "4")
  for (let x = 0; x < W; x += 16) c.vline(x, SUD + 2, H - SUD - 2, "2")
  c.hline(0, SUD + 10, W, "2")
}

scene("ruines_sol", { w: W, h: H, bg: "2" },
  layer("dalles", dalles),
  layer("terre", (c) => {                                             // dalles arrachées, terre à nu
    for (const [x, y, rx, ry] of [[118, 330, 22, 9], [520, 312, 18, 8], [96, 150, 14, 6], [430, 360, 26, 10]]) {
      c.ellipse(x, y, rx, ry, "d"), c.ellipse(x - 3, y - 2, rx - 5, ry - 3, "D")
      c.noise(x - rx, y - ry, rx * 2, ry * 2, "E", 0.15, x, "D")
    }
  }),
  layer("rosace", (c) => rosace(c, 320, 250)),
  layer("mousse",
    scatter("_touffe_*", 28, NORD, 584, 18, 70, { rflip: "x" }),
    scatter("_touffe_*", 28, NORD, 20, SUD - NORD, 40, { rflip: "x" }),
    scatter("_touffe_*", W - 48, NORD, 20, SUD - NORD, 40, { rflip: "x" }),
    scatter("_touffe_*", 28, SUD - 24, 584, 20, 50, { rflip: "x" }),
    scatter("_touffe_*", 40, 100, 560, 280, 60, { on: "2", rflip: "x" })),
  layer("feuilles",
    scatter("_feuille_*", 470, 120, 120, 90, 70, { rflip: "xy" }),
    scatter("_feuille_*", 60, 120, 600, 260, 40, { rflip: "xy" }),
    scatter("_eclat", 60, 100, 540, 280, 30)),
  layer("murs", murNord, murets),
  glow("uU", { r: 3, strength: 0.5 }))

// --- Décors hauts (ancrés en bas au centre dans le jeu) ----------------------------

sprite("pilier", { w: 22, h: 72, outline: "k" },
  rect(0, 64, 22, 8, "3"), hline(0, 64, 22, "5"), hline(0, 65, 22, "4"), hline(0, 71, 22, "2"),
  rect(3, 10, 16, 54, "4"),
  vline(3, 10, 54, "5"), vline(4, 10, 54, "5"), vline(8, 10, 54, "3"), vline(12, 10, 54, "3"),
  vline(15, 10, 54, "2"), vline(16, 10, 54, "3"), vline(18, 10, 54, "2"),
  rect(0, 0, 22, 10, "4"), hline(0, 0, 22, "6"), hline(0, 1, 22, "5"), hline(0, 9, 22, "2"),
  rect(1, 4, 20, 2, "3"),
  line(9, 22, 12, 34, "2"), line(12, 34, 10, 40, "2"),                          // fissure
  scatter("_touffe_*", 0, 58, 22, 8, 4))

sprite("pilier_brise", { w: 22, h: 42, outline: "k" },
  rect(0, 34, 22, 8, "3"), hline(0, 34, 22, "5"), hline(0, 35, 22, "4"), hline(0, 41, 22, "2"),
  poly([3, 34, 3, 6, 7, 2, 10, 8, 14, 0, 19, 7, 19, 34], "4"),
  vline(3, 6, 28, "5"), vline(4, 5, 29, "5"), vline(8, 8, 26, "3"), vline(12, 6, 28, "3"),
  vline(15, 6, 28, "2"), vline(18, 8, 26, "2"),
  line(7, 2, 10, 8, "6"), line(10, 8, 14, 0, "6"),                             // cassure claire
  scatter("_touffe_*", 0, 30, 22, 8, 4))

sprite("gravats", { w: 28, h: 14, outline: "k" },
  poly([0, 14, 3, 6, 10, 4, 13, 9, 13, 14], "3"), line(3, 7, 9, 5, "5"),
  poly([10, 14, 13, 5, 20, 3, 24, 8, 24, 14], "4"), line(13, 6, 19, 4, "6"),
  poly([20, 14, 23, 9, 28, 10, 28, 14], "3"), px(24, 10, "5"),
  hline(0, 13, 28, "2"), px(16, 9, "h"), px(17, 10, "g"))

sprite("jarre", { w: 12, h: 16, outline: "k" },
  rect(3, 0, 6, 2, "C"), hline(3, 0, 6, "e"),
  rect(4, 2, 4, 2, "c"),
  ellipse(6, 9, 6, 6, "C"), ellipse(5, 8, 3, 4, "e"), px(3, 6, "Y"),
  clip([0, 11, 12, 6], ellipse(6, 9, 6, 6, "c")),
  hline(1, 9, 10, "c"), px(1, 9, "C"))

sprite("jarre_brisee", { w: 16, h: 8, outline: "k" },
  poly([0, 8, 2, 3, 6, 2, 7, 8], "C"), px(2, 4, "e"),
  poly([7, 8, 9, 4, 13, 5, 12, 8], "c"), px(10, 5, "C"),
  px(14, 6, "C"), px(5, 1, "c"))

// Arbre d'automne : tronc noueux, houppier en grappes, feuilles qui tombent.
sprite("arbre", { w: 66, h: 84, outline: "k" },
  layer("tronc",
    poly([28, 84, 30, 52, 26, 40, 31, 40, 34, 50, 38, 40, 42, 40, 37, 56, 39, 84], "B"),
    poly([24, 84, 28, 78, 30, 84], "B"), poly([38, 84, 41, 78, 44, 84], "B"),
    line(31, 82, 32, 54, "n"), line(35, 80, 36, 60, "b"), line(33, 70, 34, 64, "b")),
  layer("houppier", (c) => {
    const rnd = alea(11)
    const amas = [[33, 22, 18], [16, 30, 13], [50, 30, 13], [24, 14, 12], [44, 13, 12], [33, 34, 12]]
    for (const [x, y, r] of amas) c.circ(x, y, r, "r")
    for (const [x, y, r] of amas) c.circ(x - 2, y - 2, r - 3, "o")
    for (const [x, y, r] of amas) c.circ(x - 4, y - 4, Math.max(2, r - 8), "O")
    for (let k = 0; k < 40; k++) c.px(4 + Math.floor(rnd() * 58), 2 + Math.floor(rnd() * 42), rnd() < 0.5 ? "Y" : "r")
  }),
  layer("ombre_interne", { shade: true }, ellipse(36, 40, 22, 6, "k")))

// Brasero : trépied de fer, flammes animées.
anim("brasero", { w: 18, h: 30, frames: 6, fps: 10, outline: "k" }, (c) => {
  const f = c.frame, k = c.phase * Math.PI * 2
  c.line(4, 29, 7, 18, "i"), c.line(14, 29, 11, 18, "i"), c.line(9, 29, 9, 18, "I")
  c.hline(5, 24, 9, "I")
  c.rect(2, 14, 14, 4, "I"), c.hline(2, 14, 14, "j"), c.hline(3, 18, 12, "i")
  c.rect(4, 12, 10, 2, "f")
  const h1 = 10 + Math.round(Math.sin(k) * 2), h2 = 8 + Math.round(Math.sin(k + 2) * 2)
  c.poly([3, 13, 7, 13 - h1, 9, 6, 11, 13 - h2, 15, 13], "f")
  c.poly([5, 13, 8, 15 - h1, 10, 13 - h2 + 2, 13, 13], "F")
  c.poly([7, 13, 9, 17 - h1, 11, 13], "w")
  c.px(8 + (f % 3) - 1, 1 + (f % 2), "F"), c.px(10 - (f % 2), 3 - (f % 2), "w")
})

sheet("ruines_props", ["pilier", "pilier_brise", "gravats", "jarre", "jarre_brisee", "arbre", "brasero"], { pad: 1 })
