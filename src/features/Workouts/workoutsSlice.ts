import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import type { RootState } from '@features/Store'
import type { Workout } from '@src/types/features'
import workoutsApi from './workoutsApi'

/*
{
	selectId: (workout: Workout) => workout.id,
	sortComparer: (a, b) => a.order - b.order,
}
*/

const workoutsAdapter = createEntityAdapter<Workout>({
	sortComparer: (a, b) => a.order - b.order,
})

const workoutsSelectors = workoutsAdapter.getSelectors((state: RootState) => state.workouts)
const initialState = workoutsAdapter.getInitialState()

const workoutsSlice = createSlice({
	name: 'workouts',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addMatcher(workoutsApi.endpoints.getWorkouts.matchFulfilled, (state, { payload }) => {
				workoutsAdapter.setAll(state, payload)
			})
			.addMatcher(workoutsApi.endpoints.createWorkout.matchFulfilled, workoutsAdapter.addOne)
	},
	selectors: {},
})

const { selectAll, selectById, selectEntities, selectIds, selectTotal } = workoutsSelectors

const selectWorkoutById = (workoutID: number) => (state: RootState) => workoutsSelectors.selectById(state, workoutID)

export default workoutsSlice.reducer

export { workoutsSelectors, selectWorkoutById }
