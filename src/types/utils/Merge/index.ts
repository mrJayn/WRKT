import { OmitIndexSignature } from './omit-index-signature'
import { PickIndexSignature } from './pick-index-signature'
import { Simplify } from './simplify'

/**
Merges two objects without worrying about index signatures.
 */
type SimpleMerge<T1, T2> = {
	[Key in keyof T1 as Key extends keyof T2 ? never : Key]: T1[Key]
} & T2

/**
Merge two types into a new type. Keys of the second type overrides keys of the first type.
*/
export type Merge<T1, T2> = Simplify<
	SimpleMerge<PickIndexSignature<T1>, PickIndexSignature<T2>> & SimpleMerge<OmitIndexSignature<T1>, OmitIndexSignature<T2>>
>
