import { ClientLogo } from '@/components/shared/ClientLogo'
import { cn } from '@/lib/utils'

/**
 * Moldura de dispositivo pra apresentar print de projeto.
 * Sem `src`, desenha a logo do cliente sobre um fundo de marca — o layout
 * nunca quebra enquanto os prints não chegam.
 */
type MockupProps = {
  variant?: 'browser' | 'phone'
  src?: string
  alt: string
  /** Aparece na barra de endereço do browser. */
  url?: string
  /** Nome do cliente — vira o rótulo do bloco quando não há print. */
  fallbackLabel?: string
  /** Logo do cliente exibida dentro do mockup quando não há print. */
  fallbackLogo?: string
  className?: string
  priority?: boolean
}

function Placeholder({ label, logo }: { label: string; logo?: string }) {
  return (
    <div className="relative grid h-full w-full place-items-center overflow-hidden bg-secondary/40">
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'radial-gradient(60% 60% at 30% 20%, hsl(239 84% 67% / 0.28), transparent 70%), radial-gradient(50% 50% at 80% 80%, hsl(260 85% 66% / 0.22), transparent 70%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      {/* w-auto + max-w: dentro do mockup de celular a caixa fixa da logo não cabe */}
      <div className="relative flex w-full flex-col items-center gap-3 px-5 text-center">
        <ClientLogo name={label} src={logo} size="md" className="h-auto max-h-14 w-auto max-w-[70%]" />
        <span className="font-mono-tag text-[0.6rem] uppercase leading-relaxed tracking-[0.2em] text-muted-foreground">
          {label}
        </span>
      </div>
    </div>
  )
}

export function Mockup({
  variant = 'browser',
  src,
  alt,
  url,
  fallbackLabel = 'Print em breve',
  fallbackLogo,
  className,
  priority,
}: MockupProps) {
  const screen = src ? (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className="h-full w-full object-cover object-top"
    />
  ) : (
    <Placeholder label={fallbackLabel} logo={fallbackLogo} />
  )

  if (variant === 'phone') {
    return (
      <div className={cn('relative mx-auto w-full max-w-[16rem]', className)}>
        <div className="relative overflow-hidden rounded-[2.2rem] border border-border bg-card p-2 shadow-2xl shadow-black/40">
          <div className="relative aspect-[9/19] overflow-hidden rounded-[1.6rem] bg-background">
            {/* notch */}
            <div className="absolute left-1/2 top-2 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-background/90" />
            {screen}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-black/40',
        className
      )}
    >
      {/* chrome do browser */}
      <div className="flex items-center gap-2 border-b border-border bg-secondary/40 px-3 py-2.5">
        {/* traffic lights do macOS */}
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </span>
        {url && (
          <span className="mx-auto hidden max-w-[60%] truncate rounded-md bg-background/70 px-3 py-1 font-mono-tag text-[0.65rem] text-muted-foreground sm:block">
            {url}
          </span>
        )}
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">{screen}</div>
    </div>
  )
}
