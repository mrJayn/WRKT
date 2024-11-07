import { merge } from 'lodash'
import { createSlice } from '@reduxjs/toolkit'
import type { User } from '@src/types/features'
import userAPI from './userAPI'

const userSlice = createSlice({
	name: 'user',
	initialState: {} as User,
	reducers: {},
	extraReducers: (builder) => {
		builder.addMatcher(userAPI.endpoints.getUser.matchFulfilled, (state, action) => {
			merge(state, action.payload)
		})
	},
	selectors: {
		selectUser: (state) => state,
	},
})

export const { selectUser } = userSlice.selectors
export default userSlice
