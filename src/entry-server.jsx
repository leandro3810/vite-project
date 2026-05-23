import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'

// `url` is passed for future routing support (e.g. React Router, data loaders).
export function render(_url) {
  const html = renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
  return { html, head: '' }
}
