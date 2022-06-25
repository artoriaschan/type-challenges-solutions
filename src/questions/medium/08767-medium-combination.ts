/*
  Given an array of strings, do Permutation & Combination. It's also useful for the prop types like video controlsList

  type Keys = Combination<['foo', 'bar', 'baz']>
  // expected to be `"foo" | "bar" | "baz" | "foo bar" | "foo bar baz" | "foo baz" | "foo baz bar" | "bar foo" | "bar foo baz" | "bar baz" | "bar baz foo" | "baz foo" | "baz foo bar" | "baz bar" | "baz bar foo"`
*/

type Combination<
  T extends string[],
  U = T[number], // 数组类型转换为联合类型
  A = U
> =
  U extends infer U extends string // Distributive Conditional Types
    ? `${U} ${Combination<T, Exclude<A, U>>}` | U // Exclude<A, U> 剔除已组合的类型
    : never;

import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Combination<['foo', 'bar', 'baz']>,
  'foo' | 'bar' | 'baz' | 'foo bar' | 'foo bar baz' | 'foo baz' | 'foo baz bar' | 'bar foo' | 'bar foo baz' | 'bar baz' | 'bar baz foo' | 'baz foo' | 'baz foo bar' | 'baz bar' | 'baz bar foo'>>,
]