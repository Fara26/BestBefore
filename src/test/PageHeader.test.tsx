import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import PageHeader from '../components/PageHeader'

describe('PageHeader', () => {
  it('renders the title with a back link when given', () => {
    render(
      <MemoryRouter>
        <PageHeader title="Profile" backTo="/" />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'Profile' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Back' })).toHaveAttribute('href', '/')
  })

  it('omits the back link when not given', () => {
    render(
      <MemoryRouter>
        <PageHeader title="My Items" />
      </MemoryRouter>,
    )

    expect(screen.queryByRole('link', { name: 'Back' })).not.toBeInTheDocument()
  })
})
