import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { indexablePages, SITE_URL } from './src/lib/seo-pages'

const escapeAttr = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

/**
 * Depois do build, grava `dist/<rota>/index.html` com título, descrição,
 * canonical e Open Graph daquela rota, mais `sitemap.xml` e `robots.txt`.
 *
 * O site é SPA: sem isto, toda URL devolve o mesmo HTML da home, e a prévia de
 * um case mandado no WhatsApp mostraria o título da home. A Vercel serve
 * arquivo real antes do rewrite, então cada rota pega o seu HTML e o app sobe
 * igual por cima.
 */
function seoPages(): Plugin {
  let outDir = 'dist'
  return {
    name: 'vyso-seo-pages',
    apply: 'build',
    configResolved(c) {
      outDir = path.resolve(c.root, c.build.outDir)
    },
    async closeBundle() {
      const base = await readFile(path.join(outDir, 'index.html'), 'utf-8')
      const pages = indexablePages()

      for (const p of pages) {
        const url = `${SITE_URL}${p.path === '/' ? '/' : p.path}`
        const t = escapeAttr(p.title)
        const d = escapeAttr(p.description)
        const html = base
          .replace(/<title>[^<]*<\/title>/, `<title>${t}</title>`)
          .replace(/(<meta name="description" content=")[^"]*/, `$1${d}`)
          .replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`)
          .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`)
          .replace(/(<meta property="og:title" content=")[^"]*/, `$1${t}`)
          .replace(/(<meta property="og:description" content=")[^"]*/, `$1${d}`)
          .replace(/(<meta property="og:image" content=")[^"]*/, `$1${p.image}`)
          .replace(/(<meta name="twitter:title" content=")[^"]*/, `$1${t}`)
          .replace(/(<meta name="twitter:description" content=")[^"]*/, `$1${d}`)
          .replace(/(<meta name="twitter:image" content=")[^"]*/, `$1${p.image}`)
        const dir = path.join(outDir, p.path)
        await mkdir(dir, { recursive: true })
        await writeFile(path.join(dir, 'index.html'), html)
      }

      const today = new Date().toISOString().slice(0, 10)
      const sitemap =
        '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
        pages
          .map(
            (p) =>
              `  <url><loc>${SITE_URL}${p.path}</loc><lastmod>${today}</lastmod><priority>${
                p.path === '/' ? '1.0' : p.path === '/projetos' ? '0.8' : '0.7'
              }</priority></url>`
          )
          .join('\n') +
        '\n</urlset>\n'
      await writeFile(path.join(outDir, 'sitemap.xml'), sitemap)
      await writeFile(
        path.join(outDir, 'robots.txt'),
        `User-agent: *\nAllow: /\nDisallow: /v2\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
      )
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), seoPages()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // three/webgpu + TSL usam recursos modernos (top-level await etc.)
    target: 'esnext',
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext',
    },
  },
})
