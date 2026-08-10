// Lista as imagens do topo de uma página — pra achar o arquivo da logo do
// cliente em vez de recortar print na mão.
//
//   node scripts/find-logo.mjs https://kfm-web.vercel.app/
import { chromium } from 'playwright'

const url = process.argv[2]
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto(url, { waitUntil: 'load', timeout: 45_000 })
await page.waitForTimeout(2_000)

const found = await page.evaluate(() => {
  const out = []
  for (const img of document.querySelectorAll('img')) {
    const r = img.getBoundingClientRect()
    if (r.top > 400) continue // só o topo: header/herói
    out.push({ tipo: 'img', src: img.currentSrc || img.src, alt: img.alt, w: Math.round(r.width), h: Math.round(r.height) })
  }
  for (const svg of document.querySelectorAll('header svg, nav svg')) {
    const r = svg.getBoundingClientRect()
    if (r.width < 40) continue // ícone, não logo
    out.push({ tipo: 'svg', w: Math.round(r.width), h: Math.round(r.height), markup: svg.outerHTML.slice(0, 200) })
  }
  return out
})

console.log(JSON.stringify(found, null, 2))
await browser.close()
