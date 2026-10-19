import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ItemsPage from '../pages/ItemsPage'

function renderItems() {
  render(
    <MemoryRouter initialEntries={['/items']}>
      <Routes>
        <Route path="/items" element={<ItemsPage />} />
        <Route path="/items/new" element={<p>Add Item Form</p>} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('ItemsPage', () => {
  it('renders the item list with formatted dates', () => {
    renderItems()

    expect(screen.getByRole('heading', { name: 'My Items' })).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
    expect(screen.getByText('Expires Nov 29, 2026')).toBeInTheDocument()
  })

  it('goes to the manual entry form from Add Item', async () => {
    renderItems()

    await userEvent.click(screen.getByRole('button', { name: 'Add Item' }))

    expect(screen.getByText('Add Item Form')).toBeInTheDocument()
  })
})
