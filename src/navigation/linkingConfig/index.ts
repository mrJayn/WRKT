import * as ExpoLinking from 'expo-linking'
import CONFIG from '@src/CONFIG'
import customGetStateFromPath from './getStateFromPath'
import customGetPathFromState from './getPathFromState'
import subscribe from './subscribe'
import config from './config'
import type { LinkingConfig } from './types'

// prettier-ignore
const linkingConfig: LinkingConfig = {
	getStateFromPath: customGetStateFromPath,

	// getPathFromState: customGetPathFromState,

	// subscribe,

	// filter: (url) => !url.includes('+expo-auth-session'),

	prefixes:[
		ExpoLinking.createURL('/'),
		CONFIG.BASE_URL,
	],
	
	// Screens configuration
	config,
}

export default linkingConfig
