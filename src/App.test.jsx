import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

describe('src/App (Vite starter counter)', () => {
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

  it('renders the HMR hint text', () => {
    render(<App />)
    expect(screen.getByText(/Edit/)).toBeInTheDocument()
  })

  it('renders the read-the-docs link prompt', () => {
    render(<App />)
    expect(
      screen.getByText('Click on the Vite and React logos to learn more')
    ).toBeInTheDocument()
  })
})
