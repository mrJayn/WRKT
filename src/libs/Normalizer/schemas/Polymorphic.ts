import { isImmutable } from './ImmutableUtils'
import type { Input, Schema } from '../types'

type Definition = Schema | Record<string, Schema>
type SchemaAttribute = string | ((input: Input) => string)

class PolymorphicSchema {
	_schemaAttribute?: any
    schema?:Definition

	constructor(definition: Definition, schemaAttribute: SchemaAttribute) {
		if (schemaAttribute) {
			this._schemaAttribute =
				typeof schemaAttribute === 'string'
					? (input: { [K in typeof schemaAttribute]?: any }) => input[schemaAttribute]
					: schemaAttribute
		}
		this.define(definition)
	}

	get isSingleSchema() {
		return !this._schemaAttribute
	}

	define(definition:Definition) {
		this.schema = definition
	}

	getSchemaAttribute(input:Input, parent:, key) {
		return !this.isSingleSchema && this._schemaAttribute(input, parent, key)
	}

	inferSchema(input, parent, key) {
		if (this.isSingleSchema) {
			return this.schema
		}

		const attr = this.getSchemaAttribute(input, parent, key)
		return this.schema[attr]
	}

	normalizeValue(value, parent, key, visit, addEntity, visitedEntities) {
		const schema = this.inferSchema(value, parent, key)
		if (!schema) {
			return value
		}
		const normalizedValue = visit(value, parent, key, schema, addEntity, visitedEntities)
		return this.isSingleSchema || normalizedValue === undefined || normalizedValue === null
			? normalizedValue
			: { id: normalizedValue, schema: this.getSchemaAttribute(value, parent, key) }
	}

	denormalizeValue(value, unvisit) {
		const schemaKey = isImmutable(value) ? value.get('schema') : value.schema
		if (!this.isSingleSchema && !schemaKey) {
			return value
		}
		const id = this.isSingleSchema ? undefined : isImmutable(value) ? value.get('id') : value.id
		const schema = this.isSingleSchema ? this.schema : this.schema[schemaKey]
		return unvisit(id || value, schema)
	}
}

export default PolymorphicSchema
