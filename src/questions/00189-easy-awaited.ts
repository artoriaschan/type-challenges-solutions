/*
If we have a type which is wrapped type like Promise. How we can get a type which is inside the wrapped type? 

For example if we have Promise<ExampleType> how to get ExampleType?
*/
type MyAwaited<T extends Promise<unknown>> = T extends Promise<infer V> 
  ? V extends Promise<unknown>
    ? MyAwaited<V>
    : V
  : never;

import type { Equal, Expect } from '@type-challenges/utils'

type X = Promise<string>
type Y = Promise<{ field: number }>
type Z = Promise<Promise<string | number>>

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
]

// @ts-expect-error
type error = MyAwaited<number>