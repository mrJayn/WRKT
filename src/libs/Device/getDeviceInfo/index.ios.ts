import getBaseInfo from './getBaseInfo'
import getOSAndName from './getOSAndName'
import type { GetDeviceInfo } from './types'

const getDeviceInfo: GetDeviceInfo = () => ({
	...getBaseInfo(),
	...getOSAndName(),
	os: 'iOS',
})

export default getDeviceInfo