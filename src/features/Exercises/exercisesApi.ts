import ROUTES from '@src/ROUTES'
import API from '@features/API'
import type { Day, Exercise } from '@src/types/features'
import { providesList } from '../tagUtils'
import { createSelector } from '@reduxjs/toolkit'

type DayExerciseArgs = {
	workout: number
	day: number
}

const exercisesAPI = API.injectEndpoints({
	endpoints: (builder) => ({
		/** Get the exercises list for each day in the active workout. */
		getActiveWorkoutExercises: builder.query<Exercise[], void>({
			query: () => 'exercises/active/',
			providesTags: (result, _err, _args) => providesList(result, 'Exercise'),
		}),

		/** Get the Exercises list for a specific Day. */
		getWorkoutExercises: builder.query<Exercise[], number | 'active'>({
			query: (workout) => ROUTES.WORKOUT_EXERCISES.getRoute(workout),
			providesTags: (result) =>
				result ? result.map((exercise) => ({ type: 'Exercise' as const, id: exercise.id })) : [],
		}),

		/** Get the Exercises list for a specific Day. */
		getDayExercises: builder.query<Exercise[], DayExerciseArgs>({
			query: ({ workout, day }) => ROUTES.WORKOUT_DAY_EXERCISES.getRoute(workout, day),
			providesTags: (result) =>
				result ? result.map((exercise) => ({ type: 'Exercise' as const, id: exercise.id })) : [],
		}),
	}),
})

export default exercisesAPI
export const { useGetWorkoutExercisesQuery, useGetDayExercisesQuery, useGetActiveWorkoutExercisesQuery } = exercisesAPI
