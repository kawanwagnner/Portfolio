import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { WhatsAppIcon } from '@/components/shared/WhatsAppIcon'
import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Check, ChevronRight, ExternalLink } from 'lucide-react'
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
 * Prints do herói no celular: carrossel de arrastar, um card por projeto, com
 * o endereço do site e o ícone de abrir no topo e a seta pro próximo. Segue a
 * referência que o Kawan mandou em 05/10/2026. Do sm pra cima vale a colagem.
 */
function MobileShowcase({ items }: { items: (typeof projects)[number][] }) {
  const track = useRef<HTMLDivElement>(null)
  const [atEnd, setAtEnd] = useState(false)

  useEffect(() => {
    const el = track.current
    if (!el) return
    const update = () => setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8)
    update()
    el.addEventListener('scroll', update, { passive: true })
    return () => el.removeEventListener('scroll', update)
  }, [])

  const next = () => {
    const el = track.current
    const card = el?.firstElementChild as HTMLElement | null
    if (el && card) el.scrollBy({ left: card.offsetWidth + 12, behavior: 'smooth' })
  }

  return (
    <div className="relative -mx-6 sm:hidden">
      <div ref={track} className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-6 px-6 pb-3">
        {items.map((p, i) => {
          const lead = getCaseParts(p)[0]
          const url = lead.live?.replace(/^https?:\/\//, '').replace(/\/$/, '') ?? p.title
          return (
            <Link
              key={p.slug}
              to={`/projetos/${p.slug}`}
              aria-label={`Ver o case ${p.title}`}
              className="w-[84%] shrink-0 snap-start overflow-hidden rounded-2xl border border-border bg-card shadow-[0_18px_40px_-24px_hsl(232_40%_20%/0.45)]"
            >
              <span className="flex items-center justify-between gap-3 px-4 py-2.5">
                <span className="truncate text-sm text-muted-foreground">{url}</span>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border bg-background text-muted-foreground">
                  <ExternalLink className="h-3.5 w-3.5" />
                </span>
              </span>
              <span className="block aspect-[16/10] overflow-hidden bg-secondary">
                {lead.cover && (
                  <img
                    src={lead.cover}
                    alt={`Tela do projeto ${p.title}`}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    className="h-full w-full object-cover object-top"
                  />
                )}
              </span>
            </Link>
          )
        })}
      </div>
      {!atEnd && (
        <button
          type="button"
          onClick={next}
          aria-label="Próximo projeto"
          className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-border bg-card text-foreground shadow-lg"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}
    </div>
  )
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
    <section id="hero" className="relative overflow-hidden bg-background pb-8 pt-[7.5rem] sm:pb-16 md:pb-24 md:pt-36">
      <div aria-hidden className="ember-glow absolute -right-40 top-10 -z-0 h-[36rem] w-[36rem]" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        {/* ── Texto ─────────────────────────────────────────── */}
        <div className="flex min-w-0 flex-col items-start gap-5 sm:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            // só do sm pra cima; no celular o fundador vai pra linha de baixo dos botões
            className="hidden items-center gap-3 rounded-full border border-border bg-card py-1.5 pl-1.5 pr-4 shadow-sm sm:flex"
          >
            <img
              src={founder.photo}
              alt={founder.name}
              width={36}
              height={36}
              className="h-8 w-8 rounded-full object-cover sm:h-9 sm:w-9"
            />
            <span className="whitespace-nowrap text-[13px] leading-tight sm:text-sm">
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
            className="flex flex-col gap-2.5"
          >
            {OFFER.map((item) => (
              <li key={item} className="flex items-center gap-3 whitespace-nowrap text-[0.95rem] text-foreground/95 max-[359px]:text-[0.85rem]">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24, ease }}
            className="flex w-full flex-col items-stretch gap-2.5 sm:w-auto sm:gap-3 sm:pt-1 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <a
              href={socials.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="btn-ember group inline-flex justify-center items-center gap-2 rounded-full px-7 py-3 text-[0.9rem] font-semibold whitespace-nowrap sm:py-3.5 sm:text-[0.95rem] max-[359px]:px-4 max-[359px]:text-[0.85rem]"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Pedir orçamento no WhatsApp
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <button
              type="button"
              onClick={() => scrollTo('projetos')}
              className="inline-flex justify-center items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-[0.9rem] font-semibold text-foreground sm:py-3.5 sm:text-[0.95rem] transition-colors hover:border-accent/50"
            >
              Ver {total} projetos
              <ArrowDown className="h-4 w-4" />
            </button>
          </motion.div>

          {/* Celular: o fundador desce pra cá, alinhado à esquerda, no formato da
              referência (fotos sobrepostas, duas linhas e o rabisco). No lugar das
              três pessoas e do "+50 negócios", só o que é verdade: a foto do Kawan,
              a logo de dois clientes e os 15+ projetos em produção. */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            className="flex items-center gap-3 text-left sm:hidden"
          >
            {/* Logos dos clientes atrás, foto do Kawan na frente. A logo vai INTEIRA
                dentro do círculo (contain) sobre a cor de fundo dela: cortada pelo
                círculo e pela sobreposição, o "KFM" virava "KFI". */}
            <span className="flex shrink-0 -space-x-2.5">
              {[
                // KFM encostada à esquerda (o "KFM" é largo, centrado o "M" some)
                { src: '/img/logos/kfm.webp', bg: '#fd8ede', centro: false },
                // V centralizado: a foto cobre um pouco da borda, mas o V fica no meio
                { src: '/img/logos/vyso-loja.webp', bg: '#000000', centro: true },
              ].map((l, k) => (
                <span
                  key={l.src}
                  className={`flex h-10 w-10 items-center overflow-hidden rounded-full ring-2 ring-background ${l.centro ? 'justify-center' : 'justify-start pl-[5px]'}`}
                  style={{ backgroundColor: l.bg, zIndex: k + 1 }}
                >
                  {/* encostada à esquerda: os 10px da direita ficam sob o círculo seguinte */}
                  <img src={l.src} alt="" width={24} height={24} className="h-6 w-6 object-contain" />
                </span>
              ))}
              <img
                src={founder.photo}
                alt=""
                width={40}
                height={40}
                className="relative h-10 w-10 rounded-full object-cover ring-2 ring-background"
                style={{ zIndex: 3 }}
              />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-sm font-semibold text-foreground">
                {founder.name} <span className="font-normal text-muted-foreground">· fundador</span>
              </span>
              <span className="block truncate text-xs text-muted-foreground">
                {/* mesmo número da seção Sobre (about.stats: 15+ projetos no ar) */}
                +15 projetos em produção
              </span>
            </span>
            {/* Rabisco de destaque, como na referência: três traços saindo em leque
                de um ponto no canto do texto, na diagonal pra cima e pra direita,
                feito uma aspa. Encostado no canto superior direito do texto. */}
            <svg viewBox="0 0 28 28" aria-hidden className="-ml-2.5 -mt-4 h-6 w-6 shrink-0 self-start text-accent">
              <path d="M4.1 18.3L7.2 6.7 M7.9 20.6L16.9 12.6 M9.9 24.6L20.7 22.7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
          </motion.div>
        </div>

        {/* ── Prova: prints reais, cada um abre o case ─────────── */}
        {/* Celular: carrossel de prints depois do texto (MobileShowcase).
            sm pra cima: a colagem de três prints, à direita no lg. */}
        <MobileShowcase items={showcase} />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease }}
          className="relative mx-auto hidden w-full max-w-xl sm:block lg:max-w-none"
        >
          <div className="relative aspect-[5/4]">
            {showcase.map((p, i) => {
              const lead = getCaseParts(p)[0]
              // trás pra frente: o primeiro do SHOWCASE fica por cima
              const layer = [
                'absolute left-0 top-[18%] z-30 w-[78%]',
                'absolute right-0 top-0 z-20 w-[62%] opacity-95',
                'absolute right-[4%] bottom-0 z-10 w-[56%] opacity-90',
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
                  <span className={`absolute -bottom-3 left-4 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-foreground shadow-sm transition-colors group-hover:border-accent/50 group-hover:text-accent`}>
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
