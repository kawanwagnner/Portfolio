import { useEffect, useState } from 'react'

/**
 * Tema do site: claro por padrão, escuro como opção do visitante.
 *
 * A escolha fica em localStorage e a classe `theme-light` vai no <html>. O
 * script no <head> do index.html aplica a mesma regra antes do React subir,
 * senão quem escolheu o escuro veria um clarão branco a cada carregamento.
 * Mudou a chave ou o padrão aqui? Mude lá também.
 */
export type Theme = 'light' | 'dark'
export const THEME_KEY = 'vyso:theme'

function read(): Theme {
  try {
    return localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

const listeners = new Set<(t: Theme) => void>()
let current: Theme = typeof window === 'undefined' ? 'light' : read()

function apply(t: Theme) {
  current = t
  document.documentElement.classList.toggle('theme-light', t === 'light')
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', t === 'light' ? '#f9f9fc' : '#0f1115')
  try {
    localStorage.setItem(THEME_KEY, t)
  } catch {
    /* aba anônima sem storage: só não lembra */
  }
  listeners.forEach((l) => l(t))
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(current)
  useEffect(() => {
    listeners.add(setTheme)
    return () => {
      listeners.delete(setTheme)
    }
  }, [])
  return { theme, toggle: () => apply(current === 'light' ? 'dark' : 'light') }
}
