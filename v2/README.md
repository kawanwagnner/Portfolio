# Portfólio V2 — Kawan Wagnner

Vitrine premium em **React + TypeScript + Tailwind CSS**, com componentes do [21st.dev](https://21st.dev)
(herói WebGPU e cena Spline 3D), animações e microinterações.

> A V1 (HTML/CSS/JS puro) continua intacta na raiz do repositório. Esta V2 é isolada nesta pasta `v2/`.

## Stack

- **Vite 5** + **React 18** + **TypeScript**
- **Tailwind CSS v3** (estrutura shadcn: `components/ui`, `lib/utils`, alias `@/`)
- **framer-motion** — animações e scroll reveals
- **three / @react-three/fiber / drei** — herói WebGPU (`three/webgpu` + TSL)
- **@splinetool/react-spline** — cena 3D interativa
- **lucide-react** — ícones

## Como rodar

```bash
cd v2
npm install
npm run dev      # http://localhost:5173
npm run build    # gera dist/
npm run preview  # serve o build
npm run typecheck
```

## ✏️ Onde editar seu conteúdo

**Tudo num só arquivo:** [`src/data/content.ts`](./src/data/content.ts)
— nome, headline do herói, textos do "Sobre", stats, skills, **projetos**, **serviços**,
e-mail e **links de redes sociais** (Instagram já configurado com `@wagnner.g`).

Procure por `// TODO: Kawan` para os pontos que valem revisar.

### Imagens dos projetos
Ficam em [`public/img/`](./public/img) (copiadas da V1). Troque pelos prints dos seus
projetos novos mantendo o caminho `/img/nome.png` no `content.ts`.

## Herói WebGPU + fallback

O herói principal usa `three/webgpu`, que só roda em navegadores com WebGPU
(Chrome/Edge modernos). O hook [`useWebGPUSupport`](./src/hooks/useWebGPUSupport.ts)
detecta o suporte:

- **Com WebGPU** → herói futurista 3D (`components/ui/hero-futuristic.tsx`), carregado sob demanda (lazy).
- **Sem WebGPU** (Safari, mobiles antigos) → fallback premium em CSS/framer-motion
  (`components/sections/HeroFallback.tsx`). Ninguém vê tela preta.

## Estrutura

```
src/
  components/
    ui/          # componentes 21st.dev (card, spotlight, splite, hero-futuristic)
    sections/    # seções da página (Hero, About, Projects, Services, Showcase3D, Contact, Footer, Navbar)
    shared/      # Reveal, SectionHeading
  data/content.ts  # 👈 seu conteúdo
  hooks/useWebGPUSupport.ts
  lib/utils.ts
  index.css        # tema (CSS vars shadcn) + animações custom
```

## Deploy

Projeto Vite estático — funciona em Vercel, Netlify ou GitHub Pages
(nesse caso, ajuste `base` no `vite.config.ts` se publicar em subpasta).
