import { describe, it, expect, vi, beforeEach } from 'vitest'
import { PluginManager } from './PluginManager'

function makePlugin(overrides = {}) {
  return { name: 'test-plugin', version: '1.0.0', ...overrides }
}

describe('PluginManager', () => {
  let manager

  beforeEach(() => {
    manager = new PluginManager()
  })

  // ─── register ───────────────────────────────────────────────────────────────

  describe('register', () => {
    it('registra um plugin válido', () => {
      manager.register(makePlugin())
      expect(manager.has('test-plugin')).toBe(true)
    })

    it('chama onRegister ao registrar', () => {
      const onRegister = vi.fn()
      manager.register(makePlugin({ onRegister }))
      expect(onRegister).toHaveBeenCalledWith(manager)
    })

    it('lança erro ao registrar plugin sem nome', () => {
      expect(() => manager.register({})).toThrow(
        'O plugin deve ter uma propriedade "name"'
      )
    })

    it('lança erro ao registrar plugin duplicado', () => {
      manager.register(makePlugin())
      expect(() => manager.register(makePlugin())).toThrow(
        'Plugin "test-plugin" já está registrado.'
      )
    })

    it('habilita o plugin por padrão', () => {
      manager.register(makePlugin())
      const [p] = manager.getPlugins()
      expect(p.enabled).toBe(true)
    })

    it('respeita enabled: false na criação', () => {
      manager.register(makePlugin({ enabled: false }))
      const [p] = manager.getPlugins()
      expect(p.enabled).toBe(false)
    })

    it('retorna o próprio manager (encadeamento)', () => {
      expect(manager.register(makePlugin())).toBe(manager)
    })
  })

  // ─── unregister ─────────────────────────────────────────────────────────────

  describe('unregister', () => {
    it('remove o plugin registrado', () => {
      manager.register(makePlugin())
      manager.unregister('test-plugin')
      expect(manager.has('test-plugin')).toBe(false)
    })

    it('chama onUnregister ao remover', () => {
      const onUnregister = vi.fn()
      manager.register(makePlugin({ onUnregister }))
      manager.unregister('test-plugin')
      expect(onUnregister).toHaveBeenCalledWith(manager)
    })

    it('lança erro ao remover plugin inexistente', () => {
      expect(() => manager.unregister('nao-existe')).toThrow(
        'Plugin "nao-existe" não encontrado.'
      )
    })
  })

  // ─── enable / disable ───────────────────────────────────────────────────────

  describe('enable / disable', () => {
    it('desabilita e habilita um plugin', () => {
      manager.register(makePlugin())
      manager.disable('test-plugin')
      expect(manager.getPlugins()[0].enabled).toBe(false)
      manager.enable('test-plugin')
      expect(manager.getPlugins()[0].enabled).toBe(true)
    })

    it('chama onEnable ao habilitar', () => {
      const onEnable = vi.fn()
      manager.register(makePlugin({ enabled: false, onEnable }))
      manager.enable('test-plugin')
      expect(onEnable).toHaveBeenCalledWith(manager)
    })

    it('chama onDisable ao desabilitar', () => {
      const onDisable = vi.fn()
      manager.register(makePlugin({ onDisable }))
      manager.disable('test-plugin')
      expect(onDisable).toHaveBeenCalledWith(manager)
    })

    it('não chama onEnable se já estiver habilitado', () => {
      const onEnable = vi.fn()
      manager.register(makePlugin({ onEnable }))
      manager.enable('test-plugin') // já habilitado
      expect(onEnable).not.toHaveBeenCalled()
    })

    it('lança erro ao habilitar plugin inexistente', () => {
      expect(() => manager.enable('nao-existe')).toThrow(
        'Plugin "nao-existe" não encontrado.'
      )
    })
  })

  // ─── executeHook ────────────────────────────────────────────────────────────

  describe('executeHook', () => {
    it('executa o hook nos plugins habilitados', () => {
      const hook = vi.fn()
      manager.register(makePlugin({ myHook: hook }))
      manager.executeHook('myHook', { data: 1 })
      expect(hook).toHaveBeenCalledWith({ data: 1 }, manager)
    })

    it('ignora plugins desabilitados', () => {
      const hook = vi.fn()
      manager.register(makePlugin({ enabled: false, myHook: hook }))
      manager.executeHook('myHook', {})
      expect(hook).not.toHaveBeenCalled()
    })

    it('encadeia transformações do payload entre plugins', () => {
      manager.register({
        name: 'double',
        transform: (n) => n * 2,
      })
      manager.register({
        name: 'plus10',
        transform: (n) => n + 10,
      })
      const result = manager.executeHook('transform', 5)
      expect(result).toBe(20) // 5*2 = 10, 10+10 = 20
    })

    it('mantém o payload se o handler retorna undefined', () => {
      manager.register(makePlugin({ noop: () => undefined }))
      const result = manager.executeHook('noop', 42)
      expect(result).toBe(42)
    })

    it('retorna o payload original quando nenhum plugin implementa o hook', () => {
      manager.register(makePlugin())
      const result = manager.executeHook('naoExiste', 'original')
      expect(result).toBe('original')
    })
  })

  // ─── getPlugins ─────────────────────────────────────────────────────────────

  describe('getPlugins', () => {
    it('retorna lista vazia se nenhum plugin registrado', () => {
      expect(manager.getPlugins()).toEqual([])
    })

    it('retorna cópias rasas dos plugins', () => {
      manager.register(makePlugin())
      const list = manager.getPlugins()
      list[0].name = 'mutado'
      expect(manager.getPlugins()[0].name).toBe('test-plugin')
    })
  })
})
