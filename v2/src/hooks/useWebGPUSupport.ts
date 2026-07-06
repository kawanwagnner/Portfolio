import { useEffect, useState } from 'react'

type Support = 'checking' | 'supported' | 'unsupported'

/**
 * Detecta suporte a WebGPU no navegador.
 * Retorna 'checking' até confirmar, depois 'supported' | 'unsupported'.
 * Isso permite decidir entre o herói WebGPU e o fallback sem tela preta.
 */
export function useWebGPUSupport(): Support {
  const [support, setSupport] = useState<Support>('checking')

  useEffect(() => {
    let cancelled = false

    async function check() {
      const gpu = (navigator as any).gpu
      if (!gpu) {
        if (!cancelled) setSupport('unsupported')
        return
      }
      try {
        const adapter = await gpu.requestAdapter()
        if (!cancelled) setSupport(adapter ? 'supported' : 'unsupported')
      } catch {
        if (!cancelled) setSupport('unsupported')
      }
    }

    check()
    return () => {
      cancelled = true
    }
  }, [])

  return support
}
