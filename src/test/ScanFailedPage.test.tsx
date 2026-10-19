import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ScanFailedPage from '../pages/ScanFailedPage'

function renderFailed() {
  render(
    <MemoryRouter initialEntries={['/scan/failed']}>
      <Routes>
        <Route path="/scan" element={<p>Scan</p>} />
        <Route path="/scan/failed" element={<ScanFailedPage />} />
        <Route path="/items/new" element={<p>Add Item Form</p>} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('ScanFailedPage', () => {
  it('shows the error and retakes the scan', async () => {
    renderFailed()

    expect(screen.getByRole('heading', { name: "Couldn't read the barcode" })).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'Retake Scan' }))

    expect(screen.getByText('Scan')).toBeInTheDocument()
  })

  it('goes to the manual entry form', async () => {
    renderFailed()

    await userEvent.click(screen.getByRole('button', { name: 'Add Item Manually' }))

    expect(screen.getByText('Add Item Form')).toBeInTheDocument()
  })
})
