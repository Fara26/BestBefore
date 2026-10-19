import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import BottomNav from '../components/BottomNav'

function renderAt(path: string) {
  render(
    <MemoryRouter initialEntries={[path]}>
      <BottomNav />
    </MemoryRouter>,
  )
}

describe('BottomNav', () => {
  it('renders the three tabs with their routes', () => {
    renderAt('/')

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'Scan' })).toHaveAttribute('href', '/scan')
    expect(screen.getByRole('link', { name: 'Items' })).toHaveAttribute('href', '/items')
  })

  it('marks only the current route as active', () => {
    renderAt('/scan')

    expect(screen.getByRole('link', { name: 'Scan' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: 'Home' })).not.toHaveAttribute('aria-current')
    expect(screen.getByRole('link', { name: 'Items' })).not.toHaveAttribute('aria-current')
  })
})
