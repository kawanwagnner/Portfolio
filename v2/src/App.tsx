import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Navbar } from '@/components/sections/Navbar'
import { Footer } from '@/components/sections/Footer'
import Home from '@/pages/Home'
import ProjectsIndex from '@/pages/ProjectsIndex'
import ProjectCase from '@/pages/ProjectCase'

/**
 * Troca de rota → topo da página.
 * Rota com hash (ex.: `/#contato`, vindo de uma página de case) → rola até a seção.
 */
function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // espera a home montar antes de procurar a seção
      const id = requestAnimationFrame(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
      })
      return () => cancelAnimationFrame(id)
    }
    window.scrollTo({ top: 0 })
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <div className="relative min-h-svh bg-background">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projetos" element={<ProjectsIndex />} />
            <Route path="/projetos/:slug" element={<ProjectCase />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
