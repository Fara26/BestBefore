import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import ItemCard from '../components/ItemCard'
import ProfileButton from '../components/ProfileButton'
import { BasketIcon, ScanBarcodeIcon } from '../components/icons'
import { formatDate } from '../lib/dates'
import { mockItems } from '../lib/mockItems'
import '../styles/HomePage.css'

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="home">
      <header className="home-header">
        <h1 className="home-wordmark">BestBefore</h1>
        <ProfileButton onClick={() => navigate('/profile')} />
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
          {mockItems.map((item) => (
            <li key={item.id}>
              <ItemCard
                name={item.name}
                expires={formatDate(item.bestBefore)}
                icon={item.icon}
                tone={item.tone}
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
