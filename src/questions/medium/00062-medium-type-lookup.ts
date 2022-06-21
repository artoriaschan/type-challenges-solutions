/*
interface Cat {
  type: 'cat'
  breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal'
}

interface Dog {
  type: 'dog'
  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer'
  color: 'brown' | 'white' | 'black'
}

type MyDogType = LookUp<Cat | Dog, 'dog'> // expected to be `Dog`
*/

// T extends {type: any}：限制T中需要有type属性
// V extends T['type']：限制传入的type的值需要在T['type']中存在
type LookUp<T extends { type: any }, V extends T['type']> = T extends {
  type: V
}
  ? T
  : never

import type { Equal, Expect } from '@type-challenges/utils'

interface Cat {
  type: 'cat'
  breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal'
}

interface Dog {
  type: 'dog'
  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer'
  color: 'brown' | 'white' | 'black'
}

interface Husky {
  type: 'dog'
  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer'
  color: 'brown' | 'white' | 'black'
}

type Animal = Cat | Dog
type Dogs = Dog | Husky

type cases = [
  Expect<Equal<LookUp<Animal, 'dog'>, Dog>>,
  Expect<Equal<LookUp<Animal, 'cat'>, Cat>>,
  Expect<Equal<LookUp<Dogs, 'dog'>, Dog | Husky>>
]
