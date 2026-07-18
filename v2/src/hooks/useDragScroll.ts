import { useEffect, useRef, type RefObject } from 'react'

/** Distância em px a partir da qual o gesto deixa de ser clique e vira arrasto. */
const DRAG_THRESHOLD = 6
/** Velocidade (px/ms) acima da qual soltar conta como arremesso, não como parada. */
const FLICK_VELOCITY = 0.35
/** Tempo estimado da animação de assentar, pra só então religar o snap. */
const SETTLE_MS = 460

/**
 * Posição de scroll que alinha cada card, na ordem. Lida do próprio DOM em vez
 * de assumir "largura + gap": assim mudar o gap ou a largura no Tailwind não
 * exige mexer aqui.
 */
export function cardPositions(el: HTMLElement): number[] {
  const padLeft = parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0
  return Array.from(el.children).map((c) => (c as HTMLElement).offsetLeft - padLeft)
}

/** Índice do card cuja posição está mais perto de `left`. */
export function nearestIndex(positions: number[], left: number): number {
  let best = 0
  for (let i = 1; i < positions.length; i++) {
    if (Math.abs(positions[i] - left) < Math.abs(positions[best] - left)) best = i
  }
  return best
}

/**
 * Arrastar-para-rolar ("grab") num container de scroll horizontal, no mouse e
 * no toque, com arremesso.
 *
 * O container precisa da classe `drag-scroll` (index.css), que traz os cursores
 * grab/grabbing e, mais importante, `touch-action: pan-y`. Com ela o navegador
 * cuida só da rolagem vertical — que é o que impede o carrossel de sequestrar
 * o gesto e prender a página no celular. Em troca, o eixo horizontal no toque
 * deixa de ser nativo: o 1:1 com o dedo, a inércia e o assentar no card passam
 * todos a ser feitos aqui.
 */
export function useDragScroll(ref: RefObject<HTMLElement>) {
  const drag = useRef({
    armed: false,
    capturing: false,
    startX: 0,
    startY: 0,
    startLeft: 0,
    moved: 0,
    lastX: 0,
    lastT: 0,
    velocity: 0,
  })
  const settleTimer = useRef(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const onPointerDown = (e: PointerEvent) => {
      // Tocar de novo durante o assentar cancela a religada pendente do snap,
      // senão ela cairia no meio do próximo arrasto e daria um tranco.
      if (settleTimer.current) {
        clearTimeout(settleTimer.current)
        settleTimer.current = 0
      }
      // Zera sempre, inclusive quando o gesto não vai virar arrasto: senão um
      // arrasto anterior deixaria `moved` velho e engoliria o próximo clique.
      drag.current = {
        armed: false,
        capturing: false,
        startX: e.clientX,
        startY: e.clientY,
        startLeft: el.scrollLeft,
        moved: 0,
        lastX: e.clientX,
        lastT: e.timeStamp,
        velocity: 0,
      }
      // No mouse, só botão esquerdo — o do meio cola texto, o direito abre menu.
      if (e.pointerType === 'mouse' && e.button !== 0) return
      drag.current.armed = true
    }

    const onPointerMove = (e: PointerEvent) => {
      const d = drag.current
      if (!d.armed) return
      const dx = e.clientX - d.startX
      const dy = e.clientY - d.startY
      d.moved = Math.max(d.moved, Math.abs(dx))

      if (!d.capturing) {
        if (Math.abs(dx) <= DRAG_THRESHOLD) return
        // Gesto mais vertical que horizontal é rolagem de página, não arrasto.
        // O `touch-action: pan-y` já entrega o vertical ao navegador, mas essa
        // guarda evita roubar um swipe diagonal antes de ele se definir.
        if (Math.abs(dy) > Math.abs(dx)) return
        /*
         * Só agora vira arrasto de verdade.
         *
         * O setPointerCapture fica aqui, e não no pointerdown, por um motivo
         * que custa caro: capturar o ponteiro faz o navegador redirecionar o
         * `click` pro elemento que capturou. Capturando já no pointerdown,
         * TODO clique era entregue ao trilho em vez do link embaixo do dedo
         * — e nenhum CTA dos cards navegava.
         */
        d.capturing = true
        el.setPointerCapture(e.pointerId)
        // O snap briga com scrollLeft imperativo: puxaria o card de volta a
        // cada frame. Fica desligado até o gesto assentar.
        el.style.scrollSnapType = 'none'
        el.classList.add('is-dragging')
      }

      // Velocidade suavizada — a instantânea do último frame é ruidosa demais
      // pra decidir sozinha se foi arremesso.
      const dt = Math.max(1, e.timeStamp - d.lastT)
      d.velocity = 0.7 * ((e.clientX - d.lastX) / dt) + 0.3 * d.velocity
      d.lastX = e.clientX
      d.lastT = e.timeStamp

      el.scrollLeft = d.startLeft - dx
    }

    const end = (e: PointerEvent) => {
      const d = drag.current
      if (!d.armed) return
      d.armed = false
      if (!d.capturing) return
      d.capturing = false
      el.classList.remove('is-dragging')
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId)

      const positions = cardPositions(el)
      if (!positions.length) {
        el.style.scrollSnapType = ''
        return
      }

      // Arremesso curto avança um card inteiro; parada calma assenta no mais
      // perto. Sem isso, um flick rápido e curto não saía do lugar — que é
      // exatamente o que dava a sensação de "duro".
      let idx: number
      if (Math.abs(d.velocity) > FLICK_VELOCITY) {
        // Dedo pra esquerda (velocidade negativa) = avançar.
        const from = nearestIndex(positions, d.startLeft)
        idx = from + (d.velocity < 0 ? 1 : -1)
      } else {
        idx = nearestIndex(positions, el.scrollLeft)
      }
      idx = Math.max(0, Math.min(positions.length - 1, idx))

      el.scrollTo({ left: positions[idx], behavior: reduce ? 'auto' : 'smooth' })
      // Religa o snap só depois de assentar: com ele ligado, o scroll suave
      // seria interrompido por um salto instantâneo até o ponto de snap.
      settleTimer.current = window.setTimeout(() => {
        el.style.scrollSnapType = ''
        settleTimer.current = 0
      }, reduce ? 0 : SETTLE_MS)
    }

    /**
     * O arrasto quase sempre termina em cima de um card — e os cards são links
     * pro WhatsApp e pro checkout do Stripe. Sem isso, soltar depois de
     * arrastar abriria a conversa ou a cobrança sem o cliente ter pedido.
     */
    const onClickCapture = (evt: MouseEvent) => {
      if (drag.current.moved > DRAG_THRESHOLD) {
        evt.preventDefault()
        evt.stopPropagation()
      }
    }

    el.addEventListener('pointerdown', onPointerDown)
    el.addEventListener('pointermove', onPointerMove)
    el.addEventListener('pointerup', end)
    el.addEventListener('pointercancel', end)
    el.addEventListener('click', onClickCapture, true)

    return () => {
      if (settleTimer.current) clearTimeout(settleTimer.current)
      el.removeEventListener('pointerdown', onPointerDown)
      el.removeEventListener('pointermove', onPointerMove)
      el.removeEventListener('pointerup', end)
      el.removeEventListener('pointercancel', end)
      el.removeEventListener('click', onClickCapture, true)
    }
  }, [ref])
}
