import { AppState } from 'react-native'
import type { AppStateStatus, NativeEventSubscription } from 'react-native'
import CONST from '@src/CONST'

let appState: AppStateStatus = AppState.currentState ?? CONST.APP_STATE.ACTIVE

function addChangeListener(callback: (isActive: boolean) => void): NativeEventSubscription {
	const appStateChangeCallback = (nextAppState: AppStateStatus) => {
		if (
			(appState === CONST.APP_STATE.INACTIVE || appState === CONST.APP_STATE.BACKGROUND) &&
			nextAppState === CONST.APP_STATE.ACTIVE
		) {
			// AppState is activating.
			callback(true)
		} else if (
			appState === CONST.APP_STATE.ACTIVE &&
			(nextAppState === CONST.APP_STATE.INACTIVE || nextAppState === CONST.APP_STATE.BACKGROUND)
		) {
			// AppState is deactivating.
			callback(false)
		}

		appState = nextAppState
	}

	const appStateReconnectSubscription = AppState.addEventListener('change', appStateChangeCallback)

	return appStateReconnectSubscription
}

export default {
	addChangeListener,
}
