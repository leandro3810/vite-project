/**
 * analyticsPlugin — simula o envio de eventos de analytics.
 * Em produção, substitua os console.info por chamadas reais
 * (ex.: window.gtag, Segment, Mixpanel etc.).
 */
export const analyticsPlugin = {
  name: 'analytics',
  version: '1.0.0',

  onRegister() {
    console.info('[Analytics] Plugin de analytics inicializado.')
  },

  beforeFormSubmit(payload) {
    console.info('[Analytics] Evento "form_submit_start" →', {
      name: payload?.name,
      email: payload?.email,
    })
  },

  afterFormSubmit(payload) {
    console.info('[Analytics] Evento "form_submit_success" →', {
      name: payload?.name,
    })
  },
}
