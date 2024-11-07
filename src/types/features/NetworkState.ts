import CONST from '@src/CONST'
import { ValueOf } from '../utils'

type NetworkStatus = ValueOf<typeof CONST.NETWORK.NETWORK_STATUS>

type NetworkState = {
	/** Is the network currently offline or not. Defaults to false. */
	isOffline: boolean

	/** Is the backend reachable when online. Defaults to true. */
	isBackendReachable: boolean

	/** The network's status */
	networkStatus?: NetworkStatus
}

export type { NetworkState, NetworkStatus }
