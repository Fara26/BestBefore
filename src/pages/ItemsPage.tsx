/*
 * Animations: Motion (https://motion.dev), v14.3.0
 * License: MIT (https://github.com/motiondivision/motion/blob/main/LICENSE.md)
 * Copyright (c) 2024 Motion B.V.
 */
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import Button from '../components/Button'
import ItemCard from '../components/ItemCard'
import PageHeader from '../components/PageHeader'
import { PlusIcon } from '../components/icons'
import { formatDate } from '../lib/dates'
import { listItem } from '../lib/motion'
import { mockItems } from '../lib/mockItems'
import '../styles/ItemsPage.css'

export default function ItemsPage() {
  const navigate = useNavigate()

  return (
    <div className="items">
      <PageHeader title="My Items" />

      <Button icon={<PlusIcon />} onClick={() => navigate('/items/new')}>
        Add Item
      </Button>

      <ul className="items-list">
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
    </div>
  )
}
