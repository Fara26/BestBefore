import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ScanPage from '../pages/ScanPage'
import ScanAddedPage from '../pages/ScanAddedPage'
import { MOCK_PRODUCT } from '../lib/mockScan'

function renderScan() {
  render(
    <MemoryRouter initialEntries={['/scan']}>
      <Routes>
        <Route path="/" element={<p>Home</p>} />
        <Route path="/scan" element={<ScanPage />} />
        <Route path="/scan/added" element={<ScanAddedPage />} />
        <Route path="/scan/failed" element={<p>Failed</p>} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('ScanPage', () => {
  it('shows a pending state and then the added page with the product on success', async () => {
    renderScan()

    await userEvent.click(screen.getByRole('button', { name: 'Scan' }))

    expect(await screen.findByRole('button', { name: 'Scanning…' })).toBeDisabled()
    expect(await screen.findByRole('heading', { name: 'Item Added!' })).toBeInTheDocument()
    expect(screen.getByText(MOCK_PRODUCT.name)).toBeInTheDocument()
    expect(screen.getByText(`Expires ${MOCK_PRODUCT.expires}`)).toBeInTheDocument()
  })

  it('goes to the failed page when the mock is set to fail', async () => {
    renderScan()

    await userEvent.click(screen.getByRole('button', { name: 'Fail' }))
    expect(screen.getByRole('button', { name: 'Fail' })).toHaveAttribute('aria-pressed', 'true')
    await userEvent.click(screen.getByRole('button', { name: 'Scan' }))

    expect(await screen.findByText('Failed')).toBeInTheDocument()
  })

  it('closes back to home', async () => {
    renderScan()

    await userEvent.click(screen.getByRole('button', { name: 'Close' }))

    expect(screen.getByText('Home')).toBeInTheDocument()
  })
})
