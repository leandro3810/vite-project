import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PluginProvider } from './plugins/PluginContext.jsx'
import { loggerPlugin } from './plugins/examples/loggerPlugin.js'
import { analyticsPlugin } from './plugins/examples/analyticsPlugin.js'
import { validationPlugin } from './plugins/examples/validationPlugin.js'

const appPlugins = [validationPlugin, loggerPlugin, analyticsPlugin]

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PluginProvider plugins={appPlugins}>
      <App />
    </PluginProvider>
  </StrictMode>,
)
