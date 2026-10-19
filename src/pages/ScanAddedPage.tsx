import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import StatusView from '../components/StatusView'
import type { ScannedProduct } from '../lib/mockScan'

export default function ScanAddedPage() {
  const navigate = useNavigate()
  const product = (useLocation().state as { product?: ScannedProduct } | null)?.product

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
          <Button variant="secondary" onClick={() => navigate('/scan')}>
            Scan Another
          </Button>
        </>
      }
    />
  )
}
