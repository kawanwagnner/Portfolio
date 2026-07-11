import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { sampleLogoPoints } from '@/lib/brand'

/**
 * Abertura do site: as partículas se juntam e formam o "V" da marca, depois a
 * tela sai revelando o herói.
 *
 * Sai quando as duas coisas acontecem: a animação completou o mínimo (MIN_MS) e
 * a página está pronta (fontes + load). Assim nunca "pisca" nem prende o usuário.
 * Com prefers-reduced-motion, mostra o V estático e sai rápido.
 */
const MIN_MS = 1500
const MAX_MS = 4000 // trava de segurança: nunca segura a página além disso

export function Preloader() {
  const [done, setDone] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // ── canvas: partículas convergindo pro V ────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let W = 0
    let H = 0
    let raf = 0
    // Mesmas regras do FlowField do herói (foi o que matou a "explosão" lá):
    //  1. resize só reconstrói se o tamanho MUDOU de verdade — a fonte carregando
    //     dispara resize e reconstruir no meio da animação joga tudo pro início;
    //  2. no rebuild, a partícula NÃO volta pra origem: só o alvo é recalculado;
    //  3. relógio de animação com dt limitado — um engasgo no load não vira salto.
    let lastW = -1
    let lastH = -1

    type P = { x: number; y: number; vx: number; vy: number; tx: number; ty: number; hue: number; light: number }
    let ps: P[] = []

    function build() {
      const w = window.innerWidth
      const h = window.innerHeight
      if (w === lastW && h === lastH) return // (1)
      lastW = w
      lastH = h

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = w
      H = h
      canvas!.width = Math.floor(W * dpr)
      canvas!.height = Math.floor(H * dpr)
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)

      const height = Math.min(H * 0.32, W * 0.42, 260)
      const targets = sampleLogoPoints({ count: 900, cx: W / 2, cy: H / 2, height, step: 5 })

      if (ps.length === targets.length) {
        // (2) já existem partículas voando: troca só o destino, sem tranco
        for (let i = 0; i < ps.length; i++) {
          ps[i].tx = targets[i].x
          ps[i].ty = targets[i].y
        }
        return
      }

      ps = targets.map((t) => {
        // nasce numa órbita ao redor do centro e vem "sugada" pro desenho
        const ang = Math.random() * Math.PI * 2
        const rad = Math.max(W, H) * (0.25 + Math.random() * 0.45)
        return {
          x: W / 2 + Math.cos(ang) * rad,
          y: H / 2 + Math.sin(ang) * rad,
          vx: 0,
          vy: 0,
          tx: t.x,
          ty: t.y,
          hue: 228 + Math.random() * 28,
          light: 62 + Math.random() * 20,
        }
      })
    }

    build()

    if (reduce) {
      // sem animação: desenha o V direto
      ctx.fillStyle = '#0F1115'
      ctx.fillRect(0, 0, W, H)
      for (const p of ps) {
        ctx.fillStyle = `hsla(${p.hue}, 92%, ${p.light}%, 0.9)`
        ctx.beginPath()
        ctx.arc(p.tx, p.ty, 1.8, 0, Math.PI * 2)
        ctx.fill()
      }
      return
    }

    // (3) relógio próprio: avança no máximo 50ms por quadro. Se o load engasgar,
    // a animação continua de onde parou em vez de dar um salto.
    let last = performance.now()
    let clock = 0

    function frame(now: number) {
      const dt = Math.min(now - last, 50)
      last = now
      clock += dt

      // atração cresce ao longo do tempo → entrada suave, aperto no fim
      const pull = 0.012 + Math.min(1, clock / 1100) * 0.075
      // passo fixo escalado pelo dt: velocidade igual em 60Hz ou 144Hz
      const k = Math.min(dt / 16.67, 2)

      ctx!.fillStyle = '#0F1115'
      ctx!.fillRect(0, 0, W, H)
      ctx!.globalCompositeOperation = 'lighter'

      for (const p of ps) {
        p.vx = (p.vx + (p.tx - p.x) * pull * k) * 0.86
        p.vy = (p.vy + (p.ty - p.y) * pull * k) * 0.86
        p.x += p.vx * k
        p.y += p.vy * k

        const d = Math.hypot(p.tx - p.x, p.ty - p.y)
        const settled = Math.max(0, 1 - d / 90) // mais brilhante ao chegar em casa
        ctx!.fillStyle = `hsla(${p.hue}, 92%, ${p.light}%, ${0.5 + settled * 0.45})`
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, 1.5 + settled * 0.8, 0, Math.PI * 2)
        ctx!.fill()
      }
      ctx!.globalCompositeOperation = 'source-over'
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    const onResize = () => build()
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  // ── quando sair ─────────────────────────────────────────────────────────
  useEffect(() => {
    const start = performance.now()
    let cancelled = false

    const ready = Promise.all([
      (document as any).fonts?.ready ?? Promise.resolve(),
      document.readyState === 'complete'
        ? Promise.resolve()
        : new Promise<void>((r) => window.addEventListener('load', () => r(), { once: true })),
    ])

    const finish = () => {
      if (cancelled) return
      cancelled = true
      setDone(true)
    }

    ready.then(() => {
      const restante = Math.max(0, MIN_MS - (performance.now() - start))
      window.setTimeout(finish, restante)
    })
    const trava = window.setTimeout(finish, MAX_MS)

    return () => {
      cancelled = true
      window.clearTimeout(trava)
    }
  }, [])

  // trava o scroll enquanto a abertura roda
  useEffect(() => {
    document.body.style.overflow = done ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [done])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.06, filter: 'blur(6px)' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] bg-background"
          aria-hidden
        >
          <canvas ref={canvasRef} className="h-full w-full" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
