import { rkt } from './testUtils'

import { Expression } from 'src/types/expressions.types'

describe('Rkt interpreter', () => {
  test('evaluates a number literal', () => {
    const exp: Expression = 42
    expect(rkt.eval(exp)).toBe(42)
  })

  test('evaluates a string literal', () => {
    const exp: Expression = '"hello"'
    expect(rkt.eval(exp)).toBe('hello')
  })

  test('concatentates two string literals', () => {
    const exp: Expression = ['+', '"hello"', '" world"']
    expect(rkt.eval(exp)).toBe('hello world')
  })

  test('concatenates nested string literals', () => {
    const exp: Expression = ['+', ['+', '"hello"', '" "'], '"world"']
    expect(rkt.eval(exp)).toBe('hello world')
  })

  test('concatenates strings with special characters', () => {
    const exp: Expression = ['+', '"hello"', '"\nworld"']
    expect(rkt.eval(exp)).toBe('hello\nworld')
  })

  test('handles empty strings', () => {
    const exp: Expression = ['+', '""', '""']
    expect(rkt.eval(exp)).toBe('')
  })

  test('performs sum of two numbers', () => {
    const exp: Expression = ['+', 5, 5]
    expect(rkt.eval(exp)).toBe(10)
  })

  test('preforms multiplication of two numbers', () => {
    const exp: Expression = ['*', 5, 5]
    expect(rkt.eval(exp)).toBe(25)
  })

  test('preforms subtraction of two numbers', () => {
    const exp: Expression = ['-', 20, 5]
    expect(rkt.eval(exp)).toBe(15)
  })

  test('preforms division of two numbers', () => {
    const exp: Expression = ['/', 25, 5]
    expect(rkt.eval(exp)).toBe(5)
  })

  test('preforms nested mathmatic operation', () => {
    const exp: Expression = ['+', ['+', 5, 5], 5]
    expect(rkt.eval(exp)).toBe(15)
  })

  test('throws an error for unsupported operator', () => {
    const exp: Expression = ['~' as '+', 5, 5]
    expect(() => rkt.eval(exp)).toThrow('Unimplemented')
  })

  test('throws an error for type mismatch', () => {
    const exp: Expression = ['+', 5, '"hello"']
    expect(() => rkt.eval(exp)).toThrow(
      'Type mismatch: cannot apply operator + to number and string',
    )
  })

  test('throws an error for unimplemented expression', () => {
    const exp: Expression = {} as Expression
    expect(() => rkt.eval(exp)).toThrow('Unimplemented')
  })
})
