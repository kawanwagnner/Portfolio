/**
 * ============================================================
 *  CONTEÚDO DO SITE — marca VYSO (software house)
 *  Edite tudo por aqui, Kawan 👇
 * ============================================================
 */

export const brand = {
  name: 'VYSO',
  role: 'Tecnologia com propósito',
  // A marca (o "V") é o componente <Logo /> — vetor em components/shared/Logo.tsx.
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

export const founder = {
  kicker: '02 — Founder',
  // *acento* numa palavra
  tagline: 'Tecnologia que resolve. Pessoas que *confiam*.',
  name: 'Kawan Wagnner',
  role: 'Founder & Software Engineer',
  bio: 'Por trás da VYSO tem um dev que trata cada projeto como negócio — não só como código. Do problema à solução, com transparência, comunicação e entrega que impulsiona. // TODO: ajuste do jeito Kawan.',
  photo: '/img/kawan.webp', // 48KB (convertido do PNG 1.8MB, sem perda visível)
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

/**
 * PROJETOS — cada um é um case completo (tem página própria em /projetos/slug).
 *
 * Imagens: coloque os arquivos em `public/img/` e aponte em `cover` / `gallery`.
 * Enquanto não tiver print, deixe o campo de fora — o site desenha um bloco
 * de marca no lugar (nada quebra).
 */
export interface CaseMetric {
  value: string
  label: string
}

export interface CaseStep {
  title: string
  description: string
}

export interface Project {
  slug: string
  title: string
  client: string
  year: string
  /** Etiqueta curta do tipo de trabalho — aparece no card e no topo do case. */
  category: string
  /** Frase do card e do índice de projetos. */
  summary: string
  /** Parágrafo de abertura da página do case. */
  intro: string
  /** Logo do cliente (PNG/SVG em /public/img/logos). Sem logo → monograma da marca. */
  logo?: string
  /** Moldura do mockup: janela de browser ou celular. */
  mockup?: 'browser' | 'phone'
  cover?: string
  gallery?: string[]
  /** Tags curtas do card. */
  tags: string[]
  services: string[]
  stack: string[]
  live?: string
  repo?: string
  /** Destaque ocupa 2 colunas no grid da home. */
  featured?: boolean
  objective: string[]
  challenge: string[]
  solution: string[]
  /** Funcionalidades-chave, em bullets. */
  highlights?: string[]
  process: CaseStep[]
  /** Números do case. Mantenha só o que for verdade. */
  results: CaseMetric[]
}

export const projects: Project[] = [
  {
    slug: 'al-modular-app',
    title: 'App de Orçamentos & Obra',
    client: 'AL Modular Esquadrias',
    year: '2026',
    category: 'Aplicação Web',
    summary:
      'Do catálogo ao pós-venda: o cliente monta a solicitação, recebe a proposta e acompanha a própria obra por 1 ano.',
    intro:
      'Uma plataforma que pega o cliente no momento em que ele está olhando o produto e não larga mais: solicitação, negociação no WhatsApp, proposta, pagamento e acompanhamento da obra — tudo num fluxo só, sem planilha e sem cliente perdido no meio do caminho.',
    logo: '', // TODO: '/img/logos/al-modular.png'
    mockup: 'phone',
    tags: ['React', 'WhatsApp', 'E-mail'],
    services: ['Produto & fluxo', 'Aplicação web', 'Design UI/UX', 'Integrações'],
    stack: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS'],
    live: 'https://share.google/MUIMGq52pSqslkgzW', // TODO: trocar pelo domínio final do app
    featured: true,
    objective: [
      'Dar à AL Modular um canal próprio onde o cliente escolhe o produto, pede orçamento e fecha — sem depender de ida e volta manual do vendedor pra montar cada proposta.',
      'E, depois da venda, resolver o problema que ninguém resolve: o cliente que fica no escuro esperando a obra andar. O app abre essa caixa-preta e mostra em que etapa a obra dele está.',
    ],
    challenge: [
      'Esquadria sob medida não se vende num carrinho de compras. O preço depende de medição, de projeto, de negociação — quem fecha é o vendedor, no WhatsApp. Qualquer tentativa de automatizar isso do começo ao fim ia empurrar o cliente pra fora do jeito que ele já compra.',
      'O segundo problema vem depois do "sim": entre o pagamento e a instalação passam semanas de medição, fabricação e agendamento. Nesse vácuo o cliente liga, cobra, desconfia — e o vendedor vira central de atendimento.',
    ],
    solution: [
      'Em vez de brigar com o WhatsApp, o app usa o WhatsApp como parte do fluxo. O cliente navega no catálogo, monta a solicitação e clica em "Solicitar" — cai direto na conversa com o vendedor, com o pedido já formatado. O vendedor atende, negocia como sempre negociou, e gera um link de proposta que manda ali mesmo.',
      'O cliente clica no link e volta pro app já no passo seguinte, com a proposta liberada: ele vê, confere, aprova e segue pro pagamento — que pode acontecer dentro do app ou por fora, do jeito que a AL preferir.',
      'Fechado o negócio, o admin libera o acompanhamento e a obra vira uma linha do tempo: medição inicial, agendamento, fabricação, instalação. Cada mudança de status dispara um e-mail automático pro cliente — ele fica sabendo antes de precisar perguntar.',
    ],
    highlights: [
      'Catálogo que vira solicitação de orçamento em um clique',
      'Handoff pro WhatsApp com o pedido já montado',
      'Link de proposta gerado pelo vendedor devolve o cliente ao app no passo certo',
      'Aprovação da proposta e pagamento (dentro do app ou externo)',
      'Acompanhamento da obra por até 1 ano, liberado por permissão do admin',
      'E-mail automático pro cliente a cada mudança de status',
    ],
    process: [
      {
        title: 'Entendimento do funil real',
        description:
          'Mapeei como a AL já vendia — quem fala com o cliente, onde a negociação acontece, o que trava. O app foi desenhado em volta desse funil, não contra ele.',
      },
      {
        title: 'Desenho do fluxo em etapas',
        description:
          'Cada estado do cliente (solicitou, tem proposta, aprovou, pagou, obra em andamento) virou um passo com regra clara de liberação — controlada pelo vendedor ou pelo admin.',
      },
      {
        title: 'Construção e integrações',
        description:
          'Catálogo, área do cliente, painel de gestão de status e as duas pontas que sustentam o fluxo: o redirecionamento pro WhatsApp e o disparo de e-mail a cada atualização.',
      },
    ],
    // TODO: Kawan — troque por números reais quando o app rodar um ciclo completo.
    results: [
      { value: '1 ano', label: 'de acompanhamento pós-venda' },
      { value: '5 etapas', label: 'do catálogo ao pós-venda, num fluxo só' },
      { value: '100%', label: 'das atualizações avisadas por e-mail' },
    ],
  },
  {
    slug: 'al-modular-site',
    title: 'AL Modular Esquadrias',
    client: 'AL Modular Esquadrias',
    year: '2026',
    category: 'Site institucional',
    summary:
      'A vitrine digital de uma fabricante de esquadrias sob medida — autoridade na frente, orçamento a um clique.',
    intro:
      'O site institucional da AL Modular: o lugar onde quem procura esquadria sob medida encontra a empresa, entende o que ela faz e sai de lá com uma conversa aberta no WhatsApp.',
    logo: '', // TODO: '/img/logos/al-modular.png'
    mockup: 'browser',
    tags: ['React', 'Institucional', 'SEO'],
    services: ['Site institucional', 'Design UI/UX', 'Deploy & domínio'],
    stack: ['React', 'TypeScript', 'Tailwind CSS'],
    live: 'https://www.almodularesquadrias.com.br/',
    objective: [
      'Dar à AL Modular uma presença digital própria, num domínio próprio — não mais um perfil de rede social como único endereço.',
      'Transformar visita em contato: quem chega no site precisa sair dele falando com a empresa.',
    ],
    challenge: [
      'Esquadria é uma compra de confiança: o cliente está colocando o produto na casa dele, e escolhe pelo que a empresa transmite. Sem site, a AL disputava atenção no mesmo lugar que todo mundo — e sem controle do que era mostrado.',
      // TODO: Kawan — se teve dor específica (ex.: dependia só do Instagram, sem catálogo, sem ser achada no Google), escreve aqui.
    ],
    solution: [
      'Um site direto, rápido e com hierarquia clara: o que a AL faz, como faz e por que confiar — e um caminho curto pro orçamento em qualquer ponto da página.',
      'Visual alinhado ao produto: sóbrio, limpo e com o produto em destaque, do jeito que uma fabricante de esquadria precisa se apresentar.',
    ],
    process: [
      {
        title: 'Conteúdo e hierarquia',
        description:
          'Definimos o que precisava aparecer primeiro pra alguém que nunca ouviu falar da empresa — e o que era ruído.',
      },
      {
        title: 'Design e construção',
        description: 'Interface responsiva, leve e com o CTA de orçamento sempre ao alcance.',
      },
      {
        title: 'No ar',
        description: 'Deploy em domínio próprio (almodularesquadrias.com.br), pronto pra receber tráfego.',
      },
    ],
    // TODO: Kawan — números reais aqui (visitas, orçamentos vindos do site) fazem esse case saltar.
    results: [
      { value: 'Domínio próprio', label: 'presença que é da empresa' },
      { value: '1 clique', label: 'da página ao WhatsApp' },
    ],
  },
  {
    slug: 'ong-nova-historia',
    title: 'ONG Nova História',
    client: 'Associação Nova História',
    year: '2026',
    category: 'Site & Doações',
    summary:
      'Site de uma ONG que trabalha com crianças — feito pra transformar quem se emociona em quem doa.',
    intro:
      'A Associação Nova História acredita que toda criança merece amor, oportunidade e a chance de chegar no seu potencial. O site existe pra que quem se identifica com essa causa consiga ajudar sem atrito.',
    logo: '', // TODO: '/img/logos/nova-historia.png'
    mockup: 'browser',
    cover: '/img/ong.png',
    tags: ['React', 'Social', 'Doações'],
    services: ['Site institucional', 'Design UI/UX', 'Deploy'],
    stack: ['React', 'TypeScript', 'Tailwind CSS'],
    live: 'https://ong-nova-historia.vercel.app/',
    objective: [
      'Dar à ONG um endereço digital sério, que passe credibilidade — o pré-requisito pra alguém confiar dinheiro a uma instituição.',
      'Encurtar ao máximo a distância entre "quero ajudar" e a doação de fato acontecer.',
    ],
    challenge: [
      'ONG vive de confiança e de doação recorrente, e ambas dependem de duas coisas que quase nenhuma tem: um lugar que explique a causa com clareza e um caminho de doação que não faça a pessoa desistir no meio.',
      'A comunicação estava espalhada em redes sociais, onde o alcance é de quem já segue — e onde não dá pra contar a história inteira.',
    ],
    solution: [
      'Um site que abre pela causa (as crianças, os pilares da instituição) e só depois pede — na ordem certa de quem quer convencer, não de quem quer arrecadar.',
      'Doação por PIX exposta sem burocracia, com o botão de doar acessível de qualquer ponto do site, e canal direto de contato por WhatsApp e formulário pra quem quer conversar antes.',
      'Blog alimentado pelo conteúdo do Instagram, pra que quem chega veja que a instituição está viva e trabalhando — prova social é o que sustenta a confiança.',
    ],
    highlights: [
      'Botão "Doar Agora" e PIX em destaque',
      'Blog com as publicações da instituição',
      'Contato direto por WhatsApp e formulário',
      'CNPJ e dados públicos visíveis — transparência é conversão',
    ],
    process: [
      {
        title: 'Escuta da causa',
        description:
          'Antes de desenhar, entender: quem a ONG atende, o que ela defende e o que faz alguém decidir doar.',
      },
      {
        title: 'Narrativa antes do pedido',
        description:
          'A página foi montada como um argumento — causa, pilares, prova — e só então a doação.',
      },
      {
        title: 'Construção e publicação',
        description: 'Site responsivo, leve e no ar, pronto pra ser divulgado nas redes da instituição.',
      },
    ],
    results: [
      { value: 'PIX', label: 'doação em poucos toques' },
      { value: '4 pilares', label: 'da causa apresentados com clareza' },
    ],
  },
  {
    slug: 'vg-facilities',
    title: 'VG Facilities',
    client: 'VG Prevenções · São Paulo, SP',
    year: '2026',
    category: 'Site institucional',
    summary:
      'Site de uma empresa de facilities e segurança patrimonial: autoridade, portfólio de serviços e orçamento sem fricção.',
    intro:
      'A VG atua com manutenção predial, segurança patrimonial, limpeza, controle de acesso e gestão de facilities. O site precisava fazer o que um vendedor faz numa reunião: mostrar competência e sair com o orçamento marcado.',
    logo: '', // TODO: '/img/logos/vg.png'
    mockup: 'browser',
    cover: '/img/seguranca.png',
    tags: ['React', 'Institucional', 'Conversão'],
    services: ['Site institucional', 'Design UI/UX', 'Deploy'],
    stack: ['React', 'TypeScript', 'Tailwind CSS'],
    live: 'https://vg-facilities.vercel.app/',
    objective: [
      'Posicionar a VG como empresa séria diante de quem contrata facilities — síndicos, gestores prediais, lojistas — que decidem por confiança e comparação.',
      'Fazer o site trabalhar como canal de captação: cada visita deve terminar num pedido de orçamento.',
    ],
    challenge: [
      'Facilities é um mercado de licitação informal: o cliente pede orçamento pra três, quatro empresas e escolhe pela que parece mais preparada. Quem não tem presença digital não entra nem na lista.',
      'E é um leque grande de serviços — manutenção, segurança, limpeza, portaria, paisagismo. Jogar tudo na cara do visitante confunde; esconder faz perder contrato.',
    ],
    solution: [
      'Organizei o leque em blocos de serviço legíveis, cada um explicado no idioma de quem contrata: o que é, pra quem serve, o que resolve.',
      'A prova vem em seguida — depoimentos, portfólio de clientes e um FAQ que mata as objeções que o vendedor ouviria na reunião (documentação, qualificação da equipe, abrangência).',
      'E o orçamento fica sempre a um toque: WhatsApp e formulário disponíveis do topo ao rodapé.',
    ],
    highlights: [
      'Serviços organizados em blocos escaneáveis',
      'Depoimentos e portfólio como prova social',
      'FAQ que antecipa as objeções da venda',
      'WhatsApp e formulário de orçamento em toda a página',
    ],
    process: [
      {
        title: 'Mapa dos serviços',
        description:
          'Separar oito frentes de atuação em blocos que o visitante consiga ler em segundos, sem se perder.',
      },
      {
        title: 'Argumento de autoridade',
        description:
          'Depoimentos, clientes e FAQ posicionados exatamente onde a dúvida aparece na leitura.',
      },
      {
        title: 'Construção e deploy',
        description: 'Site responsivo, rápido e no ar, com os canais de contato integrados.',
      },
    ],
    // TODO: Kawan — se souber quantos orçamentos o site trouxe, esse número vale mais que tudo aqui.
    results: [
      { value: '8 serviços', label: 'organizados em blocos claros' },
      { value: 'WhatsApp', label: 'orçamento a um toque, em toda a página' },
    ],
  },
  {
    slug: 'agente-ia-telecom',
    title: 'Agente de IA para atendimento',
    client: 'Operação de telecom · via consultoria',
    year: '2026',
    category: 'Agente de IA',
    summary:
      'Um agente conversacional para uma operação de telecom — atendimento que responde na hora, sem fila.',
    intro:
      'Um agente de IA para uma operação de telecom: em vez de um menu de robô que empurra o cliente pra um humano, um agente que entende o que foi pedido e resolve.',
    logo: '',
    mockup: 'phone',
    tags: ['IA', 'Automação', 'Atendimento'],
    services: ['Agente de IA', 'Automação de atendimento', 'Integração'],
    stack: ['Node.js', 'TypeScript'], // TODO: confirme a stack real (LLM usado, canal, banco)
    objective: [
      'Tirar da equipe o volume de atendimento repetitivo e devolver esse tempo pro que exige gente de verdade.',
      // TODO: Kawan — qual era o objetivo do bot? (vendas, suporte técnico, 2ª via, agendamento?)
    ],
    challenge: [
      'Operação de telecom vive de volume: muita pergunta repetida, pico de demanda concentrado e cliente sem paciência pra fila.',
      // TODO: Kawan — qual era a dor concreta? (tempo de espera, custo de atendente, horário limitado?)
    ],
    solution: [
      'Um agente que interpreta o pedido em linguagem natural, responde na hora e escala pro humano só quando realmente precisa.',
      // TODO: Kawan — descreve o que o bot faz de fato, passo a passo. É aqui que o case ganha peso.
    ],
    process: [
      {
        title: 'Mapeamento do atendimento',
        description:
          'Entender o que o cliente pergunta de verdade — e o que dava pra resolver sem gente no meio.', // TODO
      },
      {
        title: 'Construção do agente',
        description: 'Fluxo de conversa, base de conhecimento e regras de escalonamento pro humano.', // TODO
      },
      {
        title: 'Operação',
        description: 'Agente em produção, atendendo dentro do canal que a operação já usava.', // TODO
      },
    ],
    // TODO: Kawan — números aqui (atendimentos/mês, % resolvido sem humano, tempo de resposta) valem ouro.
    results: [{ value: '24/7', label: 'atendimento sem fila e sem horário' }],
  },
  {
    slug: 'instituto-social-painel',
    title: 'Painel de Frequência',
    client: 'Instituto social · via consultoria',
    year: '2026',
    category: 'Aplicação Web',
    summary:
      'Interface de acompanhamento das ausências dos educandos — a evasão vira número visível antes de virar problema.',
    intro:
      'Uma interface para o instituto acompanhar a frequência dos educandos. Falta não é só um dado de chamada: é o primeiro sinal de que um jovem está saindo do programa — e o instituto precisava enxergar esse sinal a tempo.',
    logo: '',
    mockup: 'browser',
    tags: ['React', 'Dashboard', 'Social'],
    services: ['Aplicação web', 'Design UI/UX', 'Dashboard'],
    stack: ['React', 'TypeScript', 'Tailwind CSS'], // TODO: confirme (tinha backend? qual banco?)
    objective: [
      'Dar ao time do instituto uma visão clara de quem está faltando, quanto e desde quando — sem depender de planilha e memória.',
      'Permitir agir cedo: identificar o educando em risco de evasão enquanto ainda dá pra trazer de volta.',
    ],
    challenge: [
      'Controle de presença em projeto social costuma morar em papel e planilha. O dado existe, mas ninguém consegue olhar pro conjunto e ver o padrão — e quando o padrão aparece, o educando já saiu.',
      // TODO: Kawan — como era antes? (papel? planilha? sistema?) e quem usava?
    ],
    solution: [
      'Uma interface que consolida as ausências e mostra o que importa de relance: quem faltou, com que frequência, e quem está entrando na zona de risco.',
      // TODO: Kawan — detalha as telas/funcionalidades: registro de presença, filtros, alertas, relatórios?
    ],
    process: [
      {
        title: 'Entendimento do processo',
        description:
          'Como o instituto registrava presença e o que o time precisava enxergar pra agir.', // TODO
      },
      {
        title: 'Desenho da interface',
        description: 'Priorizar o sinal (ausência recorrente) sobre o ruído (a chamada do dia).', // TODO
      },
      {
        title: 'Construção',
        description: 'Painel responsivo, pensado pra ser usado no dia a dia por quem está em campo.', // TODO
      },
    ],
    // TODO: Kawan — nº de educandos acompanhados, unidades, queda de evasão…
    results: [{ value: 'Evasão', label: 'sinalizada antes de acontecer' }],
  },
  {
    slug: 'totvs-salesforce',
    title: 'Integração TOTVS ↔ Salesforce',
    client: 'Instituto social · via consultoria',
    year: '2026',
    category: 'Integração de sistemas',
    summary:
      'Ponte entre o ERP e o CRM no módulo financeiro — dois sistemas que não se falavam, agora falando sozinhos.',
    intro:
      'Uma integração entre o TOTVS (ERP) e o Salesforce (CRM) no módulo financeiro: o dado nasce num sistema e chega no outro sem ninguém digitar de novo.',
    logo: '',
    mockup: 'browser',
    tags: ['Integração', 'TOTVS', 'Salesforce'],
    services: ['Integração de sistemas', 'Automação de processos'],
    stack: ['Node.js', 'REST API'], // TODO: confirme (middleware? webhook? job agendado? Apex?)
    objective: [
      'Eliminar a digitação dupla entre ERP e CRM no financeiro — a fonte clássica de erro, retrabalho e divergência de número.',
      'Fazer os dois sistemas enxergarem a mesma verdade, sem depender de alguém lembrar de atualizar os dois.',
    ],
    challenge: [
      'ERP e CRM guardam pedaços diferentes da mesma operação. Quando não conversam, alguém vira a integração: exporta, confere, redigita. É lento, é caro e erra.',
      // TODO: Kawan — qual era a dor concreta? (fechamento demorado? divergência de valores? equipe redigitando?)
    ],
    solution: [
      'Uma camada de integração que sincroniza os dados do módulo financeiro entre os dois sistemas, com mapeamento de campos e tratamento de erro — quando algo não bate, isso aparece em vez de passar batido.',
      // TODO: Kawan — o que sincroniza exatamente (títulos, faturas, pagamentos, clientes)? Em que direção? De quanto em quanto tempo?
    ],
    process: [
      {
        title: 'Mapeamento dos dados',
        description: 'Entender o que existe de cada lado e como os campos se correspondem.', // TODO
      },
      {
        title: 'Construção da ponte',
        description: 'Sincronização entre TOTVS e Salesforce, com tratamento de falha e log.', // TODO
      },
      {
        title: 'Homologação',
        description: 'Validação com o time financeiro até o número bater dos dois lados.', // TODO
      },
    ],
    // TODO: Kawan — horas economizadas por mês, nº de registros sincronizados, redução de erro…
    results: [{ value: 'Zero', label: 'digitação dupla entre ERP e CRM' }],
  },
]

export const projectsSection = {
  kicker: '03 — Projetos',
  heading: 'Trabalho que *fala por mim*.',
  description: 'Do problema ao produto no ar. Entra em cada case pra ver como foi.',
  ctaLabel: 'Ver o case',
}

export function getProject(slug?: string) {
  return projects.find((p) => p.slug === slug)
}

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
  kicker: '05 — Contato',
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
  { label: 'Founder', href: '#founder' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Contato', href: '#contato' },
]
