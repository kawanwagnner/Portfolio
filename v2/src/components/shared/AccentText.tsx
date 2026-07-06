import { Fragment } from 'react'

/**
 * Renderiza um texto colocando a palavra/trecho entre *asteriscos* com o acento.
 * Ex.: "ser *levada a sério*." → "levada a sério" em âmbar.
 */
export function AccentText({ children }: { children: string }) {
  const parts = children.split('*')
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="text-accent">
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  )
}
