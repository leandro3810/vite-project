/**
 * validationPlugin — valida o payload antes do envio do formulário.
 *
 * Hook beforeFormSubmit:
 *   - Retorna o payload inalterado se válido.
 *   - Lança um Error com mensagem descritiva se inválido,
 *     interrompendo o pipeline e notificando o componente.
 */
export const validationPlugin = {
  name: 'validation',
  version: '1.0.0',

  beforeFormSubmit(payload) {
    const errors = []

    if (!payload?.name || payload.name.trim().length < 2) {
      errors.push('O nome deve ter pelo menos 2 caracteres.')
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!payload?.email || !emailRegex.test(payload.email)) {
      errors.push('Informe um endereço de e-mail válido.')
    }

    if (!payload?.message || payload.message.trim().length < 5) {
      errors.push('A mensagem deve ter pelo menos 5 caracteres.')
    }

    if (errors.length > 0) {
      throw new Error(errors.join(' '))
    }

    return payload
  },
}
