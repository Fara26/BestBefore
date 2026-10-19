/*
 * Animations: Motion (https://motion.dev), v14.3.0
 * License: MIT (https://github.com/motiondivision/motion/blob/main/LICENSE.md)
 * Copyright (c) 2024 Motion B.V.
 */
import type { Transition } from 'motion/react'

// Shared animation presets so every component moves the same way.

export const spring: Transition = { type: 'spring', stiffness: 500, damping: 30 }

export const tap = { scale: 0.97 }

export function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, ease: 'easeOut', delay } satisfies Transition,
  }
}

export function listItem(index: number) {
  return fadeUp(index * 0.05)
}

export const errorReveal = {
  initial: { opacity: 0, y: -4 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 } satisfies Transition,
}
