/**
 * Dados de SEO de cada rota, sem React: o `vite.config.ts` importa este
 * arquivo no build pra gravar o HTML de cada página e o sitemap. Por isso o
 * import do conteúdo é relativo (o alias `@` não existe dentro do config).
 */
import { projects, getCaseParts, type Project } from '../data/content'

export const SITE_URL = 'https://vyso.store'
export const SITE_NAME = 'VYSO'
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`

export const DEFAULT_TITLE = 'VYSO | Sites, lojas virtuais e sistemas sob medida'
export const DEFAULT_DESCRIPTION =
  'A VYSO cria sites, lojas virtuais, apps e sistemas sob medida para pequenos e médios negócios. Você fala direto com quem constrói, sem agência e sem intermediário. Projetos reais, do problema ao resultado.'

export const PROJECTS_TITLE = 'Projetos entregues pela VYSO | Cases de sites e sistemas'
export const PROJECTS_DESCRIPTION =
  'Lojas virtuais, apps, painéis e sites feitos pela VYSO. Cada case mostra o objetivo, o desafio e como o problema foi resolvido.'

/** Corta no limite que o Google mostra, sem quebrar palavra. */
function clip(text: string, max = 158) {
  if (text.length <= max) return text
  return text.slice(0, text.lastIndexOf(' ', max - 1)).replace(/[,.;:]$/, '') + '…'
}

export function projectSeo(project: Project) {
  const lead = getCaseParts(project)[0]
  return {
    title: `${project.title}: ${project.category} | Case VYSO`,
    description: clip(project.summary),
    path: `/projetos/${project.slug}`,
    image: lead.cover ? `${SITE_URL}${lead.cover}` : OG_IMAGE,
  }
}

/** Toda rota indexável, na ordem do sitemap. */
export function indexablePages() {
  return [
    { title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION, path: '/', image: OG_IMAGE },
    { title: PROJECTS_TITLE, description: PROJECTS_DESCRIPTION, path: '/projetos', image: OG_IMAGE },
    ...projects.map(projectSeo),
  ]
}
