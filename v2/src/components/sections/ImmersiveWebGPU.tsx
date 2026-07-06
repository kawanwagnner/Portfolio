import { Suspense, lazy, useEffect, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { useHas3D } from '@/hooks/useHas3D'
import { useIsLowPower } from '@/hooks/useIsLowPower'
import { useInView } from '@/hooks/useInView'
import { ErrorBoundary } from '@/components/shared/ErrorBoundary'
import { AccentText } from '@/components/shared/AccentText'
import { immersive } from '@/data/content'

// Lazy: a cena 3D (three) só carrega quando a seção se aproxima.
const HeroFuturistic = lazy(() =>
  import('@/components/ui/hero-futuristic').then((m) => ({ default: m.Html }))
)

function scrollToContact() {
  document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })
}

/** Fallback premium (navegador muito antigo / celular fraco) — sem custo de GPU. */
function Fallback() {
  return (
    <div className="relative flex h-svh min-h-[560px] w-full flex-col items-center justify-center overflow-hidden bg-background px-6 text-center">
      <div aria-hidden className="absolute inset-0 bg-grid opacity-40" />
      <div
        aria-hidden
        className="ember-glow absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 blur-3xl"
      />
      <div className="relative z-10">
        <h2 className="headline text-4xl uppercase sm:text-6xl md:text-7xl">
          <AccentText>{immersive.title}</AccentText>
        </h2>
        <p className="mx-auto mt-5 max-w-md text-muted-foreground">{immersive.subtitle}</p>
        <button
          onClick={scrollToContact}
          className="btn-ember mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold"
        >
          {immersive.cta}
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export function ImmersiveWebGPU() {
  const has3D = useHas3D()
  const low = useIsLowPower()
  // Monta a cena uma vez (latch) e pausa o render quando sai da tela —
  // não re-inicializa a cada passagem (era a trava ao descer).
  const { ref, inView } = useInView<HTMLElement>('300px')
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    if (inView) setMounted(true)
  }, [inView])

  // Roda a cena em qualquer navegador com WebGPU ou WebGL2 (quase todos),
  // exceto celular/hardware fraco, que recebe a versão leve.
  const useScene = has3D === 'yes' && !low

  return (
    <section ref={ref} className="relative w-full border-y border-border">
      {!useScene ? (
        <Fallback />
      ) : !mounted ? (
        <div className="h-svh min-h-[560px] w-full bg-background" />
      ) : (
        <ErrorBoundary fallback={<Fallback />}>
          <Suspense fallback={<div className="h-svh min-h-[560px] w-full bg-background" />}>
            <HeroFuturistic
              title={immersive.title}
              subtitle={immersive.subtitle}
              ctaLabel={immersive.cta}
              onExplore={scrollToContact}
              paused={!inView}
            />
          </Suspense>
        </ErrorBoundary>
      )}
    </section>
  )
}
