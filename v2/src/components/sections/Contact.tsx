import { Instagram, Mail, Github, MessageCircle, ArrowUpRight, type LucideIcon } from 'lucide-react'
import { Reveal } from '@/components/shared/Reveal'
import { Kicker } from '@/components/shared/Kicker'
import { AccentText } from '@/components/shared/AccentText'
import { contact, socials } from '@/data/content'

interface Channel {
  label: string
  value: string
  href: string
  icon: LucideIcon
}

export function Contact() {
  // Canais secundários (o Instagram é o CTA principal à esquerda).
  const channels: Channel[] = [
    { label: 'E-mail', value: contact.email, href: `mailto:${contact.email}`, icon: Mail },
    socials.github && {
      label: 'GitHub',
      value: socials.github.replace(/^https?:\/\//, '').replace(/\/$/, ''),
      href: socials.github,
      icon: Github,
    },
    socials.whatsapp && {
      label: 'WhatsApp',
      value: 'Chamar no WhatsApp',
      href: socials.whatsapp,
      icon: MessageCircle,
    },
  ].filter(Boolean) as Channel[]

  return (
    <section id="contato" className="relative overflow-hidden py-28 md:py-36">
      <div
        aria-hidden
        className="ember-glow pointer-events-none absolute -left-32 bottom-0 -z-10 h-[34rem] w-[34rem]"
      />
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        {/* Manifesto */}
        <div>
          <Reveal>
            <Kicker>{contact.kicker}</Kicker>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="headline mt-6 max-w-xl text-4xl sm:text-5xl md:text-6xl">
              <AccentText>{contact.heading}</AccentText>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
              {contact.description}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <a
              href={socials.instagram}
              target="_blank"
              rel="noreferrer"
              className="btn-ember group mt-9 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold"
            >
              <Instagram className="h-4 w-4" />
              {contact.ctaLabel}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Reveal>
        </div>

        {/* Painel de canais */}
        <Reveal delay={0.1}>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card/60 p-2">
            <span className="pointer-events-none absolute right-5 top-4 font-mono-tag text-[0.7rem] uppercase tracking-widest text-muted-foreground">
              Canais
            </span>
            <ul>
              {channels.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    target={c.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="group relative flex items-center gap-4 overflow-hidden rounded-2xl px-5 py-5 transition-colors"
                  >
                    {/* brasa deslizando no hover */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-accent/12 to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100"
                    />
                    <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-border bg-background/60 text-muted-foreground transition-colors group-hover:border-accent/50 group-hover:text-accent">
                      <c.icon className="h-5 w-5" />
                    </span>
                    <span className="relative min-w-0 flex-1">
                      <span className="block font-mono-tag text-[0.7rem] uppercase tracking-widest text-muted-foreground">
                        {c.label}
                      </span>
                      <span className="block truncate font-display text-base font-semibold transition-colors group-hover:text-accent md:text-lg">
                        {c.value}
                      </span>
                    </span>
                    <ArrowUpRight className="relative h-5 w-5 shrink-0 -translate-x-1 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-accent group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
