import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/shared/Reveal'
import { Kicker } from '@/components/shared/Kicker'
import { AccentText } from '@/components/shared/AccentText'
import { Mockup } from '@/components/shared/Mockup'
import { ClientLogo } from '@/components/shared/ClientLogo'
import {
  projects,
  projectsSection,
  getCaseParts,
  type Project,
  type CasePart,
} from '@/data/content'
import { cn } from '@/lib/utils'

/**
 * Card de projeto.
 *
 * Sem `part` → card do projeto (nos filtros de plataforma, o card do sistema
 * que casa com o filtro). Com `part` → o card mostra aquele sistema específico
 * e o link já abre o case na aba dele.
 */
export function ProjectCard({
  project,
  part,
  index,
}: {
  project: Project
  part?: CasePart
  index: number
}) {
  const parts = getCaseParts(project)
  const lead = part ?? parts[0]

  const title = part ? part.title : project.title
  const summary = part ? part.summary ?? part.intro : project.summary
  const mockup = part ? part.mockup : project.mockup ?? lead.mockup
  const cover = part ? part.cover : project.cover ?? lead.cover
  const live = part ? part.live : project.live ?? lead.live
  // aba direto na URL: /projetos/al-modular?sistema=app
  const href = part?.slug
    ? `/projetos/${project.slug}?sistema=${part.slug}`
    : `/projetos/${project.slug}`

  return (
    <Link
      to={href}
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
            variant={mockup ?? 'browser'}
            src={cover}
            alt={title}
            url={live?.replace(/^https?:\/\//, '').replace(/\/$/, '')}
            fallbackLabel={project.client}
            fallbackLogo={project.logo}
            className={cn('mx-auto', mockup === 'phone' && 'max-w-[9rem]')}
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center gap-3">
          <ClientLogo name={project.client} src={project.logo} size="sm" />
          <div className="min-w-0">
            {/* sem truncate: título curto demais pra caber numa linha só no card */}
            <h3 className="font-display text-lg font-bold leading-tight sm:text-xl">{title}</h3>
            <p className="truncate font-mono-tag text-[0.7rem] uppercase tracking-wider text-muted-foreground">
              {project.client}
            </p>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">{summary}</p>

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

        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <span className="link-underline inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
            {projectsSection.ctaLabel}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
          {/* só no card unificado: avisa que o case tem mais de um sistema */}
          {!part && parts.length > 1 && (
            <span className="font-mono-tag text-[0.65rem] uppercase tracking-wider text-muted-foreground">
              {parts.length} sistemas
            </span>
          )}
        </div>
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
 *
 * O filtro olha as PARTES, não o projeto: a AL Modular tem um site (web) e um
 * app (mobile) no mesmo case — em "Todos" ela é um card só (com as abas lá
 * dentro), mas em Mobile aparece o app sozinho, e em Desktop/Web o site sozinho.
 * Clicar num card de sistema já abre o case na aba dele.
 *
 * O índice do card (01, 02…) é o global do content.ts — não muda com o filtro.
 */
type Entry = { project: Project; part?: CasePart }

const PLATFORM = {
  browser: (p: CasePart) => p.mockup !== 'phone',
  phone: (p: CasePart) => p.mockup === 'phone',
} as const

const TABS = [
  { key: 'all', label: 'Todos', short: 'Todos' },
  { key: 'browser', label: 'Desktop / Web', short: 'Web' },
  { key: 'phone', label: 'Mobile', short: 'Mobile' },
] as const

function entriesFor(tab: (typeof TABS)[number]['key']): Entry[] {
  if (tab === 'all') return projects.map((project) => ({ project }))

  const matches = PLATFORM[tab]
  return projects.flatMap((project) => {
    const parts = getCaseParts(project)
    const hits = parts.filter(matches)
    if (hits.length === 0) return []
    // Projeto de sistema único: card normal. Vários sistemas: um card por parte.
    if (parts.length === 1) return [{ project }]
    return hits.map((part) => ({ project, part }))
  })
}

export function ProjectGroups() {
  const [active, setActive] = useState<(typeof TABS)[number]['key']>('browser')
  const items = entriesFor(active)

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
            const count = entriesFor(t.key).length
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
          {items.map(({ project, part }, i) => (
            <motion.div
              key={part ? `${project.slug}:${part.slug ?? part.title}` : project.slug}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, delay: (i % 3) * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className={cn(active === 'all' && project.featured && 'sm:col-span-2 lg:col-span-1')}
            >
              <ProjectCard project={project} part={part} index={projects.indexOf(project)} />
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
