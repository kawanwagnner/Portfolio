import { cn } from '@/lib/utils'

/**
 * Rótulo de seção editorial (substitui os "eyebrows" com bolinha).
 * Ex.: "01 — Projetos" em monospace, com uma linha antes.
 */
export function Kicker({ children, className }: { children: string; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-3 font-mono-tag text-xs uppercase tracking-[0.2em] text-muted-foreground',
        className
      )}
    >
      <span className="h-px w-8 bg-accent/70" />
      {children}
    </span>
  )
}
