import { describe, it, expect } from 'vitest'
import { soma, multiplicacao } from './Calculos'

describe('soma', () => {
  it('adds two positive numbers', () => {
    expect(soma(2, 3)).toBe(5)
  })

  it('adds a positive and a negative number', () => {
    expect(soma(10, -4)).toBe(6)
  })

  it('adds two negative numbers', () => {
    expect(soma(-5, -3)).toBe(-8)
  })

  it('adds zero to a number', () => {
    expect(soma(7, 0)).toBe(7)
  })

  it('adds two zeros', () => {
    expect(soma(0, 0)).toBe(0)
  })

  it('adds decimal numbers', () => {
    expect(soma(1.5, 2.5)).toBeCloseTo(4)
  })
})

describe('multiplicacao', () => {
  it('multiplies two positive numbers', () => {
    expect(multiplicacao(3, 4)).toBe(12)
  })

  it('multiplies a number by zero', () => {
    expect(multiplicacao(5, 0)).toBe(0)
  })

  it('multiplies two negative numbers (result is positive)', () => {
    expect(multiplicacao(-2, -3)).toBe(6)
  })

  it('multiplies a positive and a negative number', () => {
    expect(multiplicacao(4, -2)).toBe(-8)
  })

  it('multiplies by one (identity)', () => {
    expect(multiplicacao(9, 1)).toBe(9)
  })

  it('multiplies decimal numbers', () => {
    expect(multiplicacao(0.5, 4)).toBeCloseTo(2)
  })
})
