/**
 * A marca em vetor — mesma geometria do public/logo.svg.
 * Fonte única: usado pelo <Logo />, pelo preloader e pelo flow field do herói.
 */
export const LOGO_PATH = 'M0 0L75 2L171 211L138 289Z M192 0L265 2L187 174L151 97Z'
export const LOGO_W = 265
export const LOGO_H = 289

/**
 * Amostra o "V" num canvas e devolve `count` pontos dentro do desenho,
 * centrados em (cx, cy) com a altura pedida. Usado pra formar a marca com partículas.
 */
export function sampleLogoPoints(opts: {
  count: number
  cx: number
  cy: number
  height: number
  /** Espaçamento da grade de amostragem, em px. Menor = mais denso. */
  step?: number
}): { x: number; y: number }[] {
  const { count, cx, cy, height, step = 6 } = opts
  const scale = height / LOGO_H
  const w = Math.ceil(LOGO_W * scale)
  const h = Math.ceil(height)

  const off = document.createElement('canvas')
  off.width = Math.max(1, w)
  off.height = Math.max(1, h)
  const ctx = off.getContext('2d', { willReadFrequently: true })
  if (!ctx) return Array.from({ length: count }, () => ({ x: cx, y: cy }))

  ctx.fillStyle = '#fff'
  ctx.scale(scale, scale)
  ctx.fill(new Path2D(LOGO_PATH))

  const data = ctx.getImageData(0, 0, off.width, off.height).data
  const pts: { x: number; y: number }[] = []
  const x0 = cx - w / 2
  const y0 = cy - h / 2
  for (let y = 0; y < h; y += step) {
    for (let x = 0; x < w; x += step) {
      if (data[(y * off.width + x) * 4 + 3] > 128) pts.push({ x: x0 + x, y: y0 + y })
    }
  }
  if (pts.length === 0) return Array.from({ length: count }, () => ({ x: cx, y: cy }))

  // embaralha e normaliza pra exatamente `count` pontos
  for (let i = pts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pts[i], pts[j]] = [pts[j], pts[i]]
  }
  return Array.from({ length: count }, (_, i) => pts[i % pts.length])
}
