import { createAsyncThunk } from '@reduxjs/toolkit'
import apiQuery from '@api/query'

const getExercisesList = createAsyncThunk(`exercises/list`, async () => {
	return await apiQuery({ method: 'GET', url: `/user/exercises/` })
})

const createExercise = createAsyncThunk(`exercises/create`, async (exerciseData) => {
	return await apiQuery({ method: 'POST', url: `/user/exercises/`, data: exerciseData })
})

const updateExercise = createAsyncThunk(`exercises/update`, async (id, exerciseData) => {
	return await apiQuery({ method: 'PATCH', url: `/user/exercises/${id}/`, data: exerciseData })
})

const destroyExercise = createAsyncThunk(`exercises/destroy`, async (id) => {
	return await apiQuery({ method: 'DELETE', url: `/user/exercises/${id}/` })
})

export const exercisesDispatchMap = (dispatch) => ({
	listExercises: () => dispatch(getExercisesList()),
	// createExercises: (data) => dispatch(createExercises(data)),
	// retrieveExercises: (id) => dispatch(retrieveExercises(id)),
	// updateExercises: (id, data) => dispatch(updateExercises(id, data)),
	// destroyExercises: (id) => dispatch(destroyExercises(id)),
})

export default {
	get: getExercisesList,
	create: createExercise,
	update: updateExercise,
	destroy: destroyExercise,
}
