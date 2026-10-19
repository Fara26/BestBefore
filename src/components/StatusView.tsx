/*
 * Animations: Motion (https://motion.dev), v14.3.0
 * License: MIT (https://github.com/motiondivision/motion/blob/main/LICENSE.md)
 * Copyright (c) 2024 Motion B.V.
 *
 * Check mark path: "check" from Lucide (https://lucide.dev), v0.460.0, ISC License,
 * Copyright (c) Lucide Contributors 2022. Inlined here so it can be drawn on.
 */
import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { CircleAlertIcon } from './icons'
import { fadeUp } from '../lib/motion'
import '../styles/StatusView.css'

type StatusViewProps = {
  tone: 'success' | 'danger'
  title: string
  subtitle?: string
  caption?: string
  actions: ReactNode
}

const RAY_COLORS = ['amber', 'pink', 'green']

// Decorative rays around the success circle, evenly spaced every 45 degrees.
const rays = Array.from({ length: 8 }, (_, i) => {
  const angle = (i * Math.PI) / 4
  return {
    x1: 100 + 80 * Math.cos(angle),
    y1: 100 + 80 * Math.sin(angle),
    x2: 100 + 94 * Math.cos(angle),
    y2: 100 + 94 * Math.sin(angle),
    color: RAY_COLORS[i % RAY_COLORS.length],
  }
})

// Text and buttons fade up after the illustration has landed.
const TEXT_DELAY = 0.45

export default function StatusView({ tone, title, subtitle, caption, actions }: StatusViewProps) {
  return (
    <div className="status-view">
      <div className={`status-illustration status-illustration-${tone}`} aria-hidden="true">
        {tone === 'success' && (
          <svg className="status-rays" viewBox="0 0 200 200">
            {rays.map((ray, i) => (
              <motion.line
                key={i}
                x1={ray.x1}
                y1={ray.y1}
                x2={ray.x2}
                y2={ray.y2}
                className={`status-ray-${ray.color}`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.25, delay: 0.35 + i * 0.04 }}
              />
            ))}
          </svg>
        )}
        <motion.div
          className="status-circle"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        >
          {tone === 'success' ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <motion.path
                d="M20 6 9 17l-5-5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.35, ease: 'easeOut', delay: 0.25 }}
              />
            </svg>
          ) : (
            <motion.div
              className="status-alert"
              animate={{ x: [0, -8, 8, -6, 6, 0] }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <CircleAlertIcon />
            </motion.div>
          )}
        </motion.div>
      </div>

      <motion.h1 className="status-title" {...fadeUp(TEXT_DELAY)}>
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p className="status-subtitle" {...fadeUp(TEXT_DELAY + 0.08)}>
          {subtitle}
        </motion.p>
      )}
      {caption && (
        <motion.p className="status-caption" {...fadeUp(TEXT_DELAY + 0.16)}>
          {caption}
        </motion.p>
      )}

      <motion.div className="status-actions" {...fadeUp(TEXT_DELAY + 0.24)}>
        {actions}
      </motion.div>
    </div>
  )
}
