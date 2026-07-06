import { ArrowUpRight, Github } from 'lucide-react'
import { Reveal } from '@/components/shared/Reveal'
import { Kicker } from '@/components/shared/Kicker'
import { AccentText } from '@/components/shared/AccentText'
import { projects, type Project } from '@/data/content'
import { cn } from '@/lib/utils'

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition duration-300 hover:-translate-y-1.5 hover:border-accent/40">
      {/* índice editorial */}
      <span className="absolute left-5 top-4 z-10 font-mono-tag text-xs text-muted-foreground">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
      </div>

      <div className="relative -mt-12 flex flex-1 flex-col gap-3 p-6">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-border bg-background/85 px-2.5 py-0.5 font-mono-tag text-[0.7rem] uppercase tracking-wider text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
        <h3 className="font-display text-xl font-bold sm:text-2xl">{project.title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{project.description}</p>

        <div className="mt-auto flex items-center gap-4 pt-2">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="link-underline inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
            >
              Ver projeto <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              aria-label="Repositório"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>

      {/* brilho sutil no hover (só transiciona no hover) */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: '0 0 50px -12px hsl(22 100% 57% / 0.45)' }}
      />
    </article>
  )
}

export function Projects() {
  return (
    <section id="projetos" className="relative mx-auto max-w-6xl px-6 py-28 md:py-36">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-5">
          <Reveal>
            <Kicker>02 — Projetos</Kicker>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="headline max-w-2xl text-4xl sm:text-5xl md:text-6xl">
              <AccentText>Trabalho que *fala por mim*.</AccentText>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <p className="max-w-xs text-sm text-muted-foreground sm:text-right">
            Do conceito ao produto no ar. Uma amostra do que eu construo.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={(i % 3) * 0.08} className={cn(i === 0 && 'sm:col-span-2 lg:col-span-1')}>
            <ProjectCard project={p} index={i} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
