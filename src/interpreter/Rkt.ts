import { Environment } from './Environment'

import type { Expression, KeywordExpression, OperatorExpression } from 'src/types/expressions.types'
import type { KeywordToken, OperatorToken } from 'src/types/tokens.types'

/**
 * Rkt interpreter
 */
class Rkt {
  /**
   * Creates an Rkt instance with the global environment
   */
  constructor(public global = new Environment()) {}

  /**
   * Evaluates an expression in the given environment
   */
  eval(exp: Expression, env = this.global): any {
    // ---------------------------------
    // Self-evaluating expressions:
    // ---------------------------------
    if (isNumber(exp)) {
      return exp
    }

    if (isString(exp)) {
      return exp.slice(1, -1)
    }

    // ---------------------------------
    // Operator Expressions:
    // ---------------------------------
    if (isOperatorExpression(exp)) {
      const [operator, left, right] = exp

      const leftEval = this.eval(left)
      const rightEval = this.eval(right)

      if (typeof leftEval === 'number' && typeof rightEval === 'number') {
        return this.handleMathOperation(operator, leftEval, rightEval)
      }

      if (typeof leftEval === 'string' && typeof rightEval === 'string') {
        return leftEval + rightEval
      }

      throw new Error(
        `Type mismatch: cannot apply operator ${operator} to ${typeof leftEval} and ${typeof rightEval}`,
      )
    }

    // ---------------------------------
    // Keyword Expressions:
    // ---------------------------------
    if (isKeywordExpression(exp)) {
      // Variable declarations
      if (exp[0] === 'let' && isVariableName(exp[1])) {
        const [_, name, value] = exp
        return env.define(name, this.eval(value))
      }
      // Variable access
      if (isVariableName(exp)) {
        return env.lookup(exp)
      }
    }

    throw new Error('Unimplemented')
  }

  private handleMathOperation(operator: OperatorToken, left: number, right: number) {
    switch (operator) {
      case '+':
        return left + right
      case '*':
        return left * right
      case '-':
        return left - right
      case '/':
        return left / right
      default:
        throw new Error(`Unknown operator: ${operator}`)
    }
  }
}

function isNumber(exp: Expression): exp is number {
  return typeof exp === 'number'
}

function isString(exp: Expression): exp is string {
  return typeof exp === 'string' && exp.startsWith('"') && exp.endsWith('"')
}

function isVariableName(exp: Expression): exp is string {
  return typeof exp === 'string' && /^[a-zA-Z][a-zA-Z0-9_]*$/.test(exp)
}

function isOperatorToken(token: string): token is OperatorToken {
  return ['+', '-', '*', '/'].includes(token)
}

function isKeywordToken(token: string): token is KeywordToken {
  return ['let', 'set', 'begin'].includes(token)
}

function isOperatorExpression(exp: Expression): exp is OperatorExpression {
  return Array.isArray(exp) && exp.length === 3 && isOperatorToken(exp[0])
}

function isKeywordExpression(exp: Expression): exp is KeywordExpression {
  return Array.isArray(exp) && exp.length >= 2 && isKeywordToken(exp[0])
}

export { isNumber, isString, isVariableName, isKeywordExpression, isOperatorExpression, Rkt }
