import { Link } from 'react-router-dom'
import { Instagram, Github, Mail, MessageCircle } from 'lucide-react'
import { Logo } from '@/components/shared/Logo'
import { brand, socials, nav } from '@/data/content'

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-10 md:flex-row md:justify-between">
        <div className="flex items-center gap-2.5 font-display font-bold">
          <Logo className="h-7 text-accent" />
          {brand.name}
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          {nav.map((item) => (
            <Link
              key={item.href}
              to={`/${item.href}`}
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {socials.whatsapp && (
            <a href={socials.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp"
              className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:text-accent">
              <MessageCircle className="h-4 w-4" />
            </a>
          )}
          <a href={socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"
            className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:text-accent">
            <Instagram className="h-4 w-4" />
          </a>
          {socials.github && (
            <a href={socials.github} target="_blank" rel="noreferrer" aria-label="GitHub"
              className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:text-accent">
              <Github className="h-4 w-4" />
            </a>
          )}
          <a href={`mailto:${socials.email.replace('mailto:', '')}`} aria-label="E-mail"
            className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:text-accent">
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        {brand.name} · CNPJ: 64.561.405/0001-81 · {brand.role}. <br /> © {new Date().getFullYear()} Todos os direitos reservados.
      </div>
    </footer>
  )
}
