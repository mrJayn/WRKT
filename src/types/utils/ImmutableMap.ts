import type { Immutable } from 'immer'

type ImmutableMap<K = string, T = any> = Immutable<ReadonlyMap<K, T>>

function isImmutableMap(object: any): object is ImmutableMap {
	return !!(object && typeof object.hasOwnProperty === 'function' && object.hasOwnProperty('__ownerID'))
}

export default ImmutableMap
export { isImmutableMap }
export type { ImmutableMap }
