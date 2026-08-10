// Fotografa uma seção da home rodando no preview local — pra conferir layout
// sem precisar abrir o navegador. Suba o preview antes (`npm run preview`).
//
//   node scripts/preview-shot.mjs produtos 1440
//   node scripts/preview-shot.mjs produtos 390    (celular)
//
// A altura do viewport importa: os blocos animam por scroll (Reveal), e o que
// nunca entrou na tela sai transparente no print. Use altura maior que a seção.
import { chromium } from 'playwright'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// Fora do public/: é conferência de layout, não asset do site (e está no .gitignore).
const OUT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../.shots')
const [id = 'produtos', w = '1440', h = '1800'] = process.argv.slice(2)

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: Number(w), height: Number(h) } })
await page.goto('http://localhost:4173/', { waitUntil: 'load', timeout: 45_000 })
await page.waitForTimeout(1_500)

const el = page.locator(`#${id}`)
await el.scrollIntoViewIfNeeded()
// os Reveal entram por scroll; sem esta pausa a seção sai transparente
await page.waitForTimeout(2_000)
await el.screenshot({ path: path.join(OUT, `${id}-${w}.png`) })
console.log(`ok  ${id}  ${w}px`)

await browser.close()
