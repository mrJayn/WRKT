import { createSlice } from '@reduxjs/toolkit'
import userActions from './actions'
import type { RootState } from '@features/Store'
import type { User } from '@src/types/features'

type UserSliceState = {
	data?: User
}

const initialState = {
	data: undefined,
} as UserSliceState

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// retrieve
		builder
			.addCase(userActions.retrieveUser.pending, (state) => {
				//
			})
			.addCase(userActions.retrieveUser.fulfilled, (state, { payload }) => {
				state.data = payload.data
				//
			})
			.addCase(userActions.retrieveUser.rejected, (state, action) => {
				//
			})
	},
})

export const { retrieveUser, updateUser } = userActions

export const selectUser = (state: RootState) => state.user.data

export default userSlice
