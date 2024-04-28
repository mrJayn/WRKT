import { createContext, useEffect, useState } from 'react'
import NetInfo, { useNetInfo, NetInfoState } from '@react-native-community/netinfo'
import type { ChildrenProps } from '@src/types/utils'
import { green, red } from '@libs/LogColor'

type NetworkState = NetInfoState & { isOffline: boolean }

const NetworkStateContext = createContext({} as NetworkState)

function NetworkStateProvider({ children }: ChildrenProps) {
	const netInfo: NetInfoState = useNetInfo()
	const [isOffline, setIsOffline] = useState(false)

	useEffect(() => {
		const offline = !Boolean(netInfo.isConnected && netInfo.isInternetReachable)
		if (offline) {
			console.log(red('network Offline '))
		} else {
			console.log(green('network Online '))
		}
		setIsOffline(offline)
	}, [netInfo])

	return <NetworkStateContext.Provider value={{ ...netInfo, isOffline }}>{children}</NetworkStateContext.Provider>
}

NetworkStateProvider.displayName = 'NetworkProvider'

export default NetworkStateProvider

export { NetworkStateContext }

export type { NetworkState }
