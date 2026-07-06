import { useEffect, useState } from 'react'

/**
 * Heurística de dispositivo fraco / mobile.
 * Em `true`, servimos uma versão leve (menos 3D) pra manter tudo fluido.
 * Começa `false` (assume forte) e corrige após montar — evita degradar
 * desktop bom por um instante.
 */
export function useIsLowPower(): boolean {
  const [low, setLow] = useState(false)

  useEffect(() => {
    try {
      const cores = navigator.hardwareConcurrency || 8
      // Toque + tela pequena = celular/tablet real (desktop com mouse fica de fora,
      // mesmo com a janela estreita). Só derruba o 3D em mobile de verdade
      // ou hardware muito antigo (≤2 núcleos).
      const coarse = window.matchMedia('(pointer: coarse)').matches
      const small = window.matchMedia('(max-width: 768px)').matches
      const isPhone = coarse && small
      setLow(isPhone || cores <= 2)
    } catch {
      setLow(false)
    }
  }, [])

  return low
}
