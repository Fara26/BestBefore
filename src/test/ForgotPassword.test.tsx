import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import ForgotPassword from '../pages/ForgotPassword'

function renderForgotPassword() {
  render(
    <MemoryRouter>
      <ForgotPassword />
    </MemoryRouter>,
  )
}

describe('ForgotPassword', () => {
  it('shows an inline error when submitted empty', async () => {
    renderForgotPassword()

    await userEvent.click(screen.getByRole('button', { name: 'Send reset link' }))

    expect(await screen.findByText('Email is required')).toBeInTheDocument()
  })

  it('shows an inline error for an invalid email', async () => {
    renderForgotPassword()

    await userEvent.type(screen.getByLabelText('Email'), 'not-an-email')
    await userEvent.click(screen.getByRole('button', { name: 'Send reset link' }))

    expect(await screen.findByText('Enter a valid email')).toBeInTheDocument()
  })

  it('shows a pending state while submitting and then a confirmation', async () => {
    renderForgotPassword()

    await userEvent.type(screen.getByLabelText('Email'), 'you@example.com')
    await userEvent.click(screen.getByRole('button', { name: 'Send reset link' }))

    expect(await screen.findByRole('button', { name: 'Sending…' })).toBeDisabled()
    expect(await screen.findByRole('status')).toHaveTextContent(
      "If an account exists for you@example.com, you'll receive a reset link shortly.",
    )
    expect(screen.getByRole('link', { name: 'Back to log in' })).toBeInTheDocument()
  })
})
