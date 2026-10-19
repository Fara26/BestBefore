/*
 * Animations: Motion (https://motion.dev), v14.3.0
 * License: MIT (https://github.com/motiondivision/motion/blob/main/LICENSE.md)
 * Copyright (c) 2024 Motion B.V.
 */
import { Outlet, useLocation } from 'react-router-dom'
import { motion } from 'motion/react'
import BottomNav from '../components/BottomNav'
import '../styles/AppLayout.css'

export default function AppLayout() {
  const { pathname } = useLocation()

  return (
    <div className="app-layout">
      <main className="app-content">
        {/* Re-keyed per route so each page plays its enter animation. */}
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <Outlet />
        </motion.div>
      </main>
      <BottomNav />
    </div>
  )
}
