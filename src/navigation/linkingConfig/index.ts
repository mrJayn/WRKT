/* eslint-disable @typescript-eslint/naming-convention */
import { LinkingOptions } from '@react-navigation/native'
import * as Linking from 'expo-linking'
import CONST from '@src/CONST'
import type { RootStackParamList } from '@navigation/types'
import config from './config'

const linkingConfig: LinkingOptions<RootStackParamList> = {
	// getStateFromPath,
	// getPathFromState,
	prefixes: [
		Linking.createURL('/'),
		CONST.WRKT_URL,
		//
	],
	config,
}

export default linkingConfig
