/*
  GreaterThan<2, 1> //should be true
  GreaterThan<1, 1> //should be false
  GreaterThan<10, 100> //should be false
  GreaterThan<111, 11> //should be true
*/
// 关键点在于如何实现比较
// 本质上还是将数字转换为数组类型
// 将数值大小的比较转换为数组长度的比较
type ArrayWithLength<
  T extends number,
  Count extends any[] = []
> = Count['length'] extends T ? Count : ArrayWithLength<T, [1, ...Count]>
type GreaterThan<
  N1 extends number,
  N2 extends number
> = ArrayWithLength<N2> extends [...ArrayWithLength<N1>, ...infer _]
  ? false
  : true

import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>
]
