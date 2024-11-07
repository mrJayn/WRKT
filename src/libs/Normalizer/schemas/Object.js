import * as ImmutableUtils from './ImmutableUtils'

const normalize = (schema, input, parent, key, visit, addEntity, visitedEntities) => {
	const object = { ...input }
	Object.keys(schema).forEach((key) => {
		const localSchema = schema[key]
		const resolvedLocalSchema = typeof localSchema === 'function' ? localSchema(input) : localSchema
		const value = visit(input[key], input, key, resolvedLocalSchema, addEntity, visitedEntities)
		if (value === undefined || value === null) {
			delete object[key]
		} else {
			object[key] = value
		}
	})
	return object
}

const denormalize = (schema, input, unvisit) => {
	if (ImmutableUtils.isImmutable(input)) {
		return ImmutableUtils.denormalizeImmutable(schema, input, unvisit)
	}

	const object = { ...input }
	Object.keys(schema).forEach((key) => {
		if (object[key] != null) {
			object[key] = unvisit(object[key], schema[key])
		}
	})
	return object
}

class ObjectSchema {
	constructor(definition) {
		this.define(definition)
	}

	define(definition) {
		this.schema = Object.keys(definition).reduce((entitySchema, key) => {
			const schema = definition[key]
			return { ...entitySchema, [key]: schema }
		}, this.schema || {})
	}

	normalize(...args) {
		return normalize(this.schema, ...args)
	}

	denormalize(...args) {
		return denormalize(this.schema, ...args)
	}
}

export default ObjectSchema
export { normalize, denormalize }
