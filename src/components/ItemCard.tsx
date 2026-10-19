/*
 * Animations: Motion (https://motion.dev), v14.3.0
 * License: MIT (https://github.com/motiondivision/motion/blob/main/LICENSE.md)
 * Copyright (c) 2024 Motion B.V.
 */
import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { ChevronRightIcon } from './icons'
import { spring, tap } from '../lib/motion'
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
    <motion.button
      type="button"
      className="item-card"
      onClick={onClick}
      whileTap={tap}
      transition={spring}
    >
      <span className={`item-card-tile item-card-tile-${tone}`}>{icon}</span>
      <span className="item-card-body">
        <span className="item-card-name">{name}</span>{' '}
        <span className="item-card-expires">Expires {expires}</span>
      </span>
      <ChevronRightIcon className="item-card-chevron" />
    </motion.button>
  )
}
