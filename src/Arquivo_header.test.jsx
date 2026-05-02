import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Header from './Arquivo_header'

describe('Header', () => {
  it('renders the header element', () => {
    render(<Header />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('renders the welcome heading text', () => {
    render(<Header />)
    expect(
      screen.getByText('Bem-vindo ao meu projeto!')
    ).toBeInTheDocument()
  })

  it('renders an h1 heading', () => {
    render(<Header />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('displays the correct heading content', () => {
    render(<Header />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Bem-vindo ao meu projeto!'
    )
  })
})
