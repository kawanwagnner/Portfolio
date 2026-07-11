import { cn } from '@/lib/utils'

/**
 * Logo do cliente. Sem arquivo de logo, cai num monograma com as iniciais
 * — assim o layout já fica pronto e é só soltar o PNG/SVG em /public/img/logos.
 */
function initials(name: string) {
  return name
    .replace(/[·|].*$/, '') // corta o que vem depois de "·"
    .split(/\s+/)
    .filter((w) => w.length > 2 || /^[A-Z0-9]+$/.test(w))
    .slice(0, 2)
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

  if (src) {
    return (
      <img
        src={src}
        alt={`Logo ${name}`}
        loading="lazy"
        decoding="async"
        className={cn('object-contain', box, 'bg-secondary/50 p-1.5', className)}
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
