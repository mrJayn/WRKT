import { merge } from 'lodash'
import { createSlice } from '@reduxjs/toolkit'

import CONST from '@src/CONST'
import type { Profile } from '@src/types/features'
import profileAPI from './profileAPI'

type ProfileSliceState = Profile | null

const profileSlice = createSlice({
	name: 'profile',
	initialState: null as ProfileSliceState,
	reducers: {},
	extraReducers: (builder) => {
		// Match a successful `get-profile` query.
		builder.addMatcher(profileAPI.endpoints.getProfile.matchFulfilled, (state, action) => {
			merge(state, action.payload)
		})

		// Match a successful `update-profile` query.
		builder.addMatcher(profileAPI.endpoints.updateProfile.matchFulfilled, (state, action) => {
			merge(state, action.payload)
		})
	},
	selectors: {
		selectProfile: (state) => state,
		selectPreferredTheme: (state) => state?.theme ?? CONST.THEME.SYSTEM,
	},
})

export const ProfileActions = profileSlice.actions
export const { selectProfile, selectPreferredTheme } = profileSlice.selectors
export default profileSlice
