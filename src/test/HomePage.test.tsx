import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage'

describe('HomePage', () => {
  it('renders the header, greeting and scan button', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'BestBefore' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Profile' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Good Morning!' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Scan Barcode' })).toBeInTheDocument()
  })

  it('renders the placeholder items as clickable cards', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'My Items' })).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
    expect(screen.getByRole('button', { name: /Spinach/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Milk/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Eggs/ })).toBeInTheDocument()
  })
})
