/**
 *	source:  https://github.com/paularmstrong/normalizr/blob/master/index.d.ts#L19
 */

declare namespace schema {
	export type StrategyFunction<T> = (value: any, parent: any, key: string) => T
	export type SchemaFunction = (value: any, parent: any, key: string) => string
	export type MergeFunction = (entityA: any, entityB: any) => any
	export type FallbackFunction<T> = (key: string, schema: schema.Entity<T>) => T

	export class Array<T = any> {
		constructor(definition: Schema<T>, schemaAttribute?: string | SchemaFunction)
		define(definition: Schema): void
	}

	export interface EntityOptions<T = any> {
		idAttribute?: string | SchemaFunction
		mergeStrategy?: MergeFunction
		processStrategy?: StrategyFunction<T>
		fallbackStrategy?: FallbackFunction<T>
	}

	export class Entity<T = any> {
		constructor(key: string | symbol, definition?: Schema, options?: EntityOptions<T>)
		define(definition: Schema): void
		key: string
		getId: SchemaFunction
		_processStrategy: StrategyFunction<T>
	}

	export class Object<T = any> {
		constructor(definition: SchemaObject<T>)
		define(definition: Schema): void
	}

	export class Union<T = any> {
		constructor(definition: Schema<T>, schemaAttribute?: string | SchemaFunction)
		define(definition: Schema): void
	}

	export class Values<T = any> {
		constructor(definition: Schema<T>, schemaAttribute?: string | SchemaFunction)
		define(definition: Schema): void
	}
}

type Schema<T = any> =
	| schema.Entity<T>
	| schema.Object<T>
	| schema.Union<T>
	| schema.Values<T>
	| SchemaObject<T>
	| SchemaArray<T>

type SchemaValueFunction<T> = (t: T) => Schema<T>
type SchemaValue<T> = Schema<T> | SchemaValueFunction<T>

interface SchemaObject<T> {
	[key: string]: SchemaValue<T>
}

interface SchemaArray<T> extends Array<Schema<T>> {}

type NormalizedSchema<E, R> = { entities: E; result: R }

type Normalize<T = any, E = { [key: string]: { [key: string]: T } | undefined }, R = any> = (
	data: any,
	schema: Schema<T>
) => NormalizedSchema<E, R>

type Denormalize = (input: any, schema: Schema, entities: any) => any

export type {
	schema,
	Schema,
	SchemaValueFunction,
	SchemaValue,
	SchemaObject,
	SchemaArray,
	NormalizedSchema,
	//
	Normalize,
	Denormalize,
}

/*
interface Schema {
	normalize(value, parent, key, visit, addEntity, visitedEntities):
}

type Entity<T extends Record<string,any> = Record<string,any>> = T 

type Input<T extends AnyObject | AnyObject[] = {}> = T
type ImmutableInput = ImmutableMap | ImmutableRecord

type Parent = string

type VisitFn = Function //(value: any, parent: any, key, schema, addEntity, visitedEntities) => any
type AddEntitiesFn = Function //(entities) => (schema, processedEntity, value, parent, key) => any
type NormalizeFn = Function //(input: any, schema) => any
type UnvisitEntityFn = Function //(id, schema, unvisit, getEntity, cache) => any
type GetUnvisitFn = Function //(entities) => any
type GetEntitiesFn = Function //(entities) => any
type DenormalizeFn = Function //(input, schema, entities) => any

type UnvisitFn = Function

export type {
	Schema,
	Entity,
	Input,
	ImmutableInput,
	Parent,
	VisitFn,
	AddEntitiesFn,
	NormalizeFn,
	UnvisitEntityFn,
	GetUnvisitFn,
	GetEntitiesFn,
	DenormalizeFn,
	UnvisitFn,
} 
  */
