import { createSlice } from '@reduxjs/toolkit'
import type { Profile } from '@src/types/features'
import profileAPI from './profileAPI'
import CONST from '@src/CONST'
import { merge } from 'lodash'

const profileSlice = createSlice({
	name: 'profile',
	initialState: {} as Profile,
	reducers: {},
	extraReducers: (builder) => {
		/** Get the profile of the current user. */
		builder.addMatcher(profileAPI.endpoints.getProfile.matchFulfilled, (state, action) => {
			// console.log('[ profileSlice ] update fullfilled!', action.payload)
			merge(state, action.payload)
		})

		/** Update the profile of the current user. */
		builder.addMatcher(profileAPI.endpoints.updateProfile.matchFulfilled, (state, action) => {
			merge(state, action.payload)
		})
	},
	selectors: {
		selectProfile: (state) => state,
		selectPreferredTheme: (state) => state.theme || CONST.THEME.SYSTEM,
	},
})

export const ProfileActions = profileSlice.actions
export const { selectProfile, selectPreferredTheme } = profileSlice.selectors
export default profileSlice
