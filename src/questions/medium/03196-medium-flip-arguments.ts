/*
  Implement the type version of lodash's _.flip.

  Type FlipArguments<T> requires function type T and returns a new function type which has the same return type of T but reversed parameters.

  For example:

  type Flipped = FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void> 
  // (arg0: boolean, arg1: number, arg2: string) => void
*/

type FlipArguments<F extends Function> = F extends (..._: infer A) => infer R
  ? (..._: Reverse<A>) => R
  : F

type Reverse<T> = T extends [...infer Rest, infer End]
  ? [End, ...Reverse<Rest>]
  : T

import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FlipArguments<() => boolean>, () => boolean>>,
  Expect<
    Equal<FlipArguments<(foo: string) => number>, (foo: string) => number>
  >,
  Expect<
    Equal<
      FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void>,
      (arg0: boolean, arg1: number, arg2: string) => void
    >
  >
]
