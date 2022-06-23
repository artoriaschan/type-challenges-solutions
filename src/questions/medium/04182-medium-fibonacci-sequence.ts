/*
  Implement a generic Fibonacci<T> takes an number T and returns it's corresponding Fibonacci number.
*/

// 计数操作通过数据类型来进行
type Fibonacci<
  T extends number,
  N1 extends 1[] = [], // 上一个数
  N2 extends 1[] = [1], // 当前数
  Count extends 1[] = [1] // 计数
> = T extends 0
  ? 0
  : Count['length'] extends T
  ? N2['length']
  : Fibonacci<T, N2, [...N1, ...N2], [...Count, 1]>

import type { Equal, Expect } from '@type-challenges/utils'

type cases = [Expect<Equal<Fibonacci<3>, 2>>, Expect<Equal<Fibonacci<8>, 21>>]
