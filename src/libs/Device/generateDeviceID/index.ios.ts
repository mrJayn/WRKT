import { uniqueId } from 'lodash'
import * as Device from 'expo-device'
import type { GenerateDeviceID } from './types'

/** IOS manifest
 * buildNumber - Constants.expoConfig?.ios?.buildNumber
 * model  - Device.modelName
 * platform - Device.modelId
 * systemVersion - Device.osVersion
 * userInterfaceIdiom - Device.getDeviceTypeAsync()
 */

const deviceID = Device.modelId
const uniqueID = uniqueId(`_${deviceID}`)

const generateDeviceID: GenerateDeviceID = () => Promise.resolve(uniqueID)

export default generateDeviceID
