/**
 * ============================================================
 *  CONTEÚDO DO SITE — marca VYSO (software house)
 *  Edite tudo por aqui, Kawan 👇
 * ============================================================
 */

export const brand = {
  name: "VYSO",
  role: "Tecnologia com propósito",
  // A marca (o "V") é o componente <Logo /> — vetor em components/shared/Logo.tsx.
};

export const hero = {
  status: "VYSO · Tecnologia com propósito",
  // A headline é dividida em linhas; a palavra entre *asteriscos* recebe o acento.
  // A headline diz O QUE se compra aqui. "Soluções que crescem" cabia em banco,
  // consultoria e seguradora; quem chega da bio do Instagram precisa saber em
  // dois segundos se veio ao lugar certo.
  headlineLines: ["Sites, apps e", "sistemas que", "*trabalham* por você."],
  subtitle:
    "Do site institucional à loja completa e ao sistema que roda seu processo por dentro. Você fala direto com quem constrói, sem agência e sem intermediário.",
  // O CTA forte do herói é a conversa (`whatsapp.cta`). "Ver projetos" fica
  // como caminho secundário — a seção de projetos é a próxima, logo abaixo.
  primaryCta: "Ver projetos",
  splineScene: "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode",
};

// Ticker cinético abaixo do herói.
export const marquee = [
  "Soluções digitais",
  "Automação de processos",
  "Aplicações Web",
  "Sites de alta conversão",
  "Tecnologia com propósito",
  "Landing pages",
  "Entrega que impulsiona",
  "Design com intenção",
];

export const about = {
  kicker: "06 / A VYSO",
  // A palavra entre *asteriscos* recebe o acento.
  heading: "Antes do código, existe o *negócio*.",
  paragraphs: [
    "A VYSO transforma problemas reais em soluções digitais que impulsionam negócios. Criamos, automatizamos processos e entregamos valor, sem burocracia e sem intermediário. Você fala direto com quem constrói.",
    "Tecnologia com propósito e design com intenção. Do entendimento do problema ao resultado no ar, cada etapa foca em resolver e gerar crescimento.",
  ],
  stats: [
    { value: "15+", label: "Projetos no ar" },
    { value: "4+", label: "Anos codando" },
    // @vyso.store tinha 4.538 em 05/10/2026. Atualizar quando passar de 5 mil.
    { value: "4,5k", label: "Seguidores no Instagram" },
  ],
};

export const founder = {
  kicker: "07 / Founder",
  // *acento* numa palavra
  tagline: "Tecnologia que resolve. Pessoas que *confiam*.",
  name: "Kawan Wagnner",
  role: "Founder & Software Engineer",
  bio: "Por trás da VYSO tem um dev que trata cada projeto como negócio, não só como código. Entendendo o problema, planejando a solução e construindo algo que realmente faça sentido.",
  photo: "/img/kawan.webp", // foto trocada em 05/10/2026 (640x640, no notebook)
};

// O que a VYSO usa pra entregar — front, back, mobile, banco e infra,
// mais o que os cases mostram: agentes de IA e integração entre sistemas.
export const skills: string[] = [
  "TypeScript",
  "React",
  "React Native",
  "Node.js",
  "NestJS",
  "PostgreSQL",
  "Docker",
  "Python",
  "Tailwind CSS",
  "Agentes de IA",
  "Integrações entre sistemas",
  "Automação de processos",
];

/**
 * PROJETOS — cada um é um case completo (tem página própria em /projetos/slug).
 *
 * Imagens: coloque os arquivos em `public/img/` e aponte em `cover` / `gallery`.
 * Enquanto não tiver print, deixe o campo de fora — o site desenha um bloco
 * de marca no lugar (nada quebra).
 */
export interface CaseMetric {
  value: string;
  label: string;
}

export interface CaseStep {
  title: string;
  description: string;
}

/**
 * O corpo de um case: o que a página de projeto mostra.
 * Um cliente pode ter mais de um sistema (ex.: a AL Modular tem a loja e o
 * painel de gestão) — nesse caso cada sistema é uma parte, e a página do case
 * mostra uma aba por parte, em vez de virar dois cards repetidos com a mesma logo.
 */
export interface CasePart {
  /** Nome do sistema. Vira o rótulo da aba quando o projeto tem mais de uma parte. */
  title: string;
  /** Identificador da parte na URL: /projetos/<projeto>?sistema=<slug>. */
  slug?: string;
  category: string;
  /** Frase do card quando a parte aparece sozinha (filtro Desktop/Mobile). */
  summary?: string;
  /** Parágrafo de abertura. */
  intro: string;
  services: string[];
  stack: string[];
  live?: string;
  /**
   * Mostra a URL de `live` só como texto, sem botão nem link. Pra site que
   * está no ar mas parado (sem produto, sem uso): quem quiser ver vai ter que
   * copiar o endereço, e quem só está passando não cai numa loja vazia achando
   * que o projeto quebrou.
   */
  liveLocked?: boolean;
  repo?: string;
  /** Moldura do mockup: janela de browser ou celular. */
  mockup?: "browser" | "phone";
  cover?: string;
  gallery?: string[];
  objective: string[];
  challenge: string[];
  solution: string[];
  /** Funcionalidades-chave, em bullets. */
  highlights?: string[];
  process: CaseStep[];
  /** Números do case. Mantenha só o que for verdade. */
  results: CaseMetric[];
}

/**
 * Projeto = o que aparece no card. Sistema único: escreva o case direto aqui
 * (os campos de CasePart são os mesmos). Mais de um sistema: use `parts`.
 */
export interface Project extends Partial<CasePart> {
  slug: string;
  title: string;
  client: string;
  year: string;
  /** Etiqueta curta do tipo de trabalho — aparece no card. */
  category: string;
  /** Frase do card e do índice de projetos. */
  summary: string;
  /** Logo do cliente (PNG/SVG em /public/img/logos). Sem logo → monograma da marca. */
  logo?: string;
  /** Tags curtas do card. */
  tags: string[];
  /** Destaque ocupa 2 colunas no grid da home. */
  featured?: boolean;
  /** Dois ou mais sistemas pro mesmo cliente → uma aba por sistema no case. */
  parts?: CasePart[];
}

/** As partes de um case. Projeto de sistema único = ele mesmo, como parte única. */
export function getCaseParts(project: Project): CasePart[] {
  return project.parts?.length ? project.parts : [project as CasePart];
}

export const projects: Project[] = [
  {
    // Loja própria da VYSO. Fica em primeiro porque é o case em que a casa é
    // o cliente: tudo que a gente promete pra loja de terceiro está rodando
    // aqui, com dinheiro de verdade entrando.
    slug: "vyso-loja",
    title: "VYSO Loja",
    client: "VYSO",
    year: "2026",
    category: "E-commerce",
    // ícone da própria loja vyso.com.br (V branco no quadrado preto)
    logo: "/img/logos/vyso-loja.webp",
    summary:
      "A loja própria da marca: roupas e acessórios com frete grátis, Pix na hora e cartão em 12x. Carrinho, checkout, trocas, recuperação de venda e painel, tudo código da casa.",
    intro:
      "A VYSO não vende só software: vende roupa. A loja em vyso.com.br é um e-commerce completo construído do zero, do catálogo ao estorno, e é onde cada decisão de produto é testada com cliente real antes de virar recomendação pra alguém.",
    mockup: "browser",
    cover: "/img/cases/vyso-loja.webp",
    tags: ["React", "NestJS", "E-commerce"],
    featured: true,
    services: [
      "Produto & fluxo",
      "E-commerce",
      "Design UI/UX",
      "Integrações",
      "Painel administrativo",
    ],
    stack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "NestJS",
      "Prisma",
      "PostgreSQL",
      "Mercado Pago",
      "Cloudflare R2",
    ],
    live: "https://vyso.com.br/",
    objective: [
      "Ter uma loja da própria marca que venda sozinha, 24h, sem depender de marketplace nem de atendimento manual pra fechar pedido.",
      "Usar o negócio próprio como laboratório: cada recurso de e-commerce que a VYSO oferece a cliente precisa existir aqui primeiro, com venda real.",
    ],
    challenge: [
      "Loja pequena não pode errar no caixa. Clique duplo em finalizar, Pix que vence, cartão recusado, webhook que chega fora de ordem: tudo isso precisa virar exatamente um pedido com exatamente um pagamento, sem a equipe conferir na mão.",
      "E o pós-venda custa mais que a venda. Troca, devolução e reembolso em loja de roupa são rotina, não exceção, e precisavam de um fluxo que o cliente resolve sozinho e o dono aprova em um clique.",
    ],
    solution: [
      "O servidor decide tudo: o carrinho vive no banco, inclusive pra quem não tem conta, e o pedido nasce dele, nunca do que o navegador manda. O pagamento tem trava por pedido, reaproveita o Pix válido e reconcilia pelo webhook do Mercado Pago, com um robô conferindo pendências a cada cinco minutos.",
      "Quem chegou perto de comprar e saiu recebe lembrete por e-mail em cadência crescente, com descadastro de um clique. A home e a página de produto recomendam com base no que a pessoa viu, buscou e colocou no carrinho, sem guardar nada dela no servidor.",
      "Devolução é uma página: pedido, e-mail, código de confirmação e fotos. O admin aprova, escolhe o canal e gera a etiqueta reversa pelo Melhor Envio ou manda o QR pelo WhatsApp. Reembolso total ou parcial sai do próprio painel.",
    ],
    highlights: [
      "Cinco categorias: roupas femininas, masculinas, acessórios, calçados e presentes",
      "Checkout no Mercado Pago: Pix à vista e cartão em até 12x, com estorno pelo painel",
      "Carrinho no servidor pra conta e convidado, com fusão ao entrar",
      "Recuperação de carrinho abandonado por e-mail e recomendações por interesse",
      "Avaliações com selo de compra verificada",
      "Devoluções com prazo, fotos, etiqueta reversa e reembolso no mesmo fluxo",
      "Rastreio do pedido por número ou por e-mail com código",
      "Painel com produtos, pedidos, cupons, devoluções e preço de custo atualizado todo dia",
    ],
    process: [
      {
        title: "Caixa antes de vitrine",
        description:
          "A primeira semana foi pagamento: um pedido, um pagamento, sob qualquer sequência de cliques e webhooks. Vitrine bonita com caixa frágil é prejuízo com cara de site.",
      },
      {
        title: "Pós-venda como produto",
        description:
          "Troca, devolução, estorno e rastreio desenhados como telas do cliente, não como tarefa do dono. O painel só aprova.",
      },
      {
        title: "Carga e ar",
        description:
          "Teste de carga com cem compradores simultâneos antes do domínio próprio entrar no ar, pra saber o limite antes do cliente descobrir.",
      },
    ],
    results: [
      { value: "0 erros", label: "em teste de carga com 100 compradores simultâneos" },
      { value: "61 ms", label: "de resposta da API no p95, sob carga" },
      { value: "12x", label: "no cartão, ou Pix na hora, com frete grátis" },
    ],
  },
  {
    // Frente B2C do grupo: produto padronizado, preço na tela, o cliente fecha
    // sozinho. O irmão B2B (sob medida, com vendedor) é o case `al-esquadrias`.
    //
    // Dois sistemas no mesmo produto → um card com aba por sistema.
    // No filtro Mobile/Desktop cada parte volta a aparecer como card próprio.
    slug: "al-modular",
    title: "AL Modular Esquadrias",
    client: "AL Modular Esquadrias",
    year: "2026",
    category: "E-commerce",
    summary:
      "A loja online de esquadrias de alumínio do grupo: catálogo com variações, carrinho, Pix e cartão em 12x, além do painel que a equipe usa pra tocar a operação.",
    logo: "/img/logos/al-modular.png",
    mockup: "browser",
    tags: ["React", "E-commerce", "Pagamentos"],
    featured: true,
    parts: [
      {
        slug: "loja",
        title: "Loja",
        category: "E-commerce",
        summary:
          "Esquadria de alumínio vendida como qualquer produto de e-commerce: escolhe o modelo, escolhe a cor, calcula o frete e paga no Pix ou em 12x.",
        intro:
          "A AL Modular é a filial B2C do grupo, a frente que vende produto pronto, pra quem não quer projeto sob medida nem negociação. O site é uma loja completa: catálogo por categoria, busca, variação de tamanho e acabamento, carrinho, frete por CEP e checkout com Pix e cartão.",
        mockup: "browser",
        cover: "/img/cases/al-modular-loja.webp",
        services: [
          "Produto & fluxo",
          "E-commerce",
          "Design UI/UX",
          "Integrações",
        ],
        stack: [
          "React",
          "TypeScript",
          "Tailwind CSS",
          "NestJS",
          "Prisma",
          "PostgreSQL",
          "Mercado Pago",
        ],
        live: "https://www.almodularesquadrias.com.br/",
        // A loja está no ar mas sem produto cadastrado: link clicável levaria
        // o visitante a uma vitrine vazia, que lê como erro. Só o endereço.
        liveLocked: true,
        objective: [
          "Abrir um canal de venda direta pro consumidor final: produto padronizado, preço na tela, compra fechada sozinho, sem depender de vendedor pra cada pedido.",
          "Tirar da operação o trabalho manual de responder preço, prazo e frete um a um, e devolver isso pro cliente em forma de página de produto.",
        ],
        challenge: [
          "Esquadria não é camiseta. Cada produto existe em dezenas de combinações de medida, número de módulos e acabamento, e cada combinação tem preço próprio. Colocar isso num catálogo sem transformar a escolha num formulário de engenharia era o ponto mais difícil.",
          "E tem o frete: peça grande, pesada e frágil. O preço só fecha quando o CEP entra na conta, então o cliente precisa descobrir isso antes do checkout, não depois, quando já criou expectativa.",
        ],
        solution: [
          "A página de produto resolve a complexidade em duas escolhas visuais: modelo/tamanho e cor/acabamento. O cliente clica, o preço reage. O que era tabela de fabricante virou seleção de dois cliques.",
          "Preço mostrado nas duas moedas que o brasileiro entende: à vista no Pix e parcelado em até 12x sem juros no cartão. E o frete é calculado por CEP na própria página do produto, antes de qualquer cadastro.",
          "Depois da compra o cliente não fica sem resposta: conta própria, rastreamento de pedido em página dedicada e o WhatsApp da empresa sempre a um toque, pra quando a dúvida não couber na página.",
        ],
        highlights: [
          "Catálogo por categoria: janelas, janelas de correr, portas, portas camarão e vitrô basculante",
          "Variação de modelo/tamanho e cor/acabamento, com o preço reagindo à escolha",
          "Checkout no Mercado Pago: Pix à vista e cartão em até 12x sem juros",
          "Cálculo de frete por CEP direto na página do produto",
          "Conta do cliente e rastreamento de pedidos",
          "Busca, especificações técnicas e as páginas que uma loja precisa ter: privacidade, trocas e devoluções, termos de uso",
        ],
        process: [
          {
            title: "Modelagem do catálogo",
            description:
              "Antes da tela, a estrutura: o que é produto, o que é variação e o que é especificação. Sem isso definido, catálogo de esquadria vira lista infinita de itens quase iguais.",
          },
          {
            title: "Página de produto e checkout",
            description:
              "Desenho da escolha (modelo, acabamento, quantidade), do preço nas duas formas de pagamento e do frete por CEP, tudo antes do cliente precisar se cadastrar.",
          },
          {
            title: "No ar, em domínio próprio",
            description:
              "Deploy em almodularesquadrias.com.br, com as páginas de política, os selos e o CNPJ no rodapé: o básico que faz uma loja nova parecer confiável.",
          },
        ],
        // TODO: Kawan — quando a loja rodar um mês cheio, troque por números reais
        // (pedidos, ticket médio, conversão). Métrica de faturamento vende o case.
        results: [
          { value: "5 categorias", label: "de esquadria no catálogo" },
          { value: "12x", label: "sem juros no cartão, ou à vista no Pix" },
          { value: "CEP", label: "frete calculado antes do checkout" },
        ],
      },
      {
        slug: "painel",
        title: "Painel de gestão",
        category: "Painel administrativo",
        summary:
          "O lado de dentro da loja: produtos, pedidos, cupons, orçamentos e carrinho abandonado, com o faturamento na primeira tela.",
        intro:
          "Uma loja só funciona se quem está atrás dela consegue tocá-la sem depender de dev. O painel da AL Modular é onde a equipe cadastra produto, acompanha pedido, cria cupom e enxerga o dinheiro entrando.",
        mockup: "browser",
        // Print mandado pelo Kawan: o painel está atrás de login, não dá pra
        // capturar de fora com o scripts/shots.mjs.
        cover: "/img/cases/al-modular-painel.webp",
        services: [
          "Painel administrativo",
          "Produto & fluxo",
          "Design UI/UX",
        ],
        stack: [
          "React",
          "TypeScript",
          "Tailwind CSS",
          "NestJS",
          "Prisma",
          "PostgreSQL",
        ],
        objective: [
          "Deixar a operação inteira na mão da equipe: cadastrar, editar, despachar e faturar sem abrir código nem chamar o dev.",
          "Dar visão de negócio, não só lista de registros: quanto entrou, quantos pedidos, em que status cada um está.",
        ],
        challenge: [
          "Painel de e-commerce vira depósito de tabela: dez menus, mil colunas e ninguém sabe o que olhar primeiro. O risco aqui era entregar poder e tirar clareza.",
          "E a operação da AL não é só carrinho: o pedido sob medida também cai aqui antes de virar proposta. O painel precisava caber os dois mundos sem virar dois produtos.",
        ],
        solution: [
          "A primeira tela responde as quatro perguntas que importam antes de qualquer clique: quantos usuários, quantos produtos, quantos pedidos e quanto entrou. Abaixo, vendas dos últimos 6 meses e a distribuição dos pedidos por status.",
          "O resto é operação do dia a dia: produtos e categorias, pedidos com ciclo de status, cupons de desconto e a fila de orçamentos, que é o canal por onde o pedido sob medida entra.",
          "E uma tela que a maioria das lojas pequenas não tem: carrinho abandonado. Quem chegou perto de comprar e desistiu fica listado. É venda já paga em tráfego, que só precisa de um empurrão.",
        ],
        highlights: [
          "Dashboard com usuários, produtos, pedidos e receita total",
          "Gráfico de vendas dos últimos 6 meses e pedidos por status",
          "Gestão de produtos, categorias e variações",
          "Pedidos com ciclo completo: pendente, confirmado, enviado, entregue, cancelado",
          "Cupons de desconto",
          "Fila de orçamentos pros pedidos sob medida",
          "Carrinho abandonado: quem quase comprou fica visível",
          "Gestão de usuários e central de notificações",
        ],
        process: [
          {
            title: "O que a equipe olha primeiro",
            description:
              "Mapeei a rotina de quem toca a loja pra decidir o que merece a primeira tela e o que pode viver dois cliques adiante.",
          },
          {
            title: "Dashboard antes de tabela",
            description:
              "Números de negócio no topo, gráficos no meio, listas embaixo. Quem abre o painel entende a semana antes de precisar filtrar qualquer coisa.",
          },
          {
            title: "Áreas de operação",
            description:
              "Cada rotina virou uma área própria: catálogo, pedidos, cupons, orçamentos, carrinho abandonado e usuários, com o ciclo de status do pedido amarrando tudo.",
          },
        ],
        results: [
          { value: "8 áreas", label: "de gestão num painel só" },
          { value: "5 status", label: "no ciclo de vida do pedido" },
          { value: "6 meses", label: "de vendas visíveis na abertura" },
        ],
      },
    ],
  },
  {
    // Frente B2B do grupo: sob medida, com vendedor no meio do funil.
    // Cliente diferente da AL Modular (`al-modular`), que é a filial B2C.
    slug: "al-esquadrias",
    title: "AL Esquadrias",
    client: "AL Esquadrias",
    year: "2026",
    category: "App Mobile",
    summary:
      "O app B2B do grupo: catálogo de produtos e acompanhamento de obra na mão do cliente, do orçamento à instalação.",
    // TODO: Kawan — logo emprestada da filial. Quando a AL Esquadrias tiver a
    // dela, é só jogar o arquivo em /public/img/logos/ e apontar aqui.
    logo: "/img/logos/al-modular.png",
    mockup: "phone",
    // Print mandado pelo Kawan: é app, não tem URL pra capturar com o shots.mjs.
    cover: "/img/cases/al-esquadrias.webp",
    tags: ["React Native", "WhatsApp", "B2B"],
    intro:
      "A AL Esquadrias é a frente B2B do grupo: esquadria sob medida, com projeto, medição e negociação. O app pega o cliente no catálogo, leva até a proposta e, o que quase ninguém faz, continua com ele depois da venda, mostrando em que etapa a obra está.",
    services: [
      "Produto & fluxo",
      "App mobile",
      "Design UI/UX",
      "Integrações",
    ],
    stack: ["React Native", "TypeScript", "Node.js"],
    live: "https://share.google/MUIMGq52pSqslkgzW", // TODO: trocar pelo domínio final do app
    objective: [
      "Dar à AL Esquadrias um canal próprio onde o cliente vê o catálogo, monta a solicitação e pede orçamento, sem depender de ida e volta manual do vendedor pra montar cada proposta.",
      "E, depois da venda, resolver o problema que ninguém resolve: o cliente que fica no escuro esperando a obra andar. O app abre essa caixa-preta e mostra em que etapa a obra dele está.",
    ],
    challenge: [
      "Esquadria sob medida não se vende num carrinho de compras. Isso é o que a AL Modular faz com o produto padronizado. Aqui o preço depende de medição, de projeto, de negociação, e quem fecha é o vendedor, no WhatsApp. Automatizar do começo ao fim ia empurrar o cliente pra fora do jeito que ele já compra.",
      'O segundo problema vem depois do "sim": entre o pagamento e a instalação passam semanas de medição, fabricação e agendamento. Nesse vácuo o cliente liga, cobra, desconfia, e o vendedor vira central de atendimento.',
    ],
    solution: [
      'Em vez de brigar com o WhatsApp, o app usa o WhatsApp como parte do fluxo. O cliente navega no catálogo, monta a solicitação e clica em "Solicitar" e cai direto na conversa com o vendedor, com o pedido já formatado. O vendedor atende, negocia como sempre negociou, e gera um link de proposta que manda ali mesmo.',
      "O cliente clica no link e volta pro app já no passo seguinte, com a proposta liberada: ele vê, confere, aprova e segue pro pagamento, que pode acontecer dentro do app ou por fora, do jeito que a AL preferir.",
      "Fechado o negócio, o admin libera o acompanhamento e a obra vira uma linha do tempo: medição inicial, agendamento, fabricação, instalação. Cada mudança de status dispara um e-mail automático pro cliente, que fica sabendo antes de precisar perguntar.",
    ],
    highlights: [
      "Catálogo de produtos que vira solicitação de orçamento em um clique",
      "Handoff pro WhatsApp com o pedido já montado",
      "Link de proposta gerado pelo vendedor devolve o cliente ao app no passo certo",
      "Aprovação da proposta e pagamento (dentro do app ou externo)",
      "Acompanhamento da obra por até 1 ano, liberado por permissão do admin",
      "E-mail automático pro cliente a cada mudança de status",
    ],
    process: [
      {
        title: "Entendimento do funil real",
        description:
          "Mapeei como a AL Esquadrias já vendia: quem fala com o cliente, onde a negociação acontece, o que trava. O app foi desenhado em volta desse funil, não contra ele.",
      },
      {
        title: "Desenho do fluxo em etapas",
        description:
          "Cada estado do cliente (solicitou, tem proposta, aprovou, pagou, obra em andamento) virou um passo com regra clara de liberação, controlada pelo vendedor ou pelo admin.",
      },
      {
        title: "Construção e integrações",
        description:
          "Catálogo, área do cliente, painel de gestão de status e as duas pontas que sustentam o fluxo: o redirecionamento pro WhatsApp e o disparo de e-mail a cada atualização.",
      },
    ],
    // TODO: Kawan — troque por números reais quando o app rodar um ciclo completo.
    results: [
      { value: "1 ano", label: "de acompanhamento pós-venda" },
      {
        value: "5 etapas",
        label: "do catálogo ao pós-venda, num fluxo só",
      },
      { value: "100%", label: "das atualizações avisadas por e-mail" },
    ],
  },
  {
    slug: "barbearia-imperador",
    title: "Barbearia Imperador",
    client: "Barbearia Imperador · Mooca, São Paulo",
    year: "2026",
    category: "Site & Agendamento",
    summary:
      "24 serviços com preço e duração na tela, 4 planos de assinatura e agendamento a um toque.",
    intro:
      "A Imperador é barbearia clássica no coração da Mooca. A tabela de preço vivia no papel e no boca a boca, e os planos mensais, a parte que gera receita recorrente, não tinham onde ser explicados. O site resolveu as duas coisas na mesma página.",
    logo: "/img/logos/barbearia-imperador.webp",
    mockup: "browser",
    cover: "/img/cases/barbearia-imperador.webp",
    tags: ["React", "Serviços", "Assinatura"],
    services: ["Site institucional", "Design UI/UX", "Deploy"],
    stack: ["React", "TypeScript", "Tailwind CSS"],
    live: "https://barbearia-imperador-mooca.vercel.app/",
    objective: [
      "Colocar preço e duração de cada serviço na tela, a pergunta que mais chega antes de qualquer agendamento.",
      "Dar aos planos mensais uma vitrine própria: é o produto que troca corte avulso por receita recorrente.",
    ],
    challenge: [
      "24 serviços numa página viram um paredão de texto. Quem quer só a barba não deveria rolar por corte, luzes e limpeza de pele até achar.",
      "Quatro planos com regras parecidas (ilimitado, mas de seg a qui, mediante agendamento) confundem se forem só uma tabela, e plano mal explicado não é assinado.",
    ],
    solution: [
      "Serviços com filtro por categoria (Cabelo, Barba, Estética, Combos), cada aba com o contador do que tem dentro, e cada card mostrando duração e preço antes do botão de agendar.",
      "Planos como blocos comparáveis, do mais simples ao completo, com o recomendado marcado e as regras (dias de atendimento, validade de 30 dias) escritas onde a dúvida nasce, não no rodapé.",
      "O clássico como identidade visual: paleta escura, tipografia forte e a Mooca como endereço afirmado: quem procura barbearia procura a mais perto, e o bairro é argumento.",
    ],
    highlights: [
      "24 serviços filtráveis por categoria, com preço e tempo",
      "4 planos mensais + adicional Premium comparáveis lado a lado",
      "Agendamento a um toque em cada serviço",
      "Galeria do espaço e endereço em destaque",
    ],
    process: [
      {
        title: "Tabela antes de discurso",
        description:
          "A pergunta real de quem chega é preço e horário. O site responde isso antes de contar a história da casa.",
      },
      {
        title: "Plano como produto",
        description:
          "Os quatro planos ganharam bloco próprio, ordem de leitura e regras explícitas, pra serem assinados, não interpretados.",
      },
      {
        title: "Construção e deploy",
        description:
          "Site responsivo, com filtro de serviços e agendamento ligado em cada card.",
      },
    ],
    results: [
      { value: "24 serviços", label: "com preço e duração na tela" },
      { value: "4 planos", label: "de assinatura com regra clara" },
    ],
  },
  {
    slug: "travel-buena-vista",
    title: "Travel Buena Vista",
    client: "Travel Buena Vista · São Paulo, SP",
    year: "2026",
    category: "Site & Captação",
    summary:
      "Agência de viagens desde 2011: o site conta o jeito de atender e termina em pedido de orçamento.",
    intro:
      "A Travel Buena Vista monta roteiro sob medida e acompanha o cliente antes, durante e depois da viagem. Tem quem viaje com eles pelo terceiro ano seguido. O site precisava vender exatamente isso: não o pacote mais barato, mas a pessoa do outro lado.",
    mockup: "browser",
    cover: "/img/cases/travel-buena-vista.webp",
    tags: ["React", "Institucional", "Conversão"],
    services: ["Site institucional", "Design UI/UX", "Deploy"],
    stack: ["React", "TypeScript", "Tailwind CSS"],
    live: "https://travel-buena-vista.vercel.app/",
    objective: [
      "Dar à agência um endereço próprio, fora do feed, onde a história de 2011 pra cá cabe inteira.",
      "Transformar visita em orçamento pedido, por formulário ou WhatsApp, o que o cliente preferir.",
    ],
    challenge: [
      "Agência de viagem compete com plataforma de passagem, que ganha no preço e na escala. O argumento da TBV é o oposto: atendimento de perto. Isso não aparece numa tabela de preço, precisa ser mostrado.",
      "O catálogo é largo demais pra caber numa página: oito continentes, seis serviços, pacote, cruzeiro, aéreo e hospedagem. Sem hierarquia, vira lista.",
    ],
    solution: [
      "A página abre pelo jeito de atender e só depois abre o leque: destinos em carrossel por continente, serviços numerados de 01 a 06, cada um explicando uma decisão real de viagem (estrutura, localização ou sossego? conexão barata na tela ou cara na viagem?).",
      "Depoimentos de clientes reais, com nome e destino, posicionados depois da oferta, onde a dúvida \"será que funciona mesmo?\" aparece na leitura.",
      "Fechamento em dois caminhos: formulário curto de orçamento com promessa de resposta no mesmo dia útil, e WhatsApp pra quem não quer preencher nada.",
    ],
    highlights: [
      "8 continentes em carrossel navegável",
      "6 serviços explicados por decisão, não por catálogo",
      "Depoimentos reais com destino e avaliação",
      "Orçamento por formulário ou WhatsApp",
    ],
    process: [
      {
        title: "O que a agência vende de verdade",
        description:
          "O diferencial não era preço nem destino: era o acompanhamento. A página foi construída em cima disso.",
      },
      {
        title: "Hierarquia do catálogo",
        description:
          "Jeito de atender → destinos → serviços → prova → orçamento. Cada bloco preparando o próximo.",
      },
      {
        title: "Construção e deploy",
        description:
          "Site responsivo, com carrossel de destinos e formulário de orçamento integrado.",
      },
    ],
    // TODO: Kawan — quantos orçamentos o site trouxe? Esse número vale mais que os dois abaixo.
    results: [
      { value: "Desde 2011", label: "de estrada apresentados com prova" },
      { value: "2 caminhos", label: "pro orçamento: formulário ou WhatsApp" },
    ],
  },
  {
    slug: "ong-nova-historia",
    title: "ONG Nova História",
    client: "Associação Nova História",
    year: "2026",
    category: "Site & Doações",
    summary:
      "Site de uma ONG que trabalha com crianças, feito pra transformar quem se emociona em quem doa.",
    intro:
      "A Associação Nova História acredita que toda criança merece amor, oportunidade e a chance de chegar no seu potencial. O site existe pra que quem se identifica com essa causa consiga ajudar sem atrito.",
    logo: "/img/logos/ong-nova-historia.png",
    mockup: "browser",
    cover: "/img/cases/ong-nova-historia.webp",
    tags: ["React", "Social", "Doações"],
    services: ["Site institucional", "Design UI/UX", "Deploy"],
    stack: ["React", "TypeScript", "Tailwind CSS"],
    live: "https://ong-nova-historia.vercel.app/",
    objective: [
      "Dar à ONG um endereço digital sério, que passe credibilidade, o pré-requisito pra alguém confiar dinheiro a uma instituição.",
      'Encurtar ao máximo a distância entre "quero ajudar" e a doação de fato acontecer.',
    ],
    challenge: [
      "ONG vive de confiança e de doação recorrente, e ambas dependem de duas coisas que quase nenhuma tem: um lugar que explique a causa com clareza e um caminho de doação que não faça a pessoa desistir no meio.",
      "A comunicação estava espalhada em redes sociais, onde o alcance é de quem já segue, e onde não dá pra contar a história inteira.",
    ],
    solution: [
      "Um site que abre pela causa (as crianças, os pilares da instituição) e só depois pede, na ordem certa de quem quer convencer, não de quem quer arrecadar.",
      "Doação por PIX exposta sem burocracia, com o botão de doar acessível de qualquer ponto do site, e canal direto de contato por WhatsApp e formulário pra quem quer conversar antes.",
      "Blog alimentado pelo conteúdo do Instagram, pra que quem chega veja que a instituição está viva e trabalhando. Prova social é o que sustenta a confiança.",
    ],
    highlights: [
      'Botão "Doar Agora" e PIX em destaque',
      "Blog com as publicações da instituição",
      "Contato direto por WhatsApp e formulário",
      "CNPJ e dados públicos visíveis: transparência é conversão",
    ],
    process: [
      {
        title: "Escuta da causa",
        description:
          "Antes de desenhar, entender: quem a ONG atende, o que ela defende e o que faz alguém decidir doar.",
      },
      {
        title: "Narrativa antes do pedido",
        description:
          "A página foi montada como um argumento (causa, pilares, prova) e só então a doação.",
      },
      {
        title: "Construção e publicação",
        description:
          "Site responsivo, leve e no ar, pronto pra ser divulgado nas redes da instituição.",
      },
    ],
    results: [
      { value: "PIX", label: "doação em poucos toques" },
      { value: "4 pilares", label: "da causa apresentados com clareza" },
    ],
  },
  {
    slug: "kfm-descartaveis",
    title: "KFM Descartáveis",
    client: "KFM Descartáveis · Jardim Sul, São Paulo",
    year: "2026",
    category: "Catálogo & Painel",
    summary:
      "Catálogo de 44 produtos em 7 setores que o dono edita sozinho, e de onde o pedido sai escrito, direto no WhatsApp.",
    intro:
      "A KFM vende embalagens, descartáveis, limpeza, sacolas, utilidades e festa pra lojistas de São Paulo. O pedido sempre passou pelo WhatsApp, mas atravessado por um problema: o cliente não sabia o que a loja tinha. O site virou o catálogo que responde isso antes da conversa começar.",
    // Logo tirada do SVG do próprio site, com o texto clareado pro card dark.
    logo: "/img/logos/kfm.webp",
    mockup: "browser",
    cover: "/img/cases/kfm-web.webp",
    tags: ["React", "Catálogo", "WhatsApp"],
    services: [
      "Catálogo digital",
      "Painel administrativo",
      "Design UI/UX",
      "Deploy",
    ],
    stack: ["React", "TypeScript", "Tailwind CSS"],
    live: "https://kfm-web.vercel.app/",
    objective: [
      "Tirar o catálogo do álbum de fotos do celular e colocar num link que o lojista manda pra qualquer cliente.",
      "Fazer o pedido chegar identificado: com o nome do produto escrito, sem a rodada de \"tem esse aqui?\" antes de fechar.",
      "Entregar a edição do conteúdo pro dono: produto, preço, setor e dado da loja mudando sem depender de dev.",
    ],
    challenge: [
      "Catálogo grande é fácil de publicar e difícil de navegar: 44 produtos em 7 setores viram um monte indistinto se a busca não entender como o cliente fala.",
      "O público compra pelo celular, muitas vezes em aparelho fraco e rede ruim, e carregar tudo de uma vez mataria a página antes dela abrir.",
      "Nem todo produto tem preço fixo. Sumir com esses itens esconderia estoque; mostrar preço errado queimaria a venda.",
    ],
    solution: [
      "Catálogo organizado por setor, com contador de produtos em cada aba e busca que entende sinônimo: cada produto carrega as palavras que o cliente usa de verdade, então \"saco de lixo\" acha mesmo escrito diferente. Buscou dentro de um setor e não achou? O site avisa em qual setor aquilo mora.",
      "Carregamento de 24 em 24 produtos com \"ver mais\": a primeira tela abre rápido até no celular fraco, e o resto vem sob demanda.",
      "WhatsApp em toda parte, sempre com a mensagem pronta: no produto sai \"Pedir [nome] no WhatsApp\", no botão geral sai pedido de orçamento. Produto sem preço cadastrado assume isso na cara e convida a chamar.",
      "Painel completo pro dono: produto (foto em nuvem, setor, unidade, preço, descrição, palavras-chave), setores (nome, ícone, descrição) e dados da loja (WhatsApp, endereço, horário, Instagram, aviso de entrega). Destaque sobe o produto no catálogo; desmarcar \"visível\" tira do ar sem apagar, que é o jeito certo de tratar falta de estoque.",
    ],
    highlights: [
      "Busca com sinônimos e sugestão de setor",
      "Paginação de 24 em 24, que abre rápido no celular fraco",
      "Pedido no WhatsApp já escrito com o nome do produto",
      "Link direto do setor: segurar o dedo 2s gera e compartilha",
      "Entrada do painel escondida atrás de 5 cliques na logo",
      "Bloqueio por 1h e e-mail de alerta após tentativas de senha",
      'Produto oculto sem ser apagado: o "acabou o estoque" resolvido',
    ],
    process: [
      {
        title: "Mapa do estoque",
        description:
          "Entender o que a loja vende e como o cliente pede: daí saíram os 7 setores e as palavras-chave da busca.",
      },
      {
        title: "Catálogo antes de institucional",
        description:
          "A página abre pelo produto, não pela história da loja, porque quem chega veio comprar.",
      },
      {
        title: "Painel pro dono",
        description:
          "Cadastro, setores e dados da loja na mão dele, com foto em nuvem e alteração refletindo no site na hora.",
      },
    ],
    results: [
      { value: "44 produtos", label: "organizados em 7 setores" },
      { value: "24 por vez", label: "carregamento pensado pra rede ruim" },
      { value: "0 dev", label: "pra mudar preço, produto ou horário" },
    ],
  },
  {
    slug: "vg-facilities",
    title: "VG Facilities",
    client: "VG Prevenções · São Paulo, SP",
    year: "2026",
    category: "Site institucional",
    summary:
      "Site de uma empresa de facilities e segurança patrimonial: autoridade, portfólio de serviços e orçamento sem fricção.",
    intro:
      "A VG atua com manutenção predial, segurança patrimonial, limpeza, controle de acesso e gestão de facilities. O site precisava fazer o que um vendedor faz numa reunião: mostrar competência e sair com o orçamento marcado.",
    logo: "/img/logos/vg.png",
    mockup: "browser",
    cover: "/img/cases/vg-facilities.webp",
    tags: ["React", "Institucional", "Conversão"],
    services: ["Site institucional", "Design UI/UX", "Deploy"],
    stack: ["React", "TypeScript", "Tailwind CSS"],
    live: "https://vg-facilities.vercel.app/",
    objective: [
      "Posicionar a VG como empresa séria diante de quem contrata facilities (síndicos, gestores prediais, lojistas), que decidem por confiança e comparação.",
      "Fazer o site trabalhar como canal de captação: cada visita deve terminar num pedido de orçamento.",
    ],
    challenge: [
      "Facilities é um mercado de licitação informal: o cliente pede orçamento pra três, quatro empresas e escolhe pela que parece mais preparada. Quem não tem presença digital não entra nem na lista.",
      "E é um leque grande de serviços: manutenção, segurança, limpeza, portaria, paisagismo. Jogar tudo na cara do visitante confunde; esconder faz perder contrato.",
    ],
    solution: [
      "Organizei o leque em blocos de serviço legíveis, cada um explicado no idioma de quem contrata: o que é, pra quem serve, o que resolve.",
      "A prova vem em seguida: depoimentos, portfólio de clientes e um FAQ que mata as objeções que o vendedor ouviria na reunião (documentação, qualificação da equipe, abrangência).",
      "E o orçamento fica sempre a um toque: WhatsApp e formulário disponíveis do topo ao rodapé.",
    ],
    highlights: [
      "Serviços organizados em blocos escaneáveis",
      "Depoimentos e portfólio como prova social",
      "FAQ que antecipa as objeções da venda",
      "WhatsApp e formulário de orçamento em toda a página",
    ],
    process: [
      {
        title: "Mapa dos serviços",
        description:
          "Separar oito frentes de atuação em blocos que o visitante consiga ler em segundos, sem se perder.",
      },
      {
        title: "Argumento de autoridade",
        description:
          "Depoimentos, clientes e FAQ posicionados exatamente onde a dúvida aparece na leitura.",
      },
      {
        title: "Construção e deploy",
        description:
          "Site responsivo, rápido e no ar, com os canais de contato integrados.",
      },
    ],
    // TODO: Kawan — se souber quantos orçamentos o site trouxe, esse número vale mais que tudo aqui.
    results: [
      { value: "8 serviços", label: "organizados em blocos claros" },
      { value: "WhatsApp", label: "orçamento a um toque, em toda a página" },
    ],
  },
  // Os projetos entregues via consultoria (contrato PJ) NÃO entram aqui.
  //
  // O contrato proíbe revelar informações acessadas na prestação (cláusula 8.1) e
  // dá a propriedade do resultado à contratante (9.1) — sigilo durante a vigência
  // + 2 anos. Sem nome de cliente, sem logo, sem print, sem código.
  //
  // Só dá pra publicar com autorização POR ESCRITO da consultoria.
];

export const projectsSection = {
  kicker: "01 / Projetos",
  heading: "Trabalho que *fala por mim*.",
  description:
    "Do problema ao produto no ar. Entra em cada case pra ver como foi.",
  ctaLabel: "Ver o case",
};

export function getProject(slug?: string) {
  return projects.find((p) => p.slug === slug);
}

/* -------------------------------------------------------------------------- */
/*  Produtos — o que a VYSO vende pronto                                      */
/* -------------------------------------------------------------------------- */

/**
 * Produto ≠ projeto. Projeto é trabalho sob medida, entregue e encerrado;
 * produto é da VYSO, fica no ar e cobra assinatura. Por isso a seção é
 * separada e vem logo depois dos cases: o visitante acabou de ver que a casa
 * entrega, então é a hora de mostrar o que dá pra ter hoje, sem orçamento.
 */
export interface ProductPlan {
  name: string;
  price: string;
  /** Linha miúda embaixo do preço ("/mês", "para sempre"). */
  period?: string;
  description?: string;
  features: string[];
  /** Destaca o plano no grid. Use em no máximo um. */
  featured?: boolean;
}

export interface Product {
  slug: string;
  name: string;
  /** A promessa em uma linha. `*trecho*` sai em cor de destaque. */
  tagline: string;
  summary: string;
  /** Selo acima do nome — oferta, teste grátis, status. */
  badge?: string;
  /** Rótulo em cima dos chips de `audience`. */
  audienceLabel: string;
  /** Nichos que o produto atende, ou o que ele oferece; viram chips. */
  audience: string[];
  highlights: { title: string; description: string }[];
  cover?: string;
  /** Domínio exibido na barra do mockup de navegador. */
  mockupUrl: string;
  /** Só pra produto de assinatura. Loja e afins não têm plano: omite e o grid some. */
  plans?: ProductPlan[];
  cta: { label: string; href: string };
}

export const productsSection = {
  kicker: "04 / Produtos",
  heading: "O que a VYSO *vende pronto*.",
  description:
    "Fora o sob medida, a VYSO toca negócio próprio. A loja roda no mesmo código que a gente entrega pra cliente.",
};

export const products: Product[] = [
  {
    slug: "vyso-loja",
    name: "VYSO · vyso.com.br",
    tagline: "Seu estilo, *sem esforço*.",
    summary:
      "Roupas e acessórios que combinam entre si, com frete grátis para todo o Brasil, Pix na hora e até 12x no cartão. Loja própria da VYSO, do catálogo ao estorno.",
    badge: "Frete grátis para todo o Brasil",
    audienceLabel: "O que tem na loja",
    audience: ["Roupas femininas", "Roupas masculinas", "Acessórios", "Calçados", "Presentes"],
    cover: "/img/cases/vyso-loja.webp",
    mockupUrl: "vyso.com.br",
    highlights: [
      {
        title: "Peças que combinam entre si",
        description:
          "Básico bem feito: pega qualquer uma, veste com qualquer outra. Montar o look deixa de ser decisão.",
      },
      {
        title: "Pix na hora, cartão em até 12x",
        description:
          "Pagamento confirmado no ato e o pedido já sai pra separação. Frete grátis em qualquer canto do país.",
      },
      {
        title: "Loja feita do zero pela VYSO",
        description:
          "Vitrine, carrinho, checkout, estoque, trocas e painel são código próprio. O mesmo que a gente entrega, rodando no nosso negócio.",
      },
    ],
    cta: {
      label: "Visitar a loja",
      href: "https://vyso.com.br/",
    },
  },
];

export interface Service {
  title: string;
  description: string;
  icon: string; // nome do ícone lucide-react
}

/**
 * Depoimentos reais, tirados do destaque "Depoimentos" do Instagram
 * @vyso.store (stories capturados em 05/10/2026). Texto transcrito do print,
 * sem edição, pra leitor de tela e pro Google. Não inventar depoimento.
 */
export interface Testimonial {
  name: string;
  /** Quem é e onde o depoimento foi dado. */
  context: string;
  quote: string;
  image: string;
  /** Depoimento em vídeo: `image` vira o pôster. */
  video?: string;
}

export const testimonialsSection = {
  kicker: "02 / Depoimentos",
  heading: "Quem contratou *indica*.",
  description:
    "Prints e vídeo de clientes reais, do jeito que chegaram no WhatsApp, no LinkedIn e no Instagram.",
};

export const testimonials: Testimonial[] = [
  {
    name: "Amanda Mendes",
    context: "Cliente, em vídeo no Instagram",
    quote: "Coisa boa de verdade a gente indica de olhos fechados!",
    image: "/img/depoimentos/amanda-poster.webp",
    video: "/video/depoimento-amanda.mp4",
  },
  {
    name: "Valdemir Gonçalves",
    context: "Avaliação de 5 estrelas no LinkedIn",
    quote:
      "Foi um projeto inteiramente novo, o mesmo demonstrou uma desenvoltura quanto ao serviço prestado, como também um vasto interesse. Com certeza eu indico o trabalho do Kawan!",
    image: "/img/depoimentos/valdemir-amanda.webp",
  },
  {
    name: "Dom, Barbearia Imperador",
    context: "No WhatsApp, na entrega do site",
    quote: "Muito bom o atendimento, sempre solícito. Acredito que essa parceria será muito benéfica.",
    image: "/img/depoimentos/barbearia-imperador.webp",
  },
];

/** Programa de indicação, igual ao story "Indique e ganhe" do Instagram. */
export const referral = {
  title: "Indicou, *ganhou*.",
  reward: "R$ 100",
  rewardLabel: "por indicação que virar cliente",
  image: "/img/depoimentos/indique-e-ganhe.webp",
  steps: [
    { title: "Você indica", description: "Indique a VYSO pra alguém que precisa de site, loja ou sistema." },
    { title: "A pessoa fecha", description: "Quando ela fecha o projeto com a gente." },
    { title: "Você ganha", description: "Você recebe R$ 100 como recompensa." },
  ],
  cta: "Quero indicar alguém",
  message:
    "Oi, Kawan! Cheguei pelo site da VYSO 👋\n\nQuero indicar uma pessoa que precisa de site ou sistema.",
};

export interface FaqItem {
  question: string;
  /** Parágrafos da resposta. */
  answer: string[];
  /** Lista opcional depois do primeiro parágrafo. */
  bullets?: string[];
}

/**
 * Perguntas frequentes. Substituiu a seção de serviços ("Qualidade de agência,
 * agilidade de freela"), que o Kawan achou genérica: o que a VYSO faz virou a
 * primeira pergunta, e o resto responde o que trava o fechamento.
 * Só entra aqui o que for verdade; prazo e preço não têm número inventado.
 */
export const faqSection = {
  kicker: "03 / Dúvidas",
  heading: "O que todo cliente pergunta *antes de fechar*.",
  description:
    "Se a sua dúvida não está aqui, manda no WhatsApp. Você fala direto com quem vai construir.",
};

export const faq: FaqItem[] = [
  {
    question: "O que a VYSO faz?",
    answer: ["Tecnologia sob medida pra pequeno e médio negócio, do primeiro rascunho ao projeto no ar:"],
    bullets: [
      "Sites institucionais e páginas de venda",
      "Lojas virtuais com Pix, cartão e frete",
      "Sistemas, apps e painéis pra tocar a operação",
      "Automações e integrações que tiram o trabalho manual",
      "Manutenção e evolução de site que já existe",
    ],
  },
  {
    question: "Vocês emitem nota fiscal?",
    answer: ["Sim. Emitimos nota fiscal em todos os projetos."],
  },
  {
    question: "Tem contrato?",
    answer: [
      "Sim. Todo projeto tem contrato, com escopo, prazo e valor por escrito. Ele protege as duas partes: você sabe exatamente o que vai receber, e a gente sabe exatamente o que precisa entregar.",
    ],
  },
  {
    question: "Em quanto tempo fica pronto o meu projeto?",
    answer: [
      "Depende do projeto, porque tudo aqui é feito sob medida. Antes de começar, a gente define o escopo com você de forma objetiva, sem item vago, e combina a data de entrega. A meta é sempre entregar o mais rápido possível sem abrir mão da qualidade.",
    ],
  },
  {
    question: "Como funciona a página de vendas em 24 horas?",
    answer: [
      "Antes de fechar qualquer acordo, a gente monta um protótipo da sua página pra você ver se faz sentido pro seu negócio.",
      "Fechou, esse protótipo vira a base da entrega: estrutura, seções e textos já estão de pé, falta só o acabamento. É por reaproveitar essa base que dá pra entregar em até 24 horas.",
    ],
  },
  {
    question: "Já tenho um site. Vocês assumem?",
    answer: [
      "Sim. A gente avalia o que existe, diz com franqueza o que vale manter e o que precisa refazer, e assume a manutenção ou a evolução a partir daí.",
    ],
  },
  {
    question: "E depois que o projeto fica pronto?",
    answer: [
      "Você não fica sozinho. Os planos de suporte cuidam de hospedagem, domínio, segurança, backups e ajustes do mês, a partir de R$ 60 por mês, sem fidelidade.",
    ],
  },
  {
    question: "Atendem fora de São Paulo?",
    answer: [
      "Sim. O atendimento é todo online, pelo WhatsApp e por chamada, então a distância não muda nada no projeto.",
    ],
  },
];

export const services: Service[] = [
  {
    title: "Sites & Landing Pages",
    description:
      "Páginas que carregam rápido, convertem e passam autoridade, do design ao deploy.",
    icon: "LayoutTemplate",
  },
  {
    title: "Aplicações Web",
    description:
      "Sistemas completos com React + Node.js: dashboards, áreas logadas e integrações.",
    icon: "AppWindow",
  },
  {
    title: "Interfaces Premium",
    description:
      "UI moderna com animação e microinteração que dá um nível a mais no seu produto.",
    icon: "Sparkles",
  },
  {
    title: "Manutenção & Evolução",
    description:
      "Melhorias contínuas, correções e otimização de performance no seu projeto atual.",
    icon: "Wrench",
  },
];

export interface SupportPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  tagline: string;
  /** Selo curto no topo do card destacado. */
  badge?: string;
  /** Card com moldura de brasa — o plano que a gente quer que entre primeiro. */
  featured?: boolean;
  /** Plano sob orçamento: o preço vira texto e some o link de assinatura. */
  quote?: boolean;
  /** Linha miúda embaixo do preço (ex.: a manutenção base que já está inclusa). */
  priceNote?: string;
  /** Ids de `supportFeatures` que este plano inclui. O resto aparece com ✗. */
  includes: SupportFeatureId[];
  /** Detalhe por item (ex.: `ajustes: "2 × 45min"`) — sai em miúdo do lado do rótulo. */
  notes?: Partial<Record<SupportFeatureId, string>>;
  ctaLabel: string;
  whatsappMessage: string;
  /**
   * Payment Link do Stripe (assinatura recorrente em BRL) — cole aqui o
   * `https://buy.stripe.com/...` gerado no dashboard. Enquanto estiver vazio,
   * o link "já sou cliente" simplesmente não aparece no card.
   * Planos `quote` não usam esse campo — o fechamento é no WhatsApp.
   */
  stripeLink: string;
}

/**
 * Itens de comparação — todo card lista os mesmos, na mesma ordem. O que o
 * plano tem sai com ✓, o que não tem sai com ✗. É isso que deixa a diferença
 * entre os planos óbvia sem o cliente precisar cruzar as listas na mão.
 */
export interface SupportFeature {
  id: string;
  label: string;
}

export const supportFeatures = [
  { id: "hospedagem", label: "Configuração de Hospedagem, domínio + SSL" },
  { id: "uptime", label: "Monitoramento de uptime 24/7" },
  { id: "backups", label: "Backups e atualizações de segurança" },
  { id: "ajustes", label: "Ajustes mensais inclusos" },
  { id: "suporte", label: "Suporte no WhatsApp" },
  { id: "relatorio", label: "Relatório mensal de performance" },
  { id: "seo", label: "Ajustes contínuos de SEO e velocidade" },
  { id: "landing", label: "Página de vendas sob medida" },
  { id: "integracoes", label: "Integração com WhatsApp, pixel e analytics" },
  { id: "sistemas", label: "Sistemas, automações e agentes de IA" },
] as const satisfies readonly SupportFeature[];

/** Só os ids que existem acima — id errado em `includes` vira erro de compilação. */
export type SupportFeatureId = (typeof supportFeatures)[number]["id"];

export const supportSection = {
  kicker: "05 / Suporte",
  heading: "Site no ar é *manutenção*, não sorte.",
  description:
    "Seu site monitorado, atualizado e com ajustes contínuos por um valor fixo no mês. Precisa de mais que manutenção? A gente conversa e monta o escopo junto.",
  /** Letra miúda no fim da seção — as ressalvas que evitam mal-entendido depois. */
  note: "Assinatura mensal, sem fidelidade. Cancela quando quiser. O domínio é pago à parte, direto no registrador: a gente cobre até R$ 40 dele na primeira mensalidade, e o que passar disso fica por sua conta. Nos planos sob consulta, o escopo e o valor a gente fecha no WhatsApp antes de qualquer cobrança.",
};

export const supportPlans: SupportPlan[] = [
  {
    id: "essencial",
    name: "Essencial",
    price: "R$ 60",
    period: "/mês",
    tagline: "Pro seu site continuar rápido, seguro e no ar.",
    badge: "Comece por aqui",
    featured: true,
    includes: ["hospedagem", "uptime", "backups", "ajustes", "suporte"],
    notes: { ajustes: "2 × até 45min", suporte: "resposta em 48h" },
    ctaLabel: "Quero o Essencial",
    whatsappMessage:
      "Oi, Kawan! Cheguei pelo site da VYSO 👋\n\nQuero assinar o plano *Essencial* (R$ 60/mês) de suporte pro meu site.",
    stripeLink: "https://buy.stripe.com/dRm7sKdww7588f4cqjco001",
  },
  {
    id: "evolucao",
    name: "Evolução",
    price: "R$ 180",
    period: "/mês",
    tagline:
      "Pra quem trata o site como canal de venda, não como cartão de visita.",
    includes: [
      "hospedagem",
      "uptime",
      "backups",
      "ajustes",
      "suporte",
      "relatorio",
      "seo",
    ],
    notes: { ajustes: "5 × até 1h", suporte: "prioritário, em 24h" },
    ctaLabel: "Quero o Evolução",
    whatsappMessage:
      "Oi, Kawan! Cheguei pelo site da VYSO 👋\n\nQuero assinar o plano *Evolução* (R$ 180/mês) de suporte pro meu site.",
    stripeLink: "https://buy.stripe.com/8x2aEW7881KO52Scqjco002",
  },
  {
    id: "pagina-de-vendas",
    name: "Suporte + Página de vendas",
    price: "Sob consulta",
    period: "",
    quote: true,
    priceNote: "Manutenção a partir de R$ 60/mês",
    tagline:
      "Uma landing feita pra vender, mais o suporte que mantém ela no ar.",
    includes: [
      "hospedagem",
      "uptime",
      "backups",
      "ajustes",
      "suporte",
      "relatorio",
      "seo",
      "landing",
      "integracoes",
    ],
    notes: {
      ajustes: "5 × até 1h",
      suporte: "prioritário, em 24h",
      landing: "construída do zero",
    },
    ctaLabel: "Entrar em contato",
    whatsappMessage:
      "Oi, Kawan! Cheguei pelo site da VYSO 👋\n\nQuero entender o plano de *Suporte + Página de vendas*, tenho uma oferta pra colocar no ar.",
    stripeLink: "",
  },
  {
    id: "sistemas",
    name: "Sistemas & Automações",
    price: "Sob consulta",
    period: "",
    quote: true,
    priceNote: "Manutenção a partir de R$ 60/mês",
    tagline:
      "Quando o gargalo não é o site, é o processo que roda por trás dele.",
    includes: [
      "hospedagem",
      "uptime",
      "backups",
      "ajustes",
      "suporte",
      "relatorio",
      "seo",
      "integracoes",
      "sistemas",
    ],
    notes: {
      ajustes: "escopo combinado",
      suporte: "prioritário, em 24h",
      sistemas: "dashboards, áreas logadas, IA",
    },
    ctaLabel: "Entrar em contato",
    whatsappMessage:
      "Oi, Kawan! Cheguei pelo site da VYSO 👋\n\nQuero conversar sobre *sistemas e automações*, tenho um processo que precisa sair do manual.",
    stripeLink: "",
  },
];

// Seção imersiva WebGPU (respiro visual antes do contato).
export const immersive = {
  title: "Feito para impressionar",
  subtitle:
    "O nível de detalhe que separa um site comum de uma experiência premium.",
  cta: "Bora criar o seu",
};

export const contact = {
  kicker: "08 / Contato",
  heading: "Tem um projeto? A VYSO *entrega*.",
  description:
    "Chama a gente e transforma sua ideia num produto digital de verdade. Resposta rápida.",
  email: "kawanwagnner.gs@gmail.com",
  // O CTA principal é o WhatsApp: quem quer contratar quer falar, não seguir.
  ctaLabel: "Chamar no WhatsApp",
};

/**
 * WhatsApp — o `wa.me` já é o link universal: quem tem o WhatsApp normal abre
 * nele, quem tem o Business abre no Business, e quem tem os dois é o próprio
 * celular que pergunta qual usar. Site nenhum consegue detectar app instalado
 * (o navegador não expõe isso) — e nem precisa: o sistema resolve.
 */
export const whatsapp = {
  number: "5511989220824", // internacional, só dígitos
  display: "(11) 98922-0824",
  /**
   * Rótulo do CTA de WhatsApp em todo o site (navbar, herói, botão flutuante).
   * O tráfego vem do Instagram — devolver a pessoa pra lá é um loop. O que
   * converte é a conversa, então o botão mais visível da página é este.
   */
  cta: "Vamos conversar?",
  // Mensagem já digitada pro cliente — tira o atrito do "e agora, o que eu escrevo?"
  message:
    "Oi, Kawan! Cheguei pelo site da VYSO 👋\n\nTenho um projeto em mente e queria entender como a gente pode tirar do papel.",
};

/** Mesmo `wa.me` de sempre, com a mensagem já digitada pro contexto do clique. */
export const whatsappLink = (message: string) =>
  `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(message)}`;

export const socials = {
  instagram: "https://www.instagram.com/vyso.store/",
  github: "https://github.com/kawanwagnner",
  email: "mailto:kawanwagnner.gs@gmail.com",
  whatsapp: whatsappLink(whatsapp.message),
};

/** Mesma ordem das seções na home (ver `pages/Home.tsx`): produto primeiro. */
export const nav = [
  // `barra` = aparece na navbar do desktop, que tem largura contada. Sem a
  // marca, o item só entra no rodapé e no menu do celular, que são listas e
  // não disputam espaço: "Início" é o que o logo já faz, e A VYSO / Founder
  // são institucionais — quem chega quer ver trabalho, preço e contato.
  { label: "Início", href: "#hero" },
  { label: "Projetos", href: "#projetos", barra: true },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Produtos", href: "#produtos", barra: true },
  { label: "Dúvidas", href: "#duvidas", barra: true },
  { label: "Suporte", href: "#suporte", barra: true },
  { label: "A VYSO", href: "#sobre" },
  { label: "Founder", href: "#founder" },
  { label: "Contato", href: "#contato", barra: true },
];

/** Só o que cabe (e vende) na barra fixa do desktop. */
export const navBarra = nav.filter((item) => item.barra);
