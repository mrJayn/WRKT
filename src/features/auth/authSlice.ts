import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import type { AuthState } from './types'

const initialState: AuthState = {
	authToken: undefined,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuthToken: (state, action: PayloadAction<string>) => {
			state.authToken = action.payload
		},
	},
	selectors: {
		selectIsAuthenticated: (state) => !!state.authToken,
	},
})

export const { selectIsAuthenticated } = authSlice.selectors
export const { setAuthToken } = authSlice.actions
export default authSlice
