import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ScanAddedPage from '../pages/ScanAddedPage'
import { MOCK_PRODUCT } from '../lib/mockScan'

function renderAdded(state?: unknown) {
  render(
    <MemoryRouter initialEntries={[{ pathname: '/scan/added', state }]}>
      <Routes>
        <Route path="/scan" element={<p>Scan</p>} />
        <Route path="/scan/added" element={<ScanAddedPage />} />
        <Route path="/items" element={<p>Items</p>} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('ScanAddedPage', () => {
  it('redirects to the scan page when there is no product', () => {
    renderAdded()

    expect(screen.getByText('Scan')).toBeInTheDocument()
  })

  it('goes to items from View My Items', async () => {
    renderAdded({ product: MOCK_PRODUCT })

    await userEvent.click(screen.getByRole('button', { name: 'View My Items' }))

    expect(screen.getByText('Items')).toBeInTheDocument()
  })

  it('goes back to scanning from Scan Another', async () => {
    renderAdded({ product: MOCK_PRODUCT })

    await userEvent.click(screen.getByRole('button', { name: 'Scan Another' }))

    expect(screen.getByText('Scan')).toBeInTheDocument()
  })
})
