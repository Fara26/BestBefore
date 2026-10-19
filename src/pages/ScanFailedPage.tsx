import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import StatusView from '../components/StatusView'

export default function ScanFailedPage() {
  const navigate = useNavigate()

  return (
    <StatusView
      tone="danger"
      title="Couldn't read the barcode"
      actions={
        <>
          <Button onClick={() => navigate('/scan')}>Retake Scan</Button>
          <Button variant="secondary" onClick={() => navigate('/items/new')}>
            Add Item Manually
          </Button>
        </>
      }
    />
  )
}
