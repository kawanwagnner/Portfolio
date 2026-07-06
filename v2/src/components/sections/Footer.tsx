import { Instagram, Github, Mail } from 'lucide-react'
import { brand, socials, nav } from '@/data/content'

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-10 md:flex-row md:justify-between">
        <div className="flex items-center gap-2 font-display font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-sm text-primary-foreground">
            {brand.logo}
          </span>
          {brand.name}
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
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
        © {new Date().getFullYear()} {brand.name} · Software House. Feito com React, TypeScript & Tailwind.
      </div>
    </footer>
  )
}
