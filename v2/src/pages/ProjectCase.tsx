import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react'
import { Reveal } from '@/components/shared/Reveal'
import { Kicker } from '@/components/shared/Kicker'
import { Mockup } from '@/components/shared/Mockup'
import { ClientLogo } from '@/components/shared/ClientLogo'
import { ProjectCard } from '@/components/sections/Projects'
import { getProject, getCaseParts, projects, contact } from '@/data/content'
import { cn } from '@/lib/utils'

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-l border-border pl-4">
      <span className="font-mono-tag text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  )
}

/** Bloco editorial: título à esquerda, texto à direita. */
function Block({ label, title, paragraphs }: { label: string; title: string; paragraphs: string[] }) {
  return (
    <Reveal className="grid gap-6 border-t border-border py-12 md:grid-cols-[16rem_1fr] md:gap-12">
      <div className="flex flex-col gap-2">
        <Kicker>{label}</Kicker>
        <h3 className="font-display text-2xl font-bold tracking-tight">{title}</h3>
      </div>
      <div className="flex flex-col gap-4">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-base leading-relaxed text-muted-foreground md:text-lg">
            {p}
          </p>
        ))}
      </div>
    </Reveal>
  )
}

export default function ProjectCase() {
  const { slug } = useParams()
  const project = getProject(slug)
  const [activePart, setActivePart] = useState(0)

  // trocar de projeto volta pra primeira aba
  useEffect(() => setActivePart(0), [slug])

  if (!project) return <Navigate to="/projetos" replace />

  const parts = getCaseParts(project)
  const part = parts[activePart] ?? parts[0]
  const multi = parts.length > 1

  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 3)
  const liveLabel = part.live?.replace(/^https?:\/\//, '').replace(/\/$/, '')

  return (
    <article className="pb-24 pt-32 md:pt-40">
      {/* ── Cabeçalho ─────────────────────────────────────────── */}
      <header className="mx-auto max-w-6xl px-6">
        <Link
          to="/projetos"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Todos os projetos
        </Link>

        <Reveal className="mt-10 flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <ClientLogo name={project.client} src={project.logo} size="lg" />
            <div>
              <p className="font-mono-tag text-xs uppercase tracking-[0.2em] text-accent">
                {part.category}
              </p>
              <p className="text-sm text-muted-foreground">{project.client}</p>
            </div>
          </div>

          <h1 className="headline max-w-3xl text-4xl sm:text-5xl md:text-6xl">{project.title}</h1>

          {/* Cliente com mais de um sistema: uma aba por sistema. */}
          {multi && (
            /* Mobile: abas empilhadas na largura toda (os nomes dos sistemas são
               longos e não cabem lado a lado). sm+: pill em linha. */
            <div
              role="tablist"
              aria-label="Sistemas deste cliente"
              className="flex w-full flex-col gap-1 rounded-3xl border border-border bg-card p-1.5 sm:w-fit sm:flex-row sm:items-center sm:rounded-full"
            >
              {parts.map((p, i) => {
                const selected = i === activePart
                return (
                  <button
                    key={p.title}
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActivePart(i)}
                    className={cn(
                      'relative rounded-full px-4 py-2.5 text-sm font-medium transition-colors sm:px-5 sm:py-2',
                      selected
                        ? 'text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {selected && (
                      <motion.span
                        layoutId="case-part-tab"
                        transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                        className="absolute inset-0 rounded-full bg-primary"
                      />
                    )}
                    <span className="relative block whitespace-nowrap text-left sm:text-center">
                      {p.title}
                    </span>
                  </button>
                )
              })}
            </div>
          )}

          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">{part.intro}</p>

          <div className="flex flex-wrap items-center gap-3">
            {part.live && (
              <a
                href={part.live}
                target="_blank"
                rel="noreferrer"
                className="btn-ember inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
              >
                Ver no ar <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
            {part.repo && (
              <a
                href={part.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
              >
                <Github className="h-4 w-4" /> Código
              </a>
            )}
          </div>
        </Reveal>

        {/* metadados */}
        <Reveal delay={0.05} className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
          <Meta label="Cliente" value={project.client} />
          <Meta label="Ano" value={project.year} />
          <Meta label="Serviços" value={part.services.join(', ')} />
          <Meta label="Stack" value={part.stack.join(', ')} />
        </Reveal>
      </header>

      {/* Tudo abaixo depende da aba: a key faz o conteúdo re-animar na troca. */}
      <div key={part.title}>
        {/* ── Banner ──────────────────────────────────────────── */}
        <Reveal delay={0.1} className="relative mt-16 px-6">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-2/3"
            style={{
              backgroundImage:
                'radial-gradient(50% 60% at 50% 40%, hsl(239 84% 67% / 0.16), transparent 70%)',
            }}
          />
          <div className="relative mx-auto max-w-5xl">
            <Mockup
              variant={part.mockup ?? 'browser'}
              src={part.cover}
              alt={`${part.title} — visão geral`}
              url={liveLabel}
              fallbackLabel={project.client}
              fallbackLogo={project.logo}
              priority
              className={part.mockup === 'phone' ? 'max-w-[18rem]' : undefined}
            />
          </div>
        </Reveal>

        {/* ── O case ──────────────────────────────────────────── */}
        <section className="mx-auto mt-24 max-w-6xl px-6">
          <Reveal>
            <Kicker>{multi ? part.title : 'O case'}</Kicker>
          </Reveal>

          <div className="mt-8">
            <Block label="Objetivo" title="O que a gente foi resolver" paragraphs={part.objective} />
            <Block label="Desafio" title="O que estava no caminho" paragraphs={part.challenge} />
            <Block label="Solução" title="Como foi resolvido" paragraphs={part.solution} />
          </div>

          {part.highlights && part.highlights.length > 0 && (
            <Reveal className="grid gap-6 border-t border-border py-12 md:grid-cols-[16rem_1fr] md:gap-12">
              <div className="flex flex-col gap-2">
                <Kicker>Destaques</Kicker>
                <h3 className="font-display text-2xl font-bold tracking-tight">O que ele faz</h3>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {part.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex gap-3 rounded-2xl border border-border bg-card p-4 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {h}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </section>

        {/* ── Resultados ──────────────────────────────────────── */}
        {part.results.length > 0 && (
          <section className="mx-auto mt-12 max-w-6xl px-6">
            <Reveal>
              <h2 className="headline text-3xl sm:text-4xl md:text-5xl">Resultados que ficam</h2>
            </Reveal>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {part.results.map((r, i) => (
                <Reveal key={r.label} delay={i * 0.08}>
                  <div className="flex h-full flex-col gap-2 rounded-3xl border border-border bg-card p-8">
                    <span className="font-display text-4xl font-bold tracking-tight text-accent md:text-5xl">
                      {r.value}
                    </span>
                    <span className="text-sm leading-relaxed text-muted-foreground">{r.label}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* ── Processo ────────────────────────────────────────── */}
        <section className="mx-auto mt-24 max-w-6xl px-6">
          <Reveal>
            <Kicker>Processo</Kicker>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="headline mt-4 max-w-2xl text-3xl sm:text-4xl md:text-5xl">
              Como o projeto andou
            </h2>
          </Reveal>

          <ol className="mt-12 flex flex-col">
            {part.process.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.06}>
                <li className="grid gap-4 border-t border-border py-8 md:grid-cols-[6rem_16rem_1fr] md:gap-8">
                  <span className="font-mono-tag text-sm text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-xl font-bold tracking-tight">{step.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{step.description}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* ── Galeria (opcional) ──────────────────────────────── */}
        {part.gallery && part.gallery.length > 0 && (
          <section className="mx-auto mt-24 max-w-6xl px-6">
            <Reveal>
              <Kicker>Telas</Kicker>
            </Reveal>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {part.gallery.map((img, i) => (
                <Reveal key={img} delay={(i % 2) * 0.08}>
                  <Mockup
                    variant={part.mockup ?? 'browser'}
                    src={img}
                    alt={`${part.title} — tela ${i + 1}`}
                    url={liveLabel}
                  />
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* ── Stack ───────────────────────────────────────────── */}
        <section className="mx-auto mt-24 max-w-6xl px-6">
          <Reveal>
            <Kicker>Tecnologias</Kicker>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="mt-6 flex flex-wrap gap-3">
              {part.stack.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </section>
      </div>

      {/* ── Outros projetos ───────────────────────────────────── */}
      <section className="mx-auto mt-28 max-w-6xl px-6">
        <Reveal>
          <h2 className="headline text-3xl sm:text-4xl">Conheça outros projetos</h2>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <ProjectCard project={p} index={projects.indexOf(p)} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="mx-auto mt-28 max-w-6xl px-6">
        <Reveal>
          <div className="flex flex-col items-center gap-6 rounded-3xl border border-border bg-card px-6 py-16 text-center">
            <h2 className="headline max-w-xl text-3xl sm:text-4xl">
              Tem um projeto parecido? Bora tirar do papel.
            </h2>
            <p className="max-w-md text-muted-foreground">{contact.description}</p>
            <Link
              to="/#contato"
              className="btn-ember inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
            >
              Falar com a VYSO <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </article>
  )
}
