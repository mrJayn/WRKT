import API from '@features/API'
import { providesList } from '../tagUtils'
import type { Day } from '@src/types/features'

const daysApi = API.injectEndpoints({
	endpoints: (builder) => ({
		/** List all Days */
		getDays: builder.query<Day[], void>({
			query: () => ({ url: 'user/days/' }),
			providesTags: (result, err, args) => providesList(result, 'Day'),
		}),

		/** List Days by workout */
		getDaysByWorkout: builder.query<Day[], { workoutId: number }>({
			query: ({ workoutId }) => ({
				url: 'user/days/',
				params: { workout: workoutId },
			}),
			providesTags: (result, err, args) => providesList(result, 'Day'),
			// providesTags: (result, err, { workoutId }) => [{ type: 'Day', id: `WORKOUT-${workoutId}-DAYS` }],
		}),

		/** List Days by activeWorkout */
		getActiveWorkoutDays: builder.query<Day[], void>({
			query: () => ({ url: 'user/days/active/' }),
			providesTags: (result, err, args) => providesList(result, 'Day'),
		}),

		/** Update Day */
		updateDay: builder.mutation<Day, { id: number; name: string }>({
			query: ({ id, name }) => ({
				url: `user/days/${id}/`,
				method: 'PATCH',
				data: { name },
			}),
			invalidatesTags: (result, err, args) => (result ? [{ type: 'Day', id: result.id }] : []),
		}),
	}),
})

/*
			 ( getDays )
			 providesTags: (result = [], err, arg) =>
			 	result
			 		? [...result.map(({ id }) => ({ type: 'Day', id }) as const), { type: 'Day', id: 'LIST' }]
			 		: [{ type: 'Day', id: 'LIST' }],
			
			 ( getActiveWorkoutDays )
			 providesTags: (result = [], error, arg) =>
			 	result
			 		? [...result.map(({ id }) => ({ type: 'ActiveDay', id }) as const), { type: 'ActiveDay', id: 'LIST' }]
			 		: [{ type: 'ActiveDay', id: 'LIST' }],
*/

export default daysApi

// prettier-ignore
export const {
	useGetActiveWorkoutDaysQuery,
	useGetDaysQuery,
	useGetDaysByWorkoutQuery,
	useUpdateDayMutation,
} = daysApi
