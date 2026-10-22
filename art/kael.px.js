// Kael : chevalier original, sprite de combat 64x64 par frame (attente + attaque).
// Lumière venant de la gauche (côté adversaire).
// Build : node .claude/skills/pxl-pixel-art/bin/pxl.js build art/kael.px.js
pal({
  k: "#141024",                                               // contour
  h: "#1c2340", H: "#2f3d6b", I: "#6f88c4",                   // cheveux bleu nuit
  z: "#b8705a", s: "#e8a888", S: "#fcd8be",                   // peau
  V: "#173d26", v: "#3f9a5e", w: "#ffffff",                   // yeux verts
  n: "#141a33", N: "#22305c", o: "#34508c", O: "#5a7cc0",     // manteau bleu marine
  t: "#56607a", T: "#9aa6ba", m: "#d4dce8", l: "#ffffff",     // acier
  G: "#7a4a1e", g: "#b8782e", j: "#e8b05a",                   // bronze
  f: "#8a3a10", F: "#d0661c", y: "#ffa040",                   // écharpe ambre
  a: "#1e1a26", A: "#322c3e", L: "#4c4560",                   // tissu sombre
  B: "#2e1e18", b: "#55382a", c: "#7e5640",                   // cuir
  u: "#5fe0ff", U: "#e0faff",                                 // rune et traînée
})
ramps("knNoO", "tTml", "Ggj", "fFy", "aAL", "Bbc", "zsS", "hHI", "Vv", "uU")

// Tête de 3/4 vers la gauche : cheveux plaqués vers l'arrière, une mèche sur le front.
sprite("_tete", `
  .....hhhh...........
  ...hhHHHHhhh........
  ..hHHIIIHHHhhh......
  .hHIIHHHHHHHHhhh....
  hHIHHHHHHHHHHHHhhhh.
  hHHHHHHHHHHHHHHHHhhh
  hHHHHHHHHHHHHHHHHHhh
  hHHHhSSHHHHHHHHHHhhh
  .hHhSSSShHHHHHHHhhh.
  .hhSSSSSShHHHHHhhhhh
  .hSSSSSSSShHHHHHhhh.
  .hShhSSSShhhShHHhhh.
  ..SkkSSSSkkkSSsShhh.
  ..SwvSSSSwvVSSsSzhh.
  ..SvVSSSSvVVSssSzh..
  ...SSSSSSSSSSssSh...
  ...SSSSzzSSSssz.....
  ....SSSSSSSssz......
  .....zsSSSsz........`)

sprite("_gant", "bcb\nBbB\nBBB")

// Buste et tête (bougent d'1 px pendant la respiration).
sprite("_buste", { w: 62, h: 62 },
  poly([24, 19, 38, 19, 39, 34, 25, 35], "A"), vline(30, 21, 11, "L"), vline(31, 21, 11, "a"),
  poly([32, 18, 39, 20, 41, 36, 35, 37, 34, 26], "N"), line(36, 22, 38, 34, "n"),
  poly([22, 21, 28, 19, 29, 35, 25, 37, 23, 30], "o"), line(24, 23, 25, 33, "O"),
  vline(28, 20, 15, "m"), vline(33, 19, 17, "T"),
  rect(25, 32, 15, 2, "b"), hline(25, 33, 15, "B"), rect(30, 32, 2, 2, "g"), px(30, 32, "j"),
  ellipse(38, 21, 3, 2, "T"), hline(36, 20, 3, "m"), hline(36, 23, 5, "g"),
  stamp("_tete", 21, 0),
  rect(28, 17, 7, 3, "F"), hline(28, 17, 7, "y"), hline(28, 19, 7, "f"))   // écharpe nouée

// Jambes et pan avant du manteau (fixes).
sprite("_jambe_arriere", { w: 62, h: 62 },
  line(35, 37, 41, 46, "A", 5), line(35, 36, 40, 44, "L"),
  line(41, 46, 47, 55, "B", 5), line(40, 46, 46, 55, "b"), line(40, 47, 44, 53, "c"),
  hline(42, 50, 5, "T"),
  poly([42, 55, 50, 54, 53, 57, 53, 60, 41, 60], "B"), hline(42, 57, 10, "b"), hline(43, 56, 4, "c"))

sprite("_jambe_avant", { w: 62, h: 62 },
  line(28, 36, 22, 45, "A", 5), line(27, 36, 21, 44, "L"),
  line(22, 45, 19, 55, "B", 5), line(21, 45, 18, 55, "b"), line(20, 47, 18, 53, "c"),
  hline(18, 50, 5, "T"),
  circ(22, 45, 2, "T"), px(21, 44, "l"), px(23, 46, "t"),
  poly([12, 60, 14, 56, 22, 55, 23, 60], "B"), hline(14, 57, 8, "b"), hline(14, 56, 3, "c"),
  poly([25, 34, 30, 35, 37, 44, 32, 47, 27, 41], "o"), line(27, 36, 33, 45, "O"),
  poly([30, 38, 37, 44, 32, 47], "N"), line(29, 35, 35, 43, "O"))

// --- Éléments animés -------------------------------------------------------------

// Pans du manteau qui ondulent (ph : phase en radians).
function manteau(c, ph) {
  const w1 = Math.round(Math.sin(ph) * 2), w2 = Math.round(Math.sin(ph + 1.5) * 2)
  c.poly([36, 20, 41, 22, 44, 30, 50, 36, 61, 40 + w1, 55, 42, 61, 48 + w2, 50, 47, 42, 42, 37, 34], "N")
  c.poly([42, 30, 50, 36, 61, 40 + w1, 55, 42, 48, 40], "o")
  c.line(44, 31, 59, 40 + w1, "O")
  c.poly([44, 42, 50, 47, 61, 48 + w2, 52, 45], "n")
}

// Deux pans d'écharpe flottant derrière la nuque.
function echarpe(c, ph, dy) {
  for (const [len, y0, off] of [[20, 18, 0], [15, 20, 1.2]]) {
    const top = [], bot = []
    for (let i = 0; i <= 5; i++) {
      const x = 33 + (i * len) / 5, y = y0 + dy + i + Math.round(Math.sin(ph + off + i * 0.9) * 1.5)
      const half = i === 5 ? 0 : 1.5
      top.push(x, y - half), bot.unshift(x, y + half)
    }
    c.poly([...top, ...bot], off ? "f" : "F")
    if (!off) c.line(33, y0 + dy - 1, 33 + len * 0.6, y0 + dy + 2 + Math.round(Math.sin(ph + 2.7) * 1.5), "y")
  }
}

// Épée : main en (hx, hy), lame orientée selon ang (radians, y vers le bas).
function epee(c, hx, hy, ang) {
  const ux = Math.cos(ang), uy = Math.sin(ang), vx = -uy, vy = ux, L = 22
  const pt = (t, s) => [Math.round(hx + ux * t + vx * s), Math.round(hy + uy * t + vy * s)]
  const sl = vx + vy < 0 ? 1 : -1                               // côté de la lame tourné vers la lumière
  c.line(...pt(-1, 0), ...pt(-6, 0), "B", 2)
  c.circ(...pt(-7, 0), 1, "g")
  c.poly([...pt(3, -2.5), ...pt(3, 2.5), ...pt(L - 4, 2.5), ...pt(L, 0), ...pt(L - 4, -2.5)], "T")
  c.line(...pt(3, 1.5 * sl), ...pt(L - 3, 1.5 * sl), "m")
  c.line(...pt(3, -1.5 * sl), ...pt(L - 3, -1.5 * sl), "t")
  c.line(...pt(5, 0), ...pt(L - 6, 0), "u")                     // rune
  c.line(...pt(2, -4), ...pt(2, 4), "g", 2)
  c.px(...pt(2, 0), "u")
}

// Bras avant : manche, brassard d'acier, gant, épaulière d'acier à liseré bronze.
function bras(c, ex, ey, hx, hy, dy) {
  c.line(25, 23 + dy, ex, ey, "N", 3)
  c.line(ex, ey, hx, hy, "T", 3)
  c.line(ex, ey - 1, hx, hy - 1, "m")
}
function epaule(c, hx, hy, dy) {
  c.stamp("_gant", hx - 1, hy - 1)
  c.ellipse(24, 22 + dy, 4, 3, "T"), c.ellipse(23, 21 + dy, 3, 2, "m"), c.px(21, 20 + dy, "l")
  c.hline(21, 25 + dy, 7, "g"), c.px(21, 25 + dy, "j")
}

// Traînée de la lame : arc de cercle épais au milieu, effilé aux extrémités.
function trainee(c, cx, cy, r, a0, a1, ep) {
  for (let a = a0; a <= a1; a += 0.02) {
    const k = Math.sin((Math.PI * (a - a0)) / (a1 - a0)), e = Math.max(1, Math.round(ep * k))
    for (let d = 0; d < e; d++) {
      c.px(Math.round(cx + Math.cos(a) * (r - d)), Math.round(cy + Math.sin(a) * (r - d)), d === 0 ? "U" : "u")
    }
  }
}

const POSES = {
  garde:   { e: [26, 29], h: [19, 28], ang: -2.0 },
  armer:   { e: [30, 30], h: [36, 29], ang: -0.65 },
  frappe:  { e: [24, 28], h: [21, 27], ang: 2.84 },
  suite:   { e: [25, 31], h: [20, 31], ang: 2.2 },
}

function kael(c, pose, dy, ph, effet) {
  const p = POSES[pose]
  manteau(c, ph)
  echarpe(c, ph, dy)
  c.stamp("_jambe_arriere", 0, 0)
  c.stamp("_buste", 0, dy)
  c.stamp("_jambe_avant", 0, 0)
  if (effet) trainee(c, 28, 28, 25, Math.PI * 0.75, Math.PI * 1.25, effet)
  bras(c, p.e[0], p.e[1] + dy, p.h[0], p.h[1] + dy, dy)
  epee(c, p.h[0], p.h[1] + dy, p.ang)
  epaule(c, p.h[0], p.h[1] + dy, dy)
}

// Attente : respiration et tissus qui ondulent.
anim("kael_attente", { w: 62, h: 62, frames: 6, fps: 7, outline: "k" },
  (c) => kael(c, "garde", [0, 0, 0, 1, 1, 1][c.frame], c.phase * Math.PI * 2, 0),
  glow("u", { r: 2, strength: 0.3 }))

// Attaque : armer, frappe avec traînée, accompagnement, retour en garde.
const ATTAQUE = [
  ["garde", 0, 0], ["armer", 1, 0], ["armer", 1, 0], ["frappe", 1, 4],
  ["suite", 1, 2], ["suite", 1, 0], ["suite", 0, 0], ["garde", 0, 0],
]
anim("kael_attaque", { w: 62, h: 62, frames: ATTAQUE.length, fps: 10, outline: "k" },
  (c) => {
    const [pose, dy, effet] = ATTAQUE[c.frame]
    kael(c, pose, dy, c.frame * 0.8, effet)
  },
  glow("uU", { r: 3, strength: 0.5 }))

sheet("kael", ["kael_attente", "kael_attaque"], { cols: 8, pad: 1 })
