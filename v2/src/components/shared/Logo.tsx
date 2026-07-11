import { LOGO_PATH, LOGO_W, LOGO_H } from '@/lib/brand'
import { cn } from '@/lib/utils'

/**
 * Marca da VYSO — o "V" oficial, vetorizado a partir de public/logo.svg
 * (o arquivo original, um bitmap dentro de SVG, ficou em public/logo-original.svg).
 *
 * Inline e com `fill="currentColor"`: pinta pela cor do texto, sem fundo.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${LOGO_W} ${LOGO_H}`}
      fill="currentColor"
      role="img"
      aria-label="VYSO"
      className={cn('h-5 w-auto', className)}
    >
      <path d={LOGO_PATH} />
    </svg>
  )
}
