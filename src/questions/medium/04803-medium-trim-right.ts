/*
  type Trimed = TrimRight<'   Hello World    '> // expected to be '   Hello World'
*/

type Trim = '\n' | '\t' | ' '
type TrimRight<S extends string> = S extends `${infer Left}${Trim}`
  ? TrimRight<Left>
  : S

import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<TrimRight<'str'>, 'str'>>,
  Expect<Equal<TrimRight<'str '>, 'str'>>,
  Expect<Equal<TrimRight<'str     '>, 'str'>>,
  Expect<Equal<TrimRight<'     str     '>, '     str'>>,
  Expect<Equal<TrimRight<'   foo bar  \n\t '>, '   foo bar'>>,
  Expect<Equal<TrimRight<''>, ''>>,
  Expect<Equal<TrimRight<'\n\t '>, ''>>
]
