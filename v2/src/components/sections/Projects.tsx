import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/shared/Reveal'
import { Kicker } from '@/components/shared/Kicker'
import { AccentText } from '@/components/shared/AccentText'
import { Mockup } from '@/components/shared/Mockup'
import { ClientLogo } from '@/components/shared/ClientLogo'
import { projects, projectsSection, type Project } from '@/data/content'
import { cn } from '@/lib/utils'

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link
      to={`/projetos/${project.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition duration-300 hover:-translate-y-1.5 hover:border-accent/40"
    >
      <span className="absolute left-5 top-4 z-10 font-mono-tag text-xs text-muted-foreground">
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* palco do mockup */}
      <div className="relative overflow-hidden px-6 pb-2 pt-12">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(70% 60% at 50% 0%, hsl(239 84% 67% / 0.14), transparent 70%)',
          }}
        />
        <div className="relative mx-auto transition duration-500 group-hover:-translate-y-1 group-hover:scale-[1.02]">
          <Mockup
            variant={project.mockup ?? 'browser'}
            src={project.cover}
            alt={project.title}
            url={project.live?.replace(/^https?:\/\//, '').replace(/\/$/, '')}
            fallbackLabel={project.client}
            className={cn('mx-auto', project.mockup === 'phone' && 'max-w-[9rem]')}
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center gap-3">
          <ClientLogo name={project.client} src={project.logo} size="sm" />
          <div className="min-w-0">
            <h3 className="truncate font-display text-lg font-bold sm:text-xl">{project.title}</h3>
            <p className="truncate font-mono-tag text-[0.7rem] uppercase tracking-wider text-muted-foreground">
              {project.client}
            </p>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">{project.summary}</p>

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

        <span className="link-underline mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-accent">
          {projectsSection.ctaLabel}
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>

      <div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: '0 0 50px -12px hsl(239 84% 67% / 0.5)' }}
      />
    </Link>
  )
}

/**
 * Projetos filtrados por plataforma em abas: Todos · Desktop/Web · Mobile.
 * O que define a aba é o campo `mockup` do projeto.
 * O índice do card (01, 02…) é o global do content.ts — não muda com o filtro.
 */
const TABS = [
  { key: 'all', label: 'Todos', short: 'Todos', match: () => true },
  { key: 'browser', label: 'Desktop / Web', short: 'Web', match: (p: Project) => p.mockup !== 'phone' },
  { key: 'phone', label: 'Mobile', short: 'Mobile', match: (p: Project) => p.mockup === 'phone' },
] as const

export function ProjectGroups() {
  const [active, setActive] = useState<(typeof TABS)[number]['key']>('all')
  const tab = TABS.find((t) => t.key === active)!
  const items = projects.filter(tab.match)

  return (
    <div className="mt-12 flex flex-col gap-10">
      {/* abas */}
      <Reveal>
        {/* Mobile: 3 colunas iguais na largura toda. sm+: pill compacto. */}
        <div
          role="tablist"
          aria-label="Filtrar projetos por plataforma"
          className="grid w-full grid-cols-3 gap-1 rounded-full border border-border bg-card p-1.5 sm:flex sm:w-fit sm:items-center"
        >
          {TABS.map((t) => {
            const count = projects.filter(t.match).length
            const selected = t.key === active
            return (
              <button
                key={t.key}
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(t.key)}
                className={cn(
                  'relative rounded-full px-2 py-2.5 text-center text-xs font-medium transition-colors sm:px-5 sm:py-2 sm:text-sm',
                  selected ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {selected && (
                  <motion.span
                    layoutId="project-tab"
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                    className="absolute inset-0 rounded-full bg-primary"
                  />
                )}
                <span className="relative flex items-center justify-center gap-1.5 whitespace-nowrap sm:gap-2">
                  {/* rótulo curto no celular, completo a partir do sm */}
                  <span className="sm:hidden">{t.short}</span>
                  <span className="hidden sm:inline">{t.label}</span>
                  <span
                    className={cn(
                      'font-mono-tag text-[0.6rem] sm:text-[0.65rem]',
                      selected ? 'opacity-70' : 'opacity-50'
                    )}
                  >
                    {String(count).padStart(2, '0')}
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      </Reveal>

      {/* grid */}
      <motion.div
        layout
        className="mx-auto grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3"
        role="tabpanel"
      >
        <AnimatePresence mode="popLayout">
          {items.map((p, i) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, delay: (i % 3) * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className={cn(active === 'all' && p.featured && 'sm:col-span-2 lg:col-span-1')}
            >
              <ProjectCard project={p} index={projects.indexOf(p)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export function Projects() {
  return (
    <section id="projetos" className="relative mx-auto max-w-6xl px-6 py-28 md:py-36">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-5">
          <Reveal>
            <Kicker>{projectsSection.kicker}</Kicker>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="headline max-w-2xl text-4xl sm:text-5xl md:text-6xl">
              <AccentText>{projectsSection.heading}</AccentText>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <p className="max-w-xs text-sm text-muted-foreground sm:text-right">
            {projectsSection.description}
          </p>
        </Reveal>
      </div>

      <ProjectGroups />
    </section>
  )
}
