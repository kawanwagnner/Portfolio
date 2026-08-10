import { ArrowUpRight, Check, Sparkles } from 'lucide-react'
import { Reveal } from '@/components/shared/Reveal'
import { Kicker } from '@/components/shared/Kicker'
import { AccentText } from '@/components/shared/AccentText'
import { Mockup } from '@/components/shared/Mockup'
import { products, productsSection, type Product, type ProductPlan } from '@/data/content'
import { cn } from '@/lib/utils'

function PlanCard({ plan }: { plan: ProductPlan }) {
  return (
    <div
      className={cn(
        'relative flex h-full flex-col gap-5 rounded-2xl border p-6',
        plan.featured
          ? 'border-accent/40 bg-accent/[0.06]'
          : 'border-border bg-card'
      )}
    >
      {plan.featured && (
        <span className="absolute -top-2.5 left-6 rounded-full bg-accent px-2.5 py-0.5 font-mono-tag text-[0.6rem] uppercase tracking-[0.18em] text-background">
          Mais escolhido
        </span>
      )}

      <div className="flex flex-col gap-1">
        <span className="font-display text-lg font-bold">{plan.name}</span>
        <span className="flex items-baseline gap-1.5">
          <span className="font-display text-3xl font-bold">{plan.price}</span>
          {plan.period && (
            <span className="text-xs text-muted-foreground">{plan.period}</span>
          )}
        </span>
      </div>

      <ul className="flex flex-col gap-2.5">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {plan.description && (
        <p className="mt-auto border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
          {plan.description}
        </p>
      )}
    </div>
  )
}

function ProductBlock({ product }: { product: Product }) {
  return (
    <div className="mt-14 flex flex-col gap-12">
      {/* promessa + mockup */}
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="flex flex-col items-start gap-6">
          {product.badge && (
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/[0.08] px-3.5 py-1.5 font-mono-tag text-[0.65rem] uppercase tracking-[0.16em] text-accent">
                <Sparkles className="h-3.5 w-3.5" />
                {product.badge}
              </span>
            </Reveal>
          )}

          <Reveal delay={0.05}>
            <div className="flex flex-col gap-3">
              <span className="font-mono-tag text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {product.name}
              </span>
              <h3 className="headline text-3xl sm:text-4xl md:text-5xl">
                <AccentText>{product.tagline}</AccentText>
              </h3>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground">
              {product.summary}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <a
              href={product.cta.href}
              target="_blank"
              rel="noreferrer"
              className="btn-ember group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-all"
            >
              {product.cta.label}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <Mockup
            variant="browser"
            src={product.cover}
            alt={`Tela do ${product.name}`}
            url="vyso.app"
            fallbackLabel={product.name}
          />
        </Reveal>
      </div>

      {/* por que vale */}
      <div className="grid gap-6 border-t border-border pt-10 md:grid-cols-3 md:gap-8">
        {product.highlights.map((h, i) => (
          <Reveal key={h.title} delay={i * 0.06}>
            <div className="flex flex-col gap-2">
              <h4 className="font-display text-lg font-bold">{h.title}</h4>
              <p className="text-sm leading-relaxed text-muted-foreground">{h.description}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* planos + pra quem serve */}
      {/* items-start: a coluna dos nichos é curta, centralizar deixava ela boiando */}
      <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-start">
        <Reveal>
          <div className="flex flex-col gap-4">
            <span className="font-mono-tag text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Feito pra quem vende pelo WhatsApp
            </span>
            <div className="flex flex-wrap gap-2">
              {product.audience.map((a) => (
                <span
                  key={a}
                  className="rounded-full border border-border bg-secondary/40 px-3 py-1.5 text-xs text-muted-foreground"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="grid gap-5 sm:grid-cols-2">
            {product.plans.map((p) => (
              <PlanCard key={p.name} plan={p} />
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  )
}

/**
 * Vitrine do produto próprio da VYSO. Hoje é um só (o Catálogo), então o layout
 * é de destaque único — promessa grande, mockup ao lado, planos embaixo. Entrou
 * um segundo produto? Vira grid: o `products.map` já está aqui.
 */
export function Products() {
  return (
    <section id="produtos" className="relative overflow-hidden py-20 md:py-24">
      <div aria-hidden className="ember-glow absolute -left-40 top-24 -z-10 h-[30rem] w-[30rem]" />
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-5">
            <Reveal>
              <Kicker>{productsSection.kicker}</Kicker>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="headline max-w-2xl text-4xl sm:text-5xl md:text-6xl">
                <AccentText>{productsSection.heading}</AccentText>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-sm text-muted-foreground sm:text-right">
              {productsSection.description}
            </p>
          </Reveal>
        </div>

        {products.map((p) => (
          <ProductBlock key={p.slug} product={p} />
        ))}
      </div>
    </section>
  )
}
