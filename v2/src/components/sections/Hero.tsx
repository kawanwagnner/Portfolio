import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowDown } from 'lucide-react'
import { Spotlight } from '@/components/ui/spotlight'
import { AccentText } from '@/components/shared/AccentText'
import { FlowField } from '@/components/three/FlowField'
import { useIsLowPower } from '@/hooks/useIsLowPower'
import { hero, brand, socials } from '@/data/content'

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

/** Fundo decorativo estático (aparelho fraco/mobile) — zero custo de GPU. */
function StaticBg() {
  return (
    <>
      <div aria-hidden className="absolute inset-0 bg-grid opacity-50" />
      <div
        aria-hidden
        className="ember-glow absolute right-0 top-1/2 h-[32rem] w-[32rem] -translate-y-1/2 translate-x-1/4 md:right-[10%]"
      />
    </>
  )
}

export function Hero() {
  const low = useIsLowPower()
  // Monta o flow field só depois do primeiro paint (LCP limpo).
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (low) return
    const ric =
      (window as any).requestIdleCallback || ((cb: () => void) => window.setTimeout(cb, 200))
    const cic = (window as any).cancelIdleCallback || window.clearTimeout
    const id = ric(() => setReady(true))
    return () => cic(id)
  }, [low])

  return (
    <section id="hero" className="relative h-svh min-h-[640px] w-full overflow-hidden bg-background">
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-1/3" fill="hsl(239 84% 67%)" />

      {/* Flow field de partículas (ou fundo estático em aparelho fraco) */}
      <div className="absolute inset-0">
        {!low && ready ? <FlowField className="h-full w-full" /> : <StaticBg />}
      </div>

      {/* Scrims pra legibilidade do texto */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/10 md:via-background/60 md:to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-background to-transparent" />

      {/* Conteúdo — pointer-events-none deixa o mouse interagir com o flow field;
          reativamos só nos elementos clicáveis (CTAs). */}
      <div className="pointer-events-none relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-center px-6">
        {/* status */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-7 flex items-center gap-3 font-mono-tag text-xs uppercase tracking-[0.2em] text-muted-foreground"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          {hero.status}
        </motion.div>

        {/* headline */}
        <h1 className="headline text-5xl leading-[0.95] sm:text-6xl md:text-7xl xl:text-8xl">
          {hero.headlineLines.map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                <AccentText>{line}</AccentText>
              </motion.span>
            </span>
          ))}
        </h1>

        {/* subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 + hero.headlineLines.length * 0.12 }}
          className="mt-7 max-w-lg text-base text-muted-foreground sm:text-lg"
        >
          {hero.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 + hero.headlineLines.length * 0.12 }}
          className="pointer-events-auto mt-9 flex flex-wrap items-center gap-4"
        >
          <button
            onClick={() => scrollTo('projetos')}
            className="btn-ember group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-all"
          >
            {hero.primaryCta}
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </button>
          <a
            href={socials.instagram}
            target="_blank"
            rel="noreferrer"
            className="link-underline inline-flex items-center gap-1.5 text-sm font-semibold text-foreground"
          >
            {hero.secondaryCta}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>

      {/* nome vertical / assinatura no canto (personalidade) */}
      <div className="pointer-events-none absolute bottom-8 right-6 z-10 hidden font-mono-tag text-[0.7rem] uppercase tracking-[0.3em] text-muted-foreground/70 [writing-mode:vertical-rl] lg:block">
        {brand.name} · {brand.role}
      </div>
    </section>
  )
}
