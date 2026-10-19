import type { ReactNode } from 'react'
import { CheckIcon, CircleAlertIcon } from './icons'
import '../styles/StatusView.css'

type StatusViewProps = {
  tone: 'success' | 'danger'
  title: string
  subtitle?: string
  caption?: string
  actions: ReactNode
}

const RAY_COLORS = ['amber', 'pink', 'green']

// Decorative rays around the success circle, evenly spaced every 45 degrees.
const rays = Array.from({ length: 8 }, (_, i) => {
  const angle = (i * Math.PI) / 4
  return {
    x1: 100 + 80 * Math.cos(angle),
    y1: 100 + 80 * Math.sin(angle),
    x2: 100 + 94 * Math.cos(angle),
    y2: 100 + 94 * Math.sin(angle),
    color: RAY_COLORS[i % RAY_COLORS.length],
  }
})

export default function StatusView({ tone, title, subtitle, caption, actions }: StatusViewProps) {
  return (
    <div className="status-view">
      <div className={`status-illustration status-illustration-${tone}`} aria-hidden="true">
        {tone === 'success' && (
          <svg className="status-rays" viewBox="0 0 200 200">
            {rays.map((ray, i) => (
              <line
                key={i}
                x1={ray.x1}
                y1={ray.y1}
                x2={ray.x2}
                y2={ray.y2}
                className={`status-ray-${ray.color}`}
              />
            ))}
          </svg>
        )}
        <div className="status-circle">
          {tone === 'success' ? <CheckIcon /> : <CircleAlertIcon />}
        </div>
      </div>

      <h1 className="status-title">{title}</h1>
      {subtitle && <p className="status-subtitle">{subtitle}</p>}
      {caption && <p className="status-caption">{caption}</p>}

      <div className="status-actions">{actions}</div>
    </div>
  )
}
