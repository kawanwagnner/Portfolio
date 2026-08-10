// Despeja o texto renderizado de uma página — os sites são SPA, então buscar o
// HTML cru volta vazio. Serve pra escrever o case sem chutar o que o site diz.
//
//   node scripts/dump.mjs https://exemplo.com
import { chromium } from 'playwright'

const url = process.argv[2]
if (!url) {
  console.error('uso: node scripts/dump.mjs <url>')
  process.exit(1)
}

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto(url, { waitUntil: 'load', timeout: 45_000 })
await page.waitForLoadState('networkidle', { timeout: 8_000 }).catch(() => {})
await page.waitForTimeout(1_500)

const text = await page.evaluate(() =>
  document.body.innerText.replace(/\n{3,}/g, '\n\n').trim()
)
console.log(`# ${await page.title()}\n# ${page.url()}\n\n${text}`)

await browser.close()
