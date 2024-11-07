/**
 *
 */

export type IsEqual<A, B> = (<G>() => G extends A ? 1 : 2) extends <G>() => G extends B ? 1 : 2 ? true : false

type DeepIsEqual<A, B> = A extends B ? IsEqual<A, B> : false

export default IsEqual
