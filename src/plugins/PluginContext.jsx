import { createContext, useContext, useRef } from 'react'
import { PluginManager } from './PluginManager'

const PluginContext = createContext(null)

/**
 * Provedor que cria (e mantém) uma instância de PluginManager
 * para toda a árvore de componentes filhos.
 *
 * @param {{ plugins?: object[], children: React.ReactNode }} props
 *   plugins — lista opcional de plugins a registrar na criação
 */
export function PluginProvider({ plugins = [], children }) {
  const managerRef = useRef(null)

  if (managerRef.current === null) {
    const manager = new PluginManager()
    plugins.forEach((p) => manager.register(p))
    managerRef.current = manager
  }

  return (
    <PluginContext.Provider value={managerRef.current}>
      {children}
    </PluginContext.Provider>
  )
}

/**
 * Hook para acessar o PluginManager dentro de qualquer componente filho
 * do PluginProvider.
 *
 * Exemplo:
 *   const { executeHook, register, disable } = usePlugins()
 *   const result = executeHook('beforeFormSubmit', formData)
 *
 * @returns {PluginManager}
 */
export function usePlugins() {
  const manager = useContext(PluginContext)
  if (!manager) {
    throw new Error('usePlugins deve ser usado dentro de um <PluginProvider>.')
  }
  return manager
}
