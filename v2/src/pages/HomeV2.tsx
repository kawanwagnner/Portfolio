import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { HeroV2 } from '@/components/sections/HeroV2'
import { Projects } from '@/components/sections/Projects'
import { Faq } from '@/components/sections/Faq'
import { Testimonials } from '@/components/sections/Testimonials'
import { Products } from '@/components/sections/Products'
import { Support } from '@/components/sections/Support'
import { About } from '@/components/sections/About'
import { Founder } from '@/components/sections/Founder'
import { Contact } from '@/components/sections/Contact'
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, useSectionTitle, useSeo } from '@/lib/seo'

const SECTION_IDS = ['hero', 'projetos', 'depoimentos', 'duvidas', 'produtos', 'suporte', 'sobre', 'founder', 'contato']
const THEME_KEY = 'vyso:v2-theme'
type Theme = 'light' | 'dark'

function readTheme(): Theme {
  try {
    return localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

/**
 * Experimento da home em tema claro, só por URL (/v2): fora do menu, fora do
 * sitemap, com noindex. O site principal não muda.
 *
 * O claro é o padrão e o escuro vira opção (botão no canto esquerdo). A classe
 * vai no <html> pra navbar, rodapé e botão do WhatsApp, que vivem fora desta
 * página, acompanharem; ao sair da /v2 ela é removida.
 *
 * Ordem pensada pra quem chega pra contratar: herói que diz quem faz e o quê,
 * projetos logo em seguida (prova antes de discurso), o que eu faço, o produto
 * próprio, preço do suporte, e só então quem está por trás.
 */
export default function HomeV2() {
  const [theme, setTheme] = useState<Theme>(readTheme)

  useSeo({ title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION, path: '/v2', noindex: true })
  useSectionTitle(SECTION_IDS)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('theme-light', theme === 'light')
    try {
      localStorage.setItem(THEME_KEY, theme)
    } catch {
      /* aba anônima sem storage: o tema só não é lembrado */
    }
    return () => root.classList.remove('theme-light')
  }, [theme])

  const next: Theme = theme === 'light' ? 'dark' : 'light'

  return (
    <>
      <HeroV2 />
      <Projects />
      <Testimonials />
      <Faq />
      <Products />
      <Support />
      <About />
      <Founder />
      <Contact />

      <button
        type="button"
        onClick={() => setTheme(next)}
        aria-label={next === 'dark' ? 'Usar tema escuro' : 'Usar tema claro'}
        title={next === 'dark' ? 'Tema escuro' : 'Tema claro'}
        style={{ bottom: 'calc(1.25rem + env(safe-area-inset-bottom))' }}
        className="fixed left-5 z-[90] grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-foreground shadow-md transition-colors hover:border-accent/50 sm:left-6"
      >
        {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
      </button>
    </>
  )
}
