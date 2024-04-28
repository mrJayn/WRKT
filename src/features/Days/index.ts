import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '@features/Store'
import type { Day } from '@src/types/features'
import daysApi from './daysApi'

const daysAdapter = createEntityAdapter({
	selectId: (day: Day) => day.id,
	sortComparer: (a, b) => a.day_id - b.day_id,
})

const initialState = daysAdapter.getInitialState({})

const daysSlice = createSlice({
	name: 'days',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addMatcher(daysApi.endpoints.getDays.matchFulfilled, (state, { payload }) => {
			daysAdapter.setAll(state, payload)
		})
	},
	selectors: {
		selectByWorkout: (state, ownProps): Day[] => {
			const days = daysAdapter.getSelectors().selectAll(state)
			// const filteredDays = days.filter((day) => day.workout === workoutId)
			const filteredDays = days.filter((day) => day.workout === ownProps.workoutId)
			return filteredDays
		},
	},
})

export const {
	selectIds: selectDayIds,
	selectEntities: selectDayEntities,
	selectAll: selectDays,
	selectTotal: selectDaysCount,
	selectById: selectDayById,
} = daysAdapter.getSelectors(({ days }: RootState) => days)

export const {
	selectByWorkout: selectDaysByWorkout,
	//
} = daysSlice.selectors

export default daysSlice
