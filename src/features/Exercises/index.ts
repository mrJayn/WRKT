import { createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit'
import exercisesActions from './actions'
import type { RootState } from '@features/Store'
import type { Exercise } from '@src/types/features'

const exercisesAdapter = createEntityAdapter({
	selectId: (exercise: Exercise) => exercise.id,
	sortComparer: (a, b) => a.order - b.order,
})

const initialState = exercisesAdapter.getInitialState({})

const exercisesSlice = createSlice({
	name: 'exercises',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(exercisesActions.get.pending, (state, action) => {
				//
			})
			.addCase(exercisesActions.get.fulfilled, (state, { payload }) => {
				exercisesAdapter.setAll(state, payload.data)
			})
			.addCase(exercisesActions.get.rejected, (state, { payload }) => {
				//
			})
	},
	selectors: {
		selectByDay: (state, ownProps) => {
			const exercisesList = exercisesAdapter.getSelectors().selectAll(state)
			const filteredExercises = exercisesList.filter((exercise) => exercise.day === ownProps.dayId)
			return filteredExercises
		},
	},
})

export const {
	get: getExercises,
	create: createExercise,
	update: updateExercise,
	destroy: destroyExercise,
} = exercisesActions

export const {
	selectIds: selectExerciseIds,
	selectEntities: selectExerciseEntities,
	selectAll: selectExercises,
	selectTotal: selectExercisesCount,
	selectById: selectExerciseById,
} = exercisesAdapter.getSelectors(({ exercises }: RootState) => exercises)

export const {
	selectByDay: selectExercisesByDay,
	//
} = exercisesSlice.selectors

export default exercisesSlice

/*
function selectDayIds(state, days) {
	return days.map(({ id }) => id)
}

const selectExercisesByDaysList = (state, workoutId) => {
	const exercises = state.objects
	const days = state.objects
	const filteredDays = days.filter((day) => day.workout === workoutId)
	const dayIds = days.map(({ id }) => id)
	const filteredExercises = exercises.filter((exercise) => dayIds.includes(exercise.day))
	return filteredExercises
}
*/
