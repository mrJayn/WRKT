import PolymorphicSchema from '@libs/Normalizer/schemas/Polymorphic'
import type { AddEntitiesFn, Input, Parent, VisitFn } from '../types'
import { AnyObject } from 'yup'

type Schema = any

type SchemaType = Schema | Schema[]

type ArrayInput = AnyObject[]
type ArrayParent = ArraySchemaType[]


const validateSchema = (definition: any) => {
	if (Array.isArray(definition) && definition.length > 1) {
		throw new Error(`Expected schema definition to be a single schema, but found ${definition.length}.`)
	}
	return definition[0]
}

const getValues = (input: Input) => {
	if (Array.isArray(input)) {
		return input
	}
	return Object.keys(input).map((key) => input[key as keyof typeof input])
}

const normalize = (schema: SchemaType, input: Input, parent: Parent, key: string, visit:VisitFn, addEntity:AddEntitiesFn, visitedEntities:) => {
	schema = validateSchema(schema)

	const values = getValues(input)

	// Special case: Arrays pass *their* parent on to their children, since there
	// is not any special information that can be gathered from themselves directly
	return values.map((value, index) => visit(value, parent, key, schema, addEntity, visitedEntities))
}

const denormalize = (schema, input, unvisit) => {
	schema = validateSchema(schema)
	return input && input.map ? input.map((entityOrId) => unvisit(entityOrId, schema)) : input
}

class ArraySchema extends PolymorphicSchema {
	normalize(input:ArrayInput, parent:Array<typeof ArraySchema>, key, visit, addEntity, visitedEntities) {
		const values = getValues(input)

		return values
			.map((value, index) => this.normalizeValue(value, parent, key, visit, addEntity, visitedEntities))
			.filter((value) => value !== undefined && value !== null)
	}

	denormalize(input, unvisit) {
		return input && input.map ? input.map((value) => this.denormalizeValue(value, unvisit)) : input
	}
}


export default ArraySchema
export { normalize, denormalize }
