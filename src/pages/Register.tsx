import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import { mockRegister } from '../lib/mockAuth'
import '../styles/Auth.css'

const registerSchema = z
  .object({
    email: z.string().min(1, 'Email is required').pipe(z.email('Enter a valid email')),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type RegisterValues = z.infer<typeof registerSchema>

export default function Register() {
  const navigate = useNavigate()
  const [formError, setFormError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({ resolver: zodResolver(registerSchema) })

  const onSubmit = async (values: RegisterValues) => {
    setFormError(null)
    const result = await mockRegister(values.email)
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
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="At least 8 characters"
            autoComplete="new-password"
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

        <div className="auth-field">
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Re-enter your password"
            autoComplete="new-password"
            disabled={isSubmitting}
            aria-invalid={errors.confirmPassword ? 'true' : 'false'}
            aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p id="confirmPassword-error" className="auth-error">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {formError && (
          <p className="auth-error auth-form-error" role="alert">
            {formError}
          </p>
        )}

        <button type="submit" className="auth-submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <div className="auth-divider">
        <span>or</span>
      </div>

      <p className="auth-footer">
        Already have an account?{' '}
        <Link to="/login" className="auth-link">
          Log in
        </Link>
      </p>
    </main>
  )
}
