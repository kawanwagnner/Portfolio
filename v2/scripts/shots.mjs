// Tira os prints de capa dos cases direto dos sites no ar.
//
//   node scripts/shots.mjs            → todos
//   node scripts/shots.mjs vg         → só os alvos cujo arquivo casa com "vg"
//
// Saída: public/img/cases/<arquivo>.webp — o campo `cover` do content.ts aponta pra cá.
// O painel da AL não entra: fica atrás de login, não tem URL pública.
import { chromium, devices } from 'playwright'
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const OUT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../public/img/cases')

const TARGETS = [
  { file: 'al-modular-loja', url: 'https://www.almodularesquadrias.com.br/', viewport: 'desktop' },
  { file: 'al-esquadrias', url: 'https://share.google/MUIMGq52pSqslkgzW', viewport: 'mobile' },
  { file: 'ong-nova-historia', url: 'https://ong-nova-historia.vercel.app/', viewport: 'desktop' },
  { file: 'vg-facilities', url: 'https://vg-facilities.vercel.app/', viewport: 'desktop' },
  { file: 'travel-buena-vista', url: 'https://travel-buena-vista.vercel.app/', viewport: 'desktop' },
  { file: 'barbearia-imperador', url: 'https://barbearia-imperador-mooca.vercel.app/', viewport: 'desktop' },
  { file: 'kfm-web', url: 'https://kfm-web.vercel.app/', viewport: 'desktop' },
  { file: 'vyso-catalogo', url: 'https://vyso-catalogo-web.vercel.app/', viewport: 'desktop', dismiss: 'Entendi' },
]

// scale 2 pra não sair borrado em tela retina; o mockup ainda reduz a imagem.
const VIEWPORTS = {
  desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 },
  mobile: devices['iPhone 13'],
}

// O mockup nunca passa de ~800px de largura na tela; 1600 já é o 2x dele.
// PNG @2x saía com megabytes e derrubaria o LCP — WebP resolve sem perda visível.
const MAX_WIDTH = 1600
const QUALITY = 80

const filter = process.argv[2]
const jobs = filter ? TARGETS.filter((t) => t.file.includes(filter)) : TARGETS

await mkdir(OUT, { recursive: true })
const browser = await chromium.launch()

for (const job of jobs) {
  const context = await browser.newContext(VIEWPORTS[job.viewport])
  const page = await context.newPage()
  try {
    await page.goto(job.url, { waitUntil: 'load', timeout: 45_000 })
    // networkidle sozinho trava em site com poll/analytics; espera curta e segue.
    await page.waitForLoadState('networkidle', { timeout: 8_000 }).catch(() => {})
    // banner de cookie na frente do herói estraga a capa
    if (job.dismiss) {
      await page.getByRole('button', { name: job.dismiss }).first().click({ timeout: 5_000 }).catch(() => {})
    }
    // deixa a animação de entrada terminar antes do clique do obturador
    await page.waitForTimeout(2_500)
    const out = path.join(OUT, `${job.file}.webp`)
    const shot = await page.screenshot()
    const { size } = await sharp(shot)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(out)
    console.log(`ok    ${job.file}  ${job.viewport}  ${Math.round(size / 1024)}KB  ←  ${page.url()}`)
  } catch (err) {
    console.log(`FALHA ${job.file}  ${err.message.split('\n')[0]}`)
  } finally {
    await context.close()
  }
}

await browser.close()
