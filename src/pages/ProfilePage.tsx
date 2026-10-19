import Button from '../components/Button'
import PageHeader from '../components/PageHeader'
import { ChevronRightIcon, HouseIcon, UserIcon } from '../components/icons'
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

      <button type="button" className="profile-row">
        <span className="profile-row-icon">
          <HouseIcon />
        </span>
        <span className="profile-row-body">
          <span className="profile-row-label">Household</span>{' '}
          <span className="profile-row-value">{user.household}</span>
        </span>
        <ChevronRightIcon className="profile-row-chevron" />
      </button>

      <Button variant="secondary">Log out</Button>
    </div>
  )
}
