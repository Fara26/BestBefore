import { Link } from 'react-router-dom'
import { ChevronLeftIcon } from './icons'
import '../styles/PageHeader.css'

type PageHeaderProps = {
  title: string
  backTo?: string
}

export default function PageHeader({ title, backTo }: PageHeaderProps) {
  return (
    <header className="page-header">
      {backTo && (
        <Link to={backTo} className="page-header-back" aria-label="Back">
          <ChevronLeftIcon />
        </Link>
      )}
      <h1 className="page-header-title">{title}</h1>
    </header>
  )
}
