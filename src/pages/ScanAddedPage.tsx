import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import StatusView from '../components/StatusView'
import type { ScannedProduct } from '../lib/mockScan'

type AddedState = {
  product?: ScannedProduct
  source?: 'scan' | 'manual'
} | null

export default function ScanAddedPage() {
  const navigate = useNavigate()
  const state = useLocation().state as AddedState
  const product = state?.product
  const isManual = state?.source === 'manual'

  if (!product) {
    return <Navigate to="/scan" replace />
  }

  return (
    <StatusView
      tone="success"
      title="Item Added!"
      subtitle={product.name}
      caption={`Expires ${product.expires}`}
      actions={
        <>
          <Button onClick={() => navigate('/items')}>View My Items</Button>
          <Button
            variant="secondary"
            onClick={() => navigate(isManual ? '/items/new' : '/scan')}
          >
            {isManual ? 'Add Another' : 'Scan Another'}
          </Button>
        </>
      }
    />
  )
}
