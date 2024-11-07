import { createSelector } from '@reduxjs/toolkit'
import type { Day } from '@src/types/features'
import type { Weekday } from '@src/types/utils'
import API from '@features/API'
import { providesList } from '../tagUtils'

// type DayWithExercises = Day & {exercises: readonly Exercise[] }

const URLS = {
	DAYS: {
		url: 'days/',
		getDetailUrl: (pk: number | string) => `days/${pk}/`,
	},
}

const daysAPI = API.injectEndpoints({
	endpoints: (builder) => ({
		/** List all Days */
		getDays: builder.query<Day[], void>({
			query: () => URLS.DAYS.url,
			providesTags: (result, err, args) => providesList(result, 'Day'),
		}),

		/**
		 * Get the days list for a workout.
		 */
		getDaysByWorkout: builder.query<Day[], { workoutID: number }>({
			query: ({ workoutID }) => ({
				url: URLS.DAYS.url,
				params: { workout: workoutID },
			}),
			providesTags: (result, err, args) => providesList(result, 'Day'),
			// providesTags: (result, err, { workoutId }) => [{ type: 'Day', id: `WORKOUT-${workoutId}-DAYS` }],
		}),

		/**
		 * Get the days list for the active workout.
		 */
		getActiveWorkoutDays: builder.query<Day[], void>({
			query: () => 'days/active/',
			providesTags: (result, err, args) => providesList(result, 'Day'),
		}),

		/**
		 * Update Day
		 */
		updateDay: builder.mutation<Day, { id: number; name: string }>({
			query: ({ id, name }) => ({
				url: URLS.DAYS.getDetailUrl(id),
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

/*
const selectDaysListResult = daysAPI.endpoints.getDays.select()
const selectActiveWorkoutDaysResult = daysAPI.endpoints.getActiveWorkoutDays.select()

const selectDaysList = createSelector(selectDaysListResult, (res) => res?.data ?? [])

const selectActiveWorkoutDays = createSelector(selectActiveWorkoutDaysResult, (res) => res?.data ?? [])

const selectDayByWeekday = createSelector(
	(data) => data ?? [],
	(data, weekday: Weekday) => weekday,
	(data: Day[], weekday: Weekday) => data.find(({ dayIndex }) => dayIndex === weekday)
)
*/

const { useGetActiveWorkoutDaysQuery, useGetDaysQuery, useGetDaysByWorkoutQuery, useUpdateDayMutation } = daysAPI

export default daysAPI
export {
	useGetActiveWorkoutDaysQuery,
	useGetDaysQuery,
	useGetDaysByWorkoutQuery,
	useUpdateDayMutation,
	//
}
