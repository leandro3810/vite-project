import { describe, it, expect } from 'vitest'
import { formatarMoeda } from './Formatação'

describe('formatarMoeda', () => {
  it('formats a typical value with two decimal places', () => {
    expect(formatarMoeda(1234.56)).toBe('R$ 1234,56')
  })

  it('formats a whole number by adding two decimal places', () => {
    expect(formatarMoeda(100)).toBe('R$ 100,00')
  })

  it('formats zero', () => {
    expect(formatarMoeda(0)).toBe('R$ 0,00')
  })

  it('formats a value with one decimal place', () => {
    expect(formatarMoeda(9.9)).toBe('R$ 9,90')
  })

  it('formats a negative value', () => {
    expect(formatarMoeda(-50.5)).toBe('R$ -50,50')
  })

  it('rounds to two decimal places', () => {
    expect(formatarMoeda(1.999)).toBe('R$ 2,00')
  })

  it('formats large numbers', () => {
    expect(formatarMoeda(1000000)).toBe('R$ 1000000,00')
  })
})
