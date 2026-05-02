import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from './App.tsx'

describe('App (App.tsx – counter)', () => {
  it('renders the welcome heading', () => {
    render(<App />)
    expect(screen.getByText('Bem-vindo ao Vite Project!')).toBeInTheDocument()
  })

  it('renders the description text', () => {
    render(<App />)
    expect(
      screen.getByText('Este é o seu novo aplicativo React com Vite.')
    ).toBeInTheDocument()
  })

  it('shows initial click count as zero', () => {
    render(<App />)
    expect(screen.getByRole('button')).toHaveTextContent('Você clicou 0 vezes')
  })

  it('increments the counter on each button click', () => {
    render(<App />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(button).toHaveTextContent('Você clicou 1 vezes')
    fireEvent.click(button)
    expect(button).toHaveTextContent('Você clicou 2 vezes')
  })

  it('renders a clickable button element', () => {
    render(<App />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
