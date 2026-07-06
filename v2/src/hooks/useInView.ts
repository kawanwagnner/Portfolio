import { useEffect, useRef, useState } from 'react'

/**
 * Observa a visibilidade de um elemento (viva, nos dois sentidos).
 * `rootMargin` grande faz montar ANTES de entrar na tela, então não há flash.
 * Usado pra montar/desmontar cenas 3D pesadas só perto da viewport.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(rootMargin = '600px') {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin])

  return { ref, inView }
}
