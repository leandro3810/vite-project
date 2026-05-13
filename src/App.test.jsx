import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders the header', () => {
    render(<App />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('renders the footer', () => {
    render(<App />)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('renders the Vite + React heading', () => {
    render(<App />)
    expect(screen.getByText('Vite + React')).toBeInTheDocument()
  })

  it('renders a button with the initial count of 0', () => {
    render(<App />)
    expect(screen.getByRole('button')).toHaveTextContent('count is 0')
  })

  it('increments the count on button click', () => {
    render(<App />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(button).toHaveTextContent('count is 1')
  })

  it('increments the count multiple times', () => {
    render(<App />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    fireEvent.click(button)
    fireEvent.click(button)
    expect(button).toHaveTextContent('count is 3')
  })

  it('shows the soma result', () => {
    render(<App />)
    expect(screen.getByText(/Soma de 10 \+ 5: 15/)).toBeInTheDocument()
  })

  it('shows the multiplicacao result', () => {
    render(<App />)
    expect(screen.getByText(/Multiplicação de 10 × 5: 50/)).toBeInTheDocument()
  })

  it('shows the formatted currency', () => {
    render(<App />)
    expect(screen.getByText(/Moeda Formatada: R\$ 1234,56/)).toBeInTheDocument()
  })
})
