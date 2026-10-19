import { render, screen } from '@testing-library/react'
import Button from '../components/Button'

describe('Button', () => {
  it('defaults to the primary variant and type="button"', () => {
    render(<Button>Scan</Button>)

    const button = screen.getByRole('button', { name: 'Scan' })
    expect(button).toHaveClass('button-primary')
    expect(button).toHaveAttribute('type', 'button')
  })

  it('renders the secondary variant', () => {
    render(<Button variant="secondary">Add Item Manually</Button>)

    expect(screen.getByRole('button', { name: 'Add Item Manually' })).toHaveClass(
      'button-secondary',
    )
  })

  it('passes through disabled', () => {
    render(<Button disabled>Scan</Button>)

    expect(screen.getByRole('button', { name: 'Scan' })).toBeDisabled()
  })
})
