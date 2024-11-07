import CONST from '@src/CONST'
import ROUTES from '@src/ROUTES'
import type { Workout } from '@src/types/features'
import API from '@features/API'
import { providesList } from '../tagUtils'

type EditableWorkout = Pick<Workout, 'id' | 'name' | 'isActive' | 'order'>

const URLS = {
	WORKOUTS: {
		url: 'workouts/',
		getDetailUrl: (pk: number | string) => `workouts/${pk}/`,
	},
}

const workoutsApi = API.injectEndpoints({
	endpoints: (builder) => ({
		/**
		 * Get the workouts list for the current user.
		 */
		getWorkoutsList: builder.query<Workout[], void>({
			query: () => ROUTES.WORKOUTS,
			providesTags: (result) => providesList(result, 'Workout'),
		}),

		/**
		 * Create a new workout.
		 */
		createWorkout: builder.mutation<Workout, void>({
			query: () => ({
				url: URLS.WORKOUTS.url,
				method: 'POST',
			}),
			invalidatesTags: [{ type: 'Workout', id: 'LIST' }],
		}),

		/**
		 * Update an existing workout.
		 */
		updateWorkout: builder.mutation<Workout | Workout[], EditableWorkout>({
			query: ({ id, ...data }) => ({
				url: URLS.WORKOUTS.getDetailUrl(id),
				method: 'PATCH',
				data,
			}),
			invalidatesTags: (result, error, { id, name, isActive }) =>
				isActive
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
				url: URLS.WORKOUTS.getDetailUrl(id),
				method: 'PATCH',
				data: { isActive: true },
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
				url: URLS.WORKOUTS.getDetailUrl(id),
				method: 'DELETE',
			}),
			invalidatesTags: (result, error, arg) => [{ type: 'Workout', id: 'LIST' }],
		}),
	}),
})

export default workoutsApi

export const {
	useGetWorkoutsListQuery,
	useCreateWorkoutMutation,
	useUpdateWorkoutMutation,
	useActivateWorkoutMutation,
	useDeleteWorkoutMutation,
} = workoutsApi
