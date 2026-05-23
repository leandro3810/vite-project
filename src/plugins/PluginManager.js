/**
 * PluginManager — núcleo do Sistema de Plugins Flexível.
 *
 * Ciclo de vida de um plugin:
 *   register  → enable / disable  → unregister
 *
 * Hooks disponíveis (os plugins podem implementar qualquer subconjunto):
 *   onRegister(manager)          — chamado logo após o registro
 *   onUnregister(manager)        — chamado antes da remoção
 *   onEnable(manager)            — chamado ao habilitar
 *   onDisable(manager)           — chamado ao desabilitar
 *   + qualquer hook customizado executado via executeHook()
 */

export class PluginManager {
  constructor() {
    this._plugins = new Map()
  }

  /**
   * Registra um plugin.
   * @param {{ name: string, version?: string, enabled?: boolean, [hook: string]: any }} plugin
   */
  register(plugin) {
    if (!plugin || typeof plugin.name !== 'string' || !plugin.name) {
      throw new Error(
        'O plugin deve existir e ter uma propriedade "name" não vazia do tipo string.'
      )
    }
    if (this._plugins.has(plugin.name)) {
      throw new Error(`Plugin "${plugin.name}" já está registrado.`)
    }

    const entry = { ...plugin, enabled: plugin.enabled !== false }
    this._plugins.set(plugin.name, entry)

    if (typeof entry.onRegister === 'function') {
      entry.onRegister(this)
    }

    return this
  }

  /**
   * Remove um plugin pelo nome.
   * @param {string} name
   */
  unregister(name) {
    const plugin = this._plugins.get(name)
    if (!plugin) {
      throw new Error(`Plugin "${name}" não encontrado.`)
    }

    if (typeof plugin.onUnregister === 'function') {
      plugin.onUnregister(this)
    }

    this._plugins.delete(name)
    return this
  }

  /**
   * Habilita um plugin previamente desabilitado.
   * @param {string} name
   */
  enable(name) {
    const plugin = this._getOrThrow(name)
    if (!plugin.enabled) {
      plugin.enabled = true
      if (typeof plugin.onEnable === 'function') {
        plugin.onEnable(this)
      }
    }
    return this
  }

  /**
   * Desabilita um plugin sem removê-lo.
   * @param {string} name
   */
  disable(name) {
    const plugin = this._getOrThrow(name)
    if (plugin.enabled) {
      plugin.enabled = false
      if (typeof plugin.onDisable === 'function') {
        plugin.onDisable(this)
      }
    }
    return this
  }

  /**
   * Executa um hook em todos os plugins habilitados, em ordem de registro.
   * Cada handler recebe (payload, manager) e pode retornar um valor modificado
   * do payload (pipeline), ou undefined para mantê-lo inalterado.
   *
   * @param {string} hookName
   * @param {*} payload  — dado inicial passado pela aplicação
   * @returns {*}        — payload (possivelmente transformado pelos plugins)
   */
  executeHook(hookName, payload) {
    let current = payload
    for (const plugin of this._plugins.values()) {
      if (!plugin.enabled) continue
      if (typeof plugin[hookName] === 'function') {
        const result = plugin[hookName](current, this)
        if (result !== undefined) {
          current = result
        }
      }
    }
    return current
  }

  /**
   * Retorna um array com todos os plugins registrados (cópias rasas).
   * @returns {Array<object>}
   */
  getPlugins() {
    return Array.from(this._plugins.values()).map((p) => ({ ...p }))
  }

  /**
   * Verifica se um plugin está registrado.
   * @param {string} name
   * @returns {boolean}
   */
  has(name) {
    return this._plugins.has(name)
  }

  // ─── helpers privados ────────────────────────────────────────────────────────

  _getOrThrow(name) {
    const plugin = this._plugins.get(name)
    if (!plugin) {
      throw new Error(`Plugin "${name}" não encontrado.`)
    }
    return plugin
  }
}

export const pluginManager = new PluginManager()
