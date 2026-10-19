/*
 * Animations: Motion (https://motion.dev), v14.3.0
 * License: MIT (https://github.com/motiondivision/motion/blob/main/LICENSE.md)
 * Copyright (c) 2024 Motion B.V.
 */
import type { ReactNode } from 'react'
import { motion, type HTMLMotionProps } from 'motion/react'
import { spring, tap } from '../lib/motion'
import '../styles/Button.css'

type ButtonProps = Omit<HTMLMotionProps<'button'>, 'children'> & {
  variant?: 'primary' | 'secondary'
  icon?: ReactNode
  children?: ReactNode
}

export default function Button({
  variant = 'primary',
  icon,
  className,
  type = 'button',
  children,
  ...rest
}: ButtonProps) {
  const classes = ['button', `button-${variant}`, className].filter(Boolean).join(' ')

  return (
    <motion.button type={type} className={classes} whileTap={tap} transition={spring} {...rest}>
      {icon && <span className="button-icon">{icon}</span>}
      {children}
    </motion.button>
  )
}
