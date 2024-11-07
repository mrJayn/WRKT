import { createApi } from '@reduxjs/toolkit/query/react'
import baseQuery from './baseQuery'
import type { ValueOf } from '@src/types/utils'

const APITagTypes = [
	'User',
	'Profile',
	'Workout',
	'Day',
	'ActiveDay',
	// 'Program',
	// 'Week',
	'Exercise',
	//
	'Network',
	'AuthToken',
	'auth-status',
] as const

/**
 * Main API service.
 */
const API = createApi({
	reducerPath: 'api',
	baseQuery: baseQuery,
	tagTypes: APITagTypes,
	endpoints: (builder) => ({}),
})

type ApiTagType = ValueOf<typeof APITagTypes>

export default API
export type { ApiTagType }
