/*
  In addition to the Simple Vue, we are now having a new props field in the options. This is a simplified version of Vue's props option. Here are some of the rules.

  props is an object containing each field as the key of the real props injected into this. The injected props will be accessible in all the context including data, computed, and methods.

  A prop will be defined either by a constructor or an object with a type field containing constructor(s).
*/

type TupleToUnion<T> = T extends (infer A)[] ? A : T

type MyReturnType<T> = T extends () => infer A
  ? A
  : T extends new (...args: any[]) => infer A
    ? A
    : any

type Props<P> = {
  [key in keyof P]: MyReturnType<
    TupleToUnion<P[key] extends { type: infer Type } ? Type : P[key]>
  >
}

type OptionsType<P, D, C, M> = {
  props: P;
  data: (this: Props<P>) => D;
  computed: C;
  methods: M;
} & ThisType<
  Props<P> & D & {
    [key in keyof C]: C[key] extends () => infer R ? R : any;
  } & M
>

declare function VueBasicProps<P, D, C, M>(options: OptionsType<P, D, C, M>): any

import type { Debug, Equal, Expect, IsAny } from '@type-challenges/utils'

class ClassA {}

VueBasicProps({
  props: {
    propA: {},
    propB: { type: String },
    propC: { type: Boolean },
    propD: { type: ClassA },
    propE: { type: [String, Number] },
    propF: RegExp,
  },
  data(this) {
    type PropsType = Debug<typeof this>
    type cases = [
      Expect<IsAny<PropsType['propA']>>,
      Expect<Equal<PropsType['propB'], string>>,
      Expect<Equal<PropsType['propC'], boolean>>,
      Expect<Equal<PropsType['propD'], ClassA>>,
      Expect<Equal<PropsType['propE'], string | number>>,
      Expect<Equal<PropsType['propF'], RegExp>>,
    ]

    // @ts-expect-error
    this.firstname
    // @ts-expect-error
    this.getRandom()
    // @ts-expect-error
    this.data()

    return {
      firstname: 'Type',
      lastname: 'Challenges',
      amount: 10,
    }
  },
  computed: {
    fullname() {
      return `${this.firstname} ${this.lastname}`
    },
  },
  methods: {
    getRandom() {
      return Math.random()
    },
    hi() {
      console.log(this.fullname.toLowerCase())
      console.log(this.getRandom())
    },
    test() {
      const fullname = this.fullname
      const propE = this.propE
      type cases = [
        Expect<Equal<typeof fullname, string>>,
        Expect<Equal<typeof propE, string | number>>,
      ]
    },
  },
})