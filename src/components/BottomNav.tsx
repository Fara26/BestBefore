/*
 * Animations: Motion (https://motion.dev), v14.3.0
 * License: MIT (https://github.com/motiondivision/motion/blob/main/LICENSE.md)
 * Copyright (c) 2024 Motion B.V.
 */
import { NavLink } from 'react-router-dom'
import { motion } from 'motion/react'
import { HouseIcon, ListIcon, ScanBarcodeIcon } from './icons'
import { spring } from '../lib/motion'
import '../styles/BottomNav.css'

const tabs = [
  { to: '/', label: 'Home', icon: <HouseIcon /> },
  { to: '/scan', label: 'Scan', icon: <ScanBarcodeIcon /> },
  { to: '/items', label: 'Items', icon: <ListIcon /> },
]

export default function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Main">
      {tabs.map((tab) => (
        <NavLink key={tab.to} to={tab.to} end className="bottom-nav-link">
          {({ isActive }) => (
            <motion.span className="bottom-nav-item" whileTap={{ scale: 0.9 }} transition={spring}>
              <span className="bottom-nav-icon">
                {isActive && (
                  <motion.span
                    layoutId="bottom-nav-indicator"
                    className="bottom-nav-indicator"
                    transition={spring}
                  />
                )}
                {tab.icon}
              </span>
              <span>{tab.label}</span>
            </motion.span>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
