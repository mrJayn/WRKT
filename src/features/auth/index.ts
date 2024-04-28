import { CaseReducer, PayloadAction, createAction, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '@features/Store'
import authApi from './authApi'
import { UserData } from './types'

type AuthSliceState = {
	userID?: number | undefined
	user?: Partial<UserData> | undefined
	token?: string | undefined
}

const initialState = {} as AuthSliceState

const updateToken: CaseReducer<AuthSliceState, PayloadAction<{ token: string }>> = (state, action) => {
	state.token = action.payload.token
}

export const updateUser = createAction<{ user: Partial<UserData> }>('UPDATE_USER')

export const updateAuthToken = createAction<{ token: string }>('UPDATE_AUTH_TOKEN')

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: () => initialState,
	},
	extraReducers: (builder) => {
		/** Update user. */
		builder.addCase(updateUser, (state, action) => {
			state.user = {
				...(state.user || {}),
				...action.payload.user,
			}
		})

		/** Update token. */
		builder.addCase(updateAuthToken, (state, action) => {
			state.token = action.payload.token
		})

		/** Update token on the `login` or `register` endpoint fullfillment. */
		builder.addMatcher(authApi.endpoints.login.matchFulfilled, updateToken)
		builder.addMatcher(authApi.endpoints.register.matchFulfilled, updateToken)
	},
})

const { logout } = authSlice.actions

const selectIsAuthenticated = (state: RootState) => Boolean(state.auth.token)

const selectUser = (state: RootState) => state.auth.user

export default authSlice

export { logout, selectIsAuthenticated, selectUser }
