/*
 * Animations: Motion (https://motion.dev), v14.3.0
 * License: MIT (https://github.com/motiondivision/motion/blob/main/LICENSE.md)
 * Copyright (c) 2024 Motion B.V.
 */
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import Button from '../components/Button'
import ItemCard from '../components/ItemCard'
import ProfileButton from '../components/ProfileButton'
import { BasketIcon, ScanBarcodeIcon } from '../components/icons'
import { formatDate } from '../lib/dates'
import { listItem } from '../lib/motion'
import { mockItems } from '../lib/mockItems'
import '../styles/HomePage.css'

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="home">
      <header className="home-header">
        <h1 className="home-wordmark">BestBefore</h1>
        <ProfileButton onClick={() => navigate('/profile')} />
      </header>

      <section className="home-hero">
        <h2 className="home-greeting">Good Morning!</h2>
        <BasketIcon className="home-basket" />
      </section>

      <Button icon={<ScanBarcodeIcon />} onClick={() => navigate('/scan')}>
        Scan Barcode
      </Button>

      <section className="home-items">
        <h2 className="home-section-title">My Items</h2>
        <ul className="home-item-list">
          {mockItems.map((item, index) => (
            <motion.li key={item.id} {...listItem(index)}>
              <ItemCard
                name={item.name}
                expires={formatDate(item.bestBefore)}
                icon={item.icon}
                tone={item.tone}
              />
            </motion.li>
          ))}
        </ul>
      </section>
    </div>
  )
}
