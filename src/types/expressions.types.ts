import type { KeywordToken, OperatorToken } from './tokens.types'

export type Expression = number | string | OperatorExpression | KeywordExpression

export type OperatorExpression = [OperatorToken, Expression, Expression]

export type KeywordExpression = [KeywordToken, ...Expression[]]
