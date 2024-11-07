import { uniqueId } from 'lodash'
import type { GenerateDeviceID } from './types'

const uniqueID = uniqueId()

const generateDeviceID: GenerateDeviceID = () => Promise.resolve(uniqueID)

export default generateDeviceID
