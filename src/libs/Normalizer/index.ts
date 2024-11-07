/**
 *
 * This is a Modified from the `normalizr` library, which can be found here
 * https://github.com/paularmstrong/normalizr/tree/master
 *
 */
import * as ImmutableUtils from './schemas/ImmutableUtils'
import { normalize as normalizeArray } from './schemas/Array'
import { normalize as normalizeObect } from './schemas/Object'
import type { schema, Schema, Normalize, Denormalize } from './types'
import { isImmutableMap } from '@src/types/utils/ImmutableMap'

const visit = <T>(
	value: any,
	parent: any,
	key: string,
	schema: schema.Entity<T>,
	addEntity: typeof addEntities,
	visitedEntities: any
) => {
	if (typeof value !== 'object' || !value) {
		return value
	}
	if (typeof schema === 'object' && (!schema.normalize || typeof schema.normalize !== 'function')) {
		const method = Array.isArray(schema) ? normalizeArray : normalizeObect
		return method(schema, value, parent, key, visit, addEntity, visitedEntities)
	}
	return schema.normalize(value, parent, key, visit, addEntity, visitedEntities)
}

const addEntities =
	<T>(entities: any) =>
	(schema: Schema, processedEntity: schema.Entity<T>, value: any, parent: any, key: string) => {
		const schemaKey = schema.key
		const id = schema.getId(value, parent, key)
		if (!(schemaKey in entities)) {
			entities[schemaKey] = {}
		}

		const existingEntity = entities[schemaKey][id]
		if (existingEntity) {
			entities[schemaKey][id] = schema.merge(existingEntity, processedEntity)
		} else {
			entities[schemaKey][id] = processedEntity
		}
	}

const normalize: Normalize = (input, schema) => {
	if (!input || typeof input !== 'object') {
		throw new Error(
			`Unexpected input given to normalize. Expected type to be "object", found "${
				input === null ? 'null' : typeof input
			}".`
		)
	}

	const entities = {}
	const addEntity = addEntities(entities)
	const visitedEntities = {}

	const result = visit(input, input, null, schema, addEntity, visitedEntities)
	return { entities, result }
}

const unvisitEntity = (
	id: number,
	schema: Schema,
	unvisit: typeof unvisitEntity,
	getEntity: typeof getEntities,
	cache: any
) => {
	let entity = getEntity(id, schema)

	if (entity === undefined && schema instanceof schema.Entity) {
		entity = schema.fallback(id, schema)
	}

	if (typeof entity !== 'object' || entity === null) {
		return entity
	}

	if (!cache[schema.key]) {
		cache[schema.key] = {}
	}

	if (!cache[schema.key][id]) {
		// Ensure we don't mutate it non-immutable objects
		const entityCopy = ImmutableUtils.isImmutable(entity) ? entity : { ...entity }

		// Need to set this first so that if it is referenced further within the
		// denormalization the reference will already exist.
		cache[schema.key][id] = entityCopy
		cache[schema.key][id] = schema.denormalize(entityCopy, unvisit)
	}

	return cache[schema.key][id]
}

const getUnvisit = (entities: any) => {
	const cache = {}
	const getEntity = getEntities(entities)

	return function unvisit(input, schema) {
		if (typeof schema === 'object' && (!schema.denormalize || typeof schema.denormalize !== 'function')) {
			const method = Array.isArray(schema) ? ArrayUtils.denormalize : ObjectUtils.denormalize
			return method(schema, input, unvisit)
		}

		if (input === undefined || input === null) {
			return input
		}

		if (schema instanceof schema.Entity) {
			return unvisitEntity(input, schema, unvisit, getEntity, cache)
		}

		return schema.denormalize(input, unvisit)
	}
}

const getEntities = (entities: any) => {
	const _isImmutableMap = isImmutableMap(entities)

	return (entityOrId, schema) => {
		const schemaKey = schema.key

		if (typeof entityOrId === 'object') {
			return entityOrId
		}

		if (_isImmutableMap) {
			return entities.getIn([schemaKey, entityOrId.toString()])
		}

		return entities[schemaKey] && entities[schemaKey][entityOrId]
	}
}

const denormalize: Denormalize = (input, schema, entities) => {
	if (typeof input !== 'undefined') {
		return getUnvisit(entities)(input, schema)
	}
}

export { default as schema } from './schemas'
export { normalize, denormalize }
