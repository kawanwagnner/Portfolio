import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Check,
  X,
  MessageCircle,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { useDragScroll } from '@/hooks/useDragScroll'
import { Reveal } from '@/components/shared/Reveal'
import { Kicker } from '@/components/shared/Kicker'
import { AccentText } from '@/components/shared/AccentText'
import {
  supportSection,
  supportPlans,
  supportFeatures,
  whatsappLink,
  type SupportPlan,
} from '@/data/content'
import { cn } from '@/lib/utils'

function PlanCard({ plan, index }: { plan: SupportPlan; index: number }) {
  return (
    <Reveal
      delay={index * 0.08}
      className="w-[86vw] shrink-0 snap-start sm:w-[64vw] md:w-[48vw] lg:w-[31%]"
    >
      <div
        className={cn(
          'group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-card/60 p-7 transition-colors 2xl:p-8',
          plan.featured ? 'border-accent/45' : 'border-border hover:border-accent/30'
        )}
      >
        {/* brasa subindo no hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 origin-bottom scale-y-0 bg-gradient-to-t from-accent/12 to-transparent transition-transform duration-500 ease-out group-hover:scale-y-100"
        />

        {plan.badge && (
          <span className="relative mb-5 self-start rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono-tag text-[0.65rem] uppercase tracking-[0.18em] text-accent">
            {plan.badge}
          </span>
        )}

        <div className="relative">
          <h3 className="text-balance font-display text-xl font-bold md:text-2xl">{plan.name}</h3>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {plan.tagline}
          </p>
        </div>

        <div className="relative mt-7">
          <div className="flex items-baseline gap-1">
            <span
              className={cn(
                'font-display font-bold tracking-tight',
                // "Sob consulta" não compete em tamanho com um número — vira texto, não etiqueta de preço.
                plan.quote ? 'text-2xl xl:text-3xl' : 'text-4xl xl:text-5xl'
              )}
            >
              {plan.price}
            </span>
            {plan.period && (
              <span className="font-mono-tag text-sm text-muted-foreground">{plan.period}</span>
            )}
          </div>
          {plan.priceNote && (
            <p className="mt-2 font-mono-tag text-[0.7rem] uppercase tracking-widest text-muted-foreground">
              {plan.priceNote}
            </p>
          )}
        </div>

        {/* Mesma lista em todos os cards — o ✓/✗ é que muda. */}
        <ul className="relative mt-8 flex flex-1 flex-col gap-3.5 border-t border-border pt-7">
          {supportFeatures.map((f) => {
            const included = plan.includes.includes(f.id)
            const note = included ? plan.notes?.[f.id] : undefined
            return (
              <li key={f.id} className="flex items-start gap-3 text-sm">
                <span
                  className={cn(
                    'mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border',
                    included
                      ? 'border-accent/40 bg-accent/10 text-accent'
                      : 'border-border/70 text-muted-foreground/50'
                  )}
                >
                  {included ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                </span>
                <span className={included ? 'text-foreground/90' : 'text-muted-foreground/50 line-through decoration-muted-foreground/30'}>
                  {f.label}
                  {note && (
                    <span className="ml-1.5 font-mono-tag text-[0.7rem] text-muted-foreground">
                      {note}
                    </span>
                  )}
                </span>
              </li>
            )
          })}
        </ul>

        <div className="relative mt-9">
          <a
            href={whatsappLink(plan.whatsappMessage)}
            target="_blank"
            rel="noreferrer"
            className={cn(
              'group/cta inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-all',
              plan.featured
                ? 'btn-ember'
                : 'border border-border bg-background/60 hover:border-accent/50 hover:text-accent'
            )}
          >
            <MessageCircle className="h-4 w-4" />
            {plan.ctaLabel}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
          </a>

          {/* Atalho pra quem já é cliente e só quer assinar — só aparece com o Payment Link preenchido. */}
          {plan.stripeLink && (
            <a
              href={plan.stripeLink}
              target="_blank"
              rel="noreferrer"
              className="mt-3.5 block text-center font-mono-tag text-[0.7rem] uppercase tracking-widest text-muted-foreground underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              Já sou cliente — assinar direto
            </a>
          )}
        </div>
      </div>
    </Reveal>
  )
}

/** Seta do carrossel — só aparece de lg pra cima, onde não existe gesto de arrastar. */
function NavButton({
  dir,
  disabled,
  onClick,
}: {
  dir: -1 | 1
  disabled: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === -1 ? 'Ver planos anteriores' : 'Ver próximos planos'}
      className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card/60 text-muted-foreground transition-colors hover:border-accent/50 hover:text-accent disabled:opacity-30 disabled:hover:border-border disabled:hover:text-muted-foreground"
    >
      {dir === -1 ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
    </button>
  )
}

export function Support() {
  const trackRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  useDragScroll(trackRef)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  /** Liga/desliga as setas conforme a posição do trilho. */
  const syncArrows = () => {
    const el = trackRef.current
    if (!el) return
    // Folga de 2px: o navegador arredonda scrollLeft em DPR fracionário, e sem
    // isso a seta "próximo" nunca desliga no fim do trilho.
    setCanPrev(el.scrollLeft > 2)
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 2)
  }

  useEffect(() => {
    syncArrows()
    window.addEventListener('resize', syncArrows)
    return () => window.removeEventListener('resize', syncArrows)
  }, [])

  /** Avança/volta exatamente um card (largura + gap), não uma tela inteira. */
  const scrollByCard = (dir: -1 | 1) => {
    const el = trackRef.current
    if (!el) return
    const card = el.firstElementChild as HTMLElement | null
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8 // 20px = gap-5
    el.scrollBy({ left: dir * step, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <section id="suporte" className="relative overflow-hidden py-28 md:py-36">
      <div aria-hidden className="ember-glow absolute -left-40 top-24 -z-10 h-[32rem] w-[32rem]" />
      <div className="mx-auto max-w-[90rem] px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-5">
            <Reveal>
              <Kicker>{supportSection.kicker}</Kicker>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="headline max-w-3xl text-4xl sm:text-5xl md:text-6xl">
                <AccentText>{supportSection.heading}</AccentText>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {supportSection.description}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="hidden shrink-0 gap-3 lg:flex">
            <NavButton dir={-1} disabled={!canPrev} onClick={() => scrollByCard(-1)} />
            <NavButton dir={1} disabled={!canNext} onClick={() => scrollByCard(1)} />
          </Reveal>
        </div>

        {/*
          Carrossel de scroll-snap nativo em todas as larguras: o arrastar, o
          momentum e o teclado vêm de graça do navegador, sem lib.
          São 4 planos e a régua mostra 3 por vez (30% cada) — o quarto fica
          espiando na borda, que é o que sinaliza que dá pra rolar. No mouse
          esse gesto não existe, então de lg pra cima entram as setas acima.
          O `-mx-6 px-6` sangra o trilho até a borda da tela sem desalinhar o
          primeiro card do texto da seção; `scroll-px-6` faz o snap parar na
          mesma margem em vez de colar o card na borda.
        */}
        {/* Wrapper relativo só pra ancorar a dica de arrasto na borda do card. */}
        <div className="relative mt-14">
          <div
            ref={trackRef}
            onScroll={syncArrows}
            role="region"
            aria-label="Planos de suporte"
            tabIndex={0}
            className="no-scrollbar drag-scroll -mx-6 flex snap-x snap-mandatory items-stretch gap-5 overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-px-6 px-6 pb-4"
          >
            {supportPlans.map((plan, i) => (
              <PlanCard key={plan.id} plan={plan} index={i} />
            ))}
          </div>

          {/*
            Dica de arrasto colada na borda direita do card — é ali que o olho
            bate procurando "tem mais coisa?". Só abaixo de lg, onde as setas
            não existem. Some no primeiro scroll e não intercepta o gesto.
          */}
          {!canPrev && (
            <div
              aria-hidden
              className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 lg:hidden"
            >
              <motion.span
                className="grid h-12 w-12 place-items-center rounded-full border border-accent/40 bg-background/90 text-accent shadow-xl"
                animate={reduce ? undefined : { x: [0, -7, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ChevronRight className="h-6 w-6" />
              </motion.span>
            </div>
          )}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-9 max-w-2xl font-mono-tag text-xs leading-relaxed text-muted-foreground">
            {supportSection.note}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
