import { motion } from 'framer-motion'
import { socials, whatsapp } from '@/data/content'
import { WhatsAppIcon } from '@/components/shared/WhatsAppIcon'

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
      {/* Centro óptico, não geométrico. Medido no navegador: a caixa do desenho
          já cai no centro exato do botão, mas o rabinho do balão pesa embaixo à
          esquerda e o ícone parece torto. 4% pra direita e 3% pra cima põem o
          anel do balão no meio, que é onde o olho procura o centro. */}
      <WhatsAppIcon className="h-7 w-7 translate-x-[4%] -translate-y-[3%] sm:h-8 sm:w-8" />
    </motion.a>
  )
}
