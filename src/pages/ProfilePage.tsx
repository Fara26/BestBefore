/*
 * Animations: Motion (https://motion.dev), v14.3.0
 * License: MIT (https://github.com/motiondivision/motion/blob/main/LICENSE.md)
 * Copyright (c) 2024 Motion B.V.
 */
import { motion } from 'motion/react'
import Button from '../components/Button'
import PageHeader from '../components/PageHeader'
import { ChevronRightIcon, HouseIcon, UserIcon } from '../components/icons'
import { spring, tap } from '../lib/motion'
import '../styles/ProfilePage.css'

// Placeholder user until auth integration.
const user = {
  name: 'Your Name',
  email: 'you@example.com',
  household: 'My Household',
}

export default function ProfilePage() {
  return (
    <div className="profile">
      <PageHeader title="Profile" backTo="/" />

      <section className="profile-identity">
        <div className="profile-avatar">
          <UserIcon />
        </div>
        <p className="profile-name">{user.name}</p>
        <p className="profile-email">{user.email}</p>
      </section>

      <motion.button type="button" className="profile-row" whileTap={tap} transition={spring}>
        <span className="profile-row-icon">
          <HouseIcon />
        </span>
        <span className="profile-row-body">
          <span className="profile-row-label">Household</span>{' '}
          <span className="profile-row-value">{user.household}</span>
        </span>
        <ChevronRightIcon className="profile-row-chevron" />
      </motion.button>

      <Button variant="secondary">Log out</Button>
    </div>
  )
}
