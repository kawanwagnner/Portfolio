import { marquee } from '@/data/content'
import { useInView } from '@/hooks/useInView'

/**
 * Ticker cinético inclinado (esquerda mais baixa → direita subindo).
 * A animação PAUSA quando a faixa sai da tela — senão ela roda pra sempre
 * e come o compositor mesmo enquanto você está em outra seção.
 */
export function Marquee() {
  const items = [...marquee, ...marquee] // duplica pra loop contínuo (-50%)
  const { ref, inView } = useInView<HTMLDivElement>('120px')

  return (
    <div
      ref={ref}
      className="relative flex items-center overflow-hidden pb-2 pt-20 md:pb-3 md:pt-32"
    >
      {/* Banda um pouco mais larga que a viewport e rotacionada -3° */}
      <div className="marquee-wrap relative w-[112%] -translate-x-[6%] -rotate-3 border-y border-border bg-card/50 py-5 md:py-6">
        <div
          className="marquee gap-8 pr-8"
          style={{ animationPlayState: inView ? 'running' : 'paused' }}
        >
          {items.map((item, i) => (
            <span key={i} className="flex shrink-0 items-center gap-8">
              <span className="font-display text-lg font-semibold text-foreground/80 sm:text-2xl md:text-3xl">
                {item}
              </span>
              <span className="text-lg text-accent md:text-2xl">✦</span>
            </span>
          ))}
        </div>
        {/* fades laterais */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
      </div>
    </div>
  )
}
