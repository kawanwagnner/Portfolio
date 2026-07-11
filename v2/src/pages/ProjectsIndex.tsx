import { Reveal } from '@/components/shared/Reveal'
import { Kicker } from '@/components/shared/Kicker'
import { AccentText } from '@/components/shared/AccentText'
import { ProjectGroups } from '@/components/sections/Projects'

export default function ProjectsIndex() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-28 pt-32 md:pt-40">
      <div className="flex flex-col gap-5">
        <Reveal>
          <Kicker>Projetos</Kicker>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="headline max-w-3xl text-4xl sm:text-5xl md:text-6xl">
            <AccentText>Cada projeto é um *problema resolvido*.</AccentText>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-xl text-muted-foreground">
            Sites, aplicações, agentes de IA e integrações. Entra em qualquer um pra ver o
            objetivo, o desafio e como foi resolvido.
          </p>
        </Reveal>
      </div>

      <ProjectGroups />
    </section>
  )
}
