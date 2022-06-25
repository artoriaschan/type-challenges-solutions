/*
  type Res = Without<[1, 2], 1>; // expected to be [2]
  type Res1 = Without<[1, 2, 4, 1, 5], [1, 2]>; // expected to be [4, 5]
  type Res2 = Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>; // expected to be []
*/

type Without<T, U> =
  T extends [U extends unknown[] ? U[number] : U, ...infer Rest] // 首位元素与剔除元素相同时
    ? Without<Rest, U> // 直接忽略首位，继续遍历剩下元素
    : T extends [infer Left, ...infer Right] // 首位元素与剔除元素不相同时
      ?[Left, ...Without<Right, U>] // 跳过首位，继续遍历剩余元素
      : T // 其他情况直接返回

import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Without<[1, 2], 1>, [2]>>,
  Expect<Equal<Without<[1, 2, 4, 1, 5], [1, 2]>, [4, 5]>>,
  Expect<Equal<Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>, []>>,
]