/**
 * -- FIX THIS --
 *
 * source:   https://github.com/sindresorhus/type-fest/blob/main/source/writable.d.ts
 *
 */

import type IsEqual from './IsEqual'

type Filter<KeyType, ExcludeType> = IsEqual<KeyType, ExcludeType> extends true
	? never
	: KeyType extends ExcludeType
	? never
	: KeyType

type ExceptOptions = {
	/**
	Disallow assigning non-specified properties.

	Note that any omitted properties in the resulting type will be present in autocomplete as `undefined`.

	@default false
	*/
	requireExactProps?: boolean
}

type Except<ObjectType, KeysType extends keyof ObjectType, Options extends ExceptOptions = { requireExactProps: false }> = {
	[KeyType in keyof ObjectType as Filter<KeyType, KeysType>]: ObjectType[KeyType]
} & (Options['requireExactProps'] extends true ? Partial<Record<KeysType, never>> : {})

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] } & {}

/**
Create a writable version of the given array type.
*/
type WritableArray<ArrayType extends readonly unknown[]> = ArrayType extends readonly []
	? []
	: ArrayType extends readonly [...infer U, infer V]
	? [...U, V]
	: ArrayType extends readonly [infer U, ...infer V]
	? [U, ...V]
	: ArrayType extends ReadonlyArray<infer U>
	? U[]
	: ArrayType

type Writable<BaseType, Keys extends keyof BaseType = keyof BaseType> = BaseType extends ReadonlyMap<
	infer KeyType,
	infer ValueType
>
	? Map<KeyType, ValueType>
	: BaseType extends ReadonlySet<infer ItemType>
	? Set<ItemType>
	: BaseType extends readonly unknown[]
	? // Handle array
	  WritableArray<BaseType>
	: // Handle object
	  Simplify<
			// Pick just the keys that are not writable from the base type.
			Except<BaseType, Keys> & { -readonly [KeyType in keyof Pick<BaseType, Keys>]: Pick<BaseType, Keys>[KeyType] } // Pick the keys that should be writable from the base type and make them writable by removing the `readonly` modifier from the key.
	  >
