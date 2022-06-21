/*
  Compute the length of a string literal, which behaves like String#length.
*/
// 将字符串类型通过模板文本类型转换成数组，再获取其length
type StringConvertToArray<S extends string> =
  S extends `${infer H}${infer Rest}` ? [H, ...StringConvertToArray<Rest>] : []
type LengthOfString<S extends string> = StringConvertToArray<S>['length']

import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<LengthOfString<''>, 0>>,
  Expect<Equal<LengthOfString<'kumiko'>, 6>>,
  Expect<Equal<LengthOfString<'reina'>, 5>>,
  Expect<Equal<LengthOfString<'Sound! Euphonium'>, 16>>
]
