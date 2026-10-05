import { useEffect } from 'react'

/**
 * SEO de cada página, num lugar só.
 *
 * Duas pontas usam isto: o navegador (hook `useSeo`, que troca título e metas
 * quando a rota muda) e o build (`vite.config.ts`, que grava um index.html com
 * as metas certas em cada rota). A segunda existe porque WhatsApp, Instagram e
 * LinkedIn não rodam JavaScript: sem ela todo link compartilhado mostraria o
 * título da home.
 *
 * Separador é a barra vertical, nunca travessão: regra do Kawan pro texto do site.
 */

import { DEFAULT_TITLE, OG_IMAGE, SITE_URL } from './seo-pages'

export * from './seo-pages'

export interface SeoInput {
  title: string
  description: string
  /** Caminho a partir da raiz, com barra inicial. Vira o canonical. */
  path: string
  image?: string
  /** Página de teste: fora do Google. */
  noindex?: boolean
}

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.rel = 'canonical'
    document.head.appendChild(el)
  }
  el.href = href
}

export function applySeo({ title, description, path, image = OG_IMAGE, noindex }: SeoInput) {
  const url = `${SITE_URL}${path}`
  document.title = title
  setMeta('name', 'description', description)
  setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')
  setMeta('property', 'og:title', title)
  setMeta('property', 'og:description', description)
  setMeta('property', 'og:url', url)
  setMeta('property', 'og:image', image)
  setMeta('name', 'twitter:title', title)
  setMeta('name', 'twitter:description', description)
  setMeta('name', 'twitter:image', image)
  setCanonical(url)
}

/** Metas da página atual. Reaplica quando qualquer campo muda. */
export function useSeo(input: SeoInput) {
  const { title, description, path, image, noindex } = input
  useEffect(() => {
    applySeo({ title, description, path, image, noindex })
  }, [title, description, path, image, noindex])
}

/**
 * Título da aba que acompanha a seção visível da home.
 *
 * Só o `document.title` muda: canonical e descrição continuam os da home, que
 * é uma página só pro Google. Quem troca de aba e volta vê onde parou.
 */
export const SECTION_TITLES: Record<string, string> = {
  hero: DEFAULT_TITLE,
  projetos: 'Projetos entregues | VYSO',
  depoimentos: 'Depoimentos de clientes | VYSO',
  produtos: 'VYSO Loja, nosso e-commerce próprio | VYSO',
  duvidas: 'Dúvidas frequentes: prazo, contrato e nota fiscal | VYSO',
  suporte: 'Planos de suporte e manutenção | VYSO',
  sobre: 'Sobre a VYSO',
  founder: 'Kawan Wagnner, fundador da VYSO',
  contato: 'Fale com a VYSO | Orçamento pelo WhatsApp',
}

export function useSectionTitle(ids: string[]) {
  useEffect(() => {
    const visible = new Map<string, number>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set(e.target.id, e.intersectionRatio)
        // a seção que ocupa mais da faixa central da tela é a "atual"
        let best: string | undefined
        let ratio = 0
        for (const [id, r] of visible) {
          if (r > ratio) {
            ratio = r
            best = id
          }
        }
        if (best && SECTION_TITLES[best]) document.title = SECTION_TITLES[best]
      },
      // faixa no meio da tela: a seção conta quando está sendo lida, não quando aparece na borda
      { rootMargin: '-35% 0px -35% 0px', threshold: [0, 0.01, 0.25, 0.5, 0.75, 1] }
    )
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el)
    els.forEach((el) => observer.observe(el))
    return () => {
      observer.disconnect()
      document.title = DEFAULT_TITLE
    }
  }, [ids])
}
