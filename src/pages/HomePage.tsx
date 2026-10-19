import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import ItemCard from '../components/ItemCard'
import ProfileButton from '../components/ProfileButton'
import { BasketIcon, EggIcon, LeafIcon, MilkIcon, ScanBarcodeIcon } from '../components/icons'
import '../styles/HomePage.css'

// Placeholder data until inventory integration.
const items = [
  { name: 'Spinach', expires: 'Nov 29, 2026', icon: <LeafIcon />, tone: 'green' as const },
  { name: 'Milk', expires: 'Nov 28, 2026', icon: <MilkIcon />, tone: 'green' as const },
  { name: 'Eggs', expires: 'Nov 30, 2026', icon: <EggIcon />, tone: 'amber' as const },
]

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="home">
      <header className="home-header">
        <h1 className="home-wordmark">BestBefore</h1>
        <ProfileButton />
      </header>

      <section className="home-hero">
        <h2 className="home-greeting">Good Morning!</h2>
        <BasketIcon className="home-basket" />
      </section>

      <Button icon={<ScanBarcodeIcon />} onClick={() => navigate('/scan')}>
        Scan Barcode
      </Button>

      <section className="home-items">
        <h2 className="home-section-title">My Items</h2>
        <ul className="home-item-list">
          {items.map((item) => (
            <li key={item.name}>
              <ItemCard {...item} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
