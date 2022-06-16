/*
type trimmed = Trim<'  Hello World  '> // expected to be 'Hello World'
*/

type Trim<S extends string> = S extends `${' ' | '\n' | '\t'}${infer R}`
  ? Trim<R>
  : S extends `${infer R}${' ' | '\n' | '\t'}`
  ? Trim<R>
  : S

import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Trim<'str'>, 'str'>>,
  Expect<Equal<Trim<' str'>, 'str'>>,
  Expect<Equal<Trim<'     str'>, 'str'>>,
  Expect<Equal<Trim<'str   '>, 'str'>>,
  Expect<Equal<Trim<'     str     '>, 'str'>>,
  Expect<Equal<Trim<'   \n\t foo bar \t'>, 'foo bar'>>,
  Expect<Equal<Trim<''>, ''>>,
  Expect<Equal<Trim<' \n\t '>, ''>>
]
