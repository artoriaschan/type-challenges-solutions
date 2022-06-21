/*
  type Foo = {
    [key: string]: any;
    foo(): void;
  }

  type A = RemoveIndexSignature<Foo> // expected { foo(): void }
*/

type RemoveIndexSignature<T> = {
  [K in keyof T as K extends `${infer _}` ? K : never]:
  T[K]
}

import type { Equal, Expect } from '@type-challenges/utils'

type Foo = {
  [key: string]: any
  foo(): void
}

type Bar = {
  [key: number]: any
  bar(): void
}

type FooBar = {
  [key: symbol]: any
  foobar(): void
}

type Baz = {
  bar(): void
  baz: string
}

type cases = [
  Expect<Equal<RemoveIndexSignature<Foo>, { foo(): void }>>,
  Expect<Equal<RemoveIndexSignature<Bar>, { bar(): void }>>,
  Expect<Equal<RemoveIndexSignature<FooBar>, { foobar(): void }>>,
  Expect<Equal<RemoveIndexSignature<Baz>, { bar(): void; baz: string }>>,
]