/*
  The function passed to Currying may have multiple arguments, you need to correctly type it.
*/

declare function Currying<T>(arg: T):
  T extends (...args: infer P) => infer R
    ? P extends [infer P1, ...infer P2]
      // 递归调用，ReturnType获取返回值
      ? (arg: P1) => ReturnType<typeof Currying<(...args: P2) => R>>
      : R
    : never

import type { Equal, Expect } from '@type-challenges/utils'

const curried1 = Currying((a: string, b: number, c: boolean) => true)
const curried2 = Currying((a: string, b: number, c: boolean, d: boolean, e: boolean, f: string, g: boolean) => true)

type cases = [
  Expect<Equal<
    typeof curried1, (a: string) => (b: number) => (c: boolean) => true
  >>,
  Expect<Equal<
    typeof curried2, (a: string) => (b: number) => (c: boolean) => (d: boolean) => (e: boolean) => (f: string) => (g: boolean) => true
  >>,
]