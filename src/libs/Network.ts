import { Platform } from 'react-native'
import NetInfo from '@react-native-community/netinfo'
import axios from 'axios'
import CONST from '@src/CONST'
import CONFIG from '@src/CONFIG'

let __isOffline = false

if (!CONFIG.IS_USING_LOCAL_HOST) {
	NetInfo.configure({
		reachabilityUrl: `${CONFIG.BASE_URL}api/ping/`,
		reachabilityMethod: 'GET',
		reachabilityTest: (response) => Promise.resolve(response.status === 200),
		reachabilityShortTimeout: 2 * 1000, // 2s
		reachabilityRequestTimeout: 10 * 1000, // 10s
	})
}

async function checkInternetReachability() {
	if (Platform.OS === 'android') {
		// Android only checks internet reachability on the initial connection.
		return axios
			.get(CONST.GOOGLE_CLOUD_URL, {
				validateStatus: (status) => status === 204,
			})
			.then(() => true)
			.catch(() => false)
	}
	return true
}

/**
 * Set up an event Listener for NetInfo to indicate the user's internet connectivity.
 * @returns - unsubscribe method
 */
function addNetInfoChangeListener(callback: (isOffline: boolean) => void) {
	const unsubscribe = NetInfo.addEventListener((state) => {
		const isCurrentlyOffline = state.isInternetReachable === false
		// const networkStatus = !isBoolean(state.isInternetReachable) ? CONST.NETWORK.NETWORK_STATUS.UNKNOWN : state.isInternetReachable ? CONST.NETWORK.NETWORK_STATUS.ONLINE : CONST.NETWORK.NETWORK_STATUS.OFFLINE

		if (__isOffline !== isCurrentlyOffline) {
			console.log('[Network] NetInfo changed', { isOffline: isCurrentlyOffline })
			callback(isCurrentlyOffline)
		}

		__isOffline = isCurrentlyOffline
	})

	return unsubscribe
}

/**
 *
 * Set interval to periodically (re)check backend status.
 * Because backend unreachability might imply lost internet connection, we need to check internet reachability.
 * @returns clearInterval cleanup
 */
function addBackendReachabilityListener(callback: (isInternetReachable: boolean) => void) {
	if (!CONFIG.IS_USING_LOCAL_HOST) {
		return null
	}
	return () => {
		const intervalID = setInterval(() => {
			if (__isOffline) {
				return // Offline status also implies backend unreachability
			}
			axios({
				method: 'GET',
				url: `${CONFIG.BASE_URL}api/ping`,
				validateStatus: (status) => status === 200,
			})
				.then(() => true)
				.catch(checkInternetReachability)
				.then(callback)
		}, CONST.NETWORK.BACKEND_CHECK_INTERVAL_MS)

		return () => {
			clearInterval(intervalID)
		}
	}
}

export default {
	addNetInfoChangeListener,
	addBackendReachabilityListener,
}
