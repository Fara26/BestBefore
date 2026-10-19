import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import ItemCard from '../components/ItemCard'
import PageHeader from '../components/PageHeader'
import { PlusIcon } from '../components/icons'
import { formatDate } from '../lib/dates'
import { mockItems } from '../lib/mockItems'
import '../styles/ItemsPage.css'

export default function ItemsPage() {
  const navigate = useNavigate()

  return (
    <div className="items">
      <PageHeader title="My Items" />

      <Button icon={<PlusIcon />} onClick={() => navigate('/items/new')}>
        Add Item
      </Button>

      <ul className="items-list">
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
    </div>
  )
}
