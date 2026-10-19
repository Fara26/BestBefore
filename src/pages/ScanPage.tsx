/*
 * Animations: Motion (https://motion.dev), v14.3.0
 * License: MIT (https://github.com/motiondivision/motion/blob/main/LICENSE.md)
 * Copyright (c) 2024 Motion B.V.
 */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import Button from '../components/Button'
import { BarcodeIcon, ScanBarcodeIcon, XIcon } from '../components/icons'
import { mockScan, type ScanOutcome } from '../lib/mockScan'
import { fadeUp, spring, tap } from '../lib/motion'
import '../styles/ScanPage.css'

// Each corner starts pushed outward, then snaps into place ("locking on").
const CORNER_OFFSET = 14
const corners = [
  { className: 'scan-corner-tl', x: -CORNER_OFFSET, y: -CORNER_OFFSET },
  { className: 'scan-corner-tr', x: CORNER_OFFSET, y: -CORNER_OFFSET },
  { className: 'scan-corner-bl', x: -CORNER_OFFSET, y: CORNER_OFFSET },
  { className: 'scan-corner-br', x: CORNER_OFFSET, y: CORNER_OFFSET },
]

// Controls fade up after the viewfinder has locked on.
const CONTROLS_DELAY = 0.3

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
      <motion.div
        className="scan-camera"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <motion.button
          type="button"
          className="scan-close"
          aria-label="Close"
          onClick={() => navigate('/')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileTap={{ scale: 0.85 }}
          transition={spring}
        >
          <XIcon />
        </motion.button>

        <motion.div
          className="scan-viewfinder"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {corners.map((corner) => (
            <motion.span
              key={corner.className}
              className={`scan-corner ${corner.className}`}
              initial={{ x: corner.x, y: corner.y, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18, delay: 0.15 }}
            />
          ))}
          <motion.div
            className="scan-barcode"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25, delay: 0.3 }}
          >
            <BarcodeIcon />
            <span>123456 789</span>
          </motion.div>
          {isScanning && (
            <motion.span
              className="scan-line"
              aria-hidden="true"
              initial={{ top: '8%' }}
              animate={{ top: ['8%', '92%', '8%'] }}
              transition={{ duration: 1.2, ease: 'easeInOut', repeat: Infinity }}
            />
          )}
        </motion.div>
      </motion.div>

      <div className="scan-controls">
        <motion.div className="scan-controls-icon" {...fadeUp(CONTROLS_DELAY)}>
          <ScanBarcodeIcon />
        </motion.div>
        <motion.div className="scan-controls-item" {...fadeUp(CONTROLS_DELAY + 0.06)}>
          <Button onClick={onScan} disabled={isScanning}>
            {isScanning ? 'Scanning…' : 'Scan'}
          </Button>
        </motion.div>
        <motion.div className="scan-controls-item" {...fadeUp(CONTROLS_DELAY + 0.12)}>
          <Button
            variant="secondary"
            disabled={isScanning}
            onClick={() => navigate('/items/new')}
          >
            Add Item Manually
          </Button>
        </motion.div>

        {import.meta.env.DEV && (
          <motion.div
            className="scan-dev"
            role="group"
            aria-label="Mock result"
            {...fadeUp(CONTROLS_DELAY + 0.18)}
          >
            <span>Mock result:</span>
            <motion.button
              type="button"
              aria-pressed={outcome === 'success'}
              onClick={() => setOutcome('success')}
              whileTap={tap}
              transition={spring}
            >
              Success
            </motion.button>
            <motion.button
              type="button"
              aria-pressed={outcome === 'failure'}
              onClick={() => setOutcome('failure')}
              whileTap={tap}
              transition={spring}
            >
              Fail
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
