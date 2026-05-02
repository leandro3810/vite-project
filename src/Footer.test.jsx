import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from './Footer'

describe('Footer', () => {
  it('renders the footer element', () => {
    render(<Footer />)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('renders the copyright text', () => {
    render(<Footer />)
    expect(
      screen.getByText('© 2025 Meu Projeto. Todos os direitos reservados.')
    ).toBeInTheDocument()
  })

  it('renders a paragraph with the copyright notice', () => {
    render(<Footer />)
    const paragraph = screen.getByText(
      '© 2025 Meu Projeto. Todos os direitos reservados.'
    )
    expect(paragraph.tagName).toBe('P')
  })

  it('contains the year 2025 in the copyright text', () => {
    render(<Footer />)
    expect(screen.getByText(/2025/)).toBeInTheDocument()
  })
})
