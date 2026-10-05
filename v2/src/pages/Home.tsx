import { Hero } from '@/components/sections/Hero'
import { Projects } from '@/components/sections/Projects'
import { Testimonials } from '@/components/sections/Testimonials'
import { Faq } from '@/components/sections/Faq'
import { Products } from '@/components/sections/Products'
import { Support } from '@/components/sections/Support'
import { About } from '@/components/sections/About'
import { Founder } from '@/components/sections/Founder'
import { Contact } from '@/components/sections/Contact'
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, useSectionTitle, useSeo } from '@/lib/seo'

/** Fora do componente: o hook observa de novo se a referência mudar. */
const SECTION_IDS = ['hero', 'projetos', 'depoimentos', 'duvidas', 'produtos', 'suporte', 'sobre', 'founder', 'contato']

/**
 * Home. Layout que nasceu como experimento na /v2 e virou o oficial em
 * 05/10/2026: tema claro por padrão (escuro no botão do menu, ver lib/theme.ts).
 *
 * Ordem pensada pra quem chega pra contratar, quase sempre pelo celular:
 * herói que diz quem faz e o quê, projetos logo em seguida (prova antes de
 * discurso), depoimentos (o cliente ficou feliz?), dúvidas que travam o
 * fechamento, o produto próprio, preço do suporte, e só então quem está por
 * trás. Os números dos kickers (01 /, 02 / …) seguem esta ordem: mexeu aqui,
 * renumere em `data/content.ts`.
 */
export default function Home() {
  useSeo({ title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION, path: '/' })
  useSectionTitle(SECTION_IDS)

  return (
    <>
      <Hero />
      <Projects />
      <Testimonials />
      <Faq />
      <Products />
      <Support />
      <About />
      <Founder />
      <Contact />
    </>
  )
}
