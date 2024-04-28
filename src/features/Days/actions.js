import { createAsyncThunk } from '@reduxjs/toolkit'
import apiQuery from '@api/query'

const getDaysList = createAsyncThunk(`days/list`, async () => {
	const res = await apiQuery({ method: 'GET', url: `/user/days/` })
	return res
})

export const daysDispatchMap = (dispatch) => ({
	listDays: () => dispatch(getDaysList()),
})

export default {
	get: getDaysList,
	// create: createDays,
	// update: updateDays,
	// destroy: destroyDays,
}
