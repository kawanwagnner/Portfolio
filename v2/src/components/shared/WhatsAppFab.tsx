import { motion } from 'framer-motion'
import { socials, whatsapp } from '@/data/content'

/** Logo oficial do WhatsApp (o lucide não tem marca de terceiros). */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.28-.1-.48-.15-.68.15-.2.3-.78.97-.95 1.17-.18.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.62-.93-2.22-.24-.58-.49-.5-.68-.51h-.58c-.2 0-.52.08-.8.38-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.28-.2-.58-.35zM12.04 21.5h-.01a9.43 9.43 0 0 1-4.8-1.32l-.35-.2-3.57.93.96-3.48-.23-.36a9.42 9.42 0 0 1-1.44-5.03c0-5.2 4.24-9.44 9.45-9.44 2.52 0 4.9.99 6.68 2.77a9.38 9.38 0 0 1 2.76 6.68c0 5.21-4.24 9.45-9.45 9.45zm8.04-17.49A11.3 11.3 0 0 0 12.04.68C5.77.68.67 5.78.67 12.04c0 2 .52 3.96 1.52 5.69L.57 23.6l6.02-1.58a11.33 11.33 0 0 0 5.44 1.39h.01c6.26 0 11.36-5.1 11.37-11.37 0-3.03-1.18-5.89-3.33-8.03z" />
    </svg>
  )
}

/**
 * Botão flutuante de WhatsApp, sempre na tela, em qualquer tamanho.
 *
 * Antes ele só existia no celular e só aparecia depois do herói. O Kawan pediu
 * fixo: é o atalho que o cliente procura em site de serviço e o canal que
 * fecha negócio, então não pode depender de rolagem nem de largura de tela.
 * Verde do próprio WhatsApp de propósito: o reconhecimento é imediato.
 */
export function WhatsAppFab() {
  return (
    <motion.a
      href={socials.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label={`${whatsapp.cta} Fale no WhatsApp`}
      title="Fale no WhatsApp"
      initial={{ opacity: 0, scale: 0.8, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      /* env(): em iPhone o botão não encosta na barra de gestos. */
      style={{
        bottom: 'calc(1.25rem + env(safe-area-inset-bottom))',
        backgroundColor: '#25D366',
        boxShadow: '0 10px 30px -8px rgba(37, 211, 102, 0.55)',
      }}
      className="fixed right-5 z-[90] grid h-14 w-14 place-items-center rounded-full text-white sm:right-6 sm:h-[3.75rem] sm:w-[3.75rem]"
    >
      <WhatsAppIcon className="h-7 w-7 sm:h-8 sm:w-8" />
    </motion.a>
  )
}
