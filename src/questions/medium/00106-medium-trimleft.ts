/*
type trimed = TrimLeft<'  Hello World  '> // expected to be 'Hello World  '
*/
// Template Literal Types
// 一次匹配一个空格，需要递归调用 TrimLeft
type TrimLeft<S extends string> = S extends `${' ' | '\n' | '\t'}${infer R}`
  ? TrimLeft<R>
  : S

import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<TrimLeft<'str'>, 'str'>>,
  Expect<Equal<TrimLeft<' str'>, 'str'>>,
  Expect<Equal<TrimLeft<'     str'>, 'str'>>,
  Expect<Equal<TrimLeft<'     str     '>, 'str     '>>,
  Expect<Equal<TrimLeft<'   \n\t foo bar '>, 'foo bar '>>,
  Expect<Equal<TrimLeft<''>, ''>>,
  Expect<Equal<TrimLeft<' \n\t'>, ''>>
]
