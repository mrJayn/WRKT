import { useEffect, useRef } from 'react'
import CONST from '@src/CONST'

type UseNetworkProps = {
	onReconnect?: () => void
}

type UseNetwork = { isOffline: boolean; isBackendReachable: boolean }

function useNetwork({ onReconnect = () => {} }: UseNetworkProps = {}): UseNetwork {
	const callback = useRef(onReconnect)
	callback.current = onReconnect

	const stateFromStore = undefined // useSelector(selectNetworkState)
	const { isOffline, isBackendReachable, networkStatus } = stateFromStore ?? {
		...CONST.NETWORK.DEFAULT_STATE,
		networkStatus: CONST.NETWORK.NETWORK_STATUS.UNKNOWN,
	}

	// console.log('[useNetwork] networkState=', networkState)

	const offlineRef = useRef(isOffline)

	/** Handles network reconnections (networkStatus update from 'offline' to any other value). */
	useEffect(() => {
		const didReconnect = offlineRef.current && !isOffline
		if (!didReconnect) {
			return
		}
		callback.current()
	}, [isOffline])

	/** Update the `offlineRef` value on `isOffline` change. */
	useEffect(() => {
		offlineRef.current = isOffline
	}, [isOffline])

	if (networkStatus === CONST.NETWORK.NETWORK_STATUS.UNKNOWN) {
		return CONST.NETWORK.DEFAULT_STATE
	}

	return { isOffline, isBackendReachable }
}
