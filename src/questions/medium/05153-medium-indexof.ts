/*
  Implement the type version of `Array.indexOf`, indexOf<T, U> takes an Array T, any U and returns the index of the first U in Array T.

  type Res = IndexOf<[1, 2, 3], 2>; // expected to be 1
  type Res1 = IndexOf<[2,6, 3,8,4,1,7, 3,9], 3>; // expected to be 2
  type Res2 = IndexOf<[0, 0, 0], 2>; // expected to be -1
*/

type IndexOf<T, U, Count extends 1[] = []> =
  T extends [infer First, ...infer Rest]
    ? Equal<First,U> extends true // 不能直接用 extends 判断相等, any / unknown顶层类型
    // ? U extends First
      ? Count['length']
      : IndexOf<Rest, U, [...Count, 1]>
    : -1

import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IndexOf<[1, 2, 3], 2>, 1>>,
  Expect<Equal<IndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 2>>,
  Expect<Equal<IndexOf<[0, 0, 0], 2>, -1>>,
  Expect<Equal<IndexOf<[string, 1, number, 'a'], number>, 2>>,
  Expect<Equal<IndexOf<[string, 1, number, 'a', any], any>, 4>>,
  Expect<Equal<IndexOf<[string, 1, number, 'a', any], unknown>, -1>>,
]