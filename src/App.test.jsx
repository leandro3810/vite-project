import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders header and navigation links', () => {
    render(<App />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Sobre' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Galeria' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Contato' })).toBeInTheDocument()
    expect(screen.getByText('Atualização da minha página')).toBeInTheDocument()
  })

  it('renders image gallery and footer', () => {
    render(<App />)
    expect(screen.getByAltText('Logotipo do Vite')).toBeInTheDocument()
    expect(screen.getByAltText('Logotipo do React')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('toggles the update details text when button is clicked', () => {
    render(<App />)
    const toggleButton = screen.getByRole('button', {
      name: 'Ver detalhes da atualização',
    })

    fireEvent.click(toggleButton)
    expect(
      screen.getByText(
        /Ajustamos textos, imagens, espaçamentos e responsividade/
      )
    ).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Ocultar detalhes' }))
    expect(
      screen.queryByText(
        /Ajustamos textos, imagens, espaçamentos e responsividade/
      )
    ).not.toBeInTheDocument()
  })

  it('submits the contact form and displays success feedback', () => {
    render(<App />)

    fireEvent.change(screen.getByLabelText('Nome'), {
      target: { value: 'Leandro' },
    })
    fireEvent.change(screen.getByLabelText('E-mail'), {
      target: { value: 'leandro@example.com' },
    })
    fireEvent.change(screen.getByLabelText('Mensagem'), {
      target: { value: 'Gostei da atualização da página.' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Enviar formulário' }))

    expect(
      screen.getByText('Mensagem enviada com sucesso, Leandro!')
    ).toBeInTheDocument()
  })
})
