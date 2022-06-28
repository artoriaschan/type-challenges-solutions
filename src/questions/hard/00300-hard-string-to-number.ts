/*
  Convert a string literal to a number, which behaves like `Number.parseInt`.
*/

// 还是通过数组的长度来转换
type ToNumber<
  S extends string,
  A extends 1[] = []
> =
  S extends `${number}` // 判断string是否是数组字符串
    ? S extends `${A["length"]}` 
      ? A["length"]
      : ToNumber<S, [...A, 1]>
    : never

import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<ToNumber<'0'>, 0>>,
  Expect<Equal<ToNumber<'5'>, 5>>,
  Expect<Equal<ToNumber<'12'>, 12>>,
  Expect<Equal<ToNumber<'27'>, 27>>,
  Expect<Equal<ToNumber<'18@7_$%'>, never>>,
]