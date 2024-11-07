import type { ValueOf } from '@src/types/utils'
import ArraySchema, * as ArrayUtils from './Array'
import ObjectSchema, * as ObjectUtils from './Object'
import EntitySchema from './Entity'
import UnionSchema from './Union'
import ValuesSchema from './Values'

const schema = {
	Array: ArraySchema,
	Entity: EntitySchema,
	Object: ObjectSchema,
	Union: UnionSchema,
	Values: ValuesSchema,
} as const

const SchemaUtils = {
	Array: ArrayUtils,
	Object: ObjectUtils,
} as const

export default schema
