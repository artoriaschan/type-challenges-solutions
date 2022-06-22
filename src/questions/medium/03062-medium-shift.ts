/*
  Implement the type version of Array.shift

  type Result = Shift<[3, 2, 1]> // [2, 1]
*/

type Shift<T> = T extends [infer _, ...infer Rest] ? [...Rest] : never

import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Shift<[3, 2, 1]>, [2, 1]>>,
  Expect<Equal<Shift<['a', 'b', 'c', 'd']>, ['b', 'c', 'd']>>
]
