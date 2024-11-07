import { isAnyOf } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { startStoreListening } from '@libs/Middleware/listenerMiddleware'
import * as TokenUtils from '@libs/TokenUtils'
import authAPI from '@features/auth/authApi'
import type { AuthTokenPair } from '@features/auth/types'
import { setAuthToken } from '@features/auth/authSlice'

/**
 *
 *
 ***** NOT CURRENTLY IMPLEMENTED ****
 *
 *
 */

const isObtainTokenPairAction = isAnyOf(
	authAPI.endpoints.login.matchFulfilled,
	authAPI.endpoints.register.matchFulfilled
	//
)

/**
 * Middleware to handle reauthentication for the current user.
 */
const Reauthentication = startStoreListening({
	matcher: isObtainTokenPairAction,

	/** Updates the auth token of the current user. */
	effect: async (action: PayloadAction<AuthTokenPair>, listenerApi) => {
		console.log('[Reauthentication] New token pair recieved.')
		await TokenUtils.setAuthTokenPair(action.payload)
		listenerApi.dispatch(setAuthToken(action.payload.access))
	},
})

export default Reauthentication
