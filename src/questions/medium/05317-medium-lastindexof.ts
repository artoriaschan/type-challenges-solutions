/*
  Implement the type version of `Array.lastIndexOf`, LastIndexOf<T, U> takes an Array T, any U and returns the index of the last U in Array T

  type Res1 = LastIndexOf<[1, 2, 3, 2, 1], 2> // 3
  type Res2 = LastIndexOf<[0, 0, 0], 2> // -1
*/

type LastIndexOf<
  T,
  U,
  Count extends 1[] = [],
  Index extends number = -1 // 保存最后一次符合元素的下标
> = T extends [infer First, ...infer Rest]
  ? LastIndexOf<
      Rest,
      U,
      [...Count, 1],
      Equal<First, U> extends true ? Count['length'] : Index
    >
  : Index

import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<LastIndexOf<[1, 2, 3, 2, 1], 2>, 3>>,
  Expect<Equal<LastIndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 7>>,
  Expect<Equal<LastIndexOf<[0, 0, 0], 2>, -1>>,
  Expect<Equal<LastIndexOf<[string, 2, number, 'a', number, 1], number>, 4>>,
  Expect<Equal<LastIndexOf<[string, any, 1, number, 'a', any, 1], any>, 5>>
]
