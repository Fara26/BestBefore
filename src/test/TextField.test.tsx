import { render, screen } from '@testing-library/react'
import TextField from '../components/TextField'

describe('TextField', () => {
  it('links the label to the input', () => {
    render(<TextField label="Email" />)

    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  it('marks required fields', () => {
    render(<TextField label="Product name" required />)

    const input = screen.getByRole('textbox', { name: 'Product name' })
    expect(input).toBeRequired()
    expect(screen.getByText('*')).toHaveAttribute('aria-hidden', 'true')
  })

  it('shows a tag and a hint linked to the input', () => {
    render(<TextField label="Barcode" tag="Recommended" hint="Helps next time." />)

    expect(screen.getByText('Recommended')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveAccessibleDescription('Helps next time.')
  })

  it('shows an inline error and marks the input invalid', () => {
    render(<TextField label="Email" error="Email is required" />)

    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAccessibleDescription('Email is required')
  })

  it('renders a label action', () => {
    render(<TextField label="Password" labelAction={<a href="#">Forgot password?</a>} />)

    expect(screen.getByRole('link', { name: 'Forgot password?' })).toBeInTheDocument()
  })
})
