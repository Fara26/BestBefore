import { NavLink } from 'react-router-dom'
import { HouseIcon, ListIcon, ScanBarcodeIcon } from './icons'
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
          {tab.icon}
          <span>{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
