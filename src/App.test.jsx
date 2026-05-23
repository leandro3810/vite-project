import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'
import { PluginProvider } from './plugins/PluginContext'
import { validationPlugin } from './plugins/examples/validationPlugin'

function renderApp(plugins = []) {
  return render(
    <PluginProvider plugins={plugins}>
      <App />
    </PluginProvider>
  )
}

describe('App', () => {
  it('renders header and navigation links', () => {
    renderApp()
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Sobre' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Galeria' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Contato' })).toBeInTheDocument()
    expect(screen.getByText('Atualização da minha página')).toBeInTheDocument()
  })

  it('renders image gallery and footer', () => {
    renderApp()
    expect(screen.getByAltText('Logotipo do Vite')).toBeInTheDocument()
    expect(screen.getByAltText('Logotipo do React')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('toggles the update details text when button is clicked', () => {
    renderApp()
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
    renderApp()

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

  it('displays validation error when a plugin rejects the form submission', () => {
    renderApp([validationPlugin])

    // single character — passes HTML5 `required` but fails the plugin's min-length check
    fireEvent.change(screen.getByLabelText('Nome'), {
      target: { value: 'A' },
    })
    fireEvent.change(screen.getByLabelText('E-mail'), {
      target: { value: 'leandro@example.com' },
    })
    fireEvent.change(screen.getByLabelText('Mensagem'), {
      target: { value: 'Mensagem de teste.' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Enviar formulário' }))

    expect(
      screen.getByText(/O nome deve ter pelo menos 2 caracteres/)
    ).toBeInTheDocument()
    expect(
      screen.queryByText(/Mensagem enviada com sucesso/)
    ).not.toBeInTheDocument()
  })
})
