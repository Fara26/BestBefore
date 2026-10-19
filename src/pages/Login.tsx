import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import { mockLogin } from '../lib/mockAuth'
import '../styles/Auth.css'

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').pipe(z.email('Enter a valid email')),
  password: z.string().min(1, 'Password is required'),
})

type LoginValues = z.infer<typeof loginSchema>

export default function Login() {
  const navigate = useNavigate()
  const [formError, setFormError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) })

  const onSubmit = async (values: LoginValues) => {
    setFormError(null)
    const result = await mockLogin(values.email)
    if (result.ok) {
      navigate('/')
    } else {
      setFormError(result.error)
    }
  }

  return (
    <main className="auth">
      <Logo />
      <h1 className="auth-title">BestBefore</h1>

      <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="auth-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            disabled={isSubmitting}
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
            {...register('email')}
          />
          {errors.email && (
            <p id="email-error" className="auth-error">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="auth-field">
          <div className="auth-label-row">
            <label htmlFor="password">Password</label>
            <a href="#" className="auth-link auth-link-small">
              Forgot password?
            </a>
          </div>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            disabled={isSubmitting}
            aria-invalid={errors.password ? 'true' : 'false'}
            aria-describedby={errors.password ? 'password-error' : undefined}
            {...register('password')}
          />
          {errors.password && (
            <p id="password-error" className="auth-error">
              {errors.password.message}
            </p>
          )}
        </div>

        {formError && (
          <p className="auth-error auth-form-error" role="alert">
            {formError}
          </p>
        )}

        <button type="submit" className="auth-submit" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in…' : 'Log in'}
        </button>
      </form>

      <div className="auth-divider">
        <span>or</span>
      </div>

      <p className="auth-footer">
        New to BestBefore?{' '}
        <Link to="/register" className="auth-link">
          Create an account
        </Link>
      </p>
    </main>
  )
}
