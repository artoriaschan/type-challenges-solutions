/*
  type I = Union2Intersection<'foo' | 42 | true> // expected to be 'foo' & 42 & true
*/
// 联合类型转交叉类型 - 函数参数逆变
//
// 因为函数的参数在逆变位置上
// 而根据ts规范，在逆变位置上，同一个类型的多个候选会被推断成交叉类型
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never

import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<UnionToIntersection<'foo' | 42 | true>, 'foo' & 42 & true>>,
  Expect<
    Equal<
      UnionToIntersection<(() => 'foo') | ((i: 42) => true)>,
      (() => 'foo') & ((i: 42) => true)
    >
  >
]
