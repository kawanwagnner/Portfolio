import { motion } from 'framer-motion'
import { Reveal } from '@/components/shared/Reveal'
import { Kicker } from '@/components/shared/Kicker'
import { AccentText } from '@/components/shared/AccentText'
import { about, skills } from '@/data/content'

export function About() {
  return (
    <section id="sobre" className="relative mx-auto max-w-6xl px-6 py-28 md:py-36">
      <Reveal>
        <Kicker>{about.kicker}</Kicker>
      </Reveal>

      {/* Manifesto tipográfico (sem foto) */}
      <Reveal delay={0.05}>
        <h2 className="headline mt-7 max-w-4xl text-3xl leading-[1.05] sm:text-5xl md:text-6xl">
          <AccentText>{about.heading}</AccentText>
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
        <div className="space-y-5">
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.1 + i * 0.05}>
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">{p}</p>
            </Reveal>
          ))}

          {/* Skills como lista técnica (não pills genéricas) */}
          <Reveal delay={0.2}>
            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-4 font-mono-tag text-sm text-foreground/80">
              {skills.map((s) => (
                <span key={s} className="inline-flex items-center gap-2">
                  <span className="text-accent">/</span>
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Stats grandes */}
        <div className="grid grid-cols-3 gap-4 md:grid-cols-1 md:gap-0">
          {about.stats.map((s, i) => (
            <Reveal key={s.label} delay={0.15 + i * 0.08}>
              <motion.div className="border-t border-border py-5 md:py-7">
                <div className="headline text-4xl text-ember sm:text-5xl md:text-6xl">{s.value}</div>
                <div className="mt-1 font-mono-tag text-xs uppercase tracking-widest text-muted-foreground">
                  {s.label}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
