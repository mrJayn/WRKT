import { useContext } from 'react'
import { NetworkStateContext, type NetworkState } from '@components/NetworkProvider'

function useNetworkState(): NetworkState {
	const networkState = useContext(NetworkStateContext)
	if (!networkState) {
		throw new Error('NetworkContext was null! Are you sure that you wrapped the component under a <NetworkProvider>?')
	}
	return networkState
}

export default useNetworkState
