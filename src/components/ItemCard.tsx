import type { ReactNode } from 'react'
import { ChevronRightIcon } from './icons'
import '../styles/ItemCard.css'

type ItemCardProps = {
  name: string
  expires: string
  icon: ReactNode
  tone?: 'green' | 'amber'
  onClick?: () => void
}

export default function ItemCard({ name, expires, icon, tone = 'green', onClick }: ItemCardProps) {
  return (
    <button type="button" className="item-card" onClick={onClick}>
      <span className={`item-card-tile item-card-tile-${tone}`}>{icon}</span>
      <span className="item-card-body">
        <span className="item-card-name">{name}</span>{' '}
        <span className="item-card-expires">Expires {expires}</span>
      </span>
      <ChevronRightIcon className="item-card-chevron" />
    </button>
  )
}
