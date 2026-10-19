/*
 * Animations: Motion (https://motion.dev), v14.3.0
 * License: MIT (https://github.com/motiondivision/motion/blob/main/LICENSE.md)
 * Copyright (c) 2024 Motion B.V.
 */
import { motion } from 'motion/react'
import { UserIcon } from './icons'
import { spring } from '../lib/motion'
import '../styles/ProfileButton.css'

type ProfileButtonProps = {
  onClick?: () => void
}

export default function ProfileButton({ onClick }: ProfileButtonProps) {
  return (
    <motion.button
      type="button"
      className="profile-button"
      aria-label="Profile"
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      transition={spring}
    >
      <UserIcon />
    </motion.button>
  )
}
