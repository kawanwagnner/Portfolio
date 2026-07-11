import { cn } from '@/lib/utils'

/**
 * Logo do cliente. Sem arquivo de logo, cai num monograma com as iniciais
 * — assim o layout já fica pronto e é só soltar o PNG/SVG em /public/img/logos.
 */
function initials(name: string) {
  const base = name.replace(/[·|].*$/, '').trim() // corta o sufixo: "X · via consultoria" → "X"
  const words = base.split(/\s+/).filter((w) => !/^(de|da|do|das|dos|e)$/i.test(w))

  // Nome curto que já é uma sigla/marca ("VYSO") → usa inteiro.
  if (words.length === 1 && words[0].length <= 4) return words[0].toUpperCase()

  return words
    .slice(0, 3)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

export function ClientLogo({
  name,
  src,
  className,
  size = 'md',
}: {
  name: string
  src?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}) {
  const box = {
    sm: 'h-9 w-9 text-xs rounded-lg',
    md: 'h-12 w-12 text-sm rounded-xl',
    lg: 'h-16 w-16 text-lg rounded-2xl',
  }[size]

  // Logo de verdade, sem fundo. A caixa é fixa (altura E largura) porque cada
  // marca tem proporção diferente — wordmark larga x emblema alto:
  // sem limitar os dois lados, uma delas domina o card e empurra o título.
  if (src) {
    const tile = {
      sm: 'h-8 w-16',
      md: 'h-10 w-24',
      lg: 'h-14 w-32',
    }[size]

    return (
      <img
        src={src}
        alt={`Logo ${name}`}
        loading="lazy"
        decoding="async"
        className={cn('shrink-0 object-contain object-center', tile, className)}
      />
    )
  }

  return (
    <span
      aria-hidden
      className={cn(
        'grid shrink-0 place-items-center border border-border bg-secondary/50 font-display font-bold tracking-tight text-accent',
        box,
        className
      )}
    >
      {initials(name)}
    </span>
  )
}
