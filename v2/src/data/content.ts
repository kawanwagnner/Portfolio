/**
 * ============================================================
 *  CONTEÚDO DO SITE — marca VYSO (software house)
 *  Edite tudo por aqui, Kawan 👇
 * ============================================================
 */

export const brand = {
  name: 'VYSO',
  role: 'Tecnologia com propósito',
  logo: 'V',
}

export const hero = {
  status: 'VYSO · Tecnologia com propósito',
  // A headline é dividida em linhas; a palavra entre *asteriscos* recebe o acento.
  headlineLines: ['Transformamos', 'problemas em', '*soluções* que crescem.'],
  subtitle:
    'Marca especializada em criar soluções digitais, automatizar processos e entregar valor real — do entendimento do problema ao resultado no ar.',
  primaryCta: 'Ver projetos',
  secondaryCta: '@vyso.store',
  splineScene: 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode',
}

// Ticker cinético abaixo do herói.
export const marquee = [
  'Soluções digitais',
  'Automação de processos',
  'Aplicações Web',
  'Sites de alta conversão',
  'Tecnologia com propósito',
  'Landing pages',
  'Entrega que impulsiona',
  'Design com intenção',
]

export const about = {
  kicker: '01 — A VYSO',
  // A palavra entre *asteriscos* recebe o acento.
  heading: 'Antes do código, existe o *negócio*.',
  paragraphs: [
    'A VYSO transforma problemas reais em soluções digitais que impulsionam negócios. Criamos, automatizamos processos e entregamos valor — sem burocracia e sem intermediário: você fala direto com quem constrói.',
    'Tecnologia com propósito, design com intenção. Do entendimento do problema ao resultado no ar, cada etapa foca em resolver e gerar crescimento. // TODO: ajuste com a visão da VYSO.',
  ],
  stats: [
    { value: '15+', label: 'Projetos no ar' },
    { value: '3+', label: 'Anos codando' },
    { value: '100%', label: 'Foco no resultado' },
  ],
}

export const skills: string[] = [
  'React',
  'TypeScript',
  'Node.js',
  'Next.js',
  'Tailwind CSS',
  'JavaScript',
  'HTML5',
  'Git',
]

export interface Project {
  title: string
  description: string
  image: string
  tags: string[]
  live?: string
  repo?: string
}

export const projects: Project[] = [
  // TODO: Kawan — troque pelos projetos da VYSO. Imagens em /public/img.
  {
    title: 'VG Prevenções',
    description:
      'Site institucional pra empresa de segurança do trabalho, com foco em autoridade e conversão.',
    image: '/img/seguranca.png',
    tags: ['React', 'Landing', 'SEO'],
    live: '#',
  },
  {
    title: 'Travel Buena Vista',
    description: 'Landing de turismo com visual imersivo e navegação fluida.',
    image: '/img/travelBuenaVista.png',
    tags: ['HTML', 'CSS', 'JS'],
    live: '#',
  },
  {
    title: 'Imóvi',
    description: 'Plataforma de imóveis com busca e listagens responsivas.',
    image: '/img/imovi.png',
    tags: ['React', 'UI/UX'],
    live: '#',
  },
  {
    title: 'Clone Netflix',
    description: 'Recriação da interface da Netflix consumindo API de filmes.',
    image: '/img/CloneNetflix.png',
    tags: ['React', 'API'],
    live: '#',
    repo: '#',
  },
  {
    title: 'One Piece App',
    description: 'App temático com API pública e design próprio.',
    image: '/img/one-piece.png',
    tags: ['JavaScript', 'API'],
    live: '#',
  },
  {
    title: 'Task Manager',
    description: 'Gerenciador de tarefas com CRUD completo e estado persistente.',
    image: '/img/task.png',
    tags: ['React', 'Node.js'],
    live: '#',
    repo: '#',
  },
]

export interface Service {
  title: string
  description: string
  icon: string // nome do ícone lucide-react
}

export const services: Service[] = [
  {
    title: 'Sites & Landing Pages',
    description: 'Páginas que carregam rápido, convertem e passam autoridade — do design ao deploy.',
    icon: 'LayoutTemplate',
  },
  {
    title: 'Aplicações Web',
    description: 'Sistemas completos com React + Node.js: dashboards, áreas logadas e integrações.',
    icon: 'AppWindow',
  },
  {
    title: 'Interfaces Premium',
    description: 'UI moderna com animação e microinteração que dá um nível a mais no seu produto.',
    icon: 'Sparkles',
  },
  {
    title: 'Manutenção & Evolução',
    description: 'Melhorias contínuas, correções e otimização de performance no seu projeto atual.',
    icon: 'Wrench',
  },
]

// Seção imersiva WebGPU (respiro visual antes do contato).
export const immersive = {
  title: 'Feito pra impressionar',
  subtitle: 'O nível de detalhe que separa um site comum de uma experiência premium.',
  cta: 'Bora criar o seu',
}

export const contact = {
  kicker: '04 — Contato',
  heading: 'Tem um projeto? A VYSO *entrega*.',
  description: 'Chama a gente e transforma sua ideia num produto digital de verdade. Resposta rápida.',
  email: 'kawanwagnner7@gmail.com',
  ctaLabel: 'Chamar no Instagram',
}

export const socials = {
  instagram: 'https://www.instagram.com/vyso.store/',
  github: 'https://github.com/kawanwagnner', // TODO: confirme o usuário/da VYSO
  email: 'mailto:kawanwagnner7@gmail.com',
  whatsapp: '', // TODO: opcional — https://wa.me/55DDDNUMERO
}

export const nav = [
  { label: 'Início', href: '#hero' },
  { label: 'A VYSO', href: '#sobre' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Contato', href: '#contato' },
]
