import * as Device from 'expo-device'
import type { GenerateDeviceID } from './types'

const uniqueID = Device.osBuildFingerprint ?? ''

const generateDeviceID: GenerateDeviceID = () => Promise.resolve(uniqueID)

export default generateDeviceID
