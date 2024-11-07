import type { Immutable } from 'immer'

type ImmutableRecord<K extends string | number | symbol = string, T = any> = Immutable<Record<K, T>>

function isImmutableRecord(object: any): object is ImmutableRecord {
	return !!(
		object &&
		typeof object.hasOwnProperty === 'function' &&
		object._map &&
		object._map.hasOwnProperty('__ownerID')
	)
}

export default ImmutableRecord
export { isImmutableRecord }
export type { ImmutableRecord }
