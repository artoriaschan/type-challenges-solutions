/*
  FooBarBaz -> foo-bar-baz
*/

type convertToKebCase<S extends string> = 
  S extends `${infer H}${infer Rest}`
    ? (
        H extends Lowercase<H> | '-' 
          ? `${H}${convertToKebCase<Rest>}` // 如果是首字母是小写或者是-，则直接拼接
          :`-${Lowercase<H>}${convertToKebCase<Rest>}` // 如果是首字母是大写，则转为小写并拼接 - 
      )
    :""
// 使用 Uncapitalize 将字符串类型的首字母转换为小写
type KebabCase<S extends string> = convertToKebCase<Uncapitalize<S>>

import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<KebabCase<'FooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'fooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'foo-bar'>, 'foo-bar'>>,
  Expect<Equal<KebabCase<'foo_bar'>, 'foo_bar'>>,
  Expect<Equal<KebabCase<'Foo-Bar'>, 'foo--bar'>>,
  Expect<Equal<KebabCase<'ABC'>, 'a-b-c'>>,
  Expect<Equal<KebabCase<'-'>, '-'>>,
  Expect<Equal<KebabCase<''>, ''>>,
  Expect<Equal<KebabCase<'😎'>, '😎'>>,
]