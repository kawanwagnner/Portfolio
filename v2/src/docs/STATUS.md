# VYSO — Site V2 · Status & Histórico

> Onde paramos e tudo que já foi feito. Atualizado em 2026-08-15.

> ✅ **Esta V2 é o site oficial da VYSO** — é ela que está no ar em vyso.store e
> é aqui que as mudanças acontecem. Não existe versão paralela.
>
> Houve uma `v3/` na raiz — experimento de redesign (outra paleta, outro texto,
> outra apresentação dos projetos) feito em 11/08/2026 e **descartado, o Kawan
> não curtiu.** Nunca foi publicada e foi apagada em 15/08/2026.

---

## 📌 Onde paramos

- Site **V2 da VYSO** funcionando de ponta a ponta, buildando limpo (`npm run build` ✓, `typecheck` ✓).
- Branch `main` **publicada** (`git push` em dia) — o que está commitado está no ar.
- Última coisa feita: **nova ordem dos projetos** — Barbearia Imperador e Travel Buena Vista subiram pro topo (posições 3 e 4), VG Facilities foi pro fim da lista. A ordem sai direto do array `projects` em `src/data/content.ts`; a dupla AL Modular + AL Esquadrias segue na frente porque a AL Modular é `featured` (ocupa 2 colunas do grid).
- Antes disso: **grid de projetos parou de estourar a tela no celular** — faltava `grid-cols-1` na base, e a coluna implícita `auto` crescia até o min-content do card (o print mandava no tamanho), deixando a página arrastável pro lado. Detalhe em *Armadilhas conhecidas*.
- Antes disso: capas do **painel da AL** e do **app da AL Esquadrias**, celular no card da home no tamanho certo, e **um card por cliente em qualquer filtro** na home.
- **Próximo passo sugerido:** logo da Travel Buena Vista e os números reais de resultado (ver pendências no fim).

---

## 🎯 O que é

V2 do site da marca **VYSO** — não é portfólio pessoal, é a marca (primeiro produto do Kawan).
Objetivo: vitrine premium pra divulgação (Instagram **@vyso.store**).
Fica isolada na subpasta `v2/` — **o V1 (HTML/CSS/JS na raiz) não foi tocado.**

**Posicionamento (não é mais "software house"):** marca especializada em **criar soluções digitais, automatizar processos e entregar valor**. Tecnologia com propósito, do problema ao resultado.

---

## 🧱 Stack

- **Vite 5 + React 18 + TypeScript**
- **Tailwind CSS v3** (estrutura shadcn: `components/ui`, `lib/utils`, alias `@/`)
- **framer-motion** (animações / scroll reveals)
- **Canvas 2D** puro no herói (flow field de partículas — sem 3D)
- **lucide-react** (ícones)
- Fonte **Satoshi** (Fontshare), cor de marca **índigo `#6366F1`**

> Obs.: `three`, `@react-three/*`, `@splinetool/*` ainda estão no `package.json` e nos arquivos `components/ui/*` e `components/three/` antigos, mas **fora do bundle** (nada importa). Dá pra remover depois se quiser enxugar.

---

## 🎨 Identidade (brand board oficial)

| Item | Valor |
|---|---|
| Cor primária | Índigo `#6366F1` (HSL `239 84% 67%`) — vars `--primary` / `--accent` |
| Cor secundária (gradiente) | Violeta (`--ember` = `260 85% 66%`) |
| Fundo | Dark frio `#0F1115` / cards `#1A1C22` |
| Texto muted | `#A1A1AA` |
| Fonte | **Satoshi** (300–900) via Fontshare |
| Logo | Mark "V" (texto) |
| Instagram | **@vyso.store** — `https://www.instagram.com/vyso.store/` |
| CNPJ | 64.561.405/0001-81 (no footer) |

> ⚠️ Detalhe técnico: os **nomes** de classes/variáveis antigos foram mantidos (`--ember`, `.ember-glow`, `.btn-ember`, `.text-ember`) pra evitar refatorar tudo — mas os **valores** já são índigo/violeta. Não se assuste com o nome "ember".

Tudo editável em: **`src/data/content.ts`** (textos, projetos, serviços, links) e **`src/index.css`** (cores/tokens).

---

## 🗂️ Estrutura das seções (ordem na página)

> **Ordem de venda: prova antes de discurso.** Quem chega da bio do Instagram dá
> poucos segundos ao site. A ordem antiga (A VYSO → Founder → Projetos) gastava
> as três primeiras telas em institucional e só mostrava trabalho depois de 3,5
> telas de rolagem. Mexeu na ordem em `pages/Home.tsx`? Renumere os kickers em
> `data/content.ts` (e o de Serviços, que é literal no próprio componente).

1. **Navbar** — barra sólida (sem backdrop-blur por performance), menu mobile, botão fixo **"Vamos conversar?" (WhatsApp)**; Instagram virou ícone. A barra do desktop mostra só os itens marcados com `barra: true` no `nav` (Projetos · Produtos · Serviços · Suporte · Contato) — a lista inteira ficou grande demais lá em cima. Rodapé e menu do celular seguem com tudo: são listas verticais e não disputam espaço.
2. **Hero** — flow field de partículas que formam **V → Y → S → O** em loop, com zoom in/out. Headline "Sites, apps e sistemas que trabalham por você." CTA forte = WhatsApp; "Ver projetos" é o secundário.
3. **Marquee** — ticker inclinado (-3°), pausa fora da tela.
4. **Projects** (`01 — Projetos`) — grid com filtro Todos/Desktop/Mobile e hover CSS (lift + glow). Abre em "Todos". **Na home é sempre um card por cliente** (`<ProjectGroups fatiar={false} />`): a AL Modular tem loja + painel, e fatiar em dois cards lia como projeto repetido. Em `/projetos`, que é o catálogo inteiro, os filtros de plataforma continuam mostrando um card por sistema.
5. **Products** (`02 — Produtos`) — vitrine do produto próprio da VYSO (hoje só o Catálogo): promessa + mockup, "por que vale", nichos e planos. Layout de destaque único; entrou um segundo produto, o `products.map` já vira grid.
6. **Services** (`03 — Serviços`) — lista editorial com hover deslizante.
7. **Support** (`04 — Suporte`) — planos de manutenção em carrossel, com Payment Link do Stripe.
8. **About** (`05 — A VYSO`) — manifesto tipográfico "Antes do código, existe o negócio." + stats + skills.
9. **Founder** (`06 — Founder`) — Kawan Wagnner, "Founder & Software Engineer", tagline "Tecnologia que resolve. Pessoas que confiam.", foto `kawan.webp`.
10. **Contact** (`07 — Contato`) — layout 2 colunas: manifesto + painel de canais (WhatsApp/Instagram/E-mail/GitHub).

> **Produto ≠ projeto.** Projeto é trabalho sob medida, entregue e encerrado;
> produto é da VYSO, fica no ar e cobra assinatura. Produtos vem logo depois dos
> cases porque quem acabou de ver que a casa entrega é quem está pronto pra ouvir
> que existe algo pronto pra usar hoje, sem orçamento.
11. **Footer** — logo, nav, redes, CNPJ, copyright.
12. **WhatsAppFab** — botão flutuante de WhatsApp, só abaixo de `sm` e só depois do herói (fora da home também: fica no `App.tsx`).

**Fora da home:** `Immersive` ("Feito para impressionar") — ~590px que só afirmavam qualidade, e o CTA apenas rolava até o contato. O componente segue em `components/sections/Immersive.tsx`; pra voltar, descomente a linha em `pages/Home.tsx`.

---

## ⚠️ Armadilhas conhecidas (não repita)

**Grid sem `grid-cols-1` estoura a tela no celular.** `grid w-full sm:grid-cols-2`
não declara coluna nenhuma abaixo do `sm`: o navegador cria uma coluna implícita
`auto`, e coluna `auto` cresce até o **min-content** dos itens — no card de projeto
quem manda no min-content é o print. Deu card de 395px numa tela de 380px e a
página inteira ficava arrastável pro lado. `grid-cols-*` do Tailwind é
`minmax(0, 1fr)`, e é o `minmax(0,…)` que trava a coluna no tamanho da tela:
**sempre declare a coluna base**, mesmo que seja uma só (`Projects.tsx`, o grid do
`ProjectGroups`). Vale a mesma regra pra qualquer filho de flex/grid que segure
conteúdo largo — daí o `min-w-0` espalhado pelos cards.

**Como conferir overflow lateral:** compare `document.documentElement.scrollWidth`
com `clientWidth` em 390px e 330px de largura. `body { overflow-x: hidden }` (está
no `index.css`) esconde o sintoma no desktop mas **não** impede o arrasto no
celular — não confie nele como conserto. Cuidado ao medir dentro de um iframe ou
aba em segundo plano: o `requestAnimationFrame` congela, o framer-motion trava no
meio da animação e aparece "overflow" que não existe de verdade.

**Estado responsivo conferido em produção** (2026-08-10, larguras 390px e 330px):
home, `/projetos` (nas três abas) e os 7 cases com `scrollWidth == clientWidth`.
Na home aparecem elementos mais largos que a tela — o spotlight do herói e o
marquee em `w-[112%]` —, mas são decorativos e vivem dentro de `overflow-hidden`:
estão certos assim, não "conserte".

---

## ✨ Herói: flow field de partículas (`src/components/three/FlowField.tsx`)

Partículas em canvas 2D formam as letras de "VYSO", uma por ciclo, em loop fluido, reagindo ao mouse (o cursor espalha as partículas).

**Toggles no topo do arquivo:**
```ts
const MODE: 'shape' | 'scattered' = 'shape'  // 'scattered' = flow field espalhado (rollback)
const SHAPE_TEXT = 'VYSO'                      // uma letra por ciclo; use 'V' pra não ciclar
```

**Como funciona / decisões importantes:**
- Espera a fonte (Satoshi) carregar e constrói **uma única vez** → sem "explosão" no load.
- Relógio de animação **congela quando pausa** (scroll fora da tela) → volta suave, sem salto.
- A "casa" de bagunça de cada partícula é **absoluta** (independe da letra) → troca de letra invisível.
- Posição/tamanho do "V" são **responsivos** (direita nas telas largas, centralizado nas estreitas).
- Em **mobile/aparelho fraco** usa fundo estático leve (sem canvas).

---

## ⚡ Performance (muita coisa foi otimizada)

O lag foi caçado e resolvido. Resumo do que foi feito:
- Removida a cena Spline/WebGPU pesada do herói (era a causa raiz do lag) → flow field 2D leve.
- No máx **1 efeito pesado por vez**; animações **pausam fora da tela**.
- Eliminados `backdrop-blur` (navbar, tags dos projetos) e `blur-3xl` gigantes (glows viraram gradiente radial).
- Removido `content-visibility` (engasgava na entrada das seções).
- Glows infinitos viraram estáticos.
- Degradação por dispositivo (`useIsLowPower`): mobile/fraco recebe versão leve.
- Imagens otimizadas (foto do founder: 1.8MB PNG → **48KB WebP**, sem perda visível).

Métricas medidas (produção): **LCP 0.44s, CLS 0.00, INP 136ms** — tudo verde.

---

## 🌿 Git & rollback

- Branch: `main`, publicada no GitHub.
- **Deploy: Vercel**, automático a cada push no `main` → **https://vyso.store**. Não existe passo manual: commitou e empurrou, subiu. Valide sempre no domínio de produção, não só no `preview` local.
- **Pontos de rollback:**
  - Tag `v2-antes-ajustes-venda` → estado publicado antes da reordenação, do WhatsApp como CTA e do enxugamento do ritmo. Cada um desses ajustes é um commit separado, então dá pra reverter um sem derrubar os outros (`git revert <sha>`).
  - Tag `v2-flowfield-scattered` → estado do flow field espalhado original.
  - Toggle `MODE = 'scattered'` no `FlowField.tsx` → volta o espalhado sem git.
  - Histórico completo versionado (dá pra voltar a qualquer estado, inclusive a paleta ember/laranja anterior ao rebrand).

---

## ▶️ Como rodar

```bash
cd v2
npm install
npm run dev       # http://localhost:5173  (dev — tem overhead do React dev)
npm run build     # gera dist/
npm run preview   # http://localhost:4173  (produção — testar performance REAL aqui)
npm run typecheck
```

> Sempre valide performance no **preview (4173)**, não no dev (5173).

---

## 🗂️ Projetos como case study (novo)

O site deixou de ser página única: agora tem **rotas** (`react-router-dom`).

| Rota | O que é |
|---|---|
| `/` | Home (todas as seções) |
| `/projetos` | Índice com todos os cases |
| `/projetos/:slug` | Página do case — Objetivo, Desafio, Solução, Destaques, Resultados, Processo, Stack, outros projetos, CTA |

- **7 projetos reais** em `src/data/content.ts` (interface `Project` virou case completo).
- **Mockups**: `components/shared/Mockup.tsx` — moldura de browser ou celular. Sem print, desenha bloco de marca (nada quebra).
- **Logos**: `components/shared/ClientLogo.tsx` — sem arquivo, cai num monograma com as iniciais do cliente.
- `vercel.json` com rewrite pra SPA (senão `/projetos/x` dá 404 no refresh).

**Pra completar:** logo da Travel Buena Vista em `public/img/logos/` (campo `logo`) — é a única que ainda cai no monograma. Os `// TODO` no `content.ts` marcam o que falta de conteúdo real.

---

## 📸 Prints: como tirar (`v2/scripts/`)

Os prints de capa saem do site no ar, via Playwright — nada de recorte na mão.

```bash
node scripts/shots.mjs           # todas as capas → public/img/cases/*.webp
node scripts/shots.mjs vg        # só os alvos cujo nome casa com "vg"
node scripts/dump.mjs <url>      # texto renderizado da página (os sites são SPA)
node scripts/find-logo.mjs <url> # acha o arquivo da logo no topo do site do cliente
node scripts/cutout.mjs in.jpeg public/img/logos/x.webp   # tira o fundo chapado da logo
node scripts/preview-shot.mjs produtos 1440 1900          # confere uma seção no preview
```

- **`shots.mjs`** — alvos no topo do arquivo. Já sai em **WebP** (1600px, qualidade 80): PNG @2x saía com megabytes e derrubaria o LCP. Campo `dismiss` clica no botão do banner de cookie antes da foto.
- **`cutout.mjs`** — logo de cliente costuma chegar em JPEG num quadrado preto, e quadrado aparece no card. O corte é flood fill a partir das bordas: some só o fundo **conectado à borda**, então o preto de dentro do emblema não vira buraco. `--branco` pra fundo claro.
- **`find-logo.mjs`** — a logo do KFM era SVG inline, não arquivo: foi extraída do próprio site, com o texto `#121215` clareado pra `#F4F4F5` (senão sumiria no card dark) e re-renderizada na fonte da marca. A Travel Buena Vista **não tem logo em imagem** — o topo dela é texto puro, então ela segue no monograma até chegar um arquivo.
- **`preview-shot.mjs`** — exige `npm run preview` rodando. **A altura do viewport importa:** os blocos animam por scroll (`Reveal`), e o que nunca entrou na tela sai transparente no print. Passe altura maior que a seção. Saída em `v2/.shots/` (git-ignorada).
- Duas telas **não** dá pra capturar de fora: o **painel da AL** (atrás de login — a capa dele veio de print mandado à mão, tela de Produtos) e o **app da AL Esquadrias** (o `live` é um `share.google/...`, que cai em captcha do Google — trocar pela URL real do app).

> ⚠️ **Projetos via consultoria (contrato PJ) ficam FORA do site.** O contrato proíbe
> revelar informações acessadas na prestação (cláusula 8.1) e dá a propriedade do
> resultado à contratante (9.1) — sigilo durante a vigência **+ 2 anos**. Nem anônimos
> compensavam: sem nome, logo ou print, o case não convence. Só publique com
> autorização **por escrito** da consultoria. Os nomes também foram removidos do
> histórico do Git (`git filter-repo`, force-push em 12/07/2026).

---

## ✅ Pendências / próximos passos

- [ ] **Logo da Travel Buena Vista** → `public/img/logos/` (hoje cai no monograma `TBV`; o site dela não tem arquivo de logo pra extrair). KFM e Barbearia já entraram.
- [ ] **URL real do app da AL Esquadrias** — o `live` ainda é um link `share.google/...`, que não abre nem rende print.
- [ ] Números reais nos `results` de Travel Buena Vista e VG (quantos orçamentos o site trouxe) — marcados com `// TODO`.
- [ ] Pedir à consultoria autorização **por escrito** pra citar os clientes. Só com ela dá pra repor aqueles cases.
- [ ] Confirmar/ajustar **usuário do GitHub** (`socials.github`) e adicionar **WhatsApp** (`socials.whatsapp`) se quiser.
- [ ] Revisar textos marcados com `// TODO` em `content.ts` (sobre, founder).
- [ ] Conferir **enquadramento da foto** do founder (card 4/5) em telas diferentes.
- [ ] (Opcional) Remover deps não usadas (three/spline) pra enxugar o `package.json`.
- [ ] (Opcional) Seção de depoimentos / "casos reais" (o brand board sugere).

---

## 📎 Referências

- Instagram de divulgação: https://www.instagram.com/vyso.store/
- Brand board oficial da VYSO (índigo + Satoshi) — base do visual atual.
