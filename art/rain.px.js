// Chevalier blond inspiré de Rain (Final Fantasy Brave Exvius) : sprite de combat, idle animé.
// Build : node .claude/skills/pxl-pixel-art/bin/pxl.js build art/rain.px.js
pal({
  k: "#14101c",                                  // contour
  Y: "#fff3a8", y: "#f2cc5a", h: "#b98a2e",      // cheveux
  S: "#ffe0c8", s: "#e9b49a", z: "#c48a76",      // peau
  e: "#3d7be0", w: "#ffffff",                    // yeux
  a: "#22223a", A: "#3a3c5e", q: "#5d6390",      // armure sombre
  m: "#eef3f8", M: "#b5c0cc", n: "#727c8c",      // argent (épaulières, lame)
  r: "#d23c48", R: "#8c1f30",                    // rouge
  g: "#f4c34c", G: "#b07f22",                    // or
  p: "#3b3552", P: "#27223a",                    // pantalon
  b: "#7c4a2c", B: "#4d2c1a",                    // bottes, poignée
})
ramps("kaAq", "nMm", "zsS", "hyY", "Rr", "Gg", "Pp", "Bb")

// Tête + buste (bougent pendant la respiration).
sprite("_haut", `
  ...........Y...Y
  ..........YY..YY...Y
  .....Y...YyY.YyY..YY
  ....YY..YyyYYyyY.YyY
  ...YyYYYyyyyyyyyYyyY
  ..YyyyyyyyyyyyyyyyyyY
  .YyyyyyyyyyyyyyyyyyyyY
  ..YyyyyyyyyyyyyyyhyyyyY
  .Yyyyhyyyyyhyyyyyhhyyyyh
  YyyyhyyyyyhyyyyyhhhhyyyYh
  .YyhSyhSSyhSSSyyhhhhhyh
  ..hSSySSSSySSSSSzhhhhhh
  ..hSSSSSSSSSSSSzSShhhh
  ..SSkkSSSSkkSSSzSzhhh
  ..SSweSSSSweSSSSzzhh
  ..SSeeSSSSeeSSSSzhh
  ...SSSSSSSSSSSSzzh
  ...SSSSzSSSSSSzzh
  ....SSSSSSSSSzz
  .....sSSSSSz
  ........aSSa
  ....mmmmMaAqAaMmmmm
  ...mmmmMMaAqAaMMmmmm
  ...nMMMMnaAqAanMMMMn
  ....nnnnaAAqAAannnn
  ....aAAaaAAqAAaaAAa
  ....aAAaaAAqAAaaAAa
  ....aAAarrrgrrraAAa
  ....MmMaAAAqAAAasSs
  ....nMn.aAAAqAAAa.Ss`)

// Pans du manteau + jambes (fixes).
sprite("_bas", `
  .......aAAAqAAAa
  ......aAAAa.aAAAa
  ......aAAa...aAAa
  .......pPp...pPp
  .......pPp...pPp
  ......ppPp...pPpp
  ......pPp....pPp
  ......pPp....pPp
  .....bbBb...bbBb
  .....bbBb...bbBb
  ....bbbbBb..bbbBb
  ....BBBBBB..BBBBB`)

// Grande épée tenue lame vers le bas, en avant (coordonnées : la main est vers 12-14, 4-5).
sprite("_epee", { w: 18, h: 18 },
  line(11, 7, 14, 4, "B", 2),                    // poignée (cachée par la main)
  px(15, 3, "g"), px(15, 2, "G"),                // pommeau
  line(7, 6, 12, 11, "g", 2), px(12, 11, "G"),   // garde
  line(9, 10, 2, 17, "M", 3),                    // lame
  line(9, 9, 1, 17, "m"),                        // fil clair
  line(10, 11, 3, 18, "n"))                      // fil sombre

anim("rain", { w: 36, h: 44, frames: 4, fps: 5, outline: "k" }, (c) => {
  const dy = [0, 0, 1, 1][c.frame]
  c.stamp("_bas", 8, 31)
  c.stamp("_epee", 0, 25 + dy)                   // derrière le buste : la main tient la poignée
  c.stamp("_haut", 8, 1 + dy)
})
