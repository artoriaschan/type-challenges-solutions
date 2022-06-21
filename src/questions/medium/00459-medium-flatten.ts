/*
  type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, 5]
*/
// 使用 infer 获取数组内元素，同时...限制获取单个元素
type Flatten<T extends unknown[]> = 
  T extends [infer First, ...infer Rest] 
    ? First extends unknown[] 
      ? Flatten<[...First, ...Rest]> 
      : [First, ...Flatten<Rest>]
    : T

import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Flatten<[]>, []>>,
  Expect<Equal<Flatten<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<Flatten<[1, [2]]>, [1, 2]>>,
  Expect<Equal<Flatten<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, 5]>>,
  Expect<Equal<Flatten<[{ foo: 'bar'; 2: 10 }, 'foobar']>, [{ foo: 'bar'; 2: 10 }, 'foobar']>>,
]