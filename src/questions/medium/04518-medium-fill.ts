/*
  type exp = Fill<[1, 2, 3], 0> // expected to be [0, 0, 0]
*/

type Fill<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T['length'],
  Count extends 1[] = []
> = Count['length'] extends (End extends keyof T ? End : T['length']) // 判断是否修改到结束位置
  ? T // 修改结束直接返回 T
  : T extends [infer First, ...infer Rest]
  ? Count['length'] extends (Start extends keyof T ? Start : 0) // 判断是否从开始位置修改
    ? [
        N,
        ...Fill<Rest, N, [...Count, 1]['length'] & number, End, [...Count, 1]>
    ] // 开始指针向右移位，计数累加
    : [
        First,
        ...Fill<Rest, N, Start, End, [...Count, 1]>
    ] // 不符合条件则直接跳过
  : T // 不符合条件直接返回

import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Fill<[], 0>, []>>,
  Expect<Equal<Fill<[], 0, 0, 3>, []>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 0, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 2, 2>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0>, [0, 0, 0]>>,
  Expect<Equal<Fill<[1, 2, 3], true>, [true, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 1>, [true, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 1, 3>, [1, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 10, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 10>, [true, true, true]>>
]
