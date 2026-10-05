import { Link } from 'react-router-dom'
import { WhatsAppIcon } from '@/components/shared/WhatsAppIcon'
import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Check } from 'lucide-react'
import { Mockup } from '@/components/shared/Mockup'
import { founder, getCaseParts, projects, socials } from '@/data/content'

const ease = [0.22, 1, 0.36, 1] as const

/** O que a VYSO entrega, em linguagem de cliente e não de dev. */
// Curtas de propósito: cada uma cabe numa linha até no celular (390px).
// Frase que quebra em duas linhas desalinha a lista e cansa a leitura.
const OFFER = [
  'Sites e páginas de venda rápidos',
  'Lojas virtuais com Pix, cartão e frete',
  'Sistemas e painéis pra sua operação',
  'Automações que tiram o trabalho manual',
]

/**
 * Os três cases que viram a colagem do herói. Ordem = profundidade: o primeiro
 * fica na frente. Escolhidos por terem print público e serem tipos diferentes
 * de trabalho (loja própria, loja de cliente, catálogo com painel).
 */
const SHOWCASE = ['vyso-loja', 'al-modular', 'kfm-descartaveis']

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

/**
 * Herói da home (era o experimento da /v2, oficializado em 05/10/2026).
 *
 * O da home usa um V de partículas: bonito, mas não diz nada sobre o que se
 * compra aqui. Este troca efeito por prova. Quem é (foto e nome), o que faz
 * (quatro linhas), e ao lado prints reais de projeto no ar. Cada print é um
 * link pro case, então o herói já é a porta de entrada do portfólio.
 */
export function Hero() {
  const showcase = SHOWCASE.map((slug) => projects.find((p) => p.slug === slug)).filter(
    (p): p is (typeof projects)[number] => !!p
  )
  const total = projects.length

  return (
    <section id="hero" className="relative overflow-hidden bg-background pb-16 pt-24 md:pb-24 md:pt-36">
      <div aria-hidden className="ember-glow absolute -right-40 top-10 -z-0 h-[36rem] w-[36rem]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        {/* ── Texto ─────────────────────────────────────────── */}
        <div className="flex flex-col items-start gap-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="flex items-center gap-3 rounded-full border border-border bg-card py-1.5 pl-1.5 pr-4 shadow-sm"
          >
            <img
              src={founder.photo}
              alt={founder.name}
              width={36}
              height={36}
              className="h-9 w-9 rounded-full object-cover"
            />
            <span className="text-sm leading-tight">
              <span className="font-semibold text-foreground">{founder.name}</span>
              <span className="text-muted-foreground"> · fundador da VYSO</span>
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease }}
            className="headline text-[2.1rem] leading-[1.06] sm:text-5xl lg:text-[3.35rem]"
          >
            Eu construo o site, a loja ou o sistema{' '}
            <span className="text-accent">do seu negócio.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease }}
            className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-[1.05rem]"
          >
            Sem agência e sem intermediário. Você fala direto comigo, do primeiro rascunho até o
            projeto no ar, e depois também.
          </motion.p>

          <motion.ul
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease }}
            className="flex flex-col gap-2"
          >
            {OFFER.map((item) => (
              <li key={item} className="flex items-center gap-2.5 whitespace-nowrap text-[0.95rem] text-foreground/85">
                <Check className="h-4 w-4 shrink-0 text-accent" strokeWidth={2.75} />
                {item}
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24, ease }}
            className="flex w-full flex-col items-stretch gap-3 pt-1 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center"
          >
            <a
              href={socials.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="btn-ember group inline-flex justify-center items-center gap-2 rounded-full px-7 py-3.5 text-[0.95rem] font-semibold"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Pedir orçamento no WhatsApp
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <button
              type="button"
              onClick={() => scrollTo('projetos')}
              className="inline-flex justify-center items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-[0.95rem] font-semibold text-foreground transition-colors hover:border-accent/50"
            >
              Ver {total} projetos
              <ArrowDown className="h-4 w-4" />
            </button>
          </motion.div>
        </div>

        {/* ── Prova: prints reais, cada um abre o case ─────────── */}
        {/* order-first: no celular a prova vem antes do texto, que é a ordem de
            leitura (vê o trabalho, depois lê quem fez). No lg volta pra direita. */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease }}
          className="relative order-first mx-auto w-full max-w-xl lg:order-none lg:max-w-none"
        >
          <div className="relative sm:aspect-[5/4]">
            {showcase.map((p, i) => {
              const lead = getCaseParts(p)[0]
              // trás pra frente: o primeiro do SHOWCASE fica por cima
              // No celular só o primeiro, grande: três prints em 340px viravam
              // um amontoado com etiqueta cortada. A colagem é do sm pra cima.
              const layer = [
                'relative block w-full sm:absolute sm:left-0 sm:top-[18%] sm:z-30 sm:w-[78%]',
                'hidden sm:block absolute right-0 top-0 z-20 w-[62%] opacity-95',
                'hidden sm:block absolute right-[4%] bottom-0 z-10 w-[56%] opacity-90',
              ][i]
              return (
                <Link
                  key={p.slug}
                  to={`/projetos/${p.slug}`}
                  aria-label={`Ver o case ${p.title}`}
                  className={`group ${layer} transition duration-500 hover:z-40 hover:-translate-y-1.5`}
                >
                  <div className="rounded-xl shadow-[0_24px_60px_-24px_hsl(232_40%_20%/0.45)]">
                    <Mockup
                      variant="browser"
                      src={lead.cover}
                      alt={`Tela do projeto ${p.title}`}
                      url={lead.live?.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                      fallbackLabel={p.client}
                      fallbackLogo={p.logo}
                      priority={i === 0}
                    />
                  </div>
                  <span className="absolute -bottom-3 left-4 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-foreground shadow-sm transition-colors group-hover:border-accent/50 group-hover:text-accent">
                    {p.title}
                  </span>
                </Link>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
