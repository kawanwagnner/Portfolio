import * as Icons from 'lucide-react'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/shared/Reveal'
import { Kicker } from '@/components/shared/Kicker'
import { AccentText } from '@/components/shared/AccentText'
import { services, type Service } from '@/data/content'

function ServiceIcon({ name }: { name: string }) {
  const Icon = (Icons as any)[name] ?? Icons.Sparkles
  return <Icon className="h-5 w-5" />
}

function ServiceRow({ service, index }: { service: Service; index: number }) {
  return (
    <Reveal delay={index * 0.06}>
      <div className="group relative overflow-hidden border-b border-border">
        {/* brasa deslizando no hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-accent/12 via-accent/5 to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100"
        />

        <div className="relative grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-2 py-7 md:grid-cols-[4rem_1.1fr_1.4fr_auto] md:gap-x-8 md:py-9">
          {/* índice */}
          <span className="font-mono-tag text-sm text-muted-foreground transition-colors group-hover:text-accent">
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* título + ícone inline */}
          <h3 className="flex items-center gap-3 font-display text-2xl font-bold transition-transform duration-300 group-hover:translate-x-1.5 md:text-4xl">
            <span className="text-muted-foreground transition-colors group-hover:text-accent">
              <ServiceIcon name={service.icon} />
            </span>
            <span className="transition-colors group-hover:text-accent">{service.title}</span>
          </h3>

          {/* descrição */}
          <p className="col-span-3 text-sm leading-relaxed text-muted-foreground md:col-span-1 md:max-w-md md:text-base">
            {service.description}
          </p>

          {/* seta */}
          <ArrowUpRight className="hidden h-6 w-6 shrink-0 -translate-x-2 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-accent group-hover:opacity-100 md:block" />
        </div>
      </div>
    </Reveal>
  )
}

export function Services() {
  return (
    <section id="servicos" className="relative overflow-hidden py-28 md:py-36">
      <div aria-hidden className="ember-glow absolute -right-40 top-16 -z-10 h-[30rem] w-[30rem]" />
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-5">
          <Reveal>
            <Kicker>04 — Serviços</Kicker>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="headline max-w-3xl text-4xl sm:text-5xl md:text-6xl">
              <AccentText>Qualidade de agência, *agilidade de freela*.</AccentText>
            </h2>
          </Reveal>
        </div>

        {/* Lista editorial (não mais quadrados) */}
        <div className="mt-14 border-t border-border">
          {services.map((s, i) => (
            <ServiceRow key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
