import { useEffect, useRef } from 'react'

/**
 * Flow field de partículas (canvas 2D) — leve e interativo: o cursor "empurra"
 * as partículas como vento. Adaptado do original de avathiery.com, na paleta
 * ember da Vyso. Pausa quando sai da tela ou a aba fica oculta (poupa CPU).
 */
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
    // Tipos explícitos não-nulos (mantêm a narrowing dentro das closures).
    const canvas: HTMLCanvasElement = canvas0
    const ctx: CanvasRenderingContext2D = ctx0

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Fundo casando com --background (~ rgb(14,12,11)) pro trail sumir suave.
    const BG = '14, 12, 11'
    const FIELD_RES = 22

    let W = 0
    let H = 0
    let dpr = 1
    let cols = 0
    let rows = 0
    let field = new Float32Array(0)

    // Densidade adaptativa (menos partículas em telas menores).
    const COUNT = Math.min(
      1500,
      Math.max(500, Math.floor((window.innerWidth * window.innerHeight) / 1500))
    )

    type P = {
      x: number
      y: number
      prevX: number
      prevY: number
      life: number
      maxLife: number
      hue: number
      sat: number
      light: number
    }

    const particles: P[] = []

    function resetP(p: P) {
      p.x = Math.random() * W
      p.y = Math.random() * H
      p.prevX = p.x
      p.prevY = p.y
      p.life = 0
      p.maxLife = 80 + Math.random() * 240
      // Tons quentes (âmbar/brasa) com leve variação — combina com a marca.
      p.hue = 18 + Math.random() * 28
      p.sat = 60 + Math.random() * 30
      p.light = 55 + Math.random() * 22
    }

    for (let i = 0; i < COUNT; i++) {
      const p = {} as P
      resetP(p)
      particles.push(p)
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = canvas.clientWidth
      H = canvas.clientHeight
      canvas.width = Math.max(1, Math.floor(W * dpr))
      canvas.height = Math.max(1, Math.floor(H * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cols = Math.ceil(W / FIELD_RES) + 1
      rows = Math.ceil(H / FIELD_RES) + 1
      field = new Float32Array(cols * rows)
      ctx.fillStyle = `rgb(${BG})`
      ctx.fillRect(0, 0, W, H)
    }

    // Cursor (coords relativas ao canvas; rect atualizado no scroll/resize).
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

    function updateField(time: number) {
      const t = time * 0.00005
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const nx = x * 0.06
          const ny = y * 0.06
          const a =
            Math.sin(nx + ny * 1.3 + t) * 1.2 +
            Math.sin(nx * 1.7 - ny * 0.5 + t * 1.4) * 0.8 +
            Math.sin(ny * 2.1 + Math.cos(nx) + t * 0.6) * 0.6
          field[y * cols + x] = a * Math.PI
        }
      }
    }

    let last = performance.now()
    let raf = 0
    let running = false

    function tick(now: number) {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now

      if (targetX > -9000) {
        const lerp = 1 - Math.pow(0.005, dt)
        mouseX += (targetX - mouseX) * lerp
        mouseY += (targetY - mouseY) * lerp
      } else {
        mouseX = -9999
        mouseY = -9999
      }

      // Fade sutil a cada frame → efeito de rastro.
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

        // Cursor empurra as partículas (vento).
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

        const fadeIn = Math.min(1, p.life / 15)
        const fadeOut = Math.min(1, (p.maxLife - p.life) / 40)
        const a = fadeIn * fadeOut * 0.5

        ctx.strokeStyle = `hsla(${p.hue}, ${p.sat}%, ${p.light}%, ${a})`
        ctx.beginPath()
        ctx.moveTo(p.prevX, p.prevY)
        ctx.lineTo(p.x, p.y)
        ctx.stroke()
      }

      raf = requestAnimationFrame(tick)
    }

    // Liga/desliga conforme visibilidade da seção e da aba.
    let onScreen = false
    function start() {
      if (running || reduce) return
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

    resize()

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

    if (reduce) {
      // Movimento reduzido: um quadro estático suave, sem loop.
      updateField(0)
    }

    return () => {
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
