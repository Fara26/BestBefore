import type { ButtonHTMLAttributes, ReactNode } from 'react'
import '../styles/Button.css'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
  icon?: ReactNode
}

export default function Button({
  variant = 'primary',
  icon,
  className,
  type = 'button',
  children,
  ...rest
}: ButtonProps) {
  const classes = ['button', `button-${variant}`, className].filter(Boolean).join(' ')

  return (
    <button type={type} className={classes} {...rest}>
      {icon && <span className="button-icon">{icon}</span>}
      {children}
    </button>
  )
}
