import { createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '@features/Store'
import type { Day } from '@src/types/features'
import daysAPI from './daysApi'

/*

// Entity Adapter normalized state structure
{
	days: {
		ids: [ 1, 2, ..., 8, 9, ..., ],
		entities: {
			1: { id: 1, workout: 1, dayIndex: 1, name: "PPL Day1" , ...} ,
			2: { id: 2, workout: 1, dayIndex: 2, name: "PPL Day2" , ...} ,
			....,
			8: { id: 8, workout: 2, dayIndex: 1, name: "BodyPart Day_1" , ...} ,
			9: { id: 9, workout: 2, dayIndex: 2, name: "BodyPart Day_2" , ...} ,
			...,
		},
	}
}

// Custom normalized state structure 
{
	days: {
		// by id
		entities: {
			1: { id: 1, workout: 1, dayIndex: 1, name: "PPL Day1" , ...} ,
			2: { id: 2, workout: 1, dayIndex: 2, name: "PPL Day2" , ...} ,
			....,
			8: { id: 8, workout: 2, dayIndex: 1, name: "BodyPart Day_1" , ...} ,
			9: { id: 9, workout: 2, dayIndex: 2, name: "BodyPart Day_2" , ...} ,
			...,
		},

		// all ids
		ids: [ 1, 2, ..., 8, 9, ..., ],
	}
}


// ---

const dayId = 1
const dayObject = state.days.entities[dayId]

*/




const daysAdapter = createEntityAdapter({
	selectId: (day: Day) => day.id,
	sortComparer: (a, b) => a.dayIndex - b.dayIndex,
})

const daysSlice = createSlice({
	name: 'days',
	initialState: daysAdapter.getInitialState(),
	reducers: {
		//
	},
	extraReducers(builder) {
		// builder.addMatcher(daysAPI.endpoints.getDays.matchFulfilled, (state, { payload }) => {
		// 	daysAdapter.setAll(state, payload)
		// })
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

const {
	selectIds: selectDayIds,
	selectEntities: selectDayEntities,
	selectAll: selectDays,
	selectTotal: selectDaysCount,
	selectById: selectDayById,
} = daysAdapter.getSelectors(({ days }: RootState) => days)

const { selectByWorkout } = daysSlice.selectors

export default daysSlice
