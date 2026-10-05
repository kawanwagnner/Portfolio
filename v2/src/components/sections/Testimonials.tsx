import { useEffect, useRef, useState } from 'react'
import { WhatsAppIcon } from '@/components/shared/WhatsAppIcon'
import { motion, useInView } from 'framer-motion'
import { ChevronLeft, ChevronRight, Gift, Play } from 'lucide-react'
import { Reveal } from '@/components/shared/Reveal'
import { Kicker } from '@/components/shared/Kicker'
import { AccentText } from '@/components/shared/AccentText'
import {
  referral,
  testimonials,
  testimonialsSection,
  whatsappLink,
  type Testimonial,
} from '@/data/content'
import { cn } from '@/lib/utils'

/** Moldura de story: mesma proporção dos prints (720×1180). */
const FRAME = 'aspect-[720/1180] w-full overflow-hidden rounded-2xl border border-border bg-card'

function VideoFrame({ t }: { t: Testimonial }) {
  // O vídeo tem ~10 MB: só baixa quando a pessoa toca no play.
  const [playing, setPlaying] = useState(false)
  if (playing) {
    return (
      <video
        src={t.video}
        poster={t.image}
        controls
        autoPlay
        playsInline
        className={cn(FRAME, 'bg-black object-cover')}
      />
    )
  }
  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Assistir o depoimento de ${t.name}`}
      className={cn(FRAME, 'group relative block')}
    >
      <img src={t.image} alt="" loading="lazy" className="h-full w-full object-cover" />
      <span className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-black shadow-xl transition-transform duration-300 group-hover:scale-110">
        <Play className="ml-1 h-7 w-7 fill-current" />
      </span>
      <span className="absolute bottom-4 left-4 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white">
        Depoimento em vídeo · 3 min
      </span>
    </button>
  )
}

function Card({ t }: { t: Testimonial }) {
  return (
    <figure className="w-[16.5rem] shrink-0 snap-start sm:w-[18rem]">
      {t.video ? (
        <VideoFrame t={t} />
      ) : (
        <div className={FRAME}>
          <img
            src={t.image}
            alt={`Print do depoimento de ${t.name}: ${t.quote}`}
            loading="lazy"
            draggable={false}
            className="h-full w-full object-cover"
          />
        </div>
      )}
    </figure>
  )
}

function ReferralCard() {
  return (
    <figure className="w-[16.5rem] shrink-0 snap-start sm:w-[18rem]">
      <div className={FRAME}>
        <img
          src={referral.image}
          alt="Indique e ganhe: R$ 100 por indicação que se tornar cliente da VYSO"
          loading="lazy"
          draggable={false}
          className="h-full w-full object-cover"
        />
      </div>
    </figure>
  )
}

/** Tempo de cada trecho da animação dos passos, em segundos. */
const STEP_DOT = 0.35
const STEP_LINE = 0.6

/**
 * Os três passos da indicação ligados por uma linha que vai se preenchendo:
 * acende o 1, a linha corre até o 2, acende o 2, corre até o 3. Dispara uma vez,
 * quando o bloco entra na tela. No computador os passos ficam lado a lado e a
 * linha corre na horizontal; no celular eles empilham e a linha desce.
 * Cada passo desenha o próprio trecho até o seguinte, então a geometria não
 * depende de medir nada.
 */
function ReferralSteps() {
  const ref = useRef<HTMLOListElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const steps = referral.steps
  // início de cada etapa: ponto i acende, depois a linha i corre
  const dotAt = (i: number) => i * (STEP_DOT + STEP_LINE)
  const lineAt = (i: number) => dotAt(i) + STEP_DOT
  const ease = [0.65, 0, 0.35, 1] as const

  return (
    <ol ref={ref} className="grid gap-7 border-t border-accent/15 pt-7 sm:grid-cols-3 sm:gap-8">
      {steps.map((s, i) => {
        const last = i === steps.length - 1
        return (
          <li key={s.title} className="relative flex gap-3 sm:flex-col sm:gap-4">
            {!last && (
              <>
                {/* trilho + preenchimento, horizontal (sm+) */}
                <span
                  aria-hidden
                  className="absolute left-9 top-[0.8rem] hidden h-0.5 w-[calc(100%-2.25rem+2rem-0.5rem)] overflow-hidden rounded-full bg-border sm:block"
                >
                  <motion.span
                    className="block h-full w-full origin-left rounded-full bg-gradient-to-r from-accent to-[hsl(var(--ember))]"
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ duration: STEP_LINE, delay: lineAt(i), ease }}
                  />
                </span>
                {/* trilho + preenchimento, vertical (celular) */}
                <span
                  aria-hidden
                  className="absolute left-[0.8rem] top-9 h-[calc(100%-2.25rem+1.75rem-0.5rem)] w-0.5 overflow-hidden rounded-full bg-border sm:hidden"
                >
                  <motion.span
                    className="block h-full w-full origin-top rounded-full bg-gradient-to-b from-accent to-[hsl(var(--ember))]"
                    initial={{ scaleY: 0 }}
                    animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
                    transition={{ duration: STEP_LINE, delay: lineAt(i), ease }}
                  />
                </span>
              </>
            )}

            <motion.span
              className="relative z-10 grid h-7 w-7 shrink-0 place-items-center rounded-full font-mono-tag text-xs"
              initial={{ backgroundColor: 'hsl(var(--accent) / 0.15)', color: 'hsl(var(--accent))', scale: 1 }}
              animate={
                inView
                  ? {
                      backgroundColor: 'hsl(var(--accent) / 1)',
                      color: 'hsl(var(--accent-foreground))',
                      scale: [1, 1.25, 1],
                    }
                  : undefined
              }
              transition={{ duration: STEP_DOT, delay: dotAt(i), ease: 'easeOut' }}
              style={{ boxShadow: '0 0 0 4px hsl(var(--background))' }}
            >
              {i + 1}
            </motion.span>

            <motion.span
              initial={{ opacity: 0.45 }}
              animate={inView ? { opacity: 1 } : undefined}
              transition={{ duration: STEP_DOT, delay: dotAt(i) }}
            >
              <span className="block text-sm font-semibold text-foreground">{s.title}</span>
              <span className="block text-sm leading-relaxed text-muted-foreground">{s.description}</span>
            </motion.span>
          </li>
        )
      })}
    </ol>
  )
}

/**
 * Depoimentos reais em carrossel, mais o programa de indicação.
 *
 * Fica logo depois dos projetos: quem acabou de ver o trabalho quer saber se
 * o cliente ficou feliz. O carrossel é scroll nativo com snap (dedo, trackpad
 * e teclado funcionam sem JS); as setas só empurram o scroll.
 */
export function Testimonials() {
  const track = useRef<HTMLDivElement>(null)
  const [edge, setEdge] = useState({ start: true, end: false })

  useEffect(() => {
    const el = track.current
    if (!el) return
    const update = () =>
      setEdge({
        start: el.scrollLeft < 8,
        end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8,
      })
    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const scroll = (dir: 1 | -1) => {
    const el = track.current
    if (!el) return
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 600), behavior: 'smooth' })
  }

  return (
    <section id="depoimentos" className="relative overflow-hidden py-20 md:py-24">
      <div aria-hidden className="ember-glow absolute -left-40 top-24 -z-10 h-[30rem] w-[30rem]" />
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-5">
            <Reveal>
              <Kicker>{testimonialsSection.kicker}</Kicker>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="headline max-w-2xl text-4xl sm:text-5xl md:text-6xl">
                <AccentText>{testimonialsSection.heading}</AccentText>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-md text-muted-foreground">{testimonialsSection.description}</p>
            </Reveal>
          </div>
          <div className="hidden gap-2 sm:flex">
            {([-1, 1] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => scroll(d)}
                disabled={d === -1 ? edge.start : edge.end}
                aria-label={d === -1 ? 'Depoimento anterior' : 'Próximo depoimento'}
                className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-accent/50 disabled:opacity-35"
              >
                {d === -1 ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* trilho alinhado à coluna do site, mas sangrando até a borda direita */}
      <div
        ref={track}
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2"
        style={{
          paddingInline: 'max(1.5rem, calc((100vw - 72rem) / 2 + 1.5rem))',
          scrollPaddingInline: 'max(1.5rem, calc((100vw - 72rem) / 2 + 1.5rem))',
        }}
      >
        {testimonials.map((t) => (
          <Card key={t.name} t={t} />
        ))}
        <ReferralCard />
      </div>

      {/* Indicou, ganhou */}
      <div className="mx-auto mt-14 max-w-6xl px-6">
        <Reveal>
          <div className="flex flex-col gap-8 rounded-3xl border border-accent/25 bg-accent/[0.05] p-7 md:p-9">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-accent text-accent-foreground">
                  <Gift className="h-7 w-7" />
                </span>
                <div>
                  <p className="headline text-3xl md:text-4xl">
                    <AccentText>{referral.title}</AccentText>
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">{referral.reward}</span>{' '}
                    {referral.rewardLabel}
                  </p>
                </div>
              </div>
              <a
                href={whatsappLink(referral.message)}
                target="_blank"
                rel="noreferrer"
                className="btn-ember inline-flex shrink-0 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
              >
                <WhatsAppIcon className="h-4 w-4" />
                {referral.cta}
              </a>
            </div>

            <ReferralSteps />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
