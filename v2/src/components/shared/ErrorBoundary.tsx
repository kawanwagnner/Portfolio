import { Component, type ReactNode } from 'react'

interface Props {
  fallback: ReactNode
  children: ReactNode
}

/**
 * Se a cena 3D falhar ao inicializar/renderizar (ex.: efeito não suportado
 * no backend WebGL2), mostra o fallback em vez de derrubar a página.
 */
export class ErrorBoundary extends Component<Props, { hasError: boolean }> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(err: unknown) {
    // Silencioso em produção; útil no dev.
    if (import.meta.env.DEV) console.warn('[3D] caiu no fallback:', err)
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children
  }
}
