import { UserIcon } from './icons'
import '../styles/ProfileButton.css'

type ProfileButtonProps = {
  onClick?: () => void
}

export default function ProfileButton({ onClick }: ProfileButtonProps) {
  return (
    <button type="button" className="profile-button" aria-label="Profile" onClick={onClick}>
      <UserIcon />
    </button>
  )
}
