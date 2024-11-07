type BaseInfo = {
	appVersion: string
	timestamp: string
}

type OSAndName = {
	deviceName?: string
	osVersion?: string
}

type DeviceInfo = BaseInfo &
	OSAndName & {
		os?: string
		deviceName?: string
		deviceVersion?: string
	}

type GetBaseInfo = () => BaseInfo
type GetOSAndName = () => OSAndName
type GetDeviceInfo = () => DeviceInfo

export type { GetBaseInfo, GetOSAndName, GetDeviceInfo }
