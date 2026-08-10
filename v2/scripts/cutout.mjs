// Recorta o fundo chapado de uma logo — logo de cliente costuma chegar como
// JPEG num quadrado preto ou branco, e quadrado aparece no card.
//
// Flood fill a partir das bordas: só vira transparente o fundo CONECTADO à
// borda. O preto de dentro do emblema (corpo do pinguim, fundo do escudo) não
// é alcançado, então não abre buraco na arte.
//
//   node scripts/cutout.mjs entrada.jpeg public/img/logos/saida.webp
//   node scripts/cutout.mjs entrada.png saida.webp --branco   (fundo claro)
import sharp from 'sharp'

const [src, out, modo] = process.argv.slice(2)
if (!src || !out) {
  console.error('uso: node scripts/cutout.mjs <entrada> <saida.webp> [--branco]')
  process.exit(1)
}

const claro = modo === '--branco'
const BG = 45 // até aqui é fundo
const FRINGE = 78 // franja do JPEG em volta da arte

const img = sharp(src).ensureAlpha()
const { width: w, height: h } = await img.metadata()
const buf = await img.raw().toBuffer()

const nivel = (i) => {
  const o = i * 4
  const max = Math.max(buf[o], buf[o + 1], buf[o + 2])
  const min = Math.min(buf[o], buf[o + 1], buf[o + 2])
  return claro ? 255 - min : max
}

const clear = new Uint8Array(w * h)
const stack = []
for (let x = 0; x < w; x++) stack.push(x, (h - 1) * w + x)
for (let y = 0; y < h; y++) stack.push(y * w, y * w + w - 1)

while (stack.length) {
  const i = stack.pop()
  if (clear[i] || nivel(i) >= BG) continue
  clear[i] = 1
  const x = i % w
  const y = (i / w) | 0
  if (x > 0) stack.push(i - 1)
  if (x < w - 1) stack.push(i + 1)
  if (y > 0) stack.push(i - w)
  if (y < h - 1) stack.push(i + w)
}

// O JPEG deixa uma auréola em volta da arte; come essa franja em duas passadas,
// senão a logo fica com contorno sujo por cima do card.
for (let pass = 0; pass < 2; pass++) {
  const add = []
  for (let i = 0; i < w * h; i++) {
    if (clear[i] || nivel(i) >= FRINGE) continue
    const x = i % w
    const y = (i / w) | 0
    if (
      (x > 0 && clear[i - 1]) ||
      (x < w - 1 && clear[i + 1]) ||
      (y > 0 && clear[i - w]) ||
      (y < h - 1 && clear[i + w])
    ) {
      add.push(i)
    }
  }
  for (const i of add) clear[i] = 1
}

let cortado = 0
for (let i = 0; i < w * h; i++) {
  if (clear[i]) {
    buf[i * 4 + 3] = 0
    cortado++
  }
}

const { size } = await sharp(buf, { raw: { width: w, height: h, channels: 4 } })
  .trim()
  .resize({ height: 220, withoutEnlargement: true })
  .webp({ quality: 92 })
  .toFile(out)

console.log(
  `${out}  ${Math.round(size / 1024)}KB  ·  ${Math.round((cortado / (w * h)) * 100)}% do quadro virou transparente`
)
