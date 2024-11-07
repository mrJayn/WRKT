import _ from 'lodash'
import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit'
import CONST from '@src/CONST'
import type { NetworkState, NetworkStatus } from '@src/types/features'
import API from '@features/API'
import networkAPI from './networkAPI'

const NetworkSlice = createSlice({
	name: 'network',
	initialState: CONST.NETWORK.DEFAULT_STATE as NetworkState,
	reducers: {
		/** Update the network status. */
		setNetworkStatus: {
			reducer: (state, action: PayloadAction<NetworkStatus>) => {
				state.networkStatus = action.payload
			},
			prepare: (isInternetReachable: boolean | null) => {
				let networkStatus = !_.isBoolean(isInternetReachable)
					? CONST.NETWORK.NETWORK_STATUS.UNKNOWN
					: isInternetReachable
					? CONST.NETWORK.NETWORK_STATUS.ONLINE
					: CONST.NETWORK.NETWORK_STATUS.OFFLINE
				return {
					payload: networkStatus,
				}
			},
		},
	},

	extraReducers: (builder) => {
		/** Set the offline status. */
		builder.addMatcher(isAnyOf(API.internalActions.onOnline, API.internalActions.onOffline), (state, action) => {
			let isOffline = action.type.endsWith('offline')
			state.isOffline = isOffline
		})

		/** Set the backend reachability status. */
		builder.addMatcher(
			isAnyOf(
				networkAPI.endpoints.getBackendReachability.matchFulfilled,
				networkAPI.endpoints.getBackendReachability.matchRejected
			),
			(state, action) => {
				let isBackendReachable = action.payload === true
				state.isBackendReachable = isBackendReachable
			}
		)

		/** Set the app focus state. */
		// builder.addMatcher(isAnyOf(API.internalActions.onFocus, API.internalActions.onFocusLost), (state, action) => {
		// 	let isAppfocused = !action.type.endsWith('unfocused')
		// 	state.shouldPerformBackendCheck = isAppfocused
		// })
	},
	selectors: {
		selectOfflineStatus: (state) => state.isOffline,
		selectBackendReachability: (state) => state.isBackendReachable,
	},
})

export const { selectOfflineStatus } = NetworkSlice.selectors
export default NetworkSlice
