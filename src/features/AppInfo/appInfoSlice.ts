import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import type { AppInfo } from '@src/types/features'

const initialState: AppInfo = {
	isInBeta: false,
	isUpdateAvailable: false,
	updateRequired: false,
	lastVisitedPath: undefined,
}

const appInfoSlice = createSlice({
	name: 'app-info',
	initialState,
	reducers: {
		setIsAppInBeta: (state, action: PayloadAction<AppInfo['isInBeta']>) => {
			state.isInBeta = action.payload
		},
	},
	selectors: {},
})

export const { setIsAppInBeta } = appInfoSlice.actions
export const {} = appInfoSlice.selectors
export default appInfoSlice
