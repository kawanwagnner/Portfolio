import { Instagram, Mail, Github, MessageCircle, ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/shared/Reveal'
import { Kicker } from '@/components/shared/Kicker'
import { AccentText } from '@/components/shared/AccentText'
import { contact, socials } from '@/data/content'

export function Contact() {
  return (
    <section id="contato" className="relative mx-auto max-w-6xl px-6 py-28 md:py-36">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-card px-6 py-20 md:px-16 md:py-28">
          <div
            aria-hidden
            className="ember-glow absolute left-1/2 top-0 -z-10 h-[26rem] w-[42rem] -translate-x-1/2"
          />
          <div aria-hidden className="absolute inset-0 -z-10 bg-grid opacity-30" />

          <div className="flex flex-col items-center text-center">
            <Kicker>{contact.kicker}</Kicker>
            <h2 className="headline mt-6 max-w-3xl text-4xl sm:text-6xl md:text-7xl">
              <AccentText>{contact.heading}</AccentText>
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-base text-muted-foreground md:text-lg">
              {contact.description}
            </p>

            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
              <a
                href={socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="btn-ember group inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold sm:w-auto"
              >
                <Instagram className="h-4 w-4" />
                {contact.ctaLabel}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-secondary/40 px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-accent/60 hover:text-accent sm:w-auto"
              >
                <Mail className="h-4 w-4" />
                Enviar e-mail
              </a>
            </div>

            <div className="mt-9 flex items-center justify-center gap-3">
              {socials.github && (
                <a href={socials.github} target="_blank" rel="noreferrer" aria-label="GitHub"
                  className="grid h-11 w-11 place-items-center rounded-full border border-border bg-background/50 text-muted-foreground transition-colors hover:text-accent">
                  <Github className="h-4 w-4" />
                </a>
              )}
              {socials.whatsapp && (
                <a href={socials.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp"
                  className="grid h-11 w-11 place-items-center rounded-full border border-border bg-background/50 text-muted-foreground transition-colors hover:text-accent">
                  <MessageCircle className="h-4 w-4" />
                </a>
              )}
              <a href={`mailto:${contact.email}`} aria-label="E-mail"
                className="grid h-11 w-11 place-items-center rounded-full border border-border bg-background/50 text-muted-foreground transition-colors hover:text-accent">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
