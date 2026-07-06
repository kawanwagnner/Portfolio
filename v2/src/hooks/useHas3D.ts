import { useEffect, useState } from 'react'

type State = 'checking' | 'yes' | 'no'

/**
 * Consegue rodar a cena 3D? Sim se houver WebGPU OU WebGL2.
 * O WebGPURenderer do three cai automaticamente pra WebGL2 onde não há WebGPU
 * (Safari, iPhone, muitos mobiles) — e WebGL2 existe em ~98% dos navegadores.
 * Só dá 'no' em navegador realmente antigo (aí entra o fallback em CSS).
 */
export function useHas3D(): State {
  const [state, setState] = useState<State>('checking')

  useEffect(() => {
    try {
      if ((navigator as any).gpu) {
        setState('yes')
        return
      }
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl2')
      setState(gl ? 'yes' : 'no')
    } catch {
      setState('no')
    }
  }, [])

  return state
}
