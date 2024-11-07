import type { NativeEventSubscription } from 'react-native'
import { setupListeners } from '@reduxjs/toolkit/query'
import type { ThunkDispatch } from '@reduxjs/toolkit'
import type { ListenerActions } from '@reduxjs/toolkit/dist/query/core/module'

import AppStateMonitior from '@libs/AppStateMonitor'
import NetworkConnection from '@libs/Network'

/**
 * modified from:  https://github.com/reduxjs/redux-toolkit/issues/3652#issuecomment-1898494192
 * docs:  https://redux-toolkit.js.org/rtk-query/api/setupListeners
 */

let initialized = false
let appStateSubscription: NativeEventSubscription | null = null
let netInfoUnsubscribe: (() => void) | null = null

type CustomHandler = Required<Parameters<typeof setupListeners>>['1']

const customHandler: CustomHandler = (dispatch, { onFocus, onFocusLost, onOffline, onOnline }) => {
	if (!initialized) {
		appStateSubscription = AppStateMonitior.addChangeListener((isActive) => {
			console.log(`[@/features/Store/customHandler] AppState changed.`, { isActive })
			dispatch(isActive ? onFocus() : onFocusLost())
		})

		netInfoUnsubscribe = NetworkConnection.addNetInfoChangeListener((isOffline) => {
			console.log('[@/features/Store/customHandler] NetInfo changed.', { isOffline })
			dispatch(isOffline ? onOffline() : onOnline())
		})

		initialized = true
	}

	return () => {
		if (appStateSubscription) {
			appStateSubscription.remove()
			appStateSubscription = null
		}
		if (netInfoUnsubscribe) {
			netInfoUnsubscribe()
			netInfoUnsubscribe = null
		}
		initialized = false
	}
}

export default customHandler
