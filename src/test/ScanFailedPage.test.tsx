import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ScanFailedPage from '../pages/ScanFailedPage'

describe('ScanFailedPage', () => {
  it('shows the error and retakes the scan', async () => {
    render(
      <MemoryRouter initialEntries={['/scan/failed']}>
        <Routes>
          <Route path="/scan" element={<p>Scan</p>} />
          <Route path="/scan/failed" element={<ScanFailedPage />} />
        </Routes>
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: "Couldn't read the barcode" })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Add Item Manually' })).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'Retake Scan' }))

    expect(screen.getByText('Scan')).toBeInTheDocument()
  })
})
