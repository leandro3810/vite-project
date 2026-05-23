import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { usePlugins } from './plugins/PluginContext'

function App() {
  const plugins = usePlugins()
  const [showDetails, setShowDetails] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((previous) => ({ ...previous, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setErrorMessage('')

    try {
      plugins.executeHook('beforeFormSubmit', formData)
    } catch (err) {
      setErrorMessage(err.message)
      return
    }

    setStatusMessage(
      `Mensagem enviada com sucesso, ${formData.name || 'visitante'}!`
    )
    const sent = { ...formData }
    setFormData({
      name: '',
      email: '',
      message: '',
    })
    plugins.executeHook('afterFormSubmit', sent)
  }

  return (
    <div className="page">
      <header className="hero">
        <nav aria-label="Navegação principal">
          <a href="#sobre">Sobre</a>
          <a href="#galeria">Galeria</a>
          <a href="#contato">Contato</a>
        </nav>

        <h1>Atualização da minha página</h1>
        <p>
          Página renovada com novo conteúdo, visual moderno e funcionalidades de
          interação.
        </p>
        <button
          type="button"
          onClick={() => setShowDetails((previous) => !previous)}
        >
          {showDetails ? 'Ocultar detalhes' : 'Ver detalhes da atualização'}
        </button>
        {showDetails && (
          <p className="details">
            Ajustamos textos, imagens, espaçamentos e responsividade para
            melhorar a experiência.
          </p>
        )}
      </header>

      <main>
        <section id="sobre" className="section">
          <h2>Sobre a página</h2>
          <p>
            Esta seção destaca as principais informações para visitantes em
            qualquer dispositivo.
          </p>
        </section>

        <section id="galeria" className="section">
          <h2>Galeria</h2>
          <div className="gallery">
            <figure>
              <img src={viteLogo} alt="Logotipo do Vite" />
              <figcaption>Performance com Vite</figcaption>
            </figure>
            <figure>
              <img src={reactLogo} alt="Logotipo do React" />
              <figcaption>Interface dinâmica com React</figcaption>
            </figure>
          </div>
        </section>

        <section id="contato" className="section">
          <h2>Contato</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="message">Mensagem</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />

            <button type="submit">Enviar formulário</button>
          </form>
          {errorMessage && <p className="error">{errorMessage}</p>}
          {statusMessage && <p className="status">{statusMessage}</p>}
        </section>
      </main>

      <footer>
        <p>© 2026 Minha Página Atualizada.</p>
      </footer>
    </div>
  )
}

export default App
