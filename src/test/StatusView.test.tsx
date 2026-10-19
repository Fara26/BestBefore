import { render, screen } from '@testing-library/react'
import StatusView from '../components/StatusView'

describe('StatusView', () => {
  it('renders the title, subtitle, caption and actions', () => {
    render(
      <StatusView
        tone="success"
        title="Item Added!"
        subtitle="Organic Milk"
        caption="Expires Apr 25, 2025"
        actions={<button type="button">Done</button>}
      />,
    )

    expect(screen.getByRole('heading', { name: 'Item Added!' })).toBeInTheDocument()
    expect(screen.getByText('Organic Milk')).toBeInTheDocument()
    expect(screen.getByText('Expires Apr 25, 2025')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Done' })).toBeInTheDocument()
  })

  it('omits subtitle and caption when not given', () => {
    const { container } = render(
      <StatusView tone="danger" title="Couldn't read the barcode" actions={null} />,
    )

    expect(screen.getByRole('heading', { name: "Couldn't read the barcode" })).toBeInTheDocument()
    expect(container.querySelector('.status-subtitle')).not.toBeInTheDocument()
    expect(container.querySelector('.status-caption')).not.toBeInTheDocument()
  })
})
