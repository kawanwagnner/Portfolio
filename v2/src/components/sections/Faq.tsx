import { useState } from 'react'
import { WhatsAppIcon } from '@/components/shared/WhatsAppIcon'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { Reveal } from '@/components/shared/Reveal'
import { Kicker } from '@/components/shared/Kicker'
import { AccentText } from '@/components/shared/AccentText'
import { faq, faqSection, socials, type FaqItem } from '@/data/content'
import { cn } from '@/lib/utils'

/** FAQPage em JSON-LD: o Google pode mostrar as perguntas direto no resultado. */
function FaqJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: [...f.answer, ...(f.bullets ?? [])].join(' '),
      },
    })),
  }
  return <script type="application/ld+json">{JSON.stringify(data)}</script>
}

function Row({ item, open, onToggle, id }: { item: FaqItem; open: boolean; onToggle: () => void; id: string }) {
  return (
    <div className="border-b border-border">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={id}
          className="group flex w-full items-center justify-between gap-6 py-6 text-left"
        >
          <span
            className={cn(
              'font-display text-lg font-bold transition-colors md:text-xl',
              open ? 'text-accent' : 'text-foreground group-hover:text-accent'
            )}
          >
            {item.question}
          </span>
          <span
            className={cn(
              'grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-300',
              open ? 'rotate-45 border-accent bg-accent text-accent-foreground' : 'border-border text-muted-foreground'
            )}
          >
            <Plus className="h-4 w-4" />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="flex max-w-2xl flex-col gap-3 pb-7 text-[0.97rem] leading-relaxed text-muted-foreground">
              <p>{item.answer[0]}</p>
              {item.bullets && (
                <ul className="flex flex-col gap-1.5 pl-1">
                  {item.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <span className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
              {item.answer.slice(1).map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * Perguntas frequentes, no lugar da antiga seção de serviços.
 * A primeira já abre: é a que diz o que a VYSO faz, e quem rolou até aqui
 * precisa ver isso sem clicar. As outras ficam fechadas pra seção caber
 * numa tela.
 */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="duvidas" className="relative overflow-hidden py-20 md:py-24">
      <FaqJsonLd />
      <div aria-hidden className="ember-glow absolute -right-40 top-16 -z-10 h-[30rem] w-[30rem]" />
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="flex flex-col items-start gap-5 lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <Kicker>{faqSection.kicker}</Kicker>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="headline max-w-md text-4xl sm:text-5xl">
              <AccentText>{faqSection.heading}</AccentText>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-muted-foreground">{faqSection.description}</p>
          </Reveal>
          <Reveal delay={0.15} className="self-stretch sm:self-auto">
            <a
              href={socials.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="btn-ember inline-flex w-full justify-center sm:w-auto items-center gap-2 rounded-full px-6 py-4 text-[0.95rem] font-semibold sm:py-3 sm:text-sm"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Tirar uma dúvida no WhatsApp
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <div className="border-t border-border">
            {faq.map((item, i) => (
              <Row
                key={item.question}
                item={item}
                id={`faq-${i}`}
                open={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
