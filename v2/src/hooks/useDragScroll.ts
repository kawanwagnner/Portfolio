import { useEffect, useRef, type RefObject } from 'react'

/** Distância em px a partir da qual o gesto deixa de ser clique e vira arrasto. */
const DRAG_THRESHOLD = 6

/**
 * Arrastar-para-rolar ("grab") num container de scroll horizontal, no mouse e
 * no toque.
 *
 * O container precisa da classe `drag-scroll` (index.css), que traz os cursores
 * grab/grabbing e, mais importante, `touch-action: pan-y`. Com ela o navegador
 * cuida só da rolagem vertical — que é o que impede o carrossel de sequestrar
 * o gesto e prender a página no celular. Em troca, o eixo horizontal no toque
 * deixa de ser nativo e passa a ser feito aqui.
 */
export function useDragScroll(ref: RefObject<HTMLElement>) {
  const drag = useRef({
    armed: false,
    capturing: false,
    startX: 0,
    startY: 0,
    startLeft: 0,
    moved: 0,
  })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onPointerDown = (e: PointerEvent) => {
      // Zera sempre, inclusive quando o gesto não vai virar arrasto: senão um
      // arrasto anterior deixaria `moved` velho e engoliria o próximo clique.
      drag.current = {
        armed: false,
        capturing: false,
        startX: e.clientX,
        startY: e.clientY,
        startLeft: el.scrollLeft,
        moved: 0,
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
        // cada frame. Desliga durante e religa no fim, pra assentar no card.
        el.style.scrollSnapType = 'none'
        el.classList.add('is-dragging')
      }

      el.scrollLeft = d.startLeft - dx
    }

    const end = (e: PointerEvent) => {
      const d = drag.current
      if (!d.armed) return
      d.armed = false
      if (!d.capturing) return
      d.capturing = false
      el.style.scrollSnapType = ''
      el.classList.remove('is-dragging')
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId)
    }

    /**
     * O arrasto quase sempre termina em cima de um card — e os cards são links
     * pro WhatsApp e pro checkout do Stripe. Sem isso, soltar depois de
     * arrastar abriria a conversa ou a cobrança sem o cliente ter pedido.
     */
    const onClickCapture = (e: MouseEvent) => {
      if (drag.current.moved > DRAG_THRESHOLD) {
        e.preventDefault()
        e.stopPropagation()
      }
    }

    el.addEventListener('pointerdown', onPointerDown)
    el.addEventListener('pointermove', onPointerMove)
    el.addEventListener('pointerup', end)
    el.addEventListener('pointercancel', end)
    el.addEventListener('click', onClickCapture, true)

    return () => {
      el.removeEventListener('pointerdown', onPointerDown)
      el.removeEventListener('pointermove', onPointerMove)
      el.removeEventListener('pointerup', end)
      el.removeEventListener('pointercancel', end)
      el.removeEventListener('click', onClickCapture, true)
    }
  }, [ref])
}
