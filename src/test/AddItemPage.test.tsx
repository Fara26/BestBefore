import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import AddItemPage from '../pages/AddItemPage'
import ScanAddedPage from '../pages/ScanAddedPage'
import { todayIsoDate } from '../lib/dates'

function renderAddItem() {
  render(
    <MemoryRouter initialEntries={['/items/new']}>
      <Routes>
        <Route path="/items" element={<p>Items</p>} />
        <Route path="/items/new" element={<AddItemPage />} />
        <Route path="/scan/added" element={<ScanAddedPage />} />
      </Routes>
    </MemoryRouter>,
  )
}

const save = () => userEvent.click(screen.getByRole('button', { name: 'Save Item' }))

describe('AddItemPage', () => {
  it('marks required fields and the recommended barcode', () => {
    renderAddItem()

    expect(screen.getByLabelText(/Product name/)).toBeRequired()
    expect(screen.getByLabelText(/Quantity/)).toBeRequired()
    expect(screen.getByLabelText(/Date bought/)).toBeRequired()
    expect(screen.getByLabelText(/Best before date/)).toBeRequired()
    expect(screen.getByLabelText(/^Barcode/)).not.toBeRequired()
    expect(screen.getByText('Recommended')).toBeInTheDocument()
    expect(screen.getByText('Optional')).toBeInTheDocument()
  })

  it('defaults quantity to 1 and date bought to today', () => {
    renderAddItem()

    expect(screen.getByLabelText(/Quantity/)).toHaveValue(1)
    expect(screen.getByLabelText(/Date bought/)).toHaveValue(todayIsoDate())
  })

  it('shows inline errors for every missing required field', async () => {
    renderAddItem()

    await userEvent.clear(screen.getByLabelText(/Quantity/))
    await userEvent.clear(screen.getByLabelText(/Date bought/))
    await save()

    expect(await screen.findByText('Product name is required')).toBeInTheDocument()
    expect(screen.getByText('Quantity is required')).toBeInTheDocument()
    expect(screen.getByText('Date bought is required')).toBeInTheDocument()
    expect(screen.getByText('Best before date is required')).toBeInTheDocument()
  })

  it('rejects a quantity below 1', async () => {
    renderAddItem()

    const quantity = screen.getByLabelText(/Quantity/)
    await userEvent.clear(quantity)
    await userEvent.type(quantity, '0')
    await save()

    expect(await screen.findByText('Quantity must be at least 1')).toBeInTheDocument()
  })

  it('rejects a best before date earlier than the date bought', async () => {
    renderAddItem()

    const purchaseDate = screen.getByLabelText(/Date bought/)
    await userEvent.clear(purchaseDate)
    await userEvent.type(purchaseDate, '2026-10-10')
    await userEvent.type(screen.getByLabelText(/Product name/), 'Yogurt')
    await userEvent.type(screen.getByLabelText(/Best before date/), '2026-10-09')
    await save()

    expect(
      await screen.findByText('You should probably not be eating this'),
    ).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Item Added!' })).not.toBeInTheDocument()
  })

  it('allows a best before date on the same day as the date bought', async () => {
    renderAddItem()

    const purchaseDate = screen.getByLabelText(/Date bought/)
    await userEvent.clear(purchaseDate)
    await userEvent.type(purchaseDate, '2026-10-10')
    await userEvent.type(screen.getByLabelText(/Product name/), 'Bread')
    await userEvent.type(screen.getByLabelText(/Best before date/), '2026-10-10')
    await save()

    expect(await screen.findByRole('heading', { name: 'Item Added!' })).toBeInTheDocument()
  })

  it('saves without a barcode, shows the pending state, then the confirmation', async () => {
    renderAddItem()

    await userEvent.type(screen.getByLabelText(/Product name/), 'Yogurt')
    await userEvent.type(screen.getByLabelText(/Best before date/), '2026-12-01')
    await save()

    expect(await screen.findByRole('button', { name: 'Saving…' })).toBeDisabled()
    expect(await screen.findByRole('heading', { name: 'Item Added!' })).toBeInTheDocument()
    expect(screen.getByText('Yogurt')).toBeInTheDocument()
    expect(screen.getByText('Expires Dec 1, 2026')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Add Another' })).toBeInTheDocument()
  })

  it('cancels back to items', async () => {
    renderAddItem()

    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }))

    expect(screen.getByText('Items')).toBeInTheDocument()
  })
})
