/*
  type exp = Zip<[1, 2], [true, false]> // expected to be [[1, true], [2, false]]
*/

type Zip<A1 extends any[], A2 extends any[]> = A1 extends [infer H, ...infer R]
  ? A2 extends [infer H1, ...infer R1]
    ? [[H, H1], ...Zip<R, R1>]
    : []
  : []

import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Zip<[], []>, []>>,
  Expect<Equal<Zip<[1, 2], [true, false]>, [[1, true], [2, false]]>>,
  Expect<Equal<Zip<[1, 2, 3], ['1', '2']>, [[1, '1'], [2, '2']]>>,
  Expect<Equal<Zip<[], [1, 2, 3]>, []>>,
  Expect<Equal<Zip<[[1, 2]], [3]>, [[[1, 2], 3]]>>
]
