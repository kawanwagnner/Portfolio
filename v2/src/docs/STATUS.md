# VYSO — Site V2 · Status & Histórico

> Onde paramos e tudo que já foi feito. Atualizado em 2026-07-07.

---

## 📌 Onde paramos

- Site **V2 da VYSO** funcionando de ponta a ponta, buildando limpo (`npm run build` ✓, `typecheck` ✓).
- **15 commits** organizados na branch `main` — **tudo local, ainda SEM `git push`**.
- Última coisa feita: rebrand oficial (índigo + Satoshi) + seção de Founder com a foto do Kawan otimizada.
- **Próximo passo sugerido:** revisar conteúdo real (projetos/links), decidir deploy e dar `git push`.

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

1. **Navbar** — barra sólida (sem backdrop-blur por performance), menu mobile, botão "Seguir".
2. **Hero** — flow field de partículas que formam **V → Y → S → O** em loop, com zoom in/out. Headline "Transformamos problemas em soluções que crescem."
3. **Marquee** — ticker inclinado (-3°), pausa fora da tela.
4. **About** (`01 — A VYSO`) — manifesto tipográfico "Antes do código, existe o negócio." + stats + skills.
5. **Founder** (`02 — Founder`) — Kawan Wagnner, "Founder & Software Engineer", tagline "Tecnologia que resolve. Pessoas que confiam.", foto `kawan.webp`.
6. **Projects** (`03 — Projetos`) — grid com hover CSS (lift + glow). ⚠️ dados placeholder.
7. **Services** (`04 — Serviços`) — lista editorial com hover deslizante.
8. **Immersive** — seção de impacto 100% CSS (leve).
9. **Contact** (`05 — Contato`) — layout 2 colunas: manifesto + painel de canais (E-mail/GitHub).
10. **Footer** — logo, nav, redes, CNPJ, copyright.

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

- Branch: `main`. **15 commits, tudo local (sem push).**
- **Pontos de rollback:**
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

**Pra completar:** prints em `public/img/` (campo `cover`/`gallery`) e logos em `public/img/logos/` (campo `logo`). Os `// TODO` no `content.ts` marcam o que falta de conteúdo real.

> ⚠️ **Projetos via consultoria (contrato PJ) ficam ANÔNIMOS.** O contrato proíbe
> revelar informações acessadas na prestação (cláusula 8.1) e dá a propriedade do
> resultado à contratante (9.1) — sigilo durante a vigência **+ 2 anos**. Então, nesses
> cases: sem nome de cliente, sem logo, sem print, sem código. Só o problema e a
> solução, em termos genéricos. Só volte a nomear com autorização **por escrito**.

---

## ✅ Pendências / próximos passos

- [ ] **Prints e logos dos projetos** → `public/img/` e `public/img/logos/`.
- [ ] **Preencher os `// TODO` dos cases** anônimos (agente de IA e painel/integração) — sem identificar o cliente.
- [ ] Pedir à consultoria autorização **por escrito** pra citar os clientes. Se vier, dá pra repor nome e logo.
- [ ] Confirmar/ajustar **usuário do GitHub** (`socials.github`) e adicionar **WhatsApp** (`socials.whatsapp`) se quiser.
- [ ] Revisar textos marcados com `// TODO` em `content.ts` (sobre, founder).
- [ ] Conferir **enquadramento da foto** do founder (card 4/5) em telas diferentes.
- [ ] Decidir **deploy** (Vercel / Netlify / GitHub Pages) e fazer **`git push`**.
- [ ] (Opcional) Remover deps não usadas (three/spline) pra enxugar o `package.json`.
- [ ] (Opcional) Seção de depoimentos / "casos reais" (o brand board sugere).

---

## 📎 Referências

- Instagram de divulgação: https://www.instagram.com/vyso.store/
- Brand board oficial da VYSO (índigo + Satoshi) — base do visual atual.
