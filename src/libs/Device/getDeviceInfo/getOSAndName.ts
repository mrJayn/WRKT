import { capitalize } from 'lodash'
import * as Device from 'expo-device'
import type { GetOSAndName } from './types'

const getOSVersion = () => (!!Device.osVersion ? Device.osVersion : undefined)

const getOSAndName: GetOSAndName = () => {
	const prettyName = `${capitalize(Device.brand || '')} ${Device.designName || ''}`

	return {
		deviceName: prettyName,
		osVersion: getOSVersion(),
	}
}

export default getOSAndName
