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
      viewBox="0 0 265 289"
      fill="currentColor"
      role="img"
      aria-label="VYSO"
      className={cn('h-5 w-auto', className)}
    >
      <path d="M0 0L75 2L171 211L138 289Z M192 0L265 2L187 174L151 97Z" />
    </svg>
  )
}
