import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { BarcodeIcon, ScanBarcodeIcon, XIcon } from '../components/icons'
import { mockScan, type ScanOutcome } from '../lib/mockScan'
import '../styles/ScanPage.css'

export default function ScanPage() {
  const navigate = useNavigate()
  const [outcome, setOutcome] = useState<ScanOutcome>('success')
  const [isScanning, setIsScanning] = useState(false)

  const onScan = async () => {
    setIsScanning(true)
    const result = await mockScan(outcome)
    if (result.ok) {
      navigate('/scan/added', { state: { product: result.product } })
    } else {
      navigate('/scan/failed')
    }
  }

  return (
    <div className="scan">
      <div className="scan-camera">
        <button
          type="button"
          className="scan-close"
          aria-label="Close"
          onClick={() => navigate('/')}
        >
          <XIcon />
        </button>

        <div className="scan-viewfinder">
          <span className="scan-corner scan-corner-tl" />
          <span className="scan-corner scan-corner-tr" />
          <span className="scan-corner scan-corner-bl" />
          <span className="scan-corner scan-corner-br" />
          <div className="scan-barcode" aria-hidden="true">
            <BarcodeIcon />
            <span>123456 789</span>
          </div>
        </div>
      </div>

      <div className="scan-controls">
        <ScanBarcodeIcon className="scan-controls-icon" />
        <Button onClick={onScan} disabled={isScanning}>
          {isScanning ? 'Scanning…' : 'Scan'}
        </Button>
        <Button variant="secondary" disabled={isScanning}>
          Add Item Manually
        </Button>

        {import.meta.env.DEV && (
          <div className="scan-dev" role="group" aria-label="Mock result">
            <span>Mock result:</span>
            <button
              type="button"
              aria-pressed={outcome === 'success'}
              onClick={() => setOutcome('success')}
            >
              Success
            </button>
            <button
              type="button"
              aria-pressed={outcome === 'failure'}
              onClick={() => setOutcome('failure')}
            >
              Fail
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
