# AL Modular / AL Esquadrias — onde paramos e o que falta

> Última atualização: **29/07/2026**
> Escopo: reestruturação dos cases da AL no portfólio V2 (`v2/src/data/content.ts`).
> Este doc guarda a sessão inteira: o que foi levantado, o que foi decidido, o
> que foi escrito e o que ficou pendente.

---

## 1. Contexto: o que mudou

O projeto da AL deixou de ser um cliente com dois sistemas e virou **duas marcas
distintas do mesmo grupo**, com propósitos diferentes:

| Marca | Público | O que é | Endereço |
|---|---|---|---|
| **AL Modular Esquadrias** | B2C | E-commerce completo: loja + painel de gestão | [almodularesquadrias.com.br](https://www.almodularesquadrias.com.br/) |
| **AL Esquadrias** | B2B | App mobile: catálogo + acompanhamento de obra | ainda sem domínio final |

A AL Modular é a **filial que vende produto pronto** — preço na tela, o cliente
fecha sozinho. A AL Esquadrias é o **sob medida**, com vendedor, projeto e
medição no meio do funil. Um não substitui o outro: são funis diferentes.

O antigo case "Site institucional" **deixou de existir** — o e-commerce ocupou o
domínio, então não há mais site institucional separado pra mostrar.

---

## 2. Log da sessão

**Ponto de partida.** O aviso foi que o projeto da AL virou "um e-commerce
normal de novo, não é mais um catálogo só", com o link do domínio.

**Reconhecimento.** Tentei ler o site por fetch e não veio nada — é SPA React +
Vite, renderiza tudo no cliente. Fui de navegador. O Chrome estava **logado como
admin**, então a raiz redirecionou direto pro `/admin`; consegui mapear os dois
lados (loja e painel) na mesma passada. O inventário completo está na seção 5.

**Definição da estrutura (ida e volta).** A forma final saiu em etapas:

1. Primeiro ficou definido que o case teria **duas partes: Loja + Painel admin**
   — e não mais `app` + `site institucional`.
2. Depois veio a correção importante: *"são cases diferentes o de acompanhamento
   e o ecommerce"* — ou seja, o app **não** é aba do e-commerce, é case próprio.
3. E a correção que mudou tudo: **são clientes diferentes.** O app é da **AL
   Esquadrias (B2B)**; o e-commerce é da **AL Modular Esquadrias (B2C)**. Não é
   um cliente com dois sistemas — são duas marcas.
4. Fechou com: o e-commerce é *"tipo uma filial com um propósito diferente do
   app"*, e o app *"serve como um catálogo de produtos e acompanhamento de obras"*.

**Stacks.** Vieram depois da escrita dos cases: app em **React Native**;
back do e-commerce em **NestJS + Prisma + PostgreSQL**; gateway **Mercado Pago**;
logo da AL Esquadrias emprestada da filial por enquanto.

---

## 3. Decisões tomadas (e o que foi assumido)

| Decisão | Motivo |
|---|---|
| Dois projetos independentes no `content.ts` | Marcas e clientes diferentes — não cabe como abas do mesmo card |
| AL Modular fica com `featured: true` | É a que está no ar, com produto navegável e link público |
| Aba "Site institucional" removida | O e-commerce ocupou o domínio; não existe mais o que mostrar |
| `challenge` do app reescrito como contraste entre as marcas | Vira narrativa: o padronizado vai pro carrinho, o sob medida vai pro app |
| `results` com métricas estruturais, não números do dashboard | O dashboard só tem dado de teste (1 pedido, R$ 25,12) — não vende case |
| Tailwind **fora** da stack do app | Em React Native só entra via NativeWind; não afirmei sem confirmar (ver 6.6) |

**Assumido sem confirmação explícita:** que **"B2S" era typo de B2C**. O site tem
Pix, parcelamento em 12x, frete por CEP e conta de cliente — comportamento de
consumidor final. Os textos foram escritos nessa chave. Se for outra coisa, os
cases da Loja e do Painel precisam de revisão.

---

## 4. O que já foi feito

### `v2/src/data/content.ts`

O card único com abas `app` + `site` virou **dois projetos independentes**:

```
projects[]
├── al-modular          "AL Modular Esquadrias" · E-commerce · featured
│     ├── parts[0]  "Loja"              (mockup: browser)
│     └── parts[1]  "Painel de gestão"  (mockup: browser)
│
└── al-esquadrias       "AL Esquadrias" · App Mobile
      (sistema único, sem parts — mockup: phone)
```

**Case da Loja** foi escrito em cima do que o site realmente entrega. O
`challenge` é a dor concreta do produto: cada esquadria existe em dezenas de
combinações de medida × módulos × acabamento, cada uma com preço próprio — o
difícil era colocar isso num catálogo sem virar formulário de engenharia. E o
frete de peça grande, que precisa aparecer **antes** do checkout.

**Case do Painel** cobre as 8 áreas do `/admin`. O `challenge` aqui é o risco de
painel virar depósito de tabela, mais o fato de a operação ter que caber dois
mundos (carrinho + orçamento sob medida) sem virar dois produtos.

**Case do App** reaproveitou o texto que já estava bom — o fluxo WhatsApp →
proposta → pagamento → linha do tempo da obra continua valendo inteiro.

### Stacks confirmadas

| Sistema | Stack |
|---|---|
| Loja + Painel | React · TypeScript · Tailwind · NestJS · Prisma · PostgreSQL · Mercado Pago |
| App | React Native · TypeScript · Node.js |

### Outros arquivos tocados

- `v2/src/components/sections/Projects.tsx` — comentários do filtro de plataforma
  (falavam de "site + app", agora é "loja + painel")
- `v2/src/pages/ProjectCase.tsx` — comentário do `?sistema=`
- `README.md` (raiz) — tabela "O que eu construí"

### Estado da verificação

- `tsc --noEmit -p v2/tsconfig.json` → **exit 0**
- `npm run build` no `v2/` → **passa**
- **Commitado e publicado** em `69cd4ac` (`feat(v2): AL vira dois cases —
  e-commerce B2C e app B2B`), direto na `main`. Falta a validação no ar (ver 6.1).

---

## 5. Inventário da loja no ar (levantado no navegador)

Fica registrado porque é a base factual dos textos dos cases — se algo aqui
mudar, o case desatualiza.

### Loja

- **Header:** busca (*"O que você procura? Ex: janela de correr..."*), Minha
  conta (`/login`), Meus pedidos (`/rastreamento`), carrinho (`/carrinho`)
- **Categorias:** Janelas · Janelas de Correr · Portas · Portas Camarão ·
  Vitrô Basculante — em `/categoria/<slug>`
- **Página de produto** (`/produto/<slug>`): breadcrumb, badges (DESTAQUE,
  LANÇAMENTO), campo de SKU, variação **Modelo/Tamanho** (40x40, 50x50, 60x60 ×
  1 ou 2 módulos) e **Cor/Acabamento** (Natural, Branco, Preto, Amadeirado,
  Bronze), preço via Pix com selo "Pagamento instantâneo", até 12x sem juros,
  seletor de quantidade, Adicionar ao Carrinho, Comprar Agora, Calcular Frete
  por CEP (com atalho "Não sei meu CEP"), Descrição, Detalhes e Especificações
  (Altura, Largura, Folhas, Módulos)
- **Rodapé:** Sobre a loja, Política de privacidade, Trocas e devoluções, Termos
  de uso, "PAGUE COM" (Visa, Elo), selos, CNPJ e razão social
  (*AL Modular Esquadrias Comércio Eletrônico LTDA*), © 2026
- **WhatsApp flutuante** em todas as páginas
- **404 tratada**, com "Voltar para a loja"
- **Front:** React + Vite (SPA, `div#root`) — não é Next.js

### Painel (`/admin`)

- **Dashboard:** cards de Usuários, Produtos, Pedidos e Receita Total; gráfico de
  vendas dos últimos 6 meses; distribuição de pedidos por status; tabela de
  pedidos recentes
- **Áreas:** Dashboard · Usuários · Produtos · Categorias · Pedidos · Orçamentos ·
  Cupons · Carrinho Abandonado
- **Ciclo do pedido:** Pendente → Confirmado → Enviado → Entregue → Cancelado
- Central de notificações e atalho "Visualizar loja"

---

## 6. O que faltou

### 🔴 Bloqueia a publicação

**6.1. Validação no ar**
O código subiu (commit `69cd4ac`, push na `main`) e o deploy do `vyso.store` sai
daí. Falta conferir no site publicado:

- card da **AL Modular** com as duas abas (Loja · Painel de gestão), e sem a
  antiga aba "Site institucional"
- card da **AL Esquadrias** aparecendo no filtro **Mobile**
- `/projetos/al-modular?sistema=loja` e `?sistema=painel` abrindo na aba certa

### 🟠 Enfraquece o case (resolver antes de usar pra divulgação)

**6.2. Prints das telas**
Nenhum dos cases tem `cover` nem `gallery` — o card desenha um bloco de marca no
lugar. Esse é o maior buraco: agora que o e-commerce está no ar, dá pra printar
de verdade. O que vale capturar:

- Loja: home, página de categoria, página de produto com as variações abertas
- Painel: o dashboard (é a tela que mais impressiona — números, gráfico, status)
- App: as telas de catálogo, proposta e a linha do tempo da obra

Arquivos vão em `v2/public/img/` e são apontados em `cover` / `gallery`.
⚠️ Nos prints do painel, **borrar ou trocar dados reais de cliente e pedido.**

**6.3. Números reais nos `results`**
Os três blocos estão com métricas estruturais (5 categorias, 12x, 8 áreas, 5
status, 6 meses) porque o dashboard hoje só tem dado de teste. Quando a loja
rodar um mês cheio, trocar por **pedidos no período, ticket médio, taxa de
conversão e faturamento**. Os TODOs já estão marcados no arquivo. Mesma coisa
pro app, quando rodar um ciclo completo (solicitação → obra entregue).

**6.4. Link `live` do app**
Ainda aponta pra `https://share.google/MUIMGq52pSqslkgzW`. Trocar pelo domínio
final quando existir — ou pela loja da App Store / Play Store, já que é React
Native.

### 🟡 Detalhe

**6.5. Logo própria da AL Esquadrias**
Hoje empresta `/img/logos/al-modular.png`. São marcas diferentes, então a longo
prazo isso confunde. Arquivo novo vai em `v2/public/img/logos/`.

**6.6. NativeWind na stack do app**
Tailwind ficou de fora da stack do app. Se o app usa NativeWind, é só repor.

**6.7. Modelo do Mercado Pago**
Está listado na stack, mas o case não diz se é Checkout Pro (redireciona) ou
Checkout Transparente (paga sem sair do site). O segundo é bem mais forte de
contar — se for o caso, vale uma linha no `solution`.

---

## 7. Achados sobre a loja (fora do escopo do portfólio)

Coisas que apareceram durante o reconhecimento e que valem um olhar — não têm a
ver com o portfólio, mas estão em produção:

- **O crédito do rodapé aponta pro portfólio V1** (`kawanwagnner.github.io/Portfolio/`),
  não pro `vyso.store`. É tráfego qualificado indo pro endereço antigo.
- **Preços de teste em produção:** os produtos que abri estavam a R$ 1,00, e o
  único pedido registrado é de R$ 25,12 no nome "Guest".
- **"100% vs mês anterior"** aparece igual nos quatro cards do dashboard — tem
  cara de cálculo com base zero, não de variação real.
- **SKU vazio** na página de produto que abri (o rótulo aparece, o valor não).

---

## 8. Próximos passos, na ordem

1. **Revisar os textos dos cases.** Foram escritos a partir do que dava pra ver
   de fora — pode ter dor real do cliente que deixaria o `challenge` mais forte.
2. ~~Commit e push.~~ **Feito** (`69cd4ac`). Falta **validar no `vyso.store`** —
   o checklist está em 6.1.
3. **Tirar os prints** e ligar em `cover` / `gallery`.
4. **Voltar aqui quando tiver número real** e trocar os `results`.

---

## 9. Referências rápidas

| O que | Onde |
|---|---|
| Dados dos cases | `v2/src/data/content.ts` |
| Card e filtro de plataforma | `v2/src/components/sections/Projects.tsx` |
| Página do case (abas) | `v2/src/pages/ProjectCase.tsx` |
| Imagens e logos | `v2/public/img/` · `v2/public/img/logos/` |
| Loja no ar | https://www.almodularesquadrias.com.br/ |
| Painel | `/admin` (mesmo domínio, exige login) |
