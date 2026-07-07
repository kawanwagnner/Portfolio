import { Instagram, ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/shared/Reveal'
import { Kicker } from '@/components/shared/Kicker'
import { AccentText } from '@/components/shared/AccentText'
import { founder, socials } from '@/data/content'

export function Founder() {
  return (
    <section id="founder" className="relative overflow-hidden py-28 md:py-36">
      <div
        aria-hidden
        className="ember-glow pointer-events-none absolute -right-24 top-10 -z-10 h-[32rem] w-[32rem]"
      />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
        {/* Texto */}
        <div>
          <Reveal>
            <Kicker>{founder.kicker}</Kicker>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="headline mt-6 max-w-xl text-4xl sm:text-5xl md:text-6xl">
              <AccentText>{founder.tagline}</AccentText>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
              {founder.bio}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <div>
                <div className="font-display text-lg font-bold">{founder.name}</div>
                <div className="font-mono-tag text-xs uppercase tracking-widest text-muted-foreground">
                  {founder.role}
                </div>
              </div>
              <a
                href={socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-accent/60 hover:text-accent"
              >
                <Instagram className="h-4 w-4" />
                @vyso.store
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </Reveal>
        </div>

        {/* Foto */}
        <Reveal delay={0.1} className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div
            aria-hidden
            className="ember-glow absolute -inset-6 -z-10 rounded-[2rem]"
          />
          <div className="relative overflow-hidden rounded-3xl border border-border glow-ring">
            <img
              src={founder.photo}
              alt={founder.name}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            {/* selo no rodapé da foto */}
            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl border border-white/10 bg-background/85 px-4 py-3">
              <span className="font-display text-sm font-bold">{founder.name}</span>
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
                V
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
