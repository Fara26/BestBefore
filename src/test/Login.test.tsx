import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import { MOCK_INVALID_EMAIL } from '../lib/mockAuth'

function renderLogin() {
  render(
    <MemoryRouter initialEntries={['/login']}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<p>Home</p>} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('Login', () => {
  it('shows inline errors when submitted empty', async () => {
    renderLogin()

    await userEvent.click(screen.getByRole('button', { name: 'Log in' }))

    expect(await screen.findByText('Email is required')).toBeInTheDocument()
    expect(screen.getByText('Password is required')).toBeInTheDocument()
  })

  it('shows an inline error for an invalid email', async () => {
    renderLogin()

    await userEvent.type(screen.getByLabelText('Email'), 'not-an-email')
    await userEvent.type(screen.getByLabelText('Password'), 'password123')
    await userEvent.click(screen.getByRole('button', { name: 'Log in' }))

    expect(await screen.findByText('Enter a valid email')).toBeInTheDocument()
  })

  it('shows a pending state while submitting and then navigates home', async () => {
    renderLogin()

    await userEvent.type(screen.getByLabelText('Email'), 'you@example.com')
    await userEvent.type(screen.getByLabelText('Password'), 'password123')
    await userEvent.click(screen.getByRole('button', { name: 'Log in' }))

    expect(await screen.findByRole('button', { name: 'Logging in…' })).toBeDisabled()
    expect(await screen.findByText('Home')).toBeInTheDocument()
  })

  it('shows the mock error response', async () => {
    renderLogin()

    await userEvent.type(screen.getByLabelText('Email'), MOCK_INVALID_EMAIL)
    await userEvent.type(screen.getByLabelText('Password'), 'password123')
    await userEvent.click(screen.getByRole('button', { name: 'Log in' }))

    expect(await screen.findByRole('alert')).toHaveTextContent('Invalid email or password')
    expect(screen.getByRole('button', { name: 'Log in' })).toBeEnabled()
  })
})
