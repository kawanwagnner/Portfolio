import { useEffect, useRef, type RefObject } from 'react'

/** Distância em px a partir da qual o gesto deixa de ser clique e vira arrasto. */
const DRAG_THRESHOLD = 6

/**
 * Arrastar-para-rolar ("grab") num container de scroll horizontal.
 *
 * Só age no ponteiro de mouse: no touch o navegador já faz isso nativamente,
 * com momentum — interceptar ali só pioraria o que já é bom.
 *
 * O container precisa da classe `drag-scroll` (index.css) pros cursores
 * grab/grabbing e pro bloqueio de seleção durante o arrasto.
 */
export function useDragScroll(ref: RefObject<HTMLElement>) {
  const drag = useRef({ armed: false, capturing: false, startX: 0, startLeft: 0, moved: 0 })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onPointerDown = (e: PointerEvent) => {
      // Zera sempre, inclusive no touch: num notebook com tela sensível, um
      // arrasto de mouse anterior deixaria `moved` velho e o toque seguinte
      // seria engolido como se fosse arrasto.
      drag.current = {
        armed: false,
        capturing: false,
        startX: e.clientX,
        startLeft: el.scrollLeft,
        moved: 0,
      }
      // Só botão esquerdo do mouse — botão do meio cola texto, direito abre menu.
      if (e.pointerType !== 'mouse' || e.button !== 0) return
      // "Armado", ainda não arrastando: aqui não se captura o ponteiro nem se
      // mexe no snap, porque isso ainda pode virar um clique simples.
      drag.current.armed = true
    }

    const onPointerMove = (e: PointerEvent) => {
      const d = drag.current
      if (!d.armed) return
      const dx = e.clientX - d.startX
      d.moved = Math.max(d.moved, Math.abs(dx))

      if (!d.capturing) {
        if (d.moved <= DRAG_THRESHOLD) return
        /*
         * Só agora vira arrasto de verdade.
         *
         * O setPointerCapture fica aqui, e não no pointerdown, por um motivo
         * que custa caro: capturar o ponteiro faz o navegador redirecionar o
         * `click` pro elemento que capturou. Capturando já no pointerdown,
         * TODO clique de mouse era entregue ao trilho em vez do link embaixo
         * do cursor — e nenhum CTA do carrossel navegava.
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
     * pro WhatsApp e pro checkout do Stripe. Sem isso, soltar o mouse depois de
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
