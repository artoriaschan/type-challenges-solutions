/*
  Implement the type version of `Lodash.uniq`, Unique takes an Array T, returns the Array T without repeated values.

  type Res = Unique<[1, 1, 2, 2, 3, 3]>; // expected to be [1, 2, 3]
  type Res1 = Unique<[1, 2, 3, 4, 4, 5, 6, 7]>; // expected to be [1, 2, 3, 4, 5, 6, 7]
  type Res2 = Unique<[1, "a", 2, "b", 2, "a"]>; // expected to be [1, "a", 2, "b"]
  type Res3 = Unique<[string, number, 1, "a", 1, string, 2, "b", 2, number]>; // expected to be [string, number, 1, "a", 2, "b"]
  type Res4 = Unique<[unknown, unknown, any, any, never, never]>; // expected to be [unknown, any, never]
*/

type IndexOf<T, U, Count extends 1[] = []> = T extends [
  infer First,
  ...infer Rest
]
  ? Equal<First, U> extends true
    ? Count['length']
    : IndexOf<Rest, U, [...Count, 1]>
  : -1

type Unique<T, Result extends any[] = []> = T extends [
  infer First,
  ...infer Rest
]
  ? IndexOf<Result, First> extends -1 // 通过 IndexOf 判断当前元素是否在结果数组中
    ? Unique<Rest, [...Result, First]>
    : Unique<Rest, Result>
  : Result

import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Unique<[1, 1, 2, 2, 3, 3]>, [1, 2, 3]>>,
  Expect<Equal<Unique<[1, 2, 3, 4, 4, 5, 6, 7]>, [1, 2, 3, 4, 5, 6, 7]>>,
  Expect<Equal<Unique<[1, 'a', 2, 'b', 2, 'a']>, [1, 'a', 2, 'b']>>,
  Expect<
    Equal<
      Unique<[string, number, 1, 'a', 1, string, 2, 'b', 2, number]>,
      [string, number, 1, 'a', 2, 'b']
    >
  >,
  Expect<
    Equal<
      Unique<[unknown, unknown, any, any, never, never]>,
      [unknown, any, never]
    >
  >
]
