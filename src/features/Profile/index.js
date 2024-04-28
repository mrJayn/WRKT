import { createSlice } from '@reduxjs/toolkit'
import profileActions from './actions'

const initialState = {
	data: {
		basic_editor: false,
		prefers_metric: false,
		notifs: true,
		day_one_wkday: 0,
		time_offset: 0,
		units: 'lbs',
		current_weekday: 0,
	},
}

const profileSlice = createSlice({
	name: 'profile',
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(profileActions.get.pending, (state) => {
				//
			})
			.addCase(profileActions.get.fulfilled, (state, { payload }) => {
				state.data = payload.data
			})
			.addCase(profileActions.get.rejected, (state, action) => {
				//
			})
	},
	selectors: {
		selectProfile: ({ data }) => ({ data }),
	},
})

export const { get: getProfile } = profileActions

export const { selectProfile } = profileSlice.selectors

export default profileSlice
