import { Reveal } from './Reveal'
import { Kicker } from './Kicker'
import { AccentText } from './AccentText'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  kicker?: string
  /** Título; use *asteriscos* pra acentuar um trecho. */
  title: string
  description?: string
  className?: string
}

export function SectionHeading({ kicker, title, description, className }: SectionHeadingProps) {
  return (
    <div className={cn('flex flex-col gap-5', className)}>
      {kicker && (
        <Reveal>
          <Kicker>{kicker}</Kicker>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="headline max-w-3xl text-4xl sm:text-5xl md:text-6xl">
          <AccentText>{title}</AccentText>
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  )
}
