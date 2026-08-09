import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { socials, whatsapp } from '@/data/content'

/**
 * Botão flutuante de WhatsApp — só no celular.
 *
 * No desktop a navbar carrega o botão de conversa o tempo todo; abaixo de `sm`
 * ela vira hambúrguer e o contato some da tela. Como quase todo o tráfego chega
 * do Instagram (celular), o canal que fecha negócio não pode depender de rolar
 * a página inteira até o rodapé.
 *
 * Aparece só depois do herói: lá em cima o próprio herói já tem o CTA grande, e
 * dois botões iguais na mesma tela é ruído.
 */
export function WhatsAppFab() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={socials.whatsapp}
          target="_blank"
          rel="noreferrer"
          aria-label={whatsapp.cta}
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          /* `pb-safe` via env(): em iPhone o botão não encosta na barra de gestos. */
          style={{ bottom: 'calc(1.25rem + env(safe-area-inset-bottom))' }}
          className="btn-ember fixed right-5 z-[90] grid h-14 w-14 place-items-center rounded-full sm:hidden"
        >
          <MessageCircle className="h-6 w-6" />
        </motion.a>
      )}
    </AnimatePresence>
  )
}
