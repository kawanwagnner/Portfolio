import { useEffect, useState } from 'react'

/**
 * Capacidade do aparelho, em três faixas:
 *   - 'full'   → desktop/notebook: efeito completo
 *   - 'lite'   → celular de verdade: mesmo efeito, com menos partículas
 *   - 'static' → hardware muito antigo (≤2 núcleos): nada de canvas animado
 *
 * Começa em 'full' (assume forte) e corrige após montar — evita degradar
 * desktop bom por um instante.
 */
export type DeviceTier = 'full' | 'lite' | 'static'

export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>('full')

  useEffect(() => {
    try {
      const cores = navigator.hardwareConcurrency || 8
      if (cores <= 2) {
        setTier('static')
        return
      }
      // Toque + tela pequena = celular/tablet real (desktop com mouse fica de
      // fora, mesmo com a janela estreita). Atenção ao testar: extensão que só
      // redimensiona a janela NÃO emula `pointer: coarse` e cai em 'full' — o
      // modo dispositivo do DevTools emula, e aí bate com o aparelho real.
      const coarse = window.matchMedia('(pointer: coarse)').matches
      const small = window.matchMedia('(max-width: 768px)').matches
      setTier(coarse && small ? 'lite' : 'full')
    } catch {
      setTier('full')
    }
  }, [])

  return tier
}

/**
 * Atalho pra quem não tem versão intermediária — ou roda o efeito inteiro, ou
 * não roda (é o caso da cena WebGPU). Mantém o contrato booleano de antes:
 * `true` tanto em celular quanto em hardware fraco.
 */
export function useIsLowPower(): boolean {
  return useDeviceTier() !== 'full'
}
