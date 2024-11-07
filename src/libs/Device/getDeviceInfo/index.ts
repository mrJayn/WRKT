import getBaseInfo from './getBaseInfo'
import getOSAndName from './getOSAndName'
import type { GetDeviceInfo } from './types'

const getDeviceInfo: GetDeviceInfo = () => ({
	...getBaseInfo(),
	...getOSAndName(),
})

export default getDeviceInfo
