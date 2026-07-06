import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/shared/Reveal'
import { AccentText } from '@/components/shared/AccentText'
import { immersive } from '@/data/content'

function scrollToContact() {
  document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })
}

/**
 * Seção de impacto — versão leve (100% CSS, sem 3D/WebGPU).
 * Custo de GPU ~zero: glow estático + grid + tipografia. Nada anima em loop.
 */
export function Immersive() {
  return (
    <section className="relative flex min-h-[70svh] w-full items-center justify-center overflow-hidden border-y border-border px-6 py-28 text-center md:py-36">
      <div aria-hidden className="absolute inset-0 bg-grid opacity-40" />
      <div
        aria-hidden
        className="ember-glow absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2"
      />

      {/* Eco tipográfico ao fundo — dá profundidade sem custo. */}
      <span
        aria-hidden
        className="text-outline pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[26vw] font-bold leading-none opacity-[0.05]"
      >
        VYSO
      </span>

      <Reveal className="relative z-10">
        <h2 className="headline mx-auto max-w-4xl text-4xl uppercase sm:text-6xl md:text-7xl">
          <AccentText>{immersive.title}</AccentText>
        </h2>
        <p className="mx-auto mt-5 max-w-md text-muted-foreground">{immersive.subtitle}</p>
        <button
          onClick={scrollToContact}
          className="btn-ember mt-9 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold"
        >
          {immersive.cta}
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </Reveal>
    </section>
  )
}
