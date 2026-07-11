import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Instagram } from 'lucide-react'
import { Logo } from '@/components/shared/Logo'
import { brand, nav, socials } from '@/data/content'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /** Âncoras (#sobre, #contato…) só existem na home — fora dela, volta pra home no hash. */
  const handleNav = (href: string) => {
    setOpen(false)
    if (pathname !== '/') {
      navigate(`/${href}`)
      return
    }
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'fixed inset-x-0 top-0 z-[100] transition-all duration-300',
        scrolled ? 'py-3' : 'py-5'
      )}
    >
      <nav
        className={cn(
          'mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 py-2.5 transition-all duration-300',
          scrolled ? 'glass border border-border shadow-lg' : 'border border-transparent'
        )}
        style={{ width: 'min(100% - 2rem, 72rem)' }}
      >
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault()
            handleNav('#hero')
          }}
          className="flex items-center gap-2.5 font-display text-lg font-bold tracking-tight"
        >
          <Logo className="h-7 text-accent" />
          <span className="hidden sm:inline">{brand.name.split(' ')[0]}</span>
        </a>

        {/* Desktop */}
        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNav(item.href)
                }}
                className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={socials.instagram}
            target="_blank"
            rel="noreferrer"
            className="btn-ember hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all sm:inline-flex"
          >
            <Instagram className="h-4 w-4" />
            Seguir
          </a>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-secondary/40 text-foreground md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="mx-4 mt-3 overflow-hidden rounded-2xl glass border border-border p-2 md:hidden"
          >
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNav(item.href)
                }}
                className="block rounded-xl px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary/60"
              >
                {item.label}
              </a>
            ))}
            <a
              href={socials.instagram}
              target="_blank"
              rel="noreferrer"
              className="btn-ember mt-1 flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold"
            >
              <Instagram className="h-4 w-4" />
              Seguir no Instagram
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
