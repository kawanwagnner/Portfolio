import { useEffect, useRef } from 'react'
import { LOGO_PATH, LOGO_H, LOGO_W } from '@/lib/brand'

/**
 * Fundo de partículas do herói (canvas 2D, leve e interativo).
 *
 * 🔧 MODE controla o visual:
 *   - 'shape'     → as partículas formam as formas de SHAPES (a marca + letras) e
 *                   se espalham quando o cursor chega perto, reagrupando depois.
 *   - 'scattered' → flow field espalhado (rollback do visual anterior).
 *
 * Adaptado do flow field de avathiery.com, na paleta ember da VYSO.
 * Pausa fora da tela / aba oculta e respeita prefers-reduced-motion.
 */
const MODE: 'shape' | 'scattered' = 'shape'
// No modo shape, as partículas formam UMA forma por ciclo, percorrendo a lista.
// 'logo' = a marca oficial (o V vetorial); o resto são letras da Satoshi.
// Use ['logo'] pra ficar só na marca, sem ciclar.
const SHAPES: readonly string[] = ['logo', 'Y', 'S', 'O']

interface Props {
  className?: string
}

export function FlowField({ className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas0 = canvasRef.current
    if (!canvas0) return
    const ctx0 = canvas0.getContext('2d')
    if (!ctx0) return
    const canvas: HTMLCanvasElement = canvas0
    const ctx: CanvasRenderingContext2D = ctx0

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const BG = '15, 17, 21' // casa com --background (#0F1115)

    let W = 0
    let H = 0
    let dpr = 1

    // Cursor (coords relativas ao canvas)
    let targetX = -9999
    let targetY = -9999
    let mouseX = -9999
    let mouseY = -9999
    let rect = canvas.getBoundingClientRect()
    const onMove = (e: PointerEvent) => {
      targetX = e.clientX - rect.left
      targetY = e.clientY - rect.top
    }
    const onLeave = () => {
      targetX = -9999
      targetY = -9999
    }
    const refreshRect = () => {
      rect = canvas.getBoundingClientRect()
    }

    // ======================================================================
    //  Engine — cada modo expõe onResize/step/drawStatic
    // ======================================================================
    type Engine = { onResize: () => void; step: (now: number) => void; drawStatic: () => void }

    // ---------- MODO 'shape': cada ciclo forma uma letra (V→Y→S→O→loop) ----------
    function makeShapeEngine(): Engine {
      type SP = {
        x: number
        y: number
        vx: number
        vy: number
        tx: number // alvo (letra atual)
        ty: number
        sx: number // "casa" de bagunça — ABSOLUTA, independente da letra
        sy: number
        hue: number
        light: number
      }
      const letters = [...SHAPES]
      const N = 1400 // partículas (mesma quantidade pra todas as formas)
      const FREQ = 0.001 // ~6.3s por letra (forma + bagunça)
      let ps: SP[] = []
      let letterTargets: { x: number; y: number }[][] = []
      let cx = 0 // centro (usado no zoom)
      let cy = 0
      let fontSize = 0 // responsivo (definido no build)
      let t0 = -1
      let lastCycle = -1

      // Amostra uma forma (a marca ou uma letra) e normaliza pra EXATAMENTE N pontos.
      function sampleLetter(char: string): { x: number; y: number }[] {
        const off = document.createElement('canvas')
        off.width = Math.max(1, Math.floor(W))
        off.height = Math.max(1, Math.floor(H))
        const octx = off.getContext('2d')
        if (!octx) return Array.from({ length: N }, () => ({ x: cx, y: cy }))
        octx.clearRect(0, 0, W, H)
        octx.fillStyle = '#fff'

        if (char === 'logo') {
          // Marca oficial: escala o path pra ocupar a mesma altura visual das
          // letras (a caixa alta da Satoshi fica em ~72% do fontSize).
          const scale = (fontSize * 0.78) / LOGO_H
          octx.save()
          octx.translate(cx - (LOGO_W * scale) / 2, cy - (LOGO_H * scale) / 2)
          octx.scale(scale, scale)
          octx.fill(new Path2D(LOGO_PATH))
          octx.restore()
        } else {
          octx.textAlign = 'center'
          octx.textBaseline = 'middle'
          octx.font = `900 ${fontSize}px "Satoshi", sans-serif`
          octx.fillText(char, cx, cy)
        }

        const data = octx.getImageData(0, 0, off.width, off.height).data
        const pts: { x: number; y: number }[] = []
        const step = 10 // gap entre partículas
        for (let y = 0; y < H; y += step) {
          for (let x = 0; x < W; x += step) {
            if (data[(y * off.width + x) * 4 + 3] > 128) pts.push({ x, y })
          }
        }
        // Embaralha e força tamanho N (corta se sobra, repete se falta).
        for (let i = pts.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1))
          ;[pts[i], pts[j]] = [pts[j], pts[i]]
        }
        const out: { x: number; y: number }[] = []
        if (pts.length === 0) {
          for (let i = 0; i < N; i++) out.push({ x: cx, y: cy })
        } else {
          for (let i = 0; i < N; i++) out.push(pts[i % pts.length])
        }
        return out
      }

      function assignLetter(idx: number) {
        // Só troca o alvo da letra. NÃO mexe em sx/sy — por isso a troca
        // (que acontece no ponto bagunçado, a≈0) é invisível/sem tranco.
        const tg = letterTargets[idx]
        for (let i = 0; i < ps.length; i++) {
          ps[i].tx = tg[i].x
          ps[i].ty = tg[i].y
        }
      }

      function build() {
        // Responsivo: em telas largas o "V" fica à direita e menor; em telas
        // estreitas centraliza (atrás do conteúdo) e ocupa mais largura.
        const wide = W >= 1100
        cx = wide ? W * 0.64 : W * 0.5
        cy = H * 0.55
        fontSize = wide ? Math.min(H * 0.74, W * 0.44) : Math.min(H * 0.62, W * 0.72)
        letterTargets = letters.map((c) => sampleLetter(c))
        ps = Array.from({ length: N }, (_, i) => {
          // casa de bagunça: posição absoluta espalhada ao redor do centro-direita
          const sx = cx + (Math.random() * 2 - 1) * W * 0.45
          const sy = cy + (Math.random() * 2 - 1) * H * 0.6
          return {
            // começa JÁ na nuvem de bagunça (a=0), sem flash de posições aleatórias
            x: sx,
            y: sy,
            vx: 0,
            vy: 0,
            tx: letterTargets[0][i].x,
            ty: letterTargets[0][i].y,
            sx,
            sy,
            hue: 228 + Math.random() * 28,
            light: 62 + Math.random() * 20,
          }
        })
        t0 = -1
        lastCycle = -1
      }

      function draw(now: number, forced?: boolean) {
        if (t0 < 0) t0 = now
        const el = now - t0
        const phase = el * FREQ

        // Troca de letra no ponto "bagunçado" (a≈0), invisível.
        if (!forced && letters.length > 1) {
          const cycle = Math.floor(phase / (Math.PI * 2))
          if (cycle !== lastCycle) {
            lastCycle = cycle
            assignLetter(((cycle % letters.length) + letters.length) % letters.length)
          }
        }

        const a = forced ? 1 : 0.5 - 0.5 * Math.cos(phase)
        const zoom = forced ? 1 : 1 + Math.sin(el * 0.0011) * 0.12
        const active = mouseX > -9000

        ctx.fillStyle = `rgb(${BG})`
        ctx.fillRect(0, 0, W, H)
        ctx.globalCompositeOperation = 'lighter'

        for (const p of ps) {
          const ztx = cx + (p.tx - cx) * zoom
          const zty = cy + (p.ty - cy) * zoom
          // desejo = interpola entre a casa de bagunça (a=0) e o alvo da letra (a=1).
          // Como sx/sy não dependem da letra, trocar de letra em a≈0 não causa salto.
          const dx0 = p.sx * (1 - a) + ztx * a
          const dy0 = p.sy * (1 - a) + zty * a

          let ax = (dx0 - p.x) * 0.055
          let ay = (dy0 - p.y) * 0.055
          if (active) {
            const dx = p.x - mouseX
            const dy = p.y - mouseY
            const d = Math.sqrt(dx * dx + dy * dy) + 0.001
            const R = 130
            if (d < R) {
              const f = (1 - d / R) * 5.5
              ax += (dx / d) * f
              ay += (dy / d) * f
            }
          }
          p.vx = (p.vx + ax) * 0.85
          p.vy = (p.vy + ay) * 0.85
          p.x += p.vx
          p.y += p.vy

          // Brilho alto mesmo bagunçado (partícula isolada não ganha glow).
          const alpha = 0.72 + a * 0.18
          // Um pouco maiores quando espalhadas, pra não sumirem.
          const r = 1.7 + (1 - a) * 0.7
          ctx.fillStyle = `hsla(${p.hue}, 92%, ${p.light}%, ${alpha})`
          ctx.beginPath()
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.globalCompositeOperation = 'source-over'
      }

      return {
        onResize: build,
        step: (now) => draw(now),
        drawStatic: () => {
          for (const p of ps) {
            p.x = p.tx
            p.y = p.ty
          }
          draw(0, true)
        },
      }
    }

    // ---------- MODO 'scattered': flow field (rollback) ----------
    function makeFlowEngine(): Engine {
      const FIELD_RES = 22
      let cols = 0
      let rows = 0
      let field = new Float32Array(0)
      const COUNT = Math.min(1500, Math.max(500, Math.floor((window.innerWidth * window.innerHeight) / 1500)))
      type P = { x: number; y: number; prevX: number; prevY: number; life: number; maxLife: number; hue: number; sat: number; light: number }
      const particles: P[] = []
      function resetP(p: P) {
        p.x = Math.random() * W
        p.y = Math.random() * H
        p.prevX = p.x
        p.prevY = p.y
        p.life = 0
        p.maxLife = 80 + Math.random() * 240
        p.hue = 228 + Math.random() * 28
        p.sat = 60 + Math.random() * 30
        p.light = 55 + Math.random() * 22
      }
      for (let i = 0; i < COUNT; i++) {
        const p = {} as P
        resetP(p)
        particles.push(p)
      }
      function onResize() {
        cols = Math.ceil(W / FIELD_RES) + 1
        rows = Math.ceil(H / FIELD_RES) + 1
        field = new Float32Array(cols * rows)
        ctx.fillStyle = `rgb(${BG})`
        ctx.fillRect(0, 0, W, H)
      }
      function updateField(time: number) {
        const t = time * 0.00005
        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            const nx = x * 0.06
            const ny = y * 0.06
            field[y * cols + x] =
              (Math.sin(nx + ny * 1.3 + t) * 1.2 +
                Math.sin(nx * 1.7 - ny * 0.5 + t * 1.4) * 0.8 +
                Math.sin(ny * 2.1 + Math.cos(nx) + t * 0.6) * 0.6) *
              Math.PI
          }
        }
      }
      function step(now: number) {
        ctx.fillStyle = `rgba(${BG}, 0.075)`
        ctx.fillRect(0, 0, W, H)
        updateField(now)
        ctx.lineWidth = 0.8
        ctx.lineCap = 'round'
        for (const p of particles) {
          const cx = Math.floor(p.x / FIELD_RES)
          const cy = Math.floor(p.y / FIELD_RES)
          if (cx < 0 || cx >= cols || cy < 0 || cy >= rows) {
            resetP(p)
            continue
          }
          const angle = field[cy * cols + cx]
          let vx = Math.cos(angle) * 1.4
          let vy = Math.sin(angle) * 1.4
          if (mouseX > -9000) {
            const dx = p.x - mouseX
            const dy = p.y - mouseY
            const d = Math.sqrt(dx * dx + dy * dy) + 0.001
            const R = 200
            if (d < R) {
              const f = (1 - d / R) * 4.5
              vx += (dx / d) * f
              vy += (dy / d) * f
            }
          }
          p.prevX = p.x
          p.prevY = p.y
          p.x += vx
          p.y += vy
          p.life++
          if (p.life > p.maxLife || p.x < -10 || p.x > W + 10 || p.y < -10 || p.y > H + 10) {
            resetP(p)
            continue
          }
          const a = Math.min(1, p.life / 15) * Math.min(1, (p.maxLife - p.life) / 40) * 0.5
          ctx.strokeStyle = `hsla(${p.hue}, ${p.sat}%, ${p.light}%, ${a})`
          ctx.beginPath()
          ctx.moveTo(p.prevX, p.prevY)
          ctx.lineTo(p.x, p.y)
          ctx.stroke()
        }
      }
      return { onResize, step, drawStatic: () => step(0) }
    }

    const engine = MODE === 'shape' ? makeShapeEngine() : makeFlowEngine()

    // ======================================================================
    //  Infra compartilhada: resize, loop, pausa fora da tela
    // ======================================================================
    // Só constrói as partículas depois da fonte pronta (evita reconstruir no
    // meio da animação — era o que causava a "explosão" ao terminar o load).
    let fontReady = false
    let lastW = -1
    let lastH = -1

    function resize() {
      const w = canvas.clientWidth || 1
      const h = canvas.clientHeight || 1
      // Tamanho não mudou → não redimensiona nem reconstrói (o ResizeObserver
      // dispara redundante no início e reconstruir aqui causava o "bug").
      if (w === lastW && h === lastH) return
      lastW = w
      lastH = h
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = w
      H = h
      canvas.width = Math.max(1, Math.floor(W * dpr))
      canvas.height = Math.max(1, Math.floor(H * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.fillStyle = `rgb(${BG})`
      ctx.fillRect(0, 0, W, H)
      if (fontReady) engine.onResize()
    }

    let last = performance.now()
    // Relógio de ANIMAÇÃO: só avança enquanto está rodando. Ao pausar (scroll
    // fora da tela) ele congela; ao voltar, continua de onde parou — sem o
    // salto de tempo que fazia as partículas "explodirem" no retorno.
    let clock = 0
    let raf = 0
    let running = false
    function tick(now: number) {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      clock += dt * 1000
      if (targetX > -9000) {
        const lerp = 1 - Math.pow(0.005, dt)
        mouseX += (targetX - mouseX) * lerp
        mouseY += (targetY - mouseY) * lerp
      } else {
        mouseX = -9999
        mouseY = -9999
      }
      engine.step(clock)
      raf = requestAnimationFrame(tick)
    }

    let onScreen = false
    function start() {
      if (running || reduce || !fontReady) return
      running = true
      last = performance.now()
      raf = requestAnimationFrame(tick)
    }
    function stop() {
      running = false
      if (raf) cancelAnimationFrame(raf)
      raf = 0
    }
    function sync() {
      if (onScreen && !document.hidden) start()
      else stop()
    }

    resize() // só dimensiona/limpa o canvas por enquanto (fontReady=false)

    const ro = new ResizeObserver(() => resize())
    ro.observe(canvas)
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting
        sync()
      },
      { threshold: 0 }
    )
    io.observe(canvas)

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerleave', onLeave)
    window.addEventListener('scroll', refreshRect, { passive: true })
    window.addEventListener('resize', refreshRect)
    document.addEventListener('visibilitychange', sync)

    // Espera a fonte (Satoshi) e SÓ ENTÃO constrói e anima — uma única vez.
    let cancelled = false
    const fontsReady = (document as any).fonts?.ready ?? Promise.resolve()
    fontsReady.then(() => {
      if (cancelled) return
      fontReady = true
      engine.onResize() // primeira e única construção, já com a fonte certa
      if (reduce) engine.drawStatic()
      else sync()
    })

    return () => {
      cancelled = true
      stop()
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('scroll', refreshRect)
      window.removeEventListener('resize', refreshRect)
      document.removeEventListener('visibilitychange', sync)
    }
  }, [])

  return <canvas ref={canvasRef} className={className} />
}
