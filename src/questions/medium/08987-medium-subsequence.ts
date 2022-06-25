/*
  Given an array of unique elements, return all possible subsequences.

  type A = Subsequence<[1, 2]> // [] | [1] | [2] | [1, 2]
*/

type Subsequence<T> =
  T extends [infer First, ...infer Rest]
    ? [First, ...Subsequence<Rest>] | Subsequence<Rest>
    : T;

import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Subsequence<[1, 2]>, [] | [1] | [2] | [1, 2]>>,
  Expect<Equal<Subsequence<[1, 2, 3]>, [] | [1] | [2] | [1, 2] | [3] | [1, 3] | [2, 3] | [1, 2, 3] >>,
]