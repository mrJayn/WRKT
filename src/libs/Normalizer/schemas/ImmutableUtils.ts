/**
 * Helpers to enable Immutable compatibility *without* bringing in
 * the 'immutable' package as a dependency.
 */

import _ from 'lodash'
import type { ImmutableInput, UnvisitFn } from '../types'
import type { Schema } from '.'

/**
 * Check if an object is immutable by checking if it has a key specific
 * to the immutable library.
 */
function isImmutable(object: any): boolean {
	return !!(
		object &&
		typeof object.hasOwnProperty === 'function' &&
		(object.hasOwnProperty('__ownerID') || // Immutable.Map
			(object._map && object._map.hasOwnProperty('__ownerID')))
	) // Immutable.Record
}

/**
 * Denormalize an immutable entity.
 */
function denormalizeImmutable(schema: Schema, input: ImmutableInput, unvisit: UnvisitFn): ImmutableInput {
	return Object.keys(schema).reduce(
		(acc, _key) => {
			// Immutable maps cast keys to strings on write so we need to ensure
			// we're accessing them using string keys.
			const key = `${_key}`
			if (_.isMap(acc)) {
				if (acc.has(key)) {
					return acc.set(key, unvisit(acc.get(key), schema[_key]))
				}
			} else if (_key in acc) {
				acc[_key] = unvisit(acc[_key], schema[_key])
			}
			return acc
		},
		input as Map<string, any> | Record<string, any>
	)
}

export { isImmutable, denormalizeImmutable }
