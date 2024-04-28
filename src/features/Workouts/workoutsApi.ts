import API from '@features/API'
import { providesList } from '../tagUtils'
import type { EditableWorkout, Workout } from '@src/types/features'

const workoutsApi = API.injectEndpoints({
	endpoints: (builder) => ({
		/**
		 * List all workouts.
		 */
		getWorkouts: builder.query<Workout[], void>({
			query: () => ({ url: 'user/workouts/' }),
			providesTags: (result) => providesList(result, 'Workout'),
		}),

		/**
		 * Create a new workout.
		 */
		createWorkout: builder.mutation<Workout, void>({
			query: () => ({
				url: 'user/workouts/',
				method: 'POST',
			}),
			invalidatesTags: [{ type: 'Workout', id: 'LIST' }],
		}),

		/**
		 * Update an existing workout.
		 */
		updateWorkout: builder.mutation<Workout | Workout[], EditableWorkout>({
			query: ({ id, ...data }) => ({
				url: `user/workouts/${id}/`,
				method: 'PATCH',
				data,
			}),
			invalidatesTags: (result, error, { id, name, is_active }) =>
				is_active
					? [
							{ type: 'Workout', id: 'LIST' },
							{ type: 'ActiveDay', id: 'LIST' },
					  ]
					: [{ type: 'Workout', id }],
		}),

		/**
		 * Activate a workout.
		 */
		activateWorkout: builder.mutation<Workout[], EditableWorkout>({
			query: ({ id }) => ({
				url: `user/workouts/${id}/`,
				method: 'PATCH',
				data: { is_active: true },
			}),
			invalidatesTags: (result, error, { id }) => [
				{ type: 'Workout', id: 'LIST' },
				{ type: 'ActiveDay', id: 'LIST' },
			],
		}),

		/**
		 * Delete a workout.
		 */
		deleteWorkout: builder.mutation<void, { id: number }>({
			query: ({ id }) => ({
				url: `user/workouts/${id}/`,
				method: 'DELETE',
			}),
			invalidatesTags: (result, error, arg) => [{ type: 'Workout', id: 'LIST' }],
		}),
	}),
})

export default workoutsApi

export const {
	useGetWorkoutsQuery,
	useCreateWorkoutMutation,
	useUpdateWorkoutMutation,
	useActivateWorkoutMutation,
	useDeleteWorkoutMutation,
} = workoutsApi
