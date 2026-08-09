import { Hero } from '@/components/sections/Hero'
import { Marquee } from '@/components/sections/Marquee'
import { About } from '@/components/sections/About'
import { Founder } from '@/components/sections/Founder'
import { Projects } from '@/components/sections/Projects'
import { Services } from '@/components/sections/Services'
import { Support } from '@/components/sections/Support'
import { Contact } from '@/components/sections/Contact'

/**
 * Ordem de venda: prova antes de discurso.
 *
 * Quem chega da bio do Instagram dá poucos segundos ao site — nesse tempo ele
 * precisa ver TRABALHO, não manifesto. Por isso os projetos vêm logo depois do
 * herói, seguidos do que a VYSO vende (serviços) e de quanto custa (suporte).
 * Só então entra o institucional (A VYSO / Founder), que fecha a confiança de
 * quem já se interessou — em vez de gastar as primeiras telas de quem ainda não.
 *
 * Os números dos kickers (01 —, 02 — …) seguem esta ordem: mexeu aqui, renumere
 * em `data/content.ts` (e o de Serviços, que é literal no próprio componente).
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Projects />
      <Services />
      <Support />
      <About />
      <Founder />
      {/* <Immersive /> — fora da home: ~590px que só afirmavam "somos bons", e o
          CTA dela apenas rolava até o contato, que já vem logo abaixo. O
          componente segue em components/sections/Immersive.tsx; pra trazer de
          volta é só descomentar. */}
      <Contact />
    </>
  )
}
