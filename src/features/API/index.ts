import { EndpointBuilder, createApi } from '@reduxjs/toolkit/query/react'
import baseQuery from './baseQuery'

// const tagTypes = ['User', 'Profile', 'Workouts', 'Days', 'Programs', 'Weeks', 'Exercises']
const tagTypes = ['Profile', 'Workout', 'Day', 'ActiveDay'] as const

const API = createApi({
	reducerPath: 'api',
	baseQuery,
	tagTypes,
	endpoints: (builder) => ({}),
})

export const enhancedApi = API.enhanceEndpoints({
	endpoints: () => ({}),
})

type BaseQuery = typeof baseQuery

type TagType = (typeof tagTypes)[number]

type Builder = EndpointBuilder<BaseQuery, TagType, 'api'>

// type APIQueryDefinition<Result = unknown> = QueryDefinition<any, BaseQuery, TagTypes, Result[], 'api'>
// type APIUseQuery = UseQuery<APIQueryDefinition>

export default API

export type { BaseQuery, TagType, Builder }
