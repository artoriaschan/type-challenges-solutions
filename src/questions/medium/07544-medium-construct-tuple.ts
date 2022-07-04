/*
  Construct a tuple with a given length.

  For example

  type result = ConstructTuple<2> // expect to be [unknown, unknown]
*/
type ConstructTuple<
  L extends number,
  R extends unknown[] = []
> = R['length'] extends L ? R : ConstructTuple<L, [...R, unknown]>

import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<ConstructTuple<0>, []>>,
  Expect<Equal<ConstructTuple<2>, [unknown, unknown]>>,
  Expect<Equal<ConstructTuple<999>['length'], 999>>,
  // @ts-expect-error
  Expect<Equal<ConstructTuple<1000>['length'], 1000>>
]
