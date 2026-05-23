/**
 * loggerPlugin — registra no console cada hook executado.
 * Útil para depuração e auditoria de eventos da aplicação.
 */
export const loggerPlugin = {
  name: 'logger',
  version: '1.0.0',

  onRegister() {
    console.log('[Logger] Plugin registrado.')
  },

  onUnregister() {
    console.log('[Logger] Plugin removido.')
  },

  onEnable() {
    console.log('[Logger] Plugin habilitado.')
  },

  onDisable() {
    console.log('[Logger] Plugin desabilitado.')
  },

  beforeFormSubmit(payload) {
    console.log('[Logger] beforeFormSubmit →', payload)
  },

  afterFormSubmit(payload) {
    console.log('[Logger] afterFormSubmit →', payload)
  },
}
