import { Rkt } from 'src/interpreter/Rkt'
import { Environment } from 'src/interpreter/Environment'

export const rkt = new Rkt(
  new Environment({
    null: null,
    true: true,
    false: false,
  }),
)
